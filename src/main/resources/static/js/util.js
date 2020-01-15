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