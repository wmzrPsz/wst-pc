<template>
    <div>
        
        <ezHeader></ezHeader>
        <ezContainer></ezContainer>

        <!--content-->
        <div class="banner_a">
            <div class="banner-img">
                <p>【奥斯卡级】大佬圣诞节拉伸角度看</p>
            </div>
            <div class="banner-content">

                <carNav carType = "3" ></carNav>

                <!-- <div class="banner-content-con"> -->

                    <!-- 接机 -->
                    <!-- <div v-show="orderType == 1">
                        <div class="banner-content-con-list qingchu" style="width: 520px;">
                            <p>起飞时间</p>
                            <div class="banner-content-con-list-info">
                                <span>航班号</span>
                                <input type="text" class="form-control" placeholder="输入航班号" v-model.trim="airNo">
                            </div>
                            <a class="sen_s " style="margin-left: 75px;margin-top: 0.5rem;">当地时间 2018-03-09
                                13:53降落圣迭戈国际机场-SAN</a>
                        </div>
                        <div class="banner-content-con-list">
                            <p>送达地点</p>
                            <div class="banner-content-con-list-info">
                                <span>送达地点</span>
                                <input type="text" placeholder="选择城市" class="search form-control " style="width:100px;" v-model.trim="startCityName" readonly>
                                <input type="text" class="form-control form-control_a" placeholder="输入详情地址" v-model.trim="startAddress">
                            </div>
                        </div>
                        <div class="banner-content-con-list qingchu">
                            <p>人数</p>
                            <div class="banner-content-con-list-info">
                                <span>租车人数</span>
                                <input type="text" class="form-control" style="width:130px;" readonly :value="adultNum+'成人'+childNum+'小孩'">
                                <span class="luggage">行李</span>
                                <input type="number" class="form-control" style="width:130px;" v-model.number="bagNum">
                            </div>
                        </div>
                    </div> -->

                    <!-- 送机 -->
                    <!-- <div v-show="orderType == 2">
                        <div class="banner-content-con-list qingchu" style="width: 520px;">
                            <p>送机时间</p>
                            <div class="banner-content-con-list-info">
                                <span>送机时间</span>
                                <input type="text" class="form-control " style="width:140px;" placeholder="选择时间" id="tripEndDate"
                                    v-model="startDate" readonly>
                                <input type="text" class="form-control form-control_a" placeholder="输入航班号" v-model.trim="airNo">
                            </div>
                            <a class="sen_s" style="margin-left: 88px;margin-top: 0.5rem;">当地时间 2019-03-09
                                13:53降落圣迭戈国际机场-SAN</a>
                        </div>
                        <div class="banner-content-con-list">
                            <p>出发地</p>
                            <div class="banner-content-con-list-info">
                                <span>出发地点</span>
                                <input type="text" placeholder="选择城市" class="search form-control " style="width:100px;" v-model.trim="startCityName" readonly>
                                <input type="text" class="form-control form-control_a" placeholder="输入详情地址" v-model.trim="startAddress">
                            </div>
                        </div>
                        <div class="banner-content-con-list qingchu">
                            <p>人数</p>
                            <div class="banner-content-con-list-info">
                                <span>租车人数</span>
                                <input type="text" class="form-control" style="width:130px;" readonly :value="adultNum+'成人'+childNum+'小孩'">
                                <span class="luggage">行李</span>
                                <input type="number" class="form-control" style="width:130px;" v-model.number="bagNum">
                            </div>
                        </div>
                    </div>

                    <div class="banner-content-con-btn">
                        <button class="btn btn-primary" @click.stop="goToCar">立即订制</button>
                    </div> -->

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



                <!-- </div> -->
            </div>
        </div>
        <div class="content ez-travel-attractions">
            <div class="container ez-container">
                <!--part20 推荐景点 start-->
                <ez-module html-name = "接送机" html-seal = "内容模块"></ez-module>
                <!--part20 end-->
            </div>
        </div>

        <ezFooter></ezFooter>
        <ezAside></ezAside>

    </div>
</template>
<script>
import ezHeader from "components/home/ezHeader"
import ezContainer from "components/home/ezContainer"
import ezFooter from "components/home/ezFooter"
import ezAside from "components/home/ezAside"
import ezModule from "components/home/ezModule"
import carNav from "components/car/carNav"
import { mapGetters, mapState, mapMutations } from 'vuex'
export default {
    name: "carTranIndex",
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
    components: {
        ezHeader,
        ezContainer,
        ezFooter,
        ezAside,
        ezModule,
        carNav,
    },
    methods: {
          ...mapMutations('carTran',['STATE_CHANGE']),
        handleSelect(key, keyPath) {
            this.orderType = key;
            console.log(key, keyPath);
        },
        //导航栏切换
        goToCar: function () {
            if(this.isNull(this.airNo)){
                this.infoMsg("请输入航班号"); return;
            }
            if(this.isNull(this.startDate)){
                this.infoMsg("请输入时间"); return;
            }
            if(this.isNull(this.startAddress)){
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
