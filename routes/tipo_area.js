var express = require("express");
var router = express.Router();
var controller = require("../database/controllers/TipoAreasController");

router.get("/", function(req, res) {
  res.send("hello");
});

router.post("/create/:jsonData", function(req, res) {
  jsonData = JSON.parse(req.params.jsonData);
  controller.create(jsonData, function(err, modules){
    res.send(modules);
  });
});

module.exports = router;
