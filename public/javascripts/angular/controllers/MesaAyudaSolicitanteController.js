SIACCApp.controller("MesaAyudaSolicitanteController", ["$scope", "$http", "util", function($scope, $http, util) {

  $scope.dataUsuario = {};
  $scope.servicios = [];
  $scope.formMesaAyuda = {};
  $scope.tipoServicio = {};
  $scope.serviciosSolicitadosEnProceso = [];
  $scope.serviciosSolicitadosSolucionados = [];
  $scope.servicioInfo = {};
  $scope.inventarios = [];
  $scope.checkAddInventario = false;
  $scope.socket = io();

  $scope.initTabs = function() {
    $('ul.tabs').tabs();
  };

  $scope.initDataUsuario = function() {
    $http.get("/usuarios/getIdUsuarioLogueado").success(function(data) {
      $http.get("/usuarios/getDataUsuario/" + data).success(function(dataUsuario) {
        $scope.dataUsuario = dataUsuario;
      });
    });
  };

  $scope.getInventarioArea = function() {
    $http.get("/inventarios/u/getInventarioArea/").success(function(inventarios) {
      $scope.inventarios = inventarios;
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

  $scope.showInfoService = function(servicio) {
    $scope.servicioInfo = servicio;
    $("#modalInfoServicio").openModal();
  };

  $scope.solicitarServicio = function() {
    check = document.getElementById("checkAddInventario");
    $scope.checkAddInventario = check.checked;
    if($scope.formularioValido()) {
      $scope.formMesaAyuda.mes_id_usuario = $scope.dataUsuario.id_usuario;
      $scope.formMesaAyuda.mes_id_area = $scope.dataUsuario.usu_id_area;
      $scope.formMesaAyuda.mes_id_inventario = ($scope.checkAddInventario)?$scope.formMesaAyuda.mes_id_inventario:null;
      $http.post("/mesa_ayuda/solicitar_servicio",{jsonData : $scope.formMesaAyuda}).success(function(data) {
        if(data.success) {
          $scope.formMesaAyuda = {};
          $scope.checkAddInventario = false;
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
      fecha = new Date(fechaTimeStamp);
      hora = fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
      return fechaTimeStamp.split("T")[0] + " " + hora;
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
