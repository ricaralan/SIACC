SIACCApp.controller("MateriasController", ["$scope", "$http", "util", function($scope, $http, util) {

  $scope.opcionMateria;
  $scope.crearMateria;
  $scope.formMateria = {};

  $scope.setDatosCrearMateria = function() {
    $scope.opcionMateria = "Crear";
    $scope.crearMateria = true;
    $("#modalOpcionesMaterias").openModal();
  };

  $scope.opcionAccionMateria = function() {
    if($scope.validarCampos()) {
      if($scope.crearMateria) {
        $http.post("/materias/create", {
          jsonData : $scope.formMateria
        }).success(function(data) {
          if(data.success) {
            $scope.formMateria = {};
            Materialize.toast("Materia creada correctamente!", 3000);
          } else {
            Materialize.toast("Ocurrio un error!", 3000);
          }
        });
      } else {
        
      }
    } else {
      Materialize.toast("Materia no valida", 2000);
    }
  };

  $scope.validarCampos = function() {
    return !util.empty($scope.formMateria.mat_nombre) &&
           !util.empty($scope.formMateria.id_materia);
  };

}]);
