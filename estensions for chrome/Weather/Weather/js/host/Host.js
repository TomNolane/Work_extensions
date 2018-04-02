
function Host() {                             	
    this.defaultOptionsXml = null;
	this.defaultOptionsDom = null;
	
    this.locationId = '5128581';
    this.locationName = "";
    this.optionsUser = new Options(KEY_USER_OPTIONS);
	this.licenseStatus = null;
}

Host.prototype.init = function() {
	this.readDefaultOptionsDom();	

	var userOptionsXml = localStorage.getItem(KEY_USER_OPTIONS);
	this.licenseStatus = localStorage.getItem(KEY_LICENSE_STATUS);
	var haveOptions = userOptionsXml != null;

	var firstStart = (!haveOptions);
	if (!haveOptions) {
		userOptionsXml = this.defaultOptionsXml;
	}

    this.optionsUser.read(userOptionsXml);

	if (
		firstStart
//d true
	) {

	    var location = this.syncDetectLocation();
//	alert("auto-location...\n" + XmlUtil.format(location));

    	var o = this.optionsUser;

//o	        o.setAutoLocation(location);

		var id = location.getAttribute('id');
		var existingLocation = o.findLocationNode(id);
		if (existingLocation) {
			o.setAsHomeLocation(id);
		}
		else {
			var isHome = true;
			o.addLocation(location, isHome);
		}
		
		var uin = (new Date()).getTime().toString(16);
		o.setUin(uin);

	    var unitSystemId = "metric";
		if (RsChromeUtil.isUsChromeLocale()) {
			unitSystemId = 'us';
		}
		else if (RsChromeUtil.isRussianChromeLocale()) {
			unitSystemId = 'russia';
		}
		o.setUnitSystem(unitSystemId);

	    o.save();
	}
    
	this.readOptions();

	this.buttonController = new ButtonController(myHost);
	this.buttonController.start();

	try {
		this.loadFullAutoLocationInfo();
	}
	catch (e) {
		alert("e...\n" + e);
	}
}

Host.prototype.readOptions = function() {
    this.needSave = false;
	this.readCurrentLocation();
	
	if (this.needSave) {
	    this.optionsUser.save();
	}
}

Host.prototype.onRestoreSettings = function(event) {
    this.optionsUser.read(event.attribute);
	this.optionsUser.save();

	this.readOptions();
	this.onOptionsTotalChange();
}

Host.prototype.onInspectorItemVisibleChange = function(event) {
    var name = event.attribute;
    var parentName = "";
	if (name == "location" 
	|| name == "weather" 
	|| name == "astronomy") {
//EMPTY
	}
	else if (name == "sunrise" 
	|| name == "sunset" 
	|| name == "dayLength" 
	|| name == "moonPhase") {
	    parentName = "astronomy";
    }
	else {
	    parentName = "weather";
    }

	var b = XmlUtil.parseBoolean(event.attribute2);
	if(this.optionsUser.isInspectorItemVisible(name, parentName) == b) {
	    return;
	}

	this.optionsUser.setInspectorItemVisible(name, parentName, b);
	this.optionsUser.save();
}


Host.prototype.onUnitSystemChange = function(event) {  
//alert("Host.onUnitSystemChange()");
    this.optionsUser.setUnitSystem(event.attribute);
    this.optionsUser.save();

	this.buttonController.updateBadgeTemperature();
}

Host.prototype.onCustomUnitSystemAspectChange = function(event) {
	var aspectId = event.attribute;
	var value = event.attribute2;
//alert("onCustomUnitSystemAspectChange(), aspect=" + aspectId + ", value=" + value);

    this.optionsUser.setCustomAspect(aspectId, value);
    this.optionsUser.save();

	this.buttonController.updateBadgeTemperature();
}

Host.prototype.onAddLocation = function(event) {
    var parser = new DOMParser();
    var dom = parser.parseFromString(event.attribute, "text/xml");
	var location = dom.firstChild;
//p alert("location...\n" + XmlUtil.format(location));
	var isHome = event.attribute2;
	if (isHome == null) {
		isHome = false;
	}
	this.optionsUser.addLocation(location, isHome);
	this.optionsUser.save();

	if (isHome) {
        this.locationId = location.getAttribute("id");
    	this.locationName = this.optionsUser.getUserNameCity(location);
		this.onCurrentLocationChange();
	}
}

Host.prototype.onRenameLocation = function(event) {
    var locationId = event.attribute;
//p    	alert("main.renameLocation(), id=" + locationId);
    var location = this.optionsUser.getLocationForId(locationId);
    var name = event.attribute2;

    this.optionsUser.renameLocation(location, name);
	this.optionsUser.save();

	if (this.locationId == locationId) {
		this.onCurrentLocationNameChange(name);
	}
}

Host.prototype.onSetAsHomeLocation = function(event) {
    var locationId = event.attribute;
	var location = this.optionsUser.getLocationForId(locationId);
	if (!location) {
		severe("Home location not found, id=" + locationId);
		return;
	}

	this.optionsUser.setAsHomeLocation(locationId);
	this.optionsUser.save();

    this.locationId = locationId;
	this.locationName = this.optionsUser.getUserNameCity(location);
	this.onCurrentLocationChange();
}

Host.prototype.onDeleteLocation = function(event) {
    this.optionsUser.deleteLocation(event.attribute);
	this.optionsUser.save();
}

Host.prototype.onDownLocation = function(event) {
    this.optionsUser.downLocation(event.attribute);
	this.optionsUser.save();
}

Host.prototype.onUpLocation = function(event) {
    this.optionsUser.upLocation(event.attribute);
	this.optionsUser.save();
}

Host.prototype.onSetLandscapeStringForLocation = function(event) {
	var locationId = event.attribute;
	var landscapeString = event.attribute2;
	var locationNode = this.optionsUser.getLocationForId(locationId);
//p alert("set landscape for node, locationId=" + locationId + ", landscape=" + landscapeString);
//alert("node...\n" + XmlUtil.format(locationNode));
	locationNode.setAttribute('landscape', landscapeString);

	this.optionsUser.save();
}

Host.prototype.onHomeSelected = function(event) {
	this.optionsUser.setHomeSelected();
	this.optionsUser.save();
}

Host.prototype.onRequestOptionsXml = function(event, sender, sendResponse) {
    var xml = (new XMLSerializer()).serializeToString(this.optionsUser.getXMLDom());
    var response = {
		xml: xml
	}

	try {
		sendResponse(response);
	}
	catch (e) {
		severe("sendResponse() error, e...\n" + e);
	}
}

Host.prototype.syncDetectLocation = function() {
    var findLocationByIpRequest = new XMLHttpRequest();
	findLocationByIpRequest.open(
    	"GET",
	    YO_SERVER_SCRIPT_URL + "?request=world&id=auto&detail=full&client=toolbar",
	    false
	);

	try {
        findLocationByIpRequest.send(null);
    }
    catch (e) {
    	console.log("load error...\n" + e);
    }

	var success = (findLocationByIpRequest.status == 200);

	var location = null;
    if (success) {
        var parser = new DOMParser();
      	var xmlDoc = parser.parseFromString(findLocationByIpRequest.responseText, "text/xml");
        var response = xmlDoc.getElementsByTagName("response")[0];
        var autoLocationNode = response.getElementsByTagName("l")[0];
	    location = this.optionsUser.createLocationNodeFromServerNode(autoLocationNode);
    }
	else {
		location = this.optionsUser.createNewYorkNode();
	}

//p alert("autoLocation...\n" + XmlUtil.format(location));

	return location;
}

Host.prototype.onFireworkLastDateChange = function(e) {
	var isoDate = e.attribute;
	var firework = XmlUtil.getChild(this.optionsUser.wimo, "fun/firework", true);
	firework.setAttribute('lastDate', isoDate);
	this.optionsUser.save();
//p		alert("onFireworkLastDateChange(), isoDate=" + isoDate);
//		alert("fun...\n" + XmlUtil.format(XmlUtil.getChild(this.optionsUser.wimo, 'fun')));
 }

Host.prototype.onRequestWidgetParameters = function(request, sender, sendResponse) {
	var o = this.optionsUser;

	var landscapeString = o.getDefaultLandscapeString();

	var favoriteLocationsNode = o.getFavoriteLocationsNode();
	var inspectorNode = o.get(Options.INSPECTOR_NODE);

	var unitSystem  = o.getUnitSystem();    	
	var temperature = o.getCustomAspect("temperature");
	var wind_speed  = o.getCustomAspect("wind_speed");
	var pressure    = o.getCustomAspect("pressure");
	var pressureLevel   = o.getCustomAspect("pressure_level");
	var distance    = o.getCustomAspect("distance");
	var rain_rate   = o.getCustomAspect("rain_rate");
	var uin = o.getUin();
	var fireworkLastDate = XmlUtil.getChild(o.wimo, "fun/firework/@lastDate");

    var response = {
		licenseStatus: this.licenseStatus,
        locationId: this.locationId,            
        locationName: this.locationName,
        landscapeString: landscapeString,
        timeFormat: RsChromeUtil.getAutoTimeFormat(),
        unitSystem: unitSystem,
        temperature: temperature,
        wind_speed: wind_speed,
        pressure: pressure,
        pressure_level: pressureLevel,
        distance: distance,
        rain_rate: rain_rate,

//note: when node passed directly an exception is thrown:
// "Converting circular structure to JSON"
        inspectorNodeXml: (new XMLSerializer()).serializeToString(inspectorNode),

//note: when favoriteLocationsNode passed directly an exception is thrown:
// "Converting circular structure to JSON"
        favoriteLocationsXml: (new XMLSerializer()).serializeToString(favoriteLocationsNode),

		fireworkLastDate: fireworkLastDate,

		uin: uin
	};

	try {
		sendResponse(response);
	}
	catch (e) {
		severe("sendResponse() error, e...\n" + e);
	}
}

Host.prototype.onRequestFullAutoLocationInfo = function(request, sender, sendResponse) {
    var response = {
        info: this.fullAutoLocationInfo
	};

	try {
		sendResponse(response);
	}
	catch (e) {
		severe("sendResponse() error, e...\n" + e);
	}
}


Host.prototype.readDefaultOptionsDom = function() {      
    this.defaultOptionsDom = new DOMParser();
	this.defaultOptionsXml = null;
    var path = "yowindow_default_params.xml";
    var r = new XMLHttpRequest();
    r.open("GET", path, false);
    r.send(null);
    if (r.status == 0 
	|| r.status == 200) {
	    this.defaultOptionsXml = r.responseText;
    }
    else {
    	severe("load error, path: " + path + ", status=" + r.status);
    }

    this.defaultOptionsDom = this.defaultOptionsDom.parseFromString(this.defaultOptionsXml, "text/xml");
}


Host.prototype.readCurrentLocation = function() {
    var o = this.optionsUser;
    this.locationId = o.getLocationId();
	this.locationName = o.get(Options.NAME_CITY);
}

Host.prototype.onOptionsTotalChange = function(location) {
}

Host.prototype.onCurrentLocationChange = function(location) {
}

Host.prototype.onCurrentLocationNameChange = function(name) {
}
    

Host.prototype.loadFullAutoLocationInfo = function() {
	if (this.fullAutoLocationInfoRequest) {
		this.fullAutoLocationInfoRequest.cancel();
	}
	var url = YO_SERVER_SCRIPT_URL 
	+ "?request=world&id=auto"
	+ "&client=toolbar&detail=full&output=json&version=2";
	var lang = RsChromeUtil.getChromeLanguage();
	url += "&lang=" + lang;
	this.fullAutoLocationInfo = null;

	var request = new XhrRequest(url);
	
	var self = this;
	request.onLoad = function() {
		console.log("request.onLoad()");
		self.onFullAutoLocationRequestLoad();
    }
	request.onTimeout = function() {
		console.log("request.onTimeOut()");
//o		self.onFullLocationRequestTimeOut();
    }

    request.onCancel = function() {
		console.log("request.onCancel()");
//o		self.fullLocationInfoRequest = null;
    }
    
	this.fullAutoLocationInfoRequest = request;
    request.start();
}

Host.prototype.onFullAutoLocationRequestLoad = function() {
	this.fullAutoLocationInfo = this.fullAutoLocationInfoRequest.response.response.l;
//	alert("autoLocation.name=" + this.fullAutoLocationInfo["@name"]);
}
