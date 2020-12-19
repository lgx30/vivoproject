<?php
        $id = $_GET['id'];
        $skuCode = $_GET['skuCode'];
        $skuName = $_GET['skuName'];
        $sName = $_GET['sName'];
        $relaSpuId = $_GET['relaSpuId'];
        $promotion = $_GET['promotion'];
        $brief = $_GET['brief'];
        $salePrice = $_GET['salePrice'];
        $marketPrice = $_GET['marketPrice'];
        $points = $_GET['points'];
        $cart_number = $_GET['cart_number'];
        $goods_number = $_GET['goods_number'];
        $is_select = $_GET['is_select'];
        $isDefault = $_GET['isDefault'];
        $disabled = $_GET['disabled'];
        $images = $_GET['images'];

        // $id = 2;
        // $skuCode =2;
        // $skuName = 2;
        // $sName =2;
        // $relaSpuId =2;
        // $promotion = 2;
        // $brief = 2;
        // $salePrice = 2;
        // $marketPrice =2;
        // $points = 2;
        // $cart_number = 2;
        // $goods_number = 2;
        // $is_select = 2;
        // $isDefault = 2;
        // $disabled =2;
        // $images = 2;
        $con = mysqli_connect('localhost','root','123456','vivo');
        $res = mysqli_query($con,"INSERT INTO `data` VALUES (NULL,'$id','$skuCode','$skuName','$sName','$relaSpuId','$promotion','$brief','$salePrice','$marketPrice','$points','$cart_number','$goods_number','$is_select','$isDefault','$disabled','$images')");
        if($res){
            print_r("数据插入成功");
        }
?>