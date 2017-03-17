<?php
    session_start();
    header('Content-type: text/html; charset=utf-8');
    require "dbdata.php";
    $login = addslashes(trim($_POST['login']));

    $query = 'select * from cashiers where login = "'.$login.'"';
    $result = $dbconnect->query($query);
    $rows = $result->num_rows;
    if($rows){
        $query = 'delete from cashiers where login = "'.$login.'"';
        $result = $dbconnect->query($query);
        $rows = $dbconnect->affected_rows;
        if($rows){
            echo 1;
            exit;
        }else{
            echo 'Произошла ошибка при удалении кассира';
            exit;
        }
    }else{
        $query = 'select * from workers where login = "'.$login.'"';
        $result = $dbconnect->query($query);
        $rows = $result->num_rows;
        if($rows){
            $query = 'delete from workers where login = "'.$login.'"';
            $result = $dbconnect->query($query);
            $rows = $dbconnect->affected_rows;
            if($rows){
                echo 1;
                exit;
            }else{
                echo 'Произошла ошибка при удалении монтажника';
                exit;
            }
        }else{
            echo 'Логин не найден в системе';
            exit;
        }
    }

?>