var UsuariosModule = angular.module("UsuariosModule", ["AppModule", "HorariosModule"]);

UsuariosModule.controller("TiposUsuarioController", ["$scope", "$http", function($scope, $http) {

  $scope.tiposUsuario = [];
  $scope.todosLosModulos = [];
  $scope.formTipoUsuario = {};
  $scope.crearTipoUsuario = true;
  $scope.socket = io();

  $scope.getTiposUsuario = function() {
    $http.get("/tipo_usuario/getTiposUsuario/").success(function(tiposUsuario) {
      $scope.tiposUsuario = tiposUsuario;
    });
  };

  $scope.setDatosCrearTipoUsuario = function() {
    $scope.crearTipoUsuario = true;
    document.getElementById("btnOpcionTipoUsuario").innerHTML = "CREAR";
    $scope.cleanFormTipoUsuario();
    $("#modalOpcionesTipoUsuario").openModal();
  };

  $scope.setTodosLosModulos = function() {
    $http.get("/modules/getModules").success(function(modulos) {
      $scope.todosLosModulos = modulos;
    });
  };

  $scope.opcionTipoUsuario = function() {
    json = encodeURIComponent(JSON.stringify({
      id_tipo_usuario : $scope.formTipoUsuario.id_tipo_usuario,
      tipo_nombre : $scope.formTipoUsuario.tipo_nombre,
      tipo_descripcion : $scope.formTipoUsuario.tipo_descripcion,
      tipo_asignar_carrera : document.getElementById("check_asignar_carrera").checked,
      tipo_asignar_area : document.getElementById("check_asignar_area").checked
    }));
    jsonPermisosPorModulo = encodeURIComponent(JSON.stringify($scope.getPermisosPorModulo()));
    if($scope.crearTipoUsuario) {
      $http.post("/tipo_usuario/create/"+json+"/"+jsonPermisosPorModulo).success(function(data) {
        if(data.success) {
          $("#modalOpcionesTipoUsuario").closeModal();
          $scope.socket.emit("changeOnTiposUsuarios", {});
          Materialize.toast("El tipo de usuario se creó correctamente!", 4000);
        }
      });
    } else {
      $http.put("/tipo_usuario/update/"+json+"/"+jsonPermisosPorModulo).success(function(data) {
        $("#modalOpcionesTipoUsuario").closeModal();
        $scope.socket.emit("changeOnTiposUsuarios", {});
        Materialize.toast("El tipo de usuario se editó correctamente!", 4000);
      });
    }
  };

  $scope.getPermisosPorModulo = function() {
    checks = document.getElementsByClassName("checksOpcUsuario");
    var json = [];
    for(var i = 0; i < checks.length; i++) {
      json.push({
        moa_id_modulo : checks[i].getAttribute("modulo"),
        moa_area_controla_mod : checks[i].checked
      });
    }
    return json;
  };

  $scope.cleanFormTipoUsuario = function() {
    $scope.formTipoUsuario = {};
    $scope.cleanChecksPermisosTipoUsuario();
  };

  $scope.cleanChecksPermisosTipoUsuario = function() {
    checks = document.getElementsByClassName("checksOpcUsuario");
    for(var i = 0; i < checks.length; i++) {
      checks[i].checked = false;
    }
  };

  $scope.setDatosEditarTipoUsuario = function(tipoUsuario) {
    $scope.crearTipoUsuario = false;
    $scope.cleanFormTipoUsuario();
    document.getElementById("btnOpcionTipoUsuario").innerHTML = "EDITAR";
    $scope.formTipoUsuario = tipoUsuario;
    document.getElementById("check_asignar_carrera").checked = $scope.formTipoUsuario.tipo_asignar_carrera;
    document.getElementById("check_asignar_area").checked = $scope.formTipoUsuario.tipo_asignar_area;
    $http.get("/tipo_usuario/getPermisosPorModuloTipoUsuario/"+tipoUsuario.id_tipo_usuario)
    .success(function(data) {
      $scope.setSelectedPermisosTiposUsuario(data);
    });
    $("#modalOpcionesTipoUsuario").openModal();
  };

  $scope.setSelectedPermisosTiposUsuario = function(permisos) {
    for(var i = 0; i < permisos.length; i++) {
      check = document.getElementById("check"+permisos[i].moa_id_modulo);
      check.checked = permisos[i].moa_area_controla_mod;
    }
  };

  $scope.deleteTipoUsuario = function(idTipoUsuario) {
    $http.delete("/tipo_usuario/delete/" + idTipoUsuario).success(function(data) {
      if(data.affectedRows == 1) {
        $scope.socket.emit("changeOnTiposUsuarios", {});
        Materialize.toast("El tipo de usuario se eliminó correctamente!", 4000);
      } else {
        Materialize.toast("Ocurrio un error al eliminar", 4000);
      }
    });
  };

  $scope.setTodosLosModulos();
  $scope.getTiposUsuario();

  /**
  * LISTEN SOCKETS
  **/
  $scope.socket.on("changeOnTiposUsuarios", function(data) {
    $scope.getTiposUsuario();
  });

}]);

UsuariosModule.controller("UsuariosController", ["$scope","$http", "multipartForm", function($scope, $http, multipartForm) {

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


UsuariosModule.directive("fileModel", ["$parse", function($parse) {
  return {
    restrict : "A",
    link : function(scope, element, attrs) {
      var model = $parse(attrs.fileModel);
      var modelSetter = model.assign;

      element.bind("change", function() {
        scope.$apply(function() {
          modelSetter(scope, element[0].files[0]);
        });
      });
    }
  };
}]);

UsuariosModule.service("multipartForm", ["$http", function($http) {
  this.post = function(uploadURI, data, success) {
    $http.post(uploadURI, this.getFormData(data),{
      transformRequest : angular.indentity,
      headers : {
        "Content-Type" : undefined
      }
    }).success(success);
  };
  this.put = function(uploadURI, data, success) {
    $http.put(uploadURI, this.getFormData(data),{
      transformRequest : angular.indentity,
      headers : {
        "Content-Type" : undefined
      }
    }).success(success);
  };
  this.getFormData = function(data) {
    var fd = new FormData();
    for(key in data) {
      fd.append(key, data[key]);
    }
    return fd;
  };
}]);
