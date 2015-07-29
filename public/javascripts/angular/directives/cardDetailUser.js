SIACCApp.directive("cardDetailUser", function() {
  return {
    restrict : "E",
    templateUrl : "/prefabs/card-detail-user.html",
    link : function(scope, element, attributes) {
      attributes.$observe("user", function() {
        scope.userCardDetail = JSON.parse(attributes.user);
      });
    }
  };
});
