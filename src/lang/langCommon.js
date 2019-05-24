import { Object } from "core-js";

/*
 * @Description:  语言切换工具类
 * @Author: 彭善智
 * @Date: 2019-05-24 14:19:37
 * @LastEditors: 彭善智
 * @LastEditTime: 2019-05-24 15:13:57
 */
import {getTime, dataCountNum} from 'utils/common';


//当地参团语言切换
export const routeDate = ( obj ) => {
    let content = []
    let index = 0
    let maxIndex = 5
    if(obj.dateType == 1){  //日期类型1.所有日期2.按星期3.按号数
        for (let beginDate = getTime(obj.beginDate); beginDate < getTime(obj.endDate); beginDate += 24 * 60 *60 * 1000) {
            if(index < maxIndex){
                content.push(` ${dataCountNum(obj.beginDate, index)} `);
                index ++;
            }
        }
    }else if(obj.dateType == 2){
        for (const list of obj.weekList) {
            switch (Number.parseInt(list)) {
                case 1: content.push("周日");   break;
                case 2: content.push("周一");   break;
                case 3: content.push("周二");   break;
                case 4: content.push("周三");   break;
                case 5: content.push("周四");   break;
                case 6: content.push("周五");   break;
                case 7: content.push("周六");   break;
            }
        }
    }else if(obj.dateType == 3){
        for (const list of obj.dayList) {
            if(index < maxIndex){
                content.push(`${list}号`);
                index ++;
            }
        }
    }
    return `${content.join("/")} 出团`
}