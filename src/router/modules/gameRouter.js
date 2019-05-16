/*
 * @Description:  当地玩家路由
 * @Author: 彭善智
 * @LastEditors: 彭善智
 * @Date: 2019-05-07 11:15:53
 * @LastEditTime: 2019-05-16 21:06:13
 */

const gameRouter = {
    path: '/game',
    component: ()=> import( '@/views/game/gameHome'),
    redirect: "/game/gameIndex",
    name: "gameHome",
    children: [
          {
            path:"gameIndex",
            component: ()=> import('@/views/game/gameIndex'),
            name: "gameIndex",
            meta: { title: "当地玩家首页", requireAuth: false}
          },
          {
            path:"gameList",
            component: ()=> import('@/views/game/gameList'),
            name: "gameList",
            meta: { title: "当地玩家列表", requireAuth: false}
          },
          {
            path:"gameInfo",
            component: ()=> import('@/views/game/gameInfo'),
            name: "gameInfo",
            meta: { title: "当地玩家详情", requireAuth: false}
          },
          {
            path:"gameSure",
            component: ()=> import('@/views/game/gameSure'),
            name: "gameSure",
            meta: { title: "当地玩家订单确定", requireAuth: false}
          },
          {
            path:"gamePay",
            component: ()=> import('@/views/game/gamePay'),
            name: "gamePay",
            meta: { title: "当地玩家订单支付", requireAuth: false}
          },
          {
            path:"gameSuccess",
            component: ()=> import('@/views/game/gameSuccess'),
            name: "gameSuccess",
            meta: { title: "当地玩家订单支付成功", requireAuth: false}
          },
    ]
}

export default gameRouter
