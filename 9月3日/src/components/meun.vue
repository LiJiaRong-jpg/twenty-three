<template>
	<el-sub-menu v-for="(item,index) in tab" :index="index+2" :key="index">
		<template #title>
			<i class="el-icon-s-data"></i>
			<span>{{item.text}}</span>
		</template>
		<el-menu-item-group>
			<div v-for="(Item,Index) in item.children" :index="index+2+'-'+Index" :key="Index">
				<el-menu-item :index="Item.path">
					<text>{{Item.text}}</text>
				</el-menu-item>
			</div>
		</el-menu-item-group>
	</el-sub-menu>
</template>

<script>
	import Tab from './tab.js'
	import {
		Info
	} from '../api/user/user.js'
	import Mall from '../router/mall.js'
	import User from '../router/user.js'
	import Goods from '../router/goods.js'
	import Promotion from '../router/promotion.js'
	import Config from '../router/config.js'
	import Stat from '../router/stat.js'
	import Sys from '../router/sys.js'
	export default {
		data() {
			return {
				tab: [], //用户能看列表树
				permissions: [], //用户有的列表权限
				TabPer: Tab,
				Router: [
					...User,
					...Mall,
					...Goods,
					...Promotion,
					...Sys,
					...Config,
					...Stat,
				]
			}
		},
		beforeMount() {
			let that = this
			Info().then((res) => {//应该把路由和侧边栏合并到一起，否则修改很麻烦
				that.permissions = res.data.data.perms
				if (res.data.data.perms[0] == '*') { //如果是超级管理则通过，不需要验证
					that.tab = Tab
					for (let i = 0; i < that.Router.length; i++) {
						that.$router.addRoute(that.Router[i])
					}
				} else {
					for (let i = 0; i < that.TabPer.length; i++) { //循环一级导航栏
						for (let j = 0; j < that.TabPer[i].children.length; j++) { //循环二级导航栏
							if (!that.TabPer[i].children[j].perms) { //这个如果没有就跳过，
								continue
							}
							let num = that.loop(i, j, that.TabPer[i].children[j].perms)
							while (num == 1) {
								num = that.loop(i, j, that.TabPer[i].children[j].perms)
							}
						}
						if (that.TabPer[i].children.length == 0) { //如果一级导航栏下没有二级导航栏则删除
							that.TabPer.splice(i, 1)
							that.Router.splice(i, 1)
							i--
						}
					}
					that.tab = that.TabPer
					for (let i = 0; i < that.Router.length; i++) {
						that.$router.addRoute(that.Router[i])
					}
				}
			})
		},
		methods: {
			loop(I, J, perms) {
				for (let i = 0; i < perms.length; i++) { //这个页面想要进入就要的权限
					for (let j = 0; j < this.permissions.length; j++) { //循环用户有的权限
						if (this.permissions[j] == perms[i]) { //如果有这个权限就不用删除，停止循环
							return 0
						}
						if (i == perms.length - 1) { //如果匹配到最后一个都没有成功，就删除，如果那个位置被删除后没有元素顶替则停止循环
							this.TabPer[I].children.splice(J, 1)
							this.Router[I].children.splice(J, 1)
							if (!this.TabPer[I].children[J]) {
								return 0
							}
							return 1
						}
					}
				}
			}
		}
	}
</script>

<style>

</style>
