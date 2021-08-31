<template>
	<div>
		<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
			:current-page="data.page" :page-sizes="[10, 20, 50, 100]" :page-size="data.limit"
			layout="total, sizes, prev, pager, next, jumper" :total="data.total">
		</el-pagination>
	</div>
</template>

<script>
	export default {
		props: ['data'],
		data() {
			return {
			}
		},
		methods: {
			handleSizeChange(val) {//每页 ${val} 条
				this.$emit('page', val)
			},
			handleCurrentChange(val) {//当前页: ${val}
				this.$emit('current', val)
			}
		},
	}
</script>

<style scoped="scoped">
div{
	margin: 10px;
}
</style>
