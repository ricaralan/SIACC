SIACCApp.controller("UsuariosController", ["$scope","$http", "multipartForm", function($scope, $http, multipartForm) {

  $scope.tiposUsuario = [];
  $scope.tiposAreas = [];
  $scope.carreras = [];
  $scope.formUsuarioExtra = {};
  $scope.showCarreras = false;
  $scope.showAreas = false;
  $scope.usuarios = [];
  $scope.arrayPagination = [];
  $scope.usuarioDetalle = {};
  $scope.idUsuarioEditar;
  $scope.accionUsuario = "Crear";
  $scope.typeUserPagination = {};
  $scope.usuarioId = 0;
  $scope.socket = io();

  $scope.initTabs = function() {
    setTimeout(function() {
      $('ul.tabs').tabs();
      document.getElementById("contentTabs").removeAttribute("hidden");
    }, 2000);
  };

  $scope.selectionTipoUsuario = function(tipo) {
    // Que tipo de usuario tenemos que llamar...
    $scope.usuarios = [];
    document.getElementById("caja2").removeAttribute("hidden");
    if(tipo.start == undefined) {
      // PAGINACIÓN
      tipo.start = 0;
      tipo.end   = 10;
      document.getElementById("caja1").setAttribute("hidden", "true");
    }
    $scope.usuarioDetalle = {};
    $scope.setTypeUserPagination(tipo);
    $scope.getUsuariosTypePagination();
  };

  $scope.setTypeUserPagination = function(tipo) {
    $scope.typeUserPagination = tipo;
  };

  $scope.getTipeUserPagination = function() {
    return $scope.typeUserPagination;
  };

  $scope.getUsuariosTypePagination = function() {
    tipo = $scope.getTipeUserPagination();
    URI = "/usuarios/getUsuariosTipoLimit/"+tipo.id_tipo_usuario+"/"+tipo.start+"/"+tipo.end;
    $http.get(URI).success(function(data) {
      // TIPOS DE USUARIO
      $scope.usuarios = data;
      document.getElementById("caja2").setAttribute("hidden", "true");
      // GET COUNT USUARIOS TYPE
      $http.get("/usuarios/countUsuariosTipo/"+tipo.id_tipo_usuario).success(function(count) {
        var numberPagination = parseInt(parseInt(count[0].totalUsers) / 10);
        if(count[0].totalUsers==0) {numberPagination = -1;}
        $scope.arrayPagination = [];
        for(var i = 0; i <= numberPagination; i++){
          $scope.arrayPagination[i] = {
            number : i + 1,
            selected : tipo.start == i*10,
            funcion : function() {
              tipo.start = (this.number-1)*10;
              tipo.end = this.number*10;
              $scope.setTypeUserPagination(tipo);
              $scope.getUsuariosTypePagination();
            }
          };
        }
      });
    });
  };

  $scope.setDatosEditar = function() {
    $scope.cleanFormUsuario();
    $("#modalOpcionesUsuario").openModal();
    $scope.formUsuario = $scope.usuarioDetalle;
    $scope.crearUsuario = false;
    $scope.formUsuarioExtra = {
      usu_id_carrera : $scope.usuarioDetalle.usu_id_carrera,
      usu_id_area : $scope.usuarioDetalle.usu_id_area
    };
    $scope.formUsuario._id_usuario = $scope.formUsuario.id_usuario;
    $scope.accionUsuario = "Editar";
    $scope.cambioTipoUsuario();
  };

  $scope.setIdUsuarioDetalle = function(usuarioId) {
    $scope.usuarioId = usuarioId;
  };

  $scope.getDetalleUsuario = function() {
    $http.get("/usuarios/getDataUsuario/"+$scope.usuarioId).success(function(usuario) {
        $scope.usuarioDetalle = usuario;
    });
  };

  $scope.getTiposUsuario = function() {
    $http.get("/tipo_usuario/getTiposUsuario/").success(function(tiposUsuario) {
      $scope.tiposUsuario = tiposUsuario;
    });
  };

  $scope.getCarreras = function() {
    $http.get("/carreras/getCarreras/").success(function(carreras) {
      $scope.carreras = carreras;
    });
  };

  $scope.initTiposAreas = function() {
    $http.get("/areas/getAreas").success(function(tiposAreas) {
      $scope.tiposAreas = tiposAreas;
    });
  };

  $scope.setDatosCrearUsuario = function() {
    $("#modalOpcionesUsuario").openModal();
    $scope.cleanFormUsuario();
    $scope.crearUsuario = true;
    $scope.accionUsuario = "Crear";
  };

  $scope.cambioTipoUsuario = function() {
    tipoUsuario = $scope.getTipoUsuarioById($scope.formUsuario.usu_id_tipo_usuario);
    $scope.showCarreras = tipoUsuario.tipo_asignar_carrera;
    $scope.showAreas = tipoUsuario.tipo_asignar_area;
  };

  $scope.getTipoUsuarioById = function(idTipoUsuario) {
    for(var i = 0; i < $scope.tiposUsuario.length; i++) {
      if($scope.tiposUsuario[i].id_tipo_usuario == idTipoUsuario) {
        return $scope.tiposUsuario[i];
      }
    }
    return null;
  };

  $scope.opcionUsuario = function() {
    if($scope.crearUsuario) {
      // ACCIONES PARA CREAR
      uploadURI = "/usuarios/create/";
      multipartForm.post(uploadURI, $scope.formUsuario, function(data) {
         if(data.success) {
           if($scope.showCarreras) {
             json = encodeURIComponent(JSON.stringify({
               usu_id_carrera : $scope.formUsuarioExtra.usu_id_carrera
             }));
             $http.put("/usuarios/update/"+json+"/"+$scope.formUsuario.id_usuario).success(function(data) {
               console.log(data);
             });
           }
           if($scope.showAreas) {
             json = encodeURIComponent(JSON.stringify({
               usu_id_area : $scope.formUsuarioExtra.usu_id_area
             }));
             $http.put("/usuarios/update/"+json+"/"+$scope.formUsuario.id_usuario).success(function(data) {
               console.log(data);
             });
           }
           Materialize.toast("El usuario se creó correctamente!", 4000);
           $("#modalOpcionesUsuario").closeModal();
         }
      });
    } else {
      // TODO ACCIONES PARA EDITAR
      uploadURI = "/usuarios/updateUser";
      multipartForm.put(uploadURI, $scope.formUsuario, function(data) {
         if(data.success) {
           if($scope.showCarreras) {
             json = encodeURIComponent(JSON.stringify({
               usu_id_carrera : $scope.formUsuarioExtra.usu_id_carrera
             }));
             $http.put("/usuarios/update/"+json+"/"+$scope.formUsuario.id_usuario).success(function(data) {
               console.log(data);
             });
           }
           if($scope.showAreas) {
             json = encodeURIComponent(JSON.stringify({
               usu_id_area : $scope.formUsuarioExtra.usu_id_area
             }));
             $http.put("/usuarios/update/"+json+"/"+$scope.formUsuario.id_usuario).success(function(data) {
               console.log(data);
             });
           }
           Materialize.toast("El usuario se editó correctamente!", 4000);
           $("#modalOpcionesUsuario").closeModal();
         }
      });
    }
             console.log($scope.formUsuarioExtra.usu_id_area);
    $scope.socket.emit("changeOnUsuarios", {});
  };

  $scope.cleanFormUsuario = function() {
    $scope.formUsuario = {};
    $scope.formUsuarioExtra = {};
    $scope.showCarreras = false;
    $scope.showAreas = false;
    document.getElementById("formFileUsuario").reset();
  };

  $scope.eliminarUsuario = function(idUsuario) {
    if(confirm("¿Realmente deseas eliminar el usuario?")) {
      $http.delete("/usuarios/delete/"+idUsuario).success(function(res) {
        if(res.success) {
          $scope.socket.emit("changeOnUsuarios", {});
          Materialize.toast("El usuario se eliminó correctamente!", 4000);
        } else {
          Materialize.toast("Ocurrio un error...", 4000);
        }
      });
    }
  };

  $scope.getTiposUsuario();
  $scope.getCarreras();
  $scope.initTiposAreas();

  /**
  * LISTEN SOCKETS
  **/
  $scope.socket.on("changeOnUsuarios", function(data) {
    $scope.getUsuariosTypePagination();
    $scope.getDetalleUsuario();
  });

}]);