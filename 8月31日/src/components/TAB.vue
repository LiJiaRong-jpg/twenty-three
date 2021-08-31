<template>
	<div>
		<div ref="qwer" class="tabs" @mousewheel.prevent="mouse">
			<el-button size="mini" v-for="(item,index) in arr" :type="type(item.route)" :key="index"
				@click="Buttom(index)" @contextmenu.prevent="openMenu($event,index)">
				{{item.name[1]}}
				<i class="el-icon-close" @click="Dele(index)"></i>
				<!-- :class="this.$route.path==item.route?'blue':'button'" -->
			</el-button>
		</div>
		<div class="backDiv" v-show="SHOW" @mousedown="closeMenu">
		</div>
		<div class="muen" ref="muen" v-show="SHOW">
			<i @click.stop="Refresh">刷新</i>
			<i @click="CloseOther">关闭其他</i>
			<i @click="CloseAll">关闭所有</i>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['arr'],
		data() {
			return {
				SHOW: false,
				event: 0, //点击了谁
			}
		},
		beforeMount() {
			for (let i = 0; i < this.arr.length; i++) {
				console.log(this.arr[i].route)
				console.log(this.$route.path)
			}
		},
		methods: {
			mouse(event) { //鼠标滚轮事件
				// this.$emit('wheel', event.wheelDelta)
				if (event.wheelDelta > 0) {
					// 如果滚轮往前划则滚动条往左
					this.$refs.qwer.scrollLeft -= 10
				} else {
					// 如果滚轮往后划则滚动条往右
					this.$refs.qwer.scrollLeft += 10
				}
			},
			Buttom(e) { //跳转路由
				this.$router.push({
					path: this.arr[e].route
				}).catch(err => {
					console.log(err)
				})
			},
			Dele(e) { //删除
				this.$emit('dele', e)
			},
			type(route) { //按钮的类型
				if (this.$route.path == route) {
					return 'primary'
				} else {
					return 'info'
				}
			},
			openMenu(event, index) {
				this.event = index
				this.SHOW = true
				this.$refs.muen.style.top = event.clientY + 'px'
				this.$refs.muen.style.left = event.clientX + 'px'
			},
			closeMenu() {
				this.SHOW = false
			},
			Refresh() { //刷新
				this.$router.push({
					path: '/back'
				}).catch(err => {
					console.log(err)
				})
			},
			CloseOther() { //关闭其他
				this.SHOW = false
				this.$emit('CloseOther', this.event)
			},
			CloseAll() {//关闭所有
				this.SHOW = false
				this.$emit('CloseAll')
			}
		}
	}
</script>

<style>
	.tabs {
		background-color: white;
		z-index: 10;
		overflow-x: auto;
		width: 100%;
		border-bottom: 1px solid #dcdfe6;
		display: inline-block;
		white-space: nowrap;
		clear: both;
		padding: 10px;
		box-sizing: border-box;
		position: absolute;
	}

	.tabs i {
		display: contents;
	}

	.tabs::-webkit-scrollbar {
		height: 0px;
		/* 滚动条宽度， width：对应竖滚动条的宽度  height：对应横滚动条的高度*/
	}

	.muen {
		z-index: 20;
		width: 100px;
		display: inline-block;
		position: fixed;
		color: black;
		box-shadow: 2px 2px 3px 0 rgb(0 0 0 / 30%);
		background-color: white;
	}

	.muen>i {
		display: block;
		padding: 5px 10px;
	}

	.muen>i:hover {
		background-color: #888;
	}

	.backDiv {
		width: 100%;
		height: 100vh;
		position: fixed;
		z-index: 10;
		left: 0;
		top: 0;
	}
</style>
