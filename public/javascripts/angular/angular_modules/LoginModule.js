var LoginModule = angular.module("LoginModule", []);

LoginModule.controller("loginController", function($scope, $http, $location) {
  $scope.login = function() {
    $http.post("/login/verificarUsuario/"+$scope.textUser+"/"+$scope.textPassword)
    .success(function(data) {
      if(data) {
        window.location = "/";
      }
    });
  };
});
