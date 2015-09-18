SIACCApp.controller("MesaAyudaAdministradorController", ["$scope", "$http", "util", function($scope, $http, util) {

  $scope.serviciosSinSolucionar = [];
  $scope.serviciosSinFinalizar = [];
  $scope.areas = [];
  $scope.servicio = {};
  $scope.usuarioAtiendenMesa = [];
  $scope.datosAsignarUsuariosMesa = {};
  $scope.servicioConcluir = {};
  $scope.formServicioSolucionado = {};
  $scope.socket = io();

  $http.get("/areas/getAreasAdministradorasMesaAyuda").success(function(areas) {
    $scope.areas = areas;
  });

  $scope.getServiciosSinFinalizar = function() {
    $http.get("/mesa_ayuda/getServiciosSinFinalizar").success(function(serviciosSinFinalizar) {
      $scope.serviciosSinFinalizar = serviciosSinFinalizar;
    });
  };

  $scope.getServiciosSinSolucionar = function() {
    $http.get("/mesa_ayuda/getServiciosSinSolucionar").success(function(serviciosSinSolucionar) {
      $scope.serviciosSinSolucionar = serviciosSinSolucionar;
    });
  };

  $scope.getFormatDateTimeStamp = function(fechaTimeStamp) {
    if(fechaTimeStamp){
      fecha = new Date(fechaTimeStamp);
      hora = fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
      return fechaTimeStamp.split("T")[0] + " " + hora;
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

  $scope.getUsuarioPuedenAtenderMesa = function(palabra) {
    if(!palabra || palabra.length == 0) {
      $http.get("/mesa_ayuda/getUsuariosAtiendenMesa/"+$scope.datosAsignarUsuariosMesa.id_mesa_ayuda).success(function(usuarios) {
        $scope.usuarioAtiendenMesa = usuarios;
      });
    } else {
      //$http.get("/mesa_ayuda/getUsuariosAtencionMesaAyudaByText/"+palabra+"/"+$scope.datosAsignarUsuariosMesa.id_area).success(function(usuarios) {
      $http.get("/mesa_ayuda/test/testGetUsuariosAtencionMesaAyudaByText/"+$scope.datosAsignarUsuariosMesa.id_mesa_ayuda+"/"+palabra+"/"+$scope.datosAsignarUsuariosMesa.id_area).success(function(usuarios) {
        $scope.usuarioAtiendenMesa = usuarios;
      });
    }
  };

  $scope.agregarUsuarioMesa = function(idUsuario) {
    URL = "/mesa_ayuda/asignarUsuarioMesa/"+idUsuario+"/"+$scope.datosAsignarUsuariosMesa.uam_id_area_atiende_mesa;
    $http.post(URL).then(function(data) {
      $http.get("/mesa_ayuda/getUsuariosAtiendenMesa/"+$scope.datosAsignarUsuariosMesa.id_mesa_ayuda).success(function(usuarios) {
        $scope.usuarioAtiendenMesa = usuarios;
        $scope.socket.emit("changeUsuariosAsignadosServicio", {});
      },function(err) {console.log(err)});
    });
  };

  $scope.eliminarUsuarioMesa = function(idUsuario) {
    $http.put("/mesa_ayuda/eliminarUsuarioMesa/"+idUsuario+"/"+$scope.datosAsignarUsuariosMesa.uam_id_area_atiende_mesa).success(function(data) {
      $http.get("/mesa_ayuda/getUsuariosAtiendenMesa/"+$scope.datosAsignarUsuariosMesa.id_mesa_ayuda).success(function(usuarios) {
        $scope.usuarioAtiendenMesa = usuarios;
        $scope.socket.emit("changeUsuariosAsignadosServicio", {});
      });
    });
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
    $scope.getServiciosSinSolucionar();
    $scope.getServiciosSinFinalizar();
  });

}]);
