$(function () {

    var id = getParameter("id")

    if (isEmpty123(id)) {
        popup.alert("异常提醒", "ID获取失败，请联系负责人");
        return;
    }

    $.ajax({
        url: 'https://www.xingdongqi.com/api/userApplication/getApplication',
        type: 'POST', //GET
        async: true,    //或false,是否异步
        headers: {
            "token": getCookie("token")
        },
        data: {
            id: id
        },
        timeout: 50000,    //超时时间
        dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
        success: function (data) {
            //console.log(data)；
            if (data.code == 0) {
                $("#applicantName").html(data.data.applicantName)
                $("#applicantGender").html(data.data.applicantGender == 0 ? '男' : '女')
                $("#applicantIdentityCard").html(data.data.applicantIdentityCard)
                $("#ticketNumber").html(data.data.ticketNumber)
                $("#ticketExamTime").html(data.data.ticketExamTime)
                $("#ticketExamAddressOne").html(data.data.ticketExamAddressOne)
                $("#ticketExamAddressTwo").html(data.data.ticketExamAddressTwo)
                $("#ticketRemark").html(data.data.ticketRemark)
            } else {
                popup.alert("异常提醒", "服务器异常，请稍后再试！")
            }
        },
        error: function () {
            alert("服务器异常，请稍后再试！")
        }
    })

})