SIACCApp.controller("TiposUsuarioController", ["$scope", "$http", "util", function($scope, $http, util) {

  $scope.tiposUsuario = [];
  $scope.todosLosPermisos = [];
  $scope.formTipoUsuario = {};
  $scope.crearTipoUsuario = true;
  $scope.opcAccion;
  $scope.socket = io();

  $scope.getTiposUsuario = function() {
    $http.get("/tipo_usuario/getTiposUsuario/").success(function(tiposUsuario) {
      $scope.tiposUsuario = tiposUsuario;
    });
  };

  $scope.setDatosCrearTipoUsuario = function() {
    $scope.crearTipoUsuario = true;
    $scope.opcAccion = "Crear"
    $scope.cleanFormTipoUsuario();
    $("#modalOpcionesTipoUsuario").openModal();
  };

  $scope.setTodosLosPermisos = function() {
    $http.get("/permisos/getPermisos").success(function(permisos) {
      $scope.todosLosPermisos = permisos;
    });
  };

  $scope.opcionTipoUsuario = function() {
    json = {
      id_tipo_usuario : $scope.formTipoUsuario.id_tipo_usuario,
      tipo_nombre : $scope.formTipoUsuario.tipo_nombre,
      tipo_descripcion : $scope.formTipoUsuario.tipo_descripcion,
      tipo_asignar_carrera : document.getElementById("check_asignar_carrera").checked,
      tipo_asignar_area : document.getElementById("check_asignar_area").checked
    };
    jsonPermisos = $scope.getPermisosSeleccionados();
    if($scope.crearTipoUsuario) {
      $http.post("/tipo_usuario/create/",{jsonTipoUsuario:json, jsonPermisos:jsonPermisos}).success(function(data) {
        if(data.success) {
          $("#modalOpcionesTipoUsuario").closeModal();
          $scope.socket.emit("changeOnTiposUsuarios", {});
          Materialize.toast("El tipo de usuario se creó correctamente!", 4000);
        }
      });
    } else {
      $http.put("/tipo_usuario/update/",{jsonTipoUsuario:json, jsonPermisos:jsonPermisos}).success(function(data) {
        $("#modalOpcionesTipoUsuario").closeModal();
        $scope.socket.emit("changeOnTiposUsuarios", {});
        Materialize.toast("El tipo de usuario se editó correctamente!", 4000);
      });
    }
  };

  $scope.getPermisosSeleccionados = function() {
    var arrayChecks = {};
    var checks = document.getElementsByClassName("checksOpcUsuario");
    for(var i = 0; i < checks.length; i++) {
      if(!arrayChecks[checks[i].getAttribute("permiso")]) {
        arrayChecks[checks[i].getAttribute("permiso")] = {};
      }
      arrayChecks[checks[i].getAttribute("permiso")][checks[i].id.split("-")[1]] = checks[i].checked;
    }
    return arrayChecks;
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
    $scope.cleanFormTipoUsuario();
    $scope.opcAccion = "Editar";
    $scope.formTipoUsuario = tipoUsuario;
    document.getElementById("check_asignar_carrera").checked = $scope.formTipoUsuario.tipo_asignar_carrera;
    document.getElementById("check_asignar_area").checked = $scope.formTipoUsuario.tipo_asignar_area;
    $http.get("/tipo_usuario/getPermisosTipoUsuario/"+tipoUsuario.id_tipo_usuario)
    .success(function(data) {
      $scope.setSelectedPermisosTiposUsuario(data);
    });
    $("#modalOpcionesTipoUsuario").openModal();
  };

  $scope.setSelectedPermisosTiposUsuario = function(permisos) {
    for(var i = 0; i < permisos.length; i++) {
      $scope.checkedPermisoById("check-moa_ver-"+permisos[i].id_permiso, permisos[i].moa_ver);
      $scope.checkedPermisoById("check-moa_crear-"+permisos[i].id_permiso, permisos[i].moa_crear);
      $scope.checkedPermisoById("check-moa_editar-"+permisos[i].id_permiso, permisos[i].moa_editar);
      $scope.checkedPermisoById("check-moa_eliminar-"+permisos[i].id_permiso, permisos[i].moa_eliminar);
    }
  };

  $scope.checkedPermisoById = function(id, permiso) {
    document.getElementById(id).checked = !util.empty(permiso) && permiso == 1;
  };

  $scope.deleteTipoUsuario = function(idTipoUsuario) {
    if(confirm("¿Esta seguro de eliminar el tipo de usuario?")) {
      $http.delete("/tipo_usuario/delete/" + idTipoUsuario).success(function(data) {
        if(data.affectedRows == 1) {
          $scope.socket.emit("changeOnTiposUsuarios", {});
          Materialize.toast("El tipo de usuario se eliminó correctamente!", 4000);
        } else {
          Materialize.toast("Ocurrio un error al eliminar", 4000);
        }
      });
    }
  };

  $scope.setTodosLosPermisos();
  $scope.getTiposUsuario();

  /**
  * LISTEN SOCKETS
  **/
  $scope.socket.on("changeOnTiposUsuarios", function(data) {
    $scope.getTiposUsuario();
  });

}]);
