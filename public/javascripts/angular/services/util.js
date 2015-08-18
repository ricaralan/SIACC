SIACCApp.service("util", ["$http", function($http) {

  this.empty = function(value) {
    return !value || value.length == 0;
  };

  this.isNumber = function(strNumber) {
    return !isNaN(parseFloat(strNumber)) && isFinite(strNumber);
  };

  this.getDate = function(separator) {
    date = new Date();
    año = date.getFullYear();
    mes = date.getMonth() + 1;
    dia = date.getDate();
    return año+separator+mes+separator+dia;
  };

  this.getHour = function() {
    date = new Date().toString().split(":");
    return date[0].substr(date[0].length-2,2) + ":" + date[1] + ":" + date[2].substr(0,2);
  };

  this.getPermisosUserLog = function(callback) {
    $http.get("/permisos/getPermisosUserLog").success(callback);
  };

}]);
