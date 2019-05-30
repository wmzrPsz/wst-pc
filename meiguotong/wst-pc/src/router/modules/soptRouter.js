/*
 * @Description:  景点门票路由
 * @Author: 彭善智
 * @LastEditors: 彭善智
 * @Date: 2019-04-24 01:31:07
 * @LastEditTime: 2019-05-23 22:30:24
 */
const soptRouter = {
    path: '/sopt',
    component: ()=> import( '@/views/sopt/soptHome'),
    redirect: "/sopt/sopt",
    name: "soptHome",
    children: [
        {
            path:"sopt",
            component: ()=> import('@/views/sopt/soptIndex'),
            name: "soptIndex",
            meta: { title: "景点首页", requireAuth: false}
          },
          {
            path:"soptList",
            component: ()=> import('@/views/sopt/soptList'),
            name: "soptList",
            meta: { title: "景点列表", requireAuth: false}
          },
          {
            path:"soptInfo/:id(\\d+)",
            component: ()=> import('@/views/sopt/soptInfo'),
            name: "soptInfo",
            meta: { title: "景点详情", requireAuth: false}
          },
          {
            path:"soptSure",
            component: ()=> import('@/views/sopt/soptSure'),
            name: "soptSure",
            meta: { title: "景点订单确定", requireAuth: true}
          },
          {
            path:"soptPay",
            component: ()=> import('@/views/sopt/soptPay'),
            name: "soptPay",
            meta: { title: "景点订单支付", requireAuth: true}
          },
          {
            path:"soptSuccess",
            component: ()=> import('@/views/sopt/soptSuccess'),
            name: "soptSuccess",
            meta: { title: "景点订单支付成功", requireAuth: true}
          },
    ]
}

export default soptRouter
