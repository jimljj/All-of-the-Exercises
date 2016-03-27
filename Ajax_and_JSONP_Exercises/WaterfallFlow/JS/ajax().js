/**
 * Created by Jimmy on 15/12/25.
 */
function ajax( method, url, data, fn){
    var xhr = null;

    try{
        xhr = new XMLHttpRequest();
    } catch (e){
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    if( method == "get" && data ){
        url += '?' + data;
    }
    xhr.open( method, url, true);

    if( method == "get" ){
        xhr.send();
    } else {
        xhr.setRequestHeader( "content-type", "application/x-www-form-urlencoded");
        xhr.send( data );
    }

    xhr.onreadystatechange = function () {
        if( xhr.readyState==4 ){
            if( (xhr.status>=200 && xhr.status<300) || xhr.status==304 ){
                fn && fn( xhr.responseText );
            } else {
                alert( "出错了!Error:" + xhr.status );
            }
        }
    }
}