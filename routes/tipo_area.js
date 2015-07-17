var express = require("express");
var router = express.Router();
var controller = require("../database/controllers/TipoAreasController");

router.get("/getTiposArea", function(req, res) {
  controller.getTiposArea(function(err, tipos_area) {
    if(!err) {
      res.send(tipos_area);
    }
  })
});

router.get("/getModulosControladosPorAreas", function(req, res) {
  controller.getModulosControladosPorAreas(function(modulos) {
    res.send(modulos);
  });
});

router.post("/create/:jsonData", function(req, res) {
  jsonData = JSON.parse(req.params.jsonData);
  controller.create(jsonData, function(err, modules){
    res.send(modules);
  });
});

module.exports = router;
