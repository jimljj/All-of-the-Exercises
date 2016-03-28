/**
 * Created by Jimmy on 16/3/28.
 */
$(function () {
    var disX = 0;
    var disY = 0;
    var multiple = -750/200;

    $('.pic').on( 'mousemove', function (e) {
        disX = e.pageX-$(this).offset().left-50;
        disY = e.pageY-$(this).offset().top-50;

        if( disX<0 ){
            disX = 0;
        } else if( disX>100 ){
            disX = 100;
        }

        if( disY<0 ){
            disY = 0;
        } else if( disY>100 ){
            disY = 100;
        }

        $('.shade').css({ left:disX, top:disY});

        $('.wrap').css( 'display', 'block');

        $('.magnifier').css({ left:multiple*disX, top:multiple*disY});

    }).on( 'mouseout', function () {

        $('.wrap').css( 'display', 'none');

    })
})