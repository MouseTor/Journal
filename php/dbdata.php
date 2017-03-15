<?php

    class dbData{
        var $host;
        var $login;
        var $password;
        var $database;
    }

    $dbData = new dbData;
    $dbData->host = 'tvnet3.mysql';
    $dbData->login = 'tvnet3_tv';
    $dbData->password = 'zeb:7VrM';
    $dbData->database = 'tvnet3_tvjournal';

    @ $dbconnect = new mysqli($dbData->host, $dbData->login, $dbData->password, $dbData->database);
    if(mysqli_connect_errno()){
        echo "Ошибка подключения к базе данных";
    exit;}
    $dbconnect->set_charset('utf8');
 
?>