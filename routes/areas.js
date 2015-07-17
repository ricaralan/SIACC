var express = require("express");
var router = express.Router();
var areasController = require("../database/controllers/AreasController");

router.get("/getAreas", function(req, res) {
  areasController.getAreas(function(err, data) {
    res.send(data);
  });
});

router.post("/create/:jsonArea", function(req, res) {
  areasController.create(JSON.parse(req.params.jsonArea), function(err, data) {
    res.send({success : (!err && data.affectedRows == 1)});
  });
});

module.exports = router;
