var PermisosController = function() {
  self = this;
  self.table = "permiso";
  self.abstractModel = require("../models/abstract/AbstractModel");
  self.connection = require("../connection/mysql_connection");
};
var self;

// Con este método obtenemos todos los permisos
PermisosController.prototype.getAllPermisos = function(done) {
  self.abstractModel.select(self.table, ["id_permiso", "per_nombre", "per_descripcion"], {}, done);
};

PermisosController.prototype.getPermisosTipoUsuario = function(idTipoUsuario, done) {
  query = "SELECT id_permiso_asignado,per_url,per_nombre_corto,moa_id_permiso,"
        + "moa_id_tipo_usuario,moa_ver,moa_crear,moa_editar,moa_eliminar FROM "
        + "permiso_asignado LEFT JOIN permiso ON id_permiso=moa_id_permiso WHERE "
        + "moa_id_tipo_area IS NULL AND moa_id_tipo_usuario=" + idTipoUsuario;
  self.connection.query(query, done);
};

PermisosController.prototype.getPermisoTipoUsuario = function(idTipoUsuario, id_permiso, done) {
  query = "SELECT id_permiso_asignado,per_url,per_nombre_corto,moa_id_permiso,"
        + "moa_id_tipo_usuario,moa_ver,moa_crear,moa_editar,moa_eliminar FROM "
        + "permiso_asignado LEFT JOIN permiso ON id_permiso=moa_id_permiso WHERE "
        + "moa_id_tipo_area IS NULL AND moa_id_tipo_usuario=" + idTipoUsuario+" AND id_permiso='"+id_permiso+"'";
  self.connection.query(query, done);
};

PermisosController.prototype.getPermisosTipoArea = function(idArea, done) {
  self.abstractModel.select("area", ["are_id_tipo_area"], {id_area : idArea}, function(err, area) {
    if(!err) {
      query = "SELECT id_permiso_asignado,per_url,per_nombre_corto,moa_id_permiso,moa_id_tipo_area,moa_ver FROM permiso_asignado LEFT JOIN permiso ON id_permiso=moa_id_permiso WHERE moa_id_tipo_usuario IS NULL AND moa_id_tipo_area=" + idArea;
      self.connection.query(query, done);
    }
  });
};

PermisosController.prototype.getJsonPermisos = function(permisosUsu, permisosArea, idTipoUsuario, done) {
    self.abstractModel.select("tipo_usuario", ["tipo_asignar_area"], {
      id_tipo_usuario:idTipoUsuario
    }, function(err, data) {
      if(!err) {
        jsonPermisosUsuario = self.getJsonPermiso(permisosUsu);
        for(permiso in jsonPermisosUsuario) {
            if(jsonPermisosUsuario[permiso].ver == 0) {
              delete jsonPermisosUsuario[permiso];
            }
        }
        if(data[0].tipo_asignar_area == 1) {
          jsonPermisosArea = self.getJsonPermiso(permisosArea);
          for(permiso in jsonPermisosArea) {
            if(jsonPermisosArea[permiso].ver == 0) {
              delete jsonPermisosUsuario[permiso];
            }
          }
        }
        done(jsonPermisosUsuario);
      }
    });
};

PermisosController.prototype.getJsonPermiso = function(arrayPermisos) {
  json = {};
  if(arrayPermisos && arrayPermisos.length) {
    for(var i = 0; i < arrayPermisos.length; i++) {
      json[arrayPermisos[i].moa_id_permiso] = {
        nombre_corto : arrayPermisos[i].per_nombre_corto,
        url : arrayPermisos[i].per_url,
        ver : arrayPermisos[i].moa_ver,
        crear : arrayPermisos[i].moa_crear,
        editar : arrayPermisos[i].moa_editar,
        eliminar : arrayPermisos[i].moa_eliminar
      };
    }
  }
  return json;
};

PermisosController.prototype.removePermisosAreaSiNoTieneArea = function(permisos, tipo_usuario, done) {
  self.abstractModel.select("tipo_usuario", ["tipo_asignar_area"], {
    id_tipo_usuario : tipo_usuario
  }, function(err, data) {
    for(permiso in permisos) {
      /**
      * Remover permisos que requiren que el usuario este asignado a un área
      */
      if(permiso === "acceso_simple" && data[0].tipo_asignar_area !== 1) {
        delete permisos[permiso];
      } else if(permiso === "acceso_equipo_computo" && data[0].tipo_asignar_area !== 1) {
        delete permisos[permiso];
      }
    }
    done(permisos);
  });
};

module.exports = new PermisosController();
