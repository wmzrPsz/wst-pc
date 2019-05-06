/*
 * @Description:  景点
 * @Author: 彭善智
 * @LastEditors: 彭善智
 * @Date: 2019-04-24 18:26:49
 * @LastEditTime: 2019-05-05 23:34:30
 */
import { getScenicNum } from 'getData'
import { nowDate, copy } from 'utils/common'

const state = {
  calendarDate: "",  //日期信息
  opt: "",  //日期列表
  sureDate: "", //选中的日期
  dataList: "", //日历展示的日期
  adultNum: 0,  //大人数量
  childNum: 0,  //小孩数量
  orderid: "", //订单ID

  scenicid: "", //景点ID
  scenicSpot: "", //景点详情
  scenicSpotTicket: "", //选择的景点门票详情
}

const getters = {
    //订单价格
    orderPrice: (state, getters, rootState, rootGetters)=> {
      return (state.adultNum + state.childNum) * (state.scenicSpotTicket ? state.scenicSpotTicket.price : 0 )
            + ((rootState.order.insurance? rootState.order.insurance.price * (state.childNum + state.adultNum) : 0));
    },
    //选中的日期  yyyy-mm-dd
    beginDate: (state)=> {
      if(state.sureDate){
        return nowDate(0, new Date(state.sureDate));
      }
    }
}

const mutations = {
    calendarDateChange: (state, calendarDate)=> {
      state.calendarDate = calendarDate;
      console.log(state)
    },
    //设置日历日期
    setOpt: (state, opt)=> {
      state.opt = opt;
      console.log(state);
    },
    //判断是否是闰年
    isLeapYear(state) {
      if ((state.calendarDate.year % 4 == 0) && (state.calendarDate.year % 100 != 0 || state.calendarDate.year % 400 == 0)) {
        state.calendarDate.isLeapYear = true;
      } else {
        state.calendarDate.isLeapYear = false;
      }
    },
    //获取上个月下个月天数
    getDays(state) {
      if (parseInt(state.calendarDate.month) == 1) {
        state.calendarDate.lastDays = new Date(state.calendarDate.year - 1, 12, 0).getDate();
        state.calendarDate.lastMonth = new Date(state.calendarDate.year - 1, 12, 0).getMonth() + 1;
        state.calendarDate.lastYear = new Date(state.calendarDate.year - 1, 12, 0).getFullYear();
      } else {
        state.calendarDate.lastDays = new Date(state.calendarDate.year, state.calendarDate.month - 1, 0).getDate();
        state.calendarDate.lastMonth = new Date(state.calendarDate.year, state.calendarDate.month - 1, 0).getMonth() + 1;
        state.calendarDate.lastYear = new Date(state.calendarDate.year, state.calendarDate.month - 1, 0).getFullYear();
      }
      if (parseInt(state.calendarDate.month) == 12) {
          state.calendarDate.nextDays = new Date(state.calendarDate.year + 1, 1, 0).getDate();
          state.calendarDate.nextMonth = new Date(state.calendarDate.year + 1, 1, 0).getMonth() + 1;
          state.calendarDate.nextYear = new Date(state.calendarDate.year + 1, 1, 0).getFullYear();
      } else {
          state.calendarDate.nextDays = new Date(state.calendarDate.year, state.calendarDate.month + 1, 0).getDate();
          state.calendarDate.nextMonth = new Date(state.calendarDate.year, state.calendarDate.month + 1, 0).getMonth() + 1;
          state.calendarDate.nextYear = new Date(state.calendarDate.year, state.calendarDate.month + 1, 0).getFullYear();
      }
      state.calendarDate.days = new Date(state.calendarDate.year, state.calendarDate.month, 0).getDate();
    },
    //改变选中的日期
    activeChange(state){
      state.dataList.map((list)=>{
        Vue.set(list, "check", false);
        if(list.flag && state.sureDate && checkDate(state.sureDate,list.date)){
             Vue.set(list, "check", true);
        }
      })
    },
    //设置日历展示的日期
    setDataList(state, dataList) {
      state.dataList = dataList;
    },
    //设置选中的日期
    setSureDate(state, sureDate){
      state.sureDate = sureDate;
    },
    //设置成人数量
    setAdultNum(state, adultNum){
      state.adultNum = adultNum;
    },
    //设置儿童数量
    setChildNum(state, childNum){
      state.childNum = childNum;
    },
    //设置订单ID
    orderidSet(state, orderid){
      state.orderid = orderid;
    },
    //设置景点ID
    scenicidSet(state, scenicid){
      state.scenicid = scenicid
    },
    //设置景点详情
    scenicSpotSet(state, scenicSpot){
      state.scenicSpot = scenicSpot
    },
    //设置门票详情
    scenicSpotTicketSet(state, scenicSpotTicket){
      state.scenicSpotTicket = scenicSpotTicket;
    }
}

const actions = {
    //日期初始化
    calendarDateInit: ({commit, dispatch},scenicSpotTicket)=> {
      let calendarDate = {}
      calendarDate.today = new Date();
      calendarDate.year = calendarDate.today.getFullYear();
      calendarDate.month = calendarDate.today.getMonth() + 1;
      calendarDate.date = calendarDate.today.getDate();
      calendarDate.day = calendarDate.today.getDay();
      commit("calendarDateChange", calendarDate)
      commit("setSureDate", "")
      commit("setAdultNum", 0)
      commit("setChildNum", 0)
      commit("orderidSet", "")
      commit("setOpt", "")
      commit("setDataList", "")
      commit("scenicSpotTicketSet", scenicSpotTicket)
      dispatch("getScenicNumClick")
    },
    //点击门票预约
    async getScenicNumClick({state, commit, dispatch}){
      let priceDate = state.calendarDate.year + "-" + (state.calendarDate.month > 9 ? state.calendarDate.month : "0" + state.calendarDate.month);
      let data = await getScenicNum({
        scenicSpotTicketId: state.scenicSpotTicket.id,
        scenicDate: priceDate,
      })
      if(data){
        commit("setOpt",data)
      }
      dispatch("getIndexDay")
    },
    //天数初始化
    getIndexDay({state, commit, dispatch }) {
      commit("isLeapYear");
      commit("getDays");
      // let calendarDate = state.calendarDate;
      let calendarDate = copy(state.calendarDate)
      let dataList = [];
      calendarDate.monthStart = new Date(calendarDate.year + "/" + calendarDate.month + "/1").getDay();
      if (calendarDate.monthStart == 0) {
          calendarDate.monthStart = 7;
      }
      for (let i = calendarDate.monthStart; i > 0; i--) {
          let map = {};
          map.flag = false;
          map.day = calendarDate.lastDays - i + 1;
          map.date = calendarDate.lastYear + "-" + calendarDate.lastMonth + "-" + (calendarDate.lastDays - i +
              1);
          dataList.push(map);
      }
      for (var k = 0; k < calendarDate.days; k++) {
          let map = {};
          map.flag = false;
          map.day = k + 1;
          map.date = calendarDate.year + "-" + calendarDate.month + "-" + (k + 1);
          for (let d in state.opt) {
              map.state = state.opt[d].state;//房间数量情况
              map.price = state.opt[d].price;//价格
              map.flag = checkDate(map.date, state.opt[d].date);
              if (map.flag) {
                  break;
              }
          }
          dataList.push(map);
      }
      for (let j = 0; j < (42 - calendarDate.days - calendarDate.monthStart); j++) {
          let map = {};
          map.flag = false;
          map.day = j + 1;
          map.date = calendarDate.nextYear + "-" + calendarDate.nextMonth + "-" + (j + 1);
          dataList.push(map);
      }
      commit("setDataList",dataList)
      if(state.sureDate){
        commit("activeChange")
      }
      console.log(dataList)
      console.log(calendarDate)
    },
    //点击左边月份
    async monthLeftClick({state, commit, dispatch}){
      // let calendarDate = [...state.calendarDate]
      let calendarDate = copy(state.calendarDate)
      if (calendarDate.month <= 1) {
          calendarDate.year -= 1;
          calendarDate.month = 12;
      } else {
          calendarDate.month -= 1;
      }
      await commit("calendarDateChange", calendarDate)
      dispatch("getScenicNumClick")
    },
    //点击右边月份
    async monthRightClick({state, commit, dispatch}){
      // let calendarDate = [...state.calendarDate];
      let calendarDate = copy(state.calendarDate)
      // let calendarDate = {}
        if (calendarDate.month == 12) {
            calendarDate.year += 1;
            calendarDate.month = 1;
        } else {
            calendarDate.month += 1;
        }
        await commit("calendarDateChange", calendarDate)
        dispatch("getScenicNumClick")
    },
    //点击日期
    dayClick({state, commit, dispatch},index) {
      commit("setSureDate", state.dataList[index].date)
      if(state.dataList[index].flag){
        commit("activeChange")
      }
    },
}

//判断日期是否相等
const checkDate = (dateStr1, dateStr2)=>{
    let date1 = dateStr1.split("-");
    let date2 = dateStr2.split("-");
    if (date1[1] < 10 && date1[1].length < 2) {
        date1[1] = "0" + date1[1];
    }
    if (date1[2] < 10 && date1[2].length < 2) {
        date1[2] = "0" + date1[2];
    }
    if (date2[1] < 10 && date2[1].length < 2) {
        date2[1] = "0" + date2[1];
    }
    if (date2[2] < 10 && date2[2].length < 2) {
        date2[2] = "0" + date2[2];
    }
    date1 = date1.join("-");
    date2 = date2.join("-");
    return date1 == date2;
}


export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
