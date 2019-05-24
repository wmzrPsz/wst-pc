<template>
    <div class="intro">
        <div class="user-comments pull-left" v-for="(lists, index) in commentList" :key="index">
            <div class="comments-header">
                <div class="comments-avatar">
                    <img v-lazy="lists.memberPhoto" :key="lists.memberPhoto" class="img-circle">
                </div>
                <div class="pull-left">
                    <span class="pull-left ez-mr-sm">{{lists.memberName}}</span>
                </div>
                <div class="pull-right">
                     <el-rate v-model="lists.level" disabled/>
                </div>
            </div>
            <div class="comments-body">
                <div class="comments-text" v-html="lists.content"></div>
                <div class="comments-info pull-left">
                    <div class="pull-left">{{lists.createDate}}</div>
                    <div class="pull-right">
                        <a class="ez-mr-50"><i class="iconfont icon-like" @click="digComment(index)"></i>{{lists.digNum}}</a>
                        <a ><i class="iconfont icon-dialog" @click="commentNumClick(index)"></i>{{lists.childNum}}</a>
                    </div>
                </div>

                <div class="comments-reply pull-left" v-if="lists.show">
                    <div class="form-control-reply">
                        <input type="text" class="form-control reply-input"  @keyup.13="addChildComment(index)"
                        v-model="lists.commentContent" :placeholder="`回复@${lists.memberName}：`">
                    </div>
                    <div class="comments-reply-wrap" v-for="(list, index) in lists.childComment" :key="index">
                        <div class="comments-header">
                            <div class="comments-avatar">
                                <img v-lazy="list.memberPhoto" :key="list.memberPhoto" class="img-circle">
                            </div>
                            <div class="pull-left">{{list.memberName}}</div>
                            <div class="pull-right">{{list.createDate}}</div>
                        </div>
                        <div class="comments-reply-body" v-html="list.content"></div>
                    </div>

                     <ezPage :pages="lists.childPages" :params="{index:lists.index}" @page-change="getChildComment" :ref="`comment${index}`"></ezPage> 

                </div>
            </div>
        </div>
        <ezPage :pages="firstPages" @page-change="selectComment"></ezPage>
    </div>
</template>
<script>
import ezPage from "components/common/ezPage"
import { mapState, mapMutations } from 'vuex';
import {
    selectComment,
    getChildComment,
    digComment,
    addChildComment,
} from 'getData';
export default {
    name: "comment",
    props:{
        proType:{
            type: Number,
            required: true,
        },
        typeid:{
            // type: Number,
            required: true,
        }
    },
    data() {
        return {
            commentList: [], //一级评论列表
            firstPages: 1,  //一级评论总页数
            childComment: [], //二级评论列表
            childPages: 1,  //二级评论总页数
        }
    },
    computed: {
        ...mapState(["loginType"]),
    },
    components:{
        ezPage,
    },
    created() {
        this.selectComment();
    },
    methods: {
        ...mapMutations(["loginFlagChange"]),
        //添加子评论
       async  addChildComment(index) {
            if(this.loginType == 1){
                this.loginFlagChange(1);
                return;
            }
           if(this.isEmpty (this.commentList[index].commentContent)){
               this.infoMsg("请输入评论内容");
               return;
           }
           let data = await addChildComment({
                commentid: this.commentList[index].commentid,
                content: this.commentList[index].commentContent,
            })
            if(data){
                this.successMsg("评论成功");
                Vue.set(this.commentList[index], "commentContent", "");
                Vue.set(this.commentList[index], "childNum", this.commentList[index].childNum+1);
                this.updateChildComment(index);
            }
        },
        //点赞-取消点赞
        digComment(index){
            if(this.loginType == 1){
                this.loginFlagChange(1);
                return;
            }
            digComment({
                typeId: this.commentList[index].commentid,
                digType: 1,
            }).then( res => {
                if(res){
                    Vue.set(this.commentList[index], "digNum", this.commentList[index].digNum+1);
                     this.successMsg("点赞成功");
                }else{
                    Vue.set(this.commentList[index], "digNum", this.commentList[index].digNum-1);
                    this.successMsg("取消点赞成功");
                }
            })
        },
        //获取二级评论
        getChildComment(pageNo = 1,param){
            let index = param.index;
            getChildComment({
                commentid: this.commentList[index].commentid,
                pageNo: pageNo,
            }).then( res => {
                 Vue.set(this.commentList[index], "childComment", res.list)
                 Vue.set(this.commentList[index], "childPages",  res.totalPage)
            })
        },
        //点击评论数量
        commentNumClick(index){
            Vue.set(this.commentList[index], "show", !this.commentList[index].show)
            Vue.set(this.commentList[index], "index", index)
            this.updateChildComment(index);
        },
        //重新获取子评论列表
        updateChildComment(index){
           if(this.commentList[index].show){
                this.$nextTick(()=>{
                    console.log(this.$refs)
                    console.log(this.$refs[`comment${index}`][0])
                    console.log(this.$refs[`comment${index}`][0].pageNo)
                    this.$refs[`comment${index}`][0].pageNo = 1;
                    this.$refs[`comment${index}`][0].getData();
                })
           }
        },
        //获取一级评论列表
        selectComment(pageNo = 1){
            selectComment({
                pageNo: pageNo,
                typeid: this.typeid,
                //1.包车租车2.短程接送3.接送机4常规路线5.当地参团6.游轮7.景点门票
                //8.当地玩家9.酒店10.保险11.旅游定制12导游 13.攻略评论 14.城市评论',
                proType: this.proType,  
            }).then( res => {
                this.commentList = res.list,
                this.firstPages = res.totalPage
            })
        },
    },
}
</script>
<style lang="less" scoped>
.intro{
    overflow:hidden;
}
</style>
