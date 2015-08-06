var self;
var TiposUsuariosController = function(){
  self = this;
  self.table = "tipo_usuario";
  self.abstractModel = require("../models/abstract/AbstractModel");
  self.connection = require("../connection/mysql_connection");
};

TiposUsuariosController.prototype.getTiposUsuario = function(callback) {
  self.abstractModel.select(self.table,[
    "id_tipo_usuario", "tipo_nombre", "tipo_descripcion", "tipo_asignar_area", "tipo_asignar_carrera"
    ], {}, callback);
};

TiposUsuariosController.prototype.getPermisosTipoUsuario = function(idTipoUsuario, callback) {
  query = "SELECT id_permiso, moa_id_permiso, moa_ver, moa_crear, moa_editar, moa_eliminar FROM "
        + "permiso LEFT JOIN permiso_asignado ON id_permiso=moa_id_permiso AND moa_id_tipo_usuario="+idTipoUsuario;
  self.connection.query(query, callback);
};

TiposUsuariosController.prototype.create = function(jsonDataTipoUsuario, jsonPermisos, callback) {
  self.abstractModel.insert(self.table, jsonDataTipoUsuario, function(err, data) {
    if(!err) {
      for(permiso in jsonPermisos) {
        self.createPermisos(data.insertId, permiso, jsonPermisos[permiso]);
      }
      // Esto tiene que arrojar el estado completo de la inserción... El error, etc...
      callback({success : true});
    }
  });
};

TiposUsuariosController.prototype.update = function(jsonDataTipoUsuario, jsonPermisos, callback) {
    // UPDATE datos del tipo de usuario
    self.abstractModel.update(self.table, jsonDataTipoUsuario, { id_tipo_usuario : jsonDataTipoUsuario.id_tipo_usuario }, callback);
    // UPDATE permisos del tipo de usuario
    for(permiso in jsonPermisos) {
      self.updatePermisos(jsonDataTipoUsuario.id_tipo_usuario , permiso, jsonPermisos[permiso]);
    }
};

TiposUsuariosController.prototype.delete = function(id_tipo_usuario, callback) {
  self.abstractModel.delete("permiso_asignado", {moa_id_tipo_usuario : id_tipo_usuario}, function(err, data) {
    if(!err) {
      self.abstractModel.delete(self.table, { id_tipo_usuario : id_tipo_usuario }, callback);
    }
  });
};

TiposUsuariosController.prototype.createPermisos = function(idTipoUsuario, idPermiso, jsonPermisos) {
  self.abstractModel.insert("permiso_asignado", {
    moa_id_tipo_usuario : idTipoUsuario,
    moa_id_permiso : idPermiso,
    moa_ver : jsonPermisos.moa_ver,
    moa_crear : jsonPermisos.moa_crear,
    moa_editar : jsonPermisos.moa_editar,
    moa_eliminar : jsonPermisos.moa_eliminar
  }, function(err, data) { });
};

TiposUsuariosController.prototype.updatePermisos = function(idTipoUsuario, idPermiso, jsonPermisos) {
  self.abstractModel.select("permiso_asignado",["moa_id_permiso"],{
    moa_id_permiso : idPermiso,
    moa_id_tipo_usuario : idTipoUsuario
  }, function(err, data) {
    if(data.length == 0) {
      self.createPermisos(idTipoUsuario, idPermiso, jsonPermisos);
    } else {
      self.abstractModel.update("permiso_asignado",{
        moa_id_tipo_usuario : idTipoUsuario,
        moa_id_permiso : idPermiso,
        moa_ver : jsonPermisos.moa_ver,
        moa_crear : jsonPermisos.moa_crear,
        moa_editar : jsonPermisos.moa_editar,
        moa_eliminar : jsonPermisos.moa_eliminar
      },{
        moa_id_permiso : idPermiso,
        moa_id_tipo_usuario : idTipoUsuario
      }, function() {});
    }
  });
};

module.exports = new TiposUsuariosController();
