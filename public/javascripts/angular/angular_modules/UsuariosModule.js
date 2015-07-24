var UsuariosModule = angular.module("UsuariosModule", ["AppModule"]);

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
    console.log($scope.formTipoUsuario);
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
  $scope.showCarreras = false;
  $scope.showAreas = false;

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
    $http.get("/tipoArea/getTiposArea").success(function(tiposAreas) {
      $scope.tiposAreas = tiposAreas;
    });
  };

  $scope.setDatosCrearUsuario = function() {
    $("#modalOpcionesUsuario").openModal();
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
    var uploadURI = "/usuarios/create/";
    multipartForm.post(uploadURI, $scope.formUsuario, function(data) {
       if(data.success) {
         
       }
    });
  };

  $scope.getTiposUsuario();
  $scope.getCarreras();
  $scope.initTiposAreas();

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
