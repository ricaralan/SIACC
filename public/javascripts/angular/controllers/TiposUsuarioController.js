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
    jsonToSend = {
      jsonTipoUsuario : json,
      jsonPermisos : jsonPermisos,
      jsonPermisosSobreTipoUsuario : $scope.getPermisosSobreUsuario()
    };
    if($scope.crearTipoUsuario) {
      $http.post("/tipo_usuario/create/", jsonToSend).success(function(data) {
        if(data.success) {
          $("#modalOpcionesTipoUsuario").closeModal();
          $scope.socket.emit("changeOnTiposUsuarios", {});
          Materialize.toast("El tipo de usuario se creó correctamente!", 4000);
        }
      });
    } else {
      $http.put("/tipo_usuario/update/", jsonToSend).success(function(data) {
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
    $scope.cleanPermisosTipoUsuario();
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
    .success(function(permisos) {
      $scope.setSelectedPermisosSistema(permisos.permisos_sistema);
      $scope.setSelectedPermisosPorTipoUsuario(permisos.permisos_tipos_usuario);
    });
    $("#modalOpcionesTipoUsuario").openModal();
  };

  $scope.setSelectedPermisosSistema = function(permisos) {
    for(var i = 0; i < permisos.length; i++) {
      $scope.checkedPermisoById("check-moa_ver-"+permisos[i].id_permiso, permisos[i].moa_ver);
      $scope.checkedPermisoById("check-moa_crear-"+permisos[i].id_permiso, permisos[i].moa_crear);
      $scope.checkedPermisoById("check-moa_editar-"+permisos[i].id_permiso, permisos[i].moa_editar);
      $scope.checkedPermisoById("check-moa_eliminar-"+permisos[i].id_permiso, permisos[i].moa_eliminar);
    }
  };

  $scope.setSelectedPermisosPorTipoUsuario = function(permisos) {
    for(permiso in permisos) {
      $scope.checkedPermisoById("radio_ver_todos_usuarios"+permisos[permiso].ptu_id_tipo_usuario_permiso, permisos[permiso].ptu_todos_usuarios);
      $scope.checkedPermisoById("radio_ver_usuarios_area"+permisos[permiso].ptu_id_tipo_usuario_permiso, permisos[permiso].ptu_solo_usuarios_area);
      $scope.checkedPermisoById("radio_no_ver_usuarios"+permisos[permiso].ptu_id_tipo_usuario_permiso, permisos[permiso].ptu_ningun_usuario);
      $scope.checkedPermisoById("check_ver_contrasena"+permisos[permiso].ptu_id_tipo_usuario_permiso, permisos[permiso].ptu_ver_contrasena);
    }
  };

  $scope.cleanPermisosTipoUsuario = function() {
    for(tipoUsuario in $scope.tiposUsuario) {
      $scope.checkedPermisoById("radio_ver_todos_usuarios" + $scope.tiposUsuario[tipoUsuario].id_tipo_usuario, 0);
      $scope.checkedPermisoById("radio_ver_usuarios_area" + $scope.tiposUsuario[tipoUsuario].id_tipo_usuario, 0);
      $scope.checkedPermisoById("radio_no_ver_usuarios" + $scope.tiposUsuario[tipoUsuario].id_tipo_usuario, 0);
      $scope.checkedPermisoById("check_ver_contrasena" + $scope.tiposUsuario[tipoUsuario].id_tipo_usuario, 0);
    }
  };

  $scope.checkedPermisoById = function(id, permiso) {
    if(!util.empty(permiso) || permiso == 0) {
      document.getElementById(id).checked = !util.empty(permiso) && permiso == 1;
    }
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

  $scope.getPermisosSobreUsuario = function() {
    checks = document.getElementsByClassName("checks_ver_contrasena");
    radios1 = document.getElementsByClassName("radio_ver_usuarios1");
    radios2 = document.getElementsByClassName("radio_ver_usuarios2");
    radios3 = document.getElementsByClassName("radio_ver_usuarios3");
    json = [];
    for(var i = 0; i < checks.length; i++) {
      json[i] = {
        ptu_id_tipo_usuario : $scope.formTipoUsuario.id_tipo_usuario,
        ptu_id_tipo_usuario_permiso : $scope.tiposUsuario[i].id_tipo_usuario,
        ptu_ver_contrasena  : checks[i].checked,
        ptu_todos_usuarios : radios1[i].checked,
        ptu_solo_usuarios_area : radios2[i].checked,
        ptu_ningun_usuario : radios3[i].checked
      };
    }
    return json
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
