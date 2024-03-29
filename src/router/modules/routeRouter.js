/*
 * @Description:  当地参团路由
 * @Author: 彭善智
 * @LastEditors: 彭善智
 * @Date: 2019-05-06 17:39:02
 * @LastEditTime: 2019-05-24 19:28:24
 */

const homeRouter = {
    path: '/route',
    component: ()=> import( '@/views/route/routeHome'),
    redirect: '/route/route',
    name: "route",
    children: [
          {
            path:"route",
            component: ()=> import('@/views/route/routeIndex'),
            name: "routeIndex",
            meta: { title: "当地参团", requireAuth: false}
          },
          {
            path:"routeInfo/:id(\\d+)",
            component: ()=> import('@/views/route/routeInfo'),
            name: "routeInfo",
            meta: { title: "当地参团详情", requireAuth: false}
          },
          {
            path:"routeSure",
            component: ()=> import('@/views/route/routeSure'),
            name: "routeSure",
            meta: { title: "当地参团订单确定", requireAuth: true}
          },
          {
            path:"routePay",
            component: ()=> import('@/views/route/routePay'),
            name: "routePay",
            meta: { title: "当地参团订单支付", requireAuth: true}
          },
          {
            path:"routeSuccess",
            component: ()=> import('@/views/route/routeSuccess'),
            name: "routeSuccess",
            meta: { title: "当地参团订单支付成功", requireAuth: true}
          },
    ]
}

export default homeRouter
