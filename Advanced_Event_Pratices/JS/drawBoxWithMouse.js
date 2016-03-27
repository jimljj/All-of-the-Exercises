/**
 * Created by Jimmy on 16/3/27.
 */
window.onload = function () {
    var oWrap = document.getElementById("wrap");
    var R = oWrap.offsetLeft+oWrap.offsetWidth-12;      //12 = oWrap的边框和 + oDiv的边框和
    var B = oWrap.offsetTop+oWrap.offsetHeight-12;

    oWrap.onmousedown = function (e) {
        var mouseX = e.clientX;
        var mouseY = e.clientY;
        var oDiv = document.createElement("div");
        oDiv.style.left = e.clientX-oWrap.offsetLeft + "px";
        oDiv.style.top = e.clientY-oWrap.offsetTop + "px";
        oWrap.appendChild(oDiv);

        document.onmousemove = function (e) {
            var nowMouseX = e.clientX;
            var nowMouseY = e.clientY;
            if( nowMouseX > R ){
                nowMouseX = R;
            }
            if( nowMouseY > B ){
                nowMouseY = B;
            }
            oDiv.style.width = nowMouseX-mouseX + "px";
            oDiv.style.height = nowMouseY-mouseY + "px";
        };

        document.onmouseup = function () {
            document.onmousemove = document.onmouseup = null;
        };

        return false;
    }
}