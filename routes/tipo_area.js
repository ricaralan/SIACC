var express = require("express");
var router = express.Router();
var controller = require("../database/controllers/TipoAreasController");
var fs = require('fs');

router.get("/getTiposArea", function(req, res) {
  controller.getTiposArea(function(err, tipos_area) {
    if(!err) {
      res.send(tipos_area);
    }
  })
});

router.get("/getPermisosTipoArea/:idTipoArea", function(req, res) {
  controller.getPermisosTipoArea(req.params.idTipoArea, function(err, data) {
    res.send(data);
  });
});

router.post("/create/", function(req, res) {
  var file = req.files.tipo_foto;
  // Nombre de la nueva imagen
  var nombreNuevaImagen = "system/escritorio-area.png";
  if(file != undefined){
    nombreNuevaImagen = "tipos_areas/"+req.body.tipo_nombre.toLowerCase()
      .replace(new RegExp(" ", 'g'),"_") +"."+file.name.split(".")[file.name.split(".").length-1];
    var name = file.name,
      tipo = file.mimetype,
      targetPath = "public/images/" + nombreNuevaImagen;
  }
  // JSON del nuevo tipo de área
  jsonData = {
    tipo_nombre : req.body.tipo_nombre,
    tipo_descripcion : req.body.tipo_descripcion,
    tipo_imagen : "/images/" + nombreNuevaImagen
  };
  controller.create(jsonData, function(err, data){
    if(!err && data.affectedRows == 1) {
      if(file != undefined){
        fs.stat(file.path, function(err) {
            if(!err && (tipo == "image/png" || tipo == "image/jpg" || tipo == "image/jpeg")) {
              // Sí es una foto subir...
              fs.renameSync(file.path, targetPath, function(err) {
              });
            }
        });
      }
      res.send({success : true, idTipoArea : data.insertId});
    }else {
      res.send({success : false, err : err});
    }
  });
});

router.post("/asignarPermisosTipoArea", function(req, res) {
  idTipoArea = req.body.idTipoArea;
  permisos = req.body.permisos;
  controller.asignarPermisosTipoArea(idTipoArea, permisos, function(err, data) {
    res.send(data);
  });
});

router.put("/updatePermisosTipoArea", function(req, res) {
  idTipoArea = req.body.idTipoArea;
  permisos = req.body.permisos;
  controller.updatePermisosTipoArea(idTipoArea, permisos, function(err, data) {
    res.send(data);
  });
});

router.put("/update", function(req, res) {
  var file = req.files.tipo_foto;
  if(file != undefined){
    nombreNuevaImagen = "tipos_areas/"+req.body.tipo_nombre.toLowerCase()
      .replace(new RegExp(" ", 'g'),"_") +"."+file.name.split(".")[file.name.split(".").length-1];
    var name = file.name,
      tipo = file.mimetype,
      targetPath = "public/images/" + nombreNuevaImagen;
      req.body.tipo_imagen = "images/" + nombreNuevaImagen;
  }
  jsonData = {
    tipo_nombre : req.body.tipo_nombre,
    tipo_descripcion : req.body.tipo_descripcion,
    tipo_imagen : req.body.tipo_imagen
  };
  controller.update(jsonData, req.body.id_tipo_area, function(err, data) {
    if(file != undefined){
      fs.stat(file.path, function(err) {
          if(!err && (tipo == "image/png" || tipo == "image/jpg" || tipo == "image/jpeg")) {
            // Sí es una foto subir...
            fs.renameSync(file.path, targetPath, function(err) {
            });
          }
      });
    }
    res.send({success : data.affectedRows == 1});
  });
});

router.delete("/delete/:id_tipo_area", function(req, res) {
  controller.delete(req.params.id_tipo_area, function(err, data) {
    res.send({success : !err && data.affectedRows == 1});
  });
});

module.exports = router;
