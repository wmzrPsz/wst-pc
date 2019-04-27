<template>
    <div>
        <ezHeader></ezHeader>
        <ezContainer></ezContainer>
        <!--content-->
        <div class="container ez-container ez-conventional">
            <div class="ez-search-selector">
                <div class="search-type">
                    <div class="conventional-address bg-s1">
                        <i class="iconfont icon-dingwei floatl"></i>
                        <i class="iconfont icon-down floatr"></i>
                        <p>出发地</p>
                        <h3 class="text-blue"><b>{{startCityName}}</b></h3>
                        <select class="form-control" v-model="startCity" @change="cityChange(1)">
                            <option v-for="(list, index) in cityList" :key="index" :value="list.cityid">{{list.cityName}}</option>
                        </select>
                    </div>

                    <div class="conventional-address bg-s2">
                        <i class="iconfont icon-down floatr"></i>
                        <p>目的地</p>
                        <h3><b>{{endCityName}}</b></h3>
                        <select class="form-control" v-model="endCity" @change="cityChange(2)">
                                <option v-for="(list, index) in cityList" :key="index" :value="list.cityid">{{list.cityName}}</option>
                         </select>
                    </div>
                </div>

                <div id="ez-selector" class="ez-selector">
                    <div class="s-line">
                        <div class="sl-wrap">
                            <div class="sl-key">出发日期</div>
                            <div class="sl-value">
                                <div class="sl-v-list">
                                    <ul class="sl-month-list">
                                        <li v-for="(list, index) in dataList" :key="index" :class="list.flag?'active':''"
                                            @click.stop="monthClick(index)">
                                            <a><i></i>{{list.month}}月</a><span class="selectFlag"></span>
                                        </li>
                                    </ul>
                                    <div class="sl-date-list">
                                        <ul class="list-inline">
                                            <li class="" v-for="(list, index) in days" :key="index" :class="list.flag?'date-selected':''"
                                                @click.stop="dayClick(index)">
                                                <a class="sl-date-day">{{list.day}}</a>号
                                                <span class="selectFlag"></span>
                                            </li>
                                        </ul>
                                    </div>

                                </div>
                            </div>
                            <div class="sl-ext">
                                <a class="sl-e-more sl-date-more" href="javascript:;">
                                    <span class="date-btn-open">展开<i class="iconfont icon-down"></i></span>
                                    <span class="date-btn-close" style="display: none">收起<i class="iconfont icon-up"></i></span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="s-line" v-show="dayShowFlag">
                        <div class="sl-wrap" :class="dayFlag?'multiple extend':''">
                            <div class="sl-key">行程天数</div>
                            <div class="sl-value">
                                <div class="sl-v-list">
                                    <ul>
                                        <li v-for="(day, index) in dayList" :key="index" :class="day.flag?'selected':''"
                                            @click.stop="tripDayClick(index)">
                                            <a><i></i>{{day.day| dayFilter}}</a>
                                        </li>
                                    </ul>
                                </div>
                                <div class="sl-btns">
                                    <a class="btn btn-sm ez-search-confirm" href="javascript:;" @click.stop="daySure">确定</a>
                                    <a class="btn btn-sm ez-search-cancel" href="javascript:;" @click.stop="dayFlagClick(1)">取消</a>
                                </div>
                            </div>
                            <div class="sl-ext">
                                <a class="sl-e-more ez-search-more" href="javascript:;">
                                    <span class="sl-btn-open">更多<i class="iconfont icon-down"></i></span>
                                    <span class="sl-btn-open" style="display: none">收起<i class="iconfont icon-up"></i></span>
                                </a>
                                <a class="sl-e-multiple ez-search-multiple pull-right" :class="dayFlag?'active':''"
                                    @click.stop="dayFlagClick(0)">
                                    <i class="iconfont icon-add"></i>多选
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="s-line" v-show="priceShowFlag">
                        <div class="sl-wrap">
                            <div class="sl-key">价格预算</div>
                            <div class="sl-value">
                                <div class="sl-v-list">
                                    <ul>
                                        <li v-for="(list, index) in priceList" :key="index" @click.stop="priceClick(index)">
                                            <a>{{list.content}}</a>
                                        </li>
                                        <li>
                                            <input type="number" class="input-txt input-txt-md" v-model.number="minPrice"
                                                @change="priceChange"> -
                                            <input type="number" class="input-txt input-txt-md" v-model.number="maxPrice"
                                                @change="priceChange">
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="s-line" v-show="scenicShowFlag">
                        <div class="sl-wrap" :class="scenicFlag?'multiple extend':''">
                            <div class="sl-key">途观景点</div>
                            <div class="sl-value">
                                <div class="sl-v-list">
                                    <ul>
                                        <li v-for="(list, index) in cityScenicList" :key="index" :class="list.flag?'selected':''"
                                            @click.stop="scenicClick(index)">
                                            <a><i></i>{{list.name}}</a>
                                        </li>
                                    </ul>
                                </div>
                                <div class="sl-btns">
                                    <a class="btn btn-sm ez-search-confirm" href="javascript:;" @click.stop="scenicSure">确定</a>
                                    <a class="btn btn-sm ez-search-cancel" href="javascript:;" @click.stop="scenicFlagClick(1)">取消</a>
                                </div>
                            </div>
                            <div class="sl-ext">
                                <a class="sl-e-more ez-search-more" href="javascript:;">
                                    <span class="sl-btn-open">更多<i class="iconfont icon-down"></i></span>
                                    <span class="sl-btn-open" style="display: none">收起<i class="iconfont icon-up"></i></span>
                                </a>
                                <a class="sl-e-multiple ez-search-multiple pull-right" :class="scenicFlag?'active':''"
                                    @click.stop="scenicFlagClick(0)">
                                    <i class="iconfont icon-add"></i>多选</a>
                            </div>
                        </div>
                    </div>

                    <div class="s-line" v-for="(list, index1) in lableList" :key="index1" v-show="list.showFlag">
                        <div class="sl-wrap" :class="list.lableFlag?'multiple extend':''">
                            <div class="sl-key">{{list.content}}</div>
                            <div class="sl-value">
                                <div class="sl-v-list">
                                    <ul class="">
                                        <li v-for="(item, index2) in list.comTagList" :key="index2" :class="item.flag?'selected':''"
                                            @click.stop="lableClick(index1,index2)">
                                            <a><i></i>{{item.content}}</a></li>
                                    </ul>
                                </div>
                                <div class="sl-btns">
                                    <a class="btn btn-sm ez-search-confirm" href="javascript:;" @click.stop="lableSure(index1)">确定</a>
                                    <a class="btn btn-sm ez-search-cancel" href="javascript:;" @click.stop="lableFlagClick(1,index1)">取消</a>
                                </div>
                            </div>
                            <div class="sl-ext">
                                <a class="sl-e-multiple ez-search-multiple pull-right" :class="list.lableFlag?'active':''"
                                    @click.stop="lableFlagClick(0,index1)">
                                    <i class="iconfont icon-add"></i>多选</a>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="ez-search-selected pull-left">
                    <ul class="list-inline ez-ml-0 selected-list">
                        <span>您已选择：</span>
                        <li v-for="(item, index) in opt" :key="index" @click.stop="delOpt(index)">
                            <span class="crumb-key">{{item.contentKey}}</span>：
                            <span class="crumb-value">{{item.contentValue}}</span>
                            <i class="iconfont icon-close crumb-remove"></i>
                        </li>
                    </ul>
                </div>

                <div class="ez-search-sort text-center pull-left">
                    <ul class="list-inline ez_public_list">
                        <li class="active" @click.stop="orderByTypeChange('')"><a class="btn ez-btn-sort">综合</a></li>
                        <li class="" @click.stop="orderByTypeChange(1)"><a class="btn ez-btn-sort">销量</a></li>
                        <li class="" @click.stop="orderByTypeChange(2)"><a class="btn ez-btn-sort">价格<i class="caret"></i></a></li>
                        <li class="" @click.stop="orderByTypeChange(4)"><a class="btn ez-btn-sort">评论</a></li>
                    </ul>
                </div>
                
            </div>

            <div class="container ez-container ez-search-result">
                <div class="box-left pull-left">
                    <div class="box-card" v-for="(list, index) in routeList" :key="index">
                        <div  class="box-card-left pull-left" @click.stop="getInfor(list.routeid)">
                            <img v-lazy="list.carImg">
                            <div class="box-card-rate">
                                <div class="ez-star pull-left">
                                    <!-- <img src="../../assets/images/star-on.png"> -->
                                    <!-- <img :src="list.star>index?starOn:starOff"  
                                        title="regular" v-for="(item, index) in 5" :key="index"> -->
                                        <el-rate v-model.number="list.star" disabled/>
                                </div>
                                <span class="pull-right text-gray evaluation-click" @click.stop="commentNumClick(index)"><u>{{list.commentNum}}条评价</u></span>
                            </div>
                        </div>
                
                        <div class="box-card-text pull-right" @click.stop="getInfor(list.routeid)">
                            <h4 class="title ez-mb-md">{{list.title}}</h4>
                            <h5 class="subtitle text-blue ez-mb-md">{{list.subtitle}}</h5>
                            <p class="intro text-gray ez-mb-md">{{list.infor}}</p>
                            <p class="text-style2 del-color"><label v-for="(tag, index) in list.tagContent.split(',')" :key="index">{{tag}}</label></p>
                            <div class="card-like">
                                <span class="pull-left text-orange ez-price"><span>{{currencySign}}</span>{{list.price}}<span class="text-gray">天</span></span>
                                <span class="pull-right text-orange list-time-info" @click.stop="calendarClick(index)">出发日期</span>

                            </div>
                        </div>
 
                        <div class="evaluation-info" :class="{'hidden-info':!list.show}" v-if="list.show">

                            <div class="travel-list-con" v-for="(comment, index1) in list.commentList" :key="index1"
                                v-if="list.commentList" style="min-height: 150px;">
                                <div class="floatl"><img v-lazy="comment.memberPhoto?comment.memberPhoto:'~images/news.png'"
                                        alt="用户一级评论头像" :key="comment.memberPhoto"></div>
                                <div class="content floatl">
                                    <div>{{comment.memberName}}<div class="ez-star pull-right">
                                            <img v-lazy="comment.level>index1?'~images/star-on.png':'~images/star-off.png'"
                                                title="regular" v-for="(item, index) in 5" :key="index">
                                        </div>
                                    </div>
                                    <p>{{comment.content}}</p>
                                    <p class="pull-left"><span>{{comment.createDate}}</span></p>
                                    <p class="pull-right" @click.stop="subreviewClick(index,index1)"><i class="iconfont icon-dialog"></i><span>{{comment.childNum}}</span></p>
                                    <p class="pull-right ez-pr-10" @click.stop="digComment(comment.commentid,index,index1)"><i
                                            class="iconfont icon-like"></i><span>{{comment.digNum}}</span></p>

                                </div>

                                <div v-if="comment.show">
                                    <div class="erji_a">
                                        <input class="erji_b" type="text" @keyup.13="addChildComment(comment.commentid)"
                                            v-model="content" :placeholder="'回复@'+comment.memberName">
                                    </div>

                                    <div class="erji_a" v-for="(item, index) in comment.commentList" :key="index">
                                        <div class="erji_c"><img v-lazy="item.memberPhoto?item.memberPhoto:'~images/news.png'"
                                                alt=""></div>
                                        <div class="erji_d">
                                            <p><i style="float: left;">{{item.memberName}}</i><i style="float: right;">{{item.createDate}}</i></p>
                                            <p class="erji_e">{{item.content}}</p>
                                        </div>
                                    </div>


                                    <div id="travel-content-main-list-paging2" class="pagination" style="float:right"></div>
                                </div>

                            </div>

                            <div id="travel-content-main-list-paging1" class="pagination" style="float:right"></div>

                        </div>
                        <div class="calendar-box date-box" :class="!list.calendarShow?'hidden-info':''"></div>
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

                <nav class="text-center col-lg-9 col-md-9 col-sm-9" v-show="show">
                    <ul class="pagination ez-navigation">
                        <li @click.stop="pageChange(-1)">
                            <a class="page-next" aria-label="Next" style="margin-right: 10px;">
                                <span aria-hidden="true">上一页 &gt;</span>
                            </a>
                        </li>
                        <li v-show="current_page>5" @click.stop="jumpPage(1)"><a href="#">1</a></li>
                        <li v-show="efont"><a>...</a></li>
                        <li v-for="(num,index) in indexs" :key="index" :class="{active:current_page==num}" @click.stop="jumpPage(num)"><a>{{num}}</a></li>
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
import { 
    getRoutePriceDetails,
    addChildComment,
    digComment,
    getChildComment,
    selectComment,
    selectRoute,
    getLabel,
    getScenicByCity,
    getCityList
} from 'getData'
export default {
    name: "ruleIndex",
    data () {
        return {
            cityName: "广州市", //定位获取
            cityid: 1,  //目的城市ID 
            startCity: "",  //出发城市ID
            // startCityName: "",  //出发城市名称
            endCity: "",   //到达城市ID
            // endCityName: "",  //到达城市名称
            cityList: [],  //城市list
            choice: "",  //已选择
            orderByType: 4,  //1.销量2.价格降序3.价格升序4好评
            pageNo: 1, //页数
            routeList: [],  //路线列表
            current_page: 1, //当前页
            pages: 3, //总页数
            index1: "",  //评论下标
            index2: "",  //子评论下标
            content: "",  //评论的内容
            dataList: [],  //日期List
            monthIndex: "",  //展示的月份下标
            days: [],  //展示的天数
            selectDate: [], //选择的时间  [{year:”2018”,month:”05”,days:”05,06”},{}]
            dayList: [],  //行程天数List
            dayFlag: false,  //行程天数是否多选
            day: [],  //选择行程天数
            minPrice: "", //最小价格
            maxPrice: "",  //最大价格
            priceList: [],  //价格LIst
            cityScenicList: [],  //途径景点
            scenicFlag: false,  //途径景点是否多选
            scenic: [],  //选择的景点
            lableList: [],  //标签属性
            labelAttrid: [],  //选择的标签属性ID
            opt: [],  //选择的数据
            dayShowFlag: true,  //行程天数是否展示   index(1)
            priceShowFlag: true,  //价格预算是否展示  index(2)
            scenicShowFlag: true,  //途观景点是否展示 index(3)
        }
    },
    components: {
        ezHeader,
        ezContainer,
        ezModule,
        ezFooter,
        ezAside
    },
    created() {
        this.getLabel();
        this.getScenicByCity();
        this.getCity();
        this.selectRoute();
        this.dateInit();
        this.dayListInit();
        this.priceInit();
    },
    methods: {
        //城市改变
        cityChange(index){
            //出发城市改变
            if(index == 1){
                this.getScenicByCity()
            }
            let flag = -1;
            for (const [list,index] of this.opt) {
                if(list.key == 3){
                    this.scenicShowFlag = true;
                    this.scenicFlag = false;
                    this.scenic = [];
                    for (const iterator of Object.values(this.cityScenicList)) {
                        iterator.flag = false;
                    }
                    flag = flag;
                }
            }
            if(flag > -1){
                Vue.delete(this.opt, index);
            }
            this.selectRoute();
        },
        //删除展示数据
        delOpt: function (index) {
            if (this.opt[index].key > 3) {  //标签属性
                let index1 = this.opt[index].key - 4;
                this.lableFlagClick(1, index1);
                this.lableSure(index1, 0);
                Vue.set(this.lableList[index1], "showFlag", true);
            } else if (this.opt[index].key == 1) {  //行程天数
                this.dayShowFlag = true;
                this.dayFlag = false;
                this.day = [];
                for (const iterator of Object.values(this.dayList)) {
                    iterator.flag = false;
                }
            } else if (this.opt[index].key == 2) {  //价格预算
                this.minPrice = "";
                this.maxPrice = "";
                this.priceShowFlag = true;
                for (const iterator of Object.values(this.priceList)) {
                    iterator.flag = false;
                }
            } else if (this.opt[index].key == 3) {  //途观景点
                this.scenicShowFlag = true;
                this.scenicFlag = false;
                this.scenic = [];
                for (const iterator of Object.values(this.cityScenicList)) {
                    iterator.flag = false;
                }
            }
            Vue.delete(this.opt, index);
            this.selectRoute();
        },
        //添加已选择的数据
        addOpt: function (key, value, contentKey, contentValue) {
            let map = {};
            Vue.set(map, "key", key);
            Vue.set(map, "value", value);
            Vue.set(map, "contentKey", contentKey);
            Vue.set(map, "contentValue", contentValue);
            this.opt.push(map);
        },
        //标签点击确定  0删除  1添加 
        lableSure: function (index, type = 1) {
            this.labelAttrid = [];
            let opt = [];
            let contentKey = "";
            let contentValue = [];
            for (const [key1, value1] of Object.entries(this.lableList)) {
                if (key1 == index) contentKey = value1.content
                for (const [key2, values2] of Object.entries(value1.comTagList)) {
                    if (values2.flag) {
                        this.labelAttrid.push(values2.tagid);
                        if (key1 == index) {
                            opt.push(values2.tagid);
                            contentValue.push(values2.content);
                        }
                    }
                }
            }
            Vue.set(this.lableList[index], "lableFlag", false);
            Vue.set(this.lableList[index], "showFlag", false);
            if (type) {
                this.addOpt(index + 4, opt.join(","), contentKey, contentValue.join(","));
                console.log(this.labelAttrid);
                this.selectRoute();
            }
        },
        //点击标签属性
        lableClick: function (index1, index2) {
            Vue.set(this.lableList[index1].comTagList[index2], "flag", !this.lableList[index1].comTagList[index2].flag);
            if (this.lableList[index1].lableFlag) return;  //多选
            this.lableSure(index1);
            // this.labelAttrid = [];
            // let opt = [];
            // let contentKey = "";
            // let contentValue = [];
            // for (const [key1, value1] of Object.entries(this.lableList)) {
            //     if (key1 == index1) contentKey = value1.content
            //     for (const [key2, values2] of Object.entries(value1.comTagList)) {
            //         if (values2.flag) {
            //             this.labelAttrid.push(values2.tagid);
            //             if (key1 == index1) {
            //                 opt.push(values2.tagid);
            //                 contentValue.push(values2.content);
            //             }
            //         }
            //     }
            // }
            // Vue.set(this.lableList[index1], "showFlag", true);
            // this.addOpt(index1 + 4,opt.join(","),contentKey,contentValue.join(","));
            // console.log(this.labelAttrid);
            // this.selectRoute();
        },
        //标签多选  0点击多选 1点击取消 
        lableFlagClick: function (flag, index) {
            if (flag) {
                Vue.set(this.lableList[index], "lableFlag", false);
                for (const iterator of Object.values(this.lableList[index].comTagList)) {
                    Vue.set(iterator, "flag", false);
                }
            } else {
                Vue.set(this.lableList[index], "lableFlag", true);
            }
        },
        //途径景点确定
        scenicSure: function () {
            this.scenicShowFlag = false;
            this.scenic = [];
            let contentValue = [];
            for (const list of Object.values(this.cityScenicList)) {
                if (list.flag) {
                    this.scenic.push(list.scenicSpotid);
                    contentValue.push(list.name);
                }
            }
            let e = window.event || arguments.callee.caller.arguments[0];
            let contentKey = $(e.target).parents(".sl-wrap").children('.sl-key').text();
            this.addOpt(3, this.scenic.join(","), contentKey, contentValue.join(","));
            this.selectRoute();
        },
        //点击途径景点
        scenicClick: function (index) {
            Vue.set(this.cityScenicList[index], "flag", !this.cityScenicList[index].flag);
            if (this.scenicFlag) return;  //多选
            this.scenicShowFlag = false;
            this.scenic = [];
            for (const [key, value] of Object.entries(this.cityScenicList)) {
                if (key != index) Vue.set(value, "flag", false);
            }
            let e = window.event || arguments.callee.caller.arguments[0];
            let contentKey = $(e.target).parents(".sl-wrap").children('.sl-key').text();
            this.addOpt(3, this.cityScenicList[index].scenicSpotid, contentKey, this.cityScenicList[index].name);
            this.scenic.push(this.cityScenicList[index].scenicSpotid);
            this.selectRoute();
        },
        //点击途径景点多选  0点击多选 1点击取消 
        scenicFlagClick: function (flag) {
            if (flag) {
                this.scenicFlag = false;
                for (const iterator of Object.values(this.cityScenicList)) {
                    Vue.set(iterator, "flag", false);
                }
            } else {
                this.scenicFlag = true;
            }
        },
        //价格改变
        priceChange: function () {
            if (this.minPrice < 0) {
                this.minPrice = "";
            }
            if (this.maxPrice < 1) {
                this.maxPrice = "";
            }
            if (this.minPrice >= 0 && this.maxPrice) {
                this.selectRoute();
            }
        },
        //价格选择
        priceClick: function (index) {
            this.priceShowFlag = false;
            this.priceList[index].flag = true;
            this.maxPrice = this.priceList[index].maxPrice;
            this.minPrice = this.priceList[index].minPrice;
            let e = window.event || arguments.callee.caller.arguments[0];
            let contentKey = $(e.target).parents(".sl-wrap").children('.sl-key').text();
            this.addOpt(2, `${this.minPrice},${this.maxPrice}`, contentKey, this.priceList[index].content);
            this.selectRoute();
        },
        //价格选择初始化
        priceInit: function () {
            this.priceList = [];
            for (let k = 0; k < 4; k++) {
                let map = {};
                if (k == 0) {
                    Vue.set(map, "minPrice", 0);
                    Vue.set(map, "maxPrice", 999);
                    Vue.set(map, "content", "0-999");
                    Vue.set(map, "flag", false);
                }
                if (k == 1) {
                    Vue.set(map, "minPrice", 1000);
                    Vue.set(map, "maxPrice", 2999);
                    Vue.set(map, "content", "1000-2999");
                    Vue.set(map, "flag", false);
                }
                if (k == 2) {
                    Vue.set(map, "minPrice", 3000);
                    Vue.set(map, "maxPrice", 4999);
                    Vue.set(map, "content", "3000-4999");
                    Vue.set(map, "flag", false);
                }
                if (k == 3) {
                    Vue.set(map, "minPrice", 5000);
                    Vue.set(map, "content", "5000以上");
                    Vue.set(map, "flag", false);
                }
                this.priceList.push(map);
            }
            console.log(this.priceList);
        },
        //行程天数确定
        daySure: function () {
            this.day = [];
            let contentValue = [];
            for (const list of Object.values(this.dayList)) {
                if (list.flag) {
                    this.day.push(list.day);
                    contentValue.push(list.day >= 15 ? '15天及以上' : `${list.day}天`);
                }
            }
            let e = window.event || arguments.callee.caller.arguments[0];
            let contentKey = $(e.target).parents(".sl-wrap").children('.sl-key').text();
            this.addOpt(1, this.day.join(","), contentKey, contentValue.join(","));
            this.dayShowFlag = false;
            this.selectRoute();
        },
        //点击行程天数多选  0点击多选 1点击取消 
        dayFlagClick: function (flag) {
            if (flag) {
                this.dayFlag = false;
                for (const iterator of Object.values(this.dayList)) {
                    Vue.set(iterator, "flag", false);
                }
            } else {
                this.dayFlag = true;
            }
        },
        //点击行程天数
        tripDayClick: function (index) {
            this.dayList[index].flag = !this.dayList[index].flag;
            if (this.dayFlag) return;  //多选
            this.day = [];
            for (const [key, value] of Object.entries(this.dayList)) {
                if (key != index)
                    value.flag = false;
            }
            let e = window.event || arguments.callee.caller.arguments[0];
            let contentKey = $(e.target).parents(".sl-wrap").children('.sl-key').text();
            let contentValue = this.dayList[index].day >= 15 ? '15天及以上' : `${this.dayList[index].day}天`;
            this.addOpt(1, this.dayList[index].day, contentKey, contentValue);
            this.dayShowFlag = false;
            this.day.push(this.dayList[index].day);
            this.selectRoute();
        },
        //行程天数初始化
        dayListInit: function () {
            for (let k = 2; k <= 15; k++) {
                var map = {};
                Vue.set(map, "day", k);
                Vue.set(map, "flag", false);
                this.dayList.push(map);
            }
            console.log(this.dayList);
        },
        //处理选择时间
        dateHandle: function () {
            this.selectDate = [];
            for (const iterator of Object.values(this.dataList)) {
                let map = {};
                if (iterator.flag) {
                    map["year"] = iterator.year;
                    map["month"] = iterator.month;
                    let list = [];
                    for (const days of Object.values(iterator.days)) {
                        if (days.flag) {
                            list.push(days.day);
                        }
                    }
                    if (list) map["days"] = list.join(",");
                    console.log(map["days"]);
                    this.selectDate.push(map);
                }
            }
            this.selectRoute();
        },
        //点击天数
        dayClick: function (index) {
            this.days[index].flag = !this.days[index].flag;
            this.dataList[this.monthIndex].days = this.days;
            let flag = false;
            for (const iterator of Object.values(this.days)) {
                if (iterator.flag) {
                    flag = true;
                    break;
                }
            }
            console.log(`monthFlag-------${flag}`);
            this.dataList[this.monthIndex].flag = flag;
            this.dateHandle();
        },
        //点击月份
        monthClick: function (index) {
            this.monthIndex = index;
            this.days = this.dataList[index].days;
        },
        //获取当月总天数
        dayInit: function (year = new Date().getFullYear(), month = new Date().getMonth()) {
            let day = new Date(year, month, 0).getDate(); //当月总天数
            return day;
        },
        //出发日期初始化
        dateInit: function () {
            let currentDate = new Date();
            let year = currentDate.getFullYear();
            let month = currentDate.getMonth() + 1;
            let List = [];
            for (let i = 0; i < 12; i++) {
                if (month > 12) {
                    month = 1;
                    year++;
                }
                let map = {};
                Vue.set(map, "year", year);
                Vue.set(map, "month", month);
                Vue.set(map, "flag", false);
                let day = this.dayInit(year, month);
                let days = [];
                for (let k = 1; k <= day; k++) {
                    let map = {};
                    Vue.set(map, "day", k);
                    Vue.set(map, "flag", false);
                    days.push(map);
                }
                Vue.set(map, "days", days);
                List.push(map);
                month++;
            }
            console.log(List);
            this.dataList = List;
        },
        //点击日历
        async calendarClick(index) {
            for (const [key, value] of Object.entries(this.routeList)) {
                if (key != index) {
                    Vue.set(value, "calendarShow", false);
                } else {
                    Vue.set(value, "calendarShow", !value.calendarShow);
                }
            }
            let priceDate = calendarDate.year + "-" + (calendarDate.month > 9 ? calendarDate.month : "0" + calendarDate.month);
            console.log(priceDate);
            let nthis = $(this).parent().parent().next().next(".calendar-box");
            let list = await getRoutePriceDetails({
                routeid: this.routeList[index].routeid,
                priceDate: priceDate,
            })
             nthis.calendar({
                ele: '.date-box', //依附dom
                title: '',
                data: list
            });
        },
        //参团详情页面
        getInfor: function (id) {
            // window.location.href = `./F1-1.html?id=${id}&startCityName=${this.startCityName}`;
            this.$router.push({path:"/ruleInfo/"+id})

        },
        //修改排序方式
        orderByTypeChange: function (index) {
            if (index === 2) {
                this.orderByType = this.orderByType === 3 ? 2 : 3;
            } else {
                if (this.orderByType === index) {
                    return;
                }
                this.orderByType = index;
            }
            console.log(this.orderByType);
            this.current_page = 1;
            this.selectRoute();
        },
        //添加子评论
       async  addChildComment(id) {
            if (localStorage.getItem("login_type") != 2) {
                this.infoMsg("请登录");
                return;
            }
            if(this.content == ""){
                this.infoMsg("请输入评论内容");  return;
            }
           let data = await addChildComment({
                commentid: id,
                content: this.content,
            })
            if(data){
                this.successMsg("评论成功");
                this.content = "";
                this.getChildComment(1, 1);
            }
        },
        //点赞-取消点赞
        async digComment(id, index1, index2) {
            if (localStorage.getItem("login_type") != 2) {
                this.infoMsg("请登录");
                return;
            }
            let data =  digComment({
                typeId: id,
                digType: 1,
            })
            if (data.code) {
                Vue.set(this.routeList[index1].commentList[index2], "commentList", this.routeList[index1].commentList[index2].digNum++);
                this.successMsg("点赞成功");
            } else {
                Vue.set(this.routeList[index1].commentList[index2], "commentList", this.routeList[index1].commentList[index2].digNum--);
                this.successMsg("取消点赞成功");
            }
        },
        //初始化一级评论分页
        page1: function () {
            $('#travel-content-main-list-paging1').jqPaginator({
                totalPages: this.routeList[this.index1].pages,
                visiblePages: 6,
                currentPage: 1,
                onPageChange: function (num, type) {
                    if(type == "change"){
                        app.selectComment(2, num);
                    }
                }
            });
        },
        //初始化二级评论分页
        page2: function () {
            $('#travel-content-main-list-paging2').jqPaginator({
                totalPages: this.routeList[this.index1].commentList[app.index2].pages,
                visiblePages: 6,
                currentPage: 1,
                onPageChange: function (num, type) {
                    if(type == "change"){
                        app.getChildComment(2, num);
                    }
                }
            });
        },
        //一级评论显示隐藏
        commentNumClick: function (index1) {
            Vue.set(this.routeList[index1], "show", !this.routeList[index1].show);
            if (this.routeList[index1].show) {
                for (const [key, value] of Object.entries(this.routeList)) {
                    if (key != index1) {
                        Vue.set(value, "show", false);
                    }
                }
                this.index1 = index1;
                this.selectComment(1, 1);
            }
        },
        //二级评论显示隐藏
        subreviewClick: function (index1, index2) {
            Vue.set(this.routeList[index1].commentList[index2], "show", !this.routeList[index1].commentList[index2].show);
            if (this.routeList[index1].commentList[index2].show) {
                this.content = "";
                for (const [key, value] of Object.entries(this.routeList[index1].commentList)) {
                    if (key != index2) {
                        Vue.set(value, "show", false);
                    }
                }
                this.index2 = index2;
                this.getChildComment(1, 1);
            }
        },
        //获取子评论列表
        async getChildComment(type, pageNo) {
            let data = await getChildComment({
                commentid: this.routeList[this.index1].commentList[this.index2].commentid,
                pageNo: pageNo,
            })
            Vue.set(this.routeList[this.index1].commentList[this.index2], "commentList", data.list);
            Vue.set(this.routeList[this.index1].commentList[this.index2], "pages", data.totalPage);
            if (type == 1) {
                this.page2();
            }
        },
        //获取评论列表
        async selectComment(type, pageNo) {
            let data = await selectComment({
                pageNo: pageNo,
                typeid: this.routeList[this.index1].routeid,
                proType: 4,  //1.包车租车2.短程接送3.接送机4常规路线5.当地参团6.游轮7.景点门票
                            //8.当地玩家9.酒店10.保险11.旅游定制12导游 13.攻略评论 14.城市评论',
            })
            if(data){
                Vue.set(this.routeList[this.index1], "commentList", data.list);
                Vue.set(this.routeList[this.index1], "pages", data.totalPage);
                if (type == 1) {
                    this.page1();
                }
            }
        },
        //常规路线查询
        async selectRoute() {
            let data = await selectRoute({
                startCity: this.startCity,
                endCity: this.endCity,
                orderByType: this.orderByType,
                pageNo: this.current_page,
                // date: JSON.stringify(this.selectDate),
                day: this.day.join(","),
                maxPrice: this.maxPrice,
                minPrice: this.minPrice,
                scenic: this.scenic.join(","),
                labelAttrid: this.labelAttrid.join(","),
            },"POST")
            if(data){
                this.routeList = data.list;
                for (const list of this.routeList) {
                    if(list.carImg){
                        this.$set(list, "carImg", list.carImg.split(",")[0])
                    }
                    //解决分数是字符串报错
                     this.$set(list, "star", list.star?parseInt(list.star):0)
                }
                this.pages = data.totalPage;
            }
        },
        //获取标签属性
        async getLabel() {
            let data = await getLabel({
                routeType: 1,  //1  常规线路  2 当地参团  3 邮轮  4 景点 5 当地玩家  6 商务定制',
            })
            this.lableList = data;
            for (const iterator of Object.values(this.lableList)) {
                Vue.set(iterator, "showFlag", true);
            }
        },
        //根据城市获取景点
        async getScenicByCity() {
            this.cityScenicList = await getScenicByCity({
                cityid: this.startCity
            });
        },
        //获取全部城市
        async getCity() {
            this.cityList = await getCityList({
                cityid: this.startCity
            });
        },
        //点击上一页 下一页
        pageChange: function (index) {
            index += this.current_page;
            if (index < 1 || index > this.pages) {
                return;
            }
            this.current_page = index;
            this.selectRoute();
        },
        //选择页数
        jumpPage: function (id) {
            if (id == this.current_page) {
                return;
            }
            this.current_page = id;
            this.selectRoute();
        },
    },
    computed: {
        //出发城市名称
        startCityName(){
            if( this.cityList.length > 0)
            for (const list of this.cityList) {
                if(this.startCity == list.cityid){
                    return list.cityName;
                }
            }
        },
        //到达城市名称
        endCityName(){
            if( this.cityList.length > 0)
            for (const list of this.cityList) {
                if(this.endCity == list.cityid){
                    return list.cityName;
                }
            }
        },
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
    filters: {
        dayFilter: function (value) {
            if (!value) return;
            if (parseInt(value) < 15) return `${value}天`;
            return "15天及以上";
        },
    }
}
</script>
<style lang="less">
    .ez-conventional{
        >.ez-search-result{
            >.box-left{
                >.box-card{
                    >.box-card-text{
                        >.intro{
                            text-overflow: -o-ellipsis-lastline;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-line-clamp: 5;
                            line-clamp: 5;
                            -webkit-box-orient: vertical;
                        }
                    }
                }
            }
        }
    }
</style>

