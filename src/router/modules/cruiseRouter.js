/*
 * @Description:  游轮路由
 * @Author: 彭善智
 * @LastEditors: 彭善智
 * @Date: 2019-05-07 11:15:53
 * @LastEditTime: 2019-05-30 12:40:56
 */

const cruiseRouter = {
    path: '/cruise',
    component: ()=> import( '@/views/cruise/cruiseHome'),
    redirect: "/cruise/cruise",
    name: "cruiseHome",
    children: [
        {
            path:"cruise",
            component: ()=> import('@/views/cruise/cruiseIndex'),
            name: "cruiseIndex",
            meta: { title: "游轮首页", requireAuth: false}
          },
          {
            path:"cruiseList",
            component: ()=> import('@/views/cruise/cruiseList'),
            name: "cruiseList",
            meta: { title: "游轮列表", requireAuth: false}
          },
          {
            path:"cruiseInfo/:id(\\d+)",
            component: ()=> import('@/views/cruise/cruiseInfo'),
            name: "cruiseInfo",
            meta: { title: "游轮详情", requireAuth: false}
          },
          {
            path:"cruiseSure",
            component: ()=> import('@/views/cruise/cruiseSure'),
            name: "cruiseSure",
            meta: { title: "游轮订单确定", requireAuth: true}
          },
          {
            path:"cruisePay",
            component: ()=> import('@/views/cruise/cruisePay'),
            name: "cruisePay",
            meta: { title: "游轮订单支付", requireAuth: true}
          },
          {
            path:"cruiseSuccess",
            component: ()=> import('@/views/cruise/cruiseSuccess'),
            name: "cruiseSuccess",
            meta: { title: "游轮订单支付成功", requireAuth: true}
          },
    ]
}

export default cruiseRouter
