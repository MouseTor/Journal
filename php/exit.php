<?php
/*Закрытие сессии.*/
    session_start();
    header('Content-type: text/html; charset=utf-8');

    $login = $_SESSION['sessionlogin'];

    $_SESSION = array();
    session_destroy();

    header('Location: ../index.php');

    if(file_exists(date("d.F.Y").'.txt')){
            $logfile = fopen(date("d.F.Y").'.txt','a+');
            $logtext = "\n[".date("H:i:s").']'.$login.' Вышел из системы';
            fwrite($logfile, $logtext);
            fclose($logfile);                
        }

    echo 'exit'; 
?>