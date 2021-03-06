SIACCApp.controller("TiposAreasController", ["$scope","$http","multipartForm", "util", function($scope, $http, multipartForm, util) {

  $scope.tiposDeAreas;
  $scope.formTipoArea = {};
  $scope.registrarTipoArea = true;
  $scope.opcAccion;
  $scope.todosLosPermisos = [];
  $scope.socket = io();

  $scope.getTiposAreas = function() {
    $http.get("/tipoArea/getTiposArea").success(function(tiposAreas) {
      $scope.tiposAreas = tiposAreas;
    });
  };

  $scope.getTodosLosPermisos = function() {
    $http.get("/permisos/getPermisos").success(function(permisos) {
      $scope.todosLosPermisos = permisos;
    });
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

  $scope.setDatosCrearTipoArea = function() {
    $('#modalOpcionesTipoArea').openModal();
    $scope.formTipoArea = {};
    $scope.registrarTipoArea = true;
    $scope.opcAccion = "Crear";
  };

  $scope.opcionTipoArea = function() {
    if($scope.validarFormularioTipoArea()) {
      if($scope.registrarTipoArea) {
        // TODO REGISTRAR
        var uploadURI = "/tipoArea/create/";
        multipartForm.post(uploadURI, $scope.formTipoArea, function(data) {
          if(data.success) {
            $http.post("/tipoArea/asignarPermisosTipoArea",{
              idTipoArea:data.idTipoArea,
              permisos : $scope.getPermisosSeleccionados()
              }).success(function(data) {});
            $scope.socket.emit("changeOnTiposAreas", {});
            $scope.cleanFormTipoArea();
            Materialize.toast("El tipo de área se creó correctamente!", 4000);
          } else {
            Materialize.toast("Ocurrio un error al crear...", 4000);
          }
        });
      } else {
        // TODO ACTUALIZAR
        var uploadURI = "/tipoArea/update/";
        multipartForm.put(uploadURI, $scope.formTipoArea, function(data) {
          if(data.success) {
            $http.put("/tipoArea/updatePermisosTipoArea", {
              idTipoArea:$scope.formTipoArea.id_tipo_area,
              permisos : $scope.getPermisosSeleccionados()
            }).success(function(data) {});
            $scope.socket.emit("changeOnTiposAreas", {});
            $scope.cleanFormTipoArea();
            Materialize.toast("El tipo de área se editó correctamente!", 4000);
          } else {
            Materialize.toast("Ocurrio un error al editar...", 4000);
          }
        });
      }
    }
  };

  $scope.eliminarTipoArea = function(id_tipo_area) {
    if(confirm("¿Esta seguro de eliminar el tipo de área?")) {
      $http.delete("/tipoArea/delete/" + id_tipo_area).success(function(data) {
        if(data.success) {
          $scope.socket.emit("changeOnTiposAreas", {});
          Materialize.toast("El tipo de área se eliminó correctamente!", 4000);
        } else {
          Materialize.toast("Ocurrio un error al eliminar...", 4000);
        }
      });
    }
  };

  $scope.validarFormularioTipoArea = function() {
    if(util.empty($scope.formTipoArea.tipo_nombre) || util.empty($scope.formTipoArea.tipo_descripcion)) {
      Materialize.toast("Tienes que llenar los campos!", 4000);
      return false;
    }
    return true;
  };

  $scope.setDatosEditarTipoArea = function(tipoArea) {
    $http.get("/tipoArea/getPermisosTipoArea/"+tipoArea.id_tipo_area)
    .success(function(data) {
      $scope.setSelectedPermisosTiposUsuario(data);
    });
    $scope.formTipoArea = tipoArea;
    $scope.registrarTipoArea = false;
    $scope.opcAccion = "Editar";
    $('#modalOpcionesTipoArea').openModal();
  };

  $scope.setSelectedPermisosTiposUsuario = function(permisos) {
    for(var i = 0; i < permisos.length; i++) {
      $scope.checkedPermisoById("check-moa_ver-"+permisos[i].id_permiso, permisos[i].moa_ver);
    }
  };

  $scope.checkedPermisoById = function(id, permiso) {
    document.getElementById(id).checked = !util.empty(permiso) && permiso == 1;
  };

  $scope.cleanFormTipoArea = function() {
    $scope.formTipoArea = {};
    document.getElementById("formTipoFoto").reset();
    $('#modalOpcionesTipoArea').closeModal();
  };

  $scope.getTiposAreas();

  /**
  * LISTEN SOCKETS
  */
  $scope.socket.on("changeOnTiposAreas", function(datos){
    $scope.getTiposAreas();
  });


}]);
