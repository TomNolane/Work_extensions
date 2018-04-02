function load_config()
{
	document.getElementsByTagName('title')[0].innerText=language_text('OkTools_title');
	var c = document.querySelectorAll('input[type="checkbox"]');
	for(var i = 0; i < c.length; i++)
	{
		if ( localStorage[c[i].id]==null ||  localStorage[c[i].id]=="true")
		{
			 c[i].setAttribute('checked', 'checked');	
		}
		c[i].addEventListener('change', onCbChange, false);
	}
	function onCbChange(event)
	{
		var e = event.target;        
		localStorage[e.id] = e.checked;
	}
	var l = document.querySelectorAll('span');
	for(var lk = 0; lk < l.length; lk++)
	{
		l[lk].innerHTML=language_text(l[lk].id);
	}
	function language_text(mess)
	{
		return chrome.i18n.getMessage(mess);
	}
}
window.addEventListener("load", function(){
	load_config();
	document.getElementById('OkButtonUserLoad').addEventListener('click', function(e) { 
		localStorage['OkPozdCop'] = true;		
		localStorage['OkOption'] = '';
		localStorage['OkOptionStyle'] = '';			
		localStorage['OkThemeLoad'] = false;
		localStorage['OkThemeId'] = '0';
		localStorage['OkThemeStyle'] = '';
		localStorage['OkGuestTheme'] = true;		
		localStorage['OkUserLoad'] = '';
		localStorage['OkUserTime']='';
		localStorage['OkUserRot'] = '1';
		localStorage['OkUserAva'] = '';
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
		window.location.reload();		
	}, false);
}, false);	