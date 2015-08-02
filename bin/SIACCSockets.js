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

  });

};
