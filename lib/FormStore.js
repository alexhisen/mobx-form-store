"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mobx = require("mobx");

var _justExtend = _interopRequireDefault(require("just-extend"));

var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var DEFAULT_SERVER_ERROR_MESSAGE = 'Lost connection to server';

function isObject(obj) {
  return {}.toString.call(obj) === '[object Object]';
}

function isSame(val1, val2) {
  /* eslint-disable eqeqeq */
  return val1 == val2 || val1 instanceof Date && val2 instanceof Date && val1.valueOf() == val2.valueOf() || (Array.isArray(val1) || (0, _mobx.isObservableArray)(val1)) && (Array.isArray(val2) || (0, _mobx.isObservableArray)(val2)) && val1.toString() === val2.toString() || isObject(val1) && isObject(val2) && compareObjects(val1, val2);
  /* eslint-enable eqeqeq */
} // Based on https://github.com/angus-c/just/blob/master/packages/collection-compare/index.js


function compareObjects(val1, val2) {
  var keys1 = Object.getOwnPropertyNames(val1).filter(function (key) {
    return key[0] !== '$';
  }).sort();
  var keys2 = Object.getOwnPropertyNames(val2).filter(function (key) {
    return key[0] !== '$';
  }).sort();
  var len = keys1.length;

  if (len !== keys2.length) {
    return false;
  }

  for (var i = 0; i < len; i++) {
    var key1 = keys1[i];
    var key2 = keys2[i];

    if (!(key1 === key2 && isSame(val1[key1], val2[key2]))) {
      return false;
    }
  }

  return true;
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
  var store = this;
  (0, _mobx.action)(function () {
    store.dataChanges.set(change.name, change.newValue);

    if (store.isSame(store.dataChanges.get(change.name), store.dataServer[change.name])) {
      store.dataChanges["delete"](change.name);
    }
  })();
}
/**
 * Sets up observation on all computed data properties, if any
 * @param {FormStore} store
 */


function observeComputedProperties(store) {
  store.observeComputedPropertiesDisposers.forEach(function (f) {
    return f();
  });
  store.observeComputedPropertiesDisposers = [];
  (0, _mobx.action)(function () {
    Object.getOwnPropertyNames(store.data).forEach(function (key) {
      if ((0, _mobx.isComputedProp)(store.data, key)) {
        store.options.log("[".concat(store.options.name, "] Observing computed property: ").concat(key));
        var disposer = (0, _mobx.observe)(store.data, key, function (_ref) {
          var newValue = _ref.newValue;
          return store.storeDataChanged({
            name: key,
            newValue: newValue
          });
        });
        store.observeComputedPropertiesDisposers.push(disposer); // add or delete from dataChanges depending on whether value is same as in dataServer:

        store.storeDataChanged({
          name: key,
          newValue: store.data[key]
        });
      }
    });
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


function processSaveResponse(_x, _x2, _x3) {
  return _processSaveResponse.apply(this, arguments);
}
/**
 * @param {FormStore} store
 * @param {Error} err
 */


function _processSaveResponse() {
  _processSaveResponse = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(store, updates, response) {
    var deep;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            store.options.log("[".concat(store.options.name, "] Response received from server."));

            if (response.status === 'error') {
              (0, _mobx.action)(function () {
                var errorFields = [];

                if (response.error) {
                  if (typeof response.error === 'string') {
                    store.serverError = response.error;
                  } else {
                    Object.assign(store.dataErrors, response.error);
                    errorFields = Object.keys(response.error);
                  }
                } // Supports an array of field names in error_field or a string


                errorFields = errorFields.concat(response.error_field);
                errorFields.forEach(function (field) {
                  if (store.options.autoSaveInterval && !store.dataErrors[field] && store.isSame(updates[field], store.data[field])) {
                    store.data[field] = store.dataServer[field]; // revert or it'll keep trying to autosave it
                  }

                  delete updates[field]; // don't save it as the new dataServer value
                });
              })();
            } else {
              store.serverError = null;
            }

            deep = true;
            (0, _justExtend["default"])(deep, store.dataServer, updates);
            (0, _mobx.action)(function () {
              if (response.data) {
                (0, _justExtend["default"])(deep, store.dataServer, response.data);
                (0, _justExtend["default"])(deep, store.data, response.data);
              }

              for (var _i = 0, _Array$from = Array.from(store.dataChanges); _i < _Array$from.length; _i++) {
                var _Array$from$_i = _slicedToArray(_Array$from[_i], 2),
                    key = _Array$from$_i[0],
                    value = _Array$from$_i[1];

                if (store.isSame(value, store.dataServer[key])) {
                  store.dataChanges["delete"](key);
                }
              }
            })();

            if (!(typeof store.options.afterSave === 'function')) {
              _context3.next = 8;
              break;
            }

            _context3.next = 8;
            return store.options.afterSave(store, updates, response);

          case 8:
            return _context3.abrupt("return", response.status);

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _processSaveResponse.apply(this, arguments);
}

function handleError(store, err) {
  if (typeof store.options.server.errorMessage === 'function') {
    store.serverError = store.options.server.errorMessage(err);
  } else {
    store.serverError = store.options.server.errorMessage;
  }

  store.options.logError(err);
}

var FormStore = (_class = /*#__PURE__*/function () {
  /** @private */

  /**
   * @private
   * @type {null|Date}
   */

  /** @private */

  /** @private */

  /** @private */

  /**
   * @private
   * @type {Array<Function>}
   */

  /** @private */

  /** @private */
  // true after initial data load (refresh) has completed

  /** @private */

  /** @private */

  /** @private */
  // stores both communication error and any explicit response.error returned to save

  /** @private */
  // To support both Mobx 2.2+ and 3+, this is now done in constructor:
  // @observable dataChanges = asMap(); // changes that will be sent to server

  /** @private */
  // data returned by the server (kept for checking old values)
  // stores validation error message if any for each field (data structure is identical to data)
  // active is set to true right after a save is completed and status is set to response.status
  // this allows a confirmation message to be shown to user and to drive its dismissal,
  // UI can set this observable's active property back to false.
  // property currently being edited as set by startEditing()
  function FormStore(options, data) {
    _classCallCheck(this, FormStore);

    this.options = {
      name: 'FormStore',
      // used in log statements
      idProperty: null,
      autoSaveOptions: {
        skipPropertyBeingEdited: true,
        keepServerError: true
      },
      autoSaveInterval: 0,
      // in ms
      minRefreshInterval: 0,
      // in ms
      saveNotificationStatusOnError: null,
      log: function noop() {},
      logError: console.error.bind(console),
      // eslint-disable-line

      /** @type {Boolean|function(object): Boolean} passed status object */
      isReadOnly: function isReadOnly(status) {
        return !status.isReady;
      },
      server: {
        /** @type {undefined|function: Promise|Object} - MUST resolve to an object with all data properties present even if all have null values */
        get: undefined,

        /** @type {undefined|function(object): Promise|Object} passed updates object - see processSaveResponse for expected error response properties */
        set: undefined,

        /** @type {undefined|function(object}: Promise|Object} passed updates object - see processSaveResponse for expected error response properties */
        create: undefined,

        /** @type {String|function(error): String} passed error object */
        errorMessage: DEFAULT_SERVER_ERROR_MESSAGE
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
      afterSave: undefined
    };
    this.lastSync = null;
    this.saveQueue = Promise.resolve();
    this.observeDataObjectDisposer = void 0;
    this.observeDataPropertiesDisposer = void 0;
    this.observeComputedPropertiesDisposers = [];
    this.autorunDisposer = void 0;

    _initializerDefineProperty(this, "isReady", _descriptor, this);

    _initializerDefineProperty(this, "isLoading", _descriptor2, this);

    _initializerDefineProperty(this, "isSaving", _descriptor3, this);

    _initializerDefineProperty(this, "serverError", _descriptor4, this);

    this.dataServer = {};

    _initializerDefineProperty(this, "data", _descriptor5, this);

    _initializerDefineProperty(this, "dataErrors", _descriptor6, this);

    _initializerDefineProperty(this, "saveNotification", _descriptor7, this);

    _initializerDefineProperty(this, "propertyBeingEdited", _descriptor8, this);

    this.isSame = isSame;
    var store = this;
    Object.assign(store.options, options);

    if (!data && typeof store.options.server.get !== 'function') {
      throw new Error('options must specify server get function or supply initial data object to constructor');
    }

    if (!_typeof(store.options.server.create) !== 'function' && typeof store.options.server.set !== 'function') {
      throw new Error('options must specify server set and/or create function(s)');
    }

    store.options.server.errorMessage = store.options.server.errorMessage || DEFAULT_SERVER_ERROR_MESSAGE; // Supports both Mobx 3+ (observable.map) and 2.x (asMap) without deprecation warnings:

    store.dataChanges = _mobx.observable.map ? _mobx.observable.map() : (0, _mobx.asMap)(); // changes that will be sent to server
    // register observe for changes to properties in store.data as well as to complete replacement of store.data object

    store.storeDataChanged = observableChanged.bind(store);
    store.observeDataPropertiesDisposer = (0, _mobx.observe)(store.data, store.storeDataChanged);
    store.observeDataObjectDisposer = (0, _mobx.observe)(store, 'data', function () {
      store.observeDataPropertiesDisposer && store.observeDataPropertiesDisposer();
      store.observeDataPropertiesDisposer = (0, _mobx.observe)(store.data, store.storeDataChanged);
      store.dataChanges.clear();
      (0, _mobx.action)(function () {
        Object.keys(store.data).forEach(function (key) {
          var value = store.data[key];

          if (!store.isSame(value, store.dataServer[key])) {
            store.dataChanges.set(key, value);
          }
        });
        observeComputedProperties(store);
      })();
    });
    store.configAutoSave(store.options.autoSaveInterval, store.options.autoSaveOptions);

    if (data) {
      store.reset(data);
    }
  }
  /**
   *  disposes of all internal observation/autoruns so this instance can be garbage-collected.
   */


  _createClass(FormStore, [{
    key: "dispose",
    value: function dispose() {
      var store = this;
      store.autorunDisposer && store.autorunDisposer();
      store.observeDataObjectDisposer && store.observeDataObjectDisposer();
      store.observeDataPropertiesDisposer && store.observeDataPropertiesDisposer();
      store.observeComputedPropertiesDisposers.forEach(function (f) {
        return f();
      });
      store.autorunDisposer = undefined;
      store.observeDataObjectDisposer = undefined;
      store.observeDataPropertiesDisposer = undefined;
      store.observeComputedPropertiesDisposers = [];
    }
    /**
     * Configures and enables or disables auto-save
     * @param {Number} autoSaveInterval - (in ms) - if non-zero autosave will be enabled, otherwise disabled
     * @param {Object} [autoSaveOptions] - overrides the default autoSaveOptions if provided
     */

  }, {
    key: "configAutoSave",
    value: function configAutoSave(autoSaveInterval, autoSaveOptions) {
      var store = this;
      store.autorunDisposer && store.autorunDisposer();
      store.options.autoSaveInterval = autoSaveInterval;
      store.options.autoSaveOptions = autoSaveOptions || store.options.autoSaveOptions; // auto-save by observing dataChanges keys

      if (store.options.autoSaveInterval) {
        // Supports both Mobx <=3 (autorunAsync) and Mobx 4+
        // (ObservableMap keys no longer returning an Array is used to detect Mobx 4+,
        // because in non-production build autorunAsync exists in 4.x to issue deprecation error)
        var asyncAutorun = Array.isArray(store.dataChanges.keys()) ? _mobx.autorunAsync : function (fn, delay) {
          return (0, _mobx.autorun)(fn, {
            delay: delay
          });
        };
        store.autorunDisposer = asyncAutorun(function () {
          if (!store.status.mustCreate && Array.from(store.dataChanges).length) {
            store.options.log("[".concat(store.options.name, "] Auto-save started..."));
            store.save(store.options.autoSaveOptions);
          }
        }, store.options.autoSaveInterval);
      } else {
        store.autorunDisposer = undefined;
      }
    }
    /**
     * Marks data property as edit-in-progress and therefore it should not be autosaved - to be called on field focus
     * @param {String|Array} name - field/property name (Array format supports json schema forms)
     */

  }, {
    key: "startEditing",
    value: function startEditing(name) {
      var store = this;
      store.propertyBeingEdited = Array.isArray(name) ? name[0] : name;
    } // to be called on field blur, any field name parameter is ignored

  }, {
    key: "stopEditing",
    value: function stopEditing() {
      var store = this;
      store.propertyBeingEdited = null;

      if (store.status.hasChanges) {
        // This will trigger autorun in case it already ran while we were editing:
        (0, _mobx.action)(function () {
          // In MobX 4+, ObservableMap.keys() returns an Iterable, not an array
          var key = Array.from(store.dataChanges)[0][0];
          var value = store.dataChanges.get(key);
          store.dataChanges["delete"](key);
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

  }, {
    key: "getValue",
    value: function getValue(name, validated, skipPropertyBeingEdited) {
      var store = this;
      var prop = Array.isArray(name) ? name[0] : name;

      if (validated) {
        // check if property is being edited or invalid
        if (skipPropertyBeingEdited && prop === store.propertyBeingEdited || store.dataErrors[prop]) {
          return store.dataServer[prop];
        }
      }

      return store.data[prop];
    } // Returns the last saved (or server-provided) set of data
    // - in an afterSave callback it already includes merged updates that were not in error

  }, {
    key: "getSavedData",
    value: function getSavedData() {
      var store = this;
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

  }, {
    key: "status",
    get: function get() {
      var store = this;
      var errors = [];

      if (store.serverError) {
        errors = [store.serverError];
      }

      Object.keys(store.dataErrors).forEach(function (key) {
        if (store.dataErrors[key]) {
          errors.push(store.dataErrors[key]);
        }
      });
      var status = {
        errors: errors,
        isReady: store.isReady,
        isInProgress: store.isLoading || store.isSaving,
        canSave: !store.isLoading && !store.isSaving && (store.serverError ? errors.length === 1 : errors.length === 0),
        hasChanges: !!store.dataChanges.size,
        mustCreate: !!(store.options.idProperty && !store.dataServer[store.options.idProperty])
      };

      if (typeof store.options.isReadOnly === 'function') {
        status.isReadOnly = store.options.isReadOnly(status);
      } else {
        status.isReadOnly = store.options.isReadOnly;
      }

      return status;
    }
    /**
     * Copies dataServer into data and resets the error observable and lastSync.
     * Mostly for internal use by constructor and refresh().
     * @param {Object} [data] If provided, dataServer will be set to it and store.isReady will be set to true
     */

  }, {
    key: "reset",
    value: function reset(data) {
      var store = this;
      (0, _mobx.action)(function () {
        if (data) {
          store.dataServer = data;
        }

        var deep = true;
        store.data = (0, _justExtend["default"])(deep, {}, store.dataServer); // setup error observable

        var temp = {};
        Object.keys(store.data).forEach(function (key) {
          temp[key] = null;
        });
        store.dataErrors = temp;
        store.lastSync = null;
        observeComputedProperties(store);
        if (data && !store.isReady) store.isReady = true;
      })();
    }
    /**
     * Loads data from server unless a refresh was performed within the last minRefreshInterval (i.e. 15 minutes).
     * If there are pending (and ready to save) changes, triggers save instead and 'resets the clock' on minRefreshInterval.
     * For a store with idProperty defined, if that data property is falsy in data received from server,
     * loads from server only the very first time refresh() is called unless called with allowIfMustCreate=true option.
     * @param {Object} [refreshOptions]
     * @param {Boolean} [refreshOptions.allowIfMustCreate=false]
     * @param {Boolean} [refreshOptions.ignoreMinRefreshInterval=false]
     * @returns {Promise|Boolean} resolves to true if refresh actually performed, false if skipped
     */

  }, {
    key: "refresh",
    value: function () {
      var _refresh = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var refreshOptions,
            allowIfMustCreate,
            ignoreMinRefreshInterval,
            store,
            now,
            past,
            result,
            _args = arguments;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                refreshOptions = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
                // for some reason this syntax is erroring in tests:
                // const { allowIfMustCreate = false, ignoreMinRefreshInterval = false } = refreshOptions;
                allowIfMustCreate = refreshOptions.allowIfMustCreate || false;
                ignoreMinRefreshInterval = refreshOptions.ignoreMinRefreshInterval || false;
                store = this;

                if (!(!store.options.server.get || store.isReady && store.status.mustCreate && !allowIfMustCreate)) {
                  _context.next = 6;
                  break;
                }

                return _context.abrupt("return", false);

              case 6:
                store.options.log("[".concat(store.options.name, "] Starting data refresh..."));

                if (!store.isLoading) {
                  _context.next = 10;
                  break;
                }

                store.options.log("[".concat(store.options.name, "] Data is already being refreshed."));
                return _context.abrupt("return", false);

              case 10:
                now = new Date();
                past = new Date(Date.now() - store.options.minRefreshInterval); // check if lastSync is between now and 15 minutes ago

                if (!(!ignoreMinRefreshInterval && past < store.lastSync && store.lastSync <= now)) {
                  _context.next = 15;
                  break;
                }

                store.options.log("[".concat(store.options.name, "] Data refreshed within last ").concat(store.options.minRefreshInterval / 1000, " seconds."));
                return _context.abrupt("return", false);

              case 15:
                if (!(store.status.hasChanges && !store.status.mustCreate)) {
                  _context.next = 23;
                  break;
                }

                store.options.log("[".concat(store.options.name, "] Unsaved changes detected..."));
                _context.next = 19;
                return store.save();

              case 19:
                if (!_context.sent) {
                  _context.next = 23;
                  break;
                }

                store.options.log("[".concat(store.options.name, "] Postponing refresh for ").concat(store.options.minRefreshInterval / 1000, " seconds."));
                store.lastSync = new Date();
                return _context.abrupt("return", false);

              case 23:
                if (!(typeof store.options.beforeRefresh === 'function')) {
                  _context.next = 29;
                  break;
                }

                _context.next = 26;
                return store.options.beforeRefresh(store);

              case 26:
                _context.t0 = _context.sent;

                if (!(_context.t0 === false)) {
                  _context.next = 29;
                  break;
                }

                return _context.abrupt("return", false);

              case 29:
                store.options.log("[".concat(store.options.name, "] Refreshing data..."));
                store.isLoading = true;
                _context.prev = 31;
                _context.next = 34;
                return store.options.server.get();

              case 34:
                result = _context.sent;
                store.options.log("[".concat(store.options.name, "] Data received from server."));
                (0, _mobx.action)(function () {
                  store.dataServer = result;
                  store.serverError = null;
                  store.reset();
                  store.lastSync = new Date();
                })();

                if (!(typeof store.options.afterRefresh === 'function')) {
                  _context.next = 41;
                  break;
                }

                _context.next = 40;
                return store.options.afterRefresh(store);

              case 40:
                observeComputedProperties(store); // again, in case afterRefresh added some

              case 41:
                store.options.log("[".concat(store.options.name, "] Refresh finished."));
                if (!store.isReady) store.isReady = true;
                _context.next = 48;
                break;

              case 45:
                _context.prev = 45;
                _context.t1 = _context["catch"](31);
                handleError(store, _context.t1);

              case 48:
                store.isLoading = false;
                return _context.abrupt("return", true);

              case 50:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[31, 45]]);
      }));

      function refresh() {
        return _refresh.apply(this, arguments);
      }

      return refresh;
    }()
    /**
     * Sends ready-to-save data changes to the server (normally using server.set unless it's undefined, then with server.create)
     * For a store with idProperty defined when that property is falsy in the data received from server
     * and allowCreate=true, uses server.create instead.
     * Calls to save() while one is in progress are queued.
     * @param {Object} saveOptions - the object as a whole is also passed to the beforeSave callback
     * @param {Boolean} [saveOptions.allowCreate=false] - for a store with idProperty defined, this must be true
     *                                                    for the save to actually be performed when that property is falsy.
     * @param {Boolean} [saveOptions.saveAll=false] - normally save only sends changes and if no changes, no save is done.
     *                                                if saveAll=true, sends the full data object regardless of changes.
     * @param {Boolean} [saveOptions.skipPropertyBeingEdited=false] - true in an auto-save
     * @param {Boolean} [saveOptions.keepServerError=false] - true in an auto-save, otherwise will also deactivate saveNotification prior to save
     * @returns {Promise|Boolean} resolves to true if save actually performed, false if skipped
     */

  }, {
    key: "save",
    value: function save() {
      var saveOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var _saveOptions$allowCre = saveOptions.allowCreate,
          allowCreate = _saveOptions$allowCre === void 0 ? false : _saveOptions$allowCre,
          _saveOptions$saveAll = saveOptions.saveAll,
          saveAll = _saveOptions$saveAll === void 0 ? false : _saveOptions$saveAll,
          _saveOptions$skipProp = saveOptions.skipPropertyBeingEdited,
          skipPropertyBeingEdited = _saveOptions$skipProp === void 0 ? false : _saveOptions$skipProp,
          _saveOptions$keepServ = saveOptions.keepServerError,
          keepServerError = _saveOptions$keepServ === void 0 ? false : _saveOptions$keepServ;
      var store = this;
      store.saveQueue = store.saveQueue.then( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var deep, updates, response;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(store.status.mustCreate && !allowCreate)) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt("return", false);

              case 2:
                store.options.log("[".concat(store.options.name, "] Starting data save..."));
                deep = true;

                if (!saveAll) {
                  _context2.next = 10;
                  break;
                }

                updates = {};
                Object.getOwnPropertyNames(store.data).forEach(function (property) {
                  if (property[0] === '$') {
                    return;
                  }

                  if ((0, _mobx.isObservableArray)(store.data[property])) {
                    updates[property] = store.data[property].slice();
                    return;
                  }

                  updates[property] = store.data[property];
                });
                updates = (0, _justExtend["default"])(deep, {}, updates);
                _context2.next = 18;
                break;

              case 10:
                // Mobx 4+ toJS() exports a Map, not an Object and toJSON is the 'legacy' method to export an Object
                updates = store.dataChanges.toJSON ? store.dataChanges.toJSON() : store.dataChanges.toJS();

                if (!(Object.keys(updates).length === 0)) {
                  _context2.next = 14;
                  break;
                }

                store.options.log("[".concat(store.options.name, "] No changes to save."));
                return _context2.abrupt("return", false);

              case 14:
                // check if we have property currently being edited in changes
                // or if a property has an error and clone (observable or regular)
                // Arrays and Objects to plain ones
                Object.keys(updates).forEach(function (property) {
                  if (skipPropertyBeingEdited && property === store.propertyBeingEdited) {
                    store.options.log("[".concat(store.options.name, "] Property \"").concat(property, "\" is being edited."));
                    delete updates[property];
                    return;
                  }

                  if (store.dataErrors[property]) {
                    store.options.log("[".concat(store.options.name, "] Property \"").concat(property, "\" is not validated."));
                    delete updates[property];
                    return;
                  }

                  if (store.isSame(updates[property], store.dataServer[property])) {
                    store.options.log("[".concat(store.options.name, "] Property \"").concat(property, "\" is same as on the server."));
                    delete updates[property];
                    store.dataChanges["delete"](property);
                    return;
                  }

                  if (Array.isArray(updates[property]) || (0, _mobx.isObservableArray)(updates[property])) {
                    updates[property] = updates[property].slice();
                  } else if (isObject(updates[property])) {
                    updates[property] = (0, _justExtend["default"])(deep, {}, updates[property]);
                  }
                });

                if (!(Object.keys(updates).length === 0)) {
                  _context2.next = 18;
                  break;
                }

                store.options.log("[".concat(store.options.name, "] No changes ready to save."));
                return _context2.abrupt("return", false);

              case 18:
                if (!(typeof store.options.beforeSave === 'function')) {
                  _context2.next = 24;
                  break;
                }

                _context2.next = 21;
                return store.options.beforeSave(store, updates, saveOptions);

              case 21:
                _context2.t0 = _context2.sent;

                if (!(_context2.t0 === false)) {
                  _context2.next = 24;
                  break;
                }

                return _context2.abrupt("return", false);

              case 24:
                store.options.log("[".concat(store.options.name, "] Saving data..."));
                store.options.log(updates);
                store.isSaving = true;
                _context2.prev = 27;

                if (!keepServerError) {
                  store.saveNotification.active = false;
                  store.serverError = null;
                }

                if (!(store.options.server.set && (!store.options.server.create || !store.status.mustCreate))) {
                  _context2.next = 35;
                  break;
                }

                _context2.next = 32;
                return store.options.server.set(updates);

              case 32:
                response = _context2.sent;
                _context2.next = 38;
                break;

              case 35:
                _context2.next = 37;
                return store.options.server.create(updates);

              case 37:
                response = _context2.sent;

              case 38:
                _context2.next = 40;
                return processSaveResponse(store, updates, response);

              case 40:
                store.saveNotification.status = _context2.sent;
                store.saveNotification.active = true;
                store.options.log("[".concat(store.options.name, "] Save finished."));
                _context2.next = 49;
                break;

              case 45:
                _context2.prev = 45;
                _context2.t1 = _context2["catch"](27);
                handleError(store, _context2.t1);

                if (store.options.saveNotificationStatusOnError) {
                  store.saveNotification.status = store.options.saveNotificationStatusOnError;
                  store.saveNotification.active = true;
                }

              case 49:
                store.isSaving = false;
                return _context2.abrupt("return", true);

              case 51:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[27, 45]]);
      })));
      return store.saveQueue;
    }
  }]);

  return FormStore;
}(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "isReady", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "isLoading", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "isSaving", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "serverError", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, "data", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class.prototype, "dataErrors", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class.prototype, "saveNotification", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {
      active: false,
      status: null
    };
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class.prototype, "propertyBeingEdited", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _applyDecoratedDescriptor(_class.prototype, "status", [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, "status"), _class.prototype)), _class);
var _default = FormStore;
exports["default"] = _default;