/*
 * @Description:  定制
 * @Author: 彭善智
 * @LastEditors: 彭善智
 * @Date: 2019-04-24 18:26:49
 * @LastEditTime: 2019-05-08 19:37:41
 */


const state = {
       tourType: 1, // 1.旅游定制  2商务定制  3商务+旅游定制
}

const getters = {

}

const mutations = {
  //设置订单类型
  tourTypeSet(state, tourType){
    state.tourType = tourType
  },
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
