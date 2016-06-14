class Report {
			constructor() {
				this.session_id = this.getCookie('session_uuid');
			}


			submitData(url, data) {
				var xhr = new XMLHttpRequest();

				var data_string = {}
				data_string['session_id'] = this.session_id;
				for (var key in data) {data_string[key] = data[key];};
				data_string = JSON.stringify(data_string);
				console.log(data_string)

				xhr.open('POST', url, true);
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


function callback(e) {
    var e = window.e || e;

    if (e.target.tagName !== 'A')
		console.log('a?')
        return;

    // Do something
	console.log('something')
}

if (document.addEventListener)
    document.addEventListener('click', callback, false);
else
    document.attachEvent('onclick', callback);