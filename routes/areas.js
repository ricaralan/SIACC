var express = require("express");
var router = express.Router();
var areasController = require("../database/controllers/AreasController");

router.get("/getAreas", function(req, res) {
  areasController.getAreas(function(err, data) {
    res.send(data);
  });
});

module.exports = router;
