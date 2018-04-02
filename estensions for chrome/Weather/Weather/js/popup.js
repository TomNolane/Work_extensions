	//IMPORTANT: without GA script initialized at the end of <body>, YoWindow does not receive focus on opening. No idea why.
     var _gaq = _gaq || [];
     _gaq.push(['_setAccount', 'UA-465329-5']);
     _gaq.push(['_trackPageview']);

    (function() {
      var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
      ga.src = 'https://ssl.google-analytics.com/ga.js';
      var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
    })();


var myWidgetController = null;
document.addEventListener('DOMContentLoaded', onLoad);

function onLoad() {
	var iframe = document.getElementById("banner_iframe");
	if (iframe != null) {
		if (Version.EDITION == "free") {
			var url = "https://yowindow.com/chrome_ext_banner.php?" + "locale=" + chrome.i18n.getMessage("@@ui_locale");
			iframe.src = url;
		}
	}

//d
//	var localeWord = L('Russia');
//	console.log("localeWord=" + localeWord);
	
	var optionsLink = document.getElementById("options_link");
	optionsLink.addEventListener('click', onOptoinsLinkClick);
//
//	var testLink = document.getElementById("test_link");
//	testLink.addEventListener('click', onTestLinkClick);

	var height = 500;
	if (Version.EDITION == "unlimited") {
		height = 595;
	}
	myWidgetController = new ExtensionWidgetController(800, height);
	myWidgetController.asyncInit();
}

function onOptoinsLinkClick() {
	openOptionsPage();
}

function openOptionsPage() {
	chrome.tabs.create({url: "optionsPage.html"});
}
 
function onTestLinkClick() {
    console.log("onTestLinkClick()");
}

/*o
//Load Twitter API
		!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];
		if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="http://platform.twitter.com/widgets.js";
		fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");

//Load Facebook API
        window.fbAsyncInit = function() {
            FB.init({
    			appId: '160057600696679', 
    			status: true, 
    			cookie: true, 
    			xfbml: true}
    		);
        };
          
    	(function() {
            var e = document.createElement('script');
            e.async = true;
//        e.src = 'https://connect.facebook.net/' + chrome.i18n.getMessage("@@ui_locale") + '/all.js';
            e.src = 'https://connect.facebook.net/' + "en_US" + '/all.js';

            document.getElementById('fb-root').appendChild(e);
         }());
*/
