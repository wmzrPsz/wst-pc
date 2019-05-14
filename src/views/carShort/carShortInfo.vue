<template>
    <div>
        
        <ezHeader></ezHeader>
        <ezContainer></ezContainer>

        <div class="content ez-travel-car ez-conventional ez-container text-darkgray main_content">
            <div class="tourism-info">
                <ul style="width:100%;overflow: hidden;">
                    <li style="width: 570px;">
                        <p class="">地点</p>
                        <select name="" class="form-control" style="width:250px;float: left;">
                                <option value="">出发地：{{startCityName}}</option>
                         </select>
                        <select name="" class="form-control" style="width:250px;float: left;">
                                <option value="">详细地点：{{startAddress}}</option>
                         </select>
                        <select name="" class="form-control" style="width:250px;float: left;">
                                <option value="">目的地：{{endCityName}}</option>
                         </select>
                        <select name="" class="form-control" style="width:250px;float: left;">
                                <option value="">详细地点：{{endAddress}}</option>
                         </select>
                    </li>
                    <li  style="width: 285px;">
                        <p class="">日期</p>
                        <select name="" class="form-control">
                            <option value="">开始时间：{{startDate}}</option>
                        </select>
                    </li>
                    <li  style="width: 285px;">
                        <p class="">人数</p>
                        <select name="" class="form-control">
                            <option value="">人数：{{adultNum}}成人，{{childNum}}小孩，{{bagNum}}行李箱</option>
                        </select>
                    </li>
                </ul>

                <div class="tourism-info-btn">
                    <button class="btn btn-primary_a" style="float: left!important;">增加接送</button>
                    <button class="btn btn-primary">确定车辆</button>

                </div>
            </div>

            <div class="tourism-custom">
                <div class="width bo_3 ma25  overflow guangzz-q ">
                    <div class="bao_b_a  fu gaodudai overflow">
                        <div class="travel-content-main-title">
                            短程接送
                        </div>

                        <div class=" mei_a ma1">
                            <div id="allmap" style="width:100%;height:300px; margin: auto;"></div>
                        </div>

                        <div class="bao_b_q zhong_a ma1  zi_e" style="font-weight: 600">华盛顿-华盛顿杜勒斯国际机场 到 洛杉矶-洛杉矶杜勒斯国际机场 全长60Km , 预计时间1小时23分钟。</div>
                    </div>



                    <!-- 添加车辆 -->
                    <div class="ez-travel-car travel-content-main" v-show="showFlag == 1 || showFlag == 2">
                            <div class="travel-content-main-title">
                                选择租车
                            </div>
                            <div class="travel-content-main-search">
                                <div class="travel-content-main-search-con">
                                    <ul>
                                        <li>
                                            <label>车辆等级</label>
                                            <select class="form-control" v-model="comfort" @change="getCarByCity(1)">
                                                <option value="">全部</option>
                                                <option :value="le.id" v-for="(le, index) in carLevel" :key="index">{{le.name}}</option>
                                            </select>
                                        </li>
                                        <li>
                                            <label>座位数</label>
                                            <select class="form-control" v-model="seatNum" @change="getCarByCity(1)">
                                                <option value="">全部</option>
                                                <option :value="n" v-for="n in 7" v-if="n>=3">{{n}}座</option>
                                            </select>
                                        </li>
                                        <li>
                                            <div class="ez-group-btns">
                                                <a class="btn" @click.stop="getCarByCity(1)">返回车辆列表</a>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
    
                            </div>
                            <div class="travel-content-main-list" v-if="showFlag == 1">
                                <ul>
                                    <li v-for="(car, index) in carList" :key="index" v-if="!car.carShow">
                                        <input type="checkbox" name="addCarid" v-model="addCarid" :value="car.id" @change="addCarChange">
                                        <div class="travel-content-main-list-img">
                                            <a class="ez-player-btn">
                                                <img :src="car.carImg" width="150" height="120" alt="" sp='../../resources/480.mp4'
                                                    title="车辆视频" />
                                            </a>
                                        </div>
                                        <div class="travel-content-main-list-con">
                                            <div class="travel-content-main-list-con-title">
                                                <h4>{{car.carName}}</h4>
                                                <p @click="watchCarVideo(car.carVideo)"><i class="iconfont icon-mark"></i>观看视频</p>
                                            </div>
                                            <p>{{car.carTrait}}</p>
                                        </div>
                                        <div class="travel-content-main-list-review">
                                            <label>{{car.star}}分</label>
                                            <a @click.stop="commentNumClick(index)">
                                                <p>{{car.commentNum}}条评价</p>
                                            </a>
                                        </div>
                                        <div class="travel-content-main-list-under">
                                            <i class="iconfont icon-mark"></i>{{car.seatNum}}座
                                            <i class="iconfont icon-mark"></i>1-{{car.bagNum}}容量
                                            <i class="iconfont icon-mark"></i>{{car.comfort | carLevelVc}}
                                            <div class="travel-content-main-list-under-right">
                                                <div>
                                                    <p><i class="iconfont">{{currencySign}}{{car.price}}</i></p>
                                                    <a style="color: #8b8b8b;text-decoration: underline" @click="getRefundInfo(car.id,$event)"
                                                        :id="'refundTips-'+index">退款说明</a>
                                                </div>
                                                <a @click="addCarClick($event,car.id)"><i class="iconfont icon-addition_fill"></i></a>
                                            </div>
                                        </div>
    
                                        <!-- 车辆评论 -->
                                        <div class="evaluation-info" :class="{'hidden-info':!car.show}" v-if="car.show"
                                            style="float: left;">
                                            <div class="travel-list-con" v-for="(comment, index1) in car.commentList" :key="index1"
                                                v-if="car.commentList" style="min-height: 150px;">
                                                <div class="floatl"><img :src="comment.memberPhoto | defPhoto" alt="用户一级评论头像"></div>
                                                <div class="content floatl">
                                                    <div>{{comment.memberName}}<div class="ez-star pull-right">
                                                            <img :src="comment.level>index2?'../../images/star-on.png':'../../images/star-off.png'"
                                                                title="regular" v-for="(item, index2) in 5" :key="index2">
                                                        </div>
                                                    </div>
                                                    <p>{{comment.content}}</p>
                                                    <p class="pull-left"><span>{{comment.createDate}}</span></p>
                                                    <p class="pull-right" @click.stop="subreviewClick(index,index1)"><i
                                                            class="iconfont icon-dialog"></i><span>{{comment.childNum}}</span></p>
                                                    <p class="pull-right ez-pr-10" @click.stop="digComment(comment.commentid,index,index1)"><i
                                                            class="iconfont icon-like"></i><span>{{comment.digNum}}</span></p>
                                                </div>
                                                <div v-if="comment.show">
                                                    <div class="erji_a">
                                                        <input class="erji_b" type="text" @keyup.13="addChildComment(comment.commentid)"
                                                            v-model.trim="commnotContent" :placeholder="'回复@'+comment.memberName">
                                                    </div>
    
                                                    <div class="erji_a" v-for="(item, index) in comment.commentList" :key="index">
                                                        <div class="erji_c"><img :src="item.memberPhoto | defPhoto" alt=""></div>
                                                        <div class="erji_d">
                                                            <p><i style="float: left;">{{item.memberName}}</i><i style="float: right;">{{item.createDate}}</i></p>
                                                            <p class="erji_e">{{item.content}}</p>
                                                        </div>
                                                    </div>
                                                    <div id="commonPage2" class="travel-content-main-list-paging pagination "></div>
                                                </div>
                                            </div>
                                            <div id="commonPage1" class="travel-content-main-list-paging pagination "></div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div id="carPage" class="travel-content-main-list-paging pagination" v-if="showFlag == 1"></div>
    
                            <div class="bo_5 overflow lis ma1" style="clear: both;" v-if="showFlag == 1">
                                <ul>
                                    <li class="fu bao_b_g ma14 hootRoomChoice" @click.stop="addCarInfo">
                                        <div class="beisen fff right_aaa mars">{{carNum}}</div>
                                    </li>
                                    <li class="fu1" @click.stop="reserveCarClick">
                                        <button class="btn btn-primary">{{currencySign}}{{carPrice}}预定</button>
                                    </li>
                                </ul>
                            </div>
                        </div>
    
                        <!-- 添加的车辆信息 -->
                        <div class="ez-travel-hotel " v-if="showFlag == 2" style="float: right;">
                            <div class="travel-content-main-list">
                                <ul>
                                    <div class="xua">
                                        <h4 class="zhong_a baibai right_aaa bo_13 xua_a ">已选择</h4>
                                        <li v-for="(list, index) in addCarList" :key="index" style=" padding: 20px 40px 20px 30px;">
                                            <div class="travel-content-main-list-img">
                                                <img :src="list.carImg" width="150" height="120">
                                            </div>
                                            <div class="travel-content-main-list-con">
                                                <h4>{{list.carName}}</h4>
                                                <button class="btn fu1 beisen fff" @click.stop="delCar(index)">删除</button>
                                                <p class="sen_s zi_c ma1">{{currencySign}}{{list.carPrice}} </p>
                                            </div>
                                        </li>
                                    </div>
                                </ul>
                            </div>
                        </div>


                </div>



                <div class=" fu1 ma25">
                    <samp>共：<samp class="sen_s zi_c ma11 zi_f">{{currencySign}}{{orderPrice}}</samp></samp>
                    <button class="btn btn-primary" style="width: 100px; margin:2.5rem 2.5rem;" @click="goToOrder">确定</button>
                </div>

                <div class="travel-prompt">
                    <div class="travel-prompt-hred">
                        <ul>
                            <li><span class="travel-prompt-hred-style">注意事项</span></li>
                            <li><span>列表自定</span></li>
                            <li><span>列表自定</span></li>
                        </ul>
                    </div>
                    <div class="travel-prompt-content">
                        <p class="travel-prompt-content-title">客栈介绍</p>
                        <div class="travel-prompt-content-con">
                            <p>2013年开业 2014年装修 15间房 电话--18887243551</p>
                            <p>“像家一样”是朵家无论大理的客栈还是成都的咖啡馆，始终也是唯一不变的追求，多年海内外自助旅行，住过无数各色各异的客栈民宿和酒店，我明白旅行在外的人身体最需要的栖息地是究竟。
                                朵家，位于大理古城人民路下段洱海门外侧，交通便利，好停车。共有1.8米大床房3间，1.2米双床榻榻米2间.
                                全部独立卫浴。免费无限网络覆盖，空间开敞的室内公共休闲区，精致的院落。客房内配套实木或铁艺家具，60支纱埃及棉高档床品，亚
                                麻窗帘，实木地板，全身镜，吹风筒，妇洗器，品牌卫浴。室内禁烟以及不提供一次性用具。</p>
                        </div>

                    </div>
                    <div class="travel-prompt-content" style="display: none;">
                        <p class="travel-prompt-content-title">客栈介绍1</p>
                        <div class="travel-prompt-content-con">
                            <p>2013年开业 2014年装修 15间房 电话--18887243551</p>
                            <p>“像家一样”是朵家无论大理的客栈还是成都的咖啡馆，始终也是唯一不变的追求，多年海内外自助旅行，住过无数各色各异的客栈民宿和酒店，我明白旅行在外的人身体最需要的栖息地是究竟。
                                朵家，位于大理古城人民路下段洱海门外侧，交通便利，好停车。共有1.8米大床房3间，1.2米双床榻榻米2间.
                                全部独立卫浴。免费无限网络覆盖，空间开敞的室内公共休闲区，精致的院落。客房内配套实木或铁艺家具，60支纱埃及棉高档床品，亚
                                麻窗帘，实木地板，全身镜，吹风筒，妇洗器，品牌卫浴。室内禁烟以及不提供一次性用具。</p>
                        </div>

                    </div>
                    <div class="travel-prompt-content" style="display: none;">
                        <p class="travel-prompt-content-title">客栈介绍2</p>
                        <div class="travel-prompt-content-con">
                            <p>2013年开业 2014年装修 15间房 电话--18887243551</p>
                            <p>“像家一样”是朵家无论大理的客栈还是成都的咖啡馆，始终也是唯一不变的追求，多年海内外自助旅行，住过无数各色各异的客栈民宿和酒店，我明白旅行在外的人身体最需要的栖息地是究竟。
                                朵家，位于大理古城人民路下段洱海门外侧，交通便利，好停车。共有1.8米大床房3间，1.2米双床榻榻米2间.
                                全部独立卫浴。免费无限网络覆盖，空间开敞的室内公共休闲区，精致的院落。客房内配套实木或铁艺家具，60支纱埃及棉高档床品，亚
                                麻窗帘，实木地板，全身镜，吹风筒，妇洗器，品牌卫浴。室内禁烟以及不提供一次性用具。</p>
                        </div>

                    </div>
                </div>
            </div>
        </div>

        <!-- Large modal -->
        <div class="modal fade ez-player-modal" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close video-close" data-dismiss="modal" aria-label="Close"><span
                                aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="myModalLabel">汽车视频</h4>
                    </div>
                    <div class="modal-body">
                        <video :src="carVideo" controls="controls" autoplay="autoplay" class='ez-video' style="width:100%;max-height:465px;"></video>
                    </div>
                    <!-- <div class="modal-footer">
          <button type="button" class="btn btn-default video-close" data-dismiss="modal">Close</button>
        </div> -->
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
import { mapGetters, mapState, mapMutations } from 'vuex'
import { 
    addChildComment,
    digComment,
    getChildComment,
    selectComment,
    refundInfor,
    selectShortCar,
} from 'getData'
export default {
    name: "carShortIndex",
    data() {
        return {
            showFlag:1,  //1车辆列表  2选择的车辆
            comfort: "",  //车辆等级
            seatNum: "",  //座位数
            carList: [],  //车辆列表信息
            commonIndex1: "",  //一级评论车辆下标
            commonIndex2: "",  //二级评论评论下标
            commnotContent: "",  //评论内容
            carVideo: "",  //车辆视频
            addCarList: [],  //选择的车辆List
            addCarid: [],  //页面选择的车辆ID
            carPrice: 0, //选中的车辆价格
            carNum:0,  //选择的车辆数量
            carTime:0,  //行驶时间
            distance:0,  //行驶路程
        }
    },
    computed: {
        ...mapState("carShort",["startCity","startCityName","startAddress","endCity","endCityName","endAddress",
        "startDate","endDate","adultNum","childNum","bagNum"]),
        ...mapState(["loginType","currencySign"]),
        //订单价格
        orderPrice:function(){
            let price = 0;
            this.addCarList.forEach(element => {
                price += parseFloat(element.carPrice);
            });
            return price;
        },
    },
    components: {
        ezHeader,
        ezContainer,
        ezFooter,
        ezAside,
    },
    created() {
          this.getCarByCity(1);
    },
    methods: {
        ...mapMutations('carShort',['STATE_CHANGE']),
        ...mapMutations(["loginFlagChange"]),
        //确定订单
        goToOrder:function(){
            if(this.orderPrice <= 0){
                 this.infoMsg("请选择车辆");  return;
            }
            let seatNum = 0;
            let bagNum = 0;
            for (const car of Object.values(this.addCarList)) {
                seatNum += car.seatNum;
                bagNum += car.bagNum;
            }
            if (seatNum < parseInt(this.adultNum ) + parseInt(this.childNum)) {
                 this.infoMsg("车辆座位数不够"); return;
            }
            if (bagNum < this.bagNum) {
                 this.infoMsg("车辆行李空间不够"); return;
            }
            this.STATE_CHANGE({
               addCarList: this.addCarList, 
               carTime: this.carTime, 
               distance: this.distance, 
            })
            this.$router.push("carShortSure")
        },
        //删除选择的车辆
        delCar: function (index) {
            Vue.delete(this.addCarList, index);
            this.carNum--;
        },
        //查看已选择的车辆
        addCarInfo: function () {
            this.showFlag = 2;
        },
        //点击预定车辆
        reserveCarClick: function () {
            if (this.carPrice <= 0) {
                 this.infoMsg("你暂未选择车辆"); return;
            }
            for (const carid of Object.values(this.addCarid)) {
                for (const [key, car] of Object.entries(this.carList)) {
                    if (carid == car.id) {
                        let map = {};
                        map["carid"] = car.id;
                        map["carType"] = 2;
                        map["carName"] = car.carName;
                        map["carPrice"] = car.price;
                        map["carImg"] = car.carImg;
                        map["seatNum"] = car.seatNum;
                        map["bagNum"] = car.bagNum;
                        map["comfort"] = car.comfort;
                        map["startPrice"] = car.startPrice;
                        map["headPrice"] = car.headPrice;
                        map["foodPrice"] = car.foodPrice;
                        this.addCarList.push(map);
                        this.carNum++;
                        Vue.set(this.carList[key], "carShow", true);
                        break;
                    }
                }
            }
            this.addCarid = [];
            this.carPrice = 0,
                 this.infoMsg("添加成功");
        },
        //点击添加车辆图标
        addCarClick: function (event, carid) {
            //获取点击对象   
            let el = $(event.target).parent().parent().parent().prev().prev().prev().prev();
            let flag = el.prop("checked");
            el.prop("checked", flag);
            if (!flag) {
                this.addCarid.push(carid);
            } else {
                for (const [key, value] of Object.entries(this.addCarid)) {
                    if (value == carid) {
                        Vue.delete(this.addCarid, key);
                    }
                }
            }
            this.addCarChange();
        },
        //页面选择的车辆信息改变
        addCarChange: function () {
            let carPrice = 0;
            for (const carid of Object.values(this.addCarid)) {
                for (const list of Object.values(this.carList)) {
                    if (carid == list.id) {
                        carPrice += parseFloat(list.price);
                    }
                }
            }
            this.carPrice = carPrice;
        },
        //观看车辆视频
        watchCarVideo: function (carVideo) {
            this.carVideo = carVideo;
            $("#myModal").modal('show');
        },
        //添加子评论
        async addChildComment(id) {
            if(this.loginType == 1){
                this.loginFlagChange(1);
                return;
            }
            if (this.isNull(this.commnotContent)) {
                 this.infoMsg("请输入评论内容"); return;
            }
            let data = await addChildComment({
                commentid: id,
                content: this.commnotContent,
            })
            if (data) {
                 this.successMsg("评论成功");
                this.content = "";
                this.getChildComment(1, 1);
            }
        },
        //点赞-取消点赞
        async digComment(id, index1, index2) {
            if(this.loginType == 1){
                this.loginFlagChange(1);
                return;
            }
            let data = await digComment({
                typeId: id,
                digType: 1,
            })
            if (data) {
                Vue.set(this.carList[index1].commentList[index2], "commentList", this.carList[index1].commentList[index2].digNum++);
                this.successMsg("点赞成功");
            } else {
                Vue.set(this.carList[index1].commentList[index2], "commentList", this.carList[index1].commentList[index2].digNum--);
                this.successMsg("取消点赞成功");
            }
        },
        //初始化二级评论分页
        commonPage2: function () {
            let this_ = this;
            $('#commonPage2').jqPaginator({
                totalPages: this.carList[this.commonIndex1].commentList[app.commonIndex2].pages,
                visiblePages: 6,
                currentPage: 1,
                onPageChange: function (num, type) {
                    if(type == "change"){
                        this_.getChildComment(2, num);
                    }
                }
            });
        },
        //获取子评论列表
        async getChildComment(type, pageNo) {

            let data = await getChildComment({
                commentid: this.carList[this.commonIndex1].commentList[this.commonIndex2].commentid,
                pageNo: pageNo,
            }) 
            if (data) {
                Vue.set(this.carList[this.commonIndex1].commentList[this.commonIndex2], "commentList", data.list);
                Vue.set(this.carList[this.commonIndex1].commentList[this.commonIndex2], "pages", data.totalPage);
                if (type == 1) {
                    this.commonPage2();
                }
            }
        },
        //二级评论显示隐藏
        subreviewClick: function (index1, index2) {
            Vue.set(this.carList[index1].commentList[index2], "show", !this.carList[index1].commentList[index2].show);
            if (this.carList[index1].commentList[index2].show) {
                this.content = "";
                for (const [key, value] of Object.entries(this.carList[index1].commentList)) {
                    if (key != index2) {
                        Vue.set(value, "show", false);
                    }
                }
                this.commonIndex2 = index2;
                this.getChildComment(1, 1);
            }
        },
        //初始化一级评论分页
        commonPage1: function () {
            let this_ = this;
            $('#commonPage1').jqPaginator({
                totalPages: this.carList[this.commonIndex1].pages,
                visiblePages: 6,
                currentPage: 1,
                onPageChange: function (num, type) {
                    if(type == "change"){
                        this_.selectComment(2, num);
                    }
                }
            });
        },
        //获取一级评论列表
        async selectComment(type, pageNo = 1) {
            let data = await selectComment({
                pageNo: pageNo,
                typeid: this.carList[this.commonIndex1].id,
                proType: 2,  //1.包车租车2.短程接送3.接送机4常规路线5.当地参团6.游轮7.景点门票
                //8.当地玩家9.酒店10.保险11.旅游定制12导游 13.攻略评论 14.城市评论',
            })
            if (data) {
                Vue.set(this.carList[this.commonIndex1], "commentList", data.list);
                Vue.set(this.carList[this.commonIndex1], "pages", data.totalPage);
                Vue.set(this.carList[this.commonIndex1], "show", true);
                if (type == 1) this.commonPage1();
            }
        },
        //一级评论显示隐藏
        commentNumClick: function (index) {
            Vue.set(this.carList[index], "show", !this.carList[index].show);
            if (this.carList[index].show) {
                for (const [key, value] of Object.entries(this.carList)) {
                    if (key != index) {
                        Vue.set(value, "show", false);
                    }
                }
                this.commonIndex1 = index;
                this.selectComment(1, 1);
            }
        },
        //退款提示
        refundTips: function (refundMsg, e) {
            layer.tips(refundMsg, "#" + e.target.id, {
                tips: [1, '#3595CC'],
                maxWidth: 280,
                time: 4000
            });
        },
        //获取车辆退款说明
        async getRefundInfo(carid, e) {
            console.log(e.target.id);
            let data = await refundInfor({
                productType: 2,  //1.包车租车2.短程接送3.接送机4常规路线5.当地参团6.游轮7.景点门票8.当地玩家9.酒店10.保险
                productid: carid,
            }) 
            if (data) {
                let refundMsg = "";
                for (const iterator of Object.values(data.list)) {
                    refundMsg += `订单确认后，提前${iterator.refundDay}天退单，返回${iterator.refundNum}%;<br/>`;
                }
                this.refundTips(refundMsg, e);
            }
        },
        //车辆列表分页
        carPage: function (totalPage) {
            let this_ = this;
            $('#carPage').jqPaginator({
                totalPages: totalPage,
                visiblePages: 6,
                currentPage: 1,
                onPageChange: function (num, type) {
                    if(type == "change"){
                        this_.getCarByCity(2, num);
                    }
                }
            });
        },
        //获取车辆信息
        async getCarByCity(type, pageNo = 1) {
            this.showFlag = 1;
            let data = await selectShortCar({
                startCity: this.startCity,
                carType: 2,  //1.包车租车2.短程接送3.接送机4.定制
                startDate: this.startDate,
                comfort: this.comfort,  //车辆等级
                seatNum: this.seatNum,  //座位数
                pageNo: pageNo,
            })
            if(data) {
                let carList = data.list;
                for (const car of Object.values(carList)) {
                    for (const carid of Object.values(this.addCarList)) {
                        if (carid.carid == car.id) {
                            car["carShow"] = true;
                        }
                    }
                }
                this.carList = carList;
                if (type == 1) {
                    this.carPage(data.totalPage);
                }
            }
        },
    },
}
</script>
