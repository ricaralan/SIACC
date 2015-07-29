SIACCApp.service("util", [function() {

  this.empty = function(value) {
    return value == undefined || value == null || value.length == 0;
  };

  this.null = function(value) {
    return value == null;
  };

}]);
