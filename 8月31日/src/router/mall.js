import index from "../views/index.vue"
import region from "../views/mall/region.vue"
import brand from "../views/mall/brand.vue"
import category from "../views/mall/category.vue"
import order from "../views/mall/order.vue"
import aftersale from "../views/mall/aftersale.vue"
import issue from "../views/mall/issue.vue"
import keyword from "../views/mall/keyword.vue"

export default [
  {
    path: '/mall',
    component: index,
    children: [
      {
        path: 'region',
        name: ['商场管理', '行政区域'],
        component: region
      }, {
        path: 'brand',
        name: ['商场管理', '品牌制造商'],
        component: brand
      }, {
        path: 'category',
        name: ['商场管理', '商品类目'],
        component: category
      }, {
        path: 'order',
        name: ['商场管理', '订单管理'],
        component: order
      }, {
        path: 'aftersale',
        name: ['商场管理', '售后管理'],
        component: aftersale
      }, {
        path: 'issue',
        name: ['商场管理', '通用问题'],
        component: issue
      }, {
        path: 'keyword',
        name: ['商场管理', '关键词'],
        component: keyword
      }
    ]
  }
]
