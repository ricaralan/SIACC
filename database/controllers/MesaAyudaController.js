var InventariosController = function() {
  self = this;
  self.table = "mesa_ayuda";
  self.abstractModel = require("../models/abstract/AbstractModel");
  self.connection = require("../connection/mysql_connection");
};

var self;

InventariosController.prototype.create = function(jsonData, callback) {
  self.abstractModel.insert(self.table, jsonData, callback);
};

InventariosController.prototype.delete = function(numInventario, callback) {
  self.abstractModel.delete(self.table, { num_inventario : numInventario }, callback);
};


module.exports = new InventariosController();
