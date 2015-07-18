var express = require("express");
var router = express.Router();
var controller = require("../database/controllers/TipoAreasController");
var fs = require('fs');

router.get("/getTiposArea", function(req, res) {
  controller.getTiposArea(function(err, tipos_area) {
    if(!err) {
      res.send(tipos_area);
    }
  })
});
/*
router.get("/getModulosControladosPorAreas", function(req, res) {
  controller.getModulosControladosPorAreas(function(modulos) {
    res.send(modulos);
  });
});
*/
router.post("/create/", function(req, res) {
  tipo_nombre = req.params.tipo_nombre;
  tipo_descripcion = req.params.tipo_descripcion;
  var file = req.files.tipo_foto,
      name = file.name,
      tipo = file.mimetype,
      targetPath = "public/images/system/tipos_areas/" + name;
      console.log("inicio");
  fs.stat(file.path, function(err) {
      if(tipo == "image/png" || tipo == "image/jpg" || tipo == "image/jpeg") {
        fs.renameSync(file.path, targetPath, function(err) {
          if(!err) {
            console.log("rename exitoso!");
          } else {
            console.log(err);
          }
        });
      }
  });
  res.send("Exito de envio!!");
  /*controller.create(jsonData, function(err, modules){
    res.send(modules);
  });*/
});

router.post("/subirFoto", function(req, res) {
  console.log(req.files);
  console.log(req.body);
  res.send("");
});

module.exports = router;
