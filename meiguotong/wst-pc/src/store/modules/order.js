/*
 * @Description:  订单
 * @Author: 彭善智
 * @LastEditors: 彭善智
 * @Date: 2019-04-24 18:26:49
 * @LastEditTime: 2019-05-02 20:50:52
 */


const state = {
    contactsName: "",  //联系人
    contactsMobile: "",  //联系电话
    remark: "", //备注
    orderMember: "",  //添加的常用联系人
}

const getters = {
    
}

const mutations = {
    //设置备注
    remarkSet(state, remark){
        state.remark = remark;
    },
    //设置联系电话
    contactsMobileSet(state, contactsMobile){
        state.contactsMobile = contactsMobile.target.value;
        console.log(state.contactsMobile)
    },
    //设置联系人
    contactsNameSet(state, contactsName){
        state.contactsName = contactsName.target.value;
    },
    //设置常用联系人
    orderMemberSet(state, orderMember) {
        state.orderMember = orderMember.target.value;
    },
    //添加的常用联系人 属性值改变
    infoSet(state, index, key, value){
        state.orderMember[index][key] = value;
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
