/*
 * @Description:  首页路由
 * @Author: 彭善智
 * @LastEditors: 彭善智
 * @Date: 2019-04-24 01:31:07
 * @LastEditTime: 2019-05-30 12:41:15
 */
const homeRouter = {
    path: '/home',
    component: ()=> import( '@/views/home/home'),
    redirect: '/home/homeIndex',
    name: "home",
    children: [
        {
            path:"homeIndex",
            component: ()=> import( '@/views/home/homeIndex'),
            name: "homeIndex",
            meta: { title: "首页", requireAuth: false}
        },
        {
            path:"homeBus",
            component: ()=> import( '@/views/home/homeBus'),
            name: "homeBus",
            meta: { title: "商家注册", requireAuth: false}
        },
        {
            path:"homeBusInfo",
            component: ()=> import( '@/views/home/homeBusInfo'),
            name: "homeBusInfo",
            meta: { title: "商家注册详情", requireAuth: false}
        },
        {
            path:"homeBusSuccess",
            component: ()=> import( '@/views/home/homeBusSuccess'),
            name: "homeBusSuccess",
            meta: { title: "商家注册成功", requireAuth: false}
        },
    ]
}

export default homeRouter
