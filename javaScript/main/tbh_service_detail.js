
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
    $('.main_inner').append(detail);
    $('.tbh_service_detail').insertAfter('.tbh_service');

    setData(titleArr);

}

// 根据数据创建元素
function setData(titleArray) {
    $('.theme_title').each(function (index) {
        $(this).text(titleArray[index]);
    });

    for (var i = 0; i < array1().length; i++){
        var li_1 = "<li>" +
            "<span>" + array1()[i] + "</span>" +
            "</li>"
        $('.theme_content_first').append(li_1);
    }

}

function array1() {
    var array = [
        '毛呢外套'      ,   '毛衣'       ,     '针织衫',
        '羽绒服'       ,    '棉服'       ,     '连衣裙',
        '气场外套'     ,    '风衣'       ,      '裤子',
        '卫衣'        ,    'T恤'        ,      '阔腿裤',
        '衬衫'        ,    '牛仔裤'      ,      '半身裙',
        '大码女装'     ,    '时尚套装'    ,     '西装',
        '打底衫'       ,   '夹克'        ,       '皮衣',
        '皮草'        ,   '妈妈装'       ,       '名族舞台',
        '腔调'
    ];
    return array;
}