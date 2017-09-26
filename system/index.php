<?php
session_start();
require 'vendor/autoload.php';

require 'controllers/checkmail.php';

require 'utils/db.php';
require 'utils/session.php';
require 'utils/checkHttps.php';

// Using Medoo namespace
use flight\Engine;

use controllers\checkmail as cm;

use utils\Db as db;
use utils\Session as ses;
use utils\CheckHttps as ch;

Flight::route('POST /login', function(){
    $myArray = (array)Flight::request()->data->getData();

    $count = db::Instance()->count("Users", [
      "name" => $myArray["uname"],
      "pass" => $myArray["upass"],
     ]);

    ses::set("user",$myArray["uname"]);
    echo $count;
});

Flight::route('/tasks', function(){
  $user = ses::get("user");
  $id = 0;
  $temp = db::Instance()->query(
     "SELECT * FROM Users WHERE name = :name", [
     ":name" => ses::get("user")
    ]
  )->fetchAll();
  if (sizeof($temp)>0) $id = $temp[0]["id"];

  $temp = db::Instance()->query(
     "SELECT id, name, val, c_date FROM Tasks WHERE user_id = :user_id", [
     ":user_id" => $id
    ]
  )->fetchAll();

  $data = array();
  foreach ($temp as $value){
    $data[] = array(
      "id"=>$value["id"],
      "name"=>$value["name"],
      "val"=>$value["val"],
      "c_date"=>$value["c_date"]
    );
  }

  $results = ["sEcho" => 1,
        	"iTotalRecords" => count($data),
        	"iTotalDisplayRecords" => count($data),
        	"aaData" => $data ];

  echo json_encode($results);
});

Flight::route('/messages', function(){
  $user = ses::get("user");
  $id = 0;
  $temp = db::Instance()->query(
     "SELECT * FROM Users WHERE name = :name", [
     ":name" => ses::get("user")
    ]
  )->fetchAll();
  if (sizeof($temp)>0) $id = $temp[0]["id"];

  $temp = db::Instance()->query(
     "SELECT Messages.id, Users.name as frm, msg, read_, Messages.c_date FROM Messages inner join Users on Messages.user_id = Users.id where Users.id = :user_id", [
     ":user_id" => $id
    ]
  )->fetchAll();

  $data = array();
  foreach ($temp as $value){
    $data[] = array(
      "id"=>$value["id"],
      "frm"=>$value["frm"],
      "msg"=>$value["msg"],
      "read_"=>$value["read_"],
      "c_date"=>$value["c_date"]
    );
  }

  $results = ["sEcho" => 1,
        	"iTotalRecords" => count($data),
        	"iTotalDisplayRecords" => count($data),
        	"aaData" => $data ];

  echo json_encode($results);
});

Flight::route('/notifications', function(){
  $user = ses::get("user");
  $id = 0;
  $temp = db::Instance()->query(
     "SELECT * FROM Users WHERE name = :name", [
     ":name" => ses::get("user")
    ]
  )->fetchAll();
  if (sizeof($temp)>0) $id = $temp[0]["id"];

  $temp = db::Instance()->query(
     "SELECT id, msg, read_, c_date FROM Notifications WHERE user_id = :user_id", [
     ":user_id" => $id
    ]
  )->fetchAll();

  $data = array();
  foreach ($temp as $value){
    $data[] = array(
      "id"=>$value["id"],
      "msg"=>$value["msg"],
      "read_"=>$value["read_"],
      "c_date"=>$value["c_date"]
    );
  }

  $results = ["sEcho" => 1,
        	"iTotalRecords" => count($data),
        	"iTotalDisplayRecords" => count($data),
        	"aaData" => $data ];

  echo json_encode($results);
});

Flight::route('/logs', function(){
  $user = ses::get("user");
  $id = 0;
  $temp = db::Instance()->query(
     "SELECT * FROM Users WHERE name = :name", [
     ":name" => ses::get("user")
    ]
  )->fetchAll();
  if (sizeof($temp)>0) $id = $temp[0]["id"];

  $temp = db::Instance()->query(
     "SELECT email, result, c_date FROM Logs WHERE user_id = :user_id", [
     ":user_id" => $id
    ]
  )->fetchAll();

  $data = array();
  foreach ($temp as $value){
    $data[] = array("email"=>$value["email"],"result"=>$value["result"],"c_date"=>$value["c_date"]);
  }

  $results = ["sEcho" => 1,
        	"iTotalRecords" => count($data),
        	"iTotalDisplayRecords" => count($data),
        	"aaData" => $data ];

  echo json_encode($results);
});

Flight::route('/', function(){
    $ret = array();
    $ret["user"] = ses::get("user");

    $id = 0;
    $temp = db::Instance()->query(
	     "SELECT * FROM Users WHERE name = :name", [
		   ":name" => ses::get("user")
	    ]
    )->fetchAll();
    if (sizeof($temp)>0) $id = $temp[0]["id"];

    $totals = 0;
    $temp = db::Instance()->query(
	     "SELECT sum(credits) as c FROM Orders WHERE status = 1 and user_id = :user_id", [
		   ":user_id" => $id
	    ]
    )->fetchAll();
    if (sizeof($temp)>0) $totals = $temp[0]["c"];

    $used = 0;
    $temp = db::Instance()->query(
	     "SELECT count(*) as c FROM Logs WHERE user_id = :user_id", [
		   ":user_id" => $id
	    ]
    )->fetchAll();
    if (sizeof($temp)>0) $used = $temp[0]["c"];

    $key = "none";
    $temp = db::Instance()->query(
	     "SELECT * FROM Licenses WHERE user_id = :user_id", [
		   ":user_id" => $id
	    ]
    )->fetchAll();
    if (sizeof($temp)>0) $key = $temp[0]["key_use"];

    $ret["id"] = $id;
    $ret["totals"] = $totals;
    $ret["used"] = $used;
    $ret["free"] = $totals - $used;
    $ret["freey"] = $totals == 0 ? 0 : 100- floor($used * 100 / $totals);
    $ret["key"] = $key;

    echo json_encode($ret);
});

Flight::route('/change/@pass', function($pass){
    $epass = $pass;
    if (strlen($epass)>32) $epass = substr($epass, 0, 32);

    $ret = array();
    $ret["user"] = ses::get("user");

    $id = 0;
    $temp = db::Instance()->query(
	     "SELECT * FROM Users WHERE name = :name", [
		   ":name" => ses::get("user")
	    ]
    )->fetchAll();
    if (sizeof($temp)>0) $id = $temp[0]["id"];

    $data = db::Instance()->update("Users", [
	     "pass" => $epass
     ], [
	      ":id" => $id
    ]);

    // Returns the number of rows affected by the last SQL statement
    $ret["id"] = $id;
    $ret["rowcnt"] = $data->rowCount();

    echo json_encode($ret);
});

Flight::route('/check/@api/@mail', function($api,$mail){
    $eapi = $api;
    if (strlen($eapi)>200) $eapi = substr($eapi, 0, 200);

    $id = '';
    $key_original = '';
    $email = $mail;
    if (strlen($email)>200) $email = substr($email, 0, 200);

    $ret = array();
    $temp = db::Instance()->query(
	     "SELECT * FROM Licenses WHERE key_use = :key_use", [
		   ":key_use" => $eapi
	    ]
    )->fetchAll();
    if (sizeof($temp)>0) {
      $id = $temp[0]["user_id"];
      $key_original = $temp[0]["key_original"];
    }

    if ($id == '') {
      $ret["err"] = 'key not found!';
      echo json_encode($ret);
      return;
    }

    $totals = 0;
    $temp = db::Instance()->query(
	     "SELECT sum(credits) as c FROM Orders WHERE status = 1 and user_id = :user_id", [
		   ":user_id" => $id
	    ]
    )->fetchAll();
    if (sizeof($temp)>0) $totals = $temp[0]["c"];

    $used = 0;
    $temp = db::Instance()->query(
	     "SELECT count(*) as c FROM Logs WHERE user_id = :user_id", [
		   ":user_id" => $id
	    ]
    )->fetchAll();
    if (sizeof($temp)>0) $used = $temp[0]["c"];

    $kalan = $totals - $used;

    if ($kalan>0) {
      $ret["sts"] = "ok";

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

      $str = str_replace("\n","",$str);
      $ret["status"] = json_decode($str);

      db::Instance()->insert("Logs", [
      	"c_date" => date('Y-m-d H:i:s'),
        "email" => $email,
        "result" => $str,
        "user_id" => $id
      ]);
    } else {
      $ret["err"] = 'not credit!';
      echo json_encode($ret);
      return;
    }

    echo json_encode($ret);
});

Flight::route('/incheck/@mail', function($mail){
    $email = $mail;
    if (strlen($email)>200) $email = substr($email, 0, 200);

    $ret = array();
    $ret["user"] = ses::get("user");

    $id = 0;
    $temp = db::Instance()->query(
	     "SELECT * FROM Users WHERE name = :name", [
		   ":name" => ses::get("user")
	    ]
    )->fetchAll();
    if (sizeof($temp)>0) $id = $temp[0]["id"];

    $totals = 0;
    $temp = db::Instance()->query(
	     "SELECT sum(credits) as c FROM Orders WHERE status = 1 and user_id = :user_id", [
		   ":user_id" => $id
	    ]
    )->fetchAll();
    if (sizeof($temp)>0) $totals = $temp[0]["c"];

    $used = 0;
    $temp = db::Instance()->query(
	     "SELECT count(*) as c FROM Logs WHERE user_id = :user_id", [
		   ":user_id" => $id
	    ]
    )->fetchAll();
    if (sizeof($temp)>0) $used = $temp[0]["c"];

    $key = "none";
    $key2 = "none";
    $temp = db::Instance()->query(
	     "SELECT * FROM Licenses WHERE user_id = :user_id", [
		   ":user_id" => $id
	    ]
    )->fetchAll();
    if (sizeof($temp)>0) {
      $key = $temp[0]["key_use"];
      $key2 = $temp[0]["key_original"];
    }

    $kalan = $totals - $used;
    $ret["id"] = $id;
    $ret["totals"] = $totals;
    $ret["used"] = $used;
    $ret["free"] = $kalan;
    $ret["freey"] = $totals == 0 ? 0 : 100- floor($used * 100 / $totals);
    $ret["key"] = $key;
    $ret["email"] = $email;

    if ($kalan>0) {
      $ret["sts"] = "ok";

      $base = 'https://api.hubuco.com/api/v3/?api='.$key2.'&email='.$email;

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

      $str = str_replace("\n","",$str);
      $ret["sts2"] = json_decode($str);

      db::Instance()->insert("Logs", [
      	"c_date" => date('Y-m-d H:i:s'),
        "email" => $email,
        "result" => $str,
        "user_id" => $id
      ]);
    } else {
      $ret["sts"] = "not credit";
      $ret["sts2"] = "";
    }

    echo json_encode($ret);
});

Flight::route('/blog(/@year(/@month(/@day)))', function($year, $month, $day){
    // This will match the following URLS:
    // /blog/2012/12/10
    // /blog/2012/12
    // /blog/2012
    // /blog
    echo "$year, $month, $day";
});

Flight::start();
