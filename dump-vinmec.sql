mysqldump: [Warning] Using a password on the command line interface can be insecure.
-- MySQL dump 10.13  Distrib 5.7.40, for Linux (x86_64)
--
-- Host: localhost    Database: vinmec-sql
-- ------------------------------------------------------
-- Server version	5.7.40

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
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `accounts` (
  `id` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_employee` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name_account` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_account` (`name_account`),
  KEY `fk_name_employee` (`name_employee`),
  KEY `fk_role` (`role`),
  CONSTRAINT `fk_name_employee` FOREIGN KEY (`name_employee`) REFERENCES `employees` (`name_employee`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_role` FOREIGN KEY (`role`) REFERENCES `roles` (`name`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts`
--

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` VALUES ('103093881','Hồ Văn Đạt','Huydat2','$2b$10$el6NIon1rHOuxqAenU6w1..FGJr.Q1c9Itqf1J4X.p/ZLg7Qq.kSW','user','2024-11-27 01:27:53'),('428702098','Đàm','Dam123','$2b$10$E5I0F8T5U5khpd0ECgyTMOVc7XU9cSy9xvXMtyxtivxzh0NqJT0MK','user','2024-12-16 19:02:20'),('708125910','Nguyễn Huy Đạt','Huydat201','$2b$10$/ZFCr65kF21IB9a1BLDcBO/S2.s/rf/iwxENYxP.F80iqSK9i9kxa','admin','2024-11-25 01:06:18');
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` mediumtext COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (318997752,'Thiết bị y tế','mô tả 3','2024-12-11 01:18:58'),(419130205,'Vật dụng y tế','mô tả 1','2024-12-11 01:14:41'),(641988910,'Dụng cụ y tế','mô tả 2','2024-12-11 01:18:35');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `departments`
--

DROP TABLE IF EXISTS `departments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `departments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departments`
--

LOCK TABLES `departments` WRITE;
/*!40000 ALTER TABLE `departments` DISABLE KEYS */;
INSERT INTO `departments` VALUES (1,'Khoa Nội','Khoa điều trị các bệnh liên quan đến nội khoa như tim mạch, tiêu hóa, hô hấp.','2024-11-22 09:55:36'),(2,'Khoa Ngoại','Khoa phẫu thuật và điều trị các bệnh cần can thiệp ngoại khoa.','2024-11-22 09:55:36'),(3,'Khoa Nhi','Khoa chăm sóc và điều trị bệnh cho trẻ em.','2024-11-22 09:55:36'),(4,'Khoa Sản','Khoa phụ trách chăm sóc sức khỏe sản phụ và trẻ sơ sinh.','2024-11-22 09:55:36'),(5,'Khoa Cấp cứu','Khoa xử lý các trường hợp khẩn cấp và cần cứu chữa ngay lập tức.','2024-11-22 09:55:36'),(6,'Khoa Chẩn đoán hình ảnh','Khoa thực hiện các xét nghiệm như X-quang, CT, MRI.','2024-11-22 09:55:36'),(7,'Khoa Xét nghiệm','Khoa xét nghiệm máu, nước tiểu và các mẫu sinh học khác.','2024-11-22 09:55:36'),(8,'Khoa Dược','Khoa cung cấp và quản lý thuốc cho bệnh viện.','2024-11-22 09:55:36'),(9,'Khoa Tai Mũi Họng','Khoa điều trị các bệnh về tai, mũi và họng.','2024-11-22 09:55:36'),(10,'Khoa Răng Hàm Mặt','Khoa điều trị và chăm sóc các vấn đề về răng, hàm và mặt.','2024-11-22 09:55:36');
/*!40000 ALTER TABLE `departments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employees`
--

DROP TABLE IF EXISTS `employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `employees` (
  `id` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_employee` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name_department` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_name_employee` (`name_employee`),
  KEY `fk_name_department` (`name_department`),
  CONSTRAINT `fk_name_department` FOREIGN KEY (`name_department`) REFERENCES `departments` (`name`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
INSERT INTO `employees` VALUES ('210514202','Nguyễn Huy Đạt','Khoa Cấp cứu','Trưởng khoa','0394105275','Vĩnh Phúc','2024-12-04 19:28:24','z3751171339796_dd6f5401160b465e53b00f62e152fc542.jpg'),('447019685','Thành Đạt','Khoa Sản','Trưởng khoa','0494435534','Hồ Chí Minh','2024-12-11 01:49:44','29t82.jpg'),('650112060','Hồ Văn Đạt','Khoa Chẩn đoán hình ảnh','Trưởng khoa','093939393','Hòa Bình','2024-12-04 22:08:43','IMG_9844.JPG'),('995955840','Đàm','Khoa Dược','Trưởng khoa','03944882','Hà Nội','2024-12-11 01:50:13','z4748571563896_3b6bc78a950e03b702c532349435c546.jpg');
/*!40000 ALTER TABLE `employees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exportDetails`
--

DROP TABLE IF EXISTS `exportDetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `exportDetails` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name_export` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_product` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantity_product` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `exportDetails_ibfk_1` (`name_export`),
  CONSTRAINT `exportDetails_ibfk_1` FOREIGN KEY (`name_export`) REFERENCES `exports` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exportDetails`
--

LOCK TABLES `exportDetails` WRITE;
/*!40000 ALTER TABLE `exportDetails` DISABLE KEYS */;
INSERT INTO `exportDetails` VALUES (6,'Đợt 1','Nhiệt kế',1),(7,'Đợt 2','Máy đo độ cận KR-800',1),(8,'Đợt 2','Máy đo huyết áp',1),(9,'Đợt 3','Máy đo độ cận KR-800',1),(10,'Đợt 4','Ống soi tai',3);
/*!40000 ALTER TABLE `exportDetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exports`
--

DROP TABLE IF EXISTS `exports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `exports` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_department` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name_employee` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `name_department` (`name_department`),
  KEY `name_employee` (`name_employee`),
  CONSTRAINT `exports_ibfk_1` FOREIGN KEY (`name_department`) REFERENCES `departments` (`name`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `exports_ibfk_2` FOREIGN KEY (`name_employee`) REFERENCES `employees` (`name_employee`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exports`
--

LOCK TABLES `exports` WRITE;
/*!40000 ALTER TABLE `exports` DISABLE KEYS */;
INSERT INTO `exports` VALUES (224211400,'Đợt 3','Khoa Chẩn đoán hình ảnh','Nguyễn Huy Đạt','2024-12-16 19:10:41'),(333882209,'Đợt 2','Khoa Chẩn đoán hình ảnh','Thành Đạt','2024-12-11 02:26:53'),(520640503,'Đợt 1','Khoa Cấp cứu','Hồ Văn Đạt','2024-12-11 02:26:17'),(691981502,'Đợt 4','Khoa Tai Mũi Họng','Thành Đạt','2024-12-16 19:11:16');
/*!40000 ALTER TABLE `exports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `importDetails`
--

DROP TABLE IF EXISTS `importDetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `importDetails` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name_import` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_product` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `quantity_product` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `name_import` (`name_import`),
  CONSTRAINT `importDetails_ibfk_1` FOREIGN KEY (`name_import`) REFERENCES `imports` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `importDetails`
--

LOCK TABLES `importDetails` WRITE;
/*!40000 ALTER TABLE `importDetails` DISABLE KEYS */;
INSERT INTO `importDetails` VALUES (21,'Đợt 2','Nhiệt kế',1),(22,'Đợt 3','Nhiệt kế',10),(23,'Đợt 3','Máy đo độ cận KR-800',10),(24,'Đợt 4','Ống soi tai',1),(25,'Đơt 5','Máy chụp cộng hưởng từ',13),(26,'Đơt 5','Máy đo huyết áp',135),(27,'Tiếp tế đợi 2','Nhiệt kế',100),(28,'Đợt 6','Ống soi tai',60),(29,'Đợi 8','Kim tiêm',100),(30,'Đợi 9','Máy chụp cộng hưởng từ',100),(31,'Đợi 9','Ống nghe nhịp tim HS-30J',199),(32,'Đợi 10','Máy đo huyết áp',195),(33,'Đợi 11','Máy đo huyết áp',18);
/*!40000 ALTER TABLE `importDetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `imports`
--

DROP TABLE IF EXISTS `imports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `imports` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `imports`
--

LOCK TABLES `imports` WRITE;
/*!40000 ALTER TABLE `imports` DISABLE KEYS */;
INSERT INTO `imports` VALUES (475328395,'Đợi 11','2024-12-16 19:14:08'),(555740099,'Đợi 10','2024-12-16 19:13:41'),(573686668,'Đơt 5','2024-12-11 02:21:49'),(637757141,'Đợt 2','2024-12-11 02:16:30'),(666352699,'Đợt 6','2024-12-16 19:12:08'),(785218965,'Đợi 8','2024-12-16 19:12:23'),(811229268,'Tiếp tế đợi 2','2024-12-16 19:11:46'),(847822301,'3','2024-12-11 02:05:50'),(849759079,'Đợt 3','2024-12-11 02:16:57'),(863106782,'Đợi 9','2024-12-16 19:13:24'),(870402268,'Đợt 4','2024-12-11 02:17:57');
/*!40000 ALTER TABLE `imports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `quantity` int(11) NOT NULL,
  `brand` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `color` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `size` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `category_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_category_name` (`category_name`),
  CONSTRAINT `fk_category_name` FOREIGN KEY (`category_name`) REFERENCES `categories` (`name`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (105064558,'Kim tiêm','Kim tiêm',101,'Acrylic','Trắng','10cm','istockphoto-1187896742-612x612.jpg','Vật dụng y tế','2024-12-10 18:45:23'),(107211832,'Ống soi tai','Ống soi tai',69,'Scope','Đen','20cm','istockphoto-173631948-612x612.jpg','Dụng cụ y tế','2024-12-10 18:39:12'),(267925681,'Kính hiển vi','Kính hiển vi',1,'MicropSer','Xanh','70cm','istockphoto-177001819-612x612.jpg','Dụng cụ y tế','2024-12-10 18:42:08'),(278770623,'Ống nghe nhịp tim HS-30J','Ống nghe nhịp tim',200,'Wellmed','Đen','50cm','istockphoto-1159847028-612x612.jpg','Vật dụng y tế','2024-12-10 18:44:01'),(654802942,'Nhiệt kế','Nhiệt kế',121,'Aurora','Trắng','15cm','istockphoto-154959351-612x612.jpg','Dụng cụ y tế','2024-12-10 18:36:09'),(700491516,'Máy chụp cộng hưởng từ','Máy chụp cộng hưởng từ',114,'Lab','Trắng','10m','istockphoto-1367581330-612x612.jpg','Thiết bị y tế','2024-12-10 18:46:03'),(754153345,'Máy đo độ cận KR-800','Máy đo độ cận',10,'Topcon','Trắng','3m','istockphoto-157558946-612x612.jpg','Thiết bị y tế','2024-12-10 18:37:37'),(912434927,'Máy đo huyết áp','Máy đo huyết áp',348,'AND UA','Be Trắng','1m','istockphoto-174863986-612x612.jpg','Dụng cụ y tế','2024-12-10 18:40:59');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` mediumtext COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'admin','admin có toàn quyền'),(2,'user','chỉ xem danh sách');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'a1','$2b$10$5Li0trULDQbxt5BqM8mFnOndsgGbDEc6uOssffFGkVbkYNp6S5a4.','vĩnh phúc','394105275',1),(2,'a2','$2b$10$KDP.Vs6j08PdmCxm9dlmYOcalrULn6fVdFBceWMmXunpDpoCvJigu','vĩnh phúc','394105275',2);
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

-- Dump completed on 2024-12-16 12:58:08
