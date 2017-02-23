document.addEventListener('DOMContentLoaded', addind);

var d = document;
/*Назначение обработчиков событий на страницах журнала*/
function addind(){
    var d = document;
    var pageId = d.getElementsByTagName('body')[0].getAttribute('data-pgid');
    if(pageId == 'auth'){
        d.getElementById('authSubmit').addEventListener('click', auth);
    }
    if(pageId == 'main'){
        outputWorkStatus();
        if(d.getElementsByClassName('main-table')[0]){d.getElementsByClassName('new-app-numb')[0].innerHTML = '<b>' + "Добавление записи № "+ d.getElementsByTagName('tr').length + '</b>'};
        if(d.getElementsByClassName('main-form-wraper')[0]){
            var bodyh = d.getElementsByClassName('main-table')[0].offsetHeight + d.getElementsByClassName('main-form-wraper')[0].offsetHeight;
        }
        d.getElementsByTagName('body')[0].style = "min-height:" + bodyh + "px";
        var tr = d.getElementsByTagName('tr');
        if( d.getElementById('hide-form-button')){
            d.getElementById('hide-form-button').addEventListener('click', toggleForm);
        }
        d.getElementById('end-programm').addEventListener('click', exit);
        if(d.getElementsByName('insertApp')[0]){d.getElementsByName('insertApp')[0].addEventListener('click', insertApp);}
        for(i = 1; i < tr.length; i++){
            tr[i].addEventListener('click', rowListener);
        }
        
        d.getElementsByClassName('panel-close')[0].addEventListener('click', function(){ d.getElementsByName('client-info-redact')[0].removeEventListener('click', redactClientInfo);d.getElementsByClassName('more-info-panel-wraper')[0].style.display = 'none'; d.getElementsByClassName('shablon')[0].style.display = 'block';d.getElementsByClassName('more-info-panel-control')[0].style.display = 'block';d.getElementsByClassName('client-shablon')[0].style.display = 'none';d.getElementsByClassName('client-info-panel-control')[0].style.display = 'none';});
        d.getElementsByClassName('panel-close')[1].addEventListener('click', function(){ d.getElementsByClassName('new-app-panel-wraper')[0].style.display = 'none';});
        getvalidatevalue();
        if(d.getElementsByClassName('main-form-wraper')[0]){
            d.getElementsByName('reload')[0].addEventListener('click', function(e){e.preventDefault(); location.reload();})
            d.getElementById('add-new-app').addEventListener('click', function(e){ e.preventDefault(); d.getElementsByClassName('new-app-panel-wraper')[0].style.display = "block"});
            
        // d.getElementsByName('appDescr')[0].addEventListener('keyup', slashesRegExp);
        console.log('add-listener');
        d.getElementsByName('appfilter-butt')[0].addEventListener('click', function(e){e.preventDefault(); document.location.href = "http://webbranch.ru/journal/php/main.php?appfilter=1";});
        
        // d.getElementsByName('search-filter')[0].addEventListener('click', search);
        }
        
        d.getElementsByName('new-app-type')[0].addEventListener('change', function(){
            console.log('mew-app');
            if(this.value == 'call-master-system-type'){
                d.getElementsByClassName('description')[0].innerHTML = '<p data-app-type="call-master"><p>Выберите тип системы</p><select name="call-master-system-type"><option value="1">Триколор ТВ</option><option value="2">НТВ+</option><option value="3">Цифровое эфирное ТВ</option><option value="4">Видеонаблюдение</option><option value="5">Другое</option></select></p><p>Описание</p><textarea name="appDescr" cols="27" rows="4" tabindex="8" maxlength = "124"></textarea>';
            }else if(this.value == 'install-work-system-type'){
                d.getElementsByClassName('description')[0].innerHTML = '<p data-app-type="install-work"><p>Выберите тип системы</p><select name="install-work-system-type"><option value="1">Триколор ТВ</option><option value="2">НТВ+</option><option value="3">Цифровое эфирное ТВ</option><option value="4">Видеонаблюдение</option><option value="5">Другое</option></select></p><p>Описание</p><textarea name="appDescr" cols="27" rows="4" tabindex="8" maxlength = "124"></textarea>'
            }else if(this.value == 'service-center-system-type'){
                d.getElementsByClassName('description')[0].innerHTML =  '<p data-app-type="service-center"><p>Выберите тип системы</p><select name="service-center-system-type"><option value="1">Триколор ТВ</option><option value="2">НТВ+</option><option value="3">Цифровое эфирное ТВ</option></select><p><input type="text" name="service-center-id"></p><p><input type="text" name="srervice-center-sn"></p></p><p>Описание</p><textarea name="appDescr" cols="27" rows="4" tabindex="8" maxlength = "124"></textarea>'
            }else if(this.value == 'replacement-system-type'){
                 d.getElementsByClassName('description')[0].innerHTML = '<p data-app-type="replacement"><p>Выберите тип системы</p><select name="replacement-system-type"><option value="1">Триколор ТВ</option><option value="2">НТВ+</option></select><p><input type="text" name="replacement-model"></p></p><p>Описание</p><textarea name="appDescr" cols="27" rows="4" tabindex="8" maxlength = "124"></textarea>'
            }else{
                d.getElementsByClassName('description')[0].innerHTML = '';
            }
        });
        
    }
    if(pageId == 'search'){
        d.getElementsByName('reload')[0].addEventListener('click', function(e){e.preventDefault(); location.reload();})
        d.getElementsByName('appDescr')[0].addEventListener('keyup', slashesRegExp);
        d.getElementById('hide-form-button').addEventListener('click', toggleForm);
        d.getElementById('end-programm').addEventListener('click', exit);
    }
    if(d.getElementsByTagName('table')[0]){
        if(d.getElementsByTagName('table')[0].getAttribute('data-pgid') == 'appfilter'){
        var tr = d.getElementsByTagName('tr');
        d.getElementById('hide-form-button').addEventListener('click', toggleForm);
        d.getElementById('end-programm').addEventListener('click', exit);
        d.getElementsByName('insertApp')[0].addEventListener('click', insertApp);
        for(i = 1; i < tr.length; i++){
            tr[i].addEventListener('click', rowListener);
        }
        d.getElementsByClassName('more-info-panel-close')[0].addEventListener('click', function(){ d.getElementsByName('client-info-redact')[0].removeEventListener('click', redactClientInfo);d.getElementsByClassName('more-info-panel-wraper')[0].style.display = 'none'; d.getElementsByClassName('shablon')[0].style.display = 'block';d.getElementsByClassName('more-info-panel-control')[0].style.display = 'block';d.getElementsByClassName('client-shablon')[0].style.display = 'none';d.getElementsByClassName('client-info-panel-control')[0].style.display = 'none';});
        getvalidatevalue();
        d.getElementsByName('reload')[0].addEventListener('click', function(e){e.preventDefault(); location.reload();})
        d.getElementsByName('appDescr')[0].addEventListener('keyup', slashesRegExp);
        d.getElementsByName('appfilter-butt')[0].value= "Показать все";
        d.getElementsByName('appfilter-butt')[0].addEventListener('click', function(e){e.preventDefault(); document.location.href = "http://webbranch.ru/journal/php/main.php";});
        }
    }
}