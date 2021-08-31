import {
	createRouter,
	createWebHashHistory
} from 'vue-router'
import {
	ElMessage
} from 'element-plus'

import Login from '../views/login.vue'
import Index from '../views/index.vue'
import Dashboard from '../views/dashboard.vue'
import User from './user.js'
import Mall from './mall.js'
import Goods from './goods.js'
import Promotion from './promotion.js'
import Config from './config.js'
import Stat from './stat.js'
import Sys from './sys.js'
import Back from '../views/back/back.vue'

const routes = [{
		path: '/login',
		component: Login
	}, {
		path: '/index',
		component: Index
	}, {
		path: '/back',
		component: Back
	}, {
		path: '/',
		redirect: '/login'
	}, {
		path: '/dashboard',
		component: Index,
		children: [{
			path: '',
			name: ['', '首页'],
			component: Dashboard
		}]
	},
	...User,
	...Mall,
	...Goods,
	...Promotion,
	...Config,
	...Stat,
	...Sys
]

const router = createRouter({
	history: createWebHashHistory(),
	routes
});
let that=0
router.beforeEach((to, from, next) => { // 路由拦截器
	if (to.path === '/login') { // 去的页面是否去的是登录页面
		const bool = window.sessionStorage.getItem('token')
		if (bool) {
			// 登录则，返回原页面
			that ? ElMessage.close() : ''
			that = 1//有过一次记录才能取消上一次弹出框
			ElMessage.error('请勿重复登录');
			next({
				path: from.path
			})
		} else {
			// 没登录则，用户继续跳转
			next()
		}
	} else {
		// 如果去的不是登录页面，则看用户是否登录
		const bool = window.sessionStorage.getItem('token')
		if (bool) {
			// 登录则，用户继续跳转
			next()
		} else {
			// 没登录则，用户跳转至登录页面
			that ? ElMessage.close() : ''
			that = 1
			ElMessage.error('您尚未登录，请登录');
			window.sessionStorage.setItem('router', to.path) // 存储当前路由
			next({
				path: '/login'
			})
		}
	}
})

export default router
