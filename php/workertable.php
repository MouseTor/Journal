<?php

    session_start();
    header('Content-type: text/html; charset=utf-8');
    require "dbdata.php";

    if($_SESSION['sessionstatus'] < 2){
        echo json_encode('error');
        exit;
    }
    $query = 'select workerid, name, surname, lastname, login, workermail from workers';
    $result = $dbconnect->query($query);
    if($result){
        $numrow = $result->num_rows;
        $request = array();
        for($i = 0; $i < $numrow; $i++){
            $row = $result->fetch_assoc();
            $row['usertype'] = 'worker';
            array_push($request, $row);
        }
        $query = 'select cashierid, name, surname, lastname, login from cashiers';
        $result = $dbconnect->query($query);
        if($result){
            $numrow = $result->num_rows;
            for($i = 0; $i < $numrow; $i++){
                $row = $result->fetch_assoc();
                $row['usertype'] = 'cashier';
                array_push($request, $row);
            }
            echo json_encode($request);
        }
        
    }

?>