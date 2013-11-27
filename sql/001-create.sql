delimiter $$
CREATE DATABASE `hortus` /*!40100 DEFAULT CHARACTER SET utf8 */;

CREATE TABLE `plant` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `species` varchar(45) NOT NULL,
  `name` varchar(45) NOT NULL,
  `description` varchar(300) DEFAULT NULL,
  `picture` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `vocabulary_id` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `plant_category` (
  `plant_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  PRIMARY KEY (`plant_id`,`category_id`),
  KEY `fk_plant_category_1` (`plant_id`),
  KEY `fk_plant_category_2` (`category_id`),
  CONSTRAINT `fk_plant_category_1` FOREIGN KEY (`plant_id`) REFERENCES `plant` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_plant_category_2` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


$$