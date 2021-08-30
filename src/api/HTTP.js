// import router from '../router'
// import {
//   ElMessage
// } from 'element-plus'
import Axios from 'axios'

// router.beforeEach((to, from, next) => { // 路由拦截器
//   if (to.path === '/login') { // 去的页面是否去的是登录页面
//     const bool = window.sessionStorage.getItem('token')
//     if (bool) {
//       // 登录则，返回原页面
//       ElMessage({
//         showClose: true,
//         message: '请勿重复登录',
//         type: 'error'
//       })
//       next({
//         path: from.path
//       })
//     } else {
//       // 没登录则，用户继续跳转
//       next()
//     }
//   } else {
//     // 如果去的不是登录页面，则看用户是否登录
//     const bool = window.sessionStorage.getItem('token')
//     if (bool) {
//       // 登录则，用户继续跳转
//       next()
//     } else {
//       // 没登录则，用户跳转至登录页面
//       window.sessionStorage.setItem('router', to.path) // 存储当前路由
//       next({
//         path: '/login'
//       })
//     }
//   }
// })


const axios = Axios.create({
  timeout: 5000 // 超时
})

axios.interceptors.request.use( // 请求拦截器
	(config) => {
		// 在临时储存中获取token加入到请求头
		const token = window.sessionStorage.getItem('token')
		config.headers['X-Litemall-Admin-Token'] = token
		return config
	},
	error => {
		return Promise.reject(error)
	})
export default axios
