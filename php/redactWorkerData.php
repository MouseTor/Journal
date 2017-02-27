<?php
    session_start();
    header('Content-type: text/html; charset=utf-8');
    require "dbdata.php";
    $usertype = addslashes(trim($_POST['usertype']));
    class worker{
        var $name;
        var $surname;
        var $lastname;
        var $mail;
        var $login;
        var $id;
    }
    class cashier{
        var $name;
        var $surname;
        var $lastname;
        var $login;
        var $id;
    }

    @ $dbconnect = new mysqli($dbData->host, $dbData->login, $dbData->password, $dbData->database);
    if(mysqli_connect_errno()){
        echo "Ошибка подключения к базе данных";
        exit;}

    if($usertype == 'cashier'){
        $cashier = new cashier;
        $cashier->name = addslashes(trim($_POST['name']));
        $cashier->surname = addslashes(trim($_POST['surname']));
        $cashier->lastname = addslashes(trim($_POST['lastname']));
        $cashier->login = addslashes(trim($_POST['login']));
        $cashier->id = addslashes(trim($_POST['id']));
        $query = "update cashiers set name = '".$cashier->name."', surname = '".$cashier->surname."', lastname = '".$cashier->lastname."', login = '".$cashier->login."' where cashierid = '".$cashier->id."'";
        $result = $dbconnect->query($query);
        if($result){
            if(file_exists(date("d.F.Y").'.txt')){
                $logfile = fopen(date("d.F.Y").'.txt','a+');
                $logtext = "\n[".date("H:i:s").']'.$_SESSION['sessionlogin'].' Редактировал данные кассира '.$cashier->login;
                fwrite($logfile, $logtext);
                fclose($logfile);                
            }
            echo 1;
        }else{
            echo $query;
        }
    }else if($usertype == 'worker'){
        $worker = new worker;
        $worker->name = addslashes(trim($_POST['name']));
        $worker->surname = addslashes(trim($_POST['surname']));
        $worker->lastname = addslashes(trim($_POST['lastname']));
        $worker->mail = addslashes(trim($_POST['workermail']));
        $worker->login = addslashes(trim($_POST['login']));
        $worker->id = addslashes(trim($_POST['id']));
        $query = "update workers set name = '".$worker->name."', surname = '".$worker->surname."', lastname = '".$worker->lastname."', login = '".$worker->login."', workermail = '".$worker->mail."' where workerid = ".$worker->id;
        $result = $dbconnect->query($query);
        if($result){
            if(file_exists(date("d.F.Y").'.txt')){
                $logfile = fopen(date("d.F.Y").'.txt','a+');
                $logtext = "\n[".date("H:i:s").']'.$_SESSION['sessionlogin'].' Редактировал данные монтажника '.$worker->login;
                fwrite($logfile, $logtext);
                fclose($logfile);                
            }
            echo 1;
        }else{
            echo $query;
        }   
    }
    
    
?>