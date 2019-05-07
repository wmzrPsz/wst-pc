<template>
    <div>

        <ezHeader></ezHeader>
        <ezContainer></ezContainer>

        <div class="container-fluid bg-scenic bg-business-banner">
            <!--<div class="container ez-container">
        <h4 class="title text-white">【重庆之色】一次快门致岁月，一顿火锅敬自己</h4>
    </div>-->
        </div>

        <div class="container ez-container ez-search ez-scenic-search ez-conventional">
            <div class="conventional-address bg-s1">
                <i class="iconfont icon-dingwei floatl"></i>
                <i class="iconfont icon-down floatr"></i>
                <p>出发站</p>
                <h3 class="text-blue"><b>{{cityName}}</b></h3>
            </div>
            <form class="ez-search-form">
                <div class="input-group input-group-lg ez-search-box">
                    <input type="text" class="form-control ez-search-input" placeholder="请输入 邮轮、航线或目的地"
                        aria-describedby="basic-search" v-model.trim="searchContent" @input="cruiseSearch">
                    <a class="input-group-addon" id="basic-search" @click.stop="search(0)">
                        <i class="iconfont icon-search"></i>
                    </a>
                </div>
            </form>
            <div class="text-center text-gray hot-scenic">热门目的地：
                <a class="text-gray" v-for="(hotCity, index) in hotCityList" :key="index" @click.stop="search(1,hotCity.cityid)">{{hotCity.cityName}}</a>
            </div>


            <div class="search-result-content">
                <ul class="scenic-result">
                    <li v-for="(list, index) in cruiseSearchList" :key="index">
                        <h4 class="title" @click.stop="search(list.type,list.typeid)">{{list.name}}</h4>
                        <!-- <h5 class="text-gray">城市：上海</h5> -->
                    </li>
                </ul>


                <nav class="text-center" v-show="show">
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
        <!--出发港*****************************************************************************口的轮艇-->
        <div class="width  qingchu ma1 overflow">
            <div class=" fu bo_3 qingchu lunting_a">
                <div class=" bo_9  pa_c ma36">
                    <h3 class="pa_d">出发港口</h3>
                    <div class="lis lunting_b fu2 overflow ma100 pa_e">
                        <ul class="pa_e">
                            <li class="ma6" v-for="(list, index) in startCityList" :key="index" @click.stop="search(4,list.id)">{{list.name}}</li>
                            <li class="ma6">更多>></li>
                        </ul>
                    </div>

                </div>


                <div class=" bo_9 pa_c ma36">
                    <h3 class="pa_d">邮轮航线</h3>
                    <div class="lis lunting_b fu2 overflow ma100 pa_e">
                        <ul class="pa_e">
                            <li class="ma6" v-for="(list, index) in courseList" :key="index" @click.stop="search(2,list.id)">{{list.name}}</li>
                            <li class="ma6">更多>></li>
                        </ul>
                    </div>

                </div>


                <div class="  pa_c ma36 ">
                    <h3 class="pa_d">邮轮公司</h3>
                    <div class="lis lunting_b fu2 overflow ma100 pa_e">
                        <ul class="pa_e">
                            <li class="ma6" v-for="(list, index) in linerCompanyList" :key="index" @click.stop="search(3,list.id)">{{list.name}}</li>
                            <li class="ma6">更多>></li>
                        </ul>
                    </div>

                </div>
            </div>
            <div class="fu1 lunting_ba  lunting overflow">

                <p class="fff zi_a zi_f ma53 ma38">BANNER</p>

            </div>

        </div>
        <div class="container ez-container text-darkgray ma25">
            <!-- 推荐景点 start-->
            <section class="col-md-12 ez-index-wrap ez-index-public ez-index-5">
                <div class="ez-index-box col-lg-12">
                    <div class="title-box ez-title-style1">
                        <h4 class="title">推荐景点 <span class="sub-title">LOCATION</span></h4>
                    </div>
                    <ul class="list-inline ez-title-nav">
                        <li class="active">华盛顿</li>
                        <li>纽约</li>
                        <li>洛杉矶</li>
                        <li>费城</li>
                        <li>MORE >></li>
                    </ul>
                </div>
                <div class="box-left pull-left">
                    <div class="col-md-4 box-card ez-card-v">
                        <div class="card-img">
                            <img src="~images/index-4-1.png" class="center-block img-responsive">
                        </div>
                        <div class="card-text">
                            <h4 class="title">皇家量子号上海-熊本-上海4晚5日>02月08日寒假热卖</h4>
                            <div class="text-gray card-like">
                                <div class="pull-right text-orange ez-price">¥6666<span class="text-gray">/元起</span></div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 box-card ez-card-v">
                        <div class="card-img">
                            <img src="~images/index-1-3.png" class="center-block img-responsive">
                        </div>
                        <div class="card-text">
                            <h4 class="title">皇家量子号上海-熊本-上海4晚5日>02月08日寒假热卖</h4>
                            <div class="text-gray card-like">
                                <div class="pull-right text-orange ez-price">¥6666<span class="text-gray">/元起</span></div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 box-card ez-card-v">
                        <div class="card-img">
                            <img src="~images/index-1-1.png" class="center-block img-responsive">
                        </div>
                        <div class="card-text">
                            <h4 class="title">皇家量子号上海-熊本-上海4晚5日>02月08日寒假热卖</h4>
                            <div class="text-gray card-like">
                                <div class="pull-right text-orange ez-price">¥6666<span class="text-gray">/元起</span></div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 box-card ez-card-v">
                        <div class="card-img">
                            <img src="~images/index-1-3.png" class="center-block img-responsive">
                        </div>
                        <div class="card-text">
                            <h4 class="title">皇家量子号上海-熊本-上海4晚5日>02月08日寒假热卖</h4>
                            <div class="text-gray card-like">
                                <div class="pull-right text-orange ez-price">¥6666<span class="text-gray">/元起</span></div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 box-card ez-card-v">
                        <div class="card-img">
                            <img src="~images/index-6-1.png" class="center-block img-responsive">
                        </div>
                        <div class="card-text">
                            <h4 class="title">皇家量子号上海-熊本-上海4晚5日>02月08日寒假热卖</h4>
                            <div class="text-gray card-like">
                                <div class="pull-right text-orange ez-price">¥6666<span class="text-gray">/元起</span></div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 box-card ez-card-v">
                        <div class="card-img">
                            <img src="~images/index-1-2.png" class="center-block img-responsive">
                        </div>
                        <div class="card-text">
                            <h4 class="title">皇家量子号上海-熊本-上海4晚5日>02月08日寒假热卖</h4>
                            <div class="text-gray card-like">
                                <div class="pull-right text-orange ez-price">¥6666<span class="text-gray">/元起</span></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="box-right pull-right">
                    <div class="ez-aside-banner">
                        <img src="~images/bg-baner-2.png">
                        <ul class="list-inline text-center">
                            <div class="title text-left">热门常规旅行</div>
                            <div class="sub-title text-left">THE SITIES YOU CANT MISS</div>
                            <li><a href="#" class="btn btn-type-lg">迈阿密·西海岸 </a></li>
                            <li><a href="#" class="btn btn-type-lg">夏威夷·东海岸</a></li>
                            <li><a href="#" class="btn btn-type-lg">墨西哥·边境墙</a></li>
                        </ul>
                    </div>
                    <div class="ez-aside-banner">
                        <img src="~images/bg-baner-2.png">
                        <ul class="list-inline text-center">
                            <div class="title text-left">热门常规旅行</div>
                            <div class="sub-title text-left">THE SITIES YOU CANT MISS</div>
                            <li><a href="#" class="btn btn-type-lg">迈阿密·西海岸 </a></li>
                            <li><a href="#" class="btn btn-type-lg">夏威夷·东海岸</a></li>
                            <li><a href="#" class="btn btn-type-lg">墨西哥·边境墙</a></li>
                        </ul>
                    </div>
                </div>
            </section>

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
import { mapState } from 'vuex'
import {
    getStartCity,
    getCourse,
    getLinerCompany,
    cruiseSearch,
} from 'getData'
export default {
    name: "creiseIndex",
    data() {
        return {
            cityid: "",
            cityName: "广州",
            startCityList: [],  //出发港口
            courseList: [],  //邮轮航线
            linerCompanyList: [],  //邮轮公司
            cruiseSearchList: [], //邮轮搜索列表
            searchContent: "",  //搜索内容
            current_page: 1,  //当前页
            pages: 1,  //总页数
        }
    },
    created() {
        this.getStartCity();
        this.getCourse();
        this.getLinerCompany();
    },
    components: {
        ezHeader,
        ezContainer,
        ezFooter,
        ezAside,
        ezModule
    },
    methods: {
        //搜索 0.搜索内容  1邮轮 2航线  3目的地  4出发港口
        search: function (searchType, searchTypeid) {
            // localStorage.setItem("searchType", searchType);
            // if (searchType == 0 && this.searchContent) {
            //     localStorage.setItem("searchContent", this.searchContent);
            // } else {
            //     localStorage.setItem("searchTypeid",searchTypeid);
            // }
            // if (searchType != 3 && this.cityid) {
            //     localStorage.setItem("searchCityid", cityid);
            // }
            this.$router.push("/cruise/cruiseList")
        },
        //获取邮轮搜索列表
        async cruiseSearch() {
            if (this.isNull(this.searchContent)) {
                $(".ez-scenic-search .search-result-content").slideUp(200);
                return;
            }
            let data = await cruiseSearch({
                searchContent: this.searchContent,
                pageNo: this.current_page,
            })
            if(data){
                this.cruiseSearchList = data.list;
                this.pages = data.totalPage;
                if (this.cruiseSearchList.length)
                    $(".ez-scenic-search .search-result-content").slideDown(200);
            }
        },
        //获取出发港口
        async getStartCity(){
            let startCityList = await getStartCity({})
            if(startCityList){
                this.startCityList = startCityList;
            }
        },
        //获取邮轮航线
        async getCourse() {
            let data = getCourse({})
            if(data){
                this.courseList = data;
            }
        },
        //获取邮轮公司
        async getLinerCompany() {
            let data = await getLinerCompany()
            if(data){
                this.linerCompanyList = data;
            }
        },
    },
    computed: {
        ...mapState(["hotCityList"]),
        show: function () {
            return this.pages && this.pages != 1;
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
