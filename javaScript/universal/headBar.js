$(function () {

    layoutUI();

    hoverColor();
    showOverFlow();

    showDetail();
});

// 创建顶部导航栏
function layoutUI() {
    var elem = '    <div class="site-nav">\n' +
        '        <div class="site-nav-bd">\n' +
        '            <ul class="site-nav-bd-l">\n' +
        '                <li class="site-nav-menu">脆饼</li>\n' +
        '                <li class="site-nav-tmsg">\n' +
        '                    <span>消息</span>\n' +
        '                    <span class="site-nav-tmsg-num">1</span>\n' +
        '                </li>\n' +
        '                <li class="site-nav-mobile">手机逛淘宝</li>\n' +
        '            </ul>\n' +
        '            <ul class="site-nav-bd-r">\n' +
        '                <li class="site-nav-item">\n' +
        '                    <button id="site-nav-home">淘宝网首页</button>\n' +
        '                </li>\n' +
        '                <li class="site-nav-item">\n' +
        '                    <button id="site-nav-myTaoBao">我的淘宝</button>\n' +
        '                </li>\n' +
        '                <li class="site-nav-item">\n' +
        '                    <button id="site-nav-cart">购物车</button>\n' +
        '                    <span class="site-nav-cart-num">9</span>\n' +
        '                </li>\n' +
        '                <li class="site-nav-item">\n' +
        '                    <button id="site-nav-favor">收藏夹</button>\n' +
        '                </li>\n' +
        '                <li class="site-nav-item">\n' +
        '                    <button id="site-nav-catalog">商品分类</button>\n' +
        '                </li>\n' +
        '                <li class="site-nav-item">\n' +
        '                    <button id="site-nav-seller">卖家中心</button>\n' +
        '                </li>\n' +
        '                <li class="site-nav-item">\n' +
        '                    <button id="site-nav-service">联系客服</button>\n' +
        '                </li>\n' +
        '                <li class="site-nav-item">\n' +
        '                    <button id="site-nav-sitemap">网站导航</button>\n' +
        '                </li>\n' +
        '            </ul>\n' +
        '        </div>\n' +
        '    </div>'

    $('body').prepend(elem);
}

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
   // amountHover($('#site-nav-sitemap'));
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
        $(this).css({
            'border': '1px solid #e6e6e6',
            'overflow': 'visible',
            'background':'#ffffff'
        });

        $('.switch-nav-item button').css({
            'background':'#ffffff'
        });

    },function () {
        $(this).css({
            'border': '0',
            'overflow':'hidden'
        });

        $('.switch-nav-item button').css({
            'background':'#e6e6e6'
        });
    });
}

// 鼠标悬停详细信息
function showDetail() {
    // 账号
    $('.site-nav-menu').hover(function () {

        var account = '<div class="hover_account">' +
                            '<div class="hover_account_right">' +
                                '<button id="hover_account_manager">账号管理</button>' +
                                '<div class="hover_account_line"></div>' +
                                '<button id="log_out">退出</button>' +
                            '</div>' +
                            '<div class="hover_account_icon">' +
                                '<div class="hover_account_leftLine"></div>' +
                                '<img src="./public/res/1.png"></div>' +
                            '<div class="hover_account_desc">' +
                                '<div>' +
                                    '<span>淘气值:&nbsp;</span>' +
                                    '<span id="taoqi_value">376</span>' +
                                '</div>' +
                                '<div>' +
                                '<span id="vip-level">普通会员</span>' +
                                '</div>' +
                            '</div>' +
                            '<div class="hover_account_bottom">' +
                                '<button id="hover_account_check">查看你的专属权益</button>' +
                            '</div>' +
                        '</div>';
        $('.site-nav-menu').append(account);

    }, function (e) {
        $('.hover_account').remove();
    });

    showSiteDetail();
}

// 网站导航
function showSiteDetail() {
    var siteDiv = '    <div class="site_map_total">\n' +
        '        <div class="map_first">\n' +
        '            <div class="map_title map_first_title">\n' +
        '                <span>&nbsp;&nbsp;主题市场</span>\n' +
        '            </div>\n' +
        '            <div class="map_column">\n' +
        '                <ul>\n' +
        '                    <li class="map_first_item map_item">女装</li>\n' +
        '                    <li class="map_first_item map_item">男装</li>\n' +
        '                    <li class="map_first_item map_item">内衣</li>\n' +
        '                    <li class="map_first_item map_item">鞋靴</li>\n' +
        '                    <li class="map_first_item map_item">箱包</li>\n' +
        '                    <li class="map_first_item map_item">婴童</li>\n' +
        '                    <li class="map_first_item map_item">家电</li>\n' +
        '                    <li class="map_first_item map_item">数码</li>\n' +
        '                    <li class="map_first_item map_item">数码</li>\n' +
        '                    <li class="map_first_item map_item">数码</li>\n' +
        '                    <li class="map_first_item map_item">数码</li>\n' +
        '                    <li class="map_first_item map_item">数码</li>\n' +
        '                    <li class="map_first_item map_item">箱包</li>\n' +
        '                    <li class="map_first_item map_item">女装</li>\n' +
        '                    <li class="map_first_item map_item">男装</li>\n' +
        '                    <li class="map_first_item map_item">箱包</li>\n' +
        '                    <li class="map_first_item map_item">女装</li>\n' +
        '                    <li class="map_first_item map_item">男装</li>\n' +
        '                    <li class="map_first_item map_item">箱包</li>\n' +
        '                    <li class="map_first_item map_item">女装</li>\n' +
        '                    <li class="map_first_item map_item">男装</li>\n' +
        '                    <li class="map_first_item map_item">鞋靴</li>\n' +
        '                    <li class="map_first_item map_item">箱包</li>\n' +
        '                    <li class="map_first_item map_item">女装</li>\n' +
        '                    <li class="map_first_item map_item">男装</li>\n' +
        '                    <li class="map_first_item map_item">鞋靴</li>\n' +
        '                    <li class="map_first_item map_item">箱包</li>\n' +
        '                    <li class="map_first_item map_item">内衣</li>\n' +
        '                    <li class="map_first_item map_item">内衣</li>\n' +
        '                    <li class="map_first_item map_item">女装</li>\n' +
        '                    <li class="map_first_item map_item">男装</li>\n' +
        '                    <li class="map_first_item map_item">鞋靴</li>\n' +
        '                    <li class="map_first_item map_item">内衣</li>\n' +
        '                    <li class="map_first_item map_item">男装</li>\n' +
        '                    <li class="map_first_item map_item">男装</li>\n' +
        '                    <li class="map_first_item map_item">内衣</li>\n' +
        '                </ul>\n' +
        '            </div>\n' +
        '            <div class="map_rightLine"></div>\n' +
        '        </div>\n' +
        '        <div class="map_second">\n' +
        '            <div class="map_title map-second_title">\n' +
        '                <span>&nbsp;&nbsp;特色市场</span>\n' +
        '            </div>\n' +
        '            <div class="map_column">\n' +
        '                <ul>\n' +
        '                    <li class="map_second_item map_item">iFashion</li>\n' +
        '                    <li class="map_second_item map_item">爱逛街</li>\n' +
        '                    <li class="map_second_item map_item">美妆秀</li>\n' +
        '                    <li class="map_second_item map_item">全球购</li>\n' +
        '                    <li class="map_second_item map_item">腔调</li>\n' +
        '                    <li class="map_second_item map_item">淘女郎</li>\n' +
        '                    <li class="map_second_item map_item">星店</li>\n' +
        '                    <li class="map_second_item map_item">极有家</li>\n' +
        '                    <li class="map_second_item map_item">特色中国</li>\n' +
        '                    <li class="map_second_item map_item">拍卖会</li>\n' +
        '                    <li class="map_second_item map_item">淘宝众筹</li>\n' +
        '                    <li class="map_second_item map_item">中国质造</li>\n' +
        '                    <li class="map_second_item map_item">飞猪</li>\n' +
        '                    <li class="map_second_item map_item">亲宝贝</li>\n' +
        '                    <li class="map_second_item map_item">闲鱼</li>\n' +
        '                    <li class="map_second_item map_item">农贸</li>\n' +
        '                    <li class="map_second_item map_item">天天特价</li>\n' +
        '                    <li class="map_second_item map_item">Outlets</li>\n' +
        '                    <li class="map_second_item map_item">俪人购</li>\n' +
        '                    <li class="map_second_item map_item">聚名品</li>\n' +
        '                    <li class="map_second_item map_item">淘抢购</li>\n' +
        '                    <li class="map_second_item map_item">全球精选</li>\n' +
        '                    <li class="map_second_item map_item">非常大牌</li>\n' +
        '                    <li class="map_second_item map_item">试用</li>\n' +
        '                    <li class="map_second_item map_item">量贩团</li>\n' +
        '                    <li class="map_second_item map_item">阿里翻译</li>\n' +
        '                </ul>\n' +
        '            </div>\n' +
        '            <div class="map_rightLine"></div>\n' +
        '        </div>\n' +
        '        <div class="map_third">\n' +
        '            <div class="map_title map_third_title">\n' +
        '                <span>&nbsp;&nbsp;阿里APP</span>\n' +
        '            </div>\n' +
        '            <div class="map_column">\n' +
        '                <ul>\n' +
        '                    <li class="map_item map_third_item">淘宝</li>\n' +
        '                    <li class="map_item map_third_item">天猫</li>\n' +
        '                    <li class="map_item map_third_item">支付宝</li>\n' +
        '                    <li class="map_item map_third_item">聚划算</li>\n' +
        '                    <li class="map_item map_third_item">飞猪</li>\n' +
        '                    <li class="map_item map_third_item">蚂蚁聚宝</li>\n' +
        '                    <li class="map_item map_third_item">旺信</li>\n' +
        '                    <li class="map_item map_third_item">闲鱼</li>\n' +
        '                    <li class="map_item map_third_item">阿里钱盾</li>\n' +
        '                    <li class="map_item map_third_item">钉钉</li>\n' +
        '                    <li class="map_item map_third_item">高德地图</li>\n' +
        '                    <li class="map_item map_third_item">点点虫</li>\n' +
        '                    <li class="map_item map_third_item">虾米音乐</li>\n' +
        '                    <li class="map_item map_third_item">淘票票</li>\n' +
        '                    <li class="map_item map_third_item">菜鸟包裹</li>\n' +
        '                    <li class="map_item map_third_item">爱逛街</li>\n' +
        '                    <li class="map_item map_third_item">拍卖会</li>\n' +
        '                    <li class="map_item map_third_item">阿里云</li>\n' +
        '                    <li class="map_item map_third_item">网商银行</li>\n' +
        '                    <li class="map_item map_third_item">阿里邮箱</li>\n' +
        '                    <li class="map_item map_third_item">阿里众包</li>\n' +
        '                </ul>\n' +
        '            </div>\n' +
        '            <div class="map_rightLine map_third_short"></div>\n' +
        '        </div>\n' +
        '        <div class="map_four">\n' +
        '            <div class="map_title map_four_title">\n' +
        '                <span>&nbsp;&nbsp;精彩推荐集</span>\n' +
        '            </div>\n' +
        '            <div class="map_column">\n' +
        '                <ul>\n' +
        '                    <li class="map_item map_four_item">余额宝</li>\n' +
        '                    <li class="map_item map_four_item">大牌捡宝</li>\n' +
        '                    <li class="map_item map_four_item">淘公仔</li>\n' +
        '                    <li class="map_item map_four_item">浏览器</li>\n' +
        '                    <li class="map_item map_four_item">淘宝香港</li>\n' +
        '                    <li class="map_item map_four_item">淘宝台湾</li>\n' +
        '                    <li class="map_item map_four_item">淘宝全球</li>\n' +
        '                    <li class="map_item map_four_item">淘宝东南亚</li>\n' +
        '                    <li class="map_item map_four_item">闺蜜淘宝</li>\n' +
        '                    <li class="map_item map_four_item">大众评审</li>\n' +
        '                    <li class="map_item map_four_item">淘工作</li>\n' +
        '                </ul>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>';
    $('#site-nav-sitemap').append(siteDiv);
    changeColumnColor('.map_first_item', '#f43e14');
    changeColumnColor('.map_second_item', '#95af32');
    changeColumnColor('.map_third_item', '#d14d8b');
    changeColumnColor('.map_four_item', '#009fd8');

    $('.site_map_total').hide();

    $('#site-nav-sitemap').parent().hover(function () {
        $('.site_map_total').show();
        if ($('.site_map_total').length == 0){
            $('#site-nav-sitemap').append(siteDiv);
        }

    }, function () {
        $('.site_map_total').hide();
    });
}

// 网站导航鼠标移动某列,显示对应标题的颜色
function changeColumnColor(selector, color) {
    $(selector).hover(function () {
        $(this).css('background', color)
    }, function () {
        $(this).css('background', '#fff')
    })
}