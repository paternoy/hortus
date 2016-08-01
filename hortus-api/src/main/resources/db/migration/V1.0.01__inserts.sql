INSERT INTO `category`(`id`,`name`) VALUES (0,'Hortalizas');
INSERT INTO `category`(`id`,`name`) VALUES (1,'Aromáticas');


INSERT INTO `plant` (`id`,`species`,`name`,`description`,`picture`) VALUES (0,'Solanum lycopersicum','Tomate','El tomate, jitomate o tomatera es una planta de la familia de las solanáceas originaria de México y cultivada en todo el mundo por su fruto comestible','img/thumbnails/tomato.jpg');
INSERT INTO `plant` (`id`,`species`,`name`,`description`,`picture`) VALUES (1,'Lactuca sativa','Lechuga','Lactuca sativa, la lechuga, es una planta anual propia de las regiones semi-templadas, que se cultiva con fines alimentarios','img/thumbnails/lettuce.jpg');
INSERT INTO `plant` (`id`,`species`,`name`,`description`,`picture`) VALUES (2,'Cucumis sativus','Pepino','Cucumis sativus, conocido popularmente como pepino, es una planta herbácea anual de la familia de las cucurbitáceas.','img/thumbnails/cucumber.jpg');

INSERT INTO `plant_category` (`plant_id`,`category_id`) VALUES (0,0);
INSERT INTO `plant_category` (`plant_id`,`category_id`) VALUES (1,0);
INSERT INTO `plant_category` (`plant_id`,`category_id`) VALUES (2,0);