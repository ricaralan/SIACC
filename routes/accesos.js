var express = require("express"),
	router  = express.Router(),
	permisoController = require("../database/controllers/PermisosController");

router.get("/simple", function(req, res) {
	res.render("acceso_simple");
});

router.get("/equipo_computo", function(req, res) {
	res.render("acceso_equipo_computo");
});

module.exports = router;
