var popup = new Popup();

function getParameter(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

//init
$(function () {

        var user = JSON.parse(sessionStorage.getItem("user"));


        $("#callSpan").html(user == null ? "" : user.userName + ',' + getQuantum())

        //初始化下拉列表
        initSelect();

        var totalPage = '';
        //var totalPage = 50;
        var totalRecords = '';
        var pageNo = getParameter('pno');
        if (!pageNo) {
            pageNo = 1;
        }


        $.ajax({
            url: 'https://www.xingdongqi.com/api/postApplication/list',
            type: 'get', //GET
            async: false,    //或false,是否异步
            headers: {
                "token": getCookie("token")
            },
            data: {
                pageNo: 1,
                pageSize: 10
            },
            timeout: 50000,    //超时时间
            dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
            success: function (data) {
                //console.log(data)；

                if (data.code == 0) {

                    totalRecords = data.data.total;
                    totalPage = data.data.pages

                    var data = data.data.list


                    var html = "";

                    for (var i = 0; i < data.length; i++) {
                        html = '<tr role="row" class="x-grid-row f-grid-row x-grid-data-row" tabindex="-1">'
                            + '<td role="gridcell" class="x-grid-cell x-grid-td x-grid-cell-ctl00_ContentPlaceHolder1_Grid1_ctl00 x-grid-cell-row-numberer x-grid-cell-special x-unselectable x-grid-cell-row-numberer x-grid-cell-special">'
                            + '<div unselectable="on" class="x-grid-cell-inner x-grid-cell-inner-row-numberer"style="text-align:right;">#{postCode}</div>'
                            + '</td>'
                            + '<td role="gridcell" class="x-grid-cell x-grid-td x-grid-cell-ctl00_ContentPlaceHolder1_Grid1_ctl01 x-unselectable">'
                            + '<div unselectable="on" class="x-grid-cell-inner"><span>#{postName}</span></div>'
                            + '</td>'
                            + '<td role="gridcell" class="x-grid-cell x-grid-td x-grid-cell-ctl00_ContentPlaceHolder1_Grid1_ctl01 x-unselectable">'
                            + '<div unselectable="on" class="x-grid-cell-inner"><span>#{hireDepartment}</span></div>'
                            + '</td>'
                            + '<td role="gridcell" class="x-grid-cell x-grid-td x-grid-cell-ctl00_ContentPlaceHolder1_Grid1_ctl01 x-unselectable">'
                            + '<div unselectable="on" class="x-grid-cell-inner"><span>#{applicationDeadline}</span></div>'
                            + '</td>'
                            + '<td role="gridcell" class="x-grid-cell x-grid-td x-grid-cell-ctl00_ContentPlaceHolder1_Grid1_ctl01 x-unselectable">'
                            + '<div unselectable="on" class="x-grid-cell-inner"><span>#{postDuty}</span></div>'
                            + '</td>'
                            + '<td role="gridcell" class="x-grid-cell x-grid-td x-grid-cell-ctl00_ContentPlaceHolder1_Grid1_ctl01 x-unselectable">'
                            + '<div unselectable="on" class="x-grid-cell-inner"><span>#{applicationQualifications}</span></div>'
                            + '</td>'
                            + '<td role="gridcell" class="x-grid-cell x-grid-td x-grid-cell-ctl00_ContentPlaceHolder1_Grid1_ctl02 x-unselectable">'
                            + '<div unselectable="on" class="x-grid-cell-inner" ><span>#{hireAmount}</span></div>'
                            + '</td>'
                            + '<td role="gridcell" class="x-grid-cell x-grid-td x-grid-cell-ctl00_ContentPlaceHolder1_Grid1_ctl02 x-unselectable">'
                            + '<div unselectable="on" class="x-grid-cell-inner" ><span>#{major}</span></div>'
                            + '</td>'
                            + '<td role="gridcell" class="x-grid-cell x-grid-td x-grid-cell-ctl00_ContentPlaceHolder1_Grid1_ctl02 x-unselectable">'
                            + '<div unselectable="on" class="x-grid-cell-inner" ><span>#{educationRequiremen}</span></div>'
                            + '</td>'
                            + '<td role="gridcell" class="x-grid-cell x-grid-td x-grid-cell-ctl00_ContentPlaceHolder1_Grid1_ctl02 x-unselectable">'
                            + '<div unselectable="on" class="x-grid-cell-inner" ><span>#{age}</span></div>'
                            + '</td>'
                            + '<td role="gridcell" class="x-grid-cell x-grid-td x-grid-cell-ctl00_ContentPlaceHolder1_Grid1_ctl02 x-unselectable">'
                            + '<div unselectable="on" class="x-grid-cell-inner" ><span>#{otherRequirement}</span></div>'
                            + '</td>'
                            + '<td role="gridcell" class="x-grid-cell x-grid-td x-grid-cell-ctl00_ContentPlaceHolder1_Grid1_ctl02 x-unselectable">'
                            + '<div unselectable="on" class="x-grid-cell-inner" ><span>#{recruitment}</span></div>'
                            + '</td>'
                            if(new Date(data[i].applicationDeadline) - new Date() > 0){
                                html = html + '<td role="gridcell" class="x-grid-cell x-grid-td x-grid-cell-ctl00_ContentPlaceHolder1_Grid1_ctl08 x-grid-cell-last x-unselectable ">'
                                + '<div unselectable="on" class="x-grid-cell-inner" ><a href="javascript:void(0)" style="color: green;font-weight: bold" onclick="goWriteForm(#{id},\'#{postName}\')">申请</a>'
                            }else{
                                html = html + '<td role="gridcell" class="x-grid-cell x-grid-td x-grid-cell-ctl00_ContentPlaceHolder1_Grid1_ctl08 x-grid-cell-last x-unselectable ">'
                                    + '<div unselectable="on" class="x-grid-cell-inner" ><a href="javascript:void(0)" style="color: darkred;font-weight: bold">已过期</a>'
                            }

                            html = html + '</div>'
                            + '</td>'
                            + '</tr>'

                        html = html.replace(/#{id}/g, data[i].id)
                        html = html.replace(/#{postCode}/g, data[i].postCode)
                        html = html.replace(/#{postName}/g, data[i].postName)
                        html = html.replace(/#{hireDepartment}/g, data[i].hireDepartment)
                        html = html.replace(/#{applicationDeadline}/g, data[i].applicationDeadline)
                        html = html.replace(/#{postDuty}/g, data[i].postDuty)
                        html = html.replace(/#{applicationQualifications}/g, data[i].applicationQualifications)
                        html = html.replace(/#{hireAmount}/g, data[i].hireAmount)
                        html = html.replace(/#{major}/g, data[i].major)
                        html = html.replace(/#{educationRequiremen}/g, data[i].educationRequirement)
                        html = html.replace(/#{age}/g, data[i].ageRange)
                        html = html.replace(/#{otherRequirement}/g, data[i].otherRequirement)
                        html = html.replace(/#{recruitment}/g, data[i].recruitment)


                        $("#gridview-1024-body").append(html)

                    }

                    kp(pageNo, totalPage, totalRecords)

                }
            },
            error: function () {
                popup.alert("异常提醒", "服务器异常，请稍后再试！")
            }
        })


    }
);

function goWriteForm(id, postName) {
    window.open("/writeForm?id=" + id + "&postName=" + postName)
}

function kp(pageNo, totalPage, totalRecords) {
    var totalPage = totalPage;
    //var totalPage = 50;
    var totalRecords = totalRecords;
    var pageNo = pageNo
    if (!pageNo) {
        pageNo = 1;
    }
    //生成分页
    //有些参数是可选的，比如lang，若不传有默认值
    kkpager.generPageHtml({
        pno: pageNo,//总页码
        mode: 'click', //设置为click模式
        total: totalPage,
        //总数据条数
        totalRecords: totalRecords,
        //链接前部
        hrefFormer: 'pager_test',
        isShowTotalRecords: true,
        isShowTotalPage: true,
        //链接尾部
        hrefLatter: '.html',
        click: function (n) {

            var postName = $("#postName").val();
            var hireDepartment = $("#hireDepartment").val();
            var recruitment = $("#recruitment").val();
            var educationRequirement = $("#educationRequirement").val();
            var major = $("#major" +
                "").val();
            $.ajax({
                url: "https://www.xingdongqi.com/api/postApplication/list",
                data: {
                    pageNo: n, pageSize: 10, postName: postName,
                    hireDepartment: hireDepartment, recruitment: recruitment,
                    educationRequirement: educationRequirement,
                    major: major
                },
                headers: {
                    "token": getCookie("token")
                },
                type: 'get',
                dataType: 'json',
                success: function (data, status) {
                    if (data.code == 0) {
                        $("#gridview-1024-body").empty();
                        $("#page").val(n);
                        $("#pageSize").val(1);
                        totalRecords = data.data.total;
                        totalPage = data.data.pages

                        var data = data.data.list;

                        var html = "";

                        for (var i = 0; i < data.length; i++) {
                            html = '<tr role="row" class="x-grid-row f-grid-row x-grid-data-row" tabindex="-1">'
                                + '<td role="gridcell" class="x-grid-cell x-grid-td x-grid-cell-ctl00_ContentPlaceHolder1_Grid1_ctl00 x-grid-cell-row-numberer x-grid-cell-special x-unselectable x-grid-cell-row-numberer x-grid-cell-special">'
                                + '<div unselectable="on" class="x-grid-cell-inner x-grid-cell-inner-row-numberer"style="text-align:right;">#{postCode}</div>'
                                + '</td>'
                                + '<td role="gridcell" class="x-grid-cell x-grid-td x-grid-cell-ctl00_ContentPlaceHolder1_Grid1_ctl01 x-unselectable">'
                                + '<div unselectable="on" class="x-grid-cell-inner"><span>#{postName}</span></div>'
                                + '</td>'
                                + '<td role="gridcell" class="x-grid-cell x-grid-td x-grid-cell-ctl00_ContentPlaceHolder1_Grid1_ctl01 x-unselectable">'
                                + '<div unselectable="on" class="x-grid-cell-inner"><span>#{hireDepartment}</span></div>'
                                + '</td>'
                                + '<td role="gridcell" class="x-grid-cell x-grid-td x-grid-cell-ctl00_ContentPlaceHolder1_Grid1_ctl01 x-unselectable">'
                                + '<div unselectable="on" class="x-grid-cell-inner"><span>#{applicationDeadline}</span></div>'
                                + '</td>'
                                + '<td role="gridcell" class="x-grid-cell x-grid-td x-grid-cell-ctl00_ContentPlaceHolder1_Grid1_ctl01 x-unselectable">'
                                + '<div unselectable="on" class="x-grid-cell-inner"><span>#{postDuty}</span></div>'
                                + '</td>'
                                + '<td role="gridcell" class="x-grid-cell x-grid-td x-grid-cell-ctl00_ContentPlaceHolder1_Grid1_ctl01 x-unselectable">'
                                + '<div unselectable="on" class="x-grid-cell-inner"><span>#{applicationQualifications}</span></div>'
                                + '</td>'
                                + '<td role="gridcell" class="x-grid-cell x-grid-td x-grid-cell-ctl00_ContentPlaceHolder1_Grid1_ctl02 x-unselectable">'
                                + '<div unselectable="on" class="x-grid-cell-inner" ><span>#{hireAmount}</span></div>'
                                + '</td>'
                                + '<td role="gridcell" class="x-grid-cell x-grid-td x-grid-cell-ctl00_ContentPlaceHolder1_Grid1_ctl02 x-unselectable">'
                                + '<div unselectable="on" class="x-grid-cell-inner" ><span>#{major}</span></div>'
                                + '</td>'
                                + '<td role="gridcell" class="x-grid-cell x-grid-td x-grid-cell-ctl00_ContentPlaceHolder1_Grid1_ctl02 x-unselectable">'
                                + '<div unselectable="on" class="x-grid-cell-inner" ><span>#{educationRequiremen}</span></div>'
                                + '</td>'
                                + '<td role="gridcell" class="x-grid-cell x-grid-td x-grid-cell-ctl00_ContentPlaceHolder1_Grid1_ctl02 x-unselectable">'
                                + '<div unselectable="on" class="x-grid-cell-inner" ><span>#{age}</span></div>'
                                + '</td>'
                                + '<td role="gridcell" class="x-grid-cell x-grid-td x-grid-cell-ctl00_ContentPlaceHolder1_Grid1_ctl02 x-unselectable">'
                                + '<div unselectable="on" class="x-grid-cell-inner" ><span>#{otherRequirement}</span></div>'
                                + '</td>'
                                + '<td role="gridcell" class="x-grid-cell x-grid-td x-grid-cell-ctl00_ContentPlaceHolder1_Grid1_ctl02 x-unselectable">'
                                + '<div unselectable="on" class="x-grid-cell-inner" ><span>#{recruitment}</span></div>'
                                + '</td>'
                                + '<td role="gridcell" class="x-grid-cell x-grid-td x-grid-cell-ctl00_ContentPlaceHolder1_Grid1_ctl08 x-grid-cell-last x-unselectable ">'
                                + '<div unselectable="on" class="x-grid-cell-inner" ><a href="javascript:void(0)" onclick="goWriteForm(#{id},\'#{postName}\')">申请</a>'
                                + '</div>'
                                + '</td>'
                                + '</tr>'

                            html = html.replace(/#{id}/g, data[i].id)
                            html = html.replace(/#{postCode}/g, data[i].postCode)
                            html = html.replace(/#{postName}/g, data[i].postName)
                            html = html.replace(/#{hireDepartment}/g, data[i].hireDepartment)
                            html = html.replace(/#{applicationDeadline}/g, data[i].applicationDeadline)
                            html = html.replace(/#{postDuty}/g, data[i].postDuty)
                            html = html.replace(/#{applicationQualifications}/g, data[i].applicationQualifications)
                            html = html.replace(/#{hireAmount}/g, data[i].hireAmount)
                            html = html.replace(/#{major}/g, data[i].major)
                            html = html.replace(/#{educationRequiremen}/g, data[i].educationRequirement)
                            html = html.replace(/#{age}/g, data[i].ageRange)
                            html = html.replace(/#{otherRequirement}/g, data[i].otherRequirement)
                            html = html.replace(/#{recruitment}/g, data[i].recruitment)


                            $("#gridview-1024-body").append(html)

                        }
                        kp(n, totalPage, totalRecords)
                    }
                },
                fail: function (err, status) {
                    console.log(err)
                }
            })
            this.selectPage(n, totalPage, totalRecords);
        },
        //getHref是在click模式下链接算法，一般不需要配置，默认代码如下
        getHref: function (n) {
            return '#';
        }
    }, true);
}

function queryCriteria() {


    var totalPage = '';
    //var totalPage = 50;
    var totalRecords = '';
    var pageNo = getParameter("pageNo");
    if (!pageNo) {
        pageNo = 1;
    }

    var postName = $("#postName").val();
    var hireDepartment = $("#hireDepartment").val();
    var recruitment = $("#recruitment").val();
    var educationRequirement = $("#educationRequirement").val();
    var major = $("#major").val();
    $.ajax({
        url: "https://www.xingdongqi.com/api/postApplication/list",
        data: {
            pageNo: 1, pageSize: 10, postName: postName,
            hireDepartment: hireDepartment, recruitment: recruitment,
            educationRequirement: educationRequirement,
            major: major
        },
        headers: {
            "token": getCookie("token")
        },
        type: 'get',
        dataType: 'json',
        success: function (data, status) {
            if (data.code == 0) {
                $("#gridview-1024-body").empty();
                $("#pageNo").val(pageNo);
                $("#pageSize").val(10);
                totalRecords = data.data.total;
                totalPage = data.data.pages

                var data = data.data.list;

                var html = "";

                for (var i = 0; i < data.length; i++) {
                    html = '<tr role="row" class="x-grid-row f-grid-row x-grid-data-row" tabindex="-1">'
                        + '<td role="gridcell" class="x-grid-cell x-grid-td x-grid-cell-ctl00_ContentPlaceHolder1_Grid1_ctl00 x-grid-cell-row-numberer x-grid-cell-special x-unselectable x-grid-cell-row-numberer x-grid-cell-special">'
                        + '<div unselectable="on" class="x-grid-cell-inner x-grid-cell-inner-row-numberer"style="text-align:right;">#{postCode}</div>'
                        + '</td>'
                        + '<td role="gridcell" class="x-grid-cell x-grid-td x-grid-cell-ctl00_ContentPlaceHolder1_Grid1_ctl01 x-unselectable">'
                        + '<div unselectable="on" class="x-grid-cell-inner"><span>#{postName}</span></div>'
                        + '</td>'
                        + '<td role="gridcell" class="x-grid-cell x-grid-td x-grid-cell-ctl00_ContentPlaceHolder1_Grid1_ctl01 x-unselectable">'
                        + '<div unselectable="on" class="x-grid-cell-inner"><span>#{hireDepartment}</span></div>'
                        + '</td>'
                        + '<td role="gridcell" class="x-grid-cell x-grid-td x-grid-cell-ctl00_ContentPlaceHolder1_Grid1_ctl01 x-unselectable">'
                        + '<div unselectable="on" class="x-grid-cell-inner"><span>#{applicationDeadline}</span></div>'
                        + '</td>'
                        + '<td role="gridcell" class="x-grid-cell x-grid-td x-grid-cell-ctl00_ContentPlaceHolder1_Grid1_ctl01 x-unselectable">'
                        + '<div unselectable="on" class="x-grid-cell-inner"><span>#{postDuty}</span></div>'
                        + '</td>'
                        + '<td role="gridcell" class="x-grid-cell x-grid-td x-grid-cell-ctl00_ContentPlaceHolder1_Grid1_ctl01 x-unselectable">'
                        + '<div unselectable="on" class="x-grid-cell-inner"><span>#{applicationQualifications}</span></div>'
                        + '</td>'
                        + '<td role="gridcell" class="x-grid-cell x-grid-td x-grid-cell-ctl00_ContentPlaceHolder1_Grid1_ctl02 x-unselectable">'
                        + '<div unselectable="on" class="x-grid-cell-inner" ><span>#{hireAmount}</span></div>'
                        + '</td>'
                        + '<td role="gridcell" class="x-grid-cell x-grid-td x-grid-cell-ctl00_ContentPlaceHolder1_Grid1_ctl02 x-unselectable">'
                        + '<div unselectable="on" class="x-grid-cell-inner" ><span>#{major}</span></div>'
                        + '</td>'
                        + '<td role="gridcell" class="x-grid-cell x-grid-td x-grid-cell-ctl00_ContentPlaceHolder1_Grid1_ctl02 x-unselectable">'
                        + '<div unselectable="on" class="x-grid-cell-inner" ><span>#{educationRequiremen}</span></div>'
                        + '</td>'
                        + '<td role="gridcell" class="x-grid-cell x-grid-td x-grid-cell-ctl00_ContentPlaceHolder1_Grid1_ctl02 x-unselectable">'
                        + '<div unselectable="on" class="x-grid-cell-inner" ><span>#{age}</span></div>'
                        + '</td>'
                        + '<td role="gridcell" class="x-grid-cell x-grid-td x-grid-cell-ctl00_ContentPlaceHolder1_Grid1_ctl02 x-unselectable">'
                        + '<div unselectable="on" class="x-grid-cell-inner" ><span>#{otherRequirement}</span></div>'
                        + '</td>'
                        + '<td role="gridcell" class="x-grid-cell x-grid-td x-grid-cell-ctl00_ContentPlaceHolder1_Grid1_ctl02 x-unselectable">'
                        + '<div unselectable="on" class="x-grid-cell-inner" ><span>#{recruitment}</span></div>'
                        + '</td>'
                        + '<td role="gridcell" class="x-grid-cell x-grid-td x-grid-cell-ctl00_ContentPlaceHolder1_Grid1_ctl08 x-grid-cell-last x-unselectable ">'
                        + '<div unselectable="on" class="x-grid-cell-inner" ><a href="javascript:void(0)" onclick="goWriteForm(#{id},\'#{postName}\')">申请</a>'
                        + '</div>'
                        + '</td>'
                        + '</tr>'

                    html = html.replace(/#{id}/g, data[i].id)
                    html = html.replace(/#{postCode}/g, data[i].postCode)
                    html = html.replace(/#{postName}/g, data[i].postName)
                    html = html.replace(/#{hireDepartment}/g, data[i].hireDepartment)
                    html = html.replace(/#{applicationDeadline}/g, data[i].applicationDeadline)
                    html = html.replace(/#{postDuty}/g, data[i].postDuty)
                    html = html.replace(/#{applicationQualifications}/g, data[i].applicationQualifications)
                    html = html.replace(/#{hireAmount}/g, data[i].hireAmount)
                    html = html.replace(/#{major}/g, data[i].major)
                    html = html.replace(/#{educationRequiremen}/g, data[i].educationRequirement)
                    html = html.replace(/#{age}/g, data[i].ageRange)
                    html = html.replace(/#{otherRequirement}/g, data[i].otherRequirement)
                    html = html.replace(/#{recruitment}/g, data[i].recruitment)


                    $("#gridview-1024-body").append(html)

                }
                kp(pageNo, totalPage, totalRecords)
            }
        }
    })
}

function initSelect() {
    
    console.log("token:" + getCookie("token"))
    $.ajax({
        url: 'https://www.xingdongqi.com/api/postApplication/getSelect',
        type: 'get', //GET
        async: false,    //或false,是否异步
        headers: {
            "token": getCookie("token")
        },
        data: {},
        timeout: 50000,    //超时时间
        dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
        success: function (data) {
            //console.log(data)；
            if (data.code == 0) {

                for (var i = 0; i < data.data.postNameList.length; i++) {
                    var html = "<option value='" + data.data.postNameList[i] + "'>" + data.data.postNameList[i] + "</option>"
                    $("select[name=postName]").append(html)
                }
                for (var i = 0; i < data.data.hireDepartmentList.length; i++) {
                    var html = "<option value='" + data.data.hireDepartmentList[i] + "'>" + data.data.hireDepartmentList[i] + "</option>"
                    $("select[name=hireDepartment]").append(html)
                }
                for (var i = 0; i < data.data.recruitmentList.length; i++) {
                    var html = "<option value='" + data.data.recruitmentList[i] + "'>" + data.data.recruitmentList[i] + "</option>"
                    $("select[name=recruitment]").append(html)
                }
                for (var i = 0; i < data.data.educationRequirementList.length; i++) {
                    var html = "<option value='" + data.data.educationRequirementList[i] + "'>" + data.data.educationRequirementList[i] + "</option>"
                    $("select[name=educationRequirement]").append(html)
                }
                for (var i = 0; i < data.data.majorList.length; i++) {
                    var html = "<option value='" + data.data.majorList[i] + "'>" + data.data.majorList[i] + "</option>"
                    $("select[name=major]").append(html)
                }

            } else {
                popup.alert("错误提醒", data.msg)
            }
        },
        error: function () {
            popup.alert("异常提醒", "服务器异常，请稍后再试！")
        }
    })

}
