var HorariosModule = angular.module("HorariosModule", []);

var scope;

HorariosModule.controller("HorariosController", ["$scope", "$http", "$timeout", function($scope, $http, $timeout) {

  $scope.horarioAsignar = {};
  $scope.horarios = [];
  $scope.asignarHorario = false;
  $scope.idArea = null;
  $scope.idUsuario = null;

  $scope.setDatosAsignarHorario = function() {
    $scope.asignarHorario = true;
    console.log($scope.horarios);
  };

  $scope.calendar = function(horario) {
    cuadro = document.getElementById(horario.id);
    if(horario.add) {
      if($scope.idArea != horario.area) {
        $scope.cleanSelecteds();
        $scope.idArea = horario.area;
        $scope.idUsuario = horario.usuario;
        cuadro.setAttribute("selected", "true");
        cuadro.style.boxShadow = "0px 0px 13px 7px rgba(0, 0, 0, .3) inset";
      }
      $timeout(function(){
        $scope.horarios.push(horario);
      }, 0);
    } else {
      $timeout(function(){
        $scope.delHorario(horario);
      },0);
    }
  };

  $scope.delHorario = function(horario) {
    for(var i = 0; i < $scope.horarios.length; i++) {
      if(horario.diaHora.h == $scope.horarios[i].diaHora.h &&
        horario.diaHora.d == $scope.horarios[i].diaHora.d) {
        $scope.horarios.splice(i, 1);
      }
    }
  };

  $scope.cleanSelecteds = function() {
    $timeout(function() {
      $scope.horarios = [];
    }, 0);
    $scope.idArea = 0;
    cuadros = document.getElementsByClassName("celdaHorario");
    for(var i = 0; i < cuadros.length; i++) {
      cuadros[i].removeAttribute("selected");
      cuadros[i].style.boxShadow = "";
    }
  };

  $scope.createHorario = function() {
    if(!$scope.validarCampos()) {
      Materialize.toast("Debes elegir las fechas", 3000);
    } else {
      $http.post("/horarios/createHorario", {jsonHorario : $scope.getJsonHorario()})
      .success(function(data) {
        console.log(data);
      });
    }
  };

  $scope.validarCampos = function() {
    return (
      !$scope.isEmpty($scope.getValueElementById("fecha_inicio")) &&
      !$scope.isEmpty($scope.getValueElementById("fecha_fin"))
    );
  };

  $scope.getValueElementById = function(id) {
    return document.getElementById(id).value;
  };

  $scope.isEmpty = function(value) {
    return value == null || value.length == 0;
  };

  $scope.getJsonHorario = function() {
    diasHoras = [];
    for(var i = 0; i < $scope.horarios.length; i++) {
      diasHoras[i] = {
        hua_dia  : $scope.horarios[i].diaHora.d,
        hua_hora : $scope.horarios[i].diaHora.h
      };
    }
    return {
      hua_id_usuario : $scope.idUsuario,
      hua_id_area    : $scope.idArea,
      hua_fecha_inicio : document.getElementById("fecha_inicio").value,
      hua_fecha_fin : document.getElementById("fecha_fin").value,
      diasHoras : diasHoras
    };
  };

  scope = $scope;

}]);
