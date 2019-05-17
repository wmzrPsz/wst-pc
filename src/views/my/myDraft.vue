<template>
            <div class="content-right no-border">
                <div class="panel-header ez-base-border">
                    <div class="pull-left panel-header-title">我的草稿</div>
                    <div class="pull-right">
                        <div class="panel-header-tool" v-if="navType == 1">
                            <a class="btn ez-btn" @click.stop="defDeletet">删除</a>
                            <a class="btn ez-btn ez-btn-submit active"  @click.stop="navTypeChange(0)">完成</a>
                        </div>
                        <div v-if="navType == 0">
                            <a class="btn ez-btn ez-btn-batch" @click.stop="navTypeChange(1)">批量管理</a>
                        </div>

                    </div>
                </div>
                <div class="content-panel ez-nav-tabs">

                    <div class="collection-content">
                        <!--我的草稿-->
                        <div class="tab-pane collection-tabpane active">
                            <div class="col-md-4 box-card ez-card-v" :class="{selected:item.flag==1}" @click.stop="selectedChange(index)" v-for="(item, index) in draftList" :key="index">
                                <div class="card-img">
                                    <img :src="item.cityImg" class="center-block img-responsive">
                                </div>
                                <div class="card-text">
                                    <h4 class="title">{{item.title}}</h4>
                                    <div class="text-gray card-like">
                                        <div class="pull-left text-gray ez-mb-sm">{{item.city}}</div>
                                        <div class="pull-right text-gray ez-mb-sm">{{item.createDate}}</div>
                                    </div>
                                </div>
                                <div class="bg-backdrop">
                                    <div class="bg-backdrop-wrap">
                                        <div class="bg-selected"></div>
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
</template>
<script>
import { 
    myDraft, 
    deleteDraft, 
     } from 'getData'
export default {
    name: "myDraft",
    data() {
        return {
            draftList: [],  //草稿List
            current_page: 1, //当前页
            pages: 1, //总页数
            navType:0,  //0全部  1删除
        }
    },
    methods: {
        //点击完成、批量管理
        navTypeChange:function(index){
            this.navType = index;
            for (const iterator of Object.values(this.draftList)) {
                iterator.flag = 0;
            }
        },
        //选择删除添加状态
        selectedChange:function(index){
            if(this.navType){
                this.draftList[index].flag = this.draftList[index].flag==1?0:1;
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
        //获取我的草稿
        async getData() {
            let data = await myDraft({
                pageNo: this.current_page,
            })
            if(data) {
                this.draftList = data.list;
                this.pages = data.totalPage;
            }
        },
        //删除我的草稿
        async defDeletet() {
            let ids = "";
            let num = 0;
            this.draftList.forEach(element => {
                if(element.flag){
                    if(ids != ""){
                        ids += ("," + element.id );
                    }else{
                        ids = element.id;
                    }
                    num++;
                }
            });
            if(ids == ""){
                return;
            }
            let data = await deleteDraft({
                ids: ids,
            })
            if(data) {
                this.current_page = this.current_page > this.pages ? this.pages : this.current_page;
                if(this.draftList.length == num && this.current_page != 1){
                    this.current_page = parseInt(this.pages) -1;
                }
                this.getData();
                layerMsg("删除成功");
            }
        },
    },
    mounted() {
        this.getData();
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
