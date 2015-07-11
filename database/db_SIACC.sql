CREATE DATABASE db_siacc;

use db_siacc;

/**
* TABLE SYSTEM: Esta tabla contendrá los nombres de las tablas de la base de datos
*/
CREATE TABLE table_system(
table_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
table_name VARCHAR(40) NOT NULL,
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
id_modulo VARCHAR(15) NOT NULL AUTO_INCREMENT PRIMARY KEY,
mod_table_id INT NOT NULL,
mod_nombre VARCHAR(30),
mod_descripcion VARCHAR(100),
FOREIGN KEY(mod_table_id) REFERENCES table_system(table_id)
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

# Esta tabla servirá para que los permisos de cada usuario sean personalizables.
CREATE TABLE permisos_usuario(
id_permiso_usuario INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
per_ver BOOLEAN NOT NULL,
per_crear BOOLEAN NOT NULL,
per_modificar BOOLEAN NOT NULL,
per_eliminar BOOLEAN NOT NULL
);

# Esta tabla guardará a todos los usuarios del sistema (cualquier tipo).
CREATE TABLE usuario(
id_usuario VARCHAR(10) NOT NULL PRIMARY KEY,
usu_id_permiso_usuario INT NOT NULL,
usu_id_area INT NOT NULL,
usu_tipo_usuario INT(1) NOT NULL,
usu_carrera VARCHAR(20),
usu_nombre VARCHAR(30)NOT NULL,
usu_primer_apellido VARCHAR(20) NOT NULL,
usu_segundo_apellido VARCHAR(20) NOT NULL,
usu_sexo VARCHAR(1) NOT NULL,
usu_email VARCHAR(32),
usu_foto blob,
usu_usuario VARCHAR(20) NOT NULL,
usu_contrasena VARCHAR(30) NOT NULL,
FOREIGN KEY(usu_id_permiso_usuario) REFERENCES permisos_usuario(id_permiso_usuario),
FOREIGN KEY(usu_id_area) REFERENCES area(id_area)
);

# Tabla materia para los maestros(usuarios) -> el id_materia = NRC
CREATE TABLE materia(
id_materia VARCHAR(10) NOT NULL PRIMARY KEY,
mat_id_usuario VARCHAR(10) NOT NULL,
mat_nombre VARCHAR(35) NOT NULL,
FOREIGN KEY(mat_id_usuario) REFERENCES usuario(id_usuario)
);

# Esta tabla nos servirá para que un coordinador elija ver o no ver las notificaciones.
# de centros de computo especificos
CREATE TABLE notificacion_de_area(
not_id_usuario VARCHAR(10) NOT NULL,
not_id_area INT NOT NULL,
not_recibir_notificacion BOOLEAN NOT NULL,
PRIMARY KEY(not_id_usuario, not_id_area),
FOREIGN KEY (not_id_usuario) REFERENCES usuario (id_usuario),
FOREIGN KEY (not_id_area) REFERENCES area(id_area)
);

CREATE TABLE horario_cc(
id_horario_area INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
hor_id_area INT NOT NULL,
hor_id_usuario VARCHAR(10) NOT NULL,
hor_id_materia VARCHAR(10) NOT NULL,
hor_dia INT NOT NULL,
hor_hora INT NOT NULL,
hor_curso_materia VARCHAR(35) NOT NULL,
hor_fecha_inicio date NOT NULL,
hor_fecha_fin date NOT NULL,
FOREIGN KEY (hor_id_area) REFERENCES area(id_area),
FOREIGN KEY (hor_id_usuario) REFERENCES usuario(id_usuario)
);

# Esta tabla permitirá asignar un horario a un servicio social de un centro de computo.
CREATE TABLE horario_servicio_social(
id_horario_servicio INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
hor_id_usuario VARCHAR(9) NOT NULL,
hor_id_area INT NOT NULL,
hor_dia INT NOT NULL,
hor_hora INT NOT NULL,
hor_fecha_inicio date NOT NULL,
hor_fecha_fin date NOT NULL,
FOREIGN KEY (hor_id_usuario) REFERENCES usuario(id_usuario),
FOREIGN KEY (hor_id_area) REFERENCES area(id_area)
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

# Esta tabla llevará el registro de ingreso de usuarios a los centros de computo.
CREATE TABLE entrada_a_centro_de_computo(
id_entrada INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
rac_id_usuario VARCHAR(9) NOT NULL,
rac_id_inventario VARCHAR(20) NOT NULL,
rac_fecha_registro date NOT NULL,
rac_hora_inicio time NOT NULL,
rac_hora_fin time NOT NULL,
rac_tot_pago double,
rac_salida BOOLEAN NOT NULL,
FOREIGN KEY (rac_id_usuario) REFERENCES usuario (id_usuario),
FOREIGN KEY (rac_id_inventario) REFERENCES inventario(num_inventario)
);

# Catalogo de listas para la mesa de ayuda - tareas
CREATE TABLE lista_trabajo(
id_lista_trabajo INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
lis_nombre VARCHAR(30) NOT NULL
);

# Esta tabla nos ayudará a registrar un problema/tarea en la mesa de ayuda.
CREATE TABLE tarea_lista(
id_tarea_lista INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
tar_id_lista_trabajo INT NOT NULL,
tar_id_area INT NOT NULL,
tar_nombre VARCHAR(200) NOT NULL,
tar_importancia INT NOT NULL,
tar_estado INT NOT NULL,
tar_solucion VARCHAR(200),
FOREIGN KEY(tar_id_lista_trabajo) REFERENCES lista_trabajo(id_lista_trabajo),
FOREIGN KEY(tar_id_area) REFERENCES area(id_area)
);

# Esta tabla nos servirá para saber quien o quienes dieron solución a un problema/tarea.
# de la mesa de ayuda
CREATE TABLE usuario_asignado_tarea(
ust_id_tarea_lista INT NOT NULL,
ust_id_usuario VARCHAR(9) NOT NULL,
PRIMARY KEY(ust_id_usuario, ust_id_tarea_lista),
FOREIGN KEY(ust_id_tarea_lista) REFERENCES tarea_lista(id_tarea_lista),
FOREIGN KEY(ust_id_usuario) REFERENCES usuario(id_usuario)
);

CREATE TABLE mesa_de_ayuda(
id_mesa_de_ayuda VARCHAR(13) NOT NULL PRIMARY KEY,
mes_id_area INT(3) NOT NULL,
mes_id_usuario VARCHAR(9) NOT NULL,
mes_tipo_servicio INT(1) NOT NULL,
mes_otro_tipo_servicio VARCHAR(30),
mes_fecha_solicitado datetime,
mes_fecha_limite datetime,
mes_fecha_solucionado datetime,
mes_estado INT(1),
mes_atendido BOOLEAN,
mes_importancia INT(1),
mes_descripcion_problema VARCHAR(250),
FOREIGN KEY(mes_id_area) REFERENCES area(id_area),
FOREIGN KEY(mes_id_usuario) REFERENCES usuario(id_usuario)
);

CREATE TABLE area_asignada_mesa_ayuda(
aam_id_mesa_de_ayuda  VARCHAR(13) NOT NULL,
aam_id_area INT NOT NULL,
aam_atendiendo BOOLEAN,
aam_fecha_asinacion datetime,
PRIMARY KEY(aam_id_mesa_de_ayuda, aam_id_area),
FOREIGN KEY(aam_id_mesa_de_ayuda) REFERENCES mesa_de_ayuda(id_mesa_de_ayuda),
FOREIGN KEY(aam_id_area) REFERENCES area(id_area)
);

CREATE TABLE servicio_asignado_mesa_ayuda(
uam_id_usuario VARCHAR(10) NOT NULL,
uam_id_mesa_ayuda VARCHAR(13) NOT NULL,
fecha_asignado date NOT NULL,
evaluacion_rapidez_solucion INT(1),
PRIMARY KEY(uam_id_usuario, uam_id_mesa_ayuda),
FOREIGN KEY(uam_id_usuario) REFERENCES usuario(id_usuario),
FOREIGN KEY(uam_id_mesa_ayuda) REFERENCES mesa_de_ayuda(id_mesa_de_ayuda)
);



# Al selectionar todo esto y ejecutarlo se creará el usuario admin
# Que podrá hacer todo ver, crear, modificar y eliminar para así comenzar a
# utilizar el sistema.

# Coordinador
INSERT INTO permisos_usuario(id_permiso_usuario, per_ver, per_crear, per_modificar, per_eliminar)
values(1, true, true, true, true);

# Directivo
INSERT INTO permisos_usuario(id_permiso_usuario, per_ver, per_crear, per_modificar, per_eliminar)
values(2, true, false, false, false);

# Servicio Social
INSERT INTO permisos_usuario(id_permiso_usuario, per_ver, per_crear, per_modificar, per_eliminar)
values(3, true, true, true, true);

# Maestro
INSERT INTO permisos_usuario(id_permiso_usuario, per_ver, per_crear, per_modificar, per_eliminar)
values(4, true, true, true, true);

# Alumno
INSERT INTO permisos_usuario(id_permiso_usuario, per_ver, per_crear, per_modificar, per_eliminar)
values(5, true, false, false, false);

# Encargado de area
INSERT INTO permisos_usuario(id_permiso_usuario, per_ver, per_crear, per_modificar, per_eliminar)
values(6, true, true, true, true);


INSERT INTO area(id_area, are_nombre, are_centro_de_computo, are_descripcion)
VALUES(1, "Sin area!!", 1, "Este registro simula un centro de computo, solo sera para el funcionamiento del sistema... para que la llave foranea de un usuario no sea nula... NO ELIMINAR!!!");



INSERT INTO usuario(id_usuario, usu_tipo_usuario, usu_id_permiso_usuario, usu_id_area, usu_usuario, usu_contrasena)
VALUES ("S11014636", 1, 1, 1, "admin", "secreto");






















* - Control de usuarios
* - Control de inventarios
* - Control de accesos
*/
CREATE TABLE modulo_area(
id_modulo VARCHAR(20) NOT NULL AUTO_INCREMENT PRIMARY KEY,
mod_nombre VARCHAR(30),
mod_descripcion VARCHAR(100)
);





/**
* SYSTEM INSERTS (DON'T CHANGE - NO CAMBIAR!!)
*/
INSERT INTO modulo_area(id_modulo, mod_nombre, mod_descripcion)
VALUES("users_control", "Control de usuarios", "Permitir que puedan tener un control sobre tipos usuarios especificos");

INSERT INTO modulo_area(id_modulo, mod_nombre, mod_descripcion)
VALUES("inventarios_control", "", "");

INSERT INTO modulo_area(id_modulo, mod_nombre, mod_descripcion)
VALUES("access_control", "Control de acceso", "Permitir que se pueda tener un control de acceso");
