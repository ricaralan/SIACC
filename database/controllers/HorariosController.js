var self;
var HorariosController = function(){
  self = this;
  self.table = "horario_area";
  self.abstractModel = require("../models/abstract/AbstractModel");
  self.connection = require("../connection/mysql_connection");
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

HorariosController.prototype.create = function(jsonHorario, callback) {
  self.abstractModel.insert(self.table, jsonHorario, callback);
};

HorariosController.prototype.update = function(jsonDataUsuario, idUsuario, callback) {
  self.abstractModel.update(self.table, jsonDataUsuario, { id_usuario : idUsuario }, callback);
};

HorariosController.prototype.delete = function(idUsuario, callback) {
  self.abstractModel.delete(self.table, { id_usuario : idUsuario }, callback);
};

module.exports = new HorariosController();
