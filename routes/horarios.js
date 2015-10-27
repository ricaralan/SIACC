var express = require("express"),
    router = express.Router(),
    controller = require("../database/controllers/HorariosController");

router.get("/mi/area", function(req, res) {
  if(!req.user) {
    res.render("login", { title : "login" });
  } else {
    res.render("horario_area", { title : "horarios" });
  }
});

router.get("/getHorarioUsuario/:idUsuario/:fechaInicio/:fechaFin", function(req, res) {
  idUsuario = req.params.idUsuario;
  fechaInicio = req.params.fechaInicio;
  fechaFin = req.params.fechaFin;
  controller.getHorario(2, idUsuario, fechaInicio, fechaFin, function(err, data) {
    res.send(data);
  });
});

router.get("/getHorarioArea/:idArea/:fechaInicio/:fechaFin", function(req, res) {
  idArea = req.params.idArea;
  fechaInicio = req.params.fechaInicio;
  fechaFin = req.params.fechaFin;
  controller.getHorario(1, idArea, fechaInicio, fechaFin, function(err, data) {
    res.send(data);
  });
});

router.get("/getHorarioClasesArea/:idArea/:fechaInicio/:fechaFin", function(req, res) {
  idArea = req.params.idArea;
  fechaInicio = req.params.fechaInicio;
  fechaFin = req.params.fechaFin;
  controller.getHorarioClasesArea(idArea, fechaInicio, fechaFin, function(err, horarios) {
    res.send(horarios);
  });
});

router.get("/getUsuariosPermisoMaterias", function(req, res) {
  controller.getUsuariosPermisoMaterias(function(err, dataUsuarios) {
    res.send(dataUsuarios);
  });
});

router.get("/getDetalle/:idHorario", function(req, res) {
  controller.getDetalle(req.params.idHorario, function(err, detalle) {
    res.send(detalle[0]);
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
