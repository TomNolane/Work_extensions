
	document.addEventListener('DOMContentLoaded', onLoad);

	this.htmlCodeIsLoaded = false;
	this.optionsReady     = false;
	this.savedSettingsString = null;
    this.localObject = "notSet";

	this.localeAllowed = [{
        title : "English",
        id : "en"
    }, {
        title : "Русский",
        id : "ru"
    }, {
        title : "Deutsch",
        id : "de"
    }, {
        title : "Français",
        id : "fr"
    }, {
        title : "Español",
        id : "es"
    }, {
        title : "Italiano",
        id : "it"
    }, {
        title : "Nederlands",
        id : "nl"
    }, {
        title : "Dansk",
        id : "da"
    }, {
        title : "Български",
        id : "bg"
    }, {
        title : "Čeština",
        id : "cs"
    }, {
        title : "Slovak",
        id : "sk"
    }, {
        title : "Hrvatski",
        id : "hr"
    }, {
        title : "Română",
        id : "ro"
    }, {
        title : "Português",
        id : "pt"
    }, {
        title : "Ελληνικά",
        id : "el"
    }, {
        title : "Türkçe",
        id : "tr"
	}, {
        title : "日本語",
        id : "ja"
	}

, {title : "한국어",
        id : "ko"
	}

, {title : "中文 (简体)",
        id : "chs"
	}



];

/*o    
     var _gaq = _gaq || [];
     _gaq.push(['_setAccount', 'UA-465329-2']);
     _gaq.push(['_trackPageview']);

     (function() {
       var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
       ga.src = 'https://ssl.google-analytics.com/ga.js';
       var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
     })();
*/

		function onLoad() {
//p		severe("onLoad()");
			var ob;

			document.getElementById("dumpOptions").addEventListener("click", function() {
				dumpOptionsXml();
			});

			document.getElementById("test").addEventListener("click", function() {
				test();
			});


			document.getElementById("link_enter_rename_location").addEventListener("click", function() {
				enterRenameLocation();
			});
			document.getElementById("buttonRenameLocation").addEventListener("click", function() {
				renameLocation();
			});
			document.getElementById("renameLocation").addEventListener("keyup", function() {
				onRenameKeyUp();
			});


			ob = document.getElementById("listFavoriteLocations");
			ob.addEventListener("click", function(){
				onFavoriteLocationSelected();
			});
			ob.addEventListener("keydown", function(){
				onFavoriteLocationSelected();
			});

			ob = document.getElementById("openLocationChooser");
			ob.addEventListener("click", function(){
				openLocationChooser();
			});
			ob.addEventListener("mouseout", mouseOutHandler);
			ob.addEventListener("mouseover", mouseOverHandler);

			ob = document.getElementById("setAsHome");
			ob.addEventListener("click", function(){
				setAsHomeSelectedLocation();
			});
			ob.addEventListener("mouseout", mouseOutHandler);
			ob.addEventListener("mouseover", mouseOverHandler);

			ob = document.getElementById("delete");
			ob.addEventListener("click", function(){
				deleteLocation();
			});
			ob.addEventListener("mouseout", mouseOutHandler);
			ob.addEventListener("mouseover", mouseOverHandler);

			ob = document.getElementById("up");
			ob.addEventListener("click", function(){
				upLocation();
			});
			ob.addEventListener("mouseout", mouseOutHandler);
			ob.addEventListener("mouseover", mouseOverHandler);

			ob = document.getElementById("down");
			ob.addEventListener("click", function(){
				downLocation();
			});
			ob.addEventListener("mouseout", mouseOutHandler);
			ob.addEventListener("mouseover", mouseOverHandler);


			document.getElementById("landscape_village").addEventListener("click", function() {
				onLandscapeRadioChange();
			});
			document.getElementById("landscape_town").addEventListener("click", function() {
				onLandscapeRadioChange();
			});
			document.getElementById("landscape_americana").addEventListener("click", function() {
				onLandscapeRadioChange();
			});
			document.getElementById("landscape_seaside").addEventListener("click", function() {
				onLandscapeRadioChange();
			});
			document.getElementById("landscape_airport").addEventListener("click", function() {
				onLandscapeRadioChange();
			});
			document.getElementById("landscape_oriental").addEventListener("click", function() {
				onLandscapeRadioChange();
			});
			document.getElementById("landscape_valley").addEventListener("click", function() {
				onLandscapeRadioChange();
			});
			document.getElementById("landscape_sky").addEventListener("click", function() {
				onLandscapeRadioChange();
			});


    		document.getElementById("location-chooser-loading-retry").addEventListener("click", function(){
				onLocationChooserLoadingRetry();
			});
    		document.getElementById("location-chooser-loading-cancel").addEventListener("click", function(){
				onLocationChooserLoadingCancel();
			});


    		document.getElementById("locationChooserOk").addEventListener("click", function(){
				onLocationChooserOk();
			});
    		document.getElementById("locationChooserCancel").addEventListener("click", function(){
				onLocationChooserCancel();
			});

			if (Debug.prototype.on) {
				var debugDiv = document.getElementById('debug');
				debugDiv.style.display = 'block';
			}

            this.htmlCodeIsLoaded = true;

    		document.getElementById("restoreSettings").addEventListener("click", function(){
				restoreSettings();
			});

    	    chrome.extension.sendMessage(
    	    	{
    	    		action: "onRequestOptionsXml"
    	    	}, 
				function(response) {
					onLoadOptionsXml(response.xml);
             	}

    	    );

//d		testXhr();
	}

	function onLoadOptionsXml(xml) {
		this.savedSettingsString = xml;
		
		this.optionsUser = new Options();
		this.optionsUser.read(xml);
        
		var auto = false;
		var target = document.getElementById('unit_chooser');
           	
		this.yoUnitChooser = new YoUnitChooser(target, auto);
		var self = this;
		this.yoUnitChooser.onChange = function() {
       	    self.onUnitChooserChange();
       	}
		
		var place = document.getElementById('inspector_setup_place');
		this.inspectorSetup = new InspectorSetup(place);
		this.inspectorSetup.onItemChange = function(name) {
       		self.onInspectorItemChange(name);
       	}
                
        this.listFavoriteLocation = document.getElementById("listFavoriteLocations");
        translateHtml();
					
        var homeLocationId = this.optionsUser.getLocationId();
		this.selectedLocation = this.optionsUser.getLocation();
                
        fillLocationsSection();

        fillInspectorSection();
	    fillUnitsSection();
/*w		
       	var target = document.getElementById('location_chooser');
       	installLocationChooser(target);
		this.locationChooser.open(
		    "#auto"
		);

*/

		if (!this.optionsUser.isHomeSelected()) {
			var welcome = true;
			openLocationChooser(welcome);
		}
	}

function testXhr() {
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = handleStateChange; // Implemented elsewhere.
    xhr.open("GET", "http://chrome1.yowindow.com/cgi-bin/wimo/server/index.pl?request=world&client=toolbar&id=auto&detail=full&output=json&a=1", true);
    xhr.send();
}

var xhr;

function handleStateChange() {
   	if (xhr.readyState == 4) {
		alert(xhr.responseText);
	}
}

	function localeOptions(utils) {
		for (var i = 0 ; this.IDSToLocale[i] ; i++) {
		    var object = document.getElementById(this.IDSToLocale[i]);
		    if(object) {
				if(object.getAttribute("locale")) {
				    object.innerHTML = utils.get2(object.getAttribute("locale"));
				}
		    }
		}
	}
            

        
	this.lastID = 1;
    var myTraceText = "";
    var myRequest = null;
    this.dictGroup = new Object();
    this.copyedNeedReReadOptions = false;
    
    this.locationControlls = [
//    	"setAsDefaultLand",
        "urlLandRadio",
        "villageRadio",
        "renameLocation",
        "urlLandscape"
//        "rename",
//        "Down",
//        "up",
//        "delete",
//        "setAsHome",
//        "addLocation"
    ];
    
    this.selectedLocation = null;

    
    function loadHTMLCode() {
		this.htmlCodeIsLoaded = true;
    }

    this.events = {};
	    
    function addEventListener(typeEvent,func) {
        this.events[typeEvent] = func;
    }

    function eventer(request, sender, sendResponse) {
        if(this.events[request.action]) {
            this.events[request.action](request);
        }
    }
    
    chrome.extension.onRequest.addListener(eventer);
	    
    function dispatchEvent(type,arg) {
    	chrome.extension.sendMessage({
    			action: type,
				attribute:arg
			}, 
			function(response) {
			}
		);
    }

    function dispatchEvent2(type,arg,arg2) {
		chrome.extension.sendMessage({
    			action: type,
                attribute:arg,
                attribute2:arg2
            }, 
            function(response) {
            }
       	);
	}
	    
    function fillLocationsSection() {
        updateLocationsList();
        setEnabledLocationControlls(true);
    }

    function setEnabledLocationControlls(value) {              
        for (var i = 0 ; i < this.listFavoriteLocation.options.length ; i++) {
            setEnabledControl(value, this.listFavoriteLocation.options[i]);
        }
        this.listFavoriteLocation.disabled = !value;
		

        var lc = window.lc;
        if(lc) {
//p console.log("setEnabled=" + value);
            lc.setEnabled(value);
        }

        this.locationSettingsEnabled = value;
        for(var i = 0 ; i < this.locationControlls.length ; i++) {
            setEnabledControl(value, document.getElementById(this.locationControlls[i]));
        }
    }
	    
	    
	function fillInspectorSection() {
//p alert("fillInspectorSection()");

		var options = this.optionsUser;
	
		this.inspectorSetup.setItemVisible(
			"location",
            options.isInspectorItemVisible("location")
        );
		
		this.inspectorSetup.setItemVisible(
			"weather",
			options.isInspectorItemVisible("weather")
		);

		this.inspectorSetup.setItemVisible(
			"astronomy",
			options.isInspectorItemVisible("astronomy")
		);

		this.inspectorSetup.setItemVisible("temperature", 
			options.isInspectorItemVisible("temperature", "weather"));
		this.inspectorSetup.setItemVisible("temperatureRange",
			options.isInspectorItemVisible("temperatureRange", "weather"));
		this.inspectorSetup.setItemVisible("skyImage", 
			options.isInspectorItemVisible("skyImage", "weather"));
		this.inspectorSetup.setItemVisible("skyDescription", 
			options.isInspectorItemVisible("skyDescription", "weather"));
		this.inspectorSetup.setItemVisible("wind", 
			options.isInspectorItemVisible("wind", "weather"));
		this.inspectorSetup.setItemVisible("pressure", 
			options.isInspectorItemVisible("pressure", "weather"));
		this.inspectorSetup.setItemVisible("humidity", 
			options.isInspectorItemVisible("humidity", "weather"));
		this.inspectorSetup.setItemVisible("dewPoint", 
			options.isInspectorItemVisible("dewPoint", "weather"));
		this.inspectorSetup.setItemVisible("feelsLike",
			options.isInspectorItemVisible("feelsLike", "weather"));
		this.inspectorSetup.setItemVisible("precipitationChance",
			options.isInspectorItemVisible("precipitationChance", "weather"));
		this.inspectorSetup.setItemVisible("precipitationAmount",
			options.isInspectorItemVisible("precipitationAmount", "weather"));
		this.inspectorSetup.setItemVisible("snowLevel",
			options.isInspectorItemVisible("snowLevel", "weather"));
		this.inspectorSetup.setItemVisible("dailyRainTotal",
			options.isInspectorItemVisible("dailyRainTotal", "weather"));
		this.inspectorSetup.setItemVisible("uv", 
			options.isInspectorItemVisible("uv", "weather"));
		this.inspectorSetup.setItemVisible("visibility", 
			options.isInspectorItemVisible("visibility", "weather"));
		this.inspectorSetup.setItemVisible("observeTime",
			options.isInspectorItemVisible("observeTime", "weather"));

		this.inspectorSetup.setItemVisible("sunrise",
			options.isInspectorItemVisible("sunrise", "astronomy"));
		this.inspectorSetup.setItemVisible("sunset",
			options.isInspectorItemVisible("sunset", "astronomy"));
		this.inspectorSetup.setItemVisible("dayLength",
			options.isInspectorItemVisible("dayLength", "astronomy"));
		this.inspectorSetup.setItemVisible("moonPhase",
			options.isInspectorItemVisible("moonPhase", "astronomy"));
	    }

	    function onInspectorItemChange(name) {
    		var parentName = "";
    		if (name == "location"
			|| name == "weather"
			|| name == "astronomy") {
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

//p alert("parentName=" + parentName + ", name=" + name);

			var b = this.inspectorSetup.isItemVisible(name, parentName);
    		this.optionsUser.setInspectorItemVisible(name, parentName, b);

			dispatchEvent2(
				"onInspectorItemVisibleChange",
                name,
                XmlUtil.formatBoolean(b)
			);
		}
	    
	    function fillUnitsSection() {
			var options = this.optionsUser;
		
			if (options.getUnitSystem() == "auto-detected") {
			    this.yoUnitChooser = new YoUnitChooser(document.getElementById('unit_chooser'), true);
			}
			else if(options.getUnitSystem() == "custom") {
    			this.yoUnitChooser.setUnitSystemId("custom");
    		    this.yoUnitChooser.setCustomAspect("temperature", options.getCustomAspect("temperature"));
    		    this.yoUnitChooser.setCustomAspect("wind_speed", options.getCustomAspect("wind_speed"));
    		    this.yoUnitChooser.setCustomAspect("pressure", options.getCustomAspect("pressure"));
    		    this.yoUnitChooser.setCustomAspect("pressure_level", options.getCustomAspect("pressure_level"));
    		    this.yoUnitChooser.setCustomAspect("distance", options.getCustomAspect("distance"));
    		    this.yoUnitChooser.setCustomAspect("rain_rate", options.getCustomAspect("rain_rate"));
    		    this.yoUnitChooser.updateAspectLines();
    		}
			else {
    		    this.yoUnitChooser.setUnitSystemId(options.getUnitSystem());
    		}
	    }

    	function onUnitChooserChange() {
           	var uc = this.yoUnitChooser;
           	var unitSystemId = uc.getUnitSystemId();
           	
           	this.optionsUser.setUnitSystem(unitSystemId);
           	if (unitSystemId == 'custom') {
    	   	    var system = uc.getSystem('custom');
       		    for (var aspect in system) {
           	        if (aspect == 'name') {
           				continue;
           	    	}
            		var value = system[aspect];
            		this.optionsUser.setCustomAspect(aspect, value)
            		dispatchEvent2("onCustomUnitSystemAspectChange", aspect, value);
           	    }
        	}
           	dispatchEvent("onUnitSystemChange", unitSystemId);
    	}

        function removeDisabled(object) {
			if(object.getAttribute("disabled")) {
		    	object.removeAttribute("disabled");
			}
		}

        function setEnabledControl(value, button) {
        	if (!button) {
            	return;
        	}
            if (button.localName == "span" || button.localName == "option") {
                var currentClass = button.getAttribute("class");
                if(value) {
                    var indexSelectedClass = currentClass.indexOf("disabled");
                    if(indexSelectedClass != -1) {
                        button.setAttribute(
							"class", 
							removeClassFromString(button.getAttribute("class"),
							"disabled")
						);
                        if (button.getAttribute("d_onclick")) {
                            button.setAttribute("onclick",button.getAttribute("d_onclick"));
                        }
                    }
                }else{
                    button.setAttribute("class",currentClass+" disabled");
                    if (button.getAttribute("onclick") != "return;") {
                        button.setAttribute("d_onclick",button.getAttribute("onclick"));
                    }
                    button.setAttribute("onclick","return;");
                }
            }
            else if(button.localName == "input") {
                if(!value) {
                    button.setAttribute("disabled",true);
                }
                else{
                    removeDisabled(button);
                }		    
            }
            else if(button.localName == "button") {
			    button.disabled = !value;
			}                 
        }

    function removeAllChildNodes(node) {
        if (node 
        && node.hasChildNodes 
        && node.removeChild) {
		    while (node.hasChildNodes()) {
				node.removeChild(node.firstChild);
		    }
	    }
    }
            
            
    function onFavoriteLocationSelected() {
    	var list = this.listFavoriteLocation;
        if(list.selectedIndex == -1) {
	    	return;
		}

        this.indexLocationSelected = list.selectedIndex;
        this.selectedLocation = this.optionsUser.getLocationByIndex(this.indexLocationSelected);

        reflectSelectedLocation();
    }
            
    function reflectSelectedLocation() {
	    var name = this.optionsUser.getUserNameCity(this.selectedLocation);
	    document.getElementById("locationName").innerHTML = name;
        document.getElementById("renameLocation").value = name;
        reflectLandscape();

        var b;
		var enabled;

		b = document.getElementById("delete");
		enabled = this.selectedLocation
		&& this.listFavoriteLocation.options.length > 1;		
		setEnabledControl(enabled, b);

		b = document.getElementById("setAsHome");
		var homeLocationId = this.optionsUser.getLocationId();
		enabled = homeLocationId != this.selectedLocation.getAttribute('id');
		setEnabledControl(enabled, b);

		b = document.getElementById("up");
		enabled = this.listFavoriteLocation.selectedIndex != 0;
		setEnabledControl(enabled, b);

        var favoriteListOptions = this.listFavoriteLocation.getElementsByTagName("option");

		b = document.getElementById("down");
		enabled = this.listFavoriteLocation.selectedIndex != favoriteListOptions.length - 1;
		setEnabledControl(enabled, b);
    }

	    

	function onLandscapeRadioChange() {
//p		console.log("onLandscapeRadioChange()");
		var landscapeGroup = document.getElementsByName('landscape');
		var checkedButton = getCheckedButton(landscapeGroup);
		var buttonId = checkedButton.id;

		var alias = 'village';
		
		var LANDSCAPE_PREFIX = 'landscape_';
		var index = buttonId.indexOf(LANDSCAPE_PREFIX);
		if (index != -1) {
			alias = buttonId.substring(LANDSCAPE_PREFIX.length);
		}

		var landscapeString = alias;
//p		alert("landscapeString=" + landscapeString);
		var locationId = this.selectedLocation.getAttribute("id");
		this.selectedLocation.setAttribute('landscape', landscapeString);
		this.optionsUser.setLandscapeStringForLocationId(locationId, landscapeString);
		dispatchEvent2("onSetLandscapeStringForLocation", locationId, landscapeString);
	}

    function reflectLandscape() {
//p	    console.log("reflectLandscape()");
        var locationId = this.selectedLocation.getAttribute("id");
		var landscapeString = this.optionsUser.getLandscapeStringForLocationId(locationId);

	    var buttonId = 'landscape_village';
	    var alias = landscapeString;
	    if (alias) {
	    	buttonId = 'landscape_' + alias;
	    }

		var landscapeGroup = document.getElementsByName('landscape');
		checkButton(landscapeGroup, buttonId);	
	}

	    	    
	    
	    function setAsHomeSelectedLocation() {
			var id = this.selectedLocation.getAttribute("id");
			if(this.optionsUser.setAsHomeLocation(id)) {
	            //window.external.setAsHomeLocation(this.selectedLocation.getAttribute("id"));
		    	dispatchEvent("onSetAsHomeLocation", id);
                updateLocationsList();
            }
            else {
            	severe(this.selectedLocation.getAttribute("id")+" not found in FavoriteCollection")
			}
		}

		function enterRenameLocation() {
			var staticName = document.getElementById("name_static");
			var dynamicName = document.getElementById("name_dynamic");
			staticName.style.display = "none";
			dynamicName.style.display = "block";
			var input = document.getElementById("renameLocation");
			input.focus();
		}

		function exitRenameLocation() {
			var staticName = document.getElementById("name_static");
			var dynamicName = document.getElementById("name_dynamic");
			staticName.style.display = "block";
			dynamicName.style.display = "none";
		}

        function renameLocation() {
            if (this.selectedLocation) {
                this.optionsUser.renameLocation(
                	this.selectedLocation,
                    document.getElementById("renameLocation").value
                );
	    
			    dispatchEvent2(
			    	"onRenameLocation",
                    this.selectedLocation.getAttribute("id"),
                    document.getElementById("renameLocation").value
                );
                updateLocationsList();
            }
			exitRenameLocation();
        }
	    
		function onRenameKeyUp() {
            if(event.keyCode == 13){
                renameLocation();
            }
		}

        function deleteLocation() {
            if(!this.selectedLocation
            || this.listFavoriteLocation.options.length <= 0) {
				return;
			}

			this.lastID = this.lastID + 1;
            var rand = Math.random();
            
            var index = parseInt(this.indexLocationSelected);
            this.optionsUser.deleteLocation(index);
            dispatchEvent("onDeleteLocation", index);
    
            if (this.selectedLocation.getAttribute("id") == this.optionsUser.getLocationId()) {
                this.optionsUser.setAsHomeLocation(this.optionsUser.getLocationIDbyIndex(0));
				dispatchEvent("onSetAsHomeLocation", this.optionsUser.getLocationIDbyIndex(0));			                                          
            }

            var favoriteLocations = this.optionsUser.getFavoriteLocationsNode();
			var locations = favoriteLocations.getElementsByTagName("location");
			var nextIndex = index;
            if (nextIndex >= locations.length) {
            	nextIndex--;
            }
            this.selectedLocation = locations[nextIndex];

            updateLocationsList();
        }

        function upLocation() {
            if (this.selectedLocation) {
	    		dispatchEvent("onUpLocation", this.indexLocationSelected)		    
                this.optionsUser.upLocation(this.indexLocationSelected);
                updateLocationsList();
            }
        }

        function downLocation() {
            if (this.selectedLocation) {
	    		dispatchEvent("onDownLocation", this.indexLocationSelected);		    
                this.optionsUser.downLocation(this.indexLocationSelected);
				updateLocationsList();
            }
        }
    
        function updateLocationsList() {
			var options = this.optionsUser;
            removeAllChildNodes(this.listFavoriteLocation)
            
            var favoriteLocations = options.getFavoriteLocationsNode();
			if (favoriteLocations) {
				fillFavoriteLocations(options);
			}
			else {
				var location = options.getLocation();
            	var option = document.createElement("option");
                option.setAttribute("class","option");
            	option.selected = true;
                this.indexLocationSelected = 0;
//w	            this.selectedOption = option;

                option.innerHTML = options.getUserNameCity(location);
                this.listFavoriteLocation.appendChild(option);				
			}
            reflectSelectedLocation();
        }

		function fillFavoriteLocations(options) {
            var favoriteLocations = options.getFavoriteLocationsNode();
			var homeLocationId = options.getLocationId();
            var selectedId = null;
            if (this.selectedLocation) {
            	selectedId = this.selectedLocation.getAttribute('id');
            }
			var locations = favoriteLocations.getElementsByTagName("location");
            for (var i = 0; i < locations.length; i++) {
                var locationCurrent = locations[i];
                var option = document.createElement("option");
	
                option.setAttribute("class","option");
                option.setAttribute("onclick","onFavoriteLocationSelected();");
                
                var locationId = locationCurrent.getAttribute("id");
                if (selectedId == locationId) {
                	option.selected = true;
                    this.indexLocationSelected = i;
//w		            this.selectedOption = option;
                }

//p alert("locationId=" + locationId);

                option.innerHTML = options.getUserNameCity(locationCurrent) 
                	+ (homeLocationId == locationId ? " (<span locale=\"Home\">" + L("Home") + "</span>)":"")
                option.setAttribute("id", locationId);
                this.listFavoriteLocation.appendChild(option);
            }
		}
	    
    function groupButtonController(target) {
        var controlledGroup = target.getAttribute("group");
        var lastObjectInControlledGroup = this.dictGroup[controlledGroup];
        if (lastObjectInControlledGroup) {
            var currentClass = lastObjectInControlledGroup.getAttribute("class");
			lastObjectInControlledGroup.setAttribute(
				"class",
	            removeClassFromString(currentClass, "selected")
	        );
        }
        target.setAttribute("class", target.getAttribute("class") + " selected");
        this.dictGroup[controlledGroup] = target;
    }

        function mouseOverHandler(e) {
/*!!
            if(object) {
    		    if(object.tagName == "BUTTON") {
    				return;
    		    }
    		    var currentClass = object.getAttribute("class");
                if(currentClass.indexOf("hover") != -1 || currentClass.indexOf("disabled") != -1) {
    				return;
    		    }
    		    object.setAttribute("class",object.getAttribute("class") + " hover");
    		}
*/
    	}

	    function removeClassFromString(currentClass,className) {
			var indexSelectedClass = currentClass.indexOf(className);
            if(indexSelectedClass!=-1) {
		    	currentClass = currentClass.substr(0, indexSelectedClass) +
				(currentClass.length > indexSelectedClass + className.length ? currentClass.substr(indexSelectedClass + className.length) : "");
			}
			return currentClass;
	    }

	    function mouseOutHandler(e) {
/*!!
	        if(object) {
			    if(object.tagName == "BUTTON") {
		    	    return;
			    }
                object.setAttribute("class", removeClassFromString(object.getAttribute("class"), "hover"));
			}
*/
    	}

	function translateHtml() {		
		var span = document.getElementById("rate");
		var html = L('<a>Vote for YoWindow</a>, thank you :)');
		html = html.replace("<a>", "<a class=\"yolink\" href=\"https://chrome.google.com/webstore/detail/fanogbnclpilemkifpjeglokomebpnef/reviews\">");
		span.innerHTML = html;

		deepTranslateHtml(document.getElementById("inner_container"));
	}

	function deepTranslateHtml(child) {
		if(!child) {
			return;
		}

	    if(child.localName == "label" 
		|| child.localName == "button"
        || child.localName == "h5"
        || child.localName == "h3"
        || child.localName == "span") {
	    	var localeKey = child.getAttribute("locale");
if (child.localName == "span") {
//	alert("key=" + localeKey);
}
			if(localeKey) {
				child.innerHTML = L(localeKey) ? L(localeKey) : localeKey;
//p console.log("localeKey=" + localeKey + ", text=" + (localeKey));
			}
		}

		if(child.hasChildNodes) {
		    var children = child.childNodes;
		    for (var i = 0 ; i < children.length ; i++) {
				deepTranslateHtml(children[i])
		    }
		}
	}
	        

	function restoreSettings() {
		if(!this.savedSettingsString) {
		    return;
		}
		this.optionsUser.read(this.savedSettingsString);
		dispatchEvent("onRestoreSettings", this.savedSettingsString);
		fillLocationsSection();
		fillUnitsSection();
		fillInspectorSection();    
    }

	function dumpOptionsXml() {
		console.log(
			XmlUtil.format(
				this.optionsUser.xmlDom	
			)
		);
	}   



function test() {
    console.log("onTestLinkClick()");
	chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
	    alert("token: " + token);
		verifyLicense(token);

//o
//      	chrome.identity.removeCachedAuthToken(
//    		{ 'token': token}, function() {}
//    	);


   	});	
}

//!!
function authenticatedXhr(method, url, callback) {
	var retry = true;
	function getTokenAndXhr() {
    	chrome.identity.getAuthToken({ 'interactive': true }, function (access_token) {
          	if (chrome.runtime.lastError) {
            	callback(chrome.runtime.lastError);
            	return;
          	}

    	    var xhr = new XMLHttpRequest();
          	xhr.open(method, url);
          	xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);

          	xhr.onload = function () {
    	        if (this.status === 401 && retry) {
// This status may indicate that the cached
// access token was invalid. Retry once with
// a fresh token.
        			retry = false;
                  	chrome.identity.removeCachedAuthToken(
        				{ 'token': access_token }, 
        				getTokenAndXhr
        			);
                  	return;
                }

                callback(null, this.status, this.responseText);
          	}
    	});
  	}
}


function verifyLicense(token) {
    var CWS_LICENSE_API_URL = 'https://www.googleapis.com/chromewebstore/v1.1/userlicenses/';
    var req = new XMLHttpRequest();
    req.open('GET', CWS_LICENSE_API_URL + chrome.runtime.id);
    req.setRequestHeader('Authorization', 'Bearer ' + token);
    req.onreadystatechange = function() {
    	if (req.readyState == 4) {
            //succ
		    alert("req.responseText=\"" + req.responseText + "\", request.status=" + req.status + ", statusText=" + req.statusText);
			if (req.status == 200) {
            	var license = JSON.parse(req.responseText);
    	        verifyAndSaveLicense(license);
			}
    	}
    };
    req.send();
}

function verifyAndSaveLicense(license) {
	alert("verifyAndSaveLicense(), kind=" + license.kind + ", itemId=" + license.itemId + ", createdTime=" + license.createdTime 
	+ "\nresult=" + license.result + ", accessLevel=" + license.accessLevel +  ", maxAgeSec=" + license.maxAgeSec);

    var licenseStatus = license.accessLevel;
/*!!
    var licenseStatus;
    if (license.result && license.accessLevel == "FULL") {
        console.log("Fully paid & properly licensed.");
        licenseStatus = "FULL";
    }
	else if (license.result && license.accessLevel == "FREE_TRIAL") {
		var TRIAL_PERIOD_DAYS = 30;
        var daysAgoLicenseIssued = Date.now() - parseInt(license.createdTime, 10);
        daysAgoLicenseIssued = daysAgoLicenseIssued / 1000 / 60 / 60 / 24;
        if (daysAgoLicenseIssued <= TRIAL_PERIOD_DAYS) {
            console.log("Free trial, still within trial period");
            licenseStatus = "FREE_TRIAL";
        }
		else {
            console.log("Free trial, trial period expired.");
            licenseStatus = "FREE_TRIAL_EXPIRED";
        }
    }
	else {
        console.log("No license ever issued.");
        licenseStatus = "NONE";
    }

*/
	localStorage.setItem(KEY_LICENSE_STATUS, licenseStatus);
}

