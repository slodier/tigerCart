$(function () {
    picCycle();

    // 左侧 li 鼠标悬停,改变背景色和字体颜色,显示详情
    $('.service-bd li').hover(function () {
        $(this).css('background-color', '#FFE4DD');
        $(this).find('span').css('color', '#FF714D');

        // 获取当前鼠标悬停的文字数组
        var titles = $(this).find('span').text();
        var titleArr = titles.split('/');
        //console.log(titleArr);

        layoutDetail(titleArr);

    },function () {
        $(this).css('background-color', '#ffffff');
        $(this).find('span').css('color', '#000000');
    });

    // 添加下划线
    $('.service-bd li span').hover(function () {
        $(this).css('text-decoration', 'underline');
    },function () {
        $(this).css('text-decoration', 'none');
    });

});

// 轮播图
function picCycle() {
    var imgArr = [
        'public/res/cycle/main-cycle-1.jpg',
        'public/res/cycle/main-cycle-2.jpg',
        'public/res/cycle/main-cycle-3.jpg',
        'public/res/cycle/main-cycle-4.png',
        'public/res/cycle/main-cycle-5.jpg'
    ];
    ccCycle(imgArr, '.J_promo');
}
