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

module.exports = new PermisosController();
