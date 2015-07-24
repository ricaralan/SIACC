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

UsuariosController.prototype.update = function(jsonDataUsuario, idUsuario, callback) {
  self.abstractModel.update(self.table, jsonDataUsuario, { id_usuario : idUsuario }, callback);
};

UsuariosController.prototype.delete = function(idUsuario, callback) {
  self.abstractModel.delete(self.table, { id_usuario : idUsuario }, callback);
};

module.exports = new UsuariosController();
