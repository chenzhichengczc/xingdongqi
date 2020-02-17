var popup = new Popup();

function getParameter(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

//init
$(function () {
    var tokenStatus = getCookie("token");
    debugger
    if (tokenStatus) {
        //检查是否登录状态
        $.ajax({
            url: 'http://localhost:8080/check/status',
            type: 'get', //GET
            async: true,    //或false,是否异步
            data: {
                token: tokenStatus
            },
            timeout: 50000,    //超时时间
            dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
            success: function (data) {
                debugger
                if(data.code == 400){
                    //设置token过期
                    expireCookie("token");
                    $("form").css("visibility", "visible")
                }
            },
            error: function () {
                popup.alert("异常提醒","服务器异常，请稍后再试！")
            }
        })
        $("form").css("visibility", "hidden")
    }else if(performance.timing.redirectStart > 0){
        $("form").css("visibility", "visible")
    }

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
            popup.alert("异常提醒","服务器异常，请稍后再试！")
        }
    })




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

            $("#gridview-1024-body").empty();
            $.ajax({
                url: "http://localhost:8080/information/list",
                data: {
                    pageNo: n,
                    pageSize: 10
                },
                type: 'get',
                dataType: 'json',
                success: function (data, status) {
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
                    kp(n, totalPage, totalRecords)
                },
                fail: function (err, status) {
                    console.log(err)
                }
            })
            this.selectPage(n,totalPage,totalRecords);
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
        popup.alert("温馨提示","登录账号为空，请确认！")
        return
    }

    if (isEmpty123($("#password").val())) {
        popup.alert("温馨提示","登录密码为空，请确认！")
        return
    }


    $.ajax({
        url: 'http://localhost:8080/user/login',
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
            debugger
            if (data.code == 401) {
                popup.alert("账号错误",data.msg)
            } else if (data.code == 0) {
                setCookie("token", data.data.token)
                sessionStorage.setItem("user",JSON.stringify(data.data.user))
                popup.alert("登录告示","登录成功，请继续使用网站！")
                setTimeout(function () {
                    window.location.reload();
                },1500)
            }
        },
        error: function () {
            popup.alert("异常提醒","服务器异常，请稍后再试！")
        }
    })

}

