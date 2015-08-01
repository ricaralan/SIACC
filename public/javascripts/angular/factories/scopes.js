SIACCApp.factory("scopes", [function() {
  var scopes = [];
  return  {
    set : function(key, value) {
      scopes[key] = value;
    }, get : function(key) {
      return scopes[key];
    }
  };
}]);
