// From https://en.wikipedia.org/wiki/Universally_unique_identifier#Version_4_.28random.29
// 50% collision rate when uuid count > 2.7e18 so this should be good (world population is ~7.4e9 in 2016)

var uuid4 =function() {

	var hexChars = '1234567890abcdef';
	var y = '89ab';
	var uuidLength = 36;
	var uuid = '';

    // Returns a random character from a string
	var randomChar = function ( fullString ) {
        var position = Math.floor(Math.random()*fullString.length)
		return fullString.charAt( position )
	}

    // Build the uuid according to the spec
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

// This function returns a string showing the screen size of the device, e.g. 1024x768

var getScreenSize = function () {
    return screen.width + 'x' + screen.height;
}

// From http://www.w3schools.com/js/js_cookies.asp

function setCookie(cname, cvalue, exhours) {
    var d = new Date();
    d.setTime(d.getTime() + (exhours*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

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

function setUUIDCookie() {
    var uuid = uuid4()
    setCookie('session_uuid',uuid, 1)
    return uuid;
}

var postFingerprint = function(cb) {

    var session_uuid = getCookie('session_uuid')
    if (session_uuid == '') {
        session_uuid == setUUIDCookie();
    }

	var xhr = new XMLHttpRequest();
	
	var fingerprint = JSON.stringify({
        uuid : session_uuid,
		user_agent : navigator.userAgent,
        screen_size : getScreenSize(),
        browser_url : window.location.href
		});
				

	xhr.open('POST', 'http://unplatform.herokuapp.com/api/fingerprints/', true);
	xhr.setRequestHeader("Content-Type","application/json");
	xhr.send(fingerprint);
};


window.onload=function(){postFingerprint();}