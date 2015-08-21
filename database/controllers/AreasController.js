var AreasController = function() {
  self = this;
  self.table = "area";
  self.abstractModel = require("../models/abstract/AbstractModel");
  self.connection = require("../connection/mysql_connection");
};
var self;

AreasController.prototype.getAreas = function(callback) {
  // Esto solo es una prueba... Después se tiene que mandar
  self.abstractModel.select(self.table, [
    "id_area", "are_id_tipo_area", "are_nombre", "are_descripcion"
  ], {/* WHERE */}, callback);
};

AreasController.prototype.getAreasAdministradorasMesaAyuda = function(callback) {
  query = "SELECT id_area,are_nombre,moa_id_permiso,moa_ver FROM "
        + "(area INNER JOIN tipo_area ON id_tipo_area=are_id_tipo_area)"
        + "INNER JOIN permiso_asignado ON id_tipo_area=moa_id_tipo_area AND "
        + "moa_id_permiso='mesa_ayuda_administrador' AND moa_ver=1;";
  self.connection.query(query, callback);
};

AreasController.prototype.getArea = function(idArea, callback) {
  // Esto solo es una prueba... Después se tiene que mandar
  self.abstractModel.select(self.table, [
    "id_area", "are_id_tipo_area", "are_nombre", "are_descripcion"
  ], { id_area : idArea }, callback);
};

AreasController.prototype.create = function(jsonArea, callback) {
  self.abstractModel.insert(self.table, jsonArea, callback);
};

AreasController.prototype.update = function(jsonArea, idArea, callback) {
  self.abstractModel.update(self.table, jsonArea, { id_area : idArea }, callback);
};

AreasController.prototype.delete = function(idArea, callback) {
  self.abstractModel.delete(self.table, { id_area : idArea }, callback);
};

module.exports = new AreasController();
