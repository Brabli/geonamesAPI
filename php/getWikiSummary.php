<?php

	$url = "http://api.geonames.org/wikipediaSearchJSON?formatted=true&q=" . $_POST["location"] . "&maxRows=1&username=brabli&style=full";

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_URL, $url);
	$result = curl_exec($ch);
	curl_close($ch);

	$decoded = json_decode($result, true);	

	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['data'] = $decoded['geonames'];
	
	header('Content-Type: application/json; charset=UTF-8');

	echo json_encode($output);