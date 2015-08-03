var AreasController = function() {
  self = this;
  self.table = "area";
  self.abstractModel = require("../models/abstract/AbstractModel");
};
var self;

AreasController.prototype.getAreas = function(callback) {
  // Esto solo es una prueba... Después se tiene que mandar
  self.abstractModel.select(self.table, [
    "id_area", "are_id_tipo_area", "are_nombre", "are_descripcion"
  ], {/* WHERE */}, callback);
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
