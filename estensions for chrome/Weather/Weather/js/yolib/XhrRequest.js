


XhrRequest.urlToResponse = {};
//o XhrRequest.PENDING = 'pending';


function XhrRequest(url) {
//p console.log("XhrRequest(), scriptCounter=" + XhrRequest.scriptCounter);	
	XhrRequest.scriptCounter++;

//Reuse callback name from old requests to make HTTP caching work
	var requestId = XhrRequest.urlToRequestId[url];
	if (!requestId) {
		requestId = XhrRequest.scriptCounter;
		XhrRequest.urlToRequestId[url] = requestId;
	}     
    this.url = url;



	this.callbackName = "onRequestLoad_" + requestId;

	this.id = XhrRequest.scriptCounter;

//p console.log("XhrRequest(), url=" + url + ", id=" + requestId + ", scriptId=" + XhrRequest.scriptCounter);

    this.headLoc = document.getElementsByTagName("head").item(0);
    this.scriptId = 'JscriptId' + XhrRequest.scriptCounter;

    this.onLoad = null;
    this.onCancel = null;
    this.onTimeout = null;

    this.response = null;
    this.timeout = null;
}

XhrRequest.TIMEOUT_SEC = 20;
XhrRequest.scriptCounter = 0;
XhrRequest.urlToRequestId = {};

XhrRequest.prototype.start = function() {
	var self = this;

	var cachedResponse = XhrRequest.urlToResponse[this.url];
	if (cachedResponse) {
//p		p("cachedResponse available!");
		self.response = cachedResponse;		
		self.onLoad();
		return;
	}

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
    	if (xhr.readyState == 4) {
//    		alert(xhr.responseText);
			var response = JSON.parse(xhr.responseText);
    		self.response = response;

    		clearTimeout(self.timeout);
    		
    		XhrRequest.urlToResponse[self.url] = self.response;
    		self.onLoad();
    	}
	}

    this.timeout = setTimeout(
    	this.onTimeout,
	    XhrRequest.TIMEOUT_SEC * 1000
	);

    xhr.open("GET", this.url, true);
    xhr.send();


/*!!
	var name = this.callbackName;
	var id = this.id;
	window[name] = function(ob) {
//p console.log("onRequestLoad(), name=" + name + ", id=" + id);
		self.response = ob;		

		clearTimeout(self.timeout);
		
		XhrRequest.urlToResponse[self.url] = self.response;
		self.onLoad();
    	
		self.removeScriptTag();
	}

    this.timeout = setTimeout(
    	this.onTimeout,
	    XhrRequest.TIMEOUT_SEC * 1000
	);

	this.buildScriptTag();
	this.addScriptTag();
*/
}

XhrRequest.prototype.buildScriptTag = function () {

    // Create the script tag
    this.scriptObj = document.createElement("script");
    
    // Add script object attributes
    this.scriptObj.setAttribute("type", "text/javascript");
    this.scriptObj.setAttribute("charset", "utf-8");

    var url = this.url + "&callback=" + this.callbackName;

//IE does not invoke callback function for cached request
//We need to force server request in this case
    var ie = navigator.appVersion.indexOf("MSIE") != -1;
    if (ie) {
	    var noCache = '&noCacheIE=' + (new Date()).getTime();
	    url += "&no_cache=" + noCache;
    }

    this.scriptObj.setAttribute("src", url);
    this.scriptObj.setAttribute("id", this.scriptId);
}

XhrRequest.prototype.removeScriptTag = function () {
// Destroy the script tag
	if (this.scriptObj.parentNode) {
    	this.headLoc.removeChild(this.scriptObj);
    }
}

XhrRequest.prototype.addScriptTag = function () {
// Create the script tag
	this.headLoc.appendChild(this.scriptObj);
}


XhrRequest.prototype.cancel = function() {
//p	p("cancel(), id=" + this.id);

	delete XhrRequest.urlToRequestId[this.url];

 	if (this.timeout != null) {
 		clearTimeout(this.timeout);
 		this.timeout = null;
 	}
 	
 	this.removeScriptTag();
 	var name = this.callbackName;
 	window[name] = function() {
 		//STUB
 	}
 	
 	this.onCancel();
}
