var express = require("express");
var router  = express.Router();
var controller = require("../database/controllers/MateriasController");

router.get("/", function(req, res) {
  res.send("materias");
});

router.post("/create", function(req, res) {
  controller.create(req.body.jsonData, function(err, data) {
    res.send({success : !err && data.affectedRows == 1});
  });
});

router.put("/update", function(req, res) {
  controller.update(req.body.jsonData, req.body.id, function(err, data) {
    res.send({success : !err && data.affectedRows == 1});
  });
});

router.delete("/delete", function(req, res) {
  controller.delete(req.body.id, function(err, data) {
    res.send({success : !err && data.affectedRows == 1});
  });
});

module.exports = router;
