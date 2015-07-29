SIACCApp.controller("LoginController",["$scope", "$http", "$location", "util", function($scope, $http, $location, util) {

  $scope.login = function() {
    if(!util.empty($scope.textUser) && !util.empty($scope.textPassword)){
      $http.post("/login/verificarUsuario/"+$scope.textUser+"/"+$scope.textPassword)
      .success(function(data) {
        if(data) {
          window.location = "/";
        } else {
          Materialize.toast("Usuario o contraseña incorrectos", 3000);
          $scope.textPassword = "";
        }
      });
    } else {
      Materialize.toast("Debes completar los campos", 2000);
    }
  };

}]);
