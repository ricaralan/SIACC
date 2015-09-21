DELIMITER |

CREATE PROCEDURE create_inventario(
	IN num_inventario char(15),
	IN id_area INT,
	IN tipo_inventario INT,
	IN usar_control_acceso BOOLEAN,
	IN num_maq INT(3),
	IN ram DOUBLE,
	IN procesador VARCHAR(20),
	IN vel_procesador DOUBLE,
	IN capacidad DOUBLE,
	IN no_serie VARCHAR(30),
	IN marca VARCHAR(30),
	IN status INT,
	IN descripcion VARCHAR(200)
	)
BEGIN

	INSERT INTO inventario(num_inventario,inv_id_area,inv_tipo,inv_usar_control_acceso,inv_num_maq,inv_ram,inv_procesador,inv_vel_procesador,inv_capacidad,inv_no_serie,inv_marca,inv_status,inv_descripcion)
	VALUES(num_inventario,id_area,tipo_inventario,usar_control_acceso,num_maq,ram,procesador,vel_procesador,capacidad,no_serie,marca,status,descripcion);

	INSERT INTO historial_inventario_area(hia_id_inventario,hia_id_area)
	VALUES(num_inventario, id_area);

END |

DELIMITER ;