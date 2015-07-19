var UsuariosModule = angular.module("UsuariosModule", ["AppModule"]);

UsuariosModule.controller("TiposUsuarioController", ["$scope", "$http", function($scope, $http) {

  $scope.todosLosModulos = [];

  $scope.setDatosCrearTipoUsuario = function() {
    $("#modalOpcionesTipoUsuario").openModal();
  };

  $scope.setTodosLosModulos = function() {
    // TODO hacer que todos los módulos se carguen aquí
    $http.get("/modules/getModules").success(function(modulos) {
      $scope.todosLosModulos = modulos;
    });
  };

  $scope.setTodosLosModulos();

}]);
