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
                            <a class="pull-left text-underline" href="#">{{getSize(city.remarks)}}条评价</a>
                        </div>
                    </div>

                    <div class="col-md-12 col-sm-12 col-xs-12 text-center">
                        <a class="btn btn-post-warning">发表游记</a>
                    </div>
                </div>
            </div>
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
import { mapState } from "vuex"
import { getCityInfo } from 'getData'
// import { getSize } from 'XEUtils'
export default {
    name: "home",
    data() {
        return {
            city: {},
            currentBigPicUrl: "",
            show: false,
        }
    },
    computed: {
        ...mapState([ "comProtocol", ]),
    },
    beforeCreate(){

    },
    created () {
        this.getCityInfo( this.$route.params.id)
    },
    methods: {
        getCityInfo(cityId){
            getCityInfo({
                cityid: cityId
            }).then(res => {
                this.city=res
                this.currentBigPicUrl=this.city.photoUrl
            })
        },
        getSize(obj){
            return this.$utils.getSize(obj)
        },
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
    }
}
</script>