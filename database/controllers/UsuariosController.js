var self;
var UsuariosController = function(){
  self = this;
  self.table = "usuario";
  self.abstractModel = require("../models/abstract/AbstractModel");
  self.connection = require("../connection/mysql_connection");
};

UsuariosController.prototype.getUsuariosTipoLimit = function(idTipoUsuario, inicio, fin, callback) {
  // TODO DIVIDIR POR TIPOS DE USUARIO O VER COMO PAGINAR Ó AUTOMATIZAR...
  var query = "select id_usuario, usu_nombre, usu_primer_apellido, usu_segundo_apellido, usu_id_tipo_usuario, usu_foto from usuario "
            + "where usu_id_tipo_usuario="+idTipoUsuario+" limit "+inicio+","+fin+";";
  self.connection.query(query, callback);
};

UsuariosController.prototype.countUsuariosTipo = function(idTipoUsuario, callback) {
  var query = "select count(id_usuario) totalUsers from usuario where usu_id_tipo_usuario="+idTipoUsuario;
  self.connection.query(query, callback);
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
