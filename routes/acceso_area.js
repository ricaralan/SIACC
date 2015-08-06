var express = require("express");
var router  = express.Router();
var controller = require("../database/controllers/AccesoAreaController");

router.get("/getTipoAccesosActualesArea/:tipoAcceso/:idArea", function(req, res) {
  tipoAcceso = req.params.tipoAcceso;
  if(tipoAcceso == 1) {
    controller.getAccesosSimplesActualesArea(req.params.idArea, function(err, accesos) {
      res.send(accesos);
    });
  } else if(tipoAcceso == 2) {
    controller.getAccesosInventarioActualesArea(req.params.idArea, function(err, accesos) {
      res.send(accesos);
    });
  } else {
    res.send({ERROR : "EL TIPO DE ACCESO NO EXISTE!"});
  }
});

router.post("/registrarAcceso", function(req, res) {
  controller.create(req.body.jsonData, function(err, data) {
    console.log(err, data);
    res.send( { success : !err && data.affectedRows == 1 } );
  });
});

router.put("/registrarSalida", function(req, res) {
  if(req.body.id_acceso && req.body.acc_hora_fin) {
    controller.update({acc_hora_fin : req.body.acc_hora_fin}, req.body.id_acceso,
      function(err, data) {
      res.send( { success : !err && data.affectedRows == 1 } );
    });
  }
});

module.exports = router;
