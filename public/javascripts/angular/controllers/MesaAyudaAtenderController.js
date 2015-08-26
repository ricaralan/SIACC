SIACCApp.controller("MesaAyudaAtenderController", ["$scope", "$http", "util", function($scope, $http, util) {

  $scope.serviciosSinSolucionar = [];
  $scope.serviciosSolucionados = [];
  $scope.usuarioAtiendenMesa = [];
  $scope.formServicioSolucionado = {};
  $scope.socket = io();

  $scope.initTabs = function() {
    $('ul.tabs').tabs();
  };

  $scope.getServiciosSinSolucionarUsuario = function() {
    $http.get("/mesa_ayuda/getServiciosSinSolucionar/u").success(function(serviciosSinSolucionar) {
      $scope.serviciosSinSolucionar = serviciosSinSolucionar;
    });
  };

  $scope.getServiciosSolucionadosUsuario = function() {
    $http.get("/mesa_ayuda/getServiciosSolucionados/u").success(function(serviciosSolucionados) {
      $scope.serviciosSolucionados = serviciosSolucionados;
    });
  };

  $scope.getFormatDateTimeStamp = function(fechaTimeStamp) {
    if(fechaTimeStamp){
      return fechaTimeStamp.split("T")[0] + " " + fechaTimeStamp.split("T")[1].substr(0, 8);
    }
    return null;
  };

  $scope.showInfoService = function(servicio) {
    $("#modalInfoServicio").openModal();
    if(servicio.mes_fecha_limite) {
      document.getElementById("mes_fecha_limite").value = servicio.mes_fecha_limite.split("T")[0];
    }
    $scope.servicio = servicio;
  };

  $scope.showUsuarioService = function(idArea, idMesaAyuda, uam_id_area_atiende_mesa) {
    $scope.datosAsignarUsuariosMesa = {
      id_area : idArea,
      id_mesa_ayuda : idMesaAyuda,
      uam_id_area_atiende_mesa : uam_id_area_atiende_mesa
    };
    $("#modalUsuariosServicio").openModal();
    $http.get("/mesa_ayuda/getUsuariosAtiendenMesa/"+idMesaAyuda).success(function(usuarios) {
      $scope.usuarioAtiendenMesa = usuarios;
    });
  };

  $scope.doneService = function(id_mesa_ayuda,id_area_atiende_mesa) {
    $scope.servicioConcluir = {
      id_area_atiende_mesa : id_area_atiende_mesa
    };
    $("#modalDoneService").openModal();
  };

  $scope.concluirServicio = function() {
    checkbox = document.getElementById("servicioConcluido");
    $scope.formServicioSolucionado.aam_soluciono = checkbox && checkbox.checked;
    json = {
      datosServicioSolucionado : $scope.formServicioSolucionado,
      id_area_atiende_mesa : $scope.servicioConcluir.id_area_atiende_mesa
    };
    $http.post("/mesa_ayuda/concluirServicio", json).success(function(data) {
      if(data.success) {
        $scope.socket.emit("changeOnServiciosSinSolucionar", {});
        $("#modalDoneService").closeModal();
        Materialize.toast("Servicio concluído", 2000);
        $scope.formServicioSolucionado = {};
      }
    });
  };

  $scope.socket.on("changeOnServiciosSinSolucionar", function(data) {
    $scope.getServiciosSinSolucionarUsuario();
    $scope.getServiciosSolucionadosUsuario();
  });

}]);
