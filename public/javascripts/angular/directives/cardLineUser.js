SIACCApp.directive("cardLineUser", function() {
  return {
    restrict : "E",
    templateUrl : "/prefabs/card-line-user.html",
    link : function(scope, element, attributes) {
      scope.userCardLine = JSON.parse(attributes.user);
    }
  };
});
