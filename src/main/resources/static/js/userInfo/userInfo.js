var popup = new Popup();

$(function () {


    laydate.render({
        elem: '#birthTime'
    });

    //读取该用户的信息
    //读取sessionStronger   user


    $.ajax({
        url: 'http://localhost:8080/api/user/getUserById',
        type: 'POST', //GET
        async: true,    //或false,是否异步
        headers: {
            "token": getCookie("token")
        },
        data: {
            id: JSON.parse(sessionStorage.getItem("user")) == null ? "" : JSON.parse(sessionStorage.getItem("user")).id
        },
        timeout: 50000,    //超时时间
        dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
        success: function (data) {
            if (data.code == 0) {
                $("#userName").val(data.data.userName)
                $("select[name=gender]").val(data.data.gender)
                $("#birthTime").val(data.data.birthTime.split(" ")[0])
                $("#identityCard").val(data.data.identityCard)
                $("#graduatedSchool").val(data.data.graduatedSchool)
                $("#userPhone").val(data.data.userPhone)
                $("#email").val(data.data.userEmail)
            }
        },
        error: function () {
            popup.alert("异常提醒", "服务器异常，请稍后再试！")
        }
    })


})

function saveUserInfo() {

    if (isEmpty123($("#userName").val())) {
        popup.alert("温馨提示", "姓名未填写！")
        return
    }
    if (isEmpty123($("#birthTime").val())) {
        popup.alert("温馨提示", "出生日期未填写！")
        return
    }
    if (isEmpty123($("#identityCard").val())) {
        popup.alert("温馨提示", "身份证号未填写！")
        return
    }
    if (isEmpty123($("#graduatedSchool").val())) {
        popup.alert("温馨提示", "毕业院校未填写！")
        return
    }
    if (isEmpty123($("#userPhone").val())) {
        popup.alert("温馨提示", "联系电话未填写！")
        return
    } else if (!(/^1[3456789]\d{9}$/.test($("#userPhone").val()))) {
        popup.alert("温馨提示", "联系电话格式有误，请确认！！")
        return
    }
    if (isEmpty123($("#email").val())) {
        popup.alert("温馨提示", "电子邮箱未填写！")
        return
    } else if (!(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/).test($("#email").val())) {
        popup.alert("温馨提示", "电子邮箱格式错误！")
        return
    }

    $.ajax({
        url: 'http://localhost:8080/api/user/update',
        type: 'POST', //GET
        async: true,    //或false,是否异步
        headers: {
            "token": getCookie("token")
        },
        data: {
            id: JSON.parse(sessionStorage.getItem("user")).id,
            userPhone: $("#userPhone").val(),
            userName: $("#userName").val(),
            userEmail: $("#userEmail").val(),
            gender: $("select[name=gender]").val(),
            birthTime: new Date($("#birthTime").val()),
            identityCard: $("#identityCard").val(),
            graduatedSchool: $("#graduatedSchool").val()
        },
        timeout: 50000,    //超时时间
        dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
        success: function (data) {
            //console.log(data)；
            if (data.code == 0) {
                popup.alert("修改告示", "修改个人信息成功!")
                setTimeout(function () {
                    window.location.reload();
                }, 1500)

            }
        },
        error: function () {
            popup.alert("异常提醒", "服务器异常，请稍后再试！")
        }
    })

}
