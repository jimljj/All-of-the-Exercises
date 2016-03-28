/**
 * Created by Jimmy on 16/3/28.
 */
window.onload = function () {
    var oDisplay = document.getElementById("display");
    var oSelect = document.getElementById("select");
    var aLi = oSelect.getElementsByTagName("li");
    var liLen = aLi.length;
    var arrSelected = [];
    var selectLen = 0;

    oDisplay.onclick = function (e) {
        oSelect.style.display = "block";
        e.cancelBubble = true;      //阻止冒泡
    };

    document.onclick = function () {
        oSelect.style.display = "none";
    };

    for(var i=0; i<liLen; i++){
        aLi[i].onOff = false;        //表示当前项还未选中

        aLi[i].onmouseover = function () {
            this.classList.add("active");
        };

        aLi[i].onmouseout = function () {
            if( !this.onOff ){        //若当前项未被选中
                this.classList.remove("active");
            }
        };

        aLi[i].onclick = function (e) {
            if( this.onOff ){       //该项已经被选中
                this.classList.remove("active");
                arrSelected = oDisplay.innerHTML.split(" ");        //以空格将现有选项分开,并存入数组中
                selectLen = arrSelected.length;
                for( j=0; j<selectLen; j++){        //删除此选项
                    if( arrSelected[j] == this.innerHTML ){
                        arrSelected.splice( j, 1);
                        break;
                    }
                }
                oDisplay.innerHTML = arrSelected.join(" ");
                if( selectLen > 2 ){        //当现有选项不止一个时,阻止冒泡
                    e.cancelBubble = true;
                }
            } else {        //该选项还未被选中
                if( e.ctrlKey || e.shiftKey ){      //多选
                    this.classList.add("active");
                    oDisplay.innerHTML += this.innerHTML + " ";
                    e.cancelBubble = true;
                } else {        //单选
                    for( var j=0; j<liLen; j++){
                        aLi[j].classList.remove("active");
                        aLi[j].onOff = false;
                    }
                    this.classList.add("active");
                    oDisplay.innerHTML = this.innerHTML + " ";
                }
            }
            this.onOff = !this.onOff;
        }
    }
}