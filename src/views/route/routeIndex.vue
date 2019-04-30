<template>
    <div>
        
    </div>
</template>
<script>
import ezHeader from "components/home/ezHeader"
import ezContainer from "components/home/ezContainer"
import ezModule from "components/home/ezModule"
import ezFooter from "components/home/ezFooter"
import ezAside from "components/home/ezAside"
import { mapState } from "vuex";
import { 
    getRoutePriceDetails,
    addChildComment,
    digComment,
    getChildComment,
    selectComment,
    selectRoute,
    getLabel,
    getCityList
} from 'getData'
export default {
    name: "routeIndex",
    data() {
        return {
            startCity: "",  //目的城市ID 
            cityList: [],  //城市list
            choice: "",  //已选择
            orderByType: "",  //1.销量2.价格降序3.价格升序4好评 “”综合
            pageNo: 1, //页数
            routeList: [],  //参团列表
            current_page: 1, //当前页
            pages: 1, //总页数
            index1: "",  //评论下标
            index2: "",  //子评论下标
            content: "",  //评论的内容
            dataList: [],  //日期List
            monthIndex: "",  //展示的月份下标
            days: [],  //展示的天数
            selectDate: [], //选择的时间  [{year:”2018”,month:”05”,days:”05,06”},{}]
            dayList: [],  //行程天数List
            dayFlag: false,  //行程天数是否多选
            day: [],  //选择行程天数
            minPrice: "", //最小价格
            maxPrice: "",  //最大价格
            priceList: [],  //价格LIst
            lableList: [],  //标签属性
            labelAttrid: [],  //选择的标签属性ID
            opt: [],  //选择的数据
            dayShowFlag: true,  //行程天数是否展示   index(1)
            priceShowFlag: true,  //价格预算是否展示  index(2)
        }
    },
    created() {
        this.getLabel();
        this.getCity();
        this.selectRoute();
        this.dateInit();
        this.dayListInit();
        this.priceInit();
    },
    methods: {
        //删除展示数据
        delOpt: function (index) {
            if (this.opt[index].key > 3) {  //标签属性
                let index1 = this.opt[index].key - 4;
                this.lableFlagClick(1, index1);
                this.lableSure(index1, 0);
                Vue.set(this.lableList[index1], "showFlag", true);
            } else if (this.opt[index].key == 1) {  //行程天数
                this.dayShowFlag = true;
                this.dayFlag = false;
                this.day = [];
                for (const iterator of Object.values(this.dayList)) {
                    iterator.flag = false;
                }
            } else if (this.opt[index].key == 2) {  //价格预算
                this.minPrice = "";
                this.maxPrice = "";
                this.priceShowFlag = true;
                for (const iterator of Object.values(this.priceList)) {
                    iterator.flag = false;
                }
            }
            Vue.delete(this.opt, index);
            this.selectRoute();
        },
        //添加已选择的数据
        addOpt: function (key, value, contentKey, contentValue) {
            let map = {};
            Vue.set(map, "key", key);
            Vue.set(map, "value", value);
            Vue.set(map, "contentKey", contentKey);
            Vue.set(map, "contentValue", contentValue);
            this.opt.push(map);
        },
        //标签点击确定  0删除  1添加 
        lableSure: function (index, type = 1) {
            this.labelAttrid = [];
            let opt = [];
            let contentKey = "";
            let contentValue = [];
            for (const [key1, value1] of Object.entries(this.lableList)) {
                if (key1 == index) contentKey = value1.content
                for (const [key2, values2] of Object.entries(value1.comTagList)) {
                    if (values2.flag) {
                        this.labelAttrid.push(values2.tagid);
                        if (key1 == index) {
                            opt.push(values2.tagid);
                            contentValue.push(values2.content);
                        }
                    }
                }
            }
            Vue.set(this.lableList[index], "lableFlag", false);
            Vue.set(this.lableList[index], "showFlag", false);
            if (type) {
                this.addOpt(index + 4, opt.join(","), contentKey, contentValue.join(","));
                console.log(this.labelAttrid);
                this.selectRoute();
            }
        },
        //点击标签属性
        lableClick: function (index1, index2) {
            Vue.set(this.lableList[index1].comTagList[index2], "flag", !this.lableList[index1].comTagList[index2].flag);
            if (this.lableList[index1].lableFlag) return;  //多选
            this.lableSure(index1);
        },
        //标签多选  0点击多选 1点击取消 
        lableFlagClick: function (flag, index) {
            if (flag) {
                Vue.set(this.lableList[index], "lableFlag", false);
                for (const iterator of Object.values(this.lableList[index].comTagList)) {
                    Vue.set(iterator, "flag", false);
                }
            } else {
                Vue.set(this.lableList[index], "lableFlag", true);
            }
        },
        //价格改变
        priceChange: function () {
            if (this.minPrice < 0) {
                this.minPrice = "";
            }
            if (this.maxPrice < 1) {
                this.maxPrice = "";
            }
            if (this.minPrice >= 0 && this.maxPrice) {
                this.selectRoute();
            }
        },
        //价格选择
        priceClick: function (index) {
            this.priceShowFlag = false;
            this.priceList[index].flag = true;
            this.maxPrice = this.priceList[index].maxPrice;
            this.minPrice = this.priceList[index].minPrice;
            let e = window.event || arguments.callee.caller.arguments[0];
            let contentKey = $(e.target).parents(".sl-wrap").children('.sl-key').text();
            this.addOpt(2, `${this.minPrice},${this.maxPrice}`, contentKey, this.priceList[index].content);
            this.selectRoute();
        },
        //价格选择初始化
        priceInit: function () {
            this.priceList = [];
            for (let k = 0; k < 4; k++) {
                let map = {};
                if (k == 0) {
                    Vue.set(map, "minPrice", 0);
                    Vue.set(map, "maxPrice", 999);
                    Vue.set(map, "content", "0-999");
                    Vue.set(map, "flag", false);
                }
                if (k == 1) {
                    Vue.set(map, "minPrice", 1000);
                    Vue.set(map, "maxPrice", 2999);
                    Vue.set(map, "content", "1000-2999");
                    Vue.set(map, "flag", false);
                }
                if (k == 2) {
                    Vue.set(map, "minPrice", 3000);
                    Vue.set(map, "maxPrice", 4999);
                    Vue.set(map, "content", "3000-4999");
                    Vue.set(map, "flag", false);
                }
                if (k == 3) {
                    Vue.set(map, "minPrice", 5000);
                    Vue.set(map, "content", "5000以上");
                    Vue.set(map, "flag", false);
                }
                this.priceList.push(map);
            }
            console.log(this.priceList);
        },
        //行程天数确定
        daySure: function () {
            this.day = [];
            let contentValue = [];
            for (const list of Object.values(this.dayList)) {
                if (list.flag) {
                    this.day.push(list.day);
                    contentValue.push(list.day >= 15 ? '15天及以上' : `${list.day}天`);
                }
            }
            let e = window.event || arguments.callee.caller.arguments[0];
            let contentKey = $(e.target).parents(".sl-wrap").children('.sl-key').text();
            this.addOpt(1, this.day.join(","), contentKey, contentValue.join(","));
            this.dayShowFlag = false;
            this.selectRoute();
        },
        //点击行程天数多选  0点击多选 1点击取消 
        dayFlagClick: function (flag) {
            if (flag) {
                this.dayFlag = false;
                for (const iterator of Object.values(this.dayList)) {
                    Vue.set(iterator, "flag", false);
                }
            } else {
                this.dayFlag = true;
            }
        },
        //点击行程天数
        tripDayClick: function (index) {
            this.dayList[index].flag = !this.dayList[index].flag;
            if (this.dayFlag) return;  //多选
            this.day = [];
            for (const [key, value] of Object.entries(this.dayList)) {
                if (key != index)
                    value.flag = false;
            }
            let e = window.event || arguments.callee.caller.arguments[0];
            let contentKey = $(e.target).parents(".sl-wrap").children('.sl-key').text();
            let contentValue = this.dayList[index].day >= 15 ? '15天及以上' : `${this.dayList[index].day}天`;
            this.addOpt(1, this.dayList[index].day, contentKey, contentValue);
            this.dayShowFlag = false;
            this.day.push(this.dayList[index].day);
            this.selectRoute();
        },
        //行程天数初始化
        dayListInit: function () {
            for (let k = 2; k <= 15; k++) {
                var map = {};
                Vue.set(map, "day", k);
                Vue.set(map, "flag", false);
                this.dayList.push(map);
            }
            console.log(this.dayList);
        },
        //处理选择时间
        dateHandle: function () {
            this.selectDate = [];
            for (const iterator of Object.values(this.dataList)) {
                let map = {};
                if (iterator.flag) {
                    map["year"] = iterator.year;
                    map["month"] = iterator.month;
                    let list = [];
                    for (const days of Object.values(iterator.days)) {
                        if (days.flag) {
                            list.push(days.day);
                        }
                    }
                    if (list) map["days"] = list.join(",");
                    console.log(map["days"]);
                    this.selectDate.push(map);
                }
            }
            this.selectRoute();
        },
        //点击天数
        dayClick: function (index) {
            this.days[index].flag = !this.days[index].flag;
            this.dataList[this.monthIndex].days = this.days;
            let flag = false;
            for (const iterator of Object.values(this.days)) {
                if (iterator.flag) {
                    flag = true;
                    break;
                }
            }
            console.log(`monthFlag-------${flag}`);
            this.dataList[this.monthIndex].flag = flag;
            this.dateHandle();
        },
        //点击月份
        monthClick: function (index) {
            this.monthIndex = index;
            this.days = this.dataList[index].days;
        },
        //获取当月总天数
        dayInit: function (year = new Date().getFullYear(), month = new Date().getMonth()) {
            let day = new Date(year, month, 0).getDate(); //当月总天数
            return day;
        },
        //出发日期初始化
        dateInit: function () {
            let currentDate = new Date();
            let year = currentDate.getFullYear();
            let month = currentDate.getMonth() + 1;
            let List = [];
            for (let i = 0; i < 12; i++) {
                if (month > 12) {
                    month = 1;
                    year++;
                }
                let map = {};
                Vue.set(map, "year", year);
                Vue.set(map, "month", month);
                Vue.set(map, "flag", false);
                let day = this.dayInit(year, month);
                let days = [];
                for (let k = 1; k <= day; k++) {
                    let map = {};
                    Vue.set(map, "day", k);
                    Vue.set(map, "flag", false);
                    days.push(map);
                }
                Vue.set(map, "days", days);
                List.push(map);
                month++;
            }
            console.log(List);
            this.dataList = List;
        },
        //点击日历
        calendarClick: function (index) {
            for (const [key, value] of Object.entries(this.routeList)) {
                if (key != index) {
                    Vue.set(value, "calendarShow", false);
                } else {
                    Vue.set(value, "calendarShow", !value.calendarShow);
                }
            }
            let priceDate = calendarDate.year + "-" + (calendarDate.month > 9 ? calendarDate.month : "0" + calendarDate.month);
            console.log(priceDate);
            let nthis = $(this).parent().parent().next().next(".calendar-box");
            requestGet(getRoutePriceDetailsUrl, {
                routeid: this.routeList[index].routeid,
                priceDate: priceDate,
            }, function (data) {
                nthis.calendar({
                    ele: '.date-box', //依附dom
                    title: '',
                    data: data.body.list
                });
            })
        },
        //参团详情页面
        getInfor: function (id) {
            this.$router.push({path:"/routeInfo/"+id})
        },
        //修改排序方式
        orderByTypeChange: function (index) {
            if (index === 2) {
                this.orderByType = this.orderByType === 3 ? 2 : 3;
            } else {
                if (this.orderByType === index) {
                    return;
                }
                this.orderByType = index;
            }
            console.log(this.orderByType);
            this.current_page = 1;
            this.selectRoute();
        },
        //添加子评论
       async  addChildComment(id) {
            if(this.loginType == 1){
                this.loginFlagChange(1);
                return;
            }
            if(this.content == ""){
                this.infoMsg("请输入评论内容");  
                return;
            }
           let data = await addChildComment({
                commentid: id,
                content: this.content,
            })
            if(data){
                this.successMsg("评论成功");
                this.content = "";
                this.getChildComment(1, 1);
            }
        },
        //点赞-取消点赞
        async digComment(id, index1, index2) {
            if(this.loginType == 1){
                this.loginFlagChange(1);
                return;
            }
            let data =  digComment({
                typeId: id,
                digType: 1,
            })
            if (data.code) {
                Vue.set(this.routeList[index1].commentList[index2], "commentList", this.routeList[index1].commentList[index2].digNum++);
                this.successMsg("点赞成功");
            } else {
                Vue.set(this.routeList[index1].commentList[index2], "commentList", this.routeList[index1].commentList[index2].digNum--);
                this.successMsg("取消点赞成功");
            }
        },
        //初始化一级评论分页
        page1: function () {
            $('#travel-content-main-list-paging1').jqPaginator({
                totalPages: this.routeList[this.index1].pages,
                visiblePages: 6,
                currentPage: 1,
                onPageChange: function (num, type) {
                    if(type == "change"){
                        app.selectComment(2, num);
                    }
                }
            });
        },
        //初始化二级评论分页
        page2: function () {
            $('#travel-content-main-list-paging2').jqPaginator({
                totalPages: this.routeList[this.index1].commentList[app.index2].pages,
                visiblePages: 6,
                currentPage: 1,
                onPageChange: function (num, type) {
                    if(type == "change"){
                        app.getChildComment(2, num);
                    }
                }
            });
        },
        //一级评论显示隐藏
        commentNumClick: function (index1) {
            Vue.set(this.routeList[index1], "show", !this.routeList[index1].show);
            if (this.routeList[index1].show) {
                for (const [key, value] of Object.entries(this.routeList)) {
                    if (key != index1) {
                        Vue.set(value, "show", false);
                    }
                }
                this.index1 = index1;
                this.selectComment(1, 1);
            }
        },
        //二级评论显示隐藏
        subreviewClick: function (index1, index2) {
            Vue.set(this.routeList[index1].commentList[index2], "show", !this.routeList[index1].commentList[index2].show);
            if (this.routeList[index1].commentList[index2].show) {
                this.content = "";
                for (const [key, value] of Object.entries(this.routeList[index1].commentList)) {
                    if (key != index2) {
                        Vue.set(value, "show", false);
                    }
                }
                this.index2 = index2;
                this.getChildComment(1, 1);
            }
        },
        //获取子评论列表
        async getChildComment(type, pageNo) {
            let data = await getChildComment({
                commentid: this.routeList[this.index1].commentList[this.index2].commentid,
                pageNo: pageNo,
            })
            Vue.set(this.routeList[this.index1].commentList[this.index2], "commentList", data.list);
            Vue.set(this.routeList[this.index1].commentList[this.index2], "pages", data.totalPage);
            if (type == 1) {
                this.page2();
            }
        },
        //获取评论列表
        async selectComment(type, pageNo) {
            let data = await selectComment({
                pageNo: pageNo,
                typeid: this.routeList[this.index1].routeid,
                proType: 4,  //1.包车租车2.短程接送3.接送机4常规路线5.当地参团6.游轮7.景点门票
                            //8.当地玩家9.酒店10.保险11.旅游定制12导游 13.攻略评论 14.城市评论',
            })
            if(data){
                Vue.set(this.routeList[this.index1], "commentList", data.list);
                Vue.set(this.routeList[this.index1], "pages", data.totalPage);
                if (type == 1) {
                    this.page1();
                }
            }
        },
        //当地参团查询
        async selectRoute() {
            let data = await selectRoute({
                startCity: this.startCity,
                orderByType: this.orderByType,
                pageNo: this.current_page,
                date: JSON.stringify(this.selectDate),
                day: this.day.join(","),
                maxPrice: this.maxPrice,
                minPrice: this.minPrice,
                labelAttrid: this.labelAttrid.join(","),
            },"POST")
            if(data){
                this.routeList = data.list;
                for (const list of this.routeList) {
                    if(list.carImg){
                        this.$set(list, "carImg", list.carImg.split(",")[0])
                    }
                    //解决分数是字符串报错
                     this.$set(list, "star", list.star?parseInt(list.star):0)
                }
                this.pages = data.totalPage;
                this.getRouteDate();
            }
        },
        //获取团期
        getRouteDate:function(){
            for (const list of Object.values(this.routeList)) {
                let routeDate = [];
                for(let k = 0;k<list.dayNum;k++){
                    let dd = new Date(list.routeDate);
                    dd.setDate(dd.getDate() + k);//获取AddDayCount天后的日期 
                    let m = dd.getMonth() + 1;//获取当前月份的日期 
                    let d = dd.getDate();
                    routeDate.push(m + '月' + d + '日'); 
                }
                Vue.set(list,"routeDate",routeDate.join(","));
            }
        },
        //获取标签属性
        async getLabel() {
            let data = await getLabel({
                routeType: 1,  //1  常规线路  2 当地参团  3 邮轮  4 景点 5 当地玩家  6 商务定制',
            })
            this.lableList = data;
            for (const list of Object.values(this.lableList)) {
                Vue.set(list, "showFlag", true);
            }
        },
        //获取全部城市
        async getCity() {
            this.cityList = await getCityList({
                cityid: this.startCity
            });
        },
        //点击上一页 下一页
        pageChange: function (index) {
            index += this.current_page;
            if (index < 1 || index > this.pages) {
                return;
            }
            this.current_page = index;
            this.selectRoute();
        },
        //选择页数
        jumpPage: function (id) {
            if (id == this.current_page) {
                return;
            }
            this.current_page = id;
            this.selectRoute();
        },
    },
    computed: {
         ...mapState([ "currencySign", ]),
        //出发城市名称
        startCityName(){
            if( this.cityList.length > 0)
            for (const list of this.cityList) {
                if(this.startCity == list.cityid){
                    return list.cityName;
                }
            }
        },
        show: function () {
            return this.pages && this.pages != 1
        },
        pstart: function () {
            return this.current_page <= 1;
        },
        pend: function () {
            return this.current_page >= this.pages;
        },
        efont: function () {
            if (this.pages <= 7) return false;
            return this.current_page > 5
        },
        ebehind: function () {
            if (this.pages <= 7) return false;
            var nowAy = this.indexs;
            return nowAy[nowAy.length - 1] != this.pages;
        },
        indexs: function () {

            var left = 1,
                right = this.pages,
                ar = [];
            if (this.pages >= 7) {
                if (this.current_page > 5 && this.current_page < this.pages - 4) {
                    left = Number(this.current_page) - 3;
                    right = Number(this.current_page) + 3;
                } else {
                    if (this.current_page <= 5) {
                        left = 1;
                        right = 7;
                    } else {
                        right = this.pages;

                        left = this.pages - 6;
                    }
                }
            }
            while (left <= right) {
                ar.push(left);
                left++;
            }
            return ar;
        },
    },
    filters: {
        dayFilter: function (value) {
            if (!value) return;
            if (parseInt(value) < 15) return `${value}天`;
            return "15天及以上";
        },
    },
}
</script>
