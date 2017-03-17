<?php
/*Отправка данных по заявке на клиент*/
    header('Content-type: text/html charset=utf-8');
    require "dbdata.php";
    $appid = trim($_POST['clientid']);
    $req = array();
    $query = "select app.status, app.descr, app.cost, app.date, app.datereceipt, clients.name, clients.surname, clients.lastname, clients.phonenumber, clients.city, clients.address, cashiers.name, cashiers.surname, cashiers.lastname  from clients, cashiers, app where app.clientid = clients.clientid and app.cashierid = cashiers.cashierid and app.appid = '".$appid."'";
    $result = $dbconnect->query($query);
    $rows = $dbconnect->affected_rows;
    if($rows){
        $row = $result->fetch_row();
        array_push($req,$row);
        $query = "select workers.name, workers.surname from workers where workers.workerid = (select workerid from app where appid = ".$appid.")";
        $result = $dbconnect->query($query);
        $rows = $dbconnect->affected_rows;
        if($rows){
            $row = $result->fetch_row();
            array_push($req,$row);
            echo(json_encode($req));
        }else{
            $worker = array();
            $worker[0] = 'Аккаунт работника';
            $worker[1] = 'удален.';
            array_push($req,$worker);
            echo(json_encode($req));
            }
        
    }
?>