SIACCApp.controller("MateriasController", ["$scope", "$http", "$timeout", "util",
  "scopes", function($scope, $http, $timeout, util, scopes) {

  scopes.set("MateriasController", $scope);

  $scope.opcionMateria;
  $scope.crearMateria = false;
  $scope.formMateria = {};
  $scope.materias;
  $scope.socket = io();
  $scope.inicioMaterias = 0;
  $scope.inicioMateriasUsuario = 0;
  $scope.numRowsMaterias = 10;
  $scope.pagination = [];
  $scope.opcAccion;
  $scope.idMateriaEditar;
  $scope.materias = [];
  $scope.materiasUsuario = [];
  $scope.idUsuario;

  $scope.getMaterias = function() {
    $http.get("/materias/getMaterias/"+$scope.inicioMaterias+"/"+$scope.numRowsMaterias)
      .success(function(dataMaterias) {
      $timeout(function(){
        $scope.materias = dataMaterias.materias;
      }, 0);
      $scope.initPaginationMaterias(dataMaterias.countMaterias, $scope.getMaterias);
    });
  };

  $scope.getMateriasUsuario = function(idUsuario) {
    if(idUsuario){
      $scope.idUsuario = idUsuario;
    }
    $http.get("/materias/getMateriasUsuario/" + $scope.idUsuario + "/" + $scope.inicioMateriasUsuario
      +"/"+$scope.numRowsMaterias).success(function(dataMaterias) {
        $scope.materiasUsuario = dataMaterias.materias;
        $scope.initPaginationMaterias(dataMaterias.countMaterias, $scope.getMateriasUsuario);
    });
  };

  $scope.getMateriasByText = function(text) {
    if(!util.empty(text)){
      $http.get("/materias/getMateriasByText/"+text+"/0/10")
        .success(function(dataMaterias) {
        $timeout(function() {
          $scope.materias = dataMaterias.materias;
          $scope.pagination = [];
        }, 0);
      });
    } else {
      $scope.getMaterias();
    }
  };

  $scope.getMateriasUsuarioByText = function(text) {
    if(!util.empty(text)){
      $http.get("/materias/getMateriasUsuarioByText/"+text+"/"+$scope.idUsuario+"/0/10")
        .success(function(materias) {
        $scope.materiasUsuario = materias;
        $timeout(function() {
          $scope.pagination = [];
        }, 0);
      });
    } else {
      $scope.getMateriasUsuario();
    }
  };

  $scope.initPaginationMaterias = function(countMaterias, callbackPaginate) {
    pagination = [];
    for(var i = 0; i <= parseInt(countMaterias/$scope.numRowsMaterias); i++) {
      pagination[i] = {
        number : i + 1,
        selected : (i * $scope.numRowsMaterias) == $scope.inicioMaterias,
        paginate : function() {
          $scope.inicioMaterias = (this.number - 1) * $scope.numRowsMaterias;
          callbackPaginate();
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
                $scope.crearMateria = false;
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

  $scope.deleteMateriaUsuario = function(materia) {
    if(confirm("¿Esta seguro de eliminar la asignación de materia?")) {
      $http.delete("/materias/deleteAsignacionUsuario/"+materia.id_usuario+"/"+materia.id_materia)
        .success(function(data) {
          if(data.success) {
            Materialize.toast("Operación realizada correctamente!", 3000);
            $scope.socket.emit("changeOnMaterias", {});
          } else {
            Materialize.toast("Ocurrio un error", 3000);
          }
      });
    }
  };

  $scope.asignarMateriaUsuario = function(materia) {
    $http.post("/materias/asignarMateriaUsuario/"+$scope.idUsuario+"/"+materia.id_materia)
    .success(function(data) {
      if(data.success) {
        $scope.socket.emit("changeOnMaterias", {});
        Materialize.toast("La materia se asignó con exito!", 2000);
      }
    });
  };

  $scope.validarCampos = function() {
    return !util.empty($scope.formMateria.mat_nombre) &&
           !util.empty($scope.formMateria.id_materia);
  };

  /**
  * LISTEN SOCKETS
  */
  $scope.socket.on("changeOnMaterias", function(data) {
    $scope.getMaterias();
    if(util.empty($scope.wordSearchMatUser)) {
      $scope.getMateriasUsuario();
    } else {
      $scope.getMateriasUsuarioByText($scope.wordSearchMatUser);
    }
  });

}]);
