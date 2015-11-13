/**
 * Created by Jimmy on 15/11/5.
 */
function getStyle(obj,attr){
    return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr];
}

function changeObj(obj,attr,step,target,endFn){      //*对象，*属性，*步长，*目标值，回调函数(打星的形参为必要的)
    var timer = null;
    timer = attr=="opacity" ? obj.disappearTimer : obj.changeTimer;
    clearInterval(timer);
    step = parseFloat(getStyle(obj,attr))<target ? step : -step;      //只需根据目标与当前位置值来判断step是正还是负,方便用户设置步长
    timer = setInterval(function () {
        var nowAttr = parseFloat(getStyle(obj,attr)) + step;
        if( nowAttr>target && step>0 || nowAttr<target && step<0 ) {
            nowAttr = target;
        }
        obj.style[attr] = attr=="opacity" ? nowAttr : nowAttr+"px";
        if(nowAttr==target){
            clearInterval( timer );
            endFn && endFn();
        }
    },30);
}

function shakeObj(obj,direction,location,range,endFn){      //抖动的对象、方向、初始位置、幅度和回调函数
    var arrMove = [];
    var num = 0;

    for(var i=range; i>0; i-=2){
        arrMove.push(i,-i);
    }
    arrMove.push(0);
    var len = arrMove.length;

    clearInterval( obj.shakeTimer );
    obj.shakeTimer = setInterval(function () {
        obj.style[direction] = location + arrMove[num] + 'px';
        num++;
        if( num === len ){
            clearInterval(obj.shakeTimer);
            endFn && endFn();
        }
    },30);
}