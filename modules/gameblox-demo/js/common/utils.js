if (typeof bd=="undefined") {
  bd={};
}
bd.util = {};

bd.util.createNewObject = function(obj){
	return JSON.parse(JSON.stringify(obj));
}


bd.util.ajaxPost = function(url,params,callback, callbackError){
	var http = new XMLHttpRequest();
	//var url = "get_data.php";
	//var params = "lorem=ipsum&name=binny";
	http.open("POST", url, true);
	
	//Send the proper header information along with the request
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	http.setRequestHeader("Content-length", params.length);
	http.setRequestHeader("Connection", "close");
	
	http.onreadystatechange = function() {//Call a function when the state changes.
		if(http.readyState == 4 && http.status == 200) {
			callback(http.response);
		} else if (http.readyState == 4 && http.status != 200) {
      if (callbackError) {
        callbackError(http.response);
      }
    }
	}
	http.send(params);
}

bd.util.ajaxGet = function(url, callback, callbackError){
  var xmlhttp;
  if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp=new XMLHttpRequest();
  } else {// code for IE6, IE5
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange=function() {
    if (xmlhttp.readyState==4 && xmlhttp.status==200) {
      callback(xmlhttp.responseText);
    } else if (xmlhttp.readyState == 4 && xmlhttp.status != 200) {
      if(callbackError) {
        callbackError(xmlhttp.responseText);
      }
    }
  }

  xmlhttp.open("GET",url,true);
  xmlhttp.send();

}

bd.util.getURLParamValue = function(name,urlWindow){


  if(typeof urlWindow == "undefined") {
    urlWindow = window;
  }

  var val;
  if (!window.IS_CHROME_APP) {
  
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( urlWindow.location.href );
    if( results == null ) {
      return "";
    } else {
      return results[1];
    }
  } else {
    //console.log("Chrome App Get Attribute Instead");
    //console.log(urlWindow);
    
    // if (name=="tutorial" || name=="hasSpeech" || (window != true) || (!window.frameElement) || !(window.frameElement.hasAttribute(name)))
    if (name=="tutorial" || name=="hasSpeech") {
      val = "";
    } else if (name == "playerId") {
      val = bd.model.getSinglePlayerId();
    } else {
      // For Chrome apps, replace URL Parameters with attributes on frames
      // console.log(window.jordans_name);
      //console.log("Get Frame Attribute");
      val = urlWindow.frameElement.getAttribute(name);
    }
  }
  return val;
  
}

bd.util.getCookie = function(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


bd.util.updateButtonScroll = function(dataArray,boxArray,leftArrow,rightArrow,numPerPage,pageNum,showFunction,hideFunction){

  for(var i=0;i<boxArray.length;i++){
    var objectIndex = (pageNum * numPerPage) + i;

    if(objectIndex < dataArray.length){
      if(boxArray[i].setVisible) {
        boxArray[i].setVisible(true);
      }

      if(showFunction != null){
        showFunction(objectIndex,boxArray[i],dataArray[objectIndex],i);
      }
    } else if (!boxArray[i].isVisible || boxArray[i].isVisible()) {
      if(boxArray[i].setVisible) {
        boxArray[i].setVisible(false);
      }

      if(hideFunction != null){
        hideFunction(objectIndex,boxArray[i],dataArray[objectIndex],i);
      }
    }
  }

  //show/hide left button
  if(pageNum == 0){
    if(leftArrow && leftArrow.setVisible) {
      leftArrow.setVisible(false);
    }
  } else {
    //show left button
    if(leftArrow && leftArrow.setVisible) {
      leftArrow.setVisible(true);
    }
  }

  //show/hide right button
  if( (pageNum * numPerPage) + boxArray.length + 1 > dataArray.length ){
    //console.log("should hide right arrow")
    if(rightArrow && rightArrow.setVisible) {
      rightArrow.setVisible(false);
    }
  } else {
    //console.log("should show right arrow")
    if(rightArrow && rightArrow.setVisible) {
      rightArrow.setVisible(true);
    }
  }
}

//given the id of a dom element, provide it with
//a setVisible and isVisible method
bd.util.createHideShowFunctions = function(id,useDisplay){
  this.id = id;
  this.useDisplay = useDisplay;
  this.setVisible = function(visible) {
    if(visible) {
      if(useDisplay){
        document.getElementById(id).style.display = "block";
      } else {
        document.getElementById(id).style.visibility = "visible";
      }
    } else {
      if(useDisplay){
        document.getElementById(id).style.display = "none";
      } else {
        document.getElementById(id).style.visibility = "hidden";
      }
    }
  }

  this.isVisible = function(){
    if(useDisplay){
      return !(document.getElementById(id).style.display == "none");
    } else {
      return !(document.getElementById(id).style.visibility == "hidden");
    }
  }

  this.getObject = function() {
    return document.getElementById(id);
  }
}

//given the id of a dom element, provide it with
//a setVisible and isVisible method
bd.util.createHideShowSvgFunctions = function(svgObject){
  this.svgObject = svgObject;
  this.setVisible = function(visible) {
    if(visible) {
      this.svgObject.svgGroup_.style.display = "block";
    } else {
      this.svgObject.svgGroup_.style.display = "none";
    }
  }

  this.isVisible = function(){
    return !(this.svgObject.svgGroup_.style.display == "none");
  }

  this.getObject = function() {
    return this.svgObject;
  }
}

bd.util.moveToLastPage = function(dataLength,squareLength,squarePerPage){
	if(dataLength <= squareLength){
		//page = 0;
		return 0;
	} else {
		return Math.floor((dataLength - squareLength - 1) / squarePerPage) + 1;
	}
}

bd.util.deleteFirstFromList = function(item,array){
	var length = array.length;
	for(var i=0;i<length;i++){
		if(array[i] == item){
			array.splice(i,1);
			break;
		}
	}
}

bd.util.removeIdPrefix = function(idWithPrefix){
	return idWithPrefix.replace("id:","")
}

bd.util.removePrefix = function(stringWithPrefix,prefix){
	return stringWithPrefix.replace(prefix + ":","")
}

bd.util.containsPrefix = function(stringWithPrefix,prefix){
	return (stringWithPrefix + "").substr(0,prefix.length) == prefix;
}

bd.util.getArrayFromStringPrefix = function(stringWithPrefix,prefix){
	var stringWithoutPrefix = bd.util.removePrefix(stringWithPrefix,prefix);
	return stringWithoutPrefix.split(":");
}


bd.util.removeContextPrefix = function(contextWithPrefix){
	return contextWithPrefix.replace("context:","")
}

bd.util.getContextArrayFromStringPrefix = function(contextWithPrefix){
	var contextStringWithoutPrefix = bd.util.removeContextPrefix(contextWithPrefix);
	return contextStringWithoutPrefix.split(":");
}

bd.util.stringHasSuffix = function(string, suffix) {
  return string.indexOf(suffix, string.length - suffix.length) !== -1
}

bd.util.isContextSelection = function(selectionName){
	return selectionName.substr(0,"context:".length) == "context:";
	//return contextWithPrefix.replace("context:","")
}

//returns false if not any or all
//returns category if any or all otherw
bd.util.isAnyOrAll = function(selectionName){
	var anyOrAll = selectionName.substr(0,"any:".length) == "any:" ||  selectionName.substr(0,"all:".length) == "all:" ||  selectionName.substr(0,"random:".length) == "random:";
	if(!anyOrAll){
		return anyOrAll;
	} else {
		return selectionName.split(":");
	}
	//return contextWithPrefix.replace("context:","")
}

bd.util.setDropDownFromEntityIds = function(dropDown, entityIds, selectedEntityId) {
  dropDown.innerHTML = "";
  for(var i=0, entityId; entityId = entityIds[i]; i++ ) {
    dropDown.options[dropDown.options.length] = new Option(bd.model.entityLookup(entityId).name, entityId);
    if(entityId == selectedEntityId){
      dropDown.selectedIndex = dropDown.options.length - 1;
    }
  }
}

bd.util.closeToEqual = function(number1,number2){
	return Math.abs(number1-number2) < Math.pow(10,-6)
}

bd.util.isArray = function(object){
	return (object instanceof Array || (window && window.parent && object instanceof window.parent.Array));
}

bd.util.mainLayerInitialized = function(){
	return bd.stage.getChildren().length ==5;
}

bd.util.mixin = function(object,propsToMix) {
  for(var prop in propsToMix) {
    object[prop] = propsToMix[prop];
  }
}

bd.util.setupRadioChangeEventHandlers = function(radioElements,callbackVariables,validator,successFxn,failureFxn) {
  var changeHandlerFunction = bd.util.inputEventHandler(callbackVariables,validator,successFxn,failureFxn);
  for(var i=0;i<radioElements.length;i++) {
    radioElements[i].onchange = changeHandlerFunction;
  }
}

bd.util.setRadioValue = function(radioElements,value) {
  for(var i=0;i<radioElements.length;i++) {
    if(radioElements[i].value == value) {
      radioElements[i].checked = true;
      break;
    }
  }
}

// Switch out svg image url for mouse events
// this = svg image object
bd.util.setImgStatus = function(status) {
  var urlSubstrs = this.getAttribute('xlink:href').split('-');
   switch(status) {
    case "hover":
      urlSubstrs[urlSubstrs.length-1] = 'hover.png';
      break;
    case "up":
      urlSubstrs[urlSubstrs.length-1] = 'up.png';
      break;
    case "active":
      urlSubstrs[urlSubstrs.length-1] = 'active.png';
      break;
    case "disabled":
      urlSubstrs[urlSubstrs.length-1] = 'disabled.png';
      break;
  }
  var newUrl = urlSubstrs.join("-");
  this.setAttribute('xlink:href', newUrl);
}

bd.util.setupCheckboxChangeEventHandlers = function(element,callbackVariables,validator,successFxn,failureFxn) {
  var changeHandlerFunction = bd.util.inputEventHandler(callbackVariables,validator,successFxn,failureFxn);
  element.onchange = changeHandlerFunction;
}

bd.util.setupDropDownChangeEventHandlers = function(element,callbackVariables,validator,successFxn,failureFxn) {
  var changeHandlerFunction = bd.util.inputEventHandler(callbackVariables,validator,successFxn,failureFxn);
  element.onchange = changeHandlerFunction;
}

//text input validation, setting functions
bd.util.setTextInputChangeEventHandlers = function(element,callbackVariables,validator,successFxn,failureFxn) {
  var changeHandlerFunction = bd.util.inputEventHandler(callbackVariables,validator,successFxn,failureFxn);
  element.onchange = changeHandlerFunction;
  element.onkeyup = changeHandlerFunction;
  element.onfocus = function(e) {
    this.hasFocus = true;
  };
  element.onblur = function(e) {
    this.hasFocus = false;
  };
}

bd.util.inputEventHandler = function(callbackVariables,validator,successFxn,failureFxn) {
  return function() {
    var validatorResult = true;
    if(validator) {
      validatorResult = validator.call(this,callbackVariables);
    }
    if(validatorResult) {
      if(successFxn) {
        successFxn.call(this,callbackVariables);
      }
    } else {
      if(failureFxn) {
        failureFxn.call(this,callbackVariables);
      }
    }
  }
}

bd.util.getTextInputValidatorFunction = function(validator) {

  var argumentsArray =  Array.prototype.slice.call(arguments,1);

  return function() {
    //create a copy of the arguments array
    var validatorArgumentsArray = argumentsArray.slice(0);

    //put the text box's value in the front of the array
    validatorArgumentsArray.splice(0,0,this.value)

    //call the validator with the appropriate arguments
    return validator.apply(null,validatorArgumentsArray);
  }

}

bd.util.prefixSuffix = function(name) {
  var prefix = name;
  var suffix = "";
  var matchResult = name.match(/^(.*?)(\d+)$/);
  if (matchResult) { 
    return [matchResult[1], matchResult[2]]; // List of prefix and suffix
  } else {
    return [name, ""];
  }
}

bd.util.blocklyRGBToCSS = function(colorValueOrObject) {
  var rgbArray;
  if(typeof colorValueOrObject == 'object' && colorValueOrObject['colorScheme']) {
    rgbArray = colorValueOrObject['value'];
  } else {
    rgbArray = colorValueOrObject
  }
  return "rgb("+ rgbArray[0] + "," + rgbArray[1] + "," + rgbArray[2] + ")";
}

bd.util.getPhoneGapPath = function() {
  var path = window.location.pathname;
  path = path.substr(0,path.lastIndexOf("/") + 1);
  return path;
};

bd.util.stringTest = "string";

//same code as bd.evaluator.ctr.arrayOrObject
bd.util.convertToArray = function(check) {
  var checkArray;
  if (bd.util.isArray(check)) {
    return check;
  } else if (check) {
    return [check];
  } else {
    return [];
  }
}


/*
Function.prototype.extend = function(parent) {
  var child = this;
  child.prototype = parent;
  child.prototype.$super = parent;
  child.prototype = new child(Array.prototype.slice.call(arguments,1));
  child.prototype.constructor = child
}
*/
/*
Function.prototype.extend = function(parent){
  var child = this;
  child.prototype = parent.prototype;
  child.prototype.$super = parent;
  child.prototype.constructor = child
}
*/
//var parentInstance = new bd.components.canvasObject()
//bd.components.pieceInstance.prototype = parentInstance
