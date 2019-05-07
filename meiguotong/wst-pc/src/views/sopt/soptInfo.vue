<template>
    <div>
        
        <ez-header></ez-header>
        <ez-container></ez-container>

        <!--content-->
        <div class="container ez-container">
            <div class="ez-scenic-detail ez-mb-md">
                <div class="detail-wrap">
                    <div class="detail-left pull-left">
                        <div class="detail-img"><img :src="scenicSpot.imgUrl | splitVc(imgIndex)"></div>
                        <div class="detail-img-xs">
                            <div class="ez-scroll-content">
                                <div class="scroll-btns">
                                    <a href="javascript:;" class="scroll-right"><i class="iconfont icon-next" @click="imgRight"></i></a>
                                    <a href="javascript:;" class="scroll-left"><i class="iconfont icon-prev" @click="imgLeft"></i></a>
                                </div>
                                <div class="scroll-wrap">
                                    <div class="scroll-box">
                                        <ul>
                                            <li v-for="(list, index) in scenicSpot.imgUrl" :key="index" :class="index == imgIndex?'active':''"
                                                @click="imgIndexClick(index)" v-if="index > imgIndex-4">
                                                <a><img :src="list"> </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="detail-text pull-right">
                        <h4 class="title">{{scenicSpot.name}}</h4>
                        <h5 class="text-blue text-gray">【{{scenicSpot.countryName}}·{{scenicSpot.cityName}}】</h5>
                        <div class="detail-text-label text-gray">
                            <span v-for="(item, index) in scenicSpot.tagContent" :key="index">{{item}}</span>
                        </div>
                        <p class="text-gray">地址：{{scenicSpot.address}}</p>
                        <p class="text-gray">详情：{{scenicSpot.content}}</p>
                        <div class="detail-rate">
                            <div class="pull-left text-orange ez-price">{{currencySign}}{{scenicSpot.price}}<span class="text-gray">/元起</span></div>
                                <el-popover placement="bottom-start" title="价格说明"  width="270" trigger="hover">
                                    <div class="priceInfor" >{{scenicSpot.priceInfor}}</div>
                                    <a class="text-gray" slot="reference" >价格说明</a>
                                </el-popover>
                                <el-popover placement="bottom-start" title="退款说明"  width="270" trigger="hover">
                                    <div v-for="(list, index) in refundList" :key="index">
                                        订单确认后，提前{{list.refundDay}}天退单，返回{{list.refundNum}}%;
                                    </div>
                                    <a class="text-gray" slot="reference" >退款说明</a>
                                </el-popover>
                            <div class=" pull-right">
                                <div class="ez-star pull-left"></div>
                                <a class="pull-right text-gray" v-href="'proMenuList4'">{{scenicSpot.commentNum}}条评价</a>
                            </div>
                        </div>
                        <div class="detail-recommend">
                            <div class="detail-avatar">
                                <img src="~images/avatar-3.png" class="img-circle">
                                <span class="text-gray">产品经理推荐</span>
                            </div>
                            <ul class="text-gray">
                                <li><div v-html="scenicSpot.recommend"></div></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="detail-table">
                    <table class="table table-responsive text-center">
                        <thead>
                            <tr>
                                <th class="text-center text-bold">名称</th>
                                <th class="text-center text-bold">预定规则</th>
                                <th class="text-center text-bold">市场价</th>
                                <th class="text-center text-bold">门票价格</th>
                                <th class="text-center text-bold"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(list, index) in scenicSpotTicket" :key="index">
                                <td> {{list.name}}</td>
                                <td>{{list.rule}}天前</td>
                                <td class="text-gray text-del">{{currencySign}}{{list.marketPrice}}</td>
                                <td class="text-orange">{{currencySign}}{{list.price}}</td>
                                <td>
                                <el-popover placement="left"  width="524" trigger="click">
                                    <ezCalendar></ezCalendar>
                                    <a class="btn ez-btn-parmary ticket-order" slot="reference" @click="calendarDateInit(list)">预约</a>
                                </el-popover>
                                 <div class="calendar-box date-box ez-datetimer"></div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="ez-nav-tabs ez-custom-tabs">
                <!-- Nav tabs -->
                <ul class="tab-list list-inline">
                    <li v-for="(list, index) in proMenuList" :key="index" v-href="'proMenuList'+list.isadd">
                        <a v-if="list.idadd==4">{{list.title}}（{{scenicSpot.commentNum}}）</a>
                        <a v-else>{{list.title}}</a>
                    </li>
                </ul>
                <!-- Tab panes -->
                <div class="tab-content">
                <div>
                    <div class="tab-pane ez-scenic-pane"  v-for="(list, index) in proMenuList" :key="index" :id="'proMenuList'+list.isadd">
                        <div class="ez-scenic-intro">
                            <div class="intro-badges text-center">
                                <i class="iconfont icon-notice"></i>
                                <h5 class="text-bold">{{list.title}}</h5>
                            </div>
                              <div v-html="scenicSpot.reserveInfo"  v-if="list.isadd==2"></div>
                              <div v-html="scenicSpot.introduce"  v-else-if="list.isadd==3"></div>
                            <div class="scenic-intro-text" v-else-if="list.isadd==4">
                                <div class="user-comments" v-for="(list, index) in commentList" :key="index">
                                    <div class="comments-header">
                                        <div class="comments-avatar">
                                            <img :src="list.memberPhoto" class="img-circle">
                                        </div>
                                        <div class="pull-left">
                                            <span class="pull-left ez-mr-sm">{{list.memberName}}</span>
                                            <div class="ez-star pull-left ez-mr-sm">
                                                    <img :src="list.level>index?'~images/star-on.png':'~images/star-off.png'"
                                                    title="regular" v-for="(item, index) in 5" :key="index">
                                            </div>
                                            <span class="pull-left ez-mr-sm">{{list.level}}分</span>
                                        </div>
                                        <div class="pull-right text-gray">{{list.createDate}}</div>
                                    </div>
                                    <div class="comments-body">{{list.content}}</div>
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
                                        <li v-for="num in indexs" :key="num" :class="{active:current_page==num}" @click.stop="jumpPage(num)"><a>{{num}}</a></li>
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
                            <div  v-html="list.content" v-else></div>
                        </div>
                    </div>
                 </div>
                </div>
            </div>

        </div>

        <ez-footer></ez-footer>
        <ez-aside></ez-aside>

    </div>
</template>
<script>
import ezHeader from "components/home/ezHeader"
import ezContainer from "components/home/ezContainer"
import ezFooter from "components/home/ezFooter"
import ezAside from "components/home/ezAside"
import ezCalendar from "components/sopt/calendar"
import { mapState, mapMutations, mapGetters, mapActions } from "vuex"
import { 
    getScenicDetails,
    selectComment,
    refundInfor,
    getProMenu,
} from 'getData'
export default {
    name: "soptInfo",
    data() {
        return {
            // scenicid: "",  //景点ID
            // scenicSpot: {},  //景点详情
            imgIndex: 0,  //选中的img图片下标
            current_page: 1, //当前页
            pages: "", //总页数
            commentList:[], //评论列表
            refundMsg: "",  //退款说明文字
            scenicSpotTicket:[],  //景点门票
            scenicSpotTicketId:"",  //景点门票ID
            event:"",  //点击预约的dom对象
            proMenuList: "",  //产品菜单
            refundList: "",  //退款信息
        }
    },
    created() {
        this.scenicidSet(this.$route.params.id);
        this.getScenicDetails();
        this.selectComment();
        this.getRefundInfo();
        this.getProMenu();
    },
    components: {
        ezHeader,
        ezContainer,
        ezFooter,
        ezAside,
        ezCalendar
    },
    methods: {
        ...mapMutations("sopt",["scenicidSet", "scenicSpotSet"]),
        ...mapActions("sopt", ["calendarDateInit"]),
        //获取产品菜单
        async getProMenu() {
                let data = await getProMenu({
                    proType: 3,  //1.常规路线2.当地参团3.景点4.游轮
                    proid: this.scenicid,
                })
                this.proMenuList = data;
                console.log(data)
        },
        //获取退款说明
        async getRefundInfo() {
            let data = await refundInfor({
                productType: 7,
                productid: this.scenicid,
            })
            if(data){
                this.refundList = data;
                let refundMsg = "";
                for (const list of Object.values(data)) {
                    refundMsg += `订单确认后，提前${list.refundDay}天退单，返回${list.refundNum}%;`;
                }
                this.refundMsg = refundMsg;
            }
        },
        //获取评论列表
        async selectComment() {
           let data = await selectComment({
                pageNo: this.current_page,
                typeid: this.scenicid,
                proType: 7,  //1.包车租车2.短程接送3.接送机4常规路线5.当地参团6.游轮7.景点门票
                //8.当地玩家9.酒店10.保险11.旅游定制12导游 13.攻略评论 14.城市评论',
            })
            if(data){
                this.commentList = data.list;
                this.pages = data.totalPage;
            }
        },
        //点击图片
        imgIndexClick: function (index) {
            this.imgIndex = index;
        },
        //图片点击左边
        imgLeft: function () {
            if (this.imgIndex == 0) {
                return;
            }
            this.imgIndex--;
        },
        //图片点击右边
        imgRight: function () {
            if (this.imgIndex < this.scenicSpot.imgUrl.length - 1) {
                this.imgIndex++;
                return;
            }
        },
        //获取景点详情
        async getScenicDetails () {
            let data = await getScenicDetails({
                scenicid: this.scenicid,
            })
            if(data){
                let scenicSpot = "";
                scenicSpot = data.scenicSpot;
                this.scenicSpotTicket = data.list;
                scenicSpot.imgUrl = scenicSpot.imgUrl ? scenicSpot.imgUrl.split(",") : [];
                scenicSpot.tagContent = scenicSpot.tagContent ? scenicSpot.tagContent.split(",") : [];
                this.scenicSpotSet(scenicSpot)
            }
        },
        //点击上一页 下一页
        pageChange: function (index) {
            index += this.current_page;
            if (index < 1 || index > this.pages) {
                return;
            }
            this.current_page = index;
            this.selectComment();
        },
        //选择页数
        jumpPage: function (id) {
            if (id == this.current_page) {
                return;
            }
            this.current_page = id;
            this.selectComment();
        },
    },
    computed: {
        ...mapState([ "currencySign", "loginType"]),
        ...mapState("sopt", ["scenicid", "scenicSpot"]),
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
<style lang="less" scoped>
    .ez-scenic-pane > .ez-scenic-intro{
        min-height: 90px;
    }
    .el-popover{
        padding: 0px;
    }
</style>

