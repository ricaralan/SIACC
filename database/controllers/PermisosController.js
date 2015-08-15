var PermisosController = function() {
  self = this;
  self.table = "permiso";
  self.abstractModel = require("../models/abstract/AbstractModel");
  self.connection = require("../connection/mysql_connection");
};
var self;

// Con este método obtenemos todos los permisos
PermisosController.prototype.getAllPermisos = function(callback) {
  self.abstractModel.select(self.table, ["id_permiso", "per_nombre", "per_descripcion"], {}, callback);
};

PermisosController.prototype.getPermisosTipoUsuario = function(idTipoUsuario, callback) {
  query = "SELECT id_permiso_asignado,per_url,per_nombre_corto,moa_id_permiso,moa_id_tipo_usuario,moa_ver,moa_crear,moa_editar,moa_eliminar FROM permiso_asignado LEFT JOIN permiso ON id_permiso=moa_id_permiso WHERE moa_id_tipo_area IS NULL AND moa_id_tipo_usuario=" + idTipoUsuario;
  self.connection.query(query, callback);
};

PermisosController.prototype.getPermisosTipoArea = function(idArea, callback) {
  self.abstractModel.select("area", ["are_id_tipo_area"], {id_area : idArea}, function(err, area) {
    if(!err) {
      query = "SELECT id_permiso_asignado,per_url,per_nombre_corto,moa_id_permiso,moa_id_tipo_area,moa_ver,moa_crear,moa_editar,moa_eliminar FROM permiso_asignado LEFT JOIN permiso ON id_permiso=moa_id_permiso WHERE moa_id_tipo_usuario IS NULL AND moa_id_tipo_area=" + idArea;
      self.connection.query(query, callback);
    }
  });
};

PermisosController.prototype.getJsonPermisos = function(arrayPermisos) {
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

module.exports = new PermisosController();
