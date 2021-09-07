<template>
	<div>
		<div class="filter-container">
			<el-input v-model="form.username" clearable placeholder="请输入角色名称" @keyup.enter="load" />
			<el-button type="primary" icon="el-icon-search" @click="load">查找
			</el-button>
			<el-button type="primary" icon="el-icon-edit" @click="AdminAdd">添加
			</el-button>
			<el-button type="primary" icon="el-icon-download" @click="Export">当前页导出</el-button>
		</div>

		<div>
			<el-table :data="tableData.list" id="table" style="width: 90%;margin: auto;" border>
				<el-table-column prop="id" label="管理员ID" sortable align="center" width="100">
				</el-table-column>
				<el-table-column prop="username" label="管理员名称" align="center">
				</el-table-column>
				<el-table-column prop="avatar" label="管理员头像" align="center" width="100">
					<template #default="scope">
						<el-image :src="scope.row.avatar" fit="fill">
							<template #error>
								<div class="image-slot">
									<i class="el-icon-picture-outline"></i>
								</div>
							</template>
						</el-image>
					</template>
				</el-table-column>
				<el-table-column prop="roleIds" label="管理员角色" align="center">
					<template #default="scope">
						<el-button type="primary" size="mini" v-for="(item,index) in scope.row.roleIds" :key='index'>
							{{AdministratorRole(item)}}
						</el-button>
					</template>
				</el-table-column>
				<el-table-column prop="address" label="操作" align="center" width="200">
					<template #default="scope">
						<el-button type="primary" size="mini" @click="AdminUpdate(scope.row)">
							编辑</el-button>
						<el-button type="danger" size="mini" @click="AdminDelete(scope.row)">
							删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>

		<Pagination :data='form' @page="page($event)" @current="current($event)"></Pagination>

		<el-dialog :title="title" v-model="ifDialog" lock-scroll destroy-on-close>
			<el-form :model="DialogForm" :rules="Form" ref="Form" @validate="FormValidation">
				<el-form-item prop="username" label="管理员名称">
					<el-input v-model="DialogForm.username" autofocus clearable />
				</el-form-item>
				<el-form-item prop="password" label="管理员密码">
					<el-input v-model="DialogForm.password" clearable />
				</el-form-item>
				<el-form-item label="管理员头像">
					<el-upload class="avatar-uploader" action="http://192.168.1.54:8080/admin/storage/create"
						:headers="headers" :show-file-list="false" :on-success="handleAvatarSuccess"
						:before-upload="beforeAvatarUpload">
						<img v-if="DialogForm.avatar" :src="DialogForm.avatar" class="avatar" />
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-form-item>
				<el-form-item label="管理员头像">
					<el-select v-model="DialogForm.roleIds" multiple placeholder="请选择">
						<el-option v-for="item in RoleList" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="ifDialog = false">取消</el-button>
					<el-button v-if="title=='创建'" type="primary" @click="adminADD">确定</el-button>
					<el-button v-if="title=='编辑'" type="primary" @click="adminUpdata">确定</el-button>
				</span>
			</template>
		</el-dialog>

	</div>
</template>

<script>
	import FileSaver from 'file-saver'
	import XLSX from 'xlsx'
	import {
		ListAdmin,
		RoleAdministrator,
		AddAdmin,
		UpdataAdmin,
		DeleteAdmin
	} from '../../api/sys/admin.js'
	import {
		ElMessage
	} from 'element-plus'
	import Pagination from '../../components/Pagination.vue'
	export default {
		components: {
			Pagination
		},
		data() {
			return {
				form: {
					username: '',
					page: 1,
					limit: 10,
					total: 0
				},
				tableData: [], //返回的表单数据
				RoleList: [], //管理员角色名称所需的列表
				title: '', //弹出框标题
				DialogForm: {
					username: '',
					password: '',
					avatar: '',
					roleIds: ''
				},
				ifDialog: false, //弹出框显影
				headers: {
					'X-Litemall-Admin-Token': window.sessionStorage.getItem('token')
				},




				Form: { //验证规则
					username: [{
						required: true,
						message: '管理员名称不能为空',
						trigger: 'blur'
					}],
					password: [{
						required: true,
						message: '管理员密码不能为空',
						trigger: 'blur'
					}]
				}
			}
		},
		beforeMount() {
			this.load()
			this.Role()
		},
		methods: {
			load() { //请求表单数据
				let that = this
				ListAdmin(that.form).then((res) => {
					console.log(res)
					if (res.data.errmsg == "成功") {
						that.tableData = res.data.data
						that.form.total = res.data.data.total
					} else {
						that.mess ? that.mess.close() : ''
						that.mess = ElMessage.error(res.data.errmsg);
					}
				})
			},
			page(num) {
				this.form.limit = num
				this.load()
			},
			current(num) {
				this.form.page = num
				this.load()
			},
			Role() { //管理员角色名称所需的列表
				let that = this
				RoleAdministrator().then((res) => {
					that.RoleList = res.data.data.list
				})
			},
			AdministratorRole(id) { //管理员角色名称
				for (let i = 0; i < this.RoleList.length; i++) {
					if (this.RoleList[i].value == id) {
						return this.RoleList[i].label
					}
					if (i == this.RoleList.length - 1) {
						return ''
					}
				}
			},
			AdminAdd() { //点击添加管理员
				this.title = '创建'
				this.Role()
				this.ifDialog = true
				this.DialogForm = {
					username: '',
					password: '',
					avatar: '',
					roleIds: ''
				}
			},
			AdminUpdate(row) { //点击修改管理员
				this.title = '修改'
				this.Role()
				this.ifDialog = true
				this.DialogForm = Object.assign({}, row)
			},
			handleAvatarSuccess(res, file) { //上传图片的返回
				this.DialogForm.avatar = URL.createObjectURL(file.raw)
			},
			beforeAvatarUpload(file) { //上传图片的限制
				const isLt2M = file.size / 1024 / 1024 < 2

				if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!')
				}
				return isLt2M
			},
			adminADD() { //添加管理员
				this.$refs.Form.validate((valid) => {
					if (valid) {
						let that = this
						AddAdmin(that.DialogForm).then((res) => {
							if (res.data.errmsg == '成功') {
								that.ifDialog = false
								that.load()
							} else {
								that.mess ? that.mess.close() : ''
								that.mess = ElMessage.error(res.data.errmsg);
							}
						})
					}
				})
			},
			adminUpdata() { //修改管理员
				this.$refs.Form.validate((valid) => {
					if (valid) {
						let that = this
						UpdataAdmin(that.DialogForm).then((res) => {
							if (res.data.errmsg == '成功') {
								that.ifDialog = false
								that.load()
							} else {
								that.mess ? that.mess.close() : ''
								that.mess = ElMessage.error(res.data.errmsg);
							}
						})
					}
				});
			},
			AdminDelete(row) { //删除管理员
				let that = this
				this.$confirm('此操作将永久删除该角色' + row.name + ', 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					DeleteAdmin(row).then(function(res) {
						that.mess ? that.mess.close() : ''
						if (res.data.errmsg == "成功") {
							that.load()
							that.mess = ElMessage.success('删除成功');
						} else {
							that.mess = ElMessage.error(res.data.errmsg);
						}
					})
				})
			},
			FormValidation(boolean, object, text) { //表单验证回调
				this.mess ? this.mess.close() : ''
				this.mess = ElMessage.error(text);
			},
			Export() { //导出管理员列表
				var xlsxParam = {
					raw: true
				}; //转换成excel时，使用原始的格式
				var wb = XLSX.utils.table_to_book(document.querySelector("#table"),
					xlsxParam); //outTable为列表id
				var wbout = XLSX.write(wb, {
					bookType: "xlsx",
					bookSST: true,
					type: "array"
				});
				try {
					FileSaver.saveAs(
						new Blob([wbout], {
							type: "application/octet-stream;charset=utf-8"
						}),
						"管理员信息.xlsx"
					);
				} catch (e) {
					if (typeof console !== "undefined") console.log(e, wbout);
				}
				return wbout;
			},
		}
	}
</script>

<style scoped="scoped">
	.filter-container {
		margin: 20px;
	}

	.filter-container>div {
		width: 200px;
		float: left;
	}

	.filter-container button {
		float: left;
		margin: 0 10px;
	}

	.img {
		width: 50px;
		height: 50px;
	}

	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	.avatar-uploader .el-upload:hover {
		border-color: #409eff;
	}

	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}

	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}
</style>
