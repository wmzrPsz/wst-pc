/*
 * @Description:   根路由
 * @Author: 彭善智
 * @LastEditors: 彭善智
 * @Date: 2019-04-24 09:56:10
 * @LastEditTime: 2019-04-29 01:58:05
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
      component: ()=> import( '@/views/home/homeIndex'),
      name: "homeIndex",
      meta: { title: "首页", requireAuth: false}
    },
    {
      path:"/ruleIndex",
      component: ()=> import( '@/views/rule/ruleIndex'),
      name: "rule",
      meta: { title: "常规路线", requireAuth: false}
    },
    {
      path:"/ruleInfo/:id",
      component: ()=> import('@/views/rule/ruleInfo1'),
      name: "ruleInfo",
      meta: { title: "常规路线详情", requireAuth: false}
    },
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