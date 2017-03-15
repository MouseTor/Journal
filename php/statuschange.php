<?php
/*Изменение статуса заявки в базе данных*/
session_start();
    header('Content-type: text/html; charset=utf-8');
    require "dbdata.php";
    $worker = trim($_POST['worker']);
    $status = trim($_POST['status']);
    $appid = trim($_POST['appid']);
    if(!$worker  || !$status){
        echo 'Отправлен пустой запрос! Проверьте данные и повторите попытку';
        exit; 
    }
    if($status == 'Выполнена'){
        $status = 2;
    }else if($status == 'Отменена'){
        $status = 3;
    }else{
        echo 'Произошла ошибка ввода. Проверьте данные и повторите попытку';
        exit;
    }
    $query = "update app set workerid = (select workerid from workers where surname = '".$worker."'), datereceipt= now(), status=".$status." where appid=".$appid;
    $result = $dbconnect->query($query);
    if($result){
        if(file_exists(date("d.F.Y").'.txt')){
            $logfile = fopen(date("d.F.Y").'.txt','a+');
            $logtext = "\n[".date("H:i:s").']'.$_SESSION['sessionlogin'].' Изменил статус заявки № '. $appid.' на '.$status;
            fwrite($logfile, $logtext);
            fclose($logfile);                
        }
        echo 1;
    }else{
        echo 'Произошла ошибка при выполнении запроса. Проверьте данные и повторите попытку. При возникновении ошибки обратитесь к системному администратору';
    }
?>