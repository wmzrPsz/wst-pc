<template>
    <div>
        <h3>订单详情</h3>

        <orderAddress></orderAddress>

        <orderCity :cityName="cityName" :startDate="startDate" :playNum="playNum"  ></orderCity>

    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import orderCity from 'components/order/orderCity'
import orderAddress  from 'components/order/orderAddress'
export default {
    name: "orderHead",
    props:{
        cityName:{
            type: String,
            required: true
        },
        startDate:{
            type: String,
            required: true
        },
        playNum:{
            type: String,
            required: true
        },

    },
    components:{
        orderCity,
        orderAddress,
    },
}
</script>
