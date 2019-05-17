<template>
    <div class="content-right no-border">
        <div class="panel-header ez-base-border">
            <div class="pull-left panel-header-title">路线规划</div>
            <div class="pull-right">
                <router-link class="btn ez-btn" tag="a" :to="{name: 'myRouteInfo'}">添加</router-link>
            </div>
        </div>
        <div class="content-panel ez-nav-tabs">

            <div class="collection-content">
                <!--我的草稿-->
                <div class="tab-pane collection-tabpane active">
                    <div class="col-md-4 box-card ez-card-v selected" v-for="(list, index) in lists" :key="index">
                        <div class="card-img">
                            <img :src="list.photo" class="center-block img-responsive">
                        </div>
                        <div class="card-text">
                            <h4 class="title">【{{list.city}}】{{list.title}}</h4>
                            <div class="text-gray card-like">
                                <div class="pull-left">
                                    <p class="text-gray">成交数：{{list.transactionsNum}}笔</p>
                                    <div class="text-orange ez-price"><span>¥</span>{{list.price}}<span class="text-gray">/天起</span></div>
                                </div>
                                <div class="pull-right text-gray">
                                    <!-- <a class="btn ez-btn active ez-mt-10" :href="'./P1-9-2.html?id='+list.guideRouteid">编辑</a> -->
                                    <router-link :to="{name:'myRouteInfo',params: { id: list.guideRouteid }}" tag="a"  
                                    class="btn ez-btn active ez-mt-10">编辑</router-link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <nav class="text-center col-lg-12 col-md-12 col-sm-12" v-show="show">
                            <ul class="pagination ez-navigation">
                                <li @click.stop="pageChange(-1)">
                                    <a class="page-next" aria-label="Next" style="margin-right: 10px;">
                                        <span aria-hidden="true">上一页 &gt;</span>
                                    </a>
                                </li>
                                <li v-show="current_page>5" @click.stop="jumpPage(1)"><a href="#">1</a></li>
                                <li v-show="efont"><a>...</a></li>
                                <li v-for="num in indexs" :class="{active:current_page==num}" @click.stop="jumpPage(num)"><a>{{num}}</a></li>
                                <li v-show="ebehind"><a>...</a></li>
                                <li v-show="current_page<pages-4" @click.stop="jumpPage(pages)"><a>{{pages}}</a></li>
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
</template>
<script>
import {
    getGuideRoute,
     } from 'getData'
export default {
    name: "myRoute",
    data() {
        return {
            lists:[],
            current_page: 1, //当前页
            pages: 3, //总页数 
        }
    },
    created() {
         this.getData();
    },
    methods: {
        //获取导游路线规划
        async getData() {
            let data = await getGuideRoute({ pageNo: this.current_page,})
            if(data) {
                this.lists = data.list;
                this.pages = data.totalPage;
            }
        },
        //点击上一页 下一页
        pageChange: function (index) {
            index += this.current_page;
            if (index < 1 || index > this.pages) {
                return;
            }
            this.current_page = index;
            this.getData();
        },
        //选择页数
        jumpPage: function (id) {
            if(id == this.current_page){
                return;
            }
            this.current_page = id;
            this.getData();
        },
    },
    computed: {
        show: function () {
            return this.pages && this.pages != 1
        },
        pstart: function () {
            return this.current_page <= 1;
        },
        pend: function () {
            return this.current_page >= this.pages;
        },
        efont: function () {
            if (this.pages <= 7) return false;
            return this.current_page > 5
        },
        ebehind: function () {
            if (this.pages <= 7) return false;
            var nowAy = this.indexs;
            return nowAy[nowAy.length - 1] != this.pages;
        },
        indexs: function () {

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
