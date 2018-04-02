(function(){
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.action == "Download") 
	{		
		chrome.downloads.download({url: request.url, filename: request.name});
	}
});
if(!localStorage['OkPozdCop']) { localStorage['OkPozdCop'] = true;}

if(!localStorage['OkOption']) { localStorage['OkOption'] = '';}
if(!localStorage['OkOptionStyle']) { localStorage['OkOptionStyle'] = '';}

if(!localStorage['OkThemeId']) { localStorage['OkThemeId'] = '0';}
if(!localStorage['OkThemeOkId']) { localStorage['OkThemeOkId'] = '0';}
if(!localStorage['OkThemeType']) { localStorage['OkThemeType'] = '0';}
if(!localStorage['OkThemeStyle']) { localStorage['OkThemeStyle'] = '';}
if(!localStorage['OkGuestTheme']) { localStorage['OkGuestTheme'] = true;}

if(!localStorage['OkUserLoad']) { localStorage['OkUserLoad'] = '';}
if(!localStorage['OkUserTime']) { localStorage['OkUserTime'] = '';}
if(!localStorage['OkUserRot']) { localStorage['OkUserRot'] = '1'}
if(!localStorage['OkUserAva']) { localStorage['OkUserAva'] = ''}

if(!localStorage['OkPhoto']) { localStorage['OkPhoto'] = true;}
if(!localStorage['OkPhotoRating']) { localStorage['OkPhotoRating'] = '0';}

if(!localStorage['OkAddBlock']) { localStorage['OkAddBlock'] = true;}

if(!localStorage['OkFiles']) { localStorage['OkFiles'] = '0';}

if(!localStorage['OkVersionFirst']) { localStorage['OkVersionFirst'] = '0'}
if(!localStorage['OkNewsId']) { localStorage['OkNewsId'] = '0'}
if(!localStorage['OkNewsLoad']) { localStorage['OkNewsLoad'] = '"0":"false"'}

if(!localStorage['OkGiftUid']) { localStorage['OkGiftUid'] = '0'}
if(!localStorage['OkGiftId']) { localStorage['OkGiftId'] = '0'}
if(!localStorage['OkGiftMusic']) { localStorage['OkGiftMusic'] = '0'}

if(!localStorage['OkOtziv']) { localStorage['OkOtziv'] = true}
if(!localStorage['OkGrid']) { localStorage['OkGrid'] = false}
if(!localStorage['OkSticker']) { localStorage['OkSticker'] = '';}
if(!localStorage['OkStickerIzbr']) { localStorage['OkStickerIzbr'] = '{"sticker":[]}';}
if(!localStorage['lang'])
{  
	var lang = chrome.i18n.getMessage("@@ui_locale");
	if (lang == 'ru')
	{
		localStorage['lang'] = "ru";
	}
	else if (lang == 'en')
	{
		localStorage['lang'] = "en";
	}
	else
	{
		localStorage['lang'] = "ru";
	}
}

function ajax_request(request, request_end, user, result)
{
	var req = new XMLHttpRequest();	
	req.open("POST", "http://api.oktools.ru/", true);
	req.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	if (user)
	{
		req.send(""+request+"&uid="+user[0].uid+"&uhash="+user[0].hash+"&browser="+user[0].browser+"&version="+user[0].version+"&lang="+lang+"&nc="+Math.random()+""+request_end+"");
	}
	else
	{
		req.send(""+request+"&nc="+Math.random()+""+request_end+"");
	}
	req.onreadystatechange = function() {
		if (req.readyState == 4 && req.status == 200)
		{			
			var data=JSON.parse(''+req.response+'');	
			var res ={'result':true, 'data':data};  
			result(res); 
		}
	};
}
function get_jsses(token, gwt, result)
{
	var req = new XMLHttpRequest();	
	req.open("POST", "https://ok.ru/web-api/music/conf", true);
	req.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	req.setRequestHeader("TKN", token);	
	req.send('gwt.requested='+gwt+'');
	req.onreadystatechange = function() {			
		if (req.readyState == 4 && req.status == 200)
		{
			var data=JSON.parse(''+req.response+'');
			var res ={'result':true, 'data':data};			
			result(res);
		}
	};
}
function save_audio(info, jsessionid, user)
{
	artist=text_replace_url(info.artist);
	song=text_replace_url(info.song);
	url=text_replace_url(info.url);
	var req = new XMLHttpRequest();	
	req.open("POST", "http://oktools.ru/page/ajax.php", true);
	req.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	req.send("uid="+user[0].uid+"&jsessionid="+jsessionid+"&id="+info.id+"&artist="+artist+"&song="+song+"&time="+info.time+"&url="+url+"&size="+info.size+"&browser="+user[0].browser+"&version="+user[0].version+"&lang="+lang+"&nc="+Math.random()+"");
}
function get_size(id, mod, start, count, jsessionid, result)
{
	var url="";
	if (mod=='file')
	{
		var url="https://wmf.ok.ru/play;jsessionid="+jsessionid+"?tid="+id+"&"
	}
	else if (mod=='playlist')
	{
		var url="https://wmf.ok.ru/my;jsessionid="+jsessionid+"?pid="+id+"&start="+start+"&count="+count+"";
	}	
	else if (mod=='collection')
	{
		var url="https://wmf.ok.ru/collection;jsessionid="+jsessionid+"?collectionId="+id+"&start="+start+"&count="+count+"";
	}
	else if (mod=='profile')
	{
		var url="https://wmf.ok.ru/custom;jsessionid="+jsessionid+"?pid=my";
	}
	else if (mod=='artist')
	{
		var url="https://wmf.ok.ru/artist;jsessionid="+jsessionid+"?artistId="+id+"&start="+start+"&count="+count+"";
	}
	else if (mod=='artistradio')
	{
		var url="https://wmf.ok.ru/similarTracksForArtist;jsessionid="+jsessionid+"?artistId="+id+"&start="+start+"&count="+count+"";
	}
	if (url!="")
	{
		var req = new XMLHttpRequest();	
		req.open("GET", url, true);
		req.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		req.send(null);
		req.onreadystatechange = function() {	
			if (req.readyState == 4 && req.status == 200)
			{
				var data=JSON.parse(''+req.response+'');				
				result(data); 
			}
		};
	}
}
function get_photo(url, result)
{
	var req = new XMLHttpRequest();	
	req.open('HEAD', url, true);
	req.send(null);
	req.onreadystatechange = function() {	
		if (req.readyState == 4 && req.status == 200)
		{
			var size=req.getResponseHeader('Content-Length');
			if (size!='7567')
			{
				var res={'result':true, 'url':''+url+'', 'size':''+size+''};
				result(res);
			}
			else
			{
				var res={'result':false, 'url':''+url+'', 'size':'0'};
				result(res);
			}				
		}
	};
}
function get_gift_anim(url, result)
{
	var req = new XMLHttpRequest();	
	req.open("HEAD", url, true);
	req.send(null);
	req.onreadystatechange = function() {	
		if (req.readyState == 4 && req.status == 200)
		{		
			var size=req.getResponseHeader('Content-Length');
			if (size>10000)
			{			
				result(true);
			}
			else
			{
				result(false);
			}
		}
	};
}
function user_load(user, result)
{
	var userLoad=true;
	var time_now=new Date().getTime();
	var OkUserLoad=localStorage['OkUserLoad'];
	var OkUserTime=parseInt(localStorage['OkUserTime']);
	
	var version_first=false;
	var OkVersionFirst=localStorage['OkVersionFirst'];
	
	if(OkVersionFirst!=user[0].version)
	{
		version_first=true;
	}
	if (OkUserLoad!='')
	{		
		if (OkUserTime>time_now)
		{							
			var data=JSON.parse(OkUserLoad);
			data.theme_reload = false;	
			data.version_first = version_first;
			if (data.user[0].uid!=user[0].uid)
			{				
				var userLoad=true;
				localStorage['OkThemeId'] = '0';
				localStorage['OkThemeOkId']='0';
				localStorage['OkThemeType']='0';
				localStorage['OkThemeStyle'] = '';
				localStorage['OkUserAva']='';
			}
			else
			{
				var userLoad=false;				
				result(data);
			}
			if (user[0].version<data.plugin[0].version)
			{
				var userLoad=true;
			}						
		}
	}
	if (userLoad)
	{
		var tid=localStorage['OkThemeId'];
		var okg=localStorage['OkGrid'];
		var req = new XMLHttpRequest();	
		req.open("POST", "http://api.oktools.ru/", true);
		req.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		firstname=text_replace_url(user[0].firstname);
		lastname=text_replace_url(user[0].lastname);
		req.send("mod=user&podmod=user_load&uid="+user[0].uid+"&firstname="+firstname+"&lastname="+lastname+"&uhash="+user[0].hash+"&browser="+user[0].browser+"&version="+user[0].version+"&grid="+okg+"&lang="+lang+"&nc="+Math.random()+"");
		req.onreadystatechange = function() {	
			if (req.readyState == 4 && req.status == 200)
			{
				var data=JSON.parse(''+req.response+'');			
				localStorage['OkUserLoad']=JSON.stringify(data);
				var time_end=new Date().getTime() + parseInt(data.user[0].reload);
				localStorage['OkUserTime']=time_end;
				if (tid!=data.user[0].tid)
				{
					data.theme_reload = true;					
				}
				else
				{
					data.theme_reload = false;	
				}
				data.version_first = version_first;
				result(data);			
			}
		};
	}
}
function get_theme(id, user, guid, ok_id, result)
{
	if (id!=1000)
	{
		var req = new XMLHttpRequest();	
		req.open("POST", "http://api.oktools.ru/", true);
		req.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		req.send("mod=theme&podmod=gettheme&id="+id+"&uid="+user[0].uid+"&guid="+guid+"&ok_id="+ok_id+"&uhash="+user[0].hash+"&browser="+user[0].browser+"&version="+user[0].version+"&lang="+lang+"&nc="+Math.random()+"");
		req.onreadystatechange = function() {	
			if (req.readyState == 4 && req.status == 200)
			{
				var data=JSON.parse(''+req.response+'');		
				if(guid==0)
				{		
					localStorage['OkThemeStyle'] = data.style;						
					localStorage['OkThemeId'] = data.id;
					localStorage['OkThemeOkId'] = data.ok_id;
					localStorage['OkThemeType'] = data.type;
				}
				var res ={'result':true, 'data':data};                
				result(res);				
			}
		};
	}
	else
	{
		var type=1;
		if (ok_id!=0)
		{
			type=2;
		}
		localStorage['OkThemeId'] = id;
		localStorage['OkThemeOkId'] = ok_id;
		localStorage['OkThemeType'] = type;
		var style=localStorage['OkThemeStyle'];
		var res ={'result':true, 'data':{"result":true,"id":"1000","type":""+type+"","ok_id":""+ok_id+"","style":""+style+"","error":""}}; 
		result(res);
	}
	
}
function text_replace_url(text)
{
	text=text.replace(/\&amp;/ig, '%26');
	text=text.replace(/\&/ig, '%26');
	text=text.replace(/\?/ig, '%3F');
	return text;
}
function load_option(param, result)
{
	if (localStorage[param]==null)
	{
		result(false);
	}
	else if (localStorage[param]!="false")
	{
		if (localStorage[param]=="true")	
		{
			result(true);
		}
		else
		{
			result(localStorage[param]);
		}
	}
	else
	{
		result(false);
	}
}
function save_option(param, text, result)
{
	localStorage[param]=text;
	result(true);
}
function reload_config(param, text, result)
{
	localStorage['OkPozdCop'] = true;		
	localStorage['OkOption'] = '';
	localStorage['OkOptionStyle'] = '';			
	localStorage['OkThemeId'] = '0';
	localStorage['OkThemeOkId']='0';
	localStorage['OkThemeType']='0';
	localStorage['OkThemeStyle'] = '';
	localStorage['OkGuestTheme'] = true;		
	localStorage['OkUserLoad'] = '';
	localStorage['OkUserTime']='';
	localStorage['OkUserRot'] = '1';
	localStorage['OkPhoto'] = true;
	localStorage['OkPhotoRating'] = '0';
	localStorage['OkAddBlock'] = true;
	localStorage['OkVersionFirst'] = '0';
	localStorage['OkNewsId'] = '0';
	localStorage['OkNewsLoad'] = '"0":"false"';
	localStorage['OkFiles'] = '0';
	localStorage['OkGiftUid'] = '0';
	localStorage['OkGiftId'] = '0';
	localStorage['OkGiftMusic'] = '0';
	localStorage['OkOtziv'] = true;
	result(true);
}
function load_theme(result)
{	
	var tid=localStorage['OkThemeId'];
	var style=localStorage['OkThemeStyle'];		
	if((tid!=0) || (style!=""))
	{				
		var type=localStorage['OkThemeType'];
		var ok_id=localStorage['OkThemeOkId'];
		var res ={'result':true, 'id':''+tid+'', 'type':''+type+'', 'ok_id':''+ok_id+'', 'style':''+style+''};                
		result(res);
	}
	else	
	{		
		result(false);
	}
}
function ajaxPost(uid, url, data, token, result)
{	
	var req = new XMLHttpRequest();	
	req.open("POST", url, true);
	if(uid!='2')
	{
		req.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		req.setRequestHeader("TKN", token);
		req.send(data);
	}
	else
	{
		var form = new FormData();
		form.append('0', data, 'icons.png');
		form.append('_0', 'icons.png');
		req.send(form);			
	}	
	req.onreadystatechange = function() {
		if (req.readyState == 4 && req.status == 200)
		{			
			if ((/"time":"([\d]+)"/gi.test(req.response)) && (/"html":"/gi.test(req.response)))
			{
				var res ={'result':true, 'uid':uid}; 
			}
			else if ((/"js.apr":"/gi.test(req.response)) && (/"respSND":"/gi.test(req.response)))
			{
				var res ={'result':true, 'uid':uid}; 
			}			
			else if ((/"error":"/gi.test(req.response)) || (/"errorCode":"/gi.test(req.response)))
			{
				var error='';
				var err=req.response.match(/"error":"([^\\\"]+)/i);
				if (err && err.length > 1)
				{		
					if (err[1].length<150)
					{
						error=err[1];
					}
				}
				var res ={'result':false, 'uid':uid, 'error':error}; 
			}
			else
			{
				var res =req.response; 
			}	
			result(res);
		}
	};
}
function load_img(url, data, img_url, token, file, id, result)
{	
	var photo_id=id;
	var req = new XMLHttpRequest();	
	req.open("POST", url, true);
	if (file)
	{
		var form = new FormData();
		form.append('0', data, 'icons.png');
		form.append('_0', 'icons.png');
		req.send(form);
	}	
	else
	{
		req.setRequestHeader("TKN", token);
		req.send(data);
	}
	req.onreadystatechange = function() {
		if (req.readyState == 4 && req.status == 200)
		{	
			if (file)
			{
				if (/^\[(.*)\]$/gi.test(req.response))
				{
					response=req.response.replace(/\[/, '');
					response=response.replace(/\]/, '');				
					var data=JSON.parse(''+response+'');
					if ((data.id) && (data.token))
					{
						var res={"id":photo_id, "token":data.token};
						result(res);
					}
					else
					{
						result(false);
					}
						
				}
				else
				{
					result(false);
				}
			}
			else
			{
				var data=JSON.parse(''+req.response+'');
				var id=data.tokens[0].id;
				var url=data.tokens[0].url;
				get_data_img(img_url, function(blob) {
					load_img("https:"+url, blob, '', token, true, id, function(data){						
						result(data);
					});
				});
			}
				
			//result(data_img);
		}
	};
}
function get_data_img(url, callback)
{	
	var req = new XMLHttpRequest();	
	req.open('GET', url, true);	
	req.responseType = "blob";
	req.send(null);
	req.onreadystatechange = function() {	
		if (req.readyState == 4 && req.status == 200)
		{
			callback(req.response);				
		}
	};
}
chrome.extension.onRequest.addListener(function (request, sender, callback) {
	var action = request.action;
	if (action == 'load_theme') 
	{
		load_theme(callback);
	}
	else if (action == 'config') 
	{
		chrome.tabs.getSelected(null, function(tab) {
			var ind=tab.index+1;
			var tid=tab.id;
			var option_url=chrome.extension.getURL("options.html");
			chrome.tabs.create({index:ind, url: option_url,  active: true}, function(){
				chrome.tabs.getSelected(null, function(tab) {
					var ctid=tab.id;
					chrome.tabs.onRemoved.addListener(function(tabId, removeInfo){ if (tabId==ctid){chrome.tabs.update(tid, {active: true});}});
			
				});
			});			
		});		
	}
	else if (action == 'get_theme') 
	{
		get_theme(request.id, request.user, request.guid, request.ok_id, callback);
	}	
	else if (action == 'load_option') 
	{
		load_option(request.param, callback);
	} 
	else if (action == 'save_option') 
	{
		save_option(request.param, request.text, callback);
	}
	else if (action == 'reload_config') 
	{
		reload_config(request.param, request.text, callback);
	}
	else if (action == 'content_load') 
	{
		var firstname=text_replace_url(request.user[0].firstname);
		var lastname=text_replace_url(request.user[0].lastname);
		var search=text_replace_url(request.search);
		ajax_request("mod="+request.mod+"&podmod=load&cat_id="+request.cat_id+"&cat_f="+request.cat_f+"&reg_post="+request.reg_post+"&page="+request.page+"","&firstname="+firstname+"&lastname="+lastname+"&search="+search+"", request.user, callback);
	} 		
	else if (action == 'content_rating') 
	{
		ajax_request("mod="+request.mod+"&podmod=rating&id="+request.mat_id+"&rating="+request.rating+"", "", request.user, callback);
	} 
	else if (action == 'user_load') 
	{
		user_load(request.user, callback);
	}	
	else if (action == 'status_add') 
	{
		var status_text=text_replace_url(request.status_text);	
		ajax_request("mod=status&podmod=add&cat_id="+request.status_cat+"", "&text="+status_text+"", request.user, callback);
	}	
	else if (action == 'pozd_add') 
	{
		var pozd_text=text_replace_url(request.pozd_text);
		ajax_request("mod=pozd&podmod=add&cat_id="+request.pozd_cat+"", "&text="+pozd_text+"", request.user, callback);
	}
	else if (action == 'get_size') 
	{
		get_size(request.id, request.mod, request.start, request.count, request.jsessionid, callback);
	}	
	else if (action == 'save_audio') 
	{
		save_audio(request.info, request.jsessionid, request.user);
	}	
	else if (action == 'get_photo') 
	{
		get_photo(request.url, callback);
	}	
	else if (action == 'cat_add') 
	{
		var cat_name=text_replace_url(request.cat_name);	
		ajax_request("mod="+request.mod+"&podmod=cat_add", "&cat_name="+cat_name+"", request.user, callback);
	}
	else if (action == 'cat_delete') 
	{
		ajax_request("mod="+request.mod+"&podmod=cat_delete&cat_id="+request.cat_id+"", "", request.user, callback);
	}
	else if (action == 'izbr_add') 
	{
		ajax_request("mod="+request.mod+"&podmod=izbr_add&mat_id="+request.mat_id+"&cat_id="+request.cat_id+"", "", request.user, callback);
	}
	else if (action == 'izbr_del') 
	{
		ajax_request("mod="+request.mod+"&podmod=izbr_del&mat_id="+request.mat_id+"", "", request.user, callback);
	}
	else if (action == 'get_jsses') 
	{
		get_jsses(request.token, request.gwt, callback);
	}
	else if (action == 'get_friends') 
	{
		ajax_request("mod=user&podmod=get_friends&list="+request.list+"", "", request.user, callback);
	}
	else if (action == 'gift_send') 
	{
		var OkUserLoad=localStorage['OkUserLoad'];
		var data=JSON.parse(OkUserLoad);			
		var uid_send=data.user[0].uid;
		var message=text_replace_url(request.message);
		ajax_request("mod=gift&podmod=send&uid_send="+uid_send+"&gift_uid="+request.gift_uid+"&gift_id="+request.gift_id+"&anim="+request.anim+"&gift_music="+request.gift_music+"&gift_priv="+request.gift_priv+"&gift_tain="+request.gift_tain+"&gift_type="+request.gift_type+"", "&message="+message+"", '', callback);
	}
	else if (action == 'gift_load') 
	{
		ajax_request("mod=gift&podmod=load&guid="+request.guid+"&last="+request.last+"", "", request.user, callback);
	}
	else if (action == 'gift_delete') 
	{
		ajax_request("mod=gift&podmod=delete&id="+request.id+"", "", request.user, callback);
	}
	else if (action == 'get_gift_anim') 
	{
		get_gift_anim(request.url, callback);
	}
	else if (action == 'report_error') 
	{
		ajax_request("mod=report&href="+request.href+"&type="+request.type+"&error="+request.error+"", "", request.user, callback);
	}	
	else if (action == 'ajaxPost') 
	{
		ajaxPost(request.uid, request.url, request.data, request.token, callback);
	}
	else if (action == 'load_img') 
	{
		load_img(request.url, request.data, request.img_url, request.token, request.file, '', callback);
	}
	else if (action == 'get_data_img') 
	{
		get_data_img(request.url,  callback);
	}	
});
})();