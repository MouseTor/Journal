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
        d.getElementById('account-managment').addEventListener('click', function(e){
            e.preventDefault();
            winrFunction('gwork');
        });
        d.getElementById('add-new-account').addEventListener('click', function(e){
            e.preventDefault();
            winrFunction('swork');
        });
        d.getElementById('delet-account').addEventListener('click', function(e){
            e.preventDefault();
            winrFunction('dwork');
        });
        if(d.getElementsByClassName('main-form-wraper')[0]){
            d.getElementsByClassName('new-app-numb')[0].innerHTML = '<b> Добавление записи №' + (d.getElementsByTagName('tr').length - 1) + '</b>'
            var bodyh = d.getElementsByClassName('main-table')[0].offsetHeight + d.getElementsByClassName('main-form-wraper')[0].offsetHeight;
            d.getElementById('apptype').addEventListener('change', appTypeSelect);
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
        d.getElementsByClassName('more-info-panel-close')[0].addEventListener('click', function(){ d.getElementsByName('client-info-redact')[0].removeEventListener('click', redactClientInfo);d.getElementsByClassName('more-info-panel-wraper')[0].style.display = 'none'; d.getElementsByClassName('shablon')[0].style.display = 'block';d.getElementsByClassName('more-info-panel-control')[0].style.display = 'block';d.getElementsByClassName('client-shablon')[0].style.display = 'none';d.getElementsByClassName('client-info-panel-control')[0].style.display = 'none';});
        getvalidatevalue();
        if(d.getElementsByClassName('main-form-wraper')[0]){
            d.getElementsByName('reload')[0].addEventListener('click', function(e){e.preventDefault(); location.reload();})
        d.getElementsByName('appDescr')[0].addEventListener('keyup', slashesRegExp);
        d.getElementsByName('appfilter-butt')[0].addEventListener('click', function(e){e.preventDefault(); document.location.href = "http://tvnet3.ru/tv-journal/php/main.php?appfilter=1";});
        d.getElementById('winr').addEventListener('click', perform);
        // d.getElementsByName('search-filter')[0].addEventListener('click', search);
        }
        
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
        d.getElementsByName('appfilter-butt')[0].addEventListener('click', function(e){e.preventDefault(); document.location.href = "http://tvnet3.ru/tv-journal/php/main.php";});
        }
    }
}