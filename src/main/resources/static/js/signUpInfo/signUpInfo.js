var popup = new Popup();

var user = JSON.parse(sessionStorage.getItem("user"));

function getParameter(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

$(function () {


    $("#callSpan").html(user == null ? "" : user.userName + ',' + getQuantum())

    var totalPage = '';
    //var totalPage = 50;
    var totalRecords = '';
    var pageNo = getParameter('pno');
    if (!pageNo) {
        pageNo = 1;
    }

    $.ajax({
        url: 'http://localhost:8080/api/userApplication/getUserApplication',
        type: 'get', //GET
        async: true,    //或false,是否异步
        headers: {
            "token": getCookie("token")
        },
        data: {
            pageNo: pageNo,
            pageSize: 10,
            id: user == null ? '' : user.id
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
                        + '<div unselectable="on" class="x-grid-cell-inner x-grid-cell-inner-row-numberer"style="">' + (i + 1) + '</div>'
                        + '</td>'
                        + '<td role="gridcell" class="x-grid-cell x-grid-td x-grid-cell-ctl00_ContentPlaceHolder1_Grid1_ctl01 x-unselectable">'
                        + '<div unselectable="on" class="x-grid-cell-inner"><span>#{postName}</span></div>'
                        + '</td>'
                        + '<td role="gridcell" class="x-grid-cell x-grid-td x-grid-cell-ctl00_ContentPlaceHolder1_Grid1_ctl01 x-unselectable">'
                        + '<div unselectable="on" class="x-grid-cell-inner"><span>#{hireDepartment}</span></div>'
                        + '</td>'
                        + '<td role="gridcell" class="x-grid-cell x-grid-td x-grid-cell-ctl00_ContentPlaceHolder1_Grid1_ctl01 x-unselectable">'
                        + '<div unselectable="on" class="x-grid-cell-inner"><span>#{postDuty}</span></div>'
                        + '</td>'
                        + '<td role="gridcell" class="x-grid-cell x-grid-td x-grid-cell-ctl00_ContentPlaceHolder1_Grid1_ctl01 x-unselectable">'
                        + '<div unselectable="on" class="x-grid-cell-inner"><span>#{applicationQualifications}</span></div>'
                        + '</td>'
                        + '<td role="gridcell" class="x-grid-cell x-grid-td x-grid-cell-ctl00_ContentPlaceHolder1_Grid1_ctl01 x-unselectable">'
                        + '<div unselectable="on" class="x-grid-cell-inner"><span>#{hireAmount}</span></div>'
                        + '</td>'
                        + '<td role="gridcell" class="x-grid-cell x-grid-td x-grid-cell-ctl00_ContentPlaceHolder1_Grid1_ctl02 x-unselectable">'
                        + '<div unselectable="on" class="x-grid-cell-inner" ><span>#{status}</span></div>'
                        + '</td>'
                    if (data[i].paymentStatus == 0) {
                        html = html
                            + '<td role="gridcell" class="x-grid-cell x-grid-td x-grid-cell-ctl00_ContentPlaceHolder1_Grid1_ctl02 x-unselectable">'
                            + '<div unselectable="on" class="x-grid-cell-inner" ><span></span></div></td>'
                    } else {
                        html = html
                            + '<td role="gridcell" class="x-grid-cell x-grid-td x-grid-cell-ctl00_ContentPlaceHolder1_Grid1_ctl02 x-unselectable">'
                            + '<div unselectable="on" class="x-grid-cell-inner" ><span>#{checkResult}</span></div></td>'
                    }

                    html = html + '</td>'
                        + '<td role="gridcell" class="x-grid-cell x-grid-td x-grid-cell-ctl00_ContentPlaceHolder1_Grid1_ctl02 x-unselectable">'
                        + '<div unselectable="on" class="x-grid-cell-inner" ><span>#{checkReport}</span></div>'
                        + '</td>'
                    if (data[i].paymentStatus == 0) {
                        html = html + '<td role="gridcell" class="x-grid-cell x-grid-td x-grid-cell-ctl00_ContentPlaceHolder1_Grid1_ctl08 x-grid-cell-last x-unselectable ">'
                            + '<div unselectable="on" class="x-grid-cell-inner" ><a onclick="pay(#{id})">支付</a>'
                            + '</div>'
                    } else if (data[i].checkResult == 2) {
                        html = html + '<td role="gridcell" class="x-grid-cell x-grid-td x-grid-cell-ctl00_ContentPlaceHolder1_Grid1_ctl08 x-grid-cell-last x-unselectable ">'
                            + '<div unselectable="on" class="x-grid-cell-inner" ><a onclick="updateUserApplication(#{id})">修改</a>'
                            + '</div>'
                    } else {
                        html = html + '<td role="gridcell" class="x-grid-cell x-grid-td x-grid-cell-ctl00_ContentPlaceHolder1_Grid1_ctl08 x-grid-cell-last x-unselectable ">'
                            + '<div unselectable="on" class="x-grid-cell-inner" >'
                            + '</div>'
                    }

                    if (data[i].checkResult == 1) {
                        html = html
                            + '<td role="gridcell" class="x-grid-cell x-grid-td x-grid-cell-ctl00_ContentPlaceHolder1_Grid1_ctl08 x-grid-cell-last x-unselectable ">'
                            + '<div unselectable="on" class="x-grid-cell-inner" ><a onclick="downloadCard(#{id})">下载</a>'
                            + '</div>'
                            + '</td>'
                    } else {
                        html = html
                            + '<td role="gridcell" class="x-grid-cell x-grid-td x-grid-cell-ctl00_ContentPlaceHolder1_Grid1_ctl08 x-grid-cell-last x-unselectable ">'
                            + '<div unselectable="on" class="x-grid-cell-inner" >'
                            + '</div>'
                            + '</td>'
                    }
                    html = html + '</tr>'

                    html = html.replace(/#{id}/g, data[i].id)
                    html = html.replace(/#{postName}/g, data[i].postName)
                    html = html.replace(/#{hireDepartment}/g, data[i].hireDepartment)
                    html = html.replace(/#{postDuty}/g, data[i].postDuty)
                    html = html.replace(/#{applicationQualifications}/g, data[i].applicationQualifications)
                    html = html.replace(/#{hireAmount}/g, data[i].hireAmount)
                    html = html.replace(/#{status}/g, data[i].paymentStatus == 0 ? "<span style='color: darkred;font-weight: bold'>未支付</span>" : data[i].paymentStatus == 1 ? "<span style='color: green;font-weight: bold'>已支付</span>" : "<span style='color: darkred;font-weight: bold'>异常</span>")
                    html = html.replace(/#{checkResult}/g, data[i].checkResult == 0 ? "<span style='color: orangered;font-weight: bold'>审核中</span>" : data[i].checkResult == 1 ? "<span style='color: green;font-weight: bold'>通过</span>" : "<span style='color: darkred;font-weight: bold'>不通过</span>")
                    html = html.replace(/#{checkReport}/g, data[i].checkReport == null ? "" : data[i].checkReport)


                    $("#gridview-1024-body").append(html)

                }


                kp(pageNo, totalPage, totalRecords)

            }


        },
        error: function () {
            popup.alert("异常提醒", "服务器异常，请稍后再试！")
        }
    })

})

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

            $("#gridview-1024-body").empty();

            $.ajax({
                url: 'http://localhost:8080/api/userApplication/getUserApplication',
                type: 'get', //GET
                async: true,    //或false,是否异步
                headers: {
                    "token": getCookie("token")
                },
                data: {
                    pageNo: n,
                    pageSize: 10,
                    id: user == null ? '' : user.id
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
                                + '<div unselectable="on" class="x-grid-cell-inner x-grid-cell-inner-row-numberer"style="">' + (i + 1) + '</div>'
                                + '</td>'
                                + '<td role="gridcell" class="x-grid-cell x-grid-td x-grid-cell-ctl00_ContentPlaceHolder1_Grid1_ctl01 x-unselectable">'
                                + '<div unselectable="on" class="x-grid-cell-inner"><span>#{postName}</span></div>'
                                + '</td>'
                                + '<td role="gridcell" class="x-grid-cell x-grid-td x-grid-cell-ctl00_ContentPlaceHolder1_Grid1_ctl01 x-unselectable">'
                                + '<div unselectable="on" class="x-grid-cell-inner"><span>#{hireDepartment}</span></div>'
                                + '</td>'
                                + '<td role="gridcell" class="x-grid-cell x-grid-td x-grid-cell-ctl00_ContentPlaceHolder1_Grid1_ctl01 x-unselectable">'
                                + '<div unselectable="on" class="x-grid-cell-inner"><span>#{postDuty}</span></div>'
                                + '</td>'
                                + '<td role="gridcell" class="x-grid-cell x-grid-td x-grid-cell-ctl00_ContentPlaceHolder1_Grid1_ctl01 x-unselectable">'
                                + '<div unselectable="on" class="x-grid-cell-inner"><span>#{applicationQualifications}</span></div>'
                                + '</td>'
                                + '<td role="gridcell" class="x-grid-cell x-grid-td x-grid-cell-ctl00_ContentPlaceHolder1_Grid1_ctl01 x-unselectable">'
                                + '<div unselectable="on" class="x-grid-cell-inner"><span>#{hireAmount}</span></div>'
                                + '</td>'
                                + '<td role="gridcell" class="x-grid-cell x-grid-td x-grid-cell-ctl00_ContentPlaceHolder1_Grid1_ctl02 x-unselectable">'
                                + '<div unselectable="on" class="x-grid-cell-inner" ><span>#{status}</span></div>'
                                + '</td>'
                            if (data[i].paymentStatus == 0) {
                                html = html
                                    + '<td role="gridcell" class="x-grid-cell x-grid-td x-grid-cell-ctl00_ContentPlaceHolder1_Grid1_ctl02 x-unselectable">'
                                    + '<div unselectable="on" class="x-grid-cell-inner" ><span></span></div></td>'
                            } else {
                                html = html
                                    + '<td role="gridcell" class="x-grid-cell x-grid-td x-grid-cell-ctl00_ContentPlaceHolder1_Grid1_ctl02 x-unselectable">'
                                    + '<div unselectable="on" class="x-grid-cell-inner" ><span>#{checkResult}</span></div></td>'
                            }

                            html = html + '</td>'
                                + '<td role="gridcell" class="x-grid-cell x-grid-td x-grid-cell-ctl00_ContentPlaceHolder1_Grid1_ctl02 x-unselectable">'
                                + '<div unselectable="on" class="x-grid-cell-inner" ><span>#{checkReport}</span></div>'
                                + '</td>'
                            if (data[i].paymentStatus == 0) {
                                html = html + '<td role="gridcell" class="x-grid-cell x-grid-td x-grid-cell-ctl00_ContentPlaceHolder1_Grid1_ctl08 x-grid-cell-last x-unselectable ">'
                                    + '<div unselectable="on" class="x-grid-cell-inner" ><a onclick="pay(#{id})">支付</a>'
                                    + '</div>'
                            } else if (data[i].checkResult == 2) {
                                html = html + '<td role="gridcell" class="x-grid-cell x-grid-td x-grid-cell-ctl00_ContentPlaceHolder1_Grid1_ctl08 x-grid-cell-last x-unselectable ">'
                                    + '<div unselectable="on" class="x-grid-cell-inner" ><a onclick="updateUserApplication(#{id})">修改</a>'
                                    + '</div>'
                            } else {
                                html = html + '<td role="gridcell" class="x-grid-cell x-grid-td x-grid-cell-ctl00_ContentPlaceHolder1_Grid1_ctl08 x-grid-cell-last x-unselectable ">'
                                    + '<div unselectable="on" class="x-grid-cell-inner" >'
                                    + '</div>'
                            }

                            if (data[i].checkResult == 1) {
                                html = html
                                    + '<td role="gridcell" class="x-grid-cell x-grid-td x-grid-cell-ctl00_ContentPlaceHolder1_Grid1_ctl08 x-grid-cell-last x-unselectable ">'
                                    + '<div unselectable="on" class="x-grid-cell-inner" ><a onclick="downloadCard(#{id})">下载</a>'
                                    + '</div>'
                                    + '</td>'
                            } else {
                                html = html
                                    + '<td role="gridcell" class="x-grid-cell x-grid-td x-grid-cell-ctl00_ContentPlaceHolder1_Grid1_ctl08 x-grid-cell-last x-unselectable ">'
                                    + '<div unselectable="on" class="x-grid-cell-inner" >'
                                    + '</div>'
                                    + '</td>'
                            }
                            html = html + '</tr>'

                            html = html.replace(/#{id}/g, data[i].id)
                            html = html.replace(/#{postName}/g, data[i].postName)
                            html = html.replace(/#{hireDepartment}/g, data[i].hireDepartment)
                            html = html.replace(/#{postDuty}/g, data[i].postDuty)
                            html = html.replace(/#{applicationQualifications}/g, data[i].applicationQualifications)
                            html = html.replace(/#{hireAmount}/g, data[i].hireAmount)
                            html = html.replace(/#{status}/g, data[i].paymentStatus == 0 ? "<span style='color: darkred;font-weight: bold'>未支付</span>" : data[i].paymentStatus == 1 ? "<span style='color: green;font-weight: bold'>已支付</span>" : "<span style='color: darkred;font-weight: bold'>异常</span>")
                            html = html.replace(/#{checkResult}/g, data[i].checkResult == 0 ? "<span style='color: orangered;font-weight: bold'>审核中</span>" : data[i].checkResult == 1 ? "<span style='color: green;font-weight: bold'>通过</span>" : "<span style='color: darkred;font-weight: bold'>不通过</span>")
                            html = html.replace(/#{checkReport}/g, data[i].checkReport == null ? "" : data[i].checkReport)


                            $("#gridview-1024-body").append(html)
                        }
                        kp(n, totalPage, totalRecords)

                    }


                },
                error: function () {
                    popup.alert("异常提醒", "服务器异常，请稍后再试！")
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


function updateUserApplication(id) {
    window.location.href = "/updateUserApplication?id=" + id
}

function downloadCard(id) {
    window.open("/ticket.html?id=" + id)
}