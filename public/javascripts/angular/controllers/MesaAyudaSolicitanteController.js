SIACCApp.controller("MesaAyudaSolicitanteController", ["$scope", "$http", "util", function($scope, $http, util) {

  $scope.dataUsuario = {};
  $scope.servicios = [];
  $scope.formMesaAyuda = {};
  $scope.tipoServicio = {};
  $scope.serviciosSolicitadosEnProceso = [];
  $scope.serviciosSolicitadosSolucionados = [];
  $scope.socket = io();

  $scope.initDataUsuario = function() {
    $http.get("/usuarios/getIdUsuarioLogueado").success(function(data) {
      $http.get("/usuarios/getDataUsuario/" + data).success(function(dataUsuario) {
        $scope.dataUsuario = dataUsuario;
      });
    });
  };

  $scope.getServiciosSolicitadosEnProceso = function() {
    $http.get("/mesa_ayuda/getServiciosSolicitadosEnProceso/u").success(function(servicios) {
      $scope.serviciosSolicitadosEnProceso = servicios;
    });
  };

  $scope.getServiciosSolicitadosSolucionados = function() {
    $http.get("/mesa_ayuda/getServiciosSolicitadosSolucionados/u").success(function(servicios) {
      $scope.serviciosSolicitadosSolucionados = servicios;
    });
  };

  $scope.getTiposServicios = function() {
    $http.get("/tipo_servicio/getTiposServicios").success(function(servicios) {
      $scope.servicios = servicios;
    });
  };

  $scope.setDatosSolicitarServicio = function() {
    $("#modalOpcionesSolicitarServicio").openModal();
  };

  $scope.setTipoServicio = function(idTipoServicio) {
    for(var i = 0; i < $scope.servicios.length; i++) {
      if($scope.servicios[i].id_tipo_servicio == idTipoServicio) {
          $scope.tipoServicio = $scope.servicios[i];
      }
    }
  };

  $scope.solicitarServicio = function() {
    if($scope.formularioValido()) {
      $scope.formMesaAyuda.mes_id_usuario = $scope.dataUsuario.id_usuario;
      $scope.formMesaAyuda.mes_id_area = $scope.dataUsuario.usu_id_area;
      $http.post("/mesa_ayuda/solicitar_servicio",{jsonData : $scope.formMesaAyuda}).success(function(data) {
        if(data.success) {
          $scope.formMesaAyuda = {};
          Materialize.toast("Solicitud enviada", 2000);
          $("#modalOpcionesSolicitarServicio").closeModal();
          $scope.socket.emit("changeOnServiciosSinSolucionar", {});
        } else {
          Materialize.toast("Ocurrio un error!", 2000);
        }
      });
    } else {
      Materialize.toast("Debes completar todos los campos", 2000);
    }
  };

  $scope.formularioValido = function() {
    valido = true;
    if($scope.tipoServicio.tse_otro!=0 && $scope.tipoServicio.tse_otro) {
      valido = !util.empty($scope.formMesaAyuda.mes_otro_tipo_servicio);
    } else {
      $scope.formMesaAyuda.mes_otro_tipo_servicio = null;
    }
    return valido && !util.empty($scope.formMesaAyuda.mes_descripcion_problema);
  };

  $scope.getFormatDateTimeStamp = function(fechaTimeStamp) {
    if(fechaTimeStamp){
      return fechaTimeStamp.split("T")[0] + " " + fechaTimeStamp.split("T")[1].substr(0, 8);
    }
    return null;
  };

  /**
  * LISTEN SOCKETS
  */

  $scope.socket.on("changeOnServiciosSinSolucionar", function() {
    $scope.getServiciosSolicitadosEnProceso();
    $scope.getServiciosSolicitadosSolucionados();
  });

}]);
