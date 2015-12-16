/**
 * Created by Jimmy on 15/12/11.
 */
window.onload = function () {
//            alert(document.body.offsetWidth);   //宽:1280
//            alert(document.documentElement.clientHeight);   //高:705

    //关键字提示区
    var oContent = document.getElementById("content");
    for(var i=0; i<oContent.children.length; i++){
        oContent.children[i].onmouseover = function () {
            var oSpan = document.createElement("span");
            oSpan.innerHTML = this.title;       //将a标签自带提示内容赋予自制的提示框内
            this.title = "";        //将a标签自带的超链接提示清空
            oSpan.style.left = window.event.clientX-240 + "px";     //鼠标的当前距离整个文档的左边距离-oContent在文档中的左边距离(240)
            oSpan.style.top = window.event.clientY-120 + "px";     //鼠标的当前距离整个文档的顶部距离-oContent在文档中的顶部距离(85)-行高偏移量(35)
            /*oSpan.style.left = window.event.offsetX + "px";     //鼠标的距离该元素定位父级的左边距离
             oSpan.style.top = window.event.offsetY-24 + "px";     //鼠标的距离该元素定位父级的顶部距离-行高    此种方法用户体验不好*/
            oContent.appendChild(oSpan);        //将自制提示框作为oContent的子元素
        };

        oContent.children[i].onmousemove = function () {        //让自制提示框跟随鼠标的移动而移动
            var oSpan = oContent.getElementsByTagName("span")[0];
            oSpan.style.left = window.event.clientX-240 + "px";
            oSpan.style.top = window.event.clientY-120 + "px";
        };

        oContent.children[i].onmouseout = function () {
            var oSpan = oContent.getElementsByTagName("span")[0];
            this.title = oSpan.innerHTML;       //将自制提示框的内容归还给a标签的自带提示title
            oContent.removeChild(oSpan);        //在oContent中去除子元素oSpan
        }
    }


    //选择筛选区
    var oSelectContent = document.getElementById("selectContent");
    var aDl = oSelectContent.getElementsByTagName("dl");
    var dlLen = aDl.length;
    var aDd = oSelectContent.getElementsByTagName("dd");
    var ddLen = aDd.length;
    var oDemand = document.getElementById("demand");

    for(var i=0; i<dlLen; i++){
        aDl[i].index = i;
    }

    for( i=0; i<ddLen; i++){
        aDd[i].onclick = function () {
//                    this.parentNode.index
            var aDiv = oDemand.getElementsByTagName("div");
            var divLen = aDiv.length;
            var onOff = false;       //控制是否已经产生了该选择类目,默认不存在
            var greaterNum = 0;     //显示有几个
            for(var j=0; j<divLen; j++){
                if(aDiv[j].index == this.parentNode.index){     //如果已经存在该选项的选择类目div
                    aDiv[j].innerHTML = this.innerHTML;
                    onOff = true;       //表示该选项的选择类目div存在
                    break;
                }
            }

            if(!onOff){       //表示该选项的选择类目div不存在
                var oDiv = document.createElement("div");
                oDiv.innerHTML = this.innerHTML;
                oDiv.index = this.parentNode.index;

                for(j=0; j<divLen; j++){
                    oDiv.index>aDiv[j].index ? greaterNum++ : greaterNum--;
                }

                if(greaterNum > 0){
                    oDemand.appendChild(oDiv);
                } else if(greaterNum == 0){
                    if(aDiv[1]){        //是否已经存在两个选择类目
                        oDemand.insertBefore(oDiv,aDiv[1]);
                    } else {        //现在一个选择类目都不存在
                        oDemand.appendChild(oDiv);      //兼容IE
                    }
                } else {
                    oDemand.insertBefore(oDiv,aDiv[0]);
                }
            }
        }
    }


    //固定广告区
    var oAdsLeft = document.getElementById("adsLeft");
    var oAdsRight = document.getElementById("adsRight");
    var leftTop = parseInt(getComputedStyle(oAdsLeft).top);

    //回到顶部功能
    var returnTopSwitch = true;
    window.onscroll = function () {
        //固定广告区,此方法效果没有position: fixed效果好
        oAdsLeft.style.top = leftTop + document.body.scrollTop + "px";
        oAdsRight.style.top = leftTop + document.body.scrollTop + "px";

        //回到顶部功能
        if(document.body.scrollTop>0 && returnTopSwitch){
            var oReturnTop = document.createElement("div");
            oReturnTop.classList.add("returnTop");
            oReturnTop.innerHTML = "回到顶部";
            oReturnTop.onclick = function () {
                document.body.scrollTop = 0;        //将页面置回顶部
            };
            document.body.appendChild(oReturnTop);
            returnTopSwitch = false;
        }
        if(document.body.scrollTop==0 && !returnTopSwitch){
            var oRemove = document.querySelector(".returnTop");
            document.body.removeChild(oRemove);
            returnTopSwitch = true;
        }
    };

};