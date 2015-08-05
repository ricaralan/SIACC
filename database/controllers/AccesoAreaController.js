var AccesoAreasController = function() {
  self = this;
  self.table = "acceso_area";
  self.abstractModel = require("../models/abstract/AbstractModel");
  self.connection = require("../connection/mysql_connection");
};
var self;

AccesoAreasController.prototype.getAccesosSimplesActualesArea = function(idArea, callback) {
  query = "SELECT id_area,id_usuario,id_acceso,usu_nombre,usu_primer_apellido,"
        + "usu_segundo_apellido,acc_fecha_registro,acc_hora_inicio,acc_hora_fin FROM "
        + "((area INNER JOIN acceso_area ON id_area=acc_id_area AND id_area="+idArea+")"
        + "INNER JOIN usuario ON id_usuario=acc_id_usuario) WHERE acc_id_inventario IS NULL AND acc_hora_fin='00:00:00'";
  self.connection.query(query, callback);
};

AccesoAreasController.prototype.getAccesosInventarioActualesArea = function(idArea, callback) {
  query = "SELECT id_area,id_usuario,id_acceso,usu_nombre,usu_primer_apellido,"
        + "usu_segundo_apellido,acc_fecha_registro,acc_hora_inicio,acc_hora_fin,"
        + "num_inventario,inv_num_maq FROM ((((area INNER JOIN inventario ON id_area"
        + "=inv_id_area AND id_area="+idArea+" AND inv_usar_control_acceso=1)INNER JOIN tipo_inventario ON id_tipo_inventario"
        + "=inv_tipo)) LEFT JOIN acceso_area ON num_inventario=acc_id_inventario"
        + " AND acc_hora_fin='00:00:00') LEFT JOIN usuario ON id_usuario=acc_id_usuario ORDER BY inv_num_maq asc"
  self.connection.query(query, callback);
};

AccesoAreasController.prototype.create = function(jsonAcceso, callback) {
  self.abstractModel.insert(self.table, jsonAcceso, callback);
};

AccesoAreasController.prototype.update = function(jsonAcceso, idAcceso, callback) {
  self.abstractModel.update(self.table, jsonAcceso, { id_acceso : idAcceso }, callback);
};


module.exports = new AccesoAreasController();
