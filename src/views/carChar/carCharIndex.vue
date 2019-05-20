<template>
    <div>
        
        <ezHeader></ezHeader>
        <ezContainer></ezContainer>

        <!--content-->
        <div class="banner">
            <div class="banner-img">
                <p>【奥斯卡级】大佬圣诞节拉伸角度看</p>
            </div>
            <div class="banner-content">
            <carNav carType = "1" ></carNav>

            <section class="col-md-12 ez-index-wrap ez-custom-search" >
                <form class="form-horizontal">
                    <div class="col-md-4 col-sm-4 col-xs-4">
                        <h4 class="ez-mb-md">地点</h4>
                        <div class="form-group">
                            <label class="control-label col-sm-4">出发地</label>
                            <div class="col-sm-8">
                                <el-select v-model="startCity" clearable placeholder="请选择">
                                    <el-option
                                    v-for="list in cityList"
                                    :key="list.cityid"
                                    :label="list.cityName"
                                    :value="list.cityid">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-sm-4">详细地点</label>
                            <div class="col-sm-8">
                                <el-input
                                placeholder="请输入详细地点"
                                v-model.trim="startAddress"
                                clearable>
                                </el-input>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 col-sm-4 col-xs-4">
                        <h4 class="ez-mb-md">日期</h4>
                        <div class="form-group">
                                <label class="control-label col-sm-4">开始日期</label>
                                <div class="col-sm-8">
                                        <el-date-picker
                                        v-model="startDate"
                                        value-format = "yyyy-MM-dd"
                                        type="date"
                                        placeholder="选择日期">
                                        </el-date-picker>
                                </div>
                        </div>
                        <div class="form-group">
                                <label class="control-label col-sm-4">结束日期</label>
                                <div class="col-sm-8">
                                        <el-date-picker
                                        v-model="endDate"
                                        value-format = "yyyy-MM-dd"
                                        type="date"
                                        placeholder="选择日期">
                                        </el-date-picker>
                                </div>
                        </div>
                    </div>
                    <div class="col-md-4 col-sm-4 col-xs-4">
                        <h4 class="ez-mb-md">人数</h4>
                        <div class="form-group">
                                <label class="control-label col-sm-3">成人</label>
                                <div class="col-sm-9">
                                     <el-input-number v-model.number="adultNum" :step="1" :min="1"></el-input-number>
                                </div>
                        </div>
                        <div class="form-group">
                                <label class="control-label col-sm-3">行李</label>
                                <div class="col-sm-9">
                                     <el-input-number v-model.number="childNum" :step="1" :min="0"></el-input-number>
                                </div>
                        </div>
                        <div class="form-group">
                                <label class="control-label col-sm-3">行李</label>
                                <div class="col-sm-9">
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
                <ez-module html-name = "包车租车" html-seal = "内容模块"></ez-module>
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
import { 
    getCityList
} from 'getData'
export default {
    name: "carIndex",
    data() {
        return {
            startCity: "",  //城市ID
            startAddress:"",  //详细地点
            startDate:"",  //开始时间
            endDate:"",  //结束时间
            adultNum:0,  //成人数量
            childNum:0,  //儿童数量
            bagNum:0,  //行李数量
            cityList: [], //城市列表
        }
    },
    computed: {
        //城市名称
        startCityName(){
            let startCityName = "";
            for (const list of this.cityList) {
                if(list.cityid == this.startCity){
                    startCityName = list.cityName
                }
            }
            return startCityName
        },
    },
    components: {
        ezHeader,
        ezContainer,
        ezFooter,
        ezAside,
        ezModule,
        carNav,
    },
    created() {
        this.getCityList();
    },
    methods: {
         ...mapMutations('carChar',['stateChange']),
        //获取全部城市
        async getCityList() {
            this.cityList = await getCityList({});
        },
        //去选车
        goToCar:function(){
            if(this.isEmpty (this.startCity)){
                this.infoMsg("请选择城市"); return;
            }
            if(this.isEmpty (this.startDate)){
                this.infoMsg("请选择开始时间"); return;
            }
            if(this.isEmpty (this.endDate)){
                this.infoMsg("请选择结束时间"); return;
            }
            if(new Date(this.endDate).getTime() - new Date(this.startDate).getTime() <= 0){
                this.infoMsg("请选择正确的时间"); return;
            }
            this.stateChange({
                startCity: this.startCity,  
                startCityName: this.startCityName,  
                startAddress: this.startAddress,  
                startDate: this.startDate,  
                endDate: this.endDate,  
                adultNum: this.adultNum,  
                childNum: this.childNum,  
                bagNum: this.bagNum,  
            })
            this.$router.push("carCharInfo");
        },
    }
}
</script>
<style lang="less" scoped>
    .ez-custom-search{
        overflow: hidden;
        background-color: #fff;
    }
</style>


