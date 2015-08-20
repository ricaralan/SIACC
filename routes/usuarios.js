var express = require('express');
var router = express.Router();
var controller = require("../database/controllers/UsuariosController");
var fs = require("fs");

router.get('/', function(req, res) {
  res.render('usuarios', { title: 'SIACC'});
});

router.get("/getIdUsuarioLogueado", function(req, res) {
  res.send(req.session.user[0].id_usuario);
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

router.get("/getPermisosUsuario/:idUsuario", function(req, res) {
  controller.getPermisosUsuario(req.params.idUsuario, function(err, permisos) {
    res.send(permisos);
  });
});

router.get("/getUsuariosTipoLimit/:idTipoUsuario/:inicio/:rows", function(req, res) {
  var idTipoUsuario = req.params.idTipoUsuario;
  var inicio = req.params.inicio;
  var rows = req.params.rows;
  controller.getUsuariosTipoLimit(idTipoUsuario, inicio, rows, function(err, usuarios) {
    if(!err) {
      res.send(usuarios);
    } else {
      res.send(null);
    }
  });
});

router.get("/getUsuariosByTextLimit/:text/:inicio/:rows", function(req, res) {
  var text = req.params.text;
  var inicio = req.params.inicio;
  var rows = req.params.rows;
  controller.getUsuariosByTextLimit(text, inicio, rows, function(err, usuarios) {
    if(!err) {
      res.send(usuarios);
    } else {
      res.send(null);
    }
  });
});

router.get("/findUsuariosTipoLimit/:word/:idTipoUsuario/", function(req, res) {
  var word = req.params.word;
  var idTipoUsuario = req.params.idTipoUsuario;
  var inicio = req.params.inicio;
  controller.findUsuariosTipoLimit(word, idTipoUsuario, function(err, usuarios) {
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
});

router.put("/updateUser", function(req, res) {
  var file = req.files.usu_foto;
  var nombreNuevaImagen = req.body.usu_foto;
  if(file != undefined) {
    nombreNuevaImagen = "/images/usuarios/"+req.body.id_usuario.toLowerCase() + "."
                      + file.name.split(".")[file.name.split(".").length-1];
    var targetPath = "public" + nombreNuevaImagen;
  }
  idUsuario = req.body._id_usuario;
  controller.update({
    id_usuario : req.body.id_usuario,
    usu_nombre : req.body.usu_nombre,
    usu_primer_apellido : req.body.usu_primer_apellido,
    usu_segundo_apellido : req.body.usu_segundo_apellido,
    usu_id_tipo_usuario : req.body.usu_id_tipo_usuario,
    usu_email : req.body.usu_email,
    usu_foto : nombreNuevaImagen,
    usu_sexo : req.body.usu_sexo
  }, idUsuario, function(err, data) {
    if(file != undefined){
      renameSync(file, targetPath);
    }
    res.send( { success : !err && data.affectedRows == 1 } );
  });
});

router.put("/update/:jsonData/:idUsuario", function(req, res) {
  var jsonData = JSON.parse(req.params.jsonData);
  controller.update(jsonData, req.params.idUsuario, function(err, data) {
    res.send( { success : !err && data.affectedRows == 1 } );
  });
});

router.delete("/delete/:idUsuario", function(req, res) {
  idUsuario = req.params.idUsuario;
  controller.delete(idUsuario, function(err, data) {
    res.send({success : (!err && data.affectedRows == 1)});
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

router.get("/logout", function(req, res) {
  req.session.destroy(function (){
    res.redirect("/");
  });
});

module.exports = router;
