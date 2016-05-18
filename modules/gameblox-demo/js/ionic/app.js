// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('gamebloxMobile', ['ionic', 'controllers'])

.config(function($ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('bottom');
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })
    
  .state('app.home', {
      url: '/home',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'templates/home.html'
        }
      }
    })

  .state('app.about', {
      url: '/about',
      views: {
        'menuContent': {
          templateUrl: 'templates/about.html'
        }
      }
  })

  .state('app.qrCode', {
      url: '/qrCode',
      views: {
        'menuContent': {
          templateUrl: 'templates/qrCode.html'
        }
      }
  })

  .state('app.login', {
      url: '/login',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'templates/login.html'
        }
      }
  })

  .state('app.logout', {
      url: '/logout',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'templates/logout.html'
        }
      }
  })

  .state('app.help', {
      url: '/help',
      views: {
        'menuContent': {
          templateUrl: 'templates/help.html'
        }
      }
  })

  .state('app.gameDetails', {
      url: '/gameDetails?gameID',
      views: {
        'menuContent': {
          templateUrl: 'templates/gameDetails.html',
          controller: 'GameDetailsCtrl'
        }
      }
  })

  .state('app.playPage', {
      url: '/playPage?isMultiplayer&gameId&instanceCode&instanceFileString',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'templates/playPage.html',
          controller: 'PlayPageCtrl'
        }
      }
  })
 
 .state('app.browse', {
    url: '/browse',
    views: {
      'menuContent': {
        templateUrl: 'templates/browse.html',
        controller: 'BrowsePageCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});

