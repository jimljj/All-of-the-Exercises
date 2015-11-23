/**
 * Created by Jimmy on 15/11/5.
 */
function getStyle(obj,attr){        //获取对象*的当前属性*
    return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr];
}

function changeObj(obj,attr,step,target,endFn){      //改变的对象*，属性*，步长*，目标值*，回调函数(打星的形参为必要的)
    var timer = null;
    timer = attr=="opacity" ? obj.disappearTimer : obj.changeTimer;

    step = parseFloat(getStyle(obj,attr))<target ? step : -step;      //只需根据目标与当前位置值来判断step是正还是负,方便用户设置步长
    clearInterval(timer);
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
    },15);
}

function shakeObj(obj,direction,location,range,endFn){      //抖动的对象*，方向*，当前位置*，幅度*，回调函数(打星的形参为必要的，在外面获取当前位置是为了防止还没抖完就重新调用本函数，使初始位置发生偏离)
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
        if( num > len ){
            clearInterval(obj.shakeTimer);
            endFn && endFn();
        }
    },30);
}

function countDown(futureTimePoint,countDownObj,endFn){     //未来的时间点*，在哪个元素*上进行倒计时，回调函数(打星的形参为必要的)
    var futureTime = new Date(futureTimePoint);
    clearInterval(countDownObj.countDownTimer);
    countDownObj.countDownTimer = setInterval(function () {
        var nowTime = new Date();
        var period = Math.floor( (futureTime-nowTime)/1000 );
        if(period>=0){
            var str = "剩余" + changeFormat(Math.floor(period/86400)) + "天" + changeFormat(Math.floor(period%86400/3600)) + "时" + changeFormat(Math.floor(period%86400%3600/60)) + "分" + changeFormat(period%60) + "秒";
            countDownObj.innerHTML = str;
        } else {
            clearInterval( countDownObj.countDownTimer );
            endFn && endFn();
        }
    },1000);
}

function changeFormat(num){     //将单位数字*改成双位字符串
    return num<10 ? "0"+num : ""+num;
}