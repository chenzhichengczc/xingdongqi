//全局的ajax访问，处理ajax清求时异常
$.ajaxSetup({
    contentType:"application/x-www-form-urlencoded;charset=utf-8",
    complete:function(XMLHttpRequest,textStatus){
        console.log(XMLHttpRequest.status)
        console.log(textStatus)
        var code = JSON.parse(XMLHttpRequest.responseText).code

        if(XMLHttpRequest.status == 403){
            // alert("登录信息过期，请重新登录！")
            expireCookie("token");
            var popup = new Popup();
            popup.alert("信息过期","登录信息过期，请重新登录！")
            setTimeout(function () {
                window.location.href = "https://www.xingdongqi.com/home.html"
            },1500)
        }
    },
});
