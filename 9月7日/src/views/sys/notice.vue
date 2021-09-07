<template>
	<div>
		<div class="filter">
			<el-input v-model="form.title" clearable placeholder="请输入角色名称" @keyup.enter="load" />
			<el-input v-model="form.content" clearable placeholder="请输入角色名称" @keyup.enter="load" />
			<el-button type="primary" icon="el-icon-search" @click="load">查找
			</el-button>
			<el-button type="primary" icon="el-icon-download" @click="Export">当前页导出
			</el-button>
		</div>
		<div class="container">
			<div>
				<el-button type="primary" icon="el-icon-edit" @click='Add'>添加
				</el-button>
				<el-button type="danger" icon="el-icon-delete" :disabled="option.length === 0"
					@click='MultipleDeletions'>批量删除
				</el-button>
			</div>
		</div>


		<div>
			<el-table :data="tableData.list" id="table" style="width: 90%;margin: auto;" border
				@selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55">
				</el-table-column>
				<el-table-column prop="title" label="通知标题" sortable align="center">
				</el-table-column>
				<el-table-column prop="content" label="通知详情" align="center">
					<template #default="scope">
						<el-button type="primary" size="mini" @click="NoticeDetails(scope.row)">
							查看</el-button>
					</template>
				</el-table-column>
				<el-table-column prop="addTime" label="添加时间" align="center">
				</el-table-column>
				<el-table-column prop="adminId" label="管理员ID" align="center">
				</el-table-column>
				<el-table-column prop="address" label="操作" align="center" width="200">
					<template #default="scope">
						<el-button type="primary" size="mini" @click="Update(scope.row)">
							编辑</el-button>
						<el-button type="danger" size="mini" @click="SingleDelete(scope.row)">
							删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>

		<Pagination :data='form' @page="page($event)" @current="current($event)"></Pagination>

		<el-dialog title="通知详情" v-model="DetailsNotice" lock-scroll>
			<div style="text-align: center;" v-html="content"></div>
		</el-dialog>

		<el-dialog :title="title" v-model="ifDialog" lock-scroll>
			<el-form :model="DialogForm" :rules="Form" ref="Form" @validate="FormValidation">
				<el-form-item prop="title" label="通知标题">
					<el-input v-model="DialogForm.title" autofocus clearable />
				</el-form-item>
				<el-form-item label="通知内容">
					<Editor :api-key="apiKey" :init="editConfig" v-model="content" />
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="ifDialog = false">取消</el-button>
					<el-button v-if="title=='创建'" type="primary" @click="NoticeADD">确定</el-button>
					<el-button v-if="title=='编辑'" type="primary" @click="NoticeUpdata">确定</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script>
	import FileSaver from 'file-saver'
	import XLSX from 'xlsx'
	import {
		ListNotice,
		DeleteNotice,
		AddNotice,
		UpdataNotice
	} from '../../api/sys/notice.js'
	import Pagination from '../../components/Pagination.vue'
	import Editor from '@tinymce/tinymce-vue'
	import axios from '../../api/HTTP.js'
	import {
		ElMessage
	} from 'element-plus'
	export default {
		components: {
			Pagination,
			Editor
		},
		watch: {
			content() {
				console.log(this.content)
			}
		},
		data() {
			return {
				form: {
					title: '',
					content: '',
					page: 1,
					limit: 10,
					total: 0
				},
				tableData: [], //返回的表单数据
				content: "<p></p>",
				apiKey: "fmpe10wgtn5cy4tq0quwhxd21a2mb6z7pwuf0zsut09xk039",
				edit: {
					language_url: '/tinymce/zh_CN.js', //中文包
					language: 'zh_CN', //中文
					height: 500,
					paste_data_images: false, // 是否允许粘贴图像
					convert_urls: true,
					readonly: true
				},
				editConfig: {
					language_url: '/tinymce/zh_CN.js', //中文包
					language: 'zh_CN', //中文
					paste_data_images: true, // 是否允许粘贴图像
					height: 500,
					convert_urls: false,
					plugins: [
						'advlist anchor autolink autosave code codesample colorpicker colorpicker contextmenu directionality emoticons fullscreen hr image imagetools importcss insertdatetime link lists media nonbreaking noneditable pagebreak paste preview print save searchreplace spellchecker tabfocus table template textcolor textpattern visualblocks visualchars wordcount'
					],
					toolbar: [
						'searchreplace bold italic underline strikethrough alignleft aligncenter alignright outdent indent  blockquote undo redo removeformat subscript superscript code codesample',
						'hr bullist numlist link image charmap preview anchor pagebreak insertdatetime media table emoticons forecolor backcolor fullscreen'
					],
					images_upload_handler: function(blobInfo, success, failure) {
						const formData = new FormData();
						formData.append('file', blobInfo.blob());
						axios.post('http://192.168.1.54:8080/admin/storage/create', formData)
							.then(function(res) {
								success(res.data.data.url);
							}).catch(() => {
								failure("error");
							});
					}
				},
				DetailsNotice: false,
				DialogForm: {},
				ifDialog: false,
				title: '',
				option: [], //表单选择情况
				Form: { //验证规则
					title: [{
						required: true,
						message: '通知标题不能为空',
						trigger: 'blur'
					}]
				}
			}
		},
		mounted() {
			this.load()
		},
		methods: {
			load() {
				let that = this
				ListNotice(that.form).then((res) => {
					console.log(res)
					if (res.data.errmsg == '成功') {
						that.form.total = res.data.data.total
						that.tableData = res.data.data
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
			NoticeDetails(row) { //点击详情
				if (row.content) {
					const cont=Object.assign({}, row).content
					this.content = cont
				} else {
					this.content = '<p></p>'
				}
				this.DetailsNotice = true
			},
			Add() { //点击添加
				this.content = '<p></p>'
				this.DialogForm = {
					title: ''
				}
				this.ifDialog = true
				this.title = '创建'
			},
			Update(row) { //点击编辑
				console.log(row)
				if (row.content) {
					this.content = Object.assign({}, row).content
				} else {
					this.content = '<p></p>'
				}
				this.DialogForm = Object.assign({}, row)
				this.ifDialog = true
				this.title = '编辑'
			},
			SingleDelete(row) { //行内删除(单个)
				let that = this
				this.$confirm('此操作将永久删除该角色' + row.title + ', 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let arr = []
					arr.push(row.id)
					that.NoticeDelete(arr)
				})

			},
			handleSelectionChange(e) { // 列表的选择情况
				const temp = []
				e.forEach(item => {
					temp.push(item.id)
				})
				this.option = temp
			},
			MultipleDeletions() { //删除多个
				const that = this
				that.$confirm(
						'此操作将永久删除选中的' +
						that.option.length +
						'件商品, 是否继续?',
						'提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning'
						}
					)
					.then(function() {
						that.NoticeDelete(that.option)
					})
			},
			NoticeDelete(arr) { //删除
				let that = this
				DeleteNotice(arr).then(function(res) {
					that.mess ? that.mess.close() : ''
					if (res.data.errmsg == "成功") {
						that.load()
						that.mess = ElMessage.success('删除成功');
					} else {
						that.mess = ElMessage.error(res.data.errmsg);
					}
				})
			},
			NoticeADD() { //添加
				let that = this
				this.$refs.Form.validate((valid) => {
					if (valid) {
						AddNotice(that.DialogForm.title, that.content).then((res) => {
							console.log(res)
							that.mess ? that.mess.close() : ''
							if (res.data.errmsg == '成功') {
								that.load()
								this.ifDialog = false
								that.mess = ElMessage.success('添加成功');
							} else {
								that.mess = ElMessage.error(res.data.errmsg);
							}
						})
					}
				})
			},
			NoticeUpdata() { //编辑
				let that = this
				this.$refs.Form.validate((valid) => {
					if (valid) {
						UpdataNotice(that.DialogForm.id, that.DialogForm.title, that.content).then((res) => {
							console.log(res)
							that.mess ? that.mess.close() : ''
							if (res.data.errmsg == '成功') {
								that.load()
								this.ifDialog = false
								that.mess = ElMessage.success('编辑成功');
							} else {
								that.mess = ElMessage.error(res.data.errmsg);
							}
						})
					}
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
						"通知信息列表.xlsx"
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
	.filter {
		margin: 20px;
	}

	.filter>div {
		width: 200px;
		float: left;
		margin: 0 10px;
	}

	.filter button {
		float: left;
		margin: 0 10px;
	}

	.container {
		width: 100%;
		display: inline-block;
	}

	.container>div {
		float: right;
		margin-right: 20px;
	}
</style>
