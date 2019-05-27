<template>
    <div>
        
        <ezHeader></ezHeader>


        <!-- 添加城市 弹出框（Modal） -->
        <div class="modal fade addCityModal" id="addCityModal" tabindex="-1" role="dialog" aria-labelledby="cityModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title text-center text-bold" id="cityModalLabel">添加{{activeType | activeTypeVc}}</h4>
                    </div>
                    <div class="modal-body">
                        <div class="search-city-box">
                            <el-input
                            placeholder="请输入搜索内容"
                            v-model.trim="searchContent"
                            @keyup.13.native="clickSearch"
                            clearable>
                            </el-input>
                        </div>
                        <div class="search-city-result">
                            <div class="result-hot" v-if="activeType == 1">
                                <div class="result-city-card" v-for="(list, index) in cityList" :key="index"  @click="flagChange(false,index)" v-if="list.flag">
                                    <img v-lazy="list.photoUrl" :key="list.photoUrl">
                                    <div class="city-neme">
                                        <p>{{list.cityName}}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="result-hot" v-if="activeType == 2">
                                <div class="result-city-card" v-for="(list, index) in scenicList" :key="index"  @click="flagChange(false,index)" v-if="list.flag">
                                    <img v-lazy="list.imgUrl" :key="list.imgUrl">
                                    <div class="city-neme">
                                        <p>{{list.name}}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="result-hot" v-if="activeType == 3">
                                <div class="result-city-card" v-for="(list, index) in hotelList" :key="index"  @click="flagChange(false,index)" v-if="list.flag">
                                    <img v-lazy="list.imgUrl" :key="list.imgUrl">
                                    <div class="city-neme">
                                        <p>{{list.name}}</p>
                                    </div>
                                </div>
                            </div>
                            <h4 class="text-center result-title" >搜索结果</h4>
                            <div class="result-list" v-if="activeType == 1">
                                <div class="result-grid" v-for="(list, index) in cityList" :key="index" @click="flagChange(true,index)" v-if="!list.flag">
                                    <div class="result-city-card">
                                        <img v-lazy="list.photoUrl" :key="list.photoUrl">
                                        <div class="city-neme">
                                            <p>{{list.cityName}}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="clearfix"></div>
                            </div>
                            <div class="result-list" v-if="activeType == 2">
                                <div class="result-grid" v-for="(list, index) in scenicList" :key="index"  @click="flagChange(true,index)" v-if="!list.flag">
                                    <div class="result-city-card">
                                        <img v-lazy="list.imgUrl" :key="list.imgUrl">
                                        <div class="city-neme">
                                            <p>{{list.name}}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="clearfix"></div>
                            </div>
                            <div class="result-list" v-if="activeType == 3">
                                <div class="result-grid" v-for="(list, index) in hotelList" :key="index"  @click="flagChange(true,index)" v-if="!list.flag">
                                    <div class="result-city-card">
                                        <img v-lazy="list.imgUrl" :key="list.imgUrl">
                                        <div class="city-neme">
                                            <p>{{list.name}}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="clearfix"></div>
                            </div>
                            <div class="clearfix"></div>
                        </div>
                        <div class="clearfix"></div>
                    </div>
                    <div class="modal-footer ez-modal-footer">
                        <button type="button" class="btn ez-btn-cancel" data-dismiss="modal">取消</button>
                        <button type="button" class="btn ez-btn-save" data-dismiss="modal" @click="addStrategySon">保存</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- 添加城市 弹出框-->

        <div class="container ez-container">

            <!--part start-->
            <div class="col-md-12 ez-index-wrap ez-city-comments">
                <div class="box-left pull-left">
                    <div class="city-comments-wrap">
                        <div class="city-comments-header">游玩攻略</div>
                        <div class="city-comments-img">
                            <img :src="city.photoList | splitVc(0)" class="img-responsive">
                            <div class="comments-city">
                                <h4 class="title ez-mb-md">{{city.cityName}}</h4>
                                <h5>（{{city.countryName}}）</h5>
                            </div>
                        </div>
                        <form class="form-horizontal city-comments-from">
                            <div class="form-group">
                                <span class="label-txt">标题：</span>
                                <div class="form-content" >
                                    <el-input
                                    placeholder="请输入标题"
                                    v-model.trim="title"
                                    clearable>
                                    </el-input>
                                </div>
                            </div>
                            <div class="form-group">
                                <span class="label-txt">封面/标题：</span>
                                <div class="form-content upload-plugin coverImgUpload">
                                    <img class="upload-img" v-lazy="imgUrl" :key="imgUrl">
                                    <div class="upload-text">
                                        <p>建议上传图片尺寸为500*500</p>
                                        <p>大小不超过20M</p>
                                        <!--<a class="btn ez-btn">上传封面</a>-->
                                        <div class="ez-upload-btn ez-mt-10">
                                            <input type="file" title="上传封面" @change="imgChange()" accept="image/*"> 上传封面
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <table class="table ez-strategy-table text-center ez-mb-0">
                                <tr>
                                    <th class="text-center">日期</th>
                                    <th class="text-center">城市</th>
                                    <th class="text-center">景点</th>
                                    <th class="text-center">酒店</th>
                                    <th class="text-center">操作</th>
                                </tr>
                                <tr v-for="(list, index) in strategySon" :key="index">
                                    <td class="td-pd" style="width:250px;">
                                        <el-date-picker
                                        v-model="list.playTime"
                                        value-format = "yyyy-MM-dd"
                                        type="date"
                                        placeholder="选择日期">
                                        </el-date-picker>
                                           <!-- <a v-if="list.cityInfo"> {{list.cityInfo}}</a>
                                         <a data-toggle="modal" data-target="#addCityModal" v-else><i class="iconfont icon-addition_fill text-babyblue"></i>添加</a> -->
                       
                                    </td>
                                    <td class="td-pd" @click="tdClick(1,index)">
                                         <a v-if="list.cityInfo"> {{list.cityInfo}}</a>
                                         <a v-else><i class="iconfont icon-addition_fill text-babyblue"></i>添加</a>
                                    </td>
                                    <td class="td-pd" @click="tdClick(2,index)">
                                         <a v-if="list.secnicInfo"> {{list.secnicInfo}}</a>
                                         <a v-else><i class="iconfont icon-addition_fill text-babyblue"></i>添加</a>
                                        </td>
                                    <td class="td-pd" @click="tdClick(3,index)">
                                         <a v-if="list.hotelInfo"> {{list.hotelInfo}}</a>
                                         <a  v-else><i class="iconfont icon-addition_fill text-babyblue"></i>添加</a>
                                    </td>
                                    <td class="td-pd">
                                        <div class="td-pd-inner">
                                            <p><a class="text-red text-underline" @click="removeDay(index)">删除</a></p>
                                            <p><a class="">插入一天</a></p>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                            <div class="text-center strategy-table-foot ez-mb-md">
                                <a class="btn ez-btn-parmary" @click="addDay">新增一天</a>
                            </div>

                            <div class="form-group ez-ueditor-form">
                                <!-- <div class="ez-ueditor-box" id="ez-Editor">百度富文本编辑器</div> -->
                                <el-input
                                type="textarea"
                                :autosize="{ minRows: 8}"
                                placeholder="请输入内容"
                                v-model="content">
                                </el-input>
                            </div>

                            <div class="form-group">
                                <span class="label-txt"></span>
                                <div class="form-content" >
                                    <div class="place-group-btn text-center">
                                        <a class="btn text-blue ez-mr-sm">返回</a>
                                        <a class="btn active" @click="addStrategy">发表并退出</a>
                                    </div>
                                </div>
                            </div>

                        </form>
                    </div>

                </div>
                <div class="box-right pull-right">

                </div>

            </div>
            <!--part end-->

        </div>

        <ezFooter></ezFooter>
        <ezAside></ezAside>

    </div>
</template>
<script>
import ezHeader from "components/home/ezHeader"
import ezModule from "components/home/ezModule"
import ezFooter from "components/home/ezFooter"
import ezAside from "components/home/ezAside"
import {
    getCityInfo,
    imgUpload,
    getCityList,
    selectScenicList,
    getHotelByLanguage,
    addStrategy,
} from 'getData';
export default {
    name: "addStrategy",
    data() {
        return {
             cityId: this.$route.params.id,  //城市ID
             city: {}, //城市详情
             title: "", //标题
             imgUrl:"", //封面图
             strategySon: [], //行程内容
             content: "", //内容
             activeType: 1,  //点击的类型 1.城市，2.景点 3，酒店
             activeIndex: 0,  //选中的下标
             searchContent: "", //搜索内容
             cityList: [], //城市列表
             scenicList: [], //景点列表
             hotelList: [], //酒店列表
             activeList: [], //选中的列表数据
        }
    },
    components: {
        ezHeader,
        ezModule,
        ezFooter,
        ezAside,
    },
    created() {
        this.getCityInfo();
    },
    methods: {
        //发表攻略
        addStrategy(){
            if(this.isLogin()) return;
            if(this.isEmpty(this.title)){
                this.infoMsg("请输入标题")
                return;
            }
            if(this.isEmpty(this.imgUrl)){
                this.infoMsg("请上传图片")
                return;
            }
            if(this.isEmpty(this.content)){
                this.infoMsg("请输入内容")
                return;
            }
            let flag = false;
            for (const list of this.strategySon) {
                for (const [key, value] of Object.entries(list)) {
                    if (this.isEmpty (value)) {
                        console.log(key)
                        flag = true;
                        return;
                    }
                }
            }
            if(flag || this.isEmpty(this.strategySon)){
                this.infoMsg('请完善行程内容'); 
                return;
            }
            addStrategy({
                cityId: this.cityId,
                title: this.title,
                imgUrl: this.imgUrl,
                strategySon: JSON.stringify(this.strategySon),
                content: this.content,
            },"post").then( res => {
                this.successMsg("发表攻略成功",()=>{
                    this.$router.go(-1)
                })

            })
        },
        //保存选中的数据
        addStrategySon(){
            let actvieList = [];
            if(this.activeType == 1){
                for (const list1 of this.cityList) {
                    if(list1.flag){
                        actvieList.push(list1.cityName)
                    }
                }
                Vue.set(this.strategySon[this.activeIndex], "cityInfo", actvieList.join("、"))
            }else if(this.activeType == 2){
                for (const list1 of this.scenicList) {
                    if(list1.flag){
                        actvieList.push(list1.name)
                    }
                }
                Vue.set(this.strategySon[this.activeIndex], "secnicInfo", actvieList.join("、"))
            }else if(this.activeType == 3){
                for (const list1 of this.hotelList) {
                    if(list1.flag){
                        actvieList.push(list1.name)
                    }
                }
                Vue.set(this.strategySon[this.activeIndex], "hotelInfo", actvieList.join("、"))
            }
        },
        //处理数据
        dtatInit(){
            if(this.activeType == 1){
                for (const list1 of this.cityList) {
                    for (const list2 of this.activeList) {
                        if(list1.cityid == list2.cityid){
                            Vue.set(list1, "flag", true)
                        }
                    }
                }
            }else if(this.activeType == 2){
                for (const list1 of this.scenicList) {
                    for (const list2 of this.activeList) {
                        if(list1.id == list2.id){
                            Vue.set(list1, "flag", true)
                        }
                    }
                }
            }else if(this.activeType == 3){
                for (const list1 of this.hotelList) {
                    for (const list2 of this.activeList) {
                        if(list1.id == list2.id){
                            Vue.set(list1, "flag", true)
                        }
                    }
                }
            }
        },
        //改变flag
        flagChange(type,index){
            if(this.activeType == 1){
                Vue.set(this.cityList[index], "flag", type)
            }else if(this.activeType == 2){
               Vue.set(this.scenicList[index], "flag", type)
            }else if(this.activeType == 3){
               Vue.set(this.hotelList[index], "flag", type)
            }
        },
        //酒店搜索
        async hotelSearch(){
            await getHotelByLanguage({
               name: this.searchContent,
               pageSize: -1,
               pageNo: 1,
            }).then( res => {
                this.hotelList = res.list
            })
        },
        //景点搜索
        async scenicSearch(){
            await selectScenicList({
               name: this.searchContent, 
               pageNo: 1,
               pageSize: -1,
            }).then( res => {
                this.scenicList = res.list
            })
        },
        //城市搜索
        async citySearch(){
            await getCityList({
                cityName: this.searchContent,
            }).then( res => {
                this.cityList = res
            })
        },
        //点击搜索
        async clickSearch(){
            if(this.activeType == 1){
                this.activeList = this.strategySon[this.activeIndex].cityInfo || []
                await this.citySearch();
            }else if(this.activeType == 2){
                this.activeList = this.strategySon[this.activeIndex].secnicInfo || []
                await this.scenicSearch();
            }else if(this.activeType == 3){
                this.activeList = this.strategySon[this.activeIndex].hotelInfo || []
                await this.hotelSearch();
            }
            
            this.dtatInit()
        },
        //点击td
        tdClick(activeType, activeIndex){
            this.activeType = activeType
            this.activeIndex = activeIndex
            this.searchContent = ""
            this.clickSearch();
            $("#addCityModal").modal("show")
        },
        //删除一天
        removeDay(index){
            Vue.delete(this.strategySon, index)
        },
        //新增一天
        addDay(){
            let map = {};
            Vue.set(map, "playTime", "")
            Vue.set(map, "cityInfo", "")
            Vue.set(map, "secnicInfo", "")
            Vue.set(map, "hotelInfo", "")
            this.strategySon.push(map)
        },
        //上传图片
        async imgChange(id) {
            //更新图片数据
            this.imgUrl = await imgUpload()
        },
        //获取城市详情
        getCityInfo(){
            getCityInfo({
                cityid: this.cityId
            }).then(res => {
                this.city = res
            })
        },
    },
    filters:{
        activeTypeVc(obj){
            let str;
            switch (obj) {
                case 1: str="城市"; break;
                case 2: str="景点"; break;
                case 3: str="酒店"; break;
            }
            return str;
        }
    }
}
</script>
