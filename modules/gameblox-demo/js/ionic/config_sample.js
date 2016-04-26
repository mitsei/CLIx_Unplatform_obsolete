angular.module('gb_config',[])

.factory('gb_config', function() {
  var ipAddress = "https://gameblox.org";
  //var ipAddress = "http://18.111.13.214"

  var loginPath = "/accounts/openid/login/?process=&openid=" + encodeURIComponent("https://auth.mitstep.org/gb/")
  //var loginPath = "/game/mobileLogin/"

  var uploadUrl = "https://s3.amazonaws.com/jordan1/";
  //var uploadUrl = "";

  var thumbnailPath = "thumbnails/";
  //var thumbnailPath = "/static/images/thumbnails/";

  var peerHost = "mp.gameblox.org";
  //var peerHost = "192.168.2.30";
  //var peerHost = "18.111.13.214";

  
  var racerServer = "https://mp.gameblox.org:3001";
  //var racerServer = "http://192.168.2.30:3001";
  //var racerServer = "http://18.111.13.214:3001";


  return {
    ipAddress: ipAddress,
    loginPath: loginPath,
    uploadUrl: uploadUrl,
    thumbnailPath: thumbnailPath,
    peerHost: peerHost,
    racerServer: racerServer
  };
})
