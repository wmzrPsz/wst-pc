<template>
    <div className="container-fluid bg-scenic ez-search ez-place-search">
            <div className="input-group input-group-lg ez-search-box">
                <input type="text" className="form-control ez-search-input" placeholder="请输入城市目的地名称"
                       aria-describedby="basic-search">
                    <a className="input-group-addon" id="basic-search">
                        <i className="iconfont icon-search"></i>
                    </a>
            </div>

            <div className="text-center top-search">热搜：
                <a>纽约</a>
                <a>洛杉矶</a>
                <a>华盛顿</a>
                <a>三亚</a>
                <a>泰国</a>
                <a>普吉岛</a>
                <a>新加坡</a>
            </div>
    </div>
</template>
<script>
import { mapState, mapMutations} from "vuex";
export default {
    name: "citySearchBar",
    data(){
        return {
        }
    },
    computed: {

    },
    methods: {

    },
}
</script>
