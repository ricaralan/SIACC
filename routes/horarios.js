var express = require("express");
var router = express.Router();
var controller = require("../database/controllers/HorariosController");

router.get("/getHorario/:idUsuario/:fechaInicio/:fechaFin", function(req, res) {
  idUsuario = req.params.idUsuario;
  fechaInicio = req.params.fechaInicio;
  fechaFin = req.params.fechaFin;
  controller.getHorarioUsuario(idUsuario, fechaInicio, fechaFin, function(err, data) {
    res.send(data);
  });
});

router.post("/createHorario", function(req, res) {
  controller.createHorarioByJson(req.body.jsonHorario, function(data) {
    res.send(data);
  });
});


module.exports = router;
