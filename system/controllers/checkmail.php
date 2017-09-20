<?php
namespace controllers;

class checkmail {
    public static function check() {
        echo 'hello world!';
    }
}

/*
$base = 'https://api.hubuco.com/api/v3/?api=CyJIuhKewVUMjge&email='.$_GET['mail'];

$curl = curl_init();
curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE);
curl_setopt($curl, CURLOPT_HEADER, false);
curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($curl, CURLOPT_URL, $base);
curl_setopt($curl, CURLOPT_REFERER, $base);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, TRUE);
$str = curl_exec($curl);
curl_close($curl);

$str = str_replace("\n","",$str);
echo $str;
*/
