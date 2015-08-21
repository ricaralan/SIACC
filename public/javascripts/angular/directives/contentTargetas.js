SIACCApp.directive("contentTargetas", ["$http", function($http) {
  return {
    restrict : "A",
    link : function(scope, element, attrs) {

      socket = io();

      angular.element(element[0])[0].addEventListener("dragover", function(e) {
        e.preventDefault()
        this.style.border = "dashed 2px rgba(0, 0, 0, .4)";
      }, false);

      angular.element(element[0])[0].addEventListener("dragleave", function(e) {
        e.preventDefault()
        this.style.border = "none";
      }, false);

      angular.element(element[0])[0].addEventListener("drop", function(e) {
        servicio = JSON.parse(e.dataTransfer.getData("servicio"));
        this.style.border = "none";
        $http.post("/mesa_ayuda/cambiar_area_atencion", {
          aam_id_mesa_ayuda : servicio.id_mesa_ayuda,
          aam_id_area : attrs.area
        }).success(function(data) {
          console.log(data);
          socket.emit("changeOnServiciosSinSolucionar", data);
        });
      }, false);
    }
  };
}]);
