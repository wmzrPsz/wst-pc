/*
 * @Description:  购物车路由
 * @Author: 彭善智
 * @LastEditors: 彭善智
 * @Date: 2019-05-07 11:15:53
 * @LastEditTime: 2019-05-17 16:34:51
 */

const carRouter = {
    path: '/car',
    component: ()=> import( '@/views/car/carHome'),
    redirect: "/car/carIndex",
    name: "carHome",
    children: [
          {
            path:"carIndex",
            component: ()=> import('@/views/car/carIndex'),
            name: "carIndex",
            meta: { title: "购物车首页", requireAuth: false}
          },
          {
            path:"carSure",
            component: ()=> import('@/views/car/carSure'),
            name: "carSure",
            meta: { title: "购物车订单确定", requireAuth: false}
          },
          {
            path:"carPay",
            component: ()=> import('@/views/car/carPay'),
            name: "carPay",
            meta: { title: "购物车订单支付", requireAuth: false}
          },
          {
            path:"carSuccess",
            component: ()=> import('@/views/car/carSuccess'),
            name: "carSuccess",
            meta: { title: "购物车订单支付成功", requireAuth: false}
          },
    ]
}

export default carRouter
