/*
 * @Description:  定制路由
 * @Author: 彭善智
 * @LastEditors: 彭善智
 * @Date: 2019-05-07 11:15:53
 * @LastEditTime: 2019-05-30 12:41:58
 */

const myRouter = {
    path: '/my',
    component: ()=> import( '@/views/my/my'),
    redirect: '/my/myOrder',
    name: "my",
    children: [
        {
            path:"myOrder",
            component: ()=> import('@/views/my/myOrder'),
            name: "myOrder",
            meta: { title: "我的订单", requireAuth: true}
        },
        {
            path:"myAfter",
            component: ()=> import('@/views/my/myAfter'),
            name: "myAfter",
            meta: { title: "我的售后订单", requireAuth: true}
        },
        {
            path:"myCollection",
            component: ()=> import('@/views/my/myCollection'),
            name: "myCollection",
            meta: { title: "我的收藏", requireAuth: true}
        },
        {
            path:"myInfo",
            component: ()=> import('@/views/my/myInfo'),
            name: "myInfo",
            meta: { title: "我的个人资料", requireAuth: true}
        },
        {
            path:"myNews",
            component: ()=> import('@/views/my/myNews'),
            name: "myNews",
            meta: { title: "消息中心", requireAuth: true}
        },
        {
            path:"myDraft",
            component: ()=> import('@/views/my/myDraft'),
            name: "myDraft",
            meta: { title: "我的草稿", requireAuth: true}
        },
        {
            path:"myFinance",
            component: ()=> import('@/views/my/myFinance'),
            name: "myFinance",
            meta: { title: "财务管理", requireAuth: true}
        },
        {
            path:"myContacts",
            component: ()=> import('@/views/my/myContacts'),
            name: "myContacts",
            meta: { title: "常用联系人", requireAuth: true}
        },
        {
            path:"myPlayer",
            component: ()=> import('@/views/my/myPlayer'),
            name: "myPlayer",
            meta: { title: "玩家认证", requireAuth: true}
        },
        {
            path:"myRoute",
            component: ()=> import('@/views/my/myRoute'),
            name: "myRoute",
            meta: { title: "路线规划", requireAuth: true}
        },
        {
            path:"myRouteInfo",
            component: ()=> import('@/views/my/myRouteInfo'),
            name: "myRouteInfo",
            meta: { title: "路线规划详情", requireAuth: true}
        },
        {
            path:"myPrice",
            component: ()=> import('@/views/my/myPrice'),
            name: "myPrice",
            meta: { title: "价格设置", requireAuth: true}
        },
        {
            path:"myGameOrder",
            component: ()=> import('@/views/my/myGameOrder'),
            name: "myGameOrder",
            meta: { title: "玩家订单管理", requireAuth: true}
        },
        {
            path:"myDate",
            component: ()=> import('@/views/my/myDate'),
            name: "myDate",
            meta: { title: "玩家时间管理", requireAuth: true}
        },
        {
            path:"myCompany",
            component: ()=> import('@/views/my/myCompany'),
            name: "myCompany",
            meta: { title: "公司信息", requireAuth: true}
        },
        {
            path:"mySub",
            component: ()=> import('@/views/my/mySub'),
            name: "mySub",
            meta: { title: "公司子账号", requireAuth: true}
        },
        {
            path:"myAbout",
            component: ()=> import('@/views/my/myAbout'),
            name: "myAbout",
            meta: { title: "关于我们", requireAuth: true}
        },
    ]
}

export default myRouter
