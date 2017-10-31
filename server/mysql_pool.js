var mysql = require('mysql');
var mysql_pool = mysql.createPool({
    host:'127.0.0.1',
    port:3306,
    user:'root',
    password:'Qwe1234.',
    database:'taobao'
});

exports.query = function (sql, options, callback) {
    mysql_pool.getConnection(function (err, conn) {
        if(err){
            callback(err);
        }else {
            conn.query(sql, options, function (err, results, fields) {
                // 释放连接
                conn.release();
                // 返回
                callback(err, results);
            });
        }
    });
}