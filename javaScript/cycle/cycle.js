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
        var btn = "<span>" + (i + 1) + "</span>";
        if (i + 1 == 1)
            $(btn).addClass('active');
        $('.slide_nav').append(btn);
    }
    cycle(imgArr.length);
}

// 循环
function cycle(imgLength) {
    $slide_show = $('.slide_show');
    $ul = $slide_show.find('ul');    // 获得 ul 元素
    var pic_width = $slide_show.find('ul li').eq(0).width();    // 获取每个图片的宽度
    $ul.css('width', pic_width *imgLength);    // 图片数量 *每个图片宽度 = 总宽度

    var timer = null;    // 定时器
    var iNow = 0;    // iNow 为正在展示的图片索引值,初始值为 0

    var $show_btns = $('.slide_nav span');    // 获取按钮

    $show_btns.click(function () {    // 为每个按钮绑定点击事件
        $(this).addClass('active').siblings().removeClass('active');    // 给点击的按钮添加高亮,移除其他按钮的高亮
        var index = $(this).index();    // 获取被点击按钮的索引值
        iNow = index;    // 将当前索引值等于按钮索引值
        $ul.animate({
            'left':-pic_width *iNow    // 让 ul 左移 N 个图片的宽度
        });
    });

    // 创建定时器
    timer = setInterval(function () {
        iNow++;
        if (iNow > $show_btns.length - 1){     // 到达最后一张图片时,回到第一张
            iNow = 0;
        }
        $show_btns.eq(iNow).trigger('click');      // 触发数字按钮的 click 事件
    }, 3000);
}
