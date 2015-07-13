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

/**
* Con esta consulta se obtiene el nombre del módulo, el nombre de tabla(catalogo)
* de la que depende y el nombre del field de la tabla(catalogo)
*/
SELECT id_modulo, mod_nombre, table_name, table_name_id, table_name_field FROM (modulo_area INNER JOIN
tabla_catalogo ON mod_table_id=table_id), (select );
