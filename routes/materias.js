var express = require("express");
var router  = express.Router();
var controller = require("../database/controllers/MateriasController");
var permisoController = require("../database/controllers/PermisosController");

router.get("/", function(req, res) {
  if(req.user) {
    permisoController.getPermisoTipoUsuario(req.user.usu_id_tipo_usuario,
      "asignacion_materias", function(err, permiso) {
        if(!err && permiso && permiso[0].moa_ver==1) {
          res.render('materias', {title: 'SIACC'});
        } else {
          console.log(err);
          res.render("sin_permiso_vista", {title:"No tienes permisos para ver esto - SIACC"});
        }
    });
  } else {
    res.render("login", { title : "login" });
  }
});

router.get("/getMateria/:idMateria", function(req, res) {
  controller.getMateria(req.params.idMateria, function(err, materia) {
    if(!err) {
      res.send(materia);
    }
  });
});

router.get("/getMaterias/:inicio/:numRows", function(req, res) {
  inicio = req.params.inicio;
  numRows = req.params.numRows;
  controller.getMateriasLimit(inicio, numRows, function(err, dataMaterias) {
    res.send(dataMaterias);
  });
});

router.get("/getMateriasUsuario/:idUsuario/:inicio/:numRows", function(req, res) {
  idUsuario = req.params.idUsuario;
  inicio = req.params.inicio;
  numRows = req.params.numRows;
  controller.getMateriasUsuarioLimit(idUsuario, inicio, numRows, function(err, data) {
    res.send(data);
  });
});

router.get("/getMateriasUsuarioByText/:text/:idUsuario/:inicio/:numRows", function(req, res) {
  text = req.params.text;
  idUsuario = req.params.idUsuario;
  inicio = req.params.inicio;
  numRows = req.params.numRows;
  controller.getMateriasUsuarioLimitByText(text, idUsuario, inicio, numRows, function(err, data) {
    res.send(data);
  });
});

router.get("/getMateriasByText/:text/:inicio/:numRows", function(req, res) {
  inicio = req.params.inicio;
  numRows = req.params.numRows;
  text = req.params.text;
  controller.getMateriasLimitByText(text, inicio, numRows, function(err, dataMaterias) {
    res.send(dataMaterias);
  });
});

router.get("/getUsuariosPermisoMaterias", function(req, res) {
  controller.getUsuariosPermisoMaterias(function(err, dataUsuarios) {
    res.send(dataUsuarios);
  });
});

router.post("/create", function(req, res) {
  controller.create(req.body.jsonData, function(err, data) {
    res.send({success : !err && data.affectedRows == 1});
  });
});

router.post("/asignarMateriaUsuario/:idUsuario/:idMateria", function(req, res) {
  idUsuario = req.params.idUsuario;
  idMateria = req.params.idMateria;
  controller.asignarMateriaUsuario(idUsuario, idMateria, function(err, data) {
    res.send({success : !err && data.affectedRows == 1});
  });
});

router.put("/update", function(req, res) {
  controller.update(req.body.jsonData, req.body.id, function(err, data) {
    res.send({success : !err && data.affectedRows == 1});
  });
});

router.delete("/delete/:id_materia", function(req, res) {
  controller.delete(req.params.id_materia, function(err, data) {
    res.send({success : !err && data.affectedRows == 1});
  });
});

router.delete("/deleteAsignacionUsuario/:idUsuario/:idMateria", function(req, res) {
  idUsuario = req.params.idUsuario;
  idMateria = req.params.idMateria;
  controller.deleteAsignacionUsuario(idUsuario, idMateria, function(err, data) {
    res.send( { success : !err && data.affectedRows == 1 } )
  });
});

module.exports = router;
