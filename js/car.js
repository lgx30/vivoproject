let noresult = document.createElement("div");
let content = document.querySelector(".content");
let carttable = document.createElement("div");
let carttoolbarwrap = document.createElement("div");
// 判断是否有登录
let login = jQuery.cookie('login');
// console.log(login);
if (!login) {
    location.href = './login.html';
    // setCookie('url','http://gz2008.com/day06_code/project/html/car.html')
    localStorage.setItem('url', './car.html');
}

// 获取用户购物车中的数据
jQuery.ajax({
    type: "get", //使用get方式
    url: "/vivoProject/php/getCarData.php",
    data: {
        username: login
    },
    dataType: "json",
    success: function (res) {
        // console.log(res);
        // 先把数据存放到本地
        localStorage.setItem('goodsList', JSON.stringify(res));
        render(res);
    },
    error: function () {
        alert("请求失败");
    }

});


function render(data) {
    // data 请求出来的数据 有可能一条数据都没有
    if (!data.length) {
        noresult.className = "no-result";
        noresult.innerHTML = `<div>
        <img src="../images/shop.png">
    </div>
    <div class="no-result-des">哎呀，购物车为空！</div>
    <div class="no-result-btn-container">
        <button class="v-btn-brand btn-brandqq">
            去选购逛逛
        </button>
        <button class="v-btn-brand btn-brandww">
            我的收藏
        </button>
    </div>`;
        content.appendChild(noresult);

        return
    }
    let allChecked = data.every(item => {
        return item.is_select == 1;
    });
    let total = shopNum(data);
    carttable.className = "cart_table";
    let str1 = ` <table class="order_table">
    <thead>
        <tr>
            <th class="check-col">
                <input type="checkbox" class="cheinp" ${allChecked?'checked' :''}>
                <span>全选</span>
            </th>
            <th class="goods-col">
                商品
            </th>
            <th class="price-col">
                价格（元）
            </th>
            <th>数量</th>
            <th>优惠</th>
            <th>小计（元）</th>
            <th>操作</th>
        </tr>
    </thead>
    <tbody class="tbdy">`;
    data.forEach(function (item, index) {
        str1 += `<tr>
        <td>
            <input type="checkbox" class="tbdy-inp" ${item.is_select==1 ?'checked':''} goods_id="${item.id}" >
            <a href="" class="tda">
                <div class="figure">
                    <img
                        src="${item.images}">
                </div>
            </a>
        </td>
        <td class="goods-col1">
        ${item.skuName}
        </td>
        <td class="price-col1">${item.salePrice}.00</td>
        <td>
            <span class="number-box" goods_id="${item.id}">
                <a href="javascript:;" class="reduce-num">
                    -
                </a>
                <input title="请输入购买量" class="prod-num"  value ="${item.cart_number}">
                <a href="javascript:;" class="add-num">
                    +
                </a>
            </span>
        </td>
        <td>
            <span>${item.marketPrice-item.salePrice}.00</span>
        </td>
        <td class="total-price">${total.totalPrice}.00</td>
        <td>
            <span class="favorite del"  goods_id="${item.id}">
                删除
            </span>
        </td>
    </tr>`;
    });
    str1 += ` </tbody>
     </table>`;
    carttable.innerHTML = str1;

    content.appendChild(carttable);
    carttoolbarwrap.className = "cart-toolbar-wrap";
    carttoolbarwrap.innerHTML = `
    <div class="toolbar-wrapper">
    <div class="option-operation">
        <ul>
            <li>
                <input type="checkbox" class="cheinp" ${allChecked?'checked' :''}>
                <span>全选</span>
            </li>
            <li>
                <a href="javascript:void(0);">删除选中的商品</a>
            </li>
        </ul>
    </div>
    <div class="cart-toolbar-right">
        <table class="cart-toolbar-table">
            <tr>
                <td class="sum-area">
                    <p class="sum-area-infoI">
                        已选商品
                        <em>
                            <b class="red">${total.totalNum}</b>
                        </em>件，合计（不含运费）：
                        <b class="price_large">
                            <dfn>¥</dfn>
                            <span>${total.totalPrice}.00</span>
                        </b>
                    </p>
                    <p class="sum-area-price">
                        ( 商品总价：
                        <span class="price">
                            <dfn>¥ </dfn>
                            <span class="price_z">${total.totalPrice}.00</span>
                        </span>
                        优惠：
                        <span class="price">
                            <dfn>¥ </dfn>
                            <span class="price_s">0.00</span>
                        </span> )
                    </p>
                </td>
                <td class="btn-area">
                    <button>去结算</button>
                </td>
            </tr>
        </table>
    </div>
</div>
    `;
    content.appendChild(carttoolbarwrap);
}

content.onclick = function () {
    let e = window.event;
    // 全选
    if (e.target.className == 'cheinp') {
        let data = JSON.parse(localStorage.getItem('goodsList'));

        data.forEach(item => {
            e.target.checked ? item.is_select = 1 : item.is_select = 0
        });
        localStorage.setItem('goodsList', JSON.stringify(data));
        render(data);
    }
    // 单选tbdy-inp
    if (e.target.className == 'tbdy-inp') {
        let id = e.target.getAttribute('goods_id');
        let data = JSON.parse(localStorage.getItem('goodsList'));
        data.forEach(item => {
            if (item.id == id) {
                item.is_select = e.target.checked ? 1 : 0;
            }
        })
        // 需要把 修改够的数据存储本地存储中
        localStorage.setItem('goodsList', JSON.stringify(data));
        render(data);
    }

    if (e.target.classList.contains('del')) {
        // 删除数据库中 和 本地存储中对应的数据 
        let id = e.target.getAttribute('goods_id');
        jQuery.ajax({
            type: "get", //使用get方式
            url: "/vivoProject/php/removeCarData.php",
            data: {
                username: login,
                goods_id: id
            },
            dataType: "json",
            success: function (ress) {

                if (ress.code) {
                    // 先获取本地存储中的数据
                    let data1 = JSON.parse(localStorage.getItem('goodsList'));
                    let ress = data1.filter(item => {
                        return item.id != id;
                    });
                   
                    localStorage.setItem('goodsList', JSON.stringify(ress));
                  
                    render(ress);
                }
                
            },
            error: function () {
                alert("请求失败");
            }
        });

    }

    // 更新商品的数量

    // 加法
    if (e.target.classList.contains('add-num')) {
        // 进行数量加法
        let data = JSON.parse(localStorage.getItem('goodsList'));
        let id = e.target.parentNode.getAttribute('goods_id');
        let obj = data.filter(item => {
            return item.id == id
        })[0];
         
        // console.log(obj);
        // console.log(obj.cart_number);
        // console.log(obj.goods_number);

        let carnum = obj.cart_number * 1;
        let goodsnum = obj.goods_number * 1;
        if (carnum >= goodsnum) {
            carnum = goodsnum;
            alert("每人限购5台");
        } else {
            carnum++
        }
        jQuery.ajax({
            type: "get", //使用get方式
            url: "/vivoProject/php/updCarData.php",
            data: {
                username: login,
                goods_id: id,
                goods_num: carnum
            },
            dataType: "json",
            success: function (res) {
                if (res.code) {
                    obj.cart_number = carnum;
                    localStorage.setItem('goodsList', JSON.stringify(data));
                    render(data);
                }
            },
            error: function () {
                alert("请求失败");
            }
        });
    }
    if (e.target.classList.contains('reduce-num')) {
        // 进行数量减法
        let data = JSON.parse(localStorage.getItem('goodsList'));
        let id = e.target.parentNode.getAttribute('goods_id');

        let obj = data.filter(item => {
            return item.id == id
        })[0];
        let num = obj.cart_number * 1;
        if (num <= 1) {
            num = 1
        } else {
            num--
        }
        jQuery.ajax({
            type: "get", //使用get方式
            url: "/vivoProject/php/updCarData.php",
            data: {
                username: login,
                goods_id: id,
                goods_num: num
            },
            dataType: "json",
            success: function (res) {
                if (res.code) {
                    obj.cart_number = num;
                    localStorage.setItem('goodsList', JSON.stringify(data));
                    render(data);
                }
            },
            error: function () {
                alert("请求失败");
            }
        });

    }
    if(e.target.classList.contains('btn-brandqq')){
        location.href = "./list.html";
        
    }
    if(e.target.classList.contains('btn-brandww')){
        alert("该功能还没开发！");
    }

}

function shopNum(goods) {
    let res = goods.filter(item => {
        return item.is_select == 1
    })

    // 计算选中商品的数量
    let totalNum = res.reduce((pre, item) => {
        return pre + item.cart_number * 1
    }, 0);

    // 计算选中商品的总价格
    let totalPrice = res.reduce((pre, item) => {
        return pre + item.salePrice * item.cart_number
    }, 0);

    return {
        totalNum,
        totalPrice
    }
}