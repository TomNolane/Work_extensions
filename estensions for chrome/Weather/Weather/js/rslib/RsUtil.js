
function RsUtil() {
};

RsUtil.getLocale = function() {
	var loc = navigator.userLanguage;
	if (!loc) {
		loc = navigator.language;
	}
	if (!loc) {
		loc = navigator.browserLanguage;
	}
	return loc;
}

RsUtil.getLanguage = function() {
	var loc = RsUtil.getLocale();
	var index = loc.indexOf("-");
	if (index == -1) {
		index = loc.indexOf("_");
	}

	var lang = loc;
	if (index != -1) {
		lang = loc.substring(0, index);
	}
	return lang.toLowerCase();
}

RsUtil.getLocaleCountry = function() {
	var loc = RsUtil.getLocale();
	var index = loc.indexOf("-");
	if (index == -1) {
		index = loc.indexOf("_");
	}
	if (index == -1) {
		return null;
	}
	var country = loc.substring(index + 1);
	if (!country) {
		return null;
	}
	return country.toLowerCase();
}


/**
locale format: en_UK
*/
RsUtil.getAutoUnitSystem = function(locale) {
    var date = new Date(77, 11 - 1, 5, 20, 00);
    var s = date.toLocaleString();
    if (s.indexOf("ноября") != -1) {
        return "russia";
    }

    var country = this.getLocaleCountry();
    if (country == "gb" || country == "ie") {
    	return "uk";
    }


    if (RsUtil.isUsa()) {
        return "us";
    }
    return "metric";
}

RsUtil.getAutoTimeFormat = function() {
    var date = new Date(77, 11 - 1, 5, 20, 00);
    var s = date.toLocaleString();
    if (RsUtil.isUsa()) {
        return "12";
    }
    return "24";
}

RsUtil.isUsa = function() {
    var date = new Date(77, 11 - 1, 5, 20, 00);
	var s = date.toLocaleString();
    return s.lastIndexOf("PM") == (s.length - 2) || s.indexOf("8:00") != -1;
}

/**
Formats Date object to string according to ISO 8601.
YYYY-MM-DDThh:mm:ss[Z+-]hh:mm
Z means GMT
See http://en.wikipedia.org/wiki/ISO_8601

The string is accepted by YoWindow widget as time

time:Date
timeZone:Number
null - visitor's local time zone (computer time-zone)
0 - GMT
4 - GMT+4
3.5 - GMT + 3 hours and 30 minutes
or any real number for specific time-zone in hours.
*/
RsUtil.formatIsoDateAndTime = function(t, timeZone) {
	if (t == null) {
		return null;
	}

	if (timeZone == "local") {
		timeZone = -t.getTimezoneOffset() / 60;
	}

    var result = formatIsoDate(t) +
        "T" + zeroPad(t.getHours()) +
        ":" + zeroPad(t.getMinutes()) + 
        ":" + zeroPad(t.getSeconds());

    if (timeZone == 0) {                      
        result += "Z";
    }
    else if (!isNaN(timeZone)){
    	if (timeZone > 0) {
    		result += "+";
    	}
    	if (timeZone < 0) {
    		result += "-";
    		timeZone = -timeZone;
    	}
    	var tzHour = Math.floor(timeZone);
    	var tzMin = Math.round(60 * (timeZone - tzHour));
        result += zeroPad(tzHour);
        if (tzMin != 0) {
        	result += ":" + zeroPad(tzMin);
		}
    }
    return result;
}

function formatIsoDate(t) {
	if (t == null) {
		return null;
	}
    return t.getFullYear() +
    "-" + zeroPad(t.getMonth() + 1) +
    "-" + zeroPad(t.getDate());
}

function zeroPad(num) {
    var text = "" + num;
    if (text.length == 1) {
        return "0" + text;
    }
    return num + "";
}

RsUtil.equalLocationId = function(a, b) {
	var index = a.indexOf(":");
	if (index == -1) {
		a = "gn:" + a;
	}
	index = b.indexOf(":");
	if (index == -1) {
		b = "gn:" + b;
	}
	return a == b;
}

RsUtil.createDelegate = function(targetObj, targetMethod, arg1, arg2, arg3 ) {
// Create an array containing the arguments
	var initArgs = new Array();

// Skip the first two arguments as they are the target object and method
    for(var i = 2; i < arguments.length; ++i) {
		initArgs.push( arguments[i] );
    }

// Return the closure
	return function() {
// Add the initial arguments of the delegate
		var args = initArgs.slice(0);
// Add the actual arguments specified by the call to this list
    	for( var i = 0; i < arguments.length; ++i) {
        	args.push( arguments[i] );
	    }
        return targetMethod.apply(targetObj, args );
	}
}

function getCheckedButton(buttonGroup){
    for (var i = 0; i < buttonGroup.length; i++) {
        if (buttonGroup[i].checked) {
            return buttonGroup[i];
        }
    }
    return null;
}

function checkButton(buttonGroup, id) {
    for (var i = 0; i < buttonGroup.length; i++) {
    	var button = buttonGroup[i];
        button.checked = button.id == id;
	}
}


RsUtil.haveHieroglyph = function(s) {
	return RsUtil.haveChineseChars(s) || RsUtil.haveJapaneseChars(s) || RsUtil.haveKoreanChars(s);
}

RsUtil.haveExoticChars = function(s) {
	return RsUtil.haveHieroglyph(s) || RsUtil.haveArabicChars(s);
}


RsUtil.haveChineseChars = function(s){
    return /^[\u4E00-\u9FA5]+$/.test(s);
}

RsUtil.haveJapaneseChars = function(s){
    return /^[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]+$/.test(s);
}

RsUtil.haveKoreanChars = function(s){
    return /^[\u1100-\u11FF\u3130-\u318F\uA960-\uA97F\uAC00-\uD7AF\uD7B0-\uD7FF]+$/.test(s);
}

RsUtil.haveArabicChars = function(s){
    return /^[\u0600-\u06FF]+$/.test(s);
}


severe = function(text) {
	if (text == null) {
		text = "null";
	}
	console.log("[SEVERE] " + text);
}

function isIE() {
  var myNav = navigator.userAgent.toLowerCase();
  return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
}

function formatQueryFromMap(obj) {
	if (obj == null) {
		return "";
	}
	var str = [];
	for(var p in obj) {
	    if (obj.hasOwnProperty(p)) {
      		str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    	}
	}
	return str.join("&");
}

/*!
 * jQuery-ajaxTransport-XDomainRequest - v1.0.4 - 2015-03-05
 * https://github.com/MoonScript/jQuery-ajaxTransport-XDomainRequest
 * Copyright (c) 2015 Jason Moon (@JSONMOON)
 * Licensed MIT (/blob/master/LICENSE.txt)
 */
(function(factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as anonymous module.
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    // CommonJS
    module.exports = factory(require('jquery'));
  } else {
    // Browser globals.
try {
    factory(jQuery);
}
catch (e) {
//	console.log(e);
}
  }
}(function($) {

// Only continue if we're on IE8/IE9 with jQuery 1.5+ (contains the ajaxTransport function)
if ($.support.cors || !$.ajaxTransport || !window.XDomainRequest) {
  return $;
}

var httpRegEx = /^(https?:)?\/\//i;
var getOrPostRegEx = /^get|post$/i;
var sameSchemeRegEx = new RegExp('^(\/\/|' + location.protocol + ')', 'i');

// ajaxTransport exists in jQuery 1.5+
$.ajaxTransport('* text html xml json', function(options, userOptions, jqXHR) {

  // Only continue if the request is: asynchronous, uses GET or POST method, has HTTP or HTTPS protocol, and has the same scheme as the calling page
  if (!options.crossDomain || !options.async || !getOrPostRegEx.test(options.type) || !httpRegEx.test(options.url) || !sameSchemeRegEx.test(options.url)) {
    return;
  }

  var xdr = null;

  return {
    send: function(headers, complete) {
      var postData = '';
      var userType = (userOptions.dataType || '').toLowerCase();

      xdr = new XDomainRequest();
      if (/^\d+$/.test(userOptions.timeout)) {
        xdr.timeout = userOptions.timeout;
      }

      xdr.ontimeout = function() {
        complete(500, 'timeout');
      };

      xdr.onload = function() {
        var allResponseHeaders = 'Content-Length: ' + xdr.responseText.length + '\r\nContent-Type: ' + xdr.contentType;
        var status = {
          code: 200,
          message: 'success'
        };
        var responses = {
          text: xdr.responseText
        };
        try {
          if (userType === 'html' || /text\/html/i.test(xdr.contentType)) {
            responses.html = xdr.responseText;
          } else if (userType === 'json' || (userType !== 'text' && /\/json/i.test(xdr.contentType))) {
            try {
              responses.json = $.parseJSON(xdr.responseText);
            } catch(e) {
              status.code = 500;
              status.message = 'parseerror';
              //throw 'Invalid JSON: ' + xdr.responseText;
            }
          } else if (userType === 'xml' || (userType !== 'text' && /\/xml/i.test(xdr.contentType))) {
            var doc = new ActiveXObject('Microsoft.XMLDOM');
            doc.async = false;
            try {
              doc.loadXML(xdr.responseText);
            } catch(e) {
              doc = undefined;
            }
            if (!doc || !doc.documentElement || doc.getElementsByTagName('parsererror').length) {
              status.code = 500;
              status.message = 'parseerror';
              throw 'Invalid XML: ' + xdr.responseText;
            }
            responses.xml = doc;
          }
        } catch(parseMessage) {
          throw parseMessage;
        } finally {
          complete(status.code, status.message, responses, allResponseHeaders);
        }
      };

      // set an empty handler for 'onprogress' so requests don't get aborted
      xdr.onprogress = function(){};
      xdr.onerror = function() {
        complete(500, 'error', {
          text: xdr.responseText
        });
      };

      if (userOptions.data) {
        postData = ($.type(userOptions.data) === 'string') ? userOptions.data : $.param(userOptions.data);
      }
      xdr.open(options.type, options.url);
      xdr.send(postData);
    },
    abort: function() {
      if (xdr) {
        xdr.abort();
      }
    }
  };
});

return $;

}));

/**
Load data with cross-domain request even in IE8.
Aggregates solution by Jason Moon
https://github.com/MoonScript/jQuery-ajaxTransport-XDomainRequest
*/

RsUtil.asyncLoad = function(ob) {
	if (isIE()) {
		var url = ob.url + "?" + formatQueryFromMap(ob.data);
        $.getJSON(url).done(function(data) {
			if (ob.success) {
				ob.success(data, null, null);
			}        	
        });
		
		return;
	}

	$.ajax({
		url: ob.url,
		data: ob.data,
		dataType: "json",
		timeout: ob.timeout,
//no sense	crossDomain:true,
		success: function ( data, textStatus, jqXHR ) {
			if (ob.success) {
				ob.success(data, textStatus, jqXHR);
			}
		}, 
		error: function ( jqXHR, textStatus, errorThrown ) {
			if (ob.error) {
				ob.error(jqXHR, textStatus, errorThrown);
			}
		},
		complete: function ( jqXHR, textStatus ) {
			if (ob.complete) {
				ob.complete(textStatus, jqXHR);
			}
		}
	});
}


