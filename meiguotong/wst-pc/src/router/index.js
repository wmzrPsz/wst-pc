/*
 * @Description:   根路由
 * @Author: 彭善智
 * @LastEditors: 彭善智
 * @Date: 2019-04-24 09:56:10
 * @LastEditTime: 2019-05-13 12:03:55
 */
// import Vue from 'vue'
// import Router from 'vue-router'
// import homeRouter from './modules/homeRouter'
import ruleRouter from './modules/ruleRouter'
import routeRouter from './modules/routeRouter'
import soptRouter from './modules/soptRouter'
import cruiseRouter from './modules/cruiseRouter'
import tourRouter from './modules/tourRouter'
import carCharteredRouter from './modules/carCharteredRouter'


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
    ruleRouter,
    routeRouter,
    soptRouter,
    cruiseRouter,
    tourRouter,
    carCharteredRouter,
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