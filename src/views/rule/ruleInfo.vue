<template>
    <div>
        <ezHeader></ezHeader>
        <ezContainer></ezContainer>

    <div class="banner banner-min">
        <div class="banner-img">
            <p></p>
        </div>
    </div>
    <div class="content ez-travel-info ez-travel-tuxedo">
        <div class="travel-info">
            <div class="travel-info-local">
                <div class="local-info-left floatl">
                    <img :src="route.carImg | splitVc(imgIndex)"  alt="常规路线详情图片">
                    <div>
                        <div class="travel-plan-content">
                            <i class="iconfont icon-prev travel-plan-content-prev" @click="imgLeft"></i>
                            <div class="travel-plan-content-list">
                                <ul>
                                    <li v-for="(item, index) in route.carImg" :key="index" :class="index == imgIndex?'imgBorder':''"
                                        @click="imgIndexClick(index)" v-if="index > imgIndex-4">
                                        <a><img v-lazy="item" alt=""></a>
                                    </li>
                                </ul>
                            </div>
                            <i class="iconfont icon-next travel-plan-content-next" @click="imgRight"></i>
                        </div>
                    </div>

                    <div class="calendar-min">
                      <ezCalendar></ezCalendar>
                    </div>
                    
                    <p>备注：{{route.remark}}</p>
                </div>
                <div class="local-info-right floatl">
                    <p class="font-f1" v-html="route.title"></p>
                    <p class="font-f2">{{route.subtitle}}</p>
                    <p>编号{{route.no}}：本产品由{{route.companyName}}及具有资质的合作旅行社提供相关服务</p>
                    <p><label v-for="(tag, index) in route.tagContent" :key="index">{{tag}}</label></p>
                    <p  v-html="route.infor"></p>
                    <div class="time-price-con floatl">
                        <div class="text-orange ez-price floatl">{{currencySign}}{{route.price}} <span class="text-gray">/元起</span>
                                <el-popover placement="bottom-start" title="价格说明"  width="270" trigger="hover">
                                    <div class="priceInfor" >{{route.priceInfor}}</div>
                                    <a class="text-gray" slot="reference" >价格说明</a>
                                </el-popover>
                                <el-popover placement="bottom-start" title="退款说明"  width="270" trigger="hover">
                                    <div v-for="(list, index) in refundList" :key="index">
                                        订单确认后，提前{{list.refundDay}}天退单，返回{{list.refundNum}}%;
                                    </div>
                                    <a class="text-gray" slot="reference" >退款说明</a>
                                </el-popover> 
                            </div>
                        <div class="floatr">
                              <el-rate style="margin-right:30px;" v-model="route.star" disabled/>
                            <u><a v-href="'proMenuList3'">{{route.commentNum}}条评价</a></u>
                        </div>
                    </div>
                    <div class="local-content">
                        <div class="local-time">
                            <div class="local-time-title time-number-title floatl">出发城市</div>
                            <div class="local-time-con time-number-con floatl">{{route.endCityContent}}</div>
                        </div>
                        <div class="local-time">
                            <div class="local-time-title time-number-title floatl">出发时间</div>
                            <div class="calendar-box date-box time-info" id="calendar-box"></div>
                            <div class="local-time-con time-number-con floatl">
                             <!-- <input type="text" class="demo-input" placeholder="选择日期" id="test6" 
                             @click="calendarClick" v-model="beginDate" readonly="readonly"> -->
                             {{beginDate}}
                                    </div>
                        </div>
                        <div class="local-number">
                            <div class="local-number-title time-number-title floatl">出游人数</div>
                              <span class="number-right" >成人</span>
                                <el-input-number v-model.number="adultNum" @change="setAdultNum" step-strictly size="small" :min="0" :max="10" label="成人"/>
                             <span class="number-right number-left" >儿童</span>
                                <el-input-number v-model.number="childNum" @change="setChildNum" step-strictly size="small" :min="0" :max="10" label="儿童"/>
                          
                        </div>

                        <div class="local-number ez-travel-hotel ">
                            <div class="time-number-title floatl">房间选择</div>
                            <div class="time-number-con floatl travel-content-main-search-type">
                            <p>
                                <span class="number-right" >单人间</span>
                                    <el-input-number v-model="oneNum" @change="setOneNum"  step-strictly size="small" :min="0" :max="10" label="单人间"/>
                                <span class="number-right number-left">双人间</span>
                                    <el-input-number v-model.number="twoNum" @change="setTwoNum"  step-strictly size="small" :min="0" :max="10" label="双人间"/>  
                            </p>
                            <p>
                                <span class="number-right" >三人间</span>
                                <el-input-number v-model.number="threeNum" @change="setThreeNum" step-strictly size="small" :min="0" :max="10" label="三人间"/>  
                                <span class="number-right number-left" >四人间</span>
                                <el-input-number v-model.number="fourNum" @change="setFourNum" step-strictly size="small" :min="0" :max="10" label="四人间"/>  
                                <span class="number-right number-left" >配房</span>
                                <el-input-number v-model.number="arrangeNum" @change="setArrangeNum" step-strictly size="small" :min="0" :max="10" label="配房"/>  
                            </p>
                            </div>
                        </div>
                        <div class="local-price">

                            <div class="local-price-con floatr">
                                <!-- <div class="text-orange ez-price floatl"><span class="text-gray">总价</span> ¥{{price}}</div> -->
                                <div class="shopping-cart floatl"  @click="addOrder" 
                                style="background-color: #ff5418;color: #fff;border-radius:5px;">
                                    <span class="text-gray" style="color: #fff;">总价</span> {{currencySign}}{{orderPrice}}</div>
                                <div class="shopping-cart floatl" @click="addCar">加入购物车</div>
                            </div>
                        </div>
                    </div>

                    <div class="local-bottom-list">
                        <dl class="dl-horizontal">
                            <dt><img src="~images/news.png" alt=""></dt>
                            <dd>“产品经理推荐”</dd>
                            <dd v-html="route.recommend"></dd>
                        </dl>
                    </div>


                </div>
            </div>

        </div>

        <div class="travel-info-con col-md-12 ez-index-wrap ez-index-public ez-index-5">
            <div class="travel-info-con-title">
                <ul>
                    <!-- class="travel-info-con-title-style"  -->
                    <li v-for="(list, index) in proMenuList" :key="index" v-href="'proMenuList'+list.isadd">
                        <span v-if="list.isadd == 3">{{list.title}}（{{route.commentNum}}）</span>
                         <span v-else>{{list.title}}</span>
                    </li>
                </ul>
            </div>
            <div class="travel-info-con-left pull-left">
             <div v-for="(list, index) in proMenuList" :key="index">
                <div class="travel-title-con" v-if="list.isadd==2" :id="'proMenuList'+list.isadd">
                    <div class="travel-title-con-left floatl" style="text-align: center;"><img src="~images/ic_xingcheng.png"
                            alt=""></div>
                    <div class="travel-title-con-right floatl">
                        <i v-for="(item,index) in route.scenicContent" :key="index">
                            <span>{{item}}</span>
                            <i v-if="index < route.scenicContent.length-1">></i>
                        </i>
                    </div>
                </div>

                <div class="travel-trip-info" v-if="list.isadd==2">
                    <div class="travel-trip floatl" style="text-align: center;">
                        <ul>
                            <li :class="routeContentIndex == index?'travel-trip-style':''" @click.stop=routeContentIndexClick(index)
                                v-for="(routeContent, index) in routeContentList" :key="index"><span>第{{index+1}}天</span><b>●</b></li>
                        </ul>
                    </div>
                    <div class="travel-time-plan floatl" v-for="(routeContentDay, index) in routeContentList" :key="index" :class="{'hidden-info':routeContentIndex != index}">
                        <div class="travel-time-node" v-for="(routeContent, index) in routeContentDay.contentList" :key="index" >

                            <div class="travel-time"><b style="margin-left: 20px;">{{routeContent.tripDate}}</b></div>
                            
                            <div class="travel-node">
                                <p v-if="routeContent.tripType == 1">用餐时间：约30分钟</p>
                                <p v-if="routeContent.tripType == 1">酒店用餐</p>
                                <p v-if="routeContent.tripType == 2">浏览时间：约30分钟</p>
                                <p v-if="routeContent.tripType == 3">其他时间：约30分钟</p>
                                <p v-if="routeContent.tripType != 1">
                                    <b>{{routeContent.scenicName}}</b>
                                </p>
                                <p v-if="routeContent.tripType != 1" v-html="routeContent.infor"></p>

                            </div>

                        </div>

                    </div>
                </div>

                <div class="travel-list" v-if="list.isadd==3"  :id="'proMenuList'+list.isadd">
                    <div class="travel-service floatl"><img src="~images/ic_dianping.png" alt=""></div>
                    <div class="travel-list-con" v-for="(comment, index) in commentList" :key="index" style="float: right;">
                        <div class="floatl"><img v-lazy="comment.memberPhoto?comment.memberPhoto:'~images/news.png'"
                                alt="用户头像"></div>
                        <div class="content floatl">
                            <div>{{comment.memberName}}
                                <!-- <i class="iconfont icon-star" v-for="(item, index) in 5" :key="item" v-if="comment.level > index"></i> -->
                                <el-rate style="margin-right:30px;" v-model="comment.level" disabled/>
                                {{comment.level}}分<span class="floatr">{{comment.createDate}}</span></div>
                            <p>{{comment.content}}</p>
                        </div>
                    </div>

                    <div id="travel-content-main-list-paging1" class="pagination" style="float:right"></div>
                </div>
                <!-- 用户咨询 -->
                <div class="travel-list"  v-if="list.isadd==4" :id="'proMenuList'+list.isadd" >
                    <div style="margin-bottom: 50px;">
                        <span type="button" class="consulting" data-toggle="modal" data-target="#exampleModal"
                            data-whatever="@getbootstrap">用户咨询</span>
                        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                            aria-hidden="true">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                                                aria-hidden="true">&times;</span></button>
                                        <h4 class="modal-title" id="exampleModalLabel">用户咨询</h4>
                                    </div>
                                    <div class="modal-body">
                                        <form>
                                            <div class="form-group">
                                                <textarea class="form-control" rows="3" placeholder="咨询问题详细"
                                                    v-model.trim="content" maxlength="150"></textarea>
                                            </div>
                                            <div class="form-group">
                                                <div class="form-inline">
                                                    <label class="sr-only" for="exampleInputName2">姓名</label>
                                                    <input type="text" class="form-control" id="exampleInputName2"
                                                        placeholder="姓名" v-model.trim="name" maxlength="20">
                                                </div>
                                                <div class="form-inline">
                                                    <label class="sr-only" for="exampleInputName2">电话</label>
                                                    <input type="text" class="form-control" id="exampleInputName2"
                                                        placeholder="电话" v-model.trim="mobile" maxlength="20">
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-default" @click="addConsult">提交</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="travel-service floatl"><img src="~images/ic_zixun.png" alt=""></div>
                    <div class="travel-list-con travel-consulting" v-for="(consult, index) in consultList" :key="index" style="float: right;">
                        <div class="font-hei floatl">咨询问题：</div>
                        <div class="content floatl">
                            <div>{{consult.content}}</div>
                            <p class="text-reply">客服回复：{{consult.contentRetply}}</p>
                            <p></p>
                        </div>
                    </div>

                    <div id="travel-content-main-list-paging2" class="pagination" style="float:right"></div>

                </div>

                <div class="travel-list"  v-if="list.isadd > 4" :id="'proMenuList'+list.isadd">
                    <div class="travel-service travel-list-video-left floatl"><img src="~images/ic_moren.png" alt=""></div>
                    <div class="travel-list-video" v-html="list.content">
                        <!-- <video :src="route.content" controls="controls" class='ez-video'></video> -->
                    </div>
                </div>
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
import ezCalendar from "components/rule/calendar"
import { mapState, mapMutations, mapGetters } from "vuex";
import { 
    saveConsult,
    getConsult,
    selectComment,
    saveCar,
    getRouteContent,
    getRouteDetails,
    refundInfor,
    getRoutePriceDetails,
    getProMenu,
} from 'getData'
export default {
    name: "uleInfo",
    data() {
        return {
            route: {},   //常规路线详情
            imgIndex: 0,  //选中的img图片下标
            adultNum: 0,  //大人数量
            childNum: 0,  //小孩数量
            oneNum: 0,  //单人间
            twoNum: 0,  //双人间
            threeNum: 0,  //三人间
            fourNum: 0,  //四人间
            arrangeNum: 0, //配房数量
            refundMsg: "",  //退款说明文字
            routeContentList: [], //行程内容
            routeContentIndex: 0,  //选中的天数
            totalPage1: 1,  //评论总页数
            commentList: [],  //评论集合
            consultList: [],  //用户咨询列表
            totalPage2: 1,  //咨询总页数
            content: "",  //咨询内容
            name: "",  //姓名
            mobile: "", //电话
            proMenuList: [],  //产品菜单
            refundList: [], //退款说明
        }
    },
    computed: {
         ...mapState([ "currencySign", "loginType"]),
        ...mapState({
            routeid: state => state.rule.routeid,
         }),
         ...mapGetters("rule",["beginDate", "orderPrice"]),
    },
    components: {
        ezHeader,
        ezContainer,
        ezFooter,
        ezAside,
        ezCalendar
    },
    created() {
        this.setRouteid(this.$route.params.id)
        this.getData();
        this.getRouteContent();
        this.getRefundInfo();
        this.selectComment(1, 1);
        this.getConsult(1, 1);
        this.getProMenu();
    },
    methods: {
        ...mapMutations("rule",["setRouteid", "setAdultNum", "setChildNum", "setOneNum", 
            "setTwoNum", "setThreeNum", "setFourNum", "setArrangeNum", "setRoute",]),
        ...mapMutations(["loginFlagChange"]),
        //获取产品菜单
        async getProMenu() {
            let data = await getProMenu({
                proType: 1,  //1.常规路线2.当地参团3.景点4.游轮
                proid: this.routeid,
            })
            if(data){
                this.proMenuList = data;
            }
        },
           //下单页面
            addOrder:function(){
                if(!this.judge()) return;
                if(this.loginType == 1){
                    this.loginFlagChange(1);
                    return;
                }
                 this.$router.push("/rule/ruleSure")
            },
            //添加用户咨询
            async addConsult() {
                if (this.isNull(this.mobile) || this.isNull(this.name) || this.isNull(this.content)) {
                    this.infoMsg("请完善数据");
                    return;
                }
              if(await saveConsult({
                    typeid: this.routeid,
                    proType: 4,
                    content: this.content,
                    name: this.name,
                    mobile: this.mobile,
                })){
                    $('#exampleModal').modal('hide');
                    this.successMsg("提交用户咨询成功");
                    this.content = "";
                    this.name = "";
                    this.mobile = "";
                }  
            },
            //初始化咨询列表
            pageCreate2: function () {
                $('#travel-content-main-list-paging2').jqPaginator({
                    totalPages: this.totalPage2,
                    visiblePages: 6,
                    currentPage: 1,
                    onPageChange: function (num, type) {
                        if(type == "change"){
                            app.getConsult(2, num);
                        }
                    }
                });
            },
            //用户咨询列表
            async getConsult(type, pageNo) {
                let data = await getConsult({
                    pageNo: pageNo,
                    typeid: this.routeid,
                    proType: 4,
                })
                if(data){
                    this.consultList = data.list;
                    this.totalPage2 = data.totalPage;
                    if (type == 1) {
                        this.pageCreate2();
                    }
                }
                
            },
            //初始化一级评论分页
            pageCreate1: function () {
                $('#travel-content-main-list-paging1').jqPaginator({
                    totalPages: this.totalPage1,
                    visiblePages: 6,
                    currentPage: 1,
                    onPageChange: function (num, type) {
                        if(type == "change"){
                            app.selectComment(2, num);
                        }
                    }
                });
            },
            //获取评论列表
            async selectComment(type, pageNo) {
                let data = await selectComment({
                    pageNo: pageNo,
                    typeid: this.routeid,
                    proType: 4,
                })
                if(data){
                    this.commentList = data.list;
                    this.totalPage1 = data.totalPage;
                    if (type == 1) {
                        this.pageCreate1();
                    }
                }
            },
            //点击天数
            routeContentIndexClick: function (index) {
                this.routeContentIndex = index;
            },
            judge:function(){
                if(this.isNull(this.orderPrice)){
                     this.infoMsg("请完善数据");
                     return false;
                }
                if (this.isNull(this.beginDate)) {
                    this.infoMsg("请选择日期");
                    return false;
                }
                if (this.adultNum <= 0 && this.childNum <= 0) {
                     this.infoMsg("请选择出游人数");
                    return false;
                }
                if (this.oneNum + this.twoNum + this.threeNum + this.fourNum + this.arrangeNum <= 0) {
                     this.infoMsg("请选择房间");
                    return false;
                }
                return true;
            },
            //加入购物车
            async addCar() {
                if(!this.judge()) return;
                if(this.loginType == 1){
                    this.loginFlagChange(1);
                    return;
                }
                if (await saveCar({
                    typeid: this.routeid,
                    carType: 1,
                    beginDate: this.beginDate,
                    adultNum: this.adultNum,
                    childNum: this.childNum,
                    oneNum: this.oneNum,
                    twoNum: this.twoNum,
                    threeNum: this.threeNum,
                    fourNum: this.fourNum,
                    arrangeNum: this.arrangeNum,
                    price: this.orderPrice,
                })){
                     this.successMsg("添加购物车成功");
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
                if (this.imgIndex < this.route.carImg.length - 1) {
                    this.imgIndex++;
                    return;
                }
            },
            //获取行程内容
            async getRouteContent() {
                let data = await getRouteContent({
                    routeid: this.routeid,
                })
                console.log(data);
                if(data){
                    this.routeContentList = data;
                }
            },
            //获取参团详情
            async getData() {
                let data = await getRouteDetails({
                    routeid: this.routeid,
                })
                           
                if(data){
                    this.route = data;
                     //解决分数是字符串报错
                    this.$set(this.route , "star", this.route.star?parseInt(this.route.star):0)
                    this.route.carImg = this.route.carImg?this.route.carImg.split(","):[];
                    this.route.tagContent = this.route.tagContent?this.route.tagContent.split(","):[];
                    this.route.scenicContent = this.route.scenicContent?this.route.scenicContent.split(","):[];
                    this.setRoute(this.route)
                }
            },
            //获取退款说明
            async getRefundInfo() {
                let data = await refundInfor({
                    productType: 4,
                    productid: this.routeid,
                })
                if(data){
                    this.refundList = data;
                    let refundMsg = "";
                    for (const iterator of Object.values(data)) {
                        refundMsg += `订单确认后，提前${iterator.refundDay}天退单，返回${iterator.refundNum}%;`;
                    }
                    this.refundMsg = refundMsg;
                    console.log(refundMsg)
                }
            },
            //点击日历
            async calendarClick() {
                let priceDate = this.calendarDate.year + "-" + (this.calendarDate.month > 9 ? this.calendarDate.month : "0" + this.calendarDate.month);
                console.log(priceDate);
                let data = await getRoutePriceDetails({
                    routeid: this.routeid,
                    priceDate: priceDate,
                })
                console.log(data)
                if(data){
                    this.oneCost = data[0].oneCost;
                    this.twoCost = data[0].twoCost;
                    this.threeCost = data[0].threeCost;
                    this.fourCost = data[0].fourCost;
                    this.arrangeCost = data[0].arrangeCost;
                    this.setOpt(data)
                    // $(".date-box").calendar({
                    //     ele: '.date-box', //依附dom
                    //     title: '',
                    //     data: data
                    // });
                }
            },
        },
    
}

</script>
<style lang="less" scoped>
    .ez-travel-tuxedo{
        width: 1220px;
        margin: 0 auto;
        overflow: hidden; 
        margin-top: 25px;
    }
    .number-right{
        margin-right: 10px;
    }
    .number-left{
        margin-left: 10px;
    }
    .priceInfor{
        max-width: 500px;
    }
</style>
