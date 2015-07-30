var MateriasController = function() {
  self = this;
  self.table = "materia";
  self.abstractModel = require("../models/abstract/AbstractModel");
  self.connection = require("../connection/mysql_connection");
};
var self;

MateriasController.prototype.getMateria = function(idMateria, callback) {
  self.abstractModel.select(self.table, ["id_materia", "mat_nombre", "mat_descripcion"], {id_materia : idMateria}, callback);
};

MateriasController.prototype.getMateriasLimit = function(inicio, numRows, callback) {
  query = "SELECT COUNT(id_materia) countMaterias FROM materia";
  self.connection.query(query, function(err, countMaterias) {
    if(!err) {
      query = "select id_materia, mat_nombre, mat_descripcion from materia limit "+inicio+", "+numRows+";";
      self.connection.query(query, function(err, materiasLimit) {
        callback(err, {
          countMaterias : countMaterias[0].countMaterias,
          materias : materiasLimit
        });
      });
    }
  });
};

MateriasController.prototype.getMateriasLimitByText = function(text, inicio, numRows, callback) {
  query = "SELECT COUNT(id_materia) countMaterias FROM materia";
  where = " WHERE id_materia LIKE '%"+text+"%' OR mat_nombre LIKE '%"+text+"%' OR mat_descripcion LIKE '%"+text+"%' ";
  self.connection.query(query+where, function(err, countMaterias) {
    if(!err) {
      query = "select id_materia, mat_nombre, mat_descripcion from materia "+where+" limit "+inicio+", "+numRows+";";
      self.connection.query(query, function(err, materiasLimit) {
        callback(err, {
          countMaterias : countMaterias[0].countMaterias,
          materias : materiasLimit
        });
      });
    }
  });
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
