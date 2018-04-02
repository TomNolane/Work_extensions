
function Options(localSettingsKey) {
    this.localSettingsKey = localSettingsKey;
    this.myStatus = "not ready";
}

Options.prototype.read = function(options) {
    this.xmlString = options;
    this.myStatus = "ready";
    var parser = new DOMParser();
    this.xmlDom = parser.parseFromString(this.xmlString,"text/xml");
    this.optionsNode = this.xmlDom.getElementsByTagName("options")[0];
    this.wimo = this.optionsNode.getElementsByTagName("wimo")[0];
    this.groupNode = this.optionsNode.getElementsByTagName("groupInfo")[0];
    if (!this.groupNode) {
		this.groupNode = this.xmlDom.createElement("groupInfo");
		this.optionsNode.appendChild(this.groupNode);
    }
}

Options.prototype.status = function() {
    return this.myStatus;
}

/*w
Options.prototype.setAutoLocation = function(location) {
	if (!location) {
		severe("Options.setAutoLocation(), location missing");
		return;
	}
	var nodeName = "autoLocation";
    var node = this.wimo.getElementsByTagName(nodeName)[0];
    if (node) {
		node.parentNode.removeChild(node);
	}

	node = this.xmlDom.createElement("autoLocation");
	XmlUtil.copyContent(location, node);

    this.wimo.appendChild(node);
}
*/

/*w
Options.prototype.getAutoLocation = function() {
	var nodeName = "autoLocation";
    var node = this.wimo.getElementsByTagName(nodeName)[0];
	if (!node) {
		severe("Options.getAutoLocation(), autoLocation node missing");
		return null;
	}
	return node;
}


Options.prototype.getAutoLocationId = function() {
    var node = this.getAutoLocation();
	return node.getAttribute('id');
}
*/

Options.prototype.getFavoriteLocationsNode = function() {
    return this.wimo.getElementsByTagName("favoriteLocations")[0];
}

Options.prototype.requestFavoriteLocationsNode = function() {
    var result = this.wimo.getElementsByTagName("favoriteLocations")[0];    
    if (!result) {
        result = this.xmlDom.createElement("favoriteLocations");
        this.wimo.appendChild(result);
    }
	return result;
}

Options.prototype.addLocation = function(location, isHome) {
    var favoriteLocations = this.requestFavoriteLocationsNode();    
	var node = location.cloneNode(true);
	
	if (isHome) {
		var firstChild = null;
		var locations = favoriteLocations.getElementsByTagName("location");
		if (locations.length != 0) {
			firstChild = locations[0];
		}
		favoriteLocations.insertBefore(node, firstChild);
        favoriteLocations.setAttribute("homeLocationId", location.getAttribute("id"));
		return;
	}

   	favoriteLocations.appendChild(node);
}

Options.prototype.save = function() {
    var string = (new XMLSerializer()).serializeToString(this.xmlDom);
//	severe("options.save(), string...\n" + string);
	localStorage.setItem(this.localSettingsKey, string);
}

Options.prototype.validate = function() {
    var favoriteLocations = this.getFavoriteLocationsNode();
    if(favoriteLocations.getElementsByTagName("location")[0]) {
		return true;
    }
    this.myStatus = "favorite location empty";
    return false;
}


Options.prototype.isInspectorItemVisible = function(id, parentId) {
	var path = "ui/inspector/contents";
	if (parentId) {
		path += "/" + parentId;
	}
	path += "/" + id;

	var node = XmlUtil.getChild(this.wimo, path, false);
	if (!node) {
		return false;
	}
    return XmlUtil.parseBoolean(
		node.getAttribute("visible"), false
	);
}

Options.prototype.setInspectorItemVisible = function(id, parentId, value) {
	var path = "ui/inspector/contents";
	if (parentId) {
		path += "/" + parentId;
	}
	path += "/" + id;

	var node = XmlUtil.getChild(this.wimo, path, true);   
    node.setAttribute("visible", XmlUtil.formatBoolean(value));
}

Options.prototype.setCustomAspect=function(id,value) {
    var unitsystem = this.wimo.getElementsByTagName("unitSystem")[0];
    if (!unitsystem) {
        unitsystem = this.xmlDom.createElement("unitSystem");
        this.wimo.appendChild(unitsystem);
    }
    var customunitsystem = unitsystem.getElementsByTagName("customUnitSystem")[0];
    if (!customunitsystem) {
        customunitsystem = this.xmlDom.createElement("customUnitSystem");
        unitsystem.appendChild(customunitsystem);
	
    }
    for ( var asIndx = 0 ; customunitsystem.getElementsByTagName("aspect")[asIndx] ; asIndx++ ) {
        if (customunitsystem.getElementsByTagName("aspect")[asIndx].getAttribute("id") == id) {
            customunitsystem.getElementsByTagName("aspect")[asIndx].setAttribute("unit",value);
	   
            return;
        }
    }
    var aspect = this.xmlDom.createElement("aspect");
    customunitsystem.appendChild(aspect);
    aspect.setAttribute("id",id);
    aspect.setAttribute("unit",value);
    
}

Options.prototype.getCustomAspect = function(id) {
    var unitsystem = this.wimo.getElementsByTagName("unitSystem")[0];
    if(unitsystem) {
    	var customunitsystem = unitsystem.getElementsByTagName("customUnitSystem")[0];
    	if(!customunitsystem) {
    	    return "auto";
    	}
    	for (var asIndx = 0; customunitsystem.getElementsByTagName("aspect")[asIndx]; asIndx++) {
    		if (customunitsystem.getElementsByTagName("aspect")[asIndx].getAttribute("id") == id) {
            	return customunitsystem.getElementsByTagName("aspect")[asIndx].getAttribute("unit");
    		}
    	}
    }
    return "auto";
}


Options.prototype.setUnitSystem = function(value) {
    var unitsystem = this.wimo.getElementsByTagName("unitSystem")[0];
    if (!unitsystem) {
        unitsystem = this.xmlDom.createElement("unitSystem");
        this.wimo.appendChild(unitsystem);
    }
    unitsystem.setAttribute("selected",value);
}

Options.prototype.getUnitSystem = function() {
    var unitsystem = this.wimo.getElementsByTagName("unitSystem")[0];
    if(unitsystem) {
		return unitsystem.getAttribute("selected");
    }
    return "auto-detected";
}



Options.prototype.getTemperatureUnit = function() {
    var unitsystem = this.wimo.getElementsByTagName("unitSystem")[0];
    var metric = "";
    
    if (unitsystem) {
        switch(unitsystem.getAttribute("selected")) {
	case "celsius":
	    metric = "c";
	break;
        case "fahrenheit":
            metric = "f";
        break;
        case "us":
            metric = "f";
        break;
        case "metric":
            metric = "c";
        break;
        case "auto-detected":
        case "custom":
        case null:
            var customunitsystem = unitsystem.getElementsByTagName("customUnitSystem")[0];
	    for (var asIndx = 0 ; customunitsystem.getElementsByTagName("aspect")[asIndx] ; asIndx++) {
                if (customunitsystem.getElementsByTagName("aspect")[asIndx].getAttribute("id") == "temperature") {
                    metric = customunitsystem.getElementsByTagName("aspect")[asIndx].getAttribute("unit");
                    break;
                }
	    }
        break;
    }
    }else{
        metric = "f";
    }
    return metric;
}

Options.prototype.setAsHomeLocation = function(id) {    
    var favoriteLocations = this.getFavoriteLocationsNode();    
	var locations = favoriteLocations.getElementsByTagName("location");

    for (var i = 0; locations[i]; i++) {	
        if (locations[i].getAttribute("id") == id) {	    
            favoriteLocations.setAttribute("homeLocationId", id);
            return true;
        }
    }
    return false;
}

Options.prototype.renameLocation = function(location, newName) {
    if (location) {
        var user = location.getElementsByTagName("user")[0];
    	if (!user) {
    	    user = this.xmlDom.createElement("user");
    	    location.appendChild(user);
    	}
        user.setAttribute("name", newName);
    }
}

Options.prototype.getUserNameCity = function(currentLocation) {
    var retValue = "";
    if (currentLocation) {
        var user = currentLocation.getElementsByTagName("user")[0];
        if (user) {
            if (user.getAttribute("name")) {
                retValue = user.getAttribute("name");
            }else{
		retValue = currentLocation.getAttribute("name");
	    }
        }else{
            retValue = currentLocation.getAttribute("name");
        }
	
    }
    
    return retValue;
}

Options.prototype.getXMLDom = function() {
    return this.xmlDom;
}



Options.prototype.getLocationByIndex = function(index) {
    var favoriteLocations = this.getFavoriteLocationsNode();
    return favoriteLocations.getElementsByTagName("location")[index];
}

Options.prototype.getLocationIDbyIndex = function(index) {
    var favoriteLocations = this.getFavoriteLocationsNode();
    if (favoriteLocations.getElementsByTagName("location")[index]) {
		return favoriteLocations.getElementsByTagName("location")[index].getAttribute("id");
    }
    return favoriteLocations.getElementsByTagName("location")[0].getAttribute("id");
}

Options.prototype.getLocationId = function() {
	var homeId = this.getHomeId();
/*w
	if (!homeId) {
        return this.getAutoLocationId();
	}
*/
    return homeId;
}

Options.prototype.getLocation = function() {
/*w
	if (!this.getHomeId()) {
        return this.getAutoLocation();
	}
*/
    this.locationId = this.getLocationId();
    var location = this.getLocationForId(this.locationId);
	return location;
}

Options.prototype.getHomeId = function() {
    var favoriteLocations = this.getFavoriteLocationsNode();
	var homeId = null;
	if (favoriteLocations) {
		homeId = favoriteLocations.getAttribute("homeLocationId");
	}
	return homeId;
}

Options.prototype.isHomeSelected = function() {
    var favoriteLocations = this.getFavoriteLocationsNode();
	if (!favoriteLocations) {
		return false;	
	}
	return favoriteLocations.getAttribute("homeSelected") == 'true';	
}

Options.prototype.setHomeSelected = function() {
    var favoriteLocations = this.requestFavoriteLocationsNode();
	favoriteLocations.setAttribute("homeSelected", 'true');
}

Options.prototype.getLocationForId = function(id) {
    var favoriteLocations = this.getFavoriteLocationsNode();
    var locations = favoriteLocations.getElementsByTagName("location");
    for (var i = 0; i < locations.length; i++) {
        if (locations[i].getAttribute("id") == id) {
            return locations[i];
        }
    }
    return null;
}

Options.prototype.findLocationNode = function(id) {
	var index = this.findLocationIndex(id);
	if (index == -1) {
		return null;
	}
    var favoriteLocations = this.getFavoriteLocationsNode();
	var locations = favoriteLocations.getElementsByTagName("location");
	var location = locations[index];
    return location;
}

Options.prototype.findLocationIndex = function(id) {
    var favoriteLocations = this.getFavoriteLocationsNode();
	if (!favoriteLocations) {
		return -1;
	}
	var locations = favoriteLocations.getElementsByTagName("location");
	if (locations.length == 0) {
		return -1;
	}
    for (var  i = 0; i < locations.length; i++) {
    	var location = locations[i];
        if (RsUtil.equalLocationId(location.getAttribute("id"), id)) {
            return i;
        }
    }
    return -1;
}

Options.prototype.deleteLocation = function(index) {
    var favoriteLocations = this.getFavoriteLocationsNode();
	var node = favoriteLocations.getElementsByTagName("location")[index];
    if (node) {
		favoriteLocations.removeChild(node);
    }
}

Options.prototype.upLocation = function(index) {
    var favoriteLocations = this.getFavoriteLocationsNode();
	var option = favoriteLocations.getElementsByTagName("location")[index];

    if(option) {
		favoriteLocations.insertBefore(
			option,
			favoriteLocations.getElementsByTagName("location")[index - 1]
		);
    }
}

Options.prototype.downLocation = function(index) {
    var favoriteLocations = this.getFavoriteLocationsNode();
	var option = favoriteLocations.getElementsByTagName("location")[index];
    if(option) {
		favoriteLocations.insertBefore(
			option,
			favoriteLocations.getElementsByTagName("location")[index + 2]	
		);
    }
}


Options.prototype.getDefaultLandscapeString = function() {
	return 'village';
}

Options.prototype.getLandscapeStringForLocationId = function(id) {
    var locationNode = this.getLocationForId(id);
    if(locationNode) {
    	var st = locationNode.getAttribute("landscape");
		if(st) {
		    return st;
		}
    }
	return this.getDefaultLandscapeString();
}

Options.prototype.setLandscapeStringForLocationId = function(id, landscapeString) {
    var locationNode = this.getLocationForId(id);
    if(!locationNode) {
    	severe("locationNode missing for id=" + id);
    	return;
    }
    locationNode.setAttribute("landscape", landscapeString);
}

Options.prototype.get = function(option) {
    if (this.status() != "ready") {
        return "options notReady";
    }
    var retValue = "notFound";
    switch(option) {
        case Options.NAME_CITY:
            var currentLocation = this.getLocation();
            if (currentLocation) {
                var user = currentLocation.getElementsByTagName("user")[0];
                if (user) {		    
                    if (user.getAttribute("name")) {
                        retValue = user.getAttribute("name");
                    }
                    else{
						retValue = currentLocation.getAttribute("name");
			    	}
                }
                else{
                    retValue = currentLocation.getAttribute("name");
                }
		
            }
        break;
        case Options.LOCATION_ID:
		    retValue = this.getLocationId();
		break;
        case Options.TIME_ZONE:
            var currentLocation = this.getLocation();
            if (currentLocation) {
                retValue = currentLocation.getAttribute("timeZone");
            }
        break;
        case Options.UNITS_NODE:
		    retValue = this.wimo.getElementsByTagName("unitSystem")[0];
		break;
        case Options.INSPECTOR_NODE:
		    retValue = null;
		    var ui = this.wimo.getElementsByTagName("ui")[0];
	    	if(ui) {
				var inspector = ui.getElementsByTagName("inspector")[0];
				if(inspector) {
				    retValue = inspector;
				}
		    }    
		break;
    }
    return retValue;
}


Options.prototype.setUin = function(uin) {
	this.optionsNode.setAttribute("uin", uin);
}

Options.prototype.getUin = function(uin) {
	return this.optionsNode.getAttribute("uin");
}

Options.prototype.set = function(option, value) {
    if (this.status() != "ready") {
        return "options notReady";
    }
    var setStatus = "not set - not settings USE CONSTANT Options.";
    switch(option) {

        case Options.UNITS_NODE:
	    	this.wimo.replaceChild(value.cloneNode(true), this.wimo.getElementsByTagName("unitSystem")[0]);
		    setStatus = "success";
		break;
        case Options.INSPECTOR_NODE:
		    if(value) {
		        var ui = this.wimo.getElementsByTagName("ui")[0];
	    	    if(!ui) {
		    		ui = this.xmlDom.createElement("ui");
                    this.wimo.appendChild(ui);
		        }
		
   		        var inspector = ui.getElementsByTagName("inspector")[0];

		        if(inspector) {
				    ui.replaceChild(value.cloneNode(true),ui.getElementsByTagName("inspector")[0]);
	        	}
				else {
				    try {			
						ui.appendChild(value.cloneNode(true));
		    		}
					catch(e) {
						severe(e);
					}		    
		        }
		    }	    
		    setStatus = "success";
		break;
    }
    return setStatus;
}

Options.prototype.createLocationNodeFromServerNode = function(s) {
    var l = this.xmlDom.createElement("location");
    l.setAttribute("id",       s.getAttribute("id"));
    l.setAttribute("name",     s.getAttribute("name"));
    l.setAttribute("digest",   s.getAttribute("e_digest"));
    l.setAttribute("icao",     s.getAttribute("icao_id"));
    l.setAttribute("seasonMap",s.getAttribute("season_map"));
    l.setAttribute("timeZone", s.getAttribute("e_time_zone"));
    l.setAttribute("lon",      s.getAttribute("longitude"));
    l.setAttribute("lat",      s.getAttribute("latitude"));
    l.setAttribute("path",     s.getAttribute("path"));
	return l;
}

Options.prototype.createNewYorkNode = function(s) {
    var l = this.xmlDom.createElement("location");
    l.setAttribute("id", "gn:5128581");
    l.setAttribute("name", "New York City");
    l.setAttribute("digest", "1ddb13819a28025a4dec39acf66bf5f4_-5:00");
    l.setAttribute("icao", "KNYC");
    l.setAttribute("seasonMap", "02.25:naked/04.02:spring/05.02:summer/10.17:autumn/11.22:naked/12.17:winter");
    l.setAttribute("timeZone", "-5:00");
    l.setAttribute("lon", "-74.01");
    l.setAttribute("lat", "40.71");
    l.setAttribute("path", "6252001/5128638/5128581");
	return l;
}

Options.prototype.toString = function() {
	return XmlUtil.format(this.xmlDom);
}

Options.LOCATION_ID              = "locationId";
Options.UNITS_NODE              = "unitsNode";
Options.POSITION                = "position";
Options.NAME_CITY               = "nameCity";
Options.TIME_ZONE               = "timeZone";
Options.UIN = "uin";

