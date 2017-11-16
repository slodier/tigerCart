$(function () {
    $('.ks-switchahle-nav li').eq(0).css({
        'color':'white',
        'background-color':'#f43e14'
    });

    searchTrigger();
    hoverEvent();
});

// 鼠标悬停
function hoverEvent() {
    $('.ks-switchahle-nav li').hover(function () {
        // $(this).siblings().css({    // 兄弟元素去除背景色,字体颜色变为橙色
        //     'color':'#f43e14',
        //     'background':'#ffffff'
        // });
        //
        // $(this).css({
        //     'color':'white',
        //     'background':'#f43e14'
        // });

        if($(this).css('background-color') != "rgb(244, 62, 20)"){
            $(this).css('background', '#FFEEE6');
        }
    }, function () {
        if($(this).css('background-color') != "rgb(244, 62, 20)"){
            $(this).css('background', '#ffffff');
        }
    });

    // 搜索框下面一排文字
    $('.search_ft li').hover(function () {
        $(this).css('color', 'red');
    }, function () {
        $(this).css('color', 'black');
    });
}

// 搜索框天猫、宝贝、店铺按钮 click
function searchTrigger() {
    $('.ks-switchahle-nav li').click(function () {
        $(this).siblings().css({    // 兄弟元素去除背景色,字体颜色变为橙色
            'color':'#f43e14',
            'background':'#ffffff'
        });

        $(this).css({
            'color':'white',
            'background':'#f43e14'
        });
    });
}

