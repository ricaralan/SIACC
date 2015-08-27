var passport = require("passport"),
    LocalStrategy = require("passport-local").Strategy,
    loginController = require("./database/controllers/LoginController");

passport.use(new LocalStrategy(function(username, password, done) {
  loginController.verificarUsuario(username, password, function(err, usuario) {
    if(usuario.length == 1) {
      done(null, usuario[0]);
    }
  });
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

module.exports = passport;
