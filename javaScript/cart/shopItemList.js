$(function () {

    cartData();

    $('#order-list > div').css('padding-top', '20px');

    listenTotal();
});

// 设置元素的值
function setData(array) {

    $('#' + array['shop-id'] + ' span[class=shop-name]').text(array['shop-name']);   // 店铺名字

    var $item_holder = $('#' + array['shop-id'] + ' div[class=item-holder]');

    var list = array['list'];
    for (var i = 0; i < list.length; i++){

        temp = JSON.parse(list[i]);

        var goods_id = temp['id'];

        $($item_holder[i]).attr('id', goods_id);    // 给商品 div 元素 添加 id 为商品 id

        var $title = $('#' + goods_id + ' a[class=item-basic-info]');   // 设置商品标题
        var $price = $('#' + goods_id + ' em[class=price-now]');   // 设置单价
        var $amount = $('#' + goods_id + ' input[class=text-amount]');    // 设置数量

        var price_num = temp['price'];    // 单价
        var amount_num = temp['amount'];    // 数量
        var weight_num = temp['weight'];

        $title.text(temp['title']);
        $price.text("¥" + price_num);
        $amount.val(amount_num);

        calMoneyAndWeight(price_num, amount_num, weight_num, goods_id);

        // 商品 + 、- 数量按钮绑定事件
        dealAmount('#' + goods_id + ' button[class=amount-minus]', goods_id, price_num, weight_num, true);    // 减号按钮
        dealAmount('#' + goods_id + ' button[class=amount-plus]', goods_id, price_num, weight_num, false);    // 加号按钮
    }
}

// 初始化时计算重量和金额
function calMoneyAndWeight(price, amount, weight, id) {
    var sum_num = price *amount;
    var weight_num = weight *amount;

    var sum_text = '¥' + sum_num;
    var weight_text = '(' + weight_num + 'kg)';

    $('#' + id + ' em[class=item-sum-number]').text(sum_text);    // 商品金额 = 单价 * 数量
    $('#' + id + ' div[class=weight]').text(weight_text);    // 商品重量 = 单个重量 * 数量
}

// 监听总金额变化,大于 0 able ,反之 enable
function listenTotal() {
    $('.total-symbol').on('DOMNodeInserted', function () {
        if($(this).text() == '¥ 0.0'){
            disableSettle();
        }else {
            enableSettle();
        }
    })
}

/********  鼠标悬停事件  ***********/
function hoverEvent() {
    amountHover('.amount-minus');
    amountHover('.amount-plus');
    amountHover('.delete-item');

    goodBigImg();
}

// 鼠标悬停商品图片,鼠标右侧显示大图
function goodBigImg() {

    $('.td-item img').hover(function (e) {
       var src = $(this).attr('src');    // 获取商品图片的 src
       var pos = $(this).position();     // 获取图片的位置
       var bigImg = '<div class="good_big_img"><img src=' + src + '></div>';
       $($(this).parent()).append(bigImg);
       $('.good_big_img').css({
           'top':(pos.top - 30) + 'px',
           'left':(pos.left + 90)  +'px'
       });

    }, function () {
        $('.good_big_img'). remove();
    });
}

// 改变边框、字体颜色
function amountHover(selector) {
    $(selector).hover(function () {
        $(this).css({
            'borderColor':'#c7254e',
            'color':'#c7254e'});
    },function () {
        $(selector).css({
            'borderColor':'#e6e6e6',
            'color':'#000000'});
    });
}

// 数量加号和减号按钮事件
function dealAmount(selector, id, price_num, weight, isReduce) {
    $(selector).click(function () {
        var $sum = $('#' + id + ' em[class=item-sum-number]');
        var old_sum = priceToFloat($sum);
        var price = parseFloat(price_num);
        var new_sum = isReduce? (reduceAmount(old_sum, price)) : (addAmount(old_sum, price));
        if (new_sum <= price){   // 如果金额小于单价,则默认为单价
            new_sum = price;
        }
        $sum.text('¥' + new_sum);     // 设置金额

        var $amount = $('#' + id + ' input[class=text-amount]');    // 获取商品数量 input 标签
        var amount_num = parseInt($amount.val());
        isReduce ? (amount_num--) : (amount_num++);     // 减号-商品数量 --; 加号-商品数量 ++

        if (amount_num < 1){
            return;
        }

        // 只有商铺全选按钮或者商品选择按钮点击的时候,点击加、减号才可以计算到总金额
        var $shop_checkBox = $('#' + id).parent().parent().prev().find('.shop_checkbox');    // 商铺全选按钮
        var $good_checkBox = $('#' + id + ' input[class=checkBoxItem]');    // 商铺选择按钮


        if ($good_checkBox.prop('checked') || $shop_checkBox.prop('checked')){
            var total = formatMoney($('.total-symbol').text());
            total = isReduce? reduceAmount(total, price) : addAmount(total, price);

            $('.total-symbol').text('¥' + total);
        }

        if (amount_num <= 0){   // 数量最小只能是 1
            amount_num = 1;
        }
        $amount.val(amount_num);

        var $weight = $('#' + id + ' div[class=weight]');    // 获取商品重量 div 标签
        var weight_now = mulWeight(parseFloat(weight), amount_num);
        $weight.text('(' + weight_now + 'kg)');

    });
}

// 带 ¥ 符号的字符串去掉符号,并转换成 float 类型
function priceToFloat(selector) {
    var old = selector.text();
    old = old.replace('¥', '');
    return parseFloat(old);
}

// 添加元素
function layoutUI(array) {
    for (var i = 0; i < array.length; i++){
        var id = array[i]['shop-id'];
        var item = '        <div id="'+ id +'">\n' +
            '            <div class="itemHead-shop" >\n' +
            '                <div class="shop-info">\n' +
            '                    <input type="checkbox" name="orders[]" class="shop_checkbox">\n' +
            '                    <img src="public/res/market.png">\n' +
            '                    <span>店铺:&nbsp;</span>\n' +
            '                    <span class="shop-name"></span>\n' +
            '                </div>\n' +
            '            </div>\n' +
            '            <div class="order-content">\n' +
            '                <div class="item-list">\n' +
            '                    <div class="item-holder">\n' +
            '                        <ul class="item-content">\n' +
            '                            <li class="td-chk">\n' +
            '                                <input class="checkBoxItem" type="checkbox">\n' +
            '                            </li>\n' +
            '                            <li class="td-item">\n' +
            '                                <img src="./public/res/timg.jpeg">\n' +
            '                                <div class="item_info">\n' +
            '                                    <a class="item-basic-info"></a>\n' +
            '                                </div>\n' +
            '                            </li>\n' +
            '                            <li class="td-info"></li>\n' +
            '                            <li class="td-price">\n' +
            '                                <div class="price-line" tabindex="0">\n' +
            '                                    <em class="price-now"></em>\n' +
            '                                </div>\n' +
            '                            </li>\n' +
            '                            <li class="td-amount">\n' +
            '                                <div class="item-amount">\n' +
            '                                    <button class="amount-minus">-</button>\n' +
            '                                    <input type="text" class="text-amount">\n' +
            '                                    <button class="amount-plus">+</button>\n' +
            '                                </div>\n' +
            '                            </li>\n' +
            '                            <li class="td-sum">\n' +
            '                                <div class="td-inner">\n' +
            '                                    <em class="item-sum-number"></em>\n' +
            '                                    <div class="weight"></div>\n' +
            '                                </div>\n' +
            '                            </li>\n' +
            '                            <li class="td-op">\n' +
            '                                <button class="delete-item">删除</button>\n' +
            '                            </li>\n' +
            '                        </ul>\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '            </div>\n' +
            '        </div>';
        $('#order-list').append(item);
        multiInSameShop(array[i]);

        setData(array[i])
    }
    dealCheckBox();

    hoverEvent();
}

// 如果同一个店铺有多个商品,需要加进一个商铺中
function multiInSameShop(array) {
    var $item_list = $('#' + array['shop-id'] + ' div[class=item-list]');    // 获取商品列表标签
    for (var j = 1; j < array['list'].length; j++){    // 从 1 开始遍历
        var $item_holder = $($('#' + array['shop-id'] + ' div[class=item-holder]')[0]);    // 获取商品框架中第一个元素
        var $clone_holder = $item_holder.clone();   // 复制一份
        $item_list.append(separateLine());    // 多个商品之间添加一条分割线
        $item_list.append($clone_holder);   // 加进列表
    }
}

// 分隔线
function separateLine() {
    var line = '<div class="item-separate-line"></div>'
    return $(line);
}

// 获取数据
function cartData() {

    $.ajax({
        url: 'http://localhost:9000/selectCart',
        type: 'get',
        success: function (data, status) {
            var json = JSON.parse(data);
            layoutUI(json);
        },
        error:function (err) {
            alert(err);
        }
    });
}

/*** 数量计算,减法-加法-乘法  ***/
// 加法,去除小数点
function addAmount(arg1, arg2) {
    var r1, r2, m, c;
    try {
        r1 = arg1.toString().split(".")[1].length;
    }
    catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split(".")[1].length;
    }
    catch (e) {
        r2 = 0;
    }
    c = Math.abs(r1 - r2);
    m = Math.pow(10, Math.max(r1, r2));
    if (c > 0) {
        var cm = Math.pow(10, c);
        if (r1 > r2) {
            arg1 = Number(arg1.toString().replace(".", ""));
            arg2 = Number(arg2.toString().replace(".", "")) * cm;
        } else {
            arg1 = Number(arg1.toString().replace(".", "")) * cm;
            arg2 = Number(arg2.toString().replace(".", ""));
        }
    } else {
        arg1 = Number(arg1.toString().replace(".", ""));
        arg2 = Number(arg2.toString().replace(".", ""));
    }
    return (arg1 + arg2) / m;
}

// 减法
function reduceAmount(arg1, arg2) {
    var r1, r2, m, n;
    try {
        r1 = arg1.toString().split(".")[1].length;
    }
    catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split(".")[1].length;
    }
    catch (e) {
        r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2)); //last modify by deeka //动态控制精度长度
    n = (r1 >= r2) ? r1 : r2;
    return ((arg1 * m - arg2 * m) / m).toFixed(n);
}

// 乘法
function mulWeight(arg1, arg2) {
    var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    try {
        m += s1.split(".")[1].length;
    }
    catch (e) {
    }
    try {
        m += s2.split(".")[1].length;
    }
    catch (e) {
    }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
}

// 多选框事件
function dealCheckBox() {
    // 所有全选按钮事件
    $('.select_all').click(function () {
        if (this.checked){
            $("input[type='checkbox']").each(function () {
                $(this).prop('checked', true);
                totalMoney();
            });
        }else {
            $("input[type='checkbox']").each(function () {
                $(this).prop('checked', false);
                resetTotal();
            });
        }

    });

    // 单个商铺全选
    $('.shop_checkbox').each(function () {    // 遍历每个商铺的全选按钮
        $(this).click(function () {    // 给每个全选按钮添加点击事件
            var good = $(this).parent().parent().parent();    // 获取商品总元素
            if (this.checked){
                good.find('.checkBoxItem').each(function () {
                    $(this).prop('checked', true);
                });
                definePart(good);
                isAllSelect();
            } else {
                good.find('.checkBoxItem').each(function () {
                    $(this).prop('checked', false);
                });
                cancelPart(good);
                $('.select_all').prop('checked', false);
            }
        });
    });

    // 单个商品选择框
    $('.checkBoxItem').each(function () {    // 遍历所有商品选择框
        $(this).click(function () {    // 绑定点击事件
            var $ul = $(this).parent().parent();    // 得到 ul 元素
            var good_price = formatMoney($ul.find('.item-sum-number').text());    // 查找 ul 元素下的金额
            var cur_sum = formatMoney($('.total-symbol').text());    // 获取当前总金额

            var good = $(this).parents('.order-content').parent()    // 得到商品
            var shopSelectAll = good.find('.shop_checkbox');    // 得到商铺全选按钮

            if ($(this).prop('checked')){
                $('.total-symbol').text('¥ ' + addAmount(cur_sum, good_price));    // 商品金额 + 当前总金额 = 添加后的总金额
                isShopSelect(good, shopSelectAll);
            }else {
                $('.total-symbol').text('¥ ' + reduceAmount(cur_sum, good_price));    // 商品金额 + 当前总金额 = 添加后的总金额
                // 有一个商品取消打钩,则该商铺全选按钮取消打钩
                $(shopSelectAll).prop('checked', false);
            }
        });
    });
}

// 如果该商铺下所有商品打钩,则该商铺全选按钮也应该打钩
function isShopSelect(good, shopBox) {
    // 计算商铺下的所有商品全选按钮有没有全部打钩
    var isAll = false;
    good.find('.checkBoxItem').each(function () {
         if (!this.checked) {    // 如果全部选择框打钩,除了全选框
             isAll = false;
             return false;
         }
         isAll = true;
     });
    if (isAll) {
        $(shopBox).prop('checked', true);
        isAllSelect();    // 如果所有商铺都打勾,则全选按钮也打钩
    }
}

// 如果全部商品的全选按钮都打钩, 那么全选按钮也应该打钩
function isAllSelect() {
    var isAll = false;
    $("input[type='checkbox']").each(function () {
        if (!$(this).prop('checked') && $(this).attr('class') != 'select_all') {    // 如果全部选择框打钩,除了全选框
            isAll = false;
            return;
        }
        isAll = true;
    });
    if (isAll) {
        $('.select_all').prop('checked', true);
    }
}

// 结算全部商品金额
function totalMoney() {
    var total = 0;
    $('.item-sum-number').each(function () {
        var price = $(this).text();
        price = formatMoney(price)    // 去掉全面的 ¥ 符号
        total += price;
    });
    $('.total-symbol').text('¥ ' + total);
}

// 结算部分商品金额, 当前总金额 + 部分商品的金额
function definePart(good) {
    var total = 0;
    good.find('.item-sum-number').each(function () {
        var price = $(this).text();
        price = formatMoney(price);    // 去掉全面的 ¥ 符号
        total += price;
    });
    var cur_sum = formatMoney($('.total-symbol').text());
    $('.total-symbol').text('¥ ' + addAmount(cur_sum, total));
}

// 取消勾选部分商品,总金额减去部分商品金额
function cancelPart(good) {
    var total = 0;
    good.find('.item-sum-number').each(function () {
        var price = $(this).text();
        price = formatMoney(price);    // 去掉全面的 ¥ 符号
        total += price;
    });
    var cur_sum = formatMoney($('.total-symbol').text());
    $('.total-symbol').text('¥ ' + reduceAmount(cur_sum, total));
}

// 结算金额归 0
function resetTotal() {
    $('.total-symbol').text('0.00');
}

// 取出 ¥ 符号
function formatMoney(money) {
    price = parseFloat(money.replace('¥', ''));
    return price;
}

// 结算按钮可用
function enableSettle() {
    $('#small-submit').removeAttr('disabled');
    $('#small-submit').css({
        'background':'#ff4400',
        'border':'0'
    });
}

// 禁用结算按钮
function disableSettle() {
    $('#small-submit').attr('disabled', 'disabled');
    $('#small-submit').css({
        'background':'#aaa',
        'border':'0'
    });
}
