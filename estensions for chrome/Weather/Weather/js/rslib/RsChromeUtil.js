

function RsChromeUtil() {
}


RsChromeUtil.getChromeLocale = function() {
	var chromeLocale = chrome.i18n.getMessage("@@ui_locale");
	return chromeLocale;
}

RsChromeUtil.getChromeLanguage = function() {
	var localeId = RsChromeUtil.getChromeLocale();
	if (localeId == null) {
		return null;
	}
	var index = localeId.indexOf("_");
	if (index == -1) {
		return localeId;
	}
	return localeId.substring(0, index);
}

RsChromeUtil.isUsChromeLocale = function() {
	var localeId = RsChromeUtil.getChromeLocale();
	return localeId.indexOf("_US") != -1;
}

RsChromeUtil.isRussianChromeLocale = function() {
	var localeId = RsChromeUtil.getChromeLocale();
	return localeId.indexOf("ru") == 0;
}

function L(st) {
	var locale = RsChromeUtil.getChromeLocale();
	if (locale) {
		locale = locale.substring(0, 2);
    	var localeMap = LOCALES[locale];
		if (!localeMap) {
			localeMap = LOCALES["en"];
		}

		if (localeMap) {
        	var localeSt = localeMap[st];
        	if (localeSt) {
        		return localeSt;
        	}
		}
	}

	return st;
}

RsChromeUtil.getAutoTimeFormat = function() {
	var chromeLocale = chrome.i18n.getMessage("@@ui_locale");
    var isUsa = chromeLocale == "en_US";
	if (isUsa) {
		return "12";
	}
    return "24";

/*Does not work in Chrome	
    var date = new Date(77, 11 - 1, 5, 20, 00);
    var s = date.toLocaleString();
    if (s.lastIndexOf("PM") == (s.length - 2) || s.indexOf("8:00") != -1) {
        return "12";
    }
*/

}

