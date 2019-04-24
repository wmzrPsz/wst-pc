/*
 * @Description:  首页路由
 * @Author: 彭善智
 * @LastEditors: 彭善智
 * @Date: 2019-04-24 01:31:07
 * @LastEditTime: 2019-04-24 01:38:05
 */
const homeRouter = {
    path: '/home',
    component: ()=> import( '@/views/home/index'),
    redirect: '/home/index',
    name: "Home",
    children: [
        {
        path:"index",
        component: ()=> import( '@/views/home/index'),
        meta: { title: "首页", requireAuth: false}
        }
    ]
}

export default homeRouter
