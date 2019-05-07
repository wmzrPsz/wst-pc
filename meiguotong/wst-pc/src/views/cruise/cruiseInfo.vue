<template>
    <div>
        
        <ez-header></ez-header>
        <ez-container></ez-container>

<!--content-->
<!--<div class="container ez-container" style="height: 500px;background: #00a0e9 "></div>-->


<div class="content ez-travel-info ez-travel-tuxedo main_content">
    <div class="travel-info">
        <div class="travel-info-local">
            <div class="local-info-left floatl">
                <img :src="linerline.imgUrl | splitVc(imgIndex) ">
                <div>
                    <div class="travel-plan-content">
                        <i class="iconfont icon-prev travel-plan-content-prev"></i>
                        <div class="travel-plan-content-list_a">
                        <div class=" travel-plan-content-list_b">
                            <ul>
                                <li v-for="(imgUrl, index) in linerline.imgUrl" :key="index" :class="{'kun':index==imgIndex}" @click="imgUrlClick(index)">
                                    <a><img :src="imgUrl" alt=""></a>
                                </li>
                            </ul>
                        </div>
                       </div>
                        <i class="iconfont icon-next travel-plan-content-next"></i>
                    </div>  

               <div class="ma22 ma5">
              <p class="zi_c" >世界梦想号</p>
              <p class="ma1 zi_ee">所属公司：{{liner.company}}</p>
              <ul class="fu4 lis_a ma1 memgx" style="width: 300px;">
                  <li class="zi_ee bo_24 ma6">首航：{{liner.startDate}}</li>
                  <li class="zi_ee bo_24 ma6">吨位：{{liner.weight}}吨</li>
                  <li class="zi_ee ma6">载客：{{liner.passengersNum}}位</li>
                  <li class="zi_ee bo_24 ma6">长度：{{liner.length}}米</li>
                  <li class="zi_ee bo_24 ma6">宽度：{{liner.width}}米</li>
                  <li class="zi_ee ma6">楼层：{{liner.heigth}}层</li>
              </ul>
             </div>              
                </div>

               
            </div>
            <div class="local-info-right floatl">
                    <p class="font-f1">{{linerline.name}}</p>
                    <!-- <p class="font-f2">时尚半自助出游新选择！将团队游的实惠、便捷与自由行的轻松、惬意完美结合～</p> -->
                    <p>编号{{linerline.lineNo}}：本产品由{{linerline.companyName}}及具有资质的合作旅行社提供相关服务</p>
                    <p><label v-for="(tag, index) in linerline.tagContent" :key="index">{{tag}}</label></p>
                    <p>{{linerline.infor}}</p>
                    <div class="time-price-con floatl">

                                <el-popover placement="bottom-start" title="价格说明"  width="270" trigger="hover">
                                    <div class="priceInfor" >{{linerline.priceInfor}}</div>
                                    <a class="text-gray" slot="reference" >价格说明</a>
                                </el-popover>
                                <el-popover placement="bottom-start" title="退款说明"  width="270" trigger="hover">
                                    <div v-for="(list, index) in refundList" :key="index">
                                        订单确认后，提前{{list.refundDay}}天退单，返回{{list.refundNum}}%;
                                    </div>
                                    <a class="text-gray" slot="reference" >退款说明</a>
                                </el-popover> 

                        <div class="floatr">
                        <el-rate style="margin-right:30px;" v-model="linerline.star" disabled/>
                        <u ><a v-href="'proMenuList3'">{{linerline.commentNum}}条评价</a></u>
                    </div>
                    </div>
                <div class="local-content">
                   <div class="local-time">
                        <div class="local-time-title time-number-title floatl">出发城市</div>
                        <div class="local-time-con time-number-con floatl">{{linerline.startCityName}}</div>
                    </div>
                    <div class="local-time">
                        <div class="local-time-title time-number-title floatl">出发时间</div>
                        <div class="calendar-box date-box time-info" id="test6" style="display: none; margin-top:-30rem;"></div>
                        <div class="local-time-con time-number-con floatl">
                            <!-- <el-input v-model="input" placeholder="请选择日期" readonly @click="dialogTableVisible = true"></el-input> -->
                         <!-- <input type="text" slot="reference" class="demo-input"  placeholder="选择日期"  readonly> -->
                                <!-- <el-popover placement="bottom-start" title="价格说明"  width="270" trigger="click">
                                    <test></test>
                                <input type="text" slot="reference" class="demo-input"  placeholder="选择日期"  readonly>
                                </el-popover> -->
                            <el-button type="text" @click="dialogTableVisible = true">选择日期</el-button>

                            <el-dialog :visible.sync="dialogTableVisible">
                                <cruiseCalendar></cruiseCalendar>
                            </el-dialog>

                        </div>
                    </div>
                   

                    
                    <div class="local-price">
                       
                <div class=" qingchu overflow">
                   <ul class="fu4 qingchu">
                   <input class="beisen bo_2 ze_f ba0_b_w ma55 fff ma25 ma30 " type="button" value="开始预订" @click.stop="addOrder">
                   <input class="baise goue ze_f ba0_b_w sssss  ma22 " type="button" value="加入购物车" @click.stop="addCar">
                 </ul>
                 </div>

                    </div> 
                </div>

                <div class="local-bottom-list">
                    <dl class="dl-horizontal">
                      <dt><img src="~images/news.png" alt=""></dt>
                      <dd>“产品经理推荐”</dd>
                      <dd v-html="linerline.recommend"></dd>
                    </dl>
                </div>
                <!-- <div class="fu1 ma28 qingchu ma56 zi_ee lans">查看更多</div> -->

            </div>
        </div>

    </div>

    <div class="travel-info-con col-md-12 ez-index-wrap ez-index-public ez-index-5">
            <div class="travel-info-con-title">
                <ul>
                    <!-- class="travel-info-con-title-style"  -->
                    <li v-for="(list, index) in proMenuList" :key="index" v-href="'proMenuList'+list.isadd">
                        <span v-if="list.isadd == 3">{{list.title}}（{{linerline.commentNum}}）</span>
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
                        <i v-for="(item,index) in scenicNameList" :key="index">
                            <span>{{item}}</span>
                            <i v-if="index < scenicNameList.length-1">></i>
                        </i>
                    </div>
                </div>

                <div class="travel-trip-info" v-if="list.isadd==2">
                    <div class="travel-trip floatl" style="text-align: center;">
                        <ul>
                            <li :class="tripIndex == index?'travel-trip-style':''" @click.stop=tripIndexClick(index)
                                v-for="(list, index) in tripList" :key="index"><span>第{{index+1}}天</span><b>●</b></li>
                        </ul>
                    </div>
                    <div class="travel-time-plan floatl" v-for="(trip, index) in tripList" :key="index" :class="{'hidden-info':tripIndex != index}">
                        <div class="travel-time-node" v-for="(list, index) in trip.contentList" :key="index" >

                            <div class="travel-time"><b style="margin-left: 20px;">{{list.tripDate}}</b></div>
                            
                            <div class="travel-node">
                                <p v-if="list.tripType == 1">用餐时间：约30分钟</p>
                                <p v-if="list.tripType == 1">酒店用餐</p>
                                <p v-if="list.tripType == 2">浏览时间：约30分钟</p>
                                <p v-if="list.tripType == 3">其他时间：约30分钟</p>
                                <p v-if="list.tripType != 1">
                                    <b>{{list.scenicName}}</b>
                                </p>
                                <p v-if="list.tripType != 1" v-html="list.infor"></p>

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
import cruiseCalendar from "components/cruise/cruiseCalendar"
import test from "components/cruise/test"
import { mapState, mapMutations, mapGetters, mapActions } from "vuex"
import {
    linerRoomList,
    getLinePriceDetails,
    refundInfor,
    saveConsult,
    getConsult,
    selectComment,
    tripList,
    linerlineDetails,
    getProMenu,
} from 'getData'
export default {
    name: "cruisInfo",
    data() {
        return {
            // lineid:"",  //游轮航线ID
            linerline:{},  //邮轮路线详情
            liner:{},  //邮轮详情
            tripList:{},  //行程列表
            scenicNameList:[],  //景点列表
            tripIndex:1,  //展示的行程天数
            totalPage1: 1,  //评论总页数
            commentList: [],  //评论集合
            consultList: [],  //用户咨询列表
            totalPage2: 1,  //咨询总页数
            content: "",  //咨询内容
            name: "",  //姓名
            mobile: "", //电话
            refundMsg:"",  //退款提示
            linerRoomList:[],  //邮轮房间
            tep:"",  //房间模板信息
            beginDate:"",  //选择的时间
            roomIds:[],  //选择的房间id
            proMenuList: [], //产品菜单
            refundList: [], //退款说明
            imgIndex: 0, //选择的图片下班
            dialogTableVisible: false,   //是否显示选择日期弹窗
        }
    },
    computed: {
        ...mapState(["currencySign", "loginType"]),
        ...mapState("cruise",["lineid"]),
    },
    created () {
        this.lineidSet(this.$route.params.id);
        this.getInfo();
        this.getTrip();
        this.selectComment(1,1);
        this.getConsult(1,1);
        this.getRefundInfo();
        this.getProMenu();
    },
    components: {
        ezHeader,
        ezContainer,
        ezFooter,
        ezAside,
        cruiseCalendar,
        test,
    },
    methods:{
        ...mapMutations(["loginFlagChange"]),
        ...mapMutations("cruise",["lineidSet", "linerlineSet"]),
        //获取产品菜单
        async getProMenu() {
            let data = await getProMenu({
                proType: 4,  //1.常规路线2.当地参团3.景点4.游轮
                proid: this.lineid,
            })
            if(data){
                this.proMenuList = data;
            }
        },
        //点击图片
        imgUrlClick(index){
            this.imgIndex = index;
        },
        //加入购物车
        addCar:function(){
            layerMsg("加入购物车成功");
        },
        //预约
        addOrder:function(){
            if(!this.beginDate){
                layerMsg("请选择日期");
                return;
            }
            if(!this.roomIds.length){
                layerMsg("请选择房间");
                return;
            }
            localStorage.removeItem("roomIds");
            localStorage.removeItem("lineid");
            localStorage.removeItem("beginDate");
            localStorage.setItem("roomIds",this.roomIds);
            localStorage.setItem("lineid",this.lineid);
            localStorage.setItem("beginDate",this.beginDate);
            location.href = "./K1-4.html";
        },
        //获取房间
        getLinerRoom:function(){
            requestGet(linerRoomListUrl,{
                lineid:this.lineid,
            },function(data){
                app.linerRoomList = data.body.list;
                let tep = "";
                $(".ht-bottom ul").empty();
                for (const list of Object.values(app.linerRoomList)) {
                    tep += `<li class="tripRoomSelect" data-id="${list.id}"><img src="${list.imgUrl}" alt="房间图片"/>
                    <span class="selectSpan"></span>
                    <p>${list.name}</p><p>${list.spec} 须入住${list.peopleNumber}人 ${list.floor}层</p>
                    <span class="text-orange" data-money="113">${app.currencySign}${list.price}/人</span></li>`;
                }
                $(".ht-bottom ul").append(tep);
                //  app.tep = tep;
                console.log(tep);
            })
        },
        //获取日期
        calendarClick :function(){
            this.roomIds = [];
            $('.calendar-box').show();
            let priceDate = calendarDate.year + "-" + (calendarDate.month > 9 ? calendarDate.month : "0" + calendarDate.month);
            console.log(priceDate);
            requestGet(getLinePriceDetailsUrl,{
                lineid:this.lineid,
                priceDate:priceDate,
            },function(data){
                let list = data.body.list;
                $(".date-box").calendar({
                    ele: '.date-box', //依附dom
                    title: '',
                    data: list
                });
            })
        },
        //退款提示
        refundTips: function () {
            layer.tips(this.refundMsg, '#refundTips', {
                tips: [1, '#3595CC'],
                maxWidth:280,
                time: 4000
            });
        },
        //获取退款说明
        async getRefundInfo() {
            let data = await refundInfor({
                productType: 6,  //1.包车租车2.短程接送3.接送机4常规路线5.当地参团6.游轮7.景点门票
                                //9.酒店10.保险11.当地玩家12.旅游定制-导游13.旅游定制-司兼导14包车/租车-导游//15包车/租车-司兼导
                productid: this.lineid,
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
        //添加用户咨询
        async addConsult() {
            if(this.loginType == 1){
                this.loginFlagChange(1);
                return;
            }
            if(this.isNull(this.mobile,this.name,this.content)){
                layerMsg("请完善数据");
                return;
            }
            if(await saveConsult({
                typeid: this.lineid,
                proType: 6,
                content: this.content,
                name: this.name,
                mobile: this.mobile,
            })){
                $('#exampleModal').modal('hide');
                layerMsg("提交用户咨询成功");
                this.content = "";
                this.name = "";
                this.mobile = "";
            }
        },
        //初始化咨询列表
        pageCreate2: function () {
            let _this = this;
            $('#travel-content-main-list-paging2').jqPaginator({
                totalPages: this.totalPage2,
                visiblePages: 6,
                currentPage: 1,
                onPageChange: function (num, type) {
                    if(type == "change"){
                        _this.getConsult(2, num);
                    }
                }
            });
        },
        //用户咨询列表
        async getConsult(type, pageNo) {
            let data = await getConsult({
                pageNo: pageNo,
                typeid: this.lineid,
                proType: 6,
            })
            if(data){
                app.consultList = data.list;
                app.totalPage2 = data.totalPage;
                if (type == 1) {
                    this.pageCreate2();
                }
            }
        },
        //初始化一级评论分页
        pageCreate1: function () {
            let _this = this;
            $('#travel-content-main-list-paging1').jqPaginator({
                totalPages: this.totalPage1,
                visiblePages: 6,
                currentPage: 1,
                onPageChange: function (num, type) {
                    if(type == "change"){
                        _this.selectComment(2, num);
                    }
                }
            });
        },
        //获取评论列表
        async selectComment(type, pageNo) {
            let data = await selectComment({
                pageNo: pageNo,
                typeid: this.lineid,
                proType: 6,
            })
            if(data){
                this.commentList = data.list;
                this.totalPage1 = data.totalPage;
                if (type == 1) {
                    this.pageCreate1();
                }
            }
        },
        //点击行程天数
        tripIndexClick:function(index){
            this.tripIndex = index;
        },
        //邮轮行程列表
        async getTrip(){
            let data = await tripList({
                lineid:this.lineid
            })
            if(data){
                this.tripList = data;
                let list = [];
                Object.values(this.tripList).forEach(list1 =>{
                    Object.values(list1.contentList).forEach(list2 =>{
                        if(!this.isNull(list2.scenicName)){
                            list.push(list2.scenicName);
                        }
                    })
                })
                this.scenicNameList = list;
            }
        },
        //邮轮路线详情
        async getInfo(){
            let data = await linerlineDetails({
                lineid:this.lineid
            })
            if(data){
                this.linerline  = data.linerline;
                this.liner  = data.liner;
                //解决分数是字符串报错
                this.$set(this.linerline , "star", this.linerline.star?parseInt(this.linerline.star):0)
                this.linerline.imgUrl = this.linerline.imgUrl?this.linerline.imgUrl.split(","):[];
                this.linerline.tagContent = this.linerline.tagContent?this.linerline.tagContent.split(","):[];
                this.linerline.scenicContent = this.linerline.scenicContent?this.linerline.scenicContent.split(","):[];
                this.linerlineSet(this.linerline)
            }
        },
    },
}
</script>
<style lang="less" scoped>
.ez-travel-tuxedo .time-number-con{
    width: 200px;
}
.el-input .is-disabled .el-input__inner{
    cursor: default;
}
</style>
