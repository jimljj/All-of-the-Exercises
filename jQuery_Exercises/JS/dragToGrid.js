/**
 * Created by Jimmy on 16/3/28.
 */
$(function () {
    var disX = 0;
    var disY = 0;
    var divLeft = 0;
    var divTop = 0;

    for( var i=0; i<49; i++){
        $('<div>').appendTo( $('.wrap') ).css({ left:i%7*100, top:Math.floor(i/7)*100});
    }

    $('.drag').on( 'mousedown', function (e) {
        disX = e.pageX-$(this).offset().left;
        disY = e.pageY-$(this).offset().top;

        $(document).on( 'mousemove', function (e) {
            divLeft = e.pageX-disX;
            divTop = e.pageY-disY;
            $('.drag').css({ left: divLeft, top: divTop});
        });

        $(document).on( 'mouseup', function () {
            if( divLeft%100<=50 ){
                divLeft = Math.floor(divLeft/100)*100+1;
            } else {
                divLeft = Math.ceil(divLeft/100)*100+1;
            }

            if( divTop%100<=50 ){
                divTop = Math.floor(divTop/100)*100+1;
            } else {
                divTop = Math.ceil(divTop/100)*100+1;
            }

            $('.drag').css({ left: divLeft, top: divTop});

            $(document).off();
        });

        return false;
    });
});