var express = require("express");
var router = express.Router();
var controller = require("../database/controllers/PermisosController");

router.get("/getPermisos", function(req, res) {
  controller.getAllPermisos(function(err, permisos){
    res.send(permisos);
  });
});

module.exports = router;
