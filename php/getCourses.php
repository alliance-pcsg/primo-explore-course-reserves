<?php

// This script retrieves all courses matching a filter and converts the resulting XML to JSON.
// It expects the filter to be passed as a GET parameter. For more information on syntax:
// https://developers.exlibrisgroup.com/alma/apis/courses/GET/gwPcGly021pX8N42Hi9+i8Te26R66L4t/25ede018-da5d-4780-8fda-a8e5d103faba
//
// To configure an Alma API key, please visit:
// https://developers.exlibrisgroup.com/dashboard/application
//
// PHP 5.2 or later is required for the json_encode() function.
//
// PHP must be configured with cURL support. For more information:
// http://php.net/manual/en/curl.installation.php

$filter = $_GET['filter'];

function getCourses($filter, $chunkSize = 100, $offset = 0, $courses = array())
{
    $url = 'https://api-na.hosted.exlibrisgroup.com/almaws/v1/courses?';
    $queryParams = array(
    'q' => $filter,
    'limit' => $chunkSize,
    'offset' => $offset,
    'order_by' => 'code,section',
    'direction' => 'ASC',
    'apikey' => 'YOUR_API_KEY_HERE'
    );
    $ch = curl_init();
    curl_setopt_array($ch, array(
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HEADER => false,
    CURLOPT_URL => $url.http_build_query($queryParams)
    ));
    $response = curl_exec($ch);
    $result = json_decode(json_encode(simplexml_load_string($response)), true); // ex libris isn't good at returning json...
    $total = (int) $result['@attributes']['total_record_count'];
    if($result['course'][0] === NULL) { // ex libris doesn't return single items as an array of length 1...
      array_push($courses, $result['course']);
    }
    else {
      foreach ($result['course'] as $course) array_push($courses, $course);
    }
    if (($total - $offset) > $chunkSize) {
        getCourses($filter, $chunkSize, ($offset + $chunkSize), $courses);
    } else {
        echo json_encode($courses);
        curl_close($ch);
    }
}

getCourses($filter);
