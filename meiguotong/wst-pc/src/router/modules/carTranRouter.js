/*
 * @Description:  接送机路由
 * @Author: 彭善智
 * @LastEditors: 彭善智
 * @Date: 2019-05-07 11:15:53
 * @LastEditTime: 2019-05-15 16:16:34
 */

const carTranRouter = {
    path: '/carTran',
    component: ()=> import( '@/views/carTran/carTranHome'),
    redirect: "/carTran/carTranIndex",
    name: "carTranHome",
    children: [
          {
            path:"carTranIndex",
            component: ()=> import('@/views/carTran/carTranIndex'),
            name: "carTranIndex",
            meta: { title: "接送机首页", requireAuth: false}
          },
          {
            path:"carTranInfo",
            component: ()=> import('@/views/carTran/carTranInfo'),
            name: "carTranInfo",
            meta: { title: "接送机详情", requireAuth: false}
          },
          {
            path:"carTranSure",
            component: ()=> import('@/views/carTran/carTranSure'),
            name: "carTranSure",
            meta: { title: "接送机订单确定", requireAuth: true}
          },
          {
            path:"carTranPay",
            component: ()=> import('@/views/carTran/carTranPay'),
            name: "carTranPay",
            meta: { title: "接送机订单支付", requireAuth: true}
          },
          {
            path:"carTranSuccess",
            component: ()=> import('@/views/carTran/carTranSuccess'),
            name: "carTranSuccess",
            meta: { title: "接送机订单支付成功", requireAuth: true}
          },
    ]
}

export default carTranRouter
