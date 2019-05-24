<template>
    <div>
        
        <ezHeader></ezHeader>

<div class="container ez-container">

    <!--part start-->
    <div class="col-md-12 ez-index-wrap ez-city-comments">
        <div class="box-left pull-left">
            <div class="city-comments-wrap">
                <div class="city-comments-header">城市评价</div>
                <div class="city-comments-img">
                    <img :src="city.photoList | splitVc(0)" class="img-responsive">
                    <div class="comments-city">
                        <h4 class="title ez-mb-md">{{city.cityName}}</h4>
                        <h5>（{{city.countryName}}）</h5>
                    </div>
                </div>
                <form class="form-horizontal city-comments-from">
                    <div class="form-group">
                        <span class="label-txt">评价星级：</span>
                        <div class="form-content" >
                              <el-rate v-model="level"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <span class="label-txt">游玩的景点：</span>
                        <div class="form-content" >
                            <el-input
                            placeholder="输入游玩过的景点，注意用逗号分隔开"
                            v-model="scenicSpot"
                            clearable>
                            </el-input>
                        </div>
                    </div>
                    <div class="form-group">
                        <span class="label-txt">评价：</span>
                        <div class="form-content" >
                            <el-input
                            type="textarea"
                            :autosize="{ minRows: 4}"
                            placeholder="输入你的点评，让大家做一个参考"
                            v-model="content">
                            </el-input>
                        </div>
                    </div>

                    <div class="form-group">
                        <span class="label-txt"></span>
                        <div class="form-content" >
                            <div class="place-group-btn">
                                <a class="btn text-blue ez-mr-sm" @click="goback">返回</a>
                                <a class="btn active" @click="addComment">完成并退出</a>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

        </div>
        <div class="box-right pull-right">
            <div class="ez-aside-card">
                <div class="aside-card-title bg-style1">
                    <h4 class="title">最新点评</h4>
                </div>
                <div class="aside-card">
                    <div class="aside-card-user">
                        <img src="~images/avatar-3.png">
                        <div class="pull-left">Donald John Trump</div>
                        <div class="pull-right">2018-01-16</div>
                    </div>
                    <div class="aside-card-msg text-gray">
                        导游人很好，午餐很好吃，行程安排的很好，景点基本都去了，没有强制购物消费...
                    </div>
                </div>
                <div class="aside-card">
                    <div class="aside-card-user">
                        <img src="~images/avatar-2.png">
                        <div class="pull-left">Jamy</div>
                        <div class="pull-right">2018-01-16</div>
                    </div>
                    <div class="aside-card-msg text-gray">
                        导游人很好，午餐很好吃，行程安排的很好，景点基本都去了，没有强制购物消费...
                    </div>
                </div>
                <div class="aside-card">
                    <div class="aside-card-user">
                        <img src="~images/avatar-3.png">
                        <div class="pull-left">Tom</div>
                        <div class="pull-right">2018-01-16</div>
                    </div>
                    <div class="aside-card-msg text-gray">
                        导游人很好，午餐很好吃，行程安排的很好，景点基本都去了，没有强制购物消费...
                    </div>
                </div>
                <div class="aside-card">
                    <div class="aside-card-user">
                        <img src="~images/avatar-1.png">
                        <div class="pull-left">Donald John</div>
                        <div class="pull-right">2018-01-16</div>
                    </div>
                    <div class="aside-card-msg text-gray">
                        导游人很好，午餐很好吃，行程安排的很好，景点基本都去了，没有强制购物消费...
                    </div>
                </div>
            </div>
            <div class="news-banner">
                <img src="~images/news-banner.png">
            </div>

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
    addComment,
    getCityInfo,
} from 'getData';
export default {
    name: "addCityComment",
    data() {
        return {
            cityid: this.$route.params.id,  //城市ID
            city: {}, //城市详情
            level: 5,
            content: "", //评论内容
            scenicSpot: "", //评论景点
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
        //返回上一级
        goback(){
            this.$router.back();
        },
        //评论城市
        addComment(){
            if(this.isLogin()) return;
            if(this.isEmpty(this.scenicSpot)){
                this.infoMsg("请输入评论景点")
                return;
            }
            if(this.isEmpty(this.content)){
                this.infoMsg("请输入评论内容")
                return;
            }
            addComment({
                contentType: 17,
                typeId: this.cityid,
                level: this.level,
                content: this.content,
                scenicSpot: this.scenicSpot,
            }).then( res => {
                this.successMsg("评论成功",()=>{
                    this.$router.back();
                })
            })
        },
        //获取城市详情
        getCityInfo(){
            getCityInfo({
                cityid: this.cityid
            }).then(res => {
                this.city = res
            })
        },
    },
}
</script>
