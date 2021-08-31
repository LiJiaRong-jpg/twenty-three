<template>
	<div>
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
	</div>
</template>

<script>
	import Tab from './tab.js'
	import {
		Info
	} from '../api/user/user.js'
	export default {
		data() {
			return {
				tab: [], //用户能看列表树
				permissions: [], //用户有的列表权限
				page: [], //用户能进入的页面
			}
		},
		beforeMount() {
			let that = this
			Info().then((res) => {
				console.log(res.data.data)
				if (res.data.data.perms[0] == '*') {
					that.tab = Tab
				} else {
					alert('在做渲染列表')
					for (let i = 0; i < res.data.data.perms.length; i++) {
						let text=res.data.data.perms[i].split('/')[2]
						for (let i = 0; i < that.page.length; i++) {
							if (that.page[i] == text) {
								that.page.push(text)
							}
						}
					} //分出哪些页面能进

				}
			})
		}
	}
</script>

<style>

</style>
