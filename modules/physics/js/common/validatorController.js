goog.provide("bd.validator.ctr");

//should combine with getPropertyValidatorFunction...redundant code
bd.validator.ctr.getTextInputValidatorFunction = function(validator) {

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

bd.validator.ctr.getPropertyValidatorFunction = function(validator) {
  //get array of arguments to this function, except the validator
  var argumentsArray =  Array.prototype.slice.call(arguments,1);

  return function(value) {
    //create a copy of the arguments array
    var validatorArgumentsArray = argumentsArray.slice(0);

    //put the property value in the front of the array
    validatorArgumentsArray.splice(0,0,value)

    //call the validator with the appropriate arguments
    return validator.apply(null,validatorArgumentsArray);
  }
}

//common validators
bd.validator.ctr.isANumber = function(value) {
  return !isNaN(parseFloat(value));
}

bd.validator.ctr.isAPositiveNumber = function(value) {
  return bd.validator.ctr.matchesNumberComparison(value,">=",0);
}

bd.validator.ctr.matchesNumberComparison = function(value1,comparator,value2) {
  if(!bd.validator.ctr.isANumber(value1) || !bd.validator.ctr.isANumber(value2)) {
    return false;
  }
  var value1 = parseFloat(value1);
  var value2 = parseFloat(value2);
   switch(comparator) {
     case ">":
       return value1 > value2;
     case ">=":
      return value1 >= value2;
    case "<":
      return value1 < value2;
    case "<=":
      return value1 <= value2;
    case "==":
      return value1 == value2;
    default:
      return false;
  }

}

//inclusive by default
bd.validator.ctr.isBetweenNumbers = function(value, lowValue, highValue, lowNotInclusive, highNotInclusive) {
  var validLow = false;
  var validHigh = false;
  if( (lowNotInclusive && value > lowValue) || (!lowNotInclusive && value >= lowValue) ) {
    validLow = true;
  }
  if( (highNotInclusive && value < highValue) || (!highNotInclusive && value <= highValue) ) {
    validHigh = true;
  }
  return validLow && validHigh;
}
