var express = require('express');
var router = express.Router();
var abstractModel = require("../database/models/abstract/AbstractModel");

/* GET users listing. */
router.get('/', function(req, res) {
  res.send(req.session.user);
});

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
