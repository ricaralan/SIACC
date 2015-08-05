SIACCApp.controller("ControlAccesoController", ["$scope", "$http", "scopes", "util", function($scope, $http, scopes, util) {

  scopes.set("ControlAccesoController", $scope);
  $scope.idArea;
  $scope.tipoAcceso;
  $scope.accesos = [];
  $scope.findUsuarios = [];
  $scope.datosInventarioAcceso = {};
  $scope.registrarAccesoBoolean;
  $scope.socket = io();

  $scope.setArea = function(idArea) {
    $scope.idArea = idArea;
    $scope.accesos = [];
  };

  $scope.initTabsAcceso = function(idTabs) {
    $(idTabs).tabs();
  };

  $scope.getAccesos = function(tipoAcceso) {
    $scope.tipoAcceso = tipoAcceso;
    URI = "/acceso_area/getTipoAccesosActualesArea/"+tipoAcceso+"/"+$scope.idArea;
    if(tipoAcceso == 1 || tipoAcceso == 2) {
      $http.get(URI).success(function(accesos) {
        $scope.accesos = accesos;
      });
    } else {
      // ERROR SOLO EXISTEN DOS TIPOS DE ACCESO!!
      alert("ERROR: tipo de acceso no valido!");
    }
  };

  $scope.setDatosRegistrarAcceso = function(datosInventario) {
    $scope.datosInventarioAcceso = (!datosInventario) ? {} : datosInventario;
    $scope.registrarAccesoBoolean = true;
    document.getElementById("searchUsuarioAcceso").removeAttribute("disabled");
    $scope.searchUsuarioAcceso = "";
    $scope.buscarUsuarios("");
    $("#modalOpcionesAcceso").openModal();
  };

  $scope.setDatosRegistrarSalida = function(datosInventario) {
    $scope.datosInventarioAcceso = datosInventario;
    $scope.registrarAccesoBoolean = false;
    document.getElementById("searchUsuarioAcceso").setAttribute("disabled", "");
    $scope.searchUsuarioAcceso = datosInventario.id_usuario;
    $scope.buscarUsuarios(datosInventario.id_usuario);
    $("#modalOpcionesAcceso").openModal();
  }

  $scope.buscarUsuarios = function(text) {
    if(!util.empty(text)){
      $http.get("/usuarios/getUsuariosByTextLimit/"+text+"/0/5").success(function(usuarios) {
        $scope.idUsuarioAcceso = (usuarios.length > 0) ? usuarios[0].id_usuario : null;
        $scope.findUsuarios = usuarios;
      });
    } else {
      $scope.idUsuarioAcceso = null;
      $scope.findUsuarios = [];
    }
  };

  $scope.opcionAcceso = function() {
    if($scope.registrarAccesoBoolean) {
      $scope.registrarAcceso();
    } else {
      $scope.registrarSalida();
    }
  };

  $scope.registrarAcceso = function() {
    if($scope.sePuedeRegistrarUsuario($scope.idUsuarioAcceso)) {
      json = {
        acc_fecha_registro : util.getDate("-"),
        acc_hora_inicio : util.getHour(),
        acc_id_usuario : $scope.idUsuarioAcceso,
        acc_id_area : $scope.idArea,
        acc_id_inventario : $scope.datosInventarioAcceso.num_inventario
      };
      $http.post("/acceso_area/registrarAcceso", {jsonData:json}).success(function(data) {
        if(data.success) {
          // AQUÍ VA EL SOCKET
          $scope.getAccesos($scope.tipoAcceso);
          $("#modalOpcionesAcceso").closeModal();
          Materialize.toast("Acceso registrado correctamente", 2000);
        }
      });
    } else {
      alert("Ya esta registrado el acceso de este usuario");
    }
  };

  $scope.registrarSalida = function() {
    $http.put("/acceso_area/registrarSalida", {
      id_acceso : $scope.datosInventarioAcceso.id_acceso,
      acc_hora_fin : util.getHour()
    }).success(function(data) {
      $scope.getAccesos($scope.tipoAcceso);
      $("#modalOpcionesAcceso").closeModal();
      Materialize.toast("Salida registrada correctamente", 2000);
    });
  };

  $scope.sePuedeRegistrarUsuario = function(idUsuario) {
    for(var i = 0; i < $scope.accesos.length; i++) {
      if($scope.accesos[i].id_usuario == idUsuario) {
        // Si el usuario ya se registro entonces no se puede volver a registrar...
        return false;
      }
    }
    return true;
  };

}]);
