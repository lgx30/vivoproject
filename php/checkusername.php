<?php
    // 1 接收前端发送的数据
    $username = $_GET["username"];
    // $username = "乐乐";
   # 2 连接数据库
    $con = mysqli_connect('localhost','root','123456','vivo');
    // 3 定义sql语句
    $sql = "SELECT * FROM `userlist` WHERE `username`='$username'";
    // 4执行
    $res = mysqli_query($con,$sql);
    // 因为根据主键查询 所以要有就有一条 要么就没有
    $row = mysqli_fetch_assoc($res);
    if ($row) {
        echo json_encode(array('code' => 1, "msg" => "用户已存在"),JSON_UNESCAPED_UNICODE);
    } else {
        echo json_encode(array('code' => 0, "msg" => "恭喜可以使用"),JSON_UNESCAPED_UNICODE);
    }
?>