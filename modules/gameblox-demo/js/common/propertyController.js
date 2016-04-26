goog.provide("bd.property.ctr");

//possible property object fields
//getFxn, setFxn, validator, blockRead, blockWrite, editorRead, editorWrite, propertyValues (drop downs)

bd.property.ctr.setOrChangePropertyValue = function(setOrChange, entityIds, propertyName, value) {
  for(var i=0; entityId = entityIds[i]; i++) {
    var entity = bd.model.entityLookup(entityId);
    if(entity == null) {
      continue;
    }
    var component = bd.component.getComponentByType(entity.type);
    var componentObject = bd.component.lookup(entityId);
    //get property object
    var propertyObject = component.propertyNameToObject[propertyName];
    var futureValue = value;
    if(setOrChange == "change") {
      futureValue = parseFloat(bd.property.ctr.getPropertyValue(entityId,propertyName)) + parseFloat(value);
    }
    if(propertyObject.validator && !propertyObject.validator(futureValue)) {
      //TODO: add console message
      console.log(futureValue + " is an invalid value for " + bd.model.getPropertyMessageName(propertyName, "block"));
    } else {
      if(propertyObject.setFxn) {
        propertyObject.setFxn.call(componentObject, futureValue);
      } else {
        bd.model.addModelUpdateElement([entityId],setOrChange,propertyObject.modelName,value,{updateUIForOrigin:true,updateModelForOrigin:true,updateModelInEditor:true,updateUIInEditor:true});
        bd.model.sendUpdates();
      }
    }
  }
}

bd.property.ctr.getPropertyValue = function(entityId, propertyName) {
  var entity = bd.model.entityLookup(entityId);
  if(entity == null) {
    return null;
  }
  var component = bd.component.getComponentByType(bd.model.entityLookup(entityId).type);
  //get property object
  var propertyObject = component.propertyNameToObject[propertyName];
  if(propertyObject.getFxn) {
    var componentObject = bd.component.lookup(entityId);
    return propertyObject.getFxn.call(componentObject);
  } else {
    return bd.model.entityLookup(entityId)[propertyObject.modelName];
  }

}