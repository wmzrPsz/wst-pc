<template>
    <div class="container-fluid bg-scenic ez-search ez-place-search">
        <form class="ez-search-form">
            <div class="input-group input-group-lg ez-search-box">
                <input type="text" class="form-control ez-search-input" placeholder="请输入城市目的地名称" aria-describedby="basic-search"
                       v-model="test" >
                <a class="input-group-addon" id="basic-search">
                    <i class="iconfont icon-search" @click="search()"></i>
                </a>
            </div>

            <div class="text-center top-search">热搜：
                <a @click="纽约" >纽约</a>
                <a>洛杉矶</a>
                <a>华盛顿</a>
                <a>三亚</a>
                <a>泰国</a>
                <a>普吉岛</a>
                <a>新加坡</a>
            </div>
        </form>
    </div>
</template>
<script>
    import { mapState, mapMutations} from "vuex";
    export default {
        name: "citySearchBar",
        data(){
            return {
                test: ""
            }
        },
        computed: {

        },
        methods: {


            search(){
                console.log('-------hehe----'+this.test)
            },
          
            hotSearch(keyword){

            },
        },
    }
</script>
