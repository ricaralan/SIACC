var self;
var TiposUsuariosController = function(){
  self = this;
  self.table = "tipo_usuario";
  self.abstractModel = require("../models/abstract/AbstractModel");
  self.connection = require("../connection/mysql_connection");
};

TiposUsuariosController.prototype.getTiposUsuario = function(done) {
  self.abstractModel.select(self.table,[
    "id_tipo_usuario", "tipo_nombre", "tipo_descripcion", "tipo_asignar_area", "tipo_asignar_carrera"
  ], {}, done);
};

TiposUsuariosController.prototype.getPermisosTipoUsuario = function(idTipoUsuario, done) {
  query = "SELECT id_permiso, moa_id_permiso, moa_ver, moa_crear, moa_editar, moa_eliminar FROM "
        + "permiso LEFT JOIN permiso_asignado ON id_permiso=moa_id_permiso AND moa_id_tipo_usuario="+idTipoUsuario;
  self.connection.query(query, done);
};

TiposUsuariosController.prototype.create = function(jsonDataTipoUsuario, jsonPermisos, jsonPermisosSobreTipoUsuario, done) {
  self.abstractModel.insert(self.table, jsonDataTipoUsuario, function(err, data) {
    if(!err) {
      for(permiso in jsonPermisos) {
        self.createPermisos(data.insertId, permiso, jsonPermisos[permiso]);
      }
      // UPDATE permisos sobre los tipos de usuario
      for(permiso in jsonPermisosSobreTipoUsuario) {
        jsonPermisosSobreTipoUsuario[permiso]["ptu_id_tipo_usuario"] = data.insertId;
        self.updatePermisosSobreTiposUsuarios(jsonPermisosSobreTipoUsuario[permiso], function(err, data) {});
      }
      // Esto tiene que arrojar el estado completo de la inserción... El error, etc...
      done({success : true});
    }
  });
};

TiposUsuariosController.prototype.update = function(jsonDataTipoUsuario, jsonPermisos, jsonPermisosSobreTipoUsuario, done) {
    // UPDATE datos del tipo de usuario
    self.abstractModel.update(self.table, jsonDataTipoUsuario, { id_tipo_usuario : jsonDataTipoUsuario.id_tipo_usuario }, done);
    // UPDATE permisos del tipo de usuario
    for(permiso in jsonPermisos) {
      self.updatePermisos(jsonDataTipoUsuario.id_tipo_usuario , permiso, jsonPermisos[permiso]);
    }
    // UPDATE permisos sobre los tipos de usuario
    for(permiso in jsonPermisosSobreTipoUsuario) {
      self.updatePermisosSobreTiposUsuarios(jsonPermisosSobreTipoUsuario[permiso], function(err, data) {});
    }
};

TiposUsuariosController.prototype.delete = function(id_tipo_usuario, done) {
  self.abstractModel.delete("permiso_asignado", {moa_id_tipo_usuario : id_tipo_usuario}, function(err, data) {
    if(!err) {
      self.abstractModel.delete(self.table, { id_tipo_usuario : id_tipo_usuario }, done);
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

TiposUsuariosController.prototype.updatePermisosSobreTiposUsuarios = function(jsonPermiso, done) {
  jsonWhere = {
    ptu_id_tipo_usuario : jsonPermiso.ptu_id_tipo_usuario,
    ptu_id_tipo_usuario_permiso : jsonPermiso.ptu_id_tipo_usuario_permiso
  };
  self.abstractModel.select("permiso_por_tipo_usuario", ["ptu_id_tipo_usuario"],
    jsonWhere, function(err, data) {
    jsonWhere = {
      ptu_id_tipo_usuario : jsonPermiso.ptu_id_tipo_usuario,
      ptu_id_tipo_usuario_permiso : jsonPermiso.ptu_id_tipo_usuario_permiso
    };
    jsonData = {
      ptu_ver_contrasena : jsonPermiso.ptu_ver_contrasena,
      ptu_solo_usuarios_area : jsonPermiso.ptu_solo_usuarios_area,
      ptu_todos_usuarios : jsonPermiso.ptu_todos_usuarios,
      ptu_ningun_usuario : jsonPermiso.ptu_ningun_usuario
    };
    if(!err && data.length > 0) {
      // Actualizar permisos sobre el tipo de usuario
      self.abstractModel.update("permiso_por_tipo_usuario", jsonData, jsonWhere, done);
    } else if(!err && data.length == 0) {
      jsonData["ptu_id_tipo_usuario"] = jsonPermiso.ptu_id_tipo_usuario;
      jsonData["ptu_id_tipo_usuario_permiso"] = jsonPermiso.ptu_id_tipo_usuario_permiso,
      // Registrar permisos sobre el tipo de usuario
      self.abstractModel.insert("permiso_por_tipo_usuario", jsonData, done);
    } else {
      console.log("ERR ", err);
    }
  });
};

module.exports = new TiposUsuariosController();
