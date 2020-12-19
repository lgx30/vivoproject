<?php
  #连接数据库
  header('content-type:text/html;charset=utf-8;');
 $con = mysqli_connect('localhost','root','123456','vivo');
 $username = $_GET["username"];
 $password = $_GET["password"];
//  $username = '乐乐';
//  $password = '123456abc';
//  整个SQL语句用双引号，变量用单引号
$sql = "SELECT * FROM `userlist` WHERE `username` = '$username' AND `password` ='$password'";
// 执行SQL语句
$res = mysqli_query($con,$sql);
if (!$res) {
    die('error for mysql: ' . mysqli_error());
  }
// 去获取数据的结果中解析第一条数据
  $row = mysqli_fetch_assoc($res);

  if (!$row) {
    // 没有匹配的数据 登录失败
    echo json_encode(array(
      "code" => 0,
      "message" => "登录失败"
    ),JSON_UNESCAPED_UNICODE);
  } else {
    // 有匹配的数据 登录成功
    echo json_encode(array(
      "code" => 1,
      "message" => "登录成功",
      "name" => $username
    ),JSON_UNESCAPED_UNICODE);
  };
?>