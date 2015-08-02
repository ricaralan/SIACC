var self;
var HorariosController = function(){
  self = this;
  self.table = "horario_area";
  self.abstractModel = require("../models/abstract/AbstractModel");
  self.connection = require("../connection/mysql_connection");
};

HorariosController.prototype.getHorario = function(opc, id, fechaInicio, fechaFin, callback) {
  extra = opc == 1 ? "hua_id_area" : "hua_id_usuario";
  query = "SELECT hua_id,id_area,id_usuario,are_nombre,usu_nombre,usu_primer_apellido,"
          + "usu_segundo_apellido,hua_id_materia,hua_dia,hua_hora,hua_fecha_inicio,"
          + "hua_fecha_fin FROM (usuario INNER JOIN horario_area ON "
          + "id_usuario=hua_id_usuario) INNER JOIN area ON usu_id_area=id_area AND " + extra + "='" + id + "' AND hua_id_materia is null "
          + "WHERE (hua_fecha_inicio BETWEEN '" + fechaInicio + "' AND '" + fechaFin + "' "
          + "OR hua_fecha_fin BETWEEN '" + fechaInicio + "' AND '" + fechaFin + "') "
          + "OR (('" + fechaInicio + "'>=hua_fecha_inicio AND "
          + "'" + fechaInicio + "'<=hua_fecha_fin) OR ('" + fechaFin + "'>=hua_fecha_inicio AND "
          + "'" + fechaFin + "'<=hua_fecha_fin))";
  self.connection.query(query, callback);
};

HorariosController.prototype.getHorarioClasesArea = function(idArea, fechaInicio, fechaFin, callback) {
  query = "SELECT hua_id,id_area,id_usuario,are_nombre,usu_nombre,usu_primer_apellido,"
          + "usu_segundo_apellido,hua_id_materia,hua_dia,hua_hora,hua_fecha_inicio,"
          + "hua_fecha_fin FROM (usuario INNER JOIN horario_area ON "
          + "id_usuario=hua_id_usuario) INNER JOIN area ON usu_id_area=id_area AND hua_id_area='" + idArea + "' AND hua_id_materia is not null "
          + "WHERE (hua_fecha_inicio BETWEEN '" + fechaInicio + "' AND '" + fechaFin + "' "
          + "OR hua_fecha_fin BETWEEN '" + fechaInicio + "' AND '" + fechaFin + "') "
          + "OR (('" + fechaInicio + "'>=hua_fecha_inicio AND "
          + "'" + fechaInicio + "'<=hua_fecha_fin) OR ('" + fechaFin + "'>=hua_fecha_inicio AND "
          + "'" + fechaFin + "'<=hua_fecha_fin))";
  self.connection.query(query, callback);
};

/**
* Horario de un usuario en una área... Sin asignación de una materia
* Ejemplo: json = {
*   hua_id_usuario : "", hua_id_area : 0, hua_fecha_inicio:"", hua_fecha_fin:"",
*   diasHoras : [{hua_dia : 1, hua_hora : 3}]
* }
**/
HorariosController.prototype.createHorarioByJson = function(json, callback) {
  for(var i = 0; i < json.diasHoras.length; i++) {
    jsonData = {
      hua_id_usuario : json.hua_id_usuario,
      hua_id_area : json.hua_id_area,
      hua_id_materia : json.hua_id_materia,
      hua_fecha_inicio : json.hua_fecha_inicio,
      hua_fecha_fin : json.hua_fecha_fin,
      hua_dia : json.diasHoras[i].hua_dia,
      hua_hora : json.diasHoras[i].hua_hora
    };
    self.create(jsonData, function(err, data) {});
    if(i == json.diasHoras.length - 1) {
      callback({success:true});
    }
  }
};

HorariosController.prototype.getDetalle = function(idHorario, callback) {
  query = "SELECT hua_id,id_area,id_usuario,are_nombre,usu_nombre,usu_primer_apellido,"
          + "usu_segundo_apellido,id_materia,mat_nombre,hua_dia,hua_hora,hua_fecha_inicio,"
          + "hua_fecha_fin FROM ((horario_area INNER JOIN usuario ON id_usuario=hua_id_usuario "
          + "AND hua_id=" + idHorario + ") INNER JOIN area ON id_area=hua_id_area) LEFT JOIN materia "
          + "ON id_materia=hua_id_materia";
  self.connection.query(query, callback);
};

HorariosController.prototype.create = function(jsonHorario, callback) {
  self.abstractModel.insert(self.table, jsonHorario, callback);
};

HorariosController.prototype.delete = function(idHorario, callback) {
  self.abstractModel.delete(self.table, { hua_id : idHorario }, callback);
};

module.exports = new HorariosController();
