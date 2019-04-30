/*
 * @Description:  弹窗
 * @Author: 彭善智
 * @LastEditors: 彭善智
 * @Date: 2019-03-30 13:15:39
 * @LastEditTime: 2019-04-30 17:30:51
 */

// import { Message } from 'element-ui';

//消息提示
export const infoMsg = (text, onClose = ()=>{} )=>{
  ELEMENT.Message({
      showClose: true,
      message: text,
      type: 'info',
      onClose: onClose
    });
}

//成功消息提示
export const successMsg = (text, onClose = ()=>{} )=>{
  ELEMENT.Message({
        showClose: true,
        message: text,
        type: 'success',
        onClose: onClose
   });
}

//错误消息提示
export const errorMsg = (text, onClose = ()=>{} )=>{
  ELEMENT.Message({
        showClose: true,
        message: text,
        type: 'error',
        onClose: onClose
      });
}

//警告消息提示
export const warningMsg = (text, onClose = ()=>{} )=>{
  ELEMENT.Message({
        showClose: true,
        message: text,
        type: 'warning',
        onClose: onClose
      });
}


