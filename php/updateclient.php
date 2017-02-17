<?php
/*Обновление данных клиенда в базе данных*/
header('Content-type: text/html; charset=utf-8');
require "dbdata.php";

@ $dbconnect = new mysqli($dbData->host, $dbData->login, $dbData->password, $dbData->database);

$phone = trim($_POST['phone']);
$city = trim($_POST['city']);
$address = trim($_POST['address']);
$clientid = trim($_POST['clientid']);

if(mysqli_connect_errno()){
    echo "<p class='no-connect-db'>Не удалось подлючиться к базе данных. Повторите попытку позже.</p>";
    exit;
}
$query = "update clients set phonenumber=".$phone.", city='".$city."', address='".$address."' where clientid=".$clientid;
$result = $dbconnect->query($query);
if($result){
    echo 1;
    exit;
}else{
    echo 'Произошла ошибка при обновлении данных. Обратитесь за помощью к системному администратору';
}
?>