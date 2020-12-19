// 头部
$(".user_app").on("mouseenter",function(){
    $(".user_app_qrCode").css("display","block");
});
$(".user_app").on("mouseleave",function(){
    $(".user_app_qrCode").css("display","none");
});

$(".member_login").on("mouseenter",function(){
    $(".user_lists").css("display","block");
});
$(".user_lists").on("mouseleave",function(){
    $(".user_lists").css("display","none");
});
// 底部
// console.log($(".codeList_item1"));
$(".codeList_item1").on("mouseenter",function(){
    $(".foot_QRCode1").css("display","block");
});
$(".codeList_item1").on("mouseleave",function(){
    $(".foot_QRCode1").css("display","none");
});
$(".codeList_item2").on("mouseenter",function(){
    $(".foot_QRCode2").css("display","block");
});
$(".codeList_item2").on("mouseleave",function(){
    $(".foot_QRCode2").css("display","none");
});
$(".codeList_item3").on("mouseenter",function(){
    $(".foot_QRCode3").css("display","block");
});
$(".codeList_item3").on("mouseleave",function(){
    $(".foot_QRCode3").css("display","none");
});

// 固定定位
//jquery监听页面滚动条滚动事件
$(document).scroll(function() {
if($(document).scrollTop()>= 300){
    $(".foor li").eq(3).css("display","block");   
}
if($(document).scrollTop()< 300){
    $(".foor li").eq(3).css("display","none"); 
}
});
$(".foor li").eq(3).click(function () { 
    $("html").animate({
        scrollTop: 0
    },500)
}); 

// 添加鼠标进入退出事件
$(".foor li").each(function(index,ele){
    $(ele).on("mouseenter",function(){
        $(".tip").eq(index).css("display","block");
    });
    $(ele).on("mouseleave",function(){
        $(".tip").eq(index).css("display","none");
    });
});
  
