
this.isYoWidgetReady = false;

function ExtensionWidgetController(width, height) {
	this.widgetWidth = width;
	this.widgetHeight = height;
}

ExtensionWidgetController.prototype.asyncInit = function() {
	var self = this;
    chrome.extension.sendMessage(
    	{
    		action: "onRequestWidgetParameters"
    	}, 
		function(response) {
 			try {
     			self.init(response);
     		}
     		catch (e) {
     			severe("init() exception...\n" + e);
     		}
     	}
    );
}

ExtensionWidgetController.prototype.init = function(e) {
//	console.log("ExtensionWidgetController.init(), e.licenseStatus=" + e.licenseStatus);
	var locationId = e.locationId.replace("gn:","");
	var locale = RsChromeUtil.getChromeLocale();
    var flashVars = {
//!!		licenseStatus: e.licenseStatus,
		locale: locale,
		location_id: locationId,
        location_name: e.locationName,
		landscape: e.landscapeString,
        us: e.unitSystem,
        time_format: e.timeFormat,
        client_id: 'toolbar',
		edition: 'chrome',
        full_screen_allowed: true,
		show_yowindow_link: false,
		desktop: true, //for Millie
//d 		trace: true,
		firework_last_date: e.fireworkLastDate,
		favorite_locations_xml: e.favoriteLocationsXml
	};

	var fv = flashVars;
  
    if (e.unitSystem == "custom") {
        fv.u_temperature = e.temperature;
        fv.u_wind_speed = e.wind_speed;
        fv.u_pressure = e.pressure;
        fv.u_pressure_level = e.pressure_level;
        fv.u_distance = e.distance;
        fv.u_rain_rate = e.rain_rate;
    }

   	if (e.uin) {
   		fv.auto_id = e.uin;
   	}
    
	this.fillInspectorFlashVars(e.inspectorNodeXml, flashVars);

    var params = {
    	quality: "high",
    	bgcolor: "#FFFFFF",
		allowscriptaccess: "always",
		allowfullscreen: "true",
		menu: "false",
//    		wmode: "window"
		wmode: "opaque" //slower than "window", but flash.focus() works in this mode
    };

    var attributes = {
    	id:"yowidget",
    	name:"yowidget"
    };

    swfobject.embedSWF(
    	"yowidget/yowidget.swf",
    	"yowidget_place", 
//"100%",
//"100%",
    	this.widgetWidth, 
		this.widgetHeight,
    	"10.1.0",
    	"js/ext/expressInstall.swf",
    	flashVars,
    	params,
    	attributes
    );

	var f = swfobject.getObjectById('yowidget');
 	if (f) {
   		f.tabIndex = 0;
   		f.focus();
 	}
}

ExtensionWidgetController.prototype.fillInspectorFlashVars = function(inspectorNodeXml, flashVars) {
	var defaultVisible;
    var currentVisible = false;
    var parser = new DOMParser();
    var root = parser.parseFromString(inspectorNodeXml, "text/xml");
	var contents = root.getElementsByTagName("contents")[0];

	if (!contents) {
        console.log("widget.fillInspectorFlashVars(), inspector contents node missing");
		return;
	}

	this.deepFillInspectorFlashVars(flashVars, contents);
}

ExtensionWidgetController.prototype.deepFillInspectorFlashVars = function(flashVars, parent) {
	if (!parent) {
		alert("deepFillInspectorFlashVars() parent missing");
		return;
	}
    for (var i = 0 ; i < parent.childNodes.length ; i++) {
		var node = parent.childNodes[i];
		var TYPE_TEXT = 3;
		if (node.nodeType == TYPE_TEXT) {
			continue;
		}

		var name = node.nodeName;
		var visible = node.getAttribute("visible") == "true";
    	var defaultVisible = DEFAULT_INSPECTOR_VISIBLE_ITEMS[name] != null;
//p
//        console.log("i=" + i + ", node.name=" + name + ", visible=" + visible + ", defaultVisible=" + defaultVisible);

        if(visible != defaultVisible) {
        	var key  = "i_" + name;
        	var value = (visible ? "1" : "0");
            flashVars[key] = value;
        }
  	
		this.deepFillInspectorFlashVars(flashVars, node);
    }
}

var DEFAULT_INSPECTOR_VISIBLE_ITEMS = {
	weather: true,
	location: true,
	temperature: true,
	temperatureRange: true,
	feelsLike: true,
	skyImage: true,
	skyDescription: true,
	wind: true,
	pressure: true,
	humidity: true,
	precipitationChance: true,
	observeTime: true,
	sunrise: true,
	sunset: true,
	dayLength: true,
	moonPhase: true
};

function yowidget_onReady() {
//	
	console.log("yowidget_onReady()");
//	alert("yowidget_onReady()");
    this.isYoWidgetReady = true;
}

/* External Interface "Flash -> page" does not seem to work in Chrome.

function yowidget_onLocationInfoReady(locationId, name, path) {
//	console.log("yowidget_onLocationInfoReady(), locationId=" + locationId + ", name=" + name + ", path=" + path);
}
*/

function yowidget_onFireworkLastDateChange(isoDate) {
    chrome.extension.sendMessage({
		action: "onFireworkLastDateChange",
		attribute: isoDate
	}, function(response) {
	});
}
