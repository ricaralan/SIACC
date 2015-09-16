var express = require("express");
var router = express.Router();
var controllerTipoUsuario = require("../database/controllers/TiposUsuariosController");
var permisoController = require("../database/controllers/PermisosController");

router.get("/", function(req, res) {
  if(req.user) {
    permisoController.getPermisoTipoUsuario(req.user.usu_id_tipo_usuario,
      "system_config", function(err, permiso) {
        if(!err && permiso && permiso[0].moa_ver==1) {
          res.render('tipos_usuarios', { title: 'SIACC'});
        } else {
          console.log(err);
          res.render("sin_permiso_vista", {title:"No tienes permisos para ver esto - SIACC"});
        }
    });
  } else {
    res.render("login", {title:"login"});
  }
});

router.get("/getTiposUsuario", function(req, res) {
  controllerTipoUsuario.getTiposUsuario(function(err, tiposUsuario) {
    res.send(tiposUsuario);
  });
});

router.get("/getPermisosTipoUsuario/:idTipoUsuario", function(req, res) {
  controllerTipoUsuario.getPermisosTipoUsuario(req.params.idTipoUsuario, function(err, permisos) {
    if(!err) {
      res.send(permisos);
    }
  });
});

router.post("/create", function(req, res) {
  var jsonTipoUsuario = req.body.jsonTipoUsuario;
  var jsonPermisos = req.body.jsonPermisos;
  var jsonPermisosSobreTipoUsuario = req.body.jsonPermisosSobreTipoUsuario;
  controllerTipoUsuario.create(jsonTipoUsuario, jsonPermisos, jsonPermisosSobreTipoUsuario,
    function(data) {
    res.send(data);
  });
});

router.put("/update", function(req, res) {
  var jsonTipoUsuario = req.body.jsonTipoUsuario;
  var jsonPermisos = req.body.jsonPermisos;
  var jsonPermisosSobreTipoUsuario = req.body.jsonPermisosSobreTipoUsuario;
  controllerTipoUsuario.update(jsonTipoUsuario, jsonPermisos, jsonPermisosSobreTipoUsuario,
    function(err, data) {
    res.send(data);
  });
});

router.delete("/delete/:idTipoUsuario", function(req, res) {
  controllerTipoUsuario.delete(req.params.idTipoUsuario, function(err, data) {
    if(!err) {
      res.send(data);
    } else {
      console.log(err);
      res.send(err);
    }
  });
});

module.exports = router;
