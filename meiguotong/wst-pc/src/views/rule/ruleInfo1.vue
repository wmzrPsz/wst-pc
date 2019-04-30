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
                    <img :src="route.carImg | carImgFilter(imgIndex)"  alt="常规路线详情图片">
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
                        <!-- <div class="date-box"></div> -->
<!-- <el-calendar>
  <template
    slot="dateCell"
    slot-scope="{date, data}">
    <p :class="data.isSelected ? 'is-selected' : ''">
      {{ data.day.split('-').slice(1).join('-') }} 
      {{ data.isSelected ? '✔️' : ''}}
    </p>
  </template>
</el-calendar> -->

                    </div>
                    
                    <p>备注：{{route.remark}}</p>
                </div>
                <div class="local-info-right floatl">
                    <p class="font-f1">{{route.title}}</p>
                    <p class="font-f2">{{route.subtitle}}</p>
                    <p>编号{{route.no}}：本产品由{{route.companyName}}及具有资质的合作旅行社提供相关服务</p>
                    <p><label v-for="(tag, index) in route.tagContent">{{tag}}</label></p>
                    <p>{{route.infor}}</p>
                    <div class="time-price-con floatl">
                        <div class="text-orange ez-price floatl">{{currencySign}}{{route.price}} <span class="text-gray">/元起</span>
                             <el-tooltip class="item" effect="dark" placement="bottom">
                            <!-- <span class="text-gray" @click="priceInfor" id="priceInfor">价格说明</span> -->
                              <div slot="content">{{route.priceInfor}}</div>
                            <span class="text-gray">价格说明</span>
                             </el-tooltip>
                            </div>
                            <span class="tooltip-show floatl" @click="refundTips" id="refundTips"><u>退款说明</u></span>
                        <div class="floatr">
                            <!-- <i class="iconfont icon-star" v-for="(item, index) in 5" v-if="route.star > index"></i> -->
                              <el-rate style="margin-right:30px;" v-model="route.star" disabled/>
                            <!-- <u><a href="#comment">{{route.commentNum}}条评价</a></u> -->
                            <u><a>{{route.commentNum}}条评价</a></u>
                        </div>
                    </div>
                    <div class="local-content">
                        <div class="local-time">
                            <div class="local-time-title time-number-title floatl">出发城市</div>
                            <div class="local-time-con time-number-con floatl">{{route.startCityContent}}</div>
                        </div>
                        <div class="local-time">
                            <div class="local-time-title time-number-title floatl">出发时间</div>
                            <div class="calendar-box date-box time-info" id="calendar-box"></div>
                            <div class="local-time-con time-number-con floatl">
                             <!-- <input type="text" class="demo-input" placeholder="选择日期" id="test6" 
                             @click="calendarClick" v-model="beginDate" readonly="readonly"> -->
                             {{calendarDate.checkDate}}
                                    </div>
                        </div>
                        <div class="local-number">
                            <div class="local-number-title time-number-title floatl">出游人数</div>
                            <!-- <div class="local-number-con time-number-con floatl">
                                <div class="floatl">
                                    <span class="floatl">成人</span>
                                    <div class="floatl"><span onclick="{if(app.adultNum > 0)app.adultNum--}">-
                                        </span><input type="number" v-model.number="adultNum" readonly="readonly" maxlength="3"><span
                                            onclick="{app.adultNum++}">+</span></div>
                                </div>
                                <div class="floatl">
                                    <span class="floatl">儿童</span>
                                    <div class="floatl">
                                        <span onclick="{if(app.childNum > 0)app.childNum--}">-
                                        </span><input type="number" v-model.trim="childNum" readonly="readonly" maxlength="3"><span
                                            onclick="{app.childNum++}">+</span>
                                     </div>
                                </div>
                            </div> -->
                              <span class="number-right" >成人</span>
                                <el-input-number v-model.number="adultNum" step-strictly size="small" :min="0" :max="10" label="成人"/>
                             <span class="number-right number-left" >儿童</span>
                                <el-input-number v-model.number="childNum" step-strictly size="small" :min="0" :max="10" label="儿童"/>
                          
                        </div>

                        <div class="local-number ez-travel-hotel ">
                            <div class="time-number-title floatl">房间数量</div>
                            <div class="time-number-con floatl travel-content-main-search-type">
                            <p>
                                <span class="number-right" >单人间</span>
                                    <el-input-number v-model="oneNum" step-strictly size="small" :min="0" :max="10" label="单人间"/>
                                <span class="number-right number-left">双人间</span>
                                    <el-input-number v-model.number="twoNum" step-strictly size="small" :min="0" :max="10" label="双人间"/>  
                            </p>
                            <p>
                                <span class="number-right" >三人间</span>
                                <el-input-number v-model.number="threeNum" step-strictly size="small" :min="0" :max="10" label="三人间"/>  
                                <span class="number-right number-left" >四人间</span>
                                <el-input-number v-model.number="fourNum" step-strictly size="small" :min="0" :max="10" label="四人间"/>  
                                <span class="number-right number-left" >配房</span>
                                <el-input-number v-model.number="arrangeNum" step-strictly size="small" :min="0" :max="10" label="配房"/>  
                            </p>
                                <!-- <ul>
                                    <li>
                                        <i class="iconfont icon-ren"></i>
                                        <select class="form-control" v-model="oneNum">
                                            <option value="0" selected="selected">0</option>
                                            <option v-for="(item, index) in 5" :value="item">{{item}}</option>
                                        </select>
                                    </li>
                                    <li>
                                        <i class="iconfont icon-ren"></i><i class="iconfont icon-ren"></i>
                                        <select class="form-control" v-model="twoNum">
                                            <option value="0" selected="selected">0</option>
                                            <option v-for="(item, index) in 5" :value="item">{{item}}</option>
                                        </select>
                                    </li>

                                    <li>
                                        <i class="iconfont icon-ren"></i><i class="iconfont icon-ren"></i><i class="iconfont icon-ren"></i><i
                                            class="iconfont icon-ren"></i>
                                        <select class="form-control" v-model="threeNum">
                                            <option value="0" selected="selected">0</option>
                                            <option v-for="(item, index) in 5" :value="item">{{item}}</option>
                                        </select>
                                    </li>
                                    <li>
                                        <i class="iconfont icon-ren"></i><i class="iconfont icon-ren"></i><i class="iconfont icon-ren"></i><i
                                            class="iconfont icon-ren"></i><i class="iconfont icon-ren"></i>
                                        <select class="form-control" v-model="fourNum">
                                            <option value="0" selected="selected">0</option>
                                            <option v-for="(item, index) in 5" :value="item">{{item}}</option>
                                        </select>
                                    </li>
                                    <li>
                                        <span>配</span>
                                        <select class="form-control" v-model="arrangeNum">
                                            <option value="0" selected="selected">0</option>
                                            <option v-for="(item, index) in 5" :value="item">{{item}}</option>
                                        </select>
                                    </li>
                                </ul> -->

                            </div>
                        </div>
                        <div class="local-price">

                            <div class="local-price-con floatr">
                                <!-- <div class="text-orange ez-price floatl"><span class="text-gray">总价</span> ¥{{price}}</div> -->
                                <div class="shopping-cart floatl"  @click="addOrder" 
                                style="background-color: #ff5418;color: #fff;border-radius:5px;">
                                    <span class="text-gray" style="color: #fff;">总价</span> {{currencySign}}{{price}}</div>
                                <div class="shopping-cart floatl" @click="addCar">加入购物车</div>
                            </div>
                        </div>
                    </div>

                    <div class="local-bottom-list">
                        <dl class="dl-horizontal">
                            <dt><img src="~images/news.png" alt=""></dt>
                            <dd>“产品经理推荐”</dd>
                            <dd>{{route.recommend}}</dd>
                        </dl>
                    </div>


                </div>
            </div>

        </div>

        <div class="travel-info-con col-md-12 ez-index-wrap ez-index-public ez-index-5">
            <div class="travel-info-con-title">
                <ul>
                    <li class="travel-info-con-title-style"><span>行程内容</span></li>
                    <li><span>用户点评（{{route.commentNum}}）</span></li>
                    <li><span>用户咨询</span></li>
                    <li><span>视频资料</span></li>
                </ul>
            </div>
            <div class="travel-info-con-left pull-left">
                <div class="travel-title-con">
                    <div class="travel-title-con-left floatl" style="text-align: center;"><img src="~images/user.png"
                            alt=""></div>
                    <div class="travel-title-con-right floatl">
                        <i v-for="(item,index) in route.scenicContent">
                            <span>{{item}}</span>
                            <i v-if="index < route.scenicContent.length-1">></i>
                        </i>
                    </div>
                </div>
                <div class="travel-trip-info">
                    <div class="travel-trip floatl" style="text-align: center;">
                        <ul>
                            <li :class="routeContentIndex == index?'travel-trip-style':''" @click.stop=routeContentIndexClick(index)
                                v-for="(routeContent, index) in routeContentList"><span>第{{index+1}}天</span><b>●</b></li>
                        </ul>
                    </div>
                    <div class="travel-time-plan floatl" :class="routeContentIndex != index?'hidden-info':''" v-for="(routeContentDay, index) in routeContentList">
                        <div class="travel-time-node" v-for="(routeContent, index) in routeContentDay.contentList">
                            <div class="travel-time"><b style="margin-left: 20px;">{{routeContent.tripDate}}</b></div>
                            <div class="travel-node">
                                <p v-if="routeContent.tripType == 1">用餐时间：约30分钟</p>
                                <p v-if="routeContent.tripType == 1">酒店用餐</p>
                                <p v-if="routeContent.tripType == 2">浏览时间：约30分钟</p>
                                <p v-if="routeContent.tripType == 3">其他时间：约30分钟</p>
                                <p v-if="routeContent.tripType != 1">
                                    <b>{{routeContent.scenicName}}</b>
                                </p>
                                <p v-if="routeContent.tripType != 1">{{routeContent.infor}}</p>

                            </div>
                        </div>

                    </div>
                </div>

                <div class="travel-list" id="comment">
                    <div class="travel-service floatl"><img src="~images/user.png" alt=""></div>
                    <div class="travel-list-con" v-for="(comment, index) in commentList" :key="index" style="float: right;">
                        <div class="floatl"><img v-lazy="comment.memberPhoto?comment.memberPhoto:'~images/news.png'"
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
                <!-- 用户咨询 -->
                <div class="travel-list">
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

                    <div class="travel-service floatl"><img src="~images/user.png" alt=""></div>
                    <div class="travel-list-con travel-consulting" v-for="(consult, index) in consultList" style="float: right;">
                        <div class="font-hei floatl">咨询问题：</div>
                        <div class="content floatl">
                            <div>{{consult.content}}</div>
                            <p class="text-reply">客服回复：{{consult.contentRetply}}</p>
                            <p></p>
                        </div>
                    </div>

                    <div id="travel-content-main-list-paging2" class="pagination" style="float:right"></div>

                </div>


                <div class="travel-list">
                    <div class="travel-service travel-list-video-left floatl"><img src="~images/user.png" alt=""></div>
                    <div class="travel-list-video">
                        <video :src="route.content" controls="controls" class='ez-video'></video>
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
import ezModule from "components/home/ezModule"
import ezFooter from "components/home/ezFooter"
import ezAside from "components/home/ezAside"
import ezCalendar from "components/rule/calendar1"
import { mapState, mapMutations } from "vuex";
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
            beginDate: "",  //出发时间
            routeContentList: [], //行程内容
            routeContentIndex: 0,  //选中的天数
            totalPage1: 1,  //评论总页数
            commentList: [],  //评论集合
            consultList: [],  //用户咨询列表
            totalPage2: 1,  //咨询总页数
            content: "",  //咨询内容
            name: "",  //姓名
            mobile: "", //电话
            // oneCost:0,  //单人房价格
            // twoCost:0,  //双人房价格
            // threeCost:0, //三人房价格
            // fourCost:0,  //四人房价格
            // arrangeCost:0,  //配房价格
        }
    },
    computed: {
        ...mapState([ "currencySign", ]),
        ...mapState({
            calendarDate: state => state.rule.calendarDate,
            oneCost: state => state.rule.calendarDate.oneCost,
            twoCost: state => state.rule.calendarDate.twoCost,
            threeCost: state => state.rule.calendarDate.threeCost,
            fourCost: state => state.rule.calendarDate.fourCost,
            arrangeCost: state => state.rule.calendarDate.arrangeCost,
            routeid: state => state.rule.routeid,
         }),
        //价格
        price:function(){
            // if (!this.beginDate) return 0;
            return this.oneNum * this.oneCost + this.twoNum * this.twoCost + this.threeNum * this.threeCost +
                    this.fourNum * this.fourCost + this.arrangeNum * this.arrangeCost + (this.adultNum + this.childNum) * this.route.price ;
        },
    },
    components: {
        ezHeader,
        ezContainer,
        ezModule,
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
        ...mapMutations("rule",["setRouteid",]),
        //获取产品菜单
        async getProMenu() {
                let data = await getProMenu({
                    proType: 1,  //1.常规路线2.当地参团3.景点4.游轮
                    proid: this.routeid,
                })
                console.log(data)
        },
           //下单页面
            addOrder:function(){
                if(!this.judge()) return;
                localStorage.removeItem("routeid");
                localStorage.removeItem("beginDate");
                localStorage.removeItem("adultNum");
                localStorage.removeItem("childNum");
                localStorage.removeItem("oneNum");
                localStorage.removeItem("twoNum");
                localStorage.removeItem("threeNum");
                localStorage.removeItem("fourNum");
                localStorage.removeItem("arrangeNum");
                localStorage.removeItem("oneCost");
                localStorage.removeItem("twoCost");
                localStorage.removeItem("threeCost");
                localStorage.removeItem("fourCost");
                localStorage.removeItem("arrangeCost");
                localStorage.setItem("routeid",this.routeid);
                localStorage.setItem("beginDate",this.beginDate);
                localStorage.setItem("adultNum",this.adultNum);
                localStorage.setItem("childNum",this.childNum);
                localStorage.setItem("oneNum",this.oneNum);
                localStorage.setItem("twoNum",this.twoNum);
                localStorage.setItem("threeNum",this.threeNum);
                localStorage.setItem("fourNum",this.fourNum);
                localStorage.setItem("arrangeNum",this.arrangeNum);
                localStorage.setItem("oneCost",this.oneCost);
                localStorage.setItem("twoCost",this.twoCost);
                localStorage.setItem("threeCost",this.threeCost);
                localStorage.setItem("fourCost",this.fourCost);
                localStorage.setItem("arrangeCost",this.arrangeCost);
                location.href = "./F1-4.html";
            },
            //价格说明
            priceInfor:function(){
                layer.tips(this.route.priceInfor, '#priceInfor', {
                    tips: [1, '#3595CC'],
                    maxWidth:230,
                    time: 4000
                });
            },
            //退款提示
            refundTips: function () {
                layer.tips(this.refundMsg, '#refundTips', {
                    tips: [1, '#3595CC'],
                    maxWidth:230,
                    time: 4000
                });
            },
            //添加用户咨询
            async addConsult() {
                if (!this.mobile || !this.name || !this.content) {
                    layerMsg("请完善数据");
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
                    layerMsg("提交用户咨询成功");
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
                if(!this.price){
                    return false;
                }
                if (!this.beginDate) {
                    layerMsg("请选择日期");
                    return false;
                }
                if (this.adultNum <= 0 && this.childNum <= 0) {
                    layerMsg("请选择出游人数");
                    return false;
                }
                if (!this.oneNum + !this.twoNum + !this.threeNum + !this.fourNum + !this.arrangeNum == 5) {
                    layerMsg("请选择房间");
                    return false;
                }
                return true;
            },
            //加入购物车
            async addCar() {
                if(!this.judge()) return;
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
                    price: this.price,
                })){
                    layerMsg("添加购物车成功");
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
                let data = getRouteContent({
                    routeid: this.routeid,
                })
                if(data){
                    this.routeContentList = data.list;
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
                    this.route.carImg = this.route.carImg.split(",");
                    this.route.tagContent = this.route.tagContent.split(",");
                    this.route.scenicContent = this.route.scenicContent.split(",");
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
        filters:{
            carImgFilter:function(value,imgIndex){
                if(!value) return; 
                return value[imgIndex];
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
</style>
