<template>
	<div class="background">

		<div class="content">

			<h1>管理员登录</h1>

			<el-form :model="data" :rules="Form" ref="Form" @validate="FormValidation">
				<el-form-item prop="username">
					<el-input class="input" placeholder="请输入账号" v-model="data.username" clearable autofocus>
						<template #prefix>
							<i class="el-input__icon el-icon-user-solid"></i>
						</template>
					</el-input>
				</el-form-item>
				<el-form-item prop="password">
					<el-input class="input" placeholder="请输入密码" v-model="data.password" clearable show-password
						@keyup.enter="login">
						<template #prefix>
							<i class="el-input__icon el-icon-lock"></i>
						</template>
					</el-input>
				</el-form-item>
			</el-form>

			<div class="checked">
				<el-checkbox v-model="checked">记住密码</el-checkbox>
			</div>

			<el-button class="button" type="primary" @click="login">登录</el-button>

			<div class="text">
				<text>超级管理员用户名: admin123 超级管理员用户名：admin123</text>
				<br />
				<text>商城管理员用户名: mall123 商城管理员用户名：mall123</text>
				<br />
				<text>推广管理员用户名: promotion123 推广管理员用户名：promotion123</text>
			</div>

		</div>

	</div>
</template>

<script>
	import {
		Login
	} from '../api/user/user.js'
	import {
		ElMessage
	} from 'element-plus'
	export default {
		components: {},
		data() {
			return {
				data: { //用户账号密码
					username: '',
					password: ''
				},
				checked: false, //是否记住密码
				path:'',

				Form: { //验证规则
					username: [{
						required: true,
						message: '请输入账号',
						trigger: 'blur'
					}],
					password: [{
						required: true,
						message: '请输入密码',
						trigger: 'blur'
					}],
				}
			}
		},
		beforeMount() {
			if (window.localStorage.getItem('user')) {
				this.data = JSON.parse(window.localStorage.getItem('user'))
				this.checked = true
			}
		},
		methods: {
			login() { //登录
				let that = this
				this.$refs.Form.validate((valid) => {
					if (valid) {
						Login(this.data).then((res) => {
							console.log(res.data)
							if (res.data.errmsg == "成功") {
								if (this.checked) { //是否需要记住密码
									window.localStorage.user = JSON.stringify(this.data) //账号密码
								} else {
									window.localStorage.removeItem("user");
								}
								window.sessionStorage.token = res.data.data.token //token
								window.sessionStorage.Info = JSON.stringify(res.data.data.adminInfo) //用户信息
								if (window.sessionStorage.getItem('router')) { //如果用户一开始想进入某个页面
									that.path = window.sessionStorage.getItem('router')
								} else {
									that.path = '/dashboard'
								}
								that.$router.push({
									path:that.path
								}).catch(err => {
									console.log(err)
								})
							} else {
								that.mess ? that.mess.close() : ''
								that.mess = ElMessage.error(res.data.errmsg);
							}
						})
					}
				});
			},
			FormValidation(boolean, object, text) { //表单验证回调
				this.mess ? this.mess.close() : ''
				this.mess = ElMessage.error(text);
			}
		}
	}
</script>

<style scoped="scoped">
	.background {
		width: 100%;
		height: 100vh;
		background-color: #2d3a4b;
		display: flex;
		align-items: center;
	}

	.content {
		width: 600px;
		height: 500px;
		margin: auto;
		position: relative;
		z-index: 1;
		border-radius: 10px;
	}

	.content>h1 {
		color: white;
		text-align: center;
		margin-bottom: 20px;
	}


	.content>.text {
		color: white;
		white-space: nowrap;
	}

	.content>.button {
		width: 100%;
		margin-bottom: 20px;
	}

	.content>.checked {
		margin-bottom: 20px;
		width: 100%;
		display: inline-block;
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 5px;
		padding: 5px 10px;
		box-sizing: border-box;
	}
</style>
