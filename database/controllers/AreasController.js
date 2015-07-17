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

AreasController.prototype.create = function(jsonArea, callback) {
  self.abstractModel.insert(self.table, jsonArea, callback);
};

module.exports = new AreasController();
