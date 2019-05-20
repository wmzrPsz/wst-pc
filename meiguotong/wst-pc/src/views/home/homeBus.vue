<template>
    <div>
        
    <ez-header></ez-header>

    <div class=" width  overflow" >

        <div class="fu  duancheng_c  pa_qq overflow">
        <div class="overflow ma25 bo_3">
        <div class=" overflow ma25">
            <div class="ma31">创建商业账号</div>
            <div class="content ez-travel-payment">
            <div class="content-order">
            <div class="content-order-icon">
                <div style="border: 1px solid #f99905;"><i style="color:#f99905;" class="iconfont icon-dagou"></i><label>填写基本信息</label></div>
                <div><i class="iconfont icon-dagou"></i><label>完善信息</label></div>
                <div><i class="iconfont icon-dagou"></i><label>信息提交</label></div>
                <p></p>
            </div>
            </div>
        </div>
        
        <!---->
        <div class="administration_z">
            <div class="land_jia_b">
                <ul>
                <li :class="{'lan_jia_c':registerType==1}" @click.stop="registerTypeClick(1)">手机号注册</li>
                <li :class="{'lan_jia_c':registerType==2}" @click.stop="registerTypeClick(2)">邮箱号注册</li>
                </ul>
            </div>
            <div class="administration">
            <ul>
                <li>
                <span>登陆账号:</span>
                <input class="administration_a" type="num" v-model.trim="accountNumbe" placeholder="请输入手机号或邮箱" name="">
                <button class="administration_b" @click="getSmsCode">{{smsCodeContent}}</button>
                </li>
                <li>
                <span>登陆密码:</span>
                <input class="administration_a_a" type="password" placeholder="请输入密码" name="" v-model="password">
                </li>
                <li>
                <span>确认密码:</span>
                <input class="administration_a_a" type="password" placeholder="请输入密码" name="" v-model="passwordCheck">
                </li>
                <li>
                <span>验证码:</span>
                <input class="administration_a_a" type="num" placeholder="请输入验证码" name="" v-model="smsCode">
                <!-- <i class="administration_a_b"><img src="../../img/18.png"></i>
                <i class="administration_a_c">看不清楚换一张</i> -->
                </li>
            </ul>
            </div>
            <button class="administration_a_d" @click="next">下一步</button>
            <div class="administration_a_e"><input type="checkbox" name="" v-model="agree"><i>同意</i><i style="color: #1D9CFA;">《万事通》</i><i>商家账号注册合同</i></div>
        </div>
        <!---->
        </div>

            </div>

    </div>

<!--右边*************************************************************************-->
       <div class="a33_3 fu1">
        <div class="a5_1_l overflow  ma25">
              <img src="~images/bg-guide.png">
       </div>
       <div class="a5_1_l overflow  ma25">
              <img src="~images/bg-guide.png">
       </div>
       </div>
    </div>

    <ezWebsite></ezWebsite>

    </div>
</template>
<script>
import ezHeader from "components/home/ezHeader"
import ezWebsite from "components/home/ezWebsite"
import { sendSms } from 'getData'
import {  mapMutations } from "vuex"
export default {
    name: "homeBus",
    data() {
        return {
            registerType: 1, //1.手机登录  2.邮箱登录
            accountNumbe: "", //登录账号
            password: "", //密码
            passwordCheck: "", //确认密码
            smsCode: "",  //验证码
            agree: false,  //是否同意协议
            count: 0,  //发送验证码倒计时
        }
    },
    computed: {
        //发送验证码显示文字
        smsCodeContent(){
        if(this.count == 0)
        return "获取验证码";
        return this.count + "S";
        
        },
    },
    components: {
        ezHeader,
        ezWebsite,
    },
    created () {
        
    },
    methods: {
        ...mapMutations('home',['STATE_CHANGE']),
        //获取验证码
        async getSmsCode() {
        if(this.count > 0) return;
        if(this.isEmpty (this.accountNumbe)){
                this.infoMsg("请输入登录账号");
                return;
            }
        let data = await sendSms({
            category:1,
            sendType: this.registerType,
            source: 3,
            email:this.accountNumbe,
            mobile: this.accountNumbe,
        })
        if(data) {
            this.successMsg("验证码发送成功，请注意查收");
            this.count = 60;
            this.countDown();
        }

        },
        //倒计时
        countDown(){
            if(this.count > 0){
            this.count --;
            setTimeout(()=>{this.countDown()},1000)
            }
        },
        //点击下一步
        next() {
            if(!this.agree){
                this.infoMsg("请先同意协议");
                return;
            }
            if(this.isEmpty (this.accountNumbe)){
                this.infoMsg("请输入登录账号");
                return;
            }
            if(this.isEmpty (this.accountNumbe)){
                this.infoMsg("请输入密码");
                return;
            }
            if(this.passwordCheck != this.passwordCheck){
                this.infoMsg("两次密码输入不一致");
                return;
            }
            if(this.isEmpty (this.smsCode)){
                this.infoMsg("请输入验证码");
                return;
            }
            this.STATE_CHANGE({
                registerType: this.registerType,
                accountNumbe: this.accountNumbe,
                password: this.password,
                passwordCheck: this.passwordCheck,
                smsCode: this.smsCode,    
            })
            this.$router.push("homeBusInfo")

        },
        //切换注册类型
        registerTypeClick(index){
            this.registerType = index;
        },
    },
}
</script>
