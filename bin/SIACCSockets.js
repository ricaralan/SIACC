module.exports = function(server){

  io = require("socket.io")(server);

  io.on("connection", function(socket) {

    /**
    * CRUD TIPOS ÁREAS SOCKETS
    **/
    socket.on("newTipoAreaCreated", function(mensaje) {
      io.emit("newTipoAreaCreated", mensaje);
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
