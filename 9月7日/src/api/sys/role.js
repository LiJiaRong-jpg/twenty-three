import axios from '../HTTP.js'

// 角色列表
export function roleList(data) {
	return axios({
		url: "http://192.168.1.54:8080/admin/role/list",
		method: 'get',
		params:data
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
// 修改角色
export function UpdataRole(data) {
	return axios({
		url: 'http://192.168.1.54:8080/admin/role/update',
		method: 'post',
		data
	})
}
// 删除角色
export function DeleteRole(data) {
	return axios({
		url: 'http://192.168.1.54:8080/admin/role/delete',
		method: 'post',
		data
	})
}

// 角色权限列表
export function permissionList(id) {
	return axios({
		url: 'http://192.168.1.54:8080/admin/role/permissions',
		method: 'get',
		params:{
			roleId:id
		}
	})
}

// 角色权限赋值
export function PermissionAssignment(id,data) {
	return axios({
		url: 'http://192.168.1.54:8080/admin/role/permissions',
		method: 'post',
		data:{
			roleId:id,
			permissions:data
		}
	})
}