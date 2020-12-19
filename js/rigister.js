// 绑定密码眼睛图片变化事件
$(".imgTab").on("mousedown",function(){
    $(this).attr("src","../images/eye1.png");
    $(".p2").find("#password").attr("type","text");       
});
$(".imgTab").on("mouseup",function(){
    $(this).attr("src","../images/eye2.png");
    $(".p2").find("#password").attr("type","password");     
});

//自定义正则验证
jQuery.validator.addMethod('testUser', function (value) {
// 用户名限2-8个字符，支持中英文、数字、减号或下划线
let reg = /^[(a-zA-Z0-9\u4e00-\u9fa5){1}_#]{2,8}$/;
if (reg.test(value)) {
    return true
} else {
    return false
}
}, '验证失败的提示信息');

jQuery.validator.addMethod('testPas', function (value) {
// 密码8-16位数字和字母组成
let reg = /^(?![^a-zA-Z]+$)(?!\\D+$).{8,16}$/;
if (reg.test(value)) {
    return true
} else {
    return false
}
}, '验证失败的提示信息');

jQuery.validator.addMethod('testPho', function (value) {
    // 密码8-16位数字和字母组成
    let reg = /^1[3,5,6,7,8]\d{9}$/;
    if (reg.test(value)) {
        return true
    } else {
        return false
    }
}, '验证失败的提示信息');


$('#rigister').validate({
// 填写的 输入框验证的规则
rules: {
    // 就是input的name属性的属性值来验证
    username: {
        required: true,
        testUser:true
    },
    password: {
        required: true,
        testPas: true
    },
    phone:{
        required: true,
        testPho: true
    },
    server:{
        required: true, 
    }
},
// 当不满足规则的是 编写的提示信息
messages: {
    username: {
        // 输入框为空时显示
        required: '请输入2-8个字符，支持中英文数字减号或下划线',
        // 用户名输入不正确时显示
        testUser:'用户名不正确'
        
    },
    password: {
        // 输入框为空时显示
        required: '请输入8-16位数字和字母组成',
         //密码输入不正确时显示
        testPas: '密码不正确'
    },
    phone: {
        // 输入框为空时显示
        required: '请输入正确的手机号',
         //手机号输入不正确时显示
        testPho: '手机号不正确'
    },
    server:{
         // 输入框为空时显示
         required: '请勾选协议和政策'
    }
},
submitHandler: function () {
    // 当界面中所有的表单验证都成功的时候 就会执行这个 方法
    // 一般用跟后端进行数据交互 
    // 发送ajax请求  
    $.get('/vivoProject/php/checkusername.php',{
        username: this.successList[0].value,
    },function(res){
        if(res.code == 1){
            // 用户名已存在
         alert("该"+res.msg+"请换一个用户名登录");  
         $("#username").val("") ;
         $("#password").val("");
         $("#phone").val("");
        }else if(res.code == 0){
            $.get('/vivoProject/php/rigister.php',{
                    username: $("#username").val(),
                    password: $("#password").val(),
                    phone:$("#phone").val(),
                },function(resm){
                    if(resm.code == 1){
                        // 登录成功存储 登录的状态
                       console.log(resm.msg);
                       location.href = "./login.html";
                    }
                },'json'); 
            }
    },'json');             
}
});
