// 打开详情页的时候先查看是否有携带id参数
// 如果没有id参数的时候 跳转到列表 
// 如果有id参数的时候 根据id去获取对象的数据 渲染

// http://gz2008.com/day06_code/project/html/detail.html?id=4
let reg = /id=(\d+)/;
if (!reg.test(location.search)) {
    location.href = './list.html'
}
let id = reg.exec(location.search)[1];
let wrapper = document.querySelector(".wrapper");
// console.log(wrapper);
// 请求数据
jQuery.ajax({
    type: "get", //使用get方式
    url: "../data/list.json", //json文件相对于这个HTML的路径
    dataType: "json",
    success: function (res) {
        //这个res就是json数据
        let date = res.data.dataList;
        // console.log(date);
        // 渲染页面导航
        date.forEach(function (item, index) {
            if (item.id == id) {
                // 页面导航数据渲染
                let navinline = document.querySelector(".nav_inline");
                let atlas = document.querySelector(".atlas");
                // 获取图片信息
                let imagesinfo = item.images;
                // 获取判断信息
                let info = item.corner.thumbnailPic;
                let name = document.querySelector(".primary .name");

                let intro = document.querySelector(".primary .intro");

                let salePrice = document.querySelector(".summary_price .sale_price");
                let primary = document.querySelector(".primary");
                let ch = document.querySelector(".chbox");
                console.log(primary);

                navinline.innerHTML = ` <span>${item.sName}</span>`;
                imagesRender(imagesinfo, atlas, info);
                // 渲染商品信息参数
                name.innerHTML = `${item.skuName}`;
                intro.innerHTML = ` <span class="protion">【${item.promotion}】</span>
                ${item.brief}`;
                salePrice.innerHTML = ` <i>￥</i>${item.salePrice}.00`;
                // 图片转换
                jQuery(".big_item").eq(0).css("display", "block");
                jQuery(".small-item").on('mouseenter', function () {
                    let index = jQuery(this).index();
                    jQuery(".big_item").eq(index).css("display", "block").siblings().css("display", "none");
                });
                // 立即购买  加入购物车
                // 点击立即购买跳转到购物车
                // 点击加入购物车实现添加数据到购物车的功能，需要判断有没有登录
                
                primary.onclick = function () {
                    let e = window.event; 
                    console.log(e.target.className);
                    if (e.target.className == 'btn_brand' && ch.checked == true) {
                        location.href = './car.html';
                    }

                    if (e.target.className == 'btn_dark') {
                        // 因为添加到购物车按钮 需要把用户名和商品id
                        // 所以需要判断是否有登录
                        let login = jQuery.cookie('login');
                        // console.log(login);
                        if (!login) {
                            location.href = './login.html';
                            localStorage.setItem('url', './detail.html?id=' + id)
                            return
                        }
                        jQuery.ajax({
                            type: "get", //使用get方式
                            url: "/vivoProject/php/addCarData.php",
                            data: {
                                username:login,
                                goods_id:id 
                            },
                            dataType: "json",
                            success: function (ress) {                               
                                if(ress.code==true){
                                    alert("成功加入购物车");
                                }
                            },
                            error: function () {
                                alert("请求失败");
                            }
                        });
                    }
                }
            }
        });
    },
    error: function () {
        alert("请求失败");
    }
});


// 渲染商品图片
// 根据id可以查询到哪个商品的信息，可以找到图片信息
// 找到图片信息后渲染页面
// 封装一个渲染图片的函数
// 参数：图片数据 父元素 判断信息
function imagesRender(mmm, ppp, www) {
    let str = ``;
    if (!www) {
        str += ` <ul class="img_list_big">
        <li class="big_item active">
            <img src="${mmm[0].bigPic}">
        </li>
        <li class="big_item">
            <img src="${mmm[1].bigPic}">
        </li>
        <li class="big_item">
            <img src="${mmm[2].bigPic}">
        </li>
        <li class="big_item">
            <img src="${mmm[3].bigPic}">
        </li>
   </ul>
   <div class="img_small">
        <div class="list_wrapper">
           <ul class="img_list_small">
                <li class="small-item">
                    <img  src="${mmm[0].smallPic}">
                </li>
                <li class="small-item">
                    <img src="${mmm[1].smallPic}">
                </li>
                <li class="small-item">
                    <img  src="${mmm[2].smallPic}">
                </li>
                <li class="small-item">
                    <img  src="${mmm[3].smallPic}">
                </li>
           </ul>
        </div>
   </div>`;
    } else {
        str += ` <ul class="img_list_big">
            <img src="${www}" class="corner">
            <li class="big_item">
                <img src="${mmm[0].bigPic}">
            </li>
            <li class="big_item">
                <img src="${mmm[1].bigPic}">
            </li>
            <li class="big_item">
                <img src="${mmm[2].bigPic}">
            </li>
            <li class="big_item">
                <img src="${mmm[3].bigPic}">
            </li>
       </ul>
       <div class="img_small">
            <div class="list_wrapper">
               <ul class="img_list_small">
                    <li class="small-item">
                        <img  src="${mmm[0].smallPic}">
                    </li>
                    <li class="small-item">
                        <img src="${mmm[1].smallPic}">
                    </li>
                    <li class="small-item">
                        <img  src="${mmm[2].smallPic}">
                    </li>
                    <li class="small-item">
                        <img  src="${mmm[3].smallPic}">
                    </li>
               </ul>
            </div>
       </div>`;
    }
    ppp.innerHTML = str;
}