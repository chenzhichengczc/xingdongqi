

var popup = new Popup();

function alipay() {


    if (isEmpty123(getParameter("id"))) {
        popup.alert("异常提醒", "订单异常！")
        return
    }

    $.ajax({
        url: 'http://localhost:8080/api/alipay/goAlipay',
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
            if(data.code == 502){
                popup.alert("支付提醒", data.msg)
            }
        },
        error: function () {
            alert("服务器异常，请稍后再试！")
        }
    })



}



function load(options) {
    $.ajax({
        url: "http://localhost:8080/api/wx/pay/orderquery'",
        type: 'POST', //GET
        async: true,    //或false,是否异步
        headers: {
            "token": getCookie("token")
        },
        data: {
            orderOn: options
        },
        timeout: 50000,    //超时时间
        dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
        success: function (data) {
            if(data.code == 0){
                if(data.data == true){
                    clearInterval(payInterval);
                    popup.alert("支付告示","支付成功");
                    setTimeout(function () {
                        window.location.href = "http://localhost:8080/home.html";
                    },5000)
                }
            }
        },
        error: function () {
            alert("服务器异常，请稍后再试！")
        }
    })

}

var payInterval;


function weixinpay() {
    $.ajax({
        url: 'http://localhost:8080/api/wx/pay',
        type: 'POST', //GET
        async: true,    //或false,是否异步
        headers: {
            "token": getCookie("token")
        },
        data: {
            userApplicationId: getParameter("id")
        },
        timeout: 50000,    //超时时间
        dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
        success: function (data) {
            if(data.code == 0){
                //window.open(data.msg)
                $(".weixin_pay").css("display", "block");
                const qr = new QRious({
                    element: document.getElementById('qr'),
                    size:250,
                    value: data.data.codeUrl
                })

                payInterval = setInterval(function(){load(data.data.orderOn)},2000);
            }
            if(data.code == 502){
                popup.alert("支付提醒", data.msg)
            }
        },
        error: function () {
            alert("服务器异常，请稍后再试！")
        }
    })


var popup = new Popup();

function alipay() {


    if (isEmpty123(getParameter("id"))) {
        popup.alert("异常提醒", "订单异常！")
        return
    }

    if (!$("#radioCheck").is(":checked")) {
        popup.alert("温馨提示", "请勾选阅读事项!")
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
            if (data.code == 0) {
                window.open(data.msg)
            }
            if (data.code == 502) {
                popup.alert("支付提醒", data.msg)
            }
        },
        error: function () {
            alert("服务器异常，请稍后再试！")
        }
    })

}

}