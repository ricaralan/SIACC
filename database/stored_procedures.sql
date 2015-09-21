/**
*	PROCEDURE "create_inventario"
**/
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
	/**
	*	CREATE INVENTARIO
	*/
	INSERT INTO inventario(num_inventario,inv_id_area,inv_tipo,inv_usar_control_acceso,inv_num_maq,inv_ram,inv_procesador,inv_vel_procesador,inv_capacidad,inv_no_serie,inv_marca,inv_status,inv_descripcion)
	VALUES(num_inventario,id_area,tipo_inventario,usar_control_acceso,num_maq,ram,procesador,vel_procesador,capacidad,no_serie,marca,status,descripcion);

	/**
	*	CREATE RELATION BETWEEN INVENTARIO AND AREA
	*/
	INSERT INTO historial_inventario_area(hia_id_inventario,hia_id_area)
	VALUES(num_inventario, id_area);

END |

DELIMITER ;

/**
*	PROCEDURE "change_location_invetario"
**/

DELIMITER |
CREATE PROCEDURE change_location_inventario(IN id_inventario VARCHAR(15), IN id_destination_area INT)
BEGIN

	UPDATE inventario SET inv_id_area=id_destination_area WHERE num_inventario=id_inventario;

	UPDATE historial_inventario_area SET hia_fecha_fin=CURRENT_TIMESTAMP WHERE hia_id_inventario=id_inventario;

	INSERT INTO historial_inventario_area(hia_id_inventario,hia_id_area)
	VALUES(id_inventario, id_destination_area);

END |

DELIMITER ;
