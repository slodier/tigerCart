var express = require('express');
var url = require('url');
var fs = require('fs');
var app = express();
var mysql_pool = require('./server/mysql_pool');

app.listen(9000);

app.get('/selectCart', function (req, res) {

    var sql = "select shop_id, t_shop.name as shop_name, group_concat(t_cart.id, '-', title, '-', t_cart.icon, '-', price, '-', amount, '-', weight separator ';') from  t_cart, t_shop  where t_cart.shop_id = t_shop.id group by shop_id";

    mysql_pool.query(sql, null, function (err, data) {
        if(err) {
            console.log(err)
            res.writeHead(404, {
                'Content-Type' : 'text/html;charset=utf-8',
                'Access-Control-Allow-Origin':'*'
            });
            res.end(err);
        } else{
            res.writeHead(200, {
                'Content-Type' : 'text/html;charset=utf-8',
                'Access-Control-Allow-Origin':'*'
            });
            res.end(getList(data));
        }
    })
});

// 编排数组
function getList(data) {
    var array = [];
    for (var i = 0 ; i < data.length; i++){
        var shop_id = data[i]['shop_id'];
        var shop_name = data[i]['shop_name'];
        var total_text = data[i]["group_concat(t_cart.id, '-', title, '-', t_cart.icon, '-', price, '-', amount, '-', weight separator ';')"];
        var goods = total_text.split(';');    // 根据 ; 分割商品数组
        var json = {
            'shop-id':'shop-' + shop_id,
            'shop-name':shop_name,
            'list':[]
        };

        for (var j = 0; j < goods.length; j++){
            var item_text = goods[j].toString();
            var item = item_text.split('-');    // 根据 - 分割商品字段数组
            var dict = {
                'id':'good-' + item[0],
                'title':item[1],
                'icon':item[2],
                'price':item[3],
                'amount':item[4],
                'weight':item[5]
            };
            json['list'].push(JSON.stringify(dict));    // 将 js 对象转为 json 对象,加进 list 数组中
        }
        array.push(json);
    }
    return JSON.stringify(array);
}