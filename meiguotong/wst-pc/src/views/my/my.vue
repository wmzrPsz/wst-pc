<template>
    <div>

        <ezHeader></ezHeader>
        <ezContainer></ezContainer>

        <div class="container ez-container ez-user-content">
        <div class="aside-left">
            <!--用户信息-->
            <div class="aside-userinfo text-center">
                <div class="aside-avatar">
                    <img :src="member.photo" class="center-block">
                </div>
                <h4 class="username-text">{{member.nickName}}</h4>
                <h5>手机号：{{member.mobile}}</h5>
                <h5><span class="ez-mr-sm">{{member.sex | sexVc}}</span><span>{{member.birthday}}</span></h5>
                <div class="aside-userinfo-btn">
                     <router-link :to="{name: 'myInfo'}" tag="a" class="btn text-lightorange">编辑</router-link>
                    <a class="btn" @click.stop = "removeLogin($route)">退出登录</a>
                </div>
            </div>

            <!--个人中心-->
            <div class="ez-aside-card">
                <div class="aside-card-title bg-style4">
                    <h4 class="title">个人中心</h4>
                </div>
                <ul class="aside-user-list text-center htmlUrl">
                    <router-link :to="{name: 'myOrder'}" tag="li" active-class="active"><a>我的订单</a><i></i></router-link>
                    <router-link :to="{name: 'myAfter'}" tag="li" active-class="active"><a>售后订单</a><i></i></router-link>
                    <router-link :to="{name: 'myCollection'}" tag="li" active-class="active"><a>我的收藏</a><i></i></router-link>
                    <router-link :to="{name: 'myInfo'}" tag="li" active-class="active" v-if="member.type==1"><a>个人信息</a><i></i></router-link>
                    <router-link :to="{name: 'myNews'}" tag="li" active-class="active"><a>消息中心</a><i></i></router-link>
                    <router-link :to="{name: 'myDraft'}" tag="li" active-class="active"><a>我的草稿</a><i></i></router-link>
                    <router-link :to="{name: 'myFinance'}" tag="li" active-class="active"><a>财务管理</a><i></i></router-link>
                    <router-link :to="{name: 'myContacts'}" tag="li" active-class="active"><a>常用联系人</a><i></i></router-link>
                </ul>
            </div>

            <div class="ez-aside-card" v-if="member.type==1">
                <div class="aside-card-title bg-style4">
                    <h4 class="title">玩家中心</h4>
                </div>
                <ul class="aside-user-list text-center htmlUrl">
                    <router-link :to="{name: 'myPlayer'}" tag="li" active-class="active"><a>玩家认证</a><i></i></router-link>
                    <router-link :to="{name: 'myRoute'}" tag="li" active-class="active"><a>路线规划</a><i></i></router-link>
                     <router-link :to="{name: 'myCollection'}" tag="li" active-class="active"><a>我的收藏</a><i></i></router-link>
                     <router-link :to="{name: 'myPrice'}" tag="li" active-class="active"><a>价格设置</a><i></i></router-link>
                     <router-link :to="{name: 'myGameOrder'}" tag="li" active-class="active"><a>玩家订单管理</a><i></i></router-link>
                     <router-link :to="{name: 'myDate'}" tag="li" active-class="active"><a>玩家时间管理</a><i></i></router-link>
                </ul>
            </div>

            <div class="ez-aside-card"  v-if="member.type==2">
                <div class="aside-card-title bg-style4">
                    <h4 class="title">公司账号信息</h4>
                </div>
                <ul class="aside-user-list text-center htmlUrl">
                    <router-link :to="{name: 'myCompany'}" tag="li" active-class="active"><a>公司信息</a><i></i></router-link>
                    <router-link :to="{name: 'mySub'}" tag="li" active-class="active"><a>旅行社子账号管理</a><i></i></router-link>
                </ul>
            </div>

            <div class="ez-aside-card">
                <div class="aside-card-title bg-style4">
                    <h4 class="title">关于我们</h4>
                </div>
                <ul class="aside-user-list text-center">
                     <router-link :to="{name: 'myAbout'}" tag="div" active-class="active"><a>关于我们</a><i></i></router-link>
                </ul>
            </div>

        </div>
             <router-view></router-view>
        </div>


        <ezFooter></ezFooter>
        <ezAside></ezAside>

    </div>
</template>
<script>
import ezHeader from "components/home/ezHeader"
import ezContainer from "components/home/ezContainer"
import ezFooter from "components/home/ezFooter"
import ezAside from "components/home/ezAside"
import ezModule from "components/home/ezModule"
import carNav from "components/car/carNav"
import { mapGetters, mapState, mapMutations, mapActions } from 'vuex'
export default {
    name: "myIndex",
    data() {
        return {
            
        }
    },
    computed: {
        ...mapState(["member"])
    },
    components: {
        ezHeader,
        ezContainer,
        ezFooter,
        ezAside,
        ezModule,
        carNav,
    },
    methods: {
        ...mapActions(['removeLogin']),
    },
}
</script>
