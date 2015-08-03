var express = require("express");
var router = express.Router();
var areasController = require("../database/controllers/AreasController");

router.get("/getAreas", function(req, res) {
  areasController.getAreas(function(err, data) {
    res.send(data);
  });
});

router.get("/getArea/:idArea", function(req, res) {
  areasController.getArea(req.params.idArea, function(err, data) {
    res.send(data[0]);
  });
});

router.post("/create/:jsonArea", function(req, res) {
  areasController.create(JSON.parse(req.params.jsonArea), function(err, data) {
    res.send({success : (!err && data.affectedRows == 1)});
  });
});

router.put("/update/:jsonArea/:idArea", function(req, res) {
  areasController.update(JSON.parse(req.params.jsonArea), req.params.idArea,
    function(err, data) {
    res.send({success : (!err && data.affectedRows == 1)});
  });
});

router.delete("/delete/:idArea", function(req, res) {
  areasController.delete(req.params.idArea, function(err, data) {
    res.send({success : (!err && data.affectedRows == 1)});
  });
});

module.exports = router;
