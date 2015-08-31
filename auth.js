var passport = require("passport"),
    LocalStrategy = require("passport-local").Strategy,
    loginController = require("./database/controllers/LoginController");

passport.use(new LocalStrategy(function(username, password, done) {
  loginController.verificarUsuario(username, password, function(err, usuario) {
    done(null, (usuario.length==1) ? usuario[0] : {errLogin : true});
  });
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

module.exports = passport;
