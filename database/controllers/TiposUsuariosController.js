var self;
var TiposUsuariosController = function(){
  self = this;
  self.table = "tipo_usuario";
  self.abstractModel = require("../models/abstract/AbstractModel");
  self.connection = require("../connection/mysql_connection");
};

TiposUsuariosController.prototype.getTiposUsuario = function(callback) {
  self.abstractModel.select(self.table,[
    "id_tipo_usuario", "tipo_nombre", "tipo_descripcion"
    ], {}, callback);
};

TiposUsuariosController.prototype.create = function(jsonDataTipoUsuario, jsonPermisosPorModulo, callback) {
  self.abstractModel.insert(self.table, jsonDataTipoUsuario, function(err, data) {
    if(!err) {
      self.createPermisosPorModulo(data.insertId, jsonPermisosPorModulo);
      // Esto tiene que arrojar el estado completo de la inserción... El error, etc...
      callback({success : true});
    }
  });
};

TiposUsuariosController.prototype.update = function(jsonData, id_tipo_usuario, callback) {
    self.abstractModel.update(self.table, jsonData, { id_tipo_usuario : id_tipo_usuario }, callback);
};

TiposUsuariosController.prototype.delete = function(id_tipo_usuario, callback) {
  self.abstractModel.delete("permiso_modulo_usuario", {moa_id_tipo_usuario : id_tipo_usuario}, function(err, data) {
    if(!err) {
      self.abstractModel.delete(self.table, { id_tipo_usuario : id_tipo_usuario }, callback);
    }
  });
};

TiposUsuariosController.prototype.createPermisosPorModulo = function(idTipoUsuario, jsonPermisos) {
  for(var i = 0; i < jsonPermisos.length; i++) {
    self.abstractModel.insert("permiso_modulo_usuario", {
      moa_id_modulo : jsonPermisos[i].moa_id_modulo,
      moa_id_tipo_usuario : idTipoUsuario,
      moa_area_controla_mod : jsonPermisos[i].moa_area_controla_mod
    }, function(err, data) { });
  }
};

module.exports = new TiposUsuariosController();
