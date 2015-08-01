SIACCApp.controller("CarrerasController", ["$scope", "$http", "scopes", function($scope, $http, scopes) {

  scopes.set("CarrerasController", $scope);

  $scope.formCarrera = {};
  $scope.crearCarrera = true;
  $scope.carreras = [];
  $scope.opcAccion;
  $scope.socket = io();

  $scope.getCarreras = function() {
    $http.get("/carreras/getCarreras/").success(function(carreras) {
      $scope.carreras = carreras;
    });
  };

  $scope.setDatosCrearCarrera = function() {
    $scope.crearCarrera = true;
    $scope.formCarrera = {};
    $("#modalOpcionesCarrera").openModal();
    $scope.opcAccion = "Crear";
  };

  $scope.setDatosEditarCarrera = function(carrera) {
    $scope.formCarrera = carrera;
    $scope.crearCarrera = false;
    $("#modalOpcionesCarrera").openModal();
    $scope.opcAccion = "Editar";
  };

  $scope.opcionCarrera = function() {
    if($scope.crearCarrera) {
      // CREAR
      $http.post("/carreras/create/"+encodeURIComponent(JSON.stringify($scope.formCarrera)))
      .success(function(data) {
        if(data.success) {
          $scope.socket.emit("changeOnCarreras", {});
          Materialize.toast("La carrera se creó correctamente!", 4000);
          $("#modalOpcionesCarrera").closeModal();
        }
      });
    } else {
      delete $scope.formCarrera.$$hashKey;
      // EDITAR
      $http.put("/carreras/update/"+encodeURIComponent(JSON.stringify($scope.formCarrera))+"/"+$scope.formCarrera.id_carrera)
      .success(function(data) {
        console.log(data);
        if(data.success) {
          $scope.socket.emit("changeOnCarreras", {});
          Materialize.toast("La carrera se editó correctamente!", 4000);
          $("#modalOpcionesCarrera").closeModal();
        }
      });
    }
  };

  $scope.deleteCarrera = function(carrera) {
    if(confirm("¿Estas seguro de eliminar " + carrera.car_nombre + "?")) {
      $http.delete("/carreras/delete/" + carrera.id_carrera).success(function(data) {
        $scope.socket.emit("changeOnCarreras", {});
        Materialize.toast("La carrera se eliminó correctamente!", 4000);
      });
    }
  };

  $scope.getCarreras();

  /**
  * LISTEN SOCKETS
  **/
  $scope.socket.on("changeOnCarreras", function(data) {
    $scope.getCarreras();
  });
}]);
