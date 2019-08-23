(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("mobx"));
	else if(typeof define === 'function' && define.amd)
		define("FormStore", ["mobx"], factory);
	else if(typeof exports === 'object')
		exports["FormStore"] = factory(require("mobx"));
	else
		root["FormStore"] = factory(root["mobx"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _desc, _value, _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8;
	
	var _mobx = __webpack_require__(2);
	
	function _initDefineProp(target, property, descriptor, context) {
	  if (!descriptor) return;
	  Object.defineProperty(target, property, {
	    enumerable: descriptor.enumerable,
	    configurable: descriptor.configurable,
	    writable: descriptor.writable,
	    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
	  });
	}
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
	  var desc = {};
	  Object['ke' + 'ys'](descriptor).forEach(function (key) {
	    desc[key] = descriptor[key];
	  });
	  desc.enumerable = !!desc.enumerable;
	  desc.configurable = !!desc.configurable;
	
	  if ('value' in desc || desc.initializer) {
	    desc.writable = true;
	  }
	
	  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
	    return decorator(target, property, desc) || desc;
	  }, desc);
	
	  if (context && desc.initializer !== void 0) {
	    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
	    desc.initializer = undefined;
	  }
	
	  if (desc.initializer === void 0) {
	    Object['define' + 'Property'](target, property, desc);
	    desc = null;
	  }
	
	  return desc;
	}
	
	function _initializerWarningHelper(descriptor, context) {
	  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
	}
	
	Function.prototype.$asyncbind = function anonymous(self, catcher) {
	  var resolver = this;
	
	  if (catcher === true) {
	    if (!Function.prototype.$asyncbind.EagerThenable) Function.prototype.$asyncbind.EagerThenable = function factory(tick) {
	      var _tasks = [];
	
	      if (!tick) {
	        try {
	          tick = process.nextTick;
	        } catch (ex) {
	          tick = function tick(p) {
	            setTimeout(p, 0);
	          };
	        }
	      }
	
	      function _untask() {
	        for (var i = 0; i < _tasks.length; i += 2) {
	          var t = _tasks[i + 1],
	              r = _tasks[i];
	
	          for (var j = 0; j < t.length; j++) {
	            t[j].call(null, r);
	          }
	        }
	
	        _tasks = [];
	      }
	
	      function isThenable(obj) {
	        return obj && obj instanceof Object && typeof obj.then === 'function';
	      }
	
	      function EagerThenable(resolver) {
	        function done(inline) {
	          var w;
	          if (_sync || phase < 0 || (w = _thens[phase]).length === 0) return;
	
	          _tasks.push(result, w);
	
	          _thens = [[], []];
	          if (_tasks.length === 2) inline ? _untask() : tick(_untask);
	        }
	
	        function resolveThen(x) {
	          if (phase >= 0) return;
	          if (isThenable(x)) return x.then(resolveThen, rejectThen);
	          phase = 0;
	          result = x;
	          done(true);
	        }
	
	        function rejectThen(x) {
	          if (phase >= 0) return;
	          if (isThenable(x)) return x.then(resolveThen, rejectThen);
	          phase = 1;
	          result = x;
	          done(true);
	        }
	
	        function settler(resolver, rejecter) {
	          _thens[0].push(resolver);
	
	          _thens[1].push(rejecter);
	
	          done();
	        }
	
	        function toString() {
	          return 'EagerThenable{' + {
	            '-1': 'pending',
	            0: 'resolved',
	            1: 'rejected'
	          }[phase] + '}=' + result.toString();
	        }
	
	        function guard() {
	          try {
	            resolver.call(null, resolveThen, rejectThen);
	          } catch (ex) {
	            rejectThen(ex);
	          }
	        }
	
	        this.then = settler;
	        this.toString = toString;
	        var _thens = [[], []],
	            _sync = true,
	            phase = -1,
	            result;
	        guard();
	        _sync = false;
	        done();
	      }
	
	      EagerThenable.resolve = function (v) {
	        return isThenable(v) ? v : {
	          then: function then(resolve, reject) {
	            return resolve(v);
	          }
	        };
	      };
	
	      return EagerThenable;
	    }();
	    return new Function.prototype.$asyncbind.EagerThenable(boundThen);
	  }
	
	  if (catcher) {
	    if (Function.prototype.$asyncbind.wrapAsyncStack) catcher = Function.prototype.$asyncbind.wrapAsyncStack(catcher);
	    return then;
	  }
	
	  function then(result, error) {
	    try {
	      return result && result instanceof Object && typeof result.then === 'function' ? result.then(then, catcher) : resolver.call(self, result, error || catcher);
	    } catch (ex) {
	      return (error || catcher)(ex);
	    }
	  }
	
	  function boundThen(result, error) {
	    return resolver.call(self, result, error);
	  }
	
	  boundThen.then = boundThen;
	  return boundThen;
	};
	
	var DEFAULT_SERVER_ERROR_MESSAGE = 'Lost connection to server';
	
	function isSame(val1, val2) {
	  /* eslint-disable eqeqeq */
	  return val1 == val2 || val1 instanceof Date && val2 instanceof Date && val1.valueOf() == val2.valueOf();
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
	  var store = this;
	  (0, _mobx.action)(function () {
	    store.dataChanges.set(change.name, change.newValue);
	
	    if (store.isSame(store.dataChanges.get(change.name), store.dataServer[change.name])) {
	      store.dataChanges.delete(change.name);
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
	        store.options.log('[' + store.options.name + '] Observing computed property: ' + key);
	        var disposer = (0, _mobx.observe)(store.data, key, function (_ref) {
	          var newValue = _ref.newValue;
	          return store.storeDataChanged({ name: key, newValue: newValue });
	        });
	        store.observeComputedPropertiesDisposers.push(disposer);
	        // add or delete from dataChanges depending on whether value is same as in dataServer:
	        store.storeDataChanged({ name: key, newValue: store.data[key] });
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
	function processSaveResponse(store, updates, response) {
	  return new Promise(function ($return, $error) {
	    store.options.log('[' + store.options.name + '] Response received from server.');
	
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
	        }
	
	        // Supports an array of field names in error_field or a string
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
	
	    Object.assign(store.dataServer, updates);
	
	    (0, _mobx.action)(function () {
	      if (response.data) {
	        Object.assign(store.dataServer, response.data);
	        Object.assign(store.data, response.data);
	      }
	
	      store.dataChanges.forEach(function (value, key) {
	        if (store.isSame(value, store.dataServer[key])) {
	          store.dataChanges.delete(key);
	        }
	      });
	    })();
	
	    function $IfStatement_3() {
	
	      return $return(response.status);
	    }
	
	    if (typeof store.options.afterSave === 'function') {
	      return store.options.afterSave(store, updates, response).then(function ($await_9) {
	        return $IfStatement_3.call(this);
	      }.$asyncbind(this, $error), $error);
	    }return $IfStatement_3.call(this);
	  }.$asyncbind(this));
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
	
	var FormStore = (_class = function () {
	  // stores validation error message if any for each field (data structure is identical to data)
	  // stores both communication error and any explicit response.error returned to save
	
	  /** @private */
	  // To support both Mobx 2.2+ and 3+, this is now done in constructor:
	  // @observable dataChanges = asMap(); // changes that will be sent to server
	
	  /** @private */
	
	  /** @private */
	
	
	  /** @private */
	
	  /**
	   * @private
	   * @type {Array<Function>}
	   */
	
	  /** @private */
	
	
	  /**
	   * @private
	   * @type {null|Date}
	   */
	  function FormStore(options, data) {
	    _classCallCheck(this, FormStore);
	
	    this.options = {
	      name: 'FormStore', // used in log statements
	      idProperty: null,
	      autoSaveOptions: { skipPropertyBeingEdited: true, keepServerError: true },
	      autoSaveInterval: 0, // in ms
	      minRefreshInterval: 0, // in ms
	      log: function noop() {},
	      logError: console.error.bind(console), // eslint-disable-line
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
	    this.observeComputedPropertiesDisposers = [];
	
	    _initDefineProp(this, 'isReady', _descriptor, this);
	
	    _initDefineProp(this, 'isLoading', _descriptor2, this);
	
	    _initDefineProp(this, 'isSaving', _descriptor3, this);
	
	    _initDefineProp(this, 'serverError', _descriptor4, this);
	
	    this.dataServer = {};
	
	    _initDefineProp(this, 'data', _descriptor5, this);
	
	    _initDefineProp(this, 'dataErrors', _descriptor6, this);
	
	    _initDefineProp(this, 'saveNotification', _descriptor7, this);
	
	    _initDefineProp(this, 'propertyBeingEdited', _descriptor8, this);
	
	    this.isSame = isSame;
	
	    var store = this;
	    Object.assign(store.options, options);
	    if (!data && typeof store.options.server.get !== 'function') {
	      throw new Error('options must specify server get function or supply initial data object to constructor');
	    }
	    if (!_typeof(store.options.server.create) !== 'function' && typeof store.options.server.set !== 'function') {
	      throw new Error('options must specify server set and/or create function(s)');
	    }
	    store.options.server.errorMessage = store.options.server.errorMessage || DEFAULT_SERVER_ERROR_MESSAGE;
	
	    // Supports both Mobx 3+ (observable.map) and 2.x (asMap) without deprecation warnings:
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
	      store.dataServer = data;
	      store.reset();
	      observeComputedProperties(store);
	      store.isReady = true;
	    }
	  }
	
	  /**
	   *  disposes of all internal observation/autoruns so this instance can be garbage-collected.
	   */
	  // property currently being edited as set by startEditing()
	
	  // active is set to true right after a save is completed and status is set to response.status
	  // this allows a confirmation message to be shown to user and to drive its dismissal,
	  // UI can set this observable's active property back to false.
	  // data returned by the server (kept for checking old values)
	
	  /** @private */
	  // true after initial data load (refresh) has completed
	  /** @private */
	
	  /** @private */
	
	  /** @private */
	
	  /** @private */
	
	  /** @private */
	
	
	  _createClass(FormStore, [{
	    key: 'dispose',
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
	    key: 'configAutoSave',
	    value: function configAutoSave(autoSaveInterval, autoSaveOptions) {
	      var store = this;
	      store.autorunDisposer && store.autorunDisposer();
	      store.options.autoSaveInterval = autoSaveInterval;
	      store.options.autoSaveOptions = autoSaveOptions || store.options.autoSaveOptions;
	
	      // auto-save by observing dataChanges keys
	      if (store.options.autoSaveInterval) {
	        // Supports both Mobx <=3 (autorunAsync) and Mobx 4+
	        // (ObservableMap keys no longer returning an Array is used to detect Mobx 4+,
	        // because in non-production build autorunAsync exists in 4.x to issue deprecation error)
	        var asyncAutorun = Array.isArray(store.dataChanges.keys()) ? _mobx.autorunAsync : function (fn, delay) {
	          return (0, _mobx.autorun)(fn, { delay: delay });
	        };
	
	        store.autorunDisposer = asyncAutorun(function () {
	          if ((!store.options.idProperty || store.data[store.options.idProperty]) && Array.from(store.dataChanges).length) {
	            store.options.log('[' + store.options.name + '] Auto-save started...');
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
	    key: 'startEditing',
	    value: function startEditing(name) {
	      var store = this;
	      store.propertyBeingEdited = Array.isArray(name) ? name[0] : name;
	    }
	
	    // to be called on field blur, any field name parameter is ignored
	
	  }, {
	    key: 'stopEditing',
	    value: function stopEditing() {
	      var store = this;
	      store.propertyBeingEdited = null;
	      if (store.status.hasChanges) {
	        // This will trigger autorun in case it already ran while we were editing:
	        (0, _mobx.action)(function () {
	          // In MobX 4+, ObservableMap.keys() returns an Iterable, not an array
	          var key = Array.from(store.dataChanges)[0][0];
	          var value = store.dataChanges.get(key);
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
	
	  }, {
	    key: 'getValue',
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
	    }
	
	    // Returns the last saved (or server-provided) set of data
	    // - in an afterSave callback it already includes merged updates that were not in error
	
	  }, {
	    key: 'getSavedData',
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
	    key: 'reset',
	
	
	    /**
	     * Copies dataServer into data and resets the error observable.
	     * Mostly for internal use by refresh().
	     * @param {Object} [data] Optionally set store.data to this object instead of copying dataServer
	     */
	    value: function reset(data) {
	      var store = this;
	
	      (0, _mobx.action)(function () {
	        store.data = data || Object.assign({}, store.dataServer);
	
	        // setup error observable
	        var temp = {};
	        Object.keys(store.data).forEach(function (key) {
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
	
	  }, {
	    key: 'refresh',
	    value: function refresh() {
	      return new Promise(function ($return, $error) {
	        var store, now, past, result;
	        store = this;
	
	        if (!store.options.server.get || store.isReady && store.options.idProperty && !store.data[store.options.idProperty]) {
	          return $return(false);
	        }
	        store.options.log('[' + store.options.name + '] Starting data refresh...');
	
	        if (store.isLoading) {
	          store.options.log('[' + store.options.name + '] Data is already being refreshed.');
	          return $return(false);
	        }
	
	        now = new Date();
	        past = new Date(Date.now() - store.options.minRefreshInterval);
	
	
	        // check if lastSync is between now and 15 minutes ago
	        if (past < store.lastSync && store.lastSync <= now) {
	          store.options.log('[' + store.options.name + '] Data refreshed within last ' + store.options.minRefreshInterval / 1000 + ' seconds.');
	          return $return(false);
	        }
	
	        function $IfStatement_4() {
	          function $IfStatement_5() {
	
	            store.options.log('[' + store.options.name + '] Refreshing data...');
	            store.isLoading = true;
	
	            function $Try_1_Post() {
	
	              store.isLoading = false;
	              return $return(true);
	            }
	
	            var $Try_1_Catch = function (err) {
	              handleError(store, err);
	              return $Try_1_Post.call(this);
	            }.$asyncbind(this, $error);
	
	            try {
	              return store.options.server.get().then(function ($await_10) {
	                result = $await_10;
	
	                store.options.log('[' + store.options.name + '] Data received from server.');
	
	                (0, _mobx.action)(function () {
	                  store.dataServer = result;
	                  store.serverError = null;
	                  store.lastSync = new Date();
	                  store.reset();
	                })();
	
	                function $IfStatement_6() {
	
	                  observeComputedProperties(store);
	
	                  store.options.log('[' + store.options.name + '] Refresh finished.');
	                  if (!store.isReady) store.isReady = true;
	                  return $Try_1_Post.call(this);
	                }
	
	                if (typeof store.options.afterRefresh === 'function') {
	                  return store.options.afterRefresh(store).then(function ($await_11) {
	                    return $IfStatement_6.call(this);
	                  }.$asyncbind(this, $Try_1_Catch), $Try_1_Catch);
	                }return $IfStatement_6.call(this);
	              }.$asyncbind(this, $Try_1_Catch), $Try_1_Catch);
	            } catch (err) {
	              $Try_1_Catch(err)
	            }
	          }
	
	          if (typeof store.options.beforeRefresh === 'function') {
	            return store.options.beforeRefresh(store).then(function ($await_12) {
	              if ($await_12 === false) {
	                return $return(false);
	              }
	              return $IfStatement_5.call(this);
	            }.$asyncbind(this, $error), $error);
	          }return $IfStatement_5.call(this);
	        }
	
	        if (store.status.hasChanges && (!store.options.idProperty || store.data[store.options.idProperty])) {
	          store.options.log('[' + store.options.name + '] Unsaved changes detected...');
	
	          return store.save().then(function ($await_13) {
	            if ($await_13) {
	              store.options.log('[' + store.options.name + '] Postponing refresh for ' + store.options.minRefreshInterval / 1000 + ' seconds.');
	              store.lastSync = new Date();
	              return $return(false);
	            }
	            return $IfStatement_4.call(this);
	          }.$asyncbind(this, $error), $error);
	        }return $IfStatement_4.call(this);
	      }.$asyncbind(this));
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
	
	  }, {
	    key: 'save',
	    value: function save() {
	      var _this = this;
	
	      var saveOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	      var _saveOptions$allowCre = saveOptions.allowCreate,
	          allowCreate = _saveOptions$allowCre === undefined ? false : _saveOptions$allowCre,
	          _saveOptions$saveAll = saveOptions.saveAll,
	          saveAll = _saveOptions$saveAll === undefined ? false : _saveOptions$saveAll,
	          _saveOptions$skipProp = saveOptions.skipPropertyBeingEdited,
	          skipPropertyBeingEdited = _saveOptions$skipProp === undefined ? false : _saveOptions$skipProp,
	          _saveOptions$keepServ = saveOptions.keepServerError,
	          keepServerError = _saveOptions$keepServ === undefined ? false : _saveOptions$keepServ;
	
	      var store = this;
	
	      store.saveQueue = store.saveQueue.then(function () {
	        return new Promise(function ($return, $error) {
	          var updates = void 0;
	
	          if (store.options.idProperty && !store.data[store.options.idProperty] && !allowCreate) {
	            return $return(false);
	          }
	          store.options.log('[' + store.options.name + '] Starting data save...');
	
	          if (saveAll) {
	            updates = Object.assign({}, store.data);
	          } else {
	            // Mobx 4+ toJS() exports a Map, not an Object and toJSON is the 'legacy' method to export an Object
	            updates = store.dataChanges.toJSON ? store.dataChanges.toJSON() : store.dataChanges.toJS();
	
	            if (Object.keys(updates).length === 0) {
	              store.options.log('[' + store.options.name + '] No changes to save.');
	              return $return(false);
	            }
	
	            // check if we have property currently being edited in changes
	            // or if a property has an error
	            Object.keys(updates).forEach(function (property) {
	              if (skipPropertyBeingEdited && property === store.propertyBeingEdited) {
	                store.options.log('[' + store.options.name + '] Property "' + property + '" is being edited.');
	                delete updates[property];
	                return;
	              }
	
	              if (store.dataErrors[property]) {
	                store.options.log('[' + store.options.name + '] Property "' + property + '" is not validated.');
	                delete updates[property];
	                return;
	              }
	
	              if (store.isSame(updates[property], store.dataServer[property])) {
	                store.options.log('[' + store.options.name + '] Property "' + property + '" is same as on the server.');
	                delete updates[property];
	                store.dataChanges.delete(property);
	              }
	            });
	
	            if (Object.keys(updates).length === 0) {
	              store.options.log('[' + store.options.name + '] No changes ready to save.');
	              return $return(false);
	            }
	          }
	
	          function $IfStatement_7() {
	
	            store.options.log('[' + store.options.name + '] Saving data...');
	            store.options.log(updates);
	            store.isSaving = true;
	
	            function $Try_2_Post() {
	
	              store.isSaving = false;
	              return $return(true);
	            }
	
	            var $Try_2_Catch = function (err) {
	              handleError(store, err);
	              return $Try_2_Post.call(this);
	            }.$asyncbind(this, $error);
	
	            try {
	              var $IfStatement_8 = function $IfStatement_8() {
	                return processSaveResponse(store, updates, response).then(function ($await_14) {
	
	                  store.saveNotification.status = $await_14;
	                  store.saveNotification.active = true;
	
	                  store.options.log('[' + store.options.name + '] Save finished.');
	                  return $Try_2_Post.call(this);
	                }.$asyncbind(this, $Try_2_Catch), $Try_2_Catch);
	              };
	
	              var response = void 0;
	
	              if (!keepServerError) {
	                store.serverError = null;
	              }
	
	              if (store.options.server.set && (!store.options.idProperty || !store.options.server.create || store.data[store.options.idProperty])) {
	                return store.options.server.set(updates).then(function ($await_15) {
	                  response = $await_15;
	                  return $IfStatement_8.call(this);
	                }.$asyncbind(this, $Try_2_Catch), $Try_2_Catch);
	              } else {
	                return store.options.server.create(updates).then(function ($await_16) {
	                  response = $await_16;
	                  return $IfStatement_8.call(this);
	                }.$asyncbind(this, $Try_2_Catch), $Try_2_Catch);
	              }
	            } catch (err) {
	              $Try_2_Catch(err)
	            }
	          }
	
	          if (typeof store.options.beforeSave === 'function') {
	            return store.options.beforeSave(store, updates, saveOptions).then(function ($await_17) {
	              if ($await_17 === false) {
	                return $return(false);
	              }
	              return $IfStatement_7.call(this);
	            }.$asyncbind(this, $error), $error);
	          }return $IfStatement_7.call(this);
	        }.$asyncbind(_this));
	      });
	
	      return store.saveQueue;
	    }
	  }, {
	    key: 'status',
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
	        hasChanges: !!store.dataChanges.size
	      };
	      if (typeof store.options.isReadOnly === 'function') {
	        status.isReadOnly = store.options.isReadOnly(status);
	      } else {
	        status.isReadOnly = store.options.isReadOnly;
	      }
	      return status;
	    }
	  }]);
	
	  return FormStore;
	}(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'isReady', [_mobx.observable], {
	  enumerable: true,
	  initializer: function initializer() {
	    return false;
	  }
	}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'isLoading', [_mobx.observable], {
	  enumerable: true,
	  initializer: function initializer() {
	    return false;
	  }
	}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, 'isSaving', [_mobx.observable], {
	  enumerable: true,
	  initializer: function initializer() {
	    return false;
	  }
	}), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, 'serverError', [_mobx.observable], {
	  enumerable: true,
	  initializer: function initializer() {
	    return null;
	  }
	}), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, 'data', [_mobx.observable], {
	  enumerable: true,
	  initializer: function initializer() {
	    return {};
	  }
	}), _descriptor6 = _applyDecoratedDescriptor(_class.prototype, 'dataErrors', [_mobx.observable], {
	  enumerable: true,
	  initializer: function initializer() {
	    return {};
	  }
	}), _descriptor7 = _applyDecoratedDescriptor(_class.prototype, 'saveNotification', [_mobx.observable], {
	  enumerable: true,
	  initializer: function initializer() {
	    return { active: false, status: null };
	  }
	}), _descriptor8 = _applyDecoratedDescriptor(_class.prototype, 'propertyBeingEdited', [_mobx.observable], {
	  enumerable: true,
	  initializer: function initializer() {
	    return null;
	  }
	}), _applyDecoratedDescriptor(_class.prototype, 'status', [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, 'status'), _class.prototype)), _class);
	exports.default = FormStore;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	
	
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	
	
	
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	process.prependListener = noop;
	process.prependOnceListener = noop;
	
	process.listeners = function (name) { return [] }
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ }),
/* 2 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ })
/******/ ])
});
;
//# sourceMappingURL=FormStore.js.map