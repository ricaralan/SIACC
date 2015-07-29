var express = require("express");
var router = express.Router();
var controller = require("../database/controllers/HorariosController");

router.post("/createHorario", function(req, res) {
  controller.createHorarioByJson(req.body.jsonHorario, function(data) {
    res.send(data);
  });
});


module.exports = router;
