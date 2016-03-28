/**
 * Created by Jimmy on 16/3/28.
 */
$(function () {
    $(".up").click(function () {
        $(this).parent().after( $(this).parent().prev() );
    });

    $(".down").click(function () {
        $(this).parent().before( $(this).parent().next() );
    });
});