function getParameter(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

//init
$(function () {

    var totalPage = '';
    //var totalPage = 50;
    var totalRecords = '';
    var pageNo = getParameter('pno');
    if (!pageNo) {
        pageNo = 1;
    }

    $.ajax({
        url: 'http://localhost:8080/information/list',
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
                totalRecords = data.data.total;
                totalPage = data.data.pages

                for (var i = 0; i < data.data.list.length; i++) {
                    var html = "<tr role='role' class='x-grid-row f-grid-row x-grid-data-row' tabindex='-1'>"
                        + "<td role='gridcell' class='x-grid-cell x-grid-td x-grid-cell-ctl00_ContentPlaceHolder1_Grid1_ctl00 x-grid-cell-row-numberer x-grid-cell-special x-grid-cell-first x-unselectable x-grid-cell-row-numberer x-grid-cell-special'>"
                        + "<div unselectable='on'  class='x-grid-cell-inner x-grid-cell-inner-row-numberer' style='text-align:right;'>"
                        + (i + 1)
                        + "</div>"
                        + "</td>"
                        + "<td role='gridcell' class='x-grid-cell x-grid-td x-grid-cell-ctl00_ContentPlaceHolder1_Grid1_ctl01 x-grid-cell-last x-unselectable '>"
                        + "<div unselectable='on' class='x-grid-cell-inner' style='text-align:left;'>"
                        + "<a title='#{title}' target='_blank' href='show.html?id=#{id}'>#{title}</a>"
                        + "</div>"
                        + "</td>"
                        + "</tr>"

                    html = html.replace(/#{title}/g,data.data.list[i].informationName)
                    html = html.replace(/#{id}/g,data.data.list[i].id)

                    $("#gridview-1024-body").append(html)

                }

            }
            kp(pageNo, totalPage, totalRecords)
        },
        error: function () {
            alert("服务器异常，请稍后再试！")
        }
    })


    if (getCookie("token")) {
        $("form").css("visibility", "hidden")
    }

});

function kp(pageNo, totalPage, totalRecords) {

    //生成分页
    //有些参数是可选的，比如lang，若不传有默认值
    kkpager.generPageHtml({
        pno: pageNo, //总页码
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
            // $("#pageSize").val(5);
            // $("#aspnetForm").submit();
            $.ajax({
                url: "/newsInfoList",
                data: {
                    page: n,
                    pageSize: 10
                },
                type: 'get',
                dataType: 'json',
                success: function (data, status) {
                    if (data.code == 200) {
                        var newsInfoPage = data.newsInfoPage;
                        totalPage = data.newsInfoPage.totalPages;
                        totalRecords = data.newsInfoPage.totalElements;
                        var htmlStr = '<table role="presentation" id="gridview-1024-table"\n' +
                            '                                                       class="x-gridview-1024-table x-grid-table x-grid-with-row-lines"\n' +
                            '                                                       border="0" cellspacing="0" cellpadding="0" style="width: 635px;"\n' +
                            '                                                       tabindex="-1">\n' +
                            '                                                    <colgroup>\n' +
                            '                                                        <col class="x-grid-cell-ctl00_ContentPlaceHolder1_Grid1_ctl00"\n' +
                            '                                                             style="width:70px">\n' +
                            '                                                    </colgroup>\n' +
                            '                                                    <colgroup>\n' +
                            '                                                        <col class="x-grid-cell-ctl00_ContentPlaceHolder1_Grid1_ctl01"\n' +
                            '                                                             style="width: 565px;">\n' +
                            '                                                    </colgroup>\n' +
                            '                                                    <tbody id="gridview-1024-body">';
                        var htmlStr1 = "";
                        for (var i = 0; i < newsInfoPage.content.length; i++) {
                            var newsInfojs = newsInfoPage.content[i];
                            console.log('i:' + i);
                            htmlStr1 += '<tr  role="row" data-boundview="gridview-1024" data-recordid="ext-record-1" data-recordindex="0" class="x-grid-row f-grid-row x-grid-data-row" tabindex="-1">';
                            htmlStr1 += '<td role="gridcell" class="x-grid-cell x-grid-td x-grid-cell-ctl00_ContentPlaceHolder1_Grid1_ctl00 x-grid-cell-row-numberer x-grid-cell-special x-grid-cell-first x-unselectable x-grid-cell-row-numberer x-grid-cell-special" >';
                            htmlStr1 += '<div unselectable="on" class="x-grid-cell-inner x-grid-cell-inner-row-numberer" style="text-align:right;">' + (i + 1);
                            htmlStr1 += '</div>';
                            htmlStr1 += '</td>';
                            htmlStr1 += '<td role="gridcell" class="x-grid-cell x-grid-td x-grid-cell-ctl00_ContentPlaceHolder1_Grid1_ctl01 x-grid-cell-last x-unselectable "id="ext-gen1065">';
                            htmlStr1 += '<div unselectable="on" class="x-grid-cell-inner "style="text-align:left;"><a title="' + newsInfojs.newsTitle + '"';
                            htmlStr1 += 'href="/newsInfo?id=' + newsInfojs.id + '" target="_blank" >' + newsInfojs.newsTitle + '</a></div></td></tr>';
                            htmlStr1 += htmlStr;
                        }
                        htmlStr += htmlStr1;
                        htmlStr += '  </tbody>\n' +
                            '</table>';
                        $("#typeId").html(htmlStr);

                    } else {
                        totalPage = 0;
                        totalRecords = 0;
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

//登录入口
function toLogin() {

    if (isEmpty123($("#userName").val())) {
        alert("登录账号为空，请确认！")
        return
    }

    if (isEmpty123($("#password").val())) {
        alert("登录密码为空，请确认！")
        return
    }


    $.ajax({
        url: 'http://localhost:8080/login',
        type: 'POST', //GET
        async: true,    //或false,是否异步
        headers: {},
        data: {
            username: $("#userName").val(),
            password: $("#password").val()
        },
        timeout: 50000,    //超时时间
        dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
        success: function (data) {
            if (data.code == 401) {
                alert(data.msg)
            } else if (data.code == 0) {
                setCookie("token", data.data.token)
                sessionStorage.setItem("userName",data.data.user.userName)
                alert("登录成功，请继续使用网站！")
                window.location.reload();
            }
        },
        error: function () {
            alert("服务器异常，请稍后再试！")
        }
    })

}

