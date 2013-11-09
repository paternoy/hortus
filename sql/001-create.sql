delimiter $$
CREATE DATABASE `hortus` /*!40100 DEFAULT CHARACTER SET utf8 */;

CREATE TABLE `plant` (
  `id` int(11) NOT NULL,
  `species` varchar(45) NOT NULL,
  `name` varchar(45) NOT NULL,
  `description` varchar(300) DEFAULT NULL,
  `picture` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`idplant`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

$$