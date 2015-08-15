var express = require("express");
var router = express.Router();
var controller = require("../database/controllers/PermisosController");

router.get("/", function(req, res) {
  res.render("permisos", { title : "SIACC"});
});

router.get("/getPermisos", function(req, res) {
  controller.getAllPermisos(function(err, permisos){
    res.send(permisos);
  });
});

router.get("/getPermisosUserLog", function(req, res) {
  if(!req.session.user) {
    res.send("No hay un usuario logueado");
  } else {
    userIdSess = req.session.user[0];
    controller.getPermisosTipoUsuario(req.session.user[0].usu_id_tipo_usuario, function(err, permisosTUsu) {
      controller.getPermisosTipoArea(req.session.user[0].usu_id_area, function(err, permisosTAre) {
        res.send({
          permisosTipoUsuario : controller.getJsonPermisos(permisosTUsu),
          permisosTipoArea : controller.getJsonPermisos(permisosTAre)
        });
      });
    });
  }
});

module.exports = router;
