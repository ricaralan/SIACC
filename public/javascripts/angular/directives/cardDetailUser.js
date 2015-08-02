SIACCApp.directive("cardDetailUser", ["$http", "scopes", function($http, scopes) {
  return {
    restrict : "E",
    templateUrl : "/prefabs/card-detail-user.html",
    link : function(scope, element, attributes) {
      attributes.$observe("user", function() {
        scope.userCardDetail = JSON.parse(attributes.user);
        $http.get("/usuarios/getPermisosUsuario/"+scope.userCardDetail.usu_id_tipo_usuario)
        .success(function(permisos) {
          scope.permisos = permisos;
        });
      });

      scope.showHorarioUsuarioArea = function(idArea, idUsuario) {
        horariosScope = scopes.get("HorariosController");
        horariosScope.clearCeldasHorarios();
        $('#modalHorarioAula').openModal({complete:function(){horariosScope.cleanSelecteds();}});
        horariosScope.idUsuario = idUsuario;
        horariosScope.idArea = idArea;
        horariosScope.tipoHorario = 1;
        document.getElementById('horarioArea').setAttribute('area', idArea);
        document.getElementById('horarioArea').setAttribute('usuario', idUsuario);
      };

      scope.showHorarioArea = function(idArea, idUsuario) {
        horariosScope = scopes.get("HorariosController");
        horariosScope.idUsuario = idUsuario;
        horariosScope.idArea = idArea;
        horariosScope.clearCeldasHorarios();
        horariosScope.tipoHorario = 2;
        $('#modalHorarioAula').openModal({complete:function(){horariosScope.cleanSelecteds();}});
      };

      scope.mostrarMateriasUsuario = function(usuario) {
        materiasScope = scopes.get("MateriasController");
        materiasScope.getMateriasUsuario(usuario);
        $("#modalMateriasUsuario").openModal();
      };

      scope.getPermisoById = function(idPermiso) {
        if(scope.permisos){
          for(var i = 0; i < scope.permisos.length; i++) {
            if(scope.permisos[i].permiso == idPermiso) {
              return scope.permisos[i];
            }
          }
        }
        return null;
      };
    }
  };
}]);
