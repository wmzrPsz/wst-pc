// import Vue from 'vue'
// import Router from 'vue-router'
import homeRouter from './modules/homeRouter'

Vue.use(VueRouter)
const createRouter = () =>  new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      component: ()=> import( '@/views/home/index'),
      redirect: "/home"
    },
    homeRouter,
    {
      path: '*',
      component: ()=> import( '@/views/error/404'),
      meta: { title: 404, requireAuth: false}
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