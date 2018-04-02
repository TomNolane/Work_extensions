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
/******/ ({

/***/ 0:
/*!*******************************!*\
  !*** multi chrome_background ***!
  \*******************************/
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(/*! ./src/background.ts */28);


/***/ }),

/***/ 3:
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

/***/ 4:
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

/***/ 5:
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

/***/ 7:
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

/***/ 8:
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

/***/ 9:
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

/***/ 10:
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

/***/ 28:
/*!***************************!*\
  !*** ./src/background.ts ***!
  \***************************/
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	const api_1 = __webpack_require__(/*! ./utils/api */ 5);
	const config_1 = __webpack_require__(/*! ./config */ 3);
	const api = new api_1.Api(config_1.default.ENDPOINT, config_1.default.API_USER, config_1.default.API_PWD);
	const _ = chrome.i18n.getMessage;
	let fast_mode = true;
	let slow_mode = false;
	const checker = () => {
	    const delay = (fast_mode ? config_1.default.API_SYNC_INTERVAL : config_1.default.API_SYNC_SLOW_INTERVAL) * 0.9;
	    chrome.storage.local.get('last_checked', (storage) => {
	        if (!storage.last_checked || Date.now() - storage.last_checked > delay) {
	            chrome.storage.local.set({ last_checked: Date.now() });
	            chrome.storage.local.get(['email', 'msgCount'], (storage) => {
	                api.getMailList(storage.email).then((list) => {
	                    chrome.browserAction.setBadgeBackgroundColor({ color: [255, 0, 0, 255] });
	                    chrome.browserAction.setBadgeText({ text: list.length ? list.length.toString() : '' });
	                    console.log(storage.msgCount, list.length);
	                    if (parseInt(storage.msgCount, 10) !== list.length) {
	                        chrome.storage.local.set({ msgCount: list.length ? list.length : 0 });
	                    }
	                    if (parseInt(storage.msgCount, 10) < list.length) {
	                        console.log('NOTIFICATION!!!!');
	                        chrome.notifications.create('tempMailExtensionId', { type: 'basic',
	                            iconUrl: 'img/128x128.png',
	                            title: _('new_mail_notification_header'),
	                            message: `${list.length} ${_('new_mail_notification_body')}`
	                        }, (id) => { });
	                    }
	                });
	            });
	        }
	    });
	};
	chrome.notifications.onClicked.addListener((id) => {
	    api.openReadMailTab();
	    chrome.notifications.clear(id);
	});
	const slow = function () {
	    fast_mode = false;
	    slow_mode = true;
	};
	const fast = function () {
	    fast_mode = true;
	    slow_mode = false;
	};
	setInterval(checker, config_1.default.API_SYNC_INTERVAL);
	const onUnload = function () {
	    setTimeout(slow, config_1.default.API_SYNC_DELAY);
	};
	chrome.storage.onChanged.addListener((storage) => {
	    if ('last_opened' in storage) {
	        fast();
	    }
	    if ('ping' in storage) {
	        setTimeout(onUnload, 3000);
	    }
	});
	chrome.browserAction.setPopup({ popup: 'popup.html' });


/***/ })

/******/ });