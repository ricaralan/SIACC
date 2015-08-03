var InventariosController = function() {
  self = this;
  self.table = "inventario";
  self.abstractModel = require("../models/abstract/AbstractModel");
  self.connection = require("../connection/mysql_connection");
};
var self;

InventariosController.prototype.getInventarioTipoArea = function(idArea, tipoInv,callback) {
  query = "SELECT id_resguardo,rin_id_usuario,num_inventario,inv_id_area,inv_tipo,inv_num_maq,"
        + "inv_ram,inv_procesador,inv_vel_procesador,inv_capacidad,inv_no_serie,"
        + "inv_marca,inv_status,inv_disponibilidad,inv_descripcion FROM inventario "
        + "LEFT JOIN resguardo_inventario ON num_inventario=rin_num_inventario AND "
        + "rin_fecha_fin='0000-00-00 00:00:00' WHERE inv_tipo="+tipoInv+" AND inv_id_area="+idArea;
  self.connection.query(query, callback);
};

InventariosController.prototype.create = function(jsonData, callback) {
  self.abstractModel.insert(self.table, jsonData, callback);
};

InventariosController.prototype.update = function(jsonData, numInventario, callback) {
  self.abstractModel.update(self.table, jsonData, { num_inventario : numInventario }, callback);
};

InventariosController.prototype.delete = function(numInventario, callback) {
  self.abstractModel.delete(self.table, { num_inventario : numInventario }, callback);
};


module.exports = new InventariosController();
