import axios from '../HTTP.js'

// 管理员登录
export function Login(data) {
	return axios({
		url: "http://192.168.1.54:8080/admin/auth/login",
		method: 'post',
		data
	})
}

// 管理员信息
export function Info() {
	return axios({
		url: 'http://192.168.1.54:8080/admin/auth/info',
		method: 'get'
	})
}

// 管理员退出登录
export function signOut() {
	return axios({
		url: "http://192.168.1.54:8080/admin/auth/logout",
		method: 'post'
	})
}