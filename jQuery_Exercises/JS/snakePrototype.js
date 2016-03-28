/**
 * Created by Jimmy on 16/3/28.
 */
$(function () {
    var upDownOnoff = true;     //接下去是否只能进行向上或向下
    var arr = [];
    var dir = 2;        //蛇的方向,0表示向左,1表示向上,2表示向右,3表示向下,初始蛇的方向向右
    var oSnakeHead = $('li:eq(0)');

    $('li').each(function () {      //给每个li初始化位置
        $(this).css( 'left', 55*( $('li').size()-$(this).index() ));
        arr.unshift({ left:$(this).offset().left, top:$(this).offset().top});      //数组的最后是蛇头的位置
    });

    function locateLi(){
        $('li').each(function () {
            $(this).css({ left:arr[9-$(this).index()].left, top:arr[9-$(this).index()].top});
        });
    }

    setInterval(function () {
        $(document).keyup(function (e) {
            if( e.which==37 && !upDownOnoff ){
                dir = 0;
                upDownOnoff = true;
            }
            if( e.which==38 && upDownOnoff ){
                dir = 1;
                upDownOnoff = false;
            }
            if( e.which==39 && !upDownOnoff ){
                dir = 2;
                upDownOnoff = true;
            }
            if( e.which==40 && upDownOnoff ){
                dir = 3;
                upDownOnoff = false;
            }
        });

        switch(dir){        //保存最新的蛇头信息
            case 0:
                arr.push({ left:oSnakeHead.offset().left-55, top:oSnakeHead.offset().top});
                break;
            case 1:
                arr.push({ left:oSnakeHead.offset().left, top:oSnakeHead.eq(0).offset().top-55});
                break;
            case 2:
                arr.push({ left:oSnakeHead.offset().left+55, top:oSnakeHead.offset().top});
                break;
            case 3:
                arr.push({ left:oSnakeHead.offset().left, top:oSnakeHead.offset().top+55});
                break;
            default:
                arr.push({ left:oSnakeHead.offset().left+55, top:oSnakeHead.offset().top});
        }
        arr.shift();
        locateLi();
    }, 500);
});