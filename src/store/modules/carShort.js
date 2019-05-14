/*
 * @Description:  短程接送
 * @Author: 彭善智
 * @LastEditors: 彭善智
 * @Date: 2019-04-24 18:26:49
 * @LastEditTime: 2019-05-14 21:18:46
 */


const state = {
    startCity:"",  //上车城市
    startCityName:"",// 上车城市名称
    startAddress:"",  //上车详细地址
    endCity:"",   //下车城市
    endCityName:"",// 下车城市名称
    endAddress:"",   //下车详细地址
    startDate:"", //上车时间
    adultNum:1,   //大人数量
    childNum:0,   //小孩数量
    bagNum:0,   //包裹数量

    carTime: "",   //行驶时间
    distance: "",  //行驶距离
    addCarList: "", //选择的车辆信息
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
