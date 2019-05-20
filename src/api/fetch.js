/*
 * @Description:  请求封装
 * @Author: 彭善智
 * @LastEditors: 彭善智
 * @Date: 2019-03-01 22:48:18
 * @LastEditTime: 2019-05-18 16:17:27
 */
import store from '../store/index'
import { errorMsg } from '../utils/popup'
import { isEmpty  } from '../utils/common'


export default async (url = '', data = {}, type = 'GET', method = 'fetch')=>{
  return new Promise((resolve, reject) =>
    Fetch(url,data,type,method)
    .then(res=>{
      console.log(url,res);
      let data;
      if(res.success){
        if(!res.body){
          data = res.success
        }else if(Object.keys(res.body).length == 1){
          data = res.body[Object.keys(res.body)[0]];
        }else{
          data = res.body;
        }
        resolve(data)
      }else{
        errorMsg(res.msg);
        reject(res.msg);
      }
    })
    .catch(error=>{
      reject(error)
    })
  )
  // const res = await Ajax(url,data,type,method);
  // console.log(url,res);
  // if(res.success){
  //   if(!res.body) return res.success;
  //   if(Object.keys(res.body).length == 1)
  //     return res.body[Object.keys(res.body)[0]];
  //   return res.body;
  // }else{
  //   errorMsg(res.msg);
  //   // return false;
  //   throw new Error(error)
  // }
}

 async function Fetch(url = '', data = {}, type = 'GET', method = 'fetch'){

  // 整理表单数据
   type = type.toUpperCase()
   let sendData;
   let formData=new FormData();

  let param = {
    uid: store.state.loginUid,
    key: store.state.loginKey,
    time: store.state.loginTime,
    type: store.state.loginType,
    languageid: store.state.languageid,
    currencyid: store.state.currencyid,
  };
  
  data = Object.assign(data,param);
  console.log(data);
  if (type == 'GET') {
    let _data = []
    Object.keys(data).forEach(key => {
      _data.push(key + '=' + (isEmpty ( data[key] ) ? "" : data[key] ))
    })
    url =  url + '?' + _data.join('&');
  } else {
    //sendData = JSON.stringify(data)
    Object.keys(data).forEach(key => {
      formData.append(key, isEmpty (data[key]) ? "" : data[key] );
    })

  }


  // 创建ajax提交对象

  if (window.fetch && method == 'fetch') {
    let reqConfig = {
      credentials: 'include',
      method: type,
      // headers: {
      //   'Accept': 'application/json',
      //   'Content-type': 'application/json'
      // },
      mode: 'cors',
     cache: 'default',
      // cache: 'no-cache',
    }
    if(type == "POST"){
    //  reqConfig = {...reqConfig,body: formData};
      let param = {body: formData}
      reqConfig = Object.assign(reqConfig, param);
    }
    try {
      const response = await fetch(url, reqConfig)
      const responseJson = await response.json()
      return responseJson
    } catch(error) {
      errorMsg("网络错误");
      throw new Error(error)
    }
  } else {
    return new Promise((resolve, reject) => {
      let reqObj

      if (window.XMLHttpRequest) {
        reqObj = new XMLHttpRequest()
      } else {
        reqObj = new ActiveXObject('Microsoft.XMLHTTP')
      }

      reqObj.open(type, url, true)
      reqObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
      reqObj.send(sendData)

      reqObj.onreadystatechange = () => {
        if (reqObj.readyState == 4) {
          if (reqObj.status == 200) {
            let res = reqObj.response
            if (typeof res !== 'object') {
              res = JSON.parse(res)
            }
            resolve(res)
          } else {
            reject(reqObj)
          }
        }
      }
    })
  } 
}
