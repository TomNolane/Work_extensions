
var myHost = new Host();

chrome.extension.onMessage.addListener(onExtensionMessage);
document.addEventListener('DOMContentLoaded', onLoad);

function onLoad() {
	myHost.init();
}

function onExtensionMessage(request, sender, sendResponse) {
	var functionName = request.action;

	if (myHost[functionName]) {
		myHost[functionName](request, sender, sendResponse);
	}
}

