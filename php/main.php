<?php
	
	include("openCage/AbstractGeocoder.php");
	include("openCage/Geocoder.php");

	#Initializing cURL and parsing into JSON
	function call_json_api($url) {
		$curl = curl_init();
		$options = [
		  CURLOPT_TIMEOUT => 5000,
		  CURLOPT_URL => $url,
		  CURLOPT_RETURNTRANSFER => 1
		];
		curl_setopt_array($curl, $options);
		$output = curl_exec($curl);
	  
		return json_decode($output);
	}
	
	#Sending Request to openCage
	$geocoder = new \OpenCage\Geocoder\Geocoder('fae16bd1820142678f69cac1910d342e');
	$result = $geocoder->geocode($_REQUEST['address']);
	
	#Weather api
	$weather_url = "api.openweathermap.org/data/2.5/weather?lat=" . $result['results'][0]['geometry']['lat'] . "&lon=" . $result['results'][0]['geometry']['lng'] . "&appid=562423086a3f300c2ce8441a20f3b270";
	
	#Dealing with weather data
	$weatherOutput = call_json_api($weather_url);
	$result['results']['weather']=$weatherOutput;
	$result['results']['weatherURL']=$weather_url;
	
	#exchange rate api
	$exhange_url = "http://data.fixer.io/api/latest?access_key=fae496ce72fd165af7965eadb58e6439";
	$currencyOutput = call_json_api($exhange_url);
  
	#Dealing with exchange rate data
	$currencyCode=$result['results'][0]['annotations']['currency']['iso_code'];
	$result['results']['exchange_rate']=$currencyOutput;
	
	#Calling REST countries
	$response = file_get_contents('https://restcountries.eu/rest/v2/name/' . $result['results'][0]['components']['country']);
	$response = json_decode($response);
	$result['results']['country_info']=$response;

	
    #Sending status to enable Javascript functions
	$result['results']['status']['name'] = "ok";

    #Dealing with the response
	header('Content-Type: application/json; charset=UTF-8');	
	echo json_encode($result['results'], JSON_UNESCAPED_UNICODE) 
 ?>
