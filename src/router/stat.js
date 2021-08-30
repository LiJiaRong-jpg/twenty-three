import index from "../views/index.vue"
import user from "../views/stat/user.vue"
import order from "../views/stat/order.vue"
import goods from "../views/stat/goods.vue"

export default [{
	path: '/stat',
	component: index,
	children: [{
		path: 'user',
		name: ['统计报表', '用户统计'],
		component: user
	}, {
		path: 'order',
		name: ['统计报表', '订单统计'],
		component: order
	}, {
		path: 'goods',
		name: ['统计报表', '商品统计'],
		component: goods
	}]
}]
