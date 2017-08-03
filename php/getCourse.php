<?php

// This script retrieves a course by its ID from Alma and
// converts the resulting XML to JSON.
// It expects the course ID to be passed as a GET parameter.
//
// To configure an Alma API key, please visit:
// https://developers.exlibrisgroup.com/dashboard/application
//
// PHP 5.2 or later is required for the json_encode() function.
//
// PHP must be configured with cURL support. For more information:
// http://php.net/manual/en/curl.installation.php

$cid = $_GET['cid'];
$almaBase = 'https://api-na.hosted.exlibrisgroup.com/almaws/v1/courses/' . $_GET['cid'] . '?';
$queryParams = http_build_query(array(
    'view' => 'full',
    'apikey' => 'YOUR_API_KEY_HERE'
));
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $almaBase . $queryParams);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HEADER, false);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');
$response = curl_exec($ch);
curl_close($ch);
$xml = simplexml_load_string($response);
echo json_encode($xml);
