// import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store/index";
//添加 IE 兼容
// import '@babel/polyfill'
// import $ from "jquery"
// import 'bootstrap'
// import "bootstrap/dist/css/bootstrap.css"
// import 'element-ui/lib/theme-chalk/index.css'
import Navigation from 'vue-navigation'
import "style/ez-public.less"
import "style/ez-website.less"
import "style/ez-slider.less"
import "style/E-publc.css"
import "style/common.css"
import "style/reset.css"
import "style/iconfont/iconfont.css"
import "style/ez-page.less"
import "javaScript/ez-public.js"
import "javaScript/jqPaginator.js"
import "./directive/index.js"
import { infoMsg, successMsg, errorMsg, warningMsg} from 'utils/popup'
import { isNull, copy } from 'utils/common'

// import VueLazyload from 'vue-lazyload'  

Vue.config.productionTip = false;

Vue.prototype.infoMsg = infoMsg
Vue.prototype.successMsg = successMsg
Vue.prototype.errorMsg = errorMsg
Vue.prototype.warningMsg = warningMsg
Vue.prototype.isNull = isNull
Vue.prototype.copy = copy

Vue.use(Navigation, {router, store, moduleName: 'navigation', keyName: 'VNK'})

Vue.use(VueLazyload,{
    attempt: 3,
    error: store.state.comProtocol.defaultImg,
    listenEvents: ['scroll'],
    observer: true,
    observerOptions: {
      rootMargin: '0px',
      threshold: 0.1
    },
    filter: {
      //实现渐近式加载图片（先加载模糊的图）
      progressive(listener, opts) {
        listener.el.setAttribute('lazy-progressive', 'true')
        listener.loading = listener.src + '?imageView2/1/w/10/h/10'
      }
    },
    adapter: {
      error (listender, Init) {
        listender.error = store.state.comProtocol.defaultImg;
        // console.log(listender)
        // console.log(Init)
      }
  }
  })

  import * as custom from './filters/custom'
  import * as global from './utils/global'

  Object.keys(custom).forEach(key => {
    Vue.filter(key, custom[key])
  })

  Object.keys(global).forEach(key => {
    // Vue.set(Vue.prototype,key,global[key])
    Vue.prototype[key] =  global[key]
  })


/**
 * 登录钩子函数
 * to 即将要进入的目标 路由对象
 * from 当前导航正要离开的路由
 * next 一定要调用该方法来 resolve 这个钩子
 * next() 进行管道中的下一个钩子 如果全部钩子执行完了，则状态就是 confirmed （确认的）
 */
router.beforeEach((to, from, next) => {
  // console.log(to)
  // console.log(from)
  if(to.meta.requireAuth){ // 判断该路由是否需要登录权限
    if(store.state.sessionToken){ // 通过vuex state获取当前的token是否存在
      next();
    }else{
      next({
        path: '/login',  // 跳转到登录页面
        query: { redirect: to.fullPath }, // 将跳转的路由path作为参数，用于登录成功后回到登录前页面
      });
    }
  }else{
    next();
  }
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");




