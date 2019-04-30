/*
 * @Description:  全局参数
 * @Author: 彭善智
 * @LastEditors: 彭善智
 * @Date: 2019-03-13 10:21:57
 * @LastEditTime: 2019-03-13 10:24:39
 */

//区号
 export const areaSelectList = () =>{
     return [
        {id:"86",name:"中国大陆"},
        {id:"852",name:"香港"}
    ];
 }
 
//证件类型
 export const certTypeSelectList = () =>{
     return [
        {id:"1",name:"身份证"},
        {id:"2",name:"护照"},
        {id:"3",name:"本地ID"}
    ];
 }

//支付方式
 export const payTypeList = () =>{
     return [
        {id:"1",name:"支付宝"},
        {id:"2",name:"微信"},
        {id:"3",name:"银联支付"},
        {id:"4",name:"Paypai"},
    ];
 }
 
//车辆等级
 export const carLevel = () =>{
     return [
        {id:"1",name:"一般"},
        {id:"2",name:"舒适"},
        {id:"3",name:"很舒适"},
        {id:"4",name:"非常舒适"},
    ];
 }





