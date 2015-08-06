var self;
var TiposAreasController = function(){
  self = this;
  self.table = "tipo_area";
  self.abstractModel = require("../models/abstract/AbstractModel");
  self.connection = require("../connection/mysql_connection");
};

TiposAreasController.prototype.getTiposArea = function(callback) {
  self.abstractModel.select(self.table,[
    "id_tipo_area", "tipo_nombre", "tipo_descripcion", "tipo_imagen"
    ], {}, callback);
};

TiposAreasController.prototype.getPermisosTipoArea = function(idTipoArea, callback) {
  query = "SELECT id_permiso, moa_id_permiso, moa_ver FROM "
        + "permiso LEFT JOIN permiso_asignado ON id_permiso=moa_id_permiso AND moa_id_tipo_area="+idTipoArea;
  self.connection.query(query, callback);
};

TiposAreasController.prototype.asignarPermisosTipoArea = function(idTipoArea, permisos, callback) {
  for(permiso in permisos) {
    self.createPermisos(idTipoArea, permiso, permisos[permiso]);
  }
  callback({success : true});
};

TiposAreasController.prototype.updatePermisosTipoArea = function(idTipoArea, permisos, callback) {
  for(permiso in permisos) {
    self.updatePermisos(idTipoArea, permiso, permisos[permiso]);
  }
  callback({success : true});
};

TiposAreasController.prototype.createPermisos = function(idTipoArea, idPermiso, jsonPermisos) {
  self.abstractModel.insert("permiso_asignado", {
    moa_id_tipo_area : idTipoArea,
    moa_id_permiso : idPermiso,
    moa_ver : jsonPermisos.moa_ver,
    moa_crear : jsonPermisos.moa_crear,
    moa_editar : jsonPermisos.moa_editar,
    moa_eliminar : jsonPermisos.moa_eliminar
  }, function(err, data) { });
};

TiposAreasController.prototype.updatePermisos = function(idTipoArea, idPermiso, jsonPermisos) {
  self.abstractModel.update("permiso_asignado", {
    moa_id_tipo_area : idTipoArea,
    moa_id_permiso : idPermiso,
    moa_ver : jsonPermisos.moa_ver,
    moa_crear : jsonPermisos.moa_crear,
    moa_editar : jsonPermisos.moa_editar,
    moa_eliminar : jsonPermisos.moa_eliminar
  }, {
    moa_id_tipo_area : idTipoArea,
    moa_id_permiso : idPermiso
  }, function(err, data) {});
};

TiposAreasController.prototype.create = function(jsonData, callback) {
    self.abstractModel.insert(self.table, jsonData, callback);
};

TiposAreasController.prototype.update = function(jsonData, id_tipo_area, callback) {
    self.abstractModel.update(self.table, jsonData, { id_tipo_area : id_tipo_area }, callback);
};

TiposAreasController.prototype.delete = function(id_tipo_area, callback) {
  self.abstractModel.delete(self.table, { id_tipo_area : id_tipo_area }, callback);
};

module.exports = new TiposAreasController();
