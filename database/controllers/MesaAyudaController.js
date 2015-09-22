var MesaAyudaController = function() {
  self = this;
  self.table = "mesa_ayuda";
  self.abstractModel = require("../models/abstract/AbstractModel");
  self.connection = require("../connection/mysql_connection");
};

var self;

MesaAyudaController.prototype.existMesaAyudaById = function(idMesaAyuda, done) {
  self.abstractModel.select(self.table, ["id_mesa_ayuda"], {id_mesa_ayuda:idMesaAyuda}, function(err, data) {
    if(!err) {
      done(data.length == 1);
    } else {
      done(false);
    }
  });
};

MesaAyudaController.prototype.getServiciosSinFinalizar = function(done) {
  query = "SELECT id_area_atiende_mesa,id_mesa_ayuda,mes_id_area,aam_id_area,usu_nombre,"
        + "usu_primer_apellido,tse_nombre,tse_descripcion,tse_otro,mes_importancia,mes_otro_tipo_servicio,mes_fecha_limite,"
        + "num_inventario,inv_ram,inv_capacidad,inv_marca,inv_status,inv_no_serie,tin_es_computadora,tin_nombre,"
        + "usu_segundo_apellido,usu_foto,are_nombre,mes_fecha_solicitado,mes_descripcion_problema FROM (((((mesa_ayuda INNER JOIN "
        + "area_atiende_mesa ON aam_id_mesa_ayuda=id_mesa_ayuda AND aam_asignacion AND area_atiende_mesa.aam_finalizo=0)"
        + "LEFT JOIN usuario ON mes_id_usuario=id_usuario)LEFT JOIN area ON id_area=mes_id_area)"
        + "LEFT JOIN tipo_servicio ON id_tipo_servicio=mes_id_tipo_servicio)LEFT JOIN inventario ON "
        + "num_inventario=mes_id_inventario)LEFT JOIN tipo_inventario ON inv_tipo=id_tipo_inventario;";
  self.connection.query(query, done);
};

MesaAyudaController.prototype.getServiciosSinSolucionar = function(done) {
  query = "SELECT id_area_atiende_mesa,id_mesa_ayuda,mes_id_area,aam_id_area,usu_nombre,usu_primer_apellido,tse_nombre,tse_descripcion,tse_otro,mes_importancia,mes_otro_tipo_servicio,mes_fecha_limite,"
        + "usu_segundo_apellido,usu_foto,are_nombre,mes_fecha_solicitado,mes_descripcion_problema FROM (((mesa_ayuda LEFT JOIN "
        + "area_atiende_mesa ON aam_id_mesa_ayuda=id_mesa_ayuda)"
        + "LEFT JOIN usuario ON mes_id_usuario=id_usuario)LEFT JOIN area ON id_area=mes_id_area)"
        + "LEFT JOIN tipo_servicio ON id_tipo_servicio=mes_id_tipo_servicio;";
  self.connection.query(query, done);
};

MesaAyudaController.prototype.getServiciosSinSolucionarUsuario = function(idUsuario, done) {
  query = "SELECT id_area_atiende_mesa,id_mesa_ayuda,mes_id_area,aam_id_area,usu_nombre,"
        + "usu_primer_apellido,tse_nombre,tse_descripcion,tse_otro,mes_importancia,mes_otro_tipo_servicio,mes_fecha_limite,"
        + "num_inventario,inv_ram,inv_capacidad,inv_marca,inv_status,inv_no_serie,tin_es_computadora,tin_nombre,"
        + "usu_segundo_apellido,usu_foto,are_nombre,mes_fecha_solicitado,mes_descripcion_problema FROM (((((mesa_ayuda INNER JOIN "
        + "area_atiende_mesa ON aam_id_mesa_ayuda=id_mesa_ayuda AND aam_asignacion AND area_atiende_mesa.aam_finalizo=0)"
        + "LEFT JOIN usuario ON mes_id_usuario=id_usuario)LEFT JOIN area ON id_area=mes_id_area)"
        + "LEFT JOIN tipo_servicio ON id_tipo_servicio=mes_id_tipo_servicio)LEFT JOIN inventario ON "
        + "num_inventario=mes_id_inventario)LEFT JOIN tipo_inventario ON inv_tipo=id_tipo_inventario ";
        + "WHERE uam_id_usuario='"+idUsuario+"';";
  self.connection.query(query, done);
};

MesaAyudaController.prototype.getServiciosSolucionados = function(idUsuario, done) {
  query = "SELECT id_area_atiende_mesa,amm_fecha_fin,aam_fecha_asignacion,aam_diagnostico,"
        + "aam_acciones_tomadas,aam_observaciones,aam_soluciono,id_mesa_ayuda,mes_id_area,area_atiende_mesa.aam_finalizo,"
        + "num_inventario,inv_ram,inv_capacidad,inv_marca,inv_status,inv_no_serie,tin_es_computadora,tin_nombre,"
        + "aam_id_area,usu_nombre,usu_primer_apellido,tse_nombre,tse_descripcion,tse_otro,mes_importancia,mes_otro_tipo_servicio,mes_fecha_limite,"
        + "usu_segundo_apellido,usu_foto,are_nombre,mes_fecha_solicitado,mes_descripcion_problema FROM ((((((mesa_ayuda LEFT JOIN "
        + "area_atiende_mesa ON aam_id_mesa_ayuda=id_mesa_ayuda AND aam_asignacion AND area_atiende_mesa.aam_finalizo=1)"
        + "LEFT JOIN usuario_atiende_mesa ON uam_id_area_atiende_mesa=id_area_atiende_mesa)"
        + "LEFT JOIN usuario ON mes_id_usuario=id_usuario)LEFT JOIN area ON id_area=mes_id_area)"
        + "INNER JOIN tipo_servicio ON id_tipo_servicio=mes_id_tipo_servicio) LEFT JOIN "
        + "inventario on num_inventario=mes_id_inventario)LEFT JOIN tipo_inventario ON inv_tipo=id_tipo_inventario "
        + "WHERE uam_id_usuario='"+idUsuario+"';";
  self.connection.query(query, done);
};

MesaAyudaController.prototype.getServiciosSolicitadosEnProceso = function(idUsuario, done) {
  query = "SELECT id_area_atiende_mesa,amm_fecha_fin,aam_fecha_asignacion,aam_diagnostico,"
        + "aam_acciones_tomadas,aam_observaciones,aam_soluciono,id_mesa_ayuda,mes_id_area,area_atiende_mesa.aam_finalizo,"
        + "aam_id_area,usu_nombre,usu_primer_apellido,tse_nombre,tse_descripcion,tse_otro,mes_importancia,mes_otro_tipo_servicio,mes_fecha_limite,"
        + "usu_segundo_apellido,usu_foto,are_nombre,mes_fecha_solicitado,mes_descripcion_problema FROM ((((mesa_ayuda LEFT JOIN "
        + "area_atiende_mesa ON aam_id_mesa_ayuda=id_mesa_ayuda AND aam_asignacion)LEFT JOIN usuario_atiende_mesa ON uam_id_area_atiende_mesa=id_area_atiende_mesa)"
        + "LEFT JOIN usuario ON mes_id_usuario=id_usuario)LEFT JOIN area ON id_area=aam_id_area)"
        + "INNER JOIN tipo_servicio ON id_tipo_servicio=mes_id_tipo_servicio AND (area_atiende_mesa.aam_finalizo=0 OR area_atiende_mesa.aam_finalizo IS NULL) WHERE "
        + "mes_id_usuario='"+idUsuario+"';";
  self.connection.query(query, done);
};

MesaAyudaController.prototype.getServiciosSolicitadosSolucionados = function(idUsuario, done) {
  query = "SELECT id_area_atiende_mesa,amm_fecha_fin,aam_fecha_asignacion,aam_diagnostico,"
        + "aam_acciones_tomadas,aam_observaciones,aam_soluciono,id_mesa_ayuda,mes_id_area,area_atiende_mesa.aam_finalizo,"
        + "aam_id_area,usu_nombre,usu_primer_apellido,tse_nombre,tse_descripcion,tse_otro,mes_importancia,mes_otro_tipo_servicio,mes_fecha_limite,"
        + "usu_segundo_apellido,usu_foto,are_nombre,mes_fecha_solicitado,mes_descripcion_problema FROM ((((mesa_ayuda LEFT JOIN "
        + "area_atiende_mesa ON aam_id_mesa_ayuda=id_mesa_ayuda AND aam_asignacion)LEFT JOIN usuario_atiende_mesa ON uam_id_area_atiende_mesa=id_area_atiende_mesa)"
        + "LEFT JOIN usuario ON mes_id_usuario=id_usuario)LEFT JOIN area ON id_area=mes_id_area)"
        + "INNER JOIN tipo_servicio ON id_tipo_servicio=mes_id_tipo_servicio WHERE area_atiende_mesa.aam_finalizo=1 "
        + "AND mes_id_usuario='"+idUsuario+"';";
  self.connection.query(query, done);
};

MesaAyudaController.prototype.cambiarAreaAtencion = function(json, done) {
  self.abstractModel.select("area_atiende_mesa", ["aam_id_area"], {
    aam_id_mesa_ayuda : json.aam_id_mesa_ayuda
  }, function(err, data) {
    if(!err) {
      if(data.length > 0) {
        if(json.aam_id_area != 0){
          self.abstractModel.update("area_atiende_mesa", {
            aam_id_area : json.aam_id_area
          }, {
            aam_id_mesa_ayuda : json.aam_id_mesa_ayuda
          }, done);
        } else {
          self.abstractModel.delete("area_atiende_mesa", {
            aam_id_mesa_ayuda : json.aam_id_mesa_ayuda
          }, done);
        }
      } else {
        self.abstractModel.insert("area_atiende_mesa", json, done);
      }
    }
  });
};

MesaAyudaController.prototype.asignarUsuarioMesa = function(idUsuario, idAreaAtiendeMesa, done) {
  self.abstractModel.insert("usuario_atiende_mesa", {
    uam_id_area_atiende_mesa : idAreaAtiendeMesa,
    uam_id_usuario : idUsuario
  }, done);
};

MesaAyudaController.prototype.eliminarUsuarioMesa = function(idUsuario, idAreaAtiendeMesa, done) {
  self.abstractModel.delete("usuario_atiende_mesa", {
    uam_id_area_atiende_mesa : idAreaAtiendeMesa,
    uam_id_usuario : idUsuario
  }, done);
};

MesaAyudaController.prototype.concluirServicio = function(jsonServicio, id_area_atiende_mesa, done) {
  query = "UPDATE area_atiende_mesa SET aam_finalizo=true,aam_soluciono="+jsonServicio.aam_soluciono
        + ",aam_observaciones='"+jsonServicio.aam_observaciones+"',aam_diagnostico='"
        + jsonServicio.aam_diagnostico + "',aam_acciones_tomadas='"+jsonServicio.aam_acciones_tomadas
        + "', amm_fecha_fin=CURRENT_TIMESTAMP WHERE id_area_atiende_mesa="+id_area_atiende_mesa;
  self.connection.query(query, done);
};

MesaAyudaController.prototype.create = function(jsonData, done) {
  self.abstractModel.insert(self.table, jsonData, done);
};

MesaAyudaController.prototype.update = function(jsonData, id_mesa_ayuda, done) {
  self.abstractModel.update(self.table, jsonData, {id_mesa_ayuda : id_mesa_ayuda}, done);
};

MesaAyudaController.prototype.delete = function(id_mesa_ayuda, done) {
  self.abstractModel.delete(self.table, { id_mesa_ayuda : id_mesa_ayuda }, done);
};


module.exports = new MesaAyudaController();
