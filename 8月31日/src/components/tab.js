export default [{
		text: '用户管理',
		children: [{
			path: '/user/user',
			text: '会员管理'
		}, {
			path: '/user/address',
			text: '收货地址'
		}, {
			path: '/user/collect',
			text: '会员收藏'
		}, {
			path: '/user/footprint',
			text: '会员足迹'
		}, {
			path: '/user/history',
			text: '搜索历史'
		}, {
			path: '/user/feedback',
			text: '意见反馈'
		}]
	},
	{
		text: '商场管理',
		children: [{
			path: '/mall/region',
			text: '行政区域'
		}, {
			path: '/mall/brand',
			text: '品牌制造商'
		}, {
			path: '/mall/category',
			text: '商品类目'
		}, {
			path: '/mall/order',
			text: '订单管理'
		}, {
			path: '/mall/aftersale',
			text: '售后管理'
		}, {
			path: '/mall/issue',
			text: '通用问题'
		}, {
			path: '/mall/keyword',
			text: '关键词'
		}]
	},
	{
		text: '商品管理',
		children: [{
			path: '/goods/list',
			text: '商品列表'
		}, {
			path: '/goods/create',
			text: '商品上架'
		}, {
			path: '/goods/comment',
			text: '商品评论'
		}]
	},
	{
		text: '推管管理',
		children: [{
			path: '/promotion/ad',
			text: '广告管理'
		}, {
			path: '/promotion/coupon',
			text: '优惠劵管理'
		}, {
			path: '/promotion/topic',
			text: '专题管理'
		}, {
			path: '/promotion/groupon-rule',
			text: '团购规则'
		}, {
			path: '/promotion/groupon-activity',
			text: '团购活动'
		}]
	},
	{
		text: '系统管理',
		children: [{
			path: '/sys/admin',
			text: '管理员'
		}, {
			path: '/sys/notice',
			text: '通知管理'
		}, {
			path: '/sys/log',
			text: '操作日志'
		}, {
			path: '/sys/role',
			text: '角色管理'
		}, {
			path: '/sys/os',
			text: '对象储存'
		}]
	},
	{
		text: '配置管理',
		children: [{
			path: '/config/mall',
			text: '商场管理'
		}, {
			path: '/config/express',
			text: '运费配置'
		}, {
			path: '/config/order',
			text: '订单配置'
		}, {
			path: '/config/wx',
			text: '小程序配置'
		}]
	},
	{
		text: '统计报表',
		children: [{
			path: '/stat/user',
			text: '用户统计'
		}, {
			path: '/stat/order',
			text: '订单统计'
		}, {
			path: '/stat/goods',
			text: '商品统计'
		}]
	},
]
