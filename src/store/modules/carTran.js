/*
 * @Description:  接送机
 * @Author: 彭善智
 * @LastEditors: 彭善智
 * @Date: 2019-04-24 18:26:49
 * @LastEditTime: 2019-05-22 11:47:22
 */


const state = {
    airNo:"",  //航班号
    sendAirport:"",  //起飞机场
    sendDate:"",  //起飞时间
    reachAirport:"",  //到达机场
    reachDate:"",  //到达时间
    startDate:"",  //接送机时间
    startCity:"",  //接送机城市
    startCityName:"",  //接送机城市名称
    startAddress:"",  //接送机详细地址
    adultNum: 0,   //大人数量
    childNum: 1,   //小孩数量
    bagNum: 0,   //包裹数量
    orderType: 1,  //1接机  2送机   

    carTime: 0,   //行驶时间
    distance: 0,  //行驶距离
    addCarList: [], //选择的车辆信息
    orderid: "",  //订单ID
}

const getters = {
    //订单价格
    orderPrice: function (state, getters, rootState) {
      let price = 0;
      state.addCarList.forEach(element => {
          price += parseFloat(element.carPrice) * state.distance + parseFloat(element.startPrice) + 
          (state.adultNum + state.childNum)*parseFloat(element.headPrice) + parseFloat(element.foodPrice);
      });
     //保险
      price += ((rootState.order.insurance? rootState.order.insurance.price * (state.childNum + state.adultNum) : 0));
      return price;
    },
}

const mutations = {
  //改变state的值
  STATE_CHANGE(state, opt){
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
