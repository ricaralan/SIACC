SIACCApp.service("empty", [function() {
  this.empty = function(value) {
    return value == undefined || value == null || value.length == 0;
  };
}]);
