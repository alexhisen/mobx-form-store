import { observable, observe, autorunAsync, action, computed, asMap } from 'mobx';

const DEFAULT_SERVER_ERROR_MESSAGE = 'Lost connection to server';

function isSame(val1, val2) {
  /* eslint-disable eqeqeq */
  return val1 == val2 || (val1 instanceof Date && val2 instanceof Date && val1.valueOf() == val2.valueOf());
  /* eslint-enable eqeqeq */
}

/**
 * Observes data and if changes come, add them to dataChanges,
 * unless it resets back to dataServer value, then clear that change
 * @this {FormStore}
 * @param {Object} change
 * @param {String} change.name - name of property that changed
 * @param {*} change.newValue
 */
function observableChanged(change) {
  const store = this;
  action(() => {
    store.dataChanges.set(change.name, change.newValue);

    if (store.isSame(store.dataChanges.get(change.name), store.dataServer[change.name])) {
      store.dataChanges.delete(change.name);
    }
  })();
}
/**
 * Records successfully saved data as saved
 * and reverts fields server indicates to be in error
 * @param {FormStore} store
 * @param {Object} updates - what we sent to the server
 * @param {Object} response
 * @param {String} [response.data] - optional updated data to merge into the store (server.create can return id here)
 * @param {String} [response.status] - 'error' indicates one or more fields were invalid and not saved.
 * @param {String|Object} [response.error] - either a single error message to show to user if string or field-specific error messages if object
 * @param {String|Array} [response.error_field] - name of the field (or array of field names) in error
 * If autoSave is enabled, any field in error_field for which there is no error message in response.error will be reverted
 * to prevent autoSave from endlessly trying to save the changed field.
 * @returns response.status
 */
async function processSaveResponse(store, updates, response) {
  store.options.log(`[${store.options.name}] Response received from server.`);

  if (response.status === 'error') {
    action(() => {
      let errorFields = [];
      if (response.error) {
        if (typeof response.error === 'string') {
          store.serverError = response.error;
        } else {
          Object.assign(store.dataErrors, response.error);
          errorFields = Object.keys(response.error);
        }
      }

      // Supports an array of field names in error_field or a string
      errorFields = errorFields.concat(response.error_field);
      errorFields.forEach((field) => {
        if (store.options.autoSaveInterval && !store.dataErrors[field] && store.isSame(updates[field], store.data[field])) {
          store.data[field] = store.dataServer[field]; // revert or it'll keep trying to autosave it
        }
        delete updates[field]; // don't save it as the new dataServer value
      });
    })();
  } else {
    store.serverError = null;
  }

  Object.assign(store.dataServer, updates);

  action(() => {
    if (response.data) {
      Object.assign(store.dataServer, response.data);
      Object.assign(store.data, response.data);
    }

    store.dataChanges.forEach((value, key) => {
      if (store.isSame(value, store.dataServer[key])) {
        store.dataChanges.delete(key);
      }
    });
  })();

  if (typeof store.options.afterSave === 'function') {
    await store.options.afterSave(store, updates, response);
  }

  return response.status;
}

/**
 * @param {FormStore} store
 * @param {Error} err
 */
function handleError(store, err) {
  if (typeof store.options.server.errorMessage === 'function') {
    store.serverError = store.options.server.errorMessage(err);
  } else {
    store.serverError = store.options.server.errorMessage;
  }

  store.options.logError(err);
}

class FormStore {
  /** @private */
  options = {
    name: 'FormStore', // used in log statements
    idProperty: null,
    autoSaveInterval: 0, // in ms
    minRefreshInterval: 0, // in ms
    log: function noop() {},
    logError: console.error.bind(console), // eslint-disable-line
    /** @type {Boolean|function(object): Boolean} passed status object */
    isReadOnly: (status) => !status.isReady,
    server: {
      /** @type {undefined|function: Promise|Object} - MUST resolve to an object with all data properties present even if all have null values */
      get: undefined,
      /** @type {undefined|function(object): Promise|Object} passed updates object - see processSaveResponse for expected error response properties */
      set: undefined,
      /** @type {undefined|function(object}: Promise|Object} passed updates object - see processSaveResponse for expected error response properties */
      create: undefined,
      /** @type {String|function(error): String} passed error object */
      errorMessage: DEFAULT_SERVER_ERROR_MESSAGE,
    },
    /** @type {undefined|function(FormStore): Promise|Boolean} passed store instance - if it returns false, no refresh will be performed */
    beforeRefresh: undefined,
    /** @type {undefined|function(FormStore): Promise} passed store instance */
    afterRefresh: undefined,
    /** @type {undefined|function(FormStore, object, object): Promise|Boolean} passed store instance, updates object and saveOptions object,
     * (i.e. with skipPropertyBeingEdited, etc booleans) - if it returns false, no save will be performed */
    beforeSave: undefined,
    /** @type {undefined|function(FormStore, object, object): Promise} passed store instance, updates object and response object
     * - updates object will already have fields removed from it that response indicates are in error */
    afterSave: undefined,
  };

  /**
   * @private
   * @type {null|Date}
   */
  lastSync = null;
  /** @private */
  propertyBeingEdited = null; // property currently being edited as set by startEditing()
  /** @private */
  saveQueue = Promise.resolve();
  /** @private */
  observeDisposer;

  /** @private */
  @observable isReady = false; // true after initial data load (refresh) has completed
  /** @private */
  @observable isLoading = false;
  /** @private */
  @observable isSaving = false;
  /** @private */
  @observable serverError = null; // stores both communication error and any explicit response.error returned to save

  /** @private */
  // To support both Mobx 2.2+ and 3.x, this is now done in constructor:
  // @observable dataChanges = asMap(); // changes that will be sent to server

  /** @private */
  dataServer = {}; // data returned by the server (kept for checking old values)

  @observable data = {};
  // stores validation error message if any for each field (data structure is identical to data)
  @observable dataErrors = {};
  // active is set to true right after a save is completed and status is set to response.status
  // this allows a confirmation message to be shown to user and to drive its dismissal,
  // UI can set this observable's active property back to false.
  @observable saveNotification = { active: false, status: null };

  isSame = isSame;

  constructor(options, data) {
    const store = this;
    Object.assign(store.options, options);
    if (!data && typeof store.options.server.get !== 'function') {
      throw new Error('options must specify server get function or supply initial data object to constructor');
    }
    if (!typeof store.options.server.create !== 'function' && typeof store.options.server.set !== 'function') {
      throw new Error('options must specify server set and/or create function(s)');
    }
    store.options.server.errorMessage = store.options.server.errorMessage || DEFAULT_SERVER_ERROR_MESSAGE;

    // Supports both Mobx 3.x (observable.map) and 2.x+ (asMap) without deprecation warnings:
    this.dataChanges = observable.map ? observable.map() : asMap(); // changes that will be sent to server

    // register observe for changes to properties in store.data as well as to complete replacement of store.data object
    const storeDataChanged = observableChanged.bind(store);
    store.observeDisposer = observe(store.data, storeDataChanged);
    observe(store, 'data', () => {
      store.observeDisposer && store.observeDisposer();
      store.observeDisposer = observe(store.data, storeDataChanged);

      store.dataChanges.clear();
      action(() => {
        Object.keys(store.data).forEach((key) => {
          const value = store.data[key];
          if (!store.isSame(value, store.dataServer[key])) {
            store.dataChanges.set(key, value);
          }
        });
      })();
    });

    // auto-save by observing dataChanges keys
    if (store.options.autoSaveInterval) {
      autorunAsync(() => {
        if ((!store.options.idProperty || this.data[store.options.idProperty]) && this.dataChanges.keys().length) {
          store.options.log(`[${store.options.name}] Auto-save started...`);

          store.save({ skipPropertyBeingEdited: true, keepServerError: true });
        }
      }, store.options.autoSaveInterval);
    }

    if (data) {
      store.dataServer = data;
      store.reset();
      store.isReady = true;
    }
  }

  /**
   * Marks data property as edit-in-progress and therefore it should not be autosaved - to be called on field focus
   * @param {String|Array} name - field/property name (Array format supports json schema forms)
   */
  startEditing(name) {
    const store = this;
    store.propertyBeingEdited = Array.isArray(name) ? name[0] : name;
  }

  // to be called on field blur, any field name parameter is ignored
  stopEditing() {
    const store = this;
    store.propertyBeingEdited = null;
    if (store.status.hasChanges) {
      // This will trigger autorun in case it already ran while we were editing:
      action(() => {
        const key = store.dataChanges.keys()[0];
        const value = store.dataChanges.get(key);
        store.dataChanges.delete(key);
        store.dataChanges.set(key, value);
      })();
    }
  }

  /**
   * Returns the value of a field/property, optionally returning the last saved value for not validated/in progress fields
   * Without validated:true, using this function is not necessary, can just access store.data[name].
   * @param {String|Array} name - field/property name (Array format supports json schema forms)
   * @param {Boolean} [validated] - only return validated value, i.e. if it's in error, fallback to dataServer
   * @param {Boolean} [skipPropertyBeingEdited] - used only when validated is true to again fallback to dataServer
   * @returns {*}
   */
  getValue(name, validated, skipPropertyBeingEdited) {
    const store = this;
    const prop = Array.isArray(name) ? name[0] : name;
    if (validated) {
      // check if property is being edited or invalid
      if ((skipPropertyBeingEdited && prop === store.propertyBeingEdited) || store.dataErrors[prop]) {
        return store.dataServer[prop];
      }
    }
    return store.data[prop];
  }

  // Returns the last saved (or server-provided) set of data
  // - in an afterSave callback it already includes merged updates that were not in error
  getSavedData() {
    const store = this;
    return store.dataServer;
  }

  /**
   * @returns {{errors: Array<String>, isReady: Boolean, isInProgress: Boolean, canSave: Boolean, hasChanges: Boolean, isReadOnly: Boolean}}
   * errors is an array of any serverError plus all the error messages from all fields (in no particular order)
   * (serverError is either the string returned in response.error or a communication error and is cleared on every refresh and save)
   * isReady indicates initial data load (refresh) has been completed and user can start entering data
   * isInProgress indicates either a refresh or a save is in progress
   * canSave is true when no refresh or save is in progress and there are no validation errors
   * hasChanges is true when one or more data properties has a value that's different from last-saved/server-loaded data.
   * isReadOnly by default is true when isReady is false but can be set to the return value of an
   *            optional callback to which this status object (without isReadOnly) is passed
   */
  @computed get status() {
    const store = this;
    let errors = [];

    if (store.serverError) {
      errors = [store.serverError];
    }

    Object.keys(store.dataErrors).forEach((key) => {
      if (store.dataErrors[key]) {
        errors.push(store.dataErrors[key]);
      }
    });

    const status = {
      errors,
      isReady: store.isReady,
      isInProgress: store.isLoading || store.isSaving,
      canSave: !store.isLoading && !store.isSaving && (store.serverError ? errors.length === 1 : errors.length === 0),
      hasChanges: !!store.dataChanges.size,
    };
    if (typeof store.options.isReadOnly === 'function') {
      status.isReadOnly = store.options.isReadOnly(status);
    } else {
      status.isReadOnly = store.options.isReadOnly;
    }
    return status;
  }

  /**
   * Copies dataServer into data and resets the error observable.
   * Mostly for internal use by refresh().
   * @param {Object} [data] Optionally set store.data to this object instead of copying dataServer
   */
  reset(data) {
    const store = this;

    action(() => {
      store.data = data || Object.assign({}, store.dataServer);

      // setup error observable
      const temp = {};
      Object.keys(store.data).forEach((key) => {
        temp[key] = null;
      });
      store.dataErrors = temp;
    })();
  }

  /**
   * Loads data from server unless a refresh was performed within the last minRefreshInterval (i.e. 15 minutes).
   * If there are pending (and ready to save) changes, triggers save instead and 'resets the clock' on minRefreshInterval.
   * For a store with idProperty defined, if that data property is falsy, loads from server only the very first time refresh() is called.
   * @returns {Promise|Boolean} resolves to true if refresh actually performed, false if skipped
   */
  async refresh() {
    const store = this;
    if (!store.options.server.get || (store.isReady && store.options.idProperty && !store.data[store.options.idProperty])) {
      return false;
    }
    store.options.log(`[${store.options.name}] Starting data refresh...`);
    const now = new Date();
    const past = new Date(Date.now() - store.options.minRefreshInterval);

    // check if lastSync is between now and 15 minutes ago
    if (past < store.lastSync && store.lastSync < now) {
      store.options.log(`[${store.options.name}] Data refreshed within last ${store.options.minRefreshInterval / 1000} seconds.`);
      return false;
    }

    if (store.status.hasChanges && (!store.options.idProperty || store.data[store.options.idProperty])) {
      store.options.log(`[${store.options.name}] Unsaved changes detected...`);

      if (await store.save()) {
        store.options.log(`[${store.options.name}] Postponing refresh for ${store.options.minRefreshInterval / 1000} seconds.`);
        store.lastSync = new Date();
        return false;
      }
    }

    if (typeof store.options.beforeRefresh === 'function') {
      if (await store.options.beforeRefresh(store) === false) {
        return false;
      }
    }

    store.options.log(`[${store.options.name}] Refreshing data...`);
    store.isLoading = true;

    try {
      const result = await store.options.server.get();
      store.options.log(`[${store.options.name}] Data received from server.`);

      action(() => {
        store.dataServer = result;
        store.serverError = null;
        store.lastSync = new Date();
        store.reset();
      })();

      if (typeof store.options.afterRefresh === 'function') {
        await store.options.afterRefresh(store);
      }

      store.options.log(`[${store.options.name}] Refresh finished.`);
      if (!store.isReady) store.isReady = true;
    } catch (err) {
      handleError(store, err);
    }

    store.isLoading = false;
    return true;
  }

  /**
   * Sends ready-to-save data changes to the server (normally using server.set unless it's undefined, then with server.create)
   * For a store with idProperty defined when that property is falsy and allowCreate=true, uses server.create instead.
   * Calls to save() while one is in progress are queued.
   * @param {Object} saveOptions - the object as a whole is also passed to the beforeSave callback
   * @param {Boolean} [saveOptions.allowCreate=false] - for a store with idProperty defined, this must be true
   *                                                    for the save to actually be performed when that property is falsy.
   * @param {Boolean} [saveOptions.saveAll=false] - normally save only sends changes and if no changes, no save is done.
   *                                                if saveAll=true, sends the full data object regardless of changes.
   * @param {Boolean} [saveOptions.skipPropertyBeingEdited=false] - true in an auto-save
   * @param {Boolean} [saveOptions.keepServerError=false] - true in an auto-save
   * @returns {Promise|Boolean} resolves to true if save actually performed, false if skipped
   */
  save(saveOptions = {}) {
    const { allowCreate = false, saveAll = false, skipPropertyBeingEdited = false, keepServerError = false } = saveOptions;
    const store = this;

    store.saveQueue = store.saveQueue.then(
      async () => {
        if (store.options.idProperty && !store.data[store.options.idProperty] && !allowCreate) {
          return false;
        }
        store.options.log(`[${store.options.name}] Starting data save...`);

        let updates;
        if (saveAll) {
          updates = Object.assign({}, store.data);
        } else {
          updates = store.dataChanges.toJS();

          if (Object.keys(updates).length === 0) {
            store.options.log(`[${store.options.name}] No changes to save.`);
            return false;
          }

          // check if we have property currently being edited in changes
          // or if a property has an error
          Object.keys(updates).forEach((property) => {
            if (skipPropertyBeingEdited && property === store.propertyBeingEdited) {
              store.options.log(`[${store.options.name}] Property "${property}" is being edited.`);
              delete updates[property];
            }

            if (store.dataErrors[property]) {
              store.options.log(`[${store.options.name}] Property "${property}" is not validated.`);
              delete updates[property];
            }

            if (store.isSame(updates[property], store.dataServer[property])) {
              store.options.log(`[${store.options.name}] Property "${property}" is same as on the server.`);
              delete updates[property];
              store.dataChanges.delete(property);
            }
          });

          if (Object.keys(updates).length === 0) {
            store.options.log(`[${store.options.name}] No changes ready to save.`);
            return false;
          }
        }

        if (typeof store.options.beforeSave === 'function') {
          if (await store.options.beforeSave(store, updates, saveOptions) === false) {
            return false;
          }
        }

        store.options.log(`[${store.options.name}] Saving data...`);
        store.options.log(updates);
        store.isSaving = true;

        try {
          if (!keepServerError) {
            store.serverError = null;
          }

          let response;
          if (store.options.server.set && (!store.options.idProperty || !store.options.server.create || store.data[store.options.idProperty])) {
            response = await store.options.server.set(updates);
          } else {
            response = await store.options.server.create(updates);
          }

          store.saveNotification.status = await processSaveResponse(store, updates, response);
          store.saveNotification.active = true;

          store.options.log(`[${store.options.name}] Save finished.`);
        } catch (err) {
          handleError(store, err);
        }

        store.isSaving = false;
        return true;
      }
    );

    return store.saveQueue;
  }
}

export default FormStore;
