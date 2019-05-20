/*
 * @Description:  游轮路由
 * @Author: 彭善智
 * @LastEditors: 彭善智
 * @Date: 2019-05-07 11:15:53
 * @LastEditTime: 2019-05-18 12:28:34
 */

const cityRouter = {
    path: '/city',
    component: ()=> import( '@/views/city/cityHome'),
    redirect: "/city/city",
    name: "cityHome",
    children: [
        {
            path:"city",
            component: ()=> import('@/views/city/cityIndex'),
            name: "cityIndex",
            meta: { title: "城市搜索", requireAuth: false}
        },
        {
            path:"cityInfo/:id(\\d+)",
            component: ()=> import('@/views/city/cityInfo'),
            name: "cityInfo",
            meta: { title: "城市详情", requireAuth: false}
        },
    ]
}

export default cityRouter
