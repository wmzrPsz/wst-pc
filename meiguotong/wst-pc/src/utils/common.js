/*
 * @Description:  通用方法
 * @Author: 彭善智
 * @LastEditors: 彭善智
 * @Date: 2019-03-12 22:51:19
 * @LastEditTime: 2019-05-29 11:12:09
 */
import fetch from '../api/fetch';
import store from '../store/index'

//判断是否登录
export const isLogin = () => {
  if(store.state.loginType == 1){
    store.commit('STATE_CHANGE',{
      loginFlag: 1
    })
    return true;
  }
  return false;
}

//判断数组，对象是否为空
export const arrayisBlank = str => {
  return Object.keys(str).length == 0;
}

//判断对象是否不为空
export const isNotEmpty = (...str) => {
  return !isEmpty(...str)
}

//判断对象是否为空
export const isEmpty = (...str) => {
  for (const val of str) {
      if(validatenull(val)){
        return true;
      }
  }
  return false;
}



/**
 * 判断是否为空
 */
export function validatenull(val) {
  if (typeof val == 'boolean') {
      return false;
  }
  if (typeof val == 'number') {
      return false;
  }
  if (val instanceof Array) {
      if (val.length == 0) return true;
  } else if (val instanceof Object) {
      if (JSON.stringify(val) === '{}') return true;
  } else {
      if (val == 'null' || val == null || val == 'undefined' || val == undefined || val == '') return true;
      return false;
  }
  return false;
}

//判断对象类型
export const getObjType = obj => {
  let toString = Object.prototype.toString;
  let map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  };
  if (obj instanceof Element) {
    return 'element';
  }
  return map[toString.call(obj)];
};

/**
 * 对象深拷贝
 */
export const deepClone = data => {
  let type = getObjType(data);
  let obj;
  if (type === 'array') {
    obj = [];
  } else if (type === 'object') {
    obj = {};
  } else {
    //不再具有下一层次
    return data;
  }
  if (type === 'array') {
    for (let i = 0, len = data.length; i < len; i++) {
      obj.push(deepClone(data[i]));
    }
  } else if (type === 'object') {
    for (let key in data) {
      obj[key] = deepClone(data[key]);
    }
  }
  return obj;
};


//对象深拷贝  不可为{} 会调对象原生属性的toString()方法转换成"[object Object]"
export const copy = (str) => {
  return JSON.parse(JSON.stringify(str))
}

//判断是否是object对象
export const isObject = (value) => {
  return Object.prototype.toString.call(value) == '[object Object]'
}

//判断是否是String对象
export const isStr = (value) => {
  return Object.prototype.toString.call(value) == '[object String]'
}

//判断是否是Boolean对象
export const isBoolean = (value) => {
  return Object.prototype.toString.call(value) == '[object Boolean]'
}

//判断是否是数组
export const isArray = (value) => {
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
export const nowDate = (num = 0, date = new Date()) => {
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

//计算天数  yyyy-MM-dd
export const dataCountNum = (date, num = 0) => {
  return nowDate(num, new Date(date));
}


//获取数组格式时间
export const nowDateByAny = (date = new Date()) => {
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
  var rnd = "";
  for (var i = 0; i < n; i++)
    rnd += Math.floor(Math.random() * 10);
  return rnd;
}


//判断是否是微信浏览器的函数
export const isWeiXin = () => {
  //window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
  var ua = window.navigator.userAgent.toLowerCase();
  //通过正则表达式匹配ua中是否含有MicroMessenger字符串
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    return true;
  } else {
    return false;
  }
}

//转码bse64
function Base64(result) {
  let imgSrc = result.replace("data:image/jpg;base64,", "");
  imgSrc = result.replace("data:image/png;base64,", "");
  imgSrc = result.replace("data:image/jpeg;base64,", "");
  return imgSrc;
}

//上传图片
export const uploadImg = (url) => {
  return new Promise((resolve, reject) => {
    let event = window.event || arguments.callee.caller.arguments[0];
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e) {
      console.log(Base64(e.target.result));
      resolve(fetch(url, {
        "file": Base64(e.target.result)
      }, "POST"))
    }
  })
}

//获取毫秒数
export const getTime = (obj = new Date()) => {
  return new Date(obj).getTime()
}