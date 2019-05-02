<template>
    <div>
        
        <ez-header></ez-header>
        <ez-container></ez-container>

        <!--content-->
        <div class="content ez-travel-order">
            <div class="content-order">
                <div class="content-order-icon">
                    <div style="border: 1px solid #f99905;"><i style="color:#f99905;" class="iconfont icon-dagou"></i><label>确认订单</label></div>
                    <div><i class="iconfont icon-dagou"></i><label>确认付款</label></div>
                    <div><i class="iconfont icon-dagou"></i><label>完成订单</label></div>
                    <p></p>
                </div>

                <div class="content-order-details">
                    <div class="content-order-details-left">

                        <orderAddress cityName = "广州" startDate = "2019-05-12" playNum="1成人2儿童" ></orderAddress>
  


                



                        <orderMember :adultNum = "adultNum" :childNum = "childNum"></orderMember>

                    </div>



                </div>
            </div>

        </div>

      

         <ez-website></ez-website>

    </div>
</template>
<script>
import ezHeader from "components/home/ezHeader"
import ezContainer from "components/home/ezContainer"
import ezWebsite from "components/home/ezWebsite"
import orderMember from "components/order/orderMember"
import orderAddress from "components/order/orderAddress"
import {getMemberContact, getInsurance, saveRouteOrder } from "getData"
import { mapState, mapMutations, mapGetters } from "vuex";
import { nowDate } from 'utils/common'
export default {
    name: "soptSure",
    data() {
        return {
            adultNum: 1,
            childNum: 1,
        }
    },
    components: {
        ezHeader,
        ezContainer,
        ezWebsite,
        orderMember,
        orderAddress,
    },
    created () {
        
    },
}
</script>
