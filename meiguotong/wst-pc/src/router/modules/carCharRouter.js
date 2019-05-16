/*
 * @Description:  包车租车路由
 * @Author: 彭善智
 * @LastEditors: 彭善智
 * @Date: 2019-05-07 11:15:53
 * @LastEditTime: 2019-05-15 16:09:10
 */

const carCharRouter = {
    path: '/carChar',
    component: ()=> import( '@/views/carChar/carCharHome'),
    redirect: "/carChar/carCharIndex",
    name: "carCharHome",
    children: [
          {
            path:"carCharIndex",
            component: ()=> import('@/views/carChar/carCharIndex'),
            name: "carCharIndex",
            meta: { title: "包车租车首页", requireAuth: false}
          },
          {
            path:"carCharInfo",
            component: ()=> import('@/views/carChar/carCharInfo'),
            name: "carCharInfo",
            meta: { title: "包车租车详情", requireAuth: false}
          },
          {
            path:"carCharSure",
            component: ()=> import('@/views/carChar/carCharSure'),
            name: "carCharSure",
            meta: { title: "包车租车订单确定", requireAuth: false}
          },
          {
            path:"carCharPay",
            component: ()=> import('@/views/carChar/carCharPay'),
            name: "carCharPay",
            meta: { title: "包车租车订单支付", requireAuth: false}
          },
          {
            path:"carCharSuccess",
            component: ()=> import('@/views/carChar/carCharSuccess'),
            name: "carCharSuccess",
            meta: { title: "包车租车订单支付成功", requireAuth: false}
          },
    ]
}

export default carCharRouter
