var express = require("express");
var router = express.Router();
var areasController = require("../database/controllers/AreasController");
var permisoController = require("../database/controllers/PermisosController");

router.get("/", function(req, res) {
  if(req.user) {
    permisoController.getPermisoTipoUsuario(req.user.usu_id_tipo_usuario,
      "areas", function(err, permiso) {
        if(!err && permiso && permiso[0].moa_ver==1) {
          res.render('areas', { title: 'SIACC'});
        } else {
          console.log(err);
          res.render("sin_permiso_vista", {title:"No tienes permisos para ver esto - SIACC"});
        }
    });
  } else {
    res.render("login", {title:"login"});
  }
});

router.get("/getAreas", function(req, res) {
  areasController.getAreas(function(err, data) {
    res.send(data);
  });
});

router.get("/getAreasAdministradorasMesaAyuda", function(req, res) {
  areasController.getAreasAdministradorasMesaAyuda(function(err, data) {
    res.send(data);
  });
});

router.get("/getAreasConPermisoAccesos", function(req, res) {
  areasController.getAreasConPermisoAccesos(function(err, data) {
    res.send(data);
  });
});

router.get("/getArea/:idArea", function(req, res) {
  areasController.getArea(req.params.idArea, function(err, data) {
    res.send(data[0]);
  });
});

router.post("/create/:jsonArea", function(req, res) {
  areasController.create(JSON.parse(req.params.jsonArea), function(err, data) {
    res.send({success : (!err && data.affectedRows == 1)});
  });
});

router.put("/update/:jsonArea/:idArea", function(req, res) {
  areasController.update(JSON.parse(req.params.jsonArea), req.params.idArea,
    function(err, data) {
    res.send({success : (!err && data.affectedRows == 1)});
  });
});

router.delete("/delete/:idArea", function(req, res) {
  areasController.delete(req.params.idArea, function(err, data) {
    res.send({success : (!err && data.affectedRows == 1)});
  });
});

module.exports = router;
