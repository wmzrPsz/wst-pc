/*
 * @Description:  常规路线
 * @Author: 彭善智
 * @LastEditors: 彭善智
 * @Date: 2019-04-24 18:26:49
 * @LastEditTime: 2019-04-28 18:45:13
 */


const state = {
  calendarDate: {
        oneCost:0,  //单人房价格
        twoCost:0,  //双人房价格
        threeCost:0, //三人房价格
        fourCost:0,  //四人房价格
        arrangeCost:0,  //配房价格
  },  
  // opt: [{"oneCost":3999.0,"twoCost":3999.0,"threeCost":3999.0,"fourCost":3999.0,"arrangeCost":3999.0,"state":"-1","date":"2019-04-15","price":3999.00},{"oneCost":3999.0,"twoCost":3999.0,"threeCost":3999.0,"fourCost":3999.0,"arrangeCost":3999.0,"state":"-1","date":"2019-05-05","price":3999.00},{"oneCost":3999.0,"twoCost":3999.0,"threeCost":3999.0,"fourCost":3999.0,"arrangeCost":3999.0,"state":"-1","date":"2019-04-06","price":3999.00},{"oneCost":3999.0,"twoCost":3999.0,"threeCost":3999.0,"fourCost":3999.0,"arrangeCost":3999.0,"state":"-1","date":"2019-05-07","price":3999.00},{"oneCost":3999.0,"twoCost":3999.0,"threeCost":3999.0,"fourCost":3999.0,"arrangeCost":3999.0,"state":"-1","date":"2019-05-08","price":3999.00},{"oneCost":3999.0,"twoCost":3999.0,"threeCost":3999.0,"fourCost":3999.0,"arrangeCost":3999.0,"state":"-1","date":"2019-05-09","price":3999.00},{"oneCost":3999.0,"twoCost":3999.0,"threeCost":3999.0,"fourCost":3999.0,"arrangeCost":3999.0,"state":"-1","date":"2019-05-10","price":3999.00},{"oneCost":3999.0,"twoCost":3999.0,"threeCost":3999.0,"fourCost":3999.0,"arrangeCost":3999.0,"state":"-1","date":"2019-05-11","price":3999.00},{"oneCost":3999.0,"twoCost":3999.0,"threeCost":3999.0,"fourCost":3999.0,"arrangeCost":3999.0,"state":"-1","date":"2019-05-12","price":3999.00},{"oneCost":3999.0,"twoCost":3999.0,"threeCost":3999.0,"fourCost":3999.0,"arrangeCost":3999.0,"state":"-1","date":"2019-05-13","price":3999.00},{"oneCost":3999.0,"twoCost":3999.0,"threeCost":3999.0,"fourCost":3999.0,"arrangeCost":3999.0,"state":"-1","date":"2019-05-14","price":3999.00},{"oneCost":3999.0,"twoCost":3999.0,"threeCost":3999.0,"fourCost":3999.0,"arrangeCost":3999.0,"state":"-1","date":"2019-05-15","price":3999.00}],
  opt: "",  //日期列表
}

const getters = {

}

const mutations = {
    //选择日期改变
    calendarDateChange: (state, calendarDate)=> {
      state.calendarDate = calendarDate;
      console.log(state);
    },
    //日期改变
    setOpt: (state, opt)=> {
      state.opt = opt;
      console.log(state);
    },
}

const actions = {
    //日期初始化
    // calendarDateInit() {
    //   this.calendarDate.today = new Date();
    //   this.calendarDate.year = this.calendarDate.today.getFullYear();
    //   this.calendarDate.month = this.calendarDate.today.getMonth() + 1;
    //   this.calendarDate.date = this.calendarDate.today.getDate();
    //   this.calendarDate.day = this.calendarDate.today.getDay();
    // },
}



export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
