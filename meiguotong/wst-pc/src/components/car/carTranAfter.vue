<template>
    <section class="col-md-12 ez-index-wrap ez-custom-search">

        <el-menu :default-active="orderType" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1">接机</el-menu-item>
            <el-menu-item index="2">送机</el-menu-item>
        </el-menu>

        <form class="form-horizontal" v-if="orderType == 1">
            <div class="col-md-6 col-sm-6 col-xs-6">
                <h4 class="ez-mb-md">接机时间</h4>
                <div class="form-group">
                    <label class="control-label col-sm-2">航班日期</label>
                    <div class="col-sm-5">
                        <el-date-picker
                        v-model="startDate"
                        type="date"
                        value-format = "yyyy-MM-dd"
                        placeholder="选择日期时间">
                        </el-date-picker>
                    </div>
                    <div class="col-sm-5">
                        <el-input
                        placeholder="请输入航班号"
                        v-model.trim="airNo"
                        clearable>
                        </el-input>
                    </div>
                </div>
                    <div class="form-group">
                    <label class="control-label col-sm-2"></label>
                        <div class="col-sm-10">
                        当地时间{{reachDate}}降落{{sendAirport}}
                        </div>
                    </div>
            </div>
            <div class="col-md-6 col-sm-6 col-xs-6">
                <h4 class="ez-mb-md">送达地点</h4>
                <div class="form-group">
                        <label class="control-label col-sm-3">送达地点</label>
                        <div class="col-sm-9">
                            <el-input
                            placeholder="请输入详细地址"
                            v-model.trim="startAddress"
                            clearable>
                            </el-input>
                        </div>
                </div>
            </div>
            <div class="col-md-12 col-sm-12 col-xs-12">
                <h4 class="ez-mb-md">人数</h4>
                <div class="form-group">
                        <label class="control-label col-sm-1">成人</label>
                        <div class="col-sm-3">
                                <el-input-number v-model.number="adultNum" :step="1" :min="1"></el-input-number>
                        </div>
                        <label class="control-label col-sm-1">儿童</label>
                        <div class="col-sm-3">
                                <el-input-number v-model.number="childNum" :step="1" :min="0"></el-input-number>
                        </div>
                        <label class="control-label col-sm-1">行李</label>
                        <div class="col-sm-3">
                                <el-input-number v-model.number="bagNum" :step="1" :min="0"></el-input-number>
                        </div>
                </div>
            </div>
            <div class="col-md-12 col-sm-12 col-xs-12">
                <a class="btn ez-btn-parmary pull-right" @click="goToCar">确定选车</a>
            </div>
        </form>

        <form class="form-horizontal" v-if="orderType == 2">
            <div class="col-md-6 col-sm-6 col-xs-6">
                <h4 class="ez-mb-md">送机时间</h4>
                <div class="form-group">
                    <label class="control-label col-sm-2">航班时间</label>
                    <div class="col-sm-5">
                        <el-date-picker
                        v-model="startDate"
                        type="date"
                        value-format = "yyyy-MM-dd"
                        placeholder="选择日期时间">
                        </el-date-picker>
                    </div>
                    <div class="col-sm-5">
                        <el-input
                        placeholder="请输入航班号"
                        v-model.trim="airNo"
                        clearable>
                        </el-input>
                    </div>
                </div>
                    <div class="form-group">
                    <label class="control-label col-sm-2"></label>
                        <div class="col-sm-10">
                        当地时间{{sendDate}}在{{sendAirport}}起飞
                        </div>
                    </div>
            </div>
            <div class="col-md-6 col-sm-6 col-xs-6">
                <h4 class="ez-mb-md">出发地</h4>
                <div class="form-group">
                        <label class="control-label col-sm-3">出发地点</label>
                        <div class="col-sm-9">
                            <el-input
                            placeholder="请输入详细地址"
                            v-model.trim="startAddress"
                            clearable>
                            </el-input>
                        </div>
                </div>
            </div>
            <div class="col-md-12 col-sm-12 col-xs-12">
                <h4 class="ez-mb-md">人数</h4>
                <div class="form-group">
                        <label class="control-label col-sm-1">成人</label>
                        <div class="col-sm-3">
                                <el-input-number v-model.number="adultNum" :step="1" :min="1"></el-input-number>
                        </div>
                        <label class="control-label col-sm-1">儿童</label>
                        <div class="col-sm-3">
                                <el-input-number v-model.number="childNum" :step="1" :min="0"></el-input-number>
                        </div>
                        <label class="control-label col-sm-1">行李</label>
                        <div class="col-sm-3">
                                <el-input-number v-model.number="bagNum" :step="1" :min="0"></el-input-number>
                        </div>
                </div>
            </div>
            <div class="col-md-12 col-sm-12 col-xs-12">
                <a class="btn ez-btn-parmary pull-right" @click="goToCar">确定选车</a>
            </div>
        </form>

    </section>
</template>
<script>
import { mapGetters, mapState, mapMutations } from 'vuex'
export default {
    name: "carTranIndex",
    props:{
        cityid:{
            type: Number
        }
    },
    data() {
        return {
            airNo:"",  //航班号
            sendAirport:"白云机场",  //起飞机场
            sendDate:"2018-06-09 13:53",  //起飞时间
            reachAirport:"黄花机场",  //到达机场
            reachDate:"2018-06-09 13:54",  //到达时间
            startDate:"",  //接送机时间
            startCity:"1",  //接送机城市
            startCityName:"广州",  //接送机城市名称
            startAddress:"",  //接送机详细地址
            adultNum: 1,   //大人数量
            childNum: 1,   //小孩数量
            bagNum: 0,   //包裹数量
            orderType: "1",  //1接机  2送机
        }
    },
    created() {
        if(!this.isEmpty(this.cityid)){
            this.startCity = this.cityid;
        }
    },
    methods: {
          ...mapMutations('carTran',['STATE_CHANGE']),
        handleSelect(key, keyPath) {
            this.orderType = key;
            console.log(key, keyPath);
        },
        //导航栏切换
        goToCar: function () {
            if(this.isEmpty (this.airNo)){
                this.infoMsg("请输入航班号"); return;
            }
            if(this.isEmpty (this.startDate)){
                this.infoMsg("请输入时间"); return;
            }
            if(this.isEmpty (this.startAddress)){
                this.infoMsg("请输入详细地址"); return;
            }
            if (this.adultNum + this.childNum <= 0) {
                this.infoMsg("请选择出行人数"); return;
            }
            this.STATE_CHANGE({
                airNo: this.airNo,  //航班号
                sendAirport: this.sendAirport,  //起飞机场
                sendDate: this.sendDate,  //起飞时间
                reachAirport: this.reachAirport,  //到达机场
                reachDate: this.reachDate,  //到达时间
                startDate: this.startDate,  //接送机时间
                startCity: this.startCity,  //接送机城市
                startCityName: this.startCityName,  //接送机城市名称
                startAddress: this.startAddress,  //接送机详细地址
                adultNum: this.adultNum,   //大人数量
                childNum: this.childNum,   //小孩数量
                bagNum: this.bagNum,   //包裹数量
                orderType: this.orderType,  //1接机  2送机
            })
            this.$router.push("carTranInfo");
        },
    }
}
</script>
<style lang="less" scoped>
    .ez-custom-search{
        overflow: hidden;
        background-color: #fff;
        padding:  0 0 25px 0;
    }
    .form-horizontal{
        padding-top: 25px;
    }
</style>
