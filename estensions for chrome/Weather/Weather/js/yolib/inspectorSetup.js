
function InspectorSetup(container) {
	this.container = container;
	this.enabled = true;
    this.nameToItem = {};
    this.items = new Array({
    	label: L("Location"),
    	name: "location",
    	visible: true,
    	component: null
    },{
    	label: L("Weather"),
    	name: "weather",
    	visible: true,
    	children: new Array({
	    	label: L("Temperature"),
    		name: "temperature",
    		visible: true
    	},{
    		label: L("Temperature Range"),
    		name: "temperatureRange",
    		visible: true
    	},{
    		label: L("Sky Image"),
    		name: "skyImage",
    		visible: true
    	},{
    		label: L("Sky Description"),
    		name: "skyDescription",
    		visible: true
    	},{
    		label: L("Wind"),
    		name: "wind",
    		visible: true
    	},{
    		label: L("Pressure"),
    		name: "pressure",
    		visible: true
    	},{
    		label: L("Humidity"),
    		name: "humidity",
    		visible: true
    	},{
    		label: L("Dew Point"),
    		name: "dewPoint",
    		visible: false
    	},{
    		label: L("Feels Like"),
    		name: "feelsLike",
    		visible: true
    	},{
    		label: L("Precipitation Chance") + " (" + L("US only") + ")",
    		name: "precipitationChance",
    		visible: true
    	},{
    		label: L("Precipitation Amount"),
    		name: "precipitationAmount",
    		visible: false
    	},{
    		label: L("Snow Level") + " (" + L("PWS only") + ")",
    		name: "snowLevel",
    		visible: false
    	},{
    		label: L("Daily Rain Total") + " (" + L("PWS only") + ")",
    		name: "dailyRainTotal",
    		visible: false
    	},{
    		label: L("Ultra Violet Index") + " (" + L("PWS only") + ")",
    		name: "uv",
    		visible: false
    	},{
    		label: L("Visibility"),
    		name: "visibility",
    		visible: false
    	},{
    		label: L("Update Time"),
    		name: "observeTime",
    		visible: true
    	})
    },{
    	label: L("Astronomy"),
    	name: "astronomy",
    	visible: false,
    	children: new Array({
	    	label: L("Sunrise"),
    		name: "sunrise",
    		visible: true
    	},{
    		label: L("Sunset"),
    		name: "sunset",
    		visible: true
    	},{
    		label: L("Day Length"),
    		name: "dayLength",
    		visible: true
    	},{
    		label: L("Moon Phase"),
    		name: "moonPhase",
    		visible: true
    	})
    });


    for (var i in this.items) {
    	var item = this.items[i];
		this.deepAddItem(container, null, item);
	}
};

InspectorSetup.prototype.deepAddItem = function(container, parent, item) {
	var div = document.createElement("div");
	container.appendChild(div);
	
	var label = document.createElement("label");
	div.appendChild(label);

	var name = item.name;
	this.nameToItem[name] = item;
	var ch = document.createElement("input");
	ch.type = "checkbox";
	ch.id = name;
	ch.checked = item.visible;
	var self = this;
	ch.onclick = function() {
		self.onCheckboxClick(item);
	}
	if (parent) {
		var disabled = parent.disabled || !parent.visible;
		ch.disabled = disabled;
		label.style.color = disabled ? "gray" : "black";
	}
	item.checkBox = ch;
	item.clabel = label;
    label.appendChild(ch);
	label.appendChild(document.createTextNode(item.label));

	if (!item['children']) {
		return;
	}
	var children = item['children'];


	var childrenDiv = document.createElement("div");
	childrenDiv.style.marginLeft = "20px";
	div.appendChild(childrenDiv);
	
    for (var i in children) {
    	var child = children[i];
		this.deepAddItem(childrenDiv, item, child);
	}
}

InspectorSetup.prototype.deepUpdate = function(item, disable) {
	if (disable == null) {
		disable = false;
	}

	var disabled = !this.enabled || disable;
	item.checkBox.disabled = disabled;
	item.clabel.style.color = disabled ? "gray" : "black";

	if (!item['children']) {
		return;
	}
	for (var i in item.children) {
		var child = item.children[i];
		this.deepUpdate(child, disabled || !item.checkBox.checked);
	}
}

InspectorSetup.prototype.onItemChange = function(name) {
}

/*o
InspectorSetup.prototype.getItem = function(name) {
	return this.nameToItem[name];
}
*/

InspectorSetup.prototype.isItemVisible = function(name) {
	var item = this.nameToItem[name];
	if (!item) {
		return false;
	}
	return item.visible;
}

InspectorSetup.prototype.setItemVisible = function(name, b) {
	var item = this.nameToItem[name];
	if (!item) {
		return;
	}
	item.visible = b;
	item.checkBox.checked = b;
	this.deepUpdate(item);
}

InspectorSetup.prototype.onCheckboxClick = function(item) {
	var name = item.name;
//p	p("onCheckboxClick(), name=" + name);
	var ch = item.checkBox;
	item.visible = ch.checked;
	this.onItemChange(name);
	this.deepUpdate(item);
}

InspectorSetup.prototype.setEnabled = function(b) {
	this.enabled = b;
    for (var i in this.items) {
    	var item = this.items[i];
    	this.deepUpdate(item);
	}
}

