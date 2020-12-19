let categoryBox = document.querySelectorAll(".category_box");
let phoneH = document.querySelector("#phoneH");
let phoneJ = document.querySelector("#phoneJ");
let phoneP = document.querySelector("#phoneP");
console.log(categoryBox);
// 轮播图处的商品种类的span标签
jQuery(".category_sub li a").append(jQuery("<span></span>"));
jQuery(".category_sub li a").each(function(index,ele){
    jQuery(".category_sub li a").eq(index).hover(function(){
        jQuery(".category_sub li a span").eq(index).css("display","block");
    },function(){
        jQuery(".category_sub li a span").eq(index).css("display","none");
    });
});


// 请求数据
jQuery.ajax({
	type:"get", //使用get方式
	url: "./data/index.json", //json文件相对于这个HTML的路径
	dataType:"json",
	success:function(res) {
        //这个res就是json数据
        let date = res.data.navigateVos;
        let dates = res.data.homeMetaVO.homeFloorList[1].elementList;
        let datej = res.data.homeMetaVO.homeFloorList[2].elementList;
        let dateP = res.data.homeMetaVO.homeFloorList[3].elementList;
        console.log(dates);
        render(date);
        renderT(dates);
        renderJ(datej,phoneJ);
        renderJ(dateP,phoneP);
	},
	error:function() {
		alert("请求失败");
	}
});
// category_box
// console.log($(".category_li"));
jQuery(".category_li").each(function(index,ele){
    jQuery(".category_li").eq(index).hover(function(){
        jQuery(".category_box").eq(index).css("display","block");
    },function(){
        jQuery(".category_box").eq(index).css("display","none");
    });
});

// 数据渲染
function render(date){
    date.forEach(function(item,index){        
        let str = `
        <div class="category_detail">
        <a href="" class="category_all">
            全部${item.firstCategory.name}
        <span class="arrow"></span>
        </a>
        <p>${item.firstCategory.name}</p>
        `;
         str += `<ul class="category_sub">`;
         item.subCategories.forEach(ele =>{
             str +=`<li>
             <a href="" style="display: block; background-image: url(&quot;${ele.imgUrl}&quot;);">
             ${ele.name}
             </a>
            </li>`;  
         });
         str += ` </ul>
         <ul class="category_product">`;
         item.commoditySpus.forEach(eles =>{
            str +=` <li>
            <i class="icon_tag"></i>
            <a href="">
                <img alt="" src="${eles.imgUrl}">
                <span>${eles.name}</span>
            </a>
        </li>`;  
        });
        str += `    </ul>
        </div>`;
        categoryBox[index].innerHTML = str;
    });
}


// 热卖专区
function  renderT(www){
    let str1 = ``; 
    www.forEach(function(item,index){
            str1 +=`
            <li class="box">
            <a  href="" >
                <img alt="" src="${item.picSrc}">
            </a>
            <div class="prodinfo">
                <p class="name">${item.name}</p>
                <p class="feature">${item.spec}</p>
                <p class="rmb-symbol"><i>￥</i>${item.salePrice}.00</p>
            </div>
        </li>`; 
        
    });
    phoneH.innerHTML = str1;   
}

//精品手机
function  renderJ(DDD,rrr){
    let str2 = ``; 
    DDD.forEach(function(item,index){
        if(!item.spec){
            str2 += `<li class="boxImg">
            <a  href="" >
                <img alt="" src="${item.picSrc}">
            </a>
        </li>`;
        }else{
            str2 +=`
            <li class="box">
            <a  href="" >
                <img alt="" src="${item.picSrc}">
            </a>
            <div class="prodinfo">
                <p class="name">${item.name}</p>
                <p class="feature">${item.spec}</p>
                <p class="rmb-symbol"><i>￥</i>${item.salePrice}.00</p>
            </div>
           </li>`; 
        }       
    });
    rrr.innerHTML = str2;   
}

    


    









  