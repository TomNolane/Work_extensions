
function ButtonController(host) {
	this.host = host;
	this.optionsUser = host.optionsUser;
    this.locationId2 = '5128581';
    this.locationName2 = "";
	this.weatherLoadRequest = null;
    this.temperature = NaN;
    this.nameCity = "";
    this.timeOutCurrent = null;
    this.errorTimeOutCurrent = null;
    

    this.WeatherUtil = new WeatherUtil();
}

ButtonController.prototype.start = function() {
	var o = this.optionsUser;

    this.locationId2 = o.getLocationId();
	this.locationName2 = o.get(Options.NAME_CITY);
	this.updateWeather();
	this.updateBadgeTemperature();

    this.host.onOptionsTotalChange = RsUtil.createDelegate(this, this.onOptionsTotalChange);
    this.host.onCurrentLocationChange = RsUtil.createDelegate(this, this.onCurrentLocationChange);
    this.host.onCurrentLocationNameChange = RsUtil.createDelegate(this, this.onCurrentLocationNameChange);
}

ButtonController.prototype.onOptionsTotalChange = function(location) {
//alert("button.onOptionsTotalChange()");
	this.updateWeather();
}

ButtonController.prototype.onCurrentLocationChange = function(location) {
	this.updateWeather();
}

ButtonController.prototype.onCurrentLocationNameChange = function(name) {
	this.locationName2 = name;
    chrome.browserAction.setTitle({
    	title: name
    });
}
    
ButtonController.prototype.createCurrentWeatherUrl = function() {
	var o = this.optionsUser;
	var uin = o.getUin();

    var url = YO_SERVER_SCRIPT_URL 
    	+ '?request=current'
        + '&location=' + this.locationId2
        + '&client=toolbar'
        + '&auto_id=' + uin
    ;

    return url;
}

ButtonController.prototype.updateBadgeTemperature = function() {
//	alert("ButtonController.updateBadgeTemperature()");
// alert("getTemperatureUnit()=" + this.optionsUser.getTemperatureUnit());

	if (!isNaN(this.temperature)) {
	    chrome.browserAction.setBadgeText({
			text: WeatherUtil.formatTemperature(this.optionsUser.getTemperatureUnit(), this.temperature)
		});
	}
}

ButtonController.prototype.updateWeather = function () {
//alert("updateWeather()");
    if (this.timeOutCurrent) {
	    window.clearTimeout(this.timeOutCurrent);
	    this.timeOutCurrent = null;
    }
	
	if(this.errorTimeOutCurrent) {
	    window.clearTimeout(this.errorTimeOutCurrent);
	    this.errorTimeOutCurrent = null;
	}

    var url = this.createCurrentWeatherUrl();

    this.weatherLoadRequest = new XMLHttpRequest();
    this.weatherLoadRequest.onreadystatechange = RsUtil.createDelegate(this, this.onWeatherLoadStateChange);
    this.weatherLoadRequest.open("GET", url, true);
    this.weatherLoadRequest.send(null);
}

ButtonController.prototype.onWeatherLoadStateChange = function() {      
 	if(!this.weatherLoadRequest
	|| this.weatherLoadRequest.readyState != 4) {
 		return;
 	}

	if (this.weatherLoadRequest.status != 200) {
	    this.errorTimeOutCurrent = window.setTimeout(
	    	RsUtil.createDelegate(
	    		this,
				this.updateWeather
			),
			20000
		);
		return;
	}


    var parser = new DOMParser();
      var dom = parser.parseFromString(this.weatherLoadRequest.responseText, "text/xml");
    if (!dom) {
        window.setTimeout(RsUtil.createDelegate(this, this.updateWeather), 20000);
        return;
    }

    var response = dom.getElementsByTagName("response")[0];
	var node;
	var weather = XmlUtil.getChild(dom, "response/weather");
	
	this.temperature = XmlUtil.getChild(weather, "temperature/@value");

    var tempText = "?";
	if (!isNaN(this.temperature)) {
		tempText = WeatherUtil.formatTemperature(this.optionsUser.getTemperatureUnit(), this.temperature);
	}

//d tempText = "25";

    chrome.browserAction.setBadgeText({
    	text: tempText
    });

     chrome.browserAction.setTitle({
     	title: this.locationName2
     });
    chrome.browserAction.setBadgeBackgroundColor({
//
    	color: [0x40, 0x79, 0xAE, 100]
//     	color: [0x0, 0x0, 0xD0, 100]
//d	
//    	color: [0x0, 0x0, 0xD0, 1]
    });

    try{
        var imageName = WeatherUtil.findSkyImageId(weather, false);

//d imageName = "rain";


		chrome.browserAction.setIcon({
			path: '/img/weather/' + imageName + ".png"
		});

    }
    catch(e) {
    	severe("current weather image error, e...\n" + e);
    };
    
    var maxAge = XmlUtil.getChild(dom, "response/httpHeaders/@maxAge");
//p severe("maxAge=" + maxAge);
    if (!isNaN(maxAge)) {
	    maxAge = Number(maxAge) + 65;
	    this.timeOutCurrent = window.setTimeout(
	    	RsUtil.createDelegate(
	    		this,
				this.updateWeather
			),
			Number(maxAge) * 1000
		);
	}
}
