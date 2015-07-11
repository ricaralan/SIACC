var AppModule = angular.module("AppModule", []);


AppModule.directive("appForUsers", function() {
  var init = function (scope, element, attributes) {
      $(".button-collapse").sideNav();
      $('.dropdown-button').dropdown({
          inDuration: 300,
          outDuration: 225,
          constrain_width: false, // Does not change width of dropdown to that of the activator
          hover: true, // Activate on hover
          gutter: 0, // Spacing from edge
          belowOrigin: false // Displays dropdown below the button
        }
      );
      $(document).ready(function(){
        $('.collapsible').collapsible({
          accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
        });
      });
      document.getElementById("contentApp").removeAttribute("hidden");
      document.getElementById("loadPage").remove();
	};
  return {
    restrict : "E",
    templateUrl : "/prefabs/app-for-users.html",
    link : init,
    transclude : true
  };
});
