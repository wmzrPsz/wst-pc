<<template>
    <div>
        <ezHeader></ezHeader>
        <ezContainer></ezContainer>
        <div class="container-fluid ez-search-wrap">
            <div class="container ez-container ez-search">
                <form class="ez-search-form">
                    <h4 class="text-white">开启你的旅程</h4>
                    <div class="input-group input-group-lg ez-search-box">
                        <input type="text" class="form-control ez-search-input" placeholder="搜索旅行地/酒店/旅游/景点门票/交通"
                            aria-describedby="basic-search">
                        <a class="input-group-addon" id="basic-search" href="./pages/index/搜索-旅行.html"><i class="iconfont icon-search"></i></a>
                    </div>
                </form>
            </div>
            <div class="container ez-container">
                 <ezModule html-name="首页" html-seal="内容模块"></ezModule>
                <!--part23 目的地列表 start-->
                <!-- <section class="col-md-12 ez-index-wrap ez-index-citylist">
                    <h4 class="title">目的地列表</h4>
                    <div class="row citylist-content">
                        <div class="col-md-3">
                            <ul class="country-list">
                                <li class="active">美国</li>
                                <li>中国</li>
                                <li>加拿大</li>
                            </ul>
                        </div>
                        <div class="col-md-9 city-box active">
                            <ul class="city-list">
                                <li><i>A</i><a>奥兰多</a><a>奥克兰</a><a>安大略</a></li>
                                <li><i>B</i><a>波兹曼</a><a>缅因州·波特兰</a><a>波士顿</a><a>俄勒冈州·波特兰</a><a>巴尔的摩</a></li>
                                <li><i>C</i><a>达拉斯</a><a>丹佛</a></li>
                                <li><i>D</i><a>尔湾</a><a>奥克兰</a><a>安大略</a></li>
                                <li><i>E</i><a>奥兰多</a><a>奥克兰</a><a>安大略</a></li>
                                <li><i>F</i><a>费城</a></li>
                            </ul>
                            <ul class="city-list">
                                <li><i>H</i><a>奥兰多</a><a>奥克兰</a><a>安大略</a></li>
                                <li><i>I</i><a>奥兰多</a><a>奥克兰</a><a>安大略</a></li>
                                <li><i>G</i><a>奥兰多</a><a>奥克兰</a><a>安大略</a></li>
                                <li><i>K</i><a>奥兰多</a><a>奥克兰</a><a>安大略</a></li>
                                <li><i>L</i><a>奥兰多</a><a>奥克兰</a><a>安大略</a></li>
                            </ul>
                        </div>
                        <div class="col-md-9 city-box">
                            <ul class="city-list">
                                <li><i>A</i><a>澳门</a><a>奥克兰</a><a>安大略</a></li>
                                <li><i>B</i><a>北京</a><a>缅因州·波特兰</a></li>
                                <li><i>C</i><a>达拉斯</a><a>丹佛</a></li>
                                <li><i>D</i><a>大连</a><a>奥克兰</a><a>安大略</a></li>
                                <li><i>E</i><a>奥兰多</a><a>奥克兰</a><a>安大略</a></li>
                                <li><i>F</i><a>费城</a></li>
                            </ul>
                            <ul class="city-list">
                                <li><i>H</i><a>海南</a><a>杭州</a><a>湖南</a></li>
                                <li><i>I</i><a>奥兰多</a><a>奥克兰</a><a>安大略</a></li>
                                <li><i>G</i><a>广东</a><a>广西</a><a>甘肃</a></li>
                                <li><i>K</i><a>奥兰多</a><a>奥克兰</a><a>安大略</a></li>
                                <li><i>L</i><a>兰州</a><a>奥克兰</a><a>安大略</a></li>
                            </ul>
                        </div>
                        <div class="col-md-9 city-box">
                            <ul class="city-list">
                                <li><i>M</i><a>蒙特利尔</a></li>
                                <li><i>T</i><a>多伦多</a></li>
                                <li><i>V</i><a>温哥华</a></li>
                                <li><i>W</i><a>渥太华</a></li>
                            </ul>
                        </div>
                    </div>
                </section> -->
                <!--part23 目的地列表 end-->

                <!--part25 更多活动 start-->
                <!-- <section class="col-md-12 ez-index-wrap ez-index-service">
                    <div class="text-center">
                        <div class="service-box">
                            <a>
                                <i class="iconfont icon-sun-half"></i>
                                <h4 class="">阳光资讯</h4>
                            </a>
                        </div>
                        <div class="service-box">
                            <a>
                                <i class="iconfont icon-app"></i>
                                <h4 class="">加盟</h4>
                            </a>
                        </div>
                        <div class="service-box">
                            <a>
                                <i class="iconfont icon-org"></i>
                                <h4 class="">分销</h4>
                            </a>
                        </div>
                        <div class="service-box">
                            <a>
                                <i class="iconfont icon-help"></i>
                                <h4 class="">帮助</h4>
                            </a>
                        </div>
                        <div class="service-box">
                            <a>
                                <i class="iconfont icon-feedback"></i>
                                <h4 class="">体验反馈</h4>
                            </a>
                        </div>
                    </div>
                </section> -->
                <!--part25 更多活动 end-->
            </div>
        </div>
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
import { mapState } from "vuex"
export default {
    name: "home",
    data() {
        return {
         
        }
    },
    computed: {
        ...mapState([ "comProtocol", ]),
    },
    created () {
        console.log("----------------------------------------------------------------")
    },
    components: {
        ezHeader,
        ezContainer,
        ezModule,
        ezFooter,
        ezAside
    }
}
</script>