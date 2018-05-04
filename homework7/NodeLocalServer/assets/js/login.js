$("document").ready(function() {
  $("#clear").click(function() {
    $("#name").val("");
    $("#stid").val("");
    $("#phone").val("");
    $("#email").val("");
  })
  $("#sub").click(function(){
    var dataStr = $("#form").serialize();
    var dataArray = $("#form").serializeArray()
    var dataJson = getJson(dataArray);
    if(!test(dataJson)) return false;
    $.post("http://localhost:8000", dataStr, function(data, status) {
      if(data == "ok") window.location = "http://localhost:8000?username=" + dataJson.name;
      else if(data == "name") warn("该用户名已被使用！");
      else if(data == "stid") warn("该学号已被使用！");
      else if(data == "phone") warn("该电话已被使用！");
      else warn("该邮箱已被使用！");
    });
  });
});

function getJson(dataArray) {
  var jsonObj = {};
  for(var i = 0; i < dataArray.length; i++) {
    jsonObj[dataArray[i].name] = dataArray[i].value;
  }
  return jsonObj;
}

function warn(str) {
  $("#warn").html(str);
  $("#warn").addClass("trans");
  setTimeout(function() {
    $("#warn").removeClass("trans");
  }, 1500);
}

function test(data) {
  if(data.name == "") {
      warn("用户名不可为空！");
      return false;
    }
    if(data.stid == "") {
      warn("学号不可为空！");
      return false;
    }
    if(data.phone == "") {
      warn("电话不可为空！");
      return false;
    }
    if(data.email == "") {
      warn("邮箱不可为空！");
      return false;
    }
    var nameStd = /^[a-zA-Z][a-zA-Z0-9_]{5,17}$/;
    if(!nameStd.test(data.name)) {
      warn("用户名必须为6-18位字母数字下划线且以字母开头！");
      return false;
    }
    var stidStd = /^[1-9]\d{7}$/;
    if(!stidStd.test(data.stid)) {
      warn("学号必须为8位数字且不可以0开头！");
      return false;
    }
    var phoneStd = /^[1-9]\d{10}$/;
    if(!phoneStd.test(data.phone)) {
      warn("电话必须为11位数字且不可以0开头！");
      return false;
    }
    var emailStd = /^[a-zA-Z_\-]+@(([a-zA-Z_\-])+\.)+[a-zA-Z]{2,4}$/;
    if(!emailStd.test(data.email)) {
      warn("电子邮箱格式无效！");
      return false;
    }
    return true;
}