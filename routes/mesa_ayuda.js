var express = require("express");
var router = express.Router();
var controller = require("../database/controllers/MesaAyudaController");
var userController = require("../database/controllers/UsuariosController");
var permisoController = require("../database/controllers/PermisosController");
var generatedId = require("../util/generateId/");

router.get("/solicitante", function(req, res) {
  if(req.user) {
    permisoController.getPermisoTipoUsuario(req.user.usu_id_tipo_usuario,
      "mesa_ayuda_solicitante", function(err, permiso) {
        if(!err && permiso && permiso[0].moa_ver==1) {
          res.render('mesa_ayuda_solicitante', {title: 'SIACC'});
        } else {
          console.log(err);
          res.render("sin_permiso_vista", {title:"No tienes permisos para ver esto - SIACC"});
        }
    });
  } else {
    res.render("login", {title:"login"});
  }
});

router.get("/atender", function(req, res) {
  if(req.user) {
    permisoController.getPermisoTipoUsuario(req.user.usu_id_tipo_usuario,
      "mesa_ayuda_atencion", function(err, permiso) {
        if(!err && permiso && permiso[0].moa_ver==1) {
          res.render('mesa_ayuda_atender', {title: 'SIACC'});
        } else {
          console.log(err);
          res.render("sin_permiso_vista", {title:"No tienes permisos para ver esto - SIACC"});
        }
    });
  } else {
    res.render("login", {title:"login"});
  }
});

router.get("/administrador", function(req, res) {
  if(req.user != null) {
    res.render("mesa_ayuda_administrador", {title : "SIACC"});
  }
});

router.get("/getServiciosSinFinalizar", function(req, res) {
  controller.getServiciosSinFinalizar(function(err, servicios) {
    if(!err) {
      res.send(servicios);
    } else {
      console.log(err);
      res.send(err);
    }
  });
});

router.get("/getServiciosSinSolucionar", function(req, res) {
  controller.getServiciosSinSolucionar(function(err, servicios) {
    if(!err) {
      res.send(servicios);
    } else {
      // TODO especificar el tipo de error
    }
  });
});

router.get("/getServiciosSinSolucionar/u/", function(req, res) {
  controller.getServiciosSinSolucionarUsuario(req.user.id_usuario, function(err, servicios) {
    if(!err) {
      res.send(servicios);
    } else {
      // TODO especificar el tipo de error
    }
  });
});

router.get("/getServiciosSolicitadosEnProceso/u/", function(req, res) {
  controller.getServiciosSolicitadosEnProceso(req.user.id_usuario, function(err, servicios) {
    if(!err) {
      res.send(servicios);
    } else {
      // TODO especificar el tipo de error
    }
  });
});

router.get("/getServiciosSolicitadosSolucionados/u/", function(req, res) {
  controller.getServiciosSolicitadosSolucionados(req.user.id_usuario, function(err, servicios) {
    if(!err) {
      res.send(servicios);
    } else {
      // TODO especificar el tipo de error
    }
  });
});

router.get("/getServiciosSolucionados/u/", function(req, res) {
  controller.getServiciosSolucionados(req.user.id_usuario, function(err, servicios) {
    if(!err) {
      res.send(servicios);
    } else {
      // TODO especificar el tipo de error
    }
  });
});

router.post("/solicitar_servicio", function(req, res) {
  getIdNewServicio(function(id) {
    req.body.jsonData.id_mesa_ayuda = id;
    console.log(req.body.jsonData);
    controller.create(req.body.jsonData, function(err, data) {
      res.send({success : !err && data.affectedRows == 1, generatedId : id});
    });
  });
});

function getIdNewServicio(done) {
  id = generatedId.generate(10);
  controller.existMesaAyudaById(id, function(existeMesa) {
    if(existeMesa) {
      // Aplicar recursibidad hasta encontrar una clave disponible
      getIdNewServicio(done);
    } else{
      done(id);
    }
  });
}

router.post("/cambiar_area_atencion", function(req, res) {
  controller.cambiarAreaAtencion({
    aam_id_mesa_ayuda : req.body.aam_id_mesa_ayuda,
    aam_id_area : req.body.aam_id_area
  }, function(err, data) {
    res.send({success : !err && data.affectedRows == 1});
  });
});

router.put("/update", function(req, res) {
  controller.update(req.body.data, req.body.data.id_mesa_ayuda, function(err, data) {
    res.send({success : !err && data.affectedRows == 1});
  });
});

router.get("/getUsuariosAtiendenMesa/:mesaAyuda/", function(req, res) {
  userController.getUsuariosAtiendenMesa(req.params.mesaAyuda, function(err, data) {
    if(!err) {
      res.send(data);
    }
  });
});

router.get("/getUsuariosAtencionMesaAyudaByText/:mesaAyuda/:palabra/:idArea/", function(req, res) {
  userController.getUsuariosAtencionMesaAyudaByText(req.params.palabra, req.params.mesaAyuda,req.params.idArea, function(err, data) {
    if(!err) {
      res.send(data);
    }
  });
});

router.post("/asignarUsuarioMesa/:idUsuario/:idAreaAtiendeMesa", function(req, res) {
  controller.asignarUsuarioMesa(req.params.idUsuario, req.params.idAreaAtiendeMesa, function(err, data) {
    if(!err) {
      res.send(data);
    }
  });
});

router.put("/eliminarUsuarioMesa/:idUsuario/:idAreaAtiendeMesa", function(req, res) {
  controller.eliminarUsuarioMesa(req.params.idUsuario, req.params.idAreaAtiendeMesa, function(err, data) {
    if(!err) {
      res.send(data);
    }
  });
});

router.post("/concluirServicio", function(req, res) {
  json = req.body;
  controller.concluirServicio(json.datosServicioSolucionado,json.id_area_atiende_mesa, function(err, data) {
    res.send({success : !err && data.affectedRows == 1});
  });
});

module.exports = router;
