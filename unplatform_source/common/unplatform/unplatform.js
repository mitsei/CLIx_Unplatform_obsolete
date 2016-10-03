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
    //console.log(data_string)

    xhr.open('POST', url, false);
    xhr.setRequestHeader("Content-Type","application/json");
    xhr.send(data_string);
    //console.log(xhr.response)
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
    this.session_id = uuid;
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
  //console.log(e.target)
  if (e.target.tagName.toLowerCase() == 'html' || e.target.tagName.toLowerCase() == 'body' || e.target.tagName.toLowerCase() == 'main') {
    return;
  //} else if (e.target.tagName.toLowerCase() == 'a') {
  //	data = {
  //		"app_name": "unplatform",
  //		"event_type": "link_click",
  //		"params": {"from": window.location.href, "to": e.target.href}
  //	}
  } else {
    data = {
      "app_name": "unplatform",
      "event_type": "click",
      "params": { "url": window.location.href,
                  "tag": e.target.tagName,
                  'ID': e.target.id,
                  'classes': e.target.classList.value,
                  'text': e.target.innerText,
                  'src': e.target.src}
    };

    // if this is a left-nav item in the content player (class includes c-book-item), then
    // re-attach click event callback to the nearest iframe...
//    if (e.target.classList.value.indexOf('c-book-item') >= 0) {
//      // super-brittle -- assumes content player container is two parent levels up
//      var activityIframe = e.target.parentElement.parentElement.getElementsByTagName('iframe')[0];
//      activityIframe.contentDocument.addEventListener('click', callback, false);
//    }

    //console.log(data)

  }
  navReporter.submitData('/api/appdata/', data)
}

window.onload = function(){
  var iframelistener = document.getElementsByTagName('iframe')[0];
  if (document.addEventListener) {
    document.addEventListener('click', callback, false);
    if (iframelistener != null) {
      iframelistener.contentDocument.addEventListener('click', callback, false);
      // this will only work for the first activity page loaded -- need to re-attach the
      // iframe for each click on the left-nav of the content player?
//      var subIframe = iframelistener.contentDocument.getElementsByTagName('iframe')[0];
//      subIframe.contentDocument.addEventListener('click', callback, false);
    }
  } else {
    document.attachEvent('onclick', callback);
    if (iframelistener != null) {
      iframelistener.contentDocument.attachEvent('onclick', callback);
      // this will only work for the first activity page loaded -- need to re-attach the
      // iframe for each click on the left-nav of the content player?
//      var subIframe = iframelistener.contentDocument.getElementsByTagName('iframe')[0];
//      subIframe.contentDocument.attachEvent('onclick', callback);
    }
  }
};



function focusData(appdata) {
  var data = appdata;
  data["app_name"] = "unplatform";
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




// todo: rewrite this to not have global scope
var idleTime;
var idleCount = 0;
var idleThreshold = 60; // seconds you must be idle before reporting
var idleData = {
  "app_name": "unplatform",
  "event_type": "idle_time",
}
var idleTimer = function () {
  document.onmousemove = resetTimer;
    document.onkeypress = resetTimer;
}
function idReset() {
  console.log('timed out');
  idleData["params"] = "timed_out";
  navReporter.submitData('/api/appdata/', idleData)
  navReporter.setUUIDCookie();
  window.location.href = '/'
}

function counter() {
  idleCount++;
  if (idleCount == 60*15) {
    continue_prompt()
  }
  else if (idleCount == 60*30){
    idReset()
  }

}

function resetTimer() {
  if (idleCount >= idleThreshold) {
    idleData["params"] = {"seconds_idle": idleCount };
    navReporter.submitData('/api/appdata/', idleData);
    console.log('reported');
  }
  idleCount = 0;
  clearTimeout(idleTime);
  idleTime = setInterval(counter, 1000)
}

function continue_prompt() {
  var idleStyle = document.createElement('style')
  idleStyle.innerHTML = '.container-popup {position: relative;position: fixed;' +
    'top: 0;right: 0;bottom: 0;left: 0;background: rgba(0,0,0,.8); } .popup ' +
    '{ width: 50%; height: 50%; background: white; position: absolute; top: 0;' +
    ' right: 0; bottom: 0; left: 0; margin: auto; text-align:center; }';
  var body = document.getElementsByTagName('body')[0]
  body.appendChild(idleStyle)

  var popover = document.createElement('div class="container-popup"');
  popover.id='popover';
  popover.innerHTML = '<dialog class="zoomModal span_6_of_12">' +
   '<h2 class="zoom-label">Are you still working on the same session?</h2>' +
   '<form method="dialog">' +
   '<button value="close" onclick="resetTimer(); hidePopover();">Yes</button>' +
   '<button value="close" onclick="idReset()">No</button>' +
   '</form>' +
   '</dialog>';

  body.appendChild(popover);

}




function hidePopover() {
   document.getElementById("popover").style="display:none"
}
idleTimer();

var wentHome = function() {
    var home_report = new Report()
    current_url = window.location.href
    data = { "app_name": "unplatform",
        "event_type": "home_click",
        "params": {  url : current_url }
      }
    home_report.submitData('/api/appdata/', data) }
  var toggleFinished = function(state) {
    document.getElementsByClassName('container-popup')[0].style.display = state;
  }

var finished = function(answer) {
  var finished_report = new Report()
  current_url = window.location.href
  data = { "app_name": "unplatform",
      "event_type": "clicked_finished",
      "params": {  url : current_url, response : answer }
    }
  finished_report.submitData('/api/appdata/', data)
  if (answer == 'yes') {
    finished_report.setUUIDCookie()
    window.location.href = '/';
  }
}