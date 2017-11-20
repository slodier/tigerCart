$(function () {
    picCycle();
    secondCycle();
    // 左侧 li 鼠标悬停,改变背景色和字体颜色,显示详情
    $('.service-bd li').hover(function () {
        $(this).css('background-color', '#FFE4DD');
        $(this).find('span').css('color', '#FF714D');

        // 获取当前鼠标悬停的文字数组
        var titles = $(this).find('span').text();
        var titleArr = titles.split('/');
        layoutDetail(titleArr);

    },function () {     // 鼠标移出
        $(this).css('background-color', '#ffffff');
        $(this).find('span').css('color', '#000000');
    });

    $('.main').hover(function () {

    }, function () {    // 鼠标移出,移除详细界面
        $('.tbh_service_detail').remove();
    });

    // 添加下划线
    $('.service-bd li span').hover(function () {
        $(this).css('text-decoration', 'underline');
    },function () {
        $(this).css('text-decoration', 'none');
    });


    headline();

    noticeClick();

    conveHover();

    appsHover();
});


// 轮播图
function picCycle() {
    var imgArr = [
        './public/res/cycle/first/main-cycle-1.jpg',
        './public/res/cycle/first/main-cycle-2.jpg',
        './public/res/cycle/first/main-cycle-3.jpg',
        './public/res/cycle/first/main-cycle-4.png',
        './public/res/cycle/first/main-cycle-5.jpg',
        './public/res/cycle/first/main-cycle-1.jpg'
    ];

    // var imgArr = [
    //     'http://ovn16zwm8.bkt.clouddn.com/main-cycle-1.jpg',
    //     'http://ovn16zwm8.bkt.clouddn.com/main-cycle-2.jpg',
    //     'http://ovn16zwm8.bkt.clouddn.com/main-cycle-3.jpg',
    //     'http://ovn16zwm8.bkt.clouddn.com/main-cycle-4.png',
    //     'http://ovn16zwm8.bkt.clouddn.com/main-cycle-5.jpg'
    // ];

    ccCycle(imgArr, '.J_promo');
}

// 上下滚动,淘宝头条
function headline() {

    var index = 0;

    // 创建定时器
    var timer = null;
    timer = setInterval(function () {
        index++;
        if (index > 2){
            index = 0;
        }
        // 向上移动动画
        $('.headline_bd').find('div').eq(0).animate({
            'top':73 *index
        });

    }, 5000);
}

// 公告、规则、论坛、安全、公益 点击事件
function noticeClick() {
    $('.notice_hd li').click(function () {
        $(this).addClass('selected').siblings().removeClass('selected');
        $(this).removeClass('J_enter');
    })
}

// 充话费等等 鼠标悬停
function conveHover() {
    $('.conve_mod').hover(function () {
       $(this).find('p').css('color', 'red');
    }, function () {
        $(this).find('p').css('color', '#333');
    });
}

// 阿里 APP 鼠标悬停事件
function appsHover() {
    $('.apps_nav li ').hover(function () {
        $(this).find('div').css('display', 'block');
    }, function () {
        $(this).find('div').css('display', 'none');
    });
}