var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.session.user);
  console.log(req.user);
  if (req.session.user != null){
    res.render('index', { title: 'SIACC'});
  } else {
    res.render('login', { title: 'Login - SIACC' });
  }
});

module.exports = router;
