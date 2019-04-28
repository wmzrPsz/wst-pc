<template>
  <div id="app" v-cloak>
    <transition
      :enter-active-class="enterTransition"
      :leave-active-class="leaveTransition">
      <navigation>
        <router-view/>
      </navigation>
    </transition>
  </div>
</template>

<style lang="less">
[v-cloak] {
  display: none;
}
// #app {
//   font-family: "Avenir", Helvetica, Arial, sans-serif;
//   font-family: "Avenir", Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
// }
//navigation  前进刷新  后退缓存恢复
</style>
<script>
import { mapState, mapMutations } from "vuex";
import { getLanguage, getProtocol, getCurrency, myInfor, getHotCity, getComNavigation} from 'getData';
export default {
  name: "App",
  data () {
    return {
      enterTransition: 'animated fadeIn',
      leaveTransition: 'animated fadeOut',
    }
  },
  created() {
    this.$navigation.on('forward', (to, from) => {
      this.enterTransition = 'animated fadeInRight';
      this.leaveTransition = 'animated fadeOutLeft';
    })
    this.$navigation.on('back', (to, from) => {
      this.enterTransition = 'animated fadeInLeft';
      this.leaveTransition = 'animated fadeOutRight';
    })
    this.$navigation.on('replace', (to, from) => {
      this.enterTransition = 'animated fadeIn';
      this.leaveTransition = 'animated fadeOut';
    })
    sessionStorage.removeItem("store")
    //在页面加载时读取sessionStorage里的状态信息
    // if (sessionStorage.getItem("store") ) {
    //     this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(sessionStorage.getItem("store"))))
    // }
      // console.log(process.env);
      // console.log($("#app"))
    //在页面刷新时将vuex里的信息保存到sessionStorage里
    // window.addEventListener("beforeunload",()=>{
    //     sessionStorage.setItem("store",JSON.stringify(this.$store.state))
    // })
    this.getProtocol();
    this.loginFlagInit();
    this.getLanguage();
    this.getCurrency();
    this.getMember();
    this.getHotCity();
    this.getComNavigation();
  },
  computed: {
      ...mapState([ "loginType" ]),
  },
  // beforeRouteLeave(to, from, next) {
  //     // 设置下一个路由的 meta
  //   to.meta.keepAlive = true;  // B 跳转到 A 时，让 A 缓存，即不刷新
  //   next();
  // },
  methods: {
    ...mapMutations(["loginFlagChange", "languageListChange", "currencyListChange", "setComProtocol", "setMember", "sethotCityList", "setComNavigationList"]),
    //弹窗类型初始化
    loginFlagInit() {
      this.loginFlagChange(0)
    },
    //获取网站基本参数
    async getProtocol() {
      this.setComProtocol(await getProtocol());
    },
    //获取语言
    async getLanguage() {
       this.languageListChange(await getLanguage())
    },
    //获取货币
    async getCurrency() {
      this.currencyListChange(await getCurrency())
    },
    //获取热门城市
    async getHotCity(){
      let data = await getHotCity();
      for (const list of data) {
        Vue.set(list, "flag", false);
      }
      this.sethotCityList(data)
    },
    //获取导航栏
    async getComNavigation(){
      let data = await getComNavigation();
      for (const list of data) {
        Vue.set(list, "flag", false);
      }
      this.setComNavigationList(data)
    },
    //获取会员信息
    async getMember() {
        if (this.loginType == 2) {
            this.setMember(await myInfor());
        }
    },
  }
};
</script>

