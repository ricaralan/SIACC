var self;
var TiposAreasController = function(){
  self = this;
  self.table = "tipo_area";
  self.abstractModel = require("../models/abstract/AbstractModel");
  self.connection = require("../connection/mysql_connection");
};

TiposAreasController.prototype.create = function(jsonData, callback) {
    self.abstractModel.insert(self.table, {
      tipo_nombre : jsonData.nombreTipoArea,
      tipo_descripcion : jsonData.descripcionTipoArea
    }, function(err, data){
      if(!err && data.affectedRows == 1){

        if(jsonData.modulos.length > 0) {
          // Registrar modulos
          for(modulo in jsonData.modulos) {
            console.log(jsonData.modulos[modulo].modulo);
            self.abstractModel.insert("modulo_en_area", {
              moa_id_modulo : jsonData.modulos[modulo].modulo,
              moa_id_tipo_area : data.insertId,
              moa_area_controla_mod : jsonData.modulos[modulo].control
            }, function(err, data) {
              console.log(err);
            });
          }
          callback({}, {inserted : true});
        }
      }
    });
};

module.exports = new TiposAreasController();
