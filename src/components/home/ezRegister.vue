<template>
<div>
      <div class="dibu_jia" @click.stop="loginFlagChange(0)">
      </div>
      <div class="land_jia">
      	 <div class="land_jia_a"><img src="~images/avatar.png"></div>
         <div class="land_jia_b">
            <ul>
              <li :class="{'lan_jia_c':createType == 1}" @click="createTypeChange(1)">手机号注册</li>
              <li :class="{'lan_jia_c':createType == 2}" @click="createTypeChange(2)">邮箱号注册</li>
            </ul>
         </div>
         
         <div class="mobile" :class="{'diyi':createType == 2}">
         <div class="lan_jia_d">
            <ul>
              <li>
                <select class="lan_jia_d_a text-center" v-model="area">
                <option value="volvo" v-for="(value,index) in areaSelectList" :key="index" :value="value.id">{{value.name}}</option>
               </select>
               <input class="lan_jia_d_b" type="number" placeholder="输入手机号码" v-model.number="phone">
              </li>
              <li>
               <input class="lan_jia_d_b" type="number" placeholder="输入验证码" v-model.number="smsCode">
               <i class="lan_jia_d_c" @click="getSmsCode" :style="{'background-color': titleColor}">{{title}}</i>
              </li>
              <li>
                <input class="lan_jia_d_b" style="width: 100%!important" v-model.trim="passWord" type="password" placeholder="请设置你的密码">
              </li>
            </ul>
         </div>
         <button class="lan_jia_d_d" @click.stop="register()">注册</button>
         <div class="lan_jia_d_e"><i>注册即表示你已同意</i><i style="color: #1D9CFA">《万事通用户协议》</i></div>
         <div class="lan_jia_d_f">
         <i @click.stop="loginFlagChange(1)">已有账号，立即登陆</i>
         <i @click="geToShop">创建商家用户></i>
         </div>
       </div>


       <div class="mobile" :class="{'diyi':createType == 1}">
         <div class="lan_jia_d">
            <ul>
               <li>
                <input class="lan_jia_d_b" v-model.trim="email"  style="width: 100%!important" type="text" placeholder="请输入你的邮箱">
              </li>
              <li>
               <input class="lan_jia_d_b" type="number" placeholder="输入验证码" v-model.number = "smsCode">
               <i class="lan_jia_d_c" @click="getSmsCode" :style="{'background-color': titleColor}">{{title}}</i>
              </li>
              <li>
                <input class="lan_jia_d_b" v-model.trim="passWord" style="width: 100%!important" type="password" placeholder="请设置你的密码">
              </li>
            </ul>
         </div>
         <button class="lan_jia_d_d" @click.stop="register()">注册</button>
         <div class="lan_jia_d_e"><i>注册即表示你已同意</i><i style="color: #1D9CFA">《万事通用户协议》</i></div>
         <div class="lan_jia_d_f">
         <i @click.stop="loginFlagChange(1)">已有账号，立即登陆</i>
         <i @click="geToShop">创建商家用户></i>
         </div>
       </div>
      </div>
</div>
</template>
<script>
import { mapState, mapMutations } from "vuex"
import md5 from 'js-md5';
import { register,sendSms } from 'getData'
export default {
    name: "ez-Register",
    data() {
        return {
            phone: "",   //手机号
            passWord: "",   //密码
            createType: 1,  //手机注册  2邮箱注册
            email: "",  //邮箱
            version: 1,  //1.普通用户 2.旅行社
            area: this.areaSelectList[0].id, //区号
            smsCode:"", //验证码
            title:"发送验证码", //发送短信提示
        }
    },
    computed:{
        titleColor(){
            if(this.title == "发送验证码")
                return "#f19149";
                return "gainsboro";
        }
    },
    methods: {
         ...mapMutations([ 'loginFlagChange', 'addLogin']),
        //注册
        async register() {
            if(this.createType == 1 && this.isEmpty (this.phone)){
                 this.infoMsg("请输入手机号");
                return;
            }
            if(this.createType == 2 && this.isEmpty (this.email)){
                 this.infoMsg("请输入邮箱");
                return;
            }
            if(this.isEmpty (this.smsCode)){
                 this.infoMsg("请输入验证码");
                return;
            }
            if(this.isEmpty (this.passWord)){
                 this.infoMsg("请输入密码");
                return;
            }
            let data = await register({
                phone: this.phone,
                email:this.email,
                passWord: md5(this.passWord),
                smsCode: this.smsCode,
                version: this.version,
                category: 1,
                area: this.area,
                createType: this.createType,
                source: 1,
            })
            if(data) {
                 this.successMsg("注册成功");
            }
        },
        //改变注册类型
        createTypeChange(index) {
            this.createType = index;
            this.phone = "";
            this.passWord = "";
            this.smsCode = "";
            this.email = "";
        },
        //发送验证码
        async getSmsCode(){
            if(this.title != "发送验证码") return;
            if(this.createType == 1 && this.isEmpty (this.phone)){
                 this.infoMsg("请输入手机号");
                return;
            }
            if(this.createType == 2 && this.isEmpty (this.email)){
                 this.infoMsg("请输入邮箱");
                return;
            }
            let data = await sendSms({
                category:1,
                sendType: this.createType,
                source: 1,
                email:this.email,
                mobile: this.phone,
                area: this.area,
            })
             if(data) {
                 this.successMsg("验证码发送成功，请注意查收");
                this.title = 60;
                setTimeout(()=>{this.computeTime()},1000);
            }
        },
        //发送验证码倒计时
        computeTime() {
            this.title = this.title - 1;
            if(this.title <= 0){
                this.title = "发送验证码";
            }else{
                setTimeout(()=>{this.computeTime()}, 1000);
            }
        },
        //跳转到商家
        geToShop(){
            this.loginFlagChange(0)
            this.$router.push("homeBus")
        },
    },

}
</script>
