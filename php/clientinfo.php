<?php 
/*Отправка подробных данных клиента*/
    header('Content-type: text/html; charset=utf-8');
    require "dbdata.php";
    $appid = addslashes(trim($_POST['appid']));
    @ $dbconnect = new mysqli($dbData->host, $dbData->login, $dbData->password, $dbData->database);
    if(mysqli_connect_errno()){
        echo "<p class='no-connect-db'>Не удалось подлючиться к базе данных. Повторите попытку позже.</p>";
    }
    $query = "select * from clients where clientid = (select clientid from app where appid = ".$appid.")";
    $result = $dbconnect->query($query);
    $answer = array();
    if($result){
        array_push($answer, $result->fetch_assoc());
        // echo json_encode($answer);
    }
    $query = "select appid from app where clientid = (select clientid from app where appid = ".$appid.")";
    $result = $dbconnect->query($query);
    if($result){
        $num_row = $result->num_rows;
        array_push($answer, $num_row);
        for($i = 0; $i < $num_row; $i++){
            $row = $result->fetch_row();
        }
        $query = "select descr,appid from app where appid=".$row[0];
        $result = $dbconnect->query($query);
        if($result){
            $row = $result->fetch_assoc();
            array_push($answer, $row);
            echo json_encode($answer);
        }else{
            echo json_encode($row);
        }
    }
?>