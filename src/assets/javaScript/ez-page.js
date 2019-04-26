$(function () {
        $('.list-content-head-right li').click(function () {
            $(this).parent().children('li').children('div').css('display','none');
            $(this).parent().children('li').removeClass('list-content-head-right-style');
            $(this).children('div').css('display','block');
            $(this).addClass('list-content-head-right-style');
        });

        // 点击图片播放视频
        $(".ez-player-btn").click(function(){
            var url=$(this).children('img').attr('sp');
            var title=$(this).children('img').attr('title');
            $(".ez-player-modal .ez-video").attr('src',url);
            $(".ez-player-modal .modal-title").text(title);
            $('.ez-player-modal').modal('show');
            $('.ez-player-modal .ez-video').trigger('play');
        });

        // 关闭视频
        $(".video-close").click(function(){
            $('.ez-player-modal .ez-video').trigger('pause');
            $('.ez-player-modal').modal('hide');
        });
		

        /** 定制旅游计划 轮播 */
   //   var num=$('.travel-plan-content-list li').length-4;//显示个数-4
        var gifnum = 0;
        $('.travel-plan-content-next').on("click",function(e) {
            gifnum ++;
            if ( gifnum > $('.travel-plan-content-list_b li').length-4) {
                gifnum = 0;
            }
            $('.travel-plan-content ul').stop().animate({'left':gifnum*-90+'px'},500);
        });

        $('.travel-plan-content-prev').click(function(e) {
            gifnum--;
            if(gifnum < 0){
                gifnum= 0;
            }
            $('.travel-plan-content ul').stop().animate({'left':gifnum*-90+'px'},500);
        });


  /** k油轮 轮播 */
        // var num=$('.travel-plan-content-list_b li').length-4;//显示个数-4
        // var gifnum = 0;
        // $('.travel-plan-content-next').click(function(e) {
        //     gifnum ++;
        //     if ( gifnum > num ) {
        //         gifnum = 0;
        //     }
        //     $('.travel-plan-content ul').stop().animate({'left':gifnum*-45+'px'},500);
        // });

        // $('.travel-plan-content-prev').click(function(e) {
        //     gifnum--;
        //     if(gifnum < 0){
        //         gifnum= 0;
        //     }
        //     $('.travel-plan-content ul').stop().animate({'left':gifnum*-45+'px'},500);
        // });

		//日游标题
        var current_day=0;
        var current_day_page=$(".travel-list-head ul").children().length-2;

        $(".travel-list-head-prev").click(function(){
            current_day--;
            if(current_day < 0){
                    current_day= 0;
                }
            $(".travel-list-head ul").stop().animate({'left':current_day*-146+'px'},500);
        });

        $(".travel-list-head-next").click(function(){
            current_day++;
            if (current_day>current_day_page) {
                    current_day=0;
            }
            $(".travel-list-head ul").stop().animate({'left':current_day*-146+'px'},500);
        });

        //日游分页
        var  current_page=0;
        $(".travel-list-content-btn").children().click(function(){
            var a=$(this).index();
            var page=Math.ceil($('.travel-list-content-list ul li').length/3)-1;

            if (a==0) {//上一页
                current_page--;
                if(current_page < 0){
                    current_page= 0;
                }
                $('.travel-list-content-list ul').stop().animate({'top':current_page*-999+'px'},500);
            }
            if (a==1) {//下一页
                current_page++;
                if (current_page>page) {
                    current_page=0;
                }
                $('.travel-list-content-list ul').stop().animate({'top':current_page*-999+'px'},500);
            }
        });
		
		//注意事项
        $(".travel-prompt-hred li").click(function(){
            var i=$(this).index();
            $(".travel-prompt-hred li").children().removeClass('travel-prompt-hred-style');
            $(this).children().addClass('travel-prompt-hred-style');
            $('.travel-prompt-content').css('display','none');
            $('.travel-prompt-content').eq(i).css('display','inline-block');
        })

        //旅游每日行程详情
        $(".travel-trip li").click(function(){
            var i=$(this).index();
            $(this).parent().children('li').removeClass('travel-trip-style');
            $(this).addClass('travel-trip-style');

            $('.travel-time-plan').addClass('hidden-info');
            $('.travel-time-plan').eq(i).removeClass('hidden-info');
        })

        //常规路线 评价显示隐藏
        // $(".evaluation-click").click(function(){
        //     var n_this=$(this).parent().parent().next().next();
        //     var sclass=n_this.attr('class');
        //     if(sclass.indexOf("hidden-info")>-1){
        //         n_this.removeClass("hidden-info");
        //     }else{
        //         n_this.addClass("hidden-info");
        //     }
        // })


        try {
            //分页功能
            $('#travel-content-main-list-paging').jqPaginator({
                totalPages: 100,
                visiblePages: 6,
                currentPage: 1,
                onPageChange: function (num, type) {
                    $('#text').html('当前第' + num + '页');
                }
            });
        } catch(e) {}

        try{
            //日期范围
            laydate.render({
              elem: '#test6',
              range: true
            });
        }catch(e){}
        

        
    });

    // 购物数量加减
    // function numdec(num){
    //     var value=parseInt($(".local-number-con .floatl:eq("+num+") input").attr("value"));
    //     if (value==0) {return;}
    //     $(".local-number-con .floatl:eq("+num+") input").attr("value",value-1);
    // }
    // function numadd(num){
    //     var value=parseInt($(".local-number-con .floatl:eq("+num+") input").attr("value"));
    //     $(".local-number-con .floatl:eq("+num+") input").attr("value",value+1);
    // }
