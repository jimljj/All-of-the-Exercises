/**
 * Created by Jimmy on 16/3/27.
 */
window.onload = function () {
    var oPlayback = document.getElementById("playback");
    var oCircle = document.getElementById("circle");
    var arrX = [];
    var arrY = [];
    var timer = null;

    oCircle.onmousedown = function (e) {
        var mouseX = e.clientX-this.offsetLeft;
        var mouseY = e.clientY-this.offsetTop;
        arrX.push( this.offsetLeft );
        arrY.push( this.offsetTop );

        document.onmousemove = function (e) {
            var left = e.clientX-mouseX;
            var top = e.clientY-mouseY;
            arrX.push(left);
            arrY.push(top);
            oCircle.style.left = left + "px";
            oCircle.style.top = top + "px";
        };

        document.onmouseup = function () {
            document.onmousemove = document.onmouseup = null;
        };

        return false;
    };

    oPlayback.onclick = function () {
        var len = arrX.length;
        var i = len-1;

        timer = setInterval(function () {
            oCircle.style.left = arrX[i] + "px";
            oCircle.style.top = arrY[i] + "px";
            i--;
            if( i<0 ){
                arrX.length = 0;
                arrY.length = 0;
                clearInterval( timer );
            }
        },40);
    }
}