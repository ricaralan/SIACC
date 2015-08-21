var MesaAyudaController = function() {
  self = this;
  self.table = "mesa_ayuda";
  self.abstractModel = require("../models/abstract/AbstractModel");
  self.connection = require("../connection/mysql_connection");
};

var self;

MesaAyudaController.prototype.getServiciosSinSolucionar = function(callback) {
  query = "SELECT id_mesa_ayuda,mes_id_area,aam_id_area,usu_nombre,usu_foto,are_nombre,mes_fecha_solicitado FROM ((mesa_ayuda LEFT JOIN "
        + "area_atiende_mesa ON aam_id_mesa_ayuda=id_mesa_ayuda AND aam_asignacion)"
        + "LEFT JOIN usuario ON mes_id_usuario=id_usuario)LEFT JOIN area ON id_area=mes_id_area;";
  self.connection.query(query, callback);
};

MesaAyudaController.prototype.cambiarAreaAtencion = function(json, callback) {
  self.abstractModel.select("area_atiende_mesa", ["aam_id_area"], {
    aam_id_mesa_ayuda : json.aam_id_mesa_ayuda
  }, function(err, data) {
    if(!err) {
      if(data.length > 0) {
        if(json.aam_id_area != 0){
          self.abstractModel.update("area_atiende_mesa", {
            aam_id_area : json.aam_id_area
          }, {
            aam_id_mesa_ayuda : json.aam_id_mesa_ayuda
          }, callback);
        } else {
          self.abstractModel.delete("area_atiende_mesa", {
            aam_id_mesa_ayuda : json.aam_id_mesa_ayuda
          }, callback);
        }
      } else {
        self.abstractModel.insert("area_atiende_mesa", json, callback);
      }
    }
  });
};

MesaAyudaController.prototype.create = function(jsonData, callback) {
  self.abstractModel.insert(self.table, jsonData, callback);
};

MesaAyudaController.prototype.delete = function(numInventario, callback) {
  self.abstractModel.delete(self.table, { num_inventario : numInventario }, callback);
};


module.exports = new MesaAyudaController();
