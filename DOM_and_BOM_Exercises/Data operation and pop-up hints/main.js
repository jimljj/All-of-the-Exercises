/**
 * Created by Jimmy on 15/12/14.
 */
window.onload = function () {
    var clientHeight = document.documentElement.clientHeight;       //705
    var oHeader = document.getElementById("header");
    var oListContentUl = document.querySelector("#listContent .list");
    var oTips = document.getElementById("tips");
    var oArrow = document.getElementById("arrow");
    var oTipsContent = document.getElementById("tipsContent");
    var dataLen = data.length;      //data下共有几大类职业
    var arrItems = ["职位:  ","招聘人数: ","工作地点: ","工作经历: ","学历: ","薪资: "];
    var arrAttrNames = ['position','recruitingNumbers','workingLocation','workExperience','education','wage'];

    for(var i=0; i<dataLen; i++){
        var oHeaderLi = document.createElement("li");
        oHeaderLi.innerHTML = data[i].name;
        oHeaderLi.index = i;
        oHeader.appendChild(oHeaderLi);     //现将职业栏的li添加进职业栏内

        oHeaderLi.onclick = function () {
            for(var j=0; j<dataLen; j++){
                oHeader.children[j].classList.remove("focus");
            }
            this.classList.add("focus");
            oListContentUl.innerHTML = "";

            displayList(this.index);
        }
    }

    //初始化
    oHeader.children[0].classList.add("focus");
    displayList(0);

    function displayList(num){      //显示该职业的职位的列表,并且给列表中的每一项设置动作
        var arrList = data[num].list;
        var listLen = arrList.length;       //该职业有几个职位
        for(j=0; j<listLen; j++){
            var listContentLi = document.createElement("li");

            var oLiA = document.createElement("a");     //添加职位
            oLiA.innerHTML = arrList[j].title;
            oLiA.index = j;
            oLiA.onmouseover = function () {
                oTips.style.display = "block";
                oTips.style.left = window.event.clientX+90 + "px";
                if(window.event.clientY-126+215 > clientHeight){        //当前tips的下边框位置是否超过可视区高度
                    oTips.style.top = clientHeight-215 + "px";      //若超过可视区高度,则将tips固定在可视区最底部
                    oArrow.style.top = 120+(window.event.clientY-126)-(clientHeight-215) + "px";        //若超过可视区的高度,那arrow.png的top值随鼠标移动多少就移动多少,具体为120+鼠标移动量
                } else {
                    oTips.style.top = window.event.clientY-126 + "px";
                }

                oTipsContent.innerHTML = "";        //每次触发方法先把弹出层清空
                var oTitleSpan = document.createElement("span");        //先添加进公司的名称
                oTitleSpan.innerHTML = arrList[this.index].company;
                oTitleSpan.classList.add("title");
                oTipsContent.appendChild(oTitleSpan);

                var oUl = document.createElement("ul");

                var oLi = null;
                for(var k=0; k<6; k++){
                    oLi = document.createElement("li");
                    oLi.innerHTML = arrItems[k] + arrList[this.index][arrAttrNames[k]];
                    oLi.classList.add("col");
                    oUl.appendChild(oLi);
                }

                oTipsContent.appendChild(oUl);
            };
            oLiA.onmousemove = function () {
                oTips.style.left = window.event.clientX+90 + "px";
                if(window.event.clientY-126+215 > clientHeight){
                    oTips.style.top = clientHeight-215 + "px";
                    oArrow.style.top = 120+(window.event.clientY-126)-(clientHeight-215) + "px";
                } else {
                    oTips.style.top = window.event.clientY-126 + "px";
                }
            };
            oLiA.onmouseout = function () {
                oTips.style.display = "none";
            };
            listContentLi.appendChild(oLiA);

            var oLiSpan = document.createElement("span");       //添加该职位产生的时间
            oLiSpan.innerHTML = arrList[j].addDate;
            oLiSpan.classList.add("date");
            listContentLi.appendChild(oLiSpan);

            oListContentUl.appendChild(listContentLi);      //最后li添加进ul
        }
    }

}