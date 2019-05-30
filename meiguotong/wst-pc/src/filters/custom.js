/*
 * @Description:  全局过滤器
 * @Author: 彭善智
 * @LastEditors: 彭善智
 * @Date: 2019-03-12 22:51:19
 * @LastEditTime: 2019-05-28 14:25:31
 */

import {nowDate, isEmpty} from 'utils/common'

//性别过滤器
export const sexVc = obj => {
    if (isEmpty(obj)) return '';
    if(obj == 1 ) return "男"; return "女";
}

//证件类型过滤器
export const certTypeVc = obj => {
    if (isEmpty(obj)) return '';
    let content = "";
    switch (obj) {
        case 1:  content = "身份证";  break;
        case 2:  content = "护照";    break;      
        case 3:  content = "本地ID";  break;
    }
    return content;
}

//导游类型过滤器
export const guideTypeVc = obj => {
    if (isEmpty(obj)) return '';
    let content = "";
    switch (parseInt(obj)) {
        case 1:  content = "当地玩家";  break;
        case 2:  content = "定制旅游-导游";    break;      
        case 3:  content = "定制旅游-司兼导";  break;
        case 4:  content = "包车/租车-导游";  break;
        case 5:  content = "包车/租车-司兼导";  break;
    }
    return content;
}

//车辆等级过滤器
export const carLevelVc = obj => {
    if (isEmpty(obj)) return '';
    let content = "";
    switch (parseInt(obj)) {
        case 1:  content = "一般";  break;
        case 2:  content = "舒适";    break;      
        case 3:  content = "很舒适";  break;
        case 4:  content = "非常舒适";  break;
    }
    return content;
}

//截取逗号拼接的第n个
export const splitVc = (obj,index) => {
    // console.log(obj,index)
    if(isEmpty(obj)) return "";
    if( typeof obj == String){
        return obj.split(",")[index];
    }  else{
        return obj[index];
    }
}

//星级转化百分比
export const perVc = obj => {
    if(isEmpty(obj)) return''; return parseInt(obj/5*100);
}

//分钟转小时分钟
export const dayDateByHour = minute => {
    if(!minute) return "";
    return `${minute/60 >> 0}小时${minute%60 > 0 ? minute%60 +"分钟":""}`;
}

//x天后的日期
export const endDayVC = (date, num = 0) => {
    return nowDate(num, new Date(date));
}



//网站默认图片
export const defImg = (obj) => {
    if(isEmpty(obj)){
         return ""; 
    } return obj;
}

//网站默认头像
export const defPhoto = (obj) => {
    if(isEmpty(obj)){
         return ""; 
    } return obj;
}


//订单类型
export const orderTypeVc = (obj) => {
    let content;
  //  1.包车租车2.短程接送3.接送机4常规路线5.当地参团6.游轮7.景点门票8.当地玩家/导游9.酒店10.保险11.旅游定制13.商务定制14.商务旅游',
    switch (parseInt(obj)) {
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
export const orderStatusVc = (obj) => {
    if (isEmpty(obj)) return '';
    let content = "待付款";
    switch (parseInt(obj)) {
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
export const orderPayTypeVc =  (obj) => {
    if (isEmpty(obj)) return '';
    let content = "支付宝";
    switch (parseInt(obj)) {
        case 1:  content = "支付宝";  break;
        case 2:  content = "微信";    break;      
        case 3:  content = "银联";  break;
        case 4:  content = "Paypal";  break;
    }
    return content;
}

//购物车类型
export const buyTypeVc = (obj) => {
    if (isEmpty(obj)) return '';
    let str;
    switch (parseInt(obj)) {
        case 0:  str = "全部商品";  break;
        case 1:  str = "常规路线";  break;
        case 2:  str = "当地参团";    break;      
        case 3:  str = "当地玩家";  break;
        case 4:  str = "游轮";  break;
        case 5:  str = "景点门票";  break;
        case 6:  str = "导游路线";  break;
        default: str = "全部商品"; break

    }
    return str;
}