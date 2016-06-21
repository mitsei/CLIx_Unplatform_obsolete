var postFingerprint = function(cb) {

	var xhr = new XMLHttpRequest();
	
	var fingerprint = JSON.stringify({ 
		user_agent : navigator.userAgent
		})
				
		
	xhr.open('POST', '/api/fingerprints/', true);
	xhr.setRequestHeader("Content-Type","application/json");
	xhr.send(fingerprint);
};