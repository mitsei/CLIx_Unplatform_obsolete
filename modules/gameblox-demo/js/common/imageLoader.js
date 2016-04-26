bd.imageLoader.ctr = {};

//{image:imageObject,loaded:true}
//{image:imageObject,loaded:false,boxes:[box]}
bd.imageLoader.ctr.assetIdToImageInfo = {};

bd.imageLoader.ctr.loadAllAssets = function(){
  var assetTypes = bd.component.assetTypes;
  for(var i=0;i<assetTypes.length;i++){
    var listName = bd.component.typeNameToComponent[assetTypes[i]].componentProperties.listName;
    for(var k=0;k<bd.model.getCurrentGame()[listName].length;k++){
      bd.imageLoader.ctr.loadAsset(bd.model.getCurrentGame()[listName][k].id);
    }
  }
}

bd.imageLoader.ctr.loadAsset = function(assetId){

  var assetComponentObject = bd.component.lookup(assetId);
  var imageObj = new Image();
  imageObj.crossOrigin = "anonymous";
  imageObj.assetId = assetId;
  imageObj.src = assetComponentObject.getThumbnailUrl();
  imageObj.onload = function() {
    var imageInfo = bd.imageLoader.ctr.assetIdToImageInfo[this.assetId];
    imageInfo.loaded = true;
    for(var i=0;i<imageInfo.boxes.length;i++){
      imageInfo.boxes[i].box.setImage(this);
      imageInfo.boxes[i].boxLayer.draw();
    }
    imageInfo.boxes = [];
  }
  bd.imageLoader.ctr.assetIdToImageInfo[assetId] = {image:imageObj,loaded:false,boxes:[]};
}

bd.imageLoader.ctr.getImage = function(box,boxLayer,assetId){
  if(bd.imageLoader.ctr.assetIdToImageInfo[assetId].loaded){
    box.setImage(bd.imageLoader.ctr.assetIdToImageInfo[assetId].image);
    boxLayer.draw();
  } else {
    bd.imageLoader.ctr.assetIdToImageInfo[assetId].boxes.push({box:box,boxLayer:boxLayer});
  }
}

bd.imageLoader.ctr.getImageObject = function(assetId) {
  if(bd.imageLoader.ctr.assetIdToImageInfo[assetId]) {
    return bd.imageLoader.ctr.assetIdToImageInfo[assetId].image;
  } else {
    return null;
  }
}