var UsuariosModule = angular.module("UsuariosModule", ["AppModule"]);

UsuariosModule.controller("TiposUsuarioController", ["$scope", "$http", function($scope, $http) {

  $scope.tiposUsuario = [];
  $scope.todosLosModulos = [];
  $scope.formTipoUsuario = {};
  $scope.crearTipoUsuario = true;
  $scope.socket = io();

  $scope.getTiposUsuario = function() {
    $http.get("/tipo_usuario/getTiposUsuario/").success(function(tiposUsuario) {
      $scope.tiposUsuario = tiposUsuario;
    });
  };

  $scope.setDatosCrearTipoUsuario = function() {
    $scope.crearTipoUsuario = true;
    document.getElementById("btnOpcionTipoUsuario").innerHTML = "CREAR";
    $scope.cleanFormTipoUsuario();
    $("#modalOpcionesTipoUsuario").openModal();
  };

  $scope.setTodosLosModulos = function() {
    $http.get("/modules/getModules").success(function(modulos) {
      $scope.todosLosModulos = modulos;
    });
  };

  $scope.opcionTipoUsuario = function() {
    json = encodeURIComponent(JSON.stringify({
      id_tipo_usuario : $scope.formTipoUsuario.id_tipo_usuario,
      tipo_nombre : $scope.formTipoUsuario.tipo_nombre,
      tipo_descripcion : $scope.formTipoUsuario.tipo_descripcion
    }));
    jsonPermisosPorModulo = encodeURIComponent(JSON.stringify($scope.getPermisosPorModulo()));
    if($scope.crearTipoUsuario) {
      $http.post("/tipo_usuario/create/"+json+"/"+jsonPermisosPorModulo).success(function(data) {
        if(data.success) {
          $("#modalOpcionesTipoUsuario").closeModal();
          $scope.cleanFormTipoUsuario();
          $scope.socket.emit("changeOnTiposUsuarios", {});
          Materialize.toast("El tipo de usuario se creó correctamente!", 4000);
        }
      });
    } else {
      $http.put("/tipo_usuario/update/"+json+"/"+jsonPermisosPorModulo).success(function(data) {
        $("#modalOpcionesTipoUsuario").closeModal();
        $scope.cleanFormTipoUsuario();
        $scope.socket.emit("changeOnTiposUsuarios", {});
        Materialize.toast("El tipo de usuario se editó correctamente!", 4000);
      });
    }
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

  $scope.cleanFormTipoUsuario = function() {
    $scope.formTipoUsuario = {};
    $scope.cleanChecksPermisosTipoUsuario();
  };

  $scope.cleanChecksPermisosTipoUsuario = function() {
    checks = document.getElementsByClassName("checksOpcUsuario");
    for(var i = 0; i < checks.length; i++) {
      checks[i].checked = false;
    }
  };

  $scope.setDatosEditarTipoUsuario = function(tipoUsuario) {
    $scope.crearTipoUsuario = false;
    document.getElementById("btnOpcionTipoUsuario").innerHTML = "EDITAR";
    $scope.formTipoUsuario = tipoUsuario;
    $http.get("/tipo_usuario/getPermisosPorModuloTipoUsuario/"+tipoUsuario.id_tipo_usuario)
    .success(function(data) {
      $scope.setSelectedPermisosTiposUsuario(data);
    });
    $("#modalOpcionesTipoUsuario").openModal();
  };

  $scope.setSelectedPermisosTiposUsuario = function(permisos) {
    for(var i = 0; i < permisos.length; i++) {
      check = document.getElementById("check"+permisos[i].moa_id_modulo);
      check.checked = permisos[i].moa_area_controla_mod;
    }
  };

  $scope.deleteTipoUsuario = function(idTipoUsuario) {
    $http.delete("/tipo_usuario/delete/" + idTipoUsuario).success(function(data) {
      if(data.affectedRows == 1) {
        $scope.socket.emit("changeOnTiposUsuarios", {});
        Materialize.toast("El tipo de usuario se eliminó correctamente!", 4000);
      } else {
        Materialize.toast("Ocurrio un error al eliminar", 4000);
      }
    });
  };

  $scope.setTodosLosModulos();
  $scope.getTiposUsuario();

  /**
  * LISTEN SOCKETS
  **/
  $scope.socket.on("changeOnTiposUsuarios", function(data) {
    $scope.getTiposUsuario();
  });

}]);

UsuariosModule.controller("UsuariosController", ["$scope","$http", function($scope, $http) {

  $scope.tiposUsuario = [];

  $scope.getTiposUsuario = function() {
    $http.get("/tipo_usuario/getTiposUsuario/").success(function(tiposUsuario) {
      $scope.tiposUsuario = tiposUsuario;
    });
  };

  $scope.setDatosCrearUsuario = function() {
    $("#modalOpcionesUsuario").openModal();
  };

  $scope.getTiposUsuario();

}]);
