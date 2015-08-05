SIACCApp.controller("TiposServiciosController", ["$scope", "$http", "util", function($scope, $http, util) {

  $scope.crearTipoServicio;
  $scope.formTipoServicio = {};
  $scope.tiposServicios = [];
  $scope.socket = io();

  $scope.getTiposServicios = function() {
    $http.get("/tipo_servicio/getTiposServicios").success(function(tiposServicios) {
      $scope.tiposServicios = tiposServicios;
    });
  };

  $scope.setDatosCrearTipoServicio = function() {
    $scope.crearTipoServicio = true;
    $scope.opcAccion = "Crear";
    $scope.formTipoServicio = {};
    $("#modalOpcionesTipoServicio").openModal();
  };

  $scope.setDatosEditarTipoServicio = function(servicio) {
    $scope.crearTipoServicio = false;
    $scope.opcAccion = "Editar";
    $scope.formTipoServicio = servicio;
    $("#modalOpcionesTipoServicio").openModal();
  };

  $scope.opcionTipoServicio = function() {
    if($scope.formularioValido()){
      if($scope.crearTipoServicio) {
        $http.post("/tipo_servicio/create",{jsonTipoServicio : $scope.formTipoServicio})
        .success(function(data) {
          if(data.success) {
            $scope.socket.emit("changeOnTiposServicios", {});
            Materialize.toast("Tipo de servicio creado correctamente", 2000);
            $("#modalOpcionesTipoServicio").closeModal();
          }
        });
      } else {
        $http.put("/tipo_servicio/update",{
          jsonTipoServicio : $scope.formTipoServicio,
          idTipoServicio : $scope.formTipoServicio.id_tipo_servicio
        }).success(function(data) {
          if(data.success) {
            $scope.socket.emit("changeOnTiposServicios", {});
            $("#modalOpcionesTipoServicio").closeModal();
            Materialize.toast("Tipo de servicio editado correctamente", 2000);
          }
        });
      }
    } else {
      Materialize.toast("Completa los campos", 2000);
    }
  };

  $scope.deleteTipoServicio = function(idTipoServicio) {
    if(confirm("¿Esta seguro de eliminar el tipo de servicio?")) {
      $http.delete("/tipo_servicio/delete/"+idTipoServicio).success(function(data) {
        if(data.success) {
          $scope.socket.emit("changeOnTiposServicios", {});
        }
      });
    }
  };

  $scope.formularioValido = function() {
    return !util.empty($scope.formTipoServicio.tse_nombre);
  };

  $scope.socket.on("changeOnTiposServicios", function(data) {
    $scope.getTiposServicios();
  });

}]);
