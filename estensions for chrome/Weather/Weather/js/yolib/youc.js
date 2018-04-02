
YoUnitChooser.unitNames;
YoUnitChooser.basePath = ".";

ASPECTS = [
    "temperature",
    "wind_speed",
    "pressure",
    "pressure_level",
    "distance",
    "rain_rate"
];

/**
auto:Boolean - add Auto item to unit-systems ComboBox
*/
function YoUnitChooser(container, showAutoChoice, showExpandControl) {
	if (showExpandControl == null) {
		showExpandControl = false;
	}
	this.showAutoChoice = showAutoChoice;
	this.showExpandControl = showExpandControl;

    YoUnitChooser.unitNames = {
    	c: '°C',
    	f: '°F',
    	mm:L('mm'),
    	cm:L('cm'),
    	m:L('m'),
    	km:L('km'),
    	foot:L('feet'),
    	mile:L('miles'),
    	mph:L('mph'), 
    	kph:L('kph'),
    	mps:L('mps'),
    	knot:L('knots'),
    	beaufort:L('beaufort'),
    	mbar:L('mb'),
    	kpa: L('kPa'),
    	hpa: L('hPa'),
		sea: L('Sea level'),
		location: L('Location level')
    };
    YoUnitChooser.unitNames['in'] = "\"";

	this.leftColumn = null;
	this.rightColumn = null;
	this.aspectsTable = null;
	this.expandImage = null;


	this.autoUnitSystemId = null;
	this.unitSystemLine = null;
	this.container = container;
	this.aspectLines = new Array();
	this.aspectMap = {};
	this.enabled = true;

	this.unitSystems = {
		us: {
			name: L("US"),
			temperature: "f",
			wind_speed: "mph",
			pressure: "in",
			pressure_level: "sea",
			distance: "mile",
			rain_rate: "in"
		},
		metric: {
			name: L("Metric"),
			temperature: "c",
			wind_speed: "kph",
			pressure: "hpa",
			pressure_level: "sea",
			distance: "km",
			rain_rate: "mm"
		},
		uk: {
			name: L("UK"),
			temperature: "c",
			wind_speed: "mph",
			pressure: "mbar",
			pressure_level: "sea",
			distance: "km",
			rain_rate: "mm"
		},
		finland: {
			name: L("Finland"),
			temperature: "c",
			wind_speed: "mps",
			pressure: "hpa",
			pressure_level: "sea",
			distance: "km",
			rain_rate: "mm"
		},
		russia: {
			name: L("Russia"),
			temperature: "c",
			wind_speed: "mps",
			pressure: "mm",
			pressure_level: "location",
			distance: "km",
			rain_rate: "mm",
		}
	};

   	removeAllChildNodes(container);

    this.fillCustomFrom('metric');
    
   	this.addUnitSystemLine();

	var table = document.createElement("table");
	this.aspectsTable = table;
	if (showExpandControl) {
		this.aspectsTable.style.display = "none";
	}

	container.appendChild(table);
	var tbody = document.createElement("tbody");
	table.appendChild(tbody);
	var tr = document.createElement("tr");
	tbody.appendChild(tr);
	var td = document.createElement("td");
//o	td.style.width = "100%";
	tr.appendChild(td);

	this.leftColumn = document.createElement("div");
	this.leftColumn.style.marginRight = "5px";
	td.appendChild(this.leftColumn);
	td.style.verticalAlign = "top";

	td = document.createElement("td");
	tr.appendChild(td);

	this.rightColumn = document.createElement("div");
	td.appendChild(this.rightColumn);



   	this.addAspectLine(
    	L("Temperature"), 
    	"temperature",
    	new Array(
       		"c",
    		"f"
       	)
    );
   	this.addAspectLine(
    	L("Wind speed"), 
    	"wind_speed",
    	new Array(
       		"kph",
    		"mph",
    		"mps",
            "knot",
            "beaufort"
       	)
    );
   	this.addAspectLine(
    	L("Pressure"), 
    	"pressure",
    	new Array(
       		"hpa",
    		"kpa",
    		"in",
            "mm",
            "mbar"
       	)
    );
   	this.addAspectLine(
    	L("Display pressure for"), 
    	"pressure_level",
    	new Array(
       		"sea",
    		"location"
       	)
    );
   	this.addAspectLine(
    	L("Distance"), 
    	"distance",
    	new Array(
       		"mile",
    		"km"
       	)
    );
   	this.addAspectLine(
    	L("Rain/Snow rate"), 
    	"rain_rate",
    	new Array(
       		"in",
    		"mm",
    		"cm"
       	)
    );

    this.updateAspectLines();
}

YoUnitChooser.prototype.onChange = function() {
}

YoUnitChooser.prototype.addUnitSystemLine = function() {
	var a = new Array();

	var i = 0;

	if (this.showAutoChoice) {
		a[0] = "auto";
		a[1] = L("Auto");
		i = 1;
	}	
	
	for (var id in this.unitSystems) {
		var unitSystem = this.unitSystems[id];
		a[i * 2] = id;
		a[i * 2 + 1] = unitSystem.name;
		i++;
	}


	var parent = this.container;
	var table = document.createElement("table");
	table.cellPadding = 0;
	table.cellSpacing = 0;

	parent.appendChild(table);
	var tbody = document.createElement("tbody");
	table.appendChild(tbody);

	var tr = document.createElement("tr");
	tbody.appendChild(tr);

	var td = document.createElement("td");
	tr.appendChild(td);
	var label = document.createElement("div");
	label.innerHTML = "<nobr>" + L("Unit System") + ":</nobr>";
	label.className = "uc_unit_system_label";
	td.appendChild(label);
	label.style.marginRight = "5px";

	td = document.createElement("td");
	tr.appendChild(td);

	var value = document.createElement("div");

	var combo = this.createCombo("unitSystem", a);

	value.appendChild(combo);
	td.appendChild(value);


	var line = {
		combo: combo
	};

	if (this.showExpandControl) {
    	td = document.createElement("td");
    	tr.appendChild(td);
	
		var a = document.createElement('a');
		a.href = "#";
	
		var self = this;
		a.onclick = function() {
			self.onExpandButtonClick();
		}

		td.appendChild(a);
		
    	var img = document.createElement('img');
		img.style.border = "none";
		img.style.textDecoration = "none";
//		img.style.outline = "none";

		var b = false;
    	img.src = GetExpandButtonPath(b);
		this.expandImage = img;
    	a.appendChild(img);
	}

   	this.unitSystemLine = line;
}

YoUnitChooser.prototype.onExpandButtonClick = function() {       
//p	alert("onExpandButtonClick()");
	var b = this.aspectsTable.style.display != "none";
	b = !b;
	this.aspectsTable.style.display = b ? "block" : "none";

	this.expandImage.src = GetExpandButtonPath(b);
}

function GetExpandButtonPath(b) {
	return YoUnitChooser.basePath + "/img/" + (b ? "minus" : "plus") + "_button.png";
}

YoUnitChooser.prototype.addAspectLine = function(label, comboId, units) {
	var data = new Array();

	for (var i = 0; i < units.length; i++) {
		var unit = units[i];
		data[i * 2] = unit;
		data[i * 2 + 1] = YoUnitChooser.unitNames[unit];
	}
   	
   	line = this.createComboLine(this.container, label, comboId, data);
    this.aspectLines.push(line);   	
}

YoUnitChooser.prototype.createComboLine = function(parent, labelText, comboId, data) {
	var label = document.createElement("div");
	label.innerHTML = "<nobr>" + labelText + ":</nobr>";
	this.leftColumn.appendChild(label);
	label.style.height = "20px";
	label.style.lineHeight = "20px";

	var value = document.createElement("div");
	value.style.height = "20px";

	var combo = this.createCombo(comboId, data);

	value.appendChild(combo);
	this.rightColumn.appendChild(value);

	var line = {
		combo: combo
	};
	return line;
}

YoUnitChooser.prototype.createCombo = function(comboId, data) {
	var combo = document.createElement("select");
	combo.id = comboId;
	combo.style.width = "100%";
	combo.style.margin = "0";
	combo.style.padding = "0";

	for (var i = 0; i < Math.floor(data.length / 2); i++) {
    	var id = data[i * 2];
    	var text = data[i * 2 + 1];
    	
    	var option;
    	option = document.createElement('option');
    	option.value = id;
    	option.appendChild(document.createTextNode(text));
    	combo.appendChild(option);
	}

    var self = this;
	combo.onchange = function() {
		self.onComboChange(combo);
	}
	return combo;
}

YoUnitChooser.prototype.fillCustomFrom = function(unitSystemId) {
	var base = this.unitSystems[unitSystemId];
	if (!base) {
		return;
	}
	var ob = {};
	for (var id in base) {
		var value = base[id];
		ob[id] = value;
	}		
	ob.name = L("Custom") + "...";
	this.unitSystems['custom'] = ob;
}

YoUnitChooser.prototype.setAutoUnitSystemId = function(id) {
	if (!this.showAutoChoice) {
		return;
	}

	this.autoUnitSystemId = id;
	var unitSystem = this.unitSystems[id];
	autoOption = this.unitSystemLine.combo.options[0];
	autoOption.innerHTML = L("Auto") + " (" + unitSystem.name + ")";

	this.updateAspectLines();
}

YoUnitChooser.prototype.setUnitSystemId = function(id) {
//p p("setUnitSystemId(), id=" + id + ", current=" + this.unitSystemId);
	if (this.unitSystemId == id) {
		return;
	}
	this.unitSystemId = id;
   	this.unitSystemLine.combo.value = id;
	this.updateAspectLines();
}

YoUnitChooser.prototype.isAutoSelected = function() {
	var unitSystemId = this.unitSystemLine.combo.value;
	return unitSystemId == "auto";
}

YoUnitChooser.prototype.getUnitSystemId = function() {
	var unitSystemId = this.unitSystemLine.combo.value;
	if (unitSystemId == "auto") {
		unitSystemId = this.autoUnitSystemId;
	}
	return unitSystemId;
}

YoUnitChooser.prototype.setCustomAspect = function(aspect, value) {
	this.unitSystems['custom'][aspect] = value;
}

YoUnitChooser.prototype.getSystem = function(id) {
	return this.unitSystems[id];
}

YoUnitChooser.prototype.onComboChange = function(combo) {
//p	p("onComboChange(), combo=" + combo + ", value=" + combo.value + ", id=" + combo.id);
	if (combo.id == 'unitSystem') {
		this.unitSystemId = combo.value;
		this.updateAspectLines();
	}
	else {
		var custom = this.getSystem('custom');

		var currentId = this.getUnitSystemId();
		if (currentId != 'custom') {
			var current = this.getSystem(currentId);
			for (var i = 0, n = ASPECTS.length; i < n; i++) {
				var aspectId = ASPECTS[i];
				custom[aspectId] = current[aspectId];
			}
		}

		var aspect = combo.id;
		custom[aspect] = combo.value;
		
		this.setUnitSystemId("custom");
//p		p("onComboChange(), " + aspect + "=" + combo.value);
	}

//.expand aspects table when unit system selected
	if (this.expandImage) {
    	this.aspectsTable.style.display = "block";
    	this.expandImage.src = GetExpandButtonPath(true);
	}


	this.onChange();
}

YoUnitChooser.prototype.updateAspectLines = function() {
//p	p("updateAspectLines()");

	var unitSystemId = this.unitSystemLine.combo.value;
	if (unitSystemId == "auto") {
		unitSystemId = this.autoUnitSystemId;
		if (!unitSystemId) {
			unitSystemId = "us";
		}
	}
	this.unitSystemLine.combo.disabled = !this.enabled;

	var unitSystem = this.unitSystems[unitSystemId];

	for (var i = 0; i < this.aspectLines.length; i++) {
		var line = this.aspectLines[i];
		var combo = line.combo;

    	var id = combo.id;
    	var value = unitSystem[id];
//p p("id=" + id + ", value=" + value);
    	combo.value = value;

    	combo.disabled = !this.enabled;
//o || (unitSystemId != 'custom')
		;
    }
}

YoUnitChooser.prototype.setEnabled = function(b) {
	this.enabled = b;
	this.updateAspectLines();
}

function removeAllChildNodes(node) {
	if (node && node.hasChildNodes && node.removeChild) {
		while (node.hasChildNodes()) {
			node.removeChild(node.firstChild);
		}
	}
}
