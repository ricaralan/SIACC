var AreasModule = angular.module("AreasModule", ["AppModule"]);

AreasModule.controller("TiposAreasController", function($scope, $http) {

  $scope.tiposDeUsuarios;

  $scope.initTiposUsuarios = function() {
    $http.get("/users/getTypesUser").success(function(data) {
      $scope.tiposDeUsuarios = data;
    });
  };

  $scope.crearTipoDeArea = function() {
    if($scope.verificarFormularioTipoUsuario()) {
      console.log("formularioValido");
    }
  };

  $scope.verificarFormularioTipoUsuario = function() {
    formularioValido = true;
    if($scope.isEmpty($scope.nombreTipoArea) || $scope.isEmpty($scope.descripcionTipoArea)){
      Materialize.toast('No has llenado todos los campos!', 4000);
      formularioValido = false;
    }
    if(!$scope.checkUsuarios && !$scope.checkInventarios && !$scope.checkControlAcceso
      && !$scope.checkMesaAyuda){
      Materialize.toast('El área debe poder controlar al menos un módulo!', 4000);
      formularioValido = false;
    }
    if($scope.checkUsuarios) {
      checksUsuariosValidos = false;
      for(var i = 0; i < $scope.tiposDeUsuarios.length; i++) {
        check = document.getElementById("check"+$scope.tiposDeUsuarios[i].tipo_id);
        if(check.checked) {
          checksUsuariosValidos = true;
        }
      }
      if(!checksUsuariosValidos){
        Materialize.toast('No has seleccionado ningun tipo de usuario!', 4000);
        formularioValido = false;
      }
    }
    return formularioValido;
  };

  $scope.isEmpty = function(value) {
    return value == null || value.length == 0;
  };

  $scope.initTiposUsuarios();
});
