var popup = new Popup();

$(function () {

    var width = ((window.innerWidth) / 2) - 100

    $("#btn1").css("margin-left", width + "px")
    $("#fontP").css("margin-left", (width - 150) + "px")
    $("#fontP").css("margin-bottom", 20 + "px")
    $("#ttt").css("margin-left", (width - 280) + "px")
    $("#ttt").css("margin-bottom", 20 + "px")
    $("#footer1").css("margin-left", (width - 30) + "px")
    $("#footer2").css("margin-left", (width - 60) + "px")
    $("table td").css("background-color", "#F7EED6")
    $("table input").css("background-color", "#F7EED6")
    $("table input").not("#applicantApplicationPost").css("font-size", "15px")
    $("table textarea").css("font-size", "18px")
    $("table textarea").attr("cols", "60")
    $("table input").not("#n2").not("#r2").not("#w2").not("#a2").not("#n3").not("#r3").not("#w3").not("#a3").attr("placeholder", "必填项目")
    $("table select").css("background-color", "#F7EED6")
    $("table textarea").css("background-color", "#F7EED6")
    //初始化一些必要字段的必须值
    initField()

})


function openFileDialog() {

    $("#identityCardImage").click()
}

function fileSelected() {

    var fbutton = $("#identityCardImage")[0];

    var reader = new FileReader();

    var file = fbutton.files[0];
    reader.readAsDataURL(file);

    $.ajaxFileUpload({
        type: "POST",
        url: "https://www.xingdongqi.com/api/file/userApplication/uploadFile",
        data: {"fileName": file.name},//要传到后台的参数，没有可以不写
        secureuri: false,//是否启用安全提交，默认为false
        fileElementId: "identityCardImage",//文件选择框的id属性
        dataType: 'json',//服务器返回的格式
        headers: {
            "token": getCookie("token")
        },
        async: false,
        success: function (data) {
            if (data.code == 0) {
                var htmlUrl = "";

                htmlUrl = "<img src='" + data.data.path + "' data-url='" + data.data.path + "' style='width: 180px; height: 180px ; margin-top: 3px;margin-left:2px'/>"

                $("#identityCardArea").empty();

                $("#identityCardArea").append(htmlUrl);

            } else {
                if(data.data.code == 500){
                    popup.alert("上传告示", "上传文件大于2M，请重新上传")
                }

            }
        },
        error: function (data, status, e) {
            //coding
        }
    });

}

function delPhone(obj, event) {
    event.preventDefault();
    $(obj).parent().remove();
    popup.alert("删除告示", "删除成功")
}

function openFileDialog1() {

    $("#diplomaImage").click()
}

function fileSelected1() {

    var fbutton = $("#diplomaImage")[0];

    var reader = new FileReader();

    var file = fbutton.files[0];
    reader.readAsDataURL(file);

    $.ajaxFileUpload({
        type: "POST",
        url: "https://www.xingdongqi.com/api/file/userApplication/uploadFile",
        data: {"fileName": file.name},//要传到后台的参数，没有可以不写
        secureuri: false,//是否启用安全提交，默认为false
        headers: {
            "token": getCookie("token")
        },
        fileElementId: "diplomaImage",//文件选择框的id属性
        dataType: 'json',//服务器返回的格式
        async: false,
        success: function (data) {
            if (data.code == 0) {
                var htmlUrl = "";

                htmlUrl = "<img src='" + data.data.path + "' data-url='" + data.data.path + "' style='width: 180px; height: 180px ; margin-top: 3px;margin-left:2px'/>"

                $("#diplomaImageArea").empty();

                $("#diplomaImageArea").append(htmlUrl);
            } else {
                if(data.data.code == 500){
                    popup.alert("上传告示", "上传文件大于2M，请重新上传")
                }
            }
        },
        error: function (data, status, e) {
            //coding
        }
    });

}

function openFileDialog2(e) {

    $("#peronImage").click()
}

function fileSelected2() {

    var fbutton = $("#peronImage")[0];

    var reader = new FileReader();

    var file = fbutton.files[0];
    reader.readAsDataURL(file);

    $.ajaxFileUpload({
        type: "POST",
        url: "https://www.xingdongqi.com/api/file/userApplication/uploadFile",
        data: {"fileName": file.name},//要传到后台的参数，没有可以不写
        secureuri: false,//是否启用安全提交，默认为false
        fileElementId: "peronImage",//文件选择框的id属性
        headers: {
            "token": getCookie("token")
        },
        dataType: 'json',//服务器返回的格式
        async: false,
        success: function (data) {
            if (data.code == 0) {
                var htmlUrl = "";
                //coding
                //data.data.path
                //”javascript:return false
                htmlUrl = "<img src='" + data.data.path + "' data-url='" + data.data.path + "' style='width: 108px; height: 178px ; margin-top: 3px;margin-left:2px'/>"

                $("#peronImageArea").empty();

                $("#peronImageArea").append(htmlUrl);
            } else {
                if(data.data.code == 500){
                    popup.alert("上传告示", "上传文件大于2M，请重新上传")
                }
            }
        },
        error: function (data, status, e) {
            //coding
        }
    });

}

function openFileDialog3(e) {

    $("#identityCardImageReverse").click()
}

function fileSelected3() {

    var fbutton = $("#identityCardImageReverse")[0];

    var reader = new FileReader();

    var file = fbutton.files[0];
    reader.readAsDataURL(file);

    $.ajaxFileUpload({
        type: "POST",
        url: "https://www.xingdongqi.com/api/file/userApplication/uploadFile",
        data: {"fileName": file.name},//要传到后台的参数，没有可以不写
        secureuri: false,//是否启用安全提交，默认为false
        fileElementId: "identityCardImageReverse",//文件选择框的id属性
        dataType: 'json',//服务器返回的格式
        async: false,
        success: function (data) {
            if (data.code == 0) {
                var htmlUrl = "";
                //coding
                //data.data.path
                //”javascript:return false
                htmlUrl = "<img src='" + data.data.path + "' data-url='" + data.data.path + "' style='width: 180px; height: 180px ; margin-top: 3px;margin-left:2px'/>"

                $("#identityCardReverseArea").empty();

                $("#identityCardReverseArea").append(htmlUrl);
            } else {
                if(data.data.code == 500){
                    popup.alert("上传告示", "上传文件大于2M，请重新上传")
                }
            }
        },
        error: function (data, status, e) {
            //coding
        }
    });

}

function getParameter(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

function getParameterChinese(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURIComponent(r[2]);
    return null;
}

function initField() {

    laydate.render({
        elem: '#applicantBirth',
        type: 'month'
    });
    laydate.render({
        elem: '#applicantGraduatedTime',
        type: 'month'
    });

    //获取路径当中的id
    var id = getParameter("id");
    if (isEmpty123(id)) {
        popup.alert("错误提醒", "无法获取工作ID")
        return;
    }

    $.ajax({
        url: 'https://www.xingdongqi.com/api/postApplication/getById',
        type: 'get', //GET
        async: true,    //或false,是否异步
        headers: {
            "token": getCookie("token")
        },
        data: {
            postApplicationId: id
        },
        timeout: 50000,    //超时时间
        dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
        success: function (data) {
            //console.log(data)；
            if (data.code == 0) {
                $("#applicantApplicationPost").val(data.data.postName + " (" + data.data.postDuty + "," + data.data.applicationQualifications + ")")
            } else {
                popup.alert("异常提醒", "服务器异常，请稍后再试！")
            }
        },
        error: function () {
            popup.alert("异常提醒", "服务器异常，请稍后再试！")
        }
    })


    var user = JSON.parse(sessionStorage.getItem("user"))

    if (user == null || user == undefined || user == "") {
        popup.alert("错误提醒", "无法获取用户信息")
        return;
    }

    $("#userName").html(user.userName)

    var date = new Date()

    $("#year").html(date.getFullYear());
    $("#mouth").html(date.getMonth() + 1)
    $("#day").html(date.getDate())


}

function saveForm() {


    var applicantName = $("#applicantName").val()
    var applicantGender = $("#applicantGender").val()
    var applicantPhotoSrc = $("#peronImageArea img").data() == null ? "" : $("#peronImageArea img").data().url
    var applicantBirth = $("#applicantBirth").val()
    var applicantPoliticalStatus = $("#applicantPoliticalStatus").val()
    var applicantHouseholdRegister = $("#applicantHouseholdRegister").val()
    var applicantMarriageStatus = $("#applicantMarriageStatus").val()
    var applicantIdentityCard = $("#applicantIdentityCard").val()
    var applicantGraduatedTime = $("#applicantGraduatedTime").val()
    var applicantGraduatedCollege = $("#applicantGraduatedCollege").val()
    var applicantEducationalBackground = $("#applicantEducationalBackground").val()
    var applicantOccupationalQualification = $("#applicantOccupationalQualification").val()
    var applicantMajor = $("#applicantMajor").val()
    var applicantEnglishLevel = $("#applicantEnglishLevel").val()
    var applicantComputerLevel = $("#applicantComputerLevel").val()
    var applicantContactAddress = $("#applicantContactAddress").val()
    var applicantContactPhone = $("#applicantContactPhone").val()
    var applicantApplicationPost = $("#applicantApplicationPost").val()
    var applicantWorkExprience = $("#applicantWorkExprience").val()
    var applicantErgentContact = $("#applicantErgentContact").val()
    var applicantErgentPhone = $("#applicantErgentPhone").val()
    var applicantFamilyRelationship = ""
    var applicantIdentityCardPhoneSrc = $("#identityCardArea img").data() == null ? "" : $("#identityCardArea img").data().url
    var applicantIdentityCardPhoneReverseSrc = $("#identityCardReverseArea img").data() == null ? "" : $("#identityCardReverseArea img").data().url
    var applicantDiplomaSrc = $("#diplomaImageArea img").data() == null ? "" : $("#diplomaImageArea img").data().url
    var applicantSignName = $("#userName").html()
    var applicantSignTime = $("#year").html() + "年" + $("#mouth").html() + "月" + $("#day").html() + "日"
    var userId = JSON.parse(sessionStorage.getItem("user")) == null ? "" : JSON.parse(sessionStorage.getItem("user")).id
    var postApplicationId = getParameter("id")


    applicantFamilyRelationship = applicantFamilyRelationshipMethod().join(",");

    if (isEmpty123(applicantName) || isEmpty123(applicantGender) || isEmpty123(applicantPhotoSrc) || isEmpty123(applicantBirth) || isEmpty123(applicantPoliticalStatus) || isEmpty123(applicantHouseholdRegister) ||
        isEmpty123(applicantMarriageStatus) || isEmpty123(applicantIdentityCard) || isEmpty123(applicantGraduatedTime) || isEmpty123(applicantGraduatedCollege) || isEmpty123(applicantEducationalBackground) || isEmpty123(applicantOccupationalQualification) ||
        isEmpty123(applicantMajor) || isEmpty123(applicantContactAddress) || isEmpty123(applicantContactPhone) || isEmpty123(applicantApplicationPost) || isEmpty123(applicantErgentContact) || isEmpty123(applicantErgentPhone) ||
        isEmpty123(applicantFamilyRelationship) || isEmpty123(applicantIdentityCardPhoneSrc) || isEmpty123(applicantIdentityCardPhoneReverseSrc) || isEmpty123(applicantDiplomaSrc) ||
        isEmpty123(applicantFamilyRelationship) || isEmpty123(applicantFamilyRelationship)) {
        popup.alert("温馨提示", "存在信息未填写，请确认！")
        return;
    }


    $.ajax({
        url: 'https://www.xingdongqi.com/api/userApplication/insertUserApplication',
        type: 'POST', //GET
        async: true,    //或false,是否异步
        headers: {
            "token": getCookie("token")
        },
        data: {
            applicantName: applicantName,
            applicantGender: applicantGender,
            applicantPhotoSrc: applicantPhotoSrc,
            applicantBirth: applicantBirth,
            applicantPoliticalStatus: applicantPoliticalStatus,
            applicantHouseholdRegister: applicantHouseholdRegister,
            applicantMarriageStatus: applicantMarriageStatus,
            applicantIdentityCard: applicantIdentityCard,
            applicantGraduatedTime: applicantGraduatedTime,
            applicantGraduatedCollege: applicantGraduatedCollege,
            applicantEducationalBackground: applicantEducationalBackground,
            applicantOccupationalQualification: applicantOccupationalQualification,
            applicantMajor: applicantMajor,
            applicantEnglishLevel: applicantEnglishLevel,
            applicantComputerLevel: applicantComputerLevel,
            applicantContactAddress: applicantContactAddress,
            applicantContactPhone: applicantContactPhone,
            applicantApplicationPost: applicantApplicationPost,
            applicantWorkExprience: applicantWorkExprience,
            applicantErgentContact: applicantErgentContact,
            applicantErgentPhone: applicantErgentPhone,
            applicantFamilyRelationship: applicantFamilyRelationship,
            applicantIdentityCardPhoneSrc: applicantIdentityCardPhoneSrc,
            applicantIdentityCardPhoneReverseSrc: applicantIdentityCardPhoneReverseSrc,
            applicantDiplomaSrc: applicantDiplomaSrc,
            applicantSignName: applicantSignName,
            applicantSignTime: applicantSignTime,
            userId: userId,
            postApplicationId: postApplicationId

        },
        timeout: 50000,    //超时时间
        dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
        success: function (data) {
            //console.log(data)；
            if (data.code == 0) {
                popup.alert("提交告示", "已提交，请耐心等待！")
                setTimeout(function () {
                    window.location.href = "/payInfo.html?id=" + data.data
                }, 1000)
            } else {
                popup.alert("异常提醒", "服务器异常，请稍后再试！")
            }
        },
        error: function () {
            popup.alert("异常提醒", "服务器异常，请稍后再试！")
        }
    })
}


function applicantFamilyRelationshipMethod() {

    var t1 = "";
    var t2 = "";
    var t3 = "";
    var t1Controller = false;
    var t2Controller = false;
    var t3Controller = false;
    var list = new Array()

    $("#t1 input").each(function () {
        if (this.value) {
            t1Controller = true
            return
        }
    })

    $("#t2 input").each(function () {
        if (this.value) {
            t2Controller = true
            return
        }
    })

    $("#t3 input").each(function () {
        if (this.value) {
            t3Controller = true
            return
        }
    })

    if (t1Controller) {
        t1 = "["
        for (var i = 0; i < $("#t1 input").length; i++) {
            if (i == $("#t1 input").length - 1) {
                t1 = t1 + $("#t1 input")[i].value
            } else {
                t1 = t1 + $("#t1 input")[i].value + ","
            }
        }
        t1 = t1 + "]"
        list.push(t1)
    }

    if (t2Controller) {
        t2 = "["
        for (var i = 0; i < $("#t2 input").length; i++) {
            if (i == $("#t2 input").length - 1) {
                t2 = t2 + $("#t2 input")[i].value
            } else {
                t2 = t2 + $("#t2 input")[i].value + ","
            }
        }
        t2 = t2 + "]"
        list.push(t2)
    }

    if (t3Controller) {
        t3 = "["
        for (var i = 0; i < $("#t3 input").length; i++) {
            if (i == $("#t3 input").length - 1) {
                t3 = t3 + $("#t3 input")[i].value
            } else {
                t3 = t3 + $("#t3 input")[i].value + ","
            }
        }
        t3 = t3 + "]"
        list.push(t3)
    }
    return list;

}

