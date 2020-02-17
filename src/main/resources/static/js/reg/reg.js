var popup = new Popup();

function submitFun() {
    if ($("#userInfoForm").valid()) {
        var userAcountName = $("#userName").val();
        var userAcountPassword = $("#password").val()
        var userName = $("#realName").val()
        var userPhone = $("#telephone").val()
        var userEmail = $("#email").val()


        $.ajax({
            url: 'http://localhost:8080/reg/user',
            type: 'POST', //GET
            async: true,    //或false,是否异步
            headers: {},
            data: {
                userAcountName: userAcountName,
                userAcountPassword: userAcountPassword,
                userName: userName,
                userPhone: userPhone,
                userEmail: userEmail
            },
            timeout: 50000,    //超时时间
            dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
            success: function (data) {
                if (data.code == 0) {
                    popup.alert("注册告示","用户注册成功!")
                    setTimeout(function () {
                        window.location.href = "http://localhost:8080/home.html"
                    },1500)
                }
            },
            error: function () {
                popup.alert("异常提醒","服务器异常，请稍后再试！")
            }
        })

    } else {

    }
}

//密码验证
jQuery.validator.addMethod("checkPassword", function (value, element) {
    return this.optional(element) || /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(.{8,15})$/.test(value);
}, "请输入由大写字母，小写字母，数字组成的8-15位字符");

jQuery.validator.addMethod("isPhone", function (value, element) {
    var length = value.length;
    var mobile = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    return this.optional(element) || (length == 11 && mobile.test(value));
}, "请填写正确的手机号码"); //可以自定义默认提示信息
$(document).ready(function () {
    var message = '';
    if (message != null && message != '') {
        layer.alert(message);
    }
    $("#userInfoForm").validate({
        rules: {
            password: {
                required: true,
                checkPassword: true,
                minlength: 8
            },
            newPassword: {
                required: true,
                checkPassword: true,
                minlength: 8,
                equalTo: "#password"
            },
            telephone: {
                required: true,
                isPhone: true

            }
        },
        messages: {
            password: {
                required: "请输入密码",
                minlength: jQuery.format("密码不能小于{0}个字符")
            },
            newPassword: {
                required: "请输入确认密码",
                minlength: "确认密码不能小于8个字符",
                equalTo: "两次输入密码不一致"
            },
            telephone: {
                required: "请输入联系电话",
                isIdCardNo: "请输入正确的联系电话"
            }
        }
    });
})
