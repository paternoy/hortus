<?php

require 'Slim/Slim.php';

$app = new Slim();

$app->get('/plants', 'getPlants');
$app->get('/plants/:id',	'getPlant');
$app->get('/plants/search/:query', 'findByName');

$app->run();

function getPlants() {
	$sql = "select * FROM plant ORDER BY name";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);  
		$plants = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo json_encode($plants);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getPlant($id) {
	$sql = "SELECT * FROM plant WHERE idPlant=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$plant = $stmt->fetchObject();  
		$db = null;
		echo json_encode($plant); 
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}


function findByName($query) {
	$sql = "SELECT * FROM plant WHERE UPPER(name) LIKE :query ORDER BY name";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$query = "%".$query."%";  
		$stmt->bindParam("query", $query);
		$stmt->execute();
		$plants = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo json_encode($plants);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getConnection() {
	$dbhost="127.0.0.1";
	$dbuser="hortus_dev";
	$dbpass="hortus_dev";
	$dbname="hortus";
	$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8'"));	
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	return $dbh;
}

?>