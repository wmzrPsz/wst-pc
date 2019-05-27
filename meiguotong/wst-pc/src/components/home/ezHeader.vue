<template>
    <div class= "ez-header">
    <div class="container ez-container ez-navbar-header">
        <!-- Brand-->
        <div class="navbar-header header-logo">
            <a class="ez-logo" :href="comProtocol.logoLink">
                <img alt="万事通美国" v-lazy="comProtocol.pcLogo" :key="comProtocol.pcLog">
                <!-- languageList  -->
            </a>
        </div>
        <div class="navbar-header header-border"></div>
        <div class="navbar-header header-phone">
            <div>
                <div><img class="" src="~images/service-time.png"></div>
                <span><i class="iconfont icon-phone"></i>617-652-8008（美国）</span>
            </div>
            <div>
                <div class="title-tel">服务热线</div>
                <span><i class="iconfont icon-phone"></i>021-672816809（中国）</span>
            </div>
        </div>

        <ul class="nav navbar-nav navbar-right ez-navbar">
            <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
                    aria-expanded="false" @click= "loginFlagClick(1)">
                    <span class="ez-avatar">
                        <!-- defaultPhoto -->
                        <img alt="用户头像" v-lazy="member.photo" :key="member.photo">
                        <b class="text-black" v-if="loginType == 1" style="color: #2577e3;">未登录</b>
                        <b class="text-black" v-if="loginType == 2">{{member.nickName}}</b>
                    </span>
                    <span class="caret" v-if="loginType == 2"></span>
                </a>
                <ul class="dropdown-menu" v-if="loginType == 2">
                    <li><router-link :to="{ name: 'my'}" tag="a">个人资料</router-link></li>
                    <!--<li><a href="#">玩家中心</a></li>-->
                    <!--<li><a href="#">关于我们</a></li>-->
                    <li role="separator" class="divider"></li>
                    <li><a @click.prevent = "removeLoginClick" >退出登录</a></li>
                </ul>
            </li>
            <li>
                <router-link :to="{name: 'buyIndex'}" tag="a">
                    <div class="ez-shopcart text-center">
                        <span class="iconfont icon-shopcart"></span>
                        <i class="on">{{buyNum}}</i>
                    </div>
                </router-link>
            </li>
        </ul>

        <ul class="nav navbar-nav navbar-right ez-header-right">
            <li class="dropdown">
                <select class="select-left"  v-model="currencyidFlag" @change="changeCurrency">
                    <option v-for="(k,index) in currencyList" :key="index" :value="k.currencyid">{{k.currency}}</option>
                </select>
            </li>
            <li class="dropdown select-lang">
                <a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="false"
                    aria-expanded="false">
                    <div class="lang-name">{{languageName}}</div>
                    <span class="caret"></span>
                </a>
                <ul class="dropdown-menu">
                    <li v-for="(k,index) in languageList" :key="index">
                        <input type="radio" name="language" :value="k.languageid" v-model="languageidFlag" @change="changeLanguage(index)">{{k.content}}
                    </li>
                </ul>
            </li>
        </ul>
        </div>

        <component :is="currentTabComponent"></component>

    </div>
</template>
<script>
import { getLanguage, getProtocol, getCurrency, myInfor } from 'getData';
import { isEmpty  } from "@/utils/common";
import { mapState, mapMutations, mapGetters } from "vuex";
import ezLogin from "components/home/ezLogin"
import ezRegister from "components/home/ezRegister"
import ezForest from "components/home/ezForest"
export default {
    name: "ezHeader",
    data () {
        return {
            languageidFlag: "", //语言ID
            currencyidFlag: "", //货币ID
        }
    },
    computed: {
        ...mapState([ "loginType", "languageid", "currencyid", "comProtocol", "loginFlag", "languageList", "currencyList", "member" ]),
        ...mapGetters("buy",["buyNum"]),
        //动态组件
        currentTabComponent() {
            if (this.loginFlag == 1) return "ezLogin";
            else if (this.loginFlag == 2) return "ezRegister";
            else if (this.loginFlag == 3) return "ezForest";
            else return "";
        },
        //语言名称
        languageName(){
            for (const list of this.languageList) {
                if(list.languageid == this.languageid){
                    return list.content;
                }
            }
        },
    },
    components: {
        ezLogin,
        ezRegister,
        ezForest,
    },
    created() {
        this.languageidFlag = this.languageid;
        this.currencyidFlag = this.currencyid;
    },
    methods: {
        ...mapMutations([ "addLogin", "removeLogin", "languageChange", "currencyChange", "setComProtocol", "loginFlagChange" ]),
        //点击用户头像
        loginFlagClick(index) {
            if(this.loginType == 1){
                this.loginFlagChange(index);
            }
        },
       //语言改变
        changeLanguage() {
            this.languageChange(this.languageidFlag);
        },
        //货币改变
        changeCurrency() {
            for (const list of this.currencyList) {
                if (list.currencyid == this.currencyidFlag) {
                    this.currencyChange(list)
                }
            }
        },
        //退出登录
        removeLoginClick() {
            this.removeLogin();
        },
    },
}
</script>
