<?php

// This script retrieves a bib record from Alma by its MMSID and
// converts the resulting XML to JSON.
// It expects the MMSID to be passed as a GET parameter.
//
// To configure an Alma API key, please visit:
// https://developers.exlibrisgroup.com/dashboard/application
//
// PHP 5.2 or later is required for the json_encode() function.
//
// PHP must be configured with cURL support. For more information:
// http://php.net/manual/en/curl.installation.php

$almaBase = 'https://api-na.hosted.exlibrisgroup.com/almaws/v1/bibs/' . $_GET['mmsid'] . '?';
$queryParams = http_build_query(array(
    'expand' => 'p_avail,e_avail',
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
