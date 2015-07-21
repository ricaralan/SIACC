var express = require("express");
var router = express.Router();
var controllerTipoUsuario = require("../database/controllers/TiposUsuariosController");

router.post("/create/:jsonTipoUsuario/:jsonPermisosPorModulo/", function(req, res) {
  var jsonTipoUsuario = JSON.parse(req.params.jsonTipoUsuario);
  var jsonPermisosPorModulo = JSON.parse(req.params.jsonPermisosPorModulo);
  controllerTipoUsuario.create(jsonTipoUsuario, jsonPermisosPorModulo, function(data) {
    res.send(data);
  });
});

module.exports = router;
