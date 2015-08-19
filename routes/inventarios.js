var express = require('express');
var router = express.Router();
var controller = require("../database/controllers/InventariosController");
var resguardoController = require("../database/controllers/ResguardoInventarioController");

router.get("/", function(req, res) {
  res.render("inventarios", {title : "SIACC"});
});

/**
* Esta ruta devuelve los inventarios que hay en un área por el tipo de inventario
*/
router.get('/getInventarioTipoArea/:idArea/:idTipoInventario', function(req, res) {
  controller.getInventarioTipoArea(req.params.idArea, req.params.idTipoInventario, function(err, inventarios) {
    res.send(inventarios);
  });
});

router.get("/getDataResguardo/:idResguardo", function(req, res) {
  resguardoController.getDataResguardo(req.params.idResguardo, function(err, data) {
    res.send(data[0]);
  });
});

router.put("/finalizarResguardo/:idResguardo", function(req, res) {
  resguardoController.finalizarResguardo(req.params.idResguardo, function(err, data) {
    res.send( { success : !err && data.affectedRows == 1 } );
  });
});

router.post("/createResguardo/:idInventario/:idUsuario", function(req, res) {
  resguardoController.create({
    rin_id_usuario : req.params.idUsuario,
    rin_num_inventario : req.params.idInventario
  }, function(err, data) {
    res.send({success : !err && data.affectedRows == 1});
  });
});

router.post("/create", function(req, res) {
  controller.create(req.body.jsonInventario, function(err, data) {
    res.send( { success : !err && data.affectedRows == 1 } );
  });
});

router.put("/update", function(req, res) {
  controller.update(req.body.jsonInventario, req.body.idInventario, function(err, data) {
    res.send( { success : !err && data.affectedRows == 1 } );
  });
});

router.delete("/delete/:idInventario", function(req, res) {
  controller.delete(req.params.idInventario, function(err, data) {
    res.send( { success : !err && data.affectedRows == 1 } );
  });
});

module.exports = router;
