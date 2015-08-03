SIACCApp.controller("TiposInventariosController", ["$scope", "$http", "util", "multipartForm", function($scope, $http, util, multipartForm) {

  $scope.opcAccion;
  $scope.crearInventario;
  $scope.formTipoInventario = {};
  $scope.tiposInventarios = [];
  $scope.socket = io();

  $scope.getTiposInventarios = function() {
    $http.get("/tipo_inventario/getTiposInventarios").success(function(tipos) {
      $scope.tiposInventarios = tipos;
    });
  };

  $scope.setDatosCrearTipoInventario = function() {
    $scope.opcAccion = "Crear";
    $scope.formTipoInventario = {};
    $scope.crearInventario = true;
    $("#modalOpcionesTipoInventario").openModal();
  };

  $scope.setDatosEditarTipoInventario = function(tipoInventario) {
    $scope.formTipoInventario = tipoInventario;
    document.getElementById("tin_es_computadora").checked = tipoInventario.tin_es_computadora;
    $scope.opcAccion = "Editar";
    $scope.crearInventario = false;
    $("#modalOpcionesTipoInventario").openModal();
  };

  $scope.opcionTipoInventario = function() {
    if($scope.validarForm()) {
      if($scope.crearInventario) {
        multipartForm.post("/tipo_inventario/create", $scope.formTipoInventario, function(data) {
          if(data.success) {
            $scope.socket.emit("changeOnTiposInventarios", {});
            Materialize.toast("Creado exitosamente!", 2000);
            document.getElementById("formFoto").reset();
            $scope.formTipoInventario = {};
            $("#modalOpcionesTipoInventario").closeModal();
          }
        });
      } else {
        multipartForm.put("/tipo_inventario/update", $scope.formTipoInventario, function(data) {
          if(data.success) {
            $scope.socket.emit("changeOnTiposInventarios", {});
            Materialize.toast("Editado exitosamente!", 2000);
            document.getElementById("formFoto").reset();
            $scope.formTipoInventario = {};
            $("#modalOpcionesTipoInventario").closeModal();
          }
        });
      }
    } else {
      Materialize.toast("Debes llenar todos los campos!", 2000);
    }
  };

  $scope.eliminarTipoInvetario = function(idTipoInventario) {
    if(confirm("¿Estas seguro de eliminar este tipo de inventario?")) {
      $http.delete("/tipo_inventario/delete/"+idTipoInventario).success(function(data) {
        if(data.success) {
          $scope.socket.emit("changeOnTiposInventarios", {});
          Materialize.toast("Eliminado exitosamente!", 2000);
        } else {
          Materialize.toast("Ocurrio un error", 2000);
        }
      });
    }
  };

  $scope.validarForm = function() {
    return (!util.empty($scope.formTipoInventario.tin_nombre) &&
            !util.empty($scope.formTipoInventario.tin_descripcion));
  };

  $scope.socket.on("changeOnTiposInventarios", function(data) {
    $scope.getTiposInventarios();
  });

}]);
