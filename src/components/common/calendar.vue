<template>
  <div>
    <div class="date-box">
      <div class="ht-rili-querybox">
        <div class="ht-rili-datebox">
          <span class="ht-rili-leftarr"></span>
          <span class="ht-rili-date">2019年 5月</span>
          <span class="ht-rili-rightarr"></span>
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
          <div class="ht-rili-td ht-rili-td-disabled" data-date="2019-4-28">
            <span class="ht-rili-day">28</span>
            <span class="ht-rili-money"></span>
          </div>
          <div class="ht-rili-td ht-rili-td-disabled" data-date="2019-4-29">
            <span class="ht-rili-day">29</span>
            <span class="ht-rili-money"></span>
          </div>
          <div class="ht-rili-td ht-rili-td-disabled" data-date="2019-4-30">
            <span class="ht-rili-day">30</span>
            <span class="ht-rili-money"></span>
          </div>
          <div class="ht-rili-td ht-rili-onclick" data-date="2019-5-1">
            <span class="ht-rili-day">
              1
              <i data-state="100">余100</i>
            </span>
            <span class="ht-rili-money" data-money="1888">￥1888</span>
          </div>
          <div class="ht-rili-td ht-rili-onclick" data-date="2019-5-2">
            <span class="ht-rili-day">
              2
              <i data-state="100">余100</i>
            </span>
            <span class="ht-rili-money" data-money="1888">￥1888</span>
          </div>
          <div class="ht-rili-td ht-rili-onclick" data-date="2019-5-3">
            <span class="ht-rili-day">
              3
              <i data-state="100">余100</i>
            </span>
            <span class="ht-rili-money" data-money="1888">￥1888</span>
          </div>
          <div class="ht-rili-td ht-rili-onclick" data-date="2019-5-4">
            <span class="ht-rili-day">
              4
              <i data-state="100">余100</i>
            </span>
            <span class="ht-rili-money" data-money="1888">￥1888</span>
          </div>
 
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "calendar",
//   props: {
//     htmlName: {
//       type: String,
//       required: true
//     },
//     htmlSeal: {
//       type: String,
//       required: true
//     }
//   },
  data() {
    return {
      calendarDate: {},
      currencySign: "$",
      opt:[{"oneCost":3999.0,"twoCost":3999.0,"threeCost":3999.0,"fourCost":3999.0,"arrangeCost":3999.0,"state":"-1","date":"2019-05-04","price":3999.00},{"oneCost":3999.0,"twoCost":3999.0,"threeCost":3999.0,"fourCost":3999.0,"arrangeCost":3999.0,"state":"-1","date":"2019-05-05","price":3999.00},{"oneCost":3999.0,"twoCost":3999.0,"threeCost":3999.0,"fourCost":3999.0,"arrangeCost":3999.0,"state":"-1","date":"2019-05-06","price":3999.00},{"oneCost":3999.0,"twoCost":3999.0,"threeCost":3999.0,"fourCost":3999.0,"arrangeCost":3999.0,"state":"-1","date":"2019-05-07","price":3999.00},{"oneCost":3999.0,"twoCost":3999.0,"threeCost":3999.0,"fourCost":3999.0,"arrangeCost":3999.0,"state":"-1","date":"2019-05-08","price":3999.00},{"oneCost":3999.0,"twoCost":3999.0,"threeCost":3999.0,"fourCost":3999.0,"arrangeCost":3999.0,"state":"-1","date":"2019-05-09","price":3999.00},{"oneCost":3999.0,"twoCost":3999.0,"threeCost":3999.0,"fourCost":3999.0,"arrangeCost":3999.0,"state":"-1","date":"2019-05-10","price":3999.00},{"oneCost":3999.0,"twoCost":3999.0,"threeCost":3999.0,"fourCost":3999.0,"arrangeCost":3999.0,"state":"-1","date":"2019-05-11","price":3999.00},{"oneCost":3999.0,"twoCost":3999.0,"threeCost":3999.0,"fourCost":3999.0,"arrangeCost":3999.0,"state":"-1","date":"2019-05-12","price":3999.00},{"oneCost":3999.0,"twoCost":3999.0,"threeCost":3999.0,"fourCost":3999.0,"arrangeCost":3999.0,"state":"-1","date":"2019-05-13","price":3999.00},{"oneCost":3999.0,"twoCost":3999.0,"threeCost":3999.0,"fourCost":3999.0,"arrangeCost":3999.0,"state":"-1","date":"2019-05-14","price":3999.00},{"oneCost":3999.0,"twoCost":3999.0,"threeCost":3999.0,"fourCost":3999.0,"arrangeCost":3999.0,"state":"-1","date":"2019-05-15","price":3999.00}]
    };
  },
  created() {
      this.calendarDateInit();
    //   setTimeout(()=>{
    //         this.getIndexDay();
    //   },3000)
    
  },
  methods: {
    calendarDateInit() {
     this.calendarDate.opt = this.opt;
      this.calendarDate.today = new Date();
      this.calendarDate.year = this.calendarDate.today.getFullYear();
      this.calendarDate.month = this.calendarDate.today.getMonth() + 1;
      this.calendarDate.date = this.calendarDate.today.getDate();
      this.calendarDate.day = this.calendarDate.today.getDay();
    },
    getIndexDay() {
        this.isLeapYear();
        this.getDays();
        let riliHtml = '';
        this.calendarDate.monthStart = new Date(this.calendarDate.year + "/" + this.calendarDate.month + "/1").getDay();
        if (this.calendarDate.monthStart == 0) {
            this.calendarDate.monthStart = 7;
        }
        for (var i = this.calendarDate.monthStart; i > 0; i--) {
            var dataDateStr = this.calendarDate.lastYear + "-" + this.calendarDate.lastMonth + "-" + (this.calendarDate.lastDays - i +
                1);
            riliHtml += '<div class="ht-rili-td ht-rili-td-disabled" data-date="' + dataDateStr +
                '"><span class="ht-rili-day">' + (this.calendarDate.lastDays - i + 1) +
                '</span><span class="ht-rili-money"></span></div>';
        }
        for (var k = 0; k < this.calendarDate.days; k++) {
            var flag;
            var dataDateStr = this.calendarDate.year + "-" + this.calendarDate.month + "-" + (k + 1);
            for (var d in this.calendarDate.opt.data) {
                var nowDate = dataDateStr;
                var dataDate = this.calendarDate.opt.data[d].date;//日期
                var state = this.calendarDate.opt.data[d].state;//房间数量情况
                var price = this.calendarDate.opt.data[d].price;//价格
                flag = checkDate(nowDate, dataDate);
                if (flag) {
                    riliHtml += '' +
                        '<div class="ht-rili-td ht-rili-onclick" data-date="' + dataDateStr +'">' +
                            '<span class="ht-rili-day">' + (k + 1) + '<i data-state="' + state +'">' +"余" +state + '</i>' +'</span>' +
                            '<span class="ht-rili-money" data-money="' +price + '">'+this.currencySign+'' + price + '</span>' +
                        '</div>';
                    break;
                }
            }
            if (!flag) {
                riliHtml += '<div class="ht-rili-td ht-rili-td-disabled" data-date="' + dataDateStr +
                    '"><span class="ht-rili-day">' + (k + 1) + '</span><span class="ht-rili-money"></span></div>';
            }
        }
        for (var j = 0; j < (42 - this.calendarDate.days - this.calendarDate.monthStart); j++) {
            var dataDateStr = this.calendarDate.nextYear + "-" + this.calendarDate.nextMonth + "-" + (j + 1);
            riliHtml += '<div class="ht-rili-td ht-rili-td-disabled" data-date="' + dataDateStr +
                '"><span class="ht-rili-day">' + (j + 1) + '</span><span class="ht-rili-money"></span></div>';
        }

        this.calendarDate.month++;
        if (this.calendarDate.month > 12) {
            this.calendarDate.year += 1;
            this.calendarDate.month = 1;
        }
        console.log(riliHtml)
        console.log($('.ht-rili-body'))
         $('.ht-rili-body').append(riliHtml);
    },
    isLeapYear() {
        if ((this.calendarDate.year % 4 == 0) && (this.calendarDate.year % 100 != 0 || this.calendarDate.year % 400 == 0)) {
            this.calendarDate.isLeapYear = true;
        } else {
            this.calendarDate.isLeapYear = false;
        }
    },
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
    }
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

