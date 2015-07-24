var AreasModule = angular.module("AreasModule", ["AppModule"]);

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
    btnOpcionTipoAreas.innerHTML = "CREAR";
  };

  $scope.opcionTipoArea = function() {
    if($scope.registrarTipoArea && $scope.validarFormularioTipoArea()) {
      // TODO REGISTRAR
      var uploadURI = "/tipoArea/create/";
      multipartForm.post(uploadURI, $scope.formTipoArea, function(data) {
        if(data.success) {
          $scope.socket.emit("changeOnTiposAreas", {});
          $scope.cleanFormTipoArea();
          Materialize.toast("El tipo de área se creó correctamente!", 4000);
        } else {
          Materialize.toast("Ocurrio un error al crear...", 4000);
        }
      });
    } else {
      // TODO ACTUALIZAR
      var uploadURI = "/tipoArea/update/";
      multipartForm.put(uploadURI, $scope.formTipoArea, function(data) {
        if(data.success) {
          $scope.socket.emit("changeOnTiposAreas", {});
          $scope.cleanFormTipoArea();
          Materialize.toast("El tipo de área se editó correctamente!", 4000);
        } else {
          Materialize.toast("Ocurrio un error al editar...", 4000);
        }
      });
    }
  };

  $scope.eliminarTipoArea = function(id_tipo_area) {
    if(confirm("¿Esta seguro de eliminar el tipo de área?")) {
      $http.delete("/tipoArea/delete/" + id_tipo_area).success(function(data) {
        if(data.success) {
          $scope.socket.emit("changeOnTiposAreas", {});
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

  $scope.setDatosEditarTipoArea = function(tipoArea) {
    $scope.formTipoArea = tipoArea;
    $scope.registrarTipoArea = false;
    btnOpcionTipoAreas.innerHTML = "EDITAR";
    $('#modalOpcionesTipoArea').openModal();
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

  /**
  * LISTEN SOCKETS
  */
  $scope.socket.on("changeOnTiposAreas", function(datos){
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
          $('#modalOpcionesArea').closeModal();
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
          $('#modalOpcionesArea').closeModal();
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
