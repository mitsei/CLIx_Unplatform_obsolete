var postFingerprint = function(cb) {

	var xhr = new XMLHttpRequest();
	// var csrftoken = getCookie('csrftoken');
	var fingerprint = JSON.stringify({ 
		user_agent : navigator.userAgent,
		uuid : "1234567890a1234567890b" + Math.floor((Math.random() * 10000000000)),
		browser_url : window.location.href
		});
	// console.log(fingerprint)
				
		
	xhr.open('POST', 'http://unplatform.herokuapp.com/api/fingerprints/', true);
	xhr.setRequestHeader("Content-Type","application/json");
	// xhr.setRequestHeader("X-CSRFToken", csrftoken);
	xhr.send(fingerprint);
	
	// console.log(xhr.status);
	
};

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}


// var postData = function(cb) {

// 	var xhr = new XMLHttpRequest();