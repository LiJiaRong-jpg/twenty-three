<template>
	<div>

		<div class="filter-container">
			<el-input v-model="form.name" clearable class="filter-input" placeholder="请输入角色名称" />
			<el-button class="filter-button" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
			<el-button class="filter-button" type="primary" icon="el-icon-edit" @click="handleCreate">添加</el-button>
		</div>

		<div>
			<el-table :data="tableData.list" style="width: 90%;margin: auto;" border>
				<el-table-column prop="name" label="角色名称" sortable align="center" width="330">
				</el-table-column>
				<el-table-column prop="desc" align="center" label="说明" width="330">
				</el-table-column>
				<el-table-column prop="address" label="操作" align="center">
					<template #default="scope">
						<el-button type="primary" size="mini" @click="handleUpdate(scope.row)">
							编辑</el-button>
						<el-button type="danger" size="mini" @click="roleDelete(scope.row)">
							删除</el-button>
						<el-button type="primary" size="mini" @click="handlePermission(scope.row)">授权</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>

		<el-dialog :title="title" v-model="addRole" lock-scroll destroy-on-close>
			<el-form :model="roleForm" :rules="Form" ref="Form" label-width="80px" @validate="FormValidation">
				<el-form-item prop="name" label="角色名称">
					<el-input v-model="roleForm.name" autofocus clearable />
				</el-form-item>
				<el-form-item prop="desc" label="说明">
					<el-input v-model="roleForm.desc" clearable />
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="addRole = false">取消</el-button>
					<el-button v-if="title=='创建'" type="primary" @click="roleADD">确定</el-button>
					<el-button v-if="title=='编辑'" type="primary" @click="roleUpdata">确定</el-button>
				</span>
			</template>
		</el-dialog>

		<el-dialog title="权限配置" lock-scroll v-model="permissionsRole">

			<el-tree ref='tree' :data="systemPermissions" show-checkbox node-key="id" :props="defaultProps">
			</el-tree>

			<template #footer>
				<span class="dialog-footer">
					<el-button @click="permissionsRole = false">取消</el-button>
					<el-button type="primary" @click="rolePermission">确定</el-button>
				</span>
			</template>
		</el-dialog>

		<Pagination :data='form' @page="page($event)" @current="current($event)"></Pagination>

	</div>

</template>

<script>
	import {
		roleList,
		AddRole,
		UpdataRole,
		DeleteRole,
		permissionList,
		PermissionAssignment
	} from '../../api/sys/role.js'
	import Pagination from '../../components/Pagination.vue'
	import {
		ElMessage
	} from 'element-plus'
	export default {
		components: {
			Pagination
		},
		data() {
			return {
				form: { // 搜索列表参数
					name: '', // 名字
					page: 1, // 页数
					limit: 10, // 每页几条
					total: 0 //总共几条数据
				},
				tableData: {
					total: 0,
					list: []
				}, // 返回数据
				addRole: false, // 添加修改框显隐
				permissionsRole: false, // 角色权限框显隐
				title: '', // 添加修改框标题
				roleForm: { // 添加或修改需要的两条数据
					name: '', // 名称
					desc: '' // 说明
				},
				systemPermissions: [], //角色能赋值的权限
				defaultProps: {
					children: 'children',
					label: 'label'
				},
				roleID: 0, //给角色配置权限时所需的ID


				Form: { //验证规则
					name: [{
						required: true,
						message: '角色名称不能为空',
						trigger: 'blur'
					}]
				}
			}
		},
		mounted() {
			this.load()
		},
		methods: {
			load() { // 页面加载
				const that = this
				roleList(that.form).then(function(reds) {
					that.tableData = reds.data.data
					that.form.total = reds.data.data.total
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
			handleFilter() { // 点击查找
				this.load()
			},
			handleCreate() { // 点击添加
				this.title = '创建'
				this.addRole = true
				this.roleForm = { // 清除编辑残留信息
					name: '',
					desc: ''
				}
			},
			handleUpdate(event) { // 点击编辑
				this.title = '编辑'
				this.addRole = true
				this.roleForm = Object.assign({}, event)//复制
			},
			FormValidation(boolean, object, text) { //表单验证回调
				this.mess ? this.mess.close() : ''
				this.mess = ElMessage.error(text);
			},
			roleADD() { //添加角色
				let that = this
				AddRole(that.roleForm).then(function(res) {
					that.mess ? that.mess.close() : ''
					if (res.data.errmsg == "成功") {
						that.load()
						that.addRole = false
						that.mess = ElMessage.success('添加成功');
					} else {
						that.mess = ElMessage.error(res.data.errmsg);
					}
				})
			},
			roleUpdata() { //修改角色
				let that = this
				UpdataRole(that.roleForm).then(function(res) {
					that.mess ? that.mess.close() : ''
					if (res.data.errmsg == "成功") {
						that.load()
						that.addRole = false
						that.mess = ElMessage.success('修改成功');
					} else {
						that.mess = ElMessage.error(res.data.errmsg);
					}
				})
			},
			roleDelete(event) { //删除角色
				let that = this
				this.$confirm('此操作将永久删除该角色' + event.name + ', 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					DeleteRole(event).then(function(res) {
						that.mess ? that.mess.close() : ''
						if (res.data.errmsg == "成功") {
							that.load()
							that.addRole = false
							that.mess = ElMessage.success('删除成功');
						} else {
							that.mess = ElMessage.error(res.data.errmsg);
						}
					})
				})
			},
			handlePermission(row) { //角色权限列表
				let that = this
				this.roleID = row.id
				permissionList(row.id).then(function(res) {
					that.mess ? that.mess.close() : ''
					if (res.data.errmsg == "成功") {
						that.permissionsRole = true
						that.systemPermissions = res.data.data.systemPermissions
						that.$refs.tree.setCheckedKeys(res.data.data.assignedPermissions)
					} else {
						that.mess = ElMessage.error(res.data.errmsg);
					}
				})
			},
			rolePermission() { //给角色权限赋值
				let that = this
				PermissionAssignment(this.roleID, this.$refs.tree.getCheckedKeys()).then(function(res) {
					that.mess ? that.mess.close() : ''
					if (res.data.errmsg == "成功") {
						that.permissionsRole = false
						that.mess = ElMessage.success('配置成功');
					} else {
						that.mess = ElMessage.error(res.data.errmsg);
					}
				})
			}
		}
	}
</script>

<style scoped="scoped">
	.filter-container {
		margin-top: 20px;
		margin-left: 20px;
		margin-bottom: 20px;
	}

	.filter-input {
		width: 200px;
		float: left;
	}

	.filter-button {
		margin: 0 10px;
		float: left;
	}
</style>
