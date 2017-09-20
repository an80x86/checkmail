<?php
namespace utils;

use Medoo\Medoo;

class Db {
    public static function Instance() {
      $database = new Medoo([
          'database_type' => 'mysql',
          'database_name' => 'checkmail',
          'server' => '127.0.0.1',
          'username' => 'finley',
          'password' => 'some_pass'
      ]);
      return $database;
    }
}
