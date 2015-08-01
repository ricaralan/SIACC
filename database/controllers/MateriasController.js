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

MateriasController.prototype.getMateriasUsuarioLimit = function(idUsuario, inicio, numRows, callback) {
  query = "SELECT COUNT(uma_id_usuario) countMaterias ";
  from  = "FROM materia INNER JOIN usuario_materia ON id_materia = uma_id_materia AND uma_id_usuario='" + idUsuario + "' ";
  self.connection.query(query + from, function(err, countMaterias) {
    if(!err) {
      query = "SELECT id_materia, mat_nombre, mat_descripcion, uma_fecha_inicio, uma_fecha_fin, uma_id_usuario id_usuario ";
      limit = "LIMIT " + inicio + "," + numRows;
      self.connection.query(query + from + limit, function(err, materiasLimit) {
        if(!err) {
          callback(err, {
            countMaterias : countMaterias[0].countMaterias,
            materias : materiasLimit
          });
        }
      });
    }
  });
};

MateriasController.prototype.getMateriasLimitByText = function(text, inicio, numRows, callback) {
  query = "SELECT COUNT(id_materia) countMaterias FROM materia";
  where = " WHERE id_materia LIKE '%"+text+"%' OR mat_nombre LIKE '%"+text+"%' OR mat_descripcion LIKE '%"+text+"%' ";
  self.connection.query(query+where, function(err, countMaterias) {
    if(!err) {
      query = "SELECT id_materia, mat_nombre, mat_descripcion FROM materia "+where+" LIMIT "+inicio+", "+numRows+";";
      self.connection.query(query, function(err, materiasLimit) {
        callback(err, {
          countMaterias : countMaterias[0].countMaterias,
          materias : materiasLimit
        });
      });
    }
  });
};

MateriasController.prototype.getMateriasUsuarioLimitByText = function(text,idUsuario,inicio,numRows,callback) {
  query = "SELECT id_materia, mat_nombre, mat_descripcion, uma_fecha_inicio, uma_fecha_fin, uma_id_usuario id_usuario "
        + "FROM materia LEFT JOIN usuario_materia on uma_id_materia=id_materia and uma_id_usuario='"+idUsuario+"' "
        + "WHERE id_materia LIKE '%"+text+"%' OR mat_nombre LIKE '%"+text+"%' LIMIT "+inicio+", "+numRows+";";
  self.connection.query(query, callback);
};

MateriasController.prototype.asignarMateriaUsuario = function(idUsuario, idMateria, callback) {
  self.abstractModel.insert("usuario_materia",{uma_id_usuario:idUsuario,uma_id_materia:idMateria}, callback);
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

MateriasController.prototype.deleteAsignacionUsuario = function(idUsuario, idMateria, callback) {
  self.abstractModel.delete("usuario_materia", {uma_id_usuario : idUsuario, uma_id_materia : idMateria}, callback);
};


module.exports = new MateriasController();
