import axios from '../HTTP.js'

// 角色列表
export function roleList(data) {
	return axios({
		url: "http://192.168.1.54:8080/admin/role/list",
		method: 'get',
		data
	})
}

// 添加角色
export function AddRole(data) {
	return axios({
		url: 'http://192.168.1.54:8080/admin/role/create',
		method: 'post',
		data
	})
}
