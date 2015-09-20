var self;
var UsuariosController = function(){
  self = this;
  self.table = "usuario";
  self.abstractModel = require("../models/abstract/AbstractModel");
  self.connection = require("../connection/mysql_connection");
};

UsuariosController.prototype.existUsername = function(id_usuario, username, done) {
  query = "SELECT id_usuario FROM usuario WHERE id_usuario!='"+id_usuario+"' AND "
        + "usu_usuario='"+username+"'";
  self.connection.query(query, done);
};

UsuariosController.prototype.getDataUsuario = function(idUsuario, done) {
  var query = "SELECT id_usuario,usu_id_tipo_usuario,usu_nombre,usu_primer_apellido,usu_segundo_apellido,usu_foto,"
              +"usu_id_carrera,usu_id_area,car_nombre,are_nombre,usu_email,usu_sexo,usu_usuario,usu_contrasena from "
              +"(usuario LEFT JOIN carrera ON id_carrera=usu_id_carrera)"
              +"LEFT JOIN area on id_area=usu_id_area  where id_usuario='"+idUsuario+"'";
  self.connection.query(query, done);
};

/**
* Por el momento los permisos del usuario son los que se asignan a los tipos de usuario...
*/
UsuariosController.prototype.getPermisosUsuario = function(idUsuario, done) {
  query = "SELECT id_permiso_asignado,moa_ver,moa_editar,moa_crear,moa_eliminar,moa_id_permiso permiso FROM permiso LEFT JOIN "
          + "permiso_asignado ON id_permiso=moa_id_permiso AND moa_id_tipo_usuario=" + idUsuario;
  self.connection.query(query, done);
};

UsuariosController.prototype.getUsuariosTipoLimit = function(idTipoUsuario, inicio, rows, done) {
  // TODO DIVIDIR POR TIPOS DE USUARIO O VER COMO PAGINAR Ó AUTOMATIZAR...
  var query = "select id_usuario, usu_nombre, usu_primer_apellido, usu_segundo_apellido, usu_id_tipo_usuario, usu_foto from usuario "
            + "WHERE usu_id_tipo_usuario="+idTipoUsuario+" limit "+inicio+","+rows+";";
  self.connection.query(query, done);
};

UsuariosController.prototype.getUsuariosByTextLimit = function(text, inicio, rows, done) {
  var query = "select id_usuario, usu_nombre, usu_primer_apellido, usu_segundo_apellido, usu_id_tipo_usuario, usu_foto from usuario "
            + "WHERE id_usuario like '%"+text+"%' OR CONCAT_WS(' ',usu_nombre,"
            + "usu_primer_apellido,usu_segundo_apellido) like '%"+text+"%' "
            +" limit "+inicio+","+rows+";";
  self.connection.query(query, done);
};

UsuariosController.prototype.getUsuariosAtencionMesaAyudaByText = function(word, idMesaAyuda, idArea, done) {
  query = "SELECT uam_id_area_atiende_mesa,aam_id_mesa_ayuda,uam_id_area_atiende_mesa,"
        + "id_usuario,usu_nombre,usu_primer_apellido,usu_segundo_apellido FROM "
        + "((area_atiende_mesa INNER JOIN mesa_ayuda ON id_mesa_ayuda=aam_id_mesa_ayuda AND id_mesa_ayuda='"+idMesaAyuda+"')LEFT JOIN usuario ON usu_id_area)LEFT JOIN usuario_atiende_mesa ON uam_id_area_atiende_mesa=id_area_atiende_mesa AND id_usuario=uam_id_usuario"
        + " WHERE usu_id_area="+idArea+" AND"
        + "(id_usuario LIKE '%" + word + "%' OR CONCAT_WS(' ',usu_nombre,"
        + "usu_primer_apellido,usu_segundo_apellido) like '%"+word+"%') limit 0,10;";
  self.connection.query(query, done);
}

UsuariosController.prototype.getUsuariosAtiendenMesa = function(idMesaAyuda, done) {
  query = "SELECT uam_id_area_atiende_mesa,aam_id_mesa_ayuda,uam_id_area_atiende_mesa,"
        + "id_usuario,usu_nombre,usu_primer_apellido,usu_segundo_apellido FROM "
        + "(((usuario INNER JOIN permiso_asignado ON usu_id_tipo_usuario=moa_id_tipo_usuario"
        + " AND moa_id_permiso='mesa_ayuda_atencion' AND moa_ver))LEFT JOIN usuario_atiende_mesa "
        + "ON id_usuario=uam_id_usuario)LEFT JOIN area_atiende_mesa ON uam_id_area_atiende_mesa="
        + "id_area_atiende_mesa AND aam_id_mesa_ayuda='"+idMesaAyuda+"' WHERE aam_id_mesa_ayuda IS NOT NULL";
  self.connection.query(query, done);
};

UsuariosController.prototype.findUsuariosTipoLimit = function(word, idTipoUsuario, done) {
  // TODO DIVIDIR POR TIPOS DE USUARIO O VER COMO PAGINAR Ó AUTOMATIZAR...
  var query = "select id_usuario, usu_nombre, usu_primer_apellido, usu_segundo_apellido,"
            + "usu_id_tipo_usuario, usu_foto from usuario WHERE usu_id_tipo_usuario="
            + idTipoUsuario + " AND (id_usuario LIKE '%" + word + "%' OR usu_nombre LIKE '%"
            + word + "%' OR usu_primer_apellido LIKE '%" + word + "%' OR "
            + "usu_segundo_apellido LIKE '%"+word+"%') limit 0,10;";
  self.connection.query(query, done);
};

UsuariosController.prototype.countUsuariosTipo = function(idTipoUsuario, done) {
  var query = "select count(id_usuario) totalUsers from usuario where usu_id_tipo_usuario="+idTipoUsuario;
  self.connection.query(query, done);
};

UsuariosController.prototype.create = function(jsonDataUsuario, done) {
  self.abstractModel.insert(self.table, jsonDataUsuario, done);
};

UsuariosController.prototype.update = function(jsonDataUsuario, idUsuario, done) {
  self.abstractModel.update(self.table, jsonDataUsuario, { id_usuario : idUsuario }, done);
};

UsuariosController.prototype.delete = function(idUsuario, done) {
  self.abstractModel.delete(self.table, { id_usuario : idUsuario }, done);
};

module.exports = new UsuariosController();
