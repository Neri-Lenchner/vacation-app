-- MySQL dump 10.13  Distrib 8.0.46, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: vacations
-- ------------------------------------------------------
-- Server version	8.0.46

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `all_vacations`
--

DROP TABLE IF EXISTS `all_vacations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `all_vacations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `destination` varchar(45) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `startDate` datetime NOT NULL,
  `endDate` datetime NOT NULL,
  `cost` int NOT NULL,
  `imageName` varchar(300) DEFAULT NULL,
  `isSeed` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=159 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `all_vacations`
--

LOCK TABLES `all_vacations` WRITE;
/*!40000 ALTER TABLE `all_vacations` DISABLE KEYS */;
INSERT INTO `all_vacations` (id, destination, description, startDate, endDate, cost, imageName) VALUES (10,'Rome','Step into the heart of history in Rome, where ancient ruins and modern life coexist. Visit the Colosseum, explore the Roman Forum, and admire the art of Vatican City. Enjoy authentic Italian cuisine in lively piazzas and wander streets filled with culture and stories. Rome offers a journey through time, combining rich heritage, architecture, and unforgettable experiences for every traveler.','2026-04-10 00:00:00','2026-04-18 00:00:00',7800,'app_1775697020291.jpeg'),(11,'Barcelona','Discover the vibrant charm of Barcelona, a city known for its architecture, beaches, and atmosphere. Explore Gaudí’s masterpieces, stroll along La Rambla, and relax by the Mediterranean Sea. Enjoy tapas and immerse yourself in local culture and nightlife. Barcelona blends artistic beauty, coastal relaxation, and city life, making it an ideal destination for travelers seeking memorable experiences.','2026-05-08 00:00:00','2026-05-15 00:00:00',8200,'app_1775704864173.jpeg'),(12,'New York','Explore the excitement of New York City, where iconic landmarks and opportunities await. Visit Times Square, walk through Central Park, and experience entertainment on Broadway. Discover neighborhoods, enjoy international cuisine, and shop in famous districts. The city’s energy, culture, and activity create an unforgettable experience, making New York a top destination for travelers seeking adventure, inspiration, and urban exploration.','2026-08-01 00:00:00','2026-08-08 00:00:00',9200,'app_1775698112061.jpeg'),(13,'London','Experience the rich history and modern culture of London, a city filled with iconic landmarks and energy. Visit Buckingham Palace, explore the Tower of London, and admire Big Ben. Discover museums, markets, and neighborhoods offering experiences. Enjoy traditional cuisine and contemporary dining while exploring this capital. London blends history, culture, and innovation, making it a must-visit destination for travelers.\n','2026-09-10 00:00:00','2026-09-18 00:00:00',8700,'app_1775704760782.jpeg'),(14,'Dubai','Discover luxury and innovation in Dubai, a city known for its skyline and experiences. Visit the Burj Khalifa, explore shopping malls, and enjoy desert adventures. Relax on beaches and experience dining and entertainment. Dubai offers a blend of modern attractions and cultural heritage, creating a destination that combines excitement and unforgettable experiences for travelers seeking extraordinary.','2026-11-01 00:00:00','2026-11-07 00:00:00',9800,'app_1775698019409.jpeg'),(15,'Bangkok','Experience the vibrant energy of Bangkok, a city full of culture and excitement. Visit ornate temples, explore bustling markets, and enjoy street food. Cruise along the river and discover hidden corners filled with tradition and charm. Bangkok offers a dynamic mix of history, nightlife, and modern attractions, making it an unforgettable destination. Enjoy lively street life, and rich cultural experiences throughout your journey, day and night.','2026-03-15 00:00:00','2026-03-22 00:00:00',6000,'app_1775704949715.jpeg'),(16,'Sydney','Enjoy the beauty of Sydney, a city known for its harbor and iconic landmarks. Visit the Sydney Opera House, relax on Bondi Beach, and explore neighborhoods. Discover local cuisine, outdoor adventures, and attractions throughout the city. Sydney offers a balance of urban excitement and natural beauty, making it an ideal destination for travelers seeking relaxation and unforgettable experiences.','2026-04-01 00:00:00','2026-04-20 00:00:00',10000,'app_1775697157322.jpeg'),(17,'Amsterdam','Explore the charming canals and rich culture of Amsterdam, a city known for its artistic heritage and vibrant atmosphere. Visit world-famous museums, cycle through scenic streets, and relax in cozy cafés. Discover historic landmarks and enjoy the city\'s unique blend of history and modern lifestyle, making it an unforgettable destination for travelers seeking beauty, culture, and relaxation.','2026-04-01 00:00:00','2026-04-27 00:00:00',7500,'app_1776056311872.jpeg'),(18,'Berlin','Dive into the dynamic history and modern culture of Berlin, a city full of creativity and innovation. Visit historical landmarks, explore vibrant neighborhoods, and enjoy a thriving arts and nightlife scene. Berlin offers a unique blend of past and present, making it a fascinating destination for travelers seeking culture, history, and excitement.','2026-05-15 00:00:00','2026-05-22 00:00:00',7800,'app_1775698226849.jpeg'),(24,'Buenos Aires','Discover the passion of Buenos Aires, a city known for tango, culture, and cuisine. Explore historic neighborhoods, enjoy local food, and experience vibrant nightlife. Buenos Aires offers a rich cultural journey.','2026-04-11 00:00:00','2026-04-17 00:00:00',2000,'app_1775768681248.jpeg'),(26,'Prague','Discover the fairytale charm of Prague, a city filled with stunning architecture and historic beauty. Walk across the Charles Bridge, explore Prague Castle, and enjoy the magical atmosphere of the Old Town. Prague offers a perfect mix of history, romance, and culture for an unforgettable experience.','2026-06-16 00:00:00','2026-06-18 00:00:00',7200,'app_1775657458512.jpeg'),(29,'Vienna','Experience the elegance of Vienna, a city known for its classical music, imperial history, and stunning architecture. Visit grand palaces, enjoy traditional coffee houses, and explore cultural landmarks. Vienna offers a refined and enriching travel experience full of art and history.','2026-04-09 00:00:00','2026-04-15 00:00:00',8300,'app_1775661191229.jpeg'),(30,'Lisbon','Enjoy the coastal beauty and vibrant culture of Lisbon, a city known for its colorful streets and scenic views. Ride historic trams, explore charming neighborhoods, and taste delicious local cuisine. Lisbon offers a relaxed yet lively atmosphere perfect for travelers.','2026-05-08 00:00:00','2026-05-22 00:00:00',7600,'app_1775661334930.jpeg'),(33,'Seoul','Discover the dynamic culture of Seoul, where tradition meets innovation. Visit palaces, explore markets, and enjoy modern entertainment. Seoul offers a unique and exciting travel experience.','2026-10-20 00:00:00','2026-10-27 00:00:00',9300,'app_1776055232823.jpeg'),(42,'Stockholm','Experience the beauty of Stockholm, a city spread across stunning islands. Explore historic districts, enjoy waterfront views, and discover Scandinavian culture. Stockholm offers a unique mix of nature and urban life.','2026-04-03 00:00:00','2026-05-22 00:00:00',9000,'app_1775682270654.jpeg'),(44,'Athens','Step into ancient history in Athens, the birthplace of democracy and philosophy. Visit the Acropolis, explore ancient ruins, and enjoy Mediterranean cuisine. Athens combines rich history with modern city life, offering a unique and inspiring travel experience.','2026-04-10 00:00:00','2026-04-24 00:00:00',3000,'app_1775690307899.jpeg'),(45,'Reykjavik','Discover the unique landscapes of Reykjavik, a gateway to Iceland’s natural wonders. Experience geysers, waterfalls, and the northern lights. Reykjavik offers adventure and breathtaking scenery unlike anywhere else.','2026-04-23 00:00:00','2026-04-30 00:00:00',1000,'app_1775691288922.jpeg'),(46,'Cape Town','Enjoy the stunning beauty of Cape Town, surrounded by mountains and ocean. Visit Table Mountain, explore beaches, and discover local culture. Cape Town offers a perfect mix of nature and city life.','2026-07-08 00:00:00','2026-07-29 00:00:00',9000,'app_1775696346386.jpeg'),(47,'Rio de Janeiro','Experience the vibrant spirit of Rio de Janeiro, famous for its beaches and lively culture. Visit Christ the Redeemer, relax on Copacabana, and enjoy the city’s energy. Rio offers unforgettable excitement and beauty, with samba rhythms, colorful festivals, scenic mountains, and warm hospitality that captivate every traveler year-round.','2026-04-28 00:00:00','2026-05-30 00:00:00',5000,'app_1775703068878.jpeg'),(76,'Mexico City','Explore the rich history and culture of Mexico City, filled with museums, markets, and cuisine. Visit ancient ruins and vibrant neighborhoods. The city offers a dynamic and colorful travel experience.','2026-03-26 00:00:00','2026-04-09 00:00:00',9800,'app_1776019545787.jpeg'),(77,'Toronto','Experience the diversity of Toronto, a city known for its multicultural vibe and iconic skyline. Visit landmarks, explore neighborhoods, and enjoy global cuisine. Toronto offers a modern and lively travel experience.','2026-03-31 00:00:00','2026-04-14 00:00:00',9000,'app_1776019663765.jpeg'),(79,'Vancouver','Enjoy the natural beauty of Vancouver, surrounded by mountains and ocean. Explore parks, outdoor activities, and vibrant city life. Vancouver offers a perfect blend of adventure and relaxation.','2026-04-01 00:00:00','2026-04-30 00:00:00',9400,'app_1776053943133.jpeg'),(80,'Singapore','Experience the modern marvel of Singapore, known for its cleanliness and innovation. Explore gardens, enjoy diverse cuisine, and visit iconic attractions. Singapore offers a futuristic and vibrant atmosphere. from Marina Bay Sands to Sentosa Island, blending nature, technology, culture, shopping, and unforgettable waterfront city experiences for every traveler','2026-03-19 00:00:00','2026-03-31 00:00:00',9700,'app_1776055769923.jpeg'),(111,'Hong Kong','Explore the dynamic city of Hong Kong, known for its skyline and bustling streets. Enjoy shopping, cuisine, and cultural attractions. Hong Kong offers a fast-paced and exciting travel experience.','2026-05-22 00:00:00','2026-05-29 00:00:00',9900,'app_1776285158219.jpeg'),(112,'Istanbul','Experience the unique blend of East and West in Istanbul, a city rich in history and culture. Visit mosques, bazaars, and historic sites. Istanbul offers a fascinating journey through time and tradition.','2026-04-29 00:00:00','2026-05-28 00:00:00',8000,'app_1776285680621.jpeg');
/*!40000 ALTER TABLE `all_vacations` ENABLE KEYS */;
UNLOCK TABLES;

-- Mark all seeded vacations as protected baseline demo data
UPDATE `all_vacations` SET `isSeed` = 1;

--
-- Table structure for table `followers`
--

DROP TABLE IF EXISTS `followers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `followers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `vacationId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId_idx` (`userId`),
  KEY `vacationId_idx` (`vacationId`),
  CONSTRAINT `userId` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `vacationId` FOREIGN KEY (`vacationId`) REFERENCES `all_vacations` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=558 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `followers`
--

LOCK TABLES `followers` WRITE;
/*!40000 ALTER TABLE `followers` DISABLE KEYS */;
INSERT INTO `followers` VALUES (119,11,14),(122,11,13),(123,11,11),(168,10,11),(198,13,12),(204,13,13),(215,10,17),(220,14,18),(222,14,10),(223,14,16),(224,14,17),(225,14,15),(241,10,13),(264,10,14),(265,10,24),(271,13,24),(272,13,42),(274,13,33),(275,13,14),(277,10,33),(278,10,42),(280,22,24),(281,22,14),(282,22,46),(283,22,30),(284,22,26),(285,22,45),(287,22,44),(288,22,17),(289,22,33),(290,21,24),(291,21,14),(292,21,13),(293,21,26),(294,21,47),(295,21,15),(296,21,17),(297,21,44),(298,21,45),(304,13,47),(305,13,26),(311,23,42),(312,23,33),(314,23,29),(315,23,44),(324,23,24),(328,23,14),(329,23,13),(330,23,12),(332,23,47),(333,23,26),(336,23,11),(337,23,46),(371,23,10),(376,23,17),(377,23,16),(383,24,76),(384,24,77),(385,24,33),(386,24,16),(387,24,42),(388,24,29),(389,24,10),(390,13,77),(392,23,80),(393,22,15),(403,25,15),(405,25,76),(406,25,16),(407,25,79),(408,25,17),(409,15,15),(410,15,80),(412,15,76),(413,15,16),(414,15,17),(416,23,76),(417,23,18),(418,11,16),(420,11,79),(422,11,46),(423,11,47),(424,11,18),(425,11,30),(426,11,26),(427,11,24),(429,26,80),(432,28,80),(433,28,76),(434,28,42),(435,28,29),(436,28,33),(437,28,14),(438,29,44),(439,29,24),(440,29,45),(441,29,111),(442,29,26),(443,29,112),(444,29,30),(446,29,16),(447,29,17),(448,29,79),(449,29,10),(450,29,42),(456,30,16),(458,30,17),(459,30,79),(460,30,10),(463,31,80),(464,31,76),(465,31,15),(466,31,30),(467,31,112),(468,31,45),(476,32,17),(480,13,112),(481,13,45),(482,13,18),(487,13,30),(488,13,17),(489,13,44),(490,11,15),(492,11,17),(493,11,42),(494,11,111),(495,11,33),(499,23,45),(501,33,15),(503,33,17),(504,33,79),(505,33,33),(506,33,11),(514,35,17),(518,13,76),(526,13,15),(527,35,15),(531,13,16),(532,13,111),(539,30,14),(540,30,11),(541,30,46),(542,30,13),(543,30,33),(544,30,26),(545,30,12),(546,30,42),(547,30,112),(551,30,15);
/*!40000 ALTER TABLE `followers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(45) NOT NULL,
  `lastName` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(120) NOT NULL,
  `isAdmin` tinyint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (2,'Neri','Lenchner','n.l.y.a.lench@gmail.com','$2b$10$5hdj1C9C.lkQcNujoWyJye0MOjBwmH0T21n7fRL.Zx1yDEpmC9gZe',1),(3,'Lital','Lenchner','lital@gmail.com','$2b$10$X5G1Z4DY9OTfmIKnkJ3w2O5pC5jZVcJLvxCPf83OPYiRgnebRN1.u',1),(4,'Martial','Buhsira','marsss@gmail.com','$2b$10$3IMS1FUbbZhVkBiHRh.bIO4L/LDVlu5b63E9DUM5aqi/GqHOthQIm',0),(5,'Jimmy','Page','jimmy@gmail.com','$2b$10$L.p289wOniT1.ZatzXBoluW2uJy7W4C4BqLVwFFu0oxcKWkm7MFtC',0),(6,'itsik','shamly','itsik@gmail.com','$2b$10$7OIOxObzFjpIAZmIT7RkKOAzBA30PdqQ7wasGyRqnP.92p2zfSzLG',0),(7,'bibi','netanyahu','bibi@gmail.com','$2b$10$jJG0IaZZMXSBT0/KX/KcBO1dWB/YWwgkr6FQTpxlmaJQk7V1SydAi',0),(8,'ron','huldaee','ron@gmail.com','$2b$10$Chdx2lTDNYtkc4bLoyPmS.biwOWffkenQF8pWE51U5mjBYK4KfF86',0),(10,'Eli','Lenchner','eli@gmail.com','$2b$10$vN/iA/oZgOabGV0T28UqD.eYZEKAxNAEDf/i6wlEINT1H6H3nWgSy',0),(11,'Yahli','Lenchner','yhali@gmail.com','$2b$10$uPOLnpBmMtnnGEw/IrMQau1HiHFklwDeWPXr/BSp3BSFiqzi008ZS',0),(13,'Nevo','Lenchner','nevo@gmail.com','$2b$10$XD0dV6VGQayB/tL211nNAujnqYQMt4cdZgC2ywCG3MsU0qEaMER.u',0),(14,'Yahli','Lenchner','yahli@gamil.com','$2b$10$fMimgmZhWWAWnbTAFiWB8Oq2BqetVv8uIYagZBTTr4jCZ0kNDCPFi',0),(15,'shlumper','bumper','shlumper@gmail.com','$2b$10$tRdyKROyiHWOeoR4fV8jJe6wNRnrGUDwR7eIIaB4HXh7/Y7EeSa1u',0),(16,'jimm','bummerang','jimy@gmail.com','$2b$10$ApzFtFczTi1gYLLLrR.X0.QRW4P.6od9W4hU1snCwyK5FdxG0QSZy',0),(17,'Avi','Toledano','avi@gmail.com','$2b$10$KtfPza6SvbxzOXh3aHqs8u4zpBUtRv1F/uCrRB.gvjqlYAW/aWkzW',0),(18,'Moshe','Sharet','shret@gmamil.com','$2b$10$Vf2yrGkGwF5Tozvs8iob5uZSPKVG1e83Jb9QRGvr8aQM/a6IeGUbO',0),(19,'Amos','Keinan','amos@gmail.com','$2b$10$1pZDbPqjsLWs2SKAEjAFQukF1sZ6NJCY93E7ub9TIc5h5g.sJehvS',0),(20,'Moshe','Bar','moshebar@gamil.com','$2b$10$LdrFeCJECZnX4/9wGnA5PexNdpDHmNo/hfYqt.7GCtHOPLC/tLaHC',0),(21,'Ariel','Lenchner','ariel@gmail.com','$2b$10$fCJRNyMKDZynRwCi69nD1e8yRxMD4Jd7KiVnNj5lwnC4zJyqg4dzm',0),(22,'Eli','Kopter','elikopter@gmail.com','$2b$10$MNY3qThSne7pVUw0D7jddO73h9RPGfTLzEE1kxaPr1sjjoAbiDKX2',0),(23,'Danny','Lugashy','danny@gmail.com','$2b$10$nLOwTRUsZNM.OCMj2I4sWeBwgd9Q07mgEQA0tgrhyyLYSJaaJLmIi',0),(24,'Jack','Hemoglushpeck','jack@gmail.com','$2b$10$lMSL00gW5CIA78CRUGRbcOwNsna4cM2qR0kDJhWm1mF/zksrIrQky',0),(25,'Shlomi','Malka','shlomiMalka@yahoo.com','$2b$10$AZknBlYWPChUE6fDlfLT.es.53VVg5IkncIKWvkxPNsQOO3mGLu1S',0),(26,'Emily','Watson','emily@gmail.com','$2b$10$B1J5YTddLuYou2Qf7jFF/uZ7V5sqdNM1Dn5614N6CDVuwtf0pnX9m',0),(27,'Jack','Sparrow','jackSparow@gmail.com','$2b$10$CnZZCaHLvdc9L74BBEsC5ujvRtCwgjQ.MUkEzGgvkQtTji4mQiSsa',0),(28,'Roger','Waters','roger@yahoo.com','$2b$10$8LJrbw0kt8IzqGhc.BqXK.XKRUHCVlnbOhOjY0sjOnKvI417A1rq2',0),(29,'James','Din','james@gmail.com','$2b$10$D0dZOZ4/zyNce58pMBFxouzAqm71FZnk9qP.7Nf4jJByH4whMlAgW',0),(30,'David ','Gilmor','david@gmail.com','$2b$10$x82Pj1o5gBKSFW3JNPazz.Xg6q/vTi9shpQ8FDkqQBhF9aF7JVrlq',0),(31,'Ilan','Lugashy','ilan@gmail.com','$2b$10$NBKEiwSxhN4uIgdXF.bHS.ejic0BF7UkMMTlBbysFFgV8PdfPlp9i',0),(32,'Mr.sandman','sandman','mrSandMan@gmail.com','$2b$10$bXJyymRMscu6RAtAJiDxbuW/TrKebcucqC24mwPG7kWEcE9gpatWW',0),(33,'Mr.sandman','bring me a dream','sandman@yahoo.com','$2b$10$8o.ao/PsGSOTzihd.QdqoeMrCmjbr4wOFdQotRzYGPg4c7mau.dZm',0),(35,'אריאל שילה','לנצ\'נר','arielShilo@gamil.com','$2b$10$4P0eImM5kEV9OGj4.PyV8uDRcUBWUPbTUyebCdjNauDmkHk1AzfBq',0);
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

-- Dump completed on 2026-05-11 21:36:31
