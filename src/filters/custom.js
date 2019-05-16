/*
 * @Description:  全局过滤器
 * @Author: 彭善智
 * @LastEditors: 彭善智
 * @Date: 2019-03-12 22:51:19
 * @LastEditTime: 2019-05-17 01:03:41
 */

import {nowDate} from 'utils/common'

//性别过滤器
export const sexVc = value => {
    if (!value) return '';
    if(value == 1 ) return "男"; return "女";
}

//证件类型过滤器
export const certTypeVc = value => {
    if (!value) return '';
    let content = "";
    switch (value) {
        case 1:  content = "身份证";  break;
        case 2:  content = "护照";    break;      
        case 3:  content = "本地ID";  break;
    }
    return content;
}

//导游类型过滤器
export const guideTypeVc = value => {
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
}

//车辆等级过滤器
export const carLevelVc = value => {
    if (!value) return '';
    let content = "";
    switch (parseInt(value)) {
        case 1:  content = "一般";  break;
        case 2:  content = "舒适";    break;      
        case 3:  content = "很舒适";  break;
        case 4:  content = "非常舒适";  break;
    }
    return content;
}

//截取逗号拼接的第n个
export const splitVc = (value,index) => {
    console.log(value,index)
    if(!value) return "";
    if( typeof value == String){
        return value.split(",")[index];
    }  else{
        return value[index];
    }
}

//星级转化百分比
export const perVc = value => {
    if(!value) return''; return parseInt(value/5*100);
}

//分钟转小时分钟
export const dayDateByHour = minute => {
    if(!minute) return "";
    return `${minute/60 >> 0}小时${minute%60 > 0 ? minute%60 +"分钟":""}`;
}

//分钟转小时分钟 date = yyyy-MM-dd
export const endDayVC = (date, num = 0) => {
    return nowDate(num, new Date(date));
}



//网站默认图片
export const defImg = (value) => {
    if(!value){
         return ""; 
    } return value;
}

//网站默认头像
export const defPhoto = (value) => {
    if(!value){
         return ""; 
    } return value;
}


//订单类型
export const orderTypeVc = (value) => {
    let content;
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
}


//订单状态
export const orderStatusVc = (value) => {
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
}

//支付类型
export const orderPayTypeVc =  (value) => {
    if (!value) return '';
    let content = "支付宝";
    switch (parseInt(value)) {
        case 1:  content = "支付宝";  break;
        case 2:  content = "微信";    break;      
        case 3:  content = "银联";  break;
        case 4:  content = "Paypal";  break;
    }
    return content;
}