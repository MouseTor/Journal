<?php
/*Отправка данных по заявке на клиент*/
    header('Content-type: text/html charset=utf-8');
    require "dbdata.php";
    $appid = trim($_POST['clientid']);
    @ $dbconnect = new mysqli($dbData->host, $dbData->login, $dbData->password, $dbData->database);
    if(mysqli_connect_errno()){
        echo "Ошибка подключения к базе данных";
    exit;}
    $query = "select app.status, app.descr, app.cost, app.date, app.datereceipt, clients.name, clients.surname, clients.lastname, clients.phonenumber, clients.city, clients.address, cashiers.name, cashiers.surname, cashiers.lastname, workers.name, workers.surname from clients, workers, cashiers, app where app.clientid = clients.clientid and app.workerid = workers.workerid and app.cashierid = cashiers.cashierid and app.appid = '".$appid."'";
    $result = $dbconnect->query($query);
    if($result){
        $row = $result->fetch_row();
        echo json_encode($row);
    }
?>