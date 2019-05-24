/*
 * @Description:  弹窗
 * @Author: 彭善智
 * @LastEditors: 彭善智
 * @Date: 2019-03-30 13:15:39
 * @LastEditTime: 2019-05-24 11:59:13
 */

// import { Message } from 'element-ui';

//消息提示
export const infoMsg = (text, onClose = ()=>{}, duration = 3000 )=>{
  ELEMENT.Message({
      showClose: true,
      message: text,
      type: 'info',
      onClose: onClose,
      duration: duration,
    });
}

//成功消息提示
export const successMsg = (text, onClose = ()=>{}, duration = 3000 )=>{
  ELEMENT.Message({
        showClose: true,
        message: text,
        type: 'success',
        onClose: onClose,
        duration: duration,
   });
}

//错误消息提示
export const errorMsg = (text, onClose = ()=>{}, duration = 3000 )=>{
  ELEMENT.Message({
        showClose: true,
        message: text,
        type: 'error',
        onClose: onClose,
        duration: duration,
      });
}

//警告消息提示
export const warningMsg = (text, onClose = ()=>{}, duration = 3000 )=>{
  ELEMENT.Message({
        showClose: true,
        message: text,
        type: 'warning',
        onClose: onClose,
        duration: duration,
      });
}


