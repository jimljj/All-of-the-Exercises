/**
 * Created by Jimmy on 16/3/28.
 */
$(function () {
    var oRed = $('.red');
    var oGreen = $('.green');
    var oBlue = $('.blue');
    var oYellow = $('.yellow');
    var oPink = $('.pink');

    oRed.on( 'mouseover', function () {
        oGreen.animate({ left:'700'});
        oBlue.animate({ left:'760'});
        oYellow.animate({ left:'820'});
        oPink.animate({ left:'880'});
    });

    oGreen.on( 'mouseover', function () {
        if( $(this).css('left') == '60px' ){
            oBlue.animate({ left:'760'});
            oYellow.animate({ left:'820'});
            oPink.animate({ left:'880'});
        } else {
            oGreen.animate({ left:'60'});
        }
    });

    oBlue.on( 'mouseover', function () {
        if( $(this).css('left') == '120px' ){
            oYellow.animate({ left:'820'});
            oPink.animate({ left:'880'});
        } else {
            oGreen.animate({ left:'60'});
            oBlue.animate({ left:'120'});
        }
    });

    oYellow.on( 'mouseover', function () {
        if( $(this).css('left') == '180px' ){
            oPink.animate({ left:'880'});
        } else {
            oGreen.animate({ left:'60'});
            oBlue.animate({ left:'120'});
            oYellow.animate({ left:'180'});
        }
    });

    oPink.on( 'mouseover', function () {
        oGreen.animate({ left:'60'});
        oBlue.animate({ left:'120'});
        oYellow.animate({ left:'180'});
        oPink.animate({ left:'240'});
    });
})