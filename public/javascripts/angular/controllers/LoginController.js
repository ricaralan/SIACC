SIACCApp.controller("LoginController",["$scope", "$http", "$location", "util", function($scope, $http, $location, util) {

  $scope.login = function() {
    if(!util.empty($scope.textUser) && !util.empty($scope.textPassword)){
      $http.post("/auth/login/",{
        username : $scope.textUser,
        password : $scope.textPassword
      }).success(function(data) {
          window.location = "/";
      });
      $scope.textPassword = "";
      setTimeout(function(){
          Materialize.toast("Usuario o contraseña incorrectos", 3000);
      }, 800);
    } else {
      Materialize.toast("Debes completar los campos", 2000);
    }
  };

  $scope.focusInputId = function(id) {
    document.getElementById(id).focus();
  };

}]);
