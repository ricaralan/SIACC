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
        // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
        $('.modal-trigger').leanModal({
          dismissible: true, // Modal can be dismissed by clicking outside of the modal
          opacity: .5, // Opacity of modal background
          in_duration: 300, // Transition in duration
          out_duration: 300, // Transition out duration
          ready: function() {  }, // Callback for Modal open
          complete: function() {  } // Callback for Modal close
        });
        $('select').material_select();
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
