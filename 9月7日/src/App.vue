<template>
	<view>
		<router-view></router-view>
	</view>
</template>

<script>
	export default {
		name: 'App'
	}
</script>

<style>
	* {
		padding: 0;
		margin: 0;
		overflow: hidden;
	}
.el-main{
	padding: 0 !important;
}
	.content .el-input__inner {
		background-color: rgba(0, 0, 0, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 5px;
		color: white;
	}
</style>
