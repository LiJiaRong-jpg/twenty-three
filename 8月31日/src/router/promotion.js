import index from "../views/index.vue"
import ad from "../views/promotion/ad.vue"
import coupon from "../views/promotion/coupon.vue"
import topic from "../views/promotion/topic.vue"
import rule from "../views/promotion/groupon-rule.vue"
import activity from "../views/promotion/groupon-activity.vue"

export default [
  {
    path: '/promotion',
    component: index,
    children: [
      {
        path: 'ad',
        name: ['推广管理', '广告管理'],
        component: ad
      }, {
        path: 'coupon',
        name: ['推广管理', '优惠劵管理'],
        component: coupon
      }, {
        path: 'topic',
        name: ['推广管理', '专题管理'],
        component: topic
      }, {
        path: 'groupon-rule',
        name: ['推广管理', '团购管理'],
        component: rule
      }, {
        path: 'groupon-activity',
        name: ['推广管理', '团购活动'],
        component: activity
      }
    ]
  }
]
