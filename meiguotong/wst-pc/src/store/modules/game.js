/*
 * @Description:  当地玩家
 * @Author: 彭善智
 * @LastEditors: 彭善智
 * @Date: 2019-04-24 18:26:49
 * @LastEditTime: 2019-05-29 10:37:39
 */
import { getGuideDateDetails, getGuideRouteDateDetails } from 'getData'
import { nowDate, copy, isEmpty } from 'utils/common'

const state = {
  calendarDate: "",  //日期信息
  opt: "",  //日期列表
  sureDate: "", //选中的日期
  dataList: "", //日历展示的日期
  adultNum: 0,  //大人数量
  childNum: 0,  //小孩数量
  orderid: "", //订单ID
  beginDate: "", //开始时间
  endDate: "", //导游结束时间

  clickType: 1, //1.导游 2.导游路线
  guideId: "", //导游ID
  guide: "", //导游详情
  guideRoute: "", //导游路线详情
  
}

const getters = {
    //订单价格
    orderPrice: (state, getters, rootState, rootGetters)=> {
      let orderPrice = ((rootState.order.insurance? rootState.order.insurance.price * (state.childNum + state.adultNum) : 0));;
      if(state.clickType == 1){
        orderPrice += (state.adultNum + state.childNum) * (state.guide ? state.guide.price : 0 )
      }else if(state.clickType == 2){
        orderPrice += (state.adultNum + state.childNum) * (state.guideRoute ? state.guideRoute.price : 0 )
      }
      return orderPrice;
    },
    //选择的导游天数
    dayNum(state){
      let dayNum = ''
      if(!isEmpty (state.endDate) && !isEmpty (state.beginDate)){
        dayNum =  parseInt((new Date(state.endDate).getTime() - new Date(state.beginDate)) / (24 * 60 * 60 * 1000)) + 1
      }
      return dayNum;
    },
}

const mutations = {
    //改变state的值
    STATE_CHANGE(state, opt){
      // console.log({...state})
      Object.keys({...state}).forEach(k1 => {
        Object.keys({...opt}).forEach(k2 => {
            if(k1 == k2){
              state[k1] = opt[k2]
            }
        });
      });
      // console.log({...state})
      // console.log({...opt});
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
      //导游
      if(state.clickType == 1){
        // debugger
        let sureDate = state.sureDate ? new Date(nowDate(0, new Date(state.sureDate))).getTime() : 0;
        let beginDate = state.beginDate ? new Date(state.beginDate).getTime() : 0;
        let endDate = state.endDate ? new Date(state.endDate).getTime() : 0;

        if(beginDate == 0){
          state.beginDate = nowDate(0, new Date(state.sureDate))
          state.dataList.map((list)=>{
            Vue.set(list, "check", false);
            if(list.flag && state.sureDate && checkDate(state.sureDate,list.date)){
                 Vue.set(list, "check", true);
            }
          })
        }else if(sureDate < beginDate){
          state.beginDate = nowDate(0, new Date(state.sureDate))
        }else if(sureDate > endDate){
          state.endDate = nowDate(0, new Date(state.sureDate))
        }

        if(state.beginDate && state.endDate){
          for (; beginDate < endDate; beginDate += 86400) {
            state.dataList.map((list)=>{
              if(list.flag && state.sureDate && checkDate(nowDate(0,new Date(beginDate)),list.date)){
                   Vue.set(list, "check", true);
              }
            })
          }
        }else{
          state.dataList.map((list)=>{
            Vue.set(list, "check", false);
            if(list.flag && state.sureDate && checkDate(state.sureDate,list.date)){
                 Vue.set(list, "check", true);
            }
          })
        }
      }
      //导游路线
      else if(state.clickType == 2){
        state.dataList.map((list)=>{
          Vue.set(list, "check", false);
          if(list.flag && state.sureDate && checkDate(state.sureDate,list.date)){
               Vue.set(list, "check", true);
          }
        })
      }
    },
}

const actions = {
    //日期初始化
    calendarDateInit: ({commit, dispatch},res)=> {
      let calendarDate = {}
      calendarDate.today = new Date();
      calendarDate.year = calendarDate.today.getFullYear();
      calendarDate.month = calendarDate.today.getMonth() + 1;
      calendarDate.date = calendarDate.today.getDate();
      calendarDate.day = calendarDate.today.getDay();
      commit("STATE_CHANGE", {
        calendarDate: calendarDate,
        sureDate: "",
        adultNum: 0,
        childNum: 0,
        orderid: "",
        opt: "",
        dataList: "",
        beginDate: "", 
        endDate: "",
        clickType: res.clickType,
        guideId: res.guideId || "",
        guideRoute: res.guideRoute || ""
      })
      dispatch("getGuideDateDetails")
    },
    //点击选择导游日期
    async getGuideDateDetails({state, commit, dispatch}){
      let priceDate = state.calendarDate.year + "-" + (state.calendarDate.month > 9 ? state.calendarDate.month : "0" + state.calendarDate.month);
      if(state.clickType == 1){
        await getGuideDateDetails({
          guideid: state.guideId,
          priceDate: priceDate,
        }).then( res => {
            commit("STATE_CHANGE",{
              opt: res
            })
        })
      } else{
        await getGuideRouteDateDetails({
          guideRouteid: state.guideRoute.id,
          priceDate: priceDate,
        }).then( res => {
          commit("STATE_CHANGE",{
            opt: res
          })
        })
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
      commit("STATE_CHANGE",{
        dataList: dataList
      })
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
      await commit("STATE_CHANGE", {
        calendarDate: calendarDate
      })
      dispatch("getGuideDateDetails")
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
        await commit("STATE_CHANGE", {
          calendarDate: calendarDate
        })
        dispatch("getGuideDateDetails")
    },
    //点击日期
    dayClick({state, commit, dispatch},index) {
      commit("STATE_CHANGE", {
        sureDate:state.dataList[index].date,
        beginDate: state.clickType == 2 ? nowDate(0, new Date(state.dataList[index].date)) : state.beginDate,
      })
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
