// import index from "../views/index.vue"
// import admin from "../views/sys/admin.vue"
// import notice from "../views/sys/notice.vue"
// import log from "../views/sys/log.vue"
// import role from "../views/sys/role.vue"
// import os from "../views/sys/os.vue"

const index = () => import('@/views/index.vue')
const admin = () => import('@/views/sys/admin.vue')
const notice = () => import('@/views/sys/notice.vue')
const log = () => import('@/views/sys/log.vue')
const role = () => import('@/views/sys/role.vue')
const os = () => import('@/views/sys/os.vue')

export default [
  {
    path: '/sys',
    component: index,
    children: [
      {
        path: 'admin',
        name: ['系统管理', '管理员'],
        component: admin
      }, {
        path: 'notice',
        name: ['系统管理', '通知管理'],
        component: notice
      }, {
        path: 'log',
        name: ['系统管理', '操作日志'],
        component: log
      }, {
        path: 'role',
        name: ['系统管理', '角色管理'],
        component: role
      }, {
        path: 'os',
        name: ['系统管理', '对象储存'],
        component: os
      }
    ]
  }
]
