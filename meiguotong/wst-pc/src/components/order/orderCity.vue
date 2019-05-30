<template>
        <div class="content-order-details-travel-info">
            <h4>出行信息</h4>
            <div>
                <p>目的地</p>
                <input type="text" class="form-control min-text" :value="cityName" readonly="readonly" style="background-color: #fff;">
            </div>
            <div>
                <p>时间</p>
                <input type="text" class="form-control min-text" :value="startDate" readonly="readonly" style="background-color: #fff;">
            </div>
            <div>
                <p>人数</p>
                <input type="text" class="form-control min-text" :value="playNum" readonly="readonly" style="background-color: #fff;">
            </div>
        </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
    name: "orderAddress",
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
}
</script>
