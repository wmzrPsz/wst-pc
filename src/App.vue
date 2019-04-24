<template>
  <div id="app" v-cloak>
    <router-view/>
  </div>
</template>

<style lang="less">
[v-cloak] {
  display: none;
}
// #app {
//   font-family: "Avenir", Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
// }
</style>
<script>
import { mapState, mapMutations } from "vuex";
import { getLanguage, getProtocol, getCurrency, myInfor, getHotCity, getComNavigation} from 'getData';
export default {
  name: "App",
  created() {
// fetch('/test/forlogin/login')
//   .then(function(response) {
//     return response.json();
//   })
//   .then(function(myJson) {
//     console.log(myJson);
//   });
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("store") ) {
        this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(sessionStorage.getItem("store"))))
    }
    console.log(process.env);
    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload",()=>{
        sessionStorage.setItem("store",JSON.stringify(this.$store.state))
    })
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

