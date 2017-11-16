$(function () {
    $('.btn-switch-cart').hover(function () {
        var dist = null;
        if(this.id == 'current-0'){
            dist = '0%';
        }else if (this.id == 'current-1'){
            dist = '11%';
            $(this).css('cursor', 'not-allowed');
        }else  if(this.id == 'current-2'){
            dist = '22%';
            $(this).css('cursor', 'not-allowed');
        }

        // 鼠标移动到选项卡,并停止正在执行的动画
        $('.floater').stop().animate({
            left:dist
        },200);
    },function () {
        // 鼠标移出选项卡
        $('.floater').animate({
            left:'0px'
        },200);
    });

    $('#small-submit').css('disabled', 'disabled');
});