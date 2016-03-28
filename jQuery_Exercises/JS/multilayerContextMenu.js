/**
 * Created by Jimmy on 16/3/28.
 */
$.fn.extend({
    displayList : function (left,top,data){
        $(this).css({ 'display':'block', 'left':left+'px', 'top':top+'px'});
        var len = data.length;
        var html = '';
        for( var i=0; i<len; i++){
            html += "<li>"+ data[i].name +"</li>";
        }
        $(this).html( html );
        var aLi = $(this).get(0).getElementsByTagName('li');
        for( i=0; i<len; i++){
            aLi[i].subLevel = data[i].subLevel;
        }
    }
});
$(function () {
    var data = {
        first : [
            { name:'新建1', subLevel:''},
            { name:'新建2 ->', subLevel:'second1'},
            { name:'新建3', subLevel:''},
            { name:'新建4 ->', subLevel:'second2'}
        ],
        second1 : [
            { name:'新建2-1', subLevel:''},
            { name:'新建2-2', subLevel:''},
            { name:'新建2-3 ->', subLevel:'third'}
        ],
        second2 : [
            { name:'新建4-1', subLevel:''},
            { name:'新建4-2', subLevel:''},
            { name:'新建4-3', subLevel:''}
        ],
        third : [
            { name:'新建2-3-1', subLevel:''},
            { name:'新建2-3-2', subLevel:''},
            { name:'新建2-3-3', subLevel:''}
        ]
    };

    $(document).on( 'click', function () {
        $('.firstLevel,.sublayer,.thirdLayer').css( 'display', 'none');
    });

    $(document).on( 'contextmenu', function (e) {
        var disX = e.pageX;
        var disY = e.pageY;

        $('.firstLevel').displayList( disX, disY, data.first);
        $('.firstLevel li').on( 'mouseover', function () {
            $('.firstLevel li').removeClass('active');
            $(this).addClass('active');

            if( this.subLevel !== '' ){
                var distanceY = disY+5+32*$(this).index();
                $('.sublayer').displayList( disX+180, distanceY, data[this.subLevel]);
                $('.sublayer li').on( 'mouseover', function () {
                    $('.sublayer li').removeClass('active');
                    $(this).addClass('active');

                    if( this.subLevel !== '' ){
                        $('.thirdLayer').displayList( disX+360, distanceY+5+32*$(this).index(), data[this.subLevel]);
                        $('.thirdLayer li').on( 'mouseover', function () {
                            $('.thirdLayer li').removeClass('active');
                            $(this).addClass('active');
                        })
                    } else {
                        $('.thirdLayer').html('');
                    }
                })
            } else {
                $('.sublayer').html('');
            }
        });

        return false;
    });
});