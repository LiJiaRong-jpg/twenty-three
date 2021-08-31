import Axios from 'axios'
import router from '../router/index.js'
import {
	ElMessage
} from 'element-plus'
import {
	Login
} from '../api/user/user.js'


const axios = Axios.create({
	timeout: 5000 // 超时
})

axios.interceptors.request.use( // 请求拦截器
	(config) => {
		// 在临时储存中获取token加入到请求头
		config.headers['X-Litemall-Admin-Token'] = window.sessionStorage.getItem('token')
		return config
	},
	error => {
		return Promise.reject(error)
	}
)

axios.interceptors.response.use(function(response) { //请求返回拦截
	if (response.config.url == "http://192.168.1.54:8080/admin/auth/login") {
		return response //如果是登录的请求，直接返回
	} else if (response.data.errno == '501') { //token过期
		let pass = JSON.parse(window.localStorage.getItem('user'))
		if (pass) { //如果用户记住密码
			response.data.data = '成功'
			return getToken(pass, response)
		} else {
			window.sessionStorage.removeItem('token')
			router.push({
				path: '/login'
			}).catch(err => {
				console.log(err)
			})
			ElMessage.error('请重新登录');
			return response
		}
	}
	return response
})
async function getToken(pass, Request) {
	const toke = await Login(pass) // 获取token
	window.sessionStorage.token = toke.data.data.token
	Request.config.headers.ADMINTOKEN = toke.data.data.token
	const req = await axios.request(Request.config) // 重新执行原请求
	return req
}

export default axios
