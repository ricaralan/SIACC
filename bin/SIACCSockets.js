module.exports = function(server){

  io = require("socket.io")(server);

  io.on("connection", function(socket) {

    /**
    * CRUD TIPOS ÁREAS SOCKETS
    **/
    /* Como es poco probable que haya más de 10 tipos de áreas... solo habrá un socket  */
    socket.on("changeOnTiposAreas", function(mensaje) {
      io.emit("changeOnTiposAreas", mensaje);
    });

    /**
    * CHANGE ON CARRERAS
    **/
    /* Como es poco probable que haya más de 10 tipos de áreas... solo habrá un socket  */
    socket.on("changeOnCarreras", function(mensaje) {
      io.emit("changeOnCarreras", mensaje);
    });

    /**
    * CHANGE ON TIPOS USUARIOS SOCKETS
    **/
    /* Como es poco probable que haya más de 10 tipos de usuarios... solo habrá un socket  */
    socket.on("changeOnTiposUsuarios", function(mensaje) {
      io.emit("changeOnTiposUsuarios", mensaje);
    });

    /**
    * CHANGE ON ÁREAS SOCKETS
    ***/
    socket.on("changeOnAreas", function(mensaje) {
      io.emit("changeOnAreas", mensaje);
    });

    /**
    * CHANGE ON MATERIAS SOCKETS
    ***/
    socket.on("changeOnMaterias", function(mensaje) {
      io.emit("changeOnMaterias", mensaje);
    });

    /**
    * CHANGE ON USUARIOS SOCKETS
    **/
    socket.on("changeOnUsuarios", function(mensaje) {
      io.emit("changeOnUsuarios", mensaje);
    });

    /**
    * CHANGE ON HORARIOS SOCKETS
    **/
    socket.on("changeOnHorarios", function(mensaje) {
      io.emit("changeOnHorarios", mensaje);
    });

    /**
    * CHANGE ON TIPOS INVENTARIOS SOCKETS
    **/
    socket.on("changeOnTiposInventarios", function(mensaje) {
      io.emit("changeOnTiposInventarios", mensaje);
    });

    /**
    * CHANGE ON INVENTARIOS SOCKETS
    **/
    socket.on("changeOnInventarios", function(mensaje) {
      io.emit("changeOnInventarios", mensaje);
    });

    /**
    * CHANGE ON CONTROL DE ACCESO SOCKETS
    **/
    socket.on("changeOnControlAcceso", function(mensaje) {
      io.emit("changeOnControlAcceso", mensaje);
    });

    /**
    * CHANGE ON TIPOS SERVICIOS SOCKETS
    **/
    socket.on("changeOnTiposServicios", function(mensaje) {
      io.emit("changeOnTiposServicios", mensaje);
    });

    /**
    * CHANGE ON SERVICIOS SIN SOLUCIONAR SOCKETS
    **/
    socket.on("changeOnServiciosSinSolucionar", function(mensaje) {
      io.emit("changeOnServiciosSinSolucionar", mensaje);
    });

    /**
    * CHANGE ON USUARIOS ASIGNADOS SERVICIO SOCKETS
    **/
    socket.on("changeUsuariosAsignadosServicio", function(mensaje) {
      io.emit("changeUsuariosAsignadosServicio", mensaje);
    });

  });

};
