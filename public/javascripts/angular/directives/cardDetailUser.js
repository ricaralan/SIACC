SIACCApp.directive("cardDetailUser", ["$http", "scopes", "util", function($http, scopes, util) {
  return {
    restrict : "E",
    templateUrl : "/prefabs/card-detail-user.html",
    link : function(scope, element, attributes) {
      attributes.$observe("user", function() {
        scope.userCardDetail = JSON.parse(attributes.user);
        $http.get("/usuarios/getPermisosUsuario/"+scope.userCardDetail.usu_id_tipo_usuario)
        .success(function(permisosUsuario) {
          scope.permisosUsuario = permisosUsuario;
        });
      });

      scope.showHorarioUsuarioArea = function(idArea, idUsuario) {
        horariosScope = scopes.get("HorariosController");
        horariosScope.clearCeldasHorarios();
        $('#modalHorarioAula').openModal({complete:function(){horariosScope.cleanSelecteds();}});
        horariosScope.idUsuario = idUsuario;
        horariosScope.idArea = idArea;
        horariosScope.tipoHorario = 1;
        horariosScope.titleOpcHorario = "Horario de atención en área";
        document.getElementById('horarioArea').setAttribute('area', idArea);
        document.getElementById('horarioArea').setAttribute('usuario', idUsuario);
      };

      scope.showHorarioArea = function(idArea, idUsuario) {
        horariosScope = scopes.get("HorariosController");
        horariosScope.idUsuario = idUsuario;
        horariosScope.idArea = idArea;
        horariosScope.clearCeldasHorarios();
        horariosScope.tipoHorario = 2;
        horariosScope.titleOpcHorario = "Apartar horario de clases en área";
        $('#modalHorarioAula').openModal({complete:function(){horariosScope.cleanSelecteds();}});
        document.getElementById('horarioArea').setAttribute('area', idArea);
        document.getElementById('horarioArea').setAttribute('usuario', idUsuario);
      };

      scope.mostrarMateriasUsuario = function(usuario) {
        materiasScope = scopes.get("MateriasController");
        materiasScope.getMateriasUsuario(usuario);
        $("#modalMateriasUsuario").openModal();
      };

      scope.getPermisoById = function(idPermiso) {
        if(scope.permisosUsuario && !util.empty(idPermiso)){
          for(var i = 0; i < scope.permisosUsuario.length; i++) {
            if(scope.permisosUsuario[i].permiso == idPermiso) {
              return scope.permisosUsuario[i];
            }
          }
        }
        return null;
      };
    }
  };
}]);
