<template>
    <div>
        
        <ez-header></ez-header>
        <ez-container></ez-container>

<!--content-->
<div class="container-fluid ez-index-wrap bg-business bg-business-banner">
    <div class="container ez-container">
        <h4 class="title text-white">【重庆之色】一次快门致岁月，一顿火锅敬自己</h4>
    </div>
</div>

<div class="container ez-container ez-index-wrap ez-business-custom main_content">
    <div class="text-center">
        <div class="ez-content-title">
            <div class="title-icon title-icon-left"></div>
            <div class="content-title">定制</div>
            <div class="title-icon title-icon-right"></div>
        </div>
        <div class="ez-content-subtitle">
            <div class="subtitle-text">CUSTOM-MADE</div>
        </div>
    </div>

    <div class="row text-center custom-wrap">
        <div class="col-md-4 col-sm-4 col-xs-4">
            <a @click="goToTreav(2)"><img src="~images/index-1-1.png" class="center-block img-responsive"></a>
            <div class="custom-wrap-text">
                <h4 class="title text-darkgray">商务定制计划</h4>
                <p class="content text-darkgray">为你推荐优秀的定制方案</p>
            </div>
        </div>
        <div class="col-md-4 col-sm-4 col-xs-4">
            <a @click="goToTreav(1)"><img src="~images/business-2.png" class="center-block img-responsive"></a>
            <div class="custom-wrap-text">
                <h4 class="title text-darkgray">旅游定制计划</h4>
                <p class="content text-darkgray">为你推荐优秀的定制方案</p>
            </div>
        </div>
        <div class="col-md-4 col-sm-4 col-xs-4">
            <a @click="goToTreav(3)"><img src="~images/business-3.png" class="center-block img-responsive"></a>
            <div class="custom-wrap-text">
                <h4 class="title text-darkgray">商务+旅游定制计划</h4>
                <p class="content text-darkgray">为你推荐优秀的定制方案</p>
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
import ezModule from "components/home/ezModule"
import { mapMutations } from ''
export default {
    name: "tourIndex",
    data() {
        return {
            
        }
    },
    components: {
        ezHeader,
        ezContainer,
        ezFooter,
        ezAside,
        ezModule,
    },
    methods:{
        ...mapMutations(["tourTypeSet"]),
        goToTreav:function(index){
            this.tourTypeSet(index);
            this.$rputer.push("tourInfo");
        },
    }
}
</script>
