SIACCApp.controller("MateriasController", ["$scope", "$http", "$timeout", "util", function($scope, $http, $timeout, util) {

  $scope.opcionMateria;
  $scope.crearMateria;
  $scope.formMateria = {};
  $scope.materias;
  $scope.socket = io();
  $scope.inicioMaterias = 0;
  $scope.numRowsMaterias = 10;
  $scope.pagination = [];
  $scope.opcAccion;
  $scope.idMateriaEditar;

  $scope.getMaterias = function() {
    $http.get("/materias/getMaterias/"+$scope.inicioMaterias+"/"+$scope.numRowsMaterias)
      .success(function(dataMaterias) {
      $scope.materias = dataMaterias.materias;
      $scope.initPaginationMaterias(dataMaterias.countMaterias);
    });
  };

  $scope.getMateriasByText = function(text) {
    if(!util.empty(text)){
      $http.get("/materias/getMateriasByText/"+text+"/0/10")
        .success(function(dataMaterias) {
        $scope.materias = dataMaterias.materias;
        $timeout(function() {
          $scope.pagination = [];
        }, 0);
      });
    } else {
      $scope.getMaterias();
    }
  };

  $scope.initPaginationMaterias = function(countMaterias) {
    pagination = [];
    for(var i = 0; i <= parseInt(countMaterias/$scope.numRowsMaterias); i++) {
      pagination[i] = {
        number : i + 1,
        selected : (i * $scope.numRowsMaterias) == $scope.inicioMaterias,
        paginate : function() {
          $scope.inicioMaterias = (this.number - 1) * $scope.numRowsMaterias;
          $scope.getMaterias();
        }
      };
    }
    $timeout(function() {
      $scope.pagination = pagination;
    }, 0);
  };

  $scope.setDatosCrearMateria = function() {
    $scope.opcionMateria = "Crear";
    $scope.crearMateria = true;
    $scope.formMateria = {};
    $("#modalOpcionesMaterias").openModal();
  };

  $scope.setDatosEditarMateria = function(materia) {
    $scope.formMateria = materia;
    $scope.idMateriaEditar = materia.id_materia;
    $scope.opcionMateria = "Editar";
    $scope.crearMateria = false;
    $("#modalOpcionesMaterias").openModal();
  };

  $scope.opcionAccionMateria = function() {
    if($scope.validarCampos()) {
      $http.get("/materias/getMateria/"+$scope.formMateria.id_materia)
      .success(function(materia) {
        if(materia.length == 0 || (materia[0].id_materia == $scope.idMateriaEditar)){
          if($scope.crearMateria) {
            $http.post("/materias/create", {
              jsonData : $scope.formMateria
            }).success(function(data) {
              if(data.success) {
                $scope.formMateria = {};
                Materialize.toast("Materia creada correctamente!", 3000);
                $scope.socket.emit("changeOnMaterias", {});
                $("#modalOpcionesMaterias").closeModal();
              } else {
                Materialize.toast("Ocurrio un error!", 3000);
              }
            });
          } else {
            $http.put("/materias/update", {
              jsonData : $scope.formMateria,
              id : $scope.idMateriaEditar
            }).success(function(data) {
              if(data.success) {
                $scope.formMateria = {};
                $scope.idMateriaEditar = null;
                Materialize.toast("Materia editada correctamente!", 3000);
                $scope.socket.emit("changeOnMaterias", {});
                $("#modalOpcionesMaterias").closeModal();
              } else {
                Materialize.toast("Ocurrio un error!", 3000);
              }
            });
          }
        } else {
          Materialize.toast("No puedes utilizar este NRC!", 3000);
        }
      });
    } else {
      Materialize.toast("Materia no valida", 2000);
    }
  };

  $scope.deleteMateria = function(materia) {
    if(confirm("¿Esta seguro de eliminar la materia?")) {
      $http.delete("/materias/delete/"+materia.id_materia).success(function(data) {
        if(data.success) {
          Materialize.toast("Materia eliminada correctamente!", 3000);
          $scope.socket.emit("changeOnMaterias", {});
        } else {
          Materialize.toast("Ocurrio un error", 3000);
        }
      });
    }
  };

  $scope.validarCampos = function() {
    return !util.empty($scope.formMateria.mat_nombre) &&
           !util.empty($scope.formMateria.id_materia);
  };

  $scope.getMaterias();

  /**
  * LISTEN SOCKETS
  */
  $scope.socket.on("changeOnMaterias", function(data) {
    $scope.getMaterias();
  });

}]);
