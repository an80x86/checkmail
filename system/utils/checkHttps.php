<?php
namespace utils;

class CheckHttps {
    public static function read($key_original,$email) {
      $base = 'https://api.hubuco.com/api/v3/?api='.$key_original.'&email='.$email;

      $curl = curl_init();
      curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE);
      curl_setopt($curl, CURLOPT_HEADER, false);
      curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
      curl_setopt($curl, CURLOPT_URL, $base);
      curl_setopt($curl, CURLOPT_REFERER, $base);
      curl_setopt($curl, CURLOPT_RETURNTRANSFER, TRUE);
      curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 0);
      $str = curl_exec($curl);
      curl_close($curl);
      return $str;
    }
}
