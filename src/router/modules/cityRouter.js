/*
 * @Description:  游轮路由
 * @Author: 彭善智
 * @LastEditors: 彭善智
 * @Date: 2019-05-07 11:15:53
 * @LastEditTime: 2019-05-24 12:00:19
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
        {
            path:"strategyInfo/:id(\\d+)",
            component: ()=> import('@/views/city/strategyInfo'),
            name: "strategyInfo",
            meta: { title: "城市攻略详情", requireAuth: false}
        },
        {
            path:"addStrategy/:id(\\d+)",
            component: ()=> import('@/views/city/addStrategy'),
            name: "addStrategy",
            meta: { title: "发布城市攻略", requireAuth: true}
        },
        {
            path:"addCityComment/:id(\\d+)",
            component: ()=> import('@/views/city/addCityComment'),
            name: "addCityComment",
            meta: { title: "评论城市", requireAuth: true}
        },
    ]
}

export default cityRouter
