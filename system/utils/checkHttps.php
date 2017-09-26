<?php
namespace utils;

class CheckHttps {
    public static function set($key,$value) {
      $_SESSION[$key] = $value;
    }
    public static function get($key) {
      if(isset($_SESSION[$key])){
          return $_SESSION[$key];
      }
      return "";
    }
    public static function kill() {
      session_unset();
      session_destroy();
    }
}
