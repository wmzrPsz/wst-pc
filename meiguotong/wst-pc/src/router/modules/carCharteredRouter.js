/*
 * @Description:  包车租车路由
 * @Author: 彭善智
 * @LastEditors: 彭善智
 * @Date: 2019-05-07 11:15:53
 * @LastEditTime: 2019-05-13 18:16:17
 */

const carCharteredRouter = {
    path: '/carChartered',
    component: ()=> import( '@/views/carChartered/carHome'),
    redirect: "/carChartered/carIndex",
    name: "carCharteredHome",
    children: [
          {
            path:"carIndex",
            component: ()=> import('@/views/carChartered/carIndex'),
            name: "carIndex",
            meta: { title: "包车租车首页", requireAuth: false}
          },
          {
            path:"carInfo",
            component: ()=> import('@/views/carChartered/carInfo'),
            name: "carInfo",
            meta: { title: "包车租车详情", requireAuth: false}
          },
          {
            path:"carSure",
            component: ()=> import('@/views/carChartered/carSure'),
            name: "carSure",
            meta: { title: "包车租车订单确定", requireAuth: false}
          },
          {
            path:"carPay",
            component: ()=> import('@/views/carChartered/carPay'),
            name: "carPay",
            meta: { title: "包车租车订单支付", requireAuth: false}
          },
          {
            path:"carSuccess",
            component: ()=> import('@/views/carChartered/carSuccess'),
            name: "carSuccess",
            meta: { title: "包车租车订单支付成功", requireAuth: false}
          },
    ]
}

export default carCharteredRouter
