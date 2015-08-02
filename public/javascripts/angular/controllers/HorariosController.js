SIACCApp.controller("HorariosController", ["$scope", "$http", "$timeout", "scopes", "util", function($scope, $http, $timeout, scopes, util) {

  scopes.set("HorariosController", $scope);

  $scope.horarioAsignar = {};
  $scope.horarios = [];
  $scope.asignarHorario = false;
  $scope.idArea = null;
  $scope.idUsuario = 0;
  $scope.idMateriaSelect = 0;
  $scope.horarioUsuario = [];
  $scope.fechaInicio;
  $scope.fechaFin;
  $scope.usuarios = [];
  $scope.socket = io();
  /**
  * TIPO 1 = horario de usuario(horario de atención)
  * TIPO 2 = horario en área(asignación de horario de clases)
  */
  $scope.tipoHorario;
  $scope.registrarHorarioClases = false;
  $scope.horarioDetalle = {};

  $scope.getUsuariosPermisoMaterias = function() {
    /* Usuarios que pueden impartir materias */
    $http.get("/materias/getUsuariosPermisoMaterias").success(function(usuarios) {
      $scope.usuarios = usuarios;
    });
  };

  $scope.getMateriasUsuarioByText = function(text) {
    if(!util.empty(text)) {
      $http.get("/materias/getMateriasUsuarioByText/"+text+"/"+$scope.idUsuario+"/0/5")
      .success(function(materiasSeach) {
        $scope.materiasSeach = materiasSeach;
      });
    } else {
      $scope.materiasSeach = [];
    }
  };

  $scope.asignarHorarioClases = function() {
    if(!$scope.validarCampos()) {
      Materialize.toast("Debes elegir las fechas", 3000);
    } else {
      $http.post("/horarios/createHorario", {jsonHorario : $scope.getJsonHorario()})
      .success(function(data) {
        $scope.socket.emit("changeOnHorarios", {});
        $scope.registrarHorarioClases = false;
      });
    }
  };

  $scope.getHorario = function() {
    if($scope.tipoHorario == 1) {
      $scope.getHorarioUsuario();
    } else if($scope.tipoHorario == 2) {
      $scope.getHorarioArea();
    } else {
      Materialize.toast("Error tipo horario");
    }
  };

  $scope.getHorarioUsuario = function() {
    if($scope.validarCampos()) {
      $http.get("/horarios/getHorarioArea/"+$scope.idArea+"/"+$scope.fechaInicio+"/"+$scope.fechaFin)
      .success(function(horarios) {
        $timeout(function(){
          $scope.horarioUsuario = horarios;
          $scope.horarios = [];
          $scope.setHorarioSemanaUsuario();
        }, 0);
      });
    }
  };

  $scope.getHorarioArea = function() {
    if($scope.validarCampos()) {
      $http.get("/horarios/getHorarioClasesArea/"+$scope.idArea+"/"+$scope.fechaInicio+"/"+$scope.fechaFin)
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
      divContent = document.createElement("div");
      div = document.createElement("div");
      div.setAttribute("i", i);
      div.addEventListener("click", function(e) {
        $http.get("/horarios/getDetalle/"+$scope.horarioUsuario[this.getAttribute("i")].hua_id)
        .success(function(detalle) {
          $scope.horarioDetalle = detalle;
          detalle = document.getElementById("cajaDetalle");
          detalle.removeAttribute("hidden");
          detalle.style.left = (e.clientX-150) + "px";
          detalle.style.top = (e.clientY + 10) + "px";
        });
      });
      div.innerHTML = $scope.horarioUsuario[i].usu_nombre + " " + $scope.horarioUsuario[i].usu_primer_apellido.substring(0, 1)+".";
      divContent.style.backgroundColor = "#e3e3e3";
      divContent.style.position = "relative";
      divContent.style.marginBottom = "3px";
      div.style.paddingRight = "30px";
      divContent.style.overflow = "hidden";
      div.style.display="block";
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
              $scope.socket.emit("changeOnHorarios", {});
            }
          });
        }
      });
      divContent.appendChild(equis);
      divContent.appendChild(div);
      horaSemana.appendChild(divContent);
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
    if($scope.tipoHorario == 1) {
      if(!$scope.validarCampos()) {
        Materialize.toast("Debes elegir las fechas", 3000);
      } else {
        $http.post("/horarios/createHorario", {jsonHorario : $scope.getJsonHorario()})
        .success(function(data) {
          $scope.socket.emit("changeOnHorarios", {});
        });
      }
    } else {
      $scope.registrarHorarioClases = true;
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
      hua_id_materia : ($scope.tipoHorario==1)?null:$scope.idMateriaSelect,
      hua_fecha_inicio : $scope.fechaInicio,
      hua_fecha_fin : $scope.fechaFin,
      diasHoras : diasHoras
    };
  };

  $scope.setFechas = function() {
    $scope.fechaInicio = document.getElementById("fecha_inicio").value
    $scope.fechaFin = document.getElementById("fecha_fin").value;
  };

  $scope.socket.on("changeOnHorarios", function(data) {
    $scope.getHorario();
  });

}]);
