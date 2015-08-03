var self;
var UsuariosController = function(){
  self = this;
  self.table = "usuario";
  self.abstractModel = require("../models/abstract/AbstractModel");
  self.connection = require("../connection/mysql_connection");
};

UsuariosController.prototype.getDataUsuario = function(idUsuario, callback) {
  var query = "SELECT id_usuario,usu_id_tipo_usuario,usu_nombre,usu_primer_apellido,usu_segundo_apellido,usu_foto,"
              +"usu_id_carrera,usu_id_area,car_nombre,are_nombre,usu_email,usu_sexo from "
              +"(usuario LEFT JOIN carrera ON id_carrera=usu_id_carrera)"
              +"LEFT JOIN area on id_area=usu_id_area  where id_usuario='"+idUsuario+"'";
  self.connection.query(query, callback);
};

/**
* Por el momento los permisos del usuario son los que se asignan a los tipos de usuario...
*/
UsuariosController.prototype.getPermisosUsuario = function(idUsuario, callback) {
  query = "SELECT id_permiso permiso, moa_area_controla_mod permitido FROM permiso LEFT JOIN "
          + "permiso_usuario ON id_permiso=moa_id_permiso AND moa_id_tipo_usuario=" + idUsuario;
  self.connection.query(query, callback);
};

UsuariosController.prototype.getUsuariosTipoLimit = function(idTipoUsuario, inicio, rows, callback) {
  // TODO DIVIDIR POR TIPOS DE USUARIO O VER COMO PAGINAR Ó AUTOMATIZAR...
  var query = "select id_usuario, usu_nombre, usu_primer_apellido, usu_segundo_apellido, usu_id_tipo_usuario, usu_foto from usuario "
            + "WHERE usu_id_tipo_usuario="+idTipoUsuario+" limit "+inicio+","+rows+";";
  self.connection.query(query, callback);
};

UsuariosController.prototype.getUsuariosByTextLimit = function(text, inicio, rows, callback) {
  var query = "select id_usuario, usu_nombre, usu_primer_apellido, usu_segundo_apellido, usu_id_tipo_usuario, usu_foto from usuario "
            + "WHERE id_usuario like '%"+text+"%' OR CONCAT_WS(' ',usu_nombre,"
            + "usu_primer_apellido,usu_segundo_apellido) like '%"+text+"%' "
            +" limit "+inicio+","+rows+";";
  self.connection.query(query, callback);
};

UsuariosController.prototype.findUsuariosTipoLimit = function(word, idTipoUsuario, callback) {
  // TODO DIVIDIR POR TIPOS DE USUARIO O VER COMO PAGINAR Ó AUTOMATIZAR...
  var query = "select id_usuario, usu_nombre, usu_primer_apellido, usu_segundo_apellido,"
            + "usu_id_tipo_usuario, usu_foto from usuario WHERE usu_id_tipo_usuario="
            + idTipoUsuario + " AND (id_usuario LIKE '%" + word + "%' OR usu_nombre LIKE '%"
            + word + "%' OR usu_primer_apellido LIKE '%" + word + "%' OR "
            + "usu_segundo_apellido LIKE '%"+word+"%') limit 0,10;";
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
