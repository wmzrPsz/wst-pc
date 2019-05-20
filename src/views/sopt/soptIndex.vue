<template>
    <div>
        <ezHeader></ezHeader>
        <ezContainer></ezContainer>

    <div class="container-fluid bg-scenic bg-business-banner">
        <!--<div class="container ez-container">
            <h4 class="title text-white">【重庆之色】一次快门致岁月，一顿火锅敬自己</h4>
        </div>-->
    </div>

        <div class="container ez-container ez-search ez-scenic-search">
            <form class="ez-search-form">
                <div class="input-group input-group-lg ez-search-box">
                        <span class="input-group-addon select-scenic">
                            <a class="btn">选择景点</a>
                        </span>
                    <input type="text" v-model.trim="searchContent"  class="form-control ez-search-input search-input" placeholder="请输入景点 城市名称" aria-describedby="basic-search">
                    <a class="input-group-addon" id="basic-search" @click.stop="searchClick">
                        <i class="iconfont icon-search"></i>
                    </a>
                </div>
            </form>
            <div class="text-center text-gray hot-scenic">热门景点：
                <a class="text-gray">纽约</a>
                <a class="text-gray">洛杉矶</a>
                <a class="text-gray">华盛顿</a>
                <a class="text-gray">三亚</a>
                <a class="text-gray">泰国</a>
                <a class="text-gray">普吉岛</a>
                <a class="text-gray">新加坡</a>
            </div>

            <div class="citylist-content">
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

            <div class="search-result-content">
                <ul class="scenic-result">
                    <li>
                        <h4 class="title">东方明珠</h4>
                        <h5 class="text-gray">城市：上海</h5>
                    </li>
                    <li>
                        <h4 class="title">广州塔</h4>
                        <h5 class="text-gray">城市：广州</h5>
                    </li>
                    <li>
                        <h4 class="title">东方明珠</h4>
                        <h5 class="text-gray">城市：上海</h5>
                    </li>
                    <li>
                        <h4 class="title">广州塔</h4>
                        <h5 class="text-gray">城市：广州</h5>
                    </li>
                    <li>
                        <h4 class="title">东方明珠</h4>
                        <h5 class="text-gray">城市：上海</h5>
                    </li>
                    <li>
                        <h4 class="title">广州塔</h4>
                        <h5 class="text-gray">城市：广州</h5>
                    </li>
                </ul>
                <nav class="text-center " aria-label="Page navigation" >
                    <ul class="pagination ez-navigation">
                        <li>
                            <a href="#" class="page-next" aria-label="Previous">
                                <span aria-hidden="true">&laquo; Last</span>
                            </a>
                        </li>
                        <li><a href="#">1</a></li>
                        <li><a href="#">2</a></li>
                        <li><a href="#">3</a></li>
                        <li><a href="#">4</a></li>
                        <li><a href="#">5</a></li>
                        <li><a href="#">6</a></li>
                        <li><a href="#">...</a></li>
                        <li>
                            <a href="#" class="page-next" aria-label="Next">
                                <span aria-hidden="true">Next &raquo;</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>

        <div class="container ez-container text-darkgray">
            <ez-module html-name = "景点" html-seal = "内容模块"></ez-module>
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
export default {
    name: "",
    data() {
        return {
           searchContent: "",       //搜索内容  
        }
    },
    components: {
        ezHeader,
        ezContainer,
        ezFooter,
        ezAside,
        ezModule
    },
    created() {
        
    },
    methods: {
        //点击搜索
        searchClick:function(){
            if(this.isEmpty (this.searchContent)){
                this.infoMsg("请输入搜索内容");   
                return;
            }
            this.$router.push("soptList");
            this.$ro
        },
    },
}
</script>
