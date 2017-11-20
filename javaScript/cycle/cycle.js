// 构建 UI, 根据传入的图片数组,创建相应的元素
function ccCycle(imgArr, selector) {
    var slide = "<div class='slide_show'>" +
        "<ul>" +
        "</ul>" +
        "<div class='slide_nav'></div>" +
        "</div>";
    $(selector).append(slide);

    // 创建相应的 li > img 元素
    for (var i = 0; i < imgArr.length; i++){
        var li = "<li><img src=" + imgArr[i] +"></li>"
        $('.slide_show ul').append(li);

        // 根据图片数量创建相应个数的按钮
        if (i < 5){
            var btn = "<span>" + (i + 1) + "</span>";
            $('.slide_nav').append(btn);
        }
    }

    $('.slide_nav span').eq(0).addClass('active');      // 默认第一个按钮为点击状态

    setTimeout(cycle(imgArr.length), 3000);     // 延迟两秒开始轮播,防止图片未加载完成
}

// 循环
function cycle(imgLength) {
    $slide_show = $('.slide_show');
    $ul = $slide_show.find('ul');    // 获得 ul 元素
    var pic_width = $ul.find('li').eq(0).width();    // 获取每个图片的宽度
    $ul.css('width', pic_width *imgLength);    // 图片数量 *每个图片宽度 = 总宽度

    var $show_btns = $('.slide_nav span');    // 获取按钮
    $show_btns.click(function () {    // 为每个按钮绑定点击事件
        $(this).addClass('active').siblings().removeClass('active');    // 给点击的按钮添加高亮,移除其他按钮的高亮
        var index = $(this).index();    // 获取被点击按钮的索引值
        iNow = index;    // 将当前索引值等于按钮索引值
        $ul.animate({
            'left':-pic_width *iNow    // 让 ul 左移 N 个图片的宽度
        });
    });

    firstTimer();

    // 第一个轮播图的定时器
    function firstTimer() {
        var timer = null;
        iNow = 0;

        // 创建定时器
        timer = setInterval(function () {
            iNow++;
            if (iNow == 5){
                $($show_btns).eq(0).addClass('active').siblings().removeClass('active');    // 将表示当前页为第一页
            }
            if (iNow > 5){
                iNow = 0;   // 将置为 0
                window.clearInterval(timer);    // 清除定时器
                $ul.css('left', '0px');    // 将 ul 回到第一张图片
                firstTimer();   // 重启定时器
            }else {
                $ul.animate({
                    'left':-pic_width *iNow    // 让 ul 左移 N 个图片的宽度
                });
                $($show_btns).eq(iNow).addClass('active').siblings().removeClass('active');     // 添加当前页码的背景色
            }
        }, 3000);
    };
}

// 第二种轮播图
function secondCycle() {
    $tmall_cycle = $('.tmall_cycle');
    var pic_width = $tmall_cycle.find('div').eq(0).width();    // 获取每组图片的宽度

    var iNow = 0;    // iNow 为正在展示的图片索引值,初始值为 0

    secondTimer();

    // 第二个动画定时器
    function secondTimer() {
        var timer = null;
        iNow = 0;
        timer = setInterval(function () {
            iNow++;
            if (iNow > 6){
                iNow = 0;
                window.clearInterval(timer);    // 清除定时器
                $tmall_cycle.css('left', '0px');    // ul 元素 left 置位 0
                secondTimer();    // 重新开启定时器
                floatBlack(iNow);
                $('#second_cycle_page').text(iNow + 1);
            }else{
                $tmall_cycle.animate({
                    'left':-pic_width *iNow    // 让 ul 左移 N 个图片的宽度
                });
                floatBlack(iNow);

                if (iNow == 6){
                    $('#second_cycle_page').text(1);    // 如果滚动到最后的第一张图片,修改页码和浮动黑条
                    floatBlack(0);
                }else {
                    $('#second_cycle_page').text(iNow + 1);
                }
            }
        }, 1000);
    }
}

// 浮动黑线
function floatBlack(index) {
    $('.tmall_floater').animate({
        'left':index *86.6
    });
}
