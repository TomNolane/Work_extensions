
YoLocationChooser.SERVER_URL = "http://server2.yowindow.com/cgi-bin/wimo/server/index.pl";
YoLocationChooser.CLIENT = "hpPal";

YoLocationChooser.MAJOR_CITY_POPULATION = 100 * 1000;

function YoLocationChooser(container) {
	this.rootLine = null;
	this.scope = 'major';
	this.selectedLocation = null;
	this.enabled = true;

   	removeAllChildNodes(container);
	
	this.flowContainer = document.createElement("div");
	this.flowContainer.id = "line_container";
	container.appendChild(this.flowContainer);

	var radioDiv = document.createElement("div");
	radioDiv.style.margin = "10px 0 0 0";
	radioDiv.style.textAlign = "left";
	container.appendChild(radioDiv);

	radioDiv.innerHTML = '\
        <input type="radio" name="scope" id="scope_major" value="major" checked="checked" /><label for="scope_major">' + L("Major cities") + '</label><br/>\
        <input type="radio" name="scope" id="scope_all" value="all"/><label for="scope_all">' + L("All locations") + '</label>\
    ';

	var div= document.createElement("div");
	div.innerHTML = '\
<div id="locationRequesDiv" style="display:none; margin-left:5px; margin-top:5px; font-size:12px; text-align:left;">\
	<a target="_blank" href="http://yowindow.com/location_request.php">' + L("Cannot find a location?") + '</a>\
</div>\
';
	container.appendChild(div);

    var self = this;
    var onScopeClick = function() {
    	self.onScopeClick();
    }
    document.getElementById('scope_major').onclick = onScopeClick;
    document.getElementById('scope_all').onclick = onScopeClick;

	this.rootLine = new Line(this, 'world');
}

YoLocationChooser.prototype.open = function(path) {
//p	console.log("YoLocationChooser.open(), path=" + path);

	if (path && YoLocationChooser.normalizePath(this.getPath()) == YoLocationChooser.normalizePath(path)) {
		return;
	}

	if (path == '#auto') {
		this.requestAutoPath();
		var isRequestComplete = this.autoPathRequest == null;
/*w
		if (isRequestComplete) {
			return;
		}
*/
		return;
//w		path = null;
	}

//p console.log("before rootLine.open(), path=" + path);
	this.rootLine.open(path);
}

YoLocationChooser.normalizePath = function(path) {
    if (path == null) {
    	return null;
    }
    var a = path.split("/");
    if (a.length == 3) {
    	a.splice(1, 1);
    }
    return a.join("/");
}

YoLocationChooser.prototype.onScopeClick = function() {
//p	p("onScopeClick(), this.constructor=" + this.constructor);
	var scope = document.getElementById('scope_major').checked ? 'major' : 'all';
	if (this.scope == scope) {
		return;
	}
	this.scope = scope;
	this.rootLine.handleScopeChange();
}

YoLocationChooser.prototype.getMinPopulation = function() {
    if (this.scope == 'major') {
    	return YoLocationChooser.MAJOR_CITY_POPULATION;
    }
    return 0;
}

YoLocationChooser.prototype.setSelectedLocation = function(node) {
    var id = null;
    if (node) {
    	id = node['@id'];
    }
    var selectedId = null;
    if (this.selectedLocation) {
    	selectedId = this.selectedLocation['@id'];
    }
    if (selectedId == id) {
    	return;
    }

	this.selectedLocation = node;
	this.onLocationChange(node);
}

YoLocationChooser.prototype.requestAutoPath = function() {
    var url =
    	YoLocationChooser.SERVER_URL + "?request=world&client=" + YoLocationChooser.CLIENT + "&id=auto&detail=full&output=json"
    ;

//p p("Send auto-path Request, url: " + url);
	var request = new XhrRequest(url);

    var self = this;
	request.onTimeout = function() {
		self.onAutoPathTimeout(request);
	}

	request.onLoad = function() {
		self.onAutoPathLoad(request);
        self.autoPathRequest = null;
	}

	request.onCancel = function() {
        self.onAutoPathCancel(request);
        self.autoPathRequest = null;
	}

	self.autoPathRequest = request;

	request.start();
}

YoLocationChooser.prototype.onAutoPathLoad = function(request) {
//p p("onAutoPathLoad()");
	var path = request.response.response['l']['@path'];
	if (!path) {
		severe("path=" + path);
	}
//p	console.log("onAutoPathLoad(), path=" + path);

	this.open(path);
}

YoLocationChooser.prototype.onAutoPathTimeout = function(request) {
	//p console.log("onAutoPathTimeout()");
	//EMPTY	
}

YoLocationChooser.prototype.onAutoPathCancel = function(request) {
	//EMPTY	
}

YoLocationChooser.prototype.onLocationChange = function(node) {
}


YoLocationChooser.prototype.getPath = function() {
	var path = "";

	var line = this.rootLine;

	while (line) {
		var id = line.combo.value;
		if (id == '#loading') {
			break;
		}
		if (id != '#default') {
			if (path != "") {
				path += "/";
			}
			path = path + id;
		}
		line = line.childLine;
	}

	return path == "" ? null : path;
}

YoLocationChooser.prototype.setEnabled = function(b) {
	this.enabled = b;
	this.updateEnabled();
}

YoLocationChooser.prototype.updateEnabled = function(b) {
	var line = this.rootLine;

	while (line) {
		line.updateEnabled();
		line = line.childLine;
	}

    document.getElementById('scope_major').disabled = !this.enabled;
    document.getElementById('scope_all').disabled = !this.enabled;
}

YoLocationChooser.prototype.setLocationRequestVisible = function(b) {
	var div = document.getElementById('locationRequesDiv');
	div.style.display = b ? "block" : "none";
}



Line.USA = 6252001;
Line.NUMBER_REGEX = new RegExp("^\\d+\$");

function Line(host, type, id) {
//p p("Line(), id=" + id + ", type=" + type);
	var self = this;

	this.host = host;
	this.enabled = true;
	this.type = type;
	this.id = id;
	this.scope = 'major';
	this.loaded = false;
	this.pendingPath = null;
	this.request = null;
	this.idToNode = null;

	this.childLine = null;

	this.combo = null;
	this.button = null;

	var container = host.flowContainer;
//   	p("b=" + container);

	var table = document.createElement("table");
	table.width = "100%";
	table.cellPadding = 1;
	table.cellSpacing = 0;

	container.appendChild(table);

	var tbody = document.createElement("tbody");
	table.appendChild(tbody);

	var tr = document.createElement("tr");
	tbody.appendChild(tr);
	var td1 = document.createElement("td");
	td1.width = "100%";
	tr.appendChild(td1);
	var td2 = document.createElement("td");
	td2.width = "100px";
	td2.style.width = "100px";
	tr.appendChild(td2);	

	var combo = document.createElement("select");
	this.combo = combo;
	combo.style.width = "100%";
	combo.onchange = function() {
		self.onComboChange();
	}
	td1.appendChild(combo);

	var button = document.createElement("input");
	button.type = "button";
	button.value = L("Retry");
	button.style.width = "100px";
	td2.appendChild(button);
//!!	td2.style.display = 'none';

	button.onclick = function() {
		self.onButtonClick();
	}
	this.button = button;
	this.td2 = td2;
	
	this.ui = table;
}

Line.prototype.dispose = function() {
//p	p("Line.dispose(), type=" + this.type + ", id=" + this.id);
	if (this.childLine) {
    	this.childLine.dispose();
    	delete this.childLine;
	}

	var parent = this.ui.parentNode;
	parent.removeChild(this.ui);
	delete this.ui;
}

Line.prototype.open = function(path) {
//p	console.log("Line.open(), path=" + path + ", type=" + this.type);
	this.pendingPath = path;
//p p("loaded=" + this.loaded);
	if (!this.loaded) {
		this.load();
		return;
	}
	this.processPendingPath();
}

Line.prototype.load = function() {
//p p("Line.load()");
    
    var url =
    	YoLocationChooser.SERVER_URL + "?request=world" + "&client=" + YoLocationChooser.CLIENT + "&output=json"
    ;

    if (this.type == 'world') {
		url += "&id=gn:6295630&depth=2"
    }
    else if (this.type == 'locations') {
    	url += "&id=gn:" + this.id;
    }
    else if (this.type == 'regions') {
    	url += "&id=gn:" + this.id + "&depth=1";
    }

//p    p("this.request=" + this.request);

	if (this.request) {
//p		p("cancel request, id=" + this.request.id);
		this.request.cancel();
	}

	this.td2.style.display = 'none';
	this.button.value = L("Cancel");

//p    console.log("Line.load(), send request, url: " + url);
	var request = new XhrRequest(url);

    var self = this;
	request.onTimeout = function() {
//p console.log("onTimeout 2");
		self.onTimeout(request);
	}

	request.onLoad = function() {
		self.onLoad(request);
        self.request = null;
	}

	request.onCancel = function() {
        self.onCancel(request);
        self.request = null;
	}

	this.request = request;

//p	p("load request.id=" + request.id);

	this.setComboLine("#loading", L("Loading") + "...");

	request.start();
}


Line.prototype.onLoad = function(request) {
//p	alert("request.onLoad(), type=" + this.type + ", request.id=" + request.id);
//p p("response...\n" + dump(request.response));
	
	this.lastRequest = request;
	this.td2.style.display = 'none';

	this.enabled = true;
	this.updateEnabled();

//p console.log("this.combo.disabled=" + this.combo.disabled);

	this.loaded = true;

	removeAllChildNodes(this.combo);
	this.idToNode = {};
	this.fillCombo(request);

	this.processPendingPath();
}

Line.prototype.onCancel = function(request) {
	this.td2.style.display = 'block';
	this.button.value = L("Retry");
}

Line.prototype.onTimeout = function(request) {
	severe("request.onTimeout(), id=" + request.id);
	this.enterUpdateErrorState();
}

Line.prototype.onComboChange = function() {
//p	p("onComboChange()");
	var id = this.combo.value;
	this.processSelection(id, null);
}

Line.prototype.onButtonClick = function() {
//p p("onButtonClick(), request=" + this.request);
	if (this.request) {
		this.request.cancel();
	}
	this.load();
}

Line.prototype.handleScopeChange = function() {
//p    p("handleScopeChange(), type=" + this.type);
	if (this.type == 'locations') {
		var scope = this.host.scope;
		this.scope = scope;
		this.updateLocations();
		return;
	}

    if (this.childLine) {
		this.childLine.handleScopeChange();
	}
}

Line.prototype.updateLocations = function() {
//p	p("Line.reloadLocations(), scope=" + this.scope);
	var selection = this.combo.value;
	removeAllChildNodes(this.combo);
	this.idToNode = {};
	this.fillCombo(this.lastRequest);

//p console.log("before open(selection), selection=" + selection);
	this.open(selection);
}

Line.prototype.processPendingPath = function() {
//p	p("processPendingPath(), path=" + this.pendingPath);

	var step = this.pendingPath;
	var childPath = null;
	var indexSlash = -1;

	var id = null;
	if (this.pendingPath) {
   		var a = this.pendingPath.split("/");
    	if (a.length > 0) {
    		step = a.shift();

    		id = this.findIdForStep(step);

//.skip region step
    		if (id != Line.USA && this.type == 'world' && a.length == 2) {
    			a.shift();
    		}
    		
    		childPath = a.join("/");
    	}
	}

//p	p("step=" + step + ", childPath=" + childPath);
//p("id=" + id);

	var node = this.idToNode[id];
	if (node) {
		var index = this.comboFindValue(id);
    	if (index == -1) {
    		this.addNodeSorted(node);
    	}
    	if (this.combo.value != id) {
        	this.combo.value = id;
        	if (node.type == 'location') {
        		this.host.setSelectedLocation(node);
        		return;
        	}
        }
	}
	
	this.processSelection(id, childPath);
	this.pendingPath = null;
}

Line.prototype.processSelection = function(id, childPath) {
//p	console.log("processSelection(), id=" + id + ", childPath=" + childPath);
	if (id == null) {
		id = '#default';
	}

	if (this.childLine) {
		this.childLine.dispose();
	}


	var line = this.createChildLine(id);
	this.childLine = line;

	if (line != null) {
		line.open(childPath);
		return;
	}

	var node = this.idToNode[id];
	if (node && node.type != 'location') {
		node = null;
	}
	this.host.setSelectedLocation(node);
}

Line.prototype.createChildLine = function(id) {

	if (id.indexOf("#") == 0 && id != "#allLocations") {
		return null;
	}

    if (this.type == 'locations') {
    	if (id == '#allLocations') {
    		return new Line(this.host, 'locations', this.id);
    	}
    }
	else if (this.type == 'world') {
	    if (id == Line.USA) {
			return new Line(this.host, 'regions', id);
	    }
	    else {
			return new Line(this.host, 'locations', id);
	    }
	}
	else if (this.type == 'regions') {
    	if (id == '#allLocations') {
    		return new Line(this.host, 'locations', this.id);
    	}
    	else {
			return new Line(this.host, 'locations', id);
		}
    }
    return null;
}

Line.prototype.fillCombo = function(request) {

//p p("response...\n" + dump(request.response));

//p	p("type=" + this.type);

	if (request.response.response.error) {
		severe(dump(request.response));
		this.enterUpdateErrorState();
		return;
	}

	if (this.type == 'world') {
		this.fillWorld(request);
		return;
	}
	else if (this.type == 'regions') {
		this.fillRegions(request);
		return;
	}
	else if (this.type == 'locations') {
		this.fillLocations(request);
		return;
	}
}

Line.prototype.fillWorld = function(request) {
    this.addOption(L("Select a country") + "...", '#default');
	
	var nodes = new Array();
	var continents = request.response.response.globe.continent;
	for (var i in continents) {
		var continent = continents[i];
//p    	p("name=" + continent.@name);

    	var countries = continent.country;
		if (countries) {
        	if (countries.length == null) {
        		nodes.push(countries);
        	}
        	else {
            	for (var j in countries) {
            		var node = countries[j];
            		node.type = 'country';
            		nodes.push(node);
            	}
			}
		}

    	var regions = continent.region;
    	if (regions) {
        	if (regions.length == null) {
        		nodes.push(regions);
        	}
        	else {
            	for (var j in regions) {
            		var node = regions[j];
            		node.type = 'region';
            		nodes.push(node);
            	}
			}
		}
	}

	this.fillNodesSorted(nodes);
}


Line.prototype.fillRegions = function(request) {
	var label = L("Select a region") + "...";
	if (this.id == Line.USA) {
		label = L("Select a state") + "...";
	}
    this.addOption(label, '#default');

	if (this.id == Line.USA) {          
	    this.addOption("[" + L("All states") + "]", '#allLocations');
	}


	var root = request.response.response;
//p	p("root...\n" + dump(root));

	var nodes = new Array();
	jsonTraverse(root, function(key, ob){
		if (key == 'region') {
//p			p("key=" + key + ", ob=" + ob);
			if (ob.constructor == Array) {
    			var a = ob;
    			for (var i in a) {
    				var node = a[i];
    	    		node.type = 'region';
    				nodes.push(node);
    			}
    		}
    		else {
				var node = ob;
	    		node.type = 'region';
				nodes.push(node);
    		}
		}
		return true;
	});

	this.fillNodesSorted(nodes);	
}

Line.prototype.fillLocations = function(request) {
    this.addOption(L("Select a location") + "...", '#default');

	var root = request.response.response;
//p	p("root...\n" + dump(root));

	var nodes = new Array();
	jsonTraverse(root, function(key, ob){
		if (key == 'l') {
//p			p("key=" + key + ", ob=" + ob);
			if (ob.constructor == Array) {
    			var a = ob;
    			for (var i in a) {
    				var node = a[i];
    	    		node.type = 'location';
    				nodes.push(node);
    			}
    		}
    		else {
				var node = ob;
	    		node.type = 'location';
				nodes.push(node);
    		}
    		return false;
		}
		return true;
	});

	this.fillNodesSorted(nodes);	
}


Line.prototype.fillNodesSorted = function(nodes) {
    var minPopulation = this.host.getMinPopulation();

//.reasons to remove/add combo
//fix: IE, combo gets shrinked on scope change
 	var parent = this.combo.parentNode;
  	parent.removeChild(this.combo);
	var choice;
	var t1 = new Date();
	nodes.sort(Line.nodeCompare);

	var index = this.combo.options.length;

//p	p("fill nodes, length=" + nodes.length);

	for (var i in nodes) {
		var node = nodes[i];
    	var id = node['@id'];
    	this.idToNode[id] = node;

    	var population = node['@p'];

    	if (population != null && population < minPopulation) {
    		continue;
    	}

    	var label = node['@name'];
		this.combo.options[index] = new Option(label, id);
		index++;

//o		var html = '<option value="' + id + '">' + label + '</option>';
//		innerHtml += html;

	}

//o	innerHtml = '<select style="width:100%">' + innerHtml + '</select>';

	var t2 = new Date();
	var dt = (t2.getTime() - t1.getTime()) / 1000;
//p p("dt=" + dt);
//o   		parent.innerHTML = innerHtml;
  	parent.appendChild(this.combo);
}

Line.prototype.addNodeSorted = function(node) {
	var an = null;
	var nodeName = node['@name'];
	for (var i in this.combo.children) {
		var choice = this.combo.children[i];
		var name = choice.text;
		if (!choice.value) {
			continue;
		}
		var isSpecial = choice.value.indexOf("#") == 0;
		if (isSpecial) {
			continue;
		}
		if (name > nodeName) {
			an = choice;
			break;
		}
	}
	var label = nodeName;
	var choice = document.createElement('option');
	choice.value = node['@id'];
	choice.appendChild(document.createTextNode(label));
	if (an) {
		this.combo.insertBefore(choice, an);
	}
	else {
		this.combo.appendChild(choice, an);
	}
}

Line.nodeCompare = function(a, b) {
	if (!a) {
		return -1;
	}
	if (!b) {
		return 1;
	}
	var na = a['@name'];
	var nb = b['@name'];
	if (!na) {
		p("na=" + na + ", id=" + a);
	}
	if (na < nb) {
		return -1;
	}
	if (na > nb) {
		return 1;
	}
	return 0;
}

Line.prototype.addOption = function(label, id) {
	var choice;
	choice = document.createElement('option');
	choice.value = id;
	choice.appendChild(document.createTextNode(label));
	this.combo.appendChild(choice);
}

Line.prototype.getSelectedNode = function() {
	var id = this.combo.value;
	var node = this.idToNode[id];
	return node;
}

Line.prototype.comboFindValue = function(value) {
	for (var i = 0; i < this.combo.options.length; i++) {
		var option = this.combo.options[i];
		if (option) {
    		if (value === option.value) {
    			return i;
    		}
		}
	}
	return -1;
}

Line.prototype.findIdForStep = function(step) {
	var id = null;
	if (!step) {
		return null;
	}
	if (step.indexOf("#") == 0) {
		return step;
	}
	else if (step.match(Line.NUMBER_REGEX)) {
		return step;
	}

	var name = step;
	var id = this.findIdForName(name);
	return id;
}

Line.prototype.findIdForName = function(name) {
	var id = null;
	for (var id in this.idToNode) {
		var node = this.idToNode[id];
		var nodeName = null;
		if (node) {
			nodeName = node['@name'];
		}
		if (nodeName == name) {
			return node['@id'];
		}
	}
	return null;
}

Line.prototype.enterUpdateErrorState = function(request) {
	this.td2.style.display = 'block';
	this.button.value = L("Retry");

	removeAllChildNodes(this.combo);

	var choice;
	choice = document.createElement('option');
	choice.value = "error";
	choice.appendChild(document.createTextNode(L("Update error")));
	this.combo.appendChild(choice);
}

Line.prototype.setComboLine = function(id, label) {
	removeAllChildNodes(this.combo);
 	var parent = this.combo.parentNode;
//.reason to remove/add combobox - layout problem in IE
  	parent.removeChild(this.combo);	

	var choice;
	choice = document.createElement('option');
	choice.value = id;
	choice.appendChild(document.createTextNode(label));
	this.combo.appendChild(choice);
	
	this.enabled = false;
	this.updateEnabled();

	parent.appendChild(this.combo);
}

Line.prototype.updateEnabled = function() {
	var b = this.enabled && this.host.enabled;
//p console.log("updateEnabled(), b=" + b + ", this.host.enabled=" + this.host.enabled);
	this.combo.disabled = !b;
}

function removeAllChildNodes(node) {
	if (node && node.hasChildNodes && node.removeChild) {
		while (node.hasChildNodes()) {
			node.removeChild(node.firstChild);
		}
	}
}

function jsonTraverse(o, func) {
    for (var i in o) {
        var ok = func.apply(this, [i, o[i]]);
        if (!ok) {
        	continue;
        }
        if (typeof(o[i]) == "object") {
			!jsonTraverse(o[i], func);
        }
    }
}

function jsonFirstChild(o) {
    for (var i in o) {
        if (typeof(o[i]) == "object") {
        	return o[i];
        }
    }
    return null;
}
