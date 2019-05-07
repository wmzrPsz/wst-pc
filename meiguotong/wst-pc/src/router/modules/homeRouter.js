/*
 * @Description:  首页路由
 * @Author: 彭善智
 * @LastEditors: 彭善智
 * @Date: 2019-04-24 01:31:07
 * @LastEditTime: 2019-05-06 18:01:27
 */
const homeRouter = {
    path: '/home',
    component: ()=> import( '@/views/home/index'),
    redirect: '/home/index',
    name: "homeIndex",
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
