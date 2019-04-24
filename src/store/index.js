// import Vue from 'vue'
// import Vuex from 'vuex'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'


const state = {
  loginUid: "",
  loginKey: "",
  loginTime: "",
  loginType: 1,  //1游客2.会员
  languageid: 1, //语言ID
  currencyid: 1,  //货币ID
  currencySign: "￥",
  pageSize: 2,  //页数
  comProtocol: {},  //网站基本信息
  loginFlag: 0, //0.默认  1显示登录  2注册  3忘记密码
  languageList: [],  //语言集合
  currencyList: [],  //货币集合
  member: {},  //会员信息
  hotCityList: [],  //热门城市
  comNavigationList: [],  //导航栏
}

// 要搜索的文件夹目录
// 是否还应该搜索它的子目录
// 以及一个匹配文件的正则表达式
// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', false, /\.js$/)

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})


const store = new Vuex.Store({
    //**不要在发布环境下启用严格模式！**严格模式会深度监测状态树来检测不合规的状态变更——请确保在发布环境下关闭严格模式，以避免性能损失。
  strict: debug,
  state,
  getters,
  mutations,
  actions,
  modules,
})

export default store
