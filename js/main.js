/*
Основной JavaScript файл отвечающий за отправку данных на сервер (AJAX метод). 
*/
/*Сворачивание основной формы*/
function toggleForm(){
    var form = d.getElementsByClassName('main-form-wraper')[0];

    if(form.getAttribute('data-status') == 'show'){
        form.style.height = '25px';
        d.getElementById('hide-form-button').innerHTML = '▲' + ' ' + d.getElementById('hide-form-button').getAttribute('data-login-session');
        form.setAttribute('data-status', 'hide');
    }else{
        form.style.height = 'auto';
        d.getElementById('hide-form-button').innerHTML = '▼' + ' ' + d.getElementById('hide-form-button').getAttribute('data-login-session');
        form.setAttribute('data-status', 'show');
    }
}
/*Запуск закрытия сессии */
function exit(e){
    e.preventDefault();
    
    document.location.href = '../php/exit.php';
}
/*Отправка данных заявки на сервер */
function insertApp(e){
    e.preventDefault();
    if(d.getElementById("submit-data-button").getAttribute('data-load-script') == 'false'){

        var client = {
            name: d.getElementsByName('clientName')[0].value,
            surname: d.getElementsByName('clientSurName')[0].value,
            lastname: d.getElementsByName('clientLastName')[0].value,
            city: d.getElementsByName('clientCity')[0].value,
            address: d.getElementsByName('clientAddress')[0].value,
            phonenumber: d.getElementsByName('clientPhoneNumber')[0].value,
        };
        var newapp = {
            cost: d.getElementsByName('appCost')[0].value, 
            description: d.getElementById('apptype').value + ' ',
    }
    if(d.getElementById('systemType').value != ''){
        newapp.description += d.getElementById('systemType').value + ' ';
    }
    if(d.getElementsByName('appNameModel')[0].value != ''){
        newapp.description += ' Модель оборудования: ' + d.getElementsByName('appNameModel')[0].value;
    }
    if(d.getElementsByName('appSerialNumber')[0].value != ''){
        newapp.description += ' Серийнй номер оборудования: '+ d.getElementsByName('appSerialNumber')[0].value;
    }
    if(d.getElementsByName('appIdNumber')[0].value != ''){
        newapp.description += ' ID номер оборудования: ' + d.getElementsByName('appIdNumber')[0].value;
    }
    newapp.description += ' Описание заявки: '+ d.getElementsByName('appDescr')[0].value;
        var oldClientId = d.getElementsByName('oldClientId')[0].value;


        if(!client.name || !client.surname || !client.lastname || !client.city || !client.address || !client.phonenumber || !newapp.cost || d.getElementById('apptype').value == '' || d.getElementsByName('appDescr')[0].value == ''){
            d.getElementsByClassName('main-error-log')[0].innerHTML = 'Необходимо заполнить все поля!';
        }else{
            d.getElementsByClassName('main-error-log')[0].innerHTML = '';
            var url = "../php/insert.php";
            var insertAJAX = getXHR();
            insertAJAX.open('POST', url, true);
            insertAJAX.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            insertAJAX.onreadystatechange = function(){
                if(insertAJAX.readyState == 4 && insertAJAX.status == 200){
                    if(insertAJAX.responseText){
                        var request = insertAJAX.responseText;
                        if(request == 1){
                            location.reload();
                        }else{
                            d.getElementsByClassName('main-error-log')[0].innerHTML = request;
                        }
                    }
                }
            }
            var data = 
            "clientName=" + client.name
            + "&clientSurName=" + client.surname 
            + "&clientLastName=" + client.lastname 
            + "&clientPhoneNumber=" + client.phonenumber
            + "&clientCity=" + client.city 
            + "&clientAddress=" + client.address 
            + "&appCost=" + newapp.cost 
            + "&appDescr=" + newapp.description
            + "&oldClientId=" + oldClientId;
            insertAJAX.send(data);
            d.getElementById('submit-data-button').setAttribute('data-load-script', 'true');
            d.getElementById('submit-data-button').value = 'Отправка...';
            d.getElementById('submit-data-button').style.backgroundColor = 'green';
        }
    }
}
/*Открытие окна подробной информации по клику на строке */
function rowListener(){
    var td = this.getElementsByTagName('td')[0].innerHTML;
    var moreIPW = d.getElementsByClassName('more-info-panel-wraper')[0];
    var moreIP = d.getElementsByClassName('more-info-panel')[0];
    document.querySelectorAll('h3')[0].innerHTML = "Заявка № " + td;
    d.getElementsByName('appidSubmit')[0].value = td;

    d.getElementsByName('more-info-redact')[0].addEventListener('click', redactInfo);
    d.getElementsByName('more-info-client')[0].addEventListener('click', moreInfoClient);
    d.getElementsByName('more-info-status')[0].addEventListener('click', changeStatus);

    var moreIAJAX = getXHR();
    var url = "../php/moreinfo.php";
    moreIAJAX.open('POST', url, true);
    moreIAJAX.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    moreIAJAX.onreadystatechange = function(){
        if(moreIAJAX.readyState == 4 && moreIAJAX.status == 200){
            if(moreIAJAX.responseText){
                var data = JSON.parse(moreIAJAX.responseText);
                var status;
                if(data[0] == 1){
                    status = "Не выполнена";
                    d.getElementsByName('more-info-status')[0].style.display= "inline";
                }else if(data[0] == 2){
                    status = "Выполнена";
                     d.getElementsByName('more-info-status')[0].style.display= "none";
                }else{
                    status = "Отменена";
                    d.getElementsByName('more-info-status')[0].style.display= "none";
                }
                var answer = "<p class='redactName'>" + data[6] + " " + data[5] + " " + data[7] + "</p><p> 8 " + data[8] + "</p><p>" + data[9] + "</p><p class='redactAddress'>" + data[10] + "</p><p class='redactDescr'>" + data[1] + "</p><p class='redactCost'>" + data[2] + "</p><p>" + data[3] + "</p><p>" + data[12] + " " + data[11] + " " + data[13] + "</p><p class='status-val'>" + status + "</p>";
                if(data[0] == 2 ){
                    answer += "<p>Дата выполнения: " + data[4] + "</p><p>Выполнил заявку: " + data[15] + " " + data[14] + "</p>"; 
                }else if(data[0] == 3){
                    answer += "<p>Дата закрытия: " + data[4] + "</p>";
                }
                d.getElementsByClassName('more-info-data')[0].innerHTML = answer;
                moreIPW.style.display = 'block';
                d.getElementsByClassName('shablonName')[0].style = "height:" + (d.getElementsByClassName('redactName')[0].offsetHeight - 10) + "px;";
                d.getElementsByClassName('shablonAddress')[0].style = "height:" + (d.getElementsByClassName('redactAddress')[0].offsetHeight - 10) + "px;";
                d.getElementsByClassName('shablonDescr')[0].style = "height:" + (d.getElementsByClassName('redactDescr')[0].offsetHeight - 10) + "px;";  
            }
        }
    }
    moreIAJAX.send("clientid=" + td);
}
/*Отображение меню изменения статуса заявки */
 function changeStatus(e){
     e.preventDefault();
     status = d.getElementsByClassName('status-val')[0].innerHTML = "<p><select name='statusSubmit'><option>Выполнена</option><option>Отменена</option></select></p><p><select name='workerSubmit'></select></p><p class='status-submit-error-log'></p><p><input type='submit' value='Применить' name='submit-status'></p>";
     d.getElementsByName('submit-status')[0].addEventListener('click', submitStatus);
     var workerAJAX = getXHR();
     var url = "../php/getworkername.php";
     workerAJAX.open('get', url, true);
     workerAJAX.onreadystatechange = function(){
        if(workerAJAX.readyState == 4 && workerAJAX.status == 200){
            if(workerAJAX.responseText){
                var data = JSON.parse(workerAJAX.responseText);
                for(i = 0; i < data.length; i++){
                      d.getElementsByName('workerSubmit')[0].innerHTML += "<option>" + data[i].surname + "</option>"
                }
            }
        }
     }
     workerAJAX.send();
 }
/*Отображение меню редактирования заявки*/
 function redactInfo(e){
     e.preventDefault();

     if( d.getElementsByClassName('redactDescr')[0].getAttribute('data-ch')){
         return 0;
     }
      d.getElementsByClassName('redactDescr')[0].setAttribute('data-ch', '1');
     d.getElementsByClassName('redactDescr')[0].innerHTML = "<textarea name='redactDescr' cols='30' rows='4' maxlength = '124'>" + d.getElementsByClassName('redactDescr')[0].innerHTML + "</textarea>";
     d.getElementsByClassName('redactCost')[0].innerHTML = "<input type='text' name='redactCost' value=" + d.getElementsByClassName('redactCost')[0].innerHTML + " maxlength = '6'><p><input type='submit' value='Изменить' name='redactSubmitButton'></p>";
     d.getElementsByName('redactSubmitButton')[0].addEventListener('click', redactAppSubmit);
     d.getElementsByName('redactCost')[0].addEventListener('keyup', numbRegExp);
     d.getElementsByName('redactDescr')[0].addEventListener('keyup', slashesRegExp);
 }
/*Запрос данных клиента от сервера */
 function moreInfoClient(e){
     e.preventDefault();
     var data;
     
     d.getElementsByClassName('shablon')[0].style.display = 'none';
     d.getElementsByClassName('more-info-panel-control')[0].style.display = 'none';
     d.getElementsByClassName('client-shablon')[0].style.display = 'block';
     d.getElementsByClassName('client-info-panel-control')[0].style.display = 'block';
     d.getElementsByName('client-info-redact')[0].addEventListener('click', redactClientInfo);

     var clientInfoAJAX = getXHR();
     var data = "appid=" + d.getElementsByName('appidSubmit')[0].value;
     url = "../php/clientinfo.php";
     clientInfoAJAX.open('POST', url, true);
     clientInfoAJAX.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
     clientInfoAJAX.onreadystatechange = function(){
         if(clientInfoAJAX.readyState == 4 && clientInfoAJAX.status == 200){
             if(clientInfoAJAX.responseText){
                 var resp = JSON.parse(clientInfoAJAX.responseText);
                 data = "<p>" + resp[0].surname + " " + resp[0].name + " " + resp[0].lastname + "</p><p>8" + resp[0].phonenumber + "</p><p>" + resp[0].city + "</p><p>" + resp[0].address + "</p><p>" + resp[1] + "</p><p>Заявка №" + resp[2].appid + ": " + resp[2].descr + "</p><input type='hidden' name='redact-client-id' value='" + resp[0].clientid +"'>"; 
                 document.querySelectorAll('h3')[0].innerHTML = "Данные клиента"; 
                 d.getElementsByClassName('more-info-data')[0].innerHTML = data;
             }
         }
     }
     clientInfoAJAX.send(data);
 }
/*Отправка статуса заявки на сервер */
 function submitStatus(e){
     e.preventDefault();

     var worker = d.getElementsByName('workerSubmit')[0].value;
     var status = d.getElementsByName('statusSubmit')[0].value;
     var appid = d.getElementsByName('appidSubmit')[0].value;

     if(!worker || !status){
         d.getElementsByClassName('status-submit-error-log')[0].innerHTML = 'Заполните все поля!';
     }else{
         var statusAJAX = getXHR();
         var url = "../php/statuschange.php";
         var data = "worker=" + worker + "&status=" + status + "&appid=" + appid;
         statusAJAX.open('POST', url, true);
         statusAJAX.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
         statusAJAX.onreadystatechange = function(){
             if(statusAJAX.readyState == 4 && statusAJAX.status == 200){
                 if(statusAJAX.responseText){
                     var response = statusAJAX.responseText;
                     if(response == 1){
                         document.location.href = '../index.php';
                     }else{
                         d.getElementsByClassName('status-submit-error-log')[0].innerHTML = response;
                     }
                 }
             }
         }
         statusAJAX.send(data);
     }
 }
/*Отправка редактированных данных заявки на сервер */
 function redactAppSubmit(e){
     e.preventDefault();

     var Descr = d.getElementsByName('redactDescr')[0].value;
     var Cost = d.getElementsByName('redactCost')[0].value;
     var appid = d.getElementsByName('appidSubmit')[0].value;

     var redactAppAJAX = getXHR();
     var url = "../php/redactapp.php";
     var data = "Descr=" + Descr + "&Cost=" + Cost + "&appid=" + appid;
     redactAppAJAX.open('POST', url, true);
     redactAppAJAX.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
     redactAppAJAX.onreadystatechange = function(){
         if(redactAppAJAX.readyState == 4 && redactAppAJAX.status == 200){
             if(redactAppAJAX.responseText){
                 var responce = redactAppAJAX.responseText;
                 if(responce == 1){
                     document.location.href = '../index.php';
                 }else{
                     alert(responce);
                 }
             }
         }
     }
     redactAppAJAX.send(data);
 }
/*Проверка вводимых пользователем данных на клиенте */
 function getvalidatevalue(){
    var clientName = d.getElementsByName('clientName')[0];
    var clientSurName = d.getElementsByName('clientSurName')[0];
    var clientLastName = d.getElementsByName('clientLastName')[0];
    var clientCity = d.getElementsByName('clientCity')[0];
    var clientPhoneNumber = d.getElementsByName('clientPhoneNumber')[0];
    var appCost = d.getElementsByName('appCost')[0];

    if(d.getElementsByClassName('main-form-wraper')[0]){
        clientName.addEventListener('keyup', textRegExp);
        clientSurName.addEventListener('keyup', textRegExp);
        clientLastName.addEventListener('keyup', textRegExp);
        clientCity.addEventListener('keyup', textRegExp);
        clientPhoneNumber.addEventListener('keyup', numbRegExp);
        appCost.addEventListener('keyup', numbRegExp);

        clientName.addEventListener('keyup', getClientName);
        clientSurName.addEventListener('keyup', getClientName);
        clientLastName.addEventListener('keyup', getClientName);
    }
    
 }
/*Реглярный запрос: ТЕКСТ */
function textRegExp(){
    console.log('reg');
    var reg = /['a-z','A-z','а-я','А-я']/;
    var alter = /[''', '/', '`']/;
    if(reg.test(this.value.substring(this.value.length-1)) == false){
       this.value = this.value.substring(0, this.value.length -1);
    }
    if(alter.test(this.value.substring(this.value.length-1)) == true){
       this.value = this.value.substring(0, this.value.length -1);
    }
}
/*Регулярный запрос: ЧИСЛО */
function numbRegExp(){
    var reg = /[0-9]/;
    if(reg.test(this.value.substring(this.value.length-1)) == false){
       this.value = this.value.substring(0, this.value.length -1);
    }
}
/*Регулярный запрос: СПЕЦСИМВОЛЫ */
function slashesRegExp(){
    var reg = /['/`]/;
    if(reg.test(this.value.substring(this.value.length-1)) == true){
       this.value = this.value.substring(0, this.value.length -1);
    }
} 
/*Запрос данных зарегистрированных клиентов при заполнении основной формы */
function getClientName(){
    var clientName = d.getElementsByName('clientName')[0].value;
    var clientSurName = d.getElementsByName('clientSurName')[0].value;
    var clientLastName = d.getElementsByName('clientLastName')[0].value;
    var data = "clientName=" + clientName + "&clientSurName=" + clientSurName + "&clientLastName=" + clientLastName; 
    var answContainer = d.getElementsByClassName('slideUpClientName')[0];
    answContainer.innerHTML = '';
    
    if(clientName || clientSurName || clientLastName){
        var clientNameAJAX = getXHR();
        var url = "../php/getclientname.php";
        clientNameAJAX.open('POST', url, true);
        clientNameAJAX.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        clientNameAJAX.onreadystatechange = function(){
            if(clientNameAJAX.readyState == 4 && clientNameAJAX.status == 200){
                if(clientNameAJAX.responseText){
                    var answ = JSON.parse(clientNameAJAX.responseText);
                    for(i = 0; i < answ.length; i++){
                        answContainer.innerHTML += "<p class='oldClientInfo' data-id='" + answ[i].clientid + "'>" + answ[i].surname + " " + answ[i].name + " " + answ[i].lastname + " г." + answ[i].city + " " + answ[i].address + " тел. 8" + answ[i].phonenumber +  "</p>";
                    }
                    for(i = 0; i < d.getElementsByClassName('oldClientInfo').length; i++){
                        d.getElementsByClassName('oldClientInfo')[i].addEventListener('click', autoInsertData);
                        console.log(i);
                    }
                }
            }
        }
        clientNameAJAX.send(data);
    }
}
/*Автозаполнение формы данными зарегистрированного клиента */
function autoInsertData(){
    var clientName = d.getElementsByName('clientName')[0];
    var clientSurName = d.getElementsByName('clientSurName')[0];
    var clientLastName = d.getElementsByName('clientLastName')[0];
    var clientCity = d.getElementsByName('clientCity')[0];
    var clientAddress = d.getElementsByName('clientAddress')[0];
    var clientPhoneNumber = d.getElementsByName('clientPhoneNumber')[0];
    var autoInsertAJAX = getXHR();
    var url = "../php/getclientname.php";
    var data = "clientid=" + this.getAttribute('data-id');
    autoInsertAJAX.open('POST', url, true);
    autoInsertAJAX.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    autoInsertAJAX.onreadystatechange = function(){
        if(autoInsertAJAX.readyState == 4 && autoInsertAJAX.status == 200){
            if(autoInsertAJAX.responseText){
                var responce = JSON.parse(autoInsertAJAX.responseText);
                clientName.value = responce[0].name;
                clientSurName.value = responce[0].surname;
                clientLastName.value = responce[0].lastname;
                clientCity.value = responce[0].city;
                clientAddress.value = responce[0].address;
                clientPhoneNumber.value = responce[0].phonenumber;
                d.getElementsByName('oldClientId')[0].value = responce[0].clientid;
                d.getElementsByClassName('slideUpClientName')[0].innerHTML = '';
            }
        }
    }
    autoInsertAJAX.send(data);
}
/*Отображение меню редактирование данных клиента */
function redactClientInfo(e){
    e.preventDefault(); 
    var pArray = d.getElementsByClassName('more-info-data')[0].getElementsByTagName('p');

    if(!d.getElementsByName('client-info-redact')[0].getAttribute('data-st')){
    pArray[1].innerHTML = "<input type='text' value='" + pArray[1].innerHTML.substring(1) + "' name='client-phone-redact' maxlength = '10'>";
    pArray[2].innerHTML = "<input type='text' value='" + pArray[2].innerHTML + "' name='client-city-redact' maxlength = '20'>";
    pArray[3].innerHTML = "<input type='text' value='" + pArray[3].innerHTML + "' name='client-address-redact' maxlength = '124'>";
    pArray[1].getElementsByTagName('input')[0].addEventListener('keyup', numbRegExp);
    pArray[2].getElementsByTagName('input')[0].addEventListener('keyup', textRegExp);
    d.getElementsByClassName('client-info-panel-control')[0].innerHTML += "<input type='submit' value='Применить' name='redact-client-data-submit'>";
    d.getElementsByName('redact-client-data-submit')[0].addEventListener('click', updateClientInfo);
    d.getElementsByName('client-info-redact')[0].setAttribute('data-st', 1);
    }else{
        return 0;
    }
}
/*Отправка редактированных данных клиента на сервер */
function updateClientInfo(e){
    e.preventDefault();
    var pArray = d.getElementsByClassName('more-info-data')[0].getElementsByTagName('p');
    var data = "phone=" + pArray[1].getElementsByTagName('input')[0].value + "&city=" + pArray[2].getElementsByTagName('input')[0].value + "&address=" + pArray[3].getElementsByTagName('input')[0].value + "&clientid=" +  d.getElementsByName('redact-client-id')[0].value;
    var url = "../php/updateclient.php"
    var updateClientAJAX = getXHR();
    updateClientAJAX.open("POST", url, true);
    updateClientAJAX.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    updateClientAJAX.onreadystatechange = function(){
        if(updateClientAJAX.readyState == 4 && updateClientAJAX.status == 200){
            if(updateClientAJAX.responseText){
                var responce = updateClientAJAX.responseText;
                if(responce == '1'){
                    console.log(responce);
                    document.location.href = 'main.php';
                }else{
                    alert(responce);
                }
            }
        }
    }
    updateClientAJAX.send(data);
}
/*Переход на страницу поиска *ФУНКЦИЯ ПОКА В РАЗРАБОТКЕ!* */
function search(e){
    e.preventDefault();

    document.location.href = '../php/search.php';   
}
/*Запрос и отображение статуса workstat в таблице*/
function outputWorkStatus(){
    // var row = d.getElementsByTagName(tr)[];
    var url = "../php/getworkstatus.php";
    var getworkstatus = getXHR();
    getworkstatus.open('POST', url, true);
    getworkstatus.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    getworkstatus.onreadystatechange = function(){
        if(getworkstatus.readyState == 4 && getworkstatus.status == 200){
            var response = getworkstatus.responseText;
            if(response){
                var request = JSON.parse(response);
                for(i = 0; i < request.length; i++){
                    
                    if(request[i].workstat == 1 && request[i].status == 1 && d.getElementById(request[i].appid).getAttribute('data-workstatfresh') != 1){
                        d.getElementById(request[i].appid).getElementsByTagName('td')[0].style.backgroundColor = "yellow";
                        // d.getElementById(request[i].appid).style = "data-workstatfresh = 1";
                    }
                }
            }
        }
    }
    getworkstatus.send();
    setTimeout(outputWorkStatus, 10000);
}

function perform(e){
    e.preventDefault();
    if(d.getElementsByClassName('winr-wraper')[0].style.display == 'block'){
        d.getElementsByClassName('winr-wraper')[0].style.display = 'none';
    }else{
        d.getElementsByClassName('winr-wraper')[0].style.display = 'block';
    }
}

function winrFunction(tab){
    var table = d.getElementsByClassName('worker-window-table')[0];
    var func = tab;
        if(tab == 'gwork'){
            d.getElementsByClassName('worker-window-wraper')[0].style.display = 'block';
            d.getElementsByClassName('more-info-panel-close')[1].addEventListener('click', closeWorkerPanel);
            d.getElementsByName('worker-data-redact')[0].addEventListener('click', setWorkerData);
            d.addEventListener('keyup', closeWorkerPanelClick);
            var workerTableAJAX = new getXHR();
            var url = '../php/workertable.php'
            workerTableAJAX.open('POST', url, true);
            workerTableAJAX.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            workerTableAJAX.onreadystatechange = function(){
                if(this.readyState == 4 && this.status == 200){
                    var response = workerTableAJAX.responseText;
                    if(response){
                        var request = JSON.parse(response);
                        console.log(request);
                        if(request == 'error'){
                            alert('У Вас недостаточно прав для выполнения этой операции. Обратитесь к администратору за дополнительной информацией.');
                                closeWorkerPanel();
                        }else{
                            var tableinner = '';
                            for(i = 0; i < request.length; i++){
                                tableinner += '<tr data-trid="' + (request[i]['workerid'] || request[i]['cashierid']) +'" data-usertype="'+ request[i]['usertype'] +'"><td>' + request[i]['usertype'].substring(0,1) + '</td><td data-tdname="surname">' + request[i]['surname'] + '</td><td data-tdname="name">' + request[i]['name'] + '</td><td data-tdname="lastname">' + request[i]['lastname'] + '</td><td data-tdname="workermail">' + (request[i]['workermail'] || 'Не указан') + '</td><td data-tdname="login">' + request[i]['login'] + '</td></tr>';   
                            }
                            table.innerHTML += tableinner;
                            var tr = table.getElementsByTagName('tr');
                            for(i = 1; i < tr.length; i++){
                                tr[i].addEventListener('click', redactworker);
                            }
                        }
                    }
                }
            }
            workerTableAJAX.send();

        }else if(tab == 'swork'){
            d.getElementsByClassName('worker-window-wraper')[0].style.display = 'block';
            d.getElementsByClassName('more-info-panel-close')[1].addEventListener('click', closeWorkerPanel);
            d.addEventListener('keyup', closeWorkerPanelClick);
            d.getElementsByName('worker-data-redact')[0].addEventListener('click', selectNewWorker);
            d.getElementsByClassName('worker-window-table-wraper')[0].insertBefore(d.createElement('p'), d.getElementsByName('worker-data-redact')[0]).appendChild(d.createElement('select')).setAttribute('id', 'usertype');
            d.getElementById('usertype').innerHTML = '<option value="worker">Монтажник</option><option value="cashier">Кассир</option>'
            table.innerHTML = '<tr><td>Фамилия</td><td>Имя</td><td>Отчество</td><td>Имя пользователя</td><td>Пароль</td><td>E-mail</td></tr><tr><td><input name="surname" type="text"></td><td><input name="name" type="text"></td><td><input name="lastname" type="text"></td><td><input name="login" type="text"></td><td><input name="password" type="text"></td><td><input name="mail" type="text"></td></tr>'
        }else if(tab == 'dwork'){
            d.getElementsByClassName('worker-window-wraper')[0].style.display = 'block';
            d.getElementsByClassName('more-info-panel-close')[1].addEventListener('click', closeWorkerPanel);
            d.addEventListener('keyup', closeWorkerPanelClick);
            table.innerHTML = '<tr><td>Фамилия</td><td>Имя</td><td>Отчество</td><td>Имя пользователя</td><td></td></tr>'
            d.getElementsByName('worker-data-redact')[0].style.display='none';
            var workerTableAJAX = new getXHR();
            var url = '../php/workertable.php'
            workerTableAJAX.open('POST', url, true);
            workerTableAJAX.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            workerTableAJAX.onreadystatechange = function(){
                if(this.readyState == 4 && this.status == 200){
                    var response = workerTableAJAX.responseText;
                    if(response){
                        var request = JSON.parse(response);
                        console.log(request);
                        if(request == 'error'){
                            alert('У Вас недостаточно прав для выполнения этой операции. Обратитесь к администратору за дополнительной информацией.');
                                closeWorkerPanel();
                        }else{
                            var tableinner = '';
                            for(i = 0; i < request.length; i++){
                                tableinner += '<tr data-trid="' + (request[i]['workerid'] || request[i]['cashierid']) +'" data-usertype="'+ request[i]['usertype'] +'"><td data-tdname="surname">' + request[i]['surname'] + '</td><td data-tdname="name">' + request[i]['name'] + '</td><td data-tdname="lastname">' + request[i]['lastname'] + '</td><td data-tdname="login">' + request[i]['login'] + '</td><td><input type="submit" value="Удалить" name="delete-button" data-idAccount="'+ request[i]['login'] +'"></td></tr>';   
                            }
                            table.innerHTML += tableinner;
                            var tr = table.getElementsByTagName('tr');
                            for(i = 0; i < d.getElementsByName('delete-button').length; i++){
                                d.getElementsByName('delete-button')[i].addEventListener('click', deleteAccount);
                            }
                        }
                    }
                }
            }
            workerTableAJAX.send();
        }
        console.log(tab);
        d.getElementsByClassName('winr-wraper')[0].style.display = 'none'; 
}

function closeWorkerPanelClick(e){
    if(e.keyCode == 27){
        d.getElementsByClassName('worker-window-table')[0].innerHTML = '<tr><td>Тип</td><td>Фамилия</td><td>Имя</td><td>Отчество</td><td>E-mail адрес</td><td>Имя пользователя</td></tr>';
        d.getElementsByClassName('worker-window-wraper')[0].style.display = 'none';
        if(d.getElementById('usertype')){
            d.getElementById('usertype').parentNode.remove();
        }
        d.removeEventListener('keyup', closeWorkerPanelClick);
        d.getElementsByName('worker-data-redact')[0].removeEventListener('click', setWorkerData);
        d.getElementsByName('worker-data-redact')[0].style.display='block';
        d.getElementsByClassName('redactChecker')[0].setAttribute('data-check', '0');
    }
}

function closeWorkerPanel(){
    d.getElementsByClassName('worker-window-table')[0].innerHTML = '<tr><td>Тип</td><td>Фамилия</td><td>Имя</td><td>Отчество</td><td>E-mail адрес</td><td>Имя пользователя</td></tr>';
    d.getElementsByClassName('worker-window-wraper')[0].style.display = 'none';
    if(d.getElementById('usertype')){
        d.getElementById('usertype').parentNode.remove();
    }
    d.getElementsByClassName('more-info-panel-close')[1].removeEventListener('click', closeWorkerPanel);
    d.getElementsByName('worker-data-redact')[0].removeEventListener('click', setWorkerData);
    d.getElementsByName('worker-data-redact')[0].style.display='block';
    d.getElementsByClassName('redactChecker')[0].setAttribute('data-check', '0');
}

function redactworker(){
    if(d.getElementsByClassName('redactChecker')[0].getAttribute('data-check') == 1){
        return 0;
    }
    var td = this.getElementsByTagName('td');
    for(i = 1; i < td.length; i++){
        td[i].innerHTML = '<input type="text" name="' + td[i].getAttribute('data-tdname') + '" value="' + td[i].innerHTML + '">';
    }
    d.getElementsByClassName('redactChecker')[0].setAttribute('data-check', '1');
    this.removeEventListener('click', redactworker);
}

function setWorkerData(e){
    e.preventDefault();
    var worker = {
        name: d.getElementsByName('name')[0].value,
        surname: d.getElementsByName('surname')[0].value,
        lastname: d.getElementsByName('lastname')[0].value,
        login: d.getElementsByName('login')[0].value,
        workermail: d.getElementsByName('workermail')[0].value,
        id: d.getElementsByName('name')[0].parentNode.parentNode.getAttribute('data-trid'),
    }
    // for(key in worker){
    //     if(worker[key] === 'undefined'){
    //         worker[key] = '';
    //     }
    // }
    var newDataAJAX = getXHR();
    var url = '../php/redactWorkerData.php';
    var data = 'name=' + worker.name + '&surname=' + worker.surname + '&lastname=' + worker.lastname + '&workermail=' + worker.workermail + '&login=' + worker.login + '&id=' + worker.id + '&usertype=' + d.getElementsByName('name')[0].parentNode.parentNode.getAttribute('data-usertype'); 
    newDataAJAX.open('POST', url, true);
    newDataAJAX.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    newDataAJAX.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            var response = this.responseText;
            if(response == 1){
                location.reload();
            }
        }
    }
    newDataAJAX.send(data);
}

function selectNewWorker(e){
    e.preventDefault();
    var worker = {
        name: d.getElementsByName('name')[0].value,
        surname: d.getElementsByName('surname')[0].value,
        lastname: d.getElementsByName('lastname')[0].value,
        login: d.getElementsByName('login')[0].value,
        workermail: d.getElementsByName('mail')[0].value,
        password: d.getElementsByName('password')[0].value,
        usertype: d.getElementById('usertype').value
    }
    var url = '../php/selectNewWorker.php';
    var data = 'name=' + worker.name + '&surname=' + worker.surname + '&lastname=' + worker.lastname + '&login=' + worker.login + '&password=' + worker.password + '&mail=' + worker.workermail + '&usertype=' + worker.usertype;
    var selectNWAJAX = getXHR();
    selectNWAJAX.open('POST', url, true);
    selectNWAJAX.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    selectNWAJAX.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            var response = this.responseText;
            var request = JSON.parse(this.responseText);
            if(request == 'error'){
                            alert('У Вас недостаточно прав для выполнения этой операции. Обратитесь к администратору за дополнительной информацией.');
                                closeWorkerPanel();
                        }
            if(response == 1){
                location.reload();
            }else{
                console.log(response);
            }
        }
    }
    selectNWAJAX.send(data);
}

function appTypeSelect(){
    if(this.value == 'Вызов мастера'){
        d.getElementsByName('appNameModel')[0].style.display = 'none';
        d.getElementsByName('appSerialNumber')[0].style.display = 'none';
        d.getElementsByName('appIdNumber')[0].style.display = 'none';
        d.getElementById('systemType').style.display = 'block';
    }
    if(this.value == 'Монтаж комплекта'){
        d.getElementsByName('appNameModel')[0].style.display = 'none';
        d.getElementsByName('appSerialNumber')[0].style.display = 'none';
        d.getElementsByName('appIdNumber')[0].style.display = 'none';
        d.getElementById('systemType').style.display = 'block';
    }
    if(this.value == 'Сервисное обслуживание'){
        d.getElementsByName('appNameModel')[0].style.display = 'block';
        d.getElementsByName('appSerialNumber')[0].style.display = 'block';
        d.getElementsByName('appIdNumber')[0].style.display = 'block';
        d.getElementById('systemType').style.display = 'block';
    }
    if(this.value == 'Замена оборудования'){
        d.getElementsByName('appNameModel')[0].style.display = 'block';
        d.getElementsByName('appSerialNumber')[0].style.display = 'none';
        d.getElementsByName('appIdNumber')[0].style.display = 'none';
        d.getElementById('systemType').style.display = 'block';
    }
    console.log(this.value);
}

function deleteAccount(){
    var login = this.getAttribute('data-idAccount');
    if(confirm('Вы уверены? Данное действие нельзя будет отменить! Учетная запись будет утеряна!')){
        var deleteAJAX = getXHR();
        var url = '../php/deleteAccount.php';
        var data = 'login='+ login;
        deleteAJAX.open('POST', url, true);
        deleteAJAX.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        deleteAJAX.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                var response = this.responseText;
                if(response == 1){
                    alert('Запись успешно удалена. Страница будет перезагружена!');
                    location.reload();
                }else{
                    alert(response);
                }
            }
        }
        deleteAJAX.send(data);
    }
}