var popup = new Popup();

function alipay() {


    if (isEmpty123(getParameter("id"))) {
        popup.alert("异常提醒", "订单异常！")
        return
    }

    $.ajax({
        url: 'https://www.xingdongqi.com/alipay/goAlipay',
        type: 'POST', //GET
        async: true,    //或false,是否异步
        headers: {
            "token": getCookie("token")
        },
        data: {
            useApplicationId: getParameter("id")
        },
        timeout: 50000,    //超时时间
        dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
        success: function (data) {
            if(data.code == 0){
                window.open(data.msg)
            }
        },
        error: function () {
            alert("服务器异常，请稍后再试！")
        }
    })



}