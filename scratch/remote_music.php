<?php


header("Content-Type: text/event-stream");
header("Cache-Control: no-cache");
// Get the current time on server
$currentTime = date("h:i:s", time());
// Send it in a message
echo "data: " . file_get_contents('remote_music.log') . "\n\n";
flush();
