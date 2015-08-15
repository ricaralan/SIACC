var express = require("express");
var router = express.Router();
var controllerTipoUsuario = require("../database/controllers/TiposUsuariosController");

router.get("/", function(req, res) {
  res.render('tipos_usuarios', { title: 'SIACC'});
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
  controllerTipoUsuario.create(jsonTipoUsuario, jsonPermisos, function(data) {
    res.send(data);
  });
});

router.put("/update", function(req, res) {
  var jsonTipoUsuario = req.body.jsonTipoUsuario;
  var jsonPermisos = req.body.jsonPermisos;
  controllerTipoUsuario.update(jsonTipoUsuario, jsonPermisos, function(err, data) {
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
