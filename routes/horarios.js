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

router.delete("/delete/:idHorario", function(req, res) {
  controller.delete(req.params.idHorario, function(err, data) {
    res.send({success : (!err && data.affectedRows == 1)});
  });
});


module.exports = router;
