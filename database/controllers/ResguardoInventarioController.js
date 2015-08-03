var ResguardoInventarioController = function() {
  self = this;
  self.table = "resguardo_inventario";
  self.abstractModel = require("../models/abstract/AbstractModel");
  self.connection = require("../connection/mysql_connection");
};
var self;

ResguardoInventarioController.prototype.getDataResguardo = function(idResguardo, callback) {
  // USUARIO,INVENTARIO,RESGUARDO
  query = "SELECT num_inventario,id_usuario,id_resguardo,rin_fecha_inicio,rin_fecha_fin,"
        + "usu_nombre,usu_primer_apellido,usu_segundo_apellido FROM "
        + "(resguardo_inventario INNER JOIN inventario ON num_inventario=rin_num_inventario) "
        + "INNER JOIN usuario ON rin_id_usuario=id_usuario WHERE id_resguardo=" + idResguardo;
  self.connection.query(query, callback);
};

ResguardoInventarioController.prototype.create = function(jsonResguardo, callback) {
  self.abstractModel.insert(self.table, jsonResguardo, callback);
};

ResguardoInventarioController.prototype.finalizarResguardo = function(idResguardo, callback) {
  self.connection.query("SELECT CURRENT_TIMESTAMP", function(err, data) {
    self.abstractModel.update(self.table,{rin_fecha_fin : data[0].CURRENT_TIMESTAMP},{id_resguardo : idResguardo}, callback);
  });
};

ResguardoInventarioController.prototype.update = function(jsonResguardo, idResguardo, callback) {
  self.abstractModel.update(self.table, jsonResguardo, { id_resguardo : idResguardo }, callback);
};


module.exports = new ResguardoInventarioController();
