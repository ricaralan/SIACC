var HorariosModule = angular.module("HorariosModule", []);

var scope;

HorariosModule.controller("HorariosController", ["$scope", "$http", "$timeout", function($scope, $http, $timeout) {

  $scope.horarioAsignar = {};
  $scope.horarios = [];
  $scope.asignarHorario = false;
  $scope.idArea = null;
  $scope.idUsuario = null;
  $scope.horarioUsuario = [];
  $scope.fechaInicio;
  $scope.fechaFin;

  $scope.setDatosAsignarHorario = function() {
    $scope.asignarHorario = true;
    console.log($scope.horarios);
  };

  $scope.getHorarioUsuario = function() {
    $scope.setFechas();
    $scope.idUsuario = document.getElementById("horarioArea").getAttribute("usuario");
    $http.get("/horarios/getHorario/"+$scope.idUsuario+"/"+$scope.fechaInicio+"/"+$scope.fechaFin)
    .success(function(horarios) {
      $scope.horarioUsuario = horarios;
      $scope.setHorarioSemanaUsuario();
    });
  };

  $scope.setHorarioSemanaUsuario = function() {
    for(var i = 0; i < $scope.horarioUsuario.length; i++) {
      id = "d"+$scope.horarioUsuario[i].hua_dia+"-h"+$scope.horarioUsuario[i].hua_hora;
      console.log(id);
      horaSemana = document.getElementById(id);
      console.log(horaSemana);
      label = document.createElement("label");
      label.innerHTML = $scope.horarioUsuario[i].usu_nombre;
      horaSemana.innerHTML = "";
      horaSemana.appendChild(label);
    }
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
    $scope.setFechas();
    return (
      !$scope.isEmpty($scope.fechaInicio) &&
      !$scope.isEmpty($scope.fechaFin)
    );
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
    $scope.setFechas();
    return {
      hua_id_usuario : $scope.idUsuario,
      hua_id_area    : $scope.idArea,
      hua_fecha_inicio : $scope.fechaInicio,
      hua_fecha_fin : $scope.fechaFin,
      diasHoras : diasHoras
    };
  };

  $scope.setFechas = function() {
    $scope.fechaInicio = document.getElementById("fecha_inicio").value
    $scope.fechaFin = document.getElementById("fecha_fin").value;
  };

  scope = $scope;

}]);
