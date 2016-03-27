/**
 * Created by Jimmy on 16/3/27.
 */
window.onload = function () {
    var aAdBlock = document.querySelectorAll("ul.adBlock");
    var blockLen = aAdBlock.length;
    var blockHtmlStr = "";
    var aAdLeft = document.querySelectorAll(".adBlockLeft");
    var leftLen = aAdLeft.length;
    var aAdRight = document.querySelectorAll(".adBlockRight");

    var arrData = [
        { len:"3", url:["img/0.jpg","img/1.jpg","img/2.jpg"]},
        { len:"2", url:["img/3.jpg","img/4.jpg"]},
        { len:"2", url:["img/5.jpg","img/6.jpg"]},
        { len:"2", url:["img/7.jpg","img/8.jpg"]}
    ];
    var randomNum = 0;      //产生0~4以内的随机数，控制这一秒几个广告位移动
    var arrRandom = [];     //产生randomNum个不重复0~4以内的随机数，控制这一秒那些广告位移动

    for(var i=0; i<leftLen; i++){       //定位左边的广告位
        aAdLeft[i].style.left = "11px";
        aAdLeft[i].style.top = 106*i+5 + "px";
    }

    for( i=0; i<leftLen; i++){     //定位右边的广告位
        aAdRight[i].style.right = "11px";
        aAdRight[i].style.top = 106*i+5 + "px";
    }

    for( i=0; i<blockLen; i++){     //将内容赋予各个广告位
        aAdBlock[i].index = 0;      //表明这是这个广告位的第几只广告
        blockHtmlStr = "";
        for(var j=0; j<arrData[i].len; j++){
            blockHtmlStr += "<li><img src='" + arrData[i].url[j] + "'/></li>"
        }
        aAdBlock[i].innerHTML = blockHtmlStr;
    }

    setInterval(function () {
        randomNum = Math.round(Math.random()*4);
        arrRandom = [];
        arrRandom = noRepeatedRandomArray(arrRandom,randomNum,0,3);
        for(var i=0; i<arrRandom.length; i++){
            changeObj(aAdBlock[arrRandom[i]],"top",15,-100*aAdBlock[arrRandom[i]].index);
            //将arrRandom[i]号广告位，移到-100*aAdBlock[arrRandom[i]].index的位置
            aAdBlock[arrRandom[i]].index++;
            if(aAdBlock[arrRandom[i]].index==arrData[arrRandom[i]].len){
                aAdBlock[arrRandom[i]].index = 0;
                //如果广告位已移到最后了，那么返回该广告位的第一张广告
            }
        }
    },1000);

}