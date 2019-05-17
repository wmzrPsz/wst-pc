/**
 * 公共
 * 2018/08/02
 * */
$(function(){
    //注册
     $(".land_jia_b ul li").click(function(){
      $(this).addClass("lan_jia_c").siblings("li").removeClass("lan_jia_c");
       console.log("--注册--");
        var i=$(this).index();
        console.log(i);
      $(this).parents(".land_jia").find(".mobile").eq(i).removeClass("diyi").siblings(".mobile").addClass("diyi");
     });
     //商家注册
     $(".land_jia_b ul li").click(function(){
       console.log("--商家注册--");
        var i=$(this).index();
        console.log(i); 
        $(this).parents(".administration_z").find(".administration").eq(i).removeClass("diyi").siblings(".administration").addClass("diyi");
     })
     //登录
     $(".Land_jia_dian").click(function(){
      $(".dibu_jia").removeClass("diyi");
      $(".Land_jia").removeClass("diyi");
     });
     $(".Land_jia_f").click(function(){
      $(".dibu_jia").addClass("diyi");
      $(".Land_jia").addClass("diyi");
     });

     $(".dianji_a > li").click(function(){

    $(this).addClass("baoche").siblings("li").removeClass("baoche");
    });

    //public高亮
    $(".ez_public_list > li").click(function(){
    $(this).addClass("active").siblings("li").removeClass("active");
    });

    //头部导航高亮
    $(".ez-navlist > li").click(function(){
        $(this).addClass("active").siblings("li").removeClass("active");
    });
    //分类导航展开与收起
    $(".ez-nav-open").click(function(){
        $(".ez-navlist").animate({height:'305px'});
        $(this).css('display','none');
        $(".ez-nav-close").css('display','inline-block');
    });

    $(".ez-nav-close").click(function(){
        $(".ez-navlist").animate({height:'195px'});
        $(this).css('display','none');
        $(".ez-nav-open").css('display','inline-block');
    });

    //头部城市选择高亮
    $(".ez-citylist > li").click(function(){
        $(this).addClass("active").siblings("li").removeClass("active");
    });

    $(".ez-nav-tabs > li").click(function(){
        $(this).addClass("active").siblings("li").removeClass("active");
    });

    //切换选项卡
    $("#app").on('click','.ez-nav-tabs > ul >li > a',function(){
        var i=$(this).parent("li").index();
        $(this).parent("li").addClass("active").siblings("li").removeClass("active");
        $(this).parents(".ez-nav-tabs").find(".tab-pane").eq(i).addClass("active").siblings(".tab-pane").removeClass("active");
    });

    //版块选项卡切换
    $(".ez-title-nav > li").click(function(){
        var i=$(this).index();
        $(this).addClass("active").siblings("li").removeClass("active");
        $(this).parents(".ez-index-box").next('.tab-content').find(".tab-pane").eq(i).addClass("active").siblings(".tab-pane").removeClass("active");
    });

    $(".news-card-no").click(function(){
        console.log("no");
        $(this).addClass("active").siblings(".news-card-no").removeClass("active");
    });

    //首页-目的地列表切换
    $(".country-list > li").click(function(){
        console.log("--目的地列表--");
        var i=$(this).index();
        console.log(i);
        $(this).addClass("active").siblings("li").removeClass("active");
        $(this).parents(".citylist-content").find(".city-box").eq(i).addClass("active").siblings(".city-box").removeClass("active");
    });

    //右侧栏电话图标
    $(".ez-btn-phone").click(function(){
        console.log("phone");
        $(this).next(".ez-tooltip-phonecall").toggle();
        $(".ez-tooltip-qq").hide();
    });

    //右侧栏QQ图标
    $(".ez-btn-qq").click(function(){
        console.log("qq");
        $(this).next(".ez-tooltip-qq").toggle();
        $(".ez-tooltip-phonecall").hide();
    });

    //点赞
    $(".btn-like").click(function(){
        console.log("like");
        $(this).toggleClass("icon-heart");
        $(this).toggleClass("icon-heart-s");
        $(this).toggleClass("text-lightorange");
        //$(this).toggleClass("text-orange");
    });

    //返回顶部
    $('.back-to-top>a').click(function(){
        $('html , body').animate({scrollTop: 0},'slow');
    });


    $("#app").on("click", '.back-to-top>a', function(){
        $('html , body').animate({scrollTop: 0},'slow');
    })

    //排序图标切换
    $('.ez-btn-sort').click(function(){
        $(this).children('i').toggleClass('caret-up');
    });

    //五星评分
    //$('#star').raty({ path: '../../images' });

    //商务制定-行程制定 列表切换
    $(".ez-scroll-content .scroll-box li a").click(function(){
        console.log('行程制定');
        var i=$(this).parent('li').index();
        console.log(i);
        $(this).addClass("active").siblings("li").removeClass("active");
        console.log($(".trip-wrap").length);
        $(this).parents(".ez-trip-body").children(".trip-wrap").eq(i).addClass("active").siblings(".trip-wrap").removeClass("active");
    });

    // n日游切换
    $(".trip-scroll-box li a").click(function(){
        var i=$(this).parent('li').index();
        $(this).parent('li').addClass("active").siblings("li").removeClass("active");
        $(this).parents(".trip-aside-header").next(".trip-aside-content").children('.trip-aside-tabpane').eq(i).addClass("active").siblings(".trip-aside-tabpane").removeClass("active");
    });

    // InputNumber计数器组件
    // $(".ez-counter .counter-minus").click(function(){
    //     var counter =$(this).parent('.ez-counter').children('.counter-num');
    //     var min=parseInt(counter.attr('min'));
    //     var count=parseInt(counter.val())-1;
    //     if(count<min) return;
    //     counter.val(count);
    // });
    // $(".ez-counter .counter-add").click(function(){
    //     var counter =$(this).parent('.ez-counter').children('.counter-num');
    //     var max=parseInt(counter.attr('max'));
    //     var count=parseInt(counter.val())+1;
    //     if(count>max) return;
    //     counter.val(count);
    // });

     $(".text-gray .icon-like").click(function(){
        var counter =$(this).parent('.text-gray').children('.counter-num-like');
        var max=parseInt(counter.attr('max'));
        var count=parseInt(counter.val())+1;
        if(count>max) return;
        counter.val(count);
       
    });

      $(".ez-mr-50 .icon-like").click(function(){
        var counter =$(this).parent('.ez-mr-50').children('.counter-num-like');
        var max=parseInt(counter.attr('max'));
        var count=parseInt(counter.val())+1;
        if(count>max) return;
        counter.val(count);
       
    });

    //景点搜索
    // $(".ez-search-input").click(function(){
    //     $(".ez-scenic-search .citylist-content").slideUp(100);
    //     $(".ez-scenic-search .search-result-content").slideToggle(200);
    // });
    $("#app").on("click", ".ez-search-input",()=>{
        $(".ez-scenic-search .citylist-content").slideUp(100);
        $(".ez-scenic-search .search-result-content").slideToggle(200);
    })

    //景点搜索-景点选择
    // $(".select-scenic>a").click(function(){
    //     $(".ez-scenic-search .search-result-content").slideUp(100);
    //     $(".ez-scenic-search .citylist-content").slideToggle(200);
    // });
    $("#app").on("click", ".select-scenic>a",()=>{
        $(".ez-scenic-search .search-result-content").slideUp(100);
        $(".ez-scenic-search .citylist-content").slideToggle(200);
    })

    //景点搜索-下拉列表选择
    $(".ez-scenic-search .city-list a").click(function(){
        var city=$(this).text();
        $(".ez-scenic-search .ez-search-input").val(city);
    });

    // 服务定制项目选中
    $(".business-trip-list li a").click(function(){
        $(this).toggleClass("active");
    });

    // 玩家认证-擅长
    // $(".skill-list>li>a").click(function(){
    //     $(this).toggleClass("active");
    // });
    // public
    $(".toggle-list>li").click(function(){
        $(this).toggleClass("active");
    });

    // L1-3-1景点详情：点击小图切换大图
    $(".detail-img-xs .scroll-box li>a").click(function(){
        $(this).parent("li").addClass("active").siblings('li').removeClass("active");
        var imgsrc=$(this).children('img').attr('src');//获取小图路径
        $(".ez-scenic-detail .detail-img>img").attr('src',imgsrc);
    });

    // M1-1目的地详情：点击小图切换大图
    $(".modal-img-xs .scroll-box li>a").click(function(){
        $(this).parent("li").addClass("active").siblings('li').removeClass("active");
        var imgsrc=$(this).children('img').attr('src');//获取小图路径
        $(".ez-modal-img .modal-img-lg>img").attr('src',imgsrc);
    });

    // // k油轮：点击小图切换大图
    // $(".travel-plan-content-list_b ul li>a").click(function(){
    //     $(this).parent("li").addClass("kun").siblings('li').removeClass("kun");
    //     var imgsrc=$(this).children('img').attr('src');//获取小图路径
    //     $(".travel-info-local .local-info-left>img").attr('src',imgsrc);
    // });
    
    // k油轮：点击小图切换大图
    $(".travel-plan-content-list_b").on("click","ul li>a",function(){
        $(this).parent("li").addClass("kun").siblings('li').removeClass("kun");
        var imgsrc=$(this).children('img').attr('src');//获取小图路径
        $(".travel-info-local .local-info-left>img").attr('src',imgsrc);
    })
    //M1-1目的地详情:全文展开已收起
    $("#app").on("click", ".ez-place-open", function(){
        //$(this).parents('.place-city-text').find('.text-content').animate({height:'auto'});
        $(this).parents('.place-city-text').find('.text-content').addClass('open');
        $(this).hide();
        $(".ez-place-close").show();
    });
    $("#app").on("click", ".ez-place-close", function(){
        //$(this).parents('.place-city-text').find('.text-content').animate({height:'100px'});
        $(this).parents('.place-city-text').find('.text-content').removeClass('open');
        $(this).hide();
        $(".ez-place-open").show();
    });
    $("#app").on("click", ".place-video-play", function(){
        $("#vedioAlertModal").show();
    });




    //关于我们：列表切换
    // $(".about-nav-list > li ").click(function(){
    //     //console.log('关于我们');
    //     var i=$(this).index();
    //  //   console.log(i);
    //     $(this).addClass("active").siblings("li").removeClass("active");
    //     $(this).parents(".wrap-about").find(".about-tabpane").eq(i).addClass("active").siblings(".about-tabpane").removeClass("active");
    // });

    //关于我们：列表切换
    $("#app").on("click",".about-nav-list li ",function(){
        var i=$(this).index();
        $(this).addClass("active").siblings("li").removeClass("active");
        $(this).parents(".wrap-about").find(".about-tabpane").eq(i).addClass("active").siblings(".about-tabpane").removeClass("active");
    })

    //我的收藏：列表切换
    $(".ez-order-nav > li ").click(function(){
        //console.log('关于我们');
        var i=$(this).index();
        $(this).addClass("active").siblings("li").removeClass("active");
        $(this).parents(".wrap-about").find(".about-tabpane").eq(i).addClass("active").siblings(".about-tabpane").removeClass("active");
    });

    //我的收藏：批量选择
    // $(".collection-tabpane > .box-card").click(function(){
    //     $(this).toggleClass("selected");
    // });

    //我的收藏：批量选择
    // $(".collection-tabpane").on("click",".box-card",function(){
    //     $(this).toggleClass("selected");
    // });

    //我的收藏：批量管理
    $(".panel-header .ez-btn-batch").click(function(){
        $(this).hide();
        $(this).parents('.panel-header').find('.panel-header-tool').show()
    });
    //我的收藏：完成
    $(".panel-header .ez-btn-submit").click(function(){
        $(this).parent('.panel-header-tool').hide();
        $('.panel-header .ez-btn-batch').show()
    });


    /** jd-search start*/
    //分类筛选
    // $('.ez-search-multiple').click(function(){ //多选
    //     console.log("multiple"+$(this).attr("class"));
    //     $(this).addClass('active');
    //     $(this).parents('.sl-wrap').addClass('multiple extend');
    // });
    
    // $('.ez-search-cancel').click(function(){ //取消多选
    //     console.log("multiple cancel");
    //     $('.ez-search-multiple').removeClass('active');
    //     $(this).parents('.sl-wrap').removeClass('multiple extend');
    //     $(this).parents('.sl-wrap').find('li').each(function(){
    //         if($(this).hasClass('selected')) $(this).removeClass('selected');
    //     });
    // });
    // $('.ez-search-confirm').click(function(){ //确定多选
    //     console.log("multiple onfirm");
    //     $('.ez-search-multiple').removeClass('active');
    //     $(this).parents('.sl-wrap').removeClass('multiple extend');
    // });
    // $('.ez-search-more').click(function(){ //展开与收起
    //     console.log("multiple");
    //     $(this).parent('.sl-ext').parent('.sl-wrap').toggleClass('extend');
    //     $(this).children(".sl-btn-open").toggle();
    //     $(this).children(".sl-btn-close").toggle();
    // });
    // $('.sl-v-list li a i').click(function(){
    //     $(this).parents('li').toggleClass('selected');
    // });

    // $(".ez-selector").on("click",".ez-search-multiple",function(){  //多选
    //     console.log("multiple");
    //     $(this).addClass('active');
    //     $(this).parents('.sl-wrap').addClass('multiple extend');
    // });

    // $(".ez-selector").on("click",".ez-search-cancel",function(){  //取消多选
    //     console.log("multiple cancel");
    //     $('.ez-search-multiple').removeClass('active');
    //     $(this).parents('.sl-wrap').removeClass('multiple extend');
    //     $(this).parents('.sl-wrap').find('li').each(function(){
    //         if($(this).hasClass('selected')) $(this).removeClass('selected');
    //     });
    // });

    // $(".ez-selector").on("click",".ez-search-confirm",function(){  //确定多选
    //     console.log("multiple onfirm");
    //     $('.ez-search-multiple').removeClass('active');
    //     $(this).parents('.sl-wrap').removeClass('multiple extend');
    // });

    $("#app").on("click",".ez-search-more",function(){  //展开与收起
        console.log("multiple");
        $(this).parent('.sl-ext').parent('.sl-wrap').toggleClass('extend');
        $(this).children(".sl-btn-open").toggle();
        $(this).children(".sl-btn-close").toggle();
    });

    $("#app").on("click",".sl-date-more",function(){   //日期展开与收起
        $(this).parent('.sl-ext').parent('.sl-wrap').toggleClass('extend');
        $(this).children(".date-btn-open").toggle();
        $(this).children(".date-btn-close").toggle();
        $(this).parents('.sl-wrap').find(".sl-date-list").toggle();
    });

    // $(".ez-selector").on("click",".sl-v-list li",function(){  //点击li
    //     $(this).toggleClass('selected');
    // });


    // $('.sl-date-list>ul>li').on('click',function () {
    //     $(this).toggleClass('date-selected');
    // });

   //获取选中的分类(单选)
    $('.ez-selector .sl-wrap li a ').click(function(){ //添加
        // var sKey= $(this).parents(".sl-wrap").children('.sl-key').text();
        // var sName= $(this).text();
        // var sLine= $(this).parents(".s-line").index();
        // var isMultiple=$(this).parents(".sl-wrap").hasClass('multiple');//是否多选
        // console.log("已选--:"+isMultiple);
        // if(isMultiple) return;
        // //添加已选选项
        // addItem(sKey,sName,sLine);

        // //移除已选选项
        // removeItem();

        var isMonth = $(this).parent("li").parent("ul").hasClass('sl-month-list');//是否日期选择


        if(isMonth){
         //   renderDate($(this));
            // $('.sl-date-list>ul>li').on('click',function () {
            //     $(this).toggleClass('date-selected');
            // });

            // $(this).parent("li").addClass('active').siblings('li').removeClass('active');
            $(this).parents('.sl-wrap').addClass('extend');
            $(this).parents('.sl-wrap').find(".date-btn-open").hide();
            $(this).parents('.sl-wrap').find(".date-btn-close").show();
            $(this).parents('.sl-wrap').find(".sl-date-list").show();

        }else{
            // var sKey= $(this).parents(".sl-wrap").children('.sl-key').text();
            // var sName= $(this).text();
            // var sLine= $(this).parents(".s-line").index();
            // var isMultiple=$(this).parents(".sl-wrap").hasClass('multiple');//是否多选
            // console.log("已选--:"+isMultiple);
            // if(isMultiple) return;

        //     //添加已选选项
        //    addItem(sKey,sName,sLine);

        //     //移除已选选项
        //    removeItem();
        }

    });


    


    // //获取选中的分类(多选)
    // $('.ez-search-confirm').click(function(){ //添加
    //     console.log("--已选--");
    //     var sKey= $(this).parents(".sl-wrap").children('.sl-key').text();
    //     var sLine= $(this).parents(".s-line").index();
    //     console.log(sKey);
    //     console.log(sLine);
    //     //多选
    //     var selectItem=[];
    //     $(this).parents('.sl-wrap').find('li').each(function(){
    //         if($(this).hasClass('selected')) {
    //             selectItem.push($(this).children('a').text());
    //             $(this).removeClass('selected');
    //         }
    //     });
    //     console.log(selectItem);
    //     var sName=selectItem.join(',');
    //     addItem(sKey,sName,sLine);//添加已选选项
    //     removeItem();//移除已选选项
    // });
    /** jd-search end*/

    /** 图片左右滚动 */
    // setTimeout(function(){
    //     moveBox();
    //     moveList();
    // },500)

     
    // function renderDate(el){
    //     var year = new Date().getFullYear(),//年
    //         month= parseInt(el.text()),//月
    //         day = new Date(year,month,0).getDate(); //当月总天数
    //         console.log(`day----${day}`);
    //     var eleTemp = [];
    //     for(var d=0;d<day;d++){
    //         eleTemp.push('<li class=""><a class="sl-date-day">'+(d+1)+'</a>号<span class="selectFlag"></span></li>');
    //     }
    //     document.querySelector('.sl-date-list ul').innerHTML = eleTemp.join('');
    // }


    $(".ez-btn").click(function(){
     
    });

   $(".n_b").click(function(){
      $(".n_c").slideToggle(200);
   });


});


/** jd-search 添加已选选项 */
// function addItem(sKey,sName,sLine){
//     var sItem='';
//     sItem+='<li>';
//     sItem+='<span class="crumb-key">'+sKey+'</span>：';
//     sItem+='<span class="crumb-value">'+sName+'</span>';
//     sItem+='<i class="iconfont icon-close crumb-remove"></i>';
//     sItem+='</li>';
//     $('.selected-list').append(sItem);
//     $('.s-line').eq(sLine).hide();
// }

/** jd-search 移除已选选项 */
// function removeItem(){
//     $('.crumb-remove').click(function(){
//         console.log("--移除--");
//         console.log($(this).parent('li'));
//         var rmKey=$(this).parent('li').children('.crumb-key').text();
//         $(this).parent('li').remove();
//         $(".ez-selector .s-line").each(function(){
//             var ezLine = $(this);
//             var lineKey = $(this).find('.sl-key').text();
//             console.log(rmKey+'---'+lineKey);
//             if(rmKey==lineKey){
//                 ezLine.show();
//                 return false;
//             }
//         })
//     });
// }

/** 图片左右滚动 */
// function moveBox(){
//     var cWidth=$(".scroll-box li").width();   //单个子元素所需宽度
//     var boxWidth = $(".scroll-wrap").width();  //子元素所在区域宽度
//     var sum = $(".scroll-wrap ul").children("li").length;    //子元素数量
//     var num = parseInt(boxWidth/cWidth);   //需要显示的子元素的数量
//     var len = sum-num;  //子元素可移动次数（被隐藏的子元素数量）
//     var i=0;
//     $(".scroll-btns .scroll-right").click(function(){
//         i++;
//         if(i<=len){
//             $(".scroll-box").css("left",-(cWidth*i));
//         }else{
//             i=0;
//             $(".scroll-box").css("left",0);
//         }
//     });
//     $(".scroll-btns .scroll-left").click(function(){
//         i--;
//         if(i>=0){
//             $(".scroll-box").css("left",-(cWidth*i));
//         }else{
//             i=0;
//             $(".scroll-box").css("left",0);
//         }
//     });
// }



// /** 菜单左右滚动 */
// function moveList(){
//     var cWidth=$(".trip-scroll-box li").width();   //单个子元素所需宽度
//     var boxWidth = $(".trip-scroll-wrap").width();  //子元素所在区域宽度
//     var sum = $(".trip-scroll-wrap ul").children("li").length;    //子元素数量
//     var num = parseInt(boxWidth/cWidth);   //需要显示的子元素的数量
//     var len = sum-num;  //子元素可移动次数（被隐藏的子元素数量）
//     var i=0;
//     $(".trip-scroll-btns .scroll-right").click(function(){
//         i++;
//         if(i<=len){
//             $(".trip-scroll-box").css("left",-((cWidth+1)*i));
//         }else{
//             i=0;
//             $(".trip-scroll-box").css("left",0);
//         }
//     });
//     $(".trip-scroll-btns .scroll-left").click(function(){
//         i--;
//         if(i>=0){
//             $(".trip-scroll-box").css("left",-((cWidth+1)*i));
//         }else{
//             i=0;
//             $(".trip-scroll-box").css("left",0);
//         }
//     });


// //添加的点赞
//  $(".icon-eye").click(function(){
//   console.log("like_icon");
//         $(this).toggleClass("yianying_lick");
       
//  });

//  //添加n日游列表的切换
//  $(".travel-list-head > div >ul >li").click(function(){
//         var i=$(this).index();
//         console.log(i);
//         $(this).parents(".travel-list").find(".travel-list-content-list").eq(i).addClass("active").siblings(".travel-list-content-list").removeClass("active");
//     });

//  $(".trip-scroll-box > ul li ").click(function(){
//    $(this).addClass("travel-list-head-span-style").siblings("li").removeClass("travel-list-head-span-style");
//  });

//  $(".trip-scroll-box > ul li ").click(function(){
//         var i=$(this).index();
//         console.log(i);
//         $(this).parents(".tourism-custom").find(".travel-list-content-list").eq(i).addClass("travel-list-head-span-style_xians").siblings(".travel-list-content-list").removeClass("travel-list-head-span-style_xians");
//     });

//  //点击下一页
//    var  current_page=0;
//         $(".text-center").children().click(function(){
//            var i=$(this).index();
//            var page=Math.ceil($('.trip-aside-card').length/3)-1;
//             if (i==0) {//上一页

//                 current_page--;
//                 if(current_page < 0){
//                     current_page= 0;
//                 }
//                 $('.huan_aa').stop().animate({'margin-top':current_page*-360+'px'});
//             }

//              if (i==1) {//下一页

//                 current_page++;
//                 if (current_page>page) {
//                     current_page=0;
//                 }
//                 $('.huan_aa').stop().animate({'margin-top':current_page*-360+'px'});
//             }
           
//         });


        


 
// }



//点击清空<input>的value里的数字
window.onload=function()
{
    var oBtn=document.getElementById('btn');
    var oTxt=document.getElementById('txt');
    if(oBtn != null){
        oBtn.onclick=function()
        {      
          if(this){
                        oTxt.value='';
               }
                 
        }
    }


}

      