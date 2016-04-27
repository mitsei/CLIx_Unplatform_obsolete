goog.provide("bd.projectParam.ctr");

bd.projectParam.ctr.tableData = [['parameter1','10']];
bd.projectParam.ctr.handsOnTable = null;
bd.projectParam.ctr.setupPlayerCallback = null;

bd.projectParam.ctr.setupInputTable = function() {
  var projectParametersContainer = document.getElementById("projectParametersInitializationContainer");
  projectParametersContainer.style.display = "block";
  var submitButton = projectParametersContainer.getElementsByClassName("projectParametersSubmitButton")[0];
  var projectParams = bd.util.getURLParamValue("projectParams");
  if(projectParams != "") {
    //give table data the data from url
    bd.projectParam.ctr.setTableDataFromUrl();
    bd.projectParam.ctr.submitProjectParams();
  } else {
    submitButton.style.display = "block";
    var instructionsLabel = projectParametersContainer.getElementsByClassName("projectParametersTypeInstructions")[0];
    instructionsLabel.style.display = "inline";
    var tableLabel = projectParametersContainer.getElementsByClassName("projectParametersLabel")[0];
    tableLabel.style.display = "none";
    //make table not read only
    bd.projectParam.ctr.handsOnTable.updateSettings({readOnly:false})
  }
}

bd.projectParam.ctr.setTableDataFromUrl = function() {
  var newTableData = [];
  var projectParams = bd.util.getURLParamValue("projectParams");
  var returnValue = "nullObject";
  if(projectParams != "") {
    try {
      var projectParamsObject = JSON.parse(decodeURIComponent(projectParams));
      for(var paramName in projectParamsObject) {
        newTableData.push([paramName,projectParamsObject[paramName]]);
      }
    } catch (e) {

    }
  }
  bd.projectParam.ctr.tableData = newTableData;
  bd.projectParam.ctr.handsOnTable.updateSettings({data:bd.projectParam.ctr.tableData});
}

bd.projectParam.ctr.initializeInputTable = function() {
  var projectParametersContainer = document.getElementById("projectParametersInitializationContainer");
  //should only work in editor and on game page
  if(!projectParametersContainer) {
    return;
  }
  var tableContainer = projectParametersContainer.getElementsByClassName("projectParametersTableContainer")[0];
  bd.projectParam.ctr.handsOnTable = new Handsontable(tableContainer,{
    data:bd.projectParam.ctr.tableData,
    minSpareRows:1,
    colHeaders:["Name", "Value"]
    //columns:tableClass.getHandsOnTableColumnTypes(),
    //readOnly: isReadOnly,
    //contextMenu:['row_above','row_below','remove_row','undo','redo']
  });
  projectParametersContainer.style.display = "none";
}

bd.projectParam.ctr.doesProjectContainGetParamsBlock = function() {
  var allBlocks = bd.model.getAllEvaluatorBlocks();
  for(var i=0;i<allBlocks.length; i++) {
    if(allBlocks[i]._type == 'project_get_parameter') {
      return true;
    }
  }
  return false;
}

bd.projectParam.ctr.submitProjectParams = function() {
  var projectParametersContainer = document.getElementById("projectParametersInitializationContainer");
  var submitButton = projectParametersContainer.getElementsByClassName("projectParametersSubmitButton")[0];
  submitButton.style.display = "none";
  var instructionsLabel = projectParametersContainer.getElementsByClassName("projectParametersTypeInstructions")[0];
  instructionsLabel.style.display = "none";
  var tableLabel = projectParametersContainer.getElementsByClassName("projectParametersLabel")[0];
  tableLabel.style.display = "inline";
  
  //make table read only
  bd.projectParam.ctr.handsOnTable.updateSettings({readOnly:true})
  if(!bd.inPlayer) {
    bd.preview.ctr.handlePlayerSelection();
  } else {
    bd.projectParam.ctr.setupPlayerCallback();
  }
}

bd.projectParam.ctr.setupParamsInPlayer = function(callback) {
  bd.projectParam.ctr.setupPlayerCallback = callback;

  //determine if using project parameters
  var doesProjectIncludeParameters = bd.projectParam.ctr.doesProjectContainGetParamsBlock();
  if(doesProjectIncludeParameters) {
    //if so, call project param handler
    bd.projectParam.ctr.setupInputTable();
  } else {
    //if not, call callback function to continue setup
    callback();
  }
}

jQuery(document).ready(function() {
  
  bd.projectParam.ctr.initializeInputTable();
  

  jQuery(".projectParametersSubmitButton").click(function(e) {
    bd.projectParam.ctr.submitProjectParams();
    return false;
  });
  
});