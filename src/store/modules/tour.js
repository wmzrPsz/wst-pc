/*
 * @Description:  定制
 * @Author: 彭善智
 * @LastEditors: 彭善智
 * @Date: 2019-04-24 18:26:49
 * @LastEditTime: 2019-05-08 22:18:11
 */


const state = {
    tourType: 1, // 1.旅游定制  2商务定制  3商务+旅游定制
    startCity: "",  //城市ID
    startCityName:"",  //城市名称
    startAddress:"",  //详细地点
    startDate:"",  //开始时间
    endDate:"",  //结束时间
    adultNum:0,  //成人数量
    childNum:0,  //儿童数量
    bagNum:0,  //行李数量
}

const getters = {
  tourTypeName(state){
    let content
    switch (state.tourType) {
      case 1: content="旅游定制"; break;
      case 2: content="商务定制"; break;
      case 3: content="商务+旅游定制"; break;
      default: break;
    }
    return content;
  }
}

const mutations = {
  //设置订单类型
  tourTypeSet(state, tourType){
    state.tourType = tourType
  },
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
