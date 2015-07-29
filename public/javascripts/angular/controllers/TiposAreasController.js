SIACCApp.controller("TiposAreasController", ["$scope","$http","multipartForm", function($scope, $http, multipartForm) {

  $scope.tiposDeAreas;
  $scope.formTipoArea = {};
  $scope.registrarTipoArea = true;
  $scope.socket = io();

  $scope.getTiposAreas = function() {
    $http.get("/tipoArea/getTiposArea").success(function(tiposAreas) {
      $scope.tiposAreas = tiposAreas;
    });
  };

  $scope.setDatosCrearTipoArea = function() {
    $('#modalOpcionesTipoArea').openModal();
    $scope.formTipoArea = {};
    $scope.registrarTipoArea = true;
    btnOpcionTipoAreas.innerHTML = "CREAR";
  };

  $scope.opcionTipoArea = function() {
    if($scope.registrarTipoArea && $scope.validarFormularioTipoArea()) {
      // TODO REGISTRAR
      var uploadURI = "/tipoArea/create/";
      multipartForm.post(uploadURI, $scope.formTipoArea, function(data) {
        if(data.success) {
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
          $scope.socket.emit("changeOnTiposAreas", {});
          $scope.cleanFormTipoArea();
          Materialize.toast("El tipo de área se editó correctamente!", 4000);
        } else {
          Materialize.toast("Ocurrio un error al editar...", 4000);
        }
      });
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
    if($scope.isEmpty($scope.formTipoArea.tipo_nombre) || $scope.isEmpty($scope.formTipoArea.tipo_descripcion)) {
      Materialize.toast("Tienes que llenar los campos!", 4000);
      return false;
    }
    return true;
  };

  $scope.setDatosEditarTipoArea = function(tipoArea) {
    $scope.formTipoArea = tipoArea;
    $scope.registrarTipoArea = false;
    btnOpcionTipoAreas.innerHTML = "EDITAR";
    $('#modalOpcionesTipoArea').openModal();
  };

  $scope.cleanFormTipoArea = function() {
    $scope.formTipoArea = {};
    document.getElementById("formTipoFoto").reset();
    $('#modalOpcionesTipoArea').closeModal();
  };

  $scope.isEmpty = function(value) {
    return value == null || value.length == 0;
  };

  $scope.getTiposAreas();

  /**
  * LISTEN SOCKETS
  */
  $scope.socket.on("changeOnTiposAreas", function(datos){
    $scope.getTiposAreas();
  });


}]);
