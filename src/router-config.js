const routeConfig = [
	{
		path:'/main',
		component:(aaa) => require(['./page/mainpage.vue'],aaa),
		children:[
			{
				path:'home',   //首页路由名
				component:(cmcp) => require(['./page/firstpage.vue'],cmcp)
			},

			{
				path:'manufacture_order',
				component:(cmcp) => require(['./page/1order_center/manufacture_order.vue'],cmcp)
			},
			{
				path:'material_requisition',
				component:(cmcp) => require(['./page/1order_center/material_requisition.vue'],cmcp)
			},
			{
				path:'warehouse_out_order',
				component:(cmcp) => require(['./page/1order_center/warehouse_out_order.vue'],cmcp)
			},
			{
				path:'work_report',
				component:(cmcp) => require(['./page/1order_center/work_report.vue'],cmcp)
			},
			{
				path:'ship_deliver',
				component:(cmcp) => require(['./page/1order_center/ship_deliver.vue'],cmcp)
			},
			{
				path:'receving_order',
				component:(cmcp) => require(['./page/1order_center/receving_order.vue'],cmcp)
			},
		    //--------------------------------一级菜单2 仓库作业------------------------------------------------//
			{
				path:'B01',
				component:(cmcp) => require(['./page/2warehouse_operate/B01'],cmcp)
			},
			{
				path:'B02',
				component:(cmcp) => require(['./page/2warehouse_operate/B02'],cmcp)
			},
			{
				path:'B03',
				component:(cmcp) => require(['./page/2warehouse_operate/B03'],cmcp)
			},
			{
				path:'B04',
				component:(cmcp) => require(['./page/2warehouse_operate/B04'],cmcp)
			},
			{
				path:'B05',
				component:(cmcp) => require(['./page/2warehouse_operate/B05'],cmcp)
			},
			{
				path:'B06',
				component:(cmcp) => require(['./page/2warehouse_operate/B06'],cmcp)
			},
			//--------------------------------一级菜单3 工序跟踪------------------------------------------------//
			{
				path:'C01',  //--上料开工
				component:(cmcp) => require(['./page/3procedure_tracker/C01'],cmcp)
			},
			{
				path:'C02',  //--产成报工
				component:(cmcp) => require(['./page/3procedure_tracker/C02'],cmcp)
			},
			{
				path:'C03',  //--生产异常
				component:(cmcp) => require(['./page/3procedure_tracker/C03'],cmcp)
			},
			{
				path:'C04',  //--工序产量
				component:(cmcp) => require(['./page/3procedure_tracker/C04'],cmcp)
			},
			{
				path:'C05',  //--包装
				component:(cmcp) => require(['./page/3procedure_tracker/C05'],cmcp)
			},
			//--------------------------------一级菜单4 设备监控------------------------------------------------// 
			{
				path:'D01',  //--立库堆垛机
				component:(cmcp) => require(['./page/4device_monitor/D01'],cmcp)
			},
			{
				path:'D02',  //--AGV搬运
				component:(cmcp) => require(['./page/4device_monitor/D02'],cmcp)
			},
			{
				path:'D03',  //--输送移栽机
				component:(cmcp) => require(['./page/4device_monitor/D03'],cmcp)
			},
			{
				path:'D04',  //--提升机
				component:(cmcp) => require(['./page/4device_monitor/D04'],cmcp)
			}, 
			//--------------------------------一级菜单5 看板报表------------------------------------------------// 
			{
				path:'E01',  //--出入库报表
				component:(cmcp) => require(['./page/5kanban_report/E01'],cmcp)
			},
			{
				path:'E02',  //--产量看板
				component:(cmcp) => require(['./page/5kanban_report/E02'],cmcp)
			},
			{
				path:'E03',  //--原材料查询
				component:(cmcp) => require(['./page/5kanban_report/E03'],cmcp)
			},
			{
				path:'E04',  //--在制品查询
				component:(cmcp) => require(['./page/5kanban_report/E04'],cmcp)
			},
			{
				path:'E05',  //--包材辅料
				component:(cmcp) => require(['./page/5kanban_report/E05'],cmcp)
			},
			{
				path:'E06',  //--成品库存
				component:(cmcp) => require(['./page/5kanban_report/E06'],cmcp)
			},
			{
				path:'E07',  //--工单进度
				component:(cmcp) => require(['./page/5kanban_report/E07'],cmcp)
			},

			//--------------------------------一级菜单6 基础数据------------------------------------------------// 
			{
				path:'F01',  //--物料维护
				component:(cmcp) => require(['./page/6basic_data/F01'],cmcp)
			},
			{
				path:'F02',  //--容器管理
				component:(cmcp) => require(['./page/6basic_data/F02'],cmcp)
			},
			{
				path:'F03',  //--仓库货位
				component:(cmcp) => require(['./page/6basic_data/F03'],cmcp)
			},
			{
				path:'F04',  //--工厂日历
				component:(cmcp) => require(['./page/6basic_data/F04'],cmcp)
			},
			{
				path:'F05',  //--工序工艺
				component:(cmcp) => require(['./page/6basic_data/F05'],cmcp)
			},
			{
				path:'F06',  //--机台工位
				component:(cmcp) => require(['./page/6basic_data/F06'],cmcp)
			},
			//--------------------------------一级菜单7 系统权限------------------------------------------------// 
			{
				path:'G01',  //--用户管理
				component:(cmcp) => require(['./page/7system_priviage/G01'],cmcp)
			},
			{
				path:'G02',  //--权限分配
				component:(cmcp) => require(['./page/7system_priviage/G02'],cmcp)
			},
			{
				path:'G03',  //--个人设置
				component:(cmcp) => require(['./page/7system_priviage/G03'],cmcp)
			},
			{
				path:'G04',  //--系统日志
				component:(cmcp) => require(['./page/7system_priviage/G04'],cmcp)
			},
			{
				path:'G05',  //--系统参数
				component:(cmcp) => require(['./page/7system_priviage/G05'],cmcp)
			},
			{
				path:'G06',  //--系统参数
				component:(cmcp) => require(['./page/7system_priviage/G06'],cmcp)
			},
			{
				path:'G07',  //--系统参数
				component:(cmcp) => require(['./page/7system_priviage/G07'],cmcp)
			},
			//--------------------------------默认刷新路由------------------------------------------------// 
			{
				path:'*',
				redirect:'home'
			}
		]
	},
	{
		path:'/login',
		component:(cpnlogin) => require(['./page/login.vue'],cpnlogin),
		children:[
			{
				path:'sign',
				component:(cmcp) => require(['./page/signin.vue'],cmcp)
			},
			{
				path:'*',
				redirect:'sign'
			}
		]
	},
	{
		path:'*',
		redirect:'/login/sign'
	}
]

export default routeConfig;