/*Кроссбраузерное получение обьекта XMLHTTP*/
function getXHR(){
    var xhr;
    try{
        xhr = new ActiveXObject("Msxml12.XMLHTTP");
    }catch(e){
        try{
            xhr = ActiveXObject("Microsoft.XMLHTTP");
        }catch(e){
            xhr = false;}}
    if(!xhr && typeof XMLHttpRequest != 'undefined'){
        xhr = new XMLHttpRequest;}
    return xhr;} 