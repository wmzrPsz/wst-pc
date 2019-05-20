<template>
  <div id="test6" class="calendar-box date-box time-info">
    <div class="ht-rili-querybox">
      <div class="ht-rili-datebox">
          <span class="ht-rili-leftarr" @click="monthLeftClick"></span>
          <span class="ht-rili-date">{{yearLeft}}年{{monthLeft}}月</span>
          <span class="ht-rili-date">{{yearRight}}年{{monthRight}}月</span>
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
          v-for="(list, index) in dataListLeft" :key="index" @click="dayClick(list.date)">
            <span class="ht-rili-day">{{list.day}}
            <!-- <span class="ht-rili-day">{{list.date}} -->
              <!-- <i data-state="100" v-if="list.flag">余{{list.state}}</i> -->
            </span>
            <span class="ht-rili-money" v-if="list.flag">{{currencySign}}{{list.price}}</span>
          </div>
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
      <div class="ht-rili-body1">
          <div :class="[list.flag?'ht-rili-onclick':'ht-rili-td-disabled','ht-rili-td',list.check?'ht-rili-td-active':'']" 
          v-for="(list, index) in dataListRight" :key="index" @click="dayClick(list.date)">
            <span class="ht-rili-day">{{list.day}}
              <!-- <i data-state="100" v-if="list.flag">余{{list.state}}</i> -->
            </span>
            <span class="ht-rili-money" v-if="list.flag">{{currencySign}}{{list.price}}</span>
          </div>
      </div>
    </div>
    <!-- <div class="ht-bottom" style="display:none;">
      <ul></ul>
    </div> -->



<div class="ht-bottom" style="display:none;">
  <ul>
  <li class="tripRoomSelect" :class="{'tripRoomSelectFlag':list.flag}" v-for="(list, index) in linerRoomList" :key="index" @click="linerRoomClick(index)">
  <img v-lazy="list.imgUrl" alt="房间图片" :key="list.imgUrl">
  <span class="selectSpan"></span>
  <p>{{list.name}}</p><p>{{list.spec}}平米 {{list.floor}}层</p>
  <span class="text-orange">{{currencySign}}{{list.floor}}/人</span></li>
  </ul>
</div>





  </div>
</template>



<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex"
import { saveCar } from "getData"
export default {
  name: "calendar",
  data() {
    return {
        adultNum: 0,
        childNum: 0,
    };
  },
  computed: {
     ...mapState([ "currencySign", "loginType"]),
     ...mapState("cruise",["dataListLeft", "dataListRight", "calendarDate", "scenicid","linerRoomList"]),
     ...mapGetters("cruise", ["orderPrice", "beginDate","prevYear", "prevMonth"]),
     monthLeft(){
       if(this.dataListLeft && this.dataListLeft.length > 0){
         let month = parseInt(this.dataListLeft[7].date.split("-")[1])
         console.log(month)
         return month < 10 ? `0${month}`: month
       }
     },
     yearLeft(){
       if(this.dataListLeft && this.dataListLeft.length > 0){
         let year = parseInt(this.dataListLeft[7].date.split("-")[0])
         return year
       }
     },
     monthRight(){
       if(this.dataListRight && this.dataListRight.length > 0){
         let month = parseInt(this.dataListRight[7].date.split("-")[1])
         return month < 10 ? `0${month}`: month
       }
     },
     yearRight(){
       if(this.dataListRight && this.dataListRight.length > 0){
         let year = parseInt(this.dataListRight[7].date.split("-")[0])
         return year
       }
     },
  },
  created() {
    this.calendarDateInit();
  },
  methods: {
    ...mapMutations("cruise",["setAdultNum", "setChildNum", "linerRoomClick"]),
    ...mapActions("cruise", ["monthLeftClick", "monthRightClick", "dayClick", "calendarDateInit"]),
    ...mapMutations(["loginFlagChange"]),
    //下单
    async addOrder(){
      if(this.checkData()) return;
      this.$router.push({path:"/sopt/soptSure"})
    },
    //加入购物车
    async addCar() {
      if(this.checkData()) return;
      if(await saveCar({
            typeid: this.scenicid,
            carType: 5,  //1.常规路线2.当地参团3.当地玩家4.游轮5.景点
            beginDate: this.beginDate,
            adultNum: this.adultNum,
            childNum: this.childNum,
            price: this.orderPrice,
      })){
        this.successMsg("添加购物车成功");
        this.adultNum = 0
        this.childNum = 0
      }
    },
    //判断参数
    checkData(){
        if(this.loginType == 1){
            this.loginFlagChange(1);
            return true;
        }
        if(this.isEmpty (this.beginDate)){
            this.infoMsg("请选择日期");
            return true;
        }
        if (this.adultNum + this.childNum <= 0) {
              this.infoMsg("请选择出游人数");
            return true;
        }
        if(this.orderPrice <= 0){
              this.infoMsg("价格错误");
            return true;
        }
        return false;
    }
  }
};
</script>
<style lang="less" scoped>
.date-box {
    // width:800px;
    overflow:hidden;
    background:#f2f2f2;
    border:1px solid #e6e8eb;
    box-shadow: 2px 5px 10px 2px #ccc;
    padding-bottom: 30px;
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
    font-size:14px;
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

