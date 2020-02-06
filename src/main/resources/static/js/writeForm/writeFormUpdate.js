var popup = new Popup();

$(function () {
    
    var width = ((window.innerWidth) / 2) - 100

    $("#btn1").css("margin-left", width + "px")

    var id = getParameter("id");

    if (isEmpty123(id)) {
        popup.alert("异常告示", "获取ID失败");
        return;
    }

    laydate.render({
        elem: '#applicantBirth',
        type: 'month'
    });
    laydate.render({
        elem: '#applicantGraduatedTime',
        type: 'month'
    });


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
            if (data.code === 0) {
                var data = data.data;
                $("#applicantName").val(data.applicantName);
                $("#applicantGender").val(data.applicantGender);
                $("#peronImageArea img").attr("src", data.applicantPhotoSrc).attr("data-url", data.applicantPhotoSrc);
                $("#applicantPoliticalStatus").val(data.applicantPoliticalStatus)
                $("#applicantBirth").val(data.applicantBirth);
                $("#applicantHouseholdRegister").val(data.applicantHouseholdRegister);
                $("#applicantMarriageStatus").val(data.applicantMarriageStatus);
                $("#applicantIdentityCard").val(data.applicantIdentityCard);
                $("#applicantGraduatedTime").val(data.applicantGraduatedTime);
                $("#applicantGraduatedCollege").val(data.applicantGraduatedCollege);
                $("#applicantEducationalBackground").val(data.applicantEducationalBackground);
                $("#applicantOccupationalQualification").val(data.applicantOccupationalQualification);
                $("#applicantMajor").val(data.applicantMajor);
                $("#applicantEnglishLevel").val(data.applicantEnglishLevel);
                $("#applicantComputerLevel").val(data.applicantComputerLevel);
                $("#applicantErgentContact").val(data.applicantErgentContact);
                $("#applicantErgentPhone").val(data.applicantErgentPhone);
                $("#applicantApplicationPost").val(data.applicantApplicationPost);
                $("#applicantWorkExprience").val(data.applicantWorkExprience);
                $("#applicantContactAddress").val(data.applicantContactAddress);
                $("#applicantContactPhone").val(data.applicantContactPhone);
                $("#userName").html(data.userName);

                var year = data.applicantSignTime.split("年")[0];
                var mouth = data.applicantSignTime.split("年")[1].split("月")[0]
                var day = data.applicantSignTime.split("年")[1].split("月")[1].split("日")[0]

                $("#year").html(year)
                $("#mouth").html(mouth)
                $("#day").html(day)
                $("#identityCardArea img").attr("src", data.applicantIdentityCardPhoneSrc).attr("data-url", data.applicantIdentityCardPhoneSrc);
                $("#identityCardReverseArea img").attr("src", data.applicantIdentityCardPhoneReverseSrc).attr("data-url", data.applicantIdentityCardPhoneReverseSrc);
                $("#diplomaImageArea img").attr("src", data.applicantDiplomaSrc).attr("data-url", data.applicantDiplomaSrc);

                var relation = data.applicantFamilyRelationship.replace(/\[/g, '').replace(/\]/g, '').split(",")

                var j = 0;
                var k = 0;

                for (var i = 0; i < relation.length; i++) {
                    k = k + 1;
                    if (i % 4 == 0) {
                        j = j + 1
                        k = 0;
                    }

                    switch (k) {
                        case 0 :
                            $("#t" + j + " td").eq(k).html('<input value="' + relation[i] + '" style="width: 70px;margin-top: 11px" id="n' + (k + 1) + '"/>');
                            break;
                        case 1 :
                            $("#t" + j + " td").eq(k).html('<input value="' + relation[i] + '" style="width: 70px;margin-top: 11px" id="r' + (k + 1) + '"/>');
                            break;
                        case 2 :
                            $("#t" + j + " td").eq(k).html('<input value="' + relation[i] + '" style="width: 70px;margin-top: 11px" id="w' + (k + 1) + '"/>');
                            break;
                        case 3 :
                            $("#t" + j + " td").eq(k).html('<input value="' + relation[i] + '" style="width: 70px;margin-top: 11px" id="a' + (k + 1) + '"/>');
                            break;
                    }


                }

            } else {
                popup.alert("错误提醒", data.msg)
            }
        },
        error: function () {
            alert("服务器异常，请稍后再试！")
        }
    })

})

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
        url: "https://www.xingdongqi.com/file/userApplication/uploadFile",
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
        url: "https://www.xingdongqi.com/file/userApplication/uploadFile",
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
        url: "https://www.xingdongqi.com/file/userApplication/uploadFile",
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
                //coding
            }
        },
        error: function (data, status, e) {
            //coding
        }
    });

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
        url: 'https://www.xingdongqi.com/api/userApplication/updateApplication',
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
            id: postApplicationId

        },
        timeout: 50000,    //超时时间
        dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
        success: function (data) {
            //console.log(data)；
            if (data.code == 0) {
                popup.alert("提交告示", "已提交，请耐心等待！")
                setTimeout(function () {

                    window.location.href = "/findSignUpInfo"
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
