/**
 * Created by Jimmy on 16/3/27.
 */
window.onload = function () {
    var oDisplay = document.getElementById("display");
    var oChoose = document.getElementById("choose");
    var oConfirm = document.getElementById("confirm");
    var oImport = document.getElementById("import");
    var arrText = [];
    var displayStr = "";
    var fontNum = 0;
    var len = 0;

    var arrTypeface = [
        { url:"img/8.png", color:"blue"},
        { url:"img/3.jpg", color:"red"},
        { url:"img/6.jpg", color:"green"}
    ];

    oConfirm.onclick = function () {
        displayStr = "";
        arrText = oImport.value.split("");
        len = arrText.length;
        fontNum = oChoose.value;

        for(var i=0; i<len; i++){
            displayStr += "<li style='color:"+ arrTypeface[fontNum].color +"'>" + arrText[i] + "<img src='"+ arrTypeface[fontNum].url +"'/></li>";
        }
        oDisplay.innerHTML = displayStr;
    };

}