var express = require("express");
var router = express.Router();
var controller = require("../database/controllers/ModulesController");

router.get("/getDataModules", function(req, res) {
  controller.getDataModules(function(err, modules){
    res.send(modules);
  });
});

module.exports = router;
