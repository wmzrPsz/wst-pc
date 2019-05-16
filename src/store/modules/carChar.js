/*
 * @Description:  包车租车
 * @Author: 彭善智
 * @LastEditors: 彭善智
 * @Date: 2019-04-24 18:26:49
 * @LastEditTime: 2019-05-14 21:15:22
 */
import { isNull } from 'utils/common'

const state = {
    startCity: "",  //城市ID
    startCityName:"",  //城市名称
    startAddress:"",  //详细地点
    startDate:"",  //开始时间
    endDate:"",  //结束时间
    adultNum:0,  //成人数量
    childNum:0,  //儿童数量
    bagNum:0,  //行李数量

    addCarList: "", //选择的车辆信息
    travelInfor: "", //行程信息
    guideType: "", //导游类型 
    guideInfo: ""  //导游信息
}

const getters = {
   //订单价格
   orderPrice: function (state, getters, rootState) { 
    let price = 0;
    for (const orderCar of Object.values(state.travelInfor)) {
      //酒店
      for (const hotelInfo of Object.values(orderCar.hotelInforDetails)) {
          price += parseFloat(hotelInfo.price) * parseInt(hotelInfo.num);
      }
    }
    //  车辆
    for (const car of Object.values(state.addCarList)) {
        price += parseFloat(car.carPrice);
    }
    //导游
    if (state.guideInfo) {
      price += parseFloat(state.guideInfo.price) * getters.dayNum || 0;
    }
    //保险
    price += ((rootState.order.insurance? rootState.order.insurance.price * (state.childNum + state.adultNum) : 0));
    return price;
   },
  //选择的行程天数
  dayNum(state){
    let dayNum = ''
    if(!isNull(state.endDate) && !isNull(state.startDate)){
      dayNum =  parseInt((new Date(state.endDate).getTime() - new Date(state.startDate)) / (24 * 60 * 60 * 1000)) + 1
    }
    return dayNum;
  },
}

const mutations = {
  //改变state的值
  stateChange(state, opt){
    console.log({...state})
    Object.keys({...state}).forEach(k1 => {
      Object.keys({...opt}).forEach(k2 => {
          if(k1 == k2){
            state[k1] = opt[k2]
          }
      });
    });
    console.log({...state})
    console.log({...opt});
  }
}

const actions = {
 
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
