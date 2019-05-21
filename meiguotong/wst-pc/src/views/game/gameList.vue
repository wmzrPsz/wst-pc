<template>
    <div>
       
        <ezHeader></ezHeader>
        <ezContainer></ezContainer>

        <div class="banner banner-min">
            <div class="banner-img">
                <p></p>
            </div>
        </div>
        <div class="content ez-travel-local main_content">

            <!--part17 当地玩家 start-->
            <section class="col-md-12 ez-index-wrap ez-index-public ez-index-17">
                <div class="ez-index-box col-lg-12 search-info-sty">
                    <div class="search-info search-info-city">
                        <div class=""><span>城市 </span> <i class="iconfont icon-dingwei"></i> 中国-广州</div>
                        <div>
                    </div> 
                    </div>
                    <div class="search-info search-info-age">
                        <div class="search-info-left">年龄段</div>
                        <div class="search-info-right">
                            <ul>
                                <li><input type="radio" v-model="guideAge" value="">不限</li>
                                <li><input type="radio" v-model="guideAge" value="2000">00后</li>
                                <li><input type="radio" v-model="guideAge" value="1990">90后</li>
                                <li><input type="radio" v-model="guideAge" value="1980">80后</li>
                                <li><input type="radio" v-model="guideAge" value="1970">70后以上</li>
                            </ul>
                        </div>
                    </div>
                    <div class="search-info search-info-sex">
                        <div class="search-info-left">性别</div>
                        <div class="search-info-right">
                            <ul>
                                <li><input type="radio" v-model="guideSex" value="">不限</li>
                                <li><input type="radio" v-model="guideSex" value="1">男</li>
                                <li><input type="radio" v-model="guideSex" value="2">女</li>
                            </ul>
                        </div>
                    </div>
                    <div class="search-info search-info-price">
                        <div class="search-info-left">价格</div>
                        <div class="search-info-right">
                            <ul>
                                <li><input type="number" v-model.trim="minPrice"> -</li>
                                <li><input type="number" v-model.trim="maxPrice"></li>
                            </ul>
                        </div>
                    </div>
                    <div class="search-info search-info-goodat">
                        <div class="search-info-left">擅长</div>
                        <div class="search-info-right">
                            <ul>
                                <li><input type="radio" v-model="tagId" value="">不限</li>
                                <li v-for="(tag, index) in comTagList" :key="index">
                                    <input type="radio" v-model="tagId" :value="tag.tagid">{{tag.content}}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="">
                    <div class="col-md-4 ez-hot-card style-list-con" v-for="(list, index) in guidList" :key="index" 
                    @click.stop="goToInfo(list.id)">
                        <div class="hot-card-img">
                            <img :src="list.img | defImg">
                            <div class="hot-card-logo">
                                <img :src="list.photo | defPhoto">
                            </div>
                        </div>
                        <div class="hot-card-text">
                            <h4 class="text-center">{{list.realName}}</h4>
                            <p class="content">{{list.introduction}}</p>
                            <div>
                                <span class="text-gray"><i class="iconfont icon-mark"></i>{{list.countryName}}·{{list.cityName}}</span>
                                <div class="pull-right text-orange ez-price">{{currencySign}}{{list.price}}<span class="text-gray">天</span></div>
                            </div>
                        </div>
                    </div>
                </div>


                 <ez-page :pages="pages" @page-change="guideScreen" ref="ezPage"></ez-page>


            </section>
            <!--part17 当地玩家 end-->

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
import ezPage from "components/common/ezPage"
import {
    guideScreen,
    getGuideLabel,

} from 'getData';
import { mapState } from 'vuex';
export default {
    name: "gameIndex",
    data() {
        return {
            srarchContent: "",   //搜索内容
            cityid: "",     //城市ID
            cityName: "",    //城市名称
            guideAge: "",   //年龄
            guideSex: "",   //性别
            minPrice: "",  //最低价格
            maxPrice: "",  //最高价格
            tagId: "",  //擅长ID
            comTagList: "",  //玩家擅长属性
            guidList:[],  //导游列表
            current_page: 1, //当前页
            pages: 1, //总页数
        }
    },
    computed: {
        ...mapState(['currencySign']),
    },
    watch:{
        cityid:function(){
            this.contentChange();
        },
        cityName:function(){
            this.contentChange();
        },
        guideAge:function(){
            this.contentChange();
        },
        guideSex:function(){
            this.contentChange();
        },
        minPrice:function(){
            this.contentChange();
        },
        maxPrice:function(){
            this.contentChange();
        },
        tagId:function(){
            this.contentChange();
        },
    },
    components: {
        ezHeader,
        ezContainer,
        ezFooter,
        ezAside,
        ezModule,
        ezPage,
    },
    created() {
        this.srarchContent = this.$route.params.srarchContent
        this.guideScreen();
        this.getLAbleData();
    },
    methods: {
        //跳转导游详情
        goToInfo:function(guideId){
            this.$router.push(`gameInfo/${guideId}`)
        },
        //获取玩家擅长属性
        getLAbleData() {
            getGuideLabel().then(res => {
                 this.comTagList = res;
            })
        },
        //搜索条件变化
        contentChange:function(){
            this.$refs.ezPage.pageNo = 1
            this.guideScreen()
        },
        //导游搜索
        guideScreen: function (pageNo = 1) {
            guideScreen({
                pageNo: pageNo,
                cityid: this.cityid,
                cityName: this.cityName,
                guideAge: this.guideAge,
                guideSex: this.guideSex,
                minPrice: this.minPrice,
                maxPrice: this.maxPrice,
                tagId: this.tagId,
            }).then(res => {
                this.guidList = res.list
                this.pages = res.totalPage
            })
        },
    },
}
</script>
