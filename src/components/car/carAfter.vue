<template>
    <div class="banner-content" :class="{'no-top':noTop}">
        <carNav :carType = "carType" v-if="!cityid"></carNav>
        <component :is="component" :cityid="cityid"></component>
    </div>
</template>
<script>
import carNav from "components/car/carNav"
import carCharAfter from 'components/car/carCharAfter'
import carShortAfter from 'components/car/carShortAfter'
import carTranAfter from 'components/car/carTranAfter'
export default {
    name: "carAfter",
    props:{
        carType:{
            type: Number,
            default: 1
        },
        noTop:{
            type: Boolean,
            default: false,
        },
        cityid:{
            type: Number,
        }
    },
    created () {

    },
    computed: {
        //动态组件
        component(){
            let component = "carCharAfter";
            switch (this.carType) {
                case 1:  component = "carCharAfter"; break;
                case 2:  component = "carShortAfter"; break;
                case 3:  component = "carTranAfter"; break;
                default: component = "carCharAfter";  break;
                return component;
            }
            return component;
        }
    },
    components: {
        carNav,
        carCharAfter,
        carShortAfter,
        carTranAfter,
    },
}
</script>
<style lang="less" scoped>
    .no-top{
        top:0px;
    }
</style>

