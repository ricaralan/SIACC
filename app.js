var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressSession = require("express-session");
var multer = require("multer");
var generateId = require("./util/generateId");

var passport = require('./auth');

var app = express();

// view engine setup
app.set('images', __dirname + 'public/images/');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser({ uploadDir: __dirname + "public/images/temp" }));
app.use(multer({dest:"public/images/temp"}));

app.use(cookieParser());
app.use(expressSession({secret:'@23[['+generateId.generate(1024)+'SIACC_*-*[*]]]'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/index'));
app.use('/usuarios', require('./routes/usuarios'));
app.use('/login', require('./routes/login'));
app.use('/permisos', require('./routes/permisos'));
app.use('/tipoArea', require('./routes/tipo_area'));
app.use('/tipo_usuario', require('./routes/tipo_usuario'));
app.use('/areas', require('./routes/areas'));
app.use('/carreras', require('./routes/carreras'));
app.use('/horarios', require('./routes/horarios'));
app.use('/materias', require('./routes/materias'));
app.use('/tipo_inventario', require('./routes/tipo_inventario'));
app.use('/inventarios', require('./routes/inventarios'));
app.use('/acceso_area', require('./routes/acceso_area'));
app.use('/tipo_servicio', require('./routes/tipo_servicio'));
app.use('/mesa_ayuda', require('./routes/mesa_ayuda'));
app.use('/reports', require('./routes/reports'));

app.post("/auth/login", passport.authenticate("local"), function(req, res) {
    loginSuccess = true;
    if(req.user.errLogin) {
      loginSuccess = false;
      req.logout();
    }
    res.send({success : loginSuccess});
  });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  //next(err);
  res.send("404 page not found");
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
