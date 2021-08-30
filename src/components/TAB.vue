<template>
	<div ref="qwer" class="tabs" @mousewheel.prevent="mouse">
		<el-button size="mini" v-for="(item,index) in arr" :type="type(item.route)" :key="index" @click="Buttom(index)">
			{{item.name[1]}}
			<i class="el-icon-close" @click="Dele(index)"></i>
			<!-- :class="this.$route.path==item.route?'blue':'button'" -->
		</el-button>
	</div>
</template>

<script>
	export default {
		props: ['arr'],
		data() {
			return {}
		},
		beforeMount() {
			for (let i = 0; i < this.arr.length; i++) {
				console.log(this.arr[i].route)
				console.log(this.$route.path)
			}
		},
		methods: {
			mouse(event) {
				// this.$emit('wheel', event.wheelDelta)
				if (event.wheelDelta > 0) {
					// 如果滚轮往前划则滚动条往左
					this.$refs.qwer.scrollLeft -= 10
				} else {
					// 如果滚轮往后划则滚动条往右
					this.$refs.qwer.scrollLeft += 10
				}
			},
			Buttom(e) {
				this.$emit('buttom', e)
			},
			Dele(e) {
				this.$emit('dele', e)
			},
			type(route) {
				if (this.$route.path == route) {
					return 'primary'
				} else {
					return 'info'
				}
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
	}

	.tabs i {
		display: contents;
	}


	.tabs::-webkit-scrollbar {
		height: 0px;
		/* 滚动条宽度， width：对应竖滚动条的宽度  height：对应横滚动条的高度*/
	}
</style>
