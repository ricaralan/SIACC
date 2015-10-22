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
  if(!req.user) {
    res.send("No hay un usuario logueado");
  } else {
    controller.getPermisosTipoUsuario(req.user.usu_id_tipo_usuario, function(err, permisosTUsu) {
      controller.getPermisosTipoArea(req.user.usu_id_area, function(err, permisosTAre) {
        permisos : controller.getJsonPermisos(permisosTUsu, permisosTAre, req.user.usu_id_tipo_usuario, function(permisos) {
          controller.setDataUser(permisos, req.user.usu_id_tipo_usuario, function(permisos) {
            res.send(permisos);
          });
        });
      });
    });
  }
});

module.exports = router;
