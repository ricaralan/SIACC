-- MySQL dump 10.13  Distrib 5.6.25, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: db_siacc
-- ------------------------------------------------------
-- Server version	5.6.25-0ubuntu0.15.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `acceso_area`
--

DROP TABLE IF EXISTS `acceso_area`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `acceso_area` (
  `id_acceso` int(11) NOT NULL AUTO_INCREMENT,
  `acc_id_area` int(11) NOT NULL,
  `acc_id_usuario` varchar(10) NOT NULL,
  `acc_id_inventario` varchar(20) DEFAULT NULL,
  `acc_fecha_registro` date NOT NULL,
  `acc_hora_inicio` time NOT NULL,
  `acc_hora_fin` time NOT NULL,
  PRIMARY KEY (`id_acceso`),
  KEY `acc_id_area` (`acc_id_area`),
  KEY `acc_id_usuario` (`acc_id_usuario`),
  KEY `acc_id_inventario` (`acc_id_inventario`),
  CONSTRAINT `acceso_area_ibfk_1` FOREIGN KEY (`acc_id_area`) REFERENCES `area` (`id_area`),
  CONSTRAINT `acceso_area_ibfk_2` FOREIGN KEY (`acc_id_usuario`) REFERENCES `usuario` (`id_usuario`),
  CONSTRAINT `acceso_area_ibfk_3` FOREIGN KEY (`acc_id_inventario`) REFERENCES `inventario` (`num_inventario`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acceso_area`
--

LOCK TABLES `acceso_area` WRITE;
/*!40000 ALTER TABLE `acceso_area` DISABLE KEYS */;
/*!40000 ALTER TABLE `acceso_area` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `area`
--

DROP TABLE IF EXISTS `area`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `area` (
  `id_area` int(11) NOT NULL AUTO_INCREMENT,
  `are_id_tipo_area` int(11) NOT NULL,
  `are_nombre` varchar(40) NOT NULL,
  `are_descripcion` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id_area`),
  KEY `are_id_tipo_area` (`are_id_tipo_area`),
  CONSTRAINT `area_ibfk_1` FOREIGN KEY (`are_id_tipo_area`) REFERENCES `tipo_area` (`id_tipo_area`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `area`
--

LOCK TABLES `area` WRITE;
/*!40000 ALTER TABLE `area` DISABLE KEYS */;
INSERT INTO `area` VALUES (5,2,'Centro de cómputo de sistemas',NULL);
/*!40000 ALTER TABLE `area` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `area_atiende_mesa`
--

DROP TABLE IF EXISTS `area_atiende_mesa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `area_atiende_mesa` (
  `id_area_atiende_mesa` int(11) NOT NULL AUTO_INCREMENT,
  `aam_id_area` int(11) NOT NULL,
  `aam_id_mesa_ayuda` varchar(10) DEFAULT NULL,
  `aam_fecha_asignacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `aam_diagnostico` varchar(150) DEFAULT NULL,
  `aam_acciones_tomadas` varchar(150) DEFAULT NULL,
  `aam_observaciones` varchar(150) DEFAULT NULL,
  `aam_asignacion` tinyint(1) DEFAULT '1',
  `aam_soluciono` tinyint(1) DEFAULT NULL,
  `amm_fecha_fin` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `aam_finalizo` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id_area_atiende_mesa`),
  KEY `aam_id_area` (`aam_id_area`),
  KEY `aam_id_mesa_ayuda` (`aam_id_mesa_ayuda`),
  CONSTRAINT `area_atiende_mesa_ibfk_1` FOREIGN KEY (`aam_id_area`) REFERENCES `area` (`id_area`),
  CONSTRAINT `area_atiende_mesa_ibfk_2` FOREIGN KEY (`aam_id_mesa_ayuda`) REFERENCES `mesa_ayuda` (`id_mesa_ayuda`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `area_atiende_mesa`
--

LOCK TABLES `area_atiende_mesa` WRITE;
/*!40000 ALTER TABLE `area_atiende_mesa` DISABLE KEYS */;
/*!40000 ALTER TABLE `area_atiende_mesa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carrera`
--

DROP TABLE IF EXISTS `carrera`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `carrera` (
  `id_carrera` int(11) NOT NULL AUTO_INCREMENT,
  `car_nombre` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id_carrera`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carrera`
--

LOCK TABLES `carrera` WRITE;
/*!40000 ALTER TABLE `carrera` DISABLE KEYS */;
INSERT INTO `carrera` VALUES (1,'Sistemas computacionales administrativos'),(2,'Contaduría'),(3,'Administración'),(4,'Gestión'),(5,'Otro');
/*!40000 ALTER TABLE `carrera` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `historial_inventario_area`
--

DROP TABLE IF EXISTS `historial_inventario_area`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `historial_inventario_area` (
  `id_historial` int(11) NOT NULL AUTO_INCREMENT,
  `hia_id_inventario` varchar(20) NOT NULL,
  `hia_id_area` int(11) NOT NULL,
  `hia_fecha_inicio` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `hia_fecha_fin` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id_historial`),
  KEY `hia_id_inventario` (`hia_id_inventario`),
  KEY `hia_id_area` (`hia_id_area`),
  CONSTRAINT `historial_inventario_area_ibfk_1` FOREIGN KEY (`hia_id_inventario`) REFERENCES `inventario` (`num_inventario`),
  CONSTRAINT `historial_inventario_area_ibfk_2` FOREIGN KEY (`hia_id_area`) REFERENCES `area` (`id_area`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historial_inventario_area`
--

LOCK TABLES `historial_inventario_area` WRITE;
/*!40000 ALTER TABLE `historial_inventario_area` DISABLE KEYS */;
/*!40000 ALTER TABLE `historial_inventario_area` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `horario_area`
--

DROP TABLE IF EXISTS `horario_area`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `horario_area` (
  `hua_id` int(11) NOT NULL AUTO_INCREMENT,
  `hua_id_area` int(11) NOT NULL,
  `hua_id_usuario` varchar(10) NOT NULL,
  `hua_id_materia` varchar(10) DEFAULT NULL,
  `hua_tipo` int(11) DEFAULT NULL,
  `hua_dia` int(11) NOT NULL,
  `hua_hora` int(11) NOT NULL,
  `hua_fecha_inicio` date DEFAULT NULL,
  `hua_fecha_fin` date DEFAULT NULL,
  PRIMARY KEY (`hua_id`),
  KEY `hua_id_area` (`hua_id_area`),
  KEY `hua_id_usuario` (`hua_id_usuario`),
  KEY `hua_id_materia` (`hua_id_materia`),
  CONSTRAINT `horario_area_ibfk_1` FOREIGN KEY (`hua_id_area`) REFERENCES `area` (`id_area`),
  CONSTRAINT `horario_area_ibfk_2` FOREIGN KEY (`hua_id_usuario`) REFERENCES `usuario` (`id_usuario`),
  CONSTRAINT `horario_area_ibfk_3` FOREIGN KEY (`hua_id_materia`) REFERENCES `materia` (`id_materia`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `horario_area`
--

LOCK TABLES `horario_area` WRITE;
/*!40000 ALTER TABLE `horario_area` DISABLE KEYS */;
/*!40000 ALTER TABLE `horario_area` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventario`
--

DROP TABLE IF EXISTS `inventario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inventario` (
  `num_inventario` varchar(20) NOT NULL,
  `inv_id_area` int(11) DEFAULT NULL,
  `inv_tipo` int(2) NOT NULL,
  `inv_usar_control_acceso` tinyint(1) DEFAULT NULL,
  `inv_num_maq` int(3) DEFAULT NULL,
  `inv_ram` double DEFAULT NULL,
  `inv_procesador` varchar(20) DEFAULT NULL,
  `inv_vel_procesador` double DEFAULT NULL,
  `inv_capacidad` double DEFAULT NULL,
  `inv_estado` int(11) NOT NULL DEFAULT '1',
  `inv_no_serie` varchar(20) DEFAULT NULL,
  `inv_marca` varchar(30) DEFAULT NULL,
  `inv_status` tinyint(4) NOT NULL DEFAULT '1',
  `inv_disponibilidad` tinyint(1) DEFAULT NULL,
  `inv_descripcion` varchar(200) DEFAULT NULL,
  `inv_baja` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`num_inventario`),
  KEY `inv_id_area` (`inv_id_area`),
  KEY `inv_tipo` (`inv_tipo`),
  CONSTRAINT `inventario_ibfk_1` FOREIGN KEY (`inv_id_area`) REFERENCES `area` (`id_area`),
  CONSTRAINT `inventario_ibfk_2` FOREIGN KEY (`inv_tipo`) REFERENCES `tipo_inventario` (`id_tipo_inventario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventario`
--

LOCK TABLES `inventario` WRITE;
/*!40000 ALTER TABLE `inventario` DISABLE KEYS */;
/*!40000 ALTER TABLE `inventario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `materia`
--

DROP TABLE IF EXISTS `materia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `materia` (
  `id_materia` varchar(10) NOT NULL,
  `mat_nombre` varchar(40) NOT NULL,
  `mat_descripcion` varchar(200) DEFAULT NULL,
  `mat_id_carrera` int(11) NOT NULL,
  PRIMARY KEY (`id_materia`),
  KEY `mat_id_carrera` (`mat_id_carrera`),
  CONSTRAINT `materia_ibfk_1` FOREIGN KEY (`mat_id_carrera`) REFERENCES `carrera` (`id_carrera`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `materia`
--

LOCK TABLES `materia` WRITE;
/*!40000 ALTER TABLE `materia` DISABLE KEYS */;
INSERT INTO `materia` VALUES ('Programaci','Programacin',NULL,1),('xxjsjs','nombre materia',NULL,3);
/*!40000 ALTER TABLE `materia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mesa_ayuda`
--

DROP TABLE IF EXISTS `mesa_ayuda`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mesa_ayuda` (
  `id_mesa_ayuda` varchar(10) NOT NULL,
  `mes_id_area` int(11) DEFAULT NULL,
  `mes_id_usuario` varchar(10) NOT NULL,
  `mes_id_tipo_servicio` int(11) DEFAULT NULL,
  `mes_otro_tipo_servicio` varchar(50) DEFAULT NULL,
  `mes_fecha_solicitado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `mes_fecha_limite` date DEFAULT NULL,
  `mes_estado` tinyint(4) DEFAULT '1',
  `mes_importancia` tinyint(4) DEFAULT '3',
  `mes_descripcion_problema` varchar(150) DEFAULT NULL,
  `mes_id_inventario` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id_mesa_ayuda`),
  KEY `mes_id_area` (`mes_id_area`),
  KEY `mes_id_usuario` (`mes_id_usuario`),
  KEY `mes_id_tipo_servicio` (`mes_id_tipo_servicio`),
  KEY `mes_id_inventario` (`mes_id_inventario`),
  CONSTRAINT `mesa_ayuda_ibfk_1` FOREIGN KEY (`mes_id_area`) REFERENCES `area` (`id_area`),
  CONSTRAINT `mesa_ayuda_ibfk_2` FOREIGN KEY (`mes_id_usuario`) REFERENCES `usuario` (`id_usuario`),
  CONSTRAINT `mesa_ayuda_ibfk_3` FOREIGN KEY (`mes_id_tipo_servicio`) REFERENCES `tipo_servicio` (`id_tipo_servicio`),
  CONSTRAINT `mesa_ayuda_ibfk_4` FOREIGN KEY (`mes_id_inventario`) REFERENCES `inventario` (`num_inventario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mesa_ayuda`
--

LOCK TABLES `mesa_ayuda` WRITE;
/*!40000 ALTER TABLE `mesa_ayuda` DISABLE KEYS */;
/*!40000 ALTER TABLE `mesa_ayuda` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permiso`
--

DROP TABLE IF EXISTS `permiso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `permiso` (
  `id_permiso` varchar(25) NOT NULL,
  `per_nombre` varchar(80) DEFAULT NULL,
  `per_nombre_corto` varchar(50) DEFAULT NULL,
  `per_url` varchar(70) DEFAULT NULL,
  `per_descripcion` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id_permiso`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permiso`
--

LOCK TABLES `permiso` WRITE;
/*!40000 ALTER TABLE `permiso` DISABLE KEYS */;
INSERT INTO `permiso` VALUES ('acceso_equipo_computo','Control de acceso de usuarios y uso de equipo de computo','control acceso inventario','/acceso_area','Control de acceso de tipo 2: Controla acceso a un rea y el uso de equipo de computo'),('acceso_simple','Control de acceso de usuarios','control acceso simple','/acceso_area','Control de acceso de tipo 1: controla solo el acceso a un rea'),('areas','Areas','areas','/areas','Muestra todas las reas'),('asignacion_materias','Asignacin de materias','materias','/materias','Esto permite saber las materias que imparte un usuario'),('inventarios','Control de inventarios','inventarios','/inventarios','Este mdulo controla los inventarios de el rea'),('mesa_ayuda_administrador','Mesa de ayuda en modo administrador','mesa de ayuda','/acceso_area','Modulo de mesa de ayuda de tipo 1: Es control en modo administrador'),('mesa_ayuda_atencion','Mesa de ayuda en modo atender solicitudes','mesa de ayuda','/mesa_ayuda','Modulo de mesa de ayuda de tipo 2: Es control en modo solicitante de servicios'),('mesa_ayuda_solicitante','Mesa de ayuda en modo solicitante','mesa de ayuda','/mesa_ayuda','Modulo de mesa de ayuda de tipo 2: Es control en modo solicitante de servicios'),('system_config','Configuraciones que mueven el sistema','configuraciones','/configuraciones','Configuraciones de todo el sistema'),('usuarios','Control de usuarios','usuarios','/usuarios','Este mdulo da acceso al control de usuarios, pero los tipos de usuarios permitidos se dan en otra tabla...');
/*!40000 ALTER TABLE `permiso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permiso_asignado`
--

DROP TABLE IF EXISTS `permiso_asignado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `permiso_asignado` (
  `id_permiso_asignado` int(11) NOT NULL AUTO_INCREMENT,
  `moa_id_permiso` varchar(25) NOT NULL,
  `moa_id_tipo_usuario` int(11) DEFAULT NULL,
  `moa_id_tipo_area` int(11) DEFAULT NULL,
  `moa_ver` tinyint(1) DEFAULT NULL,
  `moa_crear` tinyint(1) DEFAULT NULL,
  `moa_editar` tinyint(1) DEFAULT NULL,
  `moa_eliminar` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id_permiso_asignado`),
  KEY `moa_id_permiso` (`moa_id_permiso`),
  KEY `moa_id_tipo_usuario` (`moa_id_tipo_usuario`),
  KEY `moa_id_tipo_area` (`moa_id_tipo_area`),
  CONSTRAINT `permiso_asignado_ibfk_1` FOREIGN KEY (`moa_id_permiso`) REFERENCES `permiso` (`id_permiso`),
  CONSTRAINT `permiso_asignado_ibfk_2` FOREIGN KEY (`moa_id_tipo_usuario`) REFERENCES `tipo_usuario` (`id_tipo_usuario`),
  CONSTRAINT `permiso_asignado_ibfk_3` FOREIGN KEY (`moa_id_tipo_area`) REFERENCES `tipo_area` (`id_tipo_area`)
) ENGINE=InnoDB AUTO_INCREMENT=177 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permiso_asignado`
--

LOCK TABLES `permiso_asignado` WRITE;
/*!40000 ALTER TABLE `permiso_asignado` DISABLE KEYS */;
INSERT INTO `permiso_asignado` VALUES (47,'acceso_equipo_computo',1,NULL,1,1,1,1),(48,'acceso_simple',1,NULL,1,1,1,1),(49,'areas',1,NULL,1,1,1,1),(50,'asignacion_materias',1,NULL,1,1,1,1),(51,'inventarios',1,NULL,1,1,1,1),(52,'mesa_ayuda_administrador',1,NULL,1,1,1,1),(53,'mesa_ayuda_atencion',1,NULL,1,1,1,1),(54,'mesa_ayuda_solicitante',1,NULL,1,1,1,1),(55,'system_config',1,NULL,1,1,1,1),(56,'usuarios',1,NULL,1,1,1,1),(57,'acceso_equipo_computo',2,NULL,1,1,1,0),(58,'acceso_simple',2,NULL,1,1,1,0),(59,'areas',2,NULL,0,0,0,0),(60,'asignacion_materias',2,NULL,1,0,0,0),(61,'inventarios',2,NULL,1,1,1,1),(62,'mesa_ayuda_administrador',2,NULL,0,0,0,0),(63,'mesa_ayuda_atencion',2,NULL,0,0,0,0),(64,'mesa_ayuda_solicitante',2,NULL,1,1,1,1),(65,'system_config',2,NULL,0,0,0,0),(66,'usuarios',2,NULL,1,1,1,1),(67,'acceso_equipo_computo',NULL,2,1,NULL,NULL,NULL),(68,'acceso_simple',NULL,2,1,NULL,NULL,NULL),(69,'areas',NULL,2,1,NULL,NULL,NULL),(70,'asignacion_materias',NULL,2,1,NULL,NULL,NULL),(71,'inventarios',NULL,2,1,NULL,NULL,NULL),(72,'mesa_ayuda_administrador',NULL,2,1,NULL,NULL,NULL),(73,'mesa_ayuda_atencion',NULL,2,1,NULL,NULL,NULL),(74,'mesa_ayuda_solicitante',NULL,2,1,NULL,NULL,NULL),(75,'system_config',NULL,2,1,NULL,NULL,NULL),(76,'usuarios',NULL,2,1,NULL,NULL,NULL),(117,'acceso_equipo_computo',6,NULL,0,0,0,0),(118,'acceso_simple',6,NULL,0,0,0,0),(119,'areas',6,NULL,0,0,0,0),(120,'asignacion_materias',6,NULL,0,0,0,0),(121,'inventarios',6,NULL,0,0,0,0),(122,'mesa_ayuda_administrador',6,NULL,0,0,0,0),(123,'mesa_ayuda_atencion',6,NULL,0,0,0,0),(124,'mesa_ayuda_solicitante',6,NULL,0,0,0,0),(125,'system_config',6,NULL,0,0,0,0),(126,'usuarios',6,NULL,0,0,0,0),(147,'acceso_equipo_computo',3,NULL,0,0,0,0),(148,'acceso_simple',3,NULL,0,0,0,0),(149,'areas',3,NULL,0,0,0,0),(150,'asignacion_materias',3,NULL,1,1,1,1),(151,'inventarios',3,NULL,1,1,1,1),(152,'mesa_ayuda_administrador',3,NULL,0,0,0,0),(153,'mesa_ayuda_atencion',3,NULL,0,0,0,0),(154,'mesa_ayuda_solicitante',3,NULL,1,1,1,1),(155,'system_config',3,NULL,0,0,0,0),(156,'usuarios',3,NULL,1,0,0,0),(157,'acceso_equipo_computo',4,NULL,0,0,0,0),(158,'acceso_simple',4,NULL,0,0,0,0),(159,'areas',4,NULL,0,0,0,0),(160,'asignacion_materias',4,NULL,0,0,0,0),(161,'inventarios',4,NULL,0,0,0,0),(162,'mesa_ayuda_administrador',4,NULL,0,0,0,0),(163,'mesa_ayuda_atencion',4,NULL,0,0,0,0),(164,'mesa_ayuda_solicitante',4,NULL,1,1,1,1),(165,'system_config',4,NULL,0,0,0,0),(166,'usuarios',4,NULL,1,0,0,0),(167,'acceso_equipo_computo',5,NULL,1,0,0,0),(168,'acceso_simple',5,NULL,1,0,0,0),(169,'areas',5,NULL,0,0,0,0),(170,'asignacion_materias',5,NULL,0,0,0,0),(171,'inventarios',5,NULL,1,1,1,1),(172,'mesa_ayuda_administrador',5,NULL,0,0,0,0),(173,'mesa_ayuda_atencion',5,NULL,1,1,1,1),(174,'mesa_ayuda_solicitante',5,NULL,0,0,0,0),(175,'system_config',5,NULL,0,0,0,0),(176,'usuarios',5,NULL,1,1,1,0);
/*!40000 ALTER TABLE `permiso_asignado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permiso_por_tipo_usuario`
--

DROP TABLE IF EXISTS `permiso_por_tipo_usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `permiso_por_tipo_usuario` (
  `ptu_id_tipo_usuario` int(11) NOT NULL,
  `ptu_id_tipo_usuario_permiso` int(11) NOT NULL,
  `ptu_ver_contrasena` tinyint(1) DEFAULT NULL,
  `ptu_solo_usuarios_area` tinyint(1) DEFAULT NULL,
  `ptu_todos_usuarios` tinyint(1) DEFAULT NULL,
  `ptu_ningun_usuario` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`ptu_id_tipo_usuario`,`ptu_id_tipo_usuario_permiso`),
  KEY `ptu_id_tipo_usuario_permiso` (`ptu_id_tipo_usuario_permiso`),
  CONSTRAINT `permiso_por_tipo_usuario_ibfk_1` FOREIGN KEY (`ptu_id_tipo_usuario`) REFERENCES `tipo_usuario` (`id_tipo_usuario`),
  CONSTRAINT `permiso_por_tipo_usuario_ibfk_2` FOREIGN KEY (`ptu_id_tipo_usuario_permiso`) REFERENCES `tipo_usuario` (`id_tipo_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permiso_por_tipo_usuario`
--

LOCK TABLES `permiso_por_tipo_usuario` WRITE;
/*!40000 ALTER TABLE `permiso_por_tipo_usuario` DISABLE KEYS */;
INSERT INTO `permiso_por_tipo_usuario` VALUES (1,1,1,0,1,0),(1,2,1,0,1,0),(1,3,1,0,1,0),(1,4,1,0,1,0),(1,5,1,0,1,0),(1,6,1,0,1,0),(2,1,0,0,0,1),(2,2,0,1,0,0),(2,3,0,0,1,0),(2,4,0,0,0,1),(2,5,1,1,0,0),(2,6,0,0,1,0),(3,1,0,0,0,1),(3,2,0,0,0,1),(3,3,0,1,0,0),(3,4,0,0,0,1),(3,5,0,1,0,0),(3,6,0,0,1,0),(4,1,0,0,1,0),(4,2,0,0,1,0),(4,3,0,0,1,0),(4,4,0,0,1,0),(4,5,0,0,1,0),(4,6,0,0,1,0),(5,1,0,0,0,1),(5,2,0,0,0,1),(5,3,0,0,0,1),(5,4,0,0,0,1),(5,5,0,1,0,0),(5,6,0,0,1,0),(6,1,0,0,0,1),(6,2,0,0,0,1),(6,3,0,0,0,1),(6,4,0,0,0,1),(6,5,0,0,0,1),(6,6,0,0,0,1);
/*!40000 ALTER TABLE `permiso_por_tipo_usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `resguardo_inventario`
--

DROP TABLE IF EXISTS `resguardo_inventario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `resguardo_inventario` (
  `id_resguardo` int(11) NOT NULL AUTO_INCREMENT,
  `rin_num_inventario` varchar(20) NOT NULL,
  `rin_id_usuario` varchar(10) NOT NULL,
  `rin_fecha_inicio` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `rin_fecha_fin` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id_resguardo`),
  KEY `rin_num_inventario` (`rin_num_inventario`),
  KEY `rin_id_usuario` (`rin_id_usuario`),
  CONSTRAINT `resguardo_inventario_ibfk_1` FOREIGN KEY (`rin_num_inventario`) REFERENCES `inventario` (`num_inventario`),
  CONSTRAINT `resguardo_inventario_ibfk_2` FOREIGN KEY (`rin_id_usuario`) REFERENCES `usuario` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resguardo_inventario`
--

LOCK TABLES `resguardo_inventario` WRITE;
/*!40000 ALTER TABLE `resguardo_inventario` DISABLE KEYS */;
/*!40000 ALTER TABLE `resguardo_inventario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_area`
--

DROP TABLE IF EXISTS `tipo_area`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tipo_area` (
  `id_tipo_area` int(11) NOT NULL AUTO_INCREMENT,
  `tipo_nombre` varchar(30) NOT NULL,
  `tipo_descripcion` varchar(30) NOT NULL,
  `tipo_imagen` varchar(250) NOT NULL,
  PRIMARY KEY (`id_tipo_area`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_area`
--

LOCK TABLES `tipo_area` WRITE;
/*!40000 ALTER TABLE `tipo_area` DISABLE KEYS */;
INSERT INTO `tipo_area` VALUES (2,'Centro de cómputo','Todos los centros de cómputo','images/tipos_areas/centro_de_computo.jpg');
/*!40000 ALTER TABLE `tipo_area` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_inventario`
--

DROP TABLE IF EXISTS `tipo_inventario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tipo_inventario` (
  `id_tipo_inventario` int(11) NOT NULL AUTO_INCREMENT,
  `tin_nombre` varchar(40) NOT NULL,
  `tin_descripcion` varchar(250) DEFAULT NULL,
  `tin_foto` varchar(200) DEFAULT NULL,
  `tin_es_computadora` tinyint(1) NOT NULL,
  PRIMARY KEY (`id_tipo_inventario`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_inventario`
--

LOCK TABLES `tipo_inventario` WRITE;
/*!40000 ALTER TABLE `tipo_inventario` DISABLE KEYS */;
INSERT INTO `tipo_inventario` VALUES (1,'Computadora','','/images/tipos_inventarios/computadora.png',1),(2,'Multifuncional','','/images/tipos_inventarios/multifuncional.png',0),(3,'Impresora','','/images/tipos_inventarios/impresora.jpg',0),(4,'Proyector','','/images/tipos_inventarios/proyector.jpg',0),(5,'Otro','','/images/system/inventarios.jpg',0);
/*!40000 ALTER TABLE `tipo_inventario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_servicio`
--

DROP TABLE IF EXISTS `tipo_servicio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tipo_servicio` (
  `id_tipo_servicio` int(11) NOT NULL AUTO_INCREMENT,
  `tse_nombre` varchar(40) NOT NULL,
  `tse_descripcion` varchar(200) DEFAULT NULL,
  `tse_otro` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id_tipo_servicio`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_servicio`
--

LOCK TABLES `tipo_servicio` WRITE;
/*!40000 ALTER TABLE `tipo_servicio` DISABLE KEYS */;
INSERT INTO `tipo_servicio` VALUES (1,'Problema de red','',0),(2,'Problema de hardware','',NULL),(3,'Problema de software','',NULL),(4,'Infeccin de virus','',NULL),(5,'Otro',NULL,1),(6,'Problema de red','',NULL),(7,'Problema de hardware','',NULL),(8,'Problema de software','',NULL),(9,'Infeccin de virus','',NULL);
/*!40000 ALTER TABLE `tipo_servicio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_usuario`
--

DROP TABLE IF EXISTS `tipo_usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tipo_usuario` (
  `id_tipo_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `tipo_asignar_area` tinyint(1) DEFAULT NULL,
  `tipo_asignar_carrera` tinyint(1) DEFAULT NULL,
  `tipo_nombre` varchar(20) NOT NULL,
  `tipo_descripcion` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`id_tipo_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_usuario`
--

LOCK TABLES `tipo_usuario` WRITE;
/*!40000 ALTER TABLE `tipo_usuario` DISABLE KEYS */;
INSERT INTO `tipo_usuario` VALUES (1,0,0,'Coordinador',NULL),(2,1,0,'Encargado de area',NULL),(3,1,0,'Maestro',NULL),(4,0,0,'Directivo',NULL),(5,1,1,'Servicio Social',NULL),(6,0,1,'Alumno','');
/*!40000 ALTER TABLE `tipo_usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuario` (
  `id_usuario` varchar(10) NOT NULL,
  `usu_id_tipo_usuario` int(11) DEFAULT NULL,
  `usu_id_area` int(11) DEFAULT NULL,
  `usu_id_carrera` int(11) DEFAULT NULL,
  `usu_carrera` varchar(20) DEFAULT NULL,
  `usu_nombre` varchar(30) DEFAULT NULL,
  `usu_primer_apellido` varchar(20) DEFAULT NULL,
  `usu_segundo_apellido` varchar(20) DEFAULT NULL,
  `usu_sexo` varchar(1) DEFAULT NULL,
  `usu_email` varchar(32) DEFAULT NULL,
  `usu_foto` varchar(250) DEFAULT NULL,
  `usu_usuario` varchar(130) DEFAULT NULL,
  `usu_contrasena` varchar(130) DEFAULT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `usu_usuario` (`usu_usuario`),
  KEY `usu_id_tipo_usuario` (`usu_id_tipo_usuario`),
  KEY `usu_id_area` (`usu_id_area`),
  KEY `usu_id_carrera` (`usu_id_carrera`),
  CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`usu_id_tipo_usuario`) REFERENCES `tipo_usuario` (`id_tipo_usuario`),
  CONSTRAINT `usuario_ibfk_2` FOREIGN KEY (`usu_id_area`) REFERENCES `area` (`id_area`),
  CONSTRAINT `usuario_ibfk_3` FOREIGN KEY (`usu_id_carrera`) REFERENCES `carrera` (`id_carrera`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES ('1708',5,5,1,NULL,'Fermin Armando','Rodriguez ','Vasquez','M','fermin.uv@gmail.com','/images/system/icon-user.png','1cc00c96','1cc00c96'),('25105',1,NULL,NULL,NULL,'Nancy Araceli','Olivares ','Ruiz','F','nan_o_@hotmail.con','/images/system/icon-user.png','439850c7c1de907d87','69964ec5decb8d2fcc'),('27056',1,NULL,NULL,NULL,'Jorge Ivan','Ramirez','Sandoval','M','iramirez@uv.mx','/images/system/icon-user.png','1fc00c9b81','1fc00c9b81'),('28244',1,NULL,NULL,NULL,'Ingrid','Garca','Alvarez','F','ingarcia@uv.mx','/images/system/icon-user.png','1fcf0e9a83','1fcf0e9a83'),('S08007304',6,NULL,3,NULL,'OSCAR YAIR','ROCHA','ZAVALETA','','irie_ini@live.com','/images/system/icon-user.png',NULL,NULL),('S09008116',6,NULL,3,NULL,'guadalupe','flores','carrera','','efectoquetzalli@hotmail.com','/images/system/icon-user.png',NULL,NULL),('S09009602',6,NULL,2,NULL,'abigail','flores','guzman','','abygaiil3@hotmail.com','/images/system/icon-user.png',NULL,NULL),('s09011146',6,NULL,4,NULL,'Jose Luis','Castellanos','Barranco','M','','/images/system/icon-user.png',NULL,NULL),('S09013815',6,NULL,1,NULL,'Noreli Sulamita','S','Alvarado','','sanchez.noreli@gmail.com','/images/system/icon-user.png',NULL,NULL),('S09029171',6,NULL,3,NULL,'enrique ','cardenas ','romero ','','ENRIQUE.CARDENAS.ROMERO@HOTMAIL.','/images/system/icon-user.png',NULL,NULL),('S10000439',6,NULL,2,NULL,'IVONNE ARACELY','ORTEGA ','CAMACHO','','ivoness_235@hotmail.com','/images/system/icon-user.png',NULL,NULL),('S10007725',6,NULL,3,NULL,'STEFANY','CASTILLO','LARA','','STEFANY_27@LIVE.COM','/images/system/icon-user.png',NULL,NULL),('S10007777',6,NULL,3,NULL,'Marisol','Alarc','Solano','','marisol-0210@hotmail.com','/images/system/icon-user.png',NULL,NULL),('S10007801',6,NULL,3,NULL,'Iveth Irene','Aguilar','Aldama','','iveaguilar@uv.mx','/images/system/icon-user.png',NULL,NULL),('S10007816',6,NULL,3,NULL,'SANTOS','GODOY','CARBAJAL','','ssgodoy_edu@hotmail.com','/images/system/icon-user.png',NULL,NULL),('S10007855',6,NULL,3,NULL,'Daniel ','Ortiz','Perez','','x','/images/system/icon-user.png',NULL,NULL),('S10007857',6,NULL,3,NULL,'Rocio Yazmin','Guevara','Flores','','got5t8_92@hotmail.com','/images/system/icon-user.png',NULL,NULL),('S10007937',6,NULL,3,NULL,'DARA','LEON','PEREZ','','darlepe@hotmail.com','/images/system/icon-user.png',NULL,NULL),('S10007938',6,NULL,3,NULL,'Jennyfer','Del Valle','Zamora','','jennyfer_dvz@hotmail.com','/images/system/icon-user.png',NULL,NULL),('S10007953',6,NULL,3,NULL,'Oscar','Landa','Morgado','M','oscar_x2@hotmail.com','/images/system/icon-user.png',NULL,NULL),('S10009174',6,NULL,2,NULL,'Luis Bernardino ','Salazar ','Garc','','luis_salazarg19@hotmail.com','/images/system/icon-user.png',NULL,NULL),('S10009230',6,NULL,2,NULL,'Fernando ','Alpizar','Hernandez','','fer_172@hotmail.com','/images/system/icon-user.png',NULL,NULL),('S10009262',6,NULL,2,NULL,'luis enrique','aguilar','ortiz','','es_enrique@hotmail.com','/images/system/icon-user.png',NULL,NULL),('S10009289',6,NULL,2,NULL,'Luz Mara','Mendoza','Hernandez','F','luz_1992_10@hotmail.com','/images/system/icon-user.png',NULL,NULL),('s10010644',6,NULL,4,NULL,'Ana Bertha','Santos','Aguilar','M','','/images/system/icon-user.png',NULL,NULL),('s10010650',6,NULL,4,NULL,'Alvaro','Cabrera','Espinoza','M','','/images/system/icon-user.png',NULL,NULL),('s10010660',6,NULL,4,NULL,'Edgar Alonso','Lopez','Perez','M','','/images/system/icon-user.png',NULL,NULL),('S10010672',6,NULL,1,NULL,'JORGE ANTONIO','DE LA PARRA','MURGUIA','M','FIGO3000@HOTMAIL.COM','/images/system/icon-user.png',NULL,NULL),('s10010699',6,NULL,4,NULL,'Rodrigo','Baez','Peralta','M','','/images/system/icon-user.png',NULL,NULL),('S10013308',6,NULL,1,NULL,'Gabriel Alejandro','Castillo','Cuevas','','cas_gabo@hotmail.com','/images/system/icon-user.png',NULL,NULL),('S1001539',6,NULL,1,NULL,'nadia','hernandez','gonzalez','','nadia15_151191@hotmail.com','/images/system/icon-user.png',NULL,NULL),('S10016991',6,NULL,3,NULL,'ERIC','MORENO','QUEZADA','','nery_-_one@hotmail.com','/images/system/icon-user.png',NULL,NULL),('S10017540',6,NULL,1,NULL,'cecilia','ramirez','lorenzo','','lia_ashanti@hotmail.com','/images/system/icon-user.png',NULL,NULL),('s10018169',6,NULL,4,NULL,'Ana Isabel','Castellanos','Barranco','F','','/images/system/icon-user.png',NULL,NULL),('s10018443',6,NULL,4,NULL,'Eliza','Luna','Gonzales','F','','/images/system/icon-user.png',NULL,NULL),('S10018479',6,NULL,4,NULL,'Juan Enrique','Ramirez','Moreno','','madrid_azul_09@hotmail.com','/images/system/icon-user.png',NULL,NULL),('S10019952',6,NULL,4,NULL,'laura','hern','alonso','','laura_alonso78@hotmail.com','/images/system/icon-user.png',NULL,NULL),('S10027176',6,NULL,3,NULL,'yesenia ','navarro','meza','F','atameatija@hotmail.com','/images/system/icon-user.png',NULL,NULL),('s11003982',6,NULL,4,NULL,'Emanuel','Hernandez','Ortiz','M','','/images/system/icon-user.png',NULL,NULL),('S11004000',6,NULL,4,NULL,'Juan Esli','Zarate ','Aragon','','eslizarate@gmail.com','/images/system/icon-user.png',NULL,NULL),('s11004004',6,NULL,4,NULL,'Uziel','Martinez','Bailon','M','','/images/system/icon-user.png',NULL,NULL),('S11009165',6,NULL,3,NULL,'Ir','Enr','Zepeda','','Irete_32@hotmail.com','/images/system/icon-user.png',NULL,NULL),('S11009183',6,NULL,3,NULL,'gabriela','sanchez','marquez','','gsm_137@hotmail.com','/images/system/icon-user.png',NULL,NULL),('S11009198',6,NULL,3,NULL,'Jose Eduardo','Salinas','Ruiz','M','jers_333@hotmail.com','/images/system/icon-user.png',NULL,NULL),('S11009239',6,NULL,3,NULL,'ivan ','figueroa',' castillo','','cholo_977@hotmail.com','/images/system/icon-user.png',NULL,NULL),('S11009284',6,NULL,1,NULL,'ALFREDO','MORALES','GARCIA','M','zzS11009284@estudiantes.uv.mx','/images/system/icon-user.png',NULL,NULL),('S11010552',6,NULL,2,NULL,'Maria del Carmen','Lopez','Benavides','','carmenlopezbenavidez@hotmail.com','/images/system/icon-user.png',NULL,NULL),('S11010645',6,NULL,2,NULL,'Yessica Llenely','Trujillo','garcia','','acuario_h07@hotmail.com','/images/system/icon-user.png',NULL,NULL),('S11010700',6,NULL,2,NULL,'Maria Guadalupe ','Burgos','Sanchez','F','zS11010700@estudiantes.uv.mx','/images/system/icon-user.png',NULL,NULL),('s11012075',6,NULL,4,NULL,'David','Julian','Jimenez','M',NULL,'/images/system/icon-user.png',NULL,NULL),('s11012079',6,NULL,4,NULL,'Hayde','Vasquez','Rios','F',NULL,'/images/system/icon-user.png',NULL,NULL),('s11012090',6,NULL,4,NULL,'Giselle','Perdomo','Mendoza','F',NULL,'/images/system/icon-user.png',NULL,NULL),('s11012109',6,NULL,4,NULL,'Pablo Daniel','Morin','Moreno','M','','/images/system/icon-user.png',NULL,NULL),('S11012120',6,NULL,4,NULL,'KARINA MONSERRATH','GONZALEZ','DIAZ','','ka_ri_na_3hotmail.com','/images/system/icon-user.png',NULL,NULL),('s11012122',6,NULL,4,NULL,'Obeth','Ortiz','Navarro','M',NULL,'/images/system/icon-user.png',NULL,NULL),('s11012128',6,NULL,4,NULL,'Stephanie','Evoli','Gonzales','F','','/images/system/icon-user.png',NULL,NULL),('S11012129',6,NULL,4,NULL,'dario','rios ','zavaleta','','drz16@hotmail.com','/images/system/icon-user.png',NULL,NULL),('s11012130',6,NULL,4,NULL,'Humberto','Camara','Garcia','M',NULL,'/images/system/icon-user.png',NULL,NULL),('S11014556',6,NULL,1,NULL,'nahum','FRANCISCO','OLIVARES','','twitstark@gmail.com','/images/system/icon-user.png',NULL,NULL),('S11014591',6,NULL,1,NULL,'JOAQUIN','MADRID','OCHOA','F','madrid_0008@hotmail.com','/images/system/icon-user.png',NULL,NULL),('S11014599',6,NULL,1,NULL,'Elizabeth','Prieto','Dominguez','F','e-vi-4@hotmail.com','/images/system/icon-user.png',NULL,NULL),('S11014613',6,NULL,1,NULL,'Paloma','Cordoba','Caiceros','','x','/images/system/icon-user.png',NULL,NULL),('S11014636',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'/images/system/icon-user.png','588449cfc5d68d','5e925fdcd2cb8d'),('S11014648',6,NULL,1,NULL,'claudia giovanna','leal','velasco','F','by_claudia@hotmail.com','/images/system/icon-user.png',NULL,NULL),('S11014655',6,NULL,1,NULL,'Mario Alberto','Cabrera ','Iba','','alb3rto_07@hotmail.com','/images/system/icon-user.png',NULL,NULL),('S11014684',6,NULL,1,NULL,'Sergio','Lopez','D',NULL,'che_kolopez@hotmail.com','/images/system/icon-user.png','19c4049c828f812a','19c4049c828f812a'),('S11018091',6,NULL,3,NULL,'Selene','Morales','Benavides','','nitha@gmail.com','/images/system/icon-user.png',NULL,NULL),('s11018406',6,NULL,4,NULL,'Darinka','Mayo','Flores','F','','/images/system/icon-user.png',NULL,NULL),('S11018408',6,NULL,4,NULL,'julio','fernando','santiago','','fernando_new.life@hotmail.com','/images/system/icon-user.png',NULL,NULL),('s11018409',6,NULL,4,NULL,'Omar','Rojas','Trejo','M',NULL,'/images/system/icon-user.png',NULL,NULL),('S11018680',6,NULL,1,NULL,'Edith Anglica','Miranda','Arcos','F','arenita853@hotmail.com','/images/system/icon-user.png',NULL,NULL),('S11018681',6,NULL,1,NULL,'Heydi Janeth','Guevara','Viveros','','heydi@gmail.com','/images/system/icon-user.png',NULL,NULL),('s11028866',6,NULL,4,NULL,'williams','Hernandez','Romero','M','','/images/system/icon-user.png',NULL,NULL),('S12007634',6,NULL,3,NULL,'ALAN JAIR ','JIMENEZ','CABRERA','','JAIR_VIERNES13@HOTMAIL.COM','/images/system/icon-user.png',NULL,NULL),('S12007636',6,NULL,3,NULL,'LUCERO','VALLEJO','LEON','F','zS12007636@estudiates.uv.mx','/images/system/icon-user.png',NULL,NULL),('S12007664',6,NULL,3,NULL,'KIMBERLY AMAYRANI','HERNANDEZ','NAVARIJO','F','zS12007664@estudientes.uv.mx','/images/system/icon-user.png',NULL,NULL),('S12007723',6,NULL,3,NULL,'KARLA MARIEL','LOPEZ','MARTINEZ','F','zS12007723@estudientes.uv.mx','/images/system/icon-user.png',NULL,NULL),('S12007725',6,NULL,3,NULL,'RUBEN','ARIAS','ALBA','M','zS12007725@estudiantes.uv.mx','/images/system/icon-user.png',NULL,NULL),('S12007798',6,NULL,3,NULL,'JAIME ANTONIO','LOPEZ','AMADOR','M','zS12007798@estudiantes.uv.mx','/images/system/icon-user.png',NULL,NULL),('S12007809',6,NULL,3,NULL,'ALEJANDRA','RODRIGUEZ','ROMERO','F','zS12007809@estidientes.uv.mx','/images/system/icon-user.png',NULL,NULL),('S12007820',6,NULL,3,NULL,'Gustavo Jair','Hernandez','Viveros','M','SS12007820@estudiantes.uv.mx','/images/system/icon-user.png',NULL,NULL),('S12007847',6,NULL,3,NULL,'STEPHANNY IVETH','VASQUEZ','FUENTES','F','zS12007847@ESTUDIANTES.UV.MX','/images/system/icon-user.png',NULL,NULL),('S12009092',6,NULL,2,NULL,'daniela fernanda ','roque ','salazar','','fptdaniela@live.com.mx','/images/system/icon-user.png',NULL,NULL),('S12009115',6,NULL,2,NULL,'BRENDA','CAPISTRAN','SEGURA','F','zS12009115@estudiantes.uv.mx','/images/system/icon-user.png',NULL,NULL),('S12009119',6,NULL,2,NULL,'ZAIRA XIMENA','RAMOS','GARCIA','','zaira_26_94@hotmail.com','/images/system/icon-user.png',NULL,NULL),('S12009278',6,NULL,2,NULL,'ZAIRA YARETH ','MORALES','GARCIA','','ZAI_YARE04@HOTMAIL.COM','/images/system/icon-user.png',NULL,NULL),('S12009306',6,NULL,2,NULL,'Cindy','juarez','molina','','zs12009306@estudiantes.uv.mx','/images/system/icon-user.png',NULL,NULL),('s12010642',6,NULL,4,NULL,'Rubi','Salazar','Nieto','F',NULL,'/images/system/icon-user.png',NULL,NULL),('s12010644',6,NULL,4,NULL,'David','Camacho','Baqueiro','M',NULL,'/images/system/icon-user.png',NULL,NULL),('s12010645',6,NULL,4,NULL,'Victor Hugo','Barradas','Moscoso','M',NULL,'/images/system/icon-user.png',NULL,NULL),('s12010646',6,NULL,4,NULL,'Mariela','Ruiz','Miron','F',NULL,'/images/system/icon-user.png',NULL,NULL),('s12010649',6,NULL,4,NULL,'Yaneth','Rodriguez','gomez','M',NULL,'/images/system/icon-user.png',NULL,NULL),('s12010654',6,NULL,4,NULL,'Adriana','Lagunes','Lopez','F',NULL,'/images/system/icon-user.png',NULL,NULL),('s12010656',6,NULL,4,NULL,'Ana Luisa','Bautista','Pozos','F',NULL,'/images/system/icon-user.png',NULL,NULL),('s12010673',6,NULL,4,NULL,'Roberto','Carreiro','Corbal','M',NULL,'/images/system/icon-user.png',NULL,NULL),('s12010700',6,NULL,4,NULL,'Johnathan','Grajales','Guzman','M',NULL,'/images/system/icon-user.png',NULL,NULL),('S12013244',6,NULL,1,NULL,'LUIS ENRIQUE','OREA ','ACOSTA','M','orea_96@hotmail.com','/images/system/icon-user.png',NULL,NULL),('S12013303',5,5,1,NULL,'Joel David','Hernndez ','Hernndez','M','yoelda26@gmail.com','/images/system/icon-user.png','7ec60e9e868cd128c7','7ec60e9e868cd128c7'),('S12013338',5,5,1,NULL,'Jahir Alejandro','De La Cruz','Aguilar','M','jahir_flam@hotmail.com','/images/system/icon-user.png','7ec60e9e868cd12bcc','7ec60e9e868cd12bcc'),('S12017069',6,NULL,3,NULL,'VICTOR','CONTRERAS','LOPEZ','M','zS12017069@estudientes.uv.mx','/images/system/icon-user.png',NULL,NULL),('S12017202',6,NULL,2,NULL,'CLAUDIA GUADALUPE','GONZALES ','MEDINA','F','zS12017202@estudiantes.uv.mx','/images/system/icon-user.png',NULL,NULL),('S12017323',6,NULL,4,NULL,'BEATRIZ YESENIA','AMEZCUA','CHAVEZ','','YES.A.C@HOTMAIL.COM','/images/system/icon-user.png',NULL,NULL),('s12017327',6,NULL,4,NULL,'Fernando','Rosas','Dauzon','M',NULL,'/images/system/icon-user.png',NULL,NULL),('S12018366',6,NULL,3,NULL,'Gerardo Alberto','Villaseor ','del Rio','M','gerard_cronica90@live.com.mx','/images/system/icon-user.png',NULL,NULL),('S12018367',6,NULL,3,NULL,'GUADALUPE LIZBETH','CLEMENTE ','HERNANDEZ','F','S12018367@estudiantes.uv.mx','/images/system/icon-user.png',NULL,NULL),('S12021931',6,NULL,3,NULL,'MARIA DOLORES','DESIDERIO','GALLEGOS','','mado_dg@hotmail.com','/images/system/icon-user.png',NULL,NULL),('s12022187',6,NULL,4,NULL,'Benjamin','Romero','Galicia','M',NULL,'/images/system/icon-user.png',NULL,NULL),('s12022190',6,NULL,4,NULL,'Raquel','Villegas','Majan','F',NULL,'/images/system/icon-user.png',NULL,NULL),('s13005937',6,NULL,4,NULL,'Nohemi','Calvo','Mendez','F',NULL,'/images/system/icon-user.png',NULL,NULL),('S13007876',6,NULL,1,NULL,'CITLALI ANAHI','SUAREZ','ROJAS','F','zS13007876@estudientes.uv.mx','/images/system/icon-user.png',NULL,NULL),('S13007891',6,NULL,3,NULL,'ZURIZADAHI','ORTEGA','ABURTO','F','zS13007891@estudientes.uv.mx','/images/system/icon-user.png',NULL,NULL),('S13007932',6,NULL,3,NULL,'Diana Laura','Palestina','Rosales','','d_starblue@hotmail.com','/images/system/icon-user.png',NULL,NULL),('S13007934',6,NULL,3,NULL,'CITLALI ANAHI','SUERES','ROJAS','F','zS13007934@estudientes.uv.mx','/images/system/icon-user.png',NULL,NULL),('S13009225',6,NULL,2,NULL,'jorge emilio','estrada ','rodiles','','olimpo_e@hotmail.com','/images/system/icon-user.png',NULL,NULL),('S13009318',6,NULL,2,NULL,'Victor Manuel','Barrientos','Cruz','M','vik_therock@hotmail.com','/images/system/icon-user.png',NULL,NULL),('S13009343',6,NULL,2,NULL,'jaemy viridiana','guevara ','torres','','viri-tuyyo@hotmail.com','/images/system/icon-user.png',NULL,NULL),('S13009357',6,NULL,2,NULL,'MARIA FERNADA','MARITNEZ','MARTINEZ','','MAFER_1819@LIVE.COM','/images/system/icon-user.png',NULL,NULL),('S13010738',6,NULL,3,NULL,'ernesto ','ortega','ortiz','','neztho_runner17@hotmail.com','/images/system/icon-user.png',NULL,NULL),('s13010769',6,NULL,4,NULL,'Maleni','Vasquez','Zavaleta','F',NULL,'/images/system/icon-user.png',NULL,NULL),('S13010774',6,NULL,4,NULL,'norma','rivera','guevara','','th24_00@live.com.mx','/images/system/icon-user.png',NULL,NULL),('S13010791',6,NULL,4,NULL,'LETICIA LIZBETH','ROSALES','BAUZA','','LIZZIE.BAWRO@GMAIL.COM','/images/system/icon-user.png',NULL,NULL),('s13010794',6,NULL,4,NULL,'Gabriel','Juarez','Lopez','M',NULL,'/images/system/icon-user.png',NULL,NULL),('s13010801',6,NULL,4,NULL,'Valeria','Carmona','Contal','F',NULL,'/images/system/icon-user.png',NULL,NULL),('s13010808',6,NULL,4,NULL,'Julio Cesar','Rebolledo','Rodriguez','M',NULL,'/images/system/icon-user.png',NULL,NULL),('s13010810',6,NULL,4,NULL,'Javier','Perez','Siliceo','M',NULL,'/images/system/icon-user.png',NULL,NULL),('s13010812',6,NULL,4,NULL,'Beatriz','Rosas','Ruiz','F',NULL,'/images/system/icon-user.png',NULL,NULL),('S13012631',6,NULL,4,NULL,'sandra adriana ','Tellez','Gonzalez','','adrianita_04stg@hotmail.com','/images/system/icon-user.png',NULL,NULL),('S13013333',6,NULL,1,NULL,'MARBELLA','GARCIA','RODRIGUEZ','','ALLEBRAM_94@HOTMAIL.COM','/images/system/icon-user.png',NULL,NULL),('S13013346',6,NULL,1,NULL,'Carlos Fermin','Dominguez ','Diaz','','fermincd@hotmail.com','/images/system/icon-user.png',NULL,NULL),('S13013352',6,NULL,1,NULL,'hector','rodriguez','meza','','mar_tink123@hotmail.com','/images/system/icon-user.png',NULL,NULL),('S13013353',6,NULL,1,NULL,'DIANA VICTORIA','MORALES','V','','gurakruor_2917127@hotmail.com','/images/system/icon-user.png',NULL,NULL),('S13013373',6,NULL,1,NULL,'ROBERTO','HERNANDEZ','HERNANDEZ','','beto_1322@hotmail.com','/images/system/icon-user.png',NULL,NULL),('S13013383',6,NULL,1,NULL,'Jose ali','Valdivia','Ruiz','','ppjavr@hotmail.com','/images/system/icon-user.png',NULL,NULL),('S13013396',6,NULL,1,NULL,'Yolotzin Citlali ','Zelocuahtecatl','Sigala','','yOlitOh_lOkitah@hotmail.com','/images/system/icon-user.png',NULL,NULL),('S13013447',6,NULL,1,NULL,'Ali Antonio','Luna','Landa','','jazmin.mar01@hotmail.com','/images/system/icon-user.png',NULL,NULL),('S13013466',6,NULL,1,NULL,'Mariel Verenise','Valdivia','Hernandez','','mv_swaggy@hotmail.com','/images/system/icon-user.png',NULL,NULL),('S13013467',6,NULL,1,NULL,'David','Ramirez','Ramirez','M','sharon_apple@outlook.com','/images/system/icon-user.png',NULL,NULL),('S13013472',6,NULL,1,NULL,'Martin Ulises','Badillo','Olivares','','xavi_u_escorpion@live.com.mx','/images/system/icon-user.png',NULL,NULL),('S13013488',6,NULL,1,NULL,'ZAYDA YUZMANY','AGURRE','HERNANDEZ','F','z13013488@estudiantes.uv.mx','/images/system/icon-user.png',NULL,NULL),('S13014326',6,NULL,4,NULL,'KELLY ITZEL','DELFIN','MENDEZ','','simplementeitzel@hotmail.com','/images/system/icon-user.png',NULL,NULL),('S13017051',6,NULL,3,NULL,'Luis jordan','caiceros','meza','','yordi_9511@hotmail.com','/images/system/icon-user.png',NULL,NULL),('S13017215',6,NULL,2,NULL,'ANALLELI TERESA','LANDA','L','','ana_teresa9503@hotmail.com','/images/system/icon-user.png',NULL,NULL),('s13017328',6,NULL,4,NULL,'Nirely','Toral','Landa','F',NULL,'/images/system/icon-user.png',NULL,NULL),('s13017333',6,NULL,4,NULL,'Monica','Torio','Hernandez','F',NULL,'/images/system/icon-user.png',NULL,NULL),('S13017658',6,NULL,1,NULL,'ERNESTO JOEL','RIVAS','GARCIA','','RIVAS17K@GMAIL.COM','/images/system/icon-user.png',NULL,NULL),('S13018841',6,NULL,3,NULL,'Ma. Fernanda','Fernandez','Solis','','marifer_safiro@hotmail.com','/images/system/icon-user.png',NULL,NULL),('S13022488',6,NULL,1,NULL,'tanairi','hernandez','hernandez','F','tana_h2@hotmail.com','/images/system/icon-user.png',NULL,NULL),('S13022799',6,NULL,4,NULL,'FERNANDA ','FIERRO','ARIAS','','babyffa_93@hotmail.com','/images/system/icon-user.png',NULL,NULL),('S13022800',6,NULL,4,NULL,'ivonne','ramirez','guerola','','ivon0720@hotmail.com','/images/system/icon-user.png',NULL,NULL),('S13028246',6,NULL,4,NULL,'INGRID LISSETTE','ZAMORA ','LANDA','F','zS13028246@estudiantes.uv.mx','/images/system/icon-user.png',NULL,NULL),('S13071658',6,NULL,1,NULL,'ERNESTO JOEL','RIVAS','GARCIA','','RIVAS17K@GMAIL.COM','/images/system/icon-user.png',NULL,NULL),('S14008131',6,NULL,3,NULL,'Victor','Garcia','Velasquez','M','zS14008131@esudiantes.uv.mx','/images/system/icon-user.png',NULL,NULL),('S14008923',6,NULL,5,NULL,'CESAR KAYUM','MARTINEZ','CANDELARIO','M','zS14008923@estudientes.uv.mx','/images/system/icon-user.png',NULL,NULL),('S14009635',6,NULL,2,NULL,'Andres','Andrade ','Juares','M','zS14009635@estudiantes.uv.mx','/images/system/icon-user.png',NULL,NULL),('s14011145',6,NULL,4,NULL,'Katia','Rodriguez','Ramirez','F',NULL,'/images/system/icon-user.png',NULL,NULL),('s14011151',6,NULL,4,NULL,'Melissa','Gonzalez','Carrera','F',NULL,'/images/system/icon-user.png',NULL,NULL),('s14011152',6,NULL,4,NULL,'Monserrat','Gonzalez','Carrera','F',NULL,'/images/system/icon-user.png',NULL,NULL),('s14011155',6,NULL,4,NULL,'Jorge','Odi','Quirarte','M',NULL,'/images/system/icon-user.png',NULL,NULL),('s14011156',6,NULL,4,NULL,'Rebeca','Galindo','Dominguez','F',NULL,'/images/system/icon-user.png',NULL,NULL),('s14011166',6,NULL,4,NULL,'Elsa','Aguilar','Dominguez','F',NULL,'/images/system/icon-user.png',NULL,NULL),('s14011175',6,NULL,4,NULL,'Milton','Garcia','Hernandez','M',NULL,'/images/system/icon-user.png',NULL,NULL),('S14011179',6,NULL,4,NULL,'Laura Hisela','Vazquez','De Aquino','F','zS14011179@estudiantes.uv.mx','/images/system/icon-user.png',NULL,NULL),('s14011183',6,NULL,4,NULL,'Luis Rafael','Castellanos','Machorro','M',NULL,'/images/system/icon-user.png',NULL,NULL),('s14011190',6,NULL,4,NULL,'Mario Octavio','Herrera','Muoz','M',NULL,'/images/system/icon-user.png',NULL,NULL),('s14011192',6,NULL,4,NULL,'David Eduardo','Ruiz','Chacon','M',NULL,'/images/system/icon-user.png',NULL,NULL),('s14011200',6,NULL,4,NULL,'Gregorio','Flores','Dominguez','M',NULL,'/images/system/icon-user.png',NULL,NULL),('s1401167',6,NULL,4,NULL,'Joshua','silva','cortina','M',NULL,'/images/system/icon-user.png',NULL,NULL),('S14013755',6,NULL,1,NULL,'Rogelio ','Pedraza ','Pedraza ','M','zS14013755@estudiantes.uv.mx','/images/system/icon-user.png',NULL,NULL),('S14013768',6,NULL,1,NULL,'Alan ','Pedraza ','Mejia','M','zS14013768@estudiantes.uv.mx','/images/system/icon-user.png',NULL,NULL),('s14017888',6,NULL,4,NULL,'Arely','Barradas','Baez','F',NULL,'/images/system/icon-user.png',NULL,NULL),('s14018367',6,NULL,4,NULL,'Lucero','Arguelles','Sanchez','F',NULL,'/images/system/icon-user.png',NULL,NULL),('S15008106',6,NULL,3,NULL,'FRANCISCO JAVIER','DIEZ','GONZALEZ','M','zS15008106@estudientes.uv.mx','/images/system/icon-user.png',NULL,NULL),('S15008109',6,NULL,3,NULL,'VICTOR HUGO','HERNANDEZ','VILCHIS','M','zS15008109@estudiantes.uv.mx','/images/system/icon-user.png',NULL,NULL),('S15008159',6,NULL,3,NULL,'Edgar','Aguilar ','Ruiz','M','zS15008159@estudiantes.uv.mx','/images/system/icon-user.png',NULL,NULL),('S15008182',6,NULL,3,NULL,'JOSE JORGE','MERLOS','ASENCION','M','zS15008182@estudiantes.uv.mx','/images/system/icon-user.png',NULL,NULL),('S15008190',6,NULL,3,NULL,'JOSELYNE MARLENE','GARCIA','VASQUEZ','F','zSS15008190@estudiantes.uv.mx','/images/system/icon-user.png',NULL,NULL),('S15008222',6,NULL,3,NULL,'IRVING','CALLEJAS ','COLORADO','M','zS15008222@estudiantes.uv.mx','/images/system/icon-user.png',NULL,NULL),('S15008246',6,NULL,3,NULL,'Marian Aricep','Rodriguez','Hernandez','F','zS15008246@estudiantes.uv.mx','/images/system/icon-user.png',NULL,NULL),('S15008274',6,NULL,1,NULL,'DHAMAR','CORDOBA','ROA','F','zS15008272@estudiantes.uv.mx','/images/system/icon-user.png',NULL,NULL),('S15008294',6,NULL,3,NULL,'YURIANA YAMILET','CERVANTES','LIMON','F','zS15008294@estudiantes.uv.mx','/images/system/icon-user.png',NULL,NULL),('S15008311',6,NULL,3,NULL,'VICTOR HUGO','SAGREDO','MEJIA','M','zS15008311@estudiantes.uv.mx','/images/system/icon-user.png',NULL,NULL),('S15008324',6,NULL,1,NULL,'MAYRA','ALVARADO','HERNANDEZ','F','zS15008324@estudiantes.uv.mx','/images/system/icon-user.png',NULL,NULL),('S15009591',6,NULL,1,NULL,'Itzel','Martinez','Tlaxcalteco','F','zS15009591@estudiantes.uv.mx','/images/system/icon-user.png',NULL,NULL),('S150099613',6,NULL,2,NULL,'Oscar','Huesca','Romero','M','zS150099613@estudiantes.uv.mx','/images/system/icon-user.png',NULL,NULL),('S15013668',6,NULL,1,NULL,'JOSHAN ANTONIO','VILLEGAS','RIVERA','M','zS15013668@estudiantes.uv.mx','/images/system/icon-user.png',NULL,NULL),('S15013674',6,NULL,1,NULL,'ANA LUCERO','NOLASCO','DE LA LUZ','F','zS15013674@estudiantes.uv.mx','/images/system/icon-user.png',NULL,NULL),('S15013692',6,NULL,1,NULL,'Jenrri Eulices','Escalante ','Hernandez','M','zSS15013692@estudiantes.uv.mx','/images/system/icon-user.png',NULL,NULL),('S15013706',6,NULL,1,NULL,'LIBNI CANDELARIA','RODRIGUEZ ','AVILA','F','zS15013706@estudiantes.uv.mx','/images/system/icon-user.png',NULL,NULL),('S15013758',6,NULL,1,NULL,'DANAE','BENAVIDES','MORALES','F','zS15013758@estudiantes.uv.mx','/images/system/icon-user.png',NULL,NULL),('S15024283',6,NULL,1,NULL,'Maria Elena','Ramirez ','Garcia','F','zS15024283@estudiantes.uv.mx','/images/system/icon-user.png',NULL,NULL),('S15024285',6,NULL,1,NULL,'CIRSE NAYELI','GUEVARA','VILLARAUZ','F','zS15024285@estudiantes.uv.mx','/images/system/icon-user.png',NULL,NULL);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario_atiende_mesa`
--

DROP TABLE IF EXISTS `usuario_atiende_mesa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuario_atiende_mesa` (
  `uam_id_area_atiende_mesa` int(11) NOT NULL,
  `uam_id_usuario` varchar(10) NOT NULL,
  `uam_fecha_asignacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`uam_id_area_atiende_mesa`,`uam_id_usuario`),
  KEY `uam_id_usuario` (`uam_id_usuario`),
  CONSTRAINT `usuario_atiende_mesa_ibfk_1` FOREIGN KEY (`uam_id_area_atiende_mesa`) REFERENCES `area_atiende_mesa` (`id_area_atiende_mesa`),
  CONSTRAINT `usuario_atiende_mesa_ibfk_2` FOREIGN KEY (`uam_id_usuario`) REFERENCES `usuario` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario_atiende_mesa`
--

LOCK TABLES `usuario_atiende_mesa` WRITE;
/*!40000 ALTER TABLE `usuario_atiende_mesa` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuario_atiende_mesa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario_materia`
--

DROP TABLE IF EXISTS `usuario_materia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuario_materia` (
  `uma_id_usuario` varchar(10) NOT NULL,
  `uma_id_materia` varchar(10) NOT NULL,
  `uma_status` tinyint(4) DEFAULT '1',
  `uma_fecha_inicio` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `uma_fecha_fin` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`uma_id_usuario`,`uma_id_materia`),
  KEY `uma_id_materia` (`uma_id_materia`),
  CONSTRAINT `usuario_materia_ibfk_1` FOREIGN KEY (`uma_id_usuario`) REFERENCES `usuario` (`id_usuario`),
  CONSTRAINT `usuario_materia_ibfk_2` FOREIGN KEY (`uma_id_materia`) REFERENCES `materia` (`id_materia`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario_materia`
--

LOCK TABLES `usuario_materia` WRITE;
/*!40000 ALTER TABLE `usuario_materia` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuario_materia` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-11-06 14:21:32
