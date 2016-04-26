goog.provide('bd.model');

goog.require('bd.component_reqs')

bd.model.staticUrl = "/static/";
bd.model.currentGame = null;
bd.model.emptyScript = "<xml></xml>";
bd.model.nullBlockString = "nullObject";
bd.model.getImagePath = function() {
  return bd.model.staticUrl + 'images/buttons/'
}

bd.model.getUploadUrl = function() {
  var uploadUrl = document.getElementById("uploadUrl").innerHTML;
  if(uploadUrl != "") {
    return uploadUrl;
  } else {
    return bd.model.staticUrl;
  }
}

bd.model.populateModels = function(){

  bd.model.entitiesWithPlayerInstances = [
    {entityName:"pieceInstances",entityObject:bd.component.pieceInstance.constructor},
    {entityName:"phaserPieceInstances",entityObject:bd.component.phaserPieceInstance.constructor},
    {entityName:"phaserPhysicsPieceInstances",entityObject:bd.component.phaserPhysicsPieceInstance.constructor},
    {entityName:"physicsRectangleInstances",entityObject:bd.component.physicsRectangleInstance.constructor},
    {entityName:"targets",entityObject:bd.component.target.constructor},
    {entityName:"labelInstances",entityObject:bd.component.labelInstance.constructor},
    {entityName:"videoInstances",entityObject:bd.component.videoInstance.constructor},
    {entityName:"textInputInstances",entityObject:bd.component.textInputInstance.constructor},
    {entityName:"richTextInputInstances",entityObject:bd.component.richTextInputInstance.constructor},
    {entityName:"spreadsheetTypes",entityObject:bd.model.SpreadsheetType},
    {entityName:"gridInstances",entityObject:bd.component.gridInstance.constructor},
    {entityName:"tableInstances",entityObject:bd.component.tableInstance.constructor},
    {entityName:"timerInstances",entityObject:bd.component.timerInstance.constructor},
    {entityName:"tableGridInstances",entityObject:bd.component.tableGridInstance.constructor},
    {entityName:"mapInstances",entityObject:bd.component.mapInstance.constructor}
  ];
}
bd.model.types = [{key:"value",name:"Value"},
                  {key:"boolean",name:"Boolean"},
                  //{key:"piece"},
                  {key:"color",name:"Color"},
                  {key:"phaserPhysicsPiece"},
                  //{key:"phaserPiece"},
                  //{key:"grid"},
                  //{key:"gridTile"},
                  //{key:"physicsRectangle"},
                  //{key:"path"},
                  {key:"label"},
                  //{key:"playerClass"},
                  //{key:"table"}, //***//
                  //{key:"video"},
                  //{key:"player"},
                  {key:"list",name:"List"}];


bd.model.typeKeyToTypeObject = {};
bd.model.entityChildNameToParentName = {"pieceInstance":"piece",
                                        "physicsRectangleInstance":"physicsRectangle",
                                        "target":"path",
                                        "labelInstance":"label",
                                        "videoInstance":"videoType",
                                        //"tableInstance":"table", //***//
                                        "phaserPieceInstance":"phaserPiece",
                                        "phaserPhysicsPieceInstance":"phaserPhysicsPiece"};
bd.model.entityParentNameToChildName = {};


for(var i=0;i<bd.model.types.length;i++){
  bd.model.typeKeyToTypeObject[bd.model.types[i].key] = bd.model.types[i];
}

bd.model.getTypeNameFromModelTypeKey = function(modelTypeKey) {
  var typeObject = bd.model.typeKeyToTypeObject[modelTypeKey];
  if(typeObject.name) {
    return typeObject.name
  } else {
    var component = bd.component.typeNameToComponent[modelTypeKey];
    return component.componentProperties.typeName;
  }
}

for(var childName in bd.model.entityChildNameToParentName){
	bd.model.entityParentNameToChildName[bd.model.entityChildNameToParentName[childName]] = childName;
}

bd.model.getUrlFromUrlObject = function(urlObject){
	var url = (urlObject.internal ? bd.model.staticUrl + urlObject.url: urlObject.url);
	return url;
}


bd.model.createNewEntity = function(entity,opt_type){

	if(bd.isServer || !bd.inPlayer){
		entity.id = bd.model.getCurrentGame().nextId++;
	} else {
		var playerId = bd.model.getPlayerId()
		if(playerId == null){
			if(opt_type == "player"){
				entity.id = uuid.v4();
			} else {
				throw "Error: No player Id defined"
			}

		} else {

			entity.id = bd.model.getPlayerId() + "_" + bd.entityLookup[bd.model.getPlayerId()].nextId;
			bd.entityLookup[bd.model.getPlayerId()].nextId++;
		}
	}

	if(!bd.inPlayer && !bd.isServer && (bd.preview.ctr.creatingInstance || bd.preview.ctr.creatingPreviewPlayer)){
		bd.preview.ctr.previewEntityLookup[entity.id] = entity;
	} else {
		bd.entityLookup[entity.id] = entity;
	}

}


bd.model.removeBlockReferrer = function(entityIdWithScripts,blockId,titleName,blockEntityValue){
	var entityBlockReferrals = bd.model.entityLookup(blockEntityValue).blockReferrers[entityIdWithScripts];
	var referrerTitleNameArray = entityBlockReferrals[blockId];
	if(referrerTitleNameArray != null){
		for(var i=0;i<referrerTitleNameArray.length;i++){
			if(referrerTitleNameArray[i] == titleName){
				referrerTitleNameArray.splice(i,1);
				break;
			}
		}
	}
	if(referrerTitleNameArray.length == 0){
		delete entityBlockReferrals[blockId];
	}
	var anyBlocksInObject = false;
	for(var loopBlockId in entityBlockReferrals){
		anyBlocksInObject = true;
		break;
	}
	if(!anyBlocksInObject){
		delete bd.model.entityLookup(blockEntityValue).blockReferrers[entityIdWithScripts];
	}
}


bd.model.addBlockReferrer = function(entityIdWithScripts,blockId,titleName,blockEntityValue){
	if(bd.model.entityLookup(blockEntityValue).blockReferrers[entityIdWithScripts] == null){
		bd.model.entityLookup(blockEntityValue).blockReferrers[entityIdWithScripts] = {};
	}
	var entityBlockReferrals = bd.model.entityLookup(blockEntityValue).blockReferrers[entityIdWithScripts];

	if(entityBlockReferrals[blockId] == null){
		entityBlockReferrals[blockId] = [];
	}
	var referrerTitleNameArray = entityBlockReferrals[blockId];
	if(referrerTitleNameArray.indexOf(titleName) == -1){
		referrerTitleNameArray.push(titleName);
	}
}

//call when deleting block
bd.model.deleteBlockReferralHandler = function(blockId){
  var titleNamesToEntityId = bd.script.ctr.getSelectedScriptPage().blockIdsToUsedEntities[blockId];
  for(var titleName in titleNamesToEntityId){
    bd.model.removeBlockReferrer(bd.script.ctr.getSelectedScriptPage().id,blockId,titleName,titleNamesToEntityId[titleName]);
  }
  delete bd.script.ctr.getSelectedScriptPage().blockIdsToUsedEntities[blockId];
}

//	this.blockIdsToUsedEntities = {};//{12:{"OP":45}} only record entity ids
//	this.blockReferrers = {}; //{entityId:{blockId:["OP"]}]

bd.model.switchEntityBlockIds = function(entityIdWithScripts,oldBlockIdToNewBlockId){
	var entity = bd.model.entityLookup(entityIdWithScripts);

	var entityBlockReferrersUpdated = {};

	var newBlockIdsToUsedEntities = {};
	for(var oldBlockId in entity.blockIdsToUsedEntities){
		var titleNameToEntityId = entity.blockIdsToUsedEntities[oldBlockId]
		newBlockIdsToUsedEntities[oldBlockIdToNewBlockId[oldBlockId]] = titleNameToEntityId;

		for(var titleName in titleNameToEntityId){
			var otherEntity = bd.model.entityLookup(titleNameToEntityId[titleName]);
			if (otherEntity == null) {
				continue
			}
			if(entityBlockReferrersUpdated[otherEntity.id] == null){
				entityBlockReferrersUpdated[otherEntity.id] = true;
				var oldEntityBlockReferrer = otherEntity.blockReferrers[entityIdWithScripts];
				var newEntityBlockReferrer = {};
				for(var oldBlockIdInReferrer in oldEntityBlockReferrer){
					newEntityBlockReferrer[oldBlockIdToNewBlockId[oldBlockIdInReferrer]] = oldEntityBlockReferrer[oldBlockIdInReferrer];
				}
				otherEntity.blockReferrers[entityIdWithScripts] = newEntityBlockReferrer;
			}

		}


	}
	entity.blockIdsToUsedEntities = newBlockIdsToUsedEntities;



}


//{type:pieceInstance,id:5,property:instanceIds,valueToPush:9}
bd.model.modelUpdateElements = [];

bd.model.addModelUpdateElement = function(entityIds,updateType,property,value,updateRestrictions){
  if(entityIds != "game" && entityIds.length == 0) { return null; };

  var modelUpdateElement = {entityIds:entityIds,
                            property:property,
                            value:value,
                            playerId:bd.model.getPlayerId(),
                            updateType:updateType,
                            updateUIForOrigin:updateRestrictions.updateUIForOrigin,
                            updateModelForOrigin:updateRestrictions.updateModelForOrigin,
                            updateModelInEditor:updateRestrictions.updateModelInEditor,
                            updateUIInEditor:updateRestrictions.updateUIInEditor};

  if(updateRestrictions.shouldPropagate == false) {
    modelUpdateElement.shouldPropagate = false;
  }

  if(entityIds == "game"){
    modelUpdateElement.type = modelUpdateElement.value.type;
  } else {
    
    var existingEntityIds = [];
    for(var i=0; i< entityIds.length; i++) {
      if(bd.model.entityLookup(entityIds[i])) {
        existingEntityIds.push(entityIds[i]);
      }
    }
    if(existingEntityIds.length > 0) {
      modelUpdateElement.type = bd.model.entityLookup(existingEntityIds[0]).type;
    }
    modelUpdateElement.entityIds = existingEntityIds;
  }
  //if "game" or lists
  if(modelUpdateElement.entityIds.length > 0) {
    bd.model.modelUpdateElements.push(modelUpdateElement);
  }
  return modelUpdateElement;

}

bd.model.createPlayerFromRoleId = function(roleId,username){
	var role = bd.entityLookup[roleId];
	var newPlayer = new bd.component.player.constructor(null,role,username);
	if(bd.inPlayer) {
	  bd.player.ctr.playerId = newPlayer.id;
	}
	var entitiesWithPlayerInstances = bd.model.entitiesWithPlayerInstances;
	for(var i=0;i<entitiesWithPlayerInstances.length;i++){
		for(var k=0;k<bd.model.getCurrentGame()[entitiesWithPlayerInstances[i].entityName].length;k++){
			var entity = bd.model.getCurrentGame()[entitiesWithPlayerInstances[i].entityName][k];
			if(entity.shareMode == "perPlayer" && entity.playerId == null){
				//new entity
				var newEntity = new entitiesWithPlayerInstances[i].entityObject(null,entity.parentId,entity,newPlayer.id);
				//entity.playerId = bd.model.getCurrentGame().players[0].id;

			}
		}

	}
	return newPlayer;
}

bd.model.addTraitsToEntities = function(entityIds){
	for(var i=0;i<entityIds.length;i++){
		var entity = bd.model.entityLookup(entityIds[i]);
		//is clone from class
		if(entity.srcInstanceId == null){
			var entityParent = bd.model.entityLookup(entity.parentId);
			for(var k=0;k<entityParent.traitDefIds.length;k++){
				var newTrait =  new bd.component.trait.constructor(null,entityParent.traitDefIds[k],entityIds[i]);
			}
		} else {
			//is clone from instance
			var srcInstance = bd.model.entityLookup(entity.srcInstanceId);
			for(var k=0;k<srcInstance.traitIds.length;k++){
				var srcTrait = bd.model.entityLookup(srcInstance.traitIds[k]);
				var newTrait = new bd.component.trait.constructor(null,srcTrait.traitDefId,entityIds[i],srcTrait.value);
			}
		}

	}
	bd.model.sendUpdates();
}

bd.model.sendUpdates = function(){

	//can have timed delay before sending updates
	//***NEED TO ADD instanceId,userId,propagate ***
	//bd.socket.emit('clientGameUpdate',{ method: 'updateModel', modelUpdateArray: bd.model.linkedEntities });


	bd.model.updateModel(bd.model.modelUpdateElements,bd.instanceId,true)
	//can hold on to sent messages for acknowlegements
	bd.model.modelUpdateElements = [];
	if(!bd.inPlayer && bd.mobileConnect && bd.mobileConnect.ctr.gameUpdatedHandler) {
	  bd.mobileConnect.ctr.gameUpdatedHandler();
	}
}

bd.model.updateModel = function(modelUpdateArray,instanceId,propagate){

	//console.log("in bd.model.updateModel");
	//console.log(bd.model.getCurrentGame());
	if(bd.isServer && (!bd.model.getCurrentGame() || !bd.model.getCurrentGame().initializingInstance) ){
		//mongo stuff
		console.log("should send a message to sockets");
		//console.log(modelUpdateArray);
		//bd.model.sendMessageToGameSockets('serverGameUpdate', { method: 'updateModel',modelUpdateArray:modelUpdateArray,instanceId:instanceId,propagate:false });
		//bd.gameProvider.updateModel(modelUpdateArray,instanceId);
		bd.gameProvider.addModelUpdateToQueue(modelUpdateArray,instanceId);
		return;
	}

	//player is the origin of the update
	if(!bd.isServer && !bd.player.ctr.inEditorPreview && !bd.model.getCurrentGame().initializingInstance && bd.model.getCurrentGame().multiplayer && bd.inPlayer && !bd.isSinglePlayer && propagate){
		var propagatedModelUpdateArray = bd.model.getModelUpdatesToPropagate(modelUpdateArray);
		if(propagatedModelUpdateArray.length != 0){
			bd.socket.emit('clientGameUpdate',{ method: 'updateModel', modelUpdateArray: propagatedModelUpdateArray,instanceId:instanceId,propagate:true });
		}
	}


		//move messages between frames in editor preview
	if(!bd.isServer && bd.player.ctr.inEditorPreview && propagate){
		for(var playerId in window.parent.bd.preview.ctr.playerIdToFrame){
			var propagatedModelUpdateArray = bd.model.getModelUpdatesToPropagate(modelUpdateArray);
			if(propagatedModelUpdateArray.length != 0){
				window.parent.bd.preview.ctr.playerIdToFrame[playerId].contentWindow.bd.model.dispatchIncomingData({method: 'updateModel', modelUpdateArray:propagatedModelUpdateArray,instanceId:instanceId,propagate:false});
			}
		}

	}


    while(modelUpdateArray.length != 0) {
      var modelUpdateElement = modelUpdateArray.shift();

	//if(bd.model.getCurrentGame().initializingInstance || !bd.inPlayer || (bd.inPlayer && (propagate || userId != bd.model.getPlayerId())) ){
		//make sure message isn't received twice by a client
		if(!bd.model.getCurrentGame().initializingInstance && bd.inPlayer && !propagate && modelUpdateElement.playerId == bd.model.getPlayerId()  ){
			continue;
		}
		//do model update
		if( (bd.model.getCurrentGame().initializingInstance && modelUpdateElement.updateModelForOrigin) ||
		 (!bd.inPlayer && !bd.isServer && !bd.preview.ctr.creatingInstance && modelUpdateElement.updateModelInEditor) ||
		 (!bd.inPlayer && !bd.isServer && bd.preview.ctr.creatingInstance && modelUpdateElement.updateModelForOrigin) ||
		 (bd.inPlayer && !bd.isServer && ((!propagate && !bd.player.ctr.inEditorPreview) || (propagate && modelUpdateElement.updateModelForOrigin)))){
			bd.model.updateModelFromModelElement(modelUpdateElement);
		}
		//bd.preview.ctr.creatingInstance
		if( !bd.isServer && (  (!bd.inPlayer && !bd.preview.ctr.creatingInstance && modelUpdateElement.updateUIInEditor) ||
		 (bd.inPlayer && !bd.model.getCurrentGame().initializingInstance && (!propagate || (propagate && modelUpdateElement.updateUIForOrigin))))){

			//update UI
			if(modelUpdateElement.entityIds == "game"){
				if(modelUpdateElement.updateType == "addEntity"){
					var newEntity = JSON.parse(modelUpdateElement.value);

					//only necessary for preview mode since lookups are not made in models
					for(var k=0;k<bd.model.getCurrentGame()[newEntity.type + "s"].length;k++){
						if(bd.model.getCurrentGame()[newEntity.type + "s"][k].id == newEntity.id){
							if(!bd.inPlayer && !bd.isServer && (bd.preview.ctr.creatingInstance || bd.preview.ctr.creatingPreviewPlayer)){
								bd.preview.ctr.previewEntityLookup[newEntity.id] = bd.model.getCurrentGame()[newEntity.type + "s"][k];
							} else {
								bd.entityLookup[newEntity.id] = bd.model.getCurrentGame()[newEntity.type + "s"][k];
								//create component object from model to populate component lookup dict
								var newComponent = bd.component.typeNameToComponent[newEntity.type];
								var newComponentObject = new newComponent.constructor(bd.model.getCurrentGame()[newEntity.type + "s"][k]);
							}
						}
					}

					//we should only handle the command if the view is initialized (if there is a view)
					var shouldHandleCommand = false;
					var componentObject = bd.component.lookup(newEntity.id);
					if(componentObject.model.viewId != null){
					  var viewComponentObject = bd.component.lookup(componentObject.model.viewId);
					  if(viewComponentObject.isInitialized || (!bd.inPlayer && viewComponentObject.isKineticJSView)) {
					    shouldHandleCommand = true;
					  } else {
					    shouldHandleCommand = false;
					  }
					} else {
					  shouldHandleCommand = true;
					}

					if(shouldHandleCommand) {
					  bd.component.handleCommand(bd.component.lookup(newEntity.id),modelUpdateElement);
					}

				}
			} else {
				//entity ids are an array of ids

				var entityType = bd.entityLookup[modelUpdateElement.entityIds[0]].type;
				var entityIds = modelUpdateElement.entityIds;
				for(var k=0;k<entityIds.length;k++){
					var command = {};
					command.entityId = entityIds[k];
					command.property = modelUpdateElement.property;
					command.updateType = modelUpdateElement.updateType;
					command.value = modelUpdateElement.value;


					//we should only handle the command if the view is initialized (if there is a view)
					var shouldHandleCommand = false;
					var componentObject = bd.component.lookup(command.entityId);

					var viewComponentObject;
					if(componentObject.model.viewId != null && componentObject.model.type != "player"){
					  viewComponentObject = bd.component.lookup(componentObject.model.viewId);
					} else if(componentObject.isView) {
					  viewComponentObject = componentObject;
					}

					if(viewComponentObject != null) {
					  //if view is initialized, or if it is the default kineticjs view in the editor
					  if(viewComponentObject.isInitialized || (!bd.inPlayer && viewComponentObject.isKineticJSView)) {
					    shouldHandleCommand = true;
					  } else {
					    shouldHandleCommand = false;
					  }
					} else {
					  shouldHandleCommand = true;
					}

					if(shouldHandleCommand) {
					  bd.component.handleCommand(bd.component.lookup(command.entityId),command);
					}

				}
			}



		}
	}
	//}
	//if(userId == playerId && !propagate){ do nothing }



}

bd.model.getModelUpdatesToPropagate = function(modelUpdateArray){
  var propagatedModelUpdateArray = [];
  for(var i=0;i<modelUpdateArray.length;i++){
    var modelUpdateElement = modelUpdateArray[i];
    if(modelUpdateElement.shouldPropagate == null || modelUpdateElement.shouldPropagate){
      if(modelUpdateElement.entityIds != "game") {
        var shareMode = bd.model.entityLookup(modelUpdateElement.entityIds[0]).shareMode;
        if(shareMode == "local") {
          continue;
        }
      }
      propagatedModelUpdateArray.push(modelUpdateElement);
    }
  }
  return propagatedModelUpdateArray;
}

bd.model.updateModelFromModelElement = function(modelUpdateElement){
	if(modelUpdateElement.entityIds == "game"){
		//handle push
		switch(modelUpdateElement.updateType){
			case "addEntity":
				var newEntity = JSON.parse(modelUpdateElement.value);
				bd.model.getCurrentGame()[modelUpdateElement.property].push(newEntity);
				//used for adding entities
				//bd.entityLookup[newEntity.id] = newEntity;

				if(!bd.inPlayer && !bd.isServer && (bd.preview.ctr.creatingInstance || bd.preview.ctr.creatingPreviewPlayer)){
					bd.preview.ctr.previewEntityLookup[newEntity.id] = newEntity;
				} else {
					bd.entityLookup[newEntity.id] = newEntity;
				}

				break;
			case "deleteEntity":
				var entityId = modelUpdateElement.value
				var entityArray = bd.model.getCurrentGame()[modelUpdateElement.property];
				for(var i=0;i<entityArray.length;i++){
					if(entityArray[i].id == entityId){
						entityArray.splice(i,1);
						//delete bd.entityLookup[entityId];
					}
				}

				break;
		}
	} else {
		//entity ids are an array of ids
		for(var i=0;i<modelUpdateElement.entityIds.length;i++){
			var entityId = modelUpdateElement.entityIds[i];
			switch(modelUpdateElement.updateType){
				case "push":
					bd.model.entityLookup(entityId)[modelUpdateElement.property].push(modelUpdateElement.value);
					break;
				case "dictionary":
					bd.model.entityLookup(entityId)[modelUpdateElement.property][modelUpdateElement.value.key] = modelUpdateElement.value.value;
					break;
				case "change":
					bd.model.entityLookup(entityId)[modelUpdateElement.property] = parseFloat(bd.model.entityLookup(entityId)[modelUpdateElement.property]) + parseFloat(modelUpdateElement.value);
					break;
				case "set":
					bd.model.entityLookup(entityId)[modelUpdateElement.property] = modelUpdateElement.value;
					break;
				case "removeValue":
					var valueIndex = bd.model.entityLookup(entityId)[modelUpdateElement.property].indexOf(modelUpdateElement.value)
					if(valueIndex != -1){
						bd.model.entityLookup(entityId)[modelUpdateElement.property].splice(valueIndex,1);
					}
					break;
				case "removeIndex":
					bd.model.entityLookup(entityId)[modelUpdateElement.property].splice(modelUpdateElement.value,1);
					break;
			}
		}
	}
}

bd.model.deleteUnusedAsset = function(game,assetId){
	var assetUsed = false;
	console.log("costumes array" + game.costumes)
	for(var i=0;i<game.costumes.length;i++){
		console.log("costumes object" + game.costumes[i])
		if(game.costumes[i].assetId == assetId){
			assetUsed = true;
		}
	}

	if(!assetUsed){
		for(var i=0;i<game.assets.length;i++){
			if(game.assets[i].id == assetId){
				game.assets.splice(i,1);
			}
		}
	}
}


bd.model.addPieceToTarget = function(instanceId,targetIndex){
	var targetId = null;
	if(targetIndex != null){
		targetId = bd.model.getCurrentGame().targets[targetIndex].id;
	}

	if(bd.entityLookup[instanceId].targetId != targetId){
		var oldTargetId = bd.entityLookup[instanceId].targetId;
		bd.entityLookup[instanceId].targetId = targetId;
		if(oldTargetId != null){
			for(var i=0;i<bd.entityLookup[oldTargetId].instanceIds.length;i++){
				if(bd.entityLookup[oldTargetId].instanceIds[i] == instanceId){
					bd.entityLookup[oldTargetId].instanceIds.splice(i,1);
					break;
				}
			}
		}

		if(targetId != null){
			bd.entityLookup[targetId].instanceIds.push(instanceId);
		}

	}

}

bd.model.entityLookup = function(entityId){
	//problem on line 655
	if(!bd.inPlayer && !bd.isServer && (bd.preview.ctr.creatingInstance || bd.preview.ctr.creatingPreviewPlayer)){
		return bd.preview.ctr.previewEntityLookup[entityId];
	} else {
		return bd.entityLookup[entityId];
	}
}

bd.model.addEntityToLookup = function(entityId,entity){
	if(!bd.inPlayer && !bd.isServer && (bd.preview.ctr.creatingInstance || bd.preview.ctr.creatingPreviewPlayer)){
		bd.preview.ctr.previewEntityLookup[entityId] = entity;
	} else {
		bd.entityLookup[entityId] = entity;
	}
}

bd.model.populateEntityLookup = function(){

	for(var typeName in bd.component.typeNameToComponent) {
	  var component = bd.component.typeNameToComponent[typeName];
	  if(component.constructor) {
	    if(!bd.model.getCurrentGame()[component.componentProperties.listName]){
	      bd.model.getCurrentGame()[component.componentProperties.listName] = [];
	    }
	    for(var i=0;i<bd.model.getCurrentGame()[component.componentProperties.listName].length;i++){
	      var componentObject = new component.constructor(bd.model.getCurrentGame()[component.componentProperties.listName][i]);
	    }
	  }
	}

}


bd.model.startGame = function(instanceId,userId,propagate){
	console.log("in bd.model.startGame");
	if(bd.isServer){
		//mongo stuff
		bd.model.sendMessageToGameSockets('serverGameUpdate', { method: 'startGame',instanceId:instanceId,userId:userId,propagate:false });
		bd.gameProvider.startGame(instanceId,userId,propagate,bd.gameProvider, function(error,docs){

		});

		return;
	}
	//not the server...

	if(bd.inPlayer && propagate && !bd.isSinglePlayer && !bd.player.ctr.inEditorPreview) {
		//send to server
		console.log("sending clientGameUpdate");
		bd.socket.emit('clientGameUpdate', { method: 'startGame',instanceId:instanceId,userId:userId,propagate:true });
	}

	if(!bd.inPlayer || propagate || (!propagate && userId != bd.model.getPlayerId()  && !bd.player.ctr.inEditorPreview)){
		//update locally
		bd.model.getCurrentGame().started = true;
	}

	//update the ui

}

bd.model.getCurrentViewId = function(){
	if(!bd.inPlayer){
		return bd.editorSettings.currentViewId;
	} else {
		return bd.entityLookup[bd.player.ctr.playerId].viewId;
	}
}

bd.model.getStageIds = function() {
  var viewType;
  var listName;
  var viewEntity;

  var viewIds = [];
  for(var i=0;i<bd.component.viewTypes.length;i++) {
    viewType = bd.component.viewTypes[i];
    listName = bd.component.typeNameToComponent[viewType].componentProperties.listName;
    for(var k=0;k<bd.model.getCurrentGame()[listName].length;k++){
      viewEntity = bd.model.getCurrentGame()[listName][k];
      viewIds.push(viewEntity.id);
    }
  }
  return viewIds;
}

//get property list to be used on block
//[["visible","VISIBLE"]] language dependent then independent
bd.model.getPropertyList = function(entityType, readOrWrite, onlyNumbers) {
  var blockPropertyList = [];
  var component = bd.component.getComponentByType(entityType);
  //check to make sure necessary property functions and objects exists
  if(!component.propertyNameToObject || !component.getProperties) {
    return blockPropertyList;
  }

  //get the list of component properties
  var propertiesArray = component.getProperties();
  var propertyObject;
  for(var i=0, property; property = propertiesArray[i]; i++ ){
    if(component.propertyNameToObject[property.name]) {
      propertyObject = component.propertyNameToObject[property.name];
      if( ( ( (propertyObject.blockRead || propertyObject.blockRead == null) && readOrWrite == "read") ||
            ( (propertyObject.blockWrite || propertyObject.blockWrite == null) && readOrWrite == "write")
          ) &&
          ( !onlyNumbers || propertyObject.isNumber )
        ) {
        blockPropertyList.push([bd.model.getPropertyMessageName(property.name, "block"),"property:" + property.name]);
      }
    }
  }
  return blockPropertyList;
}

bd.model.getPropertyMessageName = function(propertyName, editorOrBlock) {
  if(bd.msg["PROPERTY_" + propertyName]) {
    return bd.msg["PROPERTY_" + propertyName];
  } else if(editorOrBlock == "block" && bd.msg["PROPERTY_" + propertyName + "_BLOCK"]) {
    return bd.msg["PROPERTY_" + propertyName + "_BLOCK"];
  } else if(editorOrBlock == "editor" && bd.msg["PROPERTY_" + propertyName + "_EDITOR"]) {
    return bd.msg["PROPERTY_" + propertyName + "_EDITOR"];
  }
  return "";
}

bd.model.getPlayerId = function(){
	if(!bd.inPlayer){
		return null;
	} else {
		return bd.player.ctr.playerId;
	}
}

bd.model.getCurrentGameAssets = function() {
  var assets = [];
  for(var i=0;i<bd.component.assetTypes.length;i++) {
    assets = assets.concat(bd.model.getEntityList(bd.component.assetTypes[i]));
  }
  return assets;
}

bd.model.getSoundAssetOptions = function() {
  var assetOptions = [];
  for(var i=0, assetSoundId; assetSoundId = bd.model.getEntityList("sound")[0].assetSoundIds[i]; i++) {
    assetOptions.push([bd.model.entityLookup(assetSoundId).assetLabel, "id:" + assetSoundId]);
  }

  if(assetOptions.length == 0) {
    assetOptions = [[" ",bd.blocks.ctr.emptyFieldBox]];
  }
  return assetOptions;
}

bd.model.getAssetIdByIdentifier = function(assetType,identifier) {
  var assets = bd.model.getEntityList(assetType)
  var assetComponent = bd.component.typeNameToComponent[assetType];
  var identifierProperty = assetComponent.componentProperties.identifierProperty;
  for(var i=0;i<assets.length;i++) {
    if(assets[i][identifierProperty] == identifier) {
      return assets[i].id;
    }
  }
  return null;
}

bd.model.getEntityList = function(entityType) {
  var listName = bd.component.typeNameToComponent[entityType].componentProperties.listName;
  return bd.model.getCurrentGame()[listName];
}

bd.model.getGameInfo = function() {
  return bd.model.getEntityList(bd.component.gameInfo.componentProperties.type)[0];
}

bd.model.isMultiplayer = function() {
  return bd.model.getGameInfo().isMultiplayer;
}

bd.model.isMultiplayerGame = function() {
  return bd.model.getGameInfo().isMultiplayerGame;
}

bd.model.getSinglePlayerId = function() {
  return bd.model.getEntityList("player")[0].id;
}

bd.model.getInstanceType = function(parentType) {
  return bd.component.parentNameToChildName[parentType] || parentType;
}

bd.model.isInstance = function(id) {
  var entity = bd.model.entityLookup(id);
  return bd.component.childNameToParentName[entity.type] != null;
}

bd.model.getClassId = function(id) {
  var component = bd.component.lookup(id);
  if(bd.component.childNameToParentName[component.type]){
    return component.model.parentId;
  } else {
    return id;
  }
}


bd.model.getAllEvaluatorBlocks = function() {
  var scriptPageModels = bd.model.getEntityList("scriptPage");
  var scriptPage;
  var blocksToReturn = [];
  for(var i=0; i<scriptPageModels.length; i++) {
    scriptPage = scriptPageModels[i];
    var allBlocks = scriptPage.scriptObject.xml;
    var blockGroups = bd.util.convertToArray(allBlocks.block);

    var blocksFromGroup;
    for (var k = 0; k < blockGroups.length; k++) {
      blocksFromGroup = bd.model.getAllBlocksInGroup(blockGroups[k]);
      blocksToReturn = blocksToReturn.concat(blocksFromGroup);
    }
  }
  return blocksToReturn;
}


bd.model.getAllBlocksInGroup = function(currBlock) {
  if (!currBlock) {
    return [];
  }
  var currentBlock;
  if(currBlock.block) {
    currentBlock = currBlock.block;
  } else {
    currentBlock = currBlock;
  }
  var recur = [currentBlock].concat(
                bd.model.getAllBlocksInGroup(currentBlock.next));
  var valuesAndStatements = bd.util.convertToArray(currentBlock.value);
  valuesAndStatements = valuesAndStatements.concat(bd.util.convertToArray(currentBlock.statement));
  for (var i = 0; i < valuesAndStatements.length; i++) {
    recur = recur.concat(bd.model.getAllBlocksInGroup(valuesAndStatements[i]));
  }
  return recur;
}

//server only
bd.model.sendMessageToGameSockets = function(method,data){
	console.log("data.instanceId: " + data.instanceId);
	console.log("length of gametousersockets: " + bd.gameToUserSockets[data.instanceId].length);
	for(var i=0;i<bd.gameToUserSockets[data.instanceId].length;i++){
		bd.gameToUserSockets[data.instanceId][i].emit(method,data);
	}
}

//server only
bd.model.setSpreadsheetList = function(game,finalCallback,callback) {

	//var gss = require('../../../gst').gss;
	var gss = require('../../../../../../node/gst').gss;

	var currentSpreadsheetIndex = 0;
	//var spreadsheetArray = ["0AqQWqGgDapSrdEFqTTJUSEl1eEx6YUFRZzBlblJDRGc"];
	if(!game.spreadsheetTypes){
		game.spreadsheetTypes = [];
	}

	function addSpreadsheetListToGame(){

		gss.getListData(game.spreadsheetTypes[currentSpreadsheetIndex].spreadsheetKey,function(dictOfList){
			console.log(JSON.stringify(dictOfList));
			//change the list in the game
			for(var i=0;i<game.spreadsheetTypes[currentSpreadsheetIndex].traitDefIds.length;i++){
				var traitDef = bd.entityLookup[game.spreadsheetTypes[currentSpreadsheetIndex].traitDefIds[i]];
				if(dictOfList[traitDef.name]){
					traitDef.value = dictOfList[traitDef.name].list;
				}
			}
			currentSpreadsheetIndex++;
			if(currentSpreadsheetIndex == game.spreadsheetTypes.length){
				callback(game);
				return;
			} else {
				addSpreadsheetListToGame();
			}
		});
	}

	if(game.spreadsheetTypes.length == 0){
		callback(game,finalCallback);
	} else {
		addSpreadsheetListToGame();
	}

}

//server only
bd.model.setTemplateArrayValues = function(game,templateArray){
	for(var i=0;i<templateArray.length;i++){
		var templateValue = templateArray[i];
		if(templateValue.type == "image"){
			//if image, create new asset
			var originalCostume = bd.entityLookup[templateValue.entityId];
			var originalAssetId = originalCostume.assetId;

			var newAsset = new bd.model.Asset({url:templateValue.value, internal:templateValue.internal});
			originalCostume.assetId = newAsset.id;

			//if image not used by any other costume, delete un-used asset
			bd.model.deleteUnusedAsset(game,originalAssetId)

		}
	}
}

//server only
bd.model.convertGameToInstance = function(game,templateArray,callback){
	bd.model.currentInstance = game;
	bd.model.getCurrentGame().initializingInstance = true;
	bd.entityLookup = {};
	bd.component.initializeComponents();
	bd.model.populateModels();
	bd.model.populateEntityLookup();

	//set the values from the template array
	//bd.model.setTemplateArrayValues(game,templateArray);

	//bd.model.setSpreadsheetList(game,callback,bd.model.convertGameToInstanceAfterSpeadsheet);
	bd.model.convertGameToInstanceAfterSpeadsheet(game,callback)
	//return bd.model.getCurrentGame();
}

bd.model.convertGameToInstanceAfterSpeadsheet = function(game,callback) {

	bd.model.currentInstance = game;
	var replacingEntities = [{idListName:"targetIds",listName:"targets",type:bd.model.Target},{idListName:"pieceInstanceIds",listName:"pieceInstances",type:bd.component.pieceInstance.constructor},{idListName:"labelInstanceIds",listName:"labelInstances",type:bd.component.labelInstance.constructor}];
	//****STILL NEED TO LINK THE gameViewInstances AS THE *PLAYER* version of GAMEVIEW
	//create gameViewInstances and needed piece instances
	for(var i=0;i<bd.model.getCurrentGame().gameViews.length;i++){
		if(bd.model.getCurrentGame().gameViews[i].propType == "player"){
			var gameViewInstances = new bd.model.GameViewInstance(bd.model.getCurrentGame().gameViews[i].id);
			for(var k=0;k<replacingEntities.length;k++){
				var gameViewIdList = bd.model.getCurrentGame().gameViews[i][replacingEntities[k].idListName];
				for(var m=0;m<gameViewIdList.length;m++){
					var newEntity = new replacingEntities[k].type(bd.entityLookup[gameViewIdList[m]].parentId);
					var newObj = bd.util.createNewObject(gameViewIdList[m]);
					newObj.id = newEntity.id;
					var entityList = bd.model.getCurrentGame()[replacingEntities[k].listName];
					for(var q=0;q<entityList.length;q++){
						if(entityList[q].id == newObj.id){
							entityList[q] = newObj;
						}
					}
				}
			}
		}
	}

	// go throught all the richText assets and variables and create dictionary in gameinfo that has the variables mapped to all the asset
	var richTextAssets = bd.model.getEntityList("assetRichText");
	var variableToRichTextAsset = {};
	for (var assetIndex=0;assetIndex<richTextAssets.length;assetIndex++) { //go through all the rich text assets
		var asset = richTextAssets[assetIndex];
		var assetId = asset.id;
		var richText = asset.richText;
		var variableNames = bd.methodTag.richTextInput.getVariablesInText(richText); // an array of the variable names
		for (var variableIndex=0;variableIndex<variableNames.length;variableIndex++) {
			//map each variable name to an array of asset ids that the variable exists in
			var variableName = variableNames[variableIndex];
			if (!(variableToRichTextAsset[variableName])) { //this variable name does not exist in the dictionary
				variableToRichTextAsset[variableName] = [];//this array is for the assetId(s) for this variable name
			}
			variableToRichTextAsset[variableName].push(assetId);
		}
	}
	bd.model.getCurrentGame().gameInfos.richTextVariablesToAssets = variableToRichTextAsset;

	//create player specific entities
	var playerList = bd.model.getEntityList("playerInstance").concat(bd.model.getEntityList("player"));

	if(playerList.length != 0){
		var entitiesWithPlayerInstances = bd.model.entitiesWithPlayerInstances;
		for(var i=0;i<entitiesWithPlayerInstances.length;i++){
			for(var k=0;k<bd.model.getCurrentGame()[entitiesWithPlayerInstances[i].entityName].length;k++){
				var entity = bd.model.getCurrentGame()[entitiesWithPlayerInstances[i].entityName][k];
				if((entity.shareMode == "perPlayer" || entity.shareMode == "local") && entity.playerId == null){

					for(var m=0;m<playerList.length;m++){
						//new entity
						var newEntity = new entitiesWithPlayerInstances[i].entityObject(null,entity.parentId,entity,playerList[m].id);
						//entity.playerId = bd.model.getCurrentGame().players[0].id;
					}
				}
			}

		}
	}
	bd.model.sendUpdates();
        for (var i=0;i<bd.model.getCurrentGame().gridInstances.length;i++){
                if (bd.model.getCurrentGame().gridInstances[i].playerId != null || bd.model.getCurrentGame().gridInstances[i].shareMode == "share"){
			bd.component.lookup(bd.model.getCurrentGame().gridInstances[i].id).createTileObjects()
		}
        }
	//correctly attach piece instances to targets in the model
	for(var i=0;i<bd.model.getCurrentGame().targets.length;i++){
		var target = bd.model.getCurrentGame().targets[i];
		if(target.playerId == null){
			for(var k=0;k<target.pieceInstanceIds.length;k++){
				var pieceInstance = bd.model.entityLookup(target.pieceInstanceIds[k]);
				if(pieceInstance.entityPerPlayer && pieceInstance.playerId == null){
					if(target.entityPerPlayer){
						//go through the target's playerIdsToChildInstanceIds and pieceInstance's playerIdsToChildInstanceIds and update model so players match
						for(var playerId in pieceInstance.playerIdsToChildInstanceIds){
							bd.model.addModelUpdateElement([target.playerIdsToChildInstanceIds[playerId]],"push","pieceInstanceIds",pieceInstance.playerIdsToChildInstanceIds[playerId],{updateUIForOrigin:false,updateModelForOrigin:true,updateModelInEditor:true,updateUIInEditor:false});
							bd.model.addModelUpdateElement([pieceInstance.playerIdsToChildInstanceIds[playerId]],"set","targetId",target.playerIdsToChildInstanceIds[playerId],{updateUIForOrigin:false,updateModelForOrigin:true,updateModelInEditor:true,updateUIInEditor:false});
						}
					} else {
						//go through the pieceInstance's playerIdsToChildInstanceIds and update target's model so players match
						for(var playerId in pieceInstance.playerIdsToChildInstanceIds){
							bd.model.addModelUpdateElement([target.id],"push","pieceInstanceIds",pieceInstance.playerIdsToChildInstanceIds[playerId],{updateUIForOrigin:false,updateModelForOrigin:true,updateModelInEditor:true,updateUIInEditor:false});
						}
					}
				}
			}
		}
	}
	//creates table rows
	var tableInstances = bd.model.getCurrentGame().tableInstances.concat(bd.model.getCurrentGame().tableGridInstances);
	for(var i=0;i<tableInstances.length;i++){
		if(tableInstances[i].playerId==null){
			for(var childId in tableInstances[i].playerIdsToChildInstanceIds){
				var tableInstanceComponentObject = bd.component.lookup(tableInstances[i].playerIdsToChildInstanceIds[childId]);
				var id = tableInstanceComponentObject.id
				var editorData = tableInstances[i].editorRowData
				var playerRowData = [];
				var dataRow;
				for(var j=0;j<editorData.length;j++){
					var empty = true
					dataRow = [];
					for(var k=0;k<editorData[j].length;k++){
						if(editorData[j][k] != '' && editorData[j][k] != null && typeof editorData[j][k] != 'undefined'){
							empty=false
							dataRow.push({value:editorData[j][k]});
						} else {
						  dataRow.push({value:""});
						}
					}
					if(!empty || j != editorData.length - 1){
						var rowComponentObject = new bd.component.tableRow.constructor(null, id, editorData[j]) //data in row object not used
						playerRowData.push({id:rowComponentObject.id,data:dataRow});
					}
				}
				tableInstanceComponentObject.model.playerRowData = playerRowData;
			}
		}
	}
	bd.model.sendUpdates();

	//create trait objects
	//**NEED TO ADD TRAITS TO PLAYER SPECIFIC GAME VIEW
	var entitiesWithTraits = [{listName:"gameInfos",childIdField:null},
	                          {listName:"pieces",childIdField:"instanceIds"},
	                          {listName:"physicsRectangles",childIdField:"instanceIds"},
	                          {listName:"players",childIdField:null},
	                          {listName:"paths",childIdField:"instanceIds"},
	                          {listName:"labels",childIdField:"instanceIds"},
	                          {listName:"textInputs",childIdField:"instanceIds"},
	                          {listName:"phaserPieces",childIdField:"instanceIds"},
	                          {listName:"phaserPhysicsPieces",childIdField:"instanceIds"},
	                          {listName:"spreadsheetTypes",childIdField:null}];

	for(var i=0;i<entitiesWithTraits.length;i++){
		var entityList = bd.model.getCurrentGame()[entitiesWithTraits[i].listName];
		for(var k=0;k<entityList.length;k++){

			var instanceIds = [];
			if(entitiesWithTraits[i].childIdField == null){
				instanceIds = [entityList[k].id];
			} else {
				instanceIds = entityList[k][entitiesWithTraits[i].childIdField];
			}

			//var traitDefIds = entityList[k].traitDefIds;
			for(var m=0;m<instanceIds.length;m++){
				var traitDefIds = entityList[k].traitDefIds;
				for(var q=0;q<traitDefIds.length;q++){
					var newTrait = new bd.component.trait.constructor(null,traitDefIds[q],instanceIds[m]);
				}
			}
		}
	}
	bd.model.sendUpdates();
	bd.model.getCurrentGame().initializingInstance = false;
	callback(bd.model.getCurrentGame());
}

bd.model.getCurrentGame = function(){
	if(bd.isServer || bd.inPlayer || (bd.preview && bd.preview.ctr && (bd.preview.ctr.creatingInstance || bd.preview.ctr.creatingPreviewPlayer))){
		return bd.model.currentInstance;
	} else {
		return bd.model.currentGame;
	}
}

bd.model.dispatchIncomingData = function(data){
	switch(data.method){
		case "startGame":
			bd.model.startGame(data.instanceId,data.userId,data.propagate);
			break;
		case "updateModel":
			bd.model.updateModel(data.modelUpdateArray,data.instanceId,data.propagate);
			break;
	}
}
