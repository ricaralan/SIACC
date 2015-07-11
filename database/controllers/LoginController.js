var LoginController = function() {
  self = this;
  self.table = "usuario";
  self.abstractModel = require("../models/abstract/AbstractModel");
};
var self;

LoginController.prototype.verificarUsuario = function(usuario, contrasena, callback) {
  // Esto solo es una prueba... Después se tiene que mandar
  self.abstractModel.select(self.table,[
    "id_usuario", "usu_usuario", "usu_contrasena"
  ], {
    usu_usuario : usuario,
    usu_contrasena : contrasena
  }, callback);
};

module.exports = new LoginController();
