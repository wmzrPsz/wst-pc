<template>
    <div class="b-a lis fu4   zu_a  zi_rrr right_aa ">
        <ul class="dianji_a bo_5 overflow ">
            <li class="beibai bo_12" :class="{'baoche':carType==num}" v-for="(num, index) in 3" :key="index">
                <a @click="navClick(num)">{{num | typeVc}}</a>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: "carNav",
    props:{
        carType: {
            type: String,
            required: true,
        }
    },
    methods: {
        //点击导航栏
        navClick(type){
            let url;
            switch (type) {
                case 1: url = "/carChar"; break;
                case 2: url = "/carShort"; break;
                case 3: url = "/carTran"; break;
                default: url = "/carChar"; break;
            }
            this.$router.push(url);
        },
    },
    filters: {
        typeVc(carType){
            let content = "";
            switch (carType) {
                case 1: content = "包车租车"; break;
                case 2: content = "短程接送"; break;
                case 3: content = "接送机"; break;
                default: content = "包车租车"; break;
            }
            return content;
        },
    }
}
</script>
<style lang="less" scoped>
    .baoche>a{
        color: #2577e3;
    }
</style>

