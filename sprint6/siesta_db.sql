CREATE DATABASE  IF NOT EXISTS `siesta_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `siesta_db`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: siesta_db
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `image` varchar(255) DEFAULT NULL,
  `product_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `images_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=296 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES (1,'IMG-1701889447692.jpg',1),(2,'IMG-1701889447828.jpg',1),(3,'IMG-1701889447837.jpg',1),(4,'IMG-1701889447845.jpg',1),(5,'IMG-1701889447855.jpg',1),(6,'IMG-1701889447867.jpg',1),(7,'IMG-1704699881719.jpg',2),(8,'IMG-1704699881720.jpg',2),(9,'IMG-1704699881721.jpg',2),(10,'IMG-1704699881722.jpg',2),(11,'IMG-1704699881723.jpg',2),(12,'IMG-1704699881724.jpg',2),(13,'IMG-1704859312427.jpg',3),(14,'IMG-1704859312470.jpg',3),(15,'IMG-1704859312474.jpg',3),(16,'IMG-1704859312475.jpg',3),(17,'IMG-1704859312476.jpg',3),(18,'IMG-1704859312477.jpg',3),(19,'IMG-1704859653666.jpg',4),(20,'IMG-1704859653667.jpg',4),(21,'IMG-1704859653668.jpg',4),(22,'IMG-1704859653669.jpg',4),(23,'IMG-1704859653670.jpg',4),(24,'IMG-1704859653671.jpg',4),(25,'IMG-1704860073491.jpg',5),(26,'IMG-1704860073492.jpg',5),(27,'IMG-1704860073493.jpg',5),(28,'IMG-1704860073494.jpg',5),(29,'IMG-1704860073495.jpg',5),(30,'IMG-1704860073496.jpg',5),(31,'IMG-1704860345857.jpg',6),(32,'IMG-1704860345858.jpg',6),(33,'IMG-1704860345859.jpg',6),(34,'IMG-1704860345860.jpg',6),(35,'IMG-1704860345861.jpg',6),(36,'IMG-1704860345862.jpg',6);
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_detail`
--

DROP TABLE IF EXISTS `order_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_detail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `quantity` varchar(100) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `total` decimal(10,2) DEFAULT NULL,
  `order_date` date DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `order_detail_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  CONSTRAINT `order_detail_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_detail`
--

LOCK TABLES `order_detail` WRITE;
/*!40000 ALTER TABLE `order_detail` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `color` varchar(255) DEFAULT NULL,
  `size` varchar(255) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Blazer straight fit','Blazer straight fit confeccionada en tejido de algodón. Cuello con solapas de muesca y manga larga. Bolsillo de vivo en pecho y de solapa en cadera. Cierre frontal de botonadura.','Hombre','Marrón / Topo | 4387/30','S, M, L, XL',50000.00),(2,'Camisa satinada botón','Camisa satinada de cuello solapa y manga larga acabada en vuelta con botón. Cierre frontal con botones ocultos por solapa.','Mujer','Rosa | 8616/845','XS, S, M, L',15000.00),(3,'Cazadora acolchada water repellent','Cazadora acolchada confeccionada en tejido técnico con acabado water repellent. Cuello subido y manga larga. Bolsillos frontales de vivo y detalle de bolsillo interior. Bajo acabado con elástico. Cierre frontal con cremallera oculta por solapa con botones a presión.','Hombre','Marrón vigoré | 7380/657','S, M, L, XL',30000.00),(4,'Chaqueta larga acolchada ZW collection','Chaqueta acolchada larga con capucha ajustable con cordones. Manga larga con elástico interior. Bolsillos con solapa en delantero. Cierre frontal con botones a presión.','Mujer','Oliva | 0518/255','XS, S, M, L',50000.00),(5,'Pantalón cargo parachute','Pantalón de cintura elástica ajustable. Bolsillos frontales y detalle de bolsillos de vivo en espalda. Aplicación de bolsillos plastrón con solapa en delantero. Pliegues en rodillas. Bajo ajustable con elástico en laterales.','Hombre','Negro | 4575/300','S, M, L, XL',23000.00),(6,'Pantalón recto tiro bajo','Pantalón de tiro bajo y cintura con trabillas. Bolsillos laterales y de vivo en espalda. Pierna recta y bajo acabado en línea evasé. Cierre frontal con cremallera y botones.','Mujer','Negro | 4432/517','XS, S, M, L',20000.00);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role` varchar(255) DEFAULT NULL,
  `licenses` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Administrador',1),(2,'Cliente',0);
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `role_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `rol_id` (`role_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Admin','Siesta','admin_siesta@email.com','$2a$10$hvu9pBBmxdPH3g75dPsuj.5iT3a80zbG1FmGELb/JiELED4uwAPMu','IMG-1707324419185.png',1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-08 14:47:00
