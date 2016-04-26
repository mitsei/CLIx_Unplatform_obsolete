bd.phaser = {};
bd.phaser.ctr = {};

bd.phaser.ctr.instanceIdToCollidees = {};
bd.phaser.ctr.instanceIdToEdgesTouching = {};
bd.phaser.ctr.dragMoveCallback = null;
bd.phaser.ctr.dragMoveCallbackStageId = null;

bd.phaser.ctr.gameScaleFactor = 1;
bd.phaser.ctr.mouseJoints = {}; // {pointerId:mouseJoint}
bd.phaser.ctr.previousOrientation = {};

bd.phaser.ctr.pointers = [];
bd.phaser.ctr.pointersInitialized = false;

bd.phaser.ctr.prevXY = {};
bd.phaser.ctr.currPointerSpriteId = {};
bd.phaser.ctr.lineCompleted = {};
bd.phaser.ctr.boundaryCheck = {};
bd.phaser.ctr.justOnSprite = {};
bd.phaser.ctr.justOutside = {};
bd.phaser.ctr.outXY = {};

bd.phaser.ctr.bitMaps = {};

bd.phaser.ctr.penPrevXY = {};
bd.phaser.ctr.stagePrevXY = {};
bd.phaser.ctr.stageOutside = {};

bd.phaser.ctr.compromisedBodies = []; // array of the ids of compromised bodies (spawned into a wall)

bd.phaser.ctr.setupPhaserGame = function() {
  var player = bd.model.entityLookup(bd.player.ctr.playerId);
  var viewComponentObject = bd.component.lookup(player.viewId);
  var heightWidthObject = viewComponentObject.getPlayerViewHeightWidth();

  var gameHeight = (viewComponentObject.model.hasCamera ? viewComponentObject.model.cameraHeight : heightWidthObject.height);
  var gameWidth = (viewComponentObject.model.hasCamera ? viewComponentObject.model.cameraWidth : heightWidthObject.width);
  var phaserParentId = "";
  if(bd.player.ctr.hasNoFrames) {
    phaserParentId = "viewFrame_"+ viewComponentObject.type;
  }
  var game = new Phaser.Game(gameWidth, gameHeight, Phaser.CANVAS, phaserParentId, { preload: bd.phaser.ctr.preload, create: bd.phaser.ctr.create, update : bd.phaser.ctr.update });

  var viewComponentObject = bd.component.lookup(player.viewId);
  bd.player.ctr.uiViewId = viewComponentObject.id;
  viewComponentObject.setPhaserGameObject(game);
  viewComponentObject.setPhaserObject(Phaser);
  window.focus();

  window.addEventListener("resize", bd.phaser.ctr.checkOrientation, false);
  window.addEventListener("orientationchange", bd.phaser.ctr.checkOrientation, false);
}

bd.phaser.ctr.getWindowHeightWidth = function() {
  return {height: window.screen.height - 120, width: window.screen.width };
}

bd.phaser.ctr.preload = function() {
  var player = bd.model.entityLookup(bd.player.ctr.playerId);

  var viewComponentObject = bd.component.lookup(player.viewId);
  viewComponentObject.getPhaserGameObject().load.crossOrigin = "anonymous";
  viewComponentObject.preloadAssets();
}

bd.phaser.ctr.create = function() {
  var player = bd.model.entityLookup(bd.player.ctr.playerId);

  var viewComponentObject = bd.component.lookup(player.viewId);

  var game = viewComponentObject.getPhaserGameObject();

  game.stage.backgroundColor = viewComponentObject.model.backgroundColor;
  game.time.desiredFps = bd.model.getGameInfo().framesPerSecond;

  var textInputsToBeScaled = bd.model.getEntityList("textInputInstance");

  if(!bd.player.ctr.hasNoFrames) {
    window.frameLoaded();
  }

  game.stage.disableVisibilityChange = true;

  //Phaser generates two pointers by default, we will generate four more for a max of six
  if (!bd.phaser.ctr.pointersInitialized) {
    game.input.addPointer();
    game.input.addPointer();
    game.input.addPointer();
    game.input.addPointer();

    bd.phaser.ctr.pointersInitialized = true;
  }

  game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  var heightWidthObject = bd.phaser.ctr.getWindowHeightWidth();
  if(!game.device.desktop) {
    //check if Phaser needs to scale down the game
    if(heightWidthObject.width < game.width || heightWidthObject.height < game.height){
      //calculate the factor by which we need to scale down the game
      //to be used in scaling non-Phaser objects
      bd.phaser.ctr.gameScaleFactor = Math.min(heightWidthObject.width/game.width,heightWidthObject.height/game.height);
    } else {
      //Phaser needs to scale up the game
      if (heightWidthObject.width > heightWidthObject.height){
        //device width > device height
        bd.phaser.ctr.gameScaleFactor = heightWidthObject.height/game.height;
      } else {
        //device height > device width
        bd.phaser.ctr.gameScaleFactor = heightWidthObject.width/game.width;
      }
    }
    //game.scale.onOrientationChange.add(bd.phaser.ctr.orientationChangeCallback, this);

  }

  viewComponentObject.populateDisplayObjects();

  // capture keyboard keys so that events don't bubble up to the window
  var keyCaptureArray = [];
  var keyCodeDict = {};
  for(keyCode in bd.model.getGameInfo().keyCodeToEntityAndBlockId) {
    keyCodeDict[keyCode] = true;
  }
  var keysFromCustom = bd.phaser.ctr.findKeysForCapture();
  for(keyCode in keysFromCustom) {
    keyCodeDict[keyCode] = true;
  }
  //special case space bar since custom sensing block is not detected

  game.input.keyboard.addCallbacks(this,bd.phaser.ctr.keyPressedCallback);

  var physicsEntityObjects = bd.model.getEntityList("phaserPhysicsPieceInstance");

  viewComponentObject.setViewAsInitialized();

  bd.phaser.ctr.findInitialEdgeCollisions();
  game.input.onDown.add(bd.phaser.ctr.createInputEvent("DOWN"), this);
  game.input.onUp.add(bd.phaser.ctr.createInputEvent("UP"), this);

  //drawing
  //pointer history tracking
  game.input.recordPointerHistory = true;
  game.input.recordRate = 10;
  game.input.recordLimit = 100;
  var allPointers = bd.phaser.ctr.getAllPointers();
  //initialize variables for each pointer
  for (var p = 0; p < allPointers.length; p++) {
    bd.phaser.ctr.currPointerSpriteId[allPointers[p].id] = null;
    bd.phaser.ctr.prevXY[allPointers[p].id] = {'x': null, 'y': null};
    bd.phaser.ctr.lineCompleted[allPointers[p].id] = true;
    bd.phaser.ctr.boundaryCheck[allPointers[p].id] = false;
    bd.phaser.ctr.justOnSprite[allPointers[p].id] = false;
    bd.phaser.ctr.justOutside[allPointers[p].id] = false;
    bd.phaser.ctr.outXY[allPointers[p].id] = {'x': null, 'y': null};
  }

  game.input.mouse.mouseOutCallback = function(event) {
    bd.phaser.ctr.mouseOutXY = {'x': event.clientX, 'y': event.clientY};
  };

  if(viewComponentObject.model.hasCamera) {
    var heightWidthObject = viewComponentObject.getPlayerViewHeightWidth();
    if(viewComponentObject.model.cameraLocationType == "instance") {

      if(viewComponentObject.model.instanceIdToFollow != null) {
        var instanceId = viewComponentObject.model.instanceIdToFollow;
        var instance = bd.model.entityLookup(instanceId);
        if(instance.shareMode == "local" && instance.playerId == null && bd.component.lookup(instanceId).classOrInstance == "instance") {
          instanceId = instance.playerIdsToChildInstanceIds[bd.player.ctr.playerId];
        }
        game.camera.follow(bd.component.lookup(instanceId).getDisplayObject());
      }
    } else if(viewComponentObject.model.cameraLocationType == "xy") {
      game.camera.x = viewComponentObject.model.cameraX;
      game.camera.y = viewComponentObject.model.cameraY;
    }
  }

  //draw
  //game.input.addMoveCallback(bd.phaser.ctr.drawCallback, game); 

  //view initialized script run

  //continue evaluating for tick if there are blocks to evaluate
  //this is used for stage switching
  //it also means execution needs to stop when switching stages?
  bd.evaluator.ctr.continuePreviousStack();
}

bd.phaser.ctr.handlePointerDownDragMove = function(pointer) {
  var viewComponentObject = bd.component.lookup(bd.model.getCurrentViewId());
  viewComponentObject.pointerIdsDown[pointer.id] = {mouseMove:false};
  bd.phaser.ctr.addDragMoveCallback();
}

bd.phaser.ctr.handlePointerUpDragMove = function(pointer) {
  var viewComponentObject = bd.component.lookup(bd.model.getCurrentViewId());
  delete viewComponentObject.pointerIdsDown[pointer.id];
  bd.phaser.ctr.removeDragMoveCallback();
}

bd.phaser.ctr.addDragMoveCallback = function() {
  var viewComponentObject = bd.component.lookup(bd.model.getCurrentViewId());
  var phaserGameObject = viewComponentObject.getPhaserGameObject();

  if(!bd.phaser.ctr.dragMoveCallback ||
      bd.phaser.ctr.dragMoveCallbackStageId != viewComponentObject.id) {

    bd.phaser.ctr.dragMoveCallback = function(pointer) {
      //this = viewComponentObject
      var mouseDownObject = this.pointerIdsDown[pointer.id]
      if(mouseDownObject) {
        mouseDownObject.mouseMove = true;
      } else {
        this.pointerIdsDown[pointer.id] = {mouseMove: true};
      }
    };
    phaserGameObject.input.addMoveCallback(bd.phaser.ctr.dragMoveCallback,viewComponentObject);
    bd.phaser.ctr.dragMoveCallbackStageId = viewComponentObject.id;
  }

}

bd.phaser.ctr.removeDragMoveCallback = function() {
  var viewComponentObject = bd.component.lookup(bd.model.getCurrentViewId());
  var phaserGameObject = viewComponentObject.getPhaserGameObject();

  var anyPointerDown = false;
  for(var pointerId in viewComponentObject.pointerIdsDown) {
    anyPointerWaitingForMovement = true;
    break;
  }

  if(!anyPointerDown) {
    phaserGameObject.input.deleteMoveCallback(bd.phaser.ctr.dragMoveCallback,viewComponentObject);
    bd.phaser.ctr.dragMoveCallback = null;
    bd.phaser.ctr.dragMoveCallbackStageId = null;
  }
}

bd.phaser.ctr.orientationChangeCallback = function() {
  var player = bd.model.entityLookup(bd.player.ctr.playerId);
  var viewComponentObject = bd.component.lookup(player.viewId);
  var game = viewComponentObject.getPhaserGameObject();

  var textInputsToBeScaled = bd.model.getEntityList("textInputInstance");
  var tableGridsToBeScaled = bd.model.getEntityList("tableGridInstance");
  var heightWidthObject = bd.phaser.ctr.getWindowHeightWidth();
  if(bd.player.ctr.hasNoFrames) {
    var gameDiv = document.getElementById("viewFrame_"+ viewComponentObject.type);
    gameDiv.style.height = heightWidthObject.height;
    gameDiv.style.width = heightWidthObject.width;
    //console.log("gameDiv height: " + document.body.clientHeight);
    //console.log("window height: " + window.screen.height);
    //console.log("gameDiv width: " + document.body.clientWidth);
  } else {
    //console.log("not a mobile device");
  }

  if(heightWidthObject.width < game.width || heightWidthObject.height < game.height){
    //calculate the factor by which we need to scale down the game
    //to be used in scaling non-Phaser objects
    bd.phaser.ctr.gameScaleFactor = Math.min(heightWidthObject.width/game.width,heightWidthObject.height/game.height);
  } else {
    //Phaser needs to scale up the game
    if (heightWidthObject.width > heightWidthObject.height){
      //device width > device height
      bd.phaser.ctr.gameScaleFactor = heightWidthObject.height/game.height;
    } else {
      //device height > device width
      bd.phaser.ctr.gameScaleFactor = heightWidthObject.width/game.width;
    }
  }
  bd.phaser.ctr.updatePositionForScale();
  game.scale.refresh();
}

bd.phaser.ctr.updatePositionForScale = function() {
  var viewComponentObject = bd.component.lookup(bd.model.getCurrentViewId());
  var componentTypesOnView = viewComponentObject.componentsOnView;
  var component;
  var entityList;
  for(var i=0;i<componentTypesOnView.length; i++) {
    component = bd.component.getComponentByType(componentTypesOnView[i]);
    if(component.componentProperties.shouldUpdatePositionToScale) {
      entityList = bd.model.getEntityList(component.componentProperties.type);
      for(var k=0; k<entityList.length; k++) {
        bd.component.lookup(entityList[k].id).updatePosition()
      }
    }
  }
}

bd.phaser.ctr.touchMoveCallback = function(event) {
  //alert("touchMoveCallback: " + event.clientX + " " + event.clientY);
}

//TODO generalize for all keys and for all preprocessing of blocks
bd.phaser.ctr.findKeysForCapture = function() {
  var keyCodes = {};
  var scriptPages = bd.model.getEntityList("scriptPage");
  for(var i=0, scriptPage; scriptPage = scriptPages[i]; i++) {
    if(!scriptPage.scriptObject.xml || !scriptPage.scriptObject.xml.block) {
      continue;
    }
    if(scriptPage.scriptObject.xml.block.length == null){
      blockList = [scriptPage.scriptObject.xml.block];
    } else {
      blockList = scriptPage.scriptObject.xml.block;
    }
    for(var k=0;k<blockList.length;k++){
      if(blockList[k]._type == "custom_key_pressed_statement") {
        var keyLetter = bd.evaluator.ctr.getTitleTextFromBlock("KEY",blockList[k]);
        var charCode = keyLetter.charCodeAt(0);
        if(!isNaN(charCode)) {
          keyCodes[charCode] = true;
        }
      }
    }
  }
  return keyCodes;

}

bd.phaser.ctr.keyPressedCallback = function(event) {
  bd.evaluator.ctr.keyPressed(event.keyCode);
  bd.evaluator.ctr.customKeyPressed(String.fromCharCode(event.keyCode));
  if(document.activeElement && document.activeElement.nodeName != "INPUT" && document.activeElement.nodeName != "TEXTAREA") {
    event.preventDefault();
  }

}

bd.phaser.ctr.update = function() {
  var player = bd.model.entityLookup(bd.player.ctr.playerId);
  var viewComponentObject = bd.component.lookup(player.viewId);
  var phaserGameObject = viewComponentObject.getPhaserGameObject();
  var phaserObject = viewComponentObject.getPhaserObject();
  var physicsEntityObjects = bd.model.getEntityList("phaserPhysicsPieceInstance");

  for (var i = 0; i < bd.phaser.ctr.compromisedBodies.length; i++) {
    var componentId = bd.phaser.ctr.compromisedBodies[i];
    var componentObject = bd.component.lookup(componentId)
    componentObject.moveToWallCollideSprite();

    bd.phaser.ctr.compromisedBodies.splice(i);
    i--;

  }
  
  for (var i=0;i<physicsEntityObjects.length;i++) {
    var componentObject = bd.component.lookup(physicsEntityObjects[i].id);
    //if the sprite doesn't exist on the screen, then move to the next sprite
    if(componentObject.getDisplayObject() == null) { continue; };

    if(componentObject.getWallCollideSprite() != null){
      var wallCollideSprite = componentObject.getWallCollideSprite();
      if(componentObject.getDisplayObject().x != wallCollideSprite.x || componentObject.getDisplayObject().y != wallCollideSprite.y) {
        //body is compromised

        bd.phaser.ctr.compromisedBodies.push(componentObject.id);
      }
    }

    if(componentObject != null && componentObject.getDisplayObject() != null && componentObject.getDisplayObject().body != null) {
      if (componentObject.model.allowGravity) {
        componentObject.getDisplayObject().body.applyForce(componentObject.model.gravityX, componentObject.model.gravityY);
        if(componentObject.getWallCollideSprite() != null){
          componentObject.getWallCollideSprite().body.applyForce(componentObject.model.gravityX, componentObject.model.gravityY);
        }
      } else {
        componentObject.getDisplayObject().body.gravityScale = 0;
        if(componentObject.getWallCollideSprite() != null){
          componentObject.getWallCollideSprite().body.gravityScale = 0;
        }
      }

      if (componentObject.stopUpwardMovement){
        if (componentObject.getDisplayObject().body.velocity.y < 0){ // body is moving in the direction of the wall top wall
          if (componentObject.model.bounciness == 0){
            componentObject.getDisplayObject().body.velocity.y = 0;
            // set the position of the kinematic body to the position of the dynamic body (extra assurance that it doesn't move through the wall)
            componentObject.getDisplayObject().body.y = componentObject.getWallCollideSprite().y;
          } else {
            componentObject.getDisplayObject().body.velocity.y = -1*(componentObject.getDisplayObject().body.velocity.y) * (componentObject.model.bounciness/100.0);
          }
        }
      }
      if (componentObject.stopRightwardMovement){
        if (componentObject.getDisplayObject().body.velocity.x > 0){ // body is moving in the direction of the right wall
          if (componentObject.model.bounciness == 0){
            componentObject.getDisplayObject().body.velocity.x = 0;
            componentObject.getDisplayObject().body.x = componentObject.getWallCollideSprite().x;
          } else {
            componentObject.getDisplayObject().body.velocity.x = -1*(componentObject.getDisplayObject().body.velocity.x) * (componentObject.model.bounciness/100.0);
          }
        }
      }
      if (componentObject.stopDownwardMovement){
        if (componentObject.getDisplayObject().body.velocity.y > 0){ // body is moving in the direction of the bottom wall
          if (componentObject.model.bounciness == 0){
            componentObject.getDisplayObject().body.velocity.y = 0;
            componentObject.getDisplayObject().body.y = componentObject.getWallCollideSprite().y;
          } else {
            componentObject.getDisplayObject().body.velocity.y = -1*(componentObject.getDisplayObject().body.velocity.y) * (componentObject.model.bounciness/100.0);
          }
        }
      }
      if (componentObject.stopLeftwardMovement){
        if (componentObject.getDisplayObject().body.velocity.x < 0){ // body is moving in the direction of the left wall
          if (componentObject.model.bounciness == 0){
            componentObject.getDisplayObject().body.velocity.x = 0;
            componentObject.getDisplayObject().body.x = componentObject.getWallCollideSprite().x;
          } else {
            componentObject.getDisplayObject().body.velocity.x = -1*(componentObject.getDisplayObject().body.velocity.x) * (componentObject.model.bounciness/100.0);
          }
        }
      }
    }
  }

  // bd.phaser.ctr.checkForEdgeCollisions();
  bd.phaser.ctr.runForeverBlocks();
  //apply damping to objects moving with velocity -- not to be confused with box2dcontact friction
  bd.phaser.ctr.applyFriction();
  bd.phaser.ctr.drawOnSprites();
  bd.phaser.ctr.penDraw();
  bd.phaser.ctr.drawOnStage();
}


bd.phaser.ctr.collisionEndedCallback = function(componentObject1,componentObject2) {
  var collidingIds = bd.phaser.ctr.instanceIdToCollidees[componentObject1.id]
  for(var m=0;m<collidingIds.length;m++) {
    if(collidingIds[m] == componentObject2.id) {
      collidingIds.splice(m,1);
      break;
    }
  }
  if(collidingIds.length == 0) {
    delete bd.phaser.ctr.instanceIdToCollidees[componentObject1.id];
  }
}

bd.phaser.ctr.collisionCallback = function(collidee1,collidee2) {
  var instanceId1 = collidee1.instanceId;
  var instanceId2 = collidee2.instanceId;
  if(bd.phaser.ctr.instanceIdToCollidees[instanceId1] == null) {
    bd.phaser.ctr.instanceIdToCollidees[instanceId1] = [];
  }
  var collisionInstanceIds = bd.phaser.ctr.instanceIdToCollidees[instanceId1];
  var isInstanceId2InArray = false;
  for(var i=0;i<collisionInstanceIds.length;i++) {
    if(collisionInstanceIds[i] == instanceId2) {
      isInstanceId2InArray = true;
      break;
    }
  }
  if(!isInstanceId2InArray) {
    bd.phaser.ctr.instanceIdToCollidees[instanceId1].push(instanceId2);
    //add to things to collide
    bd.evaluator.ctr.onPhaserPhysicsCollision(instanceId1,instanceId2);
  }

}

bd.phaser.ctr.createInputEvent = function(eventType) {
  return (function(pointer){
            bd.phaser.ctr.onInputEvent(eventType,pointer)
          });
}

bd.phaser.ctr.onInputEvent = function(eventType,pointer) {
  var currSprite = pointer.targetObject;
  // if (currSprite && bd.component.lookup(currSprite.sprite.instanceId).drawEnabled){
  //   return;
  // }
  bd.evaluator.ctr.onPointerEvent(pointer.id,eventType);
}

bd.phaser.ctr.runForeverBlocks = function() {
  bd.evaluator.ctr.stackIdsForThisTick = bd.evaluator.ctr.stackIdsForThisTick.concat(bd.evaluator.ctr.stackIdsForNextTick);
  bd.evaluator.ctr.stackIdsForNextTick = [];
  bd.evaluator.ctr.continuePreviousStack();
}


bd.phaser.ctr.applyFriction = function() {
  var physicsEntityObjects = bd.model.getEntityList("phaserPhysicsPieceInstance");
  for(var i=0;i<physicsEntityObjects.length;i++) {
    bd.component.lookup(physicsEntityObjects[i].id).applyFriction();
  }
}

bd.phaser.ctr.findInitialEdgeCollisions = function() {
  var physicsEntityObjects = bd.model.getEntityList("phaserPhysicsPieceInstance");
  var edgeDict;
  for(var i=0, sprite;sprite = physicsEntityObjects[i];i++) {
    edgeDict = bd.component.lookup(sprite.id).isTouchingEdge("DICTIONARY");

    //find edges that the sprite is currently colliding with
    for(var edge in edgeDict) {
      if(bd.phaser.ctr.instanceIdToEdgesTouching[sprite.id] == null) {
        bd.phaser.ctr.instanceIdToEdgesTouching[sprite.id] = {}
      }
      if(bd.phaser.ctr.instanceIdToEdgesTouching[sprite.id][edge] == null) {
        bd.phaser.ctr.instanceIdToEdgesTouching[sprite.id][edge] = true;
      }
    }
  }
}

bd.phaser.ctr.checkForEdgeCollisions = function() {
  bd.evaluator.ctr.runEvalScript = false;
  var physicsEntityObjects = bd.model.getEntityList("phaserPhysicsPieceInstance");
  var edgeDict;
  for(var i=0, sprite;sprite = physicsEntityObjects[i];i++) {
    //component may not exist if on another player's screen
    if(!bd.component.lookup(sprite.id)) { continue; }
    edgeDict = bd.component.lookup(sprite.id).isTouchingEdge("DICTIONARY");
    //remove edges that aren't collided with anymore
    if(bd.phaser.ctr.instanceIdToEdgesTouching[sprite.id] != null) {
      for(var edge in bd.phaser.ctr.instanceIdToEdgesTouching[sprite.id]) {
        if(edgeDict[edge] == null) {
          delete bd.phaser.ctr.instanceIdToEdgesTouching[sprite.id][edge];
        }
      }
    }

    //collide with new edges
    for(var edge in edgeDict) {
      if(bd.phaser.ctr.instanceIdToEdgesTouching[sprite.id] == null) {
        bd.phaser.ctr.instanceIdToEdgesTouching[sprite.id] = {}
      }
      if(bd.phaser.ctr.instanceIdToEdgesTouching[sprite.id][edge] == null) {
        bd.phaser.ctr.instanceIdToEdgesTouching[sprite.id][edge] = true;
        //add collision block to stack
        // bd.evaluator.ctr.onEdgeCollision(sprite.id,edge);
        // bd.evaluator.ctr.onEdgeCollision(sprite.id,"ANY");
      }
    }
  }
  if(bd.evaluator.ctr.runEvalScript){
    bd.evaluator.ctr.initializeStack();
  }
}

bd.phaser.ctr.entityTextToPointerObject = function(entityText) {
  var pointerId = bd.util.removePrefix(entityText,"pointer");
  var game = bd.component.lookup(bd.model.getCurrentViewId()).getPhaserGameObject();
  if (pointerId == "active") {
    if(game.input.activePointer) {
      pointerId = game.input.activePointer.id;
    } else {
      return null;
    }
  }
  if(pointerId == 0) {
    return game.input.mousePointer;
  }
  return game.input.pointers[pointerId - 1];
}

bd.phaser.ctr.getAllPointers = function() {
  var maxPointers = 11;
  var pointers = []
  var game = bd.component.lookup(bd.model.getCurrentViewId()).getPhaserGameObject();
  if(game.input.mousePointer) {
    pointers.push(game.input.mousePointer);
  }
  for(var i=0;i<maxPointers;i++) {
    if(game.input.pointers[i]) {
      pointers.push(game.input.pointers[i]);
    }
  }
  return pointers;
}

bd.phaser.ctr.drawOnStage = function() {
  var player = bd.model.entityLookup(bd.player.ctr.playerId);
  var viewComponentObject = bd.component.lookup(player.viewId);
  var game = viewComponentObject.getPhaserGameObject();

  if (!viewComponentObject.model.backgroundDrawingEnabled) {
    return;
  }

  var allPointers = bd.phaser.ctr.getAllPointers();
  //loop through pointers
  for(var p = 0; p < allPointers.length; p++){
    var pointer = allPointers[p];
    if (!pointer.isDown) {
      bd.phaser.ctr.stagePrevXY[pointer.id] = null;
      continue;
    }
    if (!pointer.withinGame && bd.phaser.ctr.mouseOutXY) {
      //non-mobile
      if (typeof cordova == "undefined") {
        var currXY = bd.phaser.ctr.mouseOutXY;
      //mobile
      } else {
        var currXY = {'x': pointer.clientX, 'y': pointer.clientY};
      }
      var prevXY = bd.phaser.ctr.stagePrevXY[pointer.id];
      bd.phaser.ctr.drawCirclesForLineStage(currXY, prevXY);
      bd.phaser.ctr.stagePrevXY[pointer.id] = currXY;
      bd.phaser.ctr.stageOutside[pointer.id] = true;
    } else if (bd.phaser.ctr.stageOutside[pointer.id]) {
      var currXY = {'x': pointer.x, 'y':pointer.y};
      var prevXY = bd.phaser.ctr.stagePrevXY[pointer.id];
      //non-mobile
      if (typeof cordova == "undefined") {
        bd.phaser.ctr.stagePrevXY[pointer.id] = null;
        bd.phaser.ctr.stageOutside[pointer.id] = false;
        continue;
      }
      bd.phaser.ctr.drawCirclesForLineStage(currXY, prevXY);
      bd.phaser.ctr.stageOutside[pointer.id] = false;
      bd.phaser.ctr.stagePrevXY[pointer.id] = currXY;
    } else {
      var currXY = {'x': pointer.x, 'y':pointer.y};
      var prevXY = bd.phaser.ctr.stagePrevXY[pointer.id];
      if (!prevXY) {
        bd.phaser.ctr.stagePrevXY[pointer.id] = currXY;
        continue;
      }
      bd.phaser.ctr.drawCirclesForLineStage(currXY, prevXY);
      bd.phaser.ctr.stagePrevXY[pointer.id] = currXY;
    }
  }  
}

bd.phaser.ctr.drawCirclesForLineStage = function(currXY, prevXY) {
  var player = bd.model.entityLookup(bd.player.ctr.playerId);
  var viewComponentObject = bd.component.lookup(player.viewId);
  var phaserGameObject = viewComponentObject.getPhaserGameObject();
  var layerId = viewComponentObject.getImageLayerId();
  var layer = viewComponentObject.getLayer(layerId);
  var layerComponent = bd.component.lookup(layerId);
  var bitMapData = layerComponent.getBitMapData();

  //determined number of circles to draw as a linear function of distance;
  var dist = Math.sqrt(Math.pow((currXY['x']-prevXY['x']),2)+Math.pow((currXY['y']-prevXY['y']),2));

  //more distance requires more circles, and more thickness requires less circles
  //1.5 appears to be the minimum scaling factor to get smooth lines
  var incNum = Math.ceil(1.5*dist/viewComponentObject.model.backgroundDrawingThickness);

  var xInc = (currXY['x']-prevXY['x'])/incNum;
  var yInc = (currXY['y']-prevXY['y'])/incNum;

  //draw circles that make up line
  for (var i = 0.0; i<incNum; i++) {
    var x = prevXY['x']+i*xInc;
    var y = prevXY['y']+i*yInc;

    bitMapData.circle(x, y, viewComponentObject.model.backgroundDrawingThickness, viewComponentObject.model.backgroundDrawingColor);
  }
  bitMapData.update();
}

bd.phaser.ctr.drawOnSprites = function() {
  var player = bd.model.entityLookup(bd.player.ctr.playerId);
  var viewComponentObject = bd.component.lookup(player.viewId);
  var game = viewComponentObject.getPhaserGameObject();

  //loop through pointers
  var allPointers = bd.phaser.ctr.getAllPointers();
  
  for(var p = 0; p < allPointers.length; p++){
    var pointer = allPointers[p];
    var currSprite = pointer.targetObject;

    //don't draw
    if (!pointer.isDown) {
      bd.phaser.ctr.currPointerSpriteId[pointer.id] = null;
      bd.phaser.ctr.boundaryCheck[pointer.id] = false;      
      bd.phaser.ctr.lineCompleted[pointer.id] = true;
      bd.phaser.ctr.justOnSprite[pointer.id] = false;
      bd.phaser.ctr.justOutside[pointer.id] = false;
      continue;
    //pointer down but not on a sprite
    } else if (!currSprite && pointer.withinGame) {
      bd.phaser.ctr.boundaryCheck[pointer.id] = true;
      bd.phaser.ctr.lineCompleted[pointer.id] = false;

      //leaving current sprite, finish line
      if (bd.phaser.ctr.justOnSprite[pointer.id]) {
        console.log("leaving sprite");
        var prevSprite = bd.component.lookup(bd.phaser.ctr.currPointerSpriteId[pointer.id]);
        var currXY = bd.phaser.ctr.changeCoordinateSys(pointer.x, pointer.y,
                                 prevSprite.getLocalXY('x'), prevSprite.getLocalXY('y'),
                                 prevSprite.model.width / 2.0, prevSprite.model.height / 2.0);
        var prevXY = bd.phaser.ctr.prevXY[pointer.id];
        bd.phaser.ctr.leavingSprite(prevSprite, pointer, currXY, prevXY);
      }
      bd.phaser.ctr.justOnSprite[pointer.id] = false;
      bd.phaser.ctr.justOutside[pointer.id] = false;
      bd.phaser.ctr.currPointerSpriteId[pointer.id] = null;
      continue;
    //pointer leaving game, finish line
    } else if (!pointer.withinGame && !bd.phaser.ctr.justOutside[pointer.id]) {
      console.log("outside game");
      //if leaving game but not on sprite
      if (!currSprite) {
        bd.phaser.ctr.justOutside[pointer.id] = true;
        bd.phaser.ctr.justOnSprite[pointer.id] = false;
        bd.phaser.ctr.boundaryCheck[pointer.id] = false;
        continue;
      }
      var sprite = bd.component.lookup(currSprite.sprite.instanceId);
      //non-mobile
      if (typeof cordova == "undefined") {
        var currXY = bd.phaser.ctr.changeCoordinateSys(bd.phaser.ctr.mouseOutXY.x, bd.phaser.ctr.mouseOutXY.y,
                                 sprite.getLocalXY('x'), sprite.getLocalXY('y'),
                                 sprite.model.width / 2.0, sprite.model.height / 2.0);
      //mobile
      } else {
        var currXY = bd.phaser.ctr.changeCoordinateSys(pointer.clientX, pointer.clientY,
                                 sprite.getLocalXY('x'), sprite.getLocalXY('y'),
                                 sprite.model.width / 2.0, sprite.model.height / 2.0);
      }
      var prevXY = bd.phaser.ctr.prevXY[pointer.id];
      bd.phaser.ctr.outsideGame(sprite, pointer, currXY, prevXY, "prev");
      bd.phaser.ctr.justOutside[pointer.id] = true;
      bd.phaser.ctr.justOnSprite[pointer.id] = false;
      continue;
    //pointer still outside
    } else if (!pointer.withinGame && bd.phaser.ctr.justOutside[pointer.id]) {
      //if left game but not on sprite
      if (!currSprite) {
        continue;
      }
      var sprite = bd.component.lookup(currSprite.sprite.instanceId);
      bd.phaser.ctr.outXY[pointer.id] = {'x':pointer.clientX, 'y':pointer.clientY};
      continue;
    //pointer on drawing-disabled sprite
    } else if (currSprite && !bd.component.lookup(currSprite.sprite.instanceId).model.drawingEnabled) {
      var sprite = bd.component.lookup(currSprite.sprite.instanceId);
      bd.phaser.ctr.currPointerSpriteId[pointer.id] = sprite.id;
      bd.phaser.ctr.prevXY[pointer.id] = bd.phaser.ctr.changeCoordinateSys(pointer.x, pointer.y,
                                 sprite.getLocalXY('x'), sprite.getLocalXY('y'),
                                 sprite.model.width / 2.0, sprite.model.height / 2.0);
      bd.phaser.ctr.boundaryCheck[pointer.id] = false;
      bd.phaser.ctr.lineCompleted[pointer.id] = false;
      bd.phaser.ctr.justOnSprite[pointer.id] = false;
      continue;
    }

    //setup for drawing
    var sprite = bd.component.lookup(currSprite.sprite.instanceId);
    if (!bd.phaser.ctr.currPointerSpriteId[pointer.id]) {
      bd.phaser.ctr.currPointerSpriteId[pointer.id] = sprite.id;
    }

    var currXY = bd.phaser.ctr.changeCoordinateSys(pointer.x, pointer.y,
                                 sprite.getLocalXY('x'), sprite.getLocalXY('y'),
                                 sprite.model.width / 2.0, sprite.model.height / 2.0);
    var prevXY = bd.phaser.ctr.prevXY[pointer.id];

    //rotate current and previous points
    var currRotated = bd.phaser.ctr.rotatePoint(currXY['x'], currXY['y'], sprite.model.width/2.0, sprite.model.height/2.0, sprite.getDisplayObject().rotation, 'CCW');
    var prevRotated = bd.phaser.ctr.rotatePoint(prevXY['x'], prevXY['y'], sprite.model.width/2.0, sprite.model.height/2.0, sprite.getDisplayObject().rotation, 'CCW');

    //draw
    if (bd.phaser.ctr.boundaryCheck[pointer.id]) {
      bd.phaser.ctr.boundaryCheck(sprite, pointer, currRotated, prevRotated);
      bd.phaser.ctr.boundaryCheck[pointer.id] = false;
      console.log("boundary check");
    } else if (bd.phaser.ctr.currPointerSpriteId[pointer.id] != sprite.id) {
      bd.phaser.ctr.overlappingSprites(sprite, pointer, currXY, prevXY);
      bd.phaser.ctr.currPointerSpriteId[pointer.id] = sprite.id;
      console.log("overlapping sprites");
    } else if (bd.phaser.ctr.justOutside[pointer.id] && pointer.withinGame) {
      bd.phaser.ctr.justOutside[pointer.id] = false;
      bd.phaser.ctr.justOnSprite[pointer.id] = true;
      //can only complete line going into game for mobile
      //because phaser does not keep track of pointer location outside of the game when on the computer
      if (typeof cordova != "undefined") {
        prevXY = bd.phaser.ctr.changeCoordinateSys(bd.phaser.ctr.outXY[pointer.id]['x'], bd.phaser.ctr.outXY[pointer.id]['y'],
                                 sprite.getLocalXY('x'), sprite.getLocalXY('y'),
                                 sprite.model.width / 2.0, sprite.model.height / 2.0);
        bd.phaser.ctr.outsideGame(sprite, pointer, currXY, prevXY, "curr");
      }
      console.log("justOutside")
    } else {
      if (bd.phaser.ctr.lineCompleted[pointer.id]) {
        bd.phaser.ctr.prevXY[pointer.id] = currXY;
        bd.phaser.ctr.lineCompleted[pointer.id] = false;
        console.log("line completed");
        continue;
      }
      //regular draw
      bd.phaser.ctr.justOnSprite[pointer.id] = true;
      var bitMapData = bd.phaser.ctr.getBitMapData(sprite);
      var newBitMapData = bd.phaser.ctr.drawCirclesForLine(sprite, bitMapData, pointer, prevRotated['x'], prevRotated['y'], currRotated['x'], currRotated['y']);
      bd.phaser.ctr.bitMaps[sprite.id] = newBitMapData;
    }
    bd.phaser.ctr.prevXY[pointer.id] = currXY;
  }

  //update bitmaps and sprite
  for (var id in bd.phaser.ctr.bitMaps) {
    var sprite = bd.component.lookup(id);
    var phaserSprite = sprite.getDisplayObject();
    var assetId = bd.component.lookup(sprite.model.costumeId).model.assetId;
    var asset = bd.component.lookup(assetId);
    bd.phaser.ctr.bitMaps[id].update();
    asset.setBitMapData(sprite.id, bd.phaser.ctr.bitMaps[id]);
    phaserSprite.loadTexture(bd.phaser.ctr.bitMaps[id]);
    sprite.setWidthHeight();
  }

  //reset bitmaps for next update
  bd.phaser.ctr.bitMaps = {};
}

//get bitmap ro sprite either from bitmaps dictionary or if not in dictionary, from asset of sprite
bd.phaser.ctr.getBitMapData = function(sprite) {
  var bitMapData;
  if (sprite.id in bd.phaser.ctr.bitMaps) {
    bitMapData = bd.phaser.ctr.bitMaps[sprite.id];
  } else {
    var phaserSprite = sprite.getDisplayObject();
    //console.log(sprite.model.costumeId);
    var assetId = bd.component.lookup(sprite.model.costumeId).model.assetId;
    var asset = bd.component.lookup(assetId);

    bitMapData = asset.getBitMapData(sprite.id);
    if (!bitMapData){
      asset.createBitMapData(sprite.id, phaserSprite.width, phaserSprite.height);
      bitMapData = asset.getBitMapData(sprite.id);
    }
  }
  return bitMapData;
}

bd.phaser.ctr.drawCirclesForLine = function(sprite, bitMapData, pointer, currX, currY, prevX, prevY) {

  //determined number of circles to draw as a linear function of distance;
  var dist = Math.sqrt(Math.pow((currX-prevX),2)+Math.pow((currY-prevY),2));

  //more distance requires more circles, and more thickness requires less circles
  //1.5 appears to be the minimum scaling factor to get smooth lines
  var incNum = Math.ceil(1.5*dist/sprite.model.drawingThickness);

  var xInc = (currX-prevX)/incNum;
  var yInc = (currY-prevY)/incNum;

  //draw circles that make up line
  for (var i = 0.0; i<incNum; i++) {
    var x = prevX+i*xInc;
    var y = prevY+i*yInc;

    bitMapData.circle(x, y, sprite.model.drawingThickness, sprite.model.drawingColor);
  }

  return bitMapData;
}

bd.phaser.ctr.rotatePoint = function(x, y, cx, cy, theta, direction) {
  var matrix = math.matrix([x,y]);
  var originMatrix = math.matrix([cx, cy]);

  if (direction == 'CCW') {
    var rotationMatrix = math.matrix([[Math.cos(theta),-1.0*Math.sin(theta)],[Math.sin(theta),Math.cos(theta)]]);
  } else {
    var rotationMatrix = math.matrix([[Math.cos(theta),Math.sin(theta)],[-1.0*Math.sin(theta),Math.cos(theta)]]);
  }
  
  var matrixRotated = math.add(math.multiply(math.subtract(matrix, originMatrix),rotationMatrix), originMatrix);

  var xRotated = math.subset(matrixRotated, math.index(0));
  var yRotated = math.subset(matrixRotated, math.index(1));

  return {'x': xRotated, 'y': yRotated};
}

bd.phaser.ctr.changeCoordinateSys = function(prevX, prevY, prevCX, prevCY, currCX, currCY) {
  var dx = prevX - prevCX;
  var dy = prevY - prevCY;
  var currX = dx + currCX;
  var currY = dy + currCY;
  return {'x': currX, 'y': currY};
}

//complete line leaving from or returning to game
//endOfLine is either "prev" or "curr", repending on leaving or returning
bd.phaser.ctr.outsideGame = function(sprite, pointer, currXY, prevXY, endOfLine) {
  var player = bd.model.entityLookup(bd.player.ctr.playerId);
  var viewComponentObject = bd.component.lookup(player.viewId);

  var phaserSprite = sprite.getDisplayObject();

  var globalCurrXY = bd.phaser.ctr.changeCoordinateSys(currXY['x'], currXY['y'], 
                                    sprite.model.width / 2.0, sprite.model.height / 2.0,
                                    sprite.getLocalXY('x'), sprite.getLocalXY('y'));
  var globalPrevXY = bd.phaser.ctr.changeCoordinateSys(prevXY['x'], prevXY['y'], 
                                    sprite.model.width / 2.0, sprite.model.height / 2.0,
                                    sprite.getLocalXY('x'), sprite.getLocalXY('y'));

  //get equation from curr to prev points
  var equation = function(solveFor) {
    var m = (globalCurrXY['y']-globalPrevXY['y'])/(globalCurrXY['x']-globalPrevXY['x']);
    if(!isFinite(m)) {
      var equationFunction = function(xy) {
        return globalCurrXY['x'];
      }
    } else if (solveFor == 'y') {
      var equationFunction = function(x) {
        return m*x-m*globalCurrXY['x']+globalCurrXY['y'];
      }
    } else {
      var equationFunction = function(y) {
        return y/m-globalCurrXY['y']/m+globalCurrXY['x'];
      }
    }
    return equationFunction;
  }

  //check if equation crosses boundary
  var isRelevantBoundary = function(boundary, equationFunction, boundaryMin, boundaryMax, equationMin, equationMax) {
    if (boundary >= equationMin && boundary <= equationMax && 
        equationFunction(boundary) >= boundaryMin && equationFunction(boundary) <= boundaryMax) {
      return true;
    }
    return false;
  }

  //define boundary lines
  var topBoundaryY = 0;
  var bottomBoundaryY = viewComponentObject.getPlayerViewHeightWidth().height;
  var leftBoundaryX = 0;
  var rightBoundaryX = viewComponentObject.getPlayerViewHeightWidth().width;

  //find max and min from prevXY and currXY
  var maxX = Math.max(globalCurrXY['x'], globalPrevXY['x']);
  var minX = Math.min(globalCurrXY['x'], globalPrevXY['x']);
  var maxY = Math.max(globalCurrXY['y'], globalPrevXY['y']);
  var minY = Math.min(globalCurrXY['y'], globalPrevXY['y']);

  //boundary check
  if (isRelevantBoundary(topBoundaryY, equation('x'), leftBoundaryX, rightBoundaryX, minY, maxY)) {
    var globalBoundaryX = equation('x')(topBoundaryY);
    var globalBoundaryY = topBoundaryY;
    console.log("top");
  } else if (isRelevantBoundary(bottomBoundaryY, equation('x'), leftBoundaryX, rightBoundaryX, minY, maxY)) {
    var globalBoundaryX = equation('x')(bottomBoundaryY);
    var globalBoundaryY = bottomBoundaryY;
    console.log("bottom");
  } else if (isRelevantBoundary(leftBoundaryX, equation('y'), topBoundaryY, bottomBoundaryY, minX, maxX)) {
    var globalBoundaryX = leftBoundaryX;
    var globalBoundaryY = equation('y')(leftBoundaryX);
    console.log("left");
  } else {
    var globalBoundaryX = rightBoundaryX;
    var globalBoundaryY = equation('y')(rightBoundaryX);
    console.log("right");
  }

  var globalBoundaryXY = {'x': globalBoundaryX, 'y': globalBoundaryY};

  //convert boundaryXY to current sprite
  var spriteBoundaryXY = bd.phaser.ctr.changeCoordinateSys(globalBoundaryXY['x'], globalBoundaryXY['y'],
                                                         sprite.getLocalXY('x'), sprite.getLocalXY('y'),
                                                         sprite.model.width / 2.0, sprite.model.height / 2.0);        

  //rotate points for drawing on curr sprite
  var prevRotated = bd.phaser.ctr.rotatePoint(prevXY['x'], prevXY['y'], sprite.model.width/2.0, sprite.model.height/2.0, sprite.getDisplayObject().rotation, 'CCW');
  var currRotated = bd.phaser.ctr.rotatePoint(currXY['x'], currXY['y'], sprite.model.width/2.0, sprite.model.height/2.0, sprite.getDisplayObject().rotation, 'CCW');
  var spriteBoundaryRotated = bd.phaser.ctr.rotatePoint(spriteBoundaryXY['x'], spriteBoundaryXY['y'], sprite.model.width/2.0, sprite.model.height/2.0, sprite.getDisplayObject().rotation, 'CCW');
  var bitMapData = bd.phaser.ctr.getBitMapData(sprite);
  if (endOfLine == 'prev') {
    var newBitMapData = bd.phaser.ctr.drawCirclesForLine(sprite, bitMapData, pointer, spriteBoundaryRotated['x'], spriteBoundaryRotated['y'], prevRotated['x'], prevRotated['y']);
  } else {
    var newBitMapData = bd.phaser.ctr.drawCirclesForLine(sprite, bitMapData, pointer, spriteBoundaryRotated['x'], spriteBoundaryRotated['y'], currRotated['x'], currRotated['y']);
  }
  bd.phaser.ctr.bitMaps[sprite.id] = newBitMapData;
}

//for drawing into a sprite
bd.phaser.ctr.boundaryCheck = function(sprite, pointer, currRotated, prevRotated){
  console.log('boundary check');

  //define boundaries
  var topBoundaryY = 0;
  var bottomBoundaryY = sprite.model.height;
  var leftBoundaryX = 0;
  var rightBoundaryX = sprite.model.width;

  //loop through pointer's history (only kept when pointer down)
  for (var i = pointer._history.length-1; i>-1; i--){
    //get histXY relative to sprite
    var histXY = bd.phaser.ctr.changeCoordinateSys(pointer._history[i].x, pointer._history[i].y,
                                                   sprite.getLocalXY('x'), sprite.getLocalXY('y'),
                                                   sprite.model.width / 2.0, sprite.model.height / 2.0);            

    var histRotated = bd.phaser.ctr.rotatePoint(histXY['x'], histXY['y'], sprite.model.width/2.0, sprite.model.height/2.0, sprite.getDisplayObject().rotation, 'CCW');

    //slope and interceipt for current pointer location and history point
    var slope = (currRotated['y'] - histRotated['y'])/(currRotated['x'] - histRotated['x']);
    var intercept = -1.0*slope*currRotated['x']+currRotated['y'];

    //determine relevant boundary
    if (histRotated['x'] > rightBoundaryX){
      prevRotated['x'] = rightBoundaryX;
      prevRotated['y'] = slope*prevRotated['x']+intercept;
      console.log('right');
      break;
    } else if (histRotated['x'] < leftBoundaryX){
      prevRotated['x'] = leftBoundaryX;
      prevRotated['y'] = slope*prevRotated['x']+intercept;
      console.log('left');
      break;
    } else if (histRotated['y'] < topBoundaryY ){
      prevRotated['y'] = topBoundaryY;
      prevRotated['x'] = (prevRotated['y']-intercept)/slope;
      //check vertical line (infinite slope) case
      if (!isFinite(slope)){
        prevRotated['x'] = currRotated['x'];
      }
      console.log('top');
      break;
    } else if (histRotated['y'] > bottomBoundaryY){
      prevRotated['y'] = bottomBoundaryY;
      prevRotated['x'] = (prevRotated['y']-intercept)/slope;
      if (!isFinite(slope)){
        prevRotated['x'] = currRotated['x'];
      }
      console.log('bottom');
      break;
    }
  }
  var bitMapData = bd.phaser.ctr.getBitMapData(sprite);
  var newBitMapData = bd.phaser.ctr.drawCirclesForLine(sprite, bitMapData, pointer, currRotated['x'], currRotated['y'], prevRotated['x'], prevRotated['y']);
  bd.phaser.ctr.bitMaps[sprite.id] = newBitMapData;
}

bd.phaser.ctr.overlappingSprites = function(sprite, pointer, currXY, prevXY) {
  var prevSpriteId = bd.phaser.ctr.currPointerSpriteId[pointer.id];
  var prevSprite = bd.component.lookup(prevSpriteId);
  var phaserSprite = sprite.getDisplayObject();

  var globalCurrXY = bd.phaser.ctr.changeCoordinateSys(currXY['x'], currXY['y'], 
                                    sprite.model.width / 2.0, sprite.model.height / 2.0,
                                    sprite.getLocalXY('x'), sprite.getLocalXY('y'));
  var globalPrevXY = bd.phaser.ctr.changeCoordinateSys(prevXY['x'], prevXY['y'], 
                                    prevSprite.model.width / 2.0, prevSprite.model.height / 2.0,
                                    prevSprite.getLocalXY('x'), prevSprite.getLocalXY('y'));

  //find which sprite is on top
  var topSprite = prevSprite.getDisplayObject().z > phaserSprite.z ? prevSprite : sprite;

  // rotate curr and prevpoints to topSprite
  var topTheta = topSprite.getDisplayObject().rotation;
  var globalCurrRotated = bd.phaser.ctr.rotatePoint(globalCurrXY['x'], globalCurrXY['y'], topSprite.getLocalXY('x'), topSprite.getLocalXY('y'), topTheta, 'CCW');
  var globalPrevRotated = bd.phaser.ctr.rotatePoint(globalPrevXY['x'], globalPrevXY['y'], topSprite.getLocalXY('x'), topSprite.getLocalXY('y'), topTheta, 'CCW');

  //get equation from curr to prev points
  var equation = function(solveFor) {
    var m = (globalCurrRotated['y']-globalPrevRotated['y'])/(globalCurrRotated['x']-globalPrevRotated['x']);
    if(!isFinite(m)) {
      var equationFunction = function(xy) {
        return globalCurrRotated['x'];
      }
    } else if (solveFor == 'y') {
      var equationFunction = function(x) {
        return m*x-m*globalCurrRotated['x']+globalCurrRotated['y'];
      }
    } else {
      var equationFunction = function(y) {
        return y/m-globalCurrRotated['y']/m+globalCurrRotated['x'];
      }
    }
    return equationFunction;
  }

  //check if equation crosses boundary
  var isRelevantBoundary = function(boundary, equationFunction, boundaryMin, boundaryMax, equationMin, equationMax) {
    if (boundary >= equationMin && boundary <= equationMax && 
        equationFunction(boundary) >= boundaryMin && equationFunction(boundary) <= boundaryMax) {
      return true;
    }
    return false;
  }

  //define boundary lines
  var topBoundaryY = topSprite.getLocalXY('y')-topSprite.model.height/2.0;
  var bottomBoundaryY = topSprite.getLocalXY('y')+topSprite.model.height/2.0;
  var leftBoundaryX = topSprite.getLocalXY('x')-topSprite.model.width/2.0;
  var rightBoundaryX = topSprite.getLocalXY('x')+topSprite.model.width/2.0;

  //find max and min from prevXY and currXY
  var maxX = Math.max(globalCurrRotated['x'], globalPrevRotated['x']);
  var minX = Math.min(globalCurrRotated['x'], globalPrevRotated['x']);
  var maxY = Math.max(globalCurrRotated['y'], globalPrevRotated['y']);
  var minY = Math.min(globalCurrRotated['y'], globalPrevRotated['y']);

  //boundary check
  if (isRelevantBoundary(topBoundaryY, equation('x'), leftBoundaryX, rightBoundaryX, minY, maxY)) {
    var globalBoundaryRotatedX = equation('x')(topBoundaryY);
    var globalBoundaryRotatedY = topSprite.getLocalXY('y')-topSprite.model.height/2.0;
    console.log("top");
  } else if (isRelevantBoundary(bottomBoundaryY, equation('x'), leftBoundaryX, rightBoundaryX, minY, maxY)) {
    var globalBoundaryRotatedX = equation('x')(bottomBoundaryY);
    var globalBoundaryRotatedY = topSprite.getLocalXY('y')+topSprite.model.height/2.0;
    console.log("bottom");
  } else if (isRelevantBoundary(leftBoundaryX, equation('y'), topBoundaryY, bottomBoundaryY, minX, maxX)) {
    var globalBoundaryRotatedX = topSprite.getLocalXY('x')-topSprite.model.width/2.0;
    var globalBoundaryRotatedY = equation('y')(leftBoundaryX);
    console.log("left");
  } else {
    var globalBoundaryRotatedX = topSprite.getLocalXY('x')+topSprite.model.width/2.0;
    var globalBoundaryRotatedY = equation('y')(rightBoundaryX);
    console.log("right");
  }

  //rotate globalprev points back to default
  var globalBoundaryXY = bd.phaser.ctr.rotatePoint(globalBoundaryRotatedX, globalBoundaryRotatedY, topSprite.getLocalXY('x'), topSprite.getLocalXY('y'), topSprite.getDisplayObject().rotation, 'CW');

  //convert boundaryXY to current sprite
  var currSpriteBoundaryXY = bd.phaser.ctr.changeCoordinateSys(globalBoundaryXY['x'], globalBoundaryXY['y'],
                                                         sprite.getLocalXY('x'), sprite.getLocalXY('y'),
                                                         sprite.model.width / 2.0, sprite.model.height / 2.0);
  bd.phaser.ctr.prevXY[pointer.id] = currSpriteBoundaryXY;

  //convert boundaryXY to previous sprite
  var prevSpriteBoundaryXY = bd.phaser.ctr.changeCoordinateSys(globalBoundaryXY['x'], globalBoundaryXY['y'],
                                                         prevSprite.getLocalXY('x'), prevSprite.getLocalXY('y'),
                                                         prevSprite.model.width / 2.0, prevSprite.model.height / 2.0);            

  //rotate points for drawing on previous sprite
  if (prevSprite.model.drawingEnabled) {
    var prevSpritePrevRotated = bd.phaser.ctr.rotatePoint(prevXY['x'], prevXY['y'], prevSprite.model.width/2.0, prevSprite.model.height/2.0, prevSprite.getDisplayObject().rotation, 'CCW');
    var prevSpriteBoundaryRotated = bd.phaser.ctr.rotatePoint(prevSpriteBoundaryXY['x'], prevSpriteBoundaryXY['y'], prevSprite.model.width/2.0, prevSprite.model.height/2.0, prevSprite.getDisplayObject().rotation, 'CCW');
    bitMapData = bd.phaser.ctr.getBitMapData(prevSprite);
    newBitMapData = bd.phaser.ctr.drawCirclesForLine(prevSprite, bitMapData, pointer, prevSpritePrevRotated['x'], prevSpritePrevRotated['y'], prevSpriteBoundaryRotated['x'], prevSpriteBoundaryRotated['y']);
    bd.phaser.ctr.bitMaps[prevSprite.id] = newBitMapData;
  }

  //rotate points for drawing on curr sprite
  var currSpriteCurrRotated = bd.phaser.ctr.rotatePoint(currXY['x'], currXY['y'], sprite.model.width/2.0, sprite.model.height/2.0, sprite.getDisplayObject().rotation, 'CCW');
  var currSpriteBoundaryRotated = bd.phaser.ctr.rotatePoint(currSpriteBoundaryXY['x'], currSpriteBoundaryXY['y'], sprite.model.width/2.0, sprite.model.height/2.0, sprite.getDisplayObject().rotation, 'CCW');
  var bitMapData = bd.phaser.ctr.getBitMapData(sprite);
  var newBitMapData = bd.phaser.ctr.drawCirclesForLine(sprite, bitMapData, pointer, currSpriteBoundaryRotated['x'], currSpriteBoundaryRotated['y'], currSpriteCurrRotated['x'], currSpriteCurrRotated['y']);
  bd.phaser.ctr.bitMaps[sprite.id] = newBitMapData;
}

//for drawing out of a sprite
bd.phaser.ctr.leavingSprite = function(sprite, pointer, currXY, prevXY) {
  var phaserSprite = sprite.getDisplayObject();

  // rotate curr and prevpoints to topSprite
  var theta = phaserSprite.rotation;
  var currRotated = bd.phaser.ctr.rotatePoint(currXY['x'], currXY['y'], sprite.model.width/2.0, sprite.model.height/2.0, theta, 'CCW');
  var prevRotated = bd.phaser.ctr.rotatePoint(prevXY['x'], prevXY['y'], sprite.model.width/2.0, sprite.model.height/2.0, theta, 'CCW');

  //get equation from curr to prev points
  var equation = function(solveFor) {
    var m = (currRotated['y']-prevRotated['y'])/(currRotated['x']-prevRotated['x']);
    if(!isFinite(m)) {
      var equationFunction = function(xy) {
        return currRotated['x'];
      }
    } else if (solveFor == 'y') {
      var equationFunction = function(x) {
        return m*x-m*currRotated['x']+currRotated['y'];
      }
    } else {
      var equationFunction = function(y) {
        return y/m-currRotated['y']/m+currRotated['x'];
      }
    }
    return equationFunction;
  }

  //check if equation crosses boundary
  var isRelevantBoundary = function(boundary, equationFunction, boundaryMin, boundaryMax, equationMin, equationMax) {
    if (boundary >= equationMin && boundary <= equationMax && 
        equationFunction(boundary) >= boundaryMin && equationFunction(boundary) <= boundaryMax) {
      return true;
    }
    return false;
  }

  //define boundary lines
  var topBoundaryY = 0;
  var bottomBoundaryY = sprite.model.height;
  var leftBoundaryX = 0;
  var rightBoundaryX = sprite.model.width;

  //find max and min from prevXY and currXY
  var maxX = Math.max(currRotated['x'], prevRotated['x']);
  var minX = Math.min(currRotated['x'], prevRotated['x']);
  var maxY = Math.max(currRotated['y'], prevRotated['y']);
  var minY = Math.min(currRotated['y'], prevRotated['y']);

  //boundary check
  if (isRelevantBoundary(topBoundaryY, equation('x'), leftBoundaryX, rightBoundaryX, minY, maxY)) {
    var boundaryRotatedX = equation('x')(topBoundaryY);
    var boundaryRotatedY = 0;
    console.log("top");
  } else if (isRelevantBoundary(bottomBoundaryY, equation('x'), leftBoundaryX, rightBoundaryX, minY, maxY)) {
    var boundaryRotatedX = equation('x')(bottomBoundaryY);
    var boundaryRotatedY = sprite.model.height;
    console.log("bottom");
  } else if (isRelevantBoundary(leftBoundaryX, equation('y'), topBoundaryY, bottomBoundaryY, minX, maxX)) {
    var boundaryRotatedX = 0;
    var boundaryRotatedY = equation('y')(leftBoundaryX);
    console.log("left");
  } else {
    var boundaryRotatedX = sprite.model.width;
    var boundaryRotatedY = equation('y')(rightBoundaryX);
    console.log("right");
  }

  var boundaryRotated = {'x': boundaryRotatedX, 'y': boundaryRotatedY};
  var bitMapData = bd.phaser.ctr.getBitMapData(sprite);
  var newBitMapData = bd.phaser.ctr.drawCirclesForLine(sprite, bitMapData, pointer, prevRotated['x'], prevRotated['y'], boundaryRotated['x'], boundaryRotated['y']);
  bd.phaser.ctr.bitMaps[sprite.id] = newBitMapData;
}

bd.phaser.ctr.penDraw = function() {
  var physicsEntityObjects = bd.model.getEntityList("phaserPhysicsPieceInstance");
  for(var i=0; i < physicsEntityObjects.length; i++) {
    var sprite = bd.component.lookup(physicsEntityObjects[i].id);
    if (sprite.model.playerId && sprite.model.penEnabled) {
      if (sprite.id in bd.phaser.ctr.penPrevXY) {
        bd.phaser.ctr.drawCirclesForLinePen(sprite,
                                            sprite.getLocalXY('x'), sprite.getLocalXY('y'),
                                            bd.phaser.ctr.penPrevXY[sprite.id]['x'], bd.phaser.ctr.penPrevXY[sprite.id]['y']);
      }
      bd.phaser.ctr.penPrevXY[sprite.id] = {'x': sprite.getLocalXY('x'), 'y': sprite.getLocalXY('y')};
    }
  }
}

bd.phaser.ctr.drawCirclesForLinePen = function(sprite, currX, currY, prevX, prevY) {
  var player = bd.model.entityLookup(bd.player.ctr.playerId);
  var viewComponentObject = bd.component.lookup(player.viewId);
  var phaserGameObject = viewComponentObject.getPhaserGameObject();
  var layerId = viewComponentObject.getImageLayerId();
  var layer = viewComponentObject.getLayer(layerId);
  var layerComponent = bd.component.lookup(layerId);
  var bitMapData = layerComponent.getBitMapData();

  //determined number of circles to draw as a linear function of distance;
  var dist = Math.sqrt(Math.pow((currX-prevX),2.0)+Math.pow((currY-prevY),2.0));

  //more distance requires more circles, and more thickness requires less circles
  //1.5 appears to be the minimum scaling factor to get smooth lines
  var penThickness = sprite.model.penThickness || 1.0;
  var incNum = 10.0*dist/penThickness;

  var xInc = (currX-prevX)/incNum;
  var yInc = (currY-prevY)/incNum;

  //draw circles that make up line
  for (var i = 0.0; i<incNum; i++) {
    var x = prevX+i*xInc;
    var y = prevY+i*yInc;

    bitMapData.circle(x, y, penThickness, sprite.model.penColor);
  }
  bitMapData.update();
}
