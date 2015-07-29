SIACCApp.controller("AreasController", function($scope, $http) {

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
          $scope.socket.emit("changeOnAreas", data);
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
      $http.put("/areas/update/" + encodeURIComponent(JSON.stringify($scope.formArea))
        + "/" + $scope.formArea.id_area).success(function(data) {
        if(data.success) {
          Materialize.toast("Área editada correctamente!", 4000);
          $scope.formArea = {};
          $scope.socket.emit("changeOnAreas", data);
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
        $scope.socket.emit("changeOnAreas", data);
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
  $scope.socket.on("changeOnAreas", function(datos){
    $scope.initAreas();
  });

});