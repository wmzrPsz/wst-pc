/*
 * @Description:  短程接送路由
 * @Author: 彭善智
 * @LastEditors: 彭善智
 * @Date: 2019-05-07 11:15:53
 * @LastEditTime: 2019-05-14 11:20:15
 */

const carShortRouter = {
    path: '/carShort',
    component: ()=> import( '@/views/carShort/carShortHome'),
    redirect: "/carShort/carShortIndex",
    name: "carShortHome",
    children: [
          {
            path:"carShortIndex",
            component: ()=> import('@/views/carShort/carShortIndex'),
            name: "carShortIndex",
            meta: { title: "包车租车首页", requireAuth: false}
          },
          {
            path:"carShortInfo",
            component: ()=> import('@/views/carShort/carShortInfo'),
            name: "carShortInfo",
            meta: { title: "包车租车详情", requireAuth: false}
          },
          {
            path:"carShortSure",
            component: ()=> import('@/views/carShort/carShortSure'),
            name: "carShortSure",
            meta: { title: "包车租车订单确定", requireAuth: false}
          },
          {
            path:"carShortPay",
            component: ()=> import('@/views/carShort/carShortPay'),
            name: "carShortPay",
            meta: { title: "包车租车订单支付", requireAuth: false}
          },
          {
            path:"carShortSuccess",
            component: ()=> import('@/views/carShort/carShortSuccess'),
            name: "carShortSuccess",
            meta: { title: "包车租车订单支付成功", requireAuth: false}
          },
    ]
}

export default carShortRouter
