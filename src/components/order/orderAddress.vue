<template>
    <div>
        <h3>订单详情</h3>

        <div class="content-order-details-contact-info">
            <h4>联系信息</h4>
            <div class="form-inline">
                <p>联系人</p>
                <input type="text" class="form-control min-text" placeholder="联系人" v-model.trim="contactsName"
                    maxlength="50" @change="contactsNameSet">
            </div>
            <div class="form-inline">
                <p>联系电话</p>
                <input type="text" class="form-control min-text" placeholder="联系电话" v-model.trim="contactsMobile"
                    maxlength="20" @change="contactsMobileSet" >
            </div>
            <div class="">
                <p>备注信息</p>
                <input type="text" class="form-control" v-model.trim="remark" placeholder="备注信息"
                    maxlength="50" @change="remarkSet">
            </div>
        </div>

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
    data() {
        return {
            contactsName: "",  //联系人
            contactsMobile: "",  //联系电话
            remark: "", //备注
        }
    },
    methods: {
        ...mapMutations('order', ["contactsNameSet", "contactsMobileSet", 'remarkSet']),
    },
    created() {
        this.contactsNameSet("");
        this.contactsMobileSet("");
        this.remarkSet("");
    },
}
</script>
