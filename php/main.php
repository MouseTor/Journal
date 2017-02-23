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
        @ $dbconnect = new mysqli($dbData->host, $dbData->login, $dbData->password, $dbData->database);
        if(mysqli_connect_errno()){
            echo "<p class='no-connect-db'>Не удалось подлючиться к базе данных. Повторите попытку позже.</p>";
        }
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
                <form>
                    <div class='form-block'>
                        <p id='hide-form-button' data-login-session='".$_SESSION['sessionlogin']."'>▼ </p>
                    </div>
                    <div class='form-block'>
                        <p><input type='submit' value='Только невыполненные' name='appfilter-butt'></p>
                    </div>
                    <div class='form-block'>
                        <p><a href='../about.html'>О программе</a></p> 
                        <p><input type='submit' value='Выйти из системы' id='end-programm'></p>                   
                    </div>
                </form>
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
    <div class="new-app-panel-wraper">
        <div class="new-app-panel">
            <p>ФИО</p>
            <input type='text' name='clientSurName' tabindex='1' maxlength = '20'>
            <input type='text' name='clientName' tabindex='2' maxlength ='20'>
            <input type='text' name='clientLastName' tabindex='3' maxlength = '20'>
            <p>Номер телефона</p>
            <b>+7</b><input type='text' name='clientPhoneNumber' tabindex='4' maxlength = 10>
            <p><input type='submit' value='Записать' name='insertApp' tabindex='9' id='submit-data-button' data-load-script='false'><input type='submit' value='Обновить' name='reload'></p>
            <p class='main-error-log'></p>
            <input type='hidden' name='oldClientId'>
            <div class='slideUpClientName'></div>
            <p><b>Добавление записи №</b></p>
            <p>Населенный пункт</p>
            <input type='text' name='clientCity' tabindex='5' maxlength = '20'>
            <p>Стоимость</p>
            <input type='text' name='appCost' tabindex='7' maxlength = '6'>
            <p class='new-app-numb'>1</p>
            <p>Адрес</p>
            <textarea name='clientAddress' cols='30' rows='4' tabindex='6' maxlength = '124'></textarea>
            <p>Описание</p>
            <textarea name='appDescr' cols='27' rows='4' tabindex='8' maxlength = '124'></textarea>
        </div>
    </div>
</body>
</html>