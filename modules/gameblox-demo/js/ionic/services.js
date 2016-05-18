
angular.module('services', ['gb_config'])

/**
  * This service is a simple wrapper around the bd.util ajax calls.
  * It eliminates the need to look up the IP address every call.
  */
.factory('ajaxCalls', function(gb_config) {

  /**
    * Get page at url and then call callback function with the response.
    */
  var ajaxGet = function(url, callback, callbackError) {
    url = gb_config.ipAddress + url;
    bd.util.ajaxGet(url, callback, callbackError);
  };

  /**
    * Post page at url and then call callback function with the response.
    */
  var ajaxPost = function(url, params, callback) {
    url = gb_config.ipAddress + url;
    bd.util.ajaxPost(url, params, callback);    
  };

  // These are the functions that will be exposed to clients that depend on the ajaxCalls module.
  return {
    ajaxGet: ajaxGet,
    ajaxPost: ajaxPost,
    // The base URL where the thumbnail images for games can be found.
    thumbnailUrlPrefix: gb_config.uploadUrl + gb_config.thumbnailPath,


  };

})

/**
 * This service loads lists of games and controls the display of those games in an infinite scroll display.
 */
.factory('gameList', function($rootScope, ajaxCalls) {

  // A list of all games in the list we're looking at.
  var fullGameList = [];

  // The games that are currently being displayed in the scroll.
  var displayGameList = [];

  /**
   * This function adds up to seven new items to the display list from the full list.
   * It is called in the infinite scroll code in browse.html.
   */
  var addItems = function() {
    var start = displayGameList.length;
    for (var i = start; i < start+7; i++) {
      if (i < fullGameList.length) {
        displayGameList.push(fullGameList[i]); 
      }
    }

    $rootScope.$broadcast('scroll.infiniteScrollComplete');
  };

  /**
   * Clears both the full and display game lists.
   */
  var clearGames = function() {
    fullGameList.splice(0, fullGameList.length);
    displayGameList.splice(0, displayGameList.length);
  };
 

  /**
   * Gets the games at urlStem with some id and stores them in fullGameList. Does NOT update displayGameList.
   *
   * May store some properties of games that aren't used in all displays (eg thumbs_up and creation_date). These
   * won't display unless the template displays them.
   *
   * Examples:
   *   * gameList.getGames('/game/getUserGameInfo/', userInfo.userId) // Gets My Games
   *   * gameList.getGames('/game/getCollectionGameInfo/',1) // Gets games in collection 1
   */
  var getGames = function(urlStem, id) {
    clearGames()
    ajaxCalls.ajaxGet(urlStem + id,
      function(response) {
        var games = JSON.parse(response);    
        for (var i=0; i < games.length; i++) {
            game = games[i]
            fullGameList.push({
                id: game.id,
                title: game.name,
                description: game.description,
                user: game.user,
                creation_date: game.creation_date,
                thumbs_up: game.thumbs_up,
                thumbnail_url: ajaxCalls.thumbnailUrlPrefix + game.thumbnail_url});
        }
      });
  };

   

  // These are the functions exposed to the clients of gameList.
  return {
    clearGames: clearGames,
    displayGameList: displayGameList,
    addItems: addItems,
    getGames: getGames,
  };
})

.factory('gameLoader', function(ajaxCalls, gb_config) {
  
  var createInstanceHandler = function(gameId,$state) {
    ajaxCalls.ajaxPost("/game/newInstance/", "gameId=" + gameId, function(responseString) {
      var responseObject = JSON.parse(responseString);
      //gameDetails.instanceCode = responseObject.instanceCode;
      $state.go('^.playPage',{isMultiplayer: true, gameId: gameId, instanceCode: responseObject.instanceCode, instanceFileString: responseString})
    });
  }

  var joinInstanceHandler = function(gameId, instanceCode,$state) {
    ajaxCalls.ajaxPost("/game/joinInstance/", "gameId=" + gameId + "&instanceCode=" + instanceCode, function(responseString) {
      var responseObject = JSON.parse(responseString)
      //gameDetails.instanceCode = responseObject.instanceCode;
      
      $state.go('^.playPage',{isMultiplayer: true, gameId: gameId, instanceCode: responseObject.instanceCode, instanceFileString: responseString})
    });
  }


  var updateDetails = function(gameId, $scope) {
 
      var gameDetails =  {
        gameId: null,
        instanceCode: null,
        title: "",
        user: "",
        description: "",
        thumbnail_url: "img/logo.png",
        gameVariablesLoaded: false,
        isMultiplayer: false,
        gameEditLinkMessage: "",
        gameEditLink: ""
     }

    ajaxCalls.ajaxGet("/game/getPreGameInfo/"+gameId, 
    function (response) {
        var game = JSON.parse(response);
        gameDetails.gameId = game.id;
        gameDetails.title = game.name;
        gameDetails.description = game.description;
        gameDetails.user = game.user;
        gameDetails.thumbnail_url = ajaxCalls.thumbnailUrlPrefix + game.thumbnail_url;
        if(game.is_multiplayer == 1) {
              gameDetails.isMultiplayer = true;
        } else {
              gameDetails.isMultiplayer = false;
        }
        gameDetails.gameVariablesLoaded = true;
        gameDetails.gameEditLinkMessage = "View the game online at";
        gameDetails.gameEditLink = gb_config.ipAddress + "/editor/" + gameId;
        $scope.$apply();
    }, function(response) {
        gameDetails.title = "Game does not exist."
        gameDetails.description = "Try another game code. The game with ID " + gameId + " does not exist.";
        $scope.$apply();

    });

    return gameDetails;
  }

 

  return {
    createInstanceHandler: createInstanceHandler,
    joinInstanceHandler: joinInstanceHandler,
    updateDetails: updateDetails,
    }
})



.factory('userInfo', function() {
  var userId;
  var username;

  return {
    userId: userId,
    username: username,
  };
});
