var express = require("express");
var router = express.Router();
var controller = require("../database/controllers/CarrerasController");

router.get("/", function(req, res) {
  res.render('carreras', { title: 'SIACC'});
});

router.get("/getCarreras", function(req, res) {
  controller.getCarreras(function(err, carreras) {
    if(!err) {
      res.send(carreras);
    }
  });
});

router.post("/create/:jsonCarrera", function(req, res) {
  var jsonCarrera = JSON.parse(req.params.jsonCarrera);
  controller.create(jsonCarrera, function(err, data) {
    res.send( { success : (!err && data.affectedRows == 1) } );
  });
});

router.put("/update/:jsonCarrera/:idCarrera", function(req, res) {
  var jsonCarrera = JSON.parse(req.params.jsonCarrera);
  var idCarrera = req.params.idCarrera;
  controller.update(jsonCarrera, idCarrera, function(err, data) {
    console.log(err);
    console.log(data);
    res.send( { success : (!err && data.affectedRows == 1) } );
  });
});

router.delete("/delete/:idCarrera", function(req, res) {
  var idCarrera = req.params.idCarrera;
  controller.delete(idCarrera, function(err, data) {
    res.send( { success : (!err && data.affectedRows == 1) } );
  });
});

module.exports = router;
