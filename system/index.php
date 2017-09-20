<?php
session_start();
require 'vendor/autoload.php';

require 'controllers/checkmail.php';

require 'utils/db.php';
require 'utils/session.php';

// Using Medoo namespace
use flight\Engine;

use controllers\checkmail as cm;

use utils\Db as db;
use utils\Session as ses;

Flight::route('POST /login', function(){
    $myArray = (array)Flight::request()->data->getData();

    $count = db::Instance()->count("Users", [
      "name" => $myArray["uname"],
      "pass" => $myArray["upass"],
     ]);

    ses::set("user",$myArray["uname"]);
    echo $count;
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
    $ret["freey"] = 100- floor($used * 100 / $totals) ;
    $ret["key"] = $key;

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
    $ret["freey"] = 100- floor($used * 100 / $totals) ;
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
