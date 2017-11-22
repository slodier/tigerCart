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

// 充话费等等 鼠标悬停,改变字体颜色
function conveHover() {
    $('.conve_mod').hover(function () {
        $(this).find('a').find('p').css('color', 'red');

       var li_class = $(this).attr('class');
       var current = li_class.split(" ")[1];
       if (current == 'conve_item_1'){

       }

       switch (current){
           case "conve_item_1" :
               coverDetail($(this));
               break;
           case "conve_item_2" :
               break;
           case "conve_item_3" :
               break;
           case "conve_item_4" :
               break;
       }


    }, function () {
        $(this).find('p').css('color', '#333');
    });
}

// 充话费、旅行、车险、游戏鼠标悬停显示相应内容
function coverDetail(selector) {

    if ($('.cover_detail').length > 0) return;

    var div = "<div class='cover_detail'>" +
                  "<div class='cover_white'></div>" +
                  "<div class='conver_content'>" +
                        "<div class='cover_hd'>" +
                             "<a href='#'>充话费</a>" +
                             "<a href='#'>充流量</a>" +
                             "<a href='#'>充固话</a>" +
                             "<a href='#'>充宽带</a>" +
                        "</div>" +
                        "<div class='cover_body'>" +
                            "<ul class='cover_body_list'>" +
                                 "<li class='cover_body_item'>" +
                                    "<div class='cover_phone'>" +
                                        "<input type='text' placeholder='请输入手机号码' class='cover_phone_text'>" +
                                        "<div class='cover_phone_money'>" +
                                            "<p>50元</p>" +
                                            "<p>↓</p>" +
                                        "</div>" +
                                    "</div>" +
                                    "<div class='cover_recharge'>" +
                                        "<button>立即充值</button>" +
                                    "</div>" +
                                 "</li>" +
                                 "<li class='cover_body_item'></li>" +
                                 "<li class='cover_body_item'></li>" +
                                 "<li class='cover_body_item'></li>" +
                            "</ul>" +
                        "</div>" +
                  "</div>" +
                  "<div class='cover_close'><a href='#'>x</a></div>" +
              "</div>"
    selector.append(div);
    selector.css('border', '1px solid #ff5000');
    selector.css('border-bottom', 'none');
}

// 充话费按钮点击事件
// 充话费,话费金额选择 ul
function rechargeClick() {
   $('.cover_phone_money').click(function () {
        var div = "<div ></div>"
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