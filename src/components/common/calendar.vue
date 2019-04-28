<template>
  <div>
    <div class="date-box">
      <div class="ht-rili-querybox">
        <div class="ht-rili-datebox">
          <span class="ht-rili-leftarr" @click="monthLeftClick"></span>
          <span class="ht-rili-date">{{calendarDate.year}}年{{calendarDate.month}}月</span>
          <span class="ht-rili-rightarr" @click="monthRightClick"></span>
        </div>
      </div>
      <div class="ht-rili-entirety floatl">
        <div class="ht-rili-head">
          <div class="ht-rili-th">日</div>
          <div class="ht-rili-th">一</div>
          <div class="ht-rili-th">二</div>
          <div class="ht-rili-th">三</div>
          <div class="ht-rili-th">四</div>
          <div class="ht-rili-th">五</div>
          <div class="ht-rili-th">六</div>
        </div>
        <div class="ht-rili-body">
          <div :class="[list.flag?'ht-rili-onclick':'ht-rili-td-disabled','ht-rili-td',list.check?'ht-rili-td-active':'']" 
          v-for="(list, index) in dataList" :key="index" @click="dayClick(index)">
            <span class="ht-rili-day">{{list.day}}
              <!-- 1 -->
              <i data-state="100" v-if="list.flag">余{{list.state}}</i>
            </span>
            <span class="ht-rili-money" v-if="list.flag">{{currencySign}}{{list.price}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex"
import {  getRoutePriceDetails } from 'getData'
export default {
  name: "calendar",
  data() {
    return {
      calendarDate: {},
      dataList: [],
      date: "",  //选择的日期
    };
  },
  computed: {
     ...mapState([ "currencySign", ]),
     ...mapState({
       opt: state => state.rule.opt
    }),
  },
  created() {
      this.calendarDateInit();
      this.calendarClick();
  },
  methods: {
    ...mapMutations("rule",["calendarDateChange", "setOpt"]),
      async calendarClick() {
          let priceDate = this.calendarDate.year + "-" + (this.calendarDate.month > 9 ? this.calendarDate.month : "0" + this.calendarDate.month);
          console.log(priceDate);
          let data = await getRoutePriceDetails({
              routeid: 2,
              priceDate: priceDate,
          })
          console.log(data)
          if(data){
              this.calendarDate.oneCost = data[0].oneCost;
              this.calendarDate.twoCost = data[0].twoCost;
              this.calendarDate.threeCost = data[0].threeCost;
              this.calendarDate.fourCost = data[0].fourCost;
              this.calendarDate.arrangeCost = data[0].arrangeCost;
              this.setOpt(data)
          }
          this.getIndexDay();
      },
    //点击左边月份
    monthLeftClick(){
        if (this.calendarDate.month <= 1) {
            this.calendarDate.year -= 1;
            this.calendarDate.month = 12;
        } else {
            this.calendarDate.month -= 1;
        }
        this.getIndexDay();
         console.log(this.date)
    },
    //点击右边月份
    monthRightClick(){
        if (this.calendarDate.month == 12) {
            this.calendarDate.year += 1;
            this.calendarDate.month = 1;
        } else {
            this.calendarDate.month += 1;
        }
        this.getIndexDay();
        console.log(this.date)
    },
    //点击日期
    dayClick(index) {
      this.date = this.dataList[index].date
      if(this.dataList[index].flag){
          this.activeChange();
      }
      console.log(this.date)
    },
    //改变选中的日期
    activeChange(){
      this.dataList.map((list)=>{
        this.$set(list, "check", false);
        if(list.flag && this.date && this.checkDate(this.date,list.date)){
             this.$set(list, "check", true);
            //  let list = this.date.split("-");
            //  this.calendarDate.checkDate = list[0] + list[1]>9?list[1]:"0"+list[1] + list[2]>9?list[2]:"0"+list[2];
             this.calendarDate.checkDate  = this.date;
             this.calendarDateChange(this.calendarDate)
        }
      })
    },
    //日期初始化
    calendarDateInit() {
      this.calendarDate.today = new Date();
      this.calendarDate.year = this.calendarDate.today.getFullYear();
      this.calendarDate.month = this.calendarDate.today.getMonth() + 1;
      this.calendarDate.date = this.calendarDate.today.getDate();
      this.calendarDate.day = this.calendarDate.today.getDay();
    },
    //天数初始化
    getIndexDay() {
        this.isLeapYear();
        this.getDays();
        let dataList = [];
        this.calendarDate.monthStart = new Date(this.calendarDate.year + "/" + this.calendarDate.month + "/1").getDay();
        if (this.calendarDate.monthStart == 0) {
            this.calendarDate.monthStart = 7;
        }
        for (let i = this.calendarDate.monthStart; i > 0; i--) {
            let map = {};
            map.flag = false;
            map.day = this.calendarDate.lastDays - i + 1;
            map.date = this.calendarDate.lastYear + "-" + this.calendarDate.lastMonth + "-" + (this.calendarDate.lastDays - i +
                1);
            dataList.push(map);
        }
        for (var k = 0; k < this.calendarDate.days; k++) {
            let map = {};
            map.flag = false;
            map.day = k + 1;
            map.date = this.calendarDate.year + "-" + this.calendarDate.month + "-" + (k + 1);
            for (let d in this.opt) {
                map.state = this.opt[d].state;//房间数量情况
                map.price = this.opt[d].price;//价格
                map.flag = this.checkDate(map.date, this.opt[d].date);
                if (map.flag) {
                    break;
                }
            }
            dataList.push(map);
        }
        for (let j = 0; j < (42 - this.calendarDate.days - this.calendarDate.monthStart); j++) {
            let map = {};
            map.flag = false;
            map.day = j + 1;
            map.date = this.calendarDate.nextYear + "-" + this.calendarDate.nextMonth + "-" + (j + 1);
            dataList.push(map);
        }
        this.dataList = dataList;
        if(this.date){
          this.activeChange();
        }
        console.log(dataList)
        console.log(this.calendarDate)
    },
    //判断是否是闰年
    isLeapYear() {
        if ((this.calendarDate.year % 4 == 0) && (this.calendarDate.year % 100 != 0 || this.calendarDate.year % 400 == 0)) {
            this.calendarDate.isLeapYear = true;
        } else {
            this.calendarDate.isLeapYear = false;
        }
    },
    //获取上个月下个月天数
    getDays() {
        if (parseInt(this.calendarDate.month) == 1) {
            this.calendarDate.lastDays = new Date(this.calendarDate.year - 1, 12, 0).getDate();
            this.calendarDate.lastMonth = new Date(this.calendarDate.year - 1, 12, 0).getMonth() + 1;
            this.calendarDate.lastYear = new Date(this.calendarDate.year - 1, 12, 0).getFullYear();
        } else {
            this.calendarDate.lastDays = new Date(this.calendarDate.year, this.calendarDate.month - 1, 0).getDate();
            this.calendarDate.lastMonth = new Date(this.calendarDate.year, this.calendarDate.month - 1, 0).getMonth() + 1;
            this.calendarDate.lastYear = new Date(this.calendarDate.year, this.calendarDate.month - 1, 0).getFullYear();
        }
        if (parseInt(this.calendarDate.month) == 12) {
            this.calendarDate.nextDays = new Date(this.calendarDate.year + 1, 1, 0).getDate();
            this.calendarDate.nextMonth = new Date(this.calendarDate.year + 1, 1, 0).getMonth() + 1;
            this.calendarDate.nextYear = new Date(this.calendarDate.year + 1, 1, 0).getFullYear();
        } else {
            this.calendarDate.nextDays = new Date(this.calendarDate.year, this.calendarDate.month + 1, 0).getDate();
            this.calendarDate.nextMonth = new Date(this.calendarDate.year, this.calendarDate.month + 1, 0).getMonth() + 1;
            this.calendarDate.nextYear = new Date(this.calendarDate.year, this.calendarDate.month + 1, 0).getFullYear();
        }
        this.calendarDate.days = new Date(this.calendarDate.year, this.calendarDate.month, 0).getDate();
    },
    //判断日期是否相等
    checkDate(dateStr1, dateStr2){
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
    },
  }
};
</script>
<style lang="less" scoped>
.date-box {
    width:400px;
    overflow:hidden;
    background:#f2f2f2;
    border:1px solid #e6e8eb;
    // box-shadow: 2px 5px 10px 2px #ccc;
    // padding-bottom: 30px;
}
.calendar-box * {
    box-sizing:border-box
}
.ht-rili-head {
    overflow:hidden;
    padding: 0 20px;
}
.ht-rili-querybox {
    overflow:hidden;
    position: relative;
}
.ht-rili-title {
    padding:10px;
    display:inline-block;
    max-width:200px;
    text-overflow:ellipsis;
    white-space:nowrap;
    overflow:hidden;
    vertical-align:middle
}
.ht-rili-datebox {
    width: 330px;
    vertical-align:middle;
    padding:10px;
    margin: 0 auto;
}
.ht-rili-close{
    position: absolute;
    width: 25px;
    height: 25px;
    line-height: 25px;
    top:11px;
    right: 10px;
    padding: 0;
    font-size: 22px;
    color: #fff;
    opacity: .2;
    border-radius: 100%;
    background: #f60;
}
.ht-rili-close:hover{
    color: #fff;
    opacity: .4;
}
.ht-rili-date {
    text-align:center;
    display:inline-block;
    width:250px;
    height:24px;
    line-height:32px;
    vertical-align:middle;
    font-size: 16px;
}
.ht-rili-leftarr {
    display:inline-block;
    width:30px;
    height:30px;
    background:url(~images/left-arr.png) left center no-repeat;
    background-size:contain;
    vertical-align:middle;
    cursor:pointer
}
.ht-rili-rightarr {
    display:inline-block;
    width:30px;
    height:30px;
    background:url(~images/right-arr.png) right center no-repeat;
    background-size:contain;
    vertical-align:middle;
    cursor:pointer
}
.ht-rili-th {
    width:14.25%;
    float:left;
    text-align:center;
    height:40px;
    line-height:40px;
    color:#737373;
}
.ht-rili-td {
    width:14.25%;
    float:left;
    text-align:center;
    height:50px;
    background:#eef5fd;
    padding-top:5px;
    cursor:pointer;
    border: 1px solid #e5e5e5;
}
.ht-rili-body {
    overflow:hidden;
    padding: 0 20px;
}
.ht-rili-day {
    font-size:10px;
    font-weight:700;
    display:inline-block;
    width:100%
}
.ht-rili-day >i{
    font-size:11px;
    padding-left: 3px;
    color: #888;
}
.ht-rili-money {
    display:inline-block;
    width:100%;
    font-size:13px;
    color:#f60;
    background: #fdefe5;
}
.ht-rili-onclick{
    color: #444;
}
.ht-rili-td-disabled {
    color:#bfc4ca
}
.ht-rili-td-active {
    background:#3682e5;
    color: #fff;
}
.ht-rili-td-active .ht-rili-day >i{
    color: #fff;
}
.ht-rili-td-active .ht-rili-money{
    background:#3682e5;
}
.ht-custom{
    padding: 20px;

}
.ht-custom-left{
    float: left;
    width: 125px;
    height: 50px;
    font-size: 18px;
}
.ht-custom-right{
    float: left;
    width: 300px;
    height: 170px;
}
.ht-custom-right>div{
    width: 100%;
    float: left;
}
.ht-custom-right>.btn-group>button{
    width: 105px;
    height: 34px;
    border-radius: 25px;
    color: #fff;
    border: 1px solid #f60;
    outline: 0;
}
.ht-custom-right>.btn-group>button:focus{
    outline: 0;
}
.ht-custom-right>.btn-group>.total-price{
    color: #f60;
    background: #fff;
}
.ht-custom-right>.btn-group>.ht-btn-cart{
    background: #f60;
}
.ht-custom-right .counter-label{
    line-height: 40px;
    margin-right: 50px;
    margin-bottom: 20px;
}
</style>

