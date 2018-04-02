
//-------------------------------- ok.ru  ------------------------------//
function findOkRuVideos() {
    var url = document.location.href;

    if (window.name === 'fb_mpb_iframe' && url.indexOf('https://m.ok.ru/video/') === 0) {

        var vdo, vdoLen;
        vdo = document.querySelectorAll("a.outLnk.vdo");
        vdoLen = vdo.length;
        if (vdoLen > 0) {
            for (var index2 = 0; index2 < vdoLen; index2++)
                vdo[index2].click();
        }
        var stopVideo = setInterval(function(){
            vdo = document.querySelectorAll("video");
            vdoLen = vdo.length;
            if (vdoLen > 0) {
                clearInterval(stopVideo);
                setTimeout(function(){
                    window.location = 'about:blank';
                }, 3e4);
                for (var index = 0; index < vdoLen; index++) {
                    vdo[index].pause();
                    vdo[index].setAttribute('muted', 'muted');
                    vdo[index].volume = 0;
                    vdo[index].load();
                }
            }
        }, 100);
    }

    if (url.indexOf('https://ok.ru/video/') === 0 ) {

        var injectIframe = function(){

            var addIframe = (function addIframe(){
                var url = document.location.href;
                if (window.top != window || url.indexOf('fb_mpb_iframe') !== -1) return;
                if (!document.getElementById('fb_mpb_iframe')) {
                    var mob = document.createElement('iframe');
                    mob.id = 'fb_mpb_iframe';
                    mob.name = 'fb_mpb_iframe';
                    mob.src = ((url.indexOf('?') === -1) ? (url + '?fb_mpb_iframe=1') : (url + '&fb_mpb_iframe=1')).replace('//ok.ru/', '//m.ok.ru/');
                    mob.style.position = 'fixed';
                    mob.style.top = '-100000px';
                    mob.style.height = '1px';
                    mob.style.width = '10px';
                    document.head.appendChild(mob);
                    mob.mute && mob.mute();
                    console.log("Iframe injected.");
                    document.head.removeChild(document.getElementById('addIframe_fb_mpb'));
                }
            });
            var scr = document.createElement('script');
            scr.id = 'addIframe_fb_mpb';
            scr.innerText = addIframe.toString() + ';addIframe();';
            if (document.location.href.indexOf('fb_mpb_iframe') === -1)
                document.head.appendChild(scr);

        };

        var loop = function () {

            if (window.SVF_oldUrl != document.location.href) {
                window.SVF_oldUrl = document.location.href;

                if (document.getElementById('fb_mpb_iframe'))
                    document.head.removeChild(document.getElementById('fb_mpb_iframe'));
                injectIframe();
            }
        };

        loop();

        setInterval(loop, 3000);

    }
}


//------------------------------ facebook ------------------------------//

function findFacebookVideos() {
    for (var s1, s2, b = document.querySelectorAll("script"), c = 0; c < b.length; c++) {
        s1 = b[c].innerHTML.match(/sd_src"?:"(.*?)"/);
        s2 = b[c].innerHTML.match(/hd_src"?:"(.*?)"/);
        if (s1)
            requestVideoURL(parseJsonUrl(s1[1]));
        if (s2)
            requestVideoURL(parseJsonUrl(s2[1]));
    }

    // load mobile version of video page in iframe
    var addIframe = (function addIframe(){
        var url = document.location.href;
        if (window.top != window)return;
        if (url.indexOf('https://www.facebook.com/') === 0 && url.indexOf('/videos/') !== -1 && !document.getElementById('fb_mpb_iframe')) {
            var mob = document.createElement('iframe');
            mob.id = 'fb_mpb_iframe';
            mob.name = 'fb_mpb_iframe';
            mob.src = (url.indexOf('?') === -1) ? (url + '?fb_mpb_iframe=1') : (url + '&fb_mpb_iframe=1');
            mob.style.position = 'fixed';
            mob.style.top = '-100000px';
            mob.style.height = '1px';
            mob.style.width = '10px';
            mob.onload = function () {
                setTimeout(function () {
                    document.head.removeChild(document.getElementById('fb_mpb_iframe'));
                }, 1e4);
            };
            document.head.appendChild(mob);
            mob.mute && mob.mute();
        }
    });
    var scr = document.createElement('script');
    scr.innerText = addIframe.toString() + ';addIframe();';
    document.head.appendChild(scr);
    //addIframe();

    if (window.top != window && window.name == 'fb_mpb_iframe') {
        if (document.location.href.indexOf('https://www.facebook.com/') === 0) {
            console.log('ERROR: Iframe not redirected to mobile version! ' + window.location.href);
            window.location = 'about:blank';
        }
        for (var b2 = document.querySelectorAll("div"), c2 = 0, jsonData; c2 < b2.length; c2++) {
            if (b2[c2].getAttribute('data-store')) {
                jsonData = JSON.parse(b2[c2].getAttribute('data-store'));
                if (jsonData.src)
                    window.top.requestVideoURL(jsonData.src)
            }

        }
    }

}

function parseJsonUrl(url) {
    if (url.indexOf("\\/") == -1)
        return url;
    var parsed = JSON.parse('"' + url + '"');

    return parsed ? parsed : url;
}

//------------------------------- vimeo -------------------------------//

function GetVimeoId(url) {
    var csId = url;
    var i = csId.indexOf('?');
    if (i >= 0)
        csId = csId.substr(0, i);
    i = csId.indexOf('#');
    if (i >= 0)
        csId = csId.substr(0, i);
    i = csId.lastIndexOf('/');
    if (i < 0)
        return;
    csId = csId.substr(i + 1);
    if (csId.length < 8)
        return;
    for (i = 0; i < csId.length; i++) {
        if (csId.charAt(i) < '0' || csId.charAt(i) > '9')
            return;
    }
    return csId;
}
function findVimeoVideos() {
    var html = document.getElementsByTagName('html')[0].innerHTML;
    var k = 'data-config-url="', i = html.indexOf(k);
    var url = false;
    if (i >= 0) {
        i += k.length;
        var i2 = html.indexOf('"', i);
        if (i2 > i)
            url = html.substr(i, i2 - i);
    }
    if (!url) {
        var o = FindFirstUrl(html, "/config?", 0);
        if (o)
            url = o[1];
    }
    if (!url) {
        var id = GetVimeoId(document.location.href);
        if (!id)
            return;
        url = "https://player.vimeo.com/video/" + id;
    }
    url = url.replace(/&amp;/g, "&");
    var r = new XMLHttpRequest();
    r.open("GET", url, true);
    r.onreadystatechange = function () {
        if (this.readyState != 4)
            return;
        var s = this.responseText;
        var start = 0;
        while (1) {
            var o = FindFirstUrl(s, ".mp4", start);
            if (!o)
                break;
            start = o[0];
            i = s.indexOf('"height":', start);
            var h = 0;
            if (i > 0)
                h = parseInt(s.substr(i + 9));
            var url = o[1];
            requestVideoURL(url);
        }
    };
    r.send(null);
}
function FindFirstUrl(html, ext, i2) {
    var i1;
    while (1) {
        i1 = html.indexOf(ext, i2);
        if (i1 < 0)
            return;
        i2 = i1;
        i2 += ext.length;
        var l = html.length;
        while (i1 > 0 && html.charAt(i1) != '"' && html.charAt(i1) != '\'' && html.charAt(i1) != '>') {
            i1--;
        }
        if (html.charAt(i1) == '>') {
            while (i2 < l && html.charAt(i2) != '<') {
                i2++;
            }
        }
        else {
            while (i2 < l && html.charAt(i2) != '"' && html.charAt(i2) != '\'') {
                i2++;
            }
        }
        i1++;
        if (html.substr(i1, 7) == "http://" || html.substr(i1, 8) == "https://" || html.substr(i1, 4) == "www." || html.substr(i1, 5) == "/www.") {
            return [i2, html.substr(i1, i2 - i1)]
        }
        else if (html.substr(i1, 9) == "http:\\/\\/" || html.substr(i1, 10) == "https:\\/\\/") {
            var s = html.substr(i1, i2 - i1);
            s = s.replace(/\\\//g, "/");
            return [i2, s];
        }
        if (i2 <= i1)
            break;
    }
}

//---------------------------- other sites ----------------------------//

function isSupportedUrl(url) {
    if (!url || !url.toLowerCase)
        return false;
    if ((url.toLowerCase().indexOf('javascript:') != -1) || (url.toLowerCase().indexOf('javascript :') != -1))
        return false;
    if ((url.toLowerCase().indexOf('mailto:') != -1) || (url.toLowerCase().indexOf('mailto :') != -1))
        return false;
    if (url.indexOf("data:image") != -1)
        return false;
    return !((url.indexOf(".mp4") == -1) && (url.indexOf(".flv") == -1) && (url.indexOf(".mov") == -1));
}
function myTrim(txt) {
    if (!txt)
        return '';
    return txt.replace(/^[\s_]+|[\s_]+$/gi, '').replace(/(_){2,}/g, "_");
}
function scanPage() {

    var i, cl, title, link;
    for (i = 0; i < document.links.length; i++) {
        link = document.links[i];

        if (isSupportedUrl(link.href)) {
            title = '';
            if (link.hasAttribute('title'))
                title = myTrim(link.getAttribute('title'));
            if (!title && link.hasAttribute('alt'))
                title = myTrim(link.getAttribute('alt'));
            if (!title)
                title = myTrim(link.innerText);

            if (!title)
                title = document.title;
            cl = "";
            if (link.hasAttribute('class'))
                cl = myTrim(link.getAttribute('class'));

            requestVideoURL(link.href);
        }
    }

    var a = document.getElementsByTagName('video'), u;
    for (i = 0; i < a.length; i++) {
        link = a[i];
        u = false;
        if (link.src)
            u = link.src;
        if (!u && link.hasAttribute('data-thumb')) {
            u = myTrim(link.getAttribute('data-thumb'));
            if (u.indexOf("http") == -1)
                u = "http:" + u;
        }

        if (isSupportedUrl(u)) {
            title = '';
            if (link.hasAttribute('alt'))
                title = myTrim(link.getAttribute('alt'));
            else if (link.hasAttribute('title'))
                title = myTrim(link.getAttribute('title'));
            if (!title)
                title = document.title;
            cl = "";
            if (link.hasAttribute('class'))
                cl = myTrim(link.getAttribute('class'));


            requestVideoURL(u);
        }
    }


}

//------------------------------- main -------------------------------//

var lastUrl = false;

function sendAllLinks() {
    if (lastUrl != document.location.href) {
        lastUrl = document.location.href;
        if (document.location.host == "vimeo.com") {
            findVimeoVideos();
        } else {
            if (document.location.href.indexOf('://www.facebook.com') > 0 || document.location.href.indexOf('://m.facebook.com') > 0)
                findFacebookVideos();

            if (document.location.host == "ok.ru" || document.location.host == "m.ok.ru") {
                findOkRuVideos();
            }

            // twitter's video frame
            if (!document.location.href.indexOf('https://twitter.com/i/videos/tweet/')) {
                var tagDiv = document.getElementsByTagName('body')[0].innerHTML;

                var targetVideoSource;
                if (tagDiv.search("vmap") > -1) {
                    /* fix complicated videos */
                }
                else {
                    var subDivStr = tagDiv.substring(tagDiv.search("video.twimg.com"), tagDiv.length - 1).split("&")[0].split("\\");
                    targetVideoSource = "https://";
                    for (var i in subDivStr) {
                        targetVideoSource += subDivStr[i];
                    }
                    requestVideoURL(targetVideoSource);
                    return;
                }
            }

            // other sites
            scanPage();
        }
    }
}

var processMessage = function (request, sender, sendResponse) {
    if (request['requestVideoURL'])
        requestVideoURL(request['requestVideoURL']);
};

function requestVideoURL(url) {
    var id = 'pnejdjcbhjlllgplcgioihkjbbhbjiia';
    if (chrome && chrome.runtime && chrome.runtime.id && chrome.runtime.id != id) {
        id = chrome.runtime.id;
    }
    chrome.runtime.sendMessage(id, {msg: 'checkVideoIsNew', url: url}, function (response) {
        if (response.isNew) {
            // ping video url to get headers in background script
            var r = new XMLHttpRequest();
            r.onreadystatechange = function () {
                if (r.readyState >= 2) {
                    // don't download full video, abort after got headers
                    r.abort()
                }
            };
            r.open("GET", url, true);
            r.send();
        }
    });
}


if (!window.sendAllLinksInterval) {
    sendAllLinks();
    window.sendAllLinksInterval = setInterval(sendAllLinks, 3000);
    chrome.runtime.onMessage.addListener(processMessage);
}

