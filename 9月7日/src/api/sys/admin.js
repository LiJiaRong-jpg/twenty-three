import axios from '../HTTP.js'

// 管理员列表
export function ListAdmin(data) {
	return axios({
		url: "http://192.168.1.54:8080/admin/admin/list",
		method: 'get',
		params:data
	})
}
// 管理员角色列表
export function RoleAdministrator(data) {
	return axios({
		url: "http://192.168.1.54:8080/admin/role/options",
		method: 'get',
		params:data
	})
}

// 添加管理员
export function AddAdmin(data) {
	return axios({
		url: 'http://192.168.1.54:8080/admin/admin/create',
		method: 'post',
		data
	})
}

// 修改管理员
export function UpdataAdmin(data) {
	return axios({
		url: 'http://192.168.1.54:8080/admin/admin/create',
		method: 'post',
		data
	})
}

// 删除管理员
export function DeleteAdmin(data) {
	return axios({
		url: 'http://192.168.1.54:8080/admin/admin/create',
		method: 'post',
		data
	})
}