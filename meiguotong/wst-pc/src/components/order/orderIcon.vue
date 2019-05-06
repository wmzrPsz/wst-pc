<template>
    <div class="content-order-icon">
        <div :class="{'active':orderIconType==1}"><i class="iconfont icon-dagou"></i><label>确认订单</label></div>
        <div :class="{'active':orderIconType==2}"><i class="iconfont icon-dagou"></i><label>确认付款</label></div>
        <div :class="{'active':orderIconType==3}"><i class="iconfont icon-dagou"></i><label>完成订单</label></div>
        <p></p>
    </div>
</template>
<script>
export default {
    name: "orderIcon",
    props:{
        orderIconType:{
            type: String,
            default: 1,
            required: true
        }
    }
}
</script>
<style lang="less" scoped>
.content-order-icon > .active{
    border: 1px solid #f99905;
    >i{
        color:#f99905;
    }
}
</style>

