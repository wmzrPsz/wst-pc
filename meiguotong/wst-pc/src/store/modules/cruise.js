/*
 * @Description:  游轮
 * @Author: 彭善智
 * @LastEditors: 彭善智
 * @Date: 2019-04-24 18:26:49
 * @LastEditTime: 2019-05-08 18:49:39
 */

import { getLinePriceDetails, linerRoomList } from 'getData'
import { nowDate, copy } from 'utils/common'

const state = {
  calendarDate: "",  //日期信息
  opt: "",  //日期信息（后台查询到的）
  sureDate: "", //选中的日期
  dataListLeft: "", //日历展示的日期（左边）
  dataListRight: "", //日历展示的日期（右边）
  adultNum: 0,  //大人数量
  childNum: 0,  //小孩数量
  orderid: "", //订单ID

  lineid: "", //游轮路线ID
  liner: "", //游轮详情
  linerline: "", //游轮路线详情
  linerRoomList: "", //游轮房间
  orderPrice: 0, //订单价格
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
    },
    //上一个年
    prevYear: (state)=> {
        if(state.calendarDate && state.calendarDate ){
            if(state.calendarDate.month == 1){
                return state.calendarDate.year - 1
            }
            return state.calendarDate.year
        }
    },
    //上一个月
    prevMonth: (state)=> {
        if(state.calendarDate && state.calendarDate ){
            if(state.calendarDate.month == 1){
                return  12
            }else{
                return state.calendarDate.month - 1
            }
        }
    },
    //选择的房间
    rooms(state){
        let ids = [];
        for (const list of state.linerRoomList) {
            if(list.flag){
                ids.push(list);
            }
        }
        
        return ids;
    },
    
}

const mutations = {
  //点击房间
   linerRoomClick: (state, index)=> {
      Vue.set(state.linerRoomList[index], "flag", !state.linerRoomList[index].flag);
   },
    //设置游轮房间
    linerRoomListSet: (state, linerRoomList)=>{
      state.linerRoomList = linerRoomList;
    },
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
      state.dataListLeft.map((list)=>{
        Vue.set(list, "check", false);
        if(list.flag && state.sureDate && checkDate(state.sureDate,list.date)){
             Vue.set(list, "check", true);
        }
      })
      state.dataListRight.map((list)=>{
        Vue.set(list, "check", false);
        if(list.flag && state.sureDate && checkDate(state.sureDate,list.date)){
             Vue.set(list, "check", true);
        }
      })
    },
    //设置日历展示的日期
    dataListLeftSet(state, dataListLeft) {
      state.dataListLeft = dataListLeft;
    },
    //设置日历展示的日期
    dataListRightSet(state, dataListRight) {
      state.dataListRight = dataListRight;
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
    //设置游轮路线ID
    lineidSet(state, lineid){
      state.lineid = lineid
    },
    //设置游轮路线详情
    linerlineSet(state, linerline){
      state.linerline = linerline
    },
    //设置游轮详情
    linerSet(state, liner){
      state.liner = liner
    },
    //月份加x
    monthAdd(state, index = 0){
        state.calendarDate.month += index;
        if (state.calendarDate.month > 12) {
            state.calendarDate.year += 1;
            state.calendarDate.month = 1;
        }else if(state.calendarDate.month < 0){
            state.calendarDate.year -= 1;
            state.calendarDate.month = 12;
        }
    },
    orderPriceSet(state, orderPrice){
      state.orderPrice = orderPrice;
    }
}

const actions = {
  //获取房间数量
    async linerRoomList({state, commit}){
      let data = await linerRoomList({
        lineid: state.lineid,
      })
      if(data){
        commit("linerRoomListSet", data)
      }
    },
    //日期初始化
    calendarDateInit: ({commit, dispatch})=> {
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
      commit("dataListLeftSet", "")
      commit("dataListRightSet", "")
      commit("linerRoomListSet", "")
      dispatch("linedClick",)
      dispatch("linerRoomList")
    },
    //点击选择日期
    async linedClick({state, commit, dispatch},index = 1){
      let priceDate = state.calendarDate.year + "-" + (state.calendarDate.month > 9 ? state.calendarDate.month : "0" + state.calendarDate.month);
      let data = await getLinePriceDetails({
         lineid: state.lineid,
         priceDate: priceDate,
      })
      if(data){
        commit("setOpt",data)
      }
      if(index >= 1){
        dispatch("getIndexDay",1)
        commit("monthAdd",index)
        dispatch("getIndexDay",2)
      }else{
        dispatch("getIndexDay",2)
        commit("monthAdd",index)
        dispatch("getIndexDay",1)
      }

    },
    //天数初始化
    getIndexDay({state, commit, dispatch },type) {
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
      commit(type == 1 ?"dataListLeftSet": "dataListRightSet",dataList)
      if(state.sureDate){
        commit("activeChange")
      }
      console.log(dataList)
      console.log(calendarDate)
    },
    //点击左边月份
    async monthLeftClick({state, commit, dispatch}){
      let calendarDate = copy(state.calendarDate)
      if (calendarDate.month <= 1) {
          calendarDate.year -= 1;
          calendarDate.month = 12;
      } else {
          calendarDate.month -= 1;
      }
      await commit("calendarDateChange", calendarDate)
      dispatch("linedClick",-1)
    },
    //点击右边月份
    async monthRightClick({state, commit, dispatch}){
      // let calendarDate = [...state.calendarDate];
    //   let calendarDate = copy(state.calendarDate)
    //   // let calendarDate = {}
    //     if (calendarDate.month == 12) {
    //         calendarDate.year += 1;
    //         calendarDate.month = 1;
    //     } else {
    //         calendarDate.month += 1;
    //     }
    //     await commit("calendarDateChange", calendarDate)
        dispatch("linedClick")
    },
    //点击日期
    dayClick({state, commit, dispatch},date) {
        console.log(date)
        for (const list of state.dataListLeft) {
            if(list.date == date && list.flag){
                commit("setSureDate", date)
                commit("activeChange")
            }
        }
        for (const list of state.dataListRight) {
            if(list.date == date && list.flag){
                commit("setSureDate", date)
                commit("activeChange")
            }
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
