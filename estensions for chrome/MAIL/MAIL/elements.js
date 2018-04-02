/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!**********************!*\
  !*** multi elements ***!
  \**********************/
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(/*! ./src/index.tsx */41);


/***/ }),
/* 1 */
/*!************************************************!*\
  !*** ./~/core-decorators/lib/private/utils.js ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var _slice = Array.prototype.slice;

	var _createDecoratedClass = (function () { function defineProperties(target, descriptors, initializers) { for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === 'function') { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator); } } if (descriptor.initializer !== undefined) { initializers[key] = descriptor; continue; } } Object.defineProperty(target, key, descriptor); } } return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) { if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers); if (staticProps) defineProperties(Constructor, staticProps, staticInitializers); return Constructor; }; })();

	exports.isDescriptor = isDescriptor;
	exports.decorate = decorate;
	exports.metaFor = metaFor;
	exports.getOwnPropertyDescriptors = getOwnPropertyDescriptors;
	exports.createDefaultSetter = createDefaultSetter;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _defineDecoratedPropertyDescriptor(target, key, descriptors) { var _descriptor = descriptors[key]; if (!_descriptor) return; var descriptor = {}; for (var _key in _descriptor) descriptor[_key] = _descriptor[_key]; descriptor.value = descriptor.initializer ? descriptor.initializer.call(target) : undefined; Object.defineProperty(target, key, descriptor); }

	var _lazyInitialize = __webpack_require__(/*! ../lazy-initialize */ 11);

	var _lazyInitialize2 = _interopRequireDefault(_lazyInitialize);

	var defineProperty = Object.defineProperty;
	var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
	var getOwnPropertyNames = Object.getOwnPropertyNames;
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;

	function isDescriptor(desc) {
	  if (!desc || !desc.hasOwnProperty) {
	    return false;
	  }

	  var keys = ['value', 'initializer', 'get', 'set'];

	  for (var i = 0, l = keys.length; i < l; i++) {
	    if (desc.hasOwnProperty(keys[i])) {
	      return true;
	    }
	  }

	  return false;
	}

	function decorate(handleDescriptor, entryArgs) {
	  if (isDescriptor(entryArgs[entryArgs.length - 1])) {
	    return handleDescriptor.apply(undefined, _toConsumableArray(entryArgs).concat([[]]));
	  } else {
	    return function () {
	      return handleDescriptor.apply(undefined, _slice.call(arguments).concat([entryArgs]));
	    };
	  }
	}

	var Meta = (function () {
	  var _instanceInitializers = {};

	  function Meta() {
	    _classCallCheck(this, Meta);

	    _defineDecoratedPropertyDescriptor(this, 'debounceTimeoutIds', _instanceInitializers);

	    _defineDecoratedPropertyDescriptor(this, 'throttleTimeoutIds', _instanceInitializers);

	    _defineDecoratedPropertyDescriptor(this, 'throttlePreviousTimestamps', _instanceInitializers);

	    _defineDecoratedPropertyDescriptor(this, 'throttleTrailingArgs', _instanceInitializers);
	  }

	  _createDecoratedClass(Meta, [{
	    key: 'debounceTimeoutIds',
	    decorators: [_lazyInitialize2['default']],
	    initializer: function initializer() {
	      return {};
	    },
	    enumerable: true
	  }, {
	    key: 'throttleTimeoutIds',
	    decorators: [_lazyInitialize2['default']],
	    initializer: function initializer() {
	      return {};
	    },
	    enumerable: true
	  }, {
	    key: 'throttlePreviousTimestamps',
	    decorators: [_lazyInitialize2['default']],
	    initializer: function initializer() {
	      return {};
	    },
	    enumerable: true
	  }, {
	    key: 'throttleTrailingArgs',
	    decorators: [_lazyInitialize2['default']],
	    initializer: function initializer() {
	      return null;
	    },
	    enumerable: true
	  }], null, _instanceInitializers);

	  return Meta;
	})();

	var META_KEY = typeof Symbol === 'function' ? Symbol('__core_decorators__') : '__core_decorators__';

	function metaFor(obj) {
	  if (obj.hasOwnProperty(META_KEY) === false) {
	    defineProperty(obj, META_KEY, {
	      // Defaults: NOT enumerable, configurable, or writable
	      value: new Meta()
	    });
	  }

	  return obj[META_KEY];
	}

	var getOwnKeys = getOwnPropertySymbols ? function (object) {
	  return getOwnPropertyNames(object).concat(getOwnPropertySymbols(object));
	} : getOwnPropertyNames;

	exports.getOwnKeys = getOwnKeys;

	function getOwnPropertyDescriptors(obj) {
	  var descs = {};

	  getOwnKeys(obj).forEach(function (key) {
	    return descs[key] = getOwnPropertyDescriptor(obj, key);
	  });

	  return descs;
	}

	function createDefaultSetter(key) {
	  return function set(newValue) {
	    Object.defineProperty(this, key, {
	      configurable: true,
	      writable: true,
	      // IS enumerable when reassigned by the outside word
	      enumerable: true,
	      value: newValue
	    });

	    return newValue;
	  };
	}

/***/ }),
/* 2 */
/*!*********************************!*\
  !*** ./src/elements/inc/dom.ts ***!
  \*********************************/
/***/ (function(module, exports) {

	"use strict";
	const isStringLike = function (target) {
	    return ['string', 'number', 'boolean'].includes(typeof target) || target instanceof String;
	};
	const setAttributes = function (target, attrs) {
	    if (!attrs) {
	        return;
	    }
	    if ('object' === typeof attrs) {
	        for (let i in attrs) {
	            switch (true) {
	                case !attrs.hasOwnProperty(i):
	                    continue;
	                case i.substring(0, 2) === 'on' && 'function' === typeof attrs[i]:
	                    const eventName = i.substring(2).toLowerCase();
	                    if (eventName.length) {
	                        target.addEventListener(eventName, attrs[i]);
	                    }
	                    break;
	                case isStringLike(attrs[i]):
	                    target.setAttribute(i, attrs[i]);
	                    break;
	                default:
	            }
	        }
	    }
	};
	exports.dom = {
	    createElement: function (tagName, attrs, ...dom) {
	        const res = document.createElement(tagName);
	        setAttributes(res, attrs);
	        for (let i of dom) {
	            switch (true) {
	                case isStringLike(i):
	                    res.appendChild(document.createTextNode(i));
	                    break;
	                case (i instanceof Element):
	                    res.appendChild(i);
	                    break;
	                case Array.isArray(i):
	                    i.forEach((cv) => { res.appendChild(cv); });
	                    break;
	                default:
	            }
	        }
	        return res;
	    }
	};


/***/ }),
/* 3 */
/*!***********************!*\
  !*** ./src/config.ts ***!
  \***********************/
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	const target_1 = __webpack_require__(/*! target */ 10);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = {
	    TARGET: ("production"),
	    BROWSER: ("chrome"),
	    DEFAULT_HOME_PAGE: 'https://temp-mail.org/',
	    SITE: `${target_1.default.SITE_SCHEMA}://${target_1.default.SITE_HOSTNAME}/`,
	    ENDPOINT: `${target_1.default.API_SCHEMA}://${target_1.default.API_HOSTNAME}/request/`,
	    API_SYNC_INTERVAL: target_1.default.API_SYNC_INTERVAL,
	    API_SYNC_DELAY: target_1.default.API_SYNC_DELAY,
	    API_SYNC_SLOW_INTERVAL: target_1.default.API_SYNC_SLOW_INTERVAL,
	    API_USER: target_1.default.API_USER,
	    API_PWD: target_1.default.API_PWD,
	    STORE_HOMEPAGE_URL: {
	        'chrome': 'https://chrome.google.com/webstore/detail/inojafojbhdpnehkhhfjalgjjobnhomj/reviews',
	        'opera': 'https://addons.opera.com/extensions/details/temp-mail-disposable-temporary-email',
	        'firefox': 'https://addons.mozilla.org/firefox/addon/temp-mail'
	    },
	    locales: {
	        'en': 'en',
	        'en_GB': 'en',
	        'en_US': 'en',
	        'es': 'es',
	        'es_419': 'es',
	        'nl': 'nl',
	        'de': 'de',
	        'fr': 'fr',
	        'it': 'it',
	        'pl': 'pl',
	        'pt_PT': 'pt',
	        'pt_BR': 'pt',
	        'ru': 'ru',
	        'sr': 'sr',
	        'tr': 'tr',
	        'uk': 'uk',
	        'ar': 'ar'
	    }
	};


/***/ }),
/* 4 */
/*!******************************!*\
  !*** ./~/charenc/charenc.js ***!
  \******************************/
/***/ (function(module, exports) {

	var charenc = {
	  // UTF-8 encoding
	  utf8: {
	    // Convert a string to a byte array
	    stringToBytes: function(str) {
	      return charenc.bin.stringToBytes(unescape(encodeURIComponent(str)));
	    },

	    // Convert a byte array to a string
	    bytesToString: function(bytes) {
	      return decodeURIComponent(escape(charenc.bin.bytesToString(bytes)));
	    }
	  },

	  // Binary encoding
	  bin: {
	    // Convert a string to a byte array
	    stringToBytes: function(str) {
	      for (var bytes = [], i = 0; i < str.length; i++)
	        bytes.push(str.charCodeAt(i) & 0xFF);
	      return bytes;
	    },

	    // Convert a byte array to a string
	    bytesToString: function(bytes) {
	      for (var str = [], i = 0; i < bytes.length; i++)
	        str.push(String.fromCharCode(bytes[i]));
	      return str.join('');
	    }
	  }
	};

	module.exports = charenc;


/***/ }),
/* 5 */
/*!**************************!*\
  !*** ./src/utils/api.ts ***!
  \**************************/
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	const md5 = __webpack_require__(/*! md5 */ 9);
	const config_1 = __webpack_require__(/*! ../config */ 3);
	const _ = chrome.i18n.getMessage;
	class Api {
	    uuid() {
	        const set = '0123456789abcdefghijklmnopqrstuvwxyz';
	        const uuid = 'xxxxx'.replace(/[xy]/g, function (c) {
	            let d = new Date().getTime();
	            if (window.performance && typeof window.performance.now === 'function') {
	                d += window.performance.now();
	            }
	            const r = Math.floor((d + Math.random() * set.length)) % set.length;
	            return set[r];
	        });
	        return uuid;
	    }
	    constructor(endpoint, user, pwd) {
	        this.setEndpoint(endpoint);
	        this.user = user;
	        this.pwd = pwd;
	    }
	    setEndpoint(url) {
	        this.endpoint = url;
	    }
	    getCurrentMail() {
	        return new Promise((resolve, reject) => {
	            chrome.storage.local.get('email', (storage) => {
	                if (storage.email) {
	                    resolve(storage.email);
	                }
	                else {
	                    this.generateMail().then((email) => {
	                        resolve(email);
	                    });
	                }
	            });
	        });
	    }
	    openReadMailTab() {
	        this.getCurrentMail().then((mail) => {
	            const locale = _('@@ui_locale');
	            if (locale in config_1.default.locales) {
	                chrome.tabs.create({ url: `${config_1.default.SITE}${config_1.default.locales[locale]}/?email=${mail}` });
	            }
	            else {
	                chrome.tabs.create({ url: `${config_1.default.SITE}?email=${mail}` });
	            }
	            if (config_1.default.BROWSER = 'firefox') {
	                window.close();
	            }
	        });
	    }
	    fetch(endpoint) {
	        return window.fetch(this.endpoint + endpoint, { headers: { 'Authorization': 'Basic ' + btoa(`${this.user}:${this.pwd}`) } });
	    }
	    generateMail() {
	        return new Promise((resolve, reject) => {
	            chrome.storage.local.get('domains', (storage) => {
	                const user = this.uuid();
	                if (storage.domains && storage.domains.length) {
	                    const domain = storage.domains[Math.floor(Math.random() * storage.domains.length)];
	                    const email = user + domain;
	                    chrome.storage.local.set({ email });
	                    resolve(email);
	                }
	                else {
	                    this.getDomainsList().then((domains) => {
	                        const domain = domains[Math.floor(Math.random() * domains.length)];
	                        const email = user + domain;
	                        chrome.storage.local.set({ email });
	                        resolve(email);
	                    });
	                }
	            });
	        });
	    }
	    getDomainsList() {
	        return new Promise((resolve, reject) => {
	            this.fetch('domains/format/json/')
	                .then((response) => {
	                const domains = response.json();
	                chrome.storage.local.set({ domains });
	                resolve(domains);
	            })
	                .catch((err) => {
	                console.log(err);
	                resolve([]);
	            });
	        });
	    }
	    getMailList(email) {
	        return new Promise((resolve, reject) => {
	            if (!email) {
	                resolve([]);
	                return;
	            }
	            this.fetch('mail/id/' + md5(email) + '/format/json/')
	                .then((response) => {
	                const mail_list = response.json();
	                resolve(mail_list);
	            })
	                .catch((error) => {
	                console.log(error);
	                resolve([]);
	            });
	        });
	    }
	}
	exports.Api = Api;
	;


/***/ }),
/* 6 */
/*!**************************************************!*\
  !*** ./~/core-decorators/lib/core-decorators.js ***!
  \**************************************************/
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * core-decorators.js
	 * (c) 2016 Jay Phelps and contributors
	 * MIT Licensed
	 * https://github.com/jayphelps/core-decorators.js
	 * @license
	 */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

	var _override = __webpack_require__(/*! ./override */ 23);

	exports.override = _interopRequire(_override);

	var _deprecate = __webpack_require__(/*! ./deprecate */ 16);

	exports.deprecate = _interopRequire(_deprecate);
	exports.deprecated = _interopRequire(_deprecate);

	var _suppressWarnings = __webpack_require__(/*! ./suppress-warnings */ 25);

	exports.suppressWarnings = _interopRequire(_suppressWarnings);

	var _memoize = __webpack_require__(/*! ./memoize */ 19);

	exports.memoize = _interopRequire(_memoize);

	var _autobind = __webpack_require__(/*! ./autobind */ 13);

	exports.autobind = _interopRequire(_autobind);

	var _readonly = __webpack_require__(/*! ./readonly */ 24);

	exports.readonly = _interopRequire(_readonly);

	var _enumerable = __webpack_require__(/*! ./enumerable */ 17);

	exports.enumerable = _interopRequire(_enumerable);

	var _nonenumerable = __webpack_require__(/*! ./nonenumerable */ 22);

	exports.nonenumerable = _interopRequire(_nonenumerable);

	var _nonconfigurable = __webpack_require__(/*! ./nonconfigurable */ 21);

	exports.nonconfigurable = _interopRequire(_nonconfigurable);

	var _debounce = __webpack_require__(/*! ./debounce */ 14);

	exports.debounce = _interopRequire(_debounce);

	var _throttle = __webpack_require__(/*! ./throttle */ 26);

	exports.throttle = _interopRequire(_throttle);

	var _decorate = __webpack_require__(/*! ./decorate */ 15);

	exports.decorate = _interopRequire(_decorate);

	var _mixin = __webpack_require__(/*! ./mixin */ 20);

	exports.mixin = _interopRequire(_mixin);
	exports.mixins = _interopRequire(_mixin);

	var _lazyInitialize = __webpack_require__(/*! ./lazy-initialize */ 11);

	exports.lazyInitialize = _interopRequire(_lazyInitialize);

	var _time = __webpack_require__(/*! ./time */ 27);

	exports.time = _interopRequire(_time);

	var _extendDescriptor = __webpack_require__(/*! ./extendDescriptor */ 18);

	exports.extendDescriptor = _interopRequire(_extendDescriptor);

	// Helper to apply decorators to a class without transpiler support

	var _applyDecorators = __webpack_require__(/*! ./applyDecorators */ 12);

	exports.applyDecorators = _interopRequire(_applyDecorators);

/***/ }),
/* 7 */
/*!**************************!*\
  !*** ./~/crypt/crypt.js ***!
  \**************************/
/***/ (function(module, exports) {

	(function() {
	  var base64map
	      = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',

	  crypt = {
	    // Bit-wise rotation left
	    rotl: function(n, b) {
	      return (n << b) | (n >>> (32 - b));
	    },

	    // Bit-wise rotation right
	    rotr: function(n, b) {
	      return (n << (32 - b)) | (n >>> b);
	    },

	    // Swap big-endian to little-endian and vice versa
	    endian: function(n) {
	      // If number given, swap endian
	      if (n.constructor == Number) {
	        return crypt.rotl(n, 8) & 0x00FF00FF | crypt.rotl(n, 24) & 0xFF00FF00;
	      }

	      // Else, assume array and swap all items
	      for (var i = 0; i < n.length; i++)
	        n[i] = crypt.endian(n[i]);
	      return n;
	    },

	    // Generate an array of any length of random bytes
	    randomBytes: function(n) {
	      for (var bytes = []; n > 0; n--)
	        bytes.push(Math.floor(Math.random() * 256));
	      return bytes;
	    },

	    // Convert a byte array to big-endian 32-bit words
	    bytesToWords: function(bytes) {
	      for (var words = [], i = 0, b = 0; i < bytes.length; i++, b += 8)
	        words[b >>> 5] |= bytes[i] << (24 - b % 32);
	      return words;
	    },

	    // Convert big-endian 32-bit words to a byte array
	    wordsToBytes: function(words) {
	      for (var bytes = [], b = 0; b < words.length * 32; b += 8)
	        bytes.push((words[b >>> 5] >>> (24 - b % 32)) & 0xFF);
	      return bytes;
	    },

	    // Convert a byte array to a hex string
	    bytesToHex: function(bytes) {
	      for (var hex = [], i = 0; i < bytes.length; i++) {
	        hex.push((bytes[i] >>> 4).toString(16));
	        hex.push((bytes[i] & 0xF).toString(16));
	      }
	      return hex.join('');
	    },

	    // Convert a hex string to a byte array
	    hexToBytes: function(hex) {
	      for (var bytes = [], c = 0; c < hex.length; c += 2)
	        bytes.push(parseInt(hex.substr(c, 2), 16));
	      return bytes;
	    },

	    // Convert a byte array to a base-64 string
	    bytesToBase64: function(bytes) {
	      for (var base64 = [], i = 0; i < bytes.length; i += 3) {
	        var triplet = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
	        for (var j = 0; j < 4; j++)
	          if (i * 8 + j * 6 <= bytes.length * 8)
	            base64.push(base64map.charAt((triplet >>> 6 * (3 - j)) & 0x3F));
	          else
	            base64.push('=');
	      }
	      return base64.join('');
	    },

	    // Convert a base-64 string to a byte array
	    base64ToBytes: function(base64) {
	      // Remove non-base-64 characters
	      base64 = base64.replace(/[^A-Z0-9+\/]/ig, '');

	      for (var bytes = [], i = 0, imod4 = 0; i < base64.length;
	          imod4 = ++i % 4) {
	        if (imod4 == 0) continue;
	        bytes.push(((base64map.indexOf(base64.charAt(i - 1))
	            & (Math.pow(2, -2 * imod4 + 8) - 1)) << (imod4 * 2))
	            | (base64map.indexOf(base64.charAt(i)) >>> (6 - imod4 * 2)));
	      }
	      return bytes;
	    }
	  };

	  module.exports = crypt;
	})();


/***/ }),
/* 8 */
/*!******************************!*\
  !*** ./~/is-buffer/index.js ***!
  \******************************/
/***/ (function(module, exports) {

	/*!
	 * Determine if an object is a Buffer
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */

	// The _isBuffer check is for Safari 5-7 support, because it's missing
	// Object.prototype.constructor. Remove this eventually
	module.exports = function (obj) {
	  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
	}

	function isBuffer (obj) {
	  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
	}

	// For Node v0.10 support. Remove this eventually.
	function isSlowBuffer (obj) {
	  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
	}


/***/ }),
/* 9 */
/*!**********************!*\
  !*** ./~/md5/md5.js ***!
  \**********************/
/***/ (function(module, exports, __webpack_require__) {

	(function(){
	  var crypt = __webpack_require__(/*! crypt */ 7),
	      utf8 = __webpack_require__(/*! charenc */ 4).utf8,
	      isBuffer = __webpack_require__(/*! is-buffer */ 8),
	      bin = __webpack_require__(/*! charenc */ 4).bin,

	  // The core
	  md5 = function (message, options) {
	    // Convert to byte array
	    if (message.constructor == String)
	      if (options && options.encoding === 'binary')
	        message = bin.stringToBytes(message);
	      else
	        message = utf8.stringToBytes(message);
	    else if (isBuffer(message))
	      message = Array.prototype.slice.call(message, 0);
	    else if (!Array.isArray(message))
	      message = message.toString();
	    // else, assume byte array already

	    var m = crypt.bytesToWords(message),
	        l = message.length * 8,
	        a =  1732584193,
	        b = -271733879,
	        c = -1732584194,
	        d =  271733878;

	    // Swap endian
	    for (var i = 0; i < m.length; i++) {
	      m[i] = ((m[i] <<  8) | (m[i] >>> 24)) & 0x00FF00FF |
	             ((m[i] << 24) | (m[i] >>>  8)) & 0xFF00FF00;
	    }

	    // Padding
	    m[l >>> 5] |= 0x80 << (l % 32);
	    m[(((l + 64) >>> 9) << 4) + 14] = l;

	    // Method shortcuts
	    var FF = md5._ff,
	        GG = md5._gg,
	        HH = md5._hh,
	        II = md5._ii;

	    for (var i = 0; i < m.length; i += 16) {

	      var aa = a,
	          bb = b,
	          cc = c,
	          dd = d;

	      a = FF(a, b, c, d, m[i+ 0],  7, -680876936);
	      d = FF(d, a, b, c, m[i+ 1], 12, -389564586);
	      c = FF(c, d, a, b, m[i+ 2], 17,  606105819);
	      b = FF(b, c, d, a, m[i+ 3], 22, -1044525330);
	      a = FF(a, b, c, d, m[i+ 4],  7, -176418897);
	      d = FF(d, a, b, c, m[i+ 5], 12,  1200080426);
	      c = FF(c, d, a, b, m[i+ 6], 17, -1473231341);
	      b = FF(b, c, d, a, m[i+ 7], 22, -45705983);
	      a = FF(a, b, c, d, m[i+ 8],  7,  1770035416);
	      d = FF(d, a, b, c, m[i+ 9], 12, -1958414417);
	      c = FF(c, d, a, b, m[i+10], 17, -42063);
	      b = FF(b, c, d, a, m[i+11], 22, -1990404162);
	      a = FF(a, b, c, d, m[i+12],  7,  1804603682);
	      d = FF(d, a, b, c, m[i+13], 12, -40341101);
	      c = FF(c, d, a, b, m[i+14], 17, -1502002290);
	      b = FF(b, c, d, a, m[i+15], 22,  1236535329);

	      a = GG(a, b, c, d, m[i+ 1],  5, -165796510);
	      d = GG(d, a, b, c, m[i+ 6],  9, -1069501632);
	      c = GG(c, d, a, b, m[i+11], 14,  643717713);
	      b = GG(b, c, d, a, m[i+ 0], 20, -373897302);
	      a = GG(a, b, c, d, m[i+ 5],  5, -701558691);
	      d = GG(d, a, b, c, m[i+10],  9,  38016083);
	      c = GG(c, d, a, b, m[i+15], 14, -660478335);
	      b = GG(b, c, d, a, m[i+ 4], 20, -405537848);
	      a = GG(a, b, c, d, m[i+ 9],  5,  568446438);
	      d = GG(d, a, b, c, m[i+14],  9, -1019803690);
	      c = GG(c, d, a, b, m[i+ 3], 14, -187363961);
	      b = GG(b, c, d, a, m[i+ 8], 20,  1163531501);
	      a = GG(a, b, c, d, m[i+13],  5, -1444681467);
	      d = GG(d, a, b, c, m[i+ 2],  9, -51403784);
	      c = GG(c, d, a, b, m[i+ 7], 14,  1735328473);
	      b = GG(b, c, d, a, m[i+12], 20, -1926607734);

	      a = HH(a, b, c, d, m[i+ 5],  4, -378558);
	      d = HH(d, a, b, c, m[i+ 8], 11, -2022574463);
	      c = HH(c, d, a, b, m[i+11], 16,  1839030562);
	      b = HH(b, c, d, a, m[i+14], 23, -35309556);
	      a = HH(a, b, c, d, m[i+ 1],  4, -1530992060);
	      d = HH(d, a, b, c, m[i+ 4], 11,  1272893353);
	      c = HH(c, d, a, b, m[i+ 7], 16, -155497632);
	      b = HH(b, c, d, a, m[i+10], 23, -1094730640);
	      a = HH(a, b, c, d, m[i+13],  4,  681279174);
	      d = HH(d, a, b, c, m[i+ 0], 11, -358537222);
	      c = HH(c, d, a, b, m[i+ 3], 16, -722521979);
	      b = HH(b, c, d, a, m[i+ 6], 23,  76029189);
	      a = HH(a, b, c, d, m[i+ 9],  4, -640364487);
	      d = HH(d, a, b, c, m[i+12], 11, -421815835);
	      c = HH(c, d, a, b, m[i+15], 16,  530742520);
	      b = HH(b, c, d, a, m[i+ 2], 23, -995338651);

	      a = II(a, b, c, d, m[i+ 0],  6, -198630844);
	      d = II(d, a, b, c, m[i+ 7], 10,  1126891415);
	      c = II(c, d, a, b, m[i+14], 15, -1416354905);
	      b = II(b, c, d, a, m[i+ 5], 21, -57434055);
	      a = II(a, b, c, d, m[i+12],  6,  1700485571);
	      d = II(d, a, b, c, m[i+ 3], 10, -1894986606);
	      c = II(c, d, a, b, m[i+10], 15, -1051523);
	      b = II(b, c, d, a, m[i+ 1], 21, -2054922799);
	      a = II(a, b, c, d, m[i+ 8],  6,  1873313359);
	      d = II(d, a, b, c, m[i+15], 10, -30611744);
	      c = II(c, d, a, b, m[i+ 6], 15, -1560198380);
	      b = II(b, c, d, a, m[i+13], 21,  1309151649);
	      a = II(a, b, c, d, m[i+ 4],  6, -145523070);
	      d = II(d, a, b, c, m[i+11], 10, -1120210379);
	      c = II(c, d, a, b, m[i+ 2], 15,  718787259);
	      b = II(b, c, d, a, m[i+ 9], 21, -343485551);

	      a = (a + aa) >>> 0;
	      b = (b + bb) >>> 0;
	      c = (c + cc) >>> 0;
	      d = (d + dd) >>> 0;
	    }

	    return crypt.endian([a, b, c, d]);
	  };

	  // Auxiliary functions
	  md5._ff  = function (a, b, c, d, x, s, t) {
	    var n = a + (b & c | ~b & d) + (x >>> 0) + t;
	    return ((n << s) | (n >>> (32 - s))) + b;
	  };
	  md5._gg  = function (a, b, c, d, x, s, t) {
	    var n = a + (b & d | c & ~d) + (x >>> 0) + t;
	    return ((n << s) | (n >>> (32 - s))) + b;
	  };
	  md5._hh  = function (a, b, c, d, x, s, t) {
	    var n = a + (b ^ c ^ d) + (x >>> 0) + t;
	    return ((n << s) | (n >>> (32 - s))) + b;
	  };
	  md5._ii  = function (a, b, c, d, x, s, t) {
	    var n = a + (c ^ (b | ~d)) + (x >>> 0) + t;
	    return ((n << s) | (n >>> (32 - s))) + b;
	  };

	  // Package private blocksize
	  md5._blocksize = 16;
	  md5._digestsize = 16;

	  module.exports = function (message, options) {
	    if (message === undefined || message === null)
	      throw new Error('Illegal argument ' + message);

	    var digestbytes = crypt.wordsToBytes(md5(message, options));
	    return options && options.asBytes ? digestbytes :
	        options && options.asString ? bin.bytesToString(digestbytes) :
	        crypt.bytesToHex(digestbytes);
	  };

	})();


/***/ }),
/* 10 */
/*!***********************************!*\
  !*** ./src/targets/production.ts ***!
  \***********************************/
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = {
	    HOSTNAME: 'temp-mail.org/',
	    SITE_SCHEMA: 'https',
	    SITE_HOSTNAME: 'temp-mail.org',
	    API_SCHEMA: 'http',
	    API_HOSTNAME: 'api2.temp-mail.org',
	    API_SYNC_INTERVAL: 1000 * 10,
	    API_SYNC_DELAY: 1000 * 10 * 60,
	    API_SYNC_SLOW_INTERVAL: 1000 * 10 * 60,
	    API_USER: '8c8808a0-a47d-4091-9e3d-88e0603eb369',
	    API_PWD: 'jeY2STYb2'
	};


/***/ }),
/* 11 */
/*!**************************************************!*\
  !*** ./~/core-decorators/lib/lazy-initialize.js ***!
  \**************************************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = lazyInitialize;

	var _privateUtils = __webpack_require__(/*! ./private/utils */ 1);

	var defineProperty = Object.defineProperty;

	function handleDescriptor(target, key, descriptor) {
	  var configurable = descriptor.configurable;
	  var enumerable = descriptor.enumerable;
	  var initializer = descriptor.initializer;
	  var value = descriptor.value;

	  return {
	    configurable: configurable,
	    enumerable: enumerable,

	    get: function get() {
	      // This happens if someone accesses the
	      // property directly on the prototype
	      if (this === target) {
	        return;
	      }

	      var ret = initializer ? initializer.call(this) : value;

	      defineProperty(this, key, {
	        configurable: configurable,
	        enumerable: enumerable,
	        writable: true,
	        value: ret
	      });

	      return ret;
	    },

	    set: (0, _privateUtils.createDefaultSetter)(key)
	  };
	}

	function lazyInitialize() {
	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }

	  return (0, _privateUtils.decorate)(handleDescriptor, args);
	}

	module.exports = exports['default'];

/***/ }),
/* 12 */
/*!**************************************************!*\
  !*** ./~/core-decorators/lib/applyDecorators.js ***!
  \**************************************************/
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = applyDecorators;
	var defineProperty = Object.defineProperty;
	var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

	function applyDecorators(Class, props) {
	  var prototype = Class.prototype;

	  for (var key in props) {
	    var decorators = props[key];

	    for (var i = 0, l = decorators.length; i < l; i++) {
	      var decorator = decorators[i];

	      defineProperty(prototype, key, decorator(prototype, key, getOwnPropertyDescriptor(prototype, key)));
	    }
	  }

	  return Class;
	}

	module.exports = exports["default"];

/***/ }),
/* 13 */
/*!*******************************************!*\
  !*** ./~/core-decorators/lib/autobind.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = autobind;

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

	var _privateUtils = __webpack_require__(/*! ./private/utils */ 1);

	var defineProperty = Object.defineProperty;
	var getPrototypeOf = Object.getPrototypeOf;

	function bind(fn, context) {
	  if (fn.bind) {
	    return fn.bind(context);
	  } else {
	    return function __autobind__() {
	      return fn.apply(context, arguments);
	    };
	  }
	}

	var mapStore = undefined;

	function getBoundSuper(obj, fn) {
	  if (typeof WeakMap === 'undefined') {
	    throw new Error('Using @autobind on ' + fn.name + '() requires WeakMap support due to its use of super.' + fn.name + '()\n      See https://github.com/jayphelps/core-decorators.js/issues/20');
	  }

	  if (!mapStore) {
	    mapStore = new WeakMap();
	  }

	  if (mapStore.has(obj) === false) {
	    mapStore.set(obj, new WeakMap());
	  }

	  var superStore = mapStore.get(obj);

	  if (superStore.has(fn) === false) {
	    superStore.set(fn, bind(fn, obj));
	  }

	  return superStore.get(fn);
	}

	function autobindClass(klass) {
	  var descs = (0, _privateUtils.getOwnPropertyDescriptors)(klass.prototype);
	  var keys = (0, _privateUtils.getOwnKeys)(descs);

	  for (var i = 0, l = keys.length; i < l; i++) {
	    var key = keys[i];
	    var desc = descs[key];

	    if (typeof desc.value !== 'function' || key === 'constructor') {
	      continue;
	    }

	    defineProperty(klass.prototype, key, autobindMethod(klass.prototype, key, desc));
	  }
	}

	function autobindMethod(target, key, _ref) {
	  var fn = _ref.value;
	  var configurable = _ref.configurable;
	  var enumerable = _ref.enumerable;

	  if (typeof fn !== 'function') {
	    throw new SyntaxError('@autobind can only be used on functions, not: ' + fn);
	  }

	  var constructor = target.constructor;

	  return {
	    configurable: configurable,
	    enumerable: enumerable,

	    get: function get() {
	      // Class.prototype.key lookup
	      // Someone accesses the property directly on the prototype on which it is
	      // actually defined on, i.e. Class.prototype.hasOwnProperty(key)
	      if (this === target) {
	        return fn;
	      }

	      // Class.prototype.key lookup
	      // Someone accesses the property directly on a prototype but it was found
	      // up the chain, not defined directly on it
	      // i.e. Class.prototype.hasOwnProperty(key) == false && key in Class.prototype
	      if (this.constructor !== constructor && getPrototypeOf(this).constructor === constructor) {
	        return fn;
	      }

	      // Autobound method calling super.sameMethod() which is also autobound and so on.
	      if (this.constructor !== constructor && key in this.constructor.prototype) {
	        return getBoundSuper(this, fn);
	      }

	      var boundFn = bind(fn, this);

	      defineProperty(this, key, {
	        configurable: true,
	        writable: true,
	        // NOT enumerable when it's a bound method
	        enumerable: false,
	        value: boundFn
	      });

	      return boundFn;
	    },
	    set: (0, _privateUtils.createDefaultSetter)(key)
	  };
	}

	function handle(args) {
	  if (args.length === 1) {
	    return autobindClass.apply(undefined, _toConsumableArray(args));
	  } else {
	    return autobindMethod.apply(undefined, _toConsumableArray(args));
	  }
	}

	function autobind() {
	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }

	  if (args.length === 0) {
	    return function () {
	      return handle(arguments);
	    };
	  } else {
	    return handle(args);
	  }
	}

	module.exports = exports['default'];

/***/ }),
/* 14 */
/*!*******************************************!*\
  !*** ./~/core-decorators/lib/debounce.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports['default'] = debounce;

	var _privateUtils = __webpack_require__(/*! ./private/utils */ 1);

	var DEFAULT_TIMEOUT = 300;

	function handleDescriptor(target, key, descriptor, _ref) {
	  var _ref2 = _slicedToArray(_ref, 2);

	  var _ref2$0 = _ref2[0];
	  var wait = _ref2$0 === undefined ? DEFAULT_TIMEOUT : _ref2$0;
	  var _ref2$1 = _ref2[1];
	  var immediate = _ref2$1 === undefined ? false : _ref2$1;

	  var callback = descriptor.value;

	  if (typeof callback !== 'function') {
	    throw new SyntaxError('Only functions can be debounced');
	  }

	  return _extends({}, descriptor, {
	    value: function value() {
	      var _this = this;

	      var _metaFor = (0, _privateUtils.metaFor)(this);

	      var debounceTimeoutIds = _metaFor.debounceTimeoutIds;

	      var timeout = debounceTimeoutIds[key];
	      var callNow = immediate && !timeout;
	      var args = arguments;

	      clearTimeout(timeout);

	      debounceTimeoutIds[key] = setTimeout(function () {
	        delete debounceTimeoutIds[key];
	        if (!immediate) {
	          callback.apply(_this, args);
	        }
	      }, wait);

	      if (callNow) {
	        callback.apply(this, args);
	      }
	    }
	  });
	}

	function debounce() {
	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }

	  return (0, _privateUtils.decorate)(handleDescriptor, args);
	}

	module.exports = exports['default'];

/***/ }),
/* 15 */
/*!*******************************************!*\
  !*** ./~/core-decorators/lib/decorate.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = decorate;

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

	function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

	var _privateUtils = __webpack_require__(/*! ./private/utils */ 1);

	var defineProperty = Object.defineProperty;

	function handleDescriptor(target, key, descriptor, _ref) {
	  var _ref2 = _toArray(_ref);

	  var decorator = _ref2[0];

	  var args = _ref2.slice(1);

	  var configurable = descriptor.configurable;
	  var enumerable = descriptor.enumerable;
	  var writable = descriptor.writable;

	  var originalGet = descriptor.get;
	  var originalSet = descriptor.set;
	  var originalValue = descriptor.value;
	  var isGetter = !!originalGet;

	  return {
	    configurable: configurable,
	    enumerable: enumerable,
	    get: function get() {
	      var fn = isGetter ? originalGet.call(this) : originalValue;
	      var value = decorator.call.apply(decorator, [this, fn].concat(_toConsumableArray(args)));

	      if (isGetter) {
	        return value;
	      } else {
	        var desc = {
	          configurable: configurable,
	          enumerable: enumerable
	        };

	        desc.value = value;
	        desc.writable = writable;

	        defineProperty(this, key, desc);

	        return value;
	      }
	    },
	    set: isGetter ? originalSet : (0, _privateUtils.createDefaultSetter)()
	  };
	}

	function decorate() {
	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }

	  return (0, _privateUtils.decorate)(handleDescriptor, args);
	}

	module.exports = exports['default'];

/***/ }),
/* 16 */
/*!********************************************!*\
  !*** ./~/core-decorators/lib/deprecate.js ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports['default'] = deprecate;

	var _privateUtils = __webpack_require__(/*! ./private/utils */ 1);

	var DEFAULT_MSG = 'This function will be removed in future versions.';

	function handleDescriptor(target, key, descriptor, _ref) {
	  var _ref2 = _slicedToArray(_ref, 2);

	  var _ref2$0 = _ref2[0];
	  var msg = _ref2$0 === undefined ? DEFAULT_MSG : _ref2$0;
	  var _ref2$1 = _ref2[1];
	  var options = _ref2$1 === undefined ? {} : _ref2$1;

	  if (typeof descriptor.value !== 'function') {
	    throw new SyntaxError('Only functions can be marked as deprecated');
	  }

	  var methodSignature = target.constructor.name + '#' + key;

	  if (options.url) {
	    msg += '\n\n    See ' + options.url + ' for more details.\n\n';
	  }

	  return _extends({}, descriptor, {
	    value: function deprecationWrapper() {
	      console.warn('DEPRECATION ' + methodSignature + ': ' + msg);
	      return descriptor.value.apply(this, arguments);
	    }
	  });
	}

	function deprecate() {
	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }

	  return (0, _privateUtils.decorate)(handleDescriptor, args);
	}

	module.exports = exports['default'];

/***/ }),
/* 17 */
/*!*********************************************!*\
  !*** ./~/core-decorators/lib/enumerable.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = enumerable;

	var _privateUtils = __webpack_require__(/*! ./private/utils */ 1);

	function handleDescriptor(target, key, descriptor) {
	  descriptor.enumerable = true;
	  return descriptor;
	}

	function enumerable() {
	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }

	  return (0, _privateUtils.decorate)(handleDescriptor, args);
	}

	module.exports = exports['default'];

/***/ }),
/* 18 */
/*!***************************************************!*\
  !*** ./~/core-decorators/lib/extendDescriptor.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports['default'] = extendDescriptor;

	var _privateUtils = __webpack_require__(/*! ./private/utils */ 1);

	var getPrototypeOf = Object.getPrototypeOf;
	var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

	function handleDescriptor(target, key, descriptor) {
	  var superKlass = getPrototypeOf(target);
	  var superDesc = getOwnPropertyDescriptor(superKlass, key);

	  return _extends({}, superDesc, {
	    value: descriptor.value,
	    initializer: descriptor.initializer,
	    get: descriptor.get || superDesc.get,
	    set: descriptor.set || superDesc.set
	  });
	}

	function extendDescriptor() {
	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }

	  return (0, _privateUtils.decorate)(handleDescriptor, args);
	}

	module.exports = exports['default'];

/***/ }),
/* 19 */
/*!******************************************!*\
  !*** ./~/core-decorators/lib/memoize.js ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports['default'] = memoize;

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var _privateUtils = __webpack_require__(/*! ./private/utils */ 1);

	function toObject(cache, value) {
	  if (value === Object(value)) {
	    return value;
	  }
	  return cache[value] || (cache[value] = {});
	}

	function applyAndCache(context, fn, args, cache, signature) {
	  var ret = fn.apply(context, args);
	  cache[signature] = ret;
	  return ret;
	}

	function metaForDescriptor(descriptor) {
	  var fn = undefined,
	      wrapKey = undefined;

	  // This is ugly code, but way faster than other
	  // ways I tried that *looked* pretty

	  if (descriptor.value) {
	    fn = descriptor.value;
	    wrapKey = 'value';
	  } else if (descriptor.get) {
	    fn = descriptor.get;
	    wrapKey = 'get';
	  } else if (descriptor.set) {
	    fn = descriptor.set;
	    wrapKey = 'set';
	  }

	  return { fn: fn, wrapKey: wrapKey };
	}

	function handleDescriptor(target, key, descriptor) {
	  console.warn('DEPRECATION: @memoize is deprecated and will be removed shortly. Use @decorate with lodash\'s memoize helper.\n\n  https://github.com/jayphelps/core-decorators.js#decorate');

	  var _metaForDescriptor = metaForDescriptor(descriptor);

	  var fn = _metaForDescriptor.fn;
	  var wrapKey = _metaForDescriptor.wrapKey;

	  var argumentCache = new WeakMap();
	  var signatureCache = Object.create(null);
	  var primativeRefCache = Object.create(null);
	  var argumentIdCounter = 0;

	  return _extends({}, descriptor, _defineProperty({}, wrapKey, function memoizeWrapper() {
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    var signature = '0';

	    for (var i = 0, l = args.length; i < l; i++) {
	      var arg = args[i];
	      var argRef = toObject(primativeRefCache, arg);
	      var argKey = argumentCache.get(argRef);

	      if (argKey === undefined) {
	        argKey = ++argumentIdCounter;
	        argumentCache.set(argRef, argKey);
	      }

	      signature += argKey;
	    }

	    return signatureCache[signature] || applyAndCache(this, fn, arguments, signatureCache, signature);
	  }));
	}

	function memoize() {
	  for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	    args[_key2] = arguments[_key2];
	  }

	  return (0, _privateUtils.decorate)(handleDescriptor, args);
	}

	module.exports = exports['default'];

/***/ }),
/* 20 */
/*!****************************************!*\
  !*** ./~/core-decorators/lib/mixin.js ***!
  \****************************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = mixin;

	var _privateUtils = __webpack_require__(/*! ./private/utils */ 1);

	var defineProperty = Object.defineProperty;
	var getPrototypeOf = Object.getPrototypeOf;

	function buggySymbol(symbol) {
	  return Object.prototype.toString.call(symbol) === '[object Symbol]' && typeof symbol === 'object';
	}

	function hasProperty(prop, obj) {
	  // We have to traverse manually prototypes' chain for polyfilled ES6 Symbols
	  // like "in" operator does.
	  // I.e.: Babel 5 Symbol polyfill stores every created symbol in Object.prototype.
	  // That's why we cannot use construction like "prop in obj" to check, if needed
	  // prop actually exists in given object/prototypes' chain.
	  if (buggySymbol(prop)) {
	    do {
	      if (obj === Object.prototype) {
	        // Polyfill assigns undefined as value for stored symbol key.
	        // We can assume in this special case if there is nothing assigned it doesn't exist.
	        return typeof obj[prop] !== 'undefined';
	      }
	      if (obj.hasOwnProperty(prop)) {
	        return true;
	      }
	    } while (obj = getPrototypeOf(obj));
	    return false;
	  } else {
	    return prop in obj;
	  }
	}

	function handleClass(target, mixins) {
	  if (!mixins.length) {
	    throw new SyntaxError('@mixin() class ' + target.name + ' requires at least one mixin as an argument');
	  }

	  for (var i = 0, l = mixins.length; i < l; i++) {
	    var descs = (0, _privateUtils.getOwnPropertyDescriptors)(mixins[i]);
	    var keys = (0, _privateUtils.getOwnKeys)(descs);

	    for (var j = 0, k = keys.length; j < k; j++) {
	      var key = keys[j];

	      if (!hasProperty(key, target.prototype)) {
	        defineProperty(target.prototype, key, descs[key]);
	      }
	    }
	  }
	}

	function mixin() {
	  for (var _len = arguments.length, mixins = Array(_len), _key = 0; _key < _len; _key++) {
	    mixins[_key] = arguments[_key];
	  }

	  if (typeof mixins[0] === 'function') {
	    return handleClass(mixins[0], []);
	  } else {
	    return function (target) {
	      return handleClass(target, mixins);
	    };
	  }
	}

	module.exports = exports['default'];

/***/ }),
/* 21 */
/*!**************************************************!*\
  !*** ./~/core-decorators/lib/nonconfigurable.js ***!
  \**************************************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = nonconfigurable;

	var _privateUtils = __webpack_require__(/*! ./private/utils */ 1);

	function handleDescriptor(target, key, descriptor) {
	  descriptor.configurable = false;
	  return descriptor;
	}

	function nonconfigurable() {
	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }

	  return (0, _privateUtils.decorate)(handleDescriptor, args);
	}

	module.exports = exports['default'];

/***/ }),
/* 22 */
/*!************************************************!*\
  !*** ./~/core-decorators/lib/nonenumerable.js ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = nonenumerable;

	var _privateUtils = __webpack_require__(/*! ./private/utils */ 1);

	function handleDescriptor(target, key, descriptor) {
	  descriptor.enumerable = false;
	  return descriptor;
	}

	function nonenumerable() {
	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }

	  return (0, _privateUtils.decorate)(handleDescriptor, args);
	}

	module.exports = exports['default'];

/***/ }),
/* 23 */
/*!*******************************************!*\
  !*** ./~/core-decorators/lib/override.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	exports['default'] = override;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _privateUtils = __webpack_require__(/*! ./private/utils */ 1);

	var GENERIC_FUNCTION_ERROR = '{child} does not properly override {parent}';
	var FUNCTION_REGEXP = /^function ([_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*)?(\([^\)]*\))[\s\S]+$/;

	var SyntaxErrorReporter = (function () {
	  _createClass(SyntaxErrorReporter, [{
	    key: '_getTopic',
	    value: function _getTopic(descriptor) {
	      if (descriptor === undefined) {
	        return null;
	      }

	      if ('value' in descriptor) {
	        return descriptor.value;
	      }

	      if ('get' in descriptor) {
	        return descriptor.get;
	      }

	      if ('set' in descriptor) {
	        return descriptor.set;
	      }
	    }
	  }, {
	    key: '_extractTopicSignature',
	    value: function _extractTopicSignature(topic) {
	      switch (typeof topic) {
	        case 'function':
	          return this._extractFunctionSignature(topic);
	        default:
	          return this.key;
	      }
	    }
	  }, {
	    key: '_extractFunctionSignature',
	    value: function _extractFunctionSignature(fn) {
	      var _this = this;

	      return fn.toString().replace(FUNCTION_REGEXP, function (match, name, params) {
	        if (name === undefined) name = _this.key;
	        return name + params;
	      });
	    }
	  }, {
	    key: 'key',
	    get: function get() {
	      return this.childDescriptor.key;
	    }
	  }, {
	    key: 'parentNotation',
	    get: function get() {
	      return this.parentKlass.constructor.name + '#' + this.parentPropertySignature;
	    }
	  }, {
	    key: 'childNotation',
	    get: function get() {
	      return this.childKlass.constructor.name + '#' + this.childPropertySignature;
	    }
	  }, {
	    key: 'parentTopic',
	    get: function get() {
	      return this._getTopic(this.parentDescriptor);
	    }
	  }, {
	    key: 'childTopic',
	    get: function get() {
	      return this._getTopic(this.childDescriptor);
	    }
	  }, {
	    key: 'parentPropertySignature',
	    get: function get() {
	      return this._extractTopicSignature(this.parentTopic);
	    }
	  }, {
	    key: 'childPropertySignature',
	    get: function get() {
	      return this._extractTopicSignature(this.childTopic);
	    }
	  }]);

	  function SyntaxErrorReporter(parentKlass, childKlass, parentDescriptor, childDescriptor) {
	    _classCallCheck(this, SyntaxErrorReporter);

	    this.parentKlass = parentKlass;
	    this.childKlass = childKlass;
	    this.parentDescriptor = parentDescriptor;
	    this.childDescriptor = childDescriptor;
	  }

	  _createClass(SyntaxErrorReporter, [{
	    key: 'assert',
	    value: function assert(condition) {
	      var msg = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

	      if (condition !== true) {
	        this.error(GENERIC_FUNCTION_ERROR + msg);
	      }
	    }
	  }, {
	    key: 'error',
	    value: function error(msg) {
	      var _this2 = this;

	      msg = msg
	      // Replace lazily, because they actually might not
	      // be available in all cases
	      .replace('{parent}', function (m) {
	        return _this2.parentNotation;
	      }).replace('{child}', function (m) {
	        return _this2.childNotation;
	      });
	      throw new SyntaxError(msg);
	    }
	  }]);

	  return SyntaxErrorReporter;
	})();

	function getDescriptorType(descriptor) {
	  if (descriptor.hasOwnProperty('value')) {
	    return 'data';
	  }

	  if (descriptor.hasOwnProperty('get') || descriptor.hasOwnProperty('set')) {
	    return 'accessor';
	  }

	  // If none of them exist, browsers treat it as
	  // a data descriptor with a value of `undefined`
	  return 'data';
	}

	function checkFunctionSignatures(parent, child, reporter) {
	  reporter.assert(parent.length === child.length);
	}

	function checkDataDescriptors(parent, child, reporter) {
	  var parentValueType = typeof parent.value;
	  var childValueType = typeof child.value;

	  if (parentValueType === 'undefined' && childValueType === 'undefined') {
	    // class properties can be any expression, which isn't ran until the
	    // the instance is created, so we can't reliably get type information
	    // for them yet (per spec). Perhaps when Babel includes flow-type info
	    // in runtime? Tried regex solutions, but super hacky and only feasible
	    // on primitives, which is confusing for usage...
	    reporter.error('descriptor values are both undefined. (class properties are are not currently supported)\'');
	  }

	  if (parentValueType !== childValueType) {
	    var isFunctionOverUndefined = childValueType === 'function' && parentValueType === undefined;
	    // Even though we don't support class properties, this
	    // will still handle more than just functions, just in case.
	    // Shadowing an undefined value is an error if the inherited
	    // value was undefined (usually a class property, not a method)
	    if (isFunctionOverUndefined || parentValueType !== undefined) {
	      reporter.error('value types do not match. {parent} is "' + parentValueType + '", {child} is "' + childValueType + '"');
	    }
	  }

	  // Switch, in preparation for supporting more types
	  switch (childValueType) {
	    case 'function':
	      checkFunctionSignatures(parent.value, child.value, reporter);
	      break;

	    default:
	      reporter.error('Unexpected error. Please file a bug with: {parent} is "' + parentValueType + '", {child} is "' + childValueType + '"');
	      break;
	  }
	}

	function checkAccessorDescriptors(parent, child, reporter) {
	  var parentHasGetter = typeof parent.get === 'function';
	  var childHasGetter = typeof child.get === 'function';
	  var parentHasSetter = typeof parent.set === 'function';
	  var childHasSetter = typeof child.set === 'function';

	  if (parentHasGetter || childHasGetter) {
	    if (!parentHasGetter && parentHasSetter) {
	      reporter.error('{parent} is setter but {child} is getter');
	    }

	    if (!childHasGetter && childHasSetter) {
	      reporter.error('{parent} is getter but {child} is setter');
	    }

	    checkFunctionSignatures(parent.get, child.get, reporter);
	  }

	  if (parentHasSetter || childHasSetter) {
	    if (!parentHasSetter && parentHasGetter) {
	      reporter.error('{parent} is getter but {child} is setter');
	    }

	    if (!childHasSetter && childHasGetter) {
	      reporter.error('{parent} is setter but {child} is getter');
	    }

	    checkFunctionSignatures(parent.set, child.set, reporter);
	  }
	}

	function checkDescriptors(parent, child, reporter) {
	  var parentType = getDescriptorType(parent);
	  var childType = getDescriptorType(child);

	  if (parentType !== childType) {
	    reporter.error('descriptor types do not match. {parent} is "' + parentType + '", {child} is "' + childType + '"');
	  }

	  switch (childType) {
	    case 'data':
	      checkDataDescriptors(parent, child, reporter);
	      break;

	    case 'accessor':
	      checkAccessorDescriptors(parent, child, reporter);
	      break;
	  }
	}

	var suggestionTransforms = [function (key) {
	  return key.toLowerCase();
	}, function (key) {
	  return key.toUpperCase();
	}, function (key) {
	  return key + 's';
	}, function (key) {
	  return key.slice(0, -1);
	}, function (key) {
	  return key.slice(1, key.length);
	}];

	function findPossibleAlternatives(superKlass, key) {
	  for (var i = 0, l = suggestionTransforms.length; i < l; i++) {
	    var fn = suggestionTransforms[i];
	    var suggestion = fn(key);

	    if (suggestion in superKlass) {
	      return suggestion;
	    }
	  }

	  return null;
	}

	function handleDescriptor(target, key, descriptor) {
	  descriptor.key = key;
	  var superKlass = Object.getPrototypeOf(target);
	  var superDescriptor = Object.getOwnPropertyDescriptor(superKlass, key);
	  var reporter = new SyntaxErrorReporter(superKlass, target, superDescriptor, descriptor);

	  if (superDescriptor === undefined) {
	    var suggestedKey = findPossibleAlternatives(superKlass, key);
	    var suggestion = suggestedKey ? '\n\n  Did you mean "' + suggestedKey + '"?' : '';
	    reporter.error('No descriptor matching {child} was found on the prototype chain.' + suggestion);
	  }

	  checkDescriptors(superDescriptor, descriptor, reporter);

	  return descriptor;
	}

	function override() {
	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }

	  return (0, _privateUtils.decorate)(handleDescriptor, args);
	}

	module.exports = exports['default'];

/***/ }),
/* 24 */
/*!*******************************************!*\
  !*** ./~/core-decorators/lib/readonly.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = readonly;

	var _privateUtils = __webpack_require__(/*! ./private/utils */ 1);

	function handleDescriptor(target, key, descriptor) {
	  descriptor.writable = false;
	  return descriptor;
	}

	function readonly() {
	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }

	  return (0, _privateUtils.decorate)(handleDescriptor, args);
	}

	module.exports = exports['default'];

/***/ }),
/* 25 */
/*!****************************************************!*\
  !*** ./~/core-decorators/lib/suppress-warnings.js ***!
  \****************************************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports['default'] = suppressWarnings;

	var _privateUtils = __webpack_require__(/*! ./private/utils */ 1);

	function suppressedWarningNoop() {
	  // Warnings are currently suppressed via @suppressWarnings
	}

	function applyWithoutWarnings(context, fn, args) {
	  if (typeof console === 'object') {
	    var nativeWarn = console.warn;
	    console.warn = suppressedWarningNoop;
	    var ret = fn.apply(context, args);
	    console.warn = nativeWarn;
	    return ret;
	  } else {
	    return fn.apply(context, args);
	  }
	}

	function handleDescriptor(target, key, descriptor) {
	  return _extends({}, descriptor, {
	    value: function suppressWarningsWrapper() {
	      return applyWithoutWarnings(this, descriptor.value, arguments);
	    }
	  });
	}

	function suppressWarnings() {
	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }

	  return (0, _privateUtils.decorate)(handleDescriptor, args);
	}

	module.exports = exports['default'];

/***/ }),
/* 26 */
/*!*******************************************!*\
  !*** ./~/core-decorators/lib/throttle.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports['default'] = throttle;

	var _privateUtils = __webpack_require__(/*! ./private/utils */ 1);

	var DEFAULT_TIMEOUT = 300;

	function handleDescriptor(target, key, descriptor, _ref) {
	  var _ref2 = _slicedToArray(_ref, 2);

	  var _ref2$0 = _ref2[0];
	  var wait = _ref2$0 === undefined ? DEFAULT_TIMEOUT : _ref2$0;
	  var _ref2$1 = _ref2[1];
	  var options = _ref2$1 === undefined ? {} : _ref2$1;

	  var callback = descriptor.value;

	  if (typeof callback !== 'function') {
	    throw new SyntaxError('Only functions can be throttled');
	  }

	  if (options.leading !== false) {
	    options.leading = true;
	  }

	  if (options.trailing !== false) {
	    options.trailing = true;
	  }

	  return _extends({}, descriptor, {
	    value: function value() {
	      var _this = this;

	      var meta = (0, _privateUtils.metaFor)(this);
	      var throttleTimeoutIds = meta.throttleTimeoutIds;
	      var throttlePreviousTimestamps = meta.throttlePreviousTimestamps;

	      var timeout = throttleTimeoutIds[key];
	      // last execute timestamp
	      var previous = throttlePreviousTimestamps[key] || 0;
	      var now = Date.now();

	      if (options.trailing) {
	        meta.throttleTrailingArgs = arguments;
	      }

	      // if first be called and disable the execution on the leading edge
	      // set last execute timestamp to now
	      if (!previous && options.leading === false) {
	        previous = now;
	      }

	      var remaining = wait - (now - previous);

	      if (remaining <= 0) {
	        clearTimeout(timeout);
	        delete throttleTimeoutIds[key];
	        throttlePreviousTimestamps[key] = now;
	        callback.apply(this, arguments);
	      } else if (!timeout && options.trailing) {
	        throttleTimeoutIds[key] = setTimeout(function () {
	          throttlePreviousTimestamps[key] = options.leading === false ? 0 : Date.now();
	          delete throttleTimeoutIds[key];
	          callback.apply(_this, meta.throttleTrailingArgs);
	          // don't leak memory!
	          meta.throttleTrailingArgs = null;
	        }, remaining);
	      }
	    }
	  });
	}

	function throttle() {
	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }

	  return (0, _privateUtils.decorate)(handleDescriptor, args);
	}

	module.exports = exports['default'];

/***/ }),
/* 27 */
/*!***************************************!*\
  !*** ./~/core-decorators/lib/time.js ***!
  \***************************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports['default'] = time;

	var _privateUtils = __webpack_require__(/*! ./private/utils */ 1);

	var labels = {};

	// Exported for mocking in tests
	var defaultConsole = {
	  time: console.time ? console.time.bind(console) : function (label) {
	    labels[label] = new Date();
	  },
	  timeEnd: console.timeEnd ? console.timeEnd.bind(console) : function (label) {
	    var timeNow = new Date();
	    var timeTaken = timeNow - labels[label];
	    delete labels[label];
	    console.log(label + ': ' + timeTaken + 'ms');
	  }
	};

	exports.defaultConsole = defaultConsole;
	var count = 0;

	function handleDescriptor(target, key, descriptor, _ref) {
	  var _ref2 = _slicedToArray(_ref, 2);

	  var _ref2$0 = _ref2[0];
	  var prefix = _ref2$0 === undefined ? null : _ref2$0;
	  var _ref2$1 = _ref2[1];
	  var console = _ref2$1 === undefined ? defaultConsole : _ref2$1;

	  var fn = descriptor.value;

	  if (prefix === null) {
	    prefix = target.constructor.name + '.' + key;
	  }

	  if (typeof fn !== 'function') {
	    throw new SyntaxError('@time can only be used on functions, not: ' + fn);
	  }

	  return _extends({}, descriptor, {
	    value: function value() {
	      var label = prefix + '-' + count;
	      count++;
	      console.time(label);

	      try {
	        return fn.apply(this, arguments);
	      } finally {
	        console.timeEnd(label);
	      }
	    }
	  });
	}

	function time() {
	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }

	  return (0, _privateUtils.decorate)(handleDescriptor, args);
	}

/***/ }),
/* 28 */,
/* 29 */
/*!******************************************!*\
  !*** ./src/elements/ad_banner/index.tsx ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	const dom_1 = __webpack_require__(/*! ../inc/dom */ 2);
	exports.AdBanner = function (dom) {
	    return class AdBanner extends HTMLElement {
	        constructor() {
	            super();
	        }
	        connectedCallback() {
	            const src = this.getAttribute('src');
	            this.appendChild(dom.createElement("iframe", { frameborder: 'no', hspace: '0', vspace: '0', marginheight: '0', marginwidth: '0', src: src }));
	            const refresh = parseInt(this.getAttribute('refresh-period'), 10);
	            if (refresh) {
	                const holder = this;
	                setInterval(() => {
	                    holder.getElementsByTagName('iframe')[0].contentWindow.location.reload(true);
	                }, refresh * 1000);
	            }
	        }
	        static register() {
	            customElements.define('x-ad-banner', AdBanner);
	        }
	    };
	}(dom_1.dom);


/***/ }),
/* 30 */
/*!***************************************!*\
  !*** ./src/elements/change/index.tsx ***!
  \***************************************/
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	const dom_1 = __webpack_require__(/*! ../inc/dom */ 2);
	const api_1 = __webpack_require__(/*! ../../utils/api */ 5);
	const config_1 = __webpack_require__(/*! ./../../config */ 3);
	const api = new api_1.Api(config_1.default.ENDPOINT, config_1.default.API_USER, config_1.default.API_PWD);
	const _ = chrome.i18n.getMessage;
	exports.ChangeButton = function (dom) {
	    return class ChangeButton extends HTMLElement {
	        constructor() {
	            super();
	        }
	        onClick(evt) {
	            const holder = this;
	            api.generateMail().then((email) => {
	                const mailEvent = new CustomEvent('emailChanged', {
	                    detail: { email },
	                    bubbles: true,
	                    cancelable: true
	                });
	                holder.dispatchEvent(mailEvent);
	            });
	            evt.preventDefault();
	        }
	        connectedCallback() {
	            this.appendChild(dom.createElement("button", { onClick: this.onClick, class: 'btn btn__defauld' }, _('change')));
	        }
	        static register() {
	            customElements.define('x-change-button', ChangeButton);
	        }
	    };
	}(dom_1.dom);


/***/ }),
/* 31 */
/*!*************************************!*\
  !*** ./src/elements/copy/index.tsx ***!
  \*************************************/
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	const dom_1 = __webpack_require__(/*! ../inc/dom */ 2);
	const _ = chrome.i18n.getMessage;
	exports.CopyButton = function (dom) {
	    return class CopyButton extends HTMLElement {
	        constructor() {
	            super();
	            this.button = dom.createElement("button", { onClick: this.onClick.bind(this), class: 'btn btn__colors' }, _('copy'));
	            this.checkbox = dom.createElement("span", { style: 'display: block; margin: 0; margin-left: 20px; padding: 0px;' },
	                dom.createElement("input", { type: 'checkbox', onClick: this.checkBoxClick, checked: true, id: 'cbtest' }),
	                dom.createElement("label", { for: 'cbtest', class: 'check-box' }));
	        }
	        restore() {
	            this.removeChild(this.checkbox);
	            this.appendChild(this.button);
	        }
	        checkBoxClick(evt) {
	            evt.preventDefault();
	        }
	        onClick(evt) {
	            const target = this.getAttribute('target-id');
	            if (target) {
	                const tNode = document.getElementById(target);
	                const helper = dom.createElement("input", { id: 'helper', value: tNode.innerHTML });
	                this.appendChild(helper);
	                helper.select();
	                document.execCommand('copy');
	                this.removeChild(helper);
	            }
	            this.removeChild(this.button);
	            this.appendChild(this.checkbox);
	            setTimeout(this.restore.bind(this), 1200);
	            evt.preventDefault();
	        }
	        connectedCallback() {
	            this.appendChild(this.button);
	        }
	        static register() {
	            customElements.define('x-copy-button', CopyButton);
	        }
	    };
	}(dom_1.dom);


/***/ }),
/* 32 */
/*!**************************************!*\
  !*** ./src/elements/email/index.tsx ***!
  \**************************************/
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	const dom_1 = __webpack_require__(/*! ../inc/dom */ 2);
	const api_1 = __webpack_require__(/*! ../../utils/api */ 5);
	const config_1 = __webpack_require__(/*! ./../../config */ 3);
	const api = new api_1.Api(config_1.default.ENDPOINT, config_1.default.API_USER, config_1.default.API_PWD);
	const _ = chrome.i18n.getMessage;
	exports.Email = function (dom) {
	    return class Email extends HTMLElement {
	        constructor() {
	            super();
	        }
	        connectedCallback() {
	            this.appendChild(dom.createElement("p", { class: 'text text__activ', id: 'email' },
	                "... ",
	                _('wait_a_moment')));
	            api.getCurrentMail().then((email) => {
	                this.querySelector('p').innerHTML = email;
	            });
	            this.subscribe('emailChanged', this.onChange.bind(this));
	        }
	        static register() {
	            customElements.define('x-email', Email);
	        }
	        onChange(evt) {
	            if (evt.detail.email) {
	                this.querySelector('p').innerHTML = evt.detail.email;
	            }
	        }
	        sendMessage(title, detail = {}) {
	            const event = new CustomEvent(title, { bubbles: true, cancelable: true, detail });
	            this.dispatchEvent(event);
	        }
	        subscribe(eventName, handler) {
	            this.sendMessage('subscribe', { eventName, handler });
	        }
	    };
	}(dom_1.dom);


/***/ }),
/* 33 */
/*!***************************************!*\
  !*** ./src/elements/header/index.tsx ***!
  \***************************************/
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	const dom_1 = __webpack_require__(/*! ../inc/dom */ 2);
	exports.Header = function (dom) {
	    return class Header extends HTMLElement {
	        constructor() {
	            super();
	        }
	        connectedCallback() {
	            this.appendChild(dom.createElement("div", { class: 'logo' },
	                dom.createElement("img", { src: 'img/logo@2x172x20.png', class: 'logo-pic' })));
	        }
	        static register() {
	            customElements.define('x-header', Header);
	        }
	    };
	}(dom_1.dom);


/***/ }),
/* 34 */
/*!***********************************************!*\
  !*** ./src/elements/header_message/index.tsx ***!
  \***********************************************/
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	const dom_1 = __webpack_require__(/*! ../inc/dom */ 2);
	const _ = chrome.i18n.getMessage;
	exports.HeaderMessage = function (dom) {
	    return class HeaderMessage extends HTMLElement {
	        constructor() {
	            super();
	        }
	        connectedCallback() {
	            this.appendChild(dom.createElement("p", { class: 'text' }, _('your_temporary_email_address')));
	        }
	        static register() {
	            customElements.define('x-header-message', HeaderMessage);
	        }
	        onChange(evt) {
	            if (evt.detail.email) {
	                this.querySelector('h3').innerHTML = evt.detail.email;
	            }
	        }
	        sendMessage(title, detail = {}) {
	            const event = new CustomEvent(title, { bubbles: true, cancelable: true, detail });
	            this.dispatchEvent(event);
	        }
	        subscribe(eventName, handler) {
	            this.sendMessage('subscribe', { eventName, handler });
	        }
	    };
	}(dom_1.dom);


/***/ }),
/* 35 */
/*!******************************************!*\
  !*** ./src/elements/no_thanks/index.tsx ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	const core_decorators_1 = __webpack_require__(/*! core-decorators */ 6);
	const dom_1 = __webpack_require__(/*! ../inc/dom */ 2);
	const _ = chrome.i18n.getMessage;
	exports.NoThanksButton = function (dom) {
	    class NoThanksButton extends HTMLElement {
	        constructor() {
	            super();
	        }
	        onClick(evt) {
	            const noEvent = new CustomEvent('noThanks', {
	                detail: {},
	                bubbles: true,
	                cancelable: true
	            });
	            this.dispatchEvent(noEvent);
	            evt.preventDefault();
	        }
	        connectedCallback() {
	            this.appendChild(dom.createElement("button", { onClick: this.onClick, class: 'btn btn__colors' }, _('no_thanks')));
	        }
	        static register() {
	            customElements.define('x-no-thanks-button', NoThanksButton);
	        }
	    }
	    __decorate([
	        core_decorators_1.autobind
	    ], NoThanksButton.prototype, "onClick", null);
	    ;
	    return NoThanksButton;
	}(dom_1.dom);


/***/ }),
/* 36 */
/*!******************************************!*\
  !*** ./src/elements/read_mail/index.tsx ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	const dom_1 = __webpack_require__(/*! ../inc/dom */ 2);
	const api_1 = __webpack_require__(/*! ../../utils/api */ 5);
	const config_1 = __webpack_require__(/*! ./../../config */ 3);
	const api = new api_1.Api(config_1.default.ENDPOINT, config_1.default.API_USER, config_1.default.API_PWD);
	const _ = chrome.i18n.getMessage;
	exports.ReadMail = function (dom) {
	    return class ReadMail extends HTMLElement {
	        constructor() {
	            super();
	        }
	        onClick(evt) {
	            api.openReadMailTab();
	            evt.preventDefault();
	        }
	        connectedCallback() {
	            const holder = dom.createElement("div", { class: 'mail__email-chuslo' });
	            this.appendChild(dom.createElement("div", { class: 'mail__wrapper' },
	                dom.createElement("a", { href: '#', onClick: this.onClick, class: 'mail' },
	                    dom.createElement("div", { class: 'mail__email' },
	                        dom.createElement("div", { class: 'mail__email-wrapper' }, holder)),
	                    dom.createElement("span", { class: 'mail__des' },
	                        " ",
	                        _('check_mail')))));
	            chrome.storage.local.get('msgCount', (storage) => {
	                if (storage && storage.msgCount) {
	                    holder.innerHTML = storage.msgCount;
	                }
	                else {
	                    holder.innerHTML = '0';
	                }
	            });
	            chrome.storage.onChanged.addListener(function (changes, namespace) {
	                if ('msgCount' in changes) {
	                    holder.innerHTML = changes.msgCount.newValue;
	                }
	            });
	        }
	        static register() {
	            customElements.define('x-read-mail', ReadMail);
	        }
	    };
	}(dom_1.dom);


/***/ }),
/* 37 */
/*!**************************************!*\
  !*** ./src/elements/share/index.tsx ***!
  \**************************************/
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	const core_decorators_1 = __webpack_require__(/*! core-decorators */ 6);
	const dom_1 = __webpack_require__(/*! ../inc/dom */ 2);
	const config_1 = __webpack_require__(/*! ./../../config */ 3);
	const _ = chrome.i18n.getMessage;
	exports.Share = function (dom) {
	    class Share extends HTMLElement {
	        constructor() {
	            super();
	        }
	        setStorage(callback) {
	            chrome.management.getSelf((info) => {
	                let shared = {};
	                shared[info.version] = true;
	                chrome.storage.local.set({ shared }, callback);
	            });
	        }
	        openTabs(url) {
	            chrome.tabs.create({ url });
	            if (config_1.default.BROWSER = 'firefox') {
	                window.close();
	            }
	        }
	        shareFacebook(evt) {
	            const target_url = config_1.default.BROWSER in config_1.default.STORE_HOMEPAGE_URL
	                ? config_1.default.STORE_HOMEPAGE_URL[config_1.default.BROWSER]
	                : config_1.default.DEFAULT_HOME_PAGE;
	            const url = `https://www.facebook.com/sharer/sharer.php?u=${target_url}`;
	            this.setStorage(this.openTabs.bind(this, url));
	            evt.preventDefault();
	        }
	        shareTwitter(evt) {
	            const target_url = config_1.default.BROWSER in config_1.default.STORE_HOMEPAGE_URL
	                ? config_1.default.STORE_HOMEPAGE_URL[config_1.default.BROWSER]
	                : config_1.default.DEFAULT_HOME_PAGE;
	            const url = `https://twitter.com/home?status=${target_url}`;
	            this.setStorage(this.openTabs.bind(this, url));
	            evt.preventDefault();
	        }
	        connectedCallback() {
	            this.appendChild(dom.createElement("div", { class: 'table' },
	                dom.createElement("div", { class: 'table__center' },
	                    dom.createElement("p", { class: 'text' }, _('share_us')),
	                    dom.createElement("div", { class: 'social__wrapper' },
	                        dom.createElement("a", { href: '#', style: 'border: 0px;', class: 'social__block', onClick: this.shareFacebook },
	                            dom.createElement("div", { class: 'social__item social__item-fb' },
	                                dom.createElement("i", { class: 'fa fa-facebook social__item-pic' }))),
	                        dom.createElement("a", { href: '#', class: 'social__block', onClick: this.shareTwitter },
	                            dom.createElement("div", { class: 'social__item social__item-tw' },
	                                dom.createElement("i", { class: 'fa fa-twitter social__item-pic' })))))));
	        }
	        static register() {
	            customElements.define('x-share', Share);
	        }
	    }
	    __decorate([
	        core_decorators_1.autobind
	    ], Share.prototype, "shareFacebook", null);
	    __decorate([
	        core_decorators_1.autobind
	    ], Share.prototype, "shareTwitter", null);
	    ;
	    return Share;
	}(dom_1.dom);


/***/ }),
/* 38 */
/*!**************************************************!*\
  !*** ./src/elements/slide_random_show/index.tsx ***!
  \**************************************************/
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	const core_decorators_1 = __webpack_require__(/*! core-decorators */ 6);
	const dom_1 = __webpack_require__(/*! ../inc/dom */ 2);
	exports.SlideRandomShow = function (dom) {
	    class SlideRandomShow extends HTMLElement {
	        constructor() {
	            super();
	            this.current = '';
	        }
	        onClick(evt) {
	            evt.preventDefault();
	        }
	        default() {
	            this.current = this.getAttribute('default-slide');
	            const slides = this.getAttribute('slides')
	                .split(';')
	                .filter((cv) => { return cv; })
	                .map((cv) => { return cv.trim().split(':'); });
	            for (let slide of slides) {
	                document.querySelector(`[id="${slide[0]}"]`).style.display = slide[0] === this.current ? 'block' : 'none';
	            }
	        }
	        onNoThanks(evt) {
	            document.querySelector(`[id="${this.current}"]`).style.display = 'none';
	            this.current = this.getAttribute('default-slide');
	            document.querySelector(`[id="${this.current}"]`).style.display = 'block';
	            chrome.management.getSelf((info) => {
	                chrome.storage.local.get('ub', (storage) => {
	                    if (!storage.ub || !(info.version in storage.ub)) {
	                        let ub = {};
	                        ub[info.version] = 1;
	                        chrome.storage.local.set({ ub });
	                    }
	                    else {
	                        storage.ub[info.version] = storage.ub[info.version] + 1;
	                        chrome.storage.local.set({ ub: storage.ub });
	                    }
	                });
	            });
	            evt.preventDefault();
	        }
	        randomView(total, slides) {
	            let rand = Math.random() * total;
	            for (let slide of slides) {
	                rand -= parseInt(slide[1], 10);
	                if (rand < 0) {
	                    return slide[0];
	                }
	            }
	        }
	        connectedCallback() {
	            let slides = this.getAttribute('slides').split(';').filter((cv) => { return cv; }).map((cv) => { return cv.trim().split(':'); });
	            this.current = this.getAttribute('default-slide');
	            document.addEventListener('DOMContentLoaded', () => {
	                for (let slide of slides) {
	                    if (slide[0] === this.current) {
	                        continue;
	                    }
	                    document.querySelector(`[id="${slide[0]}"]`).style.display = 'none';
	                }
	                chrome.management.getSelf((info) => {
	                    chrome.storage.local.get(['view', 'ub', 'shared', 'voted'], (storage) => {
	                        if (!storage.view || storage.view[info.version] < 10) {
	                            let view = {};
	                            view[info.version] = storage.view && storage.view[info.version] ? storage.view[info.version] + 1 : 1;
	                            chrome.storage.local.set({ view });
	                            return;
	                        }
	                        if (storage.shared && storage.shared[info.version]) {
	                            for (let slide of slides) {
	                                if (slide[0] === 'share') {
	                                    slide[1] = '0';
	                                    break;
	                                }
	                            }
	                        }
	                        if (storage.voted && storage.voted[info.version]) {
	                            for (let slide of slides) {
	                                if (slide[0] === 'vote') {
	                                    slide[1] = '0';
	                                    break;
	                                }
	                            }
	                        }
	                        let in_total = 0;
	                        for (let slide of slides) {
	                            in_total += parseInt(slide[1], 10);
	                        }
	                        if (!storage.ub || !(info.version in storage.ub) || storage.ub[info.version] !== 5) {
	                            let random_slide = this.randomView(in_total, slides);
	                            document.querySelector(`[id="${this.current}"]`).style.display = 'none';
	                            document.querySelector(`[id="${random_slide}"]`).style.display = 'block';
	                            this.current = random_slide;
	                        }
	                    });
	                });
	            });
	            this.subscribe('noThanks', this.onNoThanks);
	            this.addEventListener('default', this.default);
	        }
	        static register() {
	            customElements.define('x-slide-random-show', SlideRandomShow);
	        }
	        sendMessage(title, detail = {}) {
	            const event = new CustomEvent(title, { bubbles: true, cancelable: true, detail });
	            this.dispatchEvent(event);
	        }
	        subscribe(eventName, handler) {
	            this.sendMessage('subscribe', { eventName, handler });
	        }
	    }
	    __decorate([
	        core_decorators_1.autobind
	    ], SlideRandomShow.prototype, "default", null);
	    __decorate([
	        core_decorators_1.autobind
	    ], SlideRandomShow.prototype, "onNoThanks", null);
	    ;
	    return SlideRandomShow;
	}(dom_1.dom);


/***/ }),
/* 39 */
/*!*************************************!*\
  !*** ./src/elements/vote/index.tsx ***!
  \*************************************/
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	const core_decorators_1 = __webpack_require__(/*! core-decorators */ 6);
	const dom_1 = __webpack_require__(/*! ../inc/dom */ 2);
	const config_1 = __webpack_require__(/*! ./../../config */ 3);
	const _ = chrome.i18n.getMessage;
	exports.Vote = function (dom) {
	    class Vote extends HTMLElement {
	        constructor() {
	            super();
	            this.stars = [];
	        }
	        setStorage(callback) {
	            chrome.management.getSelf((info) => {
	                let voted = {};
	                voted[info.version] = true;
	                chrome.storage.local.set({ voted }, callback);
	            });
	        }
	        openTabs(evt) {
	            const rate = parseInt(evt.target.getAttribute('value'), 10);
	            if (rate === 5) {
	                if (config_1.default.BROWSER in config_1.default.STORE_HOMEPAGE_URL) {
	                    chrome.tabs.create({ url: config_1.default.STORE_HOMEPAGE_URL[config_1.default.BROWSER] });
	                    if (config_1.default.BROWSER = 'firefox') {
	                        window.close();
	                    }
	                }
	            }
	            else {
	                this.querySelector('div .table__center').innerHTML = _('thank_you');
	                setTimeout(() => {
	                    this.sendMessage('default');
	                }, 2000);
	            }
	        }
	        onClick(evt) {
	            this.setStorage(this.openTabs.bind(this, evt));
	            evt.preventDefault();
	        }
	        onMouseOut(evt) {
	            this.stars.forEach((cv) => { cv.classList.remove('activ'); });
	        }
	        onMouseOver(evt) {
	            for (let i = 0; i < this.stars.length; i++) {
	                if (this.stars[i] !== evt.target.parentElement) {
	                    this.stars[i].classList.add('activ');
	                }
	                else {
	                    this.stars[i].classList.add('activ');
	                    break;
	                }
	            }
	        }
	        connectedCallback() {
	            let rate = parseInt(this.getAttribute('point-scale'), 10);
	            for (var j = 0; j < rate; j++) {
	                this.stars.push(dom.createElement("li", { class: 'zirk__item' },
	                    dom.createElement("i", { class: 'fa fa-star zirk__item-pic', value: j + 1, onClick: this.onClick })));
	            }
	            this.appendChild(dom.createElement("div", { class: 'table' },
	                dom.createElement("div", { class: 'table__center' },
	                    dom.createElement("p", { class: 'text' }, _('rate_us')),
	                    dom.createElement("ul", { class: 'zirk__list', onMouseover: this.onMouseOver, onMouseout: this.onMouseOut }, this.stars))));
	        }
	        static register() {
	            customElements.define('x-vote', Vote);
	        }
	        sendMessage(title, detail = {}) {
	            const event = new CustomEvent(title, { bubbles: true, cancelable: true, detail });
	            this.dispatchEvent(event);
	        }
	    }
	    __decorate([
	        core_decorators_1.autobind
	    ], Vote.prototype, "onClick", null);
	    __decorate([
	        core_decorators_1.autobind
	    ], Vote.prototype, "onMouseOut", null);
	    __decorate([
	        core_decorators_1.autobind
	    ], Vote.prototype, "onMouseOver", null);
	    ;
	    return Vote;
	}(dom_1.dom);


/***/ }),
/* 40 */
/*!******************************************!*\
  !*** ./src/elements/workplace/index.tsx ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	const dom_1 = __webpack_require__(/*! ../inc/dom */ 2);
	exports.Workplace = function (dom) {
	    return class Workplace extends HTMLElement {
	        constructor() {
	            super();
	            this.eventsList = [];
	            this.eventsHandlersList = {};
	        }
	        dispatcher(evt) {
	            if (this.eventsHandlersList[evt.type]) {
	                this.eventsHandlersList[evt.type].forEach((cv) => { cv(evt); });
	            }
	        }
	        onSubscribe(evt) {
	            const eventName = evt.detail.eventName;
	            if (this.eventsList.some(function (cv) { return cv === eventName; })) {
	                if (!this.eventsHandlersList[eventName]) {
	                    this.eventsHandlersList[eventName] = [];
	                }
	                this.eventsHandlersList[eventName].push(evt.detail.handler);
	            }
	        }
	        connectedCallback() {
	            let events;
	            if (events = this.getAttribute('reflect-events')) {
	                this.eventsList = events.split(',').map((cv) => cv.trim());
	            }
	            if (this.eventsList.length) {
	                this.eventsList.forEach((cv) => {
	                    this.addEventListener(cv, this.dispatcher.bind(this));
	                });
	                this.addEventListener('subscribe', this.onSubscribe.bind(this));
	            }
	        }
	        static register() {
	            customElements.define('x-workplace', Workplace);
	        }
	    };
	}(dom_1.dom);


/***/ }),
/* 41 */
/*!***********************!*\
  !*** ./src/index.tsx ***!
  \***********************/
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	const _1 = __webpack_require__(/*! ./elements/slide_random_show/ */ 38);
	const _2 = __webpack_require__(/*! ./elements/workplace/ */ 40);
	const _3 = __webpack_require__(/*! ./elements/header/ */ 33);
	const _4 = __webpack_require__(/*! ./elements/header_message/ */ 34);
	const _5 = __webpack_require__(/*! ./elements/email/ */ 32);
	const _6 = __webpack_require__(/*! ./elements/change/ */ 30);
	const _7 = __webpack_require__(/*! ./elements/copy/ */ 31);
	const _8 = __webpack_require__(/*! ./elements/read_mail/ */ 36);
	const _9 = __webpack_require__(/*! ./elements/ad_banner/ */ 29);
	const _10 = __webpack_require__(/*! ./elements/vote/ */ 39);
	const _11 = __webpack_require__(/*! ./elements/share/ */ 37);
	const _12 = __webpack_require__(/*! ./elements/no_thanks/ */ 35);
	[_1.SlideRandomShow, _3.Header, _4.HeaderMessage, _2.Workplace, _5.Email, _6.ChangeButton, _7.CopyButton, _8.ReadMail, _9.AdBanner, _10.Vote, _11.Share, _12.NoThanksButton]
	    .forEach((element) => element.register());
	window.onload = function () {
	    chrome.storage.local.set({ last_opened: Date.now() });
	};
	setInterval(() => {
	    chrome.storage.local.set({ ping: Date.now() });
	}, 1000);


/***/ })
/******/ ]);