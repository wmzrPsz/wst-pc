<template>
    <div>

    <ezHeader></ezHeader>
    <ezContainer></ezContainer>

    <!--content-->
    <div class="content ez-travel-complete">
        <div class="content-order">
        <orderIcon :orderIconType="3"></orderIcon>

            <div class="content-order-info">
                <div class="content-order-details">
                    <div class="content-order-details-top">
                        <p><i class="iconfont icon-dagou"></i></p>
                        <p>行程预定成功！</p>
                        <p>我们将安排好您的行程后，短信或邮箱通知您。</p>
                    </div>
                    <div class="content-order-details-btn">
                        <router-link :to="{ name: 'myorder'}" tag="div" >查看订单</router-link>
                        <router-link :to="{ path: 'game'}" tag="div" >返回当地玩家</router-link>
                    </div>
                    <p>如有疑问,请致电话{{comProtocol.phone}}</p>
                </div>
            </div>
        </div>
    </div>

     <ezWebsite></ezWebsite>

    </div>
</template>
<script>
import ezHeader from "components/home/ezHeader"
import ezContainer from "components/home/ezContainer"
import ezWebsite from "components/home/ezWebsite"
import orderIcon from "components/order/orderIcon"
import { mapState } from "vuex"
export default {
    name: "ruleSuccess",
    data() {
        return {
            
        }
    },
    computed: {
        ...mapState(["comProtocol"])
    },
    components: {
        ezHeader,
        ezContainer,
        ezWebsite,
        orderIcon,
    },
}
</script>
