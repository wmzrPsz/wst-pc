<template>
  <div class="content-right">
        <div class="panel-header">
            <div class="pull-left panel-header-title">消息中心</div>
        </div>
        <div class="content-panel">
            <!-- part2 end -->
            <div class="ez-nav-tabs ez-msg-tabs"><!--ez-custom-tabs-->
                <!-- Nav tabs -->
                <ul class="tab-list list-inline">
                    <li :class="{active:navType==1}" @click.stop="navTypeChange(1)"><a>系统消息</a></li>
                    <li :class="{active:navType==2}" @click.stop="navTypeChange(2)"><a>评论消息</a></li>
                </ul>
                <!-- Tab panes -->
                <div class="tab-content">
                    <div class="tab-pane ez-msg-pane" :class="{active:navType==1}">
                        <div class="ez-msg-sys" v-for="(item, index) in pushList" :key="index">
                            <div class="msg-panel-title">{{item.title}}</div>
                            <div class="msg-panel-body">
                                <div class="content-text" v-html="item.content"></div>
                                <h5>{{item.createDate}}</h5>
                            </div>
                        </div>
                        <nav class="text-center  col-lg-12 col-md-12 col-sm-12" v-show="show">
                                <ul class="pagination ez-navigation">
                                     <li  @click.stop="pageChange(-1)" >
                                        <a class="page-next" aria-label="Next" style="margin-right: 10px;" >
                                            <span aria-hidden="true">上一页 &gt;</span>
                                        </a>
                                    </li>
                                    <li v-show="current_page>5"  @click.stop="jumpPage(1)"><a>1</a></li>
                                    <li v-show="efont" ><a>...</a></li>
                                    <li v-for="num in indexs"  :class="{active:current_page==num}"  @click.stop="jumpPage(num)"><a>{{num}}</a></li>
                                    <li v-show="ebehind"><a>...</a></li>
                                    <li v-show="current_page<pages-4"  @click.stop="jumpPage(pages)"><a>{{pages}}</a></li>
                                    <li @click.stop="pageChange(1)">
                                        <a class="page-next" aria-label="Next" style="margin-left: 10px;">
                                            <span aria-hidden="true">下一页 &gt;</span>
                                        </a>
                                    </li>
                                </ul>
                        </nav>

                    </div>
                    <div class="tab-pane ez-msg-pane" :class="{active:navType==2}">
                        <div class="ez-msg-user">

                            <!--消息1-->
                            <div class="user-comments pull-left" v-for="(item, index) in comList" :key="index">
                                <div class="comments-header">
                                    <div class="comments-avatar">
                                        <img :src="item.memberPhoto" class="img-circle">
                                    </div>
                                    <div class="pull-left">
                                        <span class="pull-left ez-mr-sm">{{item.memberName}}</span>
                                    </div>
                                </div>
                                <div class="comments-body">
                                    <div class="comments-text ez-mb-md" v-html="item.content"></div>

                                    <div class="msg-comments-reply pull-left">
                                        <div class="ez-mb-sm">回复我的评论</div>
                                        <div class="">{{item.fatherComment}}</div>
                                    </div>
                                    <div class="comments-info pull-left">
                                        <div class="pull-left">{{item.createDate}}</div>
                                    </div>
                                </div>
                            </div>

                            <nav class="text-center  col-lg-12 col-md-12 col-sm-12" v-show="show">
                                    <ul class="pagination ez-navigation">
                                         <li  @click.stop="pageChange(-1)" >
                                            <a class="page-next" aria-label="Next" style="margin-right: 10px;" >
                                                <span aria-hidden="true">上一页 &gt;</span>
                                            </a>
                                        </li>
                                        <li v-show="current_page>5"  @click.stop="jumpPage(1)"><a href="#">1</a></li>
                                        <li v-show="efont" ><a>...</a></li>
                                        <li v-for="num in indexs" :class="{active:current_page==num}"  @click.stop="jumpPage(num)"><a>{{num}}</a></li>
                                        <li v-show="ebehind"><a>...</a></li>
                                        <li v-show="current_page<pages-4"  @click.stop="jumpPage(pages)"><a>{{pages}}</a></li>
                                        <li @click.stop="pageChange(1)">
                                            <a class="page-next" aria-label="Next" style="margin-left: 10px;">
                                                <span aria-hidden="true">下一页 &gt;</span>
                                            </a>
                                        </li>
                                    </ul>
                            </nav>

                        </div>
                    </div>


                </div>
            </div>

        </div>
    </div>
</template>
<script>
import {
    getCompush,
    getComment,
     } from 'getData'
export default {
    name: "myNews",
    data() {
        return {
            pushList:[],  //系统消息
            comList:[],  //评论消息
            current_page: 1, //当前页
            pages: "", //总页数
            navType:1,  //1系统消息  2评论消息
            totalPage1:1,
            pageNo1:1,
            totalPage2:1,
            pageNo2:1,
        }
    },
    methods: {
        //分页获取数据
        getData:function(){
            if(this.navType == 1 ){
                this.getPushData();
            }else{
                this.getComData();
            }
        },
        //分页改变
        pageChange:function(index){
            index += this.current_page;
            if(index < 1){
                return;
            }
            if(index > (this.navType == 1? this.totalPage1 : this.totalPage2) ){
                return;
            }
            this.current_page = index;
            this.getData();
        },
        //选择页数
        jumpPage: function(id) {
            if(id == this.current_page){
                return;
            }
            this.current_page = id;
            this.getData();
        },
        //切换选项卡
        navTypeChange:function(navType){
            this.navType = navType;
            if(navType == 1){
                this.pageNo2 = this.current_page;
                this.pages = this.totalPage1;
                this.current_page = this.pageNo1;
            }else{
                this.pageNo1 = this.current_page;
                this.pages = this.totalPage2;
                this.current_page = this.pageNo2;
            }
        },
        //获取系统消息
        async getPushData() {
            let data = await getCompush({
                pageNo:this.current_page,
            })
            if(data) {
                this.pushList = data.list;
                this.totalPage1 = data.totalPage;
                this.pages = data.totalPage;
            }
        },
        //获取评论消息
        async getComData() {
            let data = await getComment({
                pageNo:this.current_page,
            })
            if(data) {
                this.comList = data.list;
                this.totalPage2 = data.totalPage;
            }
        },
    },
    mounted () {
        this.getPushData();
        this.getComData();
    },
    computed:{
            show:function(){
                return this.pages && this.pages !=1
            },
            pstart: function() {
            return this.current_page <= 1;
            },
            pend: function() {
            return this.current_page >= this.pages;
            },
            efont: function() {
            if (this.pages <= 7) return false;
            return this.current_page > 5
            },
            ebehind: function() {
            if (this.pages <= 7) return false;
            var nowAy = this.indexs;
            return nowAy[nowAy.length - 1] != this.pages;
            },
            indexs: function() {

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
}
</script>
