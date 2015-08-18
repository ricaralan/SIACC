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
  CREATE TABLE permiso(
  id_permiso VARCHAR(25) NOT NULL PRIMARY KEY,
  per_nombre VARCHAR(80),
  per_nombre_corto VARCHAR(50),
  per_url VARCHAR(70),
  per_descripcion VARCHAR(200)
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
  CREATE TABLE permiso_asignado(
  id_permiso_asignado INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  moa_id_permiso VARCHAR(25) NOT NULL,
  /* Asignación de permiso a usuario */
  moa_id_tipo_usuario INT,
  /* ó asignación a un tipo de área */
  moa_id_tipo_area INT,
  /**
  * En caso de ser centro de cómputo solo el permiso de ver...
  * Si es un usuario se tienen que tomar en cuenta el ver, eliminar,editar y eliminar
  **********/
  moa_ver BOOLEAN,
  moa_crear BOOLEAN,
  moa_editar BOOLEAN,
  moa_eliminar BOOLEAN,
  FOREIGN KEY(moa_id_permiso) REFERENCES permiso(id_permiso),
  FOREIGN KEY(moa_id_tipo_usuario) REFERENCES tipo_usuario(id_tipo_usuario),
  FOREIGN KEY(moa_id_tipo_area) REFERENCES tipo_area(id_tipo_area)
  );

  CREATE TABLE carrera(
  id_carrera INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  car_nombre VARCHAR(60)
  );

  CREATE TABLE usuario(
    id_usuario VARCHAR(10) NOT NULL PRIMARY KEY,
    usu_id_tipo_usuario INT,
    usu_id_area INT,
    usu_id_carrera INT,
    usu_carrera VARCHAR(20),
    usu_nombre VARCHAR(30),
    usu_primer_apellido VARCHAR(20),
    usu_segundo_apellido VARCHAR(20),
    usu_sexo VARCHAR(1),
    usu_email VARCHAR(32),
    usu_foto VARCHAR(250),
    usu_usuario VARCHAR(20) UNIQUE,
    usu_contrasena VARCHAR(30),
    FOREIGN KEY(usu_id_tipo_usuario) REFERENCES tipo_usuario(id_tipo_usuario),
    FOREIGN KEY(usu_id_area) REFERENCES area(id_area),
    FOREIGN KEY(usu_id_carrera) REFERENCES carrera(id_carrera)
  );

  CREATE TABLE materia(
    /* id_materia == NRC */
    id_materia VARCHAR(10) NOT NULL PRIMARY KEY,
    mat_nombre VARCHAR(40) NOT NULL,
    mat_descripcion VARCHAR(200)
  );

  /**
  * Esta tabla ayuda a saber las materias que imparte un usuario
  */
  CREATE TABLE usuario_materia(
    uma_id_usuario VARCHAR(10) NOT NULL,
    uma_id_materia VARCHAR(10) NOT NULL,
    uma_status TINYINT DEFAULT 1,
    uma_fecha_inicio TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    uma_fecha_fin TIMESTAMP,
    PRIMARY KEY(uma_id_usuario, uma_id_materia),
    FOREIGN KEY(uma_id_usuario) REFERENCES usuario(id_usuario),
    FOREIGN KEY(uma_id_materia) REFERENCES materia(id_materia)
  );

  /**
  * Esta tabla guardará el horario de el usuario en un área
  * donde podremos saber el horario de atención en un área
  * y el horario de clases en un área
  **/
  CREATE TABLE horario_area(
    hua_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    hua_id_area INT NOT NULL,
    hua_id_usuario VARCHAR(10) NOT NULL,
    hua_id_materia VARCHAR(10),
    /**
    * hua_tipo == 1: Horario de usuario en área
    * hua_tipo == 2: Horario de clase de área
    */
    hua_tipo INT,
    hua_dia INT NOT NULL,
    hua_hora INT NOT NULL,
    hua_fecha_inicio DATE,
    hua_fecha_fin DATE,
    FOREIGN KEY(hua_id_area) REFERENCES area(id_area),
    FOREIGN KEY(hua_id_usuario) REFERENCES usuario(id_usuario),
    FOREIGN KEY(hua_id_materia) REFERENCES materia(id_materia)
  );

  CREATE TABLE tipo_inventario(
    id_tipo_inventario INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    tin_nombre VARCHAR(40) NOT NULL,
    tin_descripcion VARCHAR(250),
    tin_foto VARCHAR(200),
    tin_es_computadora BOOLEAN NOT NULL
  );

  CREATE TABLE inventario(
  num_inventario VARCHAR(20) PRIMARY KEY,
  inv_id_area INT,
  inv_tipo INT(2) NOT NULL,
  inv_usar_control_acceso BOOLEAN,
  inv_num_maq INT(3),
  inv_ram double,
  inv_procesador VARCHAR(20),
  inv_vel_procesador double,
  inv_capacidad double,
  inv_estado INT NOT NULL DEFAULT 1,
  inv_no_serie VARCHAR(20),
  inv_marca VARCHAR(30),
  inv_status TINYINT NOT NULL DEFAULT 1,
  inv_disponibilidad BOOLEAN,
  inv_descripcion VARCHAR(200),
  FOREIGN KEY(inv_id_area) REFERENCES area(id_area),
  FOREIGN KEY(inv_tipo) REFERENCES tipo_inventario(id_tipo_inventario)
  );

  /**
  * Este historial permitirá saber por que áreas a pasado un elemento de inventario
  */
  CREATE TABLE historial_inventario_area(
  id_historial INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  hia_id_inventario VARCHAR(20) NOT NULL,
  hia_id_area INT NOT NULL,
  hia_fecha_inicio TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  hia_fecha_fin TIMESTAMP,
  FOREIGN KEY(hia_id_inventario) REFERENCES inventario(num_inventario),
  FOREIGN KEY(hia_id_area) REFERENCES area(id_area)
  );

  /**
  * Prestamos de equipo a un usuario
  */
  CREATE TABLE resguardo_inventario(
  id_resguardo INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  rin_num_inventario VARCHAR(20) NOT NULL,
  rin_id_usuario VARCHAR(10) NOT NULL,
  rin_fecha_inicio TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  rin_fecha_fin TIMESTAMP,
  FOREIGN KEY(rin_num_inventario) REFERENCES inventario(num_inventario),
  FOREIGN KEY(rin_id_usuario) REFERENCES usuario(id_usuario)
  );

  # Esta tabla llevará el registro de ingreso de usuarios a las areás
  CREATE TABLE acceso_area(
  id_acceso INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  acc_id_area INT NOT NULL,
  acc_id_usuario VARCHAR(10) NOT NULL,
  acc_id_inventario VARCHAR(20),
  acc_fecha_registro date NOT NULL,
  acc_hora_inicio time NOT NULL,
  acc_hora_fin time NOT NULL,
  FOREIGN KEY (acc_id_area) REFERENCES area(id_area),
  FOREIGN KEY (acc_id_usuario) REFERENCES usuario(id_usuario),
  FOREIGN KEY (acc_id_inventario) REFERENCES inventario(num_inventario)
  );

  /**
  * TIPOS DE SERVICIO EN LA MESA DE AYUDA
  */
  CREATE TABLE tipo_servicio(
  id_tipo_servicio INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  tse_nombre VARCHAR(40) NOT NULL,
  tse_descripcion VARCHAR(200)
  );

  /*
  * Peticiones de las áreas
  **/
  CREATE TABLE mesa_ayuda(
  id_mesa_ayuda INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  mes_id_area INT,/* En que área se solicitó */
  mes_id_usuario VARCHAR(10) NOT NULL,/* Quien lo solicitó */
  mes_id_tipo_servicio INT,/* Que tipo de servicio requiren */
  mes_otro_tipo_servicio VARCHAR(50),
  mes_fecha_solicitado TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  mes_fecha_limite TIMESTAMP,
  mes_fecha_solucionado TIMESTAMP,
  mes_estado TINYINT DEFAULT 1,
  mes_importancia TINYINT DEFAULT 3,
  mes_descripcion_problema VARCHAR(150),
  FOREIGN KEY(mes_id_area) REFERENCES area(id_area),
  FOREIGN KEY(mes_id_usuario) REFERENCES usuario(id_usuario),
  FOREIGN KEY(mes_id_tipo_servicio) REFERENCES tipo_servicio(id_tipo_servicio)
  );

  /*
  * Esta tabla nos permitirá saber que área atiende que problemas de la mesa de ayuda
  **/
  CREATE TABLE area_atiende_mesa(
  aam_id_area INT NOT NULL,
  aam_id_mesa_ayuda INT NOT NULL,
  aam_fecha_asignación TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  aam_diagnostico VARCHAR(150),
  aam_acciones_tomadas VARCHAR(150),
  aam_observaciones VARCHAR(150),
  aam_soluciono BOOLEAN,
  PRIMARY KEY(aam_id_area, aam_id_mesa_ayuda),
  FOREIGN KEY(aam_id_area) REFERENCES area(id_area),
  FOREIGN KEY(aam_id_mesa_ayuda) REFERENCES mesa_ayuda(id_mesa_ayuda)
  );

  CREATE TABLE usuario_atiende_mesa(
  uam_id_area_atiende_mesa INT NOT NULL,
  uam_id_usuario VARCHAR(10) NOT NULL,
  uam_fecha_asignacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY(uam_id_area_atiende_mesa, uam_id_usuario)
  );



  /**
  * INSERTS CARRERAS
  **/
  INSERT INTO carrera(car_nombre) VALUES("Sistemas computacionales administrativos");
  INSERT INTO carrera(car_nombre) VALUES("Contaduría");
  INSERT INTO carrera(car_nombre) VALUES("Administración");
  INSERT INTO carrera(car_nombre) VALUES("Gestión");
  INSERT INTO carrera(car_nombre) VALUES("Otro");

  /**
  * INSERTS TIPOS DE USUARIO(CATALOGO)
  */
  INSERT INTO tipo_usuario(tipo_nombre) VALUES("Coordinador");
  INSERT INTO tipo_usuario(tipo_nombre, tipo_asignar_area) VALUES("Encargado de area", true);
  INSERT INTO tipo_usuario(tipo_nombre) VALUES("Maestro");
  INSERT INTO tipo_usuario(tipo_nombre) VALUES("Directivo");
  /*  El servicio social solo será vizualizado por el área que lo cree y por el Coordinador =) */
  INSERT INTO tipo_usuario(tipo_nombre, tipo_asignar_carrera, tipo_asignar_area) VALUES("Servicio Social", true, true);
  INSERT INTO tipo_usuario(tipo_nombre, tipo_asignar_carrera) VALUES("Alumno", true);

  /**
  * INSERTS permisos
  */

  INSERT INTO permiso(id_permiso, per_nombre, per_nombre_corto, per_url, per_descripcion) VALUES("asignacion_materias", "Asignación de materias","materias", "/materias", "Esto permite saber las materias que imparte un usuario");

  INSERT INTO permiso(id_permiso, per_nombre, per_nombre_corto, per_url, per_descripcion) VALUES("usuarios", "Control de usuarios", "usuarios", "/usuarios", "Este módulo da acceso al control de usuarios, pero los tipos de usuarios permitidos se dan en otra tabla...");
  INSERT INTO permiso(id_permiso, per_nombre, per_nombre_corto, per_url, per_descripcion) VALUES("inventarios", "Control de inventarios", "inventarios", "/inventarios", "Este módulo controla los inventarios de el área");
  /* Control de acceso de tipo 1: controla solo el acceso a un área */
  INSERT INTO permiso(id_permiso, per_nombre, per_nombre_corto, per_url, per_descripcion) VALUES("acceso_simple", "Control de acceso de usuarios", "control acceso simple", "/acceso_area", "Control de acceso de tipo 1: controla solo el acceso a un área");
  /* Control de acceso de tipo 2: Controla acceso a un área y el uso de equipo de computo  */
  INSERT INTO permiso(id_permiso, per_nombre, per_nombre_corto, per_url, per_descripcion) VALUES("acceso_equipo_computo", "Control de acceso de usuarios y uso de equipo de computo", "control acceso inventario", "/acceso_area", "Control de acceso de tipo 2: Controla acceso a un área y el uso de equipo de computo");
  /* Modulo de mesa de ayuda de tipo 1: Es control en modo administrador */
  INSERT INTO permiso(id_permiso, per_nombre, per_nombre_corto, per_url, per_descripcion) VALUES("mesa_ayuda_administrador", "Mesa de ayuda en modo administrador", "mesa de ayuda", "/acceso_area", "Modulo de mesa de ayuda de tipo 1: Es control en modo administrador");
  /* Modulo de mesa de ayuda de tipo 1: Es control en modo solicitante de servicios */
  INSERT INTO permiso(id_permiso, per_nombre, per_nombre_corto, per_url, per_descripcion) VALUES("mesa_ayuda_solicitante", "Mesa de ayuda en modo solicitante", "mesa de ayuda", "/mesa_ayuda", "Modulo de mesa de ayuda de tipo 2: Es control en modo solicitante de servicios");
  /* Modulo de mesa de ayuda de tipo 1: Es control en modo solicitante de servicios */
  INSERT INTO permiso(id_permiso, per_nombre, per_nombre_corto, per_url, per_descripcion) VALUES("system_config", "Configuraciones que mueven el sistema", "configuraciones", "/configuraciones", "Configuraciones de todo el sistema");
  /* Modulo de mesa de ayuda de tipo 1: Es control en modo solicitante de servicios */
  INSERT INTO permiso(id_permiso, per_nombre, per_nombre_corto, per_url, per_descripcion) VALUES("areas", "Areas", "areas", "/areas", "Muestra todas las áreas");

  /*****************************************************************************
  * INSERT TIPO DE ÁREA
  *****************************************************************************/
  INSERT INTO tipo_area(tipo_nombre, tipo_imagen) VALUES("TIPO DE ÁREA PRINCIPAL", "/images/system/escritorio-area.png");
  /*****************************************************************************
  * INSERT AREA DE PRUEBA
  *****************************************************************************/
  INSERT INTO area(are_nombre, are_id_tipo_area) VALUES("AREA DE PRUEBA", 1);

  /***
  * INSERTS TIPOS DE INVENTARIO
  *********************/
  INSERT INTO tipo_inventario(tin_nombre, tin_descripcion,tin_foto,tin_es_computadora) VALUES("Computadora","","/images/tipos_inventarios/computadora.png", true);
  INSERT INTO tipo_inventario(tin_nombre, tin_descripcion,tin_foto,tin_es_computadora) VALUES("Multifuncional","","/images/tipos_inventarios/multifuncional.png", false);
  INSERT INTO tipo_inventario(tin_nombre, tin_descripcion,tin_foto,tin_es_computadora) VALUES("Impresora","","/images/tipos_inventarios/impresora.jpg", false);
  INSERT INTO tipo_inventario(tin_nombre, tin_descripcion,tin_foto,tin_es_computadora) VALUES("Proyector","","/images/tipos_inventarios/proyector.jpg", false);
  INSERT INTO tipo_inventario(tin_nombre, tin_descripcion,tin_foto,tin_es_computadora) VALUES("Otro","","/images/system/inventarios.jpg", false);

  /**
  * INSERTS TIPOS DE SERVICIOS(MESA DE AYUDA)
  *****/
  INSERT INTO tipo_servicio(tse_nombre, tse_descripcion) VALUES("Problema de red","");
  INSERT INTO tipo_servicio(tse_nombre, tse_descripcion) VALUES("Problema de hardware","");
  INSERT INTO tipo_servicio(tse_nombre, tse_descripcion) VALUES("Problema de software","");
  INSERT INTO tipo_servicio(tse_nombre, tse_descripcion) VALUES("Infección de virus","");

  /*****************************************************************************
  * INSERT USUARIO DE PRUEBA
  *****************************************************************************/
  INSERT INTO usuario(id_usuario, usu_id_tipo_usuario, usu_usuario, usu_contrasena, usu_foto)
  VALUES ("S11014636", 1, "usuario", "secreto", "/images/system/icon-user.png");
