<?php

$file = 'cache.json';
$now = time();
$then = filemtime($file);
if ($now - $then > 60 * 30) {
    $cookie = '53616c7465645f5f35cc10ab24a554898d6e2e736926c7684f655a5a95c37705f6b13274e2624745a01f7ff4f212916dfa4d0dd59ae356471fa3c9d4414ccc98';
    $opts = array(
        'http'=>array(
            'method'=>"GET",
            'header'=>"Accept-language: en\r\n" .
                    "Cookie: session=$cookie\r\n"
        )
    );
    $context = stream_context_create($opts);
    $content = file_get_contents('https://adventofcode.com/2022/leaderboard/private/view/203774.json', false, $context);
    file_put_contents($file, $content);
} else {
    $content = file_get_contents($file);
}
echo $content;