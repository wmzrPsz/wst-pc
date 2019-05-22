<template>
    <div>
       
        <ezHeader></ezHeader>
        <ezContainer></ezContainer>

        <div class="banner banner-min">
            <div class="banner-img">
                <p></p>
            </div>
        </div>
        <div class="content ez-travel-info main_content">

            <div class="travel-info">
                <div class="travel-info-local">
                    <div class="local-img floatl" style="position: relative;">
                        <img :src="guide.img | defImg">
                        <div class="collection_div">
                            <img class="collection_img" :src="guide.ifcollection==1?'~images/collection1.png':'~images/collection2.png'">
                        </div>
                    </div>
                    <div class="local-info floatl">
                        <div class="local-title ">
                            <div class="floatl"><img :src="guide.photo | defPhoto"> <span>{{guide.realName}}</span></div>
                            <div class="floatr">
                                <i class="iconfont icon-star" v-for="num in 5" v-if="guide.star>=num" :key="num"></i>
                                <u>{{guide.commentNum}}条评价</u>
                            </div>
                        </div>
                        <div class="local-introduce">
                            <div class="local-introduce-title floatl">个人介绍</div>
                            <div class="local-introduce-con floatl">
                                <p>{{guide.introduction}}</p>
                                <p><span>性别：</span><label>{{guide.sex | sexVc}}</label></p>
                                <p><span>年龄：</span><label>{{guide.age}}</label></p>
                                <p><span>所在地区：</span><label>{{guide.countryName}}·{{guide.cityName}}</label></p>
                                <p class="text-goodat">
                                    <span>擅长：</span>
                                    <label v-for="tag in (guide.tagContent || '').split(',')">{{tag}}</label>
                                </p>
                            </div>
                        </div>
                        <div class="local-time">
                            <div class="local-time-title time-number-title floatl">出发时间</div>
                            <div class="calendar-box date-box time-info" style="display: none;"></div>
                            <div class="local-time-con time-number-con floatl">
                                <!-- <input type="text" class="demo-input" readonly @click="getGuideDateDetails" placeholder="选择日期" id="test6"> -->

                                <el-popover placement="left"  width="524" trigger="click">
                                    <gameCalendar></gameCalendar>
                                    <a @click="calendarDateInit({guideId:guideId,clickType:1})"  slot="reference">选择日期</a>
                                </el-popover>

                            </div>
                        </div>
                        <!-- <div class="local-number">
                            <div class="local-number-title time-number-title floatl">出游人数</div>
                            <div class="local-number-con time-number-con floatl">
                                <div class="floatl">
                                    <span class="floatl">成人</span>
                                    <div class="floatl"><span onclick="numdec(0)">-</span><input type="text" value="1"
                                            maxlength="3"><span onclick="numadd(0)">+</span></div>
                                </div>
                                <div class="floatl">
                                    <span class="floatl">儿童</span>
                                    <div class="floatl"><span onclick="numdec(3)">-</span><input type="text" value="1"
                                            maxlength="3"><span onclick="numadd(3)">+</span></div>
                                </div>
                            </div>
                        </div> -->
                        <div class="local-price">
                            <div class="time-number-title floatl"></div>
                            <div class="local-price-con time-number-con floatl">
                                <!-- <div class="text-orange ez-price floatl"><span class="text-gray">总价</span>
                                    {{currencySign}}{{orderPrice}}
                                </div> -->
                                <span class="floatl" @click.stop="refundTips" id="refundTips"><u></u>退款说明</u></span>
                                <!-- <div class="shopping-cart floatl"><a>加入购物车</a></div> -->
                            </div>
                        </div>

                    </div>
                </div>

                <div class="travel-recommended-line">
                    <div class="travel-recommended-line-title">推荐路线</div>
                    <div class="travel-recommended-line-con" style="position: relative;">
                        <div class="trip-scroll-btns">
                            <a href="javascript:;" class="scroll-right" style="top:100px;right:-15px;"><i class="iconfont icon-next"></i></a>
                            <a href="javascript:;" class="scroll-left" style="top:100px;left:-20px;"><i class="iconfont icon-prev"></i></a>
                        </div>
                        <div class="box-card ez-card-h" style="width:560px;margin-left:15px;" v-for="(list, index) in recommendList"
                            :key="index">
                            <div class="card-img">
                                <img :src="list.photo | defImg" class="center-block img-responsive" style="width: 280px;height: 210px;">
                            </div>
                            <div class="card-text">
                                <h4 class="title">{{list.title}}</h4>
                                <div class="text-gray">{{list.content}}</div>
                                <span>成交笔：{{list.transactionsNum}}笔</span>
                                <div class="footer-bottom">
                                    <div class="text-orange ez-price pull-left"><span class="text-gray">
                                        </span> {{currencySign}}{{list.price}}<span class="text-gray">/元起</span></div>
                                    <!-- <a class="pull-right btn-reservation">预定路线</a> -->
                                <el-popover placement="left"  width="524" trigger="click">
                                    <gameCalendar></gameCalendar>
                                    <a class="pull-right btn-reservation"  slot="reference" @click="calendarDateInit({guideRoute:list,clickType:2})" >预定路线</a>
                                </el-popover>
                                </div>

                                <div class="calendar-box date-box ez-datetimer" style="display: none;"></div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div class="travel-info-con col-md-12 ez-index-wrap ez-index-public ez-index-5">
                <div class="travel-info-con-title">
                    <ul>
                        <li class="travel-info-con-title-style"><span>服务详情</span></li>
                        <li><span>用户点评（{{guide.commentNum}}）</span></li>
                    </ul>
                </div>
                <div class="travel-info-con-left pull-left">
                    <div class="travel-trip-info" style="border-bottom: 1px dashed #ccc;overflow: hidden;margin-bottom: 30px;">
                        <div class="travel-service floatl"><img src="~images/user.png" alt=""></div>
                        <div class="travel-user floatl" v-html="guide.deltails"></div>
                    </div>
                    <!-- 评价 -->
                    <div class="travel-list" id="comment">
                        <div class="travel-service floatl"><img src="~images/user.png" alt=""></div>
                        <div class="travel-list-con" v-for="(comment, index) in commentList" :key="index" style="float: right;">
                            <div class="floatl"><img :src="comment.memberPhoto?comment.memberPhoto:'~images/news.png'"
                                    alt="用户头像"></div>
                            <div class="content floatl">
                                <div>{{comment.memberName}}
                                    <i class="iconfont icon-star" v-for="(item, index) in 5" v-if="comment.level > index"></i>
                                    {{comment.level}}分<span class="floatr">{{comment.createDate}}</span></div>
                                <p>{{comment.content}}</p>
                            </div>
                        </div>

                        <div id="travel-content-main-list-paging1" class="pagination" style="float:right"></div>
                    </div>

                </div>
                <div class="box-right pull-right">
                    <div class="ez-aside-card">
                        <div class="aside-card-title bg-style3">
                            <h4 class="title">热门景点</h4>
                            <!--<span class="link-more">MORE>></span>-->
                        </div>
                        <div class="aside-card">
                            <div class="aside-card-img">
                                <img src="~images/news.png" class="img-responsive center-block">
                            </div>
                            <div class="aside-card-text">
                                <h5>阿拉斯加，旧金山，夏威夷，波士顿，51区，关岛...</h5>
                                <div class="pull-right">
                                    <i class="iconfont icon-eye"></i>&nbsp;2016
                                    <i class="iconfont icon-heart-s text-orange ez-ml-10 btn-like"></i>&nbsp;695
                                </div>
                            </div>
                        </div>
                        <div class="aside-card">
                            <div class="aside-card-img">
                                <img src="~images/news.png" class="img-responsive center-block">
                            </div>
                            <div class="aside-card-text">
                                <h5>阿拉斯加，旧金山，夏威夷，波士顿，51区，关岛...</h5>
                                <div class="pull-right">
                                    <i class="iconfont icon-eye"></i>&nbsp;9016
                                    <i class="iconfont icon-heart ez-ml-10 btn-like"></i>&nbsp;695
                                </div>
                            </div>
                        </div>
                        <div class="aside-card">
                            <div class="aside-card-img">
                                <img src="~images/news.png" class="img-responsive center-block">
                            </div>
                            <div class="aside-card-text">
                                <h5>迈阿密，旧金山，夏威夷，波士顿，51区，关岛...</h5>
                                <div class="pull-right">
                                    <i class="iconfont icon-eye"></i>&nbsp;9016
                                    <i class="iconfont icon-heart ez-ml-10 btn-like"></i>&nbsp;695
                                </div>
                            </div>
                        </div>
                        <div class="aside-card">
                            <div class="aside-card-img">
                                <img src="~images/news.png" class="img-responsive center-block">
                            </div>
                            <div class="aside-card-text">
                                <h5>墨西哥边境墙，旧金山，夏威夷，波士顿，51区，关岛...</h5>
                                <div class="pull-right">
                                    <i class="iconfont icon-eye"></i>&nbsp;9016
                                    <i class="iconfont icon-heart ez-ml-10 btn-like"></i>&nbsp;695
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="ez-aside-card">
                        <div class="aside-card-title bg-style1">
                            <h4 class="title">浏览过的景点</h4>
                            <!--<span class="link-more">MORE>></span>-->
                        </div>
                        <div class="aside-card">
                            <div class="aside-card-img">
                                <img src="~images/news.png" class="img-responsive center-block">
                            </div>
                            <div class="aside-card-text">
                                <h5>阿拉斯加，旧金山，夏威夷，波士顿，51区，关岛...</h5>
                                <div class="text-orange text-right">$8848</div>
                            </div>
                        </div>
                        <div class="aside-card">
                            <div class="aside-card-img">
                                <img src="~images/news.png" class="img-responsive center-block">
                            </div>
                            <div class="aside-card-text">
                                <h5>阿拉斯加，旧金山，夏威夷，波士顿，51区，关岛...</h5>
                                <div class="text-orange text-right">$998</div>
                            </div>
                        </div>
                        <div class="aside-card">
                            <div class="aside-card-img">
                                <img src="~images/news.png" class="img-responsive center-block">
                            </div>
                            <div class="aside-card-text">
                                <h5>迈阿密，旧金山，夏威夷，波士顿，51区，关岛...</h5>
                                <div class="text-orange text-right">$999</div>
                            </div>
                        </div>
                        <div class="aside-card">
                            <div class="aside-card-img">
                                <img src="~images/news.png" class="img-responsive center-block">
                            </div>
                            <div class="aside-card-text">
                                <h5>墨西哥边境墙，旧金山，夏威夷，波士顿，51区，关岛...</h5>
                                <div class="text-orange text-right">$1200</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
import gameCalendar from "components/game/gameCalendar"
import {
    saveCar,
    getGuideDateDetails,
    selectComment,
    guideRoute,
    refundInfor,
    guideDetails,
    getGuideRouteDateDetails,
} from 'getData';
import { mapState, mapMutations, mapActions } from 'vuex';
export default {
    name: "gameInfo",
    data() {
        return {
            guideId: localStorage.getItem("guideId"),
            guide: {},  //导游详情
            refundMsg: "",  //退款说明文字
            recommendList: [],  //推荐路线
            commentList: [],   //评论数据
            totalPage1: 1,  //评论总页数
            clickType: "",  //1导游  2导游路线 （点击日历）
            guideRouteid: "",  //导游路线ID
            nthis:"",  //导游路线点击dom
        }
    },
    computed: {
        ...mapState(["currencySign"]),
    },
    components: {
        ezHeader,
        ezContainer,
        ezFooter,
        ezAside,
        ezModule,
        gameCalendar,
    },
    created() {
        this.guideId = this.$route.params.id
        this.getInfo();
        this.getRefundInfo();
        this.guideRoute();
        this.selectComment(1, 1)
    },
    methods: {
        ...mapActions("game",['calendarDateInit']),
        ...mapMutations("game",['STATE_CHANGE']),
        guideRouteClick:function(id){
            this.guideRouteid = id;
        },
        //插件关闭
        calendarEmpty: function () {
            $('.calendar-box').empty();
            $('.calendar-box').hide();
        },
        //导游下单页面
        addOrder: function () {
            let data = $('.calendar-box').calendarGetActive();
            if (!data) return;
            if (!data.date) {
                layerMsg("请选择日期");
                return false;
            }
            if (parseInt(data.adultNum) <= 0 && parseInt(data.childNum) <= 0) {
                layerMsg("请选择出游人数");
                return false;
            }
            if (!data.totalPrice || parseInt(data.totalPrice) <= 0) {
                layerMsg("价格错误");
                return false;
            }
            let beginDateFlag = data.date.split("-");
            let month = parseInt(beginDateFlag[1]);
            let day = parseInt(beginDateFlag[2]);
            let beginDate = beginDateFlag[0] + "-" + (month > 9 ? month : "0" + month) + "-" + (day > 9 ? day : "0" + day);
            console.log(data);
            localStorage.removeItem("guideId");
            localStorage.removeItem("beginDate");
            localStorage.removeItem("endDate");
            localStorage.removeItem("adultNum");
            localStorage.removeItem("childNum");
            localStorage.removeItem("totalPrice");
            if (this.clickType == 2) {
                localStorage.removeItem("guideRouteid");
                localStorage.setItem("guideRouteid", this.guideRouteid);
            }
            localStorage.setItem("guideId", this.guideId);
            localStorage.setItem("beginDate", beginDate);
            localStorage.setItem("endDate", "2018-11-20");
            localStorage.setItem("adultNum", data.adultNum);
            localStorage.setItem("childNum", data.childNum);
            localStorage.setItem("totalPrice", data.totalPrice);
            location.href = "./H1-2.html";
        },
        //导游加入购物车
        addCar: function () {
            let data = $('.calendar-box').calendarGetActive();
            if (!data) return;
            if (!data.date) {
                layerMsg("请选择日期");
                return false;
            }
            if (parseInt(data.adultNum) <= 0 && parseInt(data.childNum) <= 0) {
                layerMsg("请选择出游人数");
                return false;
            }
            if (!data.totalPrice || parseInt(data.totalPrice) <= 0) {
                layerMsg("价格错误");
                return false;
            }
            let beginDateFlag = data.date.split("-");
            let month = parseInt(beginDateFlag[1]);
            let day = parseInt(beginDateFlag[2]);
            let beginDate = beginDateFlag[0] + "-" + (month > 9 ? month : "0" + month) + "-" + (day > 9 ? day : "0" + day);
            console.log(data);
            if (this.clickType == 1) {
                saveCar({
                    typeid: this.guideId,
                    carType: 3,  //1.常规路线2.当地参团3.当地玩家4.游轮5.景点
                    beginDate: beginDate,
                    adultNum: data.adultNum,
                    childNum: data.childNum,
                    price: data.price,
                }).then(res => {
                    layerMsg("添加购物车成功");
                    this.calendarEmpty();
                })
            }else{
                layerMsg("接口未写");
            }
        },
        //初始化一级评论分页
        pageCreate1: function () {
            let this_ = this;
            $('#travel-content-main-list-paging1').jqPaginator({
                totalPages: this.totalPage1,
                visiblePages: 6,
                currentPage: 1,
                onPageChange: function (num, type) {
                    if(type == "change"){
                        this_.selectComment(2, num);
                    }
                }
            });
        },
        //获取评论列表
        selectComment: function (type, pageNo) {

            selectComment({
                pageNo: pageNo,
                typeid: this.guideId,
                proType: 8,
            }).then( res => {
                this.commentList = res.list;
                this.totalPage1 = res.totalPage;
                if (type == 1) {
                    this.pageCreate1();
                }
            })
        },
        //获取推荐路线
        guideRoute: function () {
            guideRoute({
                guideId: this.guideId,
                pageNo: -1,
            }).then( res => {
                let recommendList = res.list;
                for (const list of Object.values(recommendList)) {
                    let content = `${list.sceniceName.split(",").length}个景点，`;
                    let flag = false;
                    for (const scenic of Object.values(list.sceniceName.split(","))) {
                        content += `${scenic}→`;
                        flag = true;
                    }
                    list["content"] = flag ? content.substr(0, content.length - 1) : content;
                }
                this.recommendList = recommendList;
            })
        },
        //退款提示
        refundTips: function () {
            layer.tips(this.refundMsg, '#refundTips', {
                tips: [1, '#3595CC'],
                maxWidth: 280,
                time: 4000
            });
        },
        //获取退款说明
        getRefundInfo: function () {
            refundInfor({
                productType: 11,  //1.包车租车2.短程接送3.接送机4常规路线5.当地参团6.游轮7.景点门票9.酒店
                //10.保险11.当地玩家12.旅游定制-导游13.旅游定制-司兼导14包车/租车-导游//15包车/租车-司兼导
                productid: this.guideId,
            }).then( res => {
                let refundMsg = "";
                for (const iterator of Object.values(res)) {
                    refundMsg += `订单确认后，提前${iterator.refundDay}天退单，返回${iterator.refundNum}%;<br/>`;
                }
                this.refundMsg = refundMsg;
            })
        },
        //获取导游详情
        getInfo: function () {
            guideDetails({
                guideId: this.guideId,
            }).then( res => {
                this.guide = res;
                this.STATE_CHANGE({
                    guide: res
                })
            });
        },
    },
}
</script>
