$(function(){
    $('.search').kuCity();
    $('.search3').kuCity();



    //执行一个laydate实例
    //常规用法
    laydate.render({
      elem: '#test1' //指定元素
    });
    //国际版
    laydate.render({
      elem: '#test1-1'
      ,lang: 'en'
    }); 
    //年选择器
    laydate.render({
      elem: '#test2'
      ,type: 'year'
    });
    //年月选择器
    laydate.render({
      elem: '#test3'
      ,type: 'month'
    });
    //时间选择器
    laydate.render({
      elem: '#test4'
      ,type: 'time'
    });
    //时间选择器
    laydate.render({
      elem: '#test5'
      ,type: 'datetime'
    });
    //日期范围
    laydate.render({
      elem: '#test6'
      ,range: true
    });
    //年范围
    laydate.render({
      elem: '#test7'
      ,type: 'year'
      ,range: true
    });
    //年月范围
    laydate.render({
      elem: '#test8'
      ,type: 'month'
      ,range: true
    });
    //时间范围
    laydate.render({
      elem: '#test9'
      ,type: 'time'
      ,range: true
    });
    //日期时间范围
    laydate.render({
      elem: '#test10'
      ,type: 'datetime'
      ,range: true
    }); 
    //墨绿主题
    laydate.render({
      elem: '#test29'
      ,theme: 'molv'
    });
    //自定义颜色
    laydate.render({
      elem: '#test30'
      ,theme: '#393D49'
    });
    //格子主题
    laydate.render({
      elem: '#test31'
      ,theme: 'grid'
    });

   
});