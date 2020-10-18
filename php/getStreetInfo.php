<?php

	$url = "http://api.geonames.org/streetNameLookupJSON?q=" . $_POST["term"] . "&username=brabli";

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_URL, $url);
	$result = curl_exec($ch);
	curl_close($ch);

	$decoded = json_decode($result, true);	

	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['data'] = $decoded['address'];
	
	header('Content-Type: application/json; charset=UTF-8');

	echo json_encode($output);