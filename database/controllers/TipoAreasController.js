var self;
var TiposAreasController = function(){
  self = this;
  self.table = "tipo_area";
  self.abstractModel = require("../models/abstract/AbstractModel");
  self.connection = require("../connection/mysql_connection");
};

TiposAreasController.prototype.getTiposArea = function(callback) {
  self.abstractModel.select(self.table,[
    "id_tipo_area", "tipo_nombre", "tipo_descripcion", "tipo_imagen"
    ], {}, callback);
};

/**
* Este método regresa un arreglo de json's de todas las tipos_areas... {tipo_area:[modulos_que_controla]}
*/
TiposAreasController.prototype.getModulosControladosPorAreas = function(callback) {
  // TODO ELIMINAR ESTO SI NO SE PONDRÁN MODULOS POR ÁREAS!!
  query = "SELECT id_tipo_area,tipo_nombre, moa_id_modulo, mod_nombre FROM (tipo_area "
        + "INNER JOIN modulo_en_area ON moa_id_tipo_area=id_tipo_area)"
        + "LEFT JOIN modulo ON id_modulo=moa_id_modulo WHERE moa_area_controla_mod=true ORDER BY id_tipo_area";
  self.connection.query(query, function(err, tipos_areas) {
    var json = [];
    for(tipo in tipos_areas) {
      if(!json[tipos_areas[tipo].id_tipo_area]){
        json[tipos_areas[tipo].id_tipo_area] = [];
      }
      json[tipos_areas[tipo].id_tipo_area].push(tipos_areas[tipo]);
    }
    callback(json)
  });
};

TiposAreasController.prototype.create = function(jsonData, callback) {
    self.abstractModel.insert(self.table, jsonData, callback);
};

module.exports = new TiposAreasController();
