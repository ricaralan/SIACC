var express = require("express");
var router = express.Router();
var loginController = require("../database/controllers/LoginController");

router.get("/", function(req, res) {
  res.render('login', { title: 'Login' });
});

module.exports = router;
