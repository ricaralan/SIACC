var express = require("express");
var router = express.Router();
var controller = require("../database/controllers/TiposInventariosController");
var permisoController = require("../database/controllers/PermisosController");
var fs = require("fs");

router.get("/", function(req, res) {
  if(req.user) {
    permisoController.getPermisoTipoUsuario(req.user.usu_id_tipo_usuario,
      "system_config", function(err, permiso) {
        if(!err && permiso && permiso[0].moa_ver==1) {
          res.render('tipos_inventarios', {title: 'SIACC'});
        } else {
          console.log(err);
          res.render("sin_permiso_vista", {title:"No tienes permisos para ver esto - SIACC"});
        }
    });
  } else {
    res.render("login", {title:"login"});
  }
});

router.get("/getTiposInventarios", function(req, res) {
  controller.getTiposInventarios(function(err, tipos) {
    res.send(tipos);
  });
});

router.post("/create", function(req, res) {
  var file = req.files.tin_foto;
  // Nombre de la nueva imagen
  var nombreNuevaImagen = "system/inventarios.jpg";
  if(file != undefined){
    nombreNuevaImagen = "tipos_inventarios/"+req.body.tin_nombre.toLowerCase()
      .replace(new RegExp(" ", 'g'),"_") +"."+file.name.split(".")[file.name.split(".").length-1];
    var name = file.name,
      tipo = file.mimetype,
      targetPath = "public/images/" + nombreNuevaImagen;
  }
  // JSON del nuevo tipo de área
  jsonData = {
    tin_nombre : req.body.tin_nombre,
    tin_descripcion : req.body.tin_descripcion,
    tin_foto : "/images/" + nombreNuevaImagen,
    tin_es_computadora : req.body.tin_es_computadora==="true"
  };
  controller.create(jsonData, function(err, data) {
    if(file != undefined){
      fs.stat(file.path, function(err) {
          if(!err && (tipo == "image/png" || tipo == "image/jpg" || tipo == "image/jpeg")) {
            // Sí es una foto subir...
            fs.renameSync(file.path, targetPath, function(err) {
            });
          }
      });
    }
    res.send( { success : !err && data.affectedRows == 1 } );
  });
});

router.put("/update", function(req, res) {
  var file = req.files.tin_foto;
  // Nombre de la nueva imagen
  nombreNuevaImagen = "";
  if(file != undefined){
    nombreNuevaImagen = "/images/tipos_inventarios/"+req.body.tin_nombre.toLowerCase()
      .replace(new RegExp(" ", 'g'),"_") +"."+file.name.split(".")[file.name.split(".").length-1];
    var name = file.name,
      tipo = file.mimetype,
      targetPath = "public" + nombreNuevaImagen;
  }
  // JSON del nuevo tipo de área
  jsonData = {
    tin_nombre : req.body.tin_nombre,
    tin_descripcion : req.body.tin_descripcion,
    tin_foto : (file == undefined) ? req.body.tin_foto : nombreNuevaImagen,
    tin_es_computadora : req.body.tin_es_computadora==="true"
  };
  controller.update(jsonData, req.body.id_tipo_inventario, function(err, data) {
    if(file != undefined){
      fs.stat(file.path, function(err) {
          if(!err && (tipo == "image/png" || tipo == "image/jpg" || tipo == "image/jpeg")) {
            // Sí es una foto subir...
            fs.renameSync(file.path, targetPath, function(err) {
            });
          }
      });
    }
    res.send( { success : !err && data.affectedRows == 1 } );
  });
});

router.delete("/delete/:idTipoInventario", function(req, res) {
  controller.delete(req.params.idTipoInventario, function(err, data) {
    res.send( { success: !err && data.affectedRows == 1 } );
  });
});

module.exports = router;
