/*
 * This file is a part of the ImageSpark Downloader project.
 * Minimized by GCC.
 */

(function(){var k="http",f="";try{var d=new URL(window.location.href),k=d.protocol,f=d.origin}catch(a){}var b={imageRegex:/(?:([^:\/?#]+):)?(?:\/\/([^\/?#]*))?([^?#]*\.(?:jpe?g|gif|png))(?:\?([^#]*))?(?:#(.*))?/i,isAbsoluteURLRegExp:/^(?:[a-z]+:)?\/\//i,mapElement:function(a){if("img"===a.tagName.toLowerCase()){a=a.src;var e=a.indexOf("#");0<=e&&(a=a.substr(0,e));return a}if("a"===a.tagName.toLowerCase()&&(e=a.href,b.isImageURL(e)))return b.linkedImages[e]="0",e;if(a=window.getComputedStyle(a)["background-image"])if(a=
b.extractURLFromStyle(a),b.isImageURL(a))return a;return""},extractURLFromStyle:function(a){a=a.replace(/^url\(["']?/,"").replace(/["']?\)$/,"");var b=a.match(this.imageRegex);b&&0<b.length&&(a=b[0]);return a},isImageURL:function(a){return"data:image"===a.substring(0,10)||b.imageRegex.test(a)},removeAndFixFilterWithDuplicateOrEmpty:function(a){for(var b=[],d={},c=0;c<a.length;c++)d[a[c]]=0;for(var f in d)(a=this.imageURLFixFilter(f))&&b.push(a);return b},imageURLFixFilter:function(a){if(!a||0===a.length)return!1;
if("//"==a.substring(0,2))a=k+a;else{if("."==a.substring(0,1)||"-webkit"==a.substring(0,7))return!1;"/"==a.substring(0,1)?a=f+a:"data:image"==a.substring(0,10)||this.isAbsoluteURLRegExp.test(a)||(a=f+"/"+a)}return a},linkedImages:{}};b.images=[].slice.apply(document.getElementsByTagName("*"));b.images=b.images.map(b.mapElement);
try{for(d=0;d<document.styleSheets.length;d++){var g=document.styleSheets[d].cssRules;if(g)for(var h=0;h<g.length;h++){var c=g[h].style;c&&c["background-image"]&&(c=b.extractURLFromStyle(c["background-image"]),
b.isImageURL(c)&&b.images.push(c))}}}catch(a){}
b.images=b.removeAndFixFilterWithDuplicateOrEmpty(b.images);chrome.extension.sendMessage({linkedImages:b.linkedImages,images:b.images});b.linkedImages=null;b.images=null})();