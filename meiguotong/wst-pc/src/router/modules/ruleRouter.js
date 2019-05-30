/*
 * @Description:  常规路线路由
 * @Author: 彭善智
 * @LastEditors: 彭善智
 * @Date: 2019-04-24 01:31:07
 * @LastEditTime: 2019-05-06 17:41:45
 */
const ruleRouter = {
    path: '/rule',
    component: ()=> import( '@/views/rule/ruleHome'),
    redirect: '/rule/rule',
    name: "ruleHome",
    children: [
         {
            path:"rule",
            component: ()=> import( '@/views/rule/ruleIndex'),
            name: "ruleIndex",
            meta: { title: "常规路线", requireAuth: false}
          },
          {
            path:"ruleInfo/:id(\\d+)",
            component: ()=> import('@/views/rule/ruleInfo'),
            name: "ruleInfo",
            meta: { title: "常规路线详情", requireAuth: false}
          },
          {
            path:"ruleSure",
            component: ()=> import('@/views/rule/ruleSure'),
            name: "ruleSure",
            meta: { title: "常规路线订单确定", requireAuth: true}
          },
          {
            path:"rulePay",
            component: ()=> import('@/views/rule/rulePay'),
            name: "rulePay",
            meta: { title: "常规路线订单支付", requireAuth: true}
          },
          {
            path:"ruleSuccess",
            component: ()=> import('@/views/rule/ruleSuccess'),
            name: "ruleSuccess",
            meta: { title: "常规路线订单支付成功", requireAuth: true}
          },
    ]
}

export default ruleRouter
