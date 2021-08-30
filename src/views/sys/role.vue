<template>
	<div class="rolemanage">
		<div style="width: 100%;height: 40px;"></div>
		<div class="filter-container" style="margin-top: 20px;margin-left: 20px;margin-bottom: 20px;">
			<el-input v-model="form.name" clearable class="filter-item" style="width: 200px;" placeholder="请输入角色名称" />
			<el-button style="position: relative;top: -13px;left: 10px;" class="filter-item" type="primary"
				icon="el-icon-search" @click="handleFilter">查找</el-button>
			<el-button style="position: relative;top: -13px;left: 10px;" class="filter-item" type="primary"
				icon="el-icon-edit" @click="handleCreate">添加</el-button>
		</div>

		<div>
			<el-table :data="tableData.list" style="width: 90%;margin: auto;" border>
				<el-table-column prop="name" label="角色名称" sortable align="center" width="330">
				</el-table-column>
				<el-table-column prop="desc" align="center" label="说明" width="330">
				</el-table-column>
				<el-table-column prop="address" label="操作" align="center">
					<!-- :formatter="formatter" -->
					<template #default="scope">
						<el-button type="primary" size="mini" @click="handleUpdate(scope.row)">
							编辑</el-button>
						<el-button type="danger" size="mini" @click="handleDelete(scope.row)">
							删除</el-button>
						<el-button type="primary" size="mini" @click="handlePermission(scope.row)">授权</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>

		<!-- <div style="width: 100%;background-color: white;">
			<el-pagination style="padding: 20px;" @size-change="handleSizeChange" @current-change="handleCurrentChange"
				:page-sizes="[10, 20, 50, 100]" :current-page="form.page" :page-size="form.limit"
				layout="total, sizes, prev, pager, next, jumper" :total="tableData.total">
			</el-pagination>
		</div> -->


		<el-dialog :title="title" v-model="addRole" lock-scroll destroy-on-close>
			<el-form :model="roleForm" :rules="Form" ref="Form" label-width="80px" @validate="FormValidation">
				<el-form-item prop="name" label="角色名称">
					<el-input v-model="roleForm.name"/>
				</el-form-item>
				<el-form-item prop="desc" label="说明">
					<el-input v-model="roleForm.desc"/>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="addRole = false">取消</el-button>
					<el-button v-if="title=='创建'" type="primary" @click="roleADD">确定</el-button>
					<el-button v-if="title=='编辑'" type="primary" @click="roleUPDATE">确定</el-button>
				</span>
			</template>
		</el-dialog>



		<!-- <el-dialog :title="title" v-model="addRole">
			<! <el-form ref="Form" :rules="Form" :model="roleForm" label-width="80px">
				<el-form-item prop="name">
					<el-input class="input" placeholder="请输入角色名称" v-model="data.name" clearable autofocus>
					</el-input>
				</el-form-item>
				<el-form-item label="说明">
					<el-input v-model="roleForm.desc"></el-input>
				</el-form-item>
			</el-form> -->
			<!-- <el-form :model="roleForm" :rules="Form" ref="Form" label-width="80px">
				<el-form-item prop="name" label="名称">
					<el-input class="input" placeholder="请输入角色名称" v-model="roleForm.name" clearable autofocus>
					</el-input>
				</el-form-item>
				<el-form-item prop="desc" label="说明">
					<el-input class="input" v-model="roleForm.desc" clearable show-password>
					</el-input>
				</el-form-item>
			</el-form>
			<div style="float: right;">
				<el-button @click="addRole = false">取消</el-button>
				<el-button v-if="title=='创建'" type="primary" @click="roleADD">确定</el-button>
				<el-button v-if="title=='编辑'" type="primary" @click="roleUPDATE">确定</el-button>
			</div>
		</el-dialog> -->


	</div>

</template>

<script>
	import {
		roleList,
		AddRole
	} from '../../api/sys/role.js'
	import {
		ElMessage
	} from 'element-plus'
	export default {
		data() {
			return {
				form: { // 搜索列表参数
					name: '', // 名字
					page: 1, // 页数
					limit: 10 // 每页几条
				},
				tableData: {
					total: 0,
					list: []
				}, // 返回数据
				addRole: false, // 添加修改框显隐
				title: '', // 添加修改框标题
				roleForm: { // 添加或修改需要的两条数据
					name: '', // 名称
					desc: '' // 说明
				},


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
					console.log(reds.data.data)
					that.tableData = reds.data.data
				})
			},
			handleFilter() { // 点击查找
				this.load() 
			},
			handleCreate() { // 点击添加
				this.title = '创建'
				this.addRole = true
				this.roleForm={// 清除编辑残留信息
					name : '',
					desc : ''
				}
			},
			handleUpdate(event) { // 点击编辑
				this.title = '编辑'
				this.addRole = true
				this.roleForm = Object.assign({},event)
			},
			FormValidation(boolean, object, text) { //表单验证回调
				this.mess ? this.mess.close() : ''
				this.mess = ElMessage.error(text);
			},
			roleADD(){
				let that=this
				AddRole(that.roleForm).then(function(reds) {
					console.log(reds.data.data)
					that.load()
					that.addRole = false
				})
			}
		}
	}
</script>

<style>

</style>
