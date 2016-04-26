controllers = angular.module('controllers', ['services']);
controllers.controller("AppCtrl", ['$scope', '$ionicModal', '$window', 'gameList', 'userInfo', 'gb_config', AppCtrl]);
controllers.controller("PlayPageCtrl", ['$scope', '$window', '$rootScope', '$ionicPlatform', '$stateParams', 'gameList', 'gameLoader', 'gb_config', PlayPageCtrl]);
controllers.controller("GameDetailsCtrl", ['$scope', '$stateParams', '$timeout', 'gameLoader', '$rootScope', '$ionicPlatform', '$state', GameDetailsCtrl]);
controllers.controller('BrowsePageCtrl', ['$scope', 'gameList', 'gameLoader', BrowsePageCtrl]);

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});


////////////////////////////////////////////////////////////////////////////////////
/////////////////////////             APPCTRL            ///////////////////////////
////////////////////////////////////////////////////////////////////////////////////

function AppCtrl($scope, $ionicModal, $window, gameList, userInfo, gb_config) {
  $scope.$on('$ionicView.loaded', function() {
    ionic.Platform.ready( function() {
      if(navigator && navigator.splashscreen) navigator.splashscreen.hide();
    });
  });
  document.getElementById("siteUrl").innerHTML = gb_config.ipAddress;
  document.getElementById("uploadUrl").innerHTML = gb_config.uploadUrl;
    // Create the login modal that we will use later
  $scope.userInfo = userInfo;
  $scope.makeLoginModal = function() {
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
      }).then(function(modal) {
        $scope.loginModal = modal;
    });
  };
  $scope.$on('modal.shown', function() {
    // Execute action
    var modalElement;
    if($scope.loginModal) {
      modalElement = $scope.loginModal.modalEl;
      var loginDisplay = modalElement.getElementsByClassName("loginDisplay")[0];
      loginDisplay.src = gb_config.ipAddress + gb_config.loginPath;
    }
    if($scope.logoutModal) {
      modalElement = $scope.logoutModal.modalEl;
      var logoutDisplay = modalElement.getElementsByClassName("logoutDisplay")[0];
      logoutDisplay.src = gb_config.ipAddress + "/accounts/logout/";
    }
    
  });

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
      $scope.loginModal.remove();
      $scope.makeLoginModal();
      // When the user logs in on the My Games tab of Browse, need to pre-fetch the games so page is loaded when modal closes. Should come up with a cleaner way of doing this, but meh for now.
      gameList.getGames("/game/getUserGameInfo/", userInfo.userId);
      $scope.makeLogoutModal();
    };

    // Open the login modal
    $scope.login = function() {
      $scope.loginModal.show();
    };
  $scope.makeLogoutModal = function() {
    $ionicModal.fromTemplateUrl('templates/logout.html', {
        scope: $scope
      }).then(function(modal) {
        $scope.logoutModal = modal;
    });
  };
  $scope.closeLogout = function() {
    $scope.logoutModal.remove();
    $scope.makeLogoutModal();
  };

  $scope.logout = function() {
    $scope.logoutModal.show();
    userInfo.userId = undefined;
    userInfo.username = undefined;
  };

  // Create IE + others compatible event handler
  var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
  var eventer = window[eventMethod];
  var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

  // Listen to message from child window
  eventer(messageEvent,function(e) {
    var messageInfo = JSON.parse(e.data);
    if(messageInfo.type == "login" && messageInfo.isLoggedIn) {
      userInfo.userId = messageInfo.userId;
      userInfo.username = messageInfo.username;
      $scope.closeLogin();

    } else if(messageInfo.type == "login" && messageInfo.isLoggedIn == false) {
      $scope.closeLogout();
      $window.alert("You have now been logged out.");
    }
  },false);

  $scope.makeLoginModal();
  $scope.makeLogoutModal();


};

function PlayPageCtrl($scope, $window, $rootScope, $ionicPlatform, $stateParams, gameList, gameLoader, gb_config) {

  $scope.beforeGameReload = function() {
    bd.player.bootstrap.stopScripts();
  }
  var gameId = $stateParams.gameId;
  $scope.gameTitle = "";
  document.getElementById("gameId").innerHTML = gameId;
  document.getElementById("siteUrl").innerHTML = gb_config.ipAddress;
  document.getElementById("uploadUrl").innerHTML = gb_config.uploadUrl;
  document.getElementById("racerServer").innerHTML = gb_config.racerServer;
  document.getElementById("peerServerHost").innerHTML = gb_config.peerHost;
  bd.player.bootstrap.stopScripts();
  if($stateParams.isMultiplayer == "true") {
    // Currently multiplayer is broken -- says can't find property game of null when you call singlePlayer.
    // Maybe has something to do with the timeout in the original controller function in AppCtrl?
    document.getElementById("isMultiplayer").innerHTML = 1;
    bd.player.bootstrap.loadedGameString = $stateParams.instanceFileString;
    bd.instance.ctr.instanceCode = $stateParams.instanceCode;
    bd.player.bootstrap.singlePlayer();
  } else {
    document.getElementById("isMultiplayer").innerHTML = 0;
    bd.player.bootstrap.singlePlayer();
  }


  $window.addEventListener("orientationchange", function() {
      $window.bd.phaser.ctr.orientationChangeCallback();
  }, false);



};

function GameDetailsCtrl($scope, $stateParams, $timeout, gameLoader, $rootScope, $ionicPlatform, $state) {
  var gameId = $stateParams.gameID;
  $scope.gameDetails = gameLoader.updateDetails(gameId, $scope);
  
  $scope.joinInstanceHandler = function() {
    gameLoader.joinInstanceHandler(gameId,this.instanceCode,$state);
  }

  $scope.createInstanceHandler = function() {
    gameLoader.createInstanceHandler(gameId,$state);
  }

};







////////////////////////////////////////////////////////////////////////////////////
/////////////////////////    BROWSEPAGECTRL & TAB CTRLS  ///////////////////////////
////////////////////////////////////////////////////////////////////////////////////

function BrowsePageCtrl($scope, gameList, gameLoader) {
  // Expose the gameList functions. We need all of them in the templates so might as well just expose the whole service.
  $scope.gameList = gameList;
};


