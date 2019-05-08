/*
 * @Description:  定制路由
 * @Author: 彭善智
 * @LastEditors: 彭善智
 * @Date: 2019-05-07 11:15:53
 * @LastEditTime: 2019-05-08 21:07:30
 */

const tourRouter = {
    path: '/tour',
    component: ()=> import( '@/views/tour/tourHome'),
    redirect: "/tour/tour",
    name: "tourHome",
    children: [
        {
            path:"tour",
            component: ()=> import('@/views/tour/tourIndex'),
            name: "tourIndex",
            meta: { title: "定制首页", requireAuth: false}
          },
          {
            path:"tourAfter",
            component: ()=> import('@/views/tour/tourAfter'),
            name: "tourAfter",
            meta: { title: "定制选择人数", requireAuth: false}
          },
          {
            path:"tourInfo",
            component: ()=> import('@/views/tour/tourInfo'),
            name: "tourInfo",
            meta: { title: "定制详情", requireAuth: false}
          },
          {
            path:"tourSure",
            component: ()=> import('@/views/tour/tourSure'),
            name: "tourSure",
            meta: { title: "定制订单确定", requireAuth: false}
          },
          {
            path:"tourPay",
            component: ()=> import('@/views/tour/tourPay'),
            name: "tourPay",
            meta: { title: "定制订单支付", requireAuth: false}
          },
          {
            path:"tourSuccess",
            component: ()=> import('@/views/tour/tourSuccess'),
            name: "tourSuccess",
            meta: { title: "定制订单支付成功", requireAuth: false}
          },
    ]
}

export default tourRouter
