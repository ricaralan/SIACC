  CREATE DATABASE db_siacc2
  DEFAULT CHARACTER SET utf8
  DEFAULT COLLATE utf8_general_ci;

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
  mod_nombre VARCHAR(80),
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
  tipo_descripcion VARCHAR(30) NOT NULL,
  tipo_imagen VARCHAR(250) NOT NULL
  );

  CREATE TABLE area(
  id_area INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  are_id_tipo_area INT NOT NULL,
  are_nombre VARCHAR(40) NOT NULL,
  are_descripcion VARCHAR(200),
  FOREIGN KEY(are_id_tipo_area) REFERENCES tipo_area(id_tipo_area)
  );

  CREATE TABLE tipo_usuario(
  id_tipo_usuario INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  tipo_asignar_area BOOLEAN,
  tipo_asignar_carrera BOOLEAN,
  tipo_nombre VARCHAR(20) NOT NULL,
  tipo_descripcion VARCHAR(150)
  );

  /**
  * Esta tabla guardará los modulos que puede ver un tipo de usuario
  */
  CREATE TABLE permiso_modulo_usuario(
  moa_id_modulo VARCHAR(25) NOT NULL,
  moa_id_tipo_usuario INT NOT NULL,
  moa_area_controla_mod BOOLEAN NOT NULL,
  PRIMARY KEY(moa_id_modulo, moa_id_tipo_usuario),
  FOREIGN KEY(moa_id_modulo) REFERENCES modulo(id_modulo),
  FOREIGN KEY(moa_id_tipo_usuario) REFERENCES tipo_usuario(id_tipo_usuario)
  );

  CREATE TABLE carrera(
  id_carrera INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  car_nombre VARCHAR(60)
  );

  CREATE TABLE usuario(
    id_usuario VARCHAR(10) NOT NULL PRIMARY KEY,
    usu_id_tipo_usuario INT,
    usu_id_carrera INT,
    usu_carrera VARCHAR(20),
    usu_nombre VARCHAR(30)NOT NULL,
    usu_primer_apellido VARCHAR(20) NOT NULL,
    usu_segundo_apellido VARCHAR(20) NOT NULL,
    usu_sexo VARCHAR(1) NOT NULL,
    usu_email VARCHAR(32),
    usu_foto VARCHAR(250),
    usu_usuario VARCHAR(20) UNIQUE,
    usu_contrasena VARCHAR(30),
    FOREIGN KEY(usu_id_tipo_usuario) REFERENCES tipo_usuario(id_tipo_usuario),
    FOREIGN KEY(usu_id_carrera) REFERENCES carrera(id_carrera)
  );

  /**
  * Esta tabla almacenará las relaciones entre los usuarios y las áreas, lo que
  * permite saber a que área pertenece un usuario
  **/
  CREATE TABLE usuario_area(
    usa_id_area INT NOT NULL,
    usa_id_usuario VARCHAR(10) NOT NULL,
    PRIMARY KEY(usa_id_area, usa_id_usuario),
    FOREIGN KEY(usa_id_area) REFERENCES area(id_area),
    FOREIGN KEY(usa_id_usuario) REFERENCES usuario(id_usuario)
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
  id_tipo_acceso INT NOT NULL AUTO_INCREMENT PRIMARY KEY

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
  * INSERTS TIPOS DE USUARIO(CATALOGO)
  */
  INSERT INTO tipo_usuario(tipo_nombre) VALUES("Coordinador");
  INSERT INTO tipo_usuario(tipo_nombre) VALUES("Encargado de area");
  INSERT INTO tipo_usuario(tipo_nombre) VALUES("Maestro");
  INSERT INTO tipo_usuario(tipo_nombre) VALUES("Directivo");
  /*  El servicio social solo será vizualizado por el área que lo cree y por el Coordinador =) */
  INSERT INTO tipo_usuario(tipo_nombre) VALUES("Servicio Social");
  INSERT INTO tipo_usuario(tipo_nombre) VALUES("Alumno");

  /**
  * INSERT modulos de las áreas
  */
  INSERT INTO modulo(id_modulo, mod_nombre, mod_descripcion) VALUES("usuarios", "Control de usuarios", "Este módulo da acceso al control de usuarios, pero los tipos de usuarios permitidos se dan en otra tabla...");
  INSERT INTO modulo(id_modulo, mod_nombre, mod_descripcion) VALUES("inventarios", "Control de inventarios", "Este módulo controla los inventarios de el área");
  /* Control de acceso de tipo 1: controla solo el acceso a un área */
  INSERT INTO modulo(id_modulo, mod_nombre, mod_tipo, mod_descripcion) VALUES("acceso_simple", "Control de acceso de usuarios", 1, "Control de acceso de tipo 1: controla solo el acceso a un área");
  /* Control de acceso de tipo 2: Controla acceso a un área y el uso de equipo de computo  */
  INSERT INTO modulo(id_modulo, mod_nombre, mod_tipo, mod_descripcion) VALUES("acceso_equipo_computo", "Control de acceso de usuarios y uso de equipo de computo", 2, "Control de acceso de tipo 2: Controla acceso a un área y el uso de equipo de computo");
  /* Modulo de mesa de ayuda de tipo 1: Es control en modo administrador */
  INSERT INTO modulo(id_modulo, mod_nombre, mod_tipo, mod_descripcion) VALUES("mesa_ayuda_administrador", "Mesa de ayuda en modo administrador", 1, "Modulo de mesa de ayuda de tipo 1: Es control en modo administrador");
  /* Modulo de mesa de ayuda de tipo 1: Es control en modo solicitante de servicios */
  INSERT INTO modulo(id_modulo, mod_nombre, mod_tipo, mod_descripcion) VALUES("mesa_ayuda_solicitante", "Mesa de ayuda en modo solicitante", 2, "Modulo de mesa de ayuda de tipo 2: Es control en modo solicitante de servicios");



  /*****************************************************************************
  * INSERT TIPO DE ÁREA
  *****************************************************************************/
  INSERT INTO tipo_area(tipo_nombre, tipo_imagen) VALUES("TIPO DE ÁREA PRINCIPAL", "/images/system/escritorio-area.png");
  /*****************************************************************************
  * INSERT AREA DE PRUEBA
  *****************************************************************************/
  INSERT INTO area(are_nombre, are_id_tipo_area) VALUES("AREA DE PRUEBA", 1);

  /*****************
  * INSERT MÓDULO EN ÁREA(MÓDULOS QUE CONTROLA EL ÁREA PRINCIPAL)
  INSERT INTO modulo_en_area(moa_id_tipo_area, moa_id_modulo, moa_area_controla_mod) VALUES(1, "usuarios", 1);
  INSERT INTO modulo_en_area(moa_id_tipo_area, moa_id_modulo, moa_area_controla_mod) VALUES(1, "inventarios", 1);
  INSERT INTO modulo_en_area(moa_id_tipo_area, moa_id_modulo, moa_area_controla_mod) VALUES(1, "acceso_simple", 0);
  INSERT INTO modulo_en_area(moa_id_tipo_area, moa_id_modulo, moa_area_controla_mod) VALUES(1, "acceso_equipo_computo", 1);
  INSERT INTO modulo_en_area(moa_id_tipo_area, moa_id_modulo, moa_area_controla_mod) VALUES(1, "mesa_ayuda_administrador", 1);
  INSERT INTO modulo_en_area(moa_id_tipo_area, moa_id_modulo, moa_area_controla_mod) VALUES(1, "mesa_ayuda_solicitante", 1);
  *****************************************************************************/

  /*****************************************************************************
  * INSERT USUARIO DE PRUEBA
  *****************************************************************************/
  INSERT INTO usuario(id_usuario, usu_id_tipo_usuario, usu_usuario, usu_contrasena)
  VALUES ("S11014636", 1, "usuario", "secreto");
