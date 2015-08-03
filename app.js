var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressSession = require("express-session");
var multer = require("multer");

var routes = require('./routes/index');
var usuarios = require('./routes/usuarios');
var login = require('./routes/login');
var permisos = require('./routes/permisos');
var tipo_area = require('./routes/tipo_area');
var tipo_usuario = require('./routes/tipo_usuario');
var areas = require('./routes/areas');
var carreras = require('./routes/carreras');
var horarios = require('./routes/horarios');
var materias = require('./routes/materias');
var tipo_inventario = require('./routes/tipo_inventario');
var inventarios = require('./routes/inventarios');

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
app.use(expressSession({secret:'@1[[de+WEDLN23EOIEFSIACC_*-*[*]]]'}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/usuarios', usuarios);
app.use('/login', login);
app.use('/permisos', permisos);
app.use('/tipoArea', tipo_area);
app.use('/tipo_usuario', tipo_usuario);
app.use('/areas', areas);
app.use('/carreras', carreras);
app.use('/horarios', horarios);
app.use('/materias', materias);
app.use('/tipo_inventario', tipo_inventario);
app.use('/inventarios', inventarios);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
