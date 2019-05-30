<template>
    <div>
        <div class="dibu_jia" @click.stop="loginFlagChange(0)"></div>
            <div class="Land_jia">
                <div class="Land_jia_f">
                    <!-- <img src="~images/ic_delete_gray.png"> -->
                    </div>
                <div class="Land_jia_a text-center"><img style="height: 100%;" :src="comProtocol.pcLogo"></div>
                <input type="text" placeholder="请输入手机号或者邮箱" v-model.trim="phone" @keyup.13="login">
                <input type="password" placeholder="请输入你的密码" v-model.trim="passWord" @keyup.13="login">
                <div class="Land_jia_b">
                    <span class="pull-left " @click.stop="loginFlagChange(2)">立即注册</span>
                    <span style="color: blue" class="pull-right" @click.stop="loginFlagChange(3)">忘记密码</span>
                </div>
                <button class="Land_jia_c" @click.stop="login">登录</button>
                <div class="Land_jia_d">
                    <span>合作用户直接登录</span>
                    <div class="Land_jia_e">
                        <ul>
                            <li><i><img src="~images/qq.png"></i></li>
                            <li><i><img src="~images/wx.png"></i></li>
                            <li style="margin-right: 0px!important"><i><img src="~images/wb.png"></i></li>
                        </ul>
                    </div>
                </div>
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex"
import { login } from "getData"
import md5 from 'js-md5';
export default {
    name: "ezLogin",
    data () {
        return {
            phone: "",   //手机号
            passWord: "",   //密码
        }
    },
    computed: {
        ...mapState([ "loginType", "comProtocol" ]),
    },
    created() {
        // alert(0)
    },
    methods: {
        ...mapMutations([ 'loginFlagChange']),
        ...mapActions(['addLogin']),
       //登录
        login() {
            if (this.isEmpty (this.phone)) {
                console.log(1)
                this.infoMsg("请输入账号");
                return;
            }
            if (this.isEmpty (this.passWord)) {
                 this.infoMsg("请输入密码");
                return;
            }
            login({
                phone: this.phone, 
                passWord: md5(this.passWord)
            }).then( res => {
                res["route"] = this.$route
                this.addLogin(res);
                this.successMsg("登录成功");
            })
        },
    }
}
</script>
