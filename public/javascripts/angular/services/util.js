SIACCApp.service("util", [function() {

  this.empty = function(value) {
    return !value || value.length == 0;
  };

  this.isNumber = function(strNumber) {
    return !isNaN(parseFloat(strNumber)) && isFinite(strNumber);
  };

}]);
