var express = require("express");
var router = express.Router();
var loginController = require("../database/controllers/LoginController");

router.get("/", function(req, res) {
  res.render('login', { title: 'Login' });
});

router.post("/verificarUsuario/:usuario/:contra", function(req, res) {
  var usuario = req.params.usuario;
  var contra = req.params.contra;
  loginController.verificarUsuario(usuario, contra, function(err, usuario) {
    if(!err && usuario.length > 0) {
      req.session.user = usuario;
    }
    res.send(!err && usuario.length > 0);
  });
});

module.exports = router;
