<template>
    <div>
      <div class="dibu_jia" @click.stop="loginFlagChange(0)">
      </div>
      <div class="land_jia">
         <div class="mobile_jia">重置密码</div>
         <div class="mobile">
         <div class="lan_jia_d">
            <ul>
             <li>
                <input class="lan_jia_d_b" style="width: 100%!important" v-model.trim="mobile" type="text" placeholder="请设置你的账号" name="">
              </li>
              <li>
               <input class="lan_jia_d_b" type="num" placeholder="输入验证码" v-model.number="smsCode">
               <i class="lan_jia_d_c" @click.stop="getSmsCode" :style="{'background-color': titleColor}">{{title}}</i>
              </li>
              <li>
                <input class="lan_jia_d_b" v-model.trim="passWord" style="width: 100%!important" type="password" placeholder="请设置你的密码" name="">
              </li>
            </ul>
         </div>
         <button class="lan_jia_d_d" @click.stop="forest">重置密码</button>
        
         <div class="lan_jia_d_f" @click="loginFlagChange(1)"><i>已有账号，立即登陆</i></div>
       </div>

      </div>
    </div>
</template>
<script>
import { mapState, mapMutations } from "vuex"
import { updatePassword, sendSms } from 'getData'
import md5 from 'js-md5';
export default {
    name: "ezForst",
    data() {
        return {
          mobile: "",
          passWord: "",
          smsCode: "",
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
    methods:{
         ...mapMutations([ 'loginFlagChange', 'removeLogin']),
        //重置密码
        async forest(){
            if(this.isNull(this.mobile)){
                this.infoMsg("请输入账号");
                return;
            }
            if(this.isNull(this.smsCode)){
                this.infoMsg("请输入验证码");
                return;
            }
            if(this.isNull(this.passWord)){
                this.infoMsg("请输入密码");
                return;
            }
            let data = await updatePassword({
                mobile: this.mobile,
                newPassword: md5(this.passWord),
                smsCode: this.smsCode,
                category: 3,
                source: 3,
            })
            if(data) {
                this.removeLogin();
                this.successMsg("重置密码成功");
            }
        },
        //发送验证码
        async getSmsCode(){
            if(this.title != "发送验证码") return;
            if(this.isNull(this.mobile)){
                this.infoMsg("请输入账号");
                return;
            }
            let data = await sendSms({
                category:3,
                source: 3,
                mobile: this.mobile,
            })
            if(data) {
                this.successMsg("验证码发送成功，请注意查收");
                this.title = 60;
                setTimeout(this.computeTime,1000);
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
    },
}
</script>
