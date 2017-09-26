<?php
namespace utils;

use Medoo\Medoo;
use Dotenv;

class Db {
    public static function Instance() {

      $dir = dirname(__DIR__);
      $dotenv = new Dotenv\Dotenv($dir);
      $dotenv->load();
      $dotenv->required(['DB_HOST', 'DB_NAME', 'DB_USER', 'DB_PASS']);

      $database = new Medoo([
          'database_type' => 'mysql',
          'database_name' => getenv('DB_NAME'),
          'server' => getenv('DB_HOST'),
          'username' => getenv('DB_USER'),
          'password' => getenv('DB_PASS')
      ]);

      return $database;
    }
}
