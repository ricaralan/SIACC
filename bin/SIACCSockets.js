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
    * CRUD CARRERAS
    **/
    /* Como es poco probable que haya más de 10 tipos de áreas... solo habrá un socket  */
    socket.on("changeOnCarreras", function(mensaje) {
      io.emit("changeOnCarreras", mensaje);
    });

    /**
    * CRUD TIPOS USUARIOS SOCKETS
    **/
    /* Como es poco probable que haya más de 10 tipos de usuarios... solo habrá un socket  */
    socket.on("changeOnTiposUsuarios", function(mensaje) {
      io.emit("changeOnTiposUsuarios", mensaje);
    });

    /**
    * CRUD ÁREAS SOCKETS
    ***/
    socket.on("changeOnAreas", function(mensaje) {
      io.emit("changeOnAreas", mensaje);
    });

    /**
    * ACTIONS USUARIO
    **/
    socket.on("changeOnUsuarios", function(mensaje) {
      io.emit("changeOnUsuarios", mensaje);
    });

  });

};
