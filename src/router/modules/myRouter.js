/*
 * @Description:  定制路由
 * @Author: 彭善智
 * @LastEditors: 彭善智
 * @Date: 2019-05-07 11:15:53
 * @LastEditTime: 2019-05-17 01:44:59
 */

const myRouter = {
    path: '/my',
    component: ()=> import( '@/views/my/my'),
    redirect: '/my/myInfo',
    name: "my",
    children: [
        {
            path:"myOrder",
            component: ()=> import('@/views/my/myOrder'),
            name: "myOrder",
            meta: { title: "我的订单", requireAuth: false}
        },
        {
            path:"myAfter",
            component: ()=> import('@/views/my/myAfter'),
            name: "myAfter",
            meta: { title: "我的售后订单", requireAuth: false}
        },
        {
            path:"myCollection",
            component: ()=> import('@/views/my/myCollection'),
            name: "myCollection",
            meta: { title: "我的收藏", requireAuth: false}
        },
        {
            path:"myInfo",
            component: ()=> import('@/views/my/myInfo'),
            name: "myInfo",
            meta: { title: "我的个人资料", requireAuth: false}
        },
        {
            path:"myNews",
            component: ()=> import('@/views/my/myNews'),
            name: "myNews",
            meta: { title: "消息中心", requireAuth: false}
        },
        {
            path:"myDraft",
            component: ()=> import('@/views/my/myDraft'),
            name: "myDraft",
            meta: { title: "我的草稿", requireAuth: false}
        },
    ]
}

export default myRouter
