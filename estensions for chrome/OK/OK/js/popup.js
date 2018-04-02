window.addEventListener("load", function(){
	chrome.tabs.create({url: 'http://ok.ru/', active: true}, function(){});
}, false);