var self;
var TiposInventariosController = function(){
  self = this;
  self.table = "tipo_inventario";
  self.abstractModel = require("../models/abstract/AbstractModel");
};

TiposInventariosController.prototype.getTiposInventarios = function(callback) {
  self.abstractModel.select(self.table, [
    "id_tipo_inventario", "tin_nombre", "tin_descripcion", "tin_foto", "tin_es_computadora"
    ], {}, callback);
};

TiposInventariosController.prototype.create = function(jsonData, callback) {
  self.abstractModel.insert(self.table, jsonData, callback);
};

TiposInventariosController.prototype.update = function(jsonData, idTipoInventario, callback) {
  self.abstractModel.update(self.table, jsonData, { id_tipo_inventario : idTipoInventario }, callback);
};

TiposInventariosController.prototype.delete = function(idTipoInventario, callback) {
  self.abstractModel.delete(self.table, { id_tipo_inventario : idTipoInventario }, callback);
};

module.exports = new TiposInventariosController();
