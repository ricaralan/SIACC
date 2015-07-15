  CREATE DATABASE db_siacc2;

  use db_siacc2;

  /**
  * Modulos del sistema: El contenido de esta tabla estará por defecto en la instalación
  * del sistema para que no afecten el funcionamiento del mismo...
  * Ejemplos de modulos:
  * - Control de usuarios
  * - Control de inventarios
  * - Control de accesos
  * - Mesa de ayuda
  */
  CREATE TABLE modulo(
  id_modulo VARCHAR(25) NOT NULL PRIMARY KEY,
  mod_nombre VARCHAR(30),
  /**
  * TIPO (1,2,...)
  * la funcionalidad cambiara dependiendo el tipo dicha lógica se encontrará
  * implementada en el código...
  */
  mod_tipo int(1),
  mod_descripcion VARCHAR(200)
  );

  /**
  * Esta tabla guardará los tipos de áreas:
  * Ejemplos de tipos de áreas:
  * - Cubiculo
  * - Biblioteca
  * - Centro de computo
  */
  CREATE TABLE tipo_area(
  id_tipo_area INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  tipo_nombre VARCHAR(30) NOT NULL,
  tipo_descripcion VARCHAR(30) NOT NULL
  );

  /**
  * Esta tabla guardará los modulos que puede ver un área
  */
  CREATE TABLE modulo_en_area(
  moa_id_modulo VARCHAR(25) NOT NULL,
  moa_id_tipo_area INT NOT NULL,
  moa_area_controla_mod BOOLEAN NOT NULL,
  PRIMARY KEY(moa_id_modulo, moa_id_tipo_area),
  FOREIGN KEY(moa_id_modulo) REFERENCES modulo(id_modulo),
  FOREIGN KEY(moa_id_tipo_area) REFERENCES tipo_area(id_tipo_area)
  );

  CREATE TABLE area(
  id_area INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  are_centro_de_computo BOOLEAN,
  are_nombre VARCHAR(40) NOT NULL,
  are_total_computadoras INT,
  are_capacidad_alumnos INT,
  are_cuota_por_hora INT,
  are_descripcion VARCHAR(200)
  );

  CREATE TABLE tipo_usuario(
  tipo_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  /**
  * Esto se refiere a que si lo pueden ver varias áreas o solo lo puede ver el área que lo creo
  * Ej: Si un área registra un servicio social... Solo esa área puede ver a ese servicio social...
  * Esa y el area administradora jejejej
  */
  tipo_ver_por_varias_areas BOOLEAN NOT NULL,
  tipo_nombre VARCHAR(20) NOT NULL,
  tipo_descripcion VARCHAR(150)
  );

  CREATE TABLE usuario(
    id_usuario VARCHAR(10) NOT NULL PRIMARY KEY,
    usu_id_tipo_usuario INT NOT NULL,
    usu_id_area INT NOT NULL,
    usu_carrera VARCHAR(20),
    usu_nombre VARCHAR(30)NOT NULL,
    usu_primer_apellido VARCHAR(20) NOT NULL,
    usu_segundo_apellido VARCHAR(20) NOT NULL,
    usu_sexo VARCHAR(1) NOT NULL,
    usu_email VARCHAR(32),
    usu_foto VARCHAR(250),
    usu_usuario VARCHAR(20) NOT NULL,
    usu_contrasena VARCHAR(30) NOT NULL,
    FOREIGN KEY(usu_id_tipo_usuario) REFERENCES tipo_usuario(tipo_id),
    FOREIGN KEY(usu_id_area) REFERENCES area(id_area)
  );

  CREATE TABLE inventario(
  num_inventario VARCHAR(20) PRIMARY KEY,
  inv_id_area INT NOT NULL,
  inv_tipo INT(1) NOT NULL,
  inv_tipo_computadora INT(1),
  inv_num_maq INT(3),
  inv_ram double,
  inv_vel_procesador double,
  inv_capacidad double,
  inv_estado INT NOT NULL,
  inv_no_serie VARCHAR(20),
  inv_marca VARCHAR(30),
  inv_disponibilidad BOOLEAN,
  inv_descripcion VARCHAR(200),
  FOREIGN KEY(inv_id_area) REFERENCES area(id_area)
  );

  CREATE TABLE tipo_acceso(
  id_tipo_acceso INT NOT NULL AUTO_INCREMENT PRIMARY KEY,

  );

  # Esta tabla llevará el registro de ingreso de usuarios a los centros de computo.
  CREATE TABLE acceso_a_centro_de_computo(
  id_entrada INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  acc_id_usuario VARCHAR(9) NOT NULL,
  acc_id_inventario VARCHAR(20) NOT NULL,
  acc_fecha_registro date NOT NULL,
  acc_hora_inicio time NOT NULL,
  acc_hora_fin time NOT NULL,
  acc_tot_pago double,
  acc_salida BOOLEAN NOT NULL,
  FOREIGN KEY (acc_id_usuario) REFERENCES usuario (id_usuario),
  FOREIGN KEY (acc_id_inventario) REFERENCES inventario(num_inventario)
  );

  # Esta tabla llevará el registro de ingreso de usuarios a las areas.
  # Esto puede ser util para usar en una biblioteca o en un evento
  CREATE TABLE acceso_area(
  id_entrada INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  aa_id_usuario VARCHAR(9) NOT NULL,
  aa_fecha_registro date NOT NULL,
  aa_hora_inicio time NOT NULL,
  aa_hora_fin time NOT NULL,
  aa_salida BOOLEAN NOT NULL,
  FOREIGN KEY (aa_id_usuario) REFERENCES usuario (id_usuario)
  );


  /**
  * INSERT AREA DE PRUEBA
  */
  INSERT INTO area(are_nombre) VALUES("AREA DE PRUEBA");
  /**
  * INSERTS TIPOS DE USUARIO(CATALOGO)
  */
  INSERT INTO tipo_usuario(tipo_nombre, tipo_ver_por_varias_areas) VALUES("Coordinador", true);
  INSERT INTO tipo_usuario(tipo_nombre, tipo_ver_por_varias_areas) VALUES("Encargado de area", true);
  INSERT INTO tipo_usuario(tipo_nombre, tipo_ver_por_varias_areas) VALUES("Maestro", true);
  INSERT INTO tipo_usuario(tipo_nombre, tipo_ver_por_varias_areas) VALUES("Directivo", true);
  /*  El servicio social solo será vizualizado por el área que lo cree y por el Coordinador =) */
  INSERT INTO tipo_usuario(tipo_nombre, tipo_ver_por_varias_areas) VALUES("Servicio Social", false);
  INSERT INTO tipo_usuario(tipo_nombre, tipo_ver_por_varias_areas) VALUES("Alumno", true);
  /**
  * INSERT USUARIO DE PRUEBA
  */
  INSERT INTO usuario(id_usuario, usu_id_area, usu_id_tipo_usuario, usu_usuario, usu_contrasena)
  VALUES ("S11014636", 1, 1, "usuario", "secreto");

  /**
  * INSERT modulos de las áreas
  */
  INSERT INTO modulo(id_modulo, mod_nombre, mod_descripcion) VALUES("usuarios", "Control de usuarios", "Este módulo da acceso al control de usuarios, pero los tipos de usuarios permitidos se dan en otra tabla...");
  INSERT INTO modulo(id_modulo, mod_nombre, mod_descripcion) VALUES("inventarios", "Control de inventarios", "Este módulo controla los inventarios de el área");
  /* Control de acceso de tipo 1: controla solo el acceso a un área */
  INSERT INTO modulo(id_modulo, mod_nombre, mod_tipo, mod_descripcion) VALUES("acceso_simple", "Control de acceso", 1, "Control de acceso de tipo 1: controla solo el acceso a un área");
  /* Control de acceso de tipo 2: Controla acceso a un área y el uso de equipo de computo  */
  INSERT INTO modulo(id_modulo, mod_nombre, mod_tipo, mod_descripcion) VALUES("acceso_equipo_computo", "Control de acceso", 2, "Control de acceso de tipo 2: Controla acceso a un área y el uso de equipo de computo");
  /* Modulo de mesa de ayuda de tipo 1: Es control en modo administrador */
  INSERT INTO modulo(id_modulo, mod_nombre, mod_tipo, mod_descripcion) VALUES("mesa_ayuda_administrador", "Mesa de ayuda", 1, "Modulo de mesa de ayuda de tipo 1: Es control en modo administrador");
  /* Modulo de mesa de ayuda de tipo 1: Es control en modo solicitante de servicios */
  INSERT INTO modulo(id_modulo, mod_nombre, mod_tipo, mod_descripcion) VALUES("mesa_ayuda_solicitante", "Mesa de ayuda", 2, "Modulo de mesa de ayuda de tipo 2: Es control en modo solicitante de servicios");
