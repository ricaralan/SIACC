var ReportsController = function() {
  self = this;
  self.table = "area";
  self.abstractModel = require("../models/abstract/AbstractModel");
  self.connection = require("../connection/mysql_connection");
};
var self;

ReportsController.prototype.getDataAccesoArea = function(idArea, tipoAcceso, f1, f2, done) {
  where = "WHERE acc_id_inventario " + ((tipoAcceso==1)?"IS NULL":"IS NOT NULL");
  query = "SELECT id_acceso,num_inventario,id_usuario,usu_nombre,usu_primer_apellido,"
        + "usu_segundo_apellido,acc_fecha_registro,acc_hora_inicio,acc_hora_fin FROM "
        + "((acceso_area INNER JOIN usuario ON id_usuario=acc_id_usuario AND acc_id_area="+idArea+")"
        + "INNER JOIN area ON id_area=acc_id_area)LEFT JOIN inventario ON "
        + "num_inventario=acc_id_inventario " + where + " AND acc_hora_fin!='00:00:00' "
        + "AND acc_fecha_registro>='" + f1 + "' AND acc_fecha_registro<='" + f2 + "'";
  self.connection.query(query, done);
};

module.exports = new ReportsController();
