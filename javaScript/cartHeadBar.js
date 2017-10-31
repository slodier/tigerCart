$(function () {
    hoverColor();
    showOverFlow();
});

// id, 手机逛淘宝, 淘宝网首页, 购物车, 收藏夹, 商品分类, 卖家中心, 联系客服, 网站导航
function hoverColor() {
    amountHover($('.site-nav-menu'));
    amountHover($('.site-nav-mobile'));
    amountHover($('#site-nav-home'));
    amountHover($('#site-nav-myTaoBao'));
    amountHover($('#site-nav-cart'));
    amountHover($('#site-nav-favor'));
    amountHover($('#site-nav-catalog'));
    amountHover($('#site-nav-seller'));
    amountHover($('#site-nav-service'));
    amountHover($('#site-nav-sitemap'));

}

/**** 鼠标悬停事件 ****/
// 变色
function amountHover(selector) {
    $(selector).hover(function () {
        $(this).css({
            'color':'#ff4400'});
    },function () {
        $(selector).css({
            'color':'#000000'});
    });
}

// 悬停宝贝,显示天猫和店铺
function showOverFlow() {
    $('.switch-nav').hover(function () {
        $(this).css('overflow', 'visible');
    },function () {
        $(this).css('overflow', 'hidden');
    });
}