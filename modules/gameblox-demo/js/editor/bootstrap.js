goog.provide('bd');

goog.require("goog.userAgent");

bd.blockvars = {};
bd.imageLoader = {};
bd.util = {};
bd.newEntitySelector = {};


bd.entityLookup = {};

bd.isServer = false;

bd.init = function() {
  bd.component.initializeComponents();
  bd.inPlayer = false;
  bd.instanceId = null;
  bd.gitRevision = document.getElementById('gitRevision').innerHTML;

  bd.image.ctr.setupFileUploader();
  bd.image.ctr.setupSoundUploader();
  bd.model.populateModels();
  bd.editor.ctr.setupEditor();

  if(goog.userAgent.IE) {
    if(document.getElementById("browserSupportWarning")) {
      document.getElementById("browserSupportWarning").style.display = "block";
    }
  }

  if(bd.util.getURLParamValue("tutorial") == "true") {
    bd.tutorial.ctr.setupTutorial();
  }

  if(bd.util.getURLParamValue("hp") == "hoc") {
    bd.rightPanel.ctr.showHidePanel("show");
    bd.help.ctr.setToHourOfCode();
  }

  var gameId = document.getElementById('gameId').innerHTML;
  if(gameId != ""){
    bd.util.ajaxGet("/game/getGame/" + gameId + "/",bd.loadGame);
    bd.editor.ctr.displayGameId();

    var editAccess = document.getElementById('editAccess').innerHTML;
    //if the user does not have edit access, remove the gameId and draftId so it is saved as a new file
    if(editAccess == 0) {
      document.getElementById('parentGameId').innerHTML = document.getElementById('gameId').innerHTML;
      document.getElementById('gameId').innerHTML = "";
      document.getElementById('draftId').innerHTML = "";
    }
    return;
  }
  bd.image.ctr.initializeAssetLists(function() {
    //get game from server or create new game
    var newGame = new bd.component.game.constructor();
    bd.model.currentGame = newGame.model;

    bd.model.getCurrentGame().multiplayer = true;
    var questionMarkAssetComponent = new bd.component.assetImage.constructor(null,"images/qmarksq.png", true,true);
    bd.defaultBoardAsset = questionMarkAssetComponent;
    bd.defaultPieceAsset = questionMarkAssetComponent;
    bd.defaultDeckAsset = questionMarkAssetComponent;
    bd.defaultPlayerAsset = new bd.component.assetImage.constructor(null,"images/stickFigure.png", true,true);
    bd.defaultPathAsset = new bd.component.assetImage.constructor(null,"images/greensq.png", true, true);

    bd.defaultAgentViewAsset = questionMarkAssetComponent;
    bd.defaultPlayerViewAsset = questionMarkAssetComponent;
    bd.defaultGameViewAsset = questionMarkAssetComponent;
    bd.defaultImageAsset = questionMarkAssetComponent;
    bd.defaultShapeAsset = questionMarkAssetComponent;
    bd.defaultLabelAsset = questionMarkAssetComponent;
    bd.defaultSpreadsheetAsset = new bd.component.assetImage.constructor(null,"images/spreadsheet.png", true,true);
    //bd.defaultVideoPictureAsset = new bd.model.Asset("http://i.ytimg.com/vi/cy7TD7QXEWw/default.jpg","cy7TD7QXEWw");//new bd.model.Asset("images/video.png");
    bd.defaultVideoAsset = new bd.component.assetVideo.constructor(null,"cy7TD7QXEWw","https://i.ytimg.com/vi/cy7TD7QXEWw/default.jpg",true);
    bd.defaultTextInputAsset = new bd.component.assetImage.constructor(null,"images/textInput.png", true, true);
    bd.defaultTableAsset = new bd.component.assetImage.constructor(null,"images/textInput.png", true, true);
    bd.imageLoader.ctr.loadAllAssets();

    bd.editor.ctr.setupNewGame();

    bd.component.whenGameCreated();

    bd.editor.ui.setUpInterface();
  
    bd.updateSelections();

    bd.sideBar.ctr.updateSideBar();

    //call to get the user's assets from the database
    //bd.image.ctr.initializeAssetLists();
    bd.editor.ctr.setSavedEncodedGameString();

    //bd.switchContentTab('designTab');

    //window.onload = function() {
    setTimeout(function(){jQuery('html,body').animate({scrollTop: 0}, 0);},100);

  });
}

bd.loadGame = function(response){
	var responseObject = JSON.parse(response);
	bd.model.currentGame = responseObject.game;
	bd.model.populateEntityLookup();
	bd.revision.ctr.updateGame();
	bd.editorSettings.currentViewId = bd.model.getCurrentGame().phaserViews[0].id;
  bd.editor.ctr.setFlexidor(document.getElementById("flexId").innerHTML);

	bd.imageLoader.ctr.loadAllAssets();
	for(var i=0;i<bd.model.getCurrentGameAssets().length;i++){
		var asset = bd.model.getCurrentGameAssets()[i];
		switch(asset.thumbnailFileName){
			case "images/qmarksq.png":
				bd.defaultBoardAsset = asset;
				bd.defaultPieceAsset = asset;
				bd.defaultDeckAsset = asset;
				bd.defaultAgentViewAsset = asset;
				bd.defaultPlayerViewAsset = asset;
				bd.defaultGameViewAsset = asset;
				bd.defaultImageAsset = asset;
				bd.defaultShapeAsset = asset;
				bd.defaultLabelAsset = asset;
				break;
			case "images/stickFigure.png":
				bd.defaultPlayerAsset = asset;
				break;
			case "images/greensq.png":
				bd.defaultPathAsset = asset;
				break;	
			case "https://i.ytimg.com/vi/cy7TD7QXEWw/default.jpg":
			case "http://i.ytimg.com/vi/cy7TD7QXEWw/default.jpg":
				bd.defaultVideoAsset = asset;
				break;
			case "images/spreadsheet.png":
				bd.defaultSpreadsheetAsset = asset;
				break;
			case "images/textInput.png":
				bd.defaultTextInputAsset = asset;
        bd.defaultTableAsset = asset
				break;
			case bd.component.melonView.tmxTileSet.componentProperties.defaultTileUrl:
				bd.defaultTileAsset = asset;
				break;
			case bd.component.melonView.tmxTileSet.componentProperties.collisionTileUrl:
				bd.collisionTileAsset = asset;
				break;
		}
	}

    bd.component.whenGameLoadedInEditor();

    bd.editor.ui.setUpInterface();
      
    bd.updateSelections();
    
    bd.component.lookup(bd.model.getCurrentViewId()).populateEditorDisplayObjects()
    
    bd.sideBar.ctr.updateSideBar()

    //call to get the user's assets from the database
    bd.image.ctr.initializeAssetLists();
    bd.editor.ctr.setSavedEncodedGameString();

    // Render flexidor
    if (bd.editor.ctr.isFlexidor()) {
      bd.flexidor.ctr.renderFlexidor();
    }
}
