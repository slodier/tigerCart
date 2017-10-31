$(function () {

    getData(array1());
    getData(array2());

    hoverEvent();

    $('#order-list > div').css('padding-top', '20px');

    $('.price_now').wrap('<b></b>')

});

// 请求数据
function getData(array) {
    // try {
    //     var json = JSON.parse(array);
    // }catch (e){
    //     console.log(e);
    // }
    layoutUI(array);

    setData(array);
}

// 设置元素的值
function setData(array) {

    $('#' + array['shop-id'] + ' span[class=shop-name]').text(array['shop-name']);   // 店铺名字

    var $item_holder = $('#' + array['shop-id'] + ' div[class=item-holder]');

    var list = array['list'];
    for (var i = 0; i < list.length; i++){

        var goods_id = list[i]['id'];

        $($item_holder[i]).attr('id', goods_id);    // 给商品 div 元素 添加 id 为商品 id

        var $title = $('#' + goods_id + ' a[class=item-basic-info]');   // 设置商品标题
        var $price = $('#' + goods_id + ' em[class=price-now]');   // 设置单价
        var $amount = $('#' + goods_id + ' input[class=text-amount]');    // 设置数量


        var price_num = list[i]['price'];    // 单价
        var amount_num = list[i]['amount'];    // 数量
        var weight_num = list[i]['weight'];

        $title.text(list[i]['title']);
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
    var id = array['shop-id'];
    var item = '        <div id="'+ id +'">\n' +
        '            <div class="itemHead-shop" >\n' +
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

    multiInSameShop(array);
}

// 如果同一个店铺有多个商品
function multiInSameShop(array) {
    var $item_list = $('#' + array['shop-id'] + ' div[class=item-list]');    // 获取商品列表标签
    for (var  i = 1; i < array['list'].length; i++){    // 从 1 开始遍历
        var $item_holder = $('#' + array['shop-id'] + ' div[class=item-holder]');    // 获取商品框架
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

// 测试元素
function array1() {
    var json = {
        "shop-id":"shop-1",
        "shop-name":"中华美食",
        "list":[
            {
                "id":"goods-1",
                "pic": "",
                "title": "包邮 日本ZEBRA斑马J3J2三色中性笔 多色中性笔 斑马多功能笔0.5",
                "price": 14.2,
                "amount": 2,
                "weight": 0.2
            },
            {
                "id":"goods-2",
                "pic": "",
                "title": "天猫超市 华味亨铁山楂300g/袋 山楂 卷山楂片 山楂干蜜饯零食",
                "price": 6,
                "amount": 10,
                "weight": 0.6
            }
        ]
    };
    return json;
}

function array2() {
    var json = {
        "shop-id":"shop-2",
        "shop-name":"优衣库官方旗舰店",
        "list":[
            {
                "id":"goods-3",
                "pic": "",
                "title": "男装 AIRism针织短裤 182503 优衣库UNIQLO",
                "price": 59,
                "amount": 1,
                "weight": 1
            }
        ]
    };
    return json;
}

// 数量计算,减法-加法-乘法
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
