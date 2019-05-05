/*
 * @Description:  通用方法
 * @Author: 彭善智
 * @LastEditors: 彭善智
 * @Date: 2019-03-12 22:51:19
 * @LastEditTime: 2019-05-05 23:31:57
 */

import store from '@/store/index'
import ajax from '../api/fetch';

//判断是否登录
export const fnIsLogin = () => {
    if (isNull(store.state.uid)) {
        return false;
    }
    return true;
}

export const nullArray = str =>{
  return Object.keys(str).length == 0;
}


//判断是否为空
export const isNull = (...str) => {
  let flag = false;
  for (const list of str) {
    if(list === '' || list === "" || list === null || list === undefined || list === "undefined"){
      flag = true;
    }
  }
  return flag;
}

//对象深拷贝  不可为{} 会调对象原生属性的toString()方法转换成"[object Object]"
export const copy = (str) => {
  return JSON.parse(JSON.stringify(str))
}

//判断是否是object对象
export const isObject = (value) =>{
  return Object.prototype.toString.call(value) == '[object Object]'
}

//判断是否是String对象
export const isStr = (value) =>{
  return Object.prototype.toString.call(value) == '[object String]'
}

//判断是否是Boolean对象
export const isBoolean = (value) =>{
  return Object.prototype.toString.call(value) == '[object Boolean]'
}

//判断是否是数组
export const isArray = (value) =>{
  return Object.prototype.toString.call(value) == '[object Array]'
}

//获取年月
export const nowMonth = () => {
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  if (month < 10) {
      month = "0" + month;
  }
  return year + "-" + month;
}


//获取x天后的时间
export const nowDate = (date = new Date(), num = 0) => {
  date.setDate(date.getDate() + parseInt(num)); 
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  if (month < 10) {
      month = "0" + month;
  }
  if (day < 10) {
      day = "0" + day;
  }
  return year + "-" + month + "-" + day;
}


//获取数组格式时间
export const nowDateByAny = () => {
  let date = new Date();
  let list = [];
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  if (month < 10) {
      month = "0" + month;
  }
  if (day < 10) {
      day = "0" + day;
  }
  list.push(year);
  list.push(month);
  list.push(day);
  return list;
}


//生成随机函数
export const RndNum = (n) => {
  var rnd="";
  for(var i=0;i<n;i++)
      rnd+=Math.floor(Math.random()*10);
  return rnd;
}


//判断是否是微信浏览器的函数
export const isWeiXin = () => {
  //window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
  var ua = window.navigator.userAgent.toLowerCase();
  //通过正则表达式匹配ua中是否含有MicroMessenger字符串
  if(ua.match(/MicroMessenger/i) == 'micromessenger'){
    return true;
  }else{
     return false;
  }
}

//转码bse64
function Base64(result){
  let imgSrc = result.replace("data:image/jpg;base64,", "");
      imgSrc = result.replace("data:image/png;base64,", "");
      imgSrc = result.replace("data:image/jpeg;base64,", "");
  return imgSrc;
}

//上传图片
export const imgUpload = (url) => {
  return new Promise((resolve, reject) => {
    let event = window.event || arguments.callee.caller.arguments[0];
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e) {
      console.log( Base64(e.target.result));
      resolve(ajax(url,{"file": Base64(e.target.result)},"POST")) 
    }
  })
}
