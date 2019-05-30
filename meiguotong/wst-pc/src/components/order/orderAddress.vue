<template>
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
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
    name: "orderAddress",
    data() {
        return {
            contactsName: "",  //联系人
            contactsMobile: "",  //联系电话
            remark: "", //备注
        }
    },
    created() {
        this.contactsNameSet("");
        this.contactsMobileSet("");
        this.remarkSet("");
    },
    methods: {
        ...mapMutations('order', ["contactsNameSet", "contactsMobileSet", 'remarkSet']),
    },
}
</script>
