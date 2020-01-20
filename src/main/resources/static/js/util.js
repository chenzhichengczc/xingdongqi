function isEmpty123(value){
    if(value == null || value == "" || value == "undefined" || value == undefined || value == "null"){
        return true;
    }
    else{
        value = value.replace(/\s/g,"");
        if(value == ""){
            return true;
        }
        return false;
    }
}


function setCookie(name,value)
{
    var exp = new Date();
    exp.setTime(exp.getTime() + 2*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}

function expireCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

function getCookie(name)
{
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");

    if(arr=document.cookie.match(reg)){
        return unescape(arr[2]);
    }
    else{
        return null;
    }
}

function getQuantum() {
    var hours = new Date().getHours();
    var quantum = "";
    if (hours < 6) {
        quantum = "凌晨好！"
    }
    else if (hours < 9) {
        quantum = "早上好！"
    }
    else if (hours < 12) {
        quantum = "上午好！"
    }
    else if (hours < 14) {
        quantum = "中午好！"
    }
    else if (hours < 17) {
        quantum = "下午好！"
    }
    else if (hours < 19) {
        quantum = "傍晚好！"
    }
    else if (hours < 22) {
        quantum = "晚上好！"
    }
    else {
        quantum = "深夜好！"
    }
    return quantum;
}
