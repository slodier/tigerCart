// 构建详细界面 UI
function layoutDetail(titleArr) {
    var detail = "<div class='tbh_service_detail'>" +
                    "<div class='tbh_service_content'>" +
                        "<div class='J_serch_content'>" +
                            "<span class='theme_title'></span>" +
                            "<ul class='theme_content_first theme_content'></ul>" +
                            "<span class='theme_title theme_title_second'></span>" +
                            "<ul class='theme_content_second theme_content'></ul>" +
                            "<span class='theme_title theme_title_three'></span>" +
                            "<ul class='theme_content_three theme_content'></ul>" +
                        "</div>"
                     "</div>"
                "</div>"

    // 防止重复创建
    if ($('.tbh_service_detail').length == 0){
        $('.main_inner').append(detail);
        $('.tbh_service_detail').insertAfter('.tbh_service');
    }

    //
    setData(titleArr);
}

// 根据数据创建元素
function setData(titleArray) {
    $('.theme_title').each(function (index) {
        $(this).text(titleArray[index]);
    });

    $('.J_serch_content li').remove();

    themeData(function (err, data) {
       if (!data) return;

       var firstArr = data[0];
       var secondArr = data[1];
       var threeArr = data[2];

       createLi(firstArr, '.theme_content_first');
       createLi(secondArr, '.theme_content_second');
       createLi(threeArr, '.theme_content_three');
    });
}

// 根据数组长度,创建 li 元素
function createLi(arr, selector) {
    for (var i = 0; i < arr.length; i++){
        var li_1 = "<li>" +
            "<span>" + arr[i] + "</span>" +
            "</li>"
        $(selector).append(li_1);
    }
}

// 请求数据
function themeData(callback) {
    var data = {'id':1};
    $.ajax({
        url:'http://localhost/taobao/selectTheme.php',
        data:data,
        success:function (data) {
            var json = JSON.parse(data);
            if (json['state'] != 1){
                alert(json['err']);
                callback(json['err']);
                return
            }
            callback(null, json['list']);
        },
        error:function (err) {
            alert(err);
            callback(err);
        }
    });
}