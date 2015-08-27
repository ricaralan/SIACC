var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.user != null){
    res.render('index', { title: 'SIACC'});
  } else {
    res.render('login', { title: 'Login - SIACC' });
  }
});

module.exports = router;
