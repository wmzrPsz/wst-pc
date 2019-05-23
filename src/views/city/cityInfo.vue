<template>
    <div>
        <ezHeader></ezHeader>
        <ezContainer></ezContainer>

        <!-- 查看大图弹出框（Modal） -->
        <div class="modal fade img-lager-modal" id="imgLagerModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <!--<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>-->
                        <button type="button" class="modal-close" data-dismiss="modal" aria-hidden="true"><i class="iconfont icon-close"></i></button>
                        <h4 class="modal-title" >查看大图</h4>
                    </div>
                    <div class="modal-body ez-modal-img">
                        <div class="modal-img pull-left">
                            <div class="modal-img-lg"><img :src="currentBigPicUrl"></div>
                            <div class="modal-img-xs">
                                <div class="ez-scroll-content">
                                    <div class="scroll-btns">
                                        <a href="javascript:;" class="scroll-right"><i class="iconfont icon-next"></i></a>
                                        <a href="javascript:;" class="scroll-left"><i class="iconfont icon-prev"></i></a>
                                    </div>
                                    <div class="scroll-wrap">
                                        <div class="scroll-box">
                                            <ul>
                                                <li  v-for="(list,index) in city.photoList" :key="index" :class="{'active':list.flag}" @click="checkBigPic(list)">
                                                    <a>
                                                        <img :src="list" >
                                                    </a>
                                                </li>

                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-text pull-right">
                            <h4 class="title">{{city.name}} <span>{{city.cityRemark}}</span></h4>
                            <div class="content-text text-gray">
                              {{city.cityDetails}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 查看大图弹出框 /.modal -->

        <div class="container ez-container">

            <div class="ez-place-city">
                <div class="place-city-img pull-left">
                    <a data-toggle="modal" data-target="#imgLagerModal">
                        <img :src="city.photoUrl" class="img-responsive">
                        <div class="images-label text-center">{{$utils.getSize(city.photoList)}}张图片</div>
                    </a>
                </div>
                <div class="place-city-text pull-right">
                    <h4 class="title text-bold">{{city.cityName}}
                        <small class="ez-ml-10">{{city.cityRemark}}</small>
                        <small class="pull-right"><i class="iconfont icon-wind"></i>风&nbsp;&nbsp;26°C~28°C</small>
                    </h4>
                    <div class="text-content text-gray">
                        {{city.cityDetails}}
                    </div>

                    <div class="btn-full-text">
                        <a class="btn ez-place-open">查看全文 <i class="iconfont icon-down"></i></a>
                        <a class="btn ez-place-close" style="display: none">收起全文 <i class="iconfont icon-up"></i></a>
                    </div>

                    <div class="col-md-12 col-sm-12 col-xs-12 ez-mb-md">
                        <div class="pull-left place-video-play" id="viewCityDetailVedio" >
                            <a class="text-blue" @click="videoClick"><i class="iconfont icon-bofang ez-mr-sm"></i>观看视频</a>
                        </div>
                        <div class="pull-right place-city-star">
                            <div class="ez-star pull-left ez-mr-sm"></div>
                            <a class="pull-left text-underline" href="#">{{$utils.getSize(city.remarks)}}条评价</a>
                        </div>
                    </div>

                    <div class="col-md-12 col-sm-12 col-xs-12 text-center">
                        <a class="btn btn-post-warning">发表游记</a>
                    </div>
                </div>
            </div>

            <!-- 游玩类型 -->
            <div class="ez-nav-tabs ez-custom-tabs">
                <!-- Nav tabs -->
                <ul class="tab-list list-inline">
                    <li class="active" @click="carTypeClick(1)"><a>包车租车</a></li>
                    <li @click="carTypeClick(2)"><a>短途接送</a></li>
                    <li @click="carTypeClick(3)"><a>接机送</a></li>
                </ul>
                <carAfter :noTop="true" :cityid="cityid" :carType ="carType"></carAfter>
                
            </div>

            <!--part1 旅游定制 start-->
            <section class="col-md-12 ez-index-wrap place-wrap-travel">
                <div class="text-center">
                    <div class="ez-place-title">旅游定制</div>
                    <div class="ez-content-subtitle">
                        <div class="subtitle-text">FOLLOWING MORE DISPLAY</div>
                    </div>
                </div>
                <div class="ez-nav-tabs ez-nav-place">
                    <!-- Nav tabs -->
                    <ul class="tab-list list-inline">
                        <li :class="{'active':index==0}"  v-for="(list, index) in travelCustomizationList" :key="index"><a>{{list.classname}}</a></li>
                    </ul>

                    <!-- Tab panes -->
                    <div class="tab-content">

                        <div class="tab-pane" :class="{'active':index==0}"  v-for="(travelCustomizationList, index) in travelCustomizationList" :key="index">
                            <div id="myCarousel1" class="carousel slide place-map-slide">
                                <!-- 轮播（Carousel） -->
                                <div class="carousel-inner">
                                    <div class="item place-map-item" :class="{'active':index==0}"  v-for="(travel, index) in travelCustomizationList.travel" :key="index">
                                        <div class="place-map pull-left" id="ez-place-map1"></div>
                                        <div class="place-map-list pull-right">
                                            <h4 class="title ez-mb-md">{{travel.name}}
                                                <span class="pull-right"><i class="iconfont icon-mark text-darkorange"></i>{{city.cityName}}，{{travel.scenicNum}}个景点</span>
                                            </h4>
                                            <ul>
                                                   <li v-for="(travelDetails, index) in travel.travelDetailsList" :key="index"> D{{index+1}}，{{scenicSpotSplit(travelDetails.scenicSpotList)}}</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <!-- 轮播（Carousel）导航 -->
                                <a class="carousel-left" href="#myCarousel1" role="button" data-slide="prev">
                                    <span class="iconfont icon-prev" aria-hidden="true"></span>
                                    <span class="sr-only">Previous</span>
                                </a>
                                <a class="carousel-right " href="#myCarousel1" role="button" data-slide="next">
                                    <span class="iconfont icon-next" aria-hidden="true"></span>
                                    <span class="sr-only">Next</span>
                                </a>
                            </div>
                        </div>

                    </div>

                </div>

            </section>
            <!--part1 旅游定制 end-->

    <!--part2 当地参团 start-->
    <div class="col-md-12 ez-index-wrap ez-search-result">
        <div class="text-center">
            <div class="ez-place-title">当地参团</div>
            <div class="ez-content-subtitle">
                <div class="subtitle-text">FOLLOWING MORE DISPLAY</div>
            </div>
        </div>
        <div class="box-left pull-left">
            <div class="box-card" v-for="(list, index) in offeredList" :key="index">
                <div class="box-card-left pull-left">
                    <img :src="list.imgLIst | splitVc(0)">
                    <div class="box-card-rate">
                        <div class="ez-star pull-left"></div>
                        <span class="pull-right text-gray text-underline">{{list.commentNum}}条评价</span>
                    </div>
                </div>
                <div class="box-card-text pull-right">
                    <h4 class="title ez-mb-md" v-html="list.title"></h4>
                    <h5 class="subtitle text-blue ez-mb-md" v-html="list.subtitle"></h5>
                    <p class="intro text-gray ez-mb-md" v-html="list.infor"></p>
                    <div>
                        <div class="ez-icon-tag ez-mr-sm" v-for="(tag, index) in list.attrList" :key="index">
                            <div class="ez-triangle-left"><i></i></div>
                            <div class="ez-rect">{{tag}}</div>
                        </div>
                    </div>
                    <div class="card-like">
                        <span class="pull-left text-lightorange ez-price"><span>{{currencySign}}</span>{{list.price}}<span class="text-gray">/元起</span></span>
                        <span class="pull-right text-lightorange text-underline">出发日期</span>
                    </div>

                </div>
            </div>

        </div>
        <div class="box-right pull-right">
            <div class="ez-aside-banner ez-mb-md">
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
        <ezPage :pages="offeredPags" @page-change="getOfferedList"></ezPage>
    </div>
    <!--part2 当地参团 end-->

    <!--part3 目的地景点 start-->
    <section class="col-md-12 ez-index-wrap place-wrap-travel">
        <div class="text-center">
            <div class="ez-place-title">目的地景点</div>
            <div class="ez-content-subtitle">
                <div class="subtitle-text">FOLLOWING MORE DISPLAY</div>
            </div>
        </div>
        <div class="ez-row">
            <div class="col-md-3 col-sm-3 col-xs-3 ez-index-grid" v-for="(list, index) in scenicSpotList" :key="index">
                <div class="grid-img">
                    <img :src="list.imgList | splitVc(0)" class="center-block img-responsive">
                </div>
                <div class="text-center grid-text">
                    <h4 class="title">{{list.name}}</h4>
                    <p class="ez-price">{{currencySign}}{{list.price}}<span>/元起</span></p>
                </div>
            </div>
        </div>

    </section>
    <!--part3 目的地景点 end-->


    <!--part4 当地玩家 start-->
    <section class="col-md-12 ez-index-wrap place-wrap-player">
        <div class="text-center">
            <div class="ez-place-title">当地玩家</div>
            <div class="ez-content-subtitle">
                <div class="subtitle-text">FOLLOWING MORE DISPLAY</div>
            </div>
        </div>
        <div class="ez-nav-tabs ez-nav-item4">
            <!-- Tab panes -->
            <div class="tab-content">
                <!-- 内容1-->
                <div class="tab-pane ez-row active">
                    <div class="col-md-3 col-sm-3 col-xs-3 ez-hot-card" v-for="(list, index) in playList" :key="index">
                        <div class="hot-card-img">
                            <img v-lazy="list.img" :key="list.img">
                            <div class="hot-card-logo">
                                <img  v-lazy="list.photo" :key="list.photo">
                            </div>
                        </div>
                        <div class="hot-card-player">
                            <h4 class="text-center">明星玩家·{{list.nickName}}</h4>
                            <div class="content" v-html="list.introduction"></div>
                            <div class="card-like">
                             <!--   <span class="pull-left text-gray"><i class="iconfont icon-mark"></i>美国·纽约</span>-->
                                <span class="pull-right text-lightorange ez-price"><span>{{currencySign}}</span>{{list.price}}<span class="text-gray">/天</span></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    </section>
    <!--part4 当地玩家 end-->

    <!--part5 start-->
    <section class="col-md-12 ez-index-wrap ez-city-commun">
        <div class="text-center">
            <div class="ez-place-title">城市交流</div>
            <div class="ez-content-subtitle">
                <div class="subtitle-text">FOLLOWING MORE DISPLAY</div>
            </div>
        </div>

        <div class="box-left pull-left">
            <div class="ez-nav-tabs ez-nav-item pull-left">
                <!-- Nav tabs -->
                <ul class="tab-item-list list-inline">
                    <li class="text-center"><a>评价城市</a></li>
                    <li class="text-center active"><a>游戏攻略</a></li>
                </ul>
                <!-- Tab panes -->
                <div class="tab-content tab-content-place pull-left">
                    <!-- 评价城市-->
                    <div class="tab-pane">
                        <comment :typeid="cityid" :proType="14"></comment>
                    </div>

                    <!-- 游戏攻略-->
                    <div class="tab-pane active">

                        <div class="box-card box-card-game" v-for="(list, index) in strategyList" :key="index">
                            <div class="box-card-left pull-left">
                                <img v-lazy="list.imgUrl" :key="list.imgUrl">
                            </div>
                            <div class="box-card-text pull-right">
                                <h4 class="title text-bold">{{list.title}}</h4>
                                <div class="content">{{list.content}}</div>
                                <div class="box-card-user">
                                    <div class="user-avatar">
                                        <img v-lazy="list.photo" :key="list.photo" class="img-circle">
                                    </div>
                                    <div class="user-name">{{list.nickName}}</div>
                                    <div>
                                        <span class="pull-left text-gray">{{list.createDate}}</span>
                                        <span class="pull-right card-user-like">
                                            <a><i class="iconfont icon-like text-babyblue" @click="digComment(index)"></i>{{list.digNum}}</a>
                                            <a><i class="iconfont icon-dialog text-babyblue"></i>{{list.commentNum}}</a>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                           <ezPage :pages="strategyTotalPage" @page-change="findStrategyList"></ezPage>

                    </div>


                </div>

            </div>
        </div>
        <div class="box-right pull-right">
            <div class="place-group-btn text-center">
                <a class="btn btn-lg pull-left">评价城市</a>
                <a class="btn btn-lg pull-right active">发表游记</a>
            </div>
            <div class="ez-aside-card">
                <div class="aside-card-title bg-style4">
                    <h4 class="title">新人指引</h4>
                </div>
                <ul class="lawer-guide text-lightgray">
                    <li><i class="li-disc"></i>法律法规底线：有法可依、有法必依、执法必严、违法必究，任何时候，无论是网上网下，都将始终做到违法必究；</li>
                    <li><i class="li-disc"></i>社会主义制度底线：为我们全面建成小康社会提供了有力地制度保障，我们要积极拥护社会主义及社会主义制度；</li>
                    <li><i class="li-disc"></i>国家利益底线：作为国家公民，时刻维护我们伟大祖国的利益，这也是宪法赋予我们每位公民的光荣义务；</li>
                    <li><i class="li-disc"></i>公民合法权益底线：我们在网络反腐的同时，切记不能以“艳照”等不健康、不正当甚至违法手段对别人进行人身攻击，
                        否则不仅触犯法律，也侵犯了无辜者的合法权益。
                    </li>
                </ul>
            </div>
        </div>


    </section>
    <!--part5 end-->


        </div>

        <ezVideo :url="city.videoUrl" ref="ezVideo" ></ezVideo>
        <!-- Large modal -->



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
import ezVideo from "components/common/ezVideo"
import carAfter from "components/car/carAfter"
import ezPage from "components/common/ezPage"
import comment from "components/common/comment"
import { mapState } from "vuex"
import { 
    getCityInfo,
    getTravelCustomizationList,
    getOfferedList,
    getScenicSpotList,
    getPlayList,
    findStrategyList,
    digComment,
    } from 'getData'
// import { getSize } from 'XEUtils'
export default {
    name: "home",
    data() {
        return {
            carType: 1,
            cityid: "", //城市ID
            city: {},  //城市详情
            currentBigPicUrl: "",  //选中的图片
            travelCustomizationList: [],  //旅游定制列表
            offeredList: [], //当地参团列表
            offeredPags: 1,  //当地参团列表总页数
            scenicSpotList: [], //景点列表
            playList: [], //当地玩家列表
            strategyList: [], //攻略列表
            strategyTotalPage: 1, //攻略总页数
        }
    },
    computed: {
        ...mapState([ "currencySign", ]),
    },
    components: {
        ezHeader,
        ezContainer,
        ezModule,
        ezFooter,
        ezAside,
        ezVideo,
        carAfter,
        ezPage,
        comment,
    },
    beforeCreate(){

    },
    created () {
        this.cityid = Number.parseInt(this.$route.params.id)
        this.getCityInfo()
        this.getTravelCustomizationList()
        this.getOfferedList()
        this.getScenicSpotList()
        this.getPlayList()
        this.findStrategyList();
    },
    methods: {
        //攻略点赞-攻略取消点赞
        digComment(index){
            if(this.loginType == 1){
                this.loginFlagChange(1);
                return;
            }
            digComment({
                typeId: this.strategyList[index].id,
                digType: 2,
            }).then( res => {
                if(res){
                    Vue.set(this.strategyList[index], "digNum", this.strategyList[index].digNum+1);
                     this.successMsg("点赞成功");
                }else{
                    Vue.set(this.strategyList[index], "digNum", this.strategyList[index].digNum-1);
                    this.successMsg("取消点赞成功");
                }
            })
        },
        //攻略列表
        findStrategyList(pageNo = 1){
            findStrategyList({
                cityid: this.cityid,
                pageNo: pageNo,
            }).then( res => {
                this.strategyList = res.list
                this.strategyTotalPage = res.totalPage
            })
        },  
        //当地玩家
        getPlayList(pageNo = 1){
            getPlayList({
                id: this.cityid,
                pageNo: pageNo,
                pageSize: 5,
            }).then(res => {
                this.playList = res;
            })
        },
        //景点列表
        getScenicSpotList(pageNo = 1){
            getScenicSpotList({
                id: this.cityid,
            }).then(res => {
                this.scenicSpotList = res
            })
        },
        //获取当地参团
        getOfferedList(pageNo = 1){
            getOfferedList({
                id: this.cityid,
                pageNo: pageNo,
                pageSize: 5,
            }).then(res=>{
                this.offeredList = res.list
                this.offeredPags = res.toTalPage
            })
        },
        //处理景点
        scenicSpotSplit(lists){
            let content = "";
            for (const [key,value] of Object.entries(lists)) {
                content += value.name;
                if(key != lists.length - 1){
                    content += " > ";
                }
            }
            return content;
        },
        //获取旅游定制
        getTravelCustomizationList(){
            getTravelCustomizationList({
                id: this.cityid
            }).then(res=>{
                this.travelCustomizationList = res
            })
        },
        //点击租车类型
        carTypeClick(index){
            this.carType = index;
        },
        //获取城市详情
        getCityInfo(){
            getCityInfo({
                cityid: this.cityid
            }).then(res => {
                this.city=res
                this.currentBigPicUrl=this.city.photoUrl
            })
        },
        //选中的图片
        checkBigPic(url){
            this.currentBigPicUrl=url
        },
        //点击视频
        videoClick(){
            console.log( this.$refs)
            console.log( this.$children)
            this.$refs.ezVideo.showVideo();
        }

    },
}
</script>