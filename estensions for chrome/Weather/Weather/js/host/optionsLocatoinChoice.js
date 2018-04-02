
var DIALOG_OPACITY = 80;

//this.locationChooser = null;
this.locationChooserWelcomeMode = false;
this.locationChooserResult = null;

this.fullLocationInfoRequest = null;
this.fullLocationInfo = null;
this.locationId = null;

function openLocationChooser(welcome) {	
	asyncRequestAutoLocationInfo();

	this.locationChooserWelcomeMode = welcome;
	this.locationChooserResult = null;
	var minHeight = 150;
	if (welcome) {
		minHeight += 40;
	}

	selectPage('main');

	document.getElementById('location-chooser-welcome').style.display = welcome ? 'block' : 'none';
	updateLocationChooserStatus();

	var dialogName = '#location-chooser-modal-content';
	initLocationSearch(dialogName);

	var self = this;
	$(dialogName).modal({
		persist: true,
		opacity: DIALOG_OPACITY,
		autoPosition: true,
		autoResize: true,
		minWidth: 350,
		minHeight: minHeight,
		onClose: onClose
	});	
}

function asyncRequestAutoLocationInfo() {
    chrome.extension.sendMessage(
    	{
    		action: "onRequestFullAutoLocationInfo"
    	}, 
		function(response) {
 			try {
				this.fullLocationInfo = response.info;
				if (this.fullLocationInfo != null) {
					this.locationId = this.fullLocationInfo["@id"];
//					alert("this.locationId=" + this.locationId);
				}
     			onAutoLocationInfoReceived();
     		}
     		catch (e) {
     			severe("exception...\n" + e);
     		}
     	}
    );
}

function onAutoLocationInfoReceived() {
//	console.log(JSON.stringify(this.fullLocationInfo));
	if (this.locationChooserWelcomeMode
	&& this.fullLocationInfo != null) {
		var name = this.fullLocationInfo["@name"];
		$('#location2').val(name);
		$('#location2').select();
	}
	updateLocationChooserStatus();
}


function onClose() {
//	alert("LocationChooser.onClose()");
	return self.onLocationChooserClose();
}

function onLocationChange(locationId, name) {
	if (!locationId) {
		console.log("[SEVERE] optionsLocatoinChoice.js/onLocationChange(), locationId missing");
		return;
	}

	var lStatus = document.getElementById("locationError");    
	lStatus.style.display = "block";
	var bOk = document.getElementById("locationChooserOk");
	
	bOk.disabled = true;
	lStatus.innerHTML = "";
	bOk.disabled = false;

	this.locationId = locationId;

//w	var id = ob["@id"];

/*o
	var existingLocation = this.optionsUser.findLocationNode(id);
	var added = (existingLocation != null);
    if (added) {
	    lStatus.innerHTML = L("already Exist");
	    return;
	}
*/
	requestFullLocationInfo(locationId);
}

function requestFullLocationInfo(id) {

	if (this.fullLocationInfoRequest) {
		this.fullLocationInfoRequest.cancel();
	}

	if (this.fullLocationInfoRequest) {
		alert("fullLocationInfoRequest still pending after cancellation");
	}

	var url = YO_SERVER_SCRIPT_URL 
	+ "?request=world&id=" + id
	+ "&client=toolbar&detail=full&output=json&version=2";

	var lang = RsChromeUtil.getChromeLanguage();
	url += "&lang=" + lang;

	this.fullLocationInfo = null;

	var request = new XhrRequest(url);
	
	var self = this;
	request.onLoad = function() {
		console.log("request.onLoad(), id=" + id);
		self.onFullLocationRequestLoad();
    }

	request.onTimeout = function() {
		console.log("request.onTimeOut(), id=" + id);
		self.onFullLocationRequestTimeOut();
    }

    request.onCancel = function() {
		console.log("request.onCancel(), id=" + id);
		self.fullLocationInfoRequest = null;
    }
    
	this.fullLocationInfoRequest = request;
    
	console.log("send request, id=" + id);
    request.start();       
}

function onFullLocationRequestLoad() {
	this.fullLocationInfo = this.fullLocationInfoRequest.response.response.l;
	this.fullLocationInfoRequest = null;

	if (isLoadingPageOpen()) {
		addLocationForInfo(this.fullLocationInfo);

		this.locationChooserResult = 'ok';
		$.modal.close();
	}	
}

function onFullLocationRequestTimeOut() {
	if (isLoadingPageOpen()) {
    	var lStatus = document.getElementById('location-chooser-loading-status');
    	lStatus.innerHTML = L("Update error");

		var bRetry = document.getElementById("location-chooser-loading-retry");
		bRetry.style.display = 'inline';
	}

	this.fullLocationInfoRequest = null;
}



function updateLocationChooserStatus() {
	var lStatus = document.getElementById("locationError");    
	var bOk = document.getElementById("locationChooserOk");
	
	bOk.disabled = true;
	lStatus.innerHTML = "";
	
//console.log("this.fullLocationInfo=" + this.fullLocationInfo);
	if (this.locationId != null
//o this.fullLocationInfo != null
) {
		bOk.disabled = false;
	}
}

function onLocationChooserOk() {	
	if (this.fullLocationInfo) {
		addLocationForInfo(this.fullLocationInfo);

		this.locationChooserResult = 'ok';
		$.modal.close();
		return;
	}

	if (!this.fullLocationInfoRequest) {
		requestFullLocationInfo(this.locationId);
	}

	selectPage('loading');
	
	var lStatus = document.getElementById('location-chooser-loading-status');
	lStatus.innerHTML = L("Wait please") + "...";
}

function onLocationChooserCancel() {
//alert("onLocationChooserCancel()");
	$.modal.close();
}


function onLocationChooserLoadingRetry() {
	var bRetry = document.getElementById("location-chooser-loading-retry");
	bRetry.style.display = 'none';

	var lStatus = document.getElementById('location-chooser-loading-status');
	lStatus.innerHTML = L("Wait please") + "...";
	
	requestFullLocationInfo(this.locationId);
}

function onLocationChooserLoadingCancel() {
	selectPage('main');
}

function onLocationChooserClose() {
//p	alert("onLocationChooserClose()");

	if (this.locationChooserResult == 'ok') {
		$.modal.close();
		return false;
	}

	if (this.fullLocationInfoRequest) {
		this.fullLocationInfoRequest.cancel();
		this.fullLocationInfoRequest = null;
	}

    if (this.locationChooserWelcomeMode) {
		var homeId = this.optionsUser.getHomeId();
		var node = this.optionsUser.findLocationNode(homeId);
		handleLocationChoice(node);		
    }

	$.modal.close();
	return false;
}

function isLoadingPageOpen() {
	var loadingPage = document.getElementById('location-chooser-loading-page');
	return loadingPage.style.display != 'none';
}


function addLocationForInfo(locationInfo) {
	var node = createLocationNodeFromLocationInfo(locationInfo);
	handleLocationChoice(node);	
}

function handleLocationChoice(node) {
//p alert("location...\n" + XmlUtil.format(node));
	var isHome = false;
	if (this.locationChooserWelcomeMode) {
		isHome = true;
		this.optionsUser.setHomeSelected();		
        dispatchEvent("onHomeSelected");
	}

//Delete location that was detected as home automatically.
	if (isHome) {
		var homeId = this.optionsUser.getHomeId();
		if (id != homeId) {
    		var index = this.optionsUser.findLocationIndex(homeId);
    		this.optionsUser.deleteLocation(index);
            dispatchEvent("onDeleteLocation", index);
		}
	}

	var id = node.getAttribute('id');
	var existingLocation = this.optionsUser.findLocationNode(id);
	if (existingLocation) {
		if (isHome) {
			if(this.optionsUser.setAsHomeLocation(id)) {
		    	dispatchEvent("onSetAsHomeLocation", id);
			}
		}

		this.selectedLocation = existingLocation;
		updateLocationsList();
		return;
	}

	this.optionsUser.addLocation(node, isHome);
	this.selectedLocation = node;
	updateLocationsList();

	dispatchEvent2(
		"onAddLocation",
		(new XMLSerializer()).serializeToString(node),
		isHome
	);
}

function createLocationNodeFromLocationInfo(ob) {
    if (!ob) {
        return ob;
    }
    var location = this.optionsUser.getXMLDom().createElement("location");		
    location.setAttribute("digest",   ob["@e_digest"]);
    location.setAttribute("icao",     ob["@icao_id"]);
    location.setAttribute("seasonMap",ob["@season_map"]);
    location.setAttribute("timeZone", ob["@e_time_zone"]);
    location.setAttribute("lon",      ob["@longitude"]);
    location.setAttribute("lat",      ob["@latitude"]);
    location.setAttribute("path",     ob["@path"]);
    location.setAttribute("name",     ob["@name"]);
    location.setAttribute("id",       "gn:" + ob["@id"]);

	return location;
}    

function selectPage(id) {
	var passiveId = (id == 'main') ? 'loading' : 'main';

	var page = document.getElementById('location-chooser-' + id + '-page');
	var passivePage = document.getElementById('location-chooser-' + passiveId + '-page');

	passivePage.style.display = 'none';
	page.style.display = 'block';
}



function initLocationSearch(dialogName) {
	var lang = RsChromeUtil.getChromeLanguage();
//	console.log("lang=" + lang);

	$("#location2").attr("placeholder", L("Name"));

	var self = this;	
    var serverUrl = "http://location2.yowindow.com/cgi-bin/location_suggestion_search/index.pl";
    $( function () {
//Otherwise cross-domain scripts do not work in IE8
		$.support.cors = true;
    	$("#location2").autocomplete({
    		source: function(request, response) {
				var haveHieroglyph = RsUtil.haveHieroglyph(request.term); 
				var haveExoticChars = RsUtil.haveExoticChars(request.term);
//    				console.log("haveHieroglyph=" +  haveHieroglyph + ", haveExoticChars=" + haveExoticChars);
				var minTermLength = -1;
				if (haveHieroglyph) {
					minTermLength = 1;
				}

				var params = { lang: lang, term: request.term, min_term_length: minTermLength};
				if (haveExoticChars) {
					params['respond_english_names'] = 1;
				}

            	$.ajax({
            		url: serverUrl + "/autocomplete", 
            		data: params,
					dataType: "json",
            		timeout: 15000,
            		success: function ( a, textStatus, jqXHR ) {
//console.log("response");
    					var b = [];
    					for (var i = 0; i < a.length; i++) {
    						var ob = a[i];
    						var item = {
        						label: ob.value,
        						value: ob.name,
    							geoname_id: ob.geoname_id
        					};
    						b.push(item);
    					}
        				response(b);
            		}, 
            		error: function ( jqXHR, textStatus, errorThrown ) {
//console.log("error: " + textStatus + ", error...\n" + errorThrown);
        				response(["Error"]);
            		},
            		complete: function ( jqXHR, textStatus ) {
//console.log("complete");
            		}
            	});

				return false;
    		},
    		minLength: 2,
    		select: function(event, ui) {
    			$('#location2').val(ui.item.name);
    			$('#location2').select();	

				onLocationChange(ui.item.geoname_id, ui.item.name);
				return true;
    		}
    	});

//Otherwise autocomplete results list is displayed below the dialog.
		$("#location2").autocomplete("option", "appendTo", dialogName);
        $("#location2").on("input", function() {
//			self.fullLocationInfo = null;
			self.locationId = null;
			updateLocationChooserStatus();
        });
		$('#location2').keyup(function (e) {
			if (e.keyCode == 13) {
//				console.log("onEnter()");
				onLocationChooserOk();
			}
		});
    });
}

