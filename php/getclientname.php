<?php
/*Отправка данных зарегистрированных абонентов на клиент*/
    header('Content-type: text/html; charset=utf-8');
    require "dbdata.php";
    $name = trim($_POST['clientName']);
    $surname = trim($_POST['clientSurName']);
    $lastName = trim($_POST['clientLastName']);
    $clientid = trim($_POST['clientid']);
    if(!$clientid){
        $query = "select * from clients where name like '".$name."%' and surname like '".$surname."%' and lastname like '".$lastName."%'";
        $result = $dbconnect->query($query);
        if($result){
            $num_row = $result->num_rows;
            $answer = array();
            for($i = 0; $i < $num_row; $i++){
                $row = $result->fetch_assoc();
                array_push($answer, $row);
            }
            echo json_encode($answer);
        }
    }else{
        $query = "select * from clients where clientid=".$clientid;
        $result = $dbconnect->query($query);
        if($result){
            $num_row = $result->num_rows;
            $answer = array();
            for($i = 0; $i < $num_row; $i++){
                $row = $result->fetch_assoc();
                array_push($answer, $row);
            }
            echo json_encode($answer);
        }
    }   
?>