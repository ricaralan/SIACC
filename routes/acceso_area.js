var express = require("express"),
    router  = express.Router(),
    controller = require("../database/controllers/AccesoAreaController"),
    tiposUsuariosController = require("../database/controllers/TiposUsuariosController"),
    permisoController = require("../database/controllers/PermisosController");

router.get("/simple", function(req, res) {
  if(req.user) {
    permisoController.getPermisoTipoUsuario(req.user.usu_id_tipo_usuario,
      "acceso_simple", function(err, permiso) {
        if(!err && permiso && permiso[0].moa_ver==1) {
          tiposUsuariosController.getTipoUsuario(req.user.usu_id_tipo_usuario, function(err, data) {
            if(!err) {
              if(data[0].tipo_asignar_area && data[0].tipo_asignar_area == 1){
                res.render('acceso_simple', { title : 'Acceso simple - SIACC' });
              } else {
                res.render("sin_permiso_vista", {title : "No tienes una área asignada - SIACC"});
              }
            } else {
              res.send("Ocurrio un error desconocido");
            }
          });
        } else {
          res.render("sin_permiso_vista", {title : "No tienes permisos para ver esto - SIACC"});
        }
    });
  } else {
    res.render("login", {title:"login"});
  }
});

router.get("/equipo_computo", function(req, res) {
  if(req.user) {
    permisoController.getPermisoTipoUsuario(req.user.usu_id_tipo_usuario,
      "acceso_equipo_computo", function(err, permiso) {
        if(!err && permiso && permiso[0].moa_ver==1) {
          tiposUsuariosController.getTipoUsuario(req.user.usu_id_tipo_usuario, function(err, data) {
            if(!err) {
              if(data[0].tipo_asignar_area && data[0].tipo_asignar_area == 1){
                res.render('acceso_equipo_computo', { title : 'Acceso simple - SIACC' });
              } else {
                res.render("sin_permiso_vista", {title : "No tienes permisos para ver esto - SIACC"});
              }
            } else {
              res.send("Ocurrio un error desconocido");
            }
          });
        } else {
          res.render("sin_permiso_vista", {title : "No tienes permisos para ver esto - SIACC"});
        }
    });
  } else {
    res.render("login", {title:"login"});
  }
});

router.get("/getTipoAccesosActualesArea/:tipoAcceso/:idArea", function(req, res) {
  tipoAcceso = req.params.tipoAcceso;
  if(tipoAcceso == 1) {
    controller.getAccesosSimplesActualesArea(req.params.idArea, function(err, accesos) {
      res.send(accesos);
    });
  } else if(tipoAcceso == 2) {
    controller.getAccesosInventarioActualesArea(req.params.idArea, function(err, accesos) {
      res.send(accesos);
    });
  } else {
    res.send({ERROR : "EL TIPO DE ACCESO NO EXISTE!"});
  }
});

router.get("/getAreaUserLogged", function(req, res) {
  if(req.user) {
    res.send({id_area : req.user.usu_id_area});
  } else {
    res.send({error : "User not logged"});
  }
});

router.post("/registrarAcceso", function(req, res) {
  controller.create(req.body.jsonData, function(err, data) {
    res.send( { success : !err && data.affectedRows == 1 } );
  });
});

router.put("/registrarSalida", function(req, res) {
  if(req.body.id_acceso && req.body.acc_hora_fin) {
    controller.update({acc_hora_fin : req.body.acc_hora_fin}, req.body.id_acceso,
      function(err, data) {
      res.send( { success : !err && data.affectedRows == 1 } );
    });
  }
});

module.exports = router;
