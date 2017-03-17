<?php
/*Вывод таблицы и основной формы.*/
    session_start();
    header('Content-type: text/html; charset=utf-8');
    if(!$_SESSION['sessionlogin']){
        header('Location: ../index.php');
    }
    require "dbdata.php";
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>MangApp. Open Beta test v0.6.</title>
    <link rel="stylesheet" href="../css/main.css">
    <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=0">
    <script src="../applet/addind.js"></script>
    <script src="../applet/ajax.js"></script>
    <script src="../js/main.js"></script>
    <link rel="stylesheet" href="../css/markup.css">
</head>
<body data-pgid="main">
    <?php
        $appfilter = $_GET['appfilter'];
        if($appfilter){
            $query = 'select * from clients, app where app.clientid = clients.clientid and app.status = 1';
            $result = $dbconnect->query($query);
            $numrow = $result->num_rows;
            if($numrow){
                $data = "<table class='main-table col-dd-100 col-ld-100 col-td-100 col-md-100' data-pgid='appfilter'><tr><td>№</td><td>ФИО</td><td>Номер телефона</td><td>Город</td><td>Стоимость</td><td>Дата</td><td>Описание</td></tr>";
                for($i = 0; $i < $numrow; $i++){
                    $row = $result->fetch_row();
                    $data = $data.'<tr class="status-'.$row[14].'" id = "'.$row[7].'"><td>'.$row[7].'</td><td>'.$row[2].' '.$row[1].' '.$row[3].'</td><td>8'.$row[4].'</td><td>'.$row[5].'</td><td>'.$row[11].'</td><td>'.$row[15].'</td><td class="table-descr">'.$row[13].'</td></tr>';
                }
                $data = $data.'</table>';
                echo $data;
            }
        }else{
            $query = 'select * from clients, app where app.clientid = clients.clientid';
            $result = $dbconnect->query($query);
            $numrow = $result->num_rows;
            if($numrow){
                $data = "<table class='main-table col-dd-100 col-ld-100 col-td-100 col-md-100'><tr><td>№</td><td>ФИО</td><td>Номер телефона</td><td>Город</td><td>Стоимость</td><td>Дата</td><td>Описание</td></tr>";
                for($i = 0; $i < $numrow; $i++){
                    $row = $result->fetch_row();
                    $data = $data.'<tr class="status-'.$row[14].'" id = "'.$row[7].'"><td>'.$row[7].'</td><td>'.$row[2].' '.$row[1].' '.$row[3].'</td><td>8'.$row[4].'</td><td>'.$row[5].'</td><td>'.$row[11].'</td><td>'.$row[15].'</td><td class="table-descr">'.$row[13].'</td></tr>';
                }
                $data = $data.'</table>';
                echo $data;
            }
        }
        
        if($_SESSION['sessionstatus']){
            $insert_form = "
            <div class='main-form-wraper' data-status='show'>
                <div class='content'>
                <form class='main-form'>
                <p id='hide-form-button' data-login-session='".$_SESSION['sessionlogin']."'>▼ </p><p class='new-app-numb' style='margin-top: -28px;'>1</p><p class='right' style='margin-top: -28px;'><a href='../about.html'>О программе</a>&nbsp<a href='#' id='winr'>Меню</a>&nbsp<a href='http://tvnet3.ru'>Вернуться на сайт</a></p>
                    <div class='form-block'>
                        <p>&nbsp&nbsp&nbsp<input type='text' name='clientSurName' tabindex='1' maxlength = '20' placeholder='Фамилия'></p>
                        <p>&nbsp&nbsp&nbsp<input type='text' name='clientName' tabindex='2' maxlength ='20' placeholder='Имя'></p>
                        <p>&nbsp&nbsp&nbsp<input type='text' name='clientLastName' tabindex='3' maxlength = '20' placeholder='Отчество'></p>
                        <b>+7</b><input type='text' name='clientPhoneNumber' tabindex='4' maxlength = 10 placeholder='Номер телефона'>
                        <input type='hidden' name='oldClientId'>
                        <div class='slideUpClientName'></div>
                    </div>
                    <div class='form-block'>
                        <p><input type='text' name='clientCity' tabindex='5' maxlength = '20' placeholder='Населенный пункт'>
                        <input type='text' name='appCost' tabindex='7' maxlength = '6' placeholder='Стоимость'></p>
                        <p><textarea name='clientAddress' cols='35' tabindex='6' maxlength = '124' placeholder='Адрес'></textarea></p>
                        <p class='main-error-log'></p>
                    </div>
                    <div class='form-block'>
                        <p><select id='apptype'>
                            <option value='' disabled selected style='display:none;'>Выберите тип заявки!</option>
                            <option>Вызов мастера</option>
                            <option>Монтаж комплекта</option>
                            <option>Сервисное обслуживание</option>
                            <option>Замена оборудования</option>
                        <select></p>
                        <p><select id='systemType' style='display: none;'>
                            <option value='' disabled selected style='display:none;'>Выберите тип системы!</option>
                            <option>Видеонаблюдение</option>
                            <option>Триколор ТВ</option>
                            <option>НТВ+</option>
                            <option>Эфирное телевидение</option>
                            <option>Другое</option>
                        <select></p>
                        <p><input type='text' name='appNameModel' placeholder='Модель оборудования' class='descr_input' style='display: none;'></p>
                        <p><input type='text' name='appSerialNumber' placeholder='Серийный номер оборудования' class='descr_input' style='display: none;'></p>
                        <p><input type='text' name='appIdNumber' placeholder='ID номер оборудования' class='descr_input' style='display: none;'></p>
                    </div>
                    <div class='form-block'>
                        <p><textarea name='appDescr' cols='27' tabindex='8' maxlength = '124' placeholder='Описание заявки'></textarea></p>
                    </div>
                    <div class='form-block'>
                        <p><input type='submit' value='Записать' name='insertApp' tabindex='9' id='submit-data-button' data-load-script='false'></p>
                        <p><input type='submit' value='Обновить' name='reload'></p>
                        <p><input type='submit' value='Невыполненные' name='appfilter-butt'></p>
                        <p><input type='submit' value='Выход' id='end-programm'></p>                   
                    </div>
                </form>
                </div>
            </div>";
            echo $insert_form;
        }else{
            $insert_form = "<div class='form-block'>
                        <p><input type='submit' value='Выйти из системы' id='end-programm'></p>
                        </div>";
            echo $insert_form;
        }

    ?>
    <div class="more-info-panel-wraper col-md-100">
    
        <div class="more-info-panel col-dd-50 col-md-9">

            <div class="more-info-panel-close-wraper"><p class="more-info-panel-close">Закрыть</p></div>
        
            <h3>Заявка №</h3>
            
            <div class="shablon">
                <p class="shablonName">ФИО абонента</p>
                <p>Номер телефона</p>
                <p>Населенный пункт</p>
                <p class="shablonAddress">Адрес</p>
                <p class="shablonDescr">Описание заявки</p>
                <p>Стоимость</p>
                <p>Дата регистрации</p>
                <p>Запись сделал</p>
                <p>Статус заявки</p>
                <input type="hidden" name='appidSubmit'>
            </div>
            <div class="client-shablon">
                <p>ФИО абонента</p>
                <p>Номер телефона</p>
                <p>Населенный пункт</p>
                <p class="shablonAddress">Адрес</p>
                <p>Количество обращений</p>
                <p>Последнее обращение</p>            
            </div>
            <div class="more-info-data">
            </div>
            <div class="clear"></div>
            <div class="more-info-panel-control">

                <input type="submit" value="Редактирование" name="more-info-redact">
                <input type="submit" value="Перейти к абоненту" name="more-info-client">
                <input type="submit" value="Изменить статус" name="more-info-status">

            </div>
            <div class="client-info-panel-control">

                <input type="submit" value="Редактирование" name="client-info-redact">
            
            </div>
        </div>
    
    </div>
    <div class="winr-wraper">
    
        <p><a href="#" id="account-managment">Управление учетными записями</a></p>
        <p><a href="#" id="add-new-account">Добавление учетной записи</a></p>
        <p><a href="#" id="delet-account">Удаление учетных записей</a></p>

    </div>
    <div class="worker-window-wraper">
    
        <div class="worker-window">

            <div class="worker-window-table-wraper">
                <div class="more-info-panel-close-wraper"><p class="more-info-panel-close">Закрыть</p></div>
        
                <h3>Администрирование учетных записей</h3>
            
                <table class="worker-window-table">
                    <tr>
                        <td>Тип</td>
                        <td>Фамилия</td>
                        <td>Имя</td>
                        <td>Отчество</td>
                        <td>E-mail адрес</td>
                        <td>Имя пользователя</td>
                    </tr>
                </table>
                <input type="submit" name="worker-data-redact" value="Отправить">
                <div class="redactChecker" data-check = '0'></div>
            </div>
        
        </div>
    
    </div>
</body>
</html>