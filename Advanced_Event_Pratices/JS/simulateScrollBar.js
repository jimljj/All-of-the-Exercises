/**
 * Created by Jimmy on 16/3/27.
 */
window.onload = function () {
    var oBar = document.getElementById("scrollBar");
    var oArea = document.getElementById("scrollArea");
    var oWrap = document.getElementById("wrap");
    var oContent = document.getElementById("content");

    var scrollContentDis = oWrap.clientHeight-oContent.offsetHeight;        //内容可滚动的距离

    if( scrollContentDis>0 || scrollContentDis==0 ){
        oBar.style.height = "500px";
    } else {
        oBar.style.height = -50000/scrollContentDis + "px";
    }

    oBar.onmousedown = function (e) {
        var barY = e.clientY-this.offsetTop;        //鼠标点击滚动条时,鼠标距离滚动条上边沿的距离

        document.onmousemove = function (e) {
            var top = e.clientY-barY;       //鼠标移动时,bar距离可视区顶部的距离

            var scrollDis = oArea.offsetHeight-oBar.offsetHeight;       //滚动条可移动的距离
            if( top<0 ){
                top = 0;
            }
            if( top>scrollDis ){
                top = scrollDis;
            }
            oBar.style.top = top + "px";

            oContent.style.top = scrollContentDis*top/scrollDis + "px";
        };

        document.onmouseup = function () {
            document.onmouseup = document.onmousemove = null;
        };

        return false;
    }
}