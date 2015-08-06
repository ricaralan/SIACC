SIACCApp.controller("MesaAyudaSolicitanteController", ["$scope", "$http", "util", function($scope, $http, util) {

  $scope.dataUsuario = {};
  $scope.servicios = [];
  $scope.formMesaAyuda = {};

  $scope.initDataUsuario = function() {
    $http.get("/usuarios/getIdUsuarioLogueado").success(function(data) {
      $http.get("/usuarios/getDataUsuario/"+data.idUsuario).success(function(dataUsuario) {
        $scope.dataUsuario = dataUsuario;
      });
    });
  };

  $scope.getServicios = function() {
    $http.get("/tipo_servicio/getTiposServicios").success(function(servicios) {
      $scope.servicios = servicios;
    });
  };

  $scope.solicitarServicio = function() {
    if($scope.formularioValido() && valido) {
      $scope.formMesaAyuda.mes_otro_tipo_servicio = ($scope.formMesaAyuda.mes_id_tipo_servicio==0)?$scope.formMesaAyuda.mes_otro_tipo_servicio:null;
      $scope.formMesaAyuda.mes_id_usuario = $scope.dataUsuario.id_usuario;
      $scope.formMesaAyuda.mes_id_area = $scope.dataUsuario.usu_id_area;
      $http.post("/acceso_area/registrarAcceso",{jsonData : $scope.formMesaAyuda}).success(function(data) {
        console.log(data);
      });
    } else {
      Materialize.toast("Debes completar todos los campos", 1000);
    }
  };

  $scope.formularioValido = function() {
    valido = true;
    if($scope.formMesaAyuda.mes_id_tipo_servicio == 0) {
      valido = !util.empty($scope.formMesaAyuda.mes_otro_tipo_servicio);
    }
    return valido && (!util.empty($scope.formMesaAyuda.mes_id_tipo_servicio) &&
           !util.empty($scope.formMesaAyuda.mes_descripcion_problema));
  };


}]);
