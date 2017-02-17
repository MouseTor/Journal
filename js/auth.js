/*Отправка данных формы авторизации на сервер*/
function auth(e){
    e.preventDefault()
    var userLogin = d.getElementsByName('userLogin')[0].value;
    var userPassword = d.getElementsByName('userPassword')[0].value;

    d.getElementsByClassName('auth-error-log')[0].innerHTML = '';

    if(!userLogin || !userPassword){
        d.getElementsByClassName('auth-error-log')[0].innerHTML = 'Заолните все поля';
    }else{
        var url = 'php/auth.php';
        var authAjax = getXHR();
        authAjax.open('POST', url, true);
        authAjax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        var data = 'userLogin=' + userLogin + '&userPassword=' + userPassword;

        authAjax.onreadystatechange = function(){
        if(authAjax.readyState == 4 && authAjax.status == 200){
            if(authAjax.responseText){
                var request = authAjax.responseText;
                if(request == 1){
                    document.location.href = "php/main.php";
                }
                if(request == 0){
                    document.location.href = "php/main.php";
                }
                d.getElementsByClassName('auth-error-log')[0].innerHTML = request;          
            }            
        }
    }
    authAjax.send(data);
    }
}