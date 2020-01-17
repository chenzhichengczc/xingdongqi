$(function () {

    var user = JSON.parse(sessionStorage.getItem("user"));

    $("#callSpan").html(user == null ? "" : user.userName + ',' +  getQuantum())

})