<?php
    session_start();
    header('Content-type: text/html; charset=utf-8');
    if($_SESSION['sessionlogin']){
        header('Location: php/main.php');
    }
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Авторизация в системе MangApp</title>
    <link rel="stylesheet" href="css/main.css">
    <meta name="viewport" content="width=device-width">
    <script src="applet/addind.js"></script>
    <script src="applet/ajax.js"></script>
    <script src="js/auth.js"></script>
    <link rel="stylesheet" href="css/markup.css">
</head>
<body data-pgid="auth">
    <div class="form-wraper col-md-10">
    
        <form action="#" method="post">
        
            <p>Login</p>

            <p><input type="text" name="userLogin"></p>

            <p>Password</p>

            <p><input type="password" name="userPassword"></p>

            <p class="auth-error-log"></p>

            <p><input type="submit" value="Войти" id="authSubmit"></p>
        
        </form>
    
    </div>
</body>
</html>