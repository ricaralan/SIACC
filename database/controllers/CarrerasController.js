var CarrerasController = function() {
  self = this;
  self.table = "carrera";
  self.abstractModel = require("../models/abstract/AbstractModel");
};
var self;

CarrerasController.prototype.getCarreras = function(callback) {
  self.abstractModel.select(self.table,[
    "id_carrera", "car_nombre"
  ], {}, callback);
};

CarrerasController.prototype.create = function(jsonCarrera, callback) {
  self.abstractModel.insert(self.table, jsonCarrera, callback);
};

CarrerasController.prototype.update = function(jsonCarrera, idCarrera, callback) {
  self.abstractModel.update(self.table, jsonCarrera, { id_carrera : idCarrera }, callback);
};

CarrerasController.prototype.delete = function(idCarrera, callback) {
  self.abstractModel.delete(self.table, { id_carrera : idCarrera }, callback);
};


module.exports = new CarrerasController();
