SIACCApp.directive("appForUsers", ["$http", function($http) {
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
          out_duration: 300 // Transition out duration
        });
        $('select').material_select();
        $('.datepicker').pickadate({
          selectMonths: true,
          selectYears: 15,
          format: 'yyyy-mm-dd'
        });
      });
      document.getElementById("contentApp").removeAttribute("hidden");
      $http.get("/permisos/getPermisosUserLog").success(function(permisos) {
        initPermisos(permisos);
        document.getElementById("loadPage").remove();
      });
      function initPermisos(permisos) {
        scope.permisos = {};
        if(permisos.permisosTipoArea != {}) {
          // Menú basado en los permisos del usuario
          for(permiso in permisos.permisosTipoUsuario){
            if(permisos.permisosTipoUsuario[permiso].ver == 1) {
              scope.permisos[permiso] = {
                nombre_corto : permisos.permisosTipoUsuario[permiso].nombre_corto,
                url : permisos.permisosTipoUsuario[permiso].url,
                ver : permisos.permisosTipoUsuario[permiso].ver,
                crear : permisos.permisosTipoUsuario[permiso].crear,
                editar : permisos.permisosTipoUsuario[permiso].editar,
                eliminar : permisos.permisosTipoUsuario[permiso].eliminar
              };
            }
          }
        } else {
          // Menú basado en los permisos del área
        }
        //scope.permisos = permisos;
      };
	};
  return {
    restrict : "E",
    templateUrl : "/prefabs/app-for-users.html",
    link : init,
    transclude : true
  };
}]);
