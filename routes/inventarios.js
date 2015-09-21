var express = require('express');
var router = express.Router();
var controller = require("../database/controllers/InventariosController");
var resguardoController = require("../database/controllers/ResguardoInventarioController");
var permisoController = require("../database/controllers/PermisosController");

router.get("/", function(req, res) {
  if(req.user) {
    permisoController.getPermisoTipoUsuario(req.user.usu_id_tipo_usuario,
      "inventarios", function(err, permiso) {
        if(!err && permiso && permiso[0].moa_ver==1) {
          res.render("inventarios", {title : "SIACC"});
        } else {
          console.log(err);
          res.render("sin_permiso_vista", {title:"No tienes permisos para ver esto - SIACC"});
        }
    });
  } else {
    res.render("login", {title:"login"});
  }
});

/**
* Esta ruta devuelve los inventarios que hay en un área por el tipo de inventario
*/
router.get('/getInventarioTipoArea/:idArea/:idTipoInventario', function(req, res) {
  controller.getInventarioTipoArea(req.params.idArea, req.params.idTipoInventario, function(err, inventarios) {
    res.send(inventarios);
  });
});

router.get('/getInventarioArea/:idArea/', function(req, res) {
  controller.getInventarioArea(req.params.idArea, function(err, inventarios) {
    res.send(inventarios);
  });
});

router.get("/u/getInventarioArea", function(req, res) {
  controller.getInventarioArea(req.user.usu_id_area, function(err, inventarios) {
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
  if(req.body.jsonInventario && req.body.jsonInventario.num_inventario) {
    controller.getInventario(req.body.jsonInventario.num_inventario, function(err, inventario) {
      console.log(err, inventario);
      controller.create(req.body.jsonInventario, function(err, data) {
        res.send( { success : !err && data.affectedRows == 1 , existInv : inventario.length>0} );
      });
    });
  } else {
    res.send({success:false});
  }
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
