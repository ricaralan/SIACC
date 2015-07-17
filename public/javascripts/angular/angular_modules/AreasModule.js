var AreasModule = angular.module("AreasModule", ["AppModule"]);

AreasModule.controller("TiposAreasController", function($scope, $http) {

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
  */
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
});

AreasModule.controller("AreasController", function($scope, $http) {

  $scope.areas = [];
  $scope.tiposAreas;
  $scope.formArea = {};
  $scope.modulosControladosPorAreas;
  $scope.modulosControladosPorAreaSeleccionada;
  $scope.socket = io();

  $scope.initTiposAreas = function() {
    $http.get("/tipoArea/getTiposArea").success(function(tiposAreas) {
      $scope.tiposAreas = tiposAreas;
    });
  };

  $scope.initModulosControladosPorAreas = function() {
    $http.get("/tipoArea/getModulosControladosPorAreas").success(function(tiposModulos) {
      $scope.modulosControladosPorAreas = tiposModulos;
    });
  };

  $scope.initAreas = function() {
    $http.get("/areas/getAreas").success(function(areas) {
      $scope.areas = areas;
    });
  };

  $scope.getModulosTipoArea = function(idTipoArea) {
    return $scope.modulosControladosPorAreas[idTipoArea];
  };

  $scope.setModulosAreaSeleccionada = function(tipoArea) {
    $scope.modulosControladosPorAreaSeleccionada = $scope.getModulosTipoArea(tipoArea);
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
          try{
            $scope.socket.emit("newAreaCreated", data);
          }catch(e){
            console.log(e);
          }
        } else {
          Materialize.toast("Ocurrio un error al crear el área...", 4000);
        }
      });
    }
  };

  $scope.isEmpty = function(value) {
    return value == null || value.length == 0;
  };

  $scope.initAreas();
  $scope.initTiposAreas();
  $scope.initModulosControladosPorAreas();

  /**
  * LISTEN SOCKETS
  */
  $scope.socket.on("newAreaCreated", function(datos){
    $scope.initAreas();
  });

});
