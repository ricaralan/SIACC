var express = require("express");
var router = express.Router();
var controller = require("../database/controllers/MesaAyudaController");

router.get("/solicitante", function(req, res) {
  if(req.session.user != null) {
    res.render("mesa_ayuda_solicitante", {title : "SIACC"});
  }
});

router.get("/administrador", function(req, res) {
  if(req.session.user != null) {
    res.render("mesa_ayuda_administrador", {title : "SIACC"});
  }
});

router.get("/getServiciosSinSolucionar", function(req, res) {
  controller.getServiciosSinSolucionar(function(err, servicios) {
    if(!err) {
      res.send(servicios);
    } else {
      // TODO especificar el tipo de error
    }
  });
});

router.post("/solicitar_servicio", function(req, res) {
  controller.create(req.body.jsonData, function(err, data) {
    res.send({success : !err && data.affectedRows == 1});
  });
});

router.post("/cambiar_area_atencion", function(req, res) {
  controller.cambiarAreaAtencion({
    aam_id_mesa_ayuda : req.body.aam_id_mesa_ayuda,
    aam_id_area : req.body.aam_id_area
  }, function(err, data) {
    res.send({success : !err && data.affectedRows == 1});
  });
});

router.put("/update", function(req, res) {
  controller.update(req.body.data, req.body.data.id_mesa_ayuda, function(err, data) {
    res.send({success : !err && data.affectedRows == 1});
  });
});

module.exports = router;
