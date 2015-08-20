var self;
var TiposServiciosController = function(){
  self = this;
  self.table = "tipo_servicio";
  self.abstractModel = require("../models/abstract/AbstractModel");
  self.connection = require("../connection/mysql_connection");
};

TiposServiciosController.prototype.getTiposServicios = function(callback) {
  self.abstractModel.select(self.table,[
    "id_tipo_servicio", "tse_nombre", "tse_otro", "tse_descripcion"
    ], {}, callback);
};

TiposServiciosController.prototype.create = function(jsonDataTipoServicio, callback) {
  self.abstractModel.insert(self.table, jsonDataTipoServicio, callback);
};

TiposServiciosController.prototype.update = function(jsonDataTipoServicio, idTipoServicio, callback) {
    self.abstractModel.update(self.table, jsonDataTipoServicio, { id_tipo_servicio : idTipoServicio }, callback);
};

TiposServiciosController.prototype.delete = function(idTipoServicio, callback) {
    self.abstractModel.delete(self.table, { id_tipo_servicio : idTipoServicio }, callback);
};

module.exports = new TiposServiciosController();
