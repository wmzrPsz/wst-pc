/*
 * @Description:  包车租车路由
 * @Author: 彭善智
 * @LastEditors: 彭善智
 * @Date: 2019-05-07 11:15:53
 * @LastEditTime: 2019-05-14 11:15:15
 */

const carCharteredRouter = {
    path: '/carChartered',
    component: ()=> import( '@/views/carChartered/carCharteredHome'),
    redirect: "/carChartered/carCharteredIndex",
    name: "carCharteredHome",
    children: [
          {
            path:"carCharteredIndex",
            component: ()=> import('@/views/carChartered/carCharteredIndex'),
            name: "carCharteredIndex",
            meta: { title: "包车租车首页", requireAuth: false}
          },
          {
            path:"carCharteredInfo",
            component: ()=> import('@/views/carChartered/carCharteredInfo'),
            name: "carCharteredInfo",
            meta: { title: "包车租车详情", requireAuth: false}
          },
          {
            path:"carCharteredSure",
            component: ()=> import('@/views/carChartered/carCharteredSure'),
            name: "carCharteredSure",
            meta: { title: "包车租车订单确定", requireAuth: false}
          },
          {
            path:"carCharteredPay",
            component: ()=> import('@/views/carChartered/carCharteredPay'),
            name: "carCharteredPay",
            meta: { title: "包车租车订单支付", requireAuth: false}
          },
          {
            path:"carCharteredSuccess",
            component: ()=> import('@/views/carChartered/carCharteredSuccess'),
            name: "carCharteredSuccess",
            meta: { title: "包车租车订单支付成功", requireAuth: false}
          },
    ]
}

export default carCharteredRouter
