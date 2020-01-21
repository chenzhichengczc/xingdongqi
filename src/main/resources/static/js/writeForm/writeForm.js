var popup = new Popup();

$(function () {

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
        url: "http://localhost:8080/userApplication/uploadFile",
        data: {"fileName": file.name},//要传到后台的参数，没有可以不写
        secureuri: false,//是否启用安全提交，默认为false
        fileElementId: "identityCardImage",//文件选择框的id属性
        dataType: 'json',//服务器返回的格式
        async: false,
        success: function (data) {
            if (data.code == 0) {
                var htmlUrl = "";

                htmlUrl = "<img src='" + data.data.path + "' data-url='" + data.data.path + "' style='width: 100px; height: 100px ; margin-top: 3px;margin-left:2px'/>"

                $("#identityCardArea").empty();

                $("#identityCardArea").append(htmlUrl);

            } else {
                //coding
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
        url: "http://localhost:8080/userApplication/uploadFile",
        data: {"fileName": file.name},//要传到后台的参数，没有可以不写
        secureuri: false,//是否启用安全提交，默认为false
        fileElementId: "diplomaImage",//文件选择框的id属性
        dataType: 'json',//服务器返回的格式
        async: false,
        success: function (data) {
            if (data.code == 0) {
                var htmlUrl = "";

                htmlUrl = "<img src='" + data.data.path + "' data-url='" + data.data.path + "' style='width: 100px; height: 100px ; margin-top: 3px;margin-left:2px'/>"

                $("#diplomaImageArea").empty();

                $("#diplomaImageArea").append(htmlUrl);
            } else {
                //coding
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
        url: "http://localhost:8080/userApplication/uploadFile",
        data: {"fileName": file.name},//要传到后台的参数，没有可以不写
        secureuri: false,//是否启用安全提交，默认为false
        fileElementId: "peronImage",//文件选择框的id属性
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
                //coding
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
        url: "http://localhost:8080/userApplication/uploadFile",
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
                htmlUrl = "<img src='" + data.data.path + "' data-url='" + data.data.path + "' style='width: 100px; height: 100px ; margin-top: 3px;margin-left:2px'/>"

                $("#identityCardReverseArea").empty();

                $("#identityCardReverseArea").append(htmlUrl);
            } else {
                //coding
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
        url: 'http://localhost:8080/postApplication/getById',
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
                $("#applicantApplicationPost").val(data.data.postName)
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

    // var applicantName = $("#applicantName").val()
    // var applicantGender = $("#applicantGender").val()
    // var applicantPhotoSrc = $("#peronImageArea img").data() == null ? "" : $("#peronImageArea img").data().url
    // var applicantBirth = $("#applicantBirth").val()
    // var applicantPoliticalStatus = $("#applicantPoliticalStatus").val()
    // var applicantHouseholdRegister = $("#applicantHouseholdRegister").val()
    // var applicantMarriageStatus = $("#applicantMarriageStatus").val()
    // var applicantIdentityCard = $("#applicantIdentityCard").val()
    // var applicantGraduatedTime = $("#applicantGraduatedTime").val()
    // var applicantGraduatedCollege = $("#applicantGraduatedCollege").val()
    // var applicantEducationalBackground = $("#applicantEducationalBackground").val()
    // var applicantOccupationalQualification = $("#applicantOccupationalQualification").val()
    // var applicantMajor = $("#applicantMajor").val()
    // var applicantEnglishLevel = $("#applicantEnglishLevel").val()
    // var applicantComputerLevel = $("#applicantComputerLevel").val()
    // var applicantContactAddress = $("#applicantContactAddress").val()
    // var applicantContactPhone = $("#applicantContactPhone").val()
    // var applicantApplicationPost = $("#applicantApplicationPost").val()
    // var applicantWorkExprience = $("#applicantWorkExprience").val()
    // var applicantErgentContact = $("#applicantErgentContact").val()
    // var applicantErgentPhone = $("#applicantErgentPhone").val()
    // var applicantFamilyRelationship = ""
    // var applicantIdentityCardPhoneSrc = $("#identityCardArea img").data() == null ? "" : $("#identityCardArea img").data().url
    // var applicantIdentityCardPhoneReverseSrc = $("#identityCardReverseArea img").data() == null ? "" : $("#identityCardReverseArea img").data().url
    // var applicantDiplomaSrc = $("#diplomaImageArea img").data() == null ? "" : $("#diplomaImageArea img").data().url
    // var applicantSignName = $("#userName").html()
    // var applicantSignTime = $("#year").html() + "年" + $("#mouth").html() + "月" + $("#day").html() + "日"
    // var userId = JSON.parse(sessionStorage.getItem("user")) == null ? "" : JSON.parse(sessionStorage.getItem("user")).id
    // var postApplicationId = getParameter("id")
    //
    //
    // applicantFamilyRelationship = applicantFamilyRelationshipMethod().join(",");
    // debugger;

    // var h = $("#table").height();
    // var w = $("#table").width();
    //
    // var canvas = document.createElement("canvas");
    // canvas.width = h * 3;
    // canvas.height = w * 3;
    //
    // canvas.style.width = h * 3 + "px"
    // canvas.style.height = w * 3 + "px"
    // canvas.style.backgroundColor = "#fff"
    //
    // html2canvas($("#table"),{
    //     allowTaint: true,
    //     taintTest: false,
    //     canvas: canvas,
    //     onrendered: function(canvas) {
    //         var imgUrl =  canvas.toDataURL('image/jpg');
    //     }
    // })

    var target = $("#table")
    var copy = target.clone();
    copy.width(target.width() + "px");
    copy.height(target.height() + "px");
    $('body').append(copy);
    html2canvas(copy, {
        allowTaint: true,
        taintTest: false,
        onrendered : function(canvas) {
            var img = canvas.toDataURL("image/png");
            copy.remove();

        },
        background:"#fff"
    });

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