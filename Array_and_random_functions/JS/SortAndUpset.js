/**
 * Created by Jimmy on 16/3/27.
 */
window.onload = function () {
    var oContent = document.getElementById("content");
    var oOrder = document.getElementById("order");
    var oRandom = document.getElementById("random");
    var aLi = oContent.getElementsByTagName("li");
    var aImg = oContent.getElementsByTagName("img");
    var aSpan = oContent.getElementsByTagName("span");
    var len = aLi.length;

    for(var i=0; i<len; i++){       //定位li
        if(i<4){
            aLi[i].style.left = 302*i + "px";
        } else {
            aLi[i].style.left = 302*(i-4) + "px";
            aLi[i].style.top = "245px";
        }
    }

    var arrLiData = [
        { url:"img/0.jpg", decoration:"120-水滴概念车"},
        { url:"img/1.jpg", decoration:"423-动漫大魔王"},
        { url:"img/2.jpg", decoration:"139-音乐与舞者"},
        { url:"img/3.jpg", decoration:"343-爆炸蘑菇云"},
        { url:"img/4.jpg", decoration:"520-运动潮牌集合"},
        { url:"img/5.jpg", decoration:"266-性感韩国女星"},
        { url:"img/6.jpg", decoration:"75-梅西进球庆祝"},
        { url:"img/7.jpg", decoration:"87-战地3"}
    ];
    var onOff = true;
    var arrRandomNum = [];      //此数组为产生随机数的数组
    var arrDecoration = [];     //此数组为arrLiData内decoration数字的排序
    var arrNowDec = [];     //此数组为当前span里decoration数字的排序

    //初始化
    for(i=0; i<len; i++){
        aImg[i].src = arrLiData[i].url;
        aSpan[i].innerHTML = arrLiData[i].decoration;
        arrNowDec.push( parseInt(arrLiData[i].decoration) );
        aLi[i].onmouseover = function () {
            this.style.opacity = "1";
        };
        aLi[i].onmouseout = function () {
            this.style.opacity = "0.6";
        }
    }
    //arrDecoration = arrRandomNum;       //此处=为引用赋值，而不是值赋值。引用赋值，在内存里指向同一区域
    arrDecoration = arrDecoration.concat(arrNowDec);
    //concat该方法不会改变现有的数组，而仅仅会返回被连接数组的一个副本，除非像上面一样进行值赋值

    oOrder.onclick = function () {
        if(onOff){
            arrNowDec.sort(function (a, b) {      //正序
                return a-b;
            });
            oOrder.innerHTML = "从大到小";
            onOff = false;
        } else {
            arrNowDec.sort(function (a, b) {        //倒序
                return b-a;
            });
            oOrder.innerHTML = "从小到大";
            onOff = true;
        }
        for(j=0; j<len; j++){
            for(var k=0; k<len; k++){
                if(arrNowDec[j]===arrDecoration[k]){
                    aImg[j].src = arrLiData[k].url;
                    aSpan[j].innerHTML = arrLiData[k].decoration;
                    break;
                }
            }
        }
    };

    oRandom.onclick = function () {
        noRepeatedRandomArray(arrRandomNum,8,0,7);
        for(var j=0; j<len; j++){
            aImg[j].src = arrLiData[arrRandomNum[j]].url;
            aSpan[j].innerHTML = arrLiData[arrRandomNum[j]].decoration;
        }
    };

}