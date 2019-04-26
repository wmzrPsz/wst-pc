/*
 * @Description:  常规路线路由
 * @Author: 彭善智
 * @LastEditors: 彭善智
 * @Date: 2019-04-24 01:31:07
 * @LastEditTime: 2019-04-26 01:40:51
 */
const ruleRouter = {
    path: '/rule',
    component: ()=> import( '@/views/rule/index'),
    // redirect: '/rule/index',
    name: "ruleIndex",
    children: [
        {
            path:"index",
            component: ()=> import( '@/views/rule/index'),
            name: "ruleIndex",
            meta: { title: "常规路线", requireAuth: false}
        },
        {
            path:"ruleInfo",
            component: ()=> import( '@/views/rule/ruleInfo'),
            name: "ruleInfo",
            meta: { title: "常规路线详情", requireAuth: false}
        }
    ]
}

export default ruleRouter
