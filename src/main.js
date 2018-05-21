// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'

import '../theme/index.css'  //引入自定义主题
import ElementUI from 'element-ui'  //引入elementui css
import 'element-ui/lib/theme-chalk/display.css' //引入element主题

import VueRouter from 'vue-router' // VueRouter是路由

import './iconfont/iconfont.js'  //引入淘宝icon

import App from './App'
import routeConfig from './router-config'  // routeConfig是路由管理文件
import Vuex from 'vuex'  // vuex是中央状态管理
import axios from 'axios'  //ajax数据交换包

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)
// Vue.use(axios)  //axios 不是一个vue插件，所以不能用use这种方式来引用axios


const router = new VueRouter({
  routes: routeConfig
})

//路由验证，如果本地存储没有信息，禁止路由跳转
router.beforeEach((to, from, next) => {
	if(to.path !== '/login/sign'){
		if(window.sessionStorage.user_id == ''){
			next('/login/sign');
		}else{
			next();
		}		
	}else{
		next();
	}
})

const store = new Vuex.Store({
  state: {
    tabss:[],//装载已打开的标签值的容器 ,
    includePageNames:[], //装载keep-alive的组件名,
	pw_user_table:[],//pw_user表,
	pw_user_group:[],//pw_user_group表,
	sys_tbl_clmn_set:[],//数据库管理表,
	im_container:[],//容器管理
	currentTime:''//计时器用的当前时间
  },
  getters: {},
  mutations: {
    //填充pw_user表数据
    set_pw_user_table (state, data){
    	state.pw_user_table = data;
	},
	//填充pw_user_group表数据
	set_pw_user_group (state, data){
		state.pw_user_group = data;
	},
	//填充数据管理表
	set_sys_tbl_clmn_set(state, data){
		state.sys_tbl_clmn_set = data;
	},
	//登录用户信息
	set_current_user(state, data){
		state.current_user = data;	
	},
	//容器信息
	set_im_container(state, data){
		state.im_container = data;
	},
	//清空tabss
	cleartabss(state){
		state.tabss.splice(0,state.tabss.length);
	},
	//清空includePageNames
	clearincludePageNames(state){
		state.includePageNames.splice(0,state.includePageNames.length);
	},
	//设置计时器当前时间
	setcurrentTime(state){
		state.currentTime = new Date();
	},
	//无操作30分钟返回
	timeoutclear(state,commit){
		setInterval(function(){
			var a = new Date();
			var b = parseInt(a - state.currentTime);
			if(b >= 1800000){
				//清空缓存
				sessionStorage.clear();
				store.commit('cleartabss');
				store.commit('clearincludePageNames');
				router.push('/login/sign');			
			}
		},1800000);
	}
  },
  actions: {
	//获取pw_user的值
    get_pw_user_table ({commit},current_group_role){
	  axios.get('http://localhost/TRX/api/pw_user_data' + '/group_code/' + current_group_role.current_group_code + '/role_code/' + current_group_role.current_role_code)
	  .then(function(res){
		  setTimeout(() => {
			  commit('set_pw_user_table',res.data)
		  }, 0);
	  }).catch(function(error){
		  alert(error);
	  })
	},
	//获取pw_user_group的值
	get_pw_user_group ({commit}){
		axios.get('http://localhost/TRX/api/pw_user_group/getall')
		.then(function(res){
			setTimeout(() => {
				commit('set_pw_user_group',res.data)
			}, 0);
		}).catch(function(error){
			alert(error);
		})
	},
	//获取数据管理表的值
	get_sys_tbl_clmn_set({commit},current_tb){
		axios.get('http://localhost/TRX/api/sys_tbl_clmn_set' + '/tb_name/' +current_tb.current_tb_name + '/username/' + current_tb.current_name + '/userid/' + current_tb.current_id)
		.then(function(res){
			setTimeout(() => {
				commit('set_sys_tbl_clmn_set',res.data)
			}, 0);
		}).catch(function(error){
			alert(error);
		})
	},
	//获取容器信息
	get_im_container({commit}){
		axios.get('http://localhost/TRX/api/im_container/getall')
		.then(function(res){
			setTimeout(() => {
				commit('set_im_container',res.data)
			}, 0);
		}).catch(function(error){
			alert(error);
		})
	},
	//搜索pw_user的值
	searchpw_user_table({commit},searchcontent){
		axios.get('http://localhost/TRX/api/pw_user' + '/search/' + searchcontent.inputcontent + '/type/' + searchcontent.idorname)
		.then(function(res){
			setTimeout(() => {
				commit('set_pw_user_table',res.data)
			}, 0);
		}).catch(function(error){
			alert(error);
		})
	}
  }
})

/* eslint-disable no-new */
new Vue({
  router,
  store: store,
  el: '#app',
  render: h => h(App)
})
