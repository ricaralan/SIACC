SIACCApp.controller("ReporteAccesosController", ["$scope", "$http", "util", function($scope, $http, util) {

  $scope.dataReport = {};
  $scope.areas = [];
  $scope.areaSeleccionada = {};
  $scope.accesos = [];

  $scope.getAreas = function() {
    $http.get("/areas/getAreasConPermisoAccesos").success(function(areas) {
      $scope.areas = areas;
    });
  };

  $scope.changeArea = function(area) {
    for(var i = 0; i < $scope.areas.length; i++) {
      if(area == $scope.areas[i].id_area) {
        $scope.areaSeleccionada = $scope.areas[i];
      }
    }
    console.log($scope.areaSeleccionada);
  };

  $scope.getFormatDate = function(fechaTimeStamp) {
    if(fechaTimeStamp){
      return fechaTimeStamp.split("T")[0];
    }
    return null;
  };

  $scope.showReport = function() {
    if($scope.validateForm()) {
      document.getElementById("contentReport").style.display = "block";
      URL = "/reports/get/acceso_area/" + $scope.dataReport.area
          + "/" + $scope.dataReport.tipoAcceso + "/" + $scope.dataReport.fechaInicio
          + "/" + $scope.dataReport.fechaFin;
      $http.get(URL).success(function(data) {
        console.log(data);
        $scope.accesos = data;
      });
    }
  };

  $scope.hideReport = function() {
    document.getElementById("contentReport").style.display = "none";
  };

  $scope.validateForm = function() {
    if(!util.empty($scope.dataReport.fechaInicio) &&
      !util.empty($scope.dataReport.area) &&
      !util.empty($scope.dataReport.fechaFin) &&
      !util.empty($scope.dataReport.tipoAcceso)){
        if($scope.dataReport.tipoAcceso == 1 || $scope.dataReport.tipoAcceso == 2) {
          return true;
        } else {
          Materialize.toast("Tienes que elegir un tipo de acceso", 2000);
        }
    } else {
      Materialize.toast("Tienes que llenar todos los campos", 2000);
    }
    return false;
  };

}]);
