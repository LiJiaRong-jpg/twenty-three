export default [{
		text: '用户管理',
		children: [{
			path: '/user/address',
			name: 'address',
			perms: ['GET /admin/user/list'],
			text: '会员管理'
		}, {
			path: '/user/collect',
			name: 'collect',
			perms: ['GET /admin/address/list'],
			text: '收货地址'
		}, {
			path: '/user/feedback',
			name: 'feedback',
			perms: ['GET /admin/collect/list'],
			text: '会员收藏'
		}, {
			path: '/user/footprint',
			name: 'footprint',
			perms: ['GET /admin/footprint/list'],
			text: '会员足迹'
		}, {
			path: '/user/history',
			name: 'history',
			perms: ['GET /admin/history/list'],
			text: '搜索历史'
		}, {
			path: '/user/user',
			name: 'user',
			perms: ['GET /admin/feedback/list'],
			text: '意见反馈'
		}]
	},
	{
		text: '商场管理',
		children: [{
				path: '/mall/region',
				name: 'region',
				text: '行政区域'
			},
			{
				path: '/mall/brand',
				name: 'brand',
				perms: ['GET /admin/brand/list', 'POST /admin/brand/create', 'GET /admin/brand/read',
					'POST /admin/brand/update', 'POST /admin/brand/delete'
				],
				text: '品牌制造商'
			},
			{
				path: '/mall/category',
				name: 'category',
				perms: ['GET /admin/category/list', 'POST /admin/category/create', 'GET /admin/category/read',
					'POST /admin/category/update', 'POST /admin/category/delete'
				],
				text: '商品类目'
			},
			{
				path: '/mall/order',
				name: 'order',
				perms: ['GET /admin/order/list', 'GET /admin/order/detail', 'POST /admin/order/ship',
					'POST /admin/order/refund', 'POST /admin/order/delete', 'POST /admin/order/reply'
				],
				text: '订单管理'
			},
			{
				path: '/mall/aftersale',
				name: 'aftersale',
				perms: ['GET /admin/aftersale/list', 'GET /admin/aftersale/detail', 'POST /admin/order/receive',
					'POST /admin/aftersale/complete', 'POST /admin/aftersale/reject'
				],
				text: '售后管理'
			},
			{
				path: '/mall/issue',
				name: 'issue',
				perms: ['GET /admin/issue/list', 'POST /admin/issue/create', 'GET /admin/issue/read',
					'POST /admin/issue/update', 'POST /admin/issue/delete'
				],
				text: '通用问题'
			},
			{
				path: '/mall/keyword',
				name: 'keyword',
				perms: ['GET /admin/keyword/list', 'POST /admin/keyword/create', 'GET /admin/keyword/read',
					'POST /admin/keyword/update', 'POST /admin/keyword/delete'
				],
				text: '关键词'
			}
		]
	},
	{
		text: '商品管理',
		children: [{
			path: '/goods/list',
			name: 'list',
			perms: ['GET /admin/goods/list', 'POST /admin/goods/delete'],
			text: '商品列表'
		}, {
			path: '/goods/create',
			name: 'create',
			perms: ['POST /admin/goods/create'],
			text: '商品上架'
		}, {
			path: '/goods/comment',
			name: 'comment',
			perms: ['GET /admin/comment/list', 'POST /admin/comment/delete'],
			text: '商品评论'
		}]
	},
	{
		text: '推管管理',
		children: [{
			path: '/promotion/ad',
			name: 'ad',
			perms: ['GET /admin/ad/list', 'POST /admin/ad/create', 'GET /admin/ad/read',
				'POST /admin/ad/update', 'POST /admin/ad/delete'
			],
			text: '广告管理'
		}, {
			path: '/promotion/coupon',
			name: 'coupon',
			perms: ['GET /admin/coupon/list', 'POST /admin/coupon/create', 'POST /admin/coupon/update',
				'POST /admin/coupon/delete'
			],
			text: '优惠劵管理'
		}, {
			path: '/promotion/topic',
			name: 'topic',
			perms: ['GET /admin/topic/list', 'POST /admin/topic/create', 'GET /admin/topic/read',
				'POST /admin/topic/update', 'POST /admin/topic/delete'
			],
			text: '专题管理'
		}, {
			path: '/promotion/groupon-rule',
			name: 'groupon',
			perms: ['GET /admin/groupon/list', 'POST /admin/groupon/create', 'POST /admin/groupon/update',
				'POST /admin/groupon/delete'
			],
			text: '团购规则'
		}, {
			path: '/promotion/groupon-activity',
			name: 'groupon',
			perms: ['GET /admin/groupon/listRecord'],
			text: '团购活动'
		}]
	},
	{
		text: '系统管理',
		children: [{
			path: '/sys/admin',
			name: 'admin',
			perms: ['GET /admin/admin/list', 'POST /admin/admin/create', 'POST /admin/admin/update',
				'POST /admin/admin/delete'
			],
			text: '管理员'
		}, {
			path: '/sys/notice',
			name: 'notice',
			perms: ['GET /admin/notice/list', 'POST /admin/notice/create', 'POST /admin/notice/update',
				'POST /admin/notice/delete'
			],
			text: '通知管理'
		}, {
			path: '/sys/log',
			name: 'log',
			perms: ['GET /admin/log/list'],
			text: '操作日志'
		}, {
			path: '/sys/role',
			name: 'role',
			perms: ['GET /admin/role/list', 'POST /admin/role/create', 'POST /admin/role/update',
				'POST /admin/role/delete', 'GET /admin/role/permissions', 'POST /admin/role/permissions'
			],
			text: '角色管理'
		}, {
			path: '/sys/os',
			name: 'os',
			perms: ['GET /admin/storage/list', 'POST /admin/storage/create', 'POST /admin/storage/update',
				'POST /admin/storage/delete'
			],
			text: '对象储存'
		}]
	},
	{
		text: '配置管理',
		children: [{
			path: '/config/mall',
			name: 'mall',
			perms: ['GET /admin/config/mall', 'POST /admin/config/mall'],
			text: '商场管理'
		}, {
			path: '/config/express',
			name: 'express',
			perms: ['GET /admin/config/express', 'POST /admin/config/express'],
			text: '运费配置'
		}, {
			path: '/config/order',
			name: 'order',
			perms: ['GET /admin/config/order', 'POST /admin/config/order'],
			text: '订单配置'
		}, {
			path: '/config/wx',
			name: 'wx',
			perms: ['GET /admin/config/wx', 'POST /admin/config/wx'],
			text: '小程序配置'
		}]
	},
	{
		text: '统计报表',
		children: [{
			path: '/stat/user',
			name: 'user',
			perms: ['GET /admin/stat/order'],
			text: '用户统计'
		}, {
			path: '/stat/order',
			name: 'order',
			perms: ['GET /admin/stat/order'],
			text: '订单统计'
		}, {
			path: '/stat/goods',
			name: 'goods',
			perms: ['GET /admin/stat/goods'],
			text: '商品统计'
		}]
	},
]
