//全局的ajax访问，处理ajax清求时异常
$.ajaxSetup({
    contentType:"application/x-www-form-urlencoded;charset=utf-8",
    complete:function(XMLHttpRequest,textStatus){
        var code = JSON.parse(XMLHttpRequest.responseText).code

        if(code == 403){
            // alert("登录信息过期，请重新登录！")
            var popup = new Popup();
            popup.alert("信息过期","登录信息过期，请重新登录！")
            setTimeout(function () {
                window.location.href = "/home"
            },1500)
        }
    },
});
