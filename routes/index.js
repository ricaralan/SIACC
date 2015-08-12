var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.session.user != null){
    res.render('index', { title: 'SIACC'});
  } else {
    res.render('login', { title: 'Login' });
  }
});

module.exports = router;
