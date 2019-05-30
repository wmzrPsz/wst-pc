/*
 * @Description:  购物车路由
 * @Author: 彭善智
 * @LastEditors: 彭善智
 * @Date: 2019-05-07 11:15:53
 * @LastEditTime: 2019-05-30 11:09:40
 */

const buyRouter = {
    path: '/buy',
    component: ()=> import( '@/views/buy/buyHome'),
    redirect: "/buy/buyIndex",
    name: "buyHome",
    children: [
          {
            path:"buyIndex",
            component: ()=> import('@/views/buy/buyIndex'),
            name: "buyIndex",
            meta: { title: "购物车首页", requireAuth: true}
          },
          {
            path:"buySure",
            component: ()=> import('@/views/buy/buySure'),
            name: "buySure",
            meta: { title: "购物车订单确定", requireAuth: true}
          },
          {
            path:"buyPay",
            component: ()=> import('@/views/buy/buyPay'),
            name: "buyPay",
            meta: { title: "购物车订单支付", requireAuth: true}
          },
          {
            path:"buySuccess",
            component: ()=> import('@/views/buy/buySuccess'),
            name: "buySuccess",
            meta: { title: "购物车订单支付成功", requireAuth: true}
          },
    ]
}

export default buyRouter
