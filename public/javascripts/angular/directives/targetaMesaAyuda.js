SIACCApp.directive("targetaMesaAyuda", [function () {
  return {
    restrict : "A",
    link : function(scope, element, attrs) {
      angular.element(element[0])[0].addEventListener("dragstart", function(evt) {
        evt.dataTransfer.setData("servicio", attrs.servicio);
      }, false);
    }
  };
}]);
