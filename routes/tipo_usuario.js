var express = require("express");
var router = express.Router();
var controllerTipoUsuario = require("../database/controllers/TiposUsuariosController");

router.get("/getTiposUsuario", function(req, res) {
  controllerTipoUsuario.getTiposUsuario(function(err, tiposUsuario) {
    res.send(tiposUsuario);
  });
});

router.get("/getPermisosPorModuloTipoUsuario/:idTipoUsuario", function(req, res) {
  controllerTipoUsuario.getPermisosPorModuloTipoUsuario(req.params.idTipoUsuario, function(err, permisos) {
    if(!err) {
      res.send(permisos);
    }
  });
});

router.post("/create/:jsonTipoUsuario/:jsonPermisosPorModulo/", function(req, res) {
  var jsonTipoUsuario = JSON.parse(req.params.jsonTipoUsuario);
  var jsonPermisosPorModulo = JSON.parse(req.params.jsonPermisosPorModulo);
  controllerTipoUsuario.create(jsonTipoUsuario, jsonPermisosPorModulo, function(data) {
    res.send(data);
  });
});

router.put("/update/:jsonTipoUsuario/:jsonPermisosPorModulo/", function(req, res) {
  var jsonTipoUsuario = JSON.parse(req.params.jsonTipoUsuario);
  var jsonPermisosPorModulo = JSON.parse(req.params.jsonPermisosPorModulo);
  controllerTipoUsuario.update(jsonTipoUsuario, jsonPermisosPorModulo, function(err, data) {
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
