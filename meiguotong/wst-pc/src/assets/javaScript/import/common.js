//通用js

//判断是否为空
function isNull(str) {
    return (str == '' || str == "" || str == null || str == undefined || str == "undefined");
}

//截取参数
function GetQuery(name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    let r = decodeURI(window.location.search).substr(1).match(reg);
    if(r != null)
        return unescape(r[2]);
    return null;
}

 //弹窗
function layerMsg(title,end=()=>{}){
   layer.msg(title,{
       time:2000,
       end:end
   });
}

//计算天数
function dataCountNum(date,num){  //data  yy-MM-dd
    let dd = new Date(date);
    dd.setDate(dd.getDate() + parseInt(num));//获取AddDayCount天后的日期 
    let y = dd.getFullYear();
    let m = dd.getMonth() + 1;//获取当前月份的日期 
    let d = dd.getDate();
    return y + "-" + ( m > 9? m : "0" + m )+ "-" + (d > 9 ? d : "0" + d);
}


//性别过滤器
Vue.filter('sexVc', function (value) {
    if (!value) return '';
    if(value == 1 ) return "男"; return "女";
})

//证件类型过滤器
Vue.filter('certTypeVc', function (value) {
    if (!value) return '';
    let content = "";
    switch (value) {
        case 1:  content = "身份证";  break;
        case 2:  content = "护照";    break;      
        case 3:  content = "本地ID";  break;
    }
    return content;
})

//导游类型过滤器
Vue.filter('guideTypeVc', function (value) {
    if (!value) return '';
    let content = "";
    switch (parseInt(value)) {
        case 1:  content = "当地玩家";  break;
        case 2:  content = "定制旅游-导游";    break;      
        case 3:  content = "定制旅游-司兼导";  break;
        case 4:  content = "包车/租车-导游";  break;
        case 5:  content = "包车/租车-司兼导";  break;
    }
    return content;
})

//车辆等级过滤器
Vue.filter('carLevelVc', function (value) {
    if (!value) return '';
    let content = "";
    switch (parseInt(value)) {
        case 1:  content = "一般";  break;
        case 2:  content = "舒适";    break;      
        case 3:  content = "很舒适";  break;
        case 4:  content = "非常舒适";  break;
    }
    return content;
})


Vue.filter('orderTypeVc', function (value) {
    if (!value) return '';
    let content = "常规路线";
  //  1.包车租车2.短程接送3.接送机4常规路线5.当地参团6.游轮7.景点门票8.当地玩家/导游9.酒店10.保险11.旅游定制13.商务定制14.商务旅游',
    switch (parseInt(value)) {
        case 1:  content = "包车租车";  break;
        case 2:  content = "短程接送";    break;      
        case 3:  content = "接送机";  break;
        case 4:  content = "常规路线";  break;
        case 5:  content = "当地参团";  break;
        case 6:  content = "游轮";  break;
        case 7:  content = "景点门票";  break;
        case 8:  content = "当地玩家";  break;
        case 9:  content = "导游";  break;
        case 10:  content = "保险";  break;
        case 11:  content = "旅游定制";  break;
        case 12:  content = "常规路线";  break;
        case 13:  content = "商务定制";  break;
        case 14:  content = "商务旅游";  break;
    }
    return content;
})

// 1支付宝 2微信支付 3银联支付 4Paypal',
Vue.filter('orderPayTypeVc', function (value) {
    if (!value) return '';
    let content = "支付宝";
    switch (parseInt(value)) {
        case 1:  content = "支付宝";  break;
        case 2:  content = "微信";    break;      
        case 3:  content = "银联";  break;
        case 4:  content = "Paypal";  break;
    }
    return content;
})

//1.待付款2.待确定，3.待出行，4.待评价 5.已完成6.取消订单7.申请退款8.退款中9退款成功10.退款失败
Vue.filter('orderStatusVc', function (value) {
    if (!value) return '';
    let content = "待付款";
    switch (parseInt(value)) {
        case 1:  content = "待付款";  break;
        case 2:  content = "待确定";    break;      
        case 3:  content = "待出行";  break;
        case 4:  content = "待评价";  break;
        case 5:  content = "已完成";  break;
        case 6:  content = "取消订单";  break;
        case 7:  content = "申请退款";  break;
        case 8:  content = "退款中";  break;
        case 9:  content = "退款成功";  break;
        case 10:  content = "退款失败";  break;
    }
    return content;
})

//截取逗号拼接的第n个
Vue.filter('splitVc', function (value,index) {
    if(!value) return "";  return value.split(",")[index];
})

//星级转化百分比
Vue.filter('perVc', function (value) {
    if(!value) return''; return parseInt(value/5*100);
})

//网站默认图片
Vue.filter('defImg', function (value) {
    if(!value){
         return Vue.prototype.defaultImg; 
    } return value;
})

//网站默认头像
Vue.filter('defPhoto', function (value) {
    if(!value){
    //     return app.defaultPhoto; 
         return Vue.prototype.defaultPhoto; 
    } return value;
})

//分钟转小时分钟
Vue.filter('dayDateByHour', function (minute) {
    if(!minute) return "";
    return `${minute/60 >> 0}小时${minute%60 > 0 ? minute%60 +"分钟":""}`;
})


//计算天数
Vue.filter('endDayVC', function (date,index) {
    if(!date || !index) return "";
    return dataCountNum(date,index);
})



