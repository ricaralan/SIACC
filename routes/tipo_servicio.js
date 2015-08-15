var express = require("express");
var router = express.Router();
var controller = require("../database/controllers/TiposServiciosController");

router.get("/", function(req, res) {
  res.render('tipos_servicios', { title: 'SIACC'});
});

router.get("/getTiposServicios", function(req, res) {
  controller.getTiposServicios(function(err, carreras) {
    if(!err) {
      res.send(carreras);
    }
  });
});

router.post("/create/", function(req, res) {
  var jsonTipoServicio = req.body.jsonTipoServicio;
  controller.create(jsonTipoServicio, function(err, data) {
    res.send( { success : (!err && data.affectedRows == 1) } );
  });
});

router.put("/update/", function(req, res) {
  var jsonTipoServicio = req.body.jsonTipoServicio;
  var idTipoServicio = req.body.idTipoServicio;
  controller.update(jsonTipoServicio, idTipoServicio, function(err, data) {
    res.send( { success : (!err && data.affectedRows == 1) } );
  });
});

router.delete("/delete/:idTipoServicio", function(req, res) {
  var idTipoServicio = req.params.idTipoServicio;
  controller.delete(idTipoServicio, function(err, data) {
    res.send( { success : (!err && data.affectedRows == 1) } );
  });
});

module.exports = router;
