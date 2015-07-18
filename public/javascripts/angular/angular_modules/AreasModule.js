var AreasModule = angular.module("AreasModule", ["AppModule"]);
AreasModule.directive("fileread", [function () {
    return {
        scope: {
            fileread: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                scope.$apply(function () {
                    scope.fileread = changeEvent.target.files[0];
                    // or all selected files:
                    // scope.fileread = changeEvent.target.files;
                });
            });
        }
    }
}]);
AreasModule.controller("TiposAreasController",["$scope","$http","multipartForm", function($scope, $http, multipartForm) {

  $scope.tiposDeAreas;
  $scope.formTipoArea = {};
  $scope.registrarTipoArea = true;
  $scope.socket = io();

  $scope.getTiposAreas = function() {
    $http.get("/tipoArea/getTiposArea").success(function(tiposAreas) {
      $scope.tiposAreas = tiposAreas;
    });
  };

  $scope.setDatosCrearTipoArea = function() {
    $('#modalOpcionesTipoArea').openModal();
    $scope.formTipoArea = {};
    $scope.registrarTipoArea = true;
  };

  $scope.opcionTipoArea = function() {
    if($scope.registrarTipoArea && $scope.validarFormularioTipoArea()) {
      // TODO REGISTRAR
      //var uploadURI = "/tipoArea/subirFoto/";
      var uploadURI = "/tipoArea/create/";
      multipartForm.post(uploadURI, $scope.formTipoArea, function(data) {
        if(data.success) {
          $scope.socket.emit("newTipoAreaCreated", {});
          $scope.cleanFormTipoArea();
          Materialize.toast("El tipo de área se creó correctamente!", 4000);
        } else {
          Materialize.toast("Ocurrio un error al crear...", 4000);
        }
      });
    } else {
      // TODO ACTUALIZAR
    }
  };

  $scope.eliminarTipoArea = function(id_tipo_area) {
    if(confirm("¿Esta seguro de eliminar el tipo de área?")) {
      $http.delete("/tipoArea/delete/" + id_tipo_area).success(function(data) {
        if(data.success) {
          $scope.socket.emit("tipoAreaDeleted", {});
          Materialize.toast("El tipo de área se eliminó correctamente!", 4000);
        } else {
          Materialize.toast("Ocurrio un error al eliminar...", 4000);
        }
      });
    }
  };

  $scope.validarFormularioTipoArea = function() {
    if($scope.isEmpty($scope.formTipoArea.tipo_nombre) || $scope.isEmpty($scope.formTipoArea.tipo_descripcion)) {
      Materialize.toast("Tienes que llenar los campos!", 4000);
      return false;
    }
    return true;
  };

  $scope.cleanFormTipoArea = function() {
    $scope.formTipoArea = {};
    document.getElementById("formTipoFoto").reset();
    $('#modalOpcionesTipoArea').closeModal();
  };

  $scope.isEmpty = function(value) {
    return value == null || value.length == 0;
  };

  $scope.getTiposAreas();
/*
  $scope.tiposDeUsuarios;

  $scope.initTiposUsuarios = function() {
    $http.get("/users/getTypesUser").success(function(data) {
      $scope.tiposDeUsuarios = data;
    });
  };

  $scope.crearTipoDeArea = function() {
    btnCrearTipoArea = document.getElementById("btnCreasTipoArea");
    btnCrearTipoArea.setAttribute("disabled", "");
    if($scope.verificarFormularioTipoUsuario()) {
      json = encodeURIComponent(JSON.stringify($scope.armarJSON()));
      $http.post("/tipoArea/create/"+json).success(function(data) {
        if(data.inserted) {
          Materialize.toast('El tipo de área se creo correctamente!', 4000);
          $scope.clean();
        }
      });
    }
    setTimeout(function(){
      btnCrearTipoArea.removeAttribute("disabled");
    }, 2000);
  };

  /**
  * Este método arma el json para registrar un tipo de área... Con sus respectivos permisos
  *
  $scope.armarJSON = function() {
    json = {modulos : []};
    json.nombreTipoArea = $scope.nombreTipoArea;
    json.descripcionTipoArea = $scope.descripcionTipoArea;
    json.modulos[0] = {
      modulo  : "usuarios",
      control : $scope.checkUsuarios != null && $scope.checkUsuarios
    };
    json.modulos[1] = {
      modulo  : "inventarios",
      control : $scope.checkInventarios != null && $scope.checkInventarios
    };
    tipoAcceso = $scope.getIdElementSelectedForName("tipoControlAcceso");
    if(tipoAcceso != null && $scope.checkControlAcceso) {
      json.modulos[2] = {
        modulo : tipoAcceso,
        control : true
      };
    }
    json.modulo_mesa_ayuda = $scope.checkMesaAyuda != null && $scope.checkMesaAyuda;
    tipoMesa = $scope.getIdElementSelectedForName("tipoMesa");
    if(tipoMesa != null && json.modulo_mesa_ayuda) {
      json.tipoMesa = tipoMesa;
      json.modulos[3] = {
        modulo : tipoMesa,
        control : true
      };
    }
    json.usuarios = $scope.getUsuariosSeleccionados();
    return json;
  };

  $scope.getUsuariosSeleccionados = function() {
    jsonUsuarios = {};
    for(var i = 0; i < $scope.tiposDeUsuarios.length; i++) {
      check = document.getElementById("checkUsu"+$scope.tiposDeUsuarios[i].tipo_id);
      // json {ID:(true/false)}
      jsonUsuarios[$scope.tiposDeUsuarios[i].tipo_id] = check.checked;
    }
    return jsonUsuarios;
  };

  $scope.getIdElementSelectedForName = function(name) {
    tipos = document.getElementsByName(name);
    selectedId = null;
    for(var i = 0; i < tipos.length; i++) {
      if(tipos[i].checked) {
        selectedId = tipos[i].id;
      }
    }
    return selectedId;
  };

  $scope.verificarFormularioTipoUsuario = function() {
    formularioValido = true;
    if($scope.isEmpty($scope.nombreTipoArea) || $scope.isEmpty($scope.descripcionTipoArea)){
      Materialize.toast('No has llenado todos los campos!', 4000);
      formularioValido = false;
    }
    if(!$scope.checkUsuarios && !$scope.checkInventarios && !$scope.checkControlAcceso
      && !$scope.checkMesaAyuda){
      Materialize.toast('El área debe poder controlar al menos un módulo!', 4000);
      formularioValido = false;
    }
    if($scope.checkUsuarios) {
      checksUsuariosValidos = false;
      for(var i = 0; i < $scope.tiposDeUsuarios.length; i++) {
        check = document.getElementById("checkUsu"+$scope.tiposDeUsuarios[i].tipo_id);
        if(check.checked != null && check.checked) {
          checksUsuariosValidos = true;
        }
      }
      if(!checksUsuariosValidos){
        Materialize.toast('No has seleccionado ningun tipo de usuario!', 4000);
        formularioValido = false;
      }
    }
    return formularioValido;
  };

  $scope.isEmpty = function(value) {
    return value == null || value.length == 0;
  };

  $scope.clean = function() {
    $scope.nombreTipoArea = "";
    $scope.descripcionTipoArea = "";
    $scope.checkUsuarios = false;
    $scope.checkInventarios = false;
    $scope.checkControlAcceso = false;
    $scope.checkMesaAyuda = false;
  };

  $scope.initTiposUsuarios();
  */


  /**
  * LISTEN SOCKETS
  */
  $scope.socket.on("newTipoAreaCreated", function(datos){
    $scope.getTiposAreas();
  });

  $scope.socket.on("tipoAreaDeleted", function(datos){
    $scope.getTiposAreas();
  });


}]);

AreasModule.controller("AreasController", function($scope, $http) {

  $scope.areas = [];
  $scope.tiposAreas;
  $scope.formArea = {};
  $scope.sePuedeCrearArea = true;
  $scope.socket = io();

  $scope.initTiposAreas = function() {
    $http.get("/tipoArea/getTiposArea").success(function(tiposAreas) {
      $scope.tiposAreas = tiposAreas;
    });
  };

  $scope.initAreas = function() {
    $http.get("/areas/getAreas").success(function(areas) {
      $scope.areas = areas;
    });
  };

  $scope.opcionArea = function() {
    if($scope.sePuedeCrearArea) {
      $scope.crearArea();
    } else {
      $scope.editarArea();
    }
  };

  $scope.crearArea = function() {
    if($scope.isEmpty($scope.formArea.are_nombre) &&
        $scope.isEmpty($scope.formArea.are_descripcion) &&
        $scope.isEmpty($scope.formArea.are_id_tipo_area)) {
      Materialize.toast("Necesitas llenar todos los campos!", 4000);
    } else {
      $http.post("/areas/create/" + encodeURIComponent(JSON.stringify($scope.formArea)))
        .success(function(data) {
        if(data.success) {
          Materialize.toast("Área creada correctamente!", 4000);
          $scope.formArea = {};
          $scope.socket.emit("newAreaCreated", data);
        } else {
          Materialize.toast("Ocurrio un error al crear el área...", 4000);
        }
      });
    }
  };

  $scope.editarArea = function() {
    if($scope.isEmpty($scope.formArea.are_nombre) &&
        $scope.isEmpty($scope.formArea.are_descripcion) &&
        $scope.isEmpty($scope.formArea.are_id_tipo_area)) {
      Materialize.toast("Necesitas llenar todos los campos!", 4000);
    } else {
      delete $scope.formArea.$$hashKey
      console.log($scope.formArea);
      $http.put("/areas/update/" + encodeURIComponent(JSON.stringify($scope.formArea))
        + "/" + $scope.formArea.id_area).success(function(data) {
        if(data.success) {
          Materialize.toast("Área editada correctamente!", 4000);
          $scope.formArea = {};
          $scope.socket.emit("areaEdited", data);
        } else {
          Materialize.toast("Ocurrio un error al editar el área...", 4000);
        }
      });
    }
  };

  $scope.setDatosCrearArea = function() {
    $scope.formArea = {};
    $('#modalOpcionesArea').openModal();
    document.getElementById("btnOpcionAreas").innerHTML = "CREAR";
    $scope.sePuedeCrearArea = true;
  };

  $scope.setDatosEditarArea = function(idArea) {
    $scope.formArea = $scope.getAreaById(idArea);
    $('#modalOpcionesArea').openModal();
    document.getElementById("btnOpcionAreas").innerHTML = "EDITAR";
    $scope.sePuedeCrearArea = false;
  };

  $scope.eliminarArea = function(idArea) {
    if(confirm("¿Esta seguro de eliminar el área?")) {
      $http.delete("/areas/delete/"+idArea).success(function(data) {
        Materialize.toast("El área se elimino correctamente!", 4000);
        $scope.socket.emit("areaDeleted", data);
      });
    }
  };

  $scope.isEmpty = function(value) {
    return value == null || value.length == 0;
  };

  $scope.getAreaById = function(idArea) {
    for(var i = 0; i < $scope.areas.length; i++) {
      if($scope.areas[i].id_area == idArea) {
        return $scope.areas[i];
      }
    }
    return null;
  };

  $scope.initAreas();
  $scope.initTiposAreas();

  /**
  * LISTEN SOCKETS
  */
  $scope.socket.on("newAreaCreated", function(datos){
    $scope.initAreas();
  });

  $scope.socket.on("areaEdited", function(datos){
    $scope.initAreas();
  });

  $scope.socket.on("areaDeleted", function(datos){
    $scope.initAreas();
  });

});

AreasModule.directive("fileModel", ["$parse", function($parse) {
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

AreasModule.service("multipartForm", ["$http", function($http) {
  this.post = function(uploadURI, data, success) {
    var fd = new FormData();
    for(key in data) {
      fd.append(key, data[key]);
    }
    $http.post(uploadURI, fd,{
      transformRequest : angular.indentity,
      headers : {
        "Content-Type" : undefined
      }
    }).success(success);
  };
}]);
