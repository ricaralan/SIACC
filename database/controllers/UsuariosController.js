var self;
var UsuariosController = function(){
  self = this;
  self.table = "usuario";
  self.abstractModel = require("../models/abstract/AbstractModel");
  self.connection = require("../connection/mysql_connection");
};

UsuariosController.prototype.getUsuarios = function(callback) {
  // TODO DIVIDIR POR TIPOS DE USUARIO O VER COMO PAGINAR Ó AUTOMATIZAR...
};

UsuariosController.prototype.create = function(jsonDataUsuario, callback) {
  self.abstractModel.insert(self.table, jsonDataUsuario, callback);
};

UsuariosController.prototype.update = function(jsonDataTipoUsuario, jsonPermisosPorModulo, callback) {

};

UsuariosController.prototype.delete = function(id_tipo_usuario, callback) {

};

module.exports = new UsuariosController();
