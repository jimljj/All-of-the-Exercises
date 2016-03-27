/**
 * Created by Jimmy on 16/3/27.
 */
var onOff = true;
function fn1( data ){
    var oMsg = document.getElementById("msg");
    var oList = document.getElementById("list");
    var html = "";
    var aEntry = data.entry;

    oMsg.innerHTML = data.title.$t + " : " + data["opensearch:totalResults"].$t;

    for( var i=0; i<aEntry.length; i++){
        html += "<dl><dt>"+ aEntry[i].title.$t +"</dt><dd><img src='"+ aEntry[i].link[2]["@href"] +"'/></dd></dl>";
    }
    oList.innerHTML = html;

    if( onOff ){
        dispalyLi( data);
    }
}

function dispalyLi( data){
    var oQ = document.getElementById("q");
    var oPages = document.getElementById("pages");
    var html = "";
    var liLen = Math.ceil( data["opensearch:totalResults"].$t/data["opensearch:itemsPerPage"].$t ) + 1;
    html = "";
    for( i=1; i<liLen; i++){
        html += "<li>" + i + "</li>";
    }
    oPages.innerHTML = html;

    var aLi = oPages.getElementsByTagName("li");
    for( i=0; i<liLen-1; i++){
        aLi[i].index = i;
        aLi[i].onclick = function () {
            for( var j=0; j<liLen-1; j++){
                aLi[j].classList.remove("active");
            }
            this.classList.add("active");

            var oScript = document.createElement("script");
            oScript.src = "http://api.douban.com/book/subjects?q="+ oQ.value +"&alt=xd&callback=fn1&start-index="+ this.index*10 +"&max-results=10";
            document.body.appendChild( oScript );
        }
    }
    onOff = false;
}

window.onload = function () {
    var oQ = document.getElementById("q");
    var oBtn = document.getElementById("btn");

    oBtn.onclick = function () {
        if( oQ.value != "" ){
            var oScript = document.createElement("script");
            oScript.src = "http://api.douban.com/book/subjects?q="+ oQ.value +"&alt=xd&callback=fn1";
            document.body.appendChild( oScript );
        }
    };

//            http://api.douban.com/book/subjects?q=javascript&alt=xd&callback=fn1&start-index=(第几页*max-result)&max-results=10
}