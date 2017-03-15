<?php

require "dbdata.php";
 @ $dbconnect = new mysqli($dbData->host, $dbData->login, $dbData->password, $dbData->database);
$query = "select appid, workstat, status from app";
$result = $dbconnect->query($query);
$array = array();
if($result){
    $numrow = $result->num_rows;
    for($i = 0; $i < $numrow; $i++){
        $row = $result->fetch_assoc();
        array_push($array, $row);
    }
    echo json_encode($array);
}

?>