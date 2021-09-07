import axios from '../HTTP.js'

// 通知列表
export function ListNotice(data) {
	return axios({
		url: "http://192.168.1.54:8080/admin/notice/list",
		method: 'get',
		params:data
	})
}

// 删除通知
export function DeleteNotice(data) {
	return axios({
		url: 'http://192.168.1.54:8080/admin/notice/batch-delete',
		method: 'post',
		data:{
			ids:data
		}
	})
}

// 添加通知
export function AddNotice(title,content) {
	return axios({
		url: 'http://192.168.1.54:8080/admin/notice/create',
		method: 'post',
		data:{
			title,
			content
		}
	})
}

// 修改通知
export function UpdataNotice(id,title,content) {
	return axios({
		url: 'http://192.168.1.54:8080/admin/notice/update',
		method: 'post',
		data:{
			id,
			title,
			content
		}
	})
}