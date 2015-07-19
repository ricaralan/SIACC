var ModulesController = function() {
  self = this;
  self.table = "modulo";
  self.abstractModel = require("../models/abstract/AbstractModel");
  self.connection = require("../connection/mysql_connection");
};
var self;

// Con este método obtenemos todos los módulos
ModulesController.prototype.getAllModules = function(callback) {
  self.abstractModel.select(self.table, ["id_modulo", "mod_nombre", "mod_descripcion"], {}, callback);
};

module.exports = new ModulesController();
