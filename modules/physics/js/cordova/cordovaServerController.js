goog.provide("bd.cordovaServer.ctr");

bd.cordovaServer.ctr.httpd = null;

bd.cordovaServer.ctr.startServer = function() {
  var httpd;
  if(!bd.cordovaServer.ctr.httpd) {
    httpd = ( cordova && cordova.plugins && cordova.plugins.CorHttpd ) ? cordova.plugins.CorHttpd : null;
    bd.cordovaServer.ctr.httpd = httpd;
    if(!httpd) {
      bd.cordova.ctr.bootstrap.deviceReadyCallbacks.push(function() { bd.cordovaServer.ctr.startServer() });
      alert("push to callbacks")
      return;
    }
  } else {
    httpd = bd.cordovaServer.ctr.httpd;
  }
  alert("in start server, httpd: " + httpd);
  var wwwroot = "";
  if ( httpd ) {
    httpd.getURL(function(url){
      if(url.length > 0) {
        //document.getElementById('url').innerHTML = "server is up: <a href='" + url + "' target='_blank'>" + url + "</a>";
        alert("server is up: " + url);
      } else {
        httpd.startServer({
          'www_root' : wwwroot,
          'port' : 8080
        }, function( response ){
          //alert(response);
          //return;
          var responseObject = JSON.parse(response);
          //alert(responseObject.type);
          if(responseObject.type == "url") {
            var url = responseObject.url
            //alert("server is started: " + url);
            var qrcodeUrl = document.getElementById('siteUrl').innerHTML;
            if(document.getElementById('qrcodeUrl') && document.getElementById('qrcodeUrl').innerHTML != "") {
              qrcodeUrl = document.getElementById('qrcodeUrl').innerHTML;
            }
            bd.util.ajaxPost(qrcodeUrl + "/rendezvous/addDevice/", "code=" + bd.player.bootstrap.sessionCode + "&url=" + url, function(response) {
              //nothing to do except confirm receipt
              //alert(response);
            });
          } else if(responseObject.type == "gameFile") {
            if(bd.player.bootstrap.loadedGameString == null) {
              bd.player.bootstrap.loadSinglePlayerGame(JSON.stringify({game:responseObject.gameFileString}));
            } else {
              bd.player.bootstrap.restartGame(JSON.stringify({game:responseObject.gameFileString}));
            }

          }

        }, function( error ){
          //document.getElementById('url').innerHTML = 'failed to start server: ' + error;
          alert('failed to start server: ' + error);
        });
      }

    },function(){});
  }
}

//{type: "url", url: "http://192.68.0.1:8080"}
//{type: "gameFile", gameFileString: {stringified game file}}
bd.cordovaServer.ctr.handleServerResponse = function(response) {
  //document.getElementById('url').innerHTML = "server is started: <a href='" + url + "' target='_blank'>" + url + "</a>";
  var responseObject = JSON.parse(response);
  if(responseObject.type == "url") {
    alert("server is started: " + responseObject.url);
    var qrcodeUrl = document.getElementById('siteUrl').innerHTML;
    if(document.getElementById('qrcodeUrl') && document.getElementById('qrcodeUrl').innerHTML != "") {
      qrcodeUrl = document.getElementById('qrcodeUrl').innerHTML;
    }
    bd.util.ajaxPost(qrcodeUrl + "/rendezvous/addDevice/", "code=" + bd.player.bootstrap.sessionCode + "&url=" + url, function(response) {
      //nothing to do except confirm receipt
      alert(response);
    });
  } else if(responseObject.type == "gameFile") {
    bd.player.bootstrap.loadSinglePlayerGame(responseObject.gameFileString);
  }
}

bd.cordovaServer.ctr.stopServer = function() {
  var httpd = bd.cordovaServer.ctr.httpd;
  if ( httpd ) {
    httpd.stopServer(function(){
      //document.getElementById('url').innerHTML = 'server is stopped.';
      //alert('server is stopped.');
    },function( error ){
      //document.getElementById('url').innerHTML = 'failed to stop server' + error;
      //alert('failed to stop server' + error);
    });
  } else {
    //alert('CorHttpd plugin not available/ready.');
  }
}
