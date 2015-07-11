create database db_siacc;

use db_siacc;

create table area(
id_area int not null auto_increment primary key,
are_centro_de_computo boolean,
are_nombre varchar(40) not null,
are_total_computadoras int,
are_capacidad_alumnos int,
are_cuota_por_hora int,
are_descripcion varchar(200)
);

# Esta tabla servirá para que los permisos de cada usuario sean personalizables.
create table permisos_usuario(
id_permiso_usuario int not null auto_increment primary key,
per_ver boolean not null,
per_crear boolean not null,
per_modificar boolean not null,
per_eliminar boolean not null
);

# Esta tabla guardará a todos los usuarios del sistema (cualquier tipo).
create table usuario(
id_usuario varchar(10) not null primary key,
usu_id_permiso_usuario int not null,
usu_id_area int not null,
usu_tipo_usuario int(1) not null,
usu_carrera varchar(20),
usu_nombre varchar(30)not null,
usu_primer_apellido varchar(20) not null,
usu_segundo_apellido varchar(20) not null,
usu_sexo varchar(1) not null,
usu_email varchar(32),
usu_foto blob,
usu_usuario varchar(20) not null,
usu_contrasena varchar(30) not null,
foreign key(usu_id_permiso_usuario) references permisos_usuario(id_permiso_usuario),
foreign key(usu_id_area) references area(id_area)
);

# Tabla materia para los maestros(usuarios) -> el id_materia = NRC
create table materia(
id_materia varchar(10) not null primary key,
mat_id_usuario varchar(10) not null,
mat_nombre varchar(35) not null,
foreign key(mat_id_usuario) references usuario(id_usuario)
);

# Esta tabla nos servirá para que un coordinador elija ver o no ver las notificaciones.
# de centros de computo especificos
create table notificacion_de_area(
not_id_usuario varchar(10) not null,
not_id_area int not null,
not_recibir_notificacion boolean not null,
primary key(not_id_usuario, not_id_area),
foreign key (not_id_usuario) references usuario (id_usuario),
foreign key (not_id_area) references area(id_area)
);

create table horario_cc(
id_horario_area int not null auto_increment primary key,
hor_id_area int not null,
hor_id_usuario varchar(10) not null,
hor_id_materia varchar(10) not null,
hor_dia int not null,
hor_hora int not null,
hor_curso_materia varchar(35) not null,
hor_fecha_inicio date not null,
hor_fecha_fin date not null,
foreign key (hor_id_area) references area(id_area),
foreign key (hor_id_usuario) references usuario(id_usuario)
);

# Esta tabla permitirá asignar un horario a un servicio social de un centro de computo.
create table horario_servicio_social(
id_horario_servicio int not null auto_increment primary key,
hor_id_usuario varchar(9) not null,
hor_id_area int not null,
hor_dia int not null,
hor_hora int not null,
hor_fecha_inicio date not null,
hor_fecha_fin date not null,
foreign key (hor_id_usuario) references usuario(id_usuario),
foreign key (hor_id_area) references area(id_area)
);


create table inventario(
num_inventario varchar(20) primary key,
inv_id_area int not null,
inv_tipo int(1) not null,
inv_tipo_computadora int(1),
inv_num_maq int(3),
inv_ram double,
inv_vel_procesador double,
inv_capacidad double,
inv_estado int not null,
inv_no_serie varchar(20),
inv_marca varchar(30),
inv_disponibilidad boolean,
inv_descripcion varchar(200),
foreign key(inv_id_area) references area(id_area)
);

# Esta tabla llevará el registro de ingreso de usuarios a los centros de computo.
create table entrada_a_centro_de_computo(
id_entrada int not null auto_increment primary key,
rac_id_usuario varchar(9) not null,
rac_id_inventario varchar(20) not null,
rac_fecha_registro date not null,
rac_hora_inicio time not null,
rac_hora_fin time not null,
rac_tot_pago double,
rac_salida boolean not null,
foreign key (rac_id_usuario) references usuario (id_usuario),
foreign key (rac_id_inventario) references inventario(num_inventario)
);

# Catalogo de listas para la mesa de ayuda - tareas
create table lista_trabajo(
id_lista_trabajo int not null auto_increment primary key,
lis_nombre varchar(30) not null
);

# Esta tabla nos ayudará a registrar un problema/tarea en la mesa de ayuda.
create table tarea_lista(
id_tarea_lista int not null auto_increment primary key,
tar_id_lista_trabajo int not null,
tar_id_area int not null,
tar_nombre varchar(200) not null,
tar_importancia int not null,
tar_estado int not null,
tar_solucion varchar(200),
foreign key(tar_id_lista_trabajo) references lista_trabajo(id_lista_trabajo),
foreign key(tar_id_area) references area(id_area)
);

# Esta tabla nos servirá para saber quien o quienes dieron solución a un problema/tarea.
# de la mesa de ayuda
create table usuario_asignado_tarea(
ust_id_tarea_lista int not null,
ust_id_usuario varchar(9) not null,
primary key(ust_id_usuario, ust_id_tarea_lista),
foreign key(ust_id_tarea_lista) references tarea_lista(id_tarea_lista),
foreign key(ust_id_usuario) references usuario(id_usuario)
);

create table mesa_de_ayuda(
id_mesa_de_ayuda varchar(13) not null primary key,
mes_id_area int(3) not null,
mes_id_usuario varchar(9) not null,
mes_tipo_servicio int(1) not null,
mes_otro_tipo_servicio varchar(30),
mes_fecha_solicitado datetime,
mes_fecha_limite datetime,
mes_fecha_solucionado datetime,
mes_estado int(1),
mes_atendido boolean,
mes_importancia int(1),
mes_descripcion_problema varchar(250),
foreign key(mes_id_area) references area(id_area),
foreign key(mes_id_usuario) references usuario(id_usuario)
);

create table area_asignada_mesa_ayuda(
aam_id_mesa_de_ayuda  varchar(13) not null,
aam_id_area int not null,
aam_atendiendo boolean,
aam_fecha_asinacion datetime,
primary key(aam_id_mesa_de_ayuda, aam_id_area),
foreign key(aam_id_mesa_de_ayuda) references mesa_de_ayuda(id_mesa_de_ayuda),
foreign key(aam_id_area) references area(id_area)
);

create table servicio_asignado_mesa_ayuda(
uam_id_usuario varchar(10) not null,
uam_id_mesa_ayuda varchar(13) not null,
fecha_asignado date not null,
evaluacion_rapidez_solucion int(1),
primary key(uam_id_usuario, uam_id_mesa_ayuda),
foreign key(uam_id_usuario) references usuario(id_usuario),
foreign key(uam_id_mesa_ayuda) references mesa_de_ayuda(id_mesa_de_ayuda)
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

