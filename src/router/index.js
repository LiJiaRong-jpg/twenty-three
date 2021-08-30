import {
	createRouter,
	createWebHashHistory
} from 'vue-router'

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

const routes = [{
		path: '/login',
		component: Login
	}, {
		path: '/index',
		component: Index
	}, {
		path: '/',
		redirect: '/login',
		component: Login
	}, {
		path: '/dashboard',
		component: Index,
		children: [{
			path: 'dashboard',
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

export default createRouter({
	history: createWebHashHistory(),
	routes
});
