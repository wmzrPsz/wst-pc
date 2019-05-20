<template>
    <div>

        <ezHeader></ezHeader>
        <ezContainer></ezContainer>

        <!--content-->
        <div class="banner">
            <div class="banner-img"><p>【奥斯卡级】大佬圣诞节拉伸角度看</p></div>
           <carAfter :carType="2"></carAfter>
        </div>
        <div class="content ez-travel-attractions">
        <div class="container ez-container">
        <!--part20 推荐景点 start-->
        <ez-module html-name = "短程接送" html-seal = "内容模块"></ez-module>
                <!--part20 end-->
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
import carAfter from "components/car/carAfter"
export default {
    name: "carIndex",
    components: {
        ezHeader,
        ezContainer,
        ezFooter,
        ezAside,
        ezModule,
        carAfter,
    },
}
</script>

