SIACCApp.controller("MesaAyudaAdministradorController", ["$scope", "$http", "util", function($scope, $http, util) {

  $scope.serviciosSinSolucionar = [];
  $scope.areas = [];
  $scope.socket = io();

  $http.get("/areas/getAreasAdministradorasMesaAyuda").success(function(areas) {
    $scope.areas = areas;
  });

  $scope.getServiciosSinSolucionar = function() {
    $http.get("/mesa_ayuda/getServiciosSinSolucionar").success(function(serviciosSinSolucionar) {
      $scope.serviciosSinSolucionar = serviciosSinSolucionar;
    });
  };

  $scope.getFormatDateTimeStamp = function(fechaTimeStamp) {
    return fechaTimeStamp.split("T")[0] + " " + util.getHour(fechaTimeStamp);
  };

  $scope.socket.on("changeOnServiciosSinSolucionar", function(data) {
    $scope.getServiciosSinSolucionar();
  });

}]);
