$(function () {

    getData();

    hoverEvent();
});

// 请求数据
function getData() {
    var shop_id = 'goods-1';
    var shop_name = '中华美食';
    var shop_pic = '';
    var shop_title = '包邮 日本ZEBRA斑马J3J2三色中性笔 多色中性笔 斑马多功能笔0.5';
    var price = 14.2;
    var amount = 2;
    var weight = 0.1;     // 单个重量

    var temp = [];
    temp.push(shop_id);
    temp.push(shop_name);
    temp.push(shop_pic);
    temp.push(shop_title);
    temp.push(price);
    temp.push(amount);
    temp.push(weight);

    layoutUI(temp[0]);

    setData(temp);
}

// 设置元素的值
function setData(array) {
    $('#' + array[0] + ' span[class=shop-name]').text(array[1]);   // 店铺名字
    $('#' + array[0] + ' a[class=item-basic-info]').text(array[3]);    // 设置商品标题
    $('#' + array[0] + ' em[class=price_now]').text('¥' + array[4]);    /// 设置单价
    $('#' + array[0] + ' input[class=text-amount]').val(array[5]);    // 设置数量

    calMoneyAndWeight(array[4], array[5], array[6], array[0]);

    dealAmount(array);
}

// 初始化时计算重量和金额
function calMoneyAndWeight(price, amount, weight, id) {
    var sum_num = price *amount;
    var weight_num = weight *amount;

    var sum_text = '¥' + sum_num;
    var weight_text = '(' + weight_num + 'kg)';

    $('#' + id + ' em[class=item-sum-number]').text(sum_text);
    $('#' + id + ' div[class=weight]').text(weight_text);

}

/********  鼠标悬停事件  ***********/
function hoverEvent() {
    amountHover('.amount-minus');
    amountHover('.amount-plus');
    amountHover('.delete-item');
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
// function minusAmount(id) {
//     $('.amount-minus').click(function () {
//         var old_sum = priceToInt($('#' + id + ' em[class=item-sum-number]'));
//         var price = priceToInt($('#' + id + ' em[class=price_now]'));
//         console.log(price);
//         var new_sum = old_sum - price;
//         $('.item-sum-number').text(new_sum);
//     });
// }

function dealAmount(array) {
    $('.amount-minus').click(function () {
        var old_sum = priceToInt($('#' + array[0] + ' em[class=item-sum-number]'));
        var price = array[4];
        var new_sum = old_sum - price;
        $('.item-sum-number').text(new_sum);
    });

    $('.amount-plus').click(function () {
        var old_sum = priceToInt($('#' + array[0] + ' em[class=item-sum-number]'));
        var price = array[4];
        var new_sum = old_sum + price;
        $('.item-sum-number').text(new_sum);
    });
}

// 带 ¥ 符号的字符串去掉符号
function priceToInt(selector) {
    var old = selector.text();
    old = old.replace('¥', '');
    return parseFloat(old);
}

// 添加元素
function layoutUI(id) {
    var item = '        <div id="'+ id +'">\n' +
        '            <div class="itemHead-shop" id="0">\n' +
        '                <div class="shop-info">\n' +
        '                    <input type="checkbox" name="orders[]">\n' +
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
        '                                <div class="price_line" tabindex="0">\n' +
        '                                    <em class="price_now">￥7.90</em>\n' +
        '                                </div>\n' +
        '                            </li>\n' +
        '                            <li class="td-amount">\n' +
        '                                <div class="item-amount">\n' +
        '                                    <button class="amount-minus">-</button>\n' +
        '                                    <input type="text" class="text-amount" value="2">\n' +
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
}

