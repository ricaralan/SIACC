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
    * CRUD ÁREAS SOCKETS
    ***/
    socket.on("newAreaCreated", function(mensaje) {
      io.emit("newAreaCreated", mensaje);
    });

    socket.on("areaEdited", function(mensaje) {
      io.emit("areaEdited", mensaje);
    });

    socket.on("areaDeleted", function(mensaje) {
      io.emit("areaDeleted", mensaje);
    });

  });

};
