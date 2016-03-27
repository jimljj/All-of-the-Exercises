/**
 * Created by Jimmy on 16/3/27.
 */
window.onload = function () {
    var oSwitch = document.getElementById("switch");
    var oGameArea = document.getElementById("gameArea");
    var oExpression = document.getElementById("expression");
    var oLoseScore = document.getElementById("loseScore");
    var oGetScore = document.getElementById("getScore");

    var gameAreaTop = parseInt( getStyle(oGameArea,"top") );        //表示最初的游戏区域top值
    var location = 0;       //表示oExpression的表情当下的left值
    var step = 3;       //速度，这里用步长是为了契合changeObj这个函数
    var expressionTop = 0;      //当下表情的top值
    var onOff = true;       //保持表情只能被点击一次
    var arrText = ["乌龟","步行","跑步","自行车","摩托车","轿车","飞机","光"];

    function restart(){
        onOff = true;
        location = Math.round( Math.random()*840+30 );      //随机产生一个位置
        oExpression.src = "img/" + Math.round( Math.random()*7+10 ) + ".jpg";
        oExpression.style.left = location + "px";

        oExpression.Timer = setInterval(function () {
            expressionTop = parseFloat(getStyle(oExpression,"top")) + step;     //接近当下的表情top值
            if(expressionTop>460){
                expressionTop = 460;
            }
            oExpression.style.top = expressionTop + "px";
            if(expressionTop==460){
                clearInterval( oExpression.Timer );
                oLoseScore.innerHTML++;

                if( Number(oLoseScore.innerHTML)<10 ){
                    shakeObj(oGameArea,"top",gameAreaTop,20, function () {
                        changeObj(oExpression,"top",500,-40, function () {
                            restart();
                        });
                    });
                } else {
                    alert( "普通人能达到自行车的速度，而您的极限手速达到了【" + arrText[parseInt(step/4)] + "】的速度!" );
                    oSwitch.value = "开始游戏";
                    oSwitch.disabled = "";
                    oLoseScore.innerHTML = "0";
                    oGetScore.innerHTML = "0";
                    step = 2;
                    changeObj(oExpression,"top",500,-40);
                }
            }
        },30);
    }

    oSwitch.onclick = function () {
        this.value = "游戏正在进行中……";
        this.disabled = "disabled";
        restart();
    };

    oExpression.onclick = function () {
        if(onOff){
            this.src = "img/9.jpg";
            onOff = false;
            clearInterval( oExpression.Timer );
            shakeObj(this,"left",location,10, function () {
                changeObj(oExpression,"top",500,-40, function () {
                    restart();
                });
            });
            step+=3;
            oGetScore.innerHTML++;
        }
    }

}