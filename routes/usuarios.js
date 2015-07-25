var express = require('express');
var router = express.Router();
var controller = require("../database/controllers/UsuariosController");
var fs = require("fs");

/* GET users listing. */
router.get('/', function(req, res) {
  res.send(req.session.user);
});

router.get("/getDataUsuario/:idUsuario", function(req, res) {
  var idUsuario = req.params.idUsuario;
  controller.getDataUsuario(idUsuario, function(err, usuario) {
    if(!err) {
      res.send(usuario[0]);
    } else {
      res.send( { error : "No se pudo encontrar el usuario" } );
    }
  });
});

router.get("/getUsuariosTipoLimit/:idTipoUsuario/:inicio/:fin", function(req, res) {
  var idTipoUsuario = req.params.idTipoUsuario;
  var inicio = req.params.inicio;
  var fin = req.params.fin;
  controller.getUsuariosTipoLimit(idTipoUsuario, inicio, fin, function(err, usuarios) {
    if(!err) {
      res.send(usuarios);
    } else {
      res.send(null);
    }
  });
});

router.get("/countUsuariosTipo/:idTipoUsuario", function(req, res) {
  var idTipoUsuario = req.params.idTipoUsuario;
  controller.countUsuariosTipo(idTipoUsuario, function(err, count) {
    if(!err) {
      res.send(count);
    } else {
      res.send(null);
    }
  });
});

router.post("/create", function(req, res) {
  var file = req.files.usu_foto;
  var nombreNuevaImagen = "/images/system/icon-user.png";
  if(file != undefined) {
    nombreNuevaImagen = "/images/usuarios/"+req.body.id_usuario.toLowerCase() + "."
                      + file.name.split(".")[file.name.split(".").length-1];
    var targetPath = "public" + nombreNuevaImagen;
  }
  jsonData = req.body;
  jsonData.usu_foto = nombreNuevaImagen;
  controller.create(jsonData, function(err, data) {
    if(!err) {
      if(file != undefined){
        renameSync(file, targetPath);
      }
      res.send( { success : true } );
    } else {
      res.send( { success : false } );
    }
  });
  console.log(jsonData);
});

router.put("/update/:jsonData/:idUsuario", function(req, res) {
  var jsonData = JSON.parse(req.params.jsonData);
  controller.update(jsonData, req.params.idUsuario, function(err, data) {
    console.log(err);
    console.log(data);
    res.send( { success : !err && data.affectedRows == 1 } );
  });
});

function renameSync(file, targetPath) {
  tipo = file.mimetype;
  fs.stat(file.path, function(err) {
      if(!err && (tipo == "image/png" || tipo == "image/jpg" || tipo == "image/jpeg")) {
        fs.renameSync(file.path, targetPath, function(err) {
        });
      }
  });
}

router.get("/getTypesUser", function(req, res) {
  abstractModel.select("tipo_usuario",[
    "tipo_id", "tipo_nombre", "tipo_descripcion"
  ],{},function(err, data) {
    res.send(data);
  });
});

router.get("/createSession", function(req, res) {
  req.session.user = {
    user_id : "user_id1",
    user_name : "Alan"
  };
  res.send(req.session.user);
});

router.get("/destroy", function(req, res) {
  req.session.destroy(function (){
    res.send("session destruida");
  });
});

module.exports = router;
