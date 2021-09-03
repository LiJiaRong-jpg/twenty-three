// import index from "../views/index.vue"
// import list from "../views/goods/list.vue"
// import create from "../views/goods/create.vue"
// import comment from "../views/goods/comment.vue"

const index = () => import('@/views/index.vue')
const list = () => import('@/views/goods/list.vue')
const create = () => import('@/views/goods/create.vue')
const comment = () => import('@/views/goods/comment.vue')

export default [
  {
    path: '/goods',
    component: index,
    children: [
      {
        path: 'list',
        name: ['商品管理', '商品列表'],
        component: list
      }, {
        path: 'create',
        name: ['商品管理', '商品上架'],
        component: create
      }, {
        path: 'comment',
        name: ['商品管理', '商品评论'],
        component: comment
      }
    ]
  }
]
