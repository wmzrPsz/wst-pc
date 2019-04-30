/*
 * @Description:  全局自定义指令
 * @Author: 彭善智
 * @LastEditors: 彭善智
 * @Date: 2019-04-30 11:29:34
 * @LastEditTime: 2019-04-30 11:51:11
 */

 //锚点跳转
Vue.directive('href',{
    inserted : function(el,binding){
    el.onclick = function(){
      document.documentElement.scrollTop = $("#"+binding.value).offset().top
    }
    }
})