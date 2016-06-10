var postFingerprint = function(cb) {

	var xhr = new XMLHttpRequest();
	
	var fingerprint = JSON.stringify({ 
		user_agent : navigator.userAgent
		})
				
		
	xhr.open('POST', 'http://unplatform.herokuapp.com/api/fingerprints/', true);
	xhr.setRequestHeader("Content-Type","application/json");
	xhr.send(fingerprint);
};
window.onload=function(){postFingerprint();}