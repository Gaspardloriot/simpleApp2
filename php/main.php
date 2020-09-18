<?php
	
	include("openCage/AbstractGeocoder.php");
	include("openCage/Geocoder.php");
	
	
	$executionStartTime = microtime(true) / 1000;

	$geocoder = new \OpenCage\Geocoder\Geocoder('fae16bd1820142678f69cac1910d342e');
	$result = $geocoder->geocode($_REQUEST['address']);
	
	$result['results']['status']['name'] = "ok";

    #Dealing with the response
	header('Content-Type: application/json; charset=UTF-8');	
	echo json_encode($result['results'], JSON_UNESCAPED_UNICODE) 
    

?>
