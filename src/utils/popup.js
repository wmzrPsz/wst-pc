/*
 * @Description:  弹窗
 * @Author: 彭善智
 * @LastEditors: 彭善智
 * @Date: 2019-03-30 13:15:39
 * @LastEditTime: 2019-03-30 23:52:49
 */

import { Message } from 'element-ui';

//消息提示
export const infoMsg = (text)=>{
    Message({
      showClose: true,
      message: text,
      type: 'info'
    });
}

//成功消息提示
export const successMsg = (text)=>{
      Message({
        showClose: true,
        message: text,
        type: 'success'
      });
}

//失败消息提示
export const errorMsg = (text)=>{
      Message({
        showClose: true,
        message: text,
        type: 'error'
      });
}

//警告消息提示
export const warningMsg = (text)=>{
      Message({
        showClose: true,
        message: text,
        type: 'warning'
      });
}


