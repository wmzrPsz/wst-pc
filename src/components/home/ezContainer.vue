<template>
    <div class="container ez-container ez-main-nav">
        <ul class="list-inline text-center ez-navlist">
            <li v-for="(list,index) in comNavigationList" :key="index" :class="{'active':list.flag}" @click="comNavigationClick(list)">
            <!-- <a :href="list.link">{{list.name}}</a> -->
            <a>{{list.name}}</a>
        </li>
    </ul>

    <div class="text-center btn-more" style="display: none;">
        <a class="btn ez-btn ez-nav-open">查看更多 <i class="iconfont icon-down"></i></a>
        <a class="btn ez-btn ez-nav-close" style="display: none;">收起 <i class="iconfont icon-up"></i></a>
    </div>

    <ul class="list-inline ez-citylist">
        <li v-for="(list, index) in hotCityList" :key="index" :class="{'active':list.flag}" @click="hotCityListClick(list)">
        <!-- <a :href="list.link">{{list.cityName}}</a> -->
        <a>{{list.cityName}}</a>
    </li>
</ul>
</div>
</template>
<script>
import { mapState, mapMutations} from "vuex";
export default {
    name: "ezContainer",
    data(){
        return {
        }
    },
    computed: {
        ...mapState(["hotCityList", "comNavigationList" ]),
    },
    methods: {
        ...mapMutations(["setHotCityListIndex", "setComNavigationIndex"]),
        //点击城市
        hotCityListClick(city){
            this.setHotCityListIndex(city.cityid);
            this.$router.push("/city/cityInfo/"+city.cityid)
        },
        //点击导航栏
        comNavigationClick(list){
            this.setComNavigationIndex(list.id);
            this.$router.push("/"+list.link)
        },
    },
}
</script>
