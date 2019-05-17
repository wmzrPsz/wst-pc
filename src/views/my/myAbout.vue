<template>
    <div class="content-right">
        <div class="panel-header">
            <div class="pull-left panel-header-title">关于我们</div>
            <!--<div class="pull-right">
                <input type="text" class="panel-header-search" placeholder="搜索订单">
            </div>-->
        </div>
        <div class="content-panel">
            <div class="wrap-about">
                <ul class="about-nav-list">
                    <li :class="index==0?'active':''" v-for="(list, index) in lists" :key="index"><i></i>{{list.title}}</li>
                </ul>
                <div class="about-tabcontent">
                    <!--公司概况-->
                    <div class="about-tabpane" :class="index==0?'active':''"  v-for="(list, index) in lists" :key="index" v-html="list.content">
                    </div>

                </div>

            </div>

        </div>
    </div>
</template>
<script>
import {
    getArticle,
     } from 'getData'
export default {
    name: "myAbout",
    data() {
        return {
              lists:[],
        }
    },
    created() {
        this.getData();
    },
    methods: {
        //获取关于我们
        async getData() {
            let data = await getArticle({
            })
            if(data) {
                this.lists = data;
            }
        },
    },
}
</script>
