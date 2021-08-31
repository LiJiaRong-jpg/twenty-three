import index from "../views/index.vue"
import address from "../views/user/address.vue"
import collect from "../views/user/collect.vue"
import feedback from "../views/user/feedback.vue"
import footprint from "../views/user/footprint.vue"
import history from "../views/user/history.vue"
import user from "../views/user/user.vue"

export default [
  {
    path: '/user',
    component: index,
    children: [
      {
        path: 'address',
        name: ['用户管理', '会员管理'],
        component: address
      }, {
        path: 'collect',
        name: ['用户管理', '收货地址'],
        component: collect
      }, {
        path: 'feedback',
        name: ['用户管理', '会员收藏'],
        component: feedback
      }, {
        path: 'footprint',
        name: ['用户管理', '会员足迹'],
        component: footprint
      }, {
        path: 'history',
        name: ['用户管理', '搜索历史'],
        component: history
      }, {
        path: 'user',
        name: ['用户管理', '意见反馈'],
        component: user
      }
    ]
  }
]
