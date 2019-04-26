//组件

//在vue根元素创建原型属性
Vue.prototype.comProtocol = {};  //网站基本参数
Vue.prototype.currencySign = localStorage.getItem("currencySign");  //货币符号
Vue.prototype.defaultImg = localStorage.getItem("defaultImg");  //网站默认图片
Vue.prototype.defaultPhoto = localStorage.getItem("defaultPhoto");  //网站默认头像
//子组件组件通信
const eventBus = new Vue();



//登录
const ezLogin = {
    data: function () {
        return {
            phone: "",   //手机号
            passWord: "",   //密码
        }
    },
    methods: {
        //登录
        login() {
            if (!this.phone) {
                layerMsg("请输入账号");
                return;
            }
            if (!this.passWord) {
                layerMsg("请输入密码");
                return;
            }
            requestGet(loginUrl, {
                phone: this.phone,
                passWord: hex_md5(this.passWord)
            }, function (data) {
                localStorage.setItem("login_uid", data.body.uid);
                localStorage.setItem("login_key", data.body.key);
                localStorage.setItem("login_time", data.body.time);
                location.reload();
            })
        },
        //改变弹窗类型
        loginFlagChange(index) {
            eventBus.$emit('childByValue', index)
        },
    },
    template: `    <div>
            <div class="dibu_jia" @click.stop="loginFlagChange(0)"></div>
            <div class="Land_jia">
                <div class="Land_jia_f"><img src="../../img/ic_delete_gray.png"></div>
                <div class="Land_jia_a text-center"><img style="height: 100%;" :src="comProtocol.pcLogo || defaultImg"></div>
                <input type="text" placeholder="请输入手机号或者邮箱" v-model.trim="phone" @keyup.13="login">
                <input type="password" placeholder="请输入你的密码" v-model.trim="passWord" @keyup.13="login">
                <div class="Land_jia_b">
                    <span class="full-left" @click.stop="loginFlagChange(2)">立即注册</span>
                    <span style="float: right; color: blue" @click.stop="loginFlagChange(3)">忘记密码</span>
                </div>
                <button class="Land_jia_c" @click.stop="login">登录</button>
                <div class="Land_jia_d">
                    <span>合作用户直接登录</span>
                    <div class="Land_jia_e">
                        <ul>
                            <li><i><img src="../../img/qq.png"></i></li>
                            <li><i><img src="../../img/wx.png"></i></li>
                            <li style="margin-right: 0px!important"><i><img src="../../img/wb.png"></i></li>
                        </ul>
                    </div>
                </div>
            </div>
      </div>`
}

//注册
const ezRegister = {
    data: function () {
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
        //注册
        register() {
            if(this.createType == 1 && !this.phone){
                layerMsg("请输入手机号");
                return;
            }
            if(this.createType == 2 && !this.email){
                layerMsg("请输入邮箱");
                return;
            }
            if(!this.smsCode){
                layerMsg("请输入验证码");
                return;
            }
            if(!this.passWord){
                layerMsg("请输入密码");
                return;
            }
            requestGet(registerUrl, {
                phone: this.phone,
                email:this.email,
                passWord: hex_md5(this.passWord),
                smsCode: this.smsCode,
                version: this.version,
                category: 1,
                area: this.area,
                createType: this.createType,
                source: 1,
            }, function (data) {
                layerMsg("注册成功");
            })
        },
        //改变弹窗类型
        loginFlagChange(index) {
            eventBus.$emit('childByValue', index);
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
        getSmsCode(){
            if(this.title != "发送验证码") return;
            if(this.createType == 1 && !this.phone){
                layerMsg("请输入手机号");
                return;
            }
            if(this.createType == 2 && !this.email){
                layerMsg("请输入邮箱");
                return;
            }
            let this_ = this;
            requestGet(sendSmsUrl, {
                category:1,
                sendType: this.createType,
                source: 1,
                email:this.email,
                mobile: this.phone,
                area: this.area,
            }, function (data) {
                layerMsg("验证码发送成功，请注意查收");
                this_.title = 60;
                setTimeout(this_.computeTime,1000);
            });
        },
        //发送验证码倒计时
        computeTime() {
            this.title = this.title - 1;
            if(this.title <= 0){
                this.title = "发送验证码";
            }else{
                setTimeout(this.computeTime, 1000);
            }
        },
        //跳转到商家
        geToShop(){
            location.href = "../index/A1-4.html";
        },
    },
    template: `
<div>
      <div class="dibu_jia" @click.stop="loginFlagChange(0)">
      </div>
      <div class="land_jia">
      	 <div class="land_jia_a"><img src="../../images/avatar.png"></div>
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
         <i>创建商家用户></i>
         </div>
       </div>
      </div>
</div>`
}

//忘记密码
const ezForest = {
    data: function(){
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
        //改变弹窗类型
        loginFlagChange(index) {
            eventBus.$emit('childByValue', index);
        },
        //重置密码
        forest(){
            if(!this.mobile){
                layerMsg("请输入账号");
                return;
            }
            if(!this.smsCode){
                layerMsg("请输入验证码");
                return;
            }
            if(!this.passWord){
                layerMsg("请输入密码");
                return;
            }
            requestGet(updatePasswordUrl, {
                mobile: this.mobile,
                newPassword: hex_md5(this.passWord),
                smsCode: this.smsCode,
                category: 3,
                source: 3,
            }, function (data) {
                layer.msg('重置密码成功', function(){
                    localStorage.removeItem("login_uid");
                    localStorage.removeItem("login_key");
                    localStorage.removeItem("login_time");
                    location.reload();
                });
            });
        },
        //发送验证码
        getSmsCode(){
            if(this.title != "发送验证码") return;
            if(!this.mobile){
                layerMsg("请输入账号");
                return;
            }
            let this_ = this;
            requestGet(sendSmsUrl, {
                category:3,
                source: 1,
                mobile: this.mobile,
            }, function (data) {
                layerMsg("验证码发送成功，请注意查收");
                this_.title = 60;
                setTimeout(this_.computeTime,1000);
            });
        },
        //发送验证码倒计时
        computeTime() {
            this.title = this.title - 1;
            if(this.title <= 0){
                this.title = "发送验证码";
            }else{
                setTimeout(this.computeTime, 1000);
            }
        },
    },
    template:`    
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
`
}


//创建一个组件构造器
let ez_header = Vue.extend({
    mounted() {
        this.getProtocol();
        this.getLanguage();
        this.getCurrency();
        this.getMember();
        this.childByValue();
    },
    data: function () {
        return {
            languageList: [],  //语言集合
            language: localStorage.getItem("language"),    //语言名称
            languageid: localStorage.getItem("languageid"),  //语言ID
            currencyList: [],  //货币集合
            currency: localStorage.getItem("currency"),  //货币名称
            currencyid: localStorage.getItem("currencyid"),  //货币ID
            comProtocol: {},  //网站基本参数
            member: {}, //会员信息
            loginType: window.localStorage.getItem("login_uid") ? 2 : 1,  //1游客 2会员
            loginFlag: 0,  //默认  1显示登录  2注册  3忘记密码
        }
    },
    computed: {
        //动态组件
        currentTabComponent() {
            if (this.loginType == 2) return "";
            if (this.loginFlag == 1) return "ez-login";
            else if (this.loginFlag == 2) return "ez-register";
            else if (this.loginFlag == 3) return "ez-forest";
            else return "";
        }
    },
    components: {
        "ez-login": ezLogin,
        "ez-register": ezRegister,
        "ez-forest": ezForest,
    },
    methods: {
        //获取语言
        getLanguage: function () {
            let this_ = this;
            requestGet(getLanguageUrl, {}, function (data) {
                this_.languageList = data.body.list;
                if (!localStorage.getItem("languageid")) {
                    this_.language = this_.languageList[0].content;
                    this_.languageid = this_.languageList[0].languageid;
                    localStorage.setItem("language", this_.language);
                    localStorage.setItem("languageid", this_.languageid);
                }
            })
        },
        //语言改变
        languageChange: function (index) {
            this.language = this.languageList[index].content;
            this.languageid = this.languageList[index].languageid;
            localStorage.setItem("language", this.language);
            localStorage.setItem("languageid", this.languageid);
            //          location.href = "../F/F1.html";
        },
        //获取货币
        getCurrency: function () {
            let this_ = this;
            requestGet(getCurrencyUrl, {}, function (data) {
                this_.currencyList = data.body.list;
                if (!localStorage.getItem("currencyid")) {
                    this_.currency = this_.currencyList[0].currency;
                    this_.currencyid = this_.currencyList[0].currencyid;
                    localStorage.setItem("currency", this_.currency);
                    localStorage.setItem("currencyid", this_.currencyid);
                    let sign = this_.currencyList[0].sign;
                    localStorage.setItem("currencySign", sign);
                    this_.$parent.currencySign = sign;
                }
            })
        },
        //货币改变
        currencyChange: function () {
            let this_ = this;
            for (const list of Object.values(this.currencyList)) {
                if (list.currencyid == this.currencyid) {
                    this.currency = list.currency;
                    localStorage.setItem("currency", this.currency);
                    localStorage.setItem("currencyid", this.currencyid);
                    let sign = list.sign;
                    localStorage.setItem("currencySign", sign);
                    this_.$parent.currencySign = sign;
                    return;
                }
            }
        },
        //获取网站基本参数
        getProtocol: function () {
            let this_ = this;
            requestGet(getProtocolUrl, {}, function (data) {
                this_.$parent.comProtocol = data.body.comProtocol;
                this_.comProtocol = data.body.comProtocol;
                localStorage.setItem("defaultImg", data.body.comProtocol.defaultImg);
                this_.$parent.defaultImg = data.body.comProtocol.defaultImg;
                localStorage.setItem("defaultPhoto", data.body.comProtocol.defaultPhoto);
                this_.$parent.defaultPhoto = data.body.comProtocol.defaultPhoto;
            })
        },
        //获取会员信息
        getMember: function () {
            if (this.loginType == 1) {
                return;
            }
            const this_ = this;
            requestGet(myInforUrl, {
            }, function (data) {
                this_.member = data.body.member;
                eventBus.$emit("member", this_.member);
            });
        },
        //登录弹出窗口
        loginFlagChange(index) {
            if (!index) this.loginFlag = index;
            if (this.loginType == 2) return;
            this.loginFlag = !this.loginFlag;
        },
        //退出登录
        removeLogin() {
            localStorage.removeItem("login_uid");
            localStorage.removeItem("login_key");
            localStorage.removeItem("login_time");
            location.reload();
        },
        //组件通信
        childByValue() {
            const this_ = this;
            eventBus.$on("childByValue", function (val) {
                this_.loginFlag = val;
            })
        },
    },
    template: `<header class="ez-header">


    
    <div v-if="loginType == 2&& loginFlag">
      <div class="dibu_jia">
      </div>
      <div class="land_jia">
      	 <div class="land_jia_a"><img src="../../images/avatar.png"></div>
         <div class="land_jia_b">
            <ul>
              <li class="lan_jia_c">手机号注册</li>
              <li>邮箱号注册</li>
            </ul>
         </div>
         <div class="mobile">
         <div class="lan_jia_d">
            <ul>
              <li>
                <select class="lan_jia_d_a">
                <option value="volvo">+86中国</option>
                <option value="saab">+66美国</option>
                <option value="opel">+66日本</option>
               </select>
               <input class="lan_jia_d_b" type="num" placeholder="输入手机号码" name="">
              </li>
              <li>
               <input class="lan_jia_d_b" type="num" placeholder="输入验证码" name="">
               <i class="lan_jia_d_c">获取验证码</i>
              </li>
              <li>
                <input class="lan_jia_d_b" style="width: 100%!important" type="num" placeholder="请设置你的密码" name="">
              </li>
            </ul>
         </div>
         <button class="lan_jia_d_d">注册</button>
         <div class="lan_jia_d_e"><i>注册即表示你已同意</i><i style="color: #1D9CFA">《万事通用户协议》</i></div>
         <div class="lan_jia_d_f"><i>已有账号，立即登陆</i><i>创建商家用户></i></div>
       </div>


       <div class="mobile diyi">
         <div class="lan_jia_d">
            <ul>
               <li>
                <input class="lan_jia_d_b" style="width: 100%!important" type="num" placeholder="请设置你的密码" name="">
              </li>
              <li>
               <input class="lan_jia_d_b" type="num" placeholder="输入验证码" name="">
               <i class="lan_jia_d_c">获取验证码</i>
              </li>
              <li>
                <input class="lan_jia_d_b" style="width: 100%!important" type="num" placeholder="请设置你的密码" name="">
              </li>
            </ul>
         </div>
         <button class="lan_jia_d_d">注册</button>
         <div class="lan_jia_d_e"><i>注册即表示你已同意</i><i style="color: #1D9CFA">《万事通用户协议》</i></div>
         <div class="lan_jia_d_f"><i>已有账号，立即登陆</i><i>创建商家用户></i></div>
       </div>

      </div>
    </div>
    
    <component :is="currentTabComponent"></component>
    
    <div class="container ez-container ez-navbar-header">
        <!-- Brand-->
        <div class="navbar-header header-logo">
            <a class="ez-logo" :href="comProtocol.logoLink">
                <img alt="万事通美国" :src="comProtocol.pcLogo || defaultImg">
            </a>
        </div>
        <div class="navbar-header header-border"></div>
        <div class="navbar-header header-phone">
            <div>
                <div><img class="" src="../../images/service-time.png"></div>
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
                    aria-expanded="false" @click = "loginFlagChange(1)">
                    <span class="ez-avatar">
                        <img alt="用户头像" :src="member.photo?member.photo:defaultPhoto">
                        <b class="text-black" v-if="loginType == 1" style="color: #2577e3;">未登录</b>
                        <b class="text-black" v-if="loginType == 2">{{member.nickName}}</b>
                    </span>
                    <span class="caret" v-if="loginType == 2"></span>
                </a>
                <ul class="dropdown-menu" v-if="loginType == 2">
                    <li><a href="../p-my/P1-4.html">个人资料</a></li>
                    <!--<li><a href="#">玩家中心</a></li>-->
                    <!--<li><a href="#">关于我们</a></li>-->
                    <li role="separator" class="divider"></li>
                    <li><a @click.prevent = "removeLogin" >退出登录</a></li>
                </ul>
            </li>
            <li>
                <a href="#">
                    <div class="ez-shopcart text-center">
                        <span class="iconfont icon-shopcart"></span>
                        <i class="on">6</i>
                    </div>
                </a>
            </li>
        </ul>

        <ul class="nav navbar-nav navbar-right ez-header-right">
            <li class="dropdown">
                <select class="select-left"  v-model="currencyid" @change="currencyChange">
                    <option v-for="(k,index) in currencyList" :key="index" :value="k.currencyid">{{k.currency}}</option>
                </select>
            </li>
            <li class="dropdown select-lang">
                <a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="false"
                    aria-expanded="false">
                    <div class="lang-name">{{language}}</div>
                    <span class="caret"></span>
                </a>
                <ul class="dropdown-menu">
                    <li v-for="(k,index) in languageList" :key="index">
                    <input type="radio" name="language" :value="k.languageid" v-model="languageid" @change="languageChange(index)">{{k.content}}
                    </li>
                </ul>
            </li>
        </ul>
        </div>
    </header>`,
})

//注册组件
//头部
let sss = Vue.component('ez-header', ez_header);


//导航
Vue.component('ez-container', {
    data(){
        return {
            hotCityList: [],  //热门城市
            comNavigationList: [],  //导航栏
        }
    },
    mounted(){
        this.getHotCity();
        this.getComNavigation();
    },
    methods:{
        //获取热门城市
        getHotCity(){
            let this_ = this;
            requestGet(getHotCityUrl, {}, function (data) {
                this_.hotCityList = data.body.list;
            })
        },
        //获取导航栏
        getComNavigation(){
            let this_ = this;
            requestGet(getComNavigationUrl, {}, function (data) {
                this_.comNavigationList = data.body.list;
            })
        },
    },

//     <div class="text-center btn-more">
//     <a class="btn ez-btn ez-nav-open">查看更多 <i class="iconfont icon-down"></i></a>
//     <a class="btn ez-btn ez-nav-close" style="display: none;">收起 <i class="iconfont icon-up"></i></a>
// </div>
    template: `        
    <div class="container ez-container  ez-main-nav">
        <ul class="list-inline text-center ez-navlist">
            <li  v-for="(list,index) in comNavigationList" :key="index"  >
            <a :href="list.link" >{{list.name}}</a></li>
        </ul>



    <ul class="list-inline ez-citylist">
        <li class="active" v-for="(list,index) in hotCityList" style="padding-right:15px !important;">
        <a :href="list.link">{{list.cityName}}</a>
        </li>
    </ul>
</div>`
})

//底部
Vue.component('ez-footer', {
    template: ` <footer class="ez-footer">
    <div class="ez-advantage">
        <div class="container ez-container">
            <div class="advantage-title">
                <img alt="..." src="../../images/ez-advantage.png">
            </div>
            <ul class="list-inline text-center advantage-list pull-right">
                <li>
                    <i class="iconfont icon-sun"></i>
                    <p>阳光保证</p>
                </li>
                <li>
                    <i class="iconfont icon-app"></i>
                    <p>产品丰富</p>
                </li>
                <li>
                    <i class="iconfont icon-service"></i>
                    <p>卓越服务</p>
                </li>
                <li>
                    <i class="iconfont icon-label"></i>
                    <p>预定价格保障</p>
                </li>
                <li>
                    <i class="iconfont icon-hotel"></i>
                    <p>酒店升级保障</p>
                </li>
                <li>
                    <i class="iconfont icon-flight"></i>
                    <p>航班延误保障</p>
                </li>
                <li>
                    <i class="iconfont icon-fault"></i>
                    <p>特殊原因退订保障</p>
                </li>
                <li>
                    <i class="iconfont icon-rain"></i>
                    <p>不可抗力退订保障</p>
                </li>
                <li>
                    <i class="iconfont icon-disasters"></i>
                    <p>重大灾害保障</p>
                </li>
            </ul>
        </div>
    </div>

    <div class="container ez-container ez-links">
        <ul class="list-inline links-list">
            <h4>合作伙伴</h4>
            <li><a href="#"><img src="../../images/links/link1.gif" class="center-block img-responsive"></a></li>
            <li><a href="#"><img src="../../images/links/link2.gif" class="center-block img-responsive"></a></li>
            <li><a href="#"><img src="../../images/links/link3.gif" class="center-block img-responsive"></a></li>
            <li><a href="#"><img src="../../images/links/link4.gif" class="center-block img-responsive"></a></li>
            <li><a href="#"><img src="../../images/links/link5.gif" class="center-block img-responsive"></a></li>
            <li><a href="#"><img src="../../images/links/link6.gif" class="center-block img-responsive"></a></li>
            <li><a href="#"><img src="../../images/links/link7.gif" class="center-block img-responsive"></a></li>
            <li><a href="#"><img src="../../images/links/link8.gif" class="center-block img-responsive"></a></li>
            <li><a href="#"><img src="../../images/links/link9.gif" class="center-block img-responsive"></a></li>
            <li><a href="#"><img src="../../images/links/link10.gif" class="center-block img-responsive"></a></li>
            <li><a href="#"><img src="../../images/links/link11.gif" class="center-block img-responsive"></a></li>
            <li><a href="#"><img src="../../images/links/link12.gif" class="center-block img-responsive"></a></li>
            <li><a href="#"><img src="../../images/links/link13.gif" class="center-block img-responsive"></a></li>
            <li><a href="#"><img src="../../images/links/link14.gif" class="center-block img-responsive"></a></li>
            <li><a href="#"><img src="../../images/links/link15.png" class="center-block img-responsive"></a></li>
            <li><a href="#"><img src="../../images/links/link16.gif" class="center-block img-responsive"></a></li>
            <li><a href="#"><img src="../../images/links/link17.gif" class="center-block img-responsive"></a></li>
            <li><a href="#"><img src="../../images/links/link18.gif" class="center-block img-responsive"></a></li>
        </ul>
    </div>

    <div class="container ez-container ez-category">
        <div class="footer-logo">
            <img src="../../images/footer-logo.png">
        </div>
        <div class="footer-category text-center">
            <div class="category-grid">
                <p class="title">订购指南</p>
                <ul class="category-list">
                    <li><a href="#">订购流程</a></li>
                    <li><a href="#">客户协议</a></li>
                    <li><a href="#">更改取消</a></li>
                    <li><a href="#">使用及隐私条款</a></li>
                </ul>
            </div>
            <div class="category-grid">
                <p class="title">用户中心</p>
                <ul class="category-list">
                    <li><a href="#">用户注册/登录</a></li>
                    <li><a href="#">找回密码</a></li>
                    <li><a href="#">付款方式</a></li>
                    <li><a href="#">积分奖励</a></li>
                    <li><a href="#">会员俱乐部</a></li>
                    <li><a href="#">旅游保险</a></li>
                </ul>
            </div>

            <div class="category-grid">
                <p class="title">帮助中心</p>
                <ul class="category-list">
                    <li><a href="#">公司简介</a></li>
                    <li><a href="#">签证服务</a></li>
                    <li><a href="#">旅游保险</a></li>
                    <li><a href="#">网站地图</a></li>
                </ul>
            </div>

            <div class="category-grid">
                <p class="title">新阳光合作</p>
                <ul class="category-list">
                    <li><a href="#">友情链接</a></li>
                    <li><a href="#">商务合作</a></li>
                    <li><a href="#">网站联盟</a></li>
                </ul>
            </div>

            <div class="category-grid">
                <p class="title">新阳光国际</p>
                <ul class="category-list">
                    <li><a href="#">关于我们</a></li>
                    <li><a href="#">联系我们</a></li>
                    <li><a href="#">招聘英才</a></li>
                    <li><a href="#">版权</a></li>
                </ul>
            </div>

        </div>
        <div class="footer-qrcode text-center pull-right">
            <img src="../../images/qrcode.png" class="center-block img-responsive">
            <p>关注微信公众号</p>
        </div>
    </div>

    <ez-website></ez-website>
    <div class="clearfix"></div>
</footer>`
})

//边栏
Vue.component('ez-aside', {
    template: ` <aside class="ez-aside">
    <div class="aside-box text-center">
        <div class="aside-shopcart">
            <a href="#"><i class="iconfont icon-shopcart"></i></a>
            <div class="shop-text">购</div>
            <div class="shop-text">物</div>
            <div class="shop-text">车</div>
            <div class="shop-num">2</div>
        </div>
        <div class="aside-contact">
            <!--电话-->
            <div style="position: relative;">
                <i class="iconfont icon-phonecall ez-btn-phone"></i>
                <div class="tooltip left in ez-tooltip ez-tooltip-phonecall" role="tooltip" style="display: none">
                    <div class="tooltip-arrow"></div>
                    <div class="tooltip-inner text-center">
                        <h4 class="title text-blue">电话客服</h4>
                        <p class="text-gray">留下您的电话，我们会立刻回复哦</p>
                        <form class="form-horizontal" onsubmit="">
                            <div class="form-group">
                                <select class="form-control">
                                    <option value="">选择国家</option>
                                    <option value="1">中国</option>
                                    <option value="2">美国</option>
                                    <option value="3">日本</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <input type="text" class="form-control" placeholder="输入电话号码">
                            </div>
                        </form>
                        <a class="btn ez-btn-parmary ez-btn-xl">确定</a>
                        <p class="text-gray">全球7*24小时客服电话</p>
                        <p class="text-darkgray">400-666-8888</p>
                    </div>
                </div>
            </div>
            <!--腾讯qq-->
            <div style="position: relative;">
                <i class="iconfont icon-qq ez-btn-qq" style="font-weight: bold"></i>
                <div class="tooltip left in ez-tooltip ez-tooltip-qq" role="tooltip" style="display: none;">
                    <div class="tooltip-arrow"></div>
                    <div class="tooltip-inner text-center">
                        <h4 class="title text-blue">QQ</h4>
                        <div class="tooltip-icon-qq">
                            <i class="iconfont icon-qq-s"></i>
                        </div>
                        <a class="btn ez-btn-parmary ez-btn-xl">点我，联系我们</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="back-to-top text-center">
        <a class="btn-back"><i class="iconfont icon-arrow-top"></i></a>
    </div>
</aside>`
})

//备案信息
Vue.component('ez-website', {
    template: `<footer class="ez-footer">
    <div class="container ez-container footer-bottom">
        <div class="col-md-12 text-center copyright">
            <p>Copyright © 2018-2028 | 万事通 Lulutrip | All Rights Reserved.</p>
            <p>美国万事通有限公司 | 粤ICP备13084118号-11</p>
        </div>
    </div>
    </footer>`
})

//模块
Vue.component('ez-module', {
    props: ['htmlName', 'htmlSeal'],
    data: function () {
        return {
            contentList: [],
        }
    },
    mounted() {
        this.getModuleData();
    },
    methods: {
        //点击模块
        moduleClick(type, id){
            let url = "../";
            switch (type) {
                case 1:
                    url += "B/B-1.html";
                    break;
                case 2:
                    // url += "B/B-1.html";
                    break;
                case 3:
                    url += "M/M1-1.html";
                    break;
                case 4:
                    url += "L/L1-3-1.html?id="+id;
                    break;
                case 5:
                    url += "K/K1-2.html";
                    break;
                case 6:
                    url += "B/B-1.html";
                    break;
                case 7:
                    url = id;
                    break;
                case 8:
                    url += "J/J0-1.html";
                    break;
                case 9:
                    url += "M/M1-1.html";
                    break;
                case 10:
                    url += "H/H1-1.html";
                    break;
                case 11:
                    url += "H/H1-1.html";
                    break;
                case 12:
                    url += "F/F1-1.html?id="+id;
                    break;
                case 13:
                    url += "index/A1-8.html";
                    break;
                case 14:
                    url += "B/B-1.html";
                    break;
                case 15:
                    url += "F/F1-1.html?id="+id;
                    break;
                case 16:
                    url += "L/L1-3.html";
                    break;
                case 17:
                    url += "A1-8.html";
                    break;
            }
            if(url != "../"){
                location.href = url;
            }
        },
        //查询模块
        getModuleData() {
            if (!this.htmlName || !this.htmlSeal) {
                throw new Error("模块参数错误");
            }
            console.log(`${this.htmlName}--------${this.htmlSeal}`);
            const this_ = this;
            requestGet(getModuleDataInfoUrl, {
                htmlName: this.htmlName,
                htmlSeal: this.htmlSeal,
            }, function (data) {
                this_.contentList = data.body.list;
                this_.dataInit();
            });
        },
        //处理数据
        dataInit() {
            for (const [key, list] of Object.entries(this.contentList)) {
                console.log(key);
                console.log(list);
            }
        },
        //点击导航栏
        titleIndexClick(index1, index2) {
            Vue.set(this.contentList[index1], 'index', index2);
        },
        //跳转详情
        goToInfo(type) {
            switch (type) {
                case 1: location.href="../"; break;
            
                default:
                    break;
            }
        },
    },
    filters: {
        classVc(lists) {
            if (lists.moduleType == 3 && lists.moduleSize == "1+1+3" && lists.type == 8) return "ez-index-4";
            if (lists.moduleType == 3 && lists.moduleSize == "2*4" && lists.type == 8) return "ez-index-5 ez-index-public";
            if (lists.moduleType == 3 && lists.moduleSize == "3*1" && lists.type == 8) return "ez-index-6";
            if (lists.moduleType == 3 && lists.moduleSize == "2*3" && lists.type == 12) return "ez-index-7";
            if (lists.moduleType == 3 && lists.moduleSize == "2*4" && lists.type == 12) return "ez-index-7";
            if (lists.moduleType == 3 && lists.moduleSize == "1+1+3" && lists.type == 12) return "ez-index-4";
            if (lists.moduleType == 3 && lists.moduleSize == "2*3" && lists.type == 15) return "ez-index-10 ez-index-public";
            if (lists.moduleType == 3 && lists.moduleSize == "1+1+3" && lists.type == 15) return "ez-index-4";
            if (lists.moduleType == 3 && lists.moduleSize == "2*4" && lists.type == 15) return "ez-index-12 ez-index-public";
            if (lists.moduleType == 5) return "col-md-12 ez-index-cruise";
            if (lists.moduleType == 3 && lists.type == 5) return "ez-index-public ez-index-14";
            if (lists.moduleType == 3 && lists.moduleSize == "1*4" && lists.type == 11) return "ez-index-traveler col-md-12";
            if (lists.moduleType == 3 && lists.moduleSize == "2+3" && lists.type == 11) return "ez-gobal-traveler col-md-12";
            if (lists.moduleType == 3 && lists.moduleSize == "2*4" && lists.type == 11) return "ez-gobal-traveler col-md-12";
            if (lists.moduleType == 3 && lists.moduleSize == "2*3" && lists.type == 11) return "ez-index-public ez-index-17";
            if (lists.moduleType == 3 && lists.moduleSize == "2*3" && lists.type == 3) return "ez-index-public ez-index-24";
            if (lists.moduleType == 2 && lists.moduleSize == "1*3" && lists.type == 4) return "ez-index-slide col-md-12";
            if (lists.moduleType == 3 && lists.moduleSize == "2*3" && lists.type == 4) return "ez-index-public ez-index-5";
            if (lists.moduleType == 3 && lists.moduleSize == "2*4" && lists.type == 4) return "ez-index-public ez-index-5";
            if (lists.moduleType == 3 && lists.moduleSize == "1*4" && lists.type == 3) return "ez-index-theme col-md-12";
            if (lists.moduleType == 3 && lists.moduleSize == "2+3" && lists.type == 3) return "ez-index-month col-md-12";
            if (lists.moduleType == 3 && lists.moduleSize == "1+2" && lists.type == 7) return "ez-index-activity col-md-12";
        }
    },
    template: `               
     <div><section class="ez-index-wrap" :class="lists |  classVc" v-for="(lists, index1) in contentList" :key="lists.id">
    <div class="ez-index-hot col-md-12 text-center" v-if="lists.moduleType == 3 &&((lists.type == 7 && lists.moduleSize == '1+2') || (lists.type == 3 && (lists.moduleSize == '1*4' || lists.moduleSize == '2+3')) || lists.type == 14 || (lists.type == 11 && (lists.moduleSize == '1*4' || lists.moduleSize == '2+3' || lists.moduleSize == '2*4' )))">
            <div class="ez-content-title" style="width:500px;">
                <div class="title-icon title-icon-left"></div>
                <div class="content-title">{{lists.name}}</div>
                <div class="title-icon title-icon-right"></div>
            </div>
            <div class="ez-content-subtitle">
                <div class="subtitle-text">FOLLOWING MORE DISPLAY</div>
            </div>
    </div>
    <div class="ez-index-box col-lg-12" v-else  v-show="lists.moduleType != 5 && lists.moduleType == 3"> 
        <div class="title-box ez-title-style1">
            <h4 class="title">{{lists.name}}<span class="sub-title">CITY CAR RENTAL</span></h4>
        </div>
        <ul class="list-inline ez-title-nav" v-if="lists.moduleDetails">
            <li :class="{'active':lists.index==index2}" v-for="(list, index2) in lists.moduleDetails" :key="index2" @click="titleIndexClick(index1,index2)">{{list.firstTypeContent}}</li>
            <li>MORE >></li>
        </ul>
    </div>
    <div class="ez-index-rental pull-left" v-if="index2 == lists.index && lists.moduleDetails &&lists.moduleType == 3 && lists.type == 1"
    v-for="(list, index2) in lists.moduleDetails" :key="index2">
        <div class="col-md-4 ez-index-grid" v-for="(carInfo, index3) in list.carInfoList" :key="index3" @click="moduleClick(1,carInfo.id)">
            <div class="grid-img">
                <img :src="carInfo.carImg" class="center-block img-responsive">
            </div>
            <div class="text-center grid-text">
                <h4 class="title">{{carInfo.countryName}} • {{carInfo.cityName}}</h4>
                <p>{{currencySign}}{{carInfo.price}}<span>/元起</span></p>
            </div>
        </div>
    </div>
    <div class="box-left pull-left" v-if="lists.index == index2 && lists.moduleDetails && lists.moduleType == 3  && lists.moduleSize == '2*3' && lists.type == 3"
        v-for="(list, index2) in lists.moduleDetails" :key="index2">
            <div class="col-md-4 box-card ez-card-v" v-for="(comCity, index3) in list.comCityList" :key="index3" @click="moduleClick(3,comCity.id)">
                <div class="card-img">
                    <img :src="comCity.photoUrl?comCity.photoUrl.split(',')[0]:''" class="center-block img-responsive">
                </div>
                <div class="card-text">
                    <h4 class="title">{{comCity.countryName}}·{{comCity.cityName}}</h4>
                    <div class="text-gray content beyond-content-4"> {{comCity.cityDetails}} </div>
                </div>
            </div>
    </div>
    <div class="ez-nav-tabs" v-if="lists.moduleDetails && lists.moduleType == 3  && lists.moduleSize == '1*4' && lists.type == 3">
            <!-- Nav tabs -->
            <ul class="tab-list list-inline">
                    <li :class="{'active':lists.index==index2}" v-for="(list, index2) in lists.moduleDetails" :key="index2"><a>{{list.firstTypeContent}}</a></li>
            </ul>
            <!-- Tab panes -->
            <div class="tab-content">
                <!--选项卡1-->
                <div class="tab-pane"  v-for="(list, index2) in lists.moduleDetails" :key="index2" :class="{'active':lists.index==index2}">
                    <div class="col-md-3 img-md-v"  v-for="(comCity, index3) in list.comCityList" :key="index3">
                        <img :src="comCity.photoUrl?comCity.photoUrl.split(',')[0]:''" class="img-responsive center-block">
                    </div>
                </div>
            </div>
    </div>
    <div class="ez-nav-tabs col-md-12" v-if="lists.moduleDetails && lists.moduleType == 3  && lists.moduleSize == '2+3' && lists.type == 3">
            <!-- Nav tabs -->
            <ul class="tab-list list-inline" v-if="lists.moduleDetails">
                    <li class="col-md-1" :class="{'active':lists.index==index2}" v-for="(list, index2) in lists.moduleDetails" :key="index2"><a>{{list.firstTypeContent}}</a></li>
                 </ul>
            <!-- Tab panes -->
            <div class="tab-content ez-img-grid">
                <!--1月-->
                <div class="tab-pane" v-for="(list, index2) in lists.moduleDetails" :key="index2" :class="{'active':lists.index==index2}">
                    <div :class="index3 < 2?'col-md-6 img-lg':'col-md-4 img-md'"  v-for="(comCity, index3) in list.comCityList" :key="index3" @click="moduleClick(3,comCity.id)">
                        <img  :src="comCity.photoUrl?comCity.photoUrl.split(',')[0]:''" >
                    </div>
                </div>
            </div>
    </div>
    <div class="box-left pull-left"  v-if="lists.index == index2 && lists.moduleDetails && lists.moduleType == 3  && lists.moduleSize == '2*3' && lists.type == 4"
    v-for="(list, index2) in lists.moduleDetails" :key="index2">
            <div class="col-md-4 box-card ez-card-v" v-for="(scenicSpot, index3) in list.scenicSpotList" :key="index3" @click="moduleClick(4,scenicSpot.id)">
                <div class="card-img">
                    <img :src="scenicSpot.imgUrl?scenicSpot.imgUrl.split(',')[0]:''" class="center-block img-responsive">
                </div>
                <div class="card-text">
                    <h4 class="title">{{scenicSpot.name}}</h4>
                    <div class="text-gray">
                        <span>{{scenicSpot.commentNum}}个点评，满意度{{scenicSpot.star | perVc}}%</span>
                        <span class="pull-right text-orange ez-price"><span>{{currencySign}}</span>{{scenicSpot.price}}</span>
                    </div>
                    <div class="text-gray card-like text-right">
                        <i class="iconfont icon-eye"></i>{{scenicSpot.lookNum}}
                        <i class="iconfont icon-heart-s text-lightorange ez-ml-10"></i>{{scenicSpot.collectionNum}}
                    </div>
                </div>
            </div>
     </div>
    <div class="box-left pull-left" style="width: inherit" v-if="lists.index == index2 && lists.moduleDetails && lists.moduleType == 3  && lists.moduleSize == '2*4' && lists.type == 4"
    v-for="(list, index2) in lists.moduleDetails" :key="index2">
            <div class="col-md-3 box-card ez-card-v" v-for="(scenicSpot, index3) in list.scenicSpotList" :key="index3" @click="moduleClick(4,scenicSpot.id)">
                <div class="card-img">
                    <img :src="scenicSpot.imgUrl?scenicSpot.imgUrl.split(',')[0]:''" class="center-block img-responsive">
                </div>
                <div class="card-text">
                    <h4 class="title">{{scenicSpot.name}}</h4>
                    <div class="text-gray">
                        <span>{{scenicSpot.commentNum}}个点评，满意度{{scenicSpot.star | perVc}}%</span>
                        <span class="pull-right text-orange ez-price"><span>{{currencySign}}</span>{{scenicSpot.price}}</span>
                    </div>
                    <div class="text-gray card-like text-right">
                        <i class="iconfont icon-eye"></i>{{scenicSpot.lookNum}}
                        <i class="iconfont icon-heart-s text-lightorange ez-ml-10"></i>{{scenicSpot.collectionNum}}
                    </div>
                </div>
            </div>
     </div>
    <div class="box-left pull-left" v-if="index2 == lists.index && lists.moduleDetails &&lists.moduleType == 3 && lists.type == 5"
    v-for="(list, index2) in lists.moduleDetails" :key="index2">
        <div class="col-md-4 box-card ez-card-v" v-for="(linerLine, index3) in list.linerLineList" :key="index3" @click="moduleClick(5,linerLine.id)">
            <div class="card-img">
                <img :src="linerLine.imgUrl?linerLine.imgUrl.split(',')[0]:''"  class="center-block img-responsive">
            </div>
            <div class="card-text">
                <h4 class="title">{{linerLine.name}}</h4>
                <div class="text-gray card-like">
                    <div class="pull-right text-orange ez-price">{{currencySign}}{{linerLine.price}}<span class="text-gray">/元起</span></div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-12 activity-banner" v-if="lists.moduleType == 3 && lists.type == 7 && lists.moduleSize == '1+2'"  @click="moduleClick(7,lists.url)">
            <div class="activity-banner-lg pull-left">
                <a><img :src="lists.img?lists.img.split(',')[0]:''"></a>
            </div>
            <div class="activity-banner-md pull-right">
                <div><a ><img :src="lists.img?lists.img.split(',')[1]:''"></a></div>
                <div><a ><img :src="lists.img?lists.img.split(',')[2]:''"></a></div>
            </div>
     </div>
    <div class="ez-index-rental pull-left" v-if="index2 == lists.index && lists.moduleDetails && lists.moduleType == 3  && lists.moduleSize == '2*3' && lists.type == 8 "
    v-for="(list, index2) in lists.moduleDetails" :key="index2">
        <div class="col-md-4 ez-index-grid" v-for="(travelCustomization, index3) in list.travelCustomizationList" :key="index3"  @click="moduleClick(8,travelCustomization.id)">
            <div class="grid-img">
                <img :src="travelCustomization.img" class="center-block img-responsive">
            </div>
            <div class="grid-text-sm custom-box">
                <h4 class="title">{{travelCustomization.name}}</h4>
                <div><i class="iconfont icon-mark"></i>&nbsp;{{travelCustomization.cityNum}}个目的地，{{travelCustomization.scenicNum}}个景点</div>
                <div>
                    <div class="pull-left"><i class="iconfont icon-eye"></i>&nbsp;{{travelCustomization.lookNum}}</div>
                    <div class="pull-right"><i class="iconfont icon-heart"></i>&nbsp;{{travelCustomization.collectionNum}}</div>
                </div>
            </div>
        </div>
    </div>
    <div class="box-left pull-left" v-if="index2 == lists.index && lists.moduleDetails && lists.moduleType == 3  && lists.moduleSize == '1+1+3' && lists.type == 8" 
        v-for="(list, index2) in lists.moduleDetails" :key="index2" >
        <div class="box-img" v-for="(travelCustomization, index3) in list.travelCustomizationList" :key="index3" v-if="index3 === 0"  @click="moduleClick(8,travelCustomization.id)">
            <img :src="travelCustomization.img">
            <div class="info">
                <h4>{{travelCustomization.name}}</h4>
                <p class="text-gray">
                    <span class="pull-left"><i class="iconfont icon-mark"></i>&nbsp;{{travelCustomization.cityNum}}个目的地，{{travelCustomization.scenicNum}}个景点</span>
                    <span class="pull-right">
                        <i class="iconfont icon-eye"></i>{{travelCustomization.lookNum}}&nbsp;&nbsp;
                        <i class="iconfont icon-heart-s text-orange"></i>{{travelCustomization.collectionNum}}
                    </span>
                </p>
            </div>
        </div>
        <div class="box-card ez-card-h" v-for="(travelCustomization, index3) in list.travelCustomizationList" :key="index3+10" v-if="index3 == 1"  @click="moduleClick(8,travelCustomization.id)">
            <div class="card-img"><img :src="travelCustomization.img" class="center-block img-responsive"></div>
            <div class="card-text">
                <h4 class="title">{{travelCustomization.name}}</h4>
                <div class="text-gray"><i class="iconfont icon-mark"></i>{{travelCustomization.cityNum}}个目的地，{{travelCustomization.scenicNum}}个景点</div>
                <div class="text-gray card-like">
                    <a class="pull-left"><i class="iconfont icon-eye"></i>{{travelCustomization.lookNum}}</a>
                    <a class="pull-right"><i class="iconfont icon-heart-s text-orange"></i>{{travelCustomization.collectionNum}}</a>
                </div>
            </div>
        </div>
    </div>
    <div class="box-right pull-right" v-if="index2 == lists.index && lists.moduleDetails && lists.moduleType == 3  && lists.moduleSize == '1+1+3' && lists.type == 8" 
    v-for="(list, index2) in lists.moduleDetails" :key="index2+10" >
        <div class="box-card ez-card-h" v-for="(travelCustomization, index3) in list.travelCustomizationList" :key="index3+20" v-if="index3 > 1"  @click="moduleClick(8,travelCustomization.id)">
            <div class="card-img"><img :src="travelCustomization.img" class="center-block img-responsive"></div>
            <div class="card-text">
                <h4 class="title">{{travelCustomization.name}}</h4>
                <div class="text-gray"><i class="iconfont icon-mark"></i>{{travelCustomization.cityNum}}个目的地，{{travelCustomization.scenicNum}}个景点</div>
                <div class="text-gray card-like">
                    <a class="pull-left"><i class="iconfont icon-eye"></i>{{travelCustomization.lookNum}}</a>
                    <a class="pull-right"><i class="iconfont icon-heart-s text-orange"></i>{{travelCustomization.collectionNum}}</a>
                </div>
            </div>
        </div>
    </div>
    <div class="box-left pull-left" v-if="index2 == lists.index && lists.moduleDetails && lists.moduleType == 3  && lists.moduleSize == '3*1' && lists.type == 8"
     v-for="(list, index2) in lists.moduleDetails" :key="index2" >
        <div class="box-card ez-card-h" v-for="(travelCustomization, index3) in list.travelCustomizationList" :key="index3"  @click="moduleClick(8,travelCustomization.id)">
            <div class="card-img"><img :src="travelCustomization.img" class="center-block img-responsive"></div>
            <div class="card-text">
                <h4 class="title">{{travelCustomization.name}}</h4>
                <p class="intro text-gray">本案例中的行程为定制师推荐，定制行程后可以根据需要更换景点酒店</p>
                <div class="card-like">
                    <a class="pull-left text-gray "><i class="iconfont icon-mark"></i>{{travelCustomization.cityNum}}个目的地，{{travelCustomization.scenicNum}}个景点</a>
                    <a class="pull-right text-gray ">
                        <i class="iconfont icon-eye"></i>{{travelCustomization.lookNum}}
                        <i class="iconfont icon-heart-s text-orange ez-ml-10 btn-like"></i>{{travelCustomization.collectionNum}}
                    </a>
                </div>
            </div>
        </div>
    </div>
    <div class="box-left pull-left" style="width: inherit"  v-if="index2 == lists.index && lists.moduleDetails && lists.moduleType == 3  && lists.moduleSize == '2*4' && lists.type == 8"
    v-for="(list, index2) in lists.moduleDetails" :key="index2" >
        <div class="col-md-3 box-card ez-card-v"  v-for="(travelCustomization, index3) in list.travelCustomizationList" :key="index3"  @click="moduleClick(8,travelCustomization.id)">
            <div class="card-img">
                <img :src="travelCustomization.img" class="center-block img-responsive">
            </div>
            <div class="card-text">
                <h4 class="title">{{travelCustomization.name}}</h4>
                <div class="text-gray"><i class="iconfont icon-mark"></i>&nbsp;{{travelCustomization.cityNum}}个目的地，{{travelCustomization.scenicNum}}个景点</div>
                <div class="text-gray card-like">
                    <div class="pull-right text-orange ez-price">¥699<span class="text-gray">/元起</span></div>
                </div>
            </div>
        </div>
    </div>
    <div class="ez-nav-tabs"  v-if="lists.moduleDetails && lists.moduleType == 3  && lists.moduleSize == '1*4' && lists.type == 11" >
        <!-- Nav tabs -->
        <ul class="tab-list list-inline" v-if="lists.moduleDetails">
            <li :class="{'active':lists.index==index2}" v-for="(list, index2) in lists.moduleDetails" :key="index2"><a>{{list.firstTypeContent}}</a></li>
        </ul>
        <!-- Tab panes -->
        <div class="tab-content">
            <div class="tab-pane" v-for="(list, index2) in lists.moduleDetails" :key="index2" :class="{'active':lists.index==index2}">
                <div class="col-md-3 player-card" v-for="(guide, index3) in list.guideList" :key="index3"  @click="moduleClick(8,travelCustomization.id)">
                    <div class="player-card-img text-center">
                        <img :src="guide.memberPhoto"  class="center-block img-responsive img-circle">
                    </div>
                    <h4 class="text-center">明星玩家·{{guide.realName}}</h4>
                    <div class="content beyond-content-9"> {{guide.introduction}} </div>
                    <div class="location text-center">
                        <i class="iconfont icon-mark text-lightorange"></i><span class="text-blue">{{guide.countryName}}·{{guide.cityName}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="ez-nav-tabs"  v-if="lists.moduleDetails && lists.moduleType == 3  && lists.moduleSize == '2+3' && lists.type == 11">
            <!-- Nav tabs -->
            <ul class="tab-list list-inline" v-if="lists.moduleDetails">
                <li :class="{'active':lists.index==index2}" v-for="(list, index2) in lists.moduleDetails" :key="index2"><a>{{list.firstTypeContent}}</a></li>
             </ul>
            <!-- Tab panes -->
            <div class="tab-content ez-img-grid">
                <div class="tab-pane" v-for="(list, index2) in lists.moduleDetails" :key="index2" :class="{'active':lists.index==index2}">
                    <div :class="index3 < 2?'col-md-6 img-lg':'col-md-4 img-md'"  v-for="(guide, index3) in list.guideList" :key="index3"  @click="moduleClick(11,guide.id)">
                        <img :src="guide.memberPhoto" >
                        <div class="city-name text-center">
                            <div class="ch-name"><span>{{guide.realName}}</span></div>
                            <div class="en-name">TOKYO</div>
                        </div>
                    </div>
                </div>
            </div>
    </div>
    <div class="ez-nav-tabs"  v-if="lists.moduleDetails && lists.moduleType == 3  && lists.moduleSize == '2*4' && lists.type == 11">
            <!-- Nav tabs -->
            <ul class="tab-list list-inline" v-if="lists.moduleDetails">
                    <li :class="{'active':lists.index==index2}" v-for="(list, index2) in lists.moduleDetails" :key="index2"><a>{{list.firstTypeContent}}</a></li>
             </ul>
            <!-- Tab panes -->
            <div class="tab-content ez-img-grid">
                <div class="tab-pane "  v-for="(list, index2) in lists.moduleDetails" :key="index2" :class="{'active':lists.index==index2}">
                    <div class="col-md-3 img-md-v" v-for="(guide, index3) in list.guideList" :key="index3" @click="moduleClick(11,guide.id)">
                        <img :src="guide.memberPhoto" >
                        <div class="city-name text-center">
                            <div class="ch-name"><span>{{guide.realName}}</span></div>
                            <div class="en-name">ROME</div>
                        </div>
                    </div>
                </div>
            </div>
    </div>
    <div class="box-left pull-left" v-if="lists.index == index2 && lists.moduleDetails && lists.moduleType == 3  && lists.moduleSize == '2*3' && lists.type == 11"
        v-for="(list, index2) in lists.moduleDetails" :key="index2">
            <div class="col-md-4 ez-hot-card" v-for="(guide, index3) in list.guideList" :key="index3" @click="moduleClick(11,guide.id)">
                <div class="hot-card-img">
                    <img src="../../images/hot-1.png">
                    <div class="hot-card-logo">
                        <img src="../../images/avatar-1.png">
                    </div>
                </div>
                <div class="hot-card-text">
                    <h4 class="text-center">明星玩家·{{guide.realName}}</h4>
                    <p class="content">{{guide.introduction}}</p>
                    <div>
                        <span class="text-gray"><i class="iconfont icon-mark"></i>{{guide.countryName}}·{{guide.cityName}}</span>
                        <div class="pull-right text-orange ez-price">{{currencySign}}{{guide.price}}<span class="text-gray">天</span></div>
                    </div>
                </div>
            </div>
    </div>
    <div class="text-center" v-if=" lists.moduleDetails && lists.moduleType == 3  && lists.moduleSize == '1*4' && lists.type == 11">
        <a class="btn link-more">查看更多></a>
    </div>
    <div class="box-right pull-left" v-if="index2 == lists.index && lists.moduleDetails && lists.moduleType == 3  && lists.moduleSize == '2*3' && lists.type == 12"
        v-for="(list, index2) in lists.moduleDetails" :key="index2">
        <div class="col-md-4 box-card ez-card-v" v-for="(route, index3) in list.routeList" :key="index3" @click="moduleClick(12,route.id)">
            <div class="card-img">
                <img :src="route.carImg?route.carImg.split(',')[0]:''" class="center-block img-responsive">
                <div class="card-img-label">
                    <h4 class="text-white">{{route.startCityContent}}<i>出发</i></h4>
                </div>
            </div>
            <div class="card-text">
                <h4 class="title beyond-content-2">{{route.title}}</h4>
                <div class="ez-icon-tag" v-for="(tag, index4) in (route.tagContent || '').split(',')" :key="index4" v-if="index4 < 2">
                    <div class="ez-triangle-left"><i></i></div>
                    <div class="ez-rect">{{tag}}</div>
                </div>
                <div class="text-gray card-like">
                    <div class="pull-right text-orange ez-price">{{currencySign}}{{route.price}}<span class="text-gray">/元起</span></div>
                </div>
            </div>
        </div>
    </div>
    <div class="box-left pull-left" v-if="index2 == lists.index && lists.moduleDetails && lists.moduleType == 3  && lists.moduleSize == '1+1+3' && lists.type == 12"
    v-for="(list, index2) in lists.moduleDetails" :key="index2">
        <div class="box-img"  v-for="(route, index3) in list.routeList" :key="index3" v-if="index3 == 0" @click="moduleClick(12,route.id)">
            <img :src="route.carImg?route.carImg.split(',')[0]:''">
            <div class="info">
                <h4>{{route.title}}</h4>
                <div class="text-gray">
                    <div class="text-gray card-like">
                        <div class="pull-right text-orange ez-price">{{currencySign}}{{route.price}}<span class="text-gray">/元起</span></div>
                    </div>
                </div>
            </div>
            <div class="index-img-label">
                <h4 class="text-white">{{route.startCityContent}}<i>出发</i></h4>
            </div>
        </div>
        <div class="box-card ez-card-h" v-for="(route, index3) in list.routeList" :key="index3+5" v-if="index3 == 1" @click="moduleClick(12,route.id)">
            <div class="card-img">
                <img :src="route.carImg?route.carImg.split(',')[0]:''"src="../../images/index-4-1.png" class="center-block img-responsive">
                <div class="card-img-label">
                    <h4 class="text-white">{{route.startCityContent}}<i>出发</i></h4>
                </div>
            </div>
            <div class="card-text">
                <h4 class="title">{{route.title}}</h4>
                <div class="ez-icon-tag" style="margin-bottom: 10px;" v-for="(tag, index4) in (route.tagContent || '').split(',')" :key="index4">
                    <div class="ez-triangle-left"><i></i></div>
                    <div class="ez-rect">{{tag}}</div>
                </div>
                <div class="text-gray card-like">
                    <div class="pull-right text-orange ez-price">{{currencySign}}{{route.price}}<span class="text-gray">/元起</span></div>
                </div>
            </div>
        </div>
    </div>
    <div class="box-right pull-right" v-if="index2 == lists.index && lists.moduleDetails && lists.moduleType == 3  && lists.moduleSize == '1+1+3' && lists.type == 12"
    v-for="(list, index2) in lists.moduleDetails" :key="index2+20">
        <div class="box-card ez-card-h" v-for="(route, index3) in list.routeList" :key="index3+20" v-if="index3 > 1" @click="moduleClick(12,route.id)">
            <div class="card-img">
                <img :src="route.carImg?route.carImg.split(',')[0]:''" class="center-block img-responsive">
                <div class="card-img-label">
                    <h4 class="text-white">{{route.startCityContent}}<i>出发</i></h4>
                </div>
            </div>
            <div class="card-text">
                <h4 class="title">{{route.title}}</h4>
                <div class="ez-icon-tag"  style="margin-bottom: 10px;" v-for="(tag, index4) in (route.tagContent || '').split(',')" :key="index4">
                    <div class="ez-triangle-left"><i></i></div>
                    <div class="ez-rect">{{tag}}</div>
                </div>
                <div class="text-gray card-like">
                    <div class="pull-right text-orange ez-price">{{currencySign}}{{route.price}}<span class="text-gray">/元起</span></div>
                </div>
            </div>
        </div>
    </div>
    <div class="box-right pull-left" style="width: inherit"  v-if="index2 == lists.index && lists.moduleDetails && lists.moduleType == 3  && lists.moduleSize == '2*4' && lists.type == 12"
        v-for="(list, index2) in lists.moduleDetails" :key="index2">
        <div class="col-md-3 box-card ez-card-v" v-for="(route, index3) in list.routeList" :key="index3" @click="moduleClick(12,route.id)">
            <div class="card-img">
                <img :src="route.carImg?route.carImg.split(',')[0]:''" class="center-block img-responsive">
                <div class="card-img-label">
                    <h4 class="text-white">{{route.startCityContent}}<i>出发</i></h4>
                </div>
            </div>
            <div class="card-text">
                <h4 class="title beyond-content-2">{{route.title}}</h4>
                <div class="ez-icon-tag" v-for="(tag, index4) in (route.tagContent || '').split(',')" :key="index4" v-if="index4 < 2">
                    <div class="ez-triangle-left"><i></i></div>
                    <div class="ez-rect">{{tag}}</div>
                </div>
                <div class="text-gray card-like">
                    <div class="pull-right text-orange ez-price">{{currencySign}}{{route.price}}<span class="text-gray">/元起</span></div>
                </div>
            </div>
        </div>
    </div>
    <div class="row" v-if="lists.type == 14  && lists.moduleType == 3">
            <div class="col-md-3 ez-hot-card" v-for="(sysUser, index2) in lists.sysUserList" :key="index2" @click="moduleClick(14,sysUser.id)">
                <div class="hot-card-img">
                    <img :src="sysUser.companyLogo">
                    <div class="hot-card-logo">
                        <img :src="sysUser.companyimg">
                    </div>
                </div>
                <div class="hot-card-text">
                    <h4 class="text-center">{{sysUser.companyName}}</h4>
                    <p>{{sysUser.companyContent}}</p>
                </div>
            </div>
    </div>
    <div class="box-left pull-left"  v-if="index2 == lists.index && lists.moduleDetails && lists.moduleType == 3  && lists.moduleSize == '2*3' && lists.type == 15"
    v-for="(list, index2) in lists.moduleDetails" :key="index2">
        <div class="col-md-4 box-card ez-card-v" v-for="(route, index3) in list.routeList" :key="index3" @click="moduleClick(15,route.id)">
            <div class="card-img">
                <img :src="route.carImg?route.carImg.split(',')[0]:''" class="center-block img-responsive">
            </div>
            <div class="card-text">
                <h4 class="title beyond-content-2">{{route.title}}</h4>
                <div class="ez-icon-tag" v-for="(tag, index4) in (route.tagContent || '').split(',')" :key="index4" v-if="index4 < 2">
                    <div class="ez-triangle-left"><i></i></div>
                    <div class="ez-rect">{{tag}}</div>
                </div>
                <div class="text-gray card-like">
                    <div class="pull-right text-orange ez-price">{{currencySign}}{{route.price}}<span class="text-gray">/元起</span></div>
                </div>
            </div>
        </div>
    </div>
    <div class="box-left pull-left" v-if="index2 == lists.index && lists.moduleDetails && lists.moduleType == 3  && lists.moduleSize == '1+1+3' && lists.type == 15"
    v-for="(list, index2) in lists.moduleDetails" :key="index2">
            <div class="box-img" v-for="(route, index3) in list.routeList" :key="index3" v-if="index3 == 0" @click="moduleClick(15,route.id)">
                <img :src="route.carImg?route.carImg.split(',')[0]:''">
                <div class="info">
                    <h4>{{route.title}}</h4>
                    <div class="text-gray">
                        <div class="text-gray card-like">
                            <div class="pull-right text-orange ez-price">{{currencySign}}{{route.price}}<span class="text-gray">/元起</span></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="box-card ez-card-h" v-for="(route, index3) in list.routeList" :key="index3+10" v-if="index3 == 1" @click="moduleClick(15,route.id)">
                <div class="card-img">
                    <img :src="route.carImg?route.carImg.split(',')[0]:''" class="center-block img-responsive">
                </div>
                <div class="card-text">
                    <h4 class="title">{{route.title}}</h4>
                    <div class="ez-icon-tag" v-for="(tag, index4) in (route.tagContent || '').split(',')" :key="index4">
                            <div class="ez-triangle-left"><i></i></div>
                            <div class="ez-rect" style="margin-bottom: 10px;">{{tag}}</div>
                    </div>
                    <div class="text-gray card-like">
                        <div class="pull-right text-orange ez-price">{{currencySign}}{{route.price}}<span class="text-gray">/元起</span></div>
                    </div>
                </div>
            </div>
    </div>
    <div class="box-right pull-right" v-if="index2 == lists.index && lists.moduleDetails && lists.moduleType == 3  && lists.moduleSize == '1+1+3' && lists.type == 15"
        v-for="(list, index2) in lists.moduleDetails" :key="index2+30">
            <div class="box-card ez-card-h" v-for="(route, index3) in list.routeList" :key="index3+20" v-if="index3 > 1" @click="moduleClick(15,route.id)">
                <div class="card-img">
                    <img :src="route.carImg?route.carImg.split(',')[0]:''" class="center-block img-responsive">
                </div>
                <div class="card-text">
                    <h4 class="title">{{route.title}}</h4>
                    <div class="ez-icon-tag" v-for="(tag, index4) in (route.tagContent || '').split(',')" :key="index4">
                            <div class="ez-triangle-left"><i></i></div>
                            <div class="ez-rect" style="margin-bottom: 10px;">{{tag}}</div>
                    </div>
                    <div class="text-gray card-like">
                        <div class="pull-right text-orange ez-price">{{currencySign}}{{route.price}}<span class="text-gray">/元起</span></div>
                    </div>
                </div>
            </div>
    </div>
    <div class="box-left pull-left" v-if="index2 == lists.index && lists.moduleDetails && lists.moduleType == 3  && lists.moduleSize == '2*4' && lists.type == 15"
    v-for="(list, index2) in lists.moduleDetails" :key="index2">
            <div class="col-md-3 box-card ez-card-v" v-for="(route, index3) in list.routeList" :key="index3" @click="moduleClick(15,route.id)">
                <div class="card-img">
                    <img :src="route.carImg?route.carImg.split(',')[0]:''" class="center-block img-responsive">
                </div>
                <div class="card-text">
                    <h4 class="title beyond-content-2">{{route.title}}</h4>
                    <div class="ez-icon-tag" v-for="(tag, index4) in (route.tagContent || '').split(',')" :key="index4" v-if="index4 < 2">
                            <div class="ez-triangle-left"><i></i></div>
                            <div class="ez-rect" style="margin-bottom: 10px;">{{tag}}</div>
                    </div>
                    <div class="text-gray card-like">
                        <div class="pull-right text-orange ez-price">{{currencySign}}{{route.price}}<span class="text-gray">/元起</span></div>
                    </div>
                </div>
            </div>
    </div>
    <div class="ez-slide-container" v-if="lists.type == 4 && lists.moduleType == 2 && lists.moduleSize == '1*3' ">
            <div class="ez-slide-content">
                <ul>
                    <li class="pic1" v-for="(scenicSpot, index2) in lists.scenicSpotList" :key="index2" @click="moduleClick(4,scenicSpot.id)">
                        <div class="ez-slide-img">
                            <img :src="scenicSpot.imgUrl?scenicSpot.imgUrl.split(',')[0]:''">
                            <div class="ez-slide-mask">
                                <h4 class="title">{{scenicSpot.name}}</h4>
                                <div class="line"></div>
                                <p>{{scenicSpot.content}}</p>
                                <a href="#" class="btn link-more">查看详情</a>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="buttons">
                <a href="javascript:;" class="'active':index2==lists.index" v-for="(scenicSpot, index2) in lists.scenicSpotList" :key="index2"></a>
            </div>
    </div>
    <div class="ez-index-news pull-right" v-if="(lists.moduleType == 1 || lists.moduleType == 2) && !(lists.type == 4 && lists.moduleSize =='1*3')" >
            <div class="ez-aside-card" v-if="lists.type == 1">
                <div class="aside-card-title bg-style1">
                    <h4 class="title">{{lists.name}}</h4>
                    <span class="link-more">MORE>></span>
                </div>
                <div class="aside-card" v-for="(carInfo, index2) in lists.carInfoList" :key="index2" @click="moduleClick(1,carInfo.id)">
                    <div class="aside-card-no active">{{index2+1}}</div>
                    <div class="aside-card-car">
                        <img :src="carInfo.carImg" class="img-responsive center-block">
                    </div>
                    <div class="title">{{carInfo.carName}}</div>
                </div>
            </div>
            <div class="ez-aside-card"  v-if="lists.type == 2">
                <div class="aside-card-title bg-style1">
                    <h4 class="title">{{lists.name}}</h4>
                    <span class="link-more">MORE>></span>
                </div>
                <div class="aside-card" v-for="(comComment, index2) in lists.comCommentList" :key="index2" @click="moduleClick(2,comComment.id)">
                    <div class="aside-card-user">
                        <img :src="comComment.memberPhoto">
                        <div class="pull-left">{{comComment.memberName}}</div>
                        <div class="pull-right">{{comComment.createDate}}</div>
                    </div>
                    <div class="aside-card-msg text-gray beyond-content-2">{{comComment.content}}</div>
                </div>
            </div>
            <div class="ez-aside-card" v-if="lists.type == 3">
                <div class="aside-card-title bg-style1">
                    <h4 class="title">{{lists.name}}</h4>
                    <span class="link-more">MORE>></span>
                </div>
                <div class="aside-card" v-for="(comCity, index2) in lists.comCityList" :key="index2" @click="moduleClick(3,comCity.id)">
                    <div class="aside-card-img">
                        <img :src="comCity.photoUrl?comCity.photoUrl.split(',')[0]:''" class="center-block img-responsive">
                    </div>
                    <div class="aside-card-city">
                        <h4 class="title">{{comCity.cityName}}</h4>
                        <p class="text-gray">{{comCity.num}}个景点</p>
                    </div>
                </div>
            </div>
            <div class="ez-aside-card" v-if="lists.type == 4">
                <div class="aside-card-title bg-style3">
                    <h4 class="title">{{lists.name}}</h4>
                    <span class="link-more">MORE>></span>
                </div>
                <div class="aside-card"  v-for="(scenicSpot, index) in lists.scenicSpotList" :key="index" @click="moduleClick(4,scenicSpot.id)">
                    <div class="aside-card-img">
                        <img :src="scenicSpot.imgUrl?scenicSpot.imgUrl.split(',')[0]:''" class="img-responsive center-block">
                    </div>
                    <div class="aside-card-text">
                        <h5>{{scenicSpot.name}}</h5>
                        <div class="pull-right">
                            <i class="iconfont icon-eye"></i>&nbsp;{{scenicSpot.lookNum}}
                            <i class="iconfont icon-heart-s text-orange ez-ml-10 btn-like"></i>&nbsp;{{scenicSpot.collectionNum}}
                        </div>
                    </div>
                </div>
            </div>
            <div class="ez-aside-card" v-if="lists.type == 5">
                <div class="aside-card-title bg-style3">
                    <h4 class="title">{{lists.name}}</h4>
                    <span class="link-more">MORE>></span>
                </div>
                <div class="aside-card" v-for="(linerLine, index) in lists.linerLineList" :key="index" @click="moduleClick(5,linerLine.id)">
                    <div class="aside-card-img">
                        <img :src="linerLine.imgUrl?linerLine.imgUrl.split(',')[0]:''" class="img-responsive center-block">
                    </div>
                    <div class="aside-card-text">
                        <h5 class="beyond-content-2">{{linerLine.name}}</h5>
                        <div class="pull-right">
                            <i class="iconfont icon-eye"></i>&nbsp;{{linerLine.lookNum}}
                            <i class="iconfont icon-heart-s text-orange ez-ml-10 btn-like"></i>&nbsp;{{linerLine.collectionNum}}
                        </div>
                    </div>
                </div>
            </div>
            <div class="ez-aside-card" v-if="lists.type == 6">
                <div class="aside-card-title bg-style3">
                    <h4 class="title">{{lists.name}}</h4>
                    <span class="link-more">MORE>></span>
                </div>
                <div class="aside-card" v-for="(orderSys, index2) in lists.orderSysList" :key="index2" @click="moduleClick(6,orderSys.id)">
                    <div class="aside-card-msg">{{orderSys.title}}</div>
                    <div class="aside-card-user">
                        <img :src="orderSys.photo">
                        <div class="pull-left">{{orderSys.nickName}}</div>
                        <div class="pull-right">{{orderSys.createDate}}</div>
                    </div>
                </div>
            </div>
            <div class="news-banner" v-if="lists.type == 7"  @click="moduleClick(7,lists.url)">
                  <img :src="lists.img">
            </div>
            <div class="ez-aside-card" v-if="lists.type == 8">
                <div class="aside-card-title bg-style3">
                    <h4 class="title">{{lists.name}}</h4>
                    <span class="link-more">MORE>></span>
                </div>
                <div class="aside-card" v-for="(travelCustomization, index2) in lists.travelCustomizationList" :key="index2"  @click="moduleClick(8,travelCustomization.id)">
                    <div class="aside-card-img">
                        <img :src="travelCustomization.img"class="img-responsive center-block">
                    </div>
                    <div class="aside-card-text">
                        <h5>{{travelCustomization.name}}</h5>
                        <p class="text-gray text-right">{{travelCustomization.createDate}}</p>
                    </div>
                </div>
            </div>
            <div class="ez-aside-card" v-if="lists.type == 9">
                <div class="aside-card-title bg-style3">
                    <h4 class="title">{{lists.name}}</h4>
                    <span class="link-more">MORE>></span>
                </div>
                <div class="aside-card" v-for="(cityStrategy, index2) in lists.cityStrategyList" :key="index2" @click="moduleClick(9,cityStrategy.id)">
                    <div class="aside-card-msg">{{cityStrategy.title}}</div>
                    <div class="aside-card-user">
                        <img :src="cityStrategy.photo">
                        <div class="pull-left">{{cityStrategy.nickName}}</div>
                        <div class="pull-right">{{cityStrategy.createDate}}</div>
                    </div>
                </div>
            </div>
            <div class="ez-aside-card" v-if="lists.type == 10" >
                <div class="aside-card-title bg-style1">
                    <h4 class="title">{{lists.name}}</h4>
                    <span class="link-more">MORE>></span>
                </div>
                <div class="aside-card" v-for="(guideRoute, index2) in lists.guideRouteList" :key="index2" @click="moduleClick(10,guideRoute.id)">
                    <div class="aside-card-img">
                        <img :src="guideRoute.photo" class="img-responsive center-block">
                    </div>
                    <div class="aside-card-text">
                        <h5>{{guideRoute.title}}</h5>
                        <div class="text-orange text-right">{{currencySign}}{{guideRoute.price}}</div>
                    </div>
                </div>
            </div>
            <div class="ez-aside-card" v-if="lists.type == 11" >
                <div class="aside-card-title bg-style3 ez-mb-10">
                    <h4 class="title">{{lists.name}}</h4>
                    <span class="link-more">MORE>></span>
                </div>
                <div class="aside-card" v-for="(guide, index2) in lists.guideList" :key="index2" @click="moduleClick(11,guide.id)">
                    <div class="aside-card-img img-md">
                        <img :src="guide.memberPhoto" class="center-block img-responsive img-circle">
                    </div>
                    <div class="aside-card-city">
                        <h4 class="title">当地导游 • {{guide.realName}}</h4>
                        <p class="text-gray">服务{{guide.finishNum}}次</p>
                    </div>
                </div>
            </div>
            <div class="ez-aside-card" v-if="lists.type == 12">
                    <div class="aside-card-title bg-style1">
                        <h4 class="title">{{lists.name}}</h4>
                        <!-- <span class="link-more">MORE>></span> -->
                    </div>
                    <div class="aside-card" v-for="(route, index2) in lists.routeList" :key="index2" @click="moduleClick(12,route.id)">
                        <div class="aside-card-img">
                            <img :src="route.carImg?route.carImg.split(',')[0]:''" class="img-responsive center-block">
                        </div>
                        <div class="aside-card-text">
                            <h5>{{route.title}}</h5>
                            <div class="text-orange text-right">{{currencySign}}{{route.price}}</div>
                        </div>
                    </div>
            </div>
            <div class="ez-aside-card" v-if="lists.type ==13">
                <div class="aside-card-title bg-style1">
                    <h4 class="title">{{lists.name}}</h4>
                    <span class="link-more" >MORE>></span>
                </div>
                <div class="aside-card" v-for="(comArticle, index2) in lists.comArticleList" :key="index2" @click="moduleClick(13,comArticle.id)">
                <div class="aside-card-img">
                    <img :src="comArticle.imgUrl" class="img-responsive center-block">
                </div>
                <div class="aside-card-text">
                    <h5><a href="#">{{comArticle.title}}</a></h5>
                    <p class="text-right">{{comArticle.createDate}}</p>
                </div>
                </div>
            </div>
    </div>
    <img :src="lists.img" v-if="lists.moduleType == 5">
    <!-- <div class="cruise-info" v-if="lists.moduleType == 5">
        <div class="cruise-msg">
            <ul class="list-inline">
                <h4>出发港口</h4>
                <li>广州</li>
                <li>天津</li>
                <li>厦门</li>
                <li>香港</li>
                <li>西沙</li>
                <li>宜昌</li>
                <li>重庆</li>
                <li><a href="#">更多></a></li>
            </ul>

            <ul class="list-inline">
                <h4>邮轮航线</h4>
                <li>日本</li>
                <li>东南亚</li>
                <li>地中海</li>
                <li>三沙&西沙</li>
                <li>加勒比海</li>
                <li>南极</li>
                <li><a href="#">更多></a></li>
            </ul>

            <ul class="list-inline">
                <h4>邮轮公司</h4>
                <li>皇家加勒比</li>
                <li>歌诗达邮轮</li>
                <li>天海邮轮</li>
                <li>诺唯真邮轮</li>
                <li>地中海邮轮</li>
                <li><a href="#">更多></a></li>
            </ul>

        </div>
        <div class="cruise-name">
            <h4>Greece</h4>
            <h3>SANTORINI</h3>
        </div>
    </div> -->
</section>
</div>`
})

//个人中心 左边导航栏
Vue.component('ez-myinfo', {
    data: function () {
        return {
            member: {},
            htmlUrl: location.href.split("/")[location.href.split("/").length - 1],
        }
    },
    mounted() {
        this.getEVentData();
        this.getHtmlUrl();
    },
    methods: {
        //组件通信
        getEVentData() {
            const this_ = this;
            eventBus.$on("member", function (val) {
                this_.member = val;
            })
        },
        //为当前页面添加选中样式
        getHtmlUrl() {
            const url = `./${location.href.split("/")[location.href.split("/").length - 1]}`;
            $(".htmlUrl li").each((index, item) => {
                if (url == $(item).find("a").last().attr("href")) {
                    $(item).addClass("active");
                } else {
                    $(item).removeClass("active");
                }
            })
        },
        //退出登录
        removeLogin() {
            localStorage.removeItem("login_uid");
            localStorage.removeItem("login_key");
            localStorage.removeItem("login_time");
            location.reload();
        },
    },
    template: `    <div class="aside-left">
    <!--用户信息-->
    <div class="aside-userinfo text-center">
        <div class="aside-avatar">
            <img :src="member.photo|| defaultPhoto"class="center-block">
        </div>
        <h4 class="username-text">{{member.nickName}}</h4>
        <h5>手机号：{{member.phone}}</h5>
        <h5><span class="ez-mr-sm">{{member.sex | sexVc}}</span><span>{{member.birthday}}</span></h5>
        <div class="aside-userinfo-btn">
            <a href="./P1-4.html" class="btn text-lightorange">编辑</a>
            <a class="btn" @click.stop = "removeLogin">退出登录</a>
        </div>
    </div>

    <!--个人中心-->
    <div class="ez-aside-card">
        <div class="aside-card-title bg-style4">
            <h4 class="title">个人中心</h4>
        </div>
        <ul class="aside-user-list text-center htmlUrl">
            <li><a href="./P1.html">我的订单</a><i></i></li>
            <li><a href="./P1-1.html">售后订单</a><i></i></li>
            <li><a href="./P1-3.html">我的收藏</a><i></i></li>
            <li><a href="./P1-4.html">个人信息</a><i></i></li>
            <li><a href="./P1-5.html">消息中心</a><i></i></li>
            <li><a href="./P1-6.html">我的草稿</a><i></i></li>
            <li><a href="./P1-7.html">财务管理</a><i></i></li>
            <li><a href="./P1-8.html">常用联系人</a><i></i></li>
        </ul>
    </div>

    <div class="ez-aside-card">
        <div class="aside-card-title bg-style4">
            <h4 class="title">玩家中心</h4>
        </div>
        <ul class="aside-user-list text-center htmlUrl">
            <li><a href="./P1-9.html">玩家认证</a><i></i></li>
            <li><a href="./P1-9-1.html">路线规划</a><i></i></li>
            <li><a href="./P1-3.html">我的收藏</a><i></i></li>
            <li><a href="./P1-9-3.html">价格设置</a><i></i></li>
            <li><a href="./P1-9-5.html">玩家订单管理</a><i></i></li>
            <li><a href="./P1-9-4.html">玩家时间管理</a><i></i></li>
        </ul>
    </div>

    <div class="ez-aside-card">
        <div class="aside-card-title bg-style4">
            <h4 class="title">公司账号信息</h4>
        </div>
        <ul class="aside-user-list text-center htmlUrl">
            <li><a href="./P1-10.html">公司信息</a><i></i></li>
            <li><a href="./P1-10-1.html">旅行社子账号管理</a><i></i></li>
        </ul>
    </div>

    <div class="ez-aside-card">
        <div class="aside-card-title bg-style4">
            <h4 class="title">关于我们</h4>
        </div>
        <ul class="aside-user-list text-center">
            <li><a href="./P1-11.html">关于我们</a><i></i></li>
        </ul>
    </div>

</div>`
})
