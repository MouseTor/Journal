<?php
/*Изменение статуса принятия заявки в базе данных и отправка подробной информации на почту монтажника*/
header('Content-type: text/html; charset=utf-8');
require "dbdata.php";
    $appid = $_GET['appid'];
    $mailaddress = $_GET['mailaddress'];

   @ $dbconnect = new mysqli($dbData->host, $dbData->login, $dbData->password, $dbData->database);
    if(mysqli_connect_errno()){
        echo "Ошибка подключения к базе данных";
    exit;}

    $query = 'select workstat from app where appid ='.$appid;
    $result = $dbconnect->query($query);
    if($result){
        $row = $result->fetch_assoc();
        if($row['workstat'] == 0){
            $query = 'update app set workstat = 1 where appid='.$appid;
            $result = $dbconnect->query($query);
            if($result){
                $query = "select * from clients, app where app.clientid = clients.clientid and app.appid =".$appid;
                $result = $dbconnect->query($query);
                if($result){
                    $row = $result->fetch_assoc();
                    $subj = 'Подробная информация по заявке №'.$appid;
                    $message = "\n\r".$row['surname']." ".$row['name']." ".$row['lastname']."\n\rНомер телефона: 8".$row['phonenumber']."\n\rАдрес: ".$row['city'].' '.$row['address']."\n\rОписание заявки: ".$row['descr'];
                    mail($mailaddress, $subj, $message);
                    echo "Подробная информация по заявке отправлена Вам в электронном письме по адресу: ".$mailaddress;
                    echo "\n\rТеперь эту страницу можно покинуть";
                }
            }
        }else{
            echo 'Данная заявка уже принята другим мастером. За подробной информацией обратитесь к оператору.';
        }
    }

?>