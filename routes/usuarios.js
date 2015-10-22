var express = require('express');
var router = express.Router();
var controller = require("../database/controllers/UsuariosController");
var permisoController = require("../database/controllers/PermisosController");
var encriptacion = require("../util/encriptation");
var fs = require("fs");

router.get('/', function(req, res) {
  if(req.user) {
    permisoController.getPermisoTipoUsuario(req.user.usu_id_tipo_usuario,
      "usuarios", function(err, permiso) {
        if(!err && permiso && permiso[0].moa_ver==1) {
          res.render('usuarios', { title: 'SIACC'});
        } else {
          console.log(err);
          res.render("sin_permiso_vista", {title:"No tienes permisos para ver esto - SIACC"});
        }
    });
  } else {
    res.render("login", {title:"login"});
  }
});

router.get("/getIdUsuarioLogueado", function(req, res) {
  res.send(req.user.id_usuario);
});

router.get("/getDataUsuario/:idUsuario", function(req, res) {
  var idUsuario = req.params.idUsuario;
  controller.getDataUsuario(idUsuario, function(err, usuario) {
    if(!err) {
      usersPasswordsDecipher(usuario);
      res.send(usuario[0]);
    } else {
      res.send( { error : "No se pudo encontrar el usuario" } );
    }
  });
});

router.get("/u/logged/getDataUsuario", function(req, res) {
  if(req.user) {
    controller.getDataUsuario(req.user.id_usuario, function(err, usuario) {
      if(!err) {
        res.send(usuario[0]);
      } else {
        res.send( { error : "No se pudo encontrar el usuario" } );
      }
    });
  } else {
    res.send({error : "User not logged"});
  }
});

router.get("/getPermisosUsuario/:idUsuario", function(req, res) {
  controller.getPermisosUsuario(req.params.idUsuario, function(err, permisos) {
    res.send(permisos);
  });
});

router.get("/getUsuariosTipoLimit/:idTipoUsuario/:inicio/:rows", function(req, res) {
  if(req.user) {
    var idTipoUsuario = req.params.idTipoUsuario;
    var inicio = req.params.inicio;
    var rows = req.params.rows;
    controller.getUsuariosTipoLimit(idTipoUsuario, inicio, rows, function(err, usuarios) {
      if(!err) {
        usersPasswordsDecipher(usuarios);
        res.send(usuarios);
      } else {
        res.send(null);
      }
    });
  } else {
    res.send({error : "user not logged"});
  }
});

router.get("/getUsuariosByTextLimit/:text/:inicio/:rows", function(req, res) {
  var text = req.params.text;
  var inicio = req.params.inicio;
  var rows = req.params.rows;
  controller.getUsuariosByTextLimit(text, inicio, rows, function(err, usuarios) {
    if(!err) {
      usersPasswordsDecipher(usuarios);
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
      usersPasswordsDecipher(usuarios);
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
  if(jsonData.usu_usuario && jsonData.usu_usuario.length > 0) {
    jsonData.usu_usuario = encriptacion.cipher(jsonData.usu_usuario);
    jsonData.usu_contrasena = encriptacion.cipher(jsonData.usu_contrasena);
  }
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
    usu_sexo : req.body.usu_sexo,
    usu_usuario : encriptacion.cipher(req.body.usu_usuario),
    usu_contrasena : encriptacion.cipher(req.body.usu_contrasena)
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

router.get("/existUsername/:idUsuario/:username", function(req, res) {
  try {
    idUsuario = req.params.idUsuario;
    username = req.params.username;
    controller.existUsername(idUsuario, encriptacion.cipher(username), function(err, users) {
      if(!err) {
        res.send({exist : users.length > 0});
      }
    });
  } catch(e) {
    console.log("ERROR: " + e);
  }
});

router.get("/getTypesUser", function(req, res) {
  abstractModel.select("tipo_usuario",[
    "tipo_id", "tipo_nombre", "tipo_descripcion"
  ],{},function(err, data) {
    res.send(data);
  });
});


function usersPasswordsDecipher(usuarios) {
  for(var i = 0; i < usuarios.length; i++) {
    if(usuarios[i].usu_usuario && usuarios[i].usu_contrasena) {
      usuarios[i].usu_usuario = encriptacion.decipher(usuarios[i].usu_usuario);
      usuarios[i].usu_contrasena = encriptacion.decipher(usuarios[i].usu_contrasena);
    }
  }
};

router.get("/logout", function(req, res) {
  req.session.destroy(function (){
    req.logout();
    res.redirect("/");
  });
});

module.exports = router;
