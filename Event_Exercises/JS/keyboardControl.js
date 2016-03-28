/**
 * Created by Jimmy on 16/3/28.
 */
window.onload = function () {
    var oBox = document.getElementById("box");
    var onOff = true;
    var timer = null;

    document.onkeydown = function (e) {
        if(onOff){
            timer = setInterval(function () {
                switch (e.keyCode){
                    case 37:
                        oBox.style.left = oBox.offsetLeft-20 + "px";        //此offsetLeft值是oBox到html得距离
                        break;
                    case 38:
                        oBox.style.top = oBox.offsetTop-20 + "px";
                        break;
                    case 39:
                        oBox.style.left = oBox.offsetLeft+20 + "px";
                        break;
                    case 40:
                        oBox.style.top = oBox.offsetTop+20 + "px";
                        break;
                }
            },30);
            onOff = false;
        }
    };

    document.onkeyup = function () {
        if(!onOff){
            clearInterval(timer);
            onOff = true;
        }
    }
}