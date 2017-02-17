<?php
/*Авторизация пользователей на основе введенных данных. Запуск сессии. Инициализация переменных сессии.*/
    session_start();
    header('Content-type: text/html; charset=utf-8');
    require "dbdata.php";
    $userLogin = addslashes(trim($_POST['userLogin']));
    $userPassword = $_POST['userPassword'];

    @ $dbconnect = new mysqli($dbData->host, $dbData->login, $dbData->password, $dbData->database);
    if(mysqli_connect_errno()){
        echo "Ошибка подключения к базе данных";
        exit;}
        $query = 'select * from cashiers where login = "'.$userLogin.'" and password = "'.sha1($userPassword).'"';

        $result = $dbconnect->query($query);
        $numrow = $result->num_rows;
        if($numrow){
            $_SESSION['sessionlogin'] = $userLogin;
            $row = $result->fetch_assoc();
            $_SESSION['sessionstatus'] = $row['privileges'];
            echo 1;
            exit;
        }else{
            $query = 'select * from workers where login = "'.$userLogin.'" and password = "'.sha1($userPassword).'"';

            $result = $dbconnect->query($query);
            $numrow = $result->num_rows;
            if($numrow){
                $_SESSION['sessionlogin'] = $userLogin;
                $row = $result->fetch_assoc();
                $_SESSION['sessionstatus'] = $row['privileges'];
                echo 0;
                exit;
            }else{
                echo 'Пользователь не найден, проверьте введенные данные ';
                exit;
            }
        }
?>