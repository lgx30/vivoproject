let spuitemList = document.querySelector(".spuitem_list")
// console.log(spuitemList);
// 请求数据
jQuery.ajax({
	type:"get", //使用get方式
	url: "../data/list.json", //json文件相对于这个HTML的路径
	dataType:"json",
	success:function(res) {
        //这个res就是json数据
        let date = res.data.dataList;
        console.log(date);
        renderJ(date,spuitemList);
        
	},
	error:function() {
		alert("请求失败");
	}
});

// 数据渲染
// 参数为数据和父元素
function  renderJ(DDD,rrr){
    let str = ``; 
    DDD.forEach(function(item,index){
        if(!item.corner){
            str +=`
            <li class="spu-item">
                    <a href="./detail.html?id=${item.id}" title="${item.skuName}">
                        <div class="figure">
                            <img alt=""  src="${item.images[0].bigPic}">
                        </div>
                        <div class="spu-info">
                            <p class="name">${item.skuName}</p>
                            <p class="feature">
                                <span class="sale-point">${item.promotion}
                                </span>
                                ${item.brief}
                            </p>
                            <p class="price">
                                <i>￥</i>
                                ${item.salePrice}.00 
                            </p>
                        </div>
                    </a>
                </li>`;  
        }else{
            str +=`
            <li class="spu-item">
                    <a href="./detail.html?id=${item.id}" title="${item.skuName}">
                        <div class="crner-good">
                            <img src="${item.corner.thumbnailPic}">
                        </div>
                        <div class="figure">
                            <img alt=""  src="${item.images[0].bigPic}">
                        </div>
                        <div class="spu-info">
                            <p class="name">${item.skuName}</p>
                            <p class="feature">
                                <span class="sale-point">${item.promotion}
                                </span>
                                ${item.brief}
                            </p>
                            <p class="price">
                                <i>￥</i>
                                ${item.salePrice}.00 
                            </p>
                        </div>
                    </a>
                </li>`; 
        }
           
        }       
    );
    rrr.innerHTML = str;   
}