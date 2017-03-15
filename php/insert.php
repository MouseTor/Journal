<?php
/*Добавление записи в базу данных. Отправка оповещений монтажникам*/
    session_start();
    header('Content-type: text/html; charset=utf-8');
    if(!$_SESSION['sessionlogin'] || !$_SESSION['sessionstatus']){
        echo 'Отказано в доступе!';
        exit;
    }
    require "dbdata.php";
    $clientName = trim($_POST['clientName']);
    $clientSurName = trim($_POST['clientSurName']);
    $clientLastName = trim($_POST['clientLastName']);
    $clientPhoneNumber = trim($_POST['clientPhoneNumber']);
    $clientCity = trim($_POST['clientCity']);
    $clientAddress = trim($_POST['clientAddress']);
    $appCost = trim($_POST['appCost']);
    $appDescr = trim($_POST['appDescr']);
    $oldClientId = trim($_POST['oldClientId']);
    if(!$clientName || !$clientSurName || !$clientLastName || !$clientCity || !$clientAddress || !$clientPhoneNumber || !$appCost || !$appDescr){
        echo "Все поля являются обязательными к заполнению!";
        exit;
    }
        $query = "select workermail from workers";
        $result = $dbconnect->query($query);
        if($result){
            $mailaddress = array();
            $num_row = $result->num_rows;
            for($i = 0; $i < $num_row; $i++){
                $row = $result->fetch_assoc();
                array_push($mailaddress, $row);
            }
        }
    if(!$oldClientId){
        $answer;
        $query = "insert into clients values (null, '$clientName', '$clientSurName', '$clientLastName', '$clientPhoneNumber', '$clientCity', '$clientAddress')";
        $result = $dbconnect->query($query);
        // $num_row = $result->num-rows;
        if($result){
            $answer = "Клиент успешно зарегистрирован в системе.";
            $query = "insert into app values (null, (select max(clientid) from clients), 1, (select cashierid from cashiers where login = '".$_SESSION['sessionlogin']."'), ".$appCost.", ' ' ,'".$appDescr."', 1, now(), 0)";
            $result = $dbconnect->query($query);
            // $num_row = $result->affected_rows;;
            if($result){
                $answer = 1;
                echo $answer;
                $query = 'select max(appid) from app';
                $result = $dbconnect->query($query);
                    if($result){
                        $appnumb = $result->fetch_row();
                        $subject = 'Новая заявка от ИП Горохова М.Б';
                        $header = "Content-type: text/html; charset=$send_charset\r\n";
                        $appmess = $appnumb[0]++;
                        for($i = 0; $i < count($mailaddress); $i++){
                            $message = "Вам предлагается заявка в городе ".$clientCity.". \n\rОписание заявки: ".$appDescr.". \n\rДля получения подробной информации перейдите по ссылке: \n\rhttp://webbranch.ru/journal/php/workstatus.php?mailaddress=".$mailaddress[$i]['workermail']."&appid=".$appmess."\n\rОбратите внимание! Переходя по ссылке вы принимаете заявку и закрываете другим монтажникам доступ к подробной информации о клиенте! Не переходите по ссылке если не уверены в возможности выполнения Вами данной заявки!";
                            $send = mail($mailaddress[$i]['workermail'], $subject, $message);
                        }
                        if(file_exists(date("d.F.Y").'.txt')){
                            $logfile = fopen(date("d.F.Y").'.txt','a+');
                            $logtext = "\n[".date("H:i:s").']'.$_SESSION['sessionlogin'].' Добавил заявку № '.$appmess;
                            fwrite($logfile, $logtext);
                            fclose($logfile);
                            }
                }
                exit;
            }else{
                $answer = $answer." Произошла ошибка закрепления записи за абонентом. Запрос: ".$query;
                echo $answer;
                exit;
            }
        }else{
            $answer = "Произошла ошибка регистрации клиента. Запрос: ".$num_row;
            echo $answer;
            exit; 
        }
    }else{
        $query = "insert into app values (null, $oldClientId, 1, (select cashierid from cashiers where login = '".$_SESSION['sessionlogin']."'), ".$appCost.", ' ' ,'".$appDescr."', 1, now(), 0)";
        $result = $dbconnect->query($query);
        $num_row = $result->num_rows;
        if($result){
            echo 1;
            $query = 'select max(appid) from app';
                $result = $dbconnect->query($query);
                    if($result){
                        $appnumb = $result->fetch_row();
                        $subject = 'Новая заявка от ИП Горохова М.Б';
                        $header = "Content-type: text/html; charset=$send_charset\r\n";
                        $appmess = $appnumb[0]++;
                        $sendchecker;
                        for($i = 0; $i < count($mailaddress); $i++){
                            $message = "Вам предлагается заявка в городе ".$clientCity.". \n\rОписание заявки: ".$appDescr.". \n\rДля получения подробной информации перейдите по ссылке: \n\rhttp://webbranch.ru/journal/php/workstatus.php?mailaddress=".$mailaddress[$i]['workermail']."&appid=".$appmess."\n\rОбратите внимание! Переходя по ссылке вы принимаете заявку и закрываете другим монтажникам доступ к подробной информации о клиенте! Не переходите по ссылке если не уверены в возможности выполнения Вами данной заявки!";
                            $send = mail($mailaddress[$i]['workermail'], $subject, $message);
                        }
                }
            exit;
        }else{
            echo 0;
        }
    }
?>