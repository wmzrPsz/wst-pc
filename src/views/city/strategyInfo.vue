<template>
    <div>
        
        <ezHeader></ezHeader>
        <ezContainer></ezContainer>

        <div class="container ez-container">
            <!--banner-->
            <div class="ez-banner-strategy">
                <div class="banner-strategy">
                    <img class="strategy-img"  v-lazy="strategyInfo.imgUrl">
                    <div class="strategy-user">
                        <img v-lazy="strategyInfo.photo" class="img-circle">
                        <!--<img src="~images/index-11-3.png" class="img-circle">-->
                    </div>
                </div>
                <h4 class="text-center strategy-username">{{strategyInfo.nickName}}</h4>
                <div class="text-center">
                    <span class="text-gray ">
                    <i class="iconfont icon-like text-babyblue ez-mr-sm "></i>
                        <input class="counter-num-like" type="text" v-model="strategyInfo.digNum" min="0" readonly>
                    </span>
                    <span class="strategy-date">{{strategyInfo.createDate}}</span>
                    <span class="text-gray"><i class="iconfont icon-dialog text-babyblue ez-mr-sm"></i>{{strategyInfo.commentNum}}</span>
                </div>
            </div>
            <!-- ./banner-->

            <div class="col-md-12 ez-index-wrap ez-wrap-strategy">

                <div class="box-left pull-left">
                    <div class="strategy-box">
                        <h4 class="strategy-title">{{strategyInfo.title}}</h4>

                        <table class="table ez-strategy-table text-center">
                            <tr>
                                <th class="text-center">日期</th>
                                <th class="text-center">城市</th>
                                <th class="text-center">景点</th>
                                <th class="text-center">酒店</th>
                            </tr>                       
                            <tr v-for="(list, index) in strategyInfo.cityStrategySonList" :key="index">
                                <td class="td-pd">{{list.playTime}}</td>
                                <td class="td-pd">{{list.cityInfo}}</td>
                                <td class="td-pd">{{list.secnicInfo}}</td>
                                <td class="td-pd">{{list.hotelInfo}}</td>
                            </tr>

                        </table>
                        <div class="strategy-content text-lightgray" v-html="strategyInfo.content"></div>
                        <div class="strategy-like text-center text-gray" @click="digComment">
                            <div class="icon-like"><i class="iconfont icon-like text-babyblue"></i></div>
                            <input class="counter-num-like text-lightgray" type="text" v-model="strategyInfo.digNum" min="0" readonly>
                        </div>

                        <div class="strategy-reply">
                                <el-input
                                type="textarea"
                                :autosize="{ minRows: 5}"
                                placeholder="请输入内容"
                                v-model.trim="content">
                                </el-input>
                            <div class="text-right">
                                <a class="btn btn-lg ez-btn-parmary" @click="addComment">发表回复</a>
                            </div>
                        </div>

                        <comment :typeid="id" :proType="13"></comment>

                    </div>

                </div>
                <div class="box-right pull-right">
                    <div class="ez-aside-card">
                        <div class="aside-card-title bg-style4">
                            <h4 class="title">推荐阅读</h4>
                        </div>
                        <ul class="read-list text-lightgray">
                            <li>【深度强迫症的攻略第5弹】去台北一定要体验的十五件事·感受特别的台北</li>
                            <li>【深度强迫症的攻略第5弹】去台北一定要体验的十五件事·感受特别的台北</li>
                            <li>【深度强迫症的攻略第5弹】去台北一定要体验的十五件事·感受特别的台北</li>
                            <li>【深度强迫症的攻略第5弹】去台北一定要体验的十五件事·感受特别的台北</li>
                            <li>【深度强迫症的攻略第5弹】去台北一定要体验的十五件事·感受特别的台北</li>
                        </ul>
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
import ezContainer from "components/home/ezContainer"
import ezModule from "components/home/ezModule"
import ezFooter from "components/home/ezFooter"
import ezAside from "components/home/ezAside"
import ezPage from "components/common/ezPage"
import comment from "components/common/comment"
import {
    findStrategy,
    digComment,
    addComment,
} from 'getData';
export default {
    name: "strategyInfo",
    data() {
        return {
            id: this.$route.params.id,  //攻略ID
            strategyInfo: {}, //攻略详情
            content: "", //评论内容
        }
    },
    components: {
        ezHeader,
        ezContainer,
        ezModule,
        ezFooter,
        ezAside,
        ezPage,
        comment,
    },
    created() {
        this.findStrategy();
    },
    methods: {
        //攻略评论
        addComment(){
            if(this.isLogin()) return;
            if(this.isEmpty(this.content)){
                this.infoMsg("请输入评论内容")
                return;
            }
            addComment({
                contentType: 16,
                typeId: this.id,
                content: this.content,
            }).then( res => {
                this.successMsg("评论成功")
                this.strategyInfo.commentNum++
                this.content = ""
            })
        },
        //点赞
        digComment(){
            if(this.isLogin()) return;
            digComment({
                typeId: this.id,
                digType: 2,
            }).then( res => {
                if(res){
                     this.successMsg("点赞成功")
                     this.strategyInfo.digNum++;
                }else{
                     this.successMsg("取消点赞成功")
                     this.strategyInfo.digNum--;
                }
            })
        },
        //获取攻略详情
        findStrategy(){
            findStrategy({
                id: this.id
            }).then( res => {
                this.strategyInfo = res
            })
        },
    },
}
</script>
