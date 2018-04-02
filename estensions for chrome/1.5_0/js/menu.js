var tabId, page=false, videos, renderInterval;

var renderPage = function () {

    if (!page) {
        clearInterval(renderInterval);
        document.body.style.height = 'auto';
        document.body.style.width = '440px';
        document.getElementById('rate_div').style.display = 'block';
        document.getElementById('wrap').style.display = 'none';
        setTimeout(function(){ location.reload(false) }, 9000);
        return;
    }

    for (var i in videos) {
        $('table').show();
        $('#not_found').hide();
        document.body.style.width = '480px';
        document.body.style.height = '600px';
        var video = videos[i];

        var tr = $("#tr" + video.video_id);
        if (!tr.length) {
            tr = document.createElement('tr');
            tr.setAttribute('id', 'tr' + video.video_id);
            tr = $(tr);
            var tdSize = document.createElement('td'),
                tdDownload = document.createElement('td'),
                tdType = document.createElement('td'),
                tdName = document.createElement('td'),
                h2Type = document.createElement('h2'),
                textField = document.createElement('input');
            $(tdSize).addClass('td_sz').html(video.formattedSize.replace(' ', '&nbsp;')).appendTo(tr);
            $(tdDownload).html('<div class="button" title="'
                + chrome.i18n.getMessage('download') + '"></div>').appendTo(tr);
            if (video.ext == 'm3u8') {
                $(h2Type).addClass('tooltip').attr('data-tooltip-content', '#tooltip_content');
                $(tdSize).append('<i class="ti-help-alt tooltip" data-tooltip-content="#tooltip_content"></i>');
            }
            $(h2Type).text(video.ext.toUpperCase()).appendTo(tdType);
            $(tdType).appendTo(tr);
            $(tdName).addClass('text-left');

            if (video.ext == 'm3u8') {
                textField = document.createElement('input');
                textField.type = 'text';
                textField = $(textField);
                textField.val(video.url);
                textField.attr('readonly', 'readonly').attr('title', 'Playlist URL').attr('data-tooltip-content', '#tooltip_copy');
                textField.click(function () {
                    this.select();
                    document.execCommand("Copy");
                });
                textField.tooltipster({
                    trigger: 'click',
                    interactive: false,
                    timer: 1000,
                    theme: 'tooltipster-shadow'
                });
                $(tdName).append(textField);
            }
            else {
                $(tdName).text(video.filename.length > 43 ? video.filename.substr(0, 40) + '...' : video.filename);
            }
            $(tdName).appendTo(tr);
            $('tbody:first').prepend(tr);
            $(tr.find('.button')).click(function () {
                var videoId = $(this).parent().parent().attr('id').split('tr')[1];
                console.log("Clicked on #" + videoId);
                chrome.runtime.sendMessage({
                    msg: 'startDownloading',
                    tabId: tabId,
                    videoId: videoId
                }, function (response) {
                    if (response.started) {
                        $("#tr" + videoId).find('.button').addClass('success');
                    } else {
                        alert(chrome.i18n.getMessage('cant'))
                    }
                });
            });
            tr.find('.tooltip').tooltipster({
                interactive: true,
                theme: 'tooltipster-shadow'
            });
        }
    }
};


var render = function () {
    chrome.tabs.query({active: true, currentWindow: true}, function (result) {
        if (!result.length)
            return renderPage();

        tabId = result[0].id;

        if (result[0].url.indexOf("chrome://") === 0) {
            page = false;
            return renderPage();
        }

        chrome.runtime.getBackgroundPage(function(w){
            var response = w.tabsInfo[tabId];

            if (typeof response === 'undefined')
                return renderPage();

            if (response.youtube) {
                clearInterval(renderInterval);
                document.getElementById('youtube').style.display = 'block';
                document.getElementById('wrap').style.display = 'none';
                document.body.style.background = '#ffffff';
                return;
            }
            page = response.page;
            videos = [];
            if (response.videos) {
                for (var uid in response.videos)
                    videos.push(response.videos[uid]);
                videos.sort(function (a, b) {
                    // sort by timestamp when video was found
                    return b.timestamp < a.timestamp
                });

                // limit count of videos by 20
                if (videos.length > 20) {
                    var tmp_videos = [];
                    for (var i = 0; i < 20; i++)
                        tmp_videos.push(videos[i]);
                    videos = tmp_videos;
                }
            }

            renderPage();
        })
    })
};

document.getElementById('not_connected').innerText = chrome.i18n.getMessage('not_connected');
document.getElementById('not_found').innerText = chrome.i18n.getMessage('not_found');
document.getElementById('youtube_text').innerText = chrome.i18n.getMessage('youtube_blocked');
document.getElementById('th_format').innerText = chrome.i18n.getMessage('th_format');
document.getElementById('th_size').innerText = chrome.i18n.getMessage('th_size');
document.getElementById('th_name').innerHTML = '<i class="ti-angle-down"></i> ' + chrome.i18n.getMessage('th_name');
$(".main-bottom").text(chrome.i18n.getMessage('not_founded'));
document.getElementById('video_files').innerText = chrome.i18n.getMessage('files');
document.getElementById('tooltip_copy').innerText = chrome.i18n.getMessage('tooltip_copy');
$(".ti-trash").attr('title', chrome.i18n.getMessage('th_del')).click(function (e) {
    e.preventDefault();
    chrome.runtime.sendMessage({msg: 'del', tabId: tabId}, function () {
        location.reload(true)
    });
    return false;
});

$(document).ready(function() {
    renderInterval = setInterval(render, 2500);
    render();
});

$("#stream_help").text(chrome.i18n.getMessage('need_help')).click(function () {
    chrome.tabs.create({url: 'https://video-downloader.pw/?source=help#stream_help'});
});

