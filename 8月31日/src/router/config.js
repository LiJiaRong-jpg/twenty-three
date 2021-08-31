import index from "../views/index.vue"
import mall from "../views/config/mall.vue"
import express from "../views/config/express.vue"
import order from "../views/config/order.vue"
import wx from "../views/config/wx.vue"

export default [
  {
    path: '/config',
    component: index,
    children: [
      {
        path: 'mall',
        name: ['配置管理', '商场配置'],
        component: mall
      }, {
        path: 'express',
        name: ['配置管理', '运费配置'],
        component: express
      }, {
        path: 'order',
        name: ['配置管理', '订单配置'],
        component: order
      }, {
        path: 'wx',
        name: ['配置管理', '小程序配置'],
        component: wx
      }
    ]
  }
]
