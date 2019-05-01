/*
 * @Description:   根路由
 * @Author: 彭善智
 * @LastEditors: 彭善智
 * @Date: 2019-04-24 09:56:10
 * @LastEditTime: 2019-05-01 12:05:30
 */
// import Vue from 'vue'
// import Router from 'vue-router'
// import homeRouter from './modules/homeRouter'
// import ruleRouter from './modules/ruleRouter'
    // homeRouter,
    // ruleRouter,
Vue.use(VueRouter)
const createRouter = () =>  new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      component: ()=> import( '@/views/home/index'),
      name: "index",
      meta: { title: "首页", requireAuth: false}
    },
    {
      path:"/rule",
      component: ()=> import( '@/views/rule/rule'),
      name: "rule",
      meta: { title: "常规路线", requireAuth: false}
    },
    {
      path:"/ruleInfo/:id",
      component: ()=> import('@/views/rule/ruleInfo'),
      name: "ruleInfo",
      meta: { title: "常规路线详情", requireAuth: false}
    },
    {
      path:"/ruleSure",
      component: ()=> import('@/views/rule/ruleSure'),
      name: "ruleSure",
      meta: { title: "常规路线订单确定", requireAuth: false}
    },
    {
      path:"/rulePay",
      component: ()=> import('@/views/rule/rulePay'),
      name: "rulePay",
      meta: { title: "常规路线订单支付", requireAuth: false}
    },
    {
      path:"/ruleSuccess",
      component: ()=> import('@/views/rule/ruleSuccess'),
      name: "ruleSuccess",
      meta: { title: "常规路线订单支付成功", requireAuth: false}
    },
    {
      path:"/route",
      component: ()=> import('@/views/route/route'),
      name: "route",
      meta: { title: "当地参团", requireAuth: false}
    },
    {
      path:"/routeInfo/:id",
      component: ()=> import('@/views/route/routeInfo'),
      name: "routeInfo",
      meta: { title: "当地参团详情", requireAuth: false}
    },
    {
      path:"/routeSure",
      component: ()=> import('@/views/route/routeSure'),
      name: "routeSure",
      meta: { title: "当地参团订单确定", requireAuth: false}
    },
    {
      path:"/routePay",
      component: ()=> import('@/views/route/routePay'),
      name: "routePay",
      meta: { title: "当地参团订单支付", requireAuth: false}
    },
    {
      path:"/routeSuccess",
      component: ()=> import('@/views/route/routeSuccess'),
      name: "routeSuccess",
      meta: { title: "当地参团订单支付成功", requireAuth: false}
    },
    {
      path:"/sopt",
      component: ()=> import('@/views/sopt/sopt'),
      name: "sopt",
      meta: { title: "景点首页", requireAuth: false}
    },
    {
      path:"/soptList",
      component: ()=> import('@/views/sopt/soptList'),
      name: "soptList",
      meta: { title: "景点列表", requireAuth: false}
    },
    {
      path: '*',
      component: ()=> import( '@/views/error/404'),
      meta: { title: 404, requireAuth: false, cache: true}
    },
    {
      path:"/city",
      component: ()=> import('@/views/city/cityIndex'),
      name: "popular cities",
      meta: { title: "热门城市", requireAuth: false}
    },
    {
        path: '/city/:id',
        component: ()=> import('@/views/city/cityDetail'),
        meta: { title: "热门城市详情", requireAuth: false}
    }
  ]
})



const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}
export default router