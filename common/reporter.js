// From https://en.wikipedia.org/wiki/Universally_unique_identifier#Version_4_.28random.29
// Collision rate

var uuid4 =function() {

	var hexChars = '1234567890abcdef';
	var y = '89ab';
	var uuidLength = 36;
	var uuid = '';

	var randomChar = function ( fullString ) {
        var position = Math.floor(Math.random()*fullString.length)
		return fullString.charAt( position )
	}

	for (i = 0; i < uuidLength; i++) {
		if (i == 8 || i == 13 || i == 18 || i == 23) {
			uuid += '-'
		}
		else if ( i == 14 ) {
				uuid += '4';
			}
		else if ( i == 18 ) {
				uuid += randomChar(y);
			}
		else {
			uuid += randomChar(hexChars);
		}
	}

    return uuid;
}

var getScreenSize = function () {
    return screen.width + 'x' + screen.height;
}

var postFingerprint = function(cb) {

	var xhr = new XMLHttpRequest();
	
	var fingerprint = JSON.stringify({ 
		user_agent : navigator.userAgent,
        uuid : uuid4(),
        screen_size : getScreenSize(),
        browser_url : window.location.href
		})
				
		
	xhr.open('POST', 'http://unplatform.herokuapp.com/api/fingerprints/', true);
	xhr.setRequestHeader("Content-Type","application/json");
	xhr.send(fingerprint);
};
window.onload=function(){postFingerprint();}