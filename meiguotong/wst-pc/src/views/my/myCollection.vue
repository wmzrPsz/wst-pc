<template>
    <div class="content-right no-border">
        <div class="panel-header ez-base-border">
            <div class="pull-left panel-header-title">我的收藏</div>
            <div class="pull-right">
                <div  class="panel-header-tool" style="display: none">
                    <a class="btn ez-btn" @click.stop="deleteDate">取消关注</a>
                    <a class="btn ez-btn" @click.stop="addDate">加入购物车</a>
                    <a class="btn ez-btn ez-btn-submit active" @click.stop="navTypeChange(0)">完成</a>
                </div>
                <div>
                    <a class="btn ez-btn ez-btn-batch" @click.stop="navTypeChange(1)">批量管理</a>
                </div>

            </div>
        </div>
        <div class="content-panel ez-nav-tabs">
            <ul class="list-inline ez-collection-nav">
                <li class="active"  @click.stop="liClick(1)"><a class="btn">常规路线</a></li>
                <li  @click.stop="liClick(2)"><a class="btn">当地参团</a></li>
                <li  @click.stop="liClick(3)"><a class="btn">当地玩家</a></li>
                <li  @click.stop="liClick(4)"><a class="btn">邮轮</a></li>
                <li  @click.stop="liClick(5)"><a class="btn">景点</a></li>
            </ul>

            <div class="collection-content">
                <!--常规路线-->
                <div class="tab-pane collection-tabpane active"  v-if="collectionType==1">
                    <div class="col-md-4 box-card ez-card-v" :class="{selected:list.flag}"
                     @click.stop="selectedChange(index)"  v-for="(list, index) in lists" :key="index" >
                        <div class="card-img">
                            <img :src="list.img | splitVc(0)" class="center-block img-responsive">
                            <div class="card-img-label">
                                <h4 class="text-white">{{list.cityName}}<i>出发</i></h4>
                            </div>
                        </div>
                        <div class="card-text">
                            <h4 class="title">{{list.name}}</h4>
                            <div class="ez-icon-tag ez-mr-sm"  v-for="(tag, index) in list.tagContent.split(',')" :key="index">
                                <div class="ez-triangle-left"><i></i></div>
                                <div class="ez-rect">{{tag}}</div>
                            </div>
                            <div class="text-gray card-like">
                                <div class="pull-right text-orange ez-price"><span>¥</span>{{list.price}}<span class="text-gray">/元起</span></div>
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
                <!--当地参团-->
                <div class="tab-pane collection-tabpane" v-if="collectionType==2">
                    <div class="col-md-4 box-card ez-card-v" :class="{selected:list.flag}" 
                    @click.stop="selectedChange(index)" v-for="(list, index) in lists" :key="index"  >
                        <div class="card-img">
                            <img :src="list.img?list.img:'~images/index-11-3.png' | splitVc(0)" class="center-block img-responsive">
                            <div class="card-img-label">
                                <h4 class="text-white">{{list.cityName}}<i>出发</i></h4>
                            </div>
                        </div>
                        <div class="card-text">
                            <h4 class="title">{{list.name}}</h4>
                            <div class="ez-icon-tag ez-mr-sm" v-for="(tag, index) in list.tagContent.split(',')" :key="index">
                                <div class="ez-triangle-left"><i></i></div>
                                <div class="ez-rect">{{tag}}</div>
                            </div>
                            <div class="text-gray card-like">
                                <div class="pull-right text-orange ez-price"><span>¥</span>{{list.price}}<span class="text-gray">/元起</span></div>
                            </div>
                        </div>
                        <div class="bg-backdrop">
                            <div class="bg-backdrop-wrap">
                                <div class="bg-selected bg-selected-y"></div>
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
                <!--当地玩家-->
               <div class="tab-pane collection-tabpane" v-if="collectionType==3">
                    <div class="col-md-4 box-card ez-hot-card" :class="{selected:list.flag}" 
                    @click.stop="selectedChange(index)" v-for="(list, index) in lists" :key="index" >
                        <div class="hot-card-img">
                            <img src="~images/hot-1.png">
                            <div class="hot-card-logo">
                                <img :src="list.img?list.img:'~images/avatar-1.png'">
                            </div>
                        </div>
                        <div class="hot-card-text">
                            <h4 class="text-center">明星玩家·{{list.name}}</h4>
                            <p class="hot-content text-gray">{{list.introduction}}</p>
                            <div>
                                <span class="text-gray"><i class="iconfont icon-mark"></i>{{list.countryName}}·{{list.cityName}}</span>
                                <div class="pull-right text-orange ez-price"><span>¥</span>{{list.price}}<span class="text-gray">/天</span></div>
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
                <!--邮轮-->
                <div class="tab-pane collection-tabpane">
                    <div class="col-md-4 box-card ez-card-v"  :class="{selected:list.flag}" 
                    @click.stop="selectedChange(index)" v-for="(list, index) in lists" :key="index"  v-if="collectionType==4">
                        <div class="card-img">
                            <img :src="list.img?list.img:'~images/cruise-2.png' | splitVc(0) " class="center-block img-responsive">
                        </div>
                        <div class="card-text">
                            <h4 class="title">{{list.name}}</h4>
                            <div class="text-gray card-like">
                                <div class="pull-right text-orange ez-price ez-mb-sm"><span>¥</span>{{list.price}}<span class="text-gray">/元起</span></div>
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
                <!--景点-->
                <div class="tab-pane collection-tabpane" >
                    <div class="col-md-4 box-card ez-card-v" :class="{selected:list.flag}" 
                    @click.stop="selectedChange(index)" v-for="(list, index) in lists" :key="index"  v-if="collectionType==5">
                        <div class="card-img">
                            <img :src="list.img?list.img:'~images/index-4-1.png' | splitVc(0)" class="center-block img-responsive">
                        </div>
                        <div class="card-text">
                            <h4 class="title">{{list.name}}</h4>
                            <div class="text-gray">{{list.commentNum}}个点评，满意度{{list.star |  perVc }}%</div>
                            <div class="text-gray card-like">
                                <div class="pull-left"><i class="iconfont icon-eye"></i>{{list.lookNum}}</div>
                                <div class="pull-right"><i class="iconfont icon-heart-s text-lightorange"></i>{{list.collectionNum}}</div>
                            </div>
                        </div>
                        <div class="bg-backdrop">
                            <div class="bg-backdrop-wrap">
                                <div class="bg-selected"></div>
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
    deleteCollection, 
    addCollectionToCar,
    myCollection,
     } from 'getData'
export default {
    name: "myCollection",
    data() {
        return {
            lists:[],  
            current_page: 1, //当前页
            pages: 3, //总页数
            collectionType:1, //1.常规路线2.当地参团3.当地玩家4.游轮5.景点
            navType:0, //0全部 1删除
            ids:"",  //选中的ID
            num:0,  //选中的数量
        }
    },
    methods: {
        liClick:function(index){
            if(index != this.collectionType){
                this.lists = [];
                this.collectionType = index;
                this.current_page = 1;
                this.getData();
            }
        },
        //点击完成、批量管理
        navTypeChange:function(index){
            this.navType = index;
            for (const iterator of Object.values(this.lists)) {
                iterator.flag = 0;
            }
        },
        //选择删除添加状态
        selectedChange:function(index){
            if(this.navType){
                this.lists[index].flag = this.lists[index].flag==1?0:1;
            }
        },
        //获取选中的ID
        getSelect:function(){
            this.ids = "";
            this.num = 0;
            this.lists.forEach(element => {
                if(element.flag){
                    if(this.ids != ""){
                        this.ids += `,${element.id}`;
                    }else{
                        this.ids = element.id;
                    }
                    this.num++;
                }
            });
            if(this.ids)  return false;  return true;
        },
        //取消收藏
        async deleteDate(){
            if(this.getSelect()){
                return;
            }
            let data = await deleteCollection({
                collectionids:this.ids,
            }) 
            if(data) {
                this.current_page = this.current_page > this.pages ? this.pages : this.current_page;
                if(this.lists.length == this.num && this.current_page != 1){
                    this.current_page = parseInt(this.pages) -1;
                }
                this.getData();
                this.successMsg("取消收藏成功");
            }
        },
        //加入购物车
        async addDate () {
            if(this.getSelect()){
                return;
            }
            if( await addCollectionToCar({
                collectionids:this.ids,
            })){
                this.successMsg("加入购物车成功");
            }
        },
        //获取我的收藏
        async getData() {
            let data = await myCollection({
                pageNo:this.current_page,
                collectionType:this.collectionType,
            })
            if(data) {
                let list = data.list;
                for (const iterator of Object.values(list)) {
                    Vue.set(iterator,"flag",0);
                }
                this.lists = list;
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
    mounted () {
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
