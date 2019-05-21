<template>
    <div>
       
        <ezHeader></ezHeader>
        <ezContainer></ezContainer>

<div class="banner" style="height: auto;">
    <div class="banner-img"></div>
</div>

<div class="content">
    <div class="form-group search-the-local">
        <form action="">
            <input type="text" class="form-control" v-model.trim="searchContent" placeholder="输入城市名搜索的当地玩家" >
            <i class="iconfont icon-search" @click.stop="searchClick"></i>
        </form>
    </div>

    <ez-module html-name="当地玩家" html-seal="内容模块"></ez-module>

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
import { mapState } from 'vuex'
export default {
    name: "gameIndex",
    data() {
        return {
            searchContent: "", //搜索内容
        }
    },
    components: {
        ezHeader,
        ezContainer,
        ezFooter,
        ezAside,
        ezModule
    },
    methods: {
        //点击搜索
        searchClick(){
            // if(this.isEmpty(this.searchContent)){
            //     this.infoMsg("请输入搜索内容")
            //     return
            // }
            this.$router.push({name:"gameList", params:{searchContent: this.searchContent }})
        }
    },
}
</script>
