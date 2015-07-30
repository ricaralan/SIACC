var MateriasController = function() {
  self = this;
  self.table = "materia";
  self.abstractModel = require("../models/abstract/AbstractModel");
};
var self;

MateriasController.prototype.getMaterias = function(callback) {
  self.abstractModel.select(self.table,[
    "id_materia", "mat_nombre", "mat_descripcion"
  ], {}, callback);
};

MateriasController.prototype.create = function(jsonMateria, callback) {
  self.abstractModel.insert(self.table, jsonMateria, callback);
};

MateriasController.prototype.update = function(jsonMateria, idMateria, callback) {
  self.abstractModel.update(self.table, jsonMateria, { id_materia : idMateria }, callback);
};

MateriasController.prototype.delete = function(idMateria, callback) {
  self.abstractModel.delete(self.table, { id_materia : idMateria }, callback);
};


module.exports = new MateriasController();
