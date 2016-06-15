class Report {
	constructor() {
		this.session_id = this.getCookie('session_uuid');
	}


	submitData(url, data) {
		var xhr = new XMLHttpRequest();

		var data_string = {}
		data_string['session_id'] = this.getCookie('session_uuid');
		for (var key in data) {data_string[key] = data[key];};
		data_string = JSON.stringify(data_string);
		console.log(data_string)

		xhr.open('POST', url, false);
		xhr.setRequestHeader("Content-Type","application/json");
		xhr.send(data_string);
		console.log(xhr.response)
		return xhr.response
	}

	setCookie(cname, cvalue, exhours) {
		var d = new Date();
		d.setTime(d.getTime() + (exhours*60*60*1000));
		var expires = "expires="+d.toUTCString();
		document.cookie = cname + "=" + cvalue + "; " + expires;
	}

	getCookie(cname) {
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for(var i=0; i<ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1);
			if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
		}
		if (cname == 'session_uuid') {
			return this.setUUIDCookie();
		} else { return '';}
	}
	setUUIDCookie() {
		var uuid = this.uuid4();
		this.setCookie('session_uuid',uuid, 1)
		console.log("new id: " + uuid)
		return uuid;
	}
	uuid4() {

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
		for (var i=0; i < uuidLength; i++) {
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

}


var navReporter = new Report()

function callback(e) {
    var e = window.e || e;
	var currentURL = (function(){ return window.location.href; })();
	console.log(e.target.tagName)
    if (e.target.tagName.toLowerCase() == 'a') {
		data = {
			"app_name": "Unplatform",
			"event_type": "link_click",
			"params": {"from": window.location.href, "to": e.target.href}
		}
	} else if (e.target.tagName.toLowerCase() == 'html') {
		return;
	} else {
		//console.log(e)
		data = {
			"app_name": "Unplatform",
			"event_type": "link_click",
			"params": { "from": window.location.href, "to": e.target.parentElement.href }
		}
	}
	navReporter.submitData('/api/appdata/', data)
}


(function(){if (document.addEventListener) {
		document.addEventListener('click', callback, false);
	} else {
		document.attachEvent('onclick', callback);}
})();



function focusData(appdata) {
	var data = appdata;
	data["app_name"] = "Unplatform";
	navReporter.submitData('/api/appdata/', data)
}

(function(){ window.onfocus=function() {
	focusData( {"event_type": "focus",
			"params": "focused" })
	}
	window.onblur=function() {
	focusData( {"event_type": "focus",
			"params": "defocused" })
	}
})();

(function () {
    var time;
	var count = 0;
	var threshold = 60; // seconds you must be idle before reporting
	var data = {
		"app_name": "Unplatform",
		"event_type": "idle_time",
	}
    document.onmousemove = resetTimer;
    document.onkeypress = resetTimer;

    function idReset() {
        console.log('timed out');
		data["params"] = "timed_out";
		navReporter.submitData('/api/appdata/', data)
		navReporter.setUUIDCookie();
		window.location.href = '/'
    }

	function counter() {
		count++;
		console.log(count)
		if (count == 15) {
			if (!confirm("Do you want to continue working?")){
				idReset()
			}
		}
		else if (count == 60*30){
			idReset()
		}

	}

    function resetTimer() {
		if (count >= threshold) {
			data["params"] = {"seconds_idle": count };
			navReporter.submitData('/api/appdata/', data);
			console.log('reported');
		}
		count = 0;
        clearTimeout(time);
        time = setInterval(counter, 1000)
    }
})();