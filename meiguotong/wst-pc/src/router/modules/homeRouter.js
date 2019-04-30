/*
 * @Description:  首页路由
 * @Author: 彭善智
 * @LastEditors: 彭善智
 * @Date: 2019-04-24 01:31:07
 * @LastEditTime: 2019-04-26 01:54:51
 */
const homeRouter = {
    path: '/home',
    component: ()=> import( '@/views/home/index'),
    redirect: '/home/index',
    name: "home",
    children: [
        {
            path:"index",
            component: ()=> import( '@/views/home/index'),
            name: "homeIndex",
            meta: { title: "首页", requireAuth: false}
        },
        {
            path:"test",
            component: ()=> import( '@/views/home/test'),
        }
    ]
}

export default homeRouter
