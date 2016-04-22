goog.provide('bd.revision.ctr');

bd.revision.ctr.X2JS = new X2JS();

bd.revision.ctr.updateGame = function() {
  //*** remember to update game tag revision number! ***
  var revisionNumToObject = {
    '0.0.0':{updateFxn:bd.revision.ctr.updateToVersion0_0_1,nextVersion:[0,0,1]},
    '0.0.1':{updateFxn:bd.revision.ctr.updateToVersion0_0_2,nextVersion:[0,0,2]},
    '0.0.2':{updateFxn:bd.revision.ctr.updateToVersion0_0_3,nextVersion:[0,0,3]},
    '0.0.3':{updateFxn:bd.revision.ctr.updateToVersion0_0_4,nextVersion:[0,0,4]},
    '0.0.4':{updateFxn:bd.revision.ctr.updateToVersion0_0_5,nextVersion:[0,0,5]},
    '0.0.5':{updateFxn:bd.revision.ctr.updateToVersion0_0_6,nextVersion:[0,0,6]},
    '0.0.6':{updateFxn:bd.revision.ctr.updateToVersion0_0_7,nextVersion:[0,0,7]},
    '0.0.7':{updateFxn:bd.revision.ctr.updateToVersion0_0_8,nextVersion:[0,0,8]},
    '0.0.8':{updateFxn:bd.revision.ctr.updateToVersion0_0_9,nextVersion:[0,0,9]},
    '0.0.9':{updateFxn:bd.revision.ctr.updateToVersion0_0_10,nextVersion:[0,0,10]},
    '0.0.10':{updateFxn:bd.revision.ctr.updateToVersion0_0_11,nextVersion:[0,0,11]},
    '0.0.11':{updateFxn:bd.revision.ctr.updateToVersion0_0_12,nextVersion:[0,0,12]},
    '0.0.12':{updateFxn:bd.revision.ctr.updateToVersion0_0_13,nextVersion:[0,0,13]},
    '0.0.13':{updateFxn:bd.revision.ctr.updateToVersion0_0_14,nextVersion:[0,0,14]},
    '0.0.14':{updateFxn:bd.revision.ctr.updateToVersion0_0_15,nextVersion:[0,0,15]},
    '0.0.15':{updateFxn:bd.revision.ctr.updateToVersion0_0_16,nextVersion:[0,0,16]},
    '0.0.16':{updateFxn:bd.revision.ctr.updateToVersion0_0_17,nextVersion:[0,0,17]},
    '0.0.17':{updateFxn:bd.revision.ctr.updateToVersion0_0_18,nextVersion:[0,0,18]},
    '0.0.18':{updateFxn:bd.revision.ctr.updateToVersion0_0_19,nextVersion:[0,0,19]},
    '0.0.19':{updateFxn:bd.revision.ctr.updateToVersion0_0_20,nextVersion:[0,0,20]},
    '0.0.20':{updateFxn:bd.revision.ctr.updateToVersion0_0_21,nextVersion:[0,0,21]},
    '0.0.21':{updateFxn:bd.revision.ctr.updateToVersion0_0_22,nextVersion:[0,0,22]},
    '0.0.22':{updateFxn:bd.revision.ctr.updateToVersion0_0_23,nextVersion:[0,0,23]},
    '0.0.23':{updateFxn:bd.revision.ctr.updateToVersion0_0_24,nextVersion:[0,0,24]},
    '0.0.24':{updateFxn:bd.revision.ctr.updateToVersion0_0_25,nextVersion:[0,0,25]},
    '0.0.25':{updateFxn:bd.revision.ctr.updateToVersion0_0_26,nextVersion:[0,0,26]},
    '0.0.26':{updateFxn:bd.revision.ctr.updateToVersion0_0_27,nextVersion:[0,0,27]}
  };

  var revisionNum = bd.revision.ctr.getRevisionNum();
  var revisionObject = revisionNumToObject[revisionNum]
  if(revisionObject != null) {
    revisionObject.updateFxn();
    bd.revision.ctr.setVersionNumber(revisionObject.nextVersion);
    revisionNum = bd.revision.ctr.getRevisionNum();
    if(revisionNumToObject[revisionNum] != null) {
      //watch for infinite loop
      bd.revision.ctr.updateGame();
    }
  }
}

bd.revision.ctr.setVersionNumber = function(versionArray) {
  var game = bd.model.getCurrentGame();
  game.versionRelease = versionArray[0];
  game.versionMajor = versionArray[1];
  game.versionMinor = versionArray[2];
}

bd.revision.ctr.getRevisionNum = function() {
  var game = bd.model.getCurrentGame();
  if(game.versionRelease == null && game.versionMajor == null && game.versionMinor == null) {
    return '0.0.0';
  } else {
    return game.versionRelease + '.' + game.versionMajor + '.' + game.versionMinor;
  }
}

//add frictionX and frictionY to all sprites and sprite classes
bd.revision.ctr.updateToVersion0_0_1 = function() {
  var entitiesThatNeedFriction = [];
  entitiesThatNeedFriction = entitiesThatNeedFriction.concat(bd.model.getEntityList("phaserPhysicsPieceInstance"));
  entitiesThatNeedFriction = entitiesThatNeedFriction.concat(bd.model.getEntityList("phaserPhysicsPiece"));
  for(var i=0;i<entitiesThatNeedFriction.length;i++) {
    if(entitiesThatNeedFriction[i].frictionX == null) {
      entitiesThatNeedFriction[i].frictionX = 0;
    }
    if(entitiesThatNeedFriction[i].frictionY == null) {
      entitiesThatNeedFriction[i].frictionY = 0;
    }
  }
}

bd.revision.ctr.updateToVersion0_0_2 = function() {
  var game = bd.model.getCurrentGame();
  game.phaserViews[0].backgroundColor = "#FFFFFF";
  var bdImageLayer = new bd.component.melonView.tmxImageLayer.constructor(null,game.phaserViews[0].id,game.phaserViews[0].tmxMapId,bd.model.currentGame.assetImages[0].id)
  var tmxMap = bd.model.entityLookup(bd.model.entityLookup(game.phaserViews[0].id).tmxMapId);
  var indexOfBgLayer = tmxMap.layerIds.indexOf(bdImageLayer.id);
  if(indexOfBgLayer != -1) {
    tmxMap.layerIds.splice(indexOfBgLayer,1);
    tmxMap.layerIds.splice(0,0,bdImageLayer.id)
  }
}

//turn off tile grid on all old projects
bd.revision.ctr.updateToVersion0_0_3 = function() {
  var game = bd.model.getCurrentGame();
  game.phaserViews[0].gridVisible = false;
}

//make bounce range 0 to 100
bd.revision.ctr.updateToVersion0_0_4 = function() {
  var game = bd.model.getCurrentGame();
  var entitiesThatBounce = [];
  entitiesThatBounce = entitiesThatBounce.concat(bd.model.getEntityList("phaserPhysicsPieceInstance"));
  entitiesThatBounce = entitiesThatBounce.concat(bd.model.getEntityList("phaserPhysicsPiece"));
  for(var i=0;i<entitiesThatBounce.length;i++) {
    if(entitiesThatBounce[i].bounceX != null) {
      entitiesThatBounce[i].bounceX = entitiesThatBounce[i].bounceX * 100;
    }
    if(entitiesThatBounce[i].bounceY != null) {
      entitiesThatBounce[i].bounceY = entitiesThatBounce[i].bounceY * 100;
    }
  }
}

//add label font size
bd.revision.ctr.updateToVersion0_0_5 = function() {
  var game = bd.model.getCurrentGame();
  var entitiesWithFontSize = [];
  entitiesWithFontSize = entitiesWithFontSize.concat(bd.model.getEntityList("labelInstance"));
  entitiesWithFontSize = entitiesWithFontSize.concat(bd.model.getEntityList("label"));
  for(var i=0;i<entitiesWithFontSize.length;i++) {
    if(entitiesWithFontSize[i].fontSize == null) {
      entitiesWithFontSize[i].fontSize = 18;
    }
  }
}

//make sure default direction is 0 instead of 90, fix from commit 8218868
bd.revision.ctr.updateToVersion0_0_6 = function() {
  var game = bd.model.getCurrentGame();
  var entitiesWithDirection = [];
  entitiesWithDirection = entitiesWithDirection.concat(bd.model.getEntityList("phaserPhysicsPieceInstance"));
  entitiesWithDirection = entitiesWithDirection.concat(bd.model.getEntityList("phaserPhysicsPiece"));
  entitiesWithDirection = entitiesWithDirection.concat(bd.model.getEntityList("labelInstance"));
  entitiesWithDirection = entitiesWithDirection.concat(bd.model.getEntityList("label"));
  for(var i=0;i<entitiesWithDirection.length;i++) {
    if(entitiesWithDirection[i].direction == 90) {
      entitiesWithDirection[i].direction = 0;
    }
  }
}

//change clone block from using views to layers for placing sprites
bd.revision.ctr.updateToVersion0_0_7 = function() {
  var game = bd.model.getCurrentGame();
  bd.revision.ctr.changeXmlBlocks(game,function(xmlBlock) {
    if(xmlBlock.getAttribute('type') == "clone_to_xy" || xmlBlock.getAttribute('type') == "clone_to_xy_return") {
      var fieldXml = bd.revision.ctr.getFieldOrValueFromXmlBlock(xmlBlock, "field", "VIEW");
      var oldViewValue = fieldXml.innerText;
      if(bd.util.containsPrefix(oldViewValue,"id:")) {
        var oldViewId = bd.util.removePrefix(oldViewValue,"id");
        var layerIds = bd.component.lookup(oldViewId).getLayerIds();
        for(var i=0, layerId; layerId = layerIds[i]; i++) {
          if(bd.model.entityLookup(layerId).type == "tmxEntityLayer") {
            fieldXml.innerText = "id:" + layerId;
            fieldXml.setAttribute("name", "LAYER");
            break;
          }
        }
      }
    }
  });

}

bd.revision.ctr.updateToVersion0_0_8 = function() {
  var game = bd.model.getCurrentGame();
  game.assetSounds = [];
  for (var i=0;i<game.assetSound.length;i++){
    var sound = game.assetSound[i];
    game.assetSounds.push(sound);
    bd.component.lookupDict[sound.id] = new bd.component.assetSound.constructor(sound);
  }
  delete game.assetSound;

  for (var i=0, tab; tab = game.tabs[i]; i++){
    if(tab.tabKey == "soundTab") {
      var firstSound = new bd.component.sound.constructor(null,tab.id);
      tab.canCreateEntities = false;
      tab.minEntityNum = 1;
    }
  }
}

bd.revision.ctr.updateToVersion0_0_9 = function() {
  var game = bd.model.getCurrentGame();
  var hasTableTab = false;
  for (var i=0, tab; tab = game.tabs[i]; i++){
    if(tab.tabKey == "tableTab") {
      hasTableTab = true;
    }
  }
  if(!hasTableTab) {
    var gameInfoId = bd.model.getGameInfo().id;
    var firstTableClass = new bd.component.table.constructor(null);
    new bd.component.tab.constructor(null,"Table","tableTab",gameInfoId,["table"],null,[firstTableClass.id]);
  }
}

bd.revision.ctr.updateToVersion0_0_10 = function() {
  var game = bd.model.getCurrentGame();
  bd.revision.ctr.changeXmlBlocks(game,function(xmlBlock) {
    if(xmlBlock.getAttribute('type') == "table_get_dimension") {
      var fieldXml = bd.revision.ctr.getFieldOrValueFromXmlBlock(xmlBlock, "field", "DIMENSION");
      if(fieldXml) {
        fieldXml.setAttribute("name", "ROW_OR_COLUMN");
      }
    }
  });

}

//add tint
bd.revision.ctr.updateToVersion0_0_11 = function() {
  var game = bd.model.getCurrentGame();
  var entitiesWithTint = [];
  entitiesWithTint = entitiesWithTint.concat(bd.model.getEntityList("labelInstance"));
  entitiesWithTint = entitiesWithTint.concat(bd.model.getEntityList("label"));
  entitiesWithTint = entitiesWithTint.concat(bd.model.getEntityList("phaserPhysicsPieceInstance"));
  entitiesWithTint = entitiesWithTint.concat(bd.model.getEntityList("phaserPhysicsPiece"));

  for(var i=0;i<entitiesWithTint.length;i++) {
    if(entitiesWithTint[i].tint === undefined) {
      entitiesWithTint[i].tint = "#ffffff";
    }
  }
  //Background color not in current version of phaser
/*
  var entitiesWithBackgroundColor = [];
  entitiesWithBackgroundColor = entitiesWithBackgroundColor.concat(bd.model.getEntityList("labelInstance"));
  entitiesWithBackgroundColor = entitiesWithBackgroundColor.concat(bd.model.getEntityList("label"));
  for(var i=0;i<entitiesWithBackgroundColor.length;i++) {
    if(entitiesWithBackgroundColor[i].backgroundColor === undefined) {
      entitiesWithBackgroundColor[i].backgroundColor = null;
    }
  }*/
}

//add timer tab
bd.revision.ctr.updateToVersion0_0_12 = function() {
  var game = bd.model.getCurrentGame();
  var hasTimerTab = false;
  for (var i=0, tab; tab = game.tabs[i]; i++){
    if(tab.tabKey == "timerTab") {
      hasTimerTab = true;
    }
  }
  if(!hasTimerTab) {
    var gameInfoId = bd.model.getGameInfo().id;
    var firstTimerClass = new bd.component.timer.constructor(null);
    new bd.component.tab.constructor(null,"Timer","timerTab",gameInfoId,["timer"],null,[firstTimerClass.id]);
  }
}

//change the name of the first script page
bd.revision.ctr.updateToVersion0_0_13 = function() {
  var game = bd.model.getCurrentGame();
  var scriptPage = bd.model.getEntityList("scriptPage")[0];
  if(scriptPage.name == "Script Page 1") {
    scriptPage.name = "block page 1";
  }
}

//fix phaser view height and width
bd.revision.ctr.updateToVersion0_0_14 = function() {
  var phaserViews = bd.model.getEntityList("phaserView");
  for(var i=0; i < phaserViews.length; i++) {
    phaserViews[i].height = 480;
    phaserViews[i].width = 640;
  }
}

//update stage and layer for camera
bd.revision.ctr.updateToVersion0_0_15 = function() {
  var phaserViews = bd.model.getEntityList("phaserView");
  for(var i=0; i < phaserViews.length; i++) {
    phaserViews[i].cameraLayerIds = [];
    phaserViews[i].cameraX = 0;
    phaserViews[i].cameraY = 0;
    phaserViews[i].cameraLocationType = "instance";
  }
  var layers = [];
  layers = layers.concat(bd.model.getEntityList("uiLayer"));
  layers = layers.concat(bd.model.getEntityList("tmxEntityLayer"));
  layers = layers.concat(bd.model.getEntityList("tmxImageLayer"));
  for(var i=0; i < layers.length; i++) {
    layers[i].isCameraLayer = false;
  }
}

//fix table column type capitalization
bd.revision.ctr.updateToVersion0_0_16 = function() {
  var tableColumns = bd.model.getEntityList("tableColumn");
  for(var i=0; i < tableColumns.length; i++) {
    if(tableColumns[i].columnType == "String") {
      tableColumns[i].columnType = "STRING";
    }
  }
}

//add should return mutator to call blocks, defaults to false
bd.revision.ctr.updateToVersion0_0_17 = function() {
  var game = bd.model.getCurrentGame();
  bd.revision.ctr.changeXmlBlocks(game,function(xmlBlock) {
    if(xmlBlock.getAttribute('type') == "procedures_call") {
      var mutatorXml = bd.revision.ctr.getFieldOrValueFromXmlBlock(xmlBlock, "mutation");
      if(mutatorXml) {
        var shouldReturn = mutatorXml.getAttribute('should_return');
        if(shouldReturn == null) {
          mutatorXml.setAttribute("should_return", "false");
        }
      }
    }
  });

}


//for create_list block, match mutator names and their field names
bd.revision.ctr.updateToVersion0_0_18 = function() {
  var game = bd.model.getCurrentGame();
  bd.revision.ctr.changeXmlBlocks(game,function(xmlBlock) {
    if(xmlBlock.getAttribute('type') == "create_list") {
      var mutatorXml = bd.revision.ctr.getFieldOrValueFromXmlBlock(xmlBlock, "mutation", "num_lists");
      if(mutatorXml) {
        var depth = mutatorXml.getAttribute('num_lists');
        mutatorXml.setAttribute("type_list_depth", depth);
        for (i = 0; i < depth; i++){
          var fieldXml = bd.revision.ctr.getFieldOrValueFromXmlBlock(xmlBlock, "field", "TYPE_" + i);
          fieldXml.setAttribute("name","TYPE_LIST_DEPTH" + i);
        }
      }
    }
  });

}

//add has instance to game info
bd.revision.ctr.updateToVersion0_0_19 = function() {
  var gameInfo = bd.model.getEntityList("gameInfo")[0];
  if(gameInfo.isMultiplayerGame === undefined) {
    gameInfo.isMultiplayerGame = false;
  }
}

//add has instance to game info
bd.revision.ctr.updateToVersion0_0_20 = function() {
  var gameInfo = bd.model.getEntityList("gameInfo")[0];
  if(gameInfo.framesPerSecond === undefined) {
    gameInfo.framesPerSecond = 60;
  }
}

//add drawing properties
bd.revision.ctr.updateToVersion0_0_21 = function() {
  var game = bd.model.getCurrentGame();
  var entitiesWithDrawingProperties = [];

  entitiesWithDrawingProperties = entitiesWithDrawingProperties.concat(bd.model.getEntityList("phaserPhysicsPieceInstance"))
  entitiesWithDrawingProperties = entitiesWithDrawingProperties.concat(bd.model.getEntityList("phaserPhysicsPiece"))

  for(var i=0;i<entitiesWithDrawingProperties.length;i++) {
    if(entitiesWithDrawingProperties[i].drawingColor === undefined) {
      entitiesWithDrawingProperties[i].drawingColor = "#000000";
    }
    if(entitiesWithDrawingProperties[i].drawingThickness === undefined) {
      entitiesWithDrawingProperties[i].drawingThickness = 10;
    }
    if(entitiesWithDrawingProperties[i].drawingEnabled === undefined) {
      entitiesWithDrawingProperties[i].drawingEnabled = false;
    }
  }
}

//add pen properties
bd.revision.ctr.updateToVersion0_0_22 = function() {
  var game = bd.model.getCurrentGame();
  var entitiesWithPenProperties = [];

  entitiesWithPenProperties = entitiesWithPenProperties.concat(bd.model.getEntityList("phaserPhysicsPieceInstance"))
  entitiesWithPenProperties = entitiesWithPenProperties.concat(bd.model.getEntityList("phaserPhysicsPiece"))

  for(var i=0;i<entitiesWithPenProperties.length;i++) {
    if(entitiesWithPenProperties[i].penColor === undefined) {
      entitiesWithPenProperties[i].penColor = "#000000";
    }
    if(entitiesWithPenProperties[i].penThickness === undefined) {
      entitiesWithPenProperties[i].penThickness = 10;
    }
    if(entitiesWithPenProperties[i].penEnabled === undefined) {
      entitiesWithPenProperties[i].penEnabled = false;
    }
  }
}

//add players and team
bd.revision.ctr.updateToVersion0_0_23 = function() {
  var game = bd.model.getCurrentGame();

  var playerClass = new bd.component.playerClass.constructor(null);
  playerClass.model.name = bd.component.playerClass.componentProperties.tabName;
  var team = new bd.component.team.constructor(null);
  team.model.name = bd.component.team.componentProperties.tabName;
  var gameInfoId = bd.model.getGameInfo().id
  var playerTab = new bd.component.tab.constructor(null,"Players","playerTab",gameInfoId,["playerClass"],null,[playerClass.id,team.id],false,2);

}


//update for box2d
bd.revision.ctr.updateToVersion0_0_24 = function() {

  var entitiesWithPhysics = [];
  entitiesWithPhysics = entitiesWithPhysics.concat(bd.model.getEntityList("phaserPhysicsPieceInstance"));
  entitiesWithPhysics = entitiesWithPhysics.concat(bd.model.getEntityList("phaserPhysicsPiece"));

  for(var i=0;i<entitiesWithPhysics.length;i++) {
    entitiesWithPhysics[i].collisionObject = {};
    entitiesWithPhysics[i].friction = 0;
    entitiesWithPhysics[i].bounciness = Math.max(entitiesWithPhysics[i].bounceX,entitiesWithPhysics[i].bounceY);
    entitiesWithPhysics[i].gravityX = entitiesWithPhysics[i].gravityX / 100;
    entitiesWithPhysics[i].gravityY = entitiesWithPhysics[i].gravityY / 100;
    entitiesWithPhysics[i].fixedRotation = true;
    entitiesWithPhysics[i].wallCollisionIds = [];
    entitiesWithPhysics[i].stopAfterDrag = true;
  }

}


//make background image layer visible by default
//layers previously set to invisible no longer can add background images
//since visibility is controlled by the layer's tile sprite
bd.revision.ctr.updateToVersion0_0_25 = function() {
  var layers = [];
  layers = layers.concat(bd.model.getEntityList("tmxImageLayer"));
  for(var i=0; i < layers.length; i++) {
    //if layer was invisible, make the tile sprite invisible, but make the layer visible
    if(!layers[i].visible) {
      layers[i].tileSpriteVisible = false;
      layers[i].visible = true;
    } else if(layers[i].visible && layers[i].tileSpriteVisible == null){
      //if the background image was supposed to be showing, make the tile sprite visible
      layers[i].tileSpriteVisible = true;
    }
  }
}

//add video tab
bd.revision.ctr.updateToVersion0_0_26 = function() {
  var gameInfoId = bd.model.getGameInfo().id;
  var firstVideoClass = new bd.component.video.constructor(null);
  new bd.component.tab.constructor(null,"Videos","videoTab",gameInfoId,["video"],null,[firstVideoClass.id]);

}

//add sound channel
bd.revision.ctr.updateToVersion0_0_27 = function() {
  var firstSoundChannel = new bd.component.soundChannel.constructor(null);
}


/**** helper functions ********/
//copied from Blockly.XML
bd.revision.ctr.textToDom = function (text) {
  var oParser = new DOMParser();
  var dom = oParser.parseFromString(text, 'text/xml');
  // The DOM should have one and only one top-level node, an XML tag.
  if (!dom || !dom.firstChild ||
      dom.firstChild.nodeName.toLowerCase() != 'xml' ||
      dom.firstChild !== dom.lastChild) {
    // Whatever we got back from the parser is not XML.
    throw 'Blockly.Xml.textToDom did not obtain a valid XML tree.';
  }
  return dom.firstChild;
}

bd.revision.ctr.domToText = function(dom) {
  var oSerializer = new XMLSerializer();
  return oSerializer.serializeToString(dom);
};


bd.revision.ctr.getAllBlocksFromXmlBlock = function(xmlBlock) {
  var xmlBlocksToReturn = [];
  xmlBlocksToReturn.push(xmlBlock);
  //copied for domToBlock in Blockly core's xml.js
  for (var x = 0, xmlChild; xmlChild = xmlBlock.childNodes[x]; x++) {
    if (xmlChild.nodeType == 3 && xmlChild.data.match(/^\s*$/)) {
      // Extra whitespace between tags does not concern us.
      continue;
    }
    // Find the first 'real' grandchild node (that isn't whitespace).
    var firstRealGrandchild = null;
    for (var y = 0, grandchildNode; grandchildNode = xmlChild.childNodes[y];
         y++) {
      if (grandchildNode.nodeType != 3 || !grandchildNode.data.match(/^\s*$/)) {
        firstRealGrandchild = grandchildNode;
      }
    }

    var name = xmlChild.getAttribute('name');
    switch (xmlChild.nodeName.toLowerCase()) {
      case 'statement':
      case 'value':
      case 'next':
        //do something
        if (firstRealGrandchild &&
            firstRealGrandchild.nodeName.toLowerCase() == 'block') {
          xmlBlocksToReturn = xmlBlocksToReturn.concat(bd.revision.ctr.getAllBlocksFromXmlBlock(firstRealGrandchild));
          break;
        }
    }

  }
  return xmlBlocksToReturn;
}

bd.revision.ctr.getAllBlocksFromScriptPageXml = function(scriptPageXml) {
  var xmlBlocks = []
  for(var i=0, childNode; childNode = scriptPageXml.childNodes[i]; i++) {
    xmlBlocks = xmlBlocks.concat(bd.revision.ctr.getAllBlocksFromXmlBlock(childNode));
  }
  return xmlBlocks;
}

bd.revision.ctr.changeXmlBlocks = function(game,xmlBlockHandler) {

  var scriptPageXml;
  var xmlBlocks;
  for(var i=0, scriptPage; scriptPage = game.scriptPages[i]; i++) {
    scriptPageXml = bd.revision.ctr.textToDom(scriptPage.scripts);
    xmlBlocks = bd.revision.ctr.getAllBlocksFromScriptPageXml(scriptPageXml);
    for(var k=0, xmlBlock; xmlBlock = xmlBlocks[k]; k++) {
      xmlBlockHandler(xmlBlock);
    }
    scriptPage.scripts = bd.revision.ctr.domToText(scriptPageXml);
    var X2JS = bd.revision.ctr.X2JS;
    scriptPage.scriptObject = X2JS.xml_str2json(scriptPage.scripts);
  }

}

bd.revision.ctr.getFieldOrValueFromXmlBlock = function(xmlBlock, fieldOrValue, name) {
  for (var x = 0, xmlChild; xmlChild = xmlBlock.childNodes[x]; x++) {
    if(xmlChild.nodeName.toLowerCase() == fieldOrValue){
      //for mutator xmls, just get xmlChild since they don't have name attribute
      if (fieldOrValue == 'mutation'){
        return xmlChild;
      } else {
        //for other xmls, we should check on name attributes and make sure they match
        if (xmlChild.getAttribute('name') == name) {
          return xmlChild;
        }
      }
    }
  }
  return null;
}
