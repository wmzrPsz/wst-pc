<template>
    <section class="col-md-12 ez-index-wrap ez-custom-search" style="overflow: hidden;">
        <form class="form-horizontal">
            <div class="col-md-6 col-sm-6 col-xs-6">
                <h4 class="ez-mb-md">上车地点</h4>
                <div class="form-group">
                    <label class="control-label col-sm-2">出发地</label>
                    <div class="col-sm-5">
                        <el-select v-model="startCity" clearable placeholder="请选择">
                            <el-option
                            v-for="list in cityList"
                            :key="list.cityid"
                            :label="list.cityName"
                            :value="list.cityid">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="col-sm-5">
                        <el-input
                        placeholder="请输入详细地点"
                        v-model.trim="startAddress"
                        clearable>
                        </el-input>
                    </div>
                </div>
            </div>
            <div class="col-md-6 col-sm-6 col-xs-6">
                <h4 class="ez-mb-md">下车地点</h4>
                <div class="form-group">
                    <label class="control-label col-sm-2">目的地</label>
                    <div class="col-sm-5">
                        <el-select v-model="endCity" clearable placeholder="请选择">
                            <el-option
                            v-for="list in cityList"
                            :key="list.cityid"
                            :label="list.cityName"
                            :value="list.cityid">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="col-sm-5">
                        <el-input
                        placeholder="请输入详细地点"
                        v-model.trim="endAddress"
                        clearable>
                        </el-input>
                    </div>
                </div>
            </div>
            <div class="col-md-6 col-sm-6 col-xs-6">
                <h4 class="ez-mb-md">日期</h4>
                <div class="form-group">
                        <label class="control-label col-sm-2">选择日期</label>
                        <div class="col-sm-8">
                            <el-date-picker
                            v-model="startDate"
                            type="datetime"
                                value-format = "yyyy-MM-dd HH:mm:ss"
                            placeholder="选择日期时间">
                            </el-date-picker>
                            </div>
                </div>
            </div>
            <div class="col-md-6 col-sm-6 col-xs-6">
                <h4 class="ez-mb-md">人数</h4>
                <div class="form-group">
                        <label class="control-label col-sm-2">成人</label>
                        <div class="col-sm-4">
                                <el-input-number v-model.number="adultNum" :step="1" :min="1" ></el-input-number>
                        </div>
                        <label class="control-label col-sm-2">儿童</label>
                        <div class="col-sm-4">
                                <el-input-number v-model.number="childNum" :step="1" :min="0"></el-input-number>
                        </div>

                </div>
                <div class="form-group">
                        <label class="control-label col-sm-2">行李</label>
                        <div class="col-sm-5">
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
import { 
    getCityList
} from 'getData'
export default {
    name: "carShortIndex",
    props:{
        cityid:{
            type: Number
        }
    },
    data() {
        return {
            startCity:"",  //上车城市
            startAddress:"",  //上车详细地址
            endCity:"",   //下车城市
            endAddress:"",   //下车详细地址
            startDate:"", //上车时间
            adultNum:1,   //大人数量
            childNum:0,   //小孩数量
            bagNum:0,   //包裹数量
            cityList: [], //城市列表
        }
    },
    computed: {
        //上车城市名称
        startCityName(){
            let startCityName = "";
            for (const list of this.cityList) {
                if(list.cityid == this.startCity){
                    startCityName = list.cityName
                }
            }
            return startCityName
        },
        //下车城市名称
        endCityName(){
            let endCityName = "";
            for (const list of this.cityList) {
                if(list.cityid == this.endCity){
                    endCityName = list.cityName
                }
            }
            return endCityName
        },
    },
    created () {
        if(!this.isEmpty(this.cityid)){
          this.startCity = this.cityid;
        }
        this.getCityList();  
    },
    methods: {
        ...mapMutations('carShort',['STATE_CHANGE']),
        //获取全部城市
        async getCityList() {
            this.cityList = await getCityList({});
        },
        //去选车
        goToCar:function(){
            console.log(this.startDate)
            if(this.isEmpty (this.startCity)){
                this.infoMsg("请选择上车城市"); return;
            }
            if(this.isEmpty (this.startAddress)){
                this.infoMsg("请选择上车详细地点"); return;
            }
            if(this.isEmpty (this.endCity)){
                this.infoMsg("请选择下车城市"); return;
            }
            if(this.isEmpty (this.endAddress)){
                this.infoMsg("请选择下车详细地点"); return;
            }
            if(this.isEmpty (this.startDate)){
                this.infoMsg("请选择日期"); return;
            }
            this.STATE_CHANGE({
                startCity: this.startCity,  
                startCityName: this.startCityName,  
                startAddress: this.startAddress,  
                endCity: this.endCity,  
                endCityName: this.endCityName,  
                endAddress: this.endAddress,  
                startDate: this.startDate,  
                adultNum: this.adultNum,  
                childNum: this.childNum,  
                bagNum: this.bagNum,
            })
            this.$router.push("carShortInfo");
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