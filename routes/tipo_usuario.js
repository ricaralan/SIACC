var express = require("express");
var router = express.Router();
var controllerTipoUsuario = require("../database/controllers/TiposUsuariosController");

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

router.post("/create/:jsonTipoUsuario/:jsonPermisos/", function(req, res) {
  var jsonTipoUsuario = JSON.parse(req.params.jsonTipoUsuario);
  var jsonPermisos = JSON.parse(req.params.jsonPermisos);
  controllerTipoUsuario.create(jsonTipoUsuario, jsonPermisos, function(data) {
    res.send(data);
  });
});

router.put("/update/:jsonTipoUsuario/:jsonPermisos/", function(req, res) {
  var jsonTipoUsuario = JSON.parse(req.params.jsonTipoUsuario);
  var jsonPermisos = JSON.parse(req.params.jsonPermisos);
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
