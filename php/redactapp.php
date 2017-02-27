<?php
/*Внесение изменений в запись заявки в базе данных*/
session_start();
    header('content-type: text/html; charset=utf-8');
    require "dbdata.php";
    $appid = trim($_POST['appid']);
    $cost = trim($_POST['Cost']);
    $descr = trim($_POST['Descr']);
    if(!$appid || $cost == '' || !$descr){
        echo 'Отправлен пустой запрос! Проверьте данные и повторите попытку. При возникновении ошибки обратитесь к администратору';
        exit;
    }
    @ $dbconnect = new mysqli($dbData->host, $dbData->login, $dbData->password, $dbData->database);
    if(mysqli_connect_errno()){
        echo 'Не удалось установить соединение с базой данных. Повторите попытку позже';
        exit;
    }
    $query = "update app set cost=".$cost.", descr ='".$descr."' where appid=".$appid;
    $result = $dbconnect->query($query);
    if($result){
        if(file_exists(date("d.F.Y").'.txt')){
            $logfile = fopen(date("d.F.Y").'.txt','a+');
            $logtext = "\n[".date("H:i:s").']'.$_SESSION['sessionlogin'].' Редактировал данные заявки № '.$appid;
            fwrite($logfile, $logtext);
            fclose($logfile);                
        }
        echo 1;
        exit;
    }else{
        echo 'Произошла ошибка при обновлении данных. Повторите попытку позже или обратитесь к администратору';
    }
?>