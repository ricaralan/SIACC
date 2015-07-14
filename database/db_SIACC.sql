CREATE DATABASE db_siacc2;

use db_siacc2;

/**
* TABLE SYSTEM: Esta tabla contendrá los nombres de las tablas de la base de datos
*/
CREATE TABLE tabla_catalogo(
table_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
table_name VARCHAR(40) NOT NULL,
table_name_id VARCHAR(20) NOT NULL,
table_name_field VARCHAR(20) NOT NULL,
table_description VARCHAR(150)
);

/**
*	TABLE SYSTEM: El contenido de esta tabla estará por defecto en la instalación
* del sistema para que no afecten el funcionamiento del mismo...
* Ejemplos de modulos:
* - Control de usuarios
* - Control de inventarios
* - Control de accesos
* - Mesa de ayuda
*/
CREATE TABLE modulo_area(
id_modulo VARCHAR(15) NOT NULL PRIMARY KEY,
mod_table_id INT NOT NULL,
mod_nombre VARCHAR(30),
mod_descripcion VARCHAR(100),
FOREIGN KEY(mod_table_id) REFERENCES tabla_catalogo(table_id)
);

CREATE TABLE tipo_area(
id_tipo_area INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
tipo_nombre VARCHAR(30) NOT NULL
);

CREATE TABLE modulo_en_area();

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
INSERT INTO tipo_usuario(tipo_nombre) VALUES("Coordinador");
INSERT INTO tipo_usuario(tipo_nombre) VALUES("Encargado de area");
INSERT INTO tipo_usuario(tipo_nombre) VALUES("Maestro");
INSERT INTO tipo_usuario(tipo_nombre) VALUES("Directivo");
INSERT INTO tipo_usuario(tipo_nombre) VALUES("Servicio Social");
INSERT INTO tipo_usuario(tipo_nombre) VALUES("Alumno");
/**
* INSERT USUARIO DE PRUEBA
*/
INSERT INTO usuario(id_usuario, usu_id_area, usu_id_tipo_usuario, usu_usuario, usu_contrasena)
VALUES ("S11014636", 1, 1, "usuario", "secreto");
/**
* INSERTS TABLAS CATALOGOS
*/
INSERT INTO tabla_catalogo(table_name, table_name_id, table_name_field) VALUES("tipo_usuario", "tipo_id", "tipo_nombre");
/**
* INSERT modulos de las áreas
*/
INSERT INTO modulo_area(id_modulo, mod_table_id, mod_nombre) VALUES("usuarios",1, "Control de usuarios");
