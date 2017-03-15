<?php
/*Отправка данных о монтажниках на клиент*/
require "dbdata.php";
    $query = "select surname from workers";
    $result = $dbconnect->query($query);
    if($result){
        $answer = array();
        $num_row = $result->num_rows;
        for($i = 0; $i < $num_row; $i++){
            $row = $result->fetch_assoc();
            array_push($answer, $row);
        }
        echo json_encode($answer);
    }
?>