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

  $scope.getHorarioUsuario = function() {
    if($scope.validarCampos()) {
      $scope.idUsuario = document.getElementById("horarioArea").getAttribute("usuario");
      $http.get("/horarios/getHorario/"+$scope.idUsuario+"/"+$scope.fechaInicio+"/"+$scope.fechaFin)
      .success(function(horarios) {
        $timeout(function(){
          $scope.horarioUsuario = horarios;
          $scope.horarios = [];
          $scope.setHorarioSemanaUsuario();
        }, 0);
      });
    }
  };

  $scope.setHorarioSemanaUsuario = function() {
    $scope.clearCeldasHorarios();
    for(var i = 0; i < $scope.horarioUsuario.length; i++) {
      id = "d"+$scope.horarioUsuario[i].hua_dia+"-h"+$scope.horarioUsuario[i].hua_hora;
      horaSemana = document.getElementById(id);
      div = document.createElement("div");
      div.innerHTML = $scope.horarioUsuario[i].usu_nombre;
      div.style.backgroundColor = "#e3e3e3";
      div.style.position = "absolute";
      div.style.paddingRight = "30px";
      div.style.top = 0;
      div.style.overflow = "hidden";
      equis = document.createElement("button");
      equis.innerHTML = "x";
      equis.style.position = "absolute";
      equis.style.height = "25px";
      equis.style.right = "0";
      equis.style.top = "-5px";
      equis.backgroundColor = "#e3e3e3";
      equis.setAttribute("i", i);
      equis.addEventListener("click", function(e) {
        if(confirm("¿Esta seguro de eliminar esta hora del usuario?")){
          id = $scope.horarioUsuario[this.getAttribute("i")].hua_id;
          $http.delete("/horarios/delete/"+id).success(function(data) {
            if(data.success == 1) {
              $scope.getHorarioUsuario();
            }
          });
        }
      });
      div.appendChild(equis);
      div.appendChild(equis);
      horaSemana.innerHTML = "";
      horaSemana.appendChild(div);
    }
  };

  $scope.clearCeldasHorarios = function() {
    celdas = document.getElementsByClassName("celdaHorario");
    for(var i = 0; i < celdas.length; i++) {
      celdas[i].removeAttribute("selected");
      celdas[i].style.boxShadow = "";
      celdas[i].innerHTML = "";
    }
  };

  $scope.calendar = function(horario) {
    cuadro = document.getElementById(horario.id);
    if(horario.add) {
      cuadro = document.getElementById(horario.id);
      if(cuadro.innerHTML == ""){
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
        cuadro.removeAttribute("selected");
        cuadro.style.boxShadow = "";
      }
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
        $scope.getHorarioUsuario();
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
