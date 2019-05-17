<template>
    <div class="content-right no-border">
        <div class="panel-header ez-base-border">
            <div class="pull-left panel-header-title">价格设置</div>

        </div>
        <div class="content-panel">
            <div class="route-content ez-base-border">
                <!--路线规划-->
                <form class="form-horizontal wrap-account">

                    <div class="form-group">
                        <span class="label-txt"></span>
                        <div class="form-content guide-radio-group">
                        <span v-for="(guide, index) in guideLists">
                            <input class="" type="checkbox" :value="index+1"  v-model="guideType" name="guidetype" @change="guideTypeChange">{{guide.name}}</span>
                        </div>
                    </div>

                    <div class="form-group">
                        <span class="label-txt ">导游类型</span>
                        <div class="form-content">
                            <ul class="nav nav-tabs">
                                <li :class="{active:guide.id == guideTypeIndex}" @click="guideTypeIndexChange(guide.id)" 
                                v-for="(guide, index) in guideLists" :key="index" v-if="guide.flag">
                                    <a href="#identifier" data-toggle="tab">{{guide.name}}</a></li>
                            </ul>
                        </div>
                    </div>


                    <div class="form-group" v-for="(list, index) in guideLists" :key="index" v-if="list.id == guideTypeIndex && list.flag">
                        <span class="label-txt">价格设置</span>
                        <div class="form-content">
                            <div class="route-panel ez-nav-tabs ez-base-border" >
                                <ul class="list-inline text-center">
                                    <li :class="{active:list.guideTime.dateType==1}" @click="dateTypeChange(index,1)"><a>所有日期</a></li>
                                    <li :class="{active:list.guideTime.dateType==2}" @click="dateTypeChange(index,2)"><a>按星期</a></li>
                                    <li :class="{active:list.guideTime.dateType==3}" @click="dateTypeChange(index,3)"><a>按号数</a></li>
                                </ul>

                                <div class="route-tabcontent">
                                    <div class="form-group-inner">
                                        <span class="label-txt ">开始时间</span>
                                        <div class="form-content-inner">
                                            <input class="form-control" type="date" v-model="list.guideTime.beginDate">
                                        </div>
                                    </div>
                                    <div class="form-group-inner">
                                        <span class="label-txt ">结束时间</span>
                                        <div class="form-content-inner">
                                            <input class="form-control" type="date"  v-model="list.guideTime.endDate">
                                        </div>
                                    </div>
                                    <!--所有日期-->
                                    <div class="tab-pane route-tabpane" :class="{active:list.guideTime.dateType==1}">

                                    </div>
                                    <!--按星期-->
                                    <div class="tab-pane route-tabpane" :class="{active:list.guideTime.dateType==2}">
                                        <div class="form-group-inner" style="margin-top: 0px">
                                            <span class="label-txt "></span>
                                            <div class="form-content-inner">
                                                <ul class="list-inline date-weeks-list toggle-list text-center">
                                                    <li v-for="(week, index1) in list.guideTime.weekDate" :key="index1" :class="{'active':week.flag}"
                                                        @click="weekClick(index, index1)">{{week.name}}</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <!--按号数-->
                                    <div class="tab-pane route-tabpane" :class="{active:list.guideTime.dateType==3}">
                                        <div class="form-group-inner" style="margin-top: 0px">
                                            <ul class="list-inline date-days-list toggle-list text-center">
                                                <li v-for="(day, index1) in list.guideTime.dayDate" :key="index1" :class="{'active':day.flag}"
                                                    @click="dayClick(index,index1)">{{day.name}}</li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div class="form-group-inner">
                                        <span class="label-txt ">价格</span>
                                        <div class="form-content-inner">
                                            <input class="form-control" type="number" v-model="list.guideTime.price" placeholder="请输入价格">
                                        </div>
                                    </div>

                                </div>
                                <div class="clearfix"></div>
                            </div>
                        </div>
                    </div>

                    <div class="form-group" vf>
                        <span class="label-txt ">退款设置</span>
                        <div class="form-content">
                            <div class="form-content-car ez-base-border" v-for="(guide, index) in guideLists" :key="index" v-if="guide.flag">
                                <p v-for="(memberRefund, index1) in guide.memberRefundList" :key="index1">
                                    订单确认后提前（包含<input class="price-input" type="number" v-model.number = "memberRefund.refundDay"> 
                                    天，退款比例<input class="price-input" type="number"  v-model.number = "memberRefund.refundNum">%
                                    <a class="btn ez-btn" @click="memberRefundDel(index,index1)">删除</a>
                                </p>
                                    <a class="btn ez-btn" @click="memberRefundAdd(index)">增加</a>
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <span class="label-txt"></span>
                        <div class="form-content">
                            <a class="btn btn-lg ez-btn-parmary ez-mr-md" @click="commit">提交</a>
                            <!--<a class="btn btn-lg ez-btn">取消</a>-->
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import {
    updateGuidePrice,
    getGuidePrice,
     } from 'getData'
export default {
    name: "myPrice",
    data() {
        return {
            weekList: [],  //星期
            dayList: [],  //天数
            guideLists:[],  //数据
            guideType: [],  //选择导游类型
            guideTypeIndex: 1, //显示的导游类型
        }
    },
    mounted() {
        this.weekListInit();
        this.dayListInit();
        this.getData();
    },
    methods: {
        //确定订单
        async commit(){
            // let guideLists = [...this.guideLists];
                let guideLists = this.copy(this.guideLists);
            // let guideLists = JSON.parse(JSON.stringify(this.guideLists))
            for (const guide of guideLists) {
                let weekDate = [];
                for (const week of guide.guideTime.weekDate) {
                    if(week.flag){
                        weekDate.push(week.value);
                    }
                }
                guide.guideTime.weekDate = weekDate.toString();
                let dayDate = [];
                for (const day of guide.guideTime.dayDate) {
                    if(day.flag){
                        dayDate.push(day.value);
                    }
                }
                guide.guideTime.dayDate = dayDate.toString();
                if(guide.memberRefundList.length == 0){
                    guide.memberRefundList = "";
                }
            }
            console.log(guideLists);
            console.log(this.guideLists);
            if(await updateGuidePrice({
                  guideLists: JSON.stringify(guideLists),
            },'post')){
                successMsg("保存成功");
            }
        },
        //删除退款
        memberRefundDel: function(index, index1){
            Vue.delete(this.guideLists[index].memberRefundList,index1);
        },
        //增加退款
        memberRefundAdd: function(index){
            let map = {};
            map.refundDay = "";
            map.refundNum = "";
            console.log(this.guideLists[index].memberRefundList)
            this.guideLists[index].memberRefundList.push(map);
        },
        //导游类型改变
        guideTypeChange: function(){
            for (const guide of this.guideLists) {
                if(this.guideType.toString().includes(guide.id)){
                    guide.flag = true;
                }else{
                    guide.flag = false;
                }
            }
        },
        //显示的导游类型改变
        guideTypeIndexChange: function(guideTypeIndex){
            this.guideTypeIndex = guideTypeIndex;
        },
        //点击天数
        dayClick: function(index, index1){
            this.guideLists[index].guideTime.dayDate[index1].flag = !this.guideLists[index].guideTime.dayDate[index1].flag;
        },
        //点击星期
        weekClick: function(index, index1){
            this.guideLists[index].guideTime.weekDate[index1].flag = !this.guideLists[index].guideTime.weekDate[index1].flag;
        },
        //星期初始化
        weekListInit:function(){
            this.weekList = [];
            for(let k=1;k<=7;k++){
                let map = {};
                Vue.set(map,"value",k);
                Vue.set(map,"flag",false);
                if(k==1)  Vue.set(map,"name","周日");
                if(k==2)  Vue.set(map,"name","周一");
                if(k==3)  Vue.set(map,"name","周二");
                if(k==4)  Vue.set(map,"name","周三");
                if(k==5)  Vue.set(map,"name","周四");
                if(k==6)  Vue.set(map,"name","周五");
                if(k==7)  Vue.set(map,"name","周六");
                Vue.set(this.weekList,k -1,map);
            }
        },
        //天数初始化
        dayListInit:function(){
            this.dayList = [];
            for(let k=1;k<=31;k++){
                let map = {};
                Vue.set(map,"name",k+'号');
                Vue.set(map,"value",k);
                Vue.set(map,"flag",false);
                Vue.set(this.dayList,k -1,map);
            }
        },
        //dateTyep改变
        dateTypeChange:function(index,value){
            Vue.set(this.guideLists[index].guideTime,"dateType",value);
        },
        //获取导游价格设置和退款价格设置
        async getData() {
            let data = await (getGuidePrice())
            if(data) {
                this.dataInit(data.list, data.list2, data.guideType);
            }
        },
        //数据初始化
        dataInit(guideTimeList, memberRefundList, guideType) {
            let guideLists = [];
            this.guideType = [];
            for (const guide of this.guideList) {
                guide.flag = false;
                let guideTime = {};
                guideTime.type = "";
                guideTime.dateType = 1;
                guideTime.beginDate = "";
                guideTime.endDate = "";
                guideTime.weekDate = [...this.weekList];
                guideTime.dayDate = [...this.dayList];
                guideTime.price = "";
                guide.guideTime = guideTime;
                guide.memberRefundList = [];
                for (const guideTime1 of guideTimeList) {
                    if(guideTime1.type == guide.id){
                        this.guideType.push(parseInt(guide.id));
                        guide.flag = true;
                        guide.guideTime = guideTime1;
                        let weekDate = [...this.weekList];
                        let dayDate = [...this.dayList];
                        if(guideTime1.weekDate){
                            for (const week of weekDate) {
                                if(guideTime1.weekDate.includes(week.value)){
                                    week.flag = true;
                                }else{
                                    week.flag = false;
                                }
                            }
                        }
                        if(guideTime1.dayDate){
                            for (const day of dayDate) {
                                if(guideTime1.weekDate.includes(day.value)){
                                    day.flag = true;
                                }else{
                                    day.flag = false;
                                }
                            }
                        }
                        guide.guideTime.weekDate = [...weekDate];
                        guide.guideTime.dayDate = [...dayDate];
                    }
                }
                for (const memberRefund of memberRefundList) {
                    memberRefund.refundType = parseInt(memberRefund.refundType) -10;
                    if(memberRefund.refundType == guide.id){
                        guide.memberRefundList.push(memberRefund);
                    }
                }
                guideLists.push(guide);
            }
            console.log(guideLists);
            this.guideLists = guideLists;
        },
    },
}
</script>
