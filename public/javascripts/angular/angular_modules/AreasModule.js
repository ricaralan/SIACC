var AreasModule = angular.module("AreasModule", ["AppModule"]);

AreasModule.controller("TiposAreasController", function($scope, $http) {

  $scope.tiposDeUsuarios;

  $scope.initTiposUsuarios = function() {
    $http.get("/users/getTypesUser").success(function(data) {
      $scope.tiposDeUsuarios = data;
    });
  };

  $scope.crearTipoDeArea = function() {
    if($scope.verificarFormularioTipoUsuario()) {
      json = encodeURIComponent(JSON.stringify($scope.armarJSON()));
      $http.post("/tipoArea/create/"+json).success(function(data) {
        console.log(data);
      });
    }
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

  $scope.initTiposUsuarios();
});
