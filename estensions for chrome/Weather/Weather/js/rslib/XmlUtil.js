
function XmlUtil() {
}

XmlUtil.getChild = function(node, path, forced) {
	if (!node) {
		return null;
	}
    if (forced == null) {
        forced = false;
    }
    if (!path || path == "") {
        return node;
    }       
	
    var startIndex = 0;
    var index;
    var name;
    var parent = node;
	var child;
    while (index != -1) {
        index = path.indexOf("/", startIndex);
        if (index == -1) {
            name = path.substring(startIndex);
        }
        else {
            name = path.substring(startIndex, index);
        }
        child = XmlUtil.getDirectChild(parent, name, forced);
        if (!child) {
			return null;
        }
        parent = child;
        startIndex = index + 1;
    }
    return child;
}

XmlUtil.getDirectChild = function(parent, childName, forced) {
    var index = childName.indexOf("@");
    if (index == 0) {
    	childName = childName.substring(1);
    	return parent.getAttribute(childName);
    }
    
    var child = null;

    var children = parent.getElementsByTagName(childName);
    if (children.length != 0) {
		child = children[0];
	}
	if (!child && forced) {
		child = parent.ownerDocument.createElement(childName);
		parent.appendChild(child);
	}
    return child;
}

XmlUtil.copyContent = function(source, target) {
	if (!source || !target) {
		return;
	}
	for (var i = 0; i < source.childNodes.length; i++) {
		var child = source.childNodes[i];
		target.appendChild(child.cloneNode(true));
	}
	for(var i = 0; i < source.attributes.length; i++) {
		var attr = source.attributes[i];
		target.setAttribute(attr.name, attr.value);
	}
}

XmlUtil.formatBoolean = function(b) {
	return b ? "true" : "false";
}

XmlUtil.parseBoolean = function(text, def) {
	if (text == "true") {
		return true;
	}
	if (text == "false") {
		return false;
	}
	if (def == null) {
		return false;
	}
	return def;
}

XmlUtil.format = function(node) {
	if (!node) {
		return "[null]";
	}
    return (new XMLSerializer()).serializeToString(node);
}

