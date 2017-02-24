<?php
    header('Content-type: text/html; charset=utf-8');
    require "dbdata.php";
    class worker{
        var $name;
        var $surname;
        var $lastname;
        var $mail;
        var $login;
        var $id;
    }
    $worker = new worker;
    $worker->name = addslashes(trim($_POST['name']));
    $worker->surname = addslashes(trim($_POST['surname']));
    $worker->lastname = addslashes(trim($_POST['lastname']));
    $worker->mail = addslashes(trim($_POST['workermail']));
    $worker->login = addslashes(trim($_POST['login']));
    $worker->id = addslashes(trim($_POST['id']));

    @ $dbconnect = new mysqli($dbData->host, $dbData->login, $dbData->password, $dbData->database);
    if(mysqli_connect_errno()){
        echo "Ошибка подключения к базе данных";
        exit;}
    $query = "update workers set name = '".$worker->name."', surname = '".$worker->surname."', lastname = '".$worker->lastname."', login = '".$worker->login."', workermail = '".$worker->mail."' where workerid = ".$worker->id;
    $result = $dbconnect->query($query);
    if($result){
        echo 1;
    }else{
        echo $query;
    }
?>