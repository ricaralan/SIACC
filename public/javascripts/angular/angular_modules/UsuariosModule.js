var UsuariosModule = angular.module("UsuariosModule", ["AppModule"]);

UsuariosModule.controller("TiposUsuarioController", ["$scope", "$http", function($scope, $http) {

  $scope.todosLosModulos = [];
  $scope.formTipoUsuario = {};

  $scope.setDatosCrearTipoUsuario = function() {
    $("#modalOpcionesTipoUsuario").openModal();
  };

  $scope.setTodosLosModulos = function() {
    // TODO hacer que todos los módulos se carguen aquí
    $http.get("/modules/getModules").success(function(modulos) {
      $scope.todosLosModulos = modulos;
    });
  };

  $scope.opcionTipoUsuario = function() {
    json = encodeURIComponent(JSON.stringify({
      tipo_nombre : $scope.formTipoUsuario.tipo_nombre,
      tipo_descripcion : $scope.formTipoUsuario.tipo_descripcion
    }));
    jsonPermisosPorModulo = encodeURIComponent(JSON.stringify($scope.getPermisosPorModulo()));
    $http.post("/tipo_usuario/create/"+json+"/"+jsonPermisosPorModulo).success(function(data) {
      console.log(data);
    });
  };

  $scope.getPermisosPorModulo = function() {
    checks = document.getElementsByClassName("checksOpcUsuario");
    var json = [];
    for(var i = 0; i < checks.length; i++) {
      json.push({
        moa_id_modulo : checks[i].getAttribute("modulo"),
        moa_area_controla_mod : checks[i].checked
      });
    }
    return json;
  };

  $scope.setTodosLosModulos();

}]);
