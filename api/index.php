<?php

require 'Slim/Slim.php';
\Slim\Slim::registerAutoloader();

$app = new \Slim\Slim();

$configFile = parse_ini_file('hortus.ini');
foreach ($configFile as $key => $value){
	$app->config($key,$value);
}

$log = $app->getLog();
$log->setEnabled(true);
$log->setLevel(\Slim\Log::DEBUG);

$app->get('/plants', 'getPlants');
$app->get('/plants/:id',	'getPlant');
$app->get('/plants/:id/cycles',	'getPlantCycles');
$app->get('/plants/search/:query', 'findByName');
$app->post('/plants', 'addPlant');

$app->run();

function addPlant(){
	$request = \Slim\Slim::getInstance()->request();
   	$plant = json_decode($request->getBody());
    $sql = "INSERT INTO plant (id, name, species, description) VALUES (:id, :name, :species, :description)";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("id", $plant->id);
        $stmt->bindParam("species", $plant->species);
        $stmt->bindParam("name", $plant->name);
        $stmt->bindParam("description", $plant->description);
        $stmt->execute();
        $plant->id = $db->lastInsertId();
        $db = null;
        echo json_encode($plant);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

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
	$sql = "SELECT * FROM plant WHERE id=:id";
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

function getPlantCycles($plantId) {
	$sql = "SELECT * FROM crop_cycle WHERE plant_id=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$stmt->bindParam("id", $plantId);
		$stmt->execute();
		$cropCycles = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo json_encode($cropCycles);
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
	$app = \Slim\Slim::getInstance();
	$dbhost=$app->config('host');
	$dbuser=$app->config('user');
	$dbpass=$app->config('pass');
	$dbname=$app->config('database');
	$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8'"));	
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	return $dbh;
}

?>