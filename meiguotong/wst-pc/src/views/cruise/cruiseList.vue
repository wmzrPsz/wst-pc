<template>
    <div>
        
        <ez-header></ez-header>
        <ez-container></ez-container>

        <!--content-->
        <div class="container ez-container ez-conventional">


            <div class="ez-search-selector" style="border:1px solid gainsboro; border-bottom: none;">

                <div id="ez-selector" class="ez-selector">
                    <div class="s-line" v-show="cityShowFlag">
                        <div class="sl-wrap" :class="cityFlag?'multiple extend':''">
                            <div class="sl-key">出发城市</div>
                            <div class="sl-value">
                                <div class="sl-v-list">
                                    <ul class="">
                                        <li v-for="(list, index) in cityList" :key="index" :class="list.flag?'selected':''"
                                            @click.stop="cityClick(index)">
                                            <a><i></i>{{list.cityName}}</a>
                                        </li>
                                    </ul>
                                </div>
                                <div class="sl-btns">
                                    <a class="btn btn-sm ez-search-confirm" href="javascript:;" @click.stop="citySure">确定</a>
                                    <a class="btn btn-sm ez-search-cancel" href="javascript:;" @click.stop="cityFlagClick(false)">取消</a>
                                </div>
                            </div>
                            <div class="sl-ext">
                                <a class="sl-e-more ez-search-more" href="javascript:;">
                                    <span class="sl-btn-open">更多<i class="iconfont icon-down"></i></span>
                                    <span class="sl-btn-open" style="display: none">收起<i class="iconfont icon-up"></i></span>
                                </a>
                                <a class="sl-e-multiple ez-search-multiple pull-right" :class="cityFlag?'active':''"
                                    @click.stop="cityFlagClick(true)">
                                    <i class="iconfont icon-add"></i>多选
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="s-line" v-show="courseShowFlag">
                        <div class="sl-wrap" :class="courseFlag?'multiple extend':''">
                            <div class="sl-key">邮轮航线</div>
                            <div class="sl-value">
                                <div class="sl-v-list">
                                    <ul class="">
                                        <li v-for="(list, index) in courseList" :key="index" :class="list.flag?'selected':''"
                                            @click.stop="courseClick(index)">
                                            <a><i></i>{{list.name}}</a>
                                        </li>
                                    </ul>
                                </div>
                                <div class="sl-btns">
                                    <a class="btn btn-sm ez-search-confirm" href="javascript:;" @click.stop="courseSure">确定</a>
                                    <a class="btn btn-sm ez-search-cancel" href="javascript:;" @click.stop="courseFlagClick(false)">取消</a>
                                </div>
                            </div>
                            <div class="sl-ext">
                                <a class="sl-e-more ez-search-more" href="javascript:;">
                                    <span class="sl-btn-open">更多<i class="iconfont icon-down"></i></span>
                                    <span class="sl-btn-open" style="display: none">收起<i class="iconfont icon-up"></i></span>
                                </a>
                                <a class="sl-e-multiple ez-search-multiple pull-right" :class="courseFlag?'active':''"
                                    @click.stop="courseFlagClick(true)">
                                    <i class="iconfont icon-add"></i>多选
                                </a>
                            </div>
                        </div>
                    </div>
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
                                    <ul class="">
                                        <li v-for="(day, index) in dayList" :key="index" :class="day.flag?'selected':''"
                                            @click.stop="tripDayClick(index)">
                                            <a><i></i>{{day.dayContent}}</a>
                                        </li>
                                    </ul>
                                </div>
                                <div class="sl-btns">
                                    <a class="btn btn-sm ez-search-confirm" href="javascript:;" @click.stop="daySure">确定</a>
                                    <a class="btn btn-sm ez-search-cancel" href="javascript:;" @click.stop="dayFlagClick(false)">取消</a>
                                </div>
                            </div>
                            <div class="sl-ext">
                                <a class="sl-e-more ez-search-more" href="javascript:;">
                                    <span class="sl-btn-open">更多<i class="iconfont icon-down"></i></span>
                                    <span class="sl-btn-open" style="display: none">收起<i class="iconfont icon-up"></i></span>
                                </a>
                                <a class="sl-e-multiple ez-search-multiple pull-right" :class="dayFlag?'active':''"
                                    @click.stop="dayFlagClick(true)">
                                    <i class="iconfont icon-add"></i>多选
                                </a>
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
                            <li :class="{'active': !orderByType}" @click.stop="orderByTypeChange('')"><a class="btn ez-btn-sort">综合</a></li>
                            <li :class="{'active': orderByType == 1}" @click.stop="orderByTypeChange(1)"><a class="btn ez-btn-sort">销量</a></li>
                            <li :class="{'active': orderByType == 2 || orderByType == 3}" @click.stop="orderByTypeChange(2)">
                                <a class="btn ez-btn-sort">价格<i class="caret" :class="{'caret-up':orderByType==3}"></i></a>
                            </li>
                            <li :class="{'active': orderByType == 4}" @click.stop="orderByTypeChange(4)"><a class="btn ez-btn-sort">评论</a></li>
                    </ul>
                </div>
            </div>

            <div class="container ez-container ez-search-result">
                <div class="box-left pull-left">
                    <div class="box-card" v-for="(list, index) in linerList" :key="index" @click.stop="getInfor(list.id)">
                        <div class="box-card-left pull-left">
                            <img v-lazy="list.imgUrl" :key="list.imgUrl">
                            <div class="box-card-rate">
                                <div class="ez-star pull-left">
                                    <!-- <img :src="list.star>index?'~images/star-on.png':'~images/star-off.png'"
                                        title="regular" v-for="(item, index) in 5" :key="index"> -->
                                    <el-rate v-model.number="list.star" disabled/>
                                </div>
                                <span class="pull-right text-gray" @click.stop="commentNumClick(index)">{{list.commentNum}}条评价</span>
                            </div>
                        </div>
                        <div class="box-card-text pull-right">
                            <h4 class="title ez-mb-md">{{list.name}}</h4>
                            <div class="col-md-12 ez-mb-md ez-pd-0">
                                <div class="ez-icon-tag ez-mr-sm" v-for="tag in list.tagContent" :key="tag">
                                    <div class="ez-triangle-left"><i></i></div>
                                    <div class="ez-rect">{{tag}}</div>
                                </div>
                            </div>
                            <p class="ez-mb-md card-msg">
                                <span class="text-blue ez-mr-sm">{{list.startCityName}}上船</span><span>{{list.infor}}</span>
                            </p>
                            <ul class="col-md-12 ez-mb-md ez-pd-0 card-info">
                                <li class="col-md-12">邮轮航线：{{list.route}}</li>
                                <li class="col-md-12">出发日期：{{list.startDate}}</li>
                            </ul>
                            <div class="card-like">
                                <span class="pull-left text-orange ez-price"><span>{{currencySign}}</span>{{list.price}}<span
                                        class="text-gray">/元起</span></span>
                            </div>
                        </div>
                        <div class="evaluation-info" :class="{'hidden-info':!list.show}" v-if="list.show">

                            <div class="travel-list-con" v-for="(comment, index1) in list.commentList" :key="index1"
                                v-if="list.commentList" style="min-height: 150px;">
                                <div class="floatl"><img :src="comment.memberPhoto?comment.memberPhoto:'~images/news.png'"
                                        alt="用户一级评论头像"></div>
                                <div class="content floatl">
                                    <div>{{comment.memberName}}<div class="ez-star pull-right">
                                            <img :src="comment.level>index2?'~images/star-on.png':'~images/star-off.png'"
                                                title="regular" v-for="(item, index2) in 5" :key="index2">
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
                                            v-model.trim="content" :placeholder="'回复@'+comment.memberName">
                                    </div>

                                    <div class="erji_a" v-for="(item, index2) in comment.commentList" :key="index2">
                                        <div class="erji_c"><img :src="item.memberPhoto?item.memberPhoto:'~images/news.png'"
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

                <nav class="text-center text-center col-lg-9 col-md-9 col-sm-9" v-show="show">
                    <ul class="pagination ez-navigation">
                        <li @click.stop="pageChange(-1)">
                            <a class="page-next" aria-label="Next" style="margin-right: 10px;">
                                <span aria-hidden="true">上一页 &gt;</span>
                            </a>
                        </li>
                        <li v-show="current_page>5" @click.stop="jumpPage(1)"><a href="#">1</a></li>
                        <li v-show="efont"><a>...</a></li>
                        <li v-for="num in indexs" :class="{active:current_page==num}" @click.stop="jumpPage(num)"><a>{{num}}</a></li>
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

        <ez-footer></ez-footer>
        <ez-aside></ez-aside>

    </div>
</template>
<script>
import ezHeader from "components/home/ezHeader"
import ezContainer from "components/home/ezContainer"
import ezFooter from "components/home/ezFooter"
import ezAside from "components/home/ezAside"
import ezModule from "components/home/ezModule"
import { mapState, mapMutations } from "vuex";
import {
    addChildComment,
    digComment,
    getChildComment,
    selectComment,
    getLabel,
    cruiseScreen,
    getCityList,
    getCourse,
} from 'getData'
export default {
    data() {
        return {
            linerList: [],  //路线List
            current_page: 1,  //当前页
            pages: 1,  //总页数
            index1: "",  //评论下标
            index2: "",  //子评论下标
            content: "",  //评论的内容
            orderByType: "",  //1.销量2.价格降序3.价格升序4好评 “”综合
            searchContent: localStorage.getItem("searchContent"), //搜索内容
            searchType: localStorage.getItem("searchType"), //搜索type   0.搜索内容  1邮轮 2航线  3目的地  4出发港口
            searchTypeid: localStorage.getItem("searchTypeid"), //搜索typeid
            searchCityid: localStorage.getItem("searchCityid"), //搜索城市ID
            lableList: [],  //标签属性
            cityList: [],  //出发城市
            courseList: [],  //邮轮航线
            dataList: [],  //出发日期
            dayList: [],  //行程天数
            cityShowFlag: true,   //出发城市是否展示 
            cityFlag: false,  //出发城市是否多选
            courseShowFlag: true,    //邮轮航线是否展示 
            courseFlag: false,  //邮轮航线是否多选
            dayShowFlag: true,  //行程天数是否展示 
            dayFlag: false,  //行程天数是否多选
            monthIndex: "",  //展示的月份下标
            days: [],  //展示的天数
            startDate: [], //选择的时间  [{year:”2018”,month:”05”,days:”05,06”},{}]
            day: [],  //选择行程天数
            startCity: [],  //出发城市ID
            route: [],  //航线ID
            labelAttrid: [],  //选择的标签属性ID
            opt: [],  //页面展示选择的数据
        }
    },
    components: {
        ezHeader,
        ezContainer,
        ezFooter,
        ezAside
    },
    created() {
        this.getCity();
        this.getCourse();
        this.getLabel();
        this.dateInit();
        this.dayListInit();
        this.getData();
    },
    methods: {
        ...mapMutations(["loginFlagChange"]),
        //跳转详情
        getInfor:function(id){
            this.$router.push(`/cruise/cruiseInfo/${id}`)
        },
        //删除展示数据
        delOpt: function (index) {
            if (this.opt[index].key > 4) {  //标签属性
                let index1 = this.opt[index].key - 5;
                this.lableFlagClick(1, index1);
                this.lableSure(index1, 0);
                Vue.set(this.lableList[index1], "showFlag", true);
            } else if (this.opt[index].key == 1) {  //城市
                this.cityShowFlag = true;
                this.cityFlag = false;
                this.day = [];
                for (const iterator of Object.values(this.cityList)) {
                    Vue.set(iterator, "flag", false);
                }
            } else if (this.opt[index].key == 2) {  //航线 
                this.courseShowFlag = true;
                this.courseFlag = false;
                this.route = [];
                for (const iterator of Object.values(this.courseList)) {
                    Vue.set(iterator, "flag", false);
                }
            }else if(this.opt[index].key == 3){  //行程天数
                this.dayShowFlag = true;
                this.dayFlag = false;
                this.day = [];
                for (const iterator of Object.values(this.dayList)) {
                    iterator.flag = false;
                }
            }
            Vue.delete(this.opt, index);
            this.getData(1);
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
                this.addOpt(index + 5, opt.join(","), contentKey, contentValue.join(","));
                console.log(this.labelAttrid);
                this.getData(1);
            }
        },
        //点击标签属性
        lableClick: function (index1, index2) {
            Vue.set(this.lableList[index1].comTagList[index2], "flag", !this.lableList[index1].comTagList[index2].flag);
            if (this.lableList[index1].lableFlag) return;  //多选
            this.lableSure(index1);
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
        //行程天数确定
        daySure: function () {
            this.day = [];
            let contentValue = [];
            for (const list of Object.values(this.dayList)) {
                if (list.flag) {
                    this.day.push(list.day);
                    contentValue.push(list.dayContent);
                }
            }
            let e = window.event || arguments.callee.caller.arguments[0];
            let contentKey = $(e.target).parents(".sl-wrap").children('.sl-key').text();
            this.addOpt(3, this.day.join(","), contentKey, contentValue.join(","));
            this.dayShowFlag = false;
            this.getData(1);
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
            let contentValue = this.dayList[index].dayContent;
            this.addOpt(3, this.dayList[index].day, contentKey, contentValue);
            this.dayShowFlag = false;
            this.day.push(this.dayList[index].day);
            this.getData(1);
        },
        //点击行程天数多选取消多选
        dayFlagClick: function (flag) {
            this.dayFlag = flag;
            if (!flag) {
                for (const iterator of Object.values(this.dayList)) {
                    Vue.set(iterator, "flag", false);
                }
            }
        },
        //城市确定
        citySure: function () {
            this.startCity = [];
            let contentValue = [];
            for (const list of Object.values(this.cityList)) {
                if (list.flag) {
                    this.startCity.push(list.cityid);
                    contentValue.push(list.cityName);
                }
            }
            let e = window.event || arguments.callee.caller.arguments[0];
            let contentKey = $(e.target).parents(".sl-wrap").children('.sl-key').text();
            this.addOpt(1, this.day.join(","), contentKey, contentValue.join(","));
            this.cityShowFlag = false;
            this.getData(1);
        },
        //航线确定
        courseSure: function () {
            this.route = [];
            let contentValue = [];
            for (const list of Object.values(this.courseList)) {
                if (list.flag) {
                    this.route.push(list.id);
                    contentValue.push(list.name);
                }
            }
            let e = window.event || arguments.callee.caller.arguments[0];
            let contentKey = $(e.target).parents(".sl-wrap").children('.sl-key').text();
            this.addOpt(2, this.day.join(","), contentKey, contentValue.join(","));
            this.courseShowFlag = false;
            this.getData(1);
        },
        //点击城市
        cityClick: function (index) {
            Vue.set(this.cityList[index], "flag", !this.cityList[index].flag);
            if (this.cityFlag) return;  //多选
            this.startCity = [];
            for (const [key, value] of Object.entries(this.cityList)) {
                if (key != index)
                    Vue.set(value, "flag", false);
            }
            let e = window.event || arguments.callee.caller.arguments[0];
            let contentKey = $(e.target).parents(".sl-wrap").children('.sl-key').text();
            this.addOpt(1, this.cityList[index].cityid, contentKey, this.cityList[index].cityName);
            this.cityShowFlag = false;
            this.startCity.push(this.cityList[index].cityid);
            this.getData(1);
        },
        //点击航线
        courseClick: function (index) {
            Vue.set(this.courseList[index], "flag", !this.courseList[index].flag);
            if (this.courseFlag) return;  //多选
            this.route = [];
            for (const [key, value] of Object.entries(this.courseList)) {
                if (key != index)
                    Vue.set(value, "flag", false);
            }
            let e = window.event || arguments.callee.caller.arguments[0];
            let contentKey = $(e.target).parents(".sl-wrap").children('.sl-key').text();
            this.addOpt(2, this.courseList[index].id, contentKey, this.courseList[index].name);
            this.courseShowFlag = false;
            this.route.push(this.courseList[index].id);
            this.getData(1);
        },
        //城市多选点击 取消多选
        cityFlagClick: function (flag) {
            this.cityFlag = flag;
            if (!flag) {
                for (const iterator of Object.values(this.cityList)) {
                    Vue.set(iterator, "flag", false);
                }
            }
        },
        //航线多选点击 取消多选
        courseFlagClick: function (flag) {
            this.courseFlag = flag;
            if (!flag) {
                for (const iterator of Object.values(this.courseList)) {
                    Vue.set(iterator, "flag", false);
                }
            }
        },
        //行程天数初始化
        dayListInit: function () {
            let dayList = [];
            for (let k = 2; k <= 15; k++) {
                var map = {};
                Vue.set(map, "dayContent", k < 15 ? k + "天" : "15天及以上");
                Vue.set(map, "day", k);
                Vue.set(map, "flag", false);
                dayList.push(map);
            }
            this.dayList = dayList;
            console.log(this.dayList);
        },
        //处理选择时间
        dateHandle: function () {
            this.startDate = [];
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
                    this.startDate.push(map);
                }
            }
            this.getData(1);
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
            this.getData();
        },
        //添加子评论
        async addChildComment(id) {
            if(this.loginType == 1){
                this.loginFlagChange(1);
                return;
            }
            if(this.isEmpty (this.content)){
                this.infoMsg("请输入评论内容");  
                return;
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
            if(this.loginType == 1){
                this.loginFlagChange(1);
                return;
            }
            let data =  digComment({
                typeId: id,
                digType: 1,
            })
            if (data.code) {
                Vue.set(this.scenicList[index1].commentList[index2], "commentList", this.scenicList[index1].commentList[index2].digNum++);
                this.successMsg("点赞成功");
            } else {
                Vue.set(this.scenicList[index1].commentList[index2], "commentList", this.scenicList[index1].commentList[index2].digNum--);
                this.successMsg("取消点赞成功");
            }
        },
        //初始化一级评论分页
        page1: function () {
            $('#travel-content-main-list-paging1').jqPaginator({
                totalPages: this.linerList[this.index1].pages,
                visiblePages: 6,
                currentPage: 1,
                onPageChange: function (num, type) {
                    if(type == "change"){
                        this.selectComment(2, num);
                    }
                }
            });
        },
        //初始化二级评论分页
        page2: function () {
            $('#travel-content-main-list-paging2').jqPaginator({
                totalPages: this.linerList[this.index1].commentList[this.index2].pages,
                visiblePages: 6,
                currentPage: 1,
                onPageChange: function (num, type) {
                    if(type == "change"){
                        this.getChildComment(2, num);
                    }
                }
            });
        },
        //一级评论显示隐藏
        commentNumClick: function (index1) {
            Vue.set(this.linerList[index1], "show", !this.linerList[index1].show);
            if (this.linerList[index1].show) {
                for (const [key, value] of Object.entries(this.linerList)) {
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
            Vue.set(this.linerList[index1].commentList[index2], "show", !this.linerList[index1].commentList[index2].show);
            if (this.linerList[index1].commentList[index2].show) {
                this.content = "";
                for (const [key, value] of Object.entries(this.linerList[index1].commentList)) {
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
                commentid: this.linerList[this.index1].commentList[this.index2].commentid,
                pageNo: pageNo,
            })
            if(data){
                Vue.set(this.linerList[this.index1].commentList[this.index2], "commentList", data.list);
                Vue.set(this.linerList[this.index1].commentList[this.index2], "pages", data.totalPage);
                if (type == 1) {
                    this.page2();
                }
            }
        },
        //获取评论列表
        async selectComment(type, pageNo) {
            let data = await selectComment({
                pageNo: pageNo,
                typeid: this.linerList[this.index1].id,
                proType: 6,  //1.包车租车2.短程接送3.接送机4常规路线5.当地参团6.游轮7.景点门票
                //8.当地玩家9.酒店10.保险11.旅游定制12导游 13.攻略评论 14.城市评论',
            })
            if(data){
              Vue.set(this.linerList[this.index1], "commentList", data.list);
                Vue.set(this.linerList[this.index1], "pages", data.totalPage);
                if (type == 1) {
                    this.page1();
                }
            }
        },
        //获取标签属性
        async getLabel() {
            let data = await getLabel({
                routeType: 3, //1  常规线路  2 当地参团  3 邮轮  4 景点 5 当地玩家  6 商务定制',
            })
            if(data){
                this.lableList = data;
                for (const list of Object.values(this.lableList)) {
                    Vue.set(list, "showFlag", true);
                }
            }
        },
        //查询游轮路线
        async getData(pageNo = this.current_page) {
            this.current_page = pageNo;
            let data = await cruiseScreen({
                portid:this.searchType==4?this.searchTypeid:"",   //出发港口
                linerid:this.searchType==1?this.searchTypeid:"",   //邮轮ID
                startCity: this.startCity.join(","),
                route: this.route.join(","),
                startDate: JSON.stringify(this.startDate),
                day: this.day.join(","),
                labelAttrid: this.labelAttrid.join(","),
                pageNo: pageNo,
                orderByType: this.orderByType,
                searchContent: this.searchContent,
            },"post")
            if(data){
                this.linerList = data.list;
                for (const list of this.linerList) {
                    if(list.imgUrl){
                        this.$set(list, "imgUrl", list.imgUrl.split(",")[0])
                    }
                    this.$set(list, "tagContent", list.tagContent?list.tagContent.split(","):[])
                    //解决分数是字符串报错
                    this.$set(list, "star", list.star?parseInt(list.star):0)
                }
                this.pages = data.totalPage;
            }
        },
        //获取全部城市
        async getCity () {
            let data = await getCityList()
            if(data){
                 this.cityList = data;
                if (this.searchCityid) {
                    for (const [key,list] of Object.entries(this.cityList)) {
                        if (list.cityid == this.searchCityid) {
                            this.cityClick(key);
                            return;
                        }
                    }
                }
            }
        },
        //获取邮轮航线
        async getCourse() {
            let data = await getCourse()
            if(data){
                this.courseList = data;
                if (this.searchType == 2) {
                    for (const [key,list] of Object.entries(this.courseList)) {
                        if (list.searchTypeid == list.id) {
                            this.courseClick(key);
                            return;
                        }
                    }
                }
            }
        },
        //点击上一页 下一页
        pageChange: function (index) {
            index += this.current_page;
            if (index < 1 || index > this.pages) {
                return;
            }
            this.current_page = index;
            this.getData();
        },
        //选择页数
        jumpPage: function (id) {
            if (id == this.current_page) {
                return;
            }
            this.current_page = id;
            this.getData();
        },
    },
    computed: {
        ...mapState([ "currencySign", "loginType"]),
        show: function () {
            return this.pages && this.pages != 1;
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
