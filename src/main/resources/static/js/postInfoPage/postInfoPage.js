function getParameter(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

//init
$(function () {

    $.ajax({
        url: 'http://localhost:8080/postApplication/list',
        type: 'get', //GET
        async: true,    //或false,是否异步
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
                        + '<td role="gridcell" class="x-grid-cell x-grid-td x-grid-cell-ctl00_ContentPlaceHolder1_Grid1_ctl08 x-grid-cell-last x-unselectable ">'
                        + '<div unselectable="on" class="x-grid-cell-inner" ><a onclick="applicationPost(#{id})">申请</a>'
                        + '</div>'
                        + '</td>'
                        + '</tr>'
                    
                    html = html.replace(/#{id}/g,data[i].id)
                    html = html.replace(/#{postCode}/g,data[i].postCode)
                    html = html.replace(/#{postName}/g,data[i].postName)
                    html = html.replace(/#{hireDepartment}/g,data[i].hireDepartment)
                    html = html.replace(/#{applicationDeadline}/g,data[i].applicationDeadline)
                    html = html.replace(/#{postDuty}/g,data[i].postDuty)
                    html = html.replace(/#{applicationQualifications}/g,data[i].applicationQualifications)
                    html = html.replace(/#{hireAmount}/g,data[i].hireAmount)
                    html = html.replace(/#{major}/g,data[i].major)
                    html = html.replace(/#{educationRequiremen}/g,data[i].educationRequirement)
                    html = html.replace(/#{age}/g,data[i].age)
                    html = html.replace(/#{otherRequirement}/g,data[i].otherRequirement)
                    html = html.replace(/#{recruitment}/g,data[i].recruitment)


                    $("#gridview-1024-body").append(html)

                }

            }
        },
        error: function () {
            alert("服务器异常，请稍后再试！")
        }
    })


});

function kp() {
    var totalPage = '3';
    //var totalPage = 50;
    var totalRecords = '25';
    var pageNo = getParameter('pno');
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
            //这里可以做自已的处理
            //...
            //处理完后可以手动条用selectPage进行页码选中切换
            // $("#page").val(n);
            // $("#pageSize").val(1);
            // $("#postInfoForm").submit();
            var postName = $("#postName").val();
            var departName = $("#departName").val();
            var postType = $("#postType").val();
            var educationRequirement = $("#educationRequirement").val();
            var majorRequirementy = $("#majorRequirementy").val();
            $.ajax({
                url: "/postInfoPage2",
                data: {
                    page: n, pageSize: 10, postName: postName,
                    departName: departName, postType: postType,
                    educationRequirement: educationRequirement,
                    majorRequirementy: majorRequirementy
                },
                type: 'get',
                dataType: 'json',
                success: function (data, status) {
                    if (data.code == 200) {
                        $("#page").val(n);
                        $("#pageSize").val(1);
                        var postInfoPage = data.postInfoPage;
                        totalPage = data.postInfoPage.totalPages;
                        totalRecords = data.postInfoPage.totalElements;
                        var htmlStr = "";
                        var htmlStr1 = "";
                        for (var i = 0; i < postInfoPage.content.length; i++) {
                            var postPagejs = postInfoPage.content[i];
                            var postType = "";
                            if (postPagejs.postType != null) {
                                postType = postPagejs.postType;
                            }
                            htmlStr1 += '<tr  role="row" th:id="gridview-1024-record-ext-record-' + i + '"'
                                + ' data-boundview="gridview-1024"'
                                + 'data-recordid="ext-record-63" data-recordindex="0"'
                                + 'class="x-grid-row f-grid-row x-grid-data-row" tabindex="-1">'
                                + '<td role="gridcell"'
                                + 'class="x-grid-cell x-grid-td x-grid-cell-ctl00_ContentPlaceHolder1_Grid1_ctl00 x-grid-cell-row-numberer x-grid-cell-special x-unselectable x-grid-cell-row-numberer x-grid-cell-special"'
                                + 'id="ext-gen1291">'
                                + '<div unselectable="on" class="x-grid-cell-inner x-grid-cell-inner-row-numberer"'
                                + 'style="text-align:right;"><span>' + postPagejs.postCode + '</span></div>'
                                + '</td>'
                                + '<td role="gridcell"'
                                + 'class="x-grid-cell x-grid-td x-grid-cell-ctl00_ContentPlaceHolder1_Grid1_ctl01 x-unselectable "'
                                + 'id="ext-gen1292">'
                                + ' <div unselectable="on" class="x-grid-cell-inner " style=""><span'
                                + '>' + postPagejs.postName + '</span></div>'
                                + '</td>'
                                + '<td role="gridcell"'
                                + 'class="x-grid-cell x-grid-td x-grid-cell-ctl00_ContentPlaceHolder1_Grid1_ctl02 x-unselectable "'
                                + ' id="ext-gen1293">'
                                + '<div unselectable="on" class="x-grid-cell-inner " ><span>' + postPagejs.departName + '</span></div>'
                                + '</td>'
                                + '<td role="gridcell"'
                                + 'class="x-grid-cell x-grid-td x-grid-cell-ctl00_ContentPlaceHolder1_Grid1_ctl03 x-unselectable "'
                                + 'id="ext-gen1294">'
                                + '<div unselectable="on" class="x-grid-cell-inner " ><span>' + postType + '</span></div>'
                                + ' </td>'
                                + '<td role="gridcell"'
                                + 'class="x-grid-cell x-grid-td x-grid-cell-ctl00_ContentPlaceHolder1_Grid1_ctl04 x-unselectable "'
                                + 'id="ext-gen1295">'
                                + '<div unselectable="on" class="x-grid-cell-inner " style="text-align:center;"><span>' + postPagejs.repuNumber + '</span></div>'
                                + '</td>'
                                + '<td role="gridcell"'
                                + 'class="x-grid-cell x-grid-td x-grid-cell-ctl00_ContentPlaceHolder1_Grid1_ctl05 x-unselectable "'
                                + 'id="ext-gen1296">'
                                + '<div unselectable="on" class="x-grid-cell-inner "><span>' + postPagejs.majorRequirementy + '</span></div>'
                                + '</td>'
                                + '<td role="gridcell"'
                                + 'class="x-grid-cell x-grid-td x-grid-cell-ctl00_ContentPlaceHolder1_Grid1_ctl05 x-unselectable ">'
                                + '<div unselectable="on" class="x-grid-cell-inner " ><span>' + postPagejs.postResearchDirection + '</span></div>'
                                + '</td><td role="gridcell"'
                                + 'class="x-grid-cell x-grid-td x-grid-cell-ctl00_ContentPlaceHolder1_Grid1_ctl05 x-unselectable ">'
                                + '<div unselectable="on" class="x-grid-cell-inner " ><span>' + postPagejs.postAge + '</span></div>'
                                + '</td>'
                                + '<td role="gridcell"'
                                + 'class="x-grid-cell x-grid-td x-grid-cell-ctl00_ContentPlaceHolder1_Grid1_ctl06 x-unselectable "'
                                + 'id="ext-gen1297">'
                                + '<div unselectable="on" class="x-grid-cell-inner " ><span>' + postPagejs.educationRequirement + '</span></div>'
                                + '</td>'
                                + '<td role="gridcell"'
                                + 'class="x-grid-cell x-grid-td x-grid-cell-ctl00_ContentPlaceHolder1_Grid1_ctl07 x-unselectable "'
                                + 'id="ext-gen1298">'
                                + '<div unselectable="on" class="x-grid-cell-inner " ><span>' + postPagejs.otherRequireme + '</span>'
                                + '</div></td>'
                                + '<td role="gridcell"'
                                + 'class="x-grid-cell x-grid-td x-grid-cell-ctl00_ContentPlaceHolder1_Grid1_ctl08 x-grid-cell-last x-unselectable "'
                                + 'id="ext-gen1299">'
                                + '<div unselectable="on" class="x-grid-cell-inner " ><a'
                                + ' onClick="applyFun(\'' + postPagejs.id + '\')">申请</a>'
                                + '</div></td></tr>'
                        }
                        htmlStr += htmlStr1;
                        //htmlStr+='';
                        $("#gridview-1024-body").html("");
                        $("#gridview-1024-body").html(htmlStr);

                    }
                },
                fail: function (err, status) {
                    console.log(err)
                }
            })
            this.selectPage(n);
            console.log('nnnn', n)
        },
        //getHref是在click模式下链接算法，一般不需要配置，默认代码如下
        getHref: function (n) {
            return '#';
        }
    });
}