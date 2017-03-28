<?php

    class dbData{
        var $host;
        var $login;
        var $password;
        var $database;
    }

    $dbData = new dbData;
    $dbData->host = 'localhost';
    $dbData->login = 'root';
    $dbData->password = '';
    $dbData->database = '';

    @ $dbconnect = new mysqli($dbData->host, $dbData->login, $dbData->password, $dbData->database);
    if(mysqli_connect_errno()){
        echo "Ошибка подключения к базе данных";
    exit;}
    $dbconnect->set_charset('utf8');
 
?>
