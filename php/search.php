<?php
/*ФУНКЦИЯ НАХОДИТСЯ В РАЗРАБОТКЕ!*/
    session_start();
    header('Content-type: text/html; charset=utf-8');

    if(!$_SESSION['sessionlogin']){
        exit;
    }
    require "dbdata.php";
    

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Журнал учета заявок. Alpha test v0.4. Beta test Request</title>
    <link rel="stylesheet" href="../css/main.css">
    <meta name="viewport" content="width=device-width">
    <script src="../applet/addind.js"></script>
    <script src="../applet/ajax.js"></script>
    <script src="../js/main.js"></script>
</head>
<body>

    <div class='main-form-wraper' data-status='show'>
                <form>
                    <div class='form-block'>
                        <p id='hide-form-button'>▼</p>
                        <p>ФИО</p>
                        <input type='text' name='clientSurName' tabindex='1' maxlength = '20'>
                        <input type='text' name='clientName' tabindex='2' maxlength ='20'>
                        <input type='text' name='clientLastName' tabindex='3' maxlength = '20'>
                        <p>Номер телефона</p>
                        <b>+7</b><input type='text' name='clientPhoneNumber' tabindex='4' maxlength = 10>
                        <p><input type='submit' value='Обновить' name='reload'></p>
                        <p class='main-error-log'></p>
                        <input type='hidden' name='oldClientId'>
                        <div class='slideUpClientName'></div>
                    </div>
                    <div class='form-block'>
                        <p><b>Поиск записей</b></p>
                        <p>Город</p>
                        <input type='text' name='clientCity' tabindex='5' maxlength = '20'>
                        <p>Стоимость</p>
                        <input type='text' name='appCost' tabindex='7' maxlength = '6'>
                    </div>
                    <div class='form-block'>
                        <p class='new-app-numb'></p>
                        <p>Адрес</p>
                        <textarea name='clientAddress' cols='30' rows='4' tabindex='6' maxlength = '124'></textarea>
                        <p></p>
                    </div>
                    <div class='form-block'>
                        <p>/</p>
                        <p>Описание</p>
                        <textarea name='appDescr' cols='30' rows='4' tabindex='8' maxlength = '124'></textarea> 
                        <p><input type='submit' value='Выйти из системы' id='end-programm'></p>                   
                    </div>
                </form>
            </div>
</body>
</html>