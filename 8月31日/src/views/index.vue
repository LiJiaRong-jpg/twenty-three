<template>
	<div>

		<el-container>
			<el-aside class="tab">
				<el-menu class="el-menu-vertical-demo" :collapse="isCollapse" background-color="#304156"
					text-color="#fff" :default-active="route" unique-opened router>
					<el-menu-item index="/dashboard">
						<i class="el-icon-s-custom"></i>
						<template #title>首页</template>
					</el-menu-item>
					<Meun></Meun>
					<el-sub-menu index="8">
						<template #title>
							<i class="el-icon-link"></i>
							<span>外链</span>
						</template>
						<el-menu-item-group>
							<div v-for="(item,index) in OuterChain" :key="index">
								<el-menu-item :index="'8-'+index">
									<i class="el-icon-link"></i>
									<el-link :href="item.ulr" target="_blank">{{item.text}}</el-link>
								</el-menu-item>
							</div>
						</el-menu-item-group>
					</el-sub-menu>
				</el-menu>

			</el-aside>
			<el-container class='main'>

				<el-header class="top">
					<div class="left">
						<i class="el-icon-s-fold" @click="iconFont"></i>
						<el-breadcrumb class="breadcrumb" separator="/">
							<el-breadcrumb-item to='/dashboard/dashboard'>首页</el-breadcrumb-item>
							<div v-if="TITLE[1]!='首页'">
								<el-breadcrumb-item v-for="(item,index) in TITLE" :key='index'>{{TITLE[index]}}
								</el-breadcrumb-item>
							</div>
						</el-breadcrumb>
					</div>

					<div class="right">

						<el-tooltip class="item" effect="dark" content="全屏" placement="bottom">
							<i class="el-icon-full-screen" @click="fullScreen"></i>
						</el-tooltip>
						<el-tooltip class="item" effect="dark" content="布局大小" placement="bottom">
							<i class="el-icon-rank"></i>
						</el-tooltip>
						<el-tooltip class="item" effect="dark" content="通知" placement="bottom">
							<i class="el-icon-bell"></i>
						</el-tooltip>

						<el-dropdown trigger="click" style="margin: 10px;">
							<span class="el-dropdown-link">
								<el-image :src="url" style="width: 40px;height: 40px;border-radius: 10px;">
									<template #error>
										<div class="image-slot">
											<i class="el-icon-picture-outline"></i>
										</div>
									</template>
								</el-image>
								<i class="el-icon-arrow-down el-icon--right"></i>
							</span>
							<template #dropdown>
								<el-dropdown-menu>
									<el-dropdown-item>首页</el-dropdown-item>
									<el-dropdown-item>密码修改</el-dropdown-item>
									<el-dropdown-item>退出</el-dropdown-item>
								</el-dropdown-menu>
							</template>
						</el-dropdown>
					</div>

				</el-header>

				<el-main>
					<TAB :arr="arr" @dele="Dele($event)" @CloseOther='CloseOther' @CloseAll="CloseAll($event)"></TAB>
					<div style="width: 100%;height: 49px;"></div>
					<router-view></router-view>
				</el-main>

			</el-container>
		</el-container>


	</div>
</template>

<script>
	import Chain from '../components/Chain.js'
	import TAB from '../components/TAB.vue'
	import Meun from '../components/meun.vue'
	export default {
		components: {
			TAB,
			Meun
		},
		data() {
			return {
				user: {}, //用户基本信息
				isCollapse: false, //侧边栏收缩
				time: { //关联侧边栏的图标
					a: 0,
					b: 0
				},
				tabIcon: true, //侧边栏图标点击是否启动函数
				OuterChain: Chain, //外链
				TITLE: [], //面包屑
				url: '', //用户头像
				qp: false, //是否全屏
				route: '', //当前路由
				arr: [] //自定义组件的标签
			}
		},
		beforeMount() {
			if (window.sessionStorage.getItem('Info')) {
				this.url = JSON.parse(window.sessionStorage.getItem('Info')).avatar
			}
			this.route = this.$route.path
			this.addTag('MOUNT')
			this.TITLE = this.$route.name
		},
		watch: {
			$route() {
				this.TITLE = this.$route.name
				this.route = this.$route.path
				for (let i = 0; i < this.arr.length; i++) {
					if (this.arr[i].route == this.$route.path) { //如果有一样的直接返回
						return
					}
					if (i >= this.arr.length - 1) {
						this.addTag()
					}
				}
			}
		},
		methods: {
			iconFont(e) {
				let that = this
				that.isCollapse = !that.isCollapse // 控制左侧导航条的收缩
				if (that.isCollapse === true) { // 控制控制左侧导航条的收缩的图标的样式(旋转)
					that.time.a = 0 //用let报错，改用this指向，用两个定时器不报错，但代码看着多余
					that.time.b = 180
				} else {
					that.time.a = 180
					that.time.b = 0
				}
				if (that.tabIcon) { //是否正在旋转
					that.tabIcon = false
					const seti = setInterval(function() {
						if (that.isCollapse === true) {
							that.time.a += 10
						} else {
							that.time.a -= 10
						}
						e.srcElement.style.transform = 'rotate(' + that.time.a + 'deg)'
						if (that.time.a === that.time.b) {
							clearInterval(seti)
							that.tabIcon = true
						}
					}, 10)
				}

			},
			fullScreen() { // 点击全屏
				var elem = document.documentElement;
				if (this.qp) {
					if (elem.requestFullscreen) {
						elem.requestFullscreen();
					} else if (elem.mozRequestFullScreen) {
						/* Firefox */
						elem.mozRequestFullScreen();
					} else if (elem.webkitRequestFullscreen) {
						/* Chrome, Safari and Opera */
						elem.webkitRequestFullscreen();
					} else if (elem.msRequestFullscreen) {
						/* IE/Edge */
						elem.msRequestFullscreen();
					}
					this.qp = false
				} else { // 没全屏
					if (document.exitFullscreen) {
						document.exitFullscreen();
					} else if (document.mozCancelFullScreen) {
						/* Firefox */
						document.mozCancelFullScreen();
					} else if (document.webkitExitFullscreen) {
						/* Chrome, Safari and Opera */
						document.webkitExitFullscreen();
					} else if (document.msExitFullscreen) {
						/* IE/Edge */
						document.msExitFullscreen();
					}
					this.qp = true
				}
			},
			addTag() { //添加标签
				let data = {
					route: this.$route.path,
					name: this.$route.name
				}
				this.arr.push(data)
			},
			Dele(index) { //删除路由标签
				if (this.arr[index].route == this.$route.path) { //如果删除的是当前页面对应的标签
					if (this.arr.length > 1) { //如果有两个及以上的路由标签
						if (index == this.arr.length - 1) { //如果删除的是最后一个标签
							this.$router.push({
								path: this.arr[index - 1].route
							}).catch(err => {
								console.log(err)
							})
						} else {
							this.$router.push({
								path: this.arr[index + 1].route
							}).catch(err => {
								console.log(err)
							})
						}
					} else {
						this.arr.push({
							route: '/dashboard/dashboard',
							name: ['', '首页']
						})
						this.$router.push({
							path: '/dashboard/dashboard'
						}).catch(err => {
							console.log(err)
						})
					}

				}
				this.arr.splice(index, 1)
			},
			CloseOther(index) {
				this.arr.splice(0, this.arr, this.arr[index])
				this.$router.push({
					path: this.arr[0].route
				}).catch(err => {
					console.log(err)
				})
			},
			CloseAll() {
				this.arr = []
				this.$router.push({
					path: '/dashboard'
				}).catch(err => {
					console.log(err)
				})
			}
		}
	}
</script>

<style scoped="scoped">
	.el-menu-vertical-demo {
		height: 100vh;
		overflow-y: auto;
	}

	.el-menu-vertical-demo::-webkit-scrollbar {
		width: 0px;
		/* 滚动条宽度， width：对应竖滚动条的宽度  height：对应横滚动条的高度*/
	}

	.tab {
		width: auto !important;
	}

	.el-menu-vertical-demo:not(.el-menu--collapse) {
		width: 200px;
		min-height: 400px;
	}

	.el-icon-s-fold {
		float: left;
		line-height: 60px;
		font-size: 20px;
		margin-left: 10px;
	}

	.top {
		width: 100%;
		display: inline-block;
		border-bottom: 1px solid #d8dce5;
		padding: 0;
	}

	.breadcrumb {
		float: left;
		line-height: 60px;
		font-size: 15px;
		margin-left: 20px;
	}

	.top>.left {
		float: left;
	}

	.top>.right {
		float: right;
	}

	.top>.right>.item {
		float: left;
		line-height: 60px;
		font-size: 20px;
		margin-left: 10px;
	}

	.main {
		height: 100vh;
	}
</style>
