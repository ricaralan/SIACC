var express = require("express"),
    router  = express.Router(),
    controller = require("./../database/controllers/ReportsController");


router.get('/acceso_area', function(req, res) {
  res.render('reports/accesos', { title: 'Reportes accesos - SIACC' });
});

router.get("/mesa_ayuda", function(req, res) {
  res.render("reports/mesa_ayuda", { title:"Reportes mesa de ayuda - SIACC" });
});

router.get("/get/acceso_area/:idArea/:tipoAcceso/:f1/:f2", function(req, res) {
  idArea = req.params.idArea;
  tipoAcceso = req.params.tipoAcceso;
  fechaInicio = req.params.f1;
  fechaFin = req.params.f2;
  if(tipoAcceso == 1 || tipoAcceso == 2) {
    controller.getDataAccesoArea(idArea, tipoAcceso, fechaInicio, fechaFin, function(err, data) {
      if(!err) {
        res.send(data);
      }
    });
  } else {
  }
});

module.exports = router;
