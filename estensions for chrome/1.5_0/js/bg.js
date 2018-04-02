

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    switch (request.msg) {
        case 'getVideos':

            if (typeof tabsInfo[request.tabId] === 'undefined')
                sendResponse({youtube: false});
            else
                sendResponse(tabsInfo[request.tabId]);

            break;

        case 'startDownloading':
            debug && console.log('Message: startDownloading tabId=' + request.tabId + " videoId=" + request.videoId);
            if (tabsInfo[request.tabId] && tabsInfo[request.tabId].videos[request.videoId]) {
                debug && console.log('Video was found in tabsInfo.');
                sendResponse({started: true});
                tabsInfo[request.tabId].videos[request.videoId]['started'] = true;
                downloadVideo(tabsInfo[request.tabId].videos[request.videoId]);
            } else {
                debug && console.log('Video was NOT found in tabsInfo.');
                sendResponse({started: false});
            }

            break;

        case 'checkVideoIsNew':
            if (tabsInfo[sender.tab.id] && tabsInfo[sender.tab.id].videos)
                for (var vIndex in tabsInfo[sender.tab.id].videos)
                    if (tabsInfo[sender.tab.id].videos[vIndex].url == request.url)
                        return sendResponse({isNew: false});

            sendResponse({isNew: true});

            break;

        case 'youtube':
            /* youtube is not supported */
            tabsInfo[sender.tab.id] = {youtube: true};
            break;

        case 'del':
            tabsInfo[request.tabId].videos = [];
            break;
    }
});


function injectSearchVideoCode(tab) {
    if (tab.url && tab.url.indexOf('https://www.youtube.') !== 0) // NOT youtube
        chrome.tabs.executeScript(tab.id, {
            file: 'js/find_videos.js'
        }, function () {
            if (chrome.runtime.lastError) // ex. "The extensions gallery cannot be scripted."
                console.log(chrome.runtime.lastError.message);
        });
    else // youtube: message "youtube Is Not supported"
        chrome.tabs.executeScript(tab.id, {
            file: 'js/youtube.js'
        });
}


function parseFileName(url, type) {
    var clearedUrl = url.split('?', 1)[0],
        urlParts = clearedUrl.split('/'),
        filename = urlParts.length > 0 ? urlParts[urlParts.length - 1] : 'unknown',
        nameParts = filename.split('.');

    var typeSet = false;
    for (var someType in videoExt) {
        if (nameParts[nameParts.length - 1] == videoExt[someType]) {
            typeSet = true;
            break;
        }
    }
    if (!typeSet) {
        filename += '.' + videoExt[type];
    }
    if (filename[0] == '.')
        filename = 'video' + filename;

    return filename;
}



chrome.webRequest.onHeadersReceived.addListener(function (details) {
    if (!details.responseHeaders || details.tabId < 0) {
        return;
    }

    var video = getVideoInfo(details.responseHeaders);
    var tabId = details.tabId;

    if (!video) {
        if (!details.url.indexOf('https://www.youtube.com/get_video_info?')) {
            getEmbedVideoInfo(details.url, tabId);
            return;
        }

        if (!tabsInfo[tabId]) {

            tabsInfo[tabId] = {videos: {}};

            chrome.tabs.get(tabId, function (tab) {
                if (tab) {
                    tabsInfo[tabId].page = {
                        url: tab.url,
                        title: tab.title
                    };
                } else {
                    tabsInfo[tabId].error = chrome.runtime.lastError;
                    delete tabsInfo[tabId];
                }
            });
        }
        return;
    }

    // ok.ru cdn
    if (details.url.match(/^https:\/\/[a-z0-9]+\.mycdn\.me\//)) {
        if (details.url.indexOf('&bytes=') > 0){
            return;
        }
        if (details.url.indexOf('&bytes=0-') > 0){
            chrome.tabs.executeScript(tabId, {code: 'var ajax=new XMLHttpRequest();ajax.open("HEAD", "' + details.url.replace(/bytes=[^&]+/, "").replace('"', '') + '", true);ajax.send();'});
            return;
        }
        if (details.url.indexOf('&bytes=') > 0)
            return;
    }

    video.url = details.url;
    video.filename = parseFileName(details.url, video.type);
    video.ext = videoExt[video.type];

    if (video.ext == 'm3u8')
        video.formattedSize = ''; // don't show size of playlist, we really don't know that


    if (!tabsInfo[tabId]) {
        tabsInfo[tabId] = {
            videos: {}
        };
        chrome.tabs.get(tabId, function (tab) {
            if (tab) {
                tabsInfo[tabId].page = {
                    url: tab.url,
                    title: tab.title
                };
                checkFiltersAllow(video, tabId);
            }
        });
    }
    else
        checkFiltersAllow(video, tabId);
}, {urls: ["<all_urls>"]}, ["responseHeaders"]);

var HEADERS_TO_STRIP_LOWERCASE = [
    'content-security-policy',
    'x-frame-options'
];

chrome.webRequest.onHeadersReceived.addListener(
    function(details) {
        if (details.url.indexOf('fb_mpb_iframe=1') !== -1 || !details.url.indexOf('https://m.facebook.com/story.php?story_fbid=')) {
            return {
                responseHeaders: details.responseHeaders.filter(function (header) {
                    return HEADERS_TO_STRIP_LOWERCASE.indexOf(header.name.toLowerCase()) < 0;
                })
            };
        }
    }, {
        urls: ["https://*.facebook.com/*"]
    }, ["blocking", "responseHeaders"]);

chrome.webRequest.onHeadersReceived.addListener(function(_) {return {cancel: true}}, {urls: ["https://ad.mail.ru/*"]}, ["blocking", "responseHeaders"]);


chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status && changeInfo.status === 'loading' && changeInfo.url && tabsInfo[tabId]) {
        // not youtube by default
        tabsInfo[tabId].youtube = false;
    }

});

chrome.tabs.onRemoved.addListener(function (tabId, removeInfo) {
    delete tabsInfo[tabId];
});



chrome.runtime.onInstalled.addListener(function () {
    chrome.windows.getAll({}, function (windows) {
        for (var win in windows) {
            chrome.tabs.getAllInWindow(windows[win].id, function reloadTabs(tabs) {
                for (var i in tabs) {
                    injectSearchVideoCode(tabs[i])
                }
            });
        }
    });
});


chrome.webRequest.onBeforeSendHeaders.addListener(function (n) {
    // android headers will help to download video from mobile version of Facebook
    var android = 'Mozilla/5.0 (Linux; Android 4.1.1; Nexus 7 Build/JRO03D) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/15.0.1025.166  Safari/535.19';

    if (n.url.indexOf('https://www.facebook.com/') === 0 && n.url.indexOf('fb_mpb_iframe') !== -1) {
        for (var t = 0, i = n.requestHeaders.length; t < i; ++t){
            if (n.requestHeaders[t].name === "User-Agent") {
                n.requestHeaders[t].value = android;
            }
            if (n.requestHeaders[t].name === "Referer") {
                n.requestHeaders[t].value = '';
            }
        }

        return {
            requestHeaders: n.requestHeaders
        }
    }

}, {
    urls: ["<all_urls>"]
}, ["blocking", "requestHeaders"]);


var FaceBook = function () {

    var self = this;

    function storeMedia(media, tabId) {

        media.forEach(function (item) {

            var filename = item.title? item.title + "_" : '';
            filename += item.filename + '.' + item.ext;

            checkFiltersAllow({
                size: item.size,
                formattedSize: '',
                type: item.ext,
                url: item.url,
                filename: filename,
                ext: item.ext
            }, tabId);

        });

    }

    function getAJAX(url, headers, callback) {

        var ajax = new XMLHttpRequest();
        ajax.open('GET', url, true);
        ajax.setRequestHeader('Cache-Control', 'no-cache');
        ajax.setRequestHeader('X-FVD-Extra', 'yes');

        if (headers) {
            for (var key in headers) {
                ajax.setRequestHeader(key, headers[key]);
            }
        }

        ajax.onload = function () {
            var content = this.responseText;
            callback(content);
        };

        ajax.onerror = function () {
            callback(null);
        };


        if (url.indexOf("/api/graphqlbatch") !== -1) {
            callback('');
        } else if (url.indexOf("/ajax/bz") !== -1) {
            callback('');
        } else if (url.indexOf("/ajax/haste-response/?modules") !== -1) {
            callback('');
        } else if (url.indexOf("edge-chat.facebook.com/") !== -1) {
            callback('');
        } else {
            ajax.send(null);
        }

    }

    // --------------------------------------------------------------------------------
    this.parse_VideoData = function (data, callback) {

        var mediaFound = false;
        var parsedMediaList = [];
        var title = data.tab.url;

        getAJAX(data.url, null, function (content) {
                var mm = content.match(/<title\sid="pageTitle">(.+?)<\/title>/im);
                if (mm) title = mm[1];

            var k = 0;
            var kk = 0;
            do {
                k = content.indexOf('videoData');
                kk++;

                if (k != -1) {
                    var m = content.match(/"?videoData"?:\[\{(.+?)\}\]/im);
                    if (m) {
                        var info = m[1];

                        var videoId = get_JSON_param('video_id', info);
                        var srcHD = get_JSON_param('hd_src', info);
                        var srcSD = get_JSON_param('sd_src', info);



                        k += info.length;
                        content = content.substring(k, content.length);
                        var videoTitle = get_JSON_param('ownerName', content);

                        if (srcHD) {
                            var mmm = add_video(srcHD, 'HD', videoId, videoTitle || title);
                            parsedMediaList.push(mmm);
                            mediaFound = true;
                        }
                        if (srcSD) {
                            var mmm = add_video(srcSD, 'SD', videoId, videoTitle || title);
                            parsedMediaList.push(mmm);
                            mediaFound = true;
                        }

                    }
                }

            } while (k != -1 && kk < 100);

            if (parsedMediaList.length > 0) {
                callback(parsedMediaList, data.tab.id);
            }

        });


    };

    // ------------------------------
    function get_JSON_param(name, val) {

        var x = '"?' + name + '"?\s*:([^\,]+)';
        var rxe = new RegExp(x, 'i');
        var m = rxe.exec(val);
        if (m) {
            if (m[1] == "null") return null;
            return m[1].substring(1, m[1].length - 1);
        }
        return null;
    }

    // ------------------------------
    function add_video(url, label, videoId, title) {

        url = url.replace(/\\/g, '');

        title = Utils.decode_unicode(title);

        var hash = videoId + '_' + label;
        var x = getFileName(url);
        var fileName = x.name;
        var extension = x.ext;

        var media = {
            hash: hash,
            url: url,
            title: title,
            downloadName: "[" + label + "] " + title,
            displayName: "[" + label + "] " + title,
            quality: label,
            filename: fileName,
            ext: extension,
            format: label,
            videoId: videoId,
            type: "video",
            size: null,
            groupId: 0,
            orderField: 0
        };
        // debug && console.log(media);
        return media;
    }

    // ------------------------------
    function getFileName(url) {

        if (!url) return null;

        var ext = null;
        var ff = url;
        var k = ff.indexOf('?');
        if (k != -1) {
            ff = ff.substring(0, k);
        }

        k = ff.indexOf('//');
        if (k != -1) {
            ff = ff.substring(k + 2, ff.length);
        }

        k = ff.indexOf('/');
        if (k != -1) {
            ff = ff.substring(k, ff.length);
        }

        k = ff.lastIndexOf('.');
        if (k != -1) {
            ext = ff.substring(k + 1, ff.length);
            ff = ff.substring(0, k);
            k = ff.lastIndexOf('/');
            if (k != -1) {
                ff = ff.substring(k + 1, ff.length);
                return {name: ff, ext: ext};
            }
        }

        return null;
    }



    chrome.webRequest.onResponseStarted.addListener(function (data) {

        if (!data || data.tabId < 0)
            return false;

        chrome.tabs.get(data.tabId, function (tab) {

            if (chrome.runtime.lastError) {
                console.log(chrome.runtime.lastError.message);
            }
            else if (!tab) {
                debug && console.log(data);
            }
            else {

                data.tab = tab;

                if (/^https?:\/\/www\.facebook\.com\/(.*)/i.test(data.tab.url.toLowerCase())
                    && data.url.indexOf('facebook') !== -1
                    && data.url.indexOf('facebook.com/webgraphql/query/') === -1
                ) {
                    self.parse_VideoData(data, function (mediaToSave, tabId) {
                        if (mediaToSave) {

                            debug && console.log("Facebook URL: " + data.tab.url);

                            if (!tabsInfo[tabId]) {
                                tabsInfo[tabId] = {
                                    videos: {}
                                };

                                tabsInfo[tabId].page = {
                                    url: tab.url,
                                    title: tab.title
                                };
                            }
                            storeMedia(mediaToSave, tabId);
                        }
                    });
                }

            }

        });

    }, {
        urls: ["<all_urls>"],
        types: ["main_frame", "sub_frame", "object", "xmlhttprequest"]
    }, ["responseHeaders"]);

};

(new FaceBook());
