var express = require('express');
var url = require('url');
var fs = require('fs');
var app = express();
var mysql_pool = require('./server/mysql_pool');

app.listen(9000);

app.get('/selectCart', function (req, res) {
    /*
     var sql = 'select t_shop.id as shop_id,' +
         ' t_shop.name as shop_name, ' +
         't_shop.icon as shop_icon, ' +
         't_cart.id as goods_id, ' +
         't_cart.title as goods_title, ' +
         't_cart.icon as goods_icon, ' +
         't_cart.price, t_cart.amount, t_cart.weight ' +
         'from t_shop, t_cart where t_shop.id = t_cart.shop_id group by t_cart.shop_id';
     */

    var sql = 'select shop_id, group_concat(id) from t_cart group by shop_id';

     mysql_pool.query(sql, null, function (err, result) {
         if (err) {
             res.writeHead(404, {'content-Type':'text/html; charset=utf8'});
             res.end('err' + err);
             console.log(err);
         }
         else {
             res.writeHead(200, {'content-Type':'text/html; charset=utf8'});
             res.end(JSON.stringify(result));

             //setData(result);

             console.log(result[0]['group_concat(id)']);
         }
     });
});

// 将请求的数据,重新组织
function setData(data) {
    var dict = [];
    for (var i = 0; i < data.length; i++){
        for (var j = 1; j < data.length; j++){

            if (data[i]['shop_id'] == data[j]['shop_id']){
                console.log('ss');
            }
        }
    }
    return JSON.stringify(dict);
}

/*

                var item_head = {
                "shop-id":item['shop_id'],
                "shop-name":item['shop_name'],
                "list":[]
            };

            var last_item = {
                "id":item['goods_id'],
                "pic": item['goods_icon'],
                "title": item['goods_title'],
                "price": item['price'],
                "amount": item['amount'],
                "weight": item['weight']
            }

 */