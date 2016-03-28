/**
 * Created by Jimmy on 16/3/28.
 */
window.onload = function () {
    var oEdit = document.getElementById("messageEdit");
    var oConfirm = document.getElementById("confirm");
    var oDelete = document.getElementById("delete");
    var oBoard = document.getElementById("messageBoard");
    var i = 0;      //i表示当前要留言的是第几条

    oConfirm.onclick = function () {
        var oLi = document.createElement("li");

        oLi.innerHTML = oEdit.value;
        oLi.onOff = false;
        oEdit.value = "";

        if(oBoard.children[0]){     //兼容IE
            oBoard.insertBefore(oLi,oBoard.children[0]);
        } else {
            oBoard.appendChild(oLi);
        }
        i++;

        if(i==6){       //保证留言只有5条，删除最末尾的那一条
            oBoard.removeChild(oBoard.children[5]);
            i=5;
        }

        oLi.onclick = function () {
            if(this.onOff){     //该条已经被选中了
                this.classList.remove("active");
                this.onOff = false;
            } else {        //该条还未被选中
                this.classList.add("active");
                this.onOff = true;
            }
        }
    };

    oDelete.onclick = function () {
        var aDeleteLi = oBoard.querySelectorAll(".active");
        var len = aDeleteLi.length;

        if(len==0){
            alert("对不起，您未选择任何要删除的留言，我无法为您做批量删除的服务。");
        } else {
            for(var j=0; j<len; j++){
                oBoard.removeChild(aDeleteLi[j]);       //删除这些选中的li
            }
            i-=len;
        }
    }
}