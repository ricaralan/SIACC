var AppModule = angular.module("AppModule", []);


AppModule.directive("appForUsers", function() {
  var init = function (scope, element, attributes) {
      $(".button-collapse").sideNav();
	};
  return {
    restrict : "E",
    templateUrl : "/prefabs/app-for-users.html",
    link : init
  };
});
