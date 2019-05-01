<template>
    <div>
        
        <ezHeader></ezHeader>
        <ezContainer></ezContainer> 

        <div class="container ez-container ez-conventional">
            <!--<ul class="breadcrumb ez-breadcrumb">
        <li><a href="../../index.html">首页</a></li>
        <li class="active">搜索</li>
    </ul>-->

            <div class="ez-search-selector scenic-selector">
                <div id="ez-selector" class="ez-selector">
                    <div class="s-line" v-show="cityScenicShow">
                        <div class="sl-wrap">
                            <div class="sl-key">出发城市</div>
                            <div class="sl-value">
                                <div class="sl-v-list">
                                    <ul class="">
                                        <li v-for="(list, index) in cityScenic" :key="index" @click="cityScenicClick(index)">
                                            <a><i></i>{{list.cityName}}（{{list.num}}）</a>
                                        </li>
                                    </ul>
                                </div>
                                <!--<div class="sl-btns">
                            <a class="btn btn-sm ez-search-confirm" href="javascript:;">确定</a>
                            <a class="btn btn-sm ez-search-cancel" href="javascript:;">取消</a>
                        </div>-->
                            </div>
                            <div class="sl-ext">
                                <a class="sl-e-more ez-search-more pull-right" href="javascript:;">
                                    <span class="sl-btn-open">更多<i class="iconfont icon-down"></i></span>
                                    <span class="sl-btn-open" style="display: none">收起<i class="iconfont icon-up"></i></span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="s-line" v-for="(list, index1) in lableList" :key="index1" v-if="list.showFlag">
                        <div class="sl-wrap">
                            <div class="sl-key">{{list.content}}</div>
                            <div class="sl-value">
                                <div class="sl-v-list">
                                    <ul class="">
                                        <li v-for="(tag, index2) in list.comTagList" :key="index2" @click.stop="lableClick(index1,index2)">
                                            <a><i></i>{{tag.content}}</a>
                                        </li>
                                    </ul>
                                </div>
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

            <div class="ez-search-result">
                <div class="box-left pull-left">
                    <div class="box-card" v-for="(list, index) in scenicList" :key="index">
                        <div class="box-card-left pull-left" @click.stop="getInfor(list.id)">
                            <img :src="list.imgUrl | splitVc(0) |defImg">
                            <div class="box-card-rate">
                                <div class="ez-star pull-left">
                                    <img :src="list.star>index?'../../images/star-on.png':'../../images/star-off.png'"
                                        title="regular" v-for="(item, index) in 5" :key="index">
                                </div>
                                <span class="pull-right text-gray" @click.stop="commentNumClick(index)">{{list.commentNum}}条评价</span>
                            </div>
                        </div>
                        <div class="box-card-text pull-right" @click.stop="getInfor(list.id)">
                            <h4 class="title ez-mb-md">{{list.name}}</h4>
                            <h5 class="text-blue ez-mb-md">【{{list.countryName}} • {{list.cityName}}】</h5>
                            <div class="col-md-12 ez-mb-md ez-pd-0">
                                <div class="ez-icon-tag ez-mr-sm" v-for="(tag, index) in list.tagContent.split(',')"
                                    :key="index">
                                    <div class="ez-triangle-left"><i></i></div>
                                    <div class="ez-rect">{{tag}}</div>
                                </div>
                            </div>
                            <ul class="col-md-12 ez-mb-md ez-pd-0 card-info">
                                <li class="col-md-12">地址：{{list.address}}</li>
                                <li class="col-md-12">详情：{{list.content}}</li>
                            </ul>
                            <div class="card-like">
                                <span class="pull-left text-orange ez-price"><span>{{currencySign}}</span>{{list.price}}<span
                                        class="text-gray">/元起</span></span>
                            </div>
                        </div>
                        <div class="evaluation-info" :class="{'hidden-info':!list.show}" v-if="list.show">

                            <div class="travel-list-con" v-for="(comment, index1) in list.commentList" :key="index1"
                                v-if="list.commentList" style="min-height: 150px;">
                                <div class="floatl"><img :src="comment.memberPhoto?comment.memberPhoto:'../../images/news.png'"
                                        alt="用户一级评论头像"></div>
                                <div class="content floatl">
                                    <div>{{comment.memberName}}<div class="ez-star pull-right">
                                            <img :src="comment.level>index?'../../images/star-on.png':'../../images/star-off.png'"
                                                title="regular" v-for="(item, index) in 5" :key="index">
                                        </div>
                                    </div>
                                    <p>{{comment.content}}</p>
                                    <p class="pull-left"><span>{{comment.createDate}}</span></p>
                                    <p class="pull-right" @click.stop="subreviewClick(index,index1)"><i class="iconfont icon-dialog"></i><span>{{comment.childNum}}</span>
                                    </p>
                                    <p class="pull-right ez-pr-10" @click.stop="digComment(comment.commentid,index,index1)">
                                        <i class="iconfont icon-like"></i><span>{{comment.digNum}}</span>
                                    </p>
                                </div>

                                <div v-if="comment.show">
                                    <div class="erji_a">
                                        <input class="erji_b" type="text" @keyup.13="addChildComment(comment.commentid)"
                                            v-model="content" :placeholder="'回复@'+comment.memberName">
                                    </div>

                                    <div class="erji_a" v-for="(item, index) in comment.commentList" :key="index">
                                        <div class="erji_c"><img :src="item.memberPhoto?item.memberPhoto:'../../images/news.png'"
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
                    <div class="ez-aside-card">
                        <div class="aside-card-title bg-style1">
                            <h4 class="title">景点排行</h4>
                            <!--<span class="link-more">MORE>></span>-->
                        </div>
                        <div class="aside-card">
                            <div class="aside-card-no active">1</div>
                            <div class="aside-card-img">
                                <img src="../../images/news.png" class="img-responsive center-block">
                            </div>
                            <div class="aside-card-text">
                                <h5>阿拉斯加高山滑雪2日游|包接送...</h5>
                            </div>
                        </div>
                        <div class="aside-card">
                            <div class="aside-card-no">2</div>
                            <div class="aside-card-img">
                                <img src="../../images/news.png" class="img-responsive center-block">
                            </div>
                            <div class="aside-card-text">
                                <h5>阿拉斯加航空展览1日游|赠送飞行体验...</h5>
                            </div>
                        </div>
                        <div class="aside-card">
                            <div class="aside-card-no">3</div>
                            <div class="aside-card-img">
                                <img src="../../images/news.png" class="img-responsive center-block">
                            </div>
                            <div class="aside-card-text">
                                <h5>迈阿密，旧金山，夏威夷，波士顿...</h5>
                            </div>
                        </div>
                        <div class="aside-card">
                            <div class="aside-card-no">4</div>
                            <div class="aside-card-img">
                                <img src="../../images/news.png" class="img-responsive center-block">
                            </div>
                            <div class="aside-card-text">
                                <h5>墨西哥边境墙，旧金山，夏威夷，波士顿...</h5>
                            </div>
                        </div>
                        <div class="aside-card">
                            <div class="aside-card-no">5</div>
                            <div class="aside-card-img">
                                <img src="../../images/news.png" class="img-responsive center-block">
                            </div>
                            <div class="aside-card-text">
                                <h5>旧金山，夏威夷，迈阿密西海岸...</h5>
                            </div>
                        </div>
                        <div class="aside-card">
                            <div class="aside-card-no">6</div>
                            <div class="aside-card-img">
                                <img src="../../images/news.png" class="img-responsive center-block">
                            </div>
                            <div class="aside-card-text">
                                <h5>旧金山，迈阿密西海岸，波士顿...</h5>
                            </div>
                        </div>
                        <div class="aside-card">
                            <div class="aside-card-no">7</div>
                            <div class="aside-card-img">
                                <img src="../../images/news.png" class="img-responsive center-block">
                            </div>
                            <div class="aside-card-text">
                                <h5>迈阿密西海岸，旧金山，夏威夷，波士顿...</h5>
                            </div>
                        </div>
                        <div class="aside-card">
                            <div class="aside-card-no">8</div>
                            <div class="aside-card-img">
                                <img src="../../images/news.png" class="img-responsive center-block">
                            </div>
                            <div class="aside-card-text">
                                <h5>迈阿密西海岸，旧金山，夏威夷，波士顿...</h5>
                            </div>
                        </div>
                    </div>
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
import { mapState, mapMutations } from "vuex";
import {
    addChildComment,
    digCommentUrl,
    getChildComment,
    selectComment,
    selectScenicList,
    getCityScenicNum,
    getLabel,
} from "getData"
export default {
    name: "soptList",
    data() {
        return {
            cityid: "",  //城市ID
            orderByType: "",  //1.销量2.价格降序3.价格升序4好评
            current_page: 1, //当前页
            pages: "", //总页数
            scenicList: [],  //景点list
            cityScenic: [],  //城市景点
            cityScenicShow: true,  //城市选择是否显示
            lableList: [],  //标签属性
            labelAttrid: [],  //选择的标签属性ID
            opt: [],  //展示已选择的
            index1: "",  //评论下标
            index2: "",  //子评论下标
            content: "",  //评论的内容
        }
    },
    created () {
            this.selectScenicList();
            this.getLabel();
            this.getCityScenicNum();
    },
    components: {
        ezHeader,
        ezContainer,
        ezFooter,
        ezAside
    },
    methods: {
        ...mapMutations(["loginFlagChange"]),
        //添加子评论
        addChildComment: function (id) {
            if(this.loginType == 1){
                this.loginFlagChange(1);
                return;
            }
            if(this.content == ""){
                layerMsg("请输入评论内容");  return;
            }
            requestGet(addChildCommentUrl, {
                commentid: id,
                content: this.content,
            }, function (data) {
                layerMsg("评论成功");
                app.content = "";
                app.getChildComment(1, 1);
            })
        },
        //点赞-取消点赞
        digComment: function (id, index1, index2) {
            if (localStorage.getItem("login_type") != 2) {
                layerMsg("请登录");
                return;
            }
            requestGet(digCommentUrl, {
                typeId: id,
                digType: 1,
            }, function (data) {
                if (data.body.code) {
                    Vue.set(app.scenicList[index1].commentList[index2], "commentList", app.scenicList[index1].commentList[index2].digNum++);
                    layerMsg("点赞成功");
                } else {
                    Vue.set(app.scenicList[index1].commentList[index2], "commentList", app.scenicList[index1].commentList[index2].digNum--);
                    layerMsg("取消点赞成功");
                }
            });
        },
        //初始化一级评论分页
        page1: function () {
            $('#travel-content-main-list-paging1').jqPaginator({
                totalPages: this.scenicList[this.index1].pages,
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
                totalPages: this.scenicList[this.index1].commentList[app.index2].pages,
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
            Vue.set(this.scenicList[index1], "show", !this.scenicList[index1].show);
            if (this.scenicList[index1].show) {
                for (const [key, value] of Object.entries(this.scenicList)) {
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
            Vue.set(this.scenicList[index1].commentList[index2], "show", !this.scenicList[index1].commentList[index2].show);
            if (this.scenicList[index1].commentList[index2].show) {
                this.content = "";
                for (const [key, value] of Object.entries(this.scenicList[index1].commentList)) {
                    if (key != index2) {
                        Vue.set(value, "show", false);
                    }
                }
                this.index2 = index2;
                this.getChildComment(1, 1);
            }
        },
        //获取子评论列表
        getChildComment: function (type, pageNo) {
            requestGet(getChildCommentUrl, {
                commentid: this.scenicList[this.index1].commentList[this.index2].commentid,
                pageNo: pageNo,
            }, function (data) {
                Vue.set(app.scenicList[app.index1].commentList[app.index2], "commentList", data.body.list);
                Vue.set(app.scenicList[app.index1].commentList[app.index2], "pages", data.body.totalPage);
                if (type == 1) {
                    app.page2();
                }
            });
        },
        //获取评论列表
        selectComment: function (type, pageNo) {
            requestGet(selectCommentUrl, {
                pageNo: pageNo,
                typeid: this.scenicList[this.index1].id,
                proType: 7,  //1.包车租车2.短程接送3.接送机4常规路线5.当地参团6.游轮7.景点门票
                //8.当地玩家9.酒店10.保险11.旅游定制12导游 13.攻略评论 14.城市评论',
            }, function (data) {
                Vue.set(app.scenicList[app.index1], "commentList", data.body.list);
                Vue.set(app.scenicList[app.index1], "pages", data.body.totalPage);
                if (type == 1) {
                    app.page1();
                }
            });
        },
        //景点详情
        getInfor: function (id) {
            location.href = `./L1-3-1.html?id=${id}`;
        },
        //点击城市
        cityScenicClick: function (index) {
            this.cityid = this.cityScenic[index].cityid;
            this.cityScenicShow = false;
            let e = window.event || arguments.callee.caller.arguments[0];
            let contentKey = $(e.target).parents(".sl-wrap").children('.sl-key').text();
            this.addOpt(0, this.cityid, contentKey, this.cityScenic[index].cityName);
            this.selectScenicList();
        },
        //删除展示数据
        delOpt: function (index) {
            if (this.opt[index].key > 0) {  //标签属性
                let index1 = this.opt[index].key - 1;
                Vue.set(this.lableList[index1], "showFlag", true);
                for (const [key, value] of Object.entries(this.labelAttrid)) {
                    if (value == this.opt[index].value)
                        Vue.delete(this.labelAttrid, key);
                }
            } else {  //城市
                this.cityScenicShow = true;
                this.cityid = "";
            }
            Vue.delete(this.opt, index);
            this.selectScenicList();
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
        //点击自定义标签
        lableClick: function (index1, index2) {
            let key = 1 + index1;
            let value = this.lableList[index1].comTagList[index2].tagid;
            let contentKey = this.lableList[index1].content;
            let contentValue = this.lableList[index1].comTagList[index2].content;
            this.labelAttrid.push(value);
            this.addOpt(key, value, contentKey, contentValue);
            Vue.set(this.lableList[index1], "showFlag", false);
            this.selectScenicList();
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
            this.selectScenicList();
        },
        //景点搜索
        selectScenicList: function () {
            requestGet(selectScenicListUrl, {
                cityid: this.cityid,
                labelAttrid: this.labelAttrid.join(","),
                pageNo: this.current_page,
                orderByType: this.orderByType,
            }, function (data) {
                app.pages = data.body.totalPage;
                app.scenicList = data.body.list;
            });
        },
        //获取城市景点
        getCityScenicNum: function () {
            requestGet(getCityScenicNumUrl, {
            }, function (data) {
                app.cityScenic = data.body.list;
            });
        },
        //获取标签属性
        getLabel: function () {
            requestGet(getLabelUrl, {
                routeType: 4,  //1  常规线路  2 当地参团  3 邮轮  4 景点 5 当地玩家  6 商务定制',
            }, function (data) {
                app.lableList = data.body.list;
                for (const iterator of Object.values(app.lableList)) {
                    Vue.set(iterator, "showFlag", true);
                }
            });
        },
        //点击上一页 下一页
        pageChange: function (index) {
            index += this.current_page;
            if (index < 1 || index > this.pages) {
                return;
            }
            this.current_page = index;
            this.selectScenicList();
        },
        //选择页数
        jumpPage: function (id) {
            if (id == this.current_page) {
                return;
            }
            this.current_page = id;
            this.selectScenicList();
        },
    },
    computed: {
        ...mapState([ "currencySign", "loginType"]),
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
