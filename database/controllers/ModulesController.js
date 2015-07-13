var ModulesController = function() {
  self = this;
  self.table = "usuario";
  self.abstractModel = require("../models/abstract/AbstractModel");
  self.connection = require("../connection/mysql_connection");
};
var self;

ModulesController.prototype.getDataModules = function(callback) {
  // Esto solo es una prueba... Después se tiene que mandar
  query = "SELECT id_modulo, mod_nombre, table_name, table_name_id, table_name_field "+
          "FROM modulo_area INNER JOIN tabla_catalogo ON mod_table_id=table_id";
  self.connection.query(query, function(err, modules){
    self.getData(modules, function(data) {
      callback({},data);
    });
  });
};

ModulesController.prototype.getData = function(modules, callback) {
  var moduleX = [];
  for(var i = 0; i < modules.length; i++) {
    moduleX[i] = e(modules[i]);
    console.log(moduleX[i]);
  }
  callback(moduleX);
};

function e(module){
  self.abstractModel.select(module.table_name,
    [module.table_name_id, module.table_name_field],{}, function(err, data){
      return ({
        id_modulo : module.id_modulo,
        mod_nombre : module.mod_nombre,
        table_name : module.table_name,
        catalogos : data
      });
    });
}

module.exports = new ModulesController();
