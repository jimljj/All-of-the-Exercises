/**
 * Created by Jimmy on 16/3/27.
 */
window.onload = function () {
        var oUl = document.getElementById("ul1");
        var aLi = oUl.getElementsByTagName("li");
        var liLen = aLi.length;
        var iPage = 1;
        var onOff = true;       //控制最新的数据只加载一次,因为onscroll是连续触发的,很可能新数据还没加载完全时,又触发了一次

        //初始化数据处理
        getList(iPage);

        document.onscroll = function () {
            var _index = getShortLi();
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

            if( getTop(aLi[_index])+aLi[_index].offsetHeight < scrollTop+document.documentElement.clientHeight && onOff ){
                onOff = false;
                getList(++iPage);
            }
        };

        function getList(pageNum){
            ajax( "get", "getPics.php", "cpage="+pageNum, function (data) {
                var returnData = JSON.parse(data);
                var dataLen = returnData.length;

                if( !dataLen ){
                    return;
                }

                for( var i=0; i<dataLen; i++){
                    var oDiv = document.createElement("div");

                    var oImg = document.createElement("img");
                    oImg.style.height = returnData[i].height*225/returnData[i].width + "px";
                    oImg.src = returnData[i].image;
                    oDiv.appendChild(oImg);

                    var oP = document.createElement("p");
                    oP.innerHTML = returnData[i].title;
                    oDiv.appendChild(oP);

                    //获取高度最短的li
                    var _index = getShortLi();
                    aLi[_index].appendChild(oDiv);
                }

                onOff = true;
            });
        }

        function getTop(obj){
            var top = 0;
            while (obj){
                top += obj.offsetTop;
                obj = obj.offsetParent;
            }
            return top;
        }

        function getShortLi(){
            var index = 0;
            var minHeight = aLi[index].offsetHeight;

            for( var i=0; i<liLen; i++){
                if( aLi[i].offsetHeight<minHeight ){
                    index = i;
                    minHeight = aLi[i].offsetHeight;
                }
            }

            return index;
        }
}