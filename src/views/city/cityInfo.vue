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
            <div class="box-card">
                <div class="box-card-left pull-left">
                    <img src="~images/index-4-1.png">
                    <div class="box-card-rate">
                        <div class="ez-star pull-left"></div>
                        <span class="pull-right text-gray text-underline">11条评价</span>
                    </div>
                </div>
                <div class="box-card-text pull-right">
                    <h4 class="title ez-mb-md">旧金山行程二选一 | 环境优美+自主半价旧金山行程二选一 | 环境优美+自主半价</h4>
                    <h5 class="subtitle text-blue ez-mb-md">时尚半自助出游新选择！将团队游的实惠、便捷与自由行的轻松惬意完美结合.</h5>
                    <p class="intro text-gray ez-mb-md">旧金山（San Francisco），又译“三藩市”、“圣弗朗西斯科”，
                        美国加利福尼亚州太平洋沿岸的港口城市，是世界著名旅游胜地、加州人口第四大城市。
                        旧金山临近世界著名高新技术产业区硅谷，是世界最重要的高新技术研发基地和美国西部最重要的金融中心
                    </p>
                    <div>
                        <div class="ez-icon-tag ez-mr-sm">
                            <div class="ez-triangle-left"><i></i></div>
                            <div class="ez-rect">限时特卖</div>
                        </div>
                        <div class="ez-icon-tag">
                            <div class="ez-triangle-left"><i></i></div>
                            <div class="ez-rect">优惠立减</div>
                        </div>
                    </div>
                    <div class="card-like">
                        <span class="pull-left text-lightorange ez-price"><span>¥</span>699<span class="text-gray">/元起</span></span>
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
        <nav aria-label="Page navigation" class="text-center">
            <ul class="pagination ez-navigation">
                <li>
                    <a href="#" class="page-next" aria-label="Previous">
                        <span aria-hidden="true">&laquo; Last</span>
                    </a>
                </li>
                <li><a href="#">1</a></li>
                <li><a href="#">2</a></li>
                <li><a href="#">3</a></li>
                <li><a href="#">4</a></li>
                <li><a href="#">5</a></li>
                <li><a href="#">6</a></li>
                <li><a href="#">...</a></li>
                <li>
                    <a href="#" class="page-next" aria-label="Next">
                        <span aria-hidden="true">Next &raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
    <!--part2 当地参团 end-->

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
import { mapState } from "vuex"
import { 
    getCityInfo,
    getTravelCustomizationList,
    getOfferedList,
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
        }
    },
    computed: {
        ...mapState([ "comProtocol", ]),
    },
    beforeCreate(){

    },
    created () {
        this.cityid = Number.parseInt(this.$route.params.id)
        this.getCityInfo()
        this.getTravelCustomizationList()
        this.getOfferedList()
    },
    methods: {
        //获取当地参团
        getOfferedList(){
            getOfferedList({
                id: this.cityid,
                pageNo: 1,
                pageSize: 5,
            }).then(res=>{
                console.log(res)
                // this.offeredList = res
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
                console.log(res)
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
    components: {
        ezHeader,
        ezContainer,
        ezModule,
        ezFooter,
        ezAside,
        ezVideo,
        carAfter,
    }
}
</script>