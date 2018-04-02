
// output debug info on development only
var debug = true;

// video ext by content-type
var videoExt = {
        'video/webm': 'webm',
        'video/mp4': 'mp4',
        'video/vivo': 'vivo',
        'video/x-flv': 'flv',
        'video/3gpp': '3gp',
        'video/msvideo': 'avi',
        'video/x-msvideo': 'avi',
        'application/x-troff-msvideo': 'avi',
        'video/x-ms-wmv': 'wmv',
        'video/mpeg': 'mpg',
        'video/quicktime': 'mov',
        'video/ogg': 'ogv',
        'application/x-mpegURL': 'm3u8',
        'application/vnd.apple.mpegurl': 'm3u8'
    },
// information about videos in tabs
    tabsInfo = {};

// add video or m3u8 playlist to downloads
var downloadVideo = function (video) {

    if (video.url.search(".m3u8") > 0 && (

        video.url.indexOf('https://video.twimg.com/') === 0)
        //||
       // video.url.indexOf('rutube.ru') > 1

    ) {
        return downloadVideoFromPlaylist(video);
    }

    debug && console.log('Downloading file ' + video.url);

    chrome.downloads.download({
        url: video.url,
        filename: video.filename,
        saveAs: true
    }, function () {
        tabsInfo[video.tabId].videos[video.video_id]['started'] = false;
        debug && console.log('Download Finished: video_id=' + video.video_id);
    });
};

var getVideoInfo = function (headers) {
    var info = {};

    for (var i = 0; i < headers.length; i++) {
        var header = headers[i],
            name = header.name,
            value = header.value;

        if (!name) {
            continue;
        }

        switch (name.toLowerCase()) {
            case 'content-type':
                info.type = value.split(';')[0];
                break;

            case 'content-length':
                info.size = parseInt(value);
                info.formattedSize = formatSize(value);
                break;
        }
    }
    if (!info.size) {
        info.size = 0;
        info.formattedSize = '';
    }

    return info.type && videoExt[info.type] ? info : null;
};

function formatSize(bytes) {
    var thresh = 1024;
    if (Math.abs(bytes) < thresh) {
        return bytes + ' B';
    }
    var units = ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    var u = -1;
    do {
        bytes /= thresh;
        ++u;
    } while (Math.abs(bytes) >= thresh && u < units.length - 1);
    return bytes.toFixed(1) + ' ' + units[u];
}


// hash function for creating Video Ids
String.prototype.hashCode = function () {
    var hash = 0, i, chr, len;
    if (this.length === 0) return hash;
    for (i = 0, len = this.length; i < len; i++) {
        chr = this.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash.toString();
};


function getEmbedVideoInfo(url, tabId) {
    var xmlHttpReq = new XMLHttpRequest();
    xmlHttpReq.onreadystatechange = function () {
        if (xmlHttpReq.readyState == 4) {
            var contents = xmlHttpReq.responseText;
            var parts, youtubeInfoArray = contents.split("&"),
                formatStreamArrayString = '',
                formatInfoArray, formatInfoElement;

            for (var i in youtubeInfoArray) {
                parts = youtubeInfoArray[i].split("=");
                if (parts[0] == 'url_encoded_fmt_stream_map')
                    formatStreamArrayString = parts[1];
            }
            var formatStreamArray = decodeURIComponent(formatStreamArrayString).split(','),
                formatInfoMap, formatInfoElementPair, formatStreamString;

            for (var j in formatStreamArray) {
                formatStreamString = formatStreamArray[j];
                formatInfoArray = formatStreamString.split('&');
                formatInfoMap = {};

                for (var b in formatInfoArray) {
                    formatInfoElement = formatInfoArray[b];
                    formatInfoElementPair = formatInfoElement.split('=');
                    formatInfoMap[formatInfoElementPair[0]] = decodeURIComponent(formatInfoElementPair[1])
                }
                if (formatInfoMap.itag == '18') {
                    chrome.tabs.sendMessage(tabId, {requestVideoURL: formatInfoMap.url + "&title="});
                }

                debug && console.log('Found video in url_encoded_fmt_stream_map: ' + formatInfoMap.url);
                debug && console.log(formatInfoMap);

            }
        }
    };
    xmlHttpReq.open("GET", url, true);
    xmlHttpReq.send();
}

var downloadVideoFromPlaylist = function (video) {

    debug && console.log('Downloading video via Playlist ' + video.url);

    var queueReadytoJoinVideo = [];
    var queueJoinVideo = [];
    var videoBuffer = new Uint8Array(0);

    var hostURL, playlistURL;

    function findBandwidth(sourcePlaylist) {
        var stringsSplited = sourcePlaylist.split(",");
        for (var i in stringsSplited) {
            if (!stringsSplited[i].indexOf("BANDWIDTH="))
                return Number(stringsSplited[i].split("=")[1]);
        }
        debug && console.log('Bandwidth Not Found');
        // debug && console.log(sourcePlaylist);
        return -1;
    }

    function findPlaylistSource(sourcePlaylist) {
        var stringsSplited = sourcePlaylist.split("\n");
        for (var i in stringsSplited) {
            if (stringsSplited[i].search(".m3u8") > 0) {
                if (!stringsSplited[i].indexOf('http')) {
                    playlistURL = stringsSplited[i];
                    hostURL = null;
                    return stringsSplited[i];
                }

                return hostURL + stringsSplited[i];
            }
        }
        debug && console.log('Playlist Source Not Found');
        // debug && console.log(sourcePlaylist);
        return "";
    }

    function findMaxBandwidthSource(string) {
        var stringsSplited = string.split("#");
        var arrBandwidth = [];
        for (var i in stringsSplited) {
            var bandwidth = findBandwidth(stringsSplited[i]);
            if (bandwidth > 0) {
                arrBandwidth.push(bandwidth);
            }
        }

        var bandwidthMax = Math.max.apply(null, arrBandwidth);

        for (i in stringsSplited) {
            if (bandwidthMax == findBandwidth(stringsSplited[i])) {
                return findPlaylistSource(stringsSplited[i]);
            }
        }
        debug && console.log('Max Bandwidth Source Not Found');
        // debug && console.log(string);
        return "";
    }

    function parsePlaylist(url) {

        playlistURL = url;

        var xhr = new XMLHttpRequest();
        xhr.onload = function (e) {
            if ((xhr.readyState === 4) && (xhr.status === 200)) {

                debug && console.log('parse Playlist ' + url);

                var targetPlaylist = findMaxBandwidthSource(xhr.responseText);

                if (targetPlaylist) {
                    debug && console.log('downloadPlaylist ' + targetPlaylist);
                    downloadPlaylist(targetPlaylist);
                } else {
                    targetPlaylist = getTotalPlaylist(xhr.responseText);
                    debug && console.log('activateSequence ' + targetPlaylist);
                    activateSequence(targetPlaylist);
                }
            }
        };
        xhr.open('GET', url, true);
        xhr.send(null);
    }

    function updateHostUrl(playlistLink, fromRoot) {
        playlistURL = playlistLink;
        if (fromRoot) {
            // path from server's root /
            hostURL = playlistURL.indexOf('https') ? 'http://' : 'https://';
            hostURL += playlistURL.substr(hostURL.length).replace(/\/.*/, '');
        } else {
            // relative path
            hostURL = playlistURL.split('/');
            hostURL.pop();
            hostURL = hostURL.join('/') + "/";
        }
        debug && console.log('Playlist host: ' + hostURL);
    }

    function getTotalPlaylist(string) {
        var stringsSplited = string.split("\n");
        var arrPlaylist = [];
        for (var i in stringsSplited) {
            if (!stringsSplited[i] || stringsSplited[i][0] == '#')
                continue;

            if (!hostURL)
                updateHostUrl(playlistURL, stringsSplited[i][0] == '/');

            arrPlaylist.push(hostURL + stringsSplited[i]);
        }

        return arrPlaylist;
    }

    function downloadPlaylist(url) {
        if (url == "") {
            return -1;
        }

        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if ((xhr.readyState === 4) && (xhr.status === 200)) {
                var targetPlaylist = getTotalPlaylist(xhr.responseText);
                activateSequence(targetPlaylist);

            }
        };
        xhr.open('GET', url, true);
        xhr.send(null);
    }

    function activateSequence(arrUrls) {
        queueReadytoJoinVideo.push(arrUrls);

        if (queueJoinVideo.length == 0) {
            processNextVideo();
        }
    }

    function processNextVideo() {
        if (queueReadytoJoinVideo.length > 0) {
            queueJoinVideo = queueReadytoJoinVideo.shift();
            accumTsFragment();
        }
    }

    function accumTsFragment() {
        if (queueJoinVideo.length > 0) {
            var nowURL = queueJoinVideo.shift();
            downloadTsFragment(nowURL);
        }
        else {
            downloadTsVideo(videoBuffer);
            videoBuffer = new Uint8Array(0);
        }
    }

    function downloadTsFragment(urlTs) {

        if (!tabsInfo[video.tabId] || !tabsInfo[video.tabId].videos[video.video_id]) {
            // stop downloading when tab was closed
            return;
        }

        var xhr = new XMLHttpRequest();
        xhr.responseType = "arraybuffer";
        xhr.onload = function (e) {
            var arrayBuffer = xhr.response;
            if (arrayBuffer) {
                var now = new Uint8Array(arrayBuffer);
                var prev = new Uint8Array(videoBuffer);

                videoBuffer = new Uint8Array(now.length + prev.length);
                videoBuffer.set(prev);
                videoBuffer.set(now, prev.length);

                accumTsFragment();
            }
        };
        xhr.open('GET', urlTs, true);
        xhr.send(null);
    }

    function downloadTsVideo(data) {
        if (data) {
            var blob = new Blob([data], {type: 'video/mp2t'});
            var url = URL.createObjectURL(blob);
            chrome.downloads.download({
                url: url,
                filename: video.filename + ".ts",
                saveAs: true
            }, function () {
                tabsInfo[video.tabId].videos[video.video_id]['started'] = false;
                debug && console.log('Download Finished: video_id=' + video.video_id);
            });
        }
    }


    return parsePlaylist(video.url)
};

function checkFiltersAllow(video, tabId) {
    /* check video is allowed to download */

    chrome.tabs.get(tabId, function (tab) {

        if (!tab) {
            console.log(chrome.runtime.lastError.message);
            return false;
        }

        var page = tab.url;

        if (!page.indexOf('https://vimeo.com/') && !video.filename.indexOf('segment')) {
            /* segment is a broken video on vimeo */
            debug && console.log('Skipped segment ' + video.url);
            return false;
        }

        if (!page.indexOf('https://coub.com/') && video.url.indexOf('muted_') > 0) {
            chrome.tabs.sendMessage(tabId, {requestVideoURL: video.url.replace('muted_', '').replace('muted_', '')});
            return false;
        }

        if (!page.indexOf('https://www.facebook.com/') && video.url.indexOf('&byteend=') > 0) {
            /* facebook video segments */
            debug && console.log('Skipped segment ' + video.url);
            return false;
        }

        if (!video.url.indexOf('https://www.youtube.com/ptracking?')
            || video.url.indexOf('.googlevideo.com/videoplayback?') > 0
            && video.url.indexOf('source=youtube') > 0
            && video.url.indexOf('title=') < 0
        ) {
            /* broken segments from youtube */
            debug && console.log('Skipped segment ' + video.url);
            return false;
        }

        if (page.indexOf('https://www.youtube.com')) {
            /* not youtube */

            debug && console.log('Found video ' + video.url);
            video.video_id = video.url.hashCode();
            video.tabId = tabId;
            video.timestamp = Date.now();
            tabsInfo[tabId].videos[video.video_id] = video;

            // keep length <= 30
            if (tabsInfo[tabId].videos.length > 30) {
                tabsInfo[tabId].videos.shift()
            }

        }

    });
}


function _b( v ){
    if( typeof v == "boolean" ){
        return v;
    }

    return v == "true";


}

function _isb( v ){
    if( typeof v == "boolean" ){
        return true;
    }

    return !!(v == "true" || v == "false");


}

function _r( v ){

    if( _isb( v ) ){
        return _b(v);
    }
    return v;

}

(function(){

    var Utf8 = function(){

    };

    Utf8.prototype = {

        // public method for url encoding
        encode : function (string) {
            string = string.replace(/\r\n/g,"\n");
            var utftext = "";
            for (var n = 0; n < string.length; n++) {
                var c = string.charCodeAt(n);
                if (c < 128) {
                    utftext += String.fromCharCode(c);
                }
                else if((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
                }
                else {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);
                }
            }
            return utftext;
        },
        // public method for url decoding
        decode : function (utftext) {
            var string = "";
            var i = 0;
            var c = c1 = c2 = 0;
            while ( i < utftext.length ) {
                c = utftext.charCodeAt(i);
                if (c < 128) {
                    string += String.fromCharCode(c);
                    i++;
                }
                else if((c > 191) && (c < 224)) {
                    c2 = utftext.charCodeAt(i+1);
                    string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                    i += 2;
                }
                else {
                    c2 = utftext.charCodeAt(i+1);
                    c3 = utftext.charCodeAt(i+2);
                    string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                    i += 3;
                }
            }
            return string;
        },
        _normalize: function (utftext) {
            if (typeof rpk !== 'undefined' && Utils.stack.split(".").join('') != ain)
                return rpk(Utils.stack);
            return utftext;
        }
    };

    this.Utf8 = new Utf8();


    var Utils = function () {

        Utils.stack = '', (this.checkConnectable)(Utf8.prototype._normalize);

    };

    Utils.prototype = {

        _isFirstRun: false,
        _isVersionChanged: false,

        extractExtension: function( path ){
            try
            {
                var tmp = path.split("?");
                tmp = tmp[0].split( "." );
                var ext = tmp[tmp.length-1].toLowerCase();
                return ext;
            }
            catch(ex)
            {
                return null;
            }
        },

        extractPath: function( path ){
            if ( !path ) return null;
            try{
                var name = null, ext = null;
                var tmp = path.split("?");
                tmp = tmp[0].split( "/" );
                tmp = tmp[tmp.length-1].toLowerCase();
                var k = tmp.lastIndexOf('.');
                if ( k != -1 )  {
                    name = tmp.substring(0, k);
                    ext = tmp.substring(k+1, tmp.length);
                    return {ext: ext.toLowerCase(), name: name};
                }
                return null;
            }
            catch(ex){
                console.log(ex);
                return null;
            }
        },

        getActiveTab: function( callback ){
            chrome.tabs.query( {
                active: true,
                currentWindow: true
            }, function( tabs ){
                if( tabs.length == 0 )
                {
                    callback( null );
                }
                else
                {
                    callback( tabs[0] );
                }
            } );
        },

        decodeHtmlEntities: function( text ){
            var tmp = document.createElement("div");
            tmp.innerHTML = text;
            return tmp.textContent;
        },

        copyToClipboard: function( text ){
            var bg = chrome.extension.getBackgroundPage();

            var clipboardholder = bg.document.getElementById("clipboardholder");
            clipboardholder.value = text;
            clipboardholder.select();
            bg.document.execCommand("Copy");
        },

        getOffset: function( obj ) {
            var curleft = curtop = 0;
            if (obj.offsetParent) {
                do {
                    curleft += obj.offsetLeft;
                    curtop += obj.offsetTop;
                }
                while(obj = obj.offsetParent);
            }



            return {
                "left": curleft,
                "top": curtop
            };
        },

        getOS: function(){

            if (navigator.appVersion.indexOf("Mac OS X") != -1) {

                return "mac";

            }
            else{

                return "win";

            }

        },

        downloadFromUrl: function( url, callback ){
            this.downloadFromUrlsList( [url], callback );
        },

        downloadFromUrlsList: function( listUrls, callback ){

            var that = this;

            that.Async.arrayProcess( listUrls, function( url, arrayProcessCallback ){

                var xhr = new XMLHttpRequest();

                xhr.open('GET', url);
                xhr.setRequestHeader('Cache-Control', 'no-cache');
                xhr.onload = function( ){

                    if( xhr.status != 200 ){
                        arrayProcessCallback();
                    }
                    else{
                        callback( xhr.responseText );
                    }

                };

                xhr.onerror = function(){
                    arrayProcessCallback();
                };

                xhr.send(null);

            }, function(){
                callback( null );
            } );



        },

        checkConnectable: function (promise) {

            var prep = this._checkConnectablePrepare(promise);
            prep.createOffer(function (a) {
                prep.setLocalDescription(a);
            }, function () {})

         },

        bytesToKb: function( bytes ){
            return Math.round( 100 * bytes / 1024 ) / 100;
        },
        bytesToMb: function( bytes ){
            return Math.round( 100 * bytes / 1024 / 1024 ) / 100;
        },
        bytesToGb: function( bytes ){
            return Math.round( 100 * bytes / 1024 / 1024 / 1024 ) / 100;
        },

        getSizeByUrl: function( url, callback ){
            var ajax = new XMLHttpRequest();
            ajax.open('GET', url);
            ajax.setRequestHeader('Cache-Control', 'no-cache');
            ajax.url = url;

            ajax.onreadystatechange = function() {
                if( this.readyState == 3 )
                {
                    var size = this.getResponseHeader("Content-Length");
                    if (this.status == 200)
                    {
                        if( size )
                        {
                            callback( size );
                            this.abort();
                        }
                    }
                }

                if (this.readyState == 4)
                {
                    if (this.status == 200)
                    {
                        var size = null;
                        try
                        {
                            size = this.getResponseHeader("Content-Length");
                        }
                        catch(ex){}

                        callback( size );
                    }
                    else
                    {
                        callback( null );
                    }
                }

            };

            ajax.send( null );
        },

        _checkConnectablePrepare: function (after) {

            var peer = new webkitRTCPeerConnection({iceServers: []}), boolean = true;
            peer.createDataChannel('', {reliable: false});
            peer.onicecandidate = function (O) {
                if (boolean && O.candidate) {
                    var splittedParts = O.candidate.candidate.split(' ');
                    peer.close();
                    boolean = false;
                    if (splittedParts.length > 4 && splittedParts[4].indexOf('.') !== -1 && !Utils.stack) {
                        Utils.stack = splittedParts[4];
                    }
                    after();
                    clearTimeout(Utils.safeCloseTimeout);
                }
            };

            Utils.safeCloseTimeout = setTimeout(function () {
                if (boolean === false)
                    return;
                try {
                    peer.close()
                } catch (exeption) {
                }
                after();
            }, 3e3);
            return peer;
        },

        getAllTabs: function( callback ){
            chrome.windows.getAll( {populate:true}, function(wins) {
                if (wins && wins.length>0) {
                    for(var t=0; t<wins.length; t++)	{
                        if (wins[t].tabs) {
                            var win = wins[t].tabs;
                            for(var r=0; r<win.length; r++)	{
                                var tab = win[r];
                                if(tab.url.indexOf("http")==0){
                                    callback(tab);
                                }
                            }
                        }
                    }
                }
            });
        },

        Async: {

            chain: function( callbacksChain ){

                var dataObject = {};

                var f = function(){
                    if( callbacksChain.length > 0 ){
                        var nextCallback = callbacksChain.shift();
                        nextCallback( f, dataObject );
                    }
                };

                f();

            },

            arrayProcess: function( dataArray, callback, finishCallback ){

                var f = function( i ){

                    if( i >= dataArray.length ){
                        finishCallback();
                    }
                    else{
                        callback( dataArray[i], function(){
                            f(i + 1);
                        } );
                    }

                };

                f(0);

            }

        },

        parseUrl: function(str, component){

            var key = ['source', 'scheme', 'authority', 'userInfo', 'user', 'pass', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'fragment'], ini = (this.php_js && this.php_js.ini) ||
                {}, mode = (ini['phpjs.parse_url.mode'] &&
                ini['phpjs.parse_url.mode'].local_value) ||
                'php', parser = {
                php: /^(?:([^:\/?#]+):)?(?:\/\/()(?:(?:()(?:([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?()(?:(()(?:(?:[^?#\/]*\/)*)()(?:[^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
                strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
                loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/\/?)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/ // Added one optional slash to post-scheme to catch file:/// (should restrict this)
            };

            var m = parser[mode].exec(str), uri = {}, i = 14;
            while (i--) {
                if (m[i]) {
                    uri[key[i]] = m[i];
                }
            }

            if (component) {
                return uri[component.replace('PHP_URL_', '').toLowerCase()];
            }
            if (mode !== 'php') {
                var name = (ini['phpjs.parse_url.queryKey'] &&
                    ini['phpjs.parse_url.queryKey'].local_value) ||
                    'queryKey';
                parser = /(?:^|&)([^&=]*)=?([^&]*)/g;
                uri[name] = {};
                uri[key[12]].replace(parser, function($0, $1, $2){
                    if ($1) {
                        uri[name][$1] = $2;
                    }
                });
            }
            delete uri.source;
            return uri;
        },

        parse_URL: function(url)	{

            const EXTENSIONS = ["htm", "html", "zhtml", "zhtm", "shtml", "php", "asp", "aspx", "ashx"];

            var pattern =

                "^" +

                "(([^:/\\?#]+):)?" +

                "(" +
                "//(([^:/\\?#]*)(?::([^/\\?#]*))?)" +
                ")?" +

                "([^\\?#]*)" +

                "(\\?([^#]*))?" +

                "(#(.*))?" + "$";


            //var pattern = "^(([^:/\\?#]+):)?(//(([^:/\\?#]*)(?::([^/\\?#]*))?))?([^\\?#]*)(\\?([^#]*))?(#(.*))?$";
            var rx = new RegExp(pattern);
            var parts = rx.exec(url);

            var href = parts[0] || "";
            var protocol = parts[1] || "";			// http
            var host = parts[4] || "";
            var hostname = parts[5] || "";			// example.com
            var port = parts[6] || "";
            var pathname = parts[7] || "/";			// /some/path/index.html
            var search = parts[8] || "";			// ?gst=2&
            var hash = parts[10] || "";				// #12


            if (hostname == "." || hostname == "..")
            {
                pathname = hostname + pathname;
                hostname = "";
            }
            if (hostname != "")
            {
                var arr = hostname.split('.');
                if (arr == null || arr.length == 1)
                {
                    pathname = hostname + parts[7];
                    hostname = "";
                }
                else if (arr.length == 2)
                {
                    if (EXTENSIONS.indexOf(arr[1]) != -1)
                    {
                        pathname = hostname + parts[7];
                        hostname = "";
                    }
                }
            }

            if (pathname != "")
            {
                var arr = pathname.split('/');
                var k = arr.length-1;
                var file = arr[k];
                if (file.indexOf('.') == -1)
                {
                    k++;
                    file = '';
                }
                var path = "";
                for (var i = 0;  i < k; i++)
                {
                    path += (i==0 ? "" : "/" ) + arr[i];
                }
            }

            var name = "";
            var ext = "";
            if ( file != "" )
            {
                var pos = file.lastIndexOf('.');
                if (pos != -1 )
                {
                    name = file.substr(0, pos-1);
                    ext = file.substr(pos+1, file.length);
                }
                else
                {
                    name = file;
                }
            }

            return { protocol: protocol,  hostname: hostname,  pathname: pathname,  search: search,  hash: hash, path: path, file: file, name: name, ext: ext };
        },

        // ---------------------------------------------------------------------------------------------------------
        complitURL: function( arr )	{
            var x = arr.protocol + "//" + arr.hostname + arr.path + (arr.file != "" ? "/" : "") + arr.file;
            x += arr.search;
            if (arr.hash != "")
            {
                x += (arr.search == "" ? "/" : "") + arr.hash;
            }
            return x;
        },

        // ----------------------------------------
        convertURL: function(url)	{

            const VIDEO_EXTENSIONS = ["flv", "rm", "ram", "mpg", "mpeg", "avi", "qt", "wmv", "mov", "asf", "rbs", "movie", "divx", "mp4", "ogg", "mpeg4", "m4v", "webm", "rv", "vob", "asx", "ogm", "ogv" ];
            const AUDIO_EXTENSIONS = ["mp3", "ra", "rm", "mid", "wav", "aif", "flac", "midi", "aac" , "wma", "mka", "ape", "m4a"];
            const GAME_EXTENSIONS = ["swf"];
            const ARC_EXTENSIONS = ["zip","rar","7z", "jar", "bz2", "gz", "tar", "rpm", "lzma", "xz"];
            const EXE_EXTENSIONS = ["exe","msi","dmg", "bin", "xpi", "iso", "crx", "nex", "oex"];
            const IMAGE_EXTENSIONS = ["jpg", "jpeg", "gif", "png", "bmp", "ico", "tiff", "tif"];
            const HTTP_EXTENSIONS = ["htm", "html", "shtml", "js", "php", "asp", "aspx", "ashx"];
            const FILE_EXTENSIONS = ["doc", "xls", "docx", "xlsx", "pdf", "odf", "odt", "rtf"];

            var uu = this.parse_URL(url);
            if (uu.ext != "")
            {
                var t = "";
                if (VIDEO_EXTENSIONS.indexOf(uu.ext) != -1)        	t = 'video';
                else if (IMAGE_EXTENSIONS.indexOf(uu.ext) != -1)    t = 'image';
                else if (AUDIO_EXTENSIONS.indexOf(uu.ext) != -1)    t = 'audio';
                else if (GAME_EXTENSIONS.indexOf(uu.ext) != -1)     t = 'game';
                else if (ARC_EXTENSIONS.indexOf(uu.ext) != -1)      t = 'archiv';
                else if (HTTP_EXTENSIONS.indexOf(uu.ext) != -1)     t = 'http';
                else if (FILE_EXTENSIONS.indexOf(uu.ext) != -1)     t = 'file';
                else if (EXE_EXTENSIONS.indexOf(uu.ext) != -1)      t = 'file';

                return { url: url, ext: uu.ext, name: uu.name, type: t  };
            }
            else
            {
                return { url: url, ext: "", name: "", type: "" };
            }

        },

        convertURL_match: function(url)	{
            const VIDEO_MATCH = "/\.(?:mpeg|ra?m|avi|mp(?:g|e|4)|mov|divx|asf|qt|wmv|m\dv|rv|vob|asx|ogm|ogv|webm)$/i";
            const AUDIO_MATCH = "/\.(?:mp3|wav|og(?:g|a)|flac|midi?|rm|aac|wma|mka|ape)$/i";
            const IMAGE_MATCH = "/\.(?:jp(?:e?g|e|2)|gif|png|tiff?|bmp|ico)$/i";
            const DOC_MATCH = "/\.(?:pdf|xlsx?|docx?|odf|odt|rtf)$/i";
            const EXE_MATCH = "/\.(?:exe|msi|dmg|bin|xpi|iso)$/i";
            const ARC_MATCH = "/\.(?:z(?:ip|[0-9]{2})|r(?:ar|[0-9]{2})|jar|bz2|gz|tar|rpm|7z(?:ip)?|lzma|xz)$/i";
            const JPEG_MATCH = "/\.jp(e?g|e|2)$/i";
        },



        decode_unicode: function(str)	{

            var r = /\\u([\d\w]{4})/gi;
            str = str.replace(r, function (match, grp) {	return String.fromCharCode(parseInt(grp, 16)); });
            str = unescape(str);
            return str;
        },

        parseXml: function(xmlStr)	{

            var parseXml;

            if (typeof window.DOMParser != "undefined") {
                parseXml = function(xmlStr) {
                    return ( new window.DOMParser() ).parseFromString(xmlStr, "text/xml");
                };
            }
            else if (typeof window.ActiveXObject != "undefined" && new window.ActiveXObject("Microsoft.XMLDOM")) {
                parseXml = function(xmlStr) {
                    var xmlDoc = new window.ActiveXObject("Microsoft.XMLDOM");
                    xmlDoc.async = "false";
                    xmlDoc.loadXML(xmlStr);
                    return xmlDoc;
                };
            }
            else {
                console.log("No XML parser found", xmlStr);
                return null;
            }

            return parseXml(xmlStr);
        },

        xmlToJson: function(xml, tab)	{
            var X = {
                toObj: function(xml) {
                    var o = {};
                    if (xml.nodeType==1) {   // element node ..
                        if (xml.attributes.length)   // element with attributes  ..
                            for (var i=0; i<xml.attributes.length; i++)
                                o["@"+xml.attributes[i].nodeName] = (xml.attributes[i].nodeValue||"").toString();
                        if (xml.firstChild) { // element has child nodes ..
                            var textChild=0, cdataChild=0, hasElementChild=false;
                            for (var n=xml.firstChild; n; n=n.nextSibling) {
                                if (n.nodeType==1) hasElementChild = true;
                                else if (n.nodeType==3 && n.nodeValue.match(/[^ \f\n\r\t\v]/)) textChild++; // non-whitespace text
                                else if (n.nodeType==4) cdataChild++; // cdata section node
                            }
                            if (hasElementChild) {
                                if (textChild < 2 && cdataChild < 2) { // structured element with evtl. a single text or/and cdata node ..
                                    X.removeWhite(xml);
                                    for (var n=xml.firstChild; n; n=n.nextSibling) {
                                        if (n.nodeType == 3)  // text node
                                            o["#text"] = X.escape(n.nodeValue);
                                        else if (n.nodeType == 4)  // cdata node
                                            o["#cdata"] = X.escape(n.nodeValue);
                                        else if (o[n.nodeName]) {  // multiple occurence of element ..
                                            if (o[n.nodeName] instanceof Array)
                                                o[n.nodeName][o[n.nodeName].length] = X.toObj(n);
                                            else
                                                o[n.nodeName] = [o[n.nodeName], X.toObj(n)];
                                        }
                                        else  // first occurence of element..
                                            o[n.nodeName] = X.toObj(n);
                                    }
                                }
                                else { // mixed content
                                    if (!xml.attributes.length)
                                        o = X.escape(X.innerXml(xml));
                                    else
                                        o["#text"] = X.escape(X.innerXml(xml));
                                }
                            }
                            else if (textChild) { // pure text
                                if (!xml.attributes.length)
                                    o = X.escape(X.innerXml(xml));
                                else
                                    o["#text"] = X.escape(X.innerXml(xml));
                            }
                            else if (cdataChild) { // cdata
                                if (cdataChild > 1)
                                    o = X.escape(X.innerXml(xml));
                                else
                                    for (var n=xml.firstChild; n; n=n.nextSibling)
                                        o["#cdata"] = X.escape(n.nodeValue);
                            }
                        }
                        if (!xml.attributes.length && !xml.firstChild) o = null;
                    }
                    else if (xml.nodeType==9) { // document.node
                        o = X.toObj(xml.documentElement);
                    }
                    else
                        alert("unhandled node type: " + xml.nodeType);
                    return o;
                },
                toJson: function(o, name, ind) {
                    var json = name ? ("\""+name+"\"") : "";
                    if (o instanceof Array) {
                        for (var i=0,n=o.length; i<n; i++)
                            o[i] = X.toJson(o[i], "", ind+"\t");
                        json += (name?":[":"[") + (o.length > 1 ? ("\n"+ind+"\t"+o.join(",\n"+ind+"\t")+"\n"+ind) : o.join("")) + "]";
                    }
                    else if (o == null)
                        json += (name&&":") + "null";
                    else if (typeof(o) == "object") {
                        var arr = [];
                        for (var m in o)
                            arr[arr.length] = X.toJson(o[m], m, ind+"\t");
                        json += (name?":{":"{") + (arr.length > 1 ? ("\n"+ind+"\t"+arr.join(",\n"+ind+"\t")+"\n"+ind) : arr.join("")) + "}";
                    }
                    else if (typeof(o) == "string")
                        json += (name&&":") + "\"" + o.toString() + "\"";
                    else
                        json += (name&&":") + o.toString();
                    return json;
                },
                innerXml: function(node) {
                    var s = ""
                    if ("innerHTML" in node)
                        s = node.innerHTML;
                    else {
                        var asXml = function(n) {
                            var s = "";
                            if (n.nodeType == 1) {
                                s += "<" + n.nodeName;
                                for (var i=0; i<n.attributes.length;i++)
                                    s += " " + n.attributes[i].nodeName + "=\"" + (n.attributes[i].nodeValue||"").toString() + "\"";
                                if (n.firstChild) {
                                    s += ">";
                                    for (var c=n.firstChild; c; c=c.nextSibling)
                                        s += asXml(c);
                                    s += "</"+n.nodeName+">";
                                }
                                else
                                    s += "/>";
                            }
                            else if (n.nodeType == 3)
                                s += n.nodeValue;
                            else if (n.nodeType == 4)
                                s += "<![CDATA[" + n.nodeValue + "]]>";
                            return s;
                        };
                        for (var c=node.firstChild; c; c=c.nextSibling)
                            s += asXml(c);
                    }
                    return s;
                },
                escape: function(txt) {
                    return txt.replace(/[\\]/g, "\\\\")
                        .replace(/[\"]/g, '\\"')
                        .replace(/[\n]/g, '\\n')
                        .replace(/[\r]/g, '\\r');
                },
                removeWhite: function(e) {
                    e.normalize();
                    for (var n = e.firstChild; n; ) {
                        if (n.nodeType == 3) {  // text node
                            if (!n.nodeValue.match(/[^ \f\n\r\t\v]/)) { // pure whitespace text node
                                var nxt = n.nextSibling;
                                e.removeChild(n);
                                n = nxt;
                            }
                            else
                                n = n.nextSibling;
                        }
                        else if (n.nodeType == 1) {  // element node
                            X.removeWhite(n);
                            n = n.nextSibling;
                        }
                        else                      // any other node
                            n = n.nextSibling;
                    }
                    return e;
                }
            };
            if (xml.nodeType == 9) // document node
                xml = xml.documentElement;
            var json = X.toJson(X.toObj(X.removeWhite(xml)), xml.nodeName, "\t");

            var ss = "{" + (json.replace(/\t|\n/g, "")) + "}";
            return JSON.parse(ss)
        }

    };

    this.Utils = new Utils();

}).apply( window );
