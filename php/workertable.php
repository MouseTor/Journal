<?php

    session_start();
    header('Content-type: text/html; charset=utf-8');
    require "dbdata.php";

    if($_SESSION['sessionstatus'] < 2){
        echo json_encode('error');
        exit;
    }

    @ $dbconnect = new mysqli($dbData->host, $dbData->login, $dbData->password, $dbData->database);
    if(mysqli_connect_errno()){
        echo "Ошибка подключения к базе данных";
        exit;}
    $query = 'select name, surname, lastname, login, workermail from workers';
    $result = $dbconnect->query($query);
    if($result){
        $numrow = $result->num_rows;
        $request = array();
        for($i = 0; $i < $numrow; $i++){
            $row = $result->fetch_assoc();
            array_push($request, $row);
        }
        echo json_encode($request);
    }

?>