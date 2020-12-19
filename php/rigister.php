<?php
$username = $_GET["username"];
$password = $_GET["password"];
$phone =$_GET["phone"];
// $username = "格格";
// $password = "123456abc";
// $phone = "111111111111";
#连接数据库
$con = mysqli_connect('localhost','root','123456','vivo');
//  整个SQL语句用双引号，变量用单引号
$sql = "INSERT INTO `userlist` VALUES(null, '$username','$password','$phone')";
// 执行SQL语句
$res = mysqli_query($con,$sql);
if(!$res){
    die("数据库链接出错".mysqli_error($con));
    $arr = array("code"=>0,"msg"=>"数据添加失败");
    print_r(json_encode($arr,JSON_UNESCAPED_UNICODE));
}
if($res){
    $arr = array("code"=>1,"msg"=>"数据添加成功");
    print_r(json_encode($arr,JSON_UNESCAPED_UNICODE));
}
?>