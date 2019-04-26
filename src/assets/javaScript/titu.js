/**
 * 公共
 * 2018/08/02
 * */
$(document).ready(function(){

   
    //分类导航展开与收起
   
//首页点击高亮
    $(".dianji_aa_a li").click(function(){
     alert("5555");
     $(this).addClass('answw').siblings("li").removeClass("answw");

    });

//搜索


     $(".tab_menu li").click(function(){

     $(this).addClass('hov_tab').siblings("li").removeClass("hov_tab");
    });



//注意事项列表换

  $(".tab_menu_ww li ").click(function(){

     $(this).addClass('xiabiaoq').siblings("li").removeClass("xiabiaoq");
    });
   $(".tab_menu_ww li a").click(function(){
       var i=$(this).parent("li").index();
      console.log(i);
     $(this).parents(".tab_menu_ww_a").find(".tab_menu_ee").eq(i).addClass("wan_aaa_b").siblings(".tab_menu_ee").removeClass("wan_aaa_b");
   });

     

   $(".tab_menu li").click(function(){

     $(this).addClass('selected').siblings("li").removeClass("selected");
    });

//鼠标点击样式
     $(".dianji_a li").click(function(){
    $(this).addClass('subiao').siblings("li").removeClass("subiao");
  });

       $(".dianji_a td").click(function(){
    $(this).addClass('subiao').siblings("td").removeClass("subiao");
  });

 //电话

   $("#myBtn").click(function(){
        console.log("phone");
        $(this).next("#myDiv").toggle();
        $(".ez-tooltip-qq").hide();
    });
   

/*换列表**************************************/

     $(".wanjia_huan_d>li > a").click(function(){
        console.log("tab");
        var i=$(this).parent("li").index();
       
        console.log(i);
        $(this).parents(".wanjia_huan_a").find(".wanjia_huan_a_c").eq(i).addClass("wan_aaa_b").siblings(".wanjia_huan_a_c").removeClass("wan_aaa_b");
    });


/*热门城市换列表***********************************************************************/
 //京东列表
$(".jindong_huan_a>li > a").click(function(){
        console.log("jing");
        var i=$(this).parent("li").index();
       
        console.log(i);
        $(this).parents(".jindong_huan").find(".jindong_huan_b").eq(i).addClass("wan_aaa_b").siblings(".jindong_huan_b").removeClass("wan_aaa_b");
    });

//目的地列表
     $(".dianji_m li ").click(function(){
     $(this).addClass('meiguo_huan').siblings("li").removeClass("meiguo_huan");
    });

     $(".dianji_m >li>a").click(function(){
        console.log("meiguoo");
        var i=$(this).parent("li").index();
       
        console.log(i);
        $(this).parents(".mu_huang_b").find(".mu_huan_a").eq(i).addClass("wan_aaa_b").siblings(".mu_huan_a").removeClass("wan_aaa_b");
    });




/*
//玩家选择
     $(".duox").click(function(){
       console.log("multiple_duox");
      $(this).addClass("duox_aa");
        $(".table_f").animate({height:'100%'});

       $(this).parents(".duano_aa_a").addClass("bo_10");
        $(this).parents(".duano_aa_a").find(".table_rrwq").addClass("answw");
     });

     
    
//多选和更多
     $(".table_gen").click(function(){
        $(".table_f").animate({height:'100%'});
        $(this).css('display','none');
        $(".table_gen_a").css('display','inline-block ');
    });

//收起
    $(".table_gen_a").click(function(){
        $(".table_f").animate({height:'40px'});
        $(this).css('display','none');
        $(".table_gen").css('display','inline-block');

    });

    
    $(".duano_quxuao").click(function(){
      $(".table_f").animate({height:'40px'});
      $(this).parents(".duano_aa_a").find(".table_rrwq").addClass("ansaa");
    });

    */
   $(".sl-e-more").click(function(){
     $(this).children("p").toggle();
    
   });

   $(".xiao_ddd").click(function(){
     $(this).parents(".s-line").animate({height:'100%'});
     $(this).parents(".table_cv").find(".xi_af").addClass("answw ");
   });
   $(".xiaoxo_s").click(function(){
      $(this).parents(".s-line").animate({height:'40px'});
   });
//多选
   $(".xi_duanx").click(function(){
      $(this).addClass("xi_ae");
      $(this).parents(".s-line").animate({height:'100%'});
       $(this).parents(".table_cv").addClass("bo_10");
       $(this).parents(".table_cv").addClass("beisss_a")
      $(this).parents(".table_cv").find(".xi_af").addClass("answw ");
        });
//取消
   $(".xi_ac,.xi_ab").click(function(){
    $(this).parents(".s-line").animate({height:'40px'});
     $(this).parents(".table_cv").find(".xi_af").removeClass("answw");
      $(this).parents(".table_cv").removeClass("bo_10");
       $(this).parents(".table_cv").removeClass("beisss_a");
     
   });

//添加
    $(".xi_a .sl-v-list ul li a").click(function(){

       var sKey= $(this).parents(".s-line").children('.sl-key').text();
       var sName= $(this).text();
       var sLine= $(this).parents(".s-line").index();
       var isMultiple=$(this).parents(".s-line").hasClass('bo_10');//是否多选
        console.log("已选--:"+isMultiple);
     
        if(isMultiple) return;
        //添加已选选项  
    
          addItem(sKey,sName,sLine,);
        //移除已选选项
        removeItem();

    });

    function addItem(sKey,sName,sLine){
    var sItem='';
    sItem+='<li class="crumb-key_a">';
    sItem+='<span class="crumb-key">'+sKey+'</span>：';
    sItem+='<span class="crumb-value">'+sName+'</span>';
    sItem+='<a class="iconfont icon-close crumb-remove"><img src="../img/A/web/cglv_close_icon.png"></a>';
    sItem+='</li>';
    $('.selected-list').append(sItem);
    //$('.s-line').eq(sLine).hide();//删除；
   
}
  /** jd-search 移除已选选项 */
function removeItem(){
    $('.crumb-remove').click(function(){
        console.log("--移除--");
        console.log($(this).parent('li'));
        var rmKey=$(this).parent('li').children('.crumb-key').text();
        $(this).parent('li').remove();
      
    });
};

   setTimeout(function(){
        movettt();
        moveList();
        movetttqq();
    },500);

 

    function moveList(){
    var cWidth=$(".naeyou_a li").width();   //单个子元素所需宽度
    var boxWidth = $(".naeyou_b").width();  //子元素所在区域宽度
    var sum = $(".naeyou_b ul").children("li").length;    //子元素数量
    var num = parseInt(boxWidth/cWidth);   //需要显示的子元素的数量
    var len = sum-num;  //子元素可移动次数（被隐藏的子元素数量）
    var i=0;
    $(".naeyou_e").click(function(){
        
        i++;
        if(i<=len){
            $(".naeyou_a").css("left",-((cWidth+1)*i));
        }else{
            i=0;
            $(".naeyou_a").css("left",0);
        }
    });
    $(".naeyou_d").click(function(){
        i--;
        if(i>=0){
            $(".naeyou_a").css("left",-((cWidth+1)*i));
        }else{
            i=0;
            $(".naeyou_a").css("left",0);
        }
    });
}



  
//日游换
 $(".naeyou_c>li >a").click(function(){
        console.log("tab");
        var i=$(this).parent("li").index();
       
        console.log(i);
        $(this).parents(".dinhuan_eee").find(".dianhua_huang").eq(i).addClass("wan_aaa_b").siblings(".dianhua_huang").removeClass("wan_aaa_b");
    });


 //详细换
 
     $(".huant_e>li > a").click(function(){
        var i=$(this).parent("li").index();
        console.log(i);
        $(this).parents(".huant_c").find(".huant_a").eq(i).addClass("wan_aaa_b").siblings(".huant_a").removeClass("wan_aaa_b");
    });


    
  //上一页和下一页
     var  current_page=0;
        $(".dianji_x").children().click(function(){
           var i=$(this).index();
           var page=Math.ceil($('.dianhua_huang li').length/3)-1;
            if (i==0) {//上一页
            
                current_page--;
                if(current_page < 0){
                    current_page= 0;
                }
                $('.dianhua_huang ul').stop().animate({'margin-top':current_page*-900+'px'});
            }

             if (i==1) {//下一页

                current_page++;
                if (current_page>page) {
                    current_page=0;
                }
                $('.dianhua_huang ul').stop().animate({'margin-top':current_page*-900+'px'});
            }
           
        });


//地图
 var map = new BMap.Map("allmap", {
            minZoom: 5,
            maxZoom: 19
        });

        // 初始化地图，设置中心点和显示级别
        map.centerAndZoom(new BMap.Point(121.36564, 31.22611), 19);

        // 开启鼠标滚轮缩放功能，仅对PC上有效
        map.enableScrollWheelZoom(true);

        // 将控件（平移缩放控件）添加到地图上
        map.addControl(new BMap.NavigationControl());

        // 为地图增加点击事件，为input赋值
        map.addEventListener("click", function(e) {
            document.getElementById('lat').value = e.point.lat;
            document.getElementById('lng').value = e.point.lng;

        });

        // 创建位置检索、周边检索和范围检索
        var local = new BMap.LocalSearch(map, {
            renderOptions: {
                map: map
            }
        });

        // 发起检索
        function theLocation() {
            var city = document.getElementById("cityName").value;
            if (city != "") {
                local.search(city);
            }
        };

        // 弹出经纬度 
        function submit() {
            var lat = document.getElementById('lat');
            var lng = document.getElementById('lng');
            alert("经度：" + lng.value + "\n" + "纬度：" + lat.value);
        };













  })


  

function movettt(){
    var cWidth=$(".dianhua_xtu_b li").width();   //单个子元素所需宽度
    var boxWidth = $(".dianhua_www").width();  //子元素所在区域宽度
    var sum = $(".dianhua_www ul").children("li").length;    //子元素数量
    var num = parseInt(boxWidth/cWidth);   //需要显示的子元素的数量
    var len = sum-num;  //子元素可移动次数（被隐藏的子元素数量）
    var i=0;
    $(".naeyou_rr").click(function(){
        
        i++;
        if(i<=len){
            $(".dianhua_xtu_b").css("left",-((cWidth+28)*i));
        }else{
            i=0;
            $(".dianhua_xtu_b").css("left",0);
        }
    });
    $(".naeyou_r").click(function(){
        i--;
        if(i>=0){
            $(".dianhua_xtu_b").css("left",-((cWidth+28)*i));
        }else{
            i=0;
            $(".dianhua_xtu_b").css("left",0);
        }
    });
}


function movetttqq(){
    var cWidth=$(".dianhua_xtu_b_aa li").width();   //单个子元素所需宽度
    var boxWidth = $(".dianhua_www").width();  //子元素所在区域宽度
    var sum = $(".dianhua_www ul").children("li").length;    //子元素数量
    var num = parseInt(boxWidth/cWidth);   //需要显示的子元素的数量
    var len = sum-num;  //子元素可移动次数（被隐藏的子元素数量）
    var i=0;
    $(".naeyou_rr").click(function(){
        
        i++;
        if(i<=len){
            $(".dianhua_xtu_b_aa").css("left",-((cWidth+1)*i));
        }else{
            i=0;
            $(".dianhua_xtu_b_aa").css("left",0);
        }
    });
    $(".naeyou_r").click(function(){
        i--;
        if(i>=0){
            $(".dianhua_xtu_b_aa").css("left",-((cWidth+1)*i));
        }else{
            i=0;
            $(".dianhua_xtu_b_aa").css("left",0);
        }
    });
}


 