/*
 * @Description:  弹窗
 * @Author: 彭善智
 * @LastEditors: 彭善智
 * @Date: 2019-03-30 13:15:39
 * @LastEditTime: 2019-04-26 17:07:36
 */

// import { Message } from 'element-ui';

//消息提示
export const infoMsg = (text)=>{
  ELEMENT.Message({
      showClose: true,
      message: text,
      type: 'info'
    });
}

//成功消息提示
export const successMsg = (text)=>{
  ELEMENT.Message({
        showClose: true,
        message: text,
        type: 'success'
      });
}

//警告消息提示
export const errorMsg = (text)=>{
  ELEMENT.Message({
        showClose: true,
        message: text,
        type: 'error'
      });
}

//警告消息提示
export const warningMsg = (text)=>{
  ELEMENT.Message({
        showClose: true,
        message: text,
        type: 'warning'
      });
}


