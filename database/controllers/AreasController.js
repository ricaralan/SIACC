var AreasController = function() {
  self = this;
  self.table = "area";
  self.abstractModel = require("../models/abstract/AbstractModel");
  self.connection = require("../connection/mysql_connection");
};
var self;

AreasController.prototype.getAreas = function(done) {
  // Esto solo es una prueba... Después se tiene que mandar
  self.abstractModel.select(self.table, [
    "id_area", "are_id_tipo_area", "are_nombre", "are_descripcion"
  ], {/* WHERE */}, done);
};

AreasController.prototype.getAreasAdministradorasMesaAyuda = function(done) {
  query = "SELECT id_area,are_nombre,moa_id_permiso,moa_ver FROM "
        + "(area INNER JOIN tipo_area ON id_tipo_area=are_id_tipo_area)"
        + "INNER JOIN permiso_asignado ON id_tipo_area=moa_id_tipo_area AND "
        + "moa_id_permiso='mesa_ayuda_administrador' AND moa_ver=1;";
  self.connection.query(query, done);
};

AreasController.prototype.getAreasConPermisoAccesos = function(done) {
  query = "SELECT DISTINCT id_area,are_nombre FROM "
        + "(area INNER JOIN tipo_area ON id_tipo_area=are_id_tipo_area)"
        + "INNER JOIN permiso_asignado ON id_tipo_area=moa_id_tipo_area AND "
        + "(moa_id_permiso='acceso_simple' OR moa_id_permiso='acceso_equipo_computo') AND moa_ver=1;";
  self.connection.query(query, done);
};

AreasController.prototype.getArea = function(idArea, done) {
  // Esto solo es una prueba... Después se tiene que mandar
  self.abstractModel.select(self.table, [
    "id_area", "are_id_tipo_area", "are_nombre", "are_descripcion"
  ], { id_area : idArea }, done);
};

AreasController.prototype.create = function(jsonArea, done) {
  self.abstractModel.insert(self.table, jsonArea, done);
};

AreasController.prototype.update = function(jsonArea, idArea, done) {
  self.abstractModel.update(self.table, jsonArea, { id_area : idArea }, done);
};

AreasController.prototype.delete = function(idArea, done) {
  self.abstractModel.delete(self.table, { id_area : idArea }, done);
};

module.exports = new AreasController();
