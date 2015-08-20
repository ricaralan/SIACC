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

router.post("/solicitar_servicio", function(req, res) {
  controller.create(req.body.jsonData, function(err, data) {
    res.send({success : !err && data.affectedRows == 1});
  });
});

module.exports = router;
