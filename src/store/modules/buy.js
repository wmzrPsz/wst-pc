/*
 * @Description:  购物车
 * @Author: 彭善智
 * @LastEditors: 彭善智
 * @Date: 2019-04-24 18:26:49
 * @LastEditTime: 2019-05-30 12:11:48
 */
import { productCarNum } from 'getData'
import { isNotEmpty} from 'utils/common';

const state = {
  buyNumList: [], //购物车数量
  buyIds: [], //选中的购物车ID
}

const getters = {
    //购物车数量
    buyNum(state){
      let buyNum = 0;
      if(isNotEmpty(state.buyNumList)){
        buyNum = state.buyNumList[0].num
      }
        return buyNum;
    }
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
        //获取购物车数量
        async getCarNum({ commit, rootState }){
            let buyNumList = []
            if(rootState.loginType == 2){
               buyNumList = await productCarNum()
            }
            commit("STATE_CHANGE", {
              buyNumList: buyNumList
            })
      },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
