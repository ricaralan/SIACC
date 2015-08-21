SIACCApp.controller("MesaAyudaAdministradorController", ["$scope", "$http", "util", function($scope, $http, util) {

  $scope.serviciosSinSolucionar = [];
  $scope.areas = [];
  $scope.servicio = {};
  $scope.socket = io();

  $http.get("/areas/getAreasAdministradorasMesaAyuda").success(function(areas) {
    $scope.areas = areas;
  });

  $scope.getServiciosSinSolucionar = function() {
    $http.get("/mesa_ayuda/getServiciosSinSolucionar").success(function(serviciosSinSolucionar) {
      $scope.serviciosSinSolucionar = serviciosSinSolucionar;
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

  $scope.showUsuarioService = function(servicio) {
    $("#modalUsuariosServicio").openModal();
  };

  $scope.guardarCambiosInfo = function() {
    mes_fecha_limite = document.getElementById("mes_fecha_limite").value;
    json  = {
      data : {
        id_mesa_ayuda : $scope.servicio.id_mesa_ayuda,
        mes_importancia : $scope.servicio.mes_importancia,
        mes_fecha_limite : util.empty(mes_fecha_limite) ? null : mes_fecha_limite
      }
    };
    $http.put("/mesa_ayuda/update", json).success(function(data) {
      if(data.success) {
        Materialize.toast("Datos guardados correctamente!", 2000);
        $scope.socket.emit("changeOnServiciosSinSolucionar", {});
      } else {
        Materialize.toast("OCURRIO UN ERROR!!", 4000);
      }
    });
  };

  $scope.socket.on("changeOnServiciosSinSolucionar", function(data) {
    $scope.getServiciosSinSolucionar();
  });

}]);
