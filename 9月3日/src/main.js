import {
	createApp
} from 'vue'
import App from './App.vue'
import router from './router/index.js'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import axios from 'axios'
import VueAxios from 'vue-axios'
import axios from './api/HTTP.js' //请求拦截器、

// router.beforeEach((to, from, next) => { // 路由拦截器
// 	if (to.path === '/login') { // 去的页面是否去的是登录页面
// 		const bool = window.sessionStorage.getItem('token')
// 		if (bool) {
// 			// 登录则，返回原页面
// 			ElMessage.error('您已登录');
// 			next({
// 				path: from.path
// 			})
// 		} else {
// 			// 没登录则，用户继续跳转
// 			next()
// 		}
// 	} else {
// 		// 如果去的不是登录页面，则看用户是否登录
// 		const bool = window.sessionStorage.getItem('token')
// 		if (bool) {
// 			// 登录则，用户继续跳转
// 			next()
// 		} else {
// 			// 没登录则，用户跳转至登录页面
// 			ElMessage.error('您尚未登录');
// 			window.sessionStorage.setItem('router', to.path) // 存储当前路由
// 			next({
// 				path: '/login'
// 			})
// 		}
// 	}
// })

const app = createApp(App)

app.use(router)
app.use(ElementPlus)
app.use(VueAxios, axios)
app.mount('#app')
