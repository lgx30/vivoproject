
// console.log($(".imgTab"));
let username = document.querySelector("#username");

jQuery(".imgTab").on("mousedown",function(){
    jQuery(this).attr("src","../images/eye1.png");
    jQuery(".p2").find("#password").attr("type","text");       
});
jQuery(".imgTab").on("mouseup",function(){
    jQuery(this).attr("src","../images/eye2.png");
    jQuery(".p2").find("#password").attr("type","password");     
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

// console.log($('#login'));
jQuery('#login').validate({
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
        }
    },
    submitHandler: function () {
        // 当界面中所有的表单验证都成功的时候 就会执行这个 方法
        // 一般用跟后端进行数据交互 
        // 发送ajax请求   
        //    console.log(this.successList[0].value); 
        // console.log(username.value)   
        jQuery.get('/vivoProject/php/login.php',{
            username: this.successList[0].value,
            password: this.successList[1].value
        },function(res){

            console.log(res);
            if(res.code == 1){
                // 登录成功存储 登录的状态
                // console.log(this.successList[0].value);
               
            jQuery.cookie.raw =true;
            jQuery.cookie.json = true;
            // console.log(res.name);
            jQuery.cookie('login',res.name,{path:'/'});
            
                console.log(res.message);
                // 跳转页面 如果从购物车过来的时候登录成功去购物车页面
                // 否则就去到首页
                let url = localStorage.getItem('url');
                if(url){
                    location.href = url;
                    // 登录成功的时候把url的这个cookie值清除
                    localStorage.removeItem('url');
                }else{
                    location.href = '../index.html';
                }
                location.href = "../index.html";
            }else{
                // 登录失败
                console.log(res.message);
            }
        },'json');

    }
});

// 跳转注册页面
jQuery(".btn2").on("click",function(){
    location.href = "./rigister.html";
})

