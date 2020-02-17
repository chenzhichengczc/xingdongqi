//init
$(function() {
  $.ajax({
      url: 'http://localhost:8080/information/getById',
      type: 'get', //GET
      async: true,    //或false,是否异步
      data: {
          informationId: get_URL
      },
      timeout: 50000,    //超时时间
      dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
      success: function (data) {
          if (data.code == 0) {
              $("#tbody_information").append(data.data.text)
              $("#tbody_information").css("width",((window.screen.width / 2) + 50) + "px")
              $("#ctl00_ContentPlaceHolder1_NewsTitle").html(data.data.informationName)
          }
      },
      error: function () {
          popup.alert("异常提醒", "服务器异常，请稍后再试！")
      }
  })
})

function get_URL() {
    var tmpArr, QueryString;
    var testpaperName;
    var URL = document.location.toString(); //获取带参数的URL
    console.log(URL);
    if(URL.lastIndexOf("?") != -1) {
        QueryString = URL.substring(URL.lastIndexOf("?") + 1, URL.length);
        tmpArr = QueryString.split("&"); //分离参数
        console.log(tmpArr);
        for(i = 0; i <= tmpArr.length; i++) {
            try {
                eval(tmpArr[i]);
            } catch(e) {
                var re = new RegExp("(.*)=(.*)", "ig");
                re.exec(tmpArr[i]);
                try {
                    eval(RegExp.$1 + "=" + "\"" + RegExp.$2 + "\"");
                } catch(e) {}
            }
        }
    } else {
        QueryString = "";
    }
    if(id) {
        testpaperName = unescape(id);
        console.log(testpaperName);
    }
    return testpaperName;
}