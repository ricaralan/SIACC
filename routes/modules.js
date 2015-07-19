var express = require("express");
var router = express.Router();
var controller = require("../database/controllers/ModulesController");

router.get("/getModules", function(req, res) {
  controller.getAllModules(function(err, modules){
    res.send(modules);
  });
});

module.exports = router;
