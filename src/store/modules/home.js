/*
 * @Description:  首页
 * @Author: 彭善智
 * @LastEditors: 彭善智
 * @Date: 2019-04-24 18:26:49
 * @LastEditTime: 2019-05-16 21:30:12
 */


const state = {
    registerType: "",
    accountNumbe: "",
    password: "",
    passwordCheck: "",
    smsCode: "",     
}

const getters = {

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
