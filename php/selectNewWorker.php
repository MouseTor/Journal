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
        var $password;
    }
    class cashier{
        var $name;
        var $surname;
        var $lastname;
        var $login;
        var $password;
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
        $cashier->password = sha1(addslashes(trim($_POST['password'])));
        $query = "insert into cashiers values (null, '".$cashier->name."', '".$cashier->surname."', '".$cashier->lastname."', '".$cashier->login."', '".$cashier->password."', 1 )";
        $result = $dbconnect->query($query);
        if($result){
            if(file_exists(date("d.F.Y").'.txt')){
                $logfile = fopen(date("d.F.Y").'.txt','a+');
                $logtext = "\n[".date("H:i:s").']'.$_SESSION['sessionlogin'].' Добавил нового пользователя  '.$cashier->login;
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
        $worker->mail = addslashes(trim($_POST['mail']));
        $worker->login = addslashes(trim($_POST['login']));
        $worker->password = sha1(addslashes(trim($_POST['password'])));
        $query = "insert into workers values (null, '".$worker->name."', '".$worker->surname."', '".$worker->lastname."', '".$worker->login."', '".$worker->password."', '".$worker->mail."', 0 )";
        $result = $dbconnect->query($query);
        if($result){
            if(file_exists(date("d.F.Y").'.txt')){
                $logfile = fopen(date("d.F.Y").'.txt','a+');
                $logtext = "\n[".date("H:i:s").']'.$_SESSION['sessionlogin'].' Добавил нового пользователя '.$worker->login;
                fwrite($logfile, $logtext);
                fclose($logfile);                
            }
            echo 1;
        }else{
            echo $query;
        }
    }
    

?>