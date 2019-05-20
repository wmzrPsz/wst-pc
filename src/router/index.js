/*
 * @Description:   根路由
 * @Author: 彭善智
 * @LastEditors: 彭善智
 * @Date: 2019-04-24 09:56:10
 * @LastEditTime: 2019-05-17 16:35:10
 */
// import Vue from 'vue'
// import Router from 'vue-router'
import homeRouter from './modules/homeRouter'
import ruleRouter from './modules/ruleRouter'
import routeRouter from './modules/routeRouter'
import soptRouter from './modules/soptRouter'
import cruiseRouter from './modules/cruiseRouter'
import tourRouter from './modules/tourRouter'
import carCharRouter from './modules/carCharRouter'
import carShortRouter from './modules/carShortRouter'
import carTranRouter from './modules/carTranRouter'
import gameRouter from './modules/gameRouter'
import myRouter from './modules/myRouter'
import carRouter from './modules/carRouter'
import cityRouter from './modules/cityRouter'


const createRouter = () =>  new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      component: ()=> import( '@/views/home/homeIndex'),
      redirect: '/home',
      meta: { title: "首页", requireAuth: false}
    },
    homeRouter,
    ruleRouter,
    routeRouter,
    soptRouter,
    cruiseRouter,
    tourRouter,
    carCharRouter,
    carShortRouter,
    carTranRouter,
    gameRouter,
    myRouter,
    carRouter,
    cityRouter,
    {
        path: '*',
        component: ()=> import( '@/views/error/404'),
        meta: { title: 404, requireAuth: false, cache: true}
    },

  ]
})



const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}
export default router