<template>
  <div>
      <el-container>
        <el-header>   
         <div class="blue">
             <div class="logo1"><img src="../../static/img/tungray_logo.jpg"></div>
             <div class="logo2"><img src="../../static/img/header_photo.jpg"></div>
         </div>
         <div class="green">
            <el-row>
                <el-col :xl="{span:11,offset:1}" :lg="{span:11,offset:1}" :md="15" :sm="15" :xs="14">
                  <span class="maintitle">同日生产物流管控系统 TRX</span>
                </el-col>
                <el-col :xl="{span:3,offset:9}" :lg="{span:5,offset:7}" :md="9" :sm="9" :xs="10"> 
                  <span class="signperson">{{user.fullname}} , <span class="user-group-font">{{user.role_code}}</span></span>
                  <el-tooltip class="item" effect="dark" content="点击返回登录界面" placement="bottom">
                    <span class="goback" @click="goback">
                        <i class="el-icon-remove-outline"></i>返回							
                    </span>
                  </el-tooltip>							
                </el-col>
            </el-row>
          </div> 
        </el-header>

        <el-container>
          <el-aside width="200px">
              <div>
              <el-menu
                :router="true"
                unique-opened
                style="border-right: none;"
                default-active="1"	
                class="el-menu-vertical-demo" 
                background-color="#ffffff"
                text-color="#333333"
                active-text-color="#3385ff"
                @select="handle2menuselect"
              >
                <el-submenu v-for="item in maintab" :index="item.index" :key="item.index">
                    <template slot="title" style="text-align:center">
                        <!-- <i class="el-icon-tickets"></i> -->
                         <svg class="icon big"><use :xlink:href="item.iconvalue"></use></svg>     <!-- 注意xlink 属性前面的冒号，图标才有效 -->
                        <span>{{item.tabname}}</span>
                    </template>
                    <el-menu-item v-for="subpage in item.children" :key="subpage.title" :index="subpage.page_router_name" style="margin-left:-10px">
                      <!-- <i class="el-icon-share"></i> -->
                      <svg class="icon" v-show="selectedlevel2menu === subpage.page_router_name"><use xlink:href="#icon-Raidobox-selectedRai"></use></svg>
                      <svg class="icon" v-show="selectedlevel2menu !== subpage.page_router_name"><use xlink:href="#icon-Raidobox"></use></svg>
                      <span>{{subpage.title}}</span>
                    </el-menu-item>
                </el-submenu>      
            </el-menu>
            </div>
          </el-aside>

          <el-main>
             <div class="tabbox">
              <el-tabs v-model="tabvalue" type="card" closable @tab-remove="removeTab" @tab-click="tabpush">
                <el-tab-pane
                    v-for="(item, index) in $store.state.tabss"
                    :key="item.page_router_name"
                    :label="item.title"
                    :name="item.page_router_name"
                    >
                </el-tab-pane>
              </el-tabs> 
            </div>
            <div class="mainbox">          
              <keep-alive :include="$store.state.includePageNames">
                <router-view></router-view>
              </keep-alive>
            </div>
          </el-main>
        </el-container>
      </el-container>
      
  </div>
</template>

<script>
export default {
  data() {
    return {
      user:{
        user_id:'',
        loginid:'',
        fullname:'',
        password:'',
        group_code:'',
        group_desc:'',
        role_code:'',
        role_desc:'',
        super_user:'',
        fmale:'',
        email:'',
        phone:'',
        login_count:'',
        u_create_name:'',
        u_create_id:'',
        u_update_name:'',
        u_update_id:'',
        flag_delete:'false',
        age:1,
        factory_num:'',
        warehouse_num:'',
        class_shift:'0',
        labor_level:'0',
        ifuser:'false'
      },
      tabvalue: "", //选中tab标签的路由值，见children里的name
      maintab: [
        {
          index: "1",
          tabname: "单据中心",
          iconvalue:"#icon-bill-o",
          children: [
            {
              title: "入库单",
              page_router_name: "/main/receving_order",
              component_desc:"main_receving_order"
            },
            {
              title: "生产工单",
              page_router_name: "/main/manufacture_order",
              component_desc:"main_manufacture_order"
            },
            {
              title: "领料需求",
              page_router_name: "/main/material_requisition",
              component_desc: "main_material_requisition"
            },
            {
              title: "出库队列",
              page_router_name: "/main/warehouse_out_order",
              component_desc: "main_warehouse_out_order"
            },
            {
              title: "报工单",
              page_router_name: "/main/work_report",
              component_desc: "main_work_report"
            },
            {
              title: "发运单",
              page_router_name: "/main/ship_deliver",
              component_desc: "main_ship_deliver"
            }
          ]
        },
        {
          index: "2",
          tabname: "仓库作业",
          iconvalue:"#icon-warehouse",
          children: [
            {
              title: "收货质检",
              page_router_name: "/main/B01",
              component_desc: "main_B01"
            },
            {
              title: "组盘上架",
              page_router_name: "/main/B02",
              component_desc: "main_B02"
            },
            {
              title: "拣选拆零",
              page_router_name: "/main/B03",
              component_desc: "main_B03"
            },
            {
              title: "领料发料",
              page_router_name: "/main/B04",
              component_desc: "main_B04"
            },
            {
              title: "盘点调整",
              page_router_name: "/main/B05",
              component_desc: "main_B05"
            },
            {
              title: "发运出库",
              page_router_name: "/main/B06",
              component_desc: "main_B06"
            }
          ]
        },
        {
          index: "3",
          tabname: "工序跟踪",
          iconvalue:"#icon-process",
          children: [
            {
              title: "上料开工",
              page_router_name: "/main/C01",
              component_desc: "main_C01"
            },
            {
              title: "产成报工",
              page_router_name: "/main/C02",
              component_desc: "main_C02"
            },
            {
              title: "生产异常",
              page_router_name: "/main/C03",
              component_desc: "main_C03"
            }
            ,
            {
              title: "工序产量",
              page_router_name: "/main/C04",
              component_desc: "main_C04"
            }
             ,
            {
              title: "包装",
              page_router_name: "/main/C05",
              component_desc: "main_C05"
            }
          ]
        },
        {
          index: "4",
          tabname: "设备监控",
          iconvalue:"#icon-view-matrix-o",
          children: [
             {
              title: "立库堆垛机",
              page_router_name: "/main/D01",
              component_desc: "main_D01"
            },
            {
              title: "AGV搬运",
              page_router_name: "/main/D02",
              component_desc: "main_D02"
            },
            {
              title: "输送移栽机",
              page_router_name: "/main/D03",
              component_desc: "main_D03"
            },
            {
              title: "提升机",
              page_router_name: "/main/D04",
              component_desc: "main_D04"
            }
          ]
        },
         {
          index: "5",
          tabname: "看板报表",
          iconvalue:"#icon-trend-chart-o",
          children: [
            {
              title: "出入库报表",
              page_router_name: "/main/E01",
              component_desc: "main_E01"
            },
            {
              title: "产量看板",
              page_router_name: "/main/E02",
              component_desc: "main_E02"
            }
            ,
            {
              title: "原材料查询",
              page_router_name: "/main/E03",
              component_desc: "main_E03"
            }
            ,
            {
              title: "在制品查询",
              page_router_name: "/main/E04",
              component_desc: "main_E04"
            },
            {
              title: "包材辅料",
              page_router_name: "/main/E05",
              component_desc: "main_E05"
            }
            ,
            {
              title: "成品库存",
              page_router_name: "/main/E06",
              component_desc: "main_E06"
            },
            {
              title: "工单进度",
              page_router_name: "/main/E07",
              component_desc: "main_E07"
            }
          ]
        },
        {
          index: "6",
          tabname: "基础数据",
          iconvalue:"#icon-setting",
          children: [
            {
              title: "物料维护",
              page_router_name: "/main/F01",
              component_desc: "main_F01"
            },
            {
              title: "容器管理",
              page_router_name: "/main/F02",
              component_desc: "main_F02"
            },
            {
              title: "仓库货位",
              page_router_name: "/main/F03",
              component_desc: "main_F03"
            },
            {
              title: "工厂日历",
              page_router_name: "/main/F04",
              component_desc: "main_F04" 
            },
            {
              title: "工序工艺",
              page_router_name: "/main/F05",
              component_desc: "main_F05"
            },
            {
              title: "机台工位",
              page_router_name: "/main/F06",
              component_desc: "main_F06"
            }
          ]
        },
        {
          index: "7",
          tabname: "系统权限",
          iconvalue:"#icon-user",
          children: [
            {
              title: "用户管理",
              page_router_name: "/main/G01",
              component_desc: "main_G01"
            },
            {
              title: "权限分配",
              page_router_name: "/main/G02",
              component_desc: "main_G02"
            },
            {
              title: "个人设置",
              page_router_name: "/main/G03",
              component_desc: "main_G03"
            },
            {
              title: "系统日志",
              page_router_name: "/main/G04",
              component_desc: "main_G04"
            },
            {
              title: "系统参数",
              page_router_name: "/main/G05",
              component_desc: "main_G05"
            },
            {
              title: "用户组管理",
              page_router_name: "/main/G06",
              component_desc: "main_G06"
            },
            {
              title: "角色组管理",
              page_router_name: "/main/G07",
              component_desc: "main_G07"
            } 
          ]
        }
      ],
      selectedlevel2menu:'' //被选中侧边栏的二级菜单
    };
  },
  methods: {
    //点击tab标签路由跳转
    tabpush(targetName) {
      this.$store.commit('setcurrentTime'); 
      this.$router.push(targetName.name);  //标签组件自带的name
    },
    //路由改变时触发
    routerchange() {
      this.$store.commit('setcurrentTime'); 
      //不是首页的情况下，生成一个tab标签
      if (this.$route.path !== "/main/home") {
        var _this = this;
        this.maintab.forEach(function(aaa) {
          aaa.children.forEach(item => {
            if (item.page_router_name == _this.$route.path) {
               if (_this.$store.state.tabss.indexOf(item) == -1) {
                _this.$store.state.tabss.push(item);//在tabss中添加tab标签
                _this.$store.state.includePageNames.push(item.component_desc);//在keep-alice中添加组件名
              }
            }
          });
        });
        this.tabvalue = this.$route.path;
      } else {
        return false;
      }
    },
    //删除标签页，被删除的标签页的临边(没有右就是左)页成为当前页
    removeTab(targetName) {
      this.$store.commit('setcurrentTime'); 
      if (this.$store.state.tabss.length > 1) {
        let tabs = this.$store.state.tabss;
        let activeName = this.tabvalue;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.page_router_name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.page_router_name;
              }
              this.$router.push(nextTab.page_router_name);
            }
          });
        }
        this.tabvalue = activeName;
        let targetComponent = tabs.filter(tab => tab.page_router_name == targetName)[0].component_desc;
        this.$store.state.tabss = tabs.filter(tab => tab.page_router_name !== targetName);  //筛选留下非当前关闭页的标签，即删除关闭点中的页
        this.$store.state.includePageNames =  this.$store.state.includePageNames.filter(include => include !== targetComponent);//筛选非关闭页
      } else {
        this.$store.state.tabss = [];
        this.$router.push("/main/home");
      }
    },
    //返回登录界面
    goback() {
      this.$store.commit('setcurrentTime'); 
      this.$confirm("此操作将退出并返回登录界面，是否继续", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //清理tabss，keepalive和本地缓存
          this.$router.push("/login/sign");
          this.$store.commit('cleartabss');
          this.$store.commit('clearincludePageNames');
          sessionStorage.clear();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    //让二级菜单选中后变图标样式
    handle2menuselect(key,path){  
       this.selectedlevel2menu = key;
      // alert(this.selectedlevel2menu);
      this.$store.commit('setcurrentTime'); 
    }
  },
  computed:{
    //获取复制登录人信息
    currentuser(){
      var list = this.$store.state.current_user.slice();
      return list;
    }
  },
  watch: {
    //观测路由变化
    $route: "routerchange"
  },
  mounted() { 
    if(window.sessionStorage.user_id){
      this.$router.push("/main/home");
      //重置计时器
      this.$store.commit('setcurrentTime'); 
      //开始间歇调用，30分钟无操作清空数据返回 
      this.$store.commit('timeoutclear');
    }else{
      this.$router.push("/login/sign");
    }
    //初始使user的值等于本地存储值   
    this.user = window.sessionStorage;    
  }
};
</script>

<style scoped>
.tagss {
  float: left;
}
.el-container {
  width: 100%;
  height: 100%;
}
/*padding去掉自带的padding*/
.el-header {
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #0dd42b;
  height: 40px !important;
  box-shadow: 0px 2px 10px #595959;
  padding: 0 !important;
}

.maintitle {
  height: 40px;
  line-height: 40px;
  color: #ffffff;
  font-size: 20px;
  font-weight: bolder;
}
.signperson {
  height: 40px;
  line-height: 40px;
  font-weight:bolder;
  color: #ffffff;
  margin-right:20px;
}
.goback {
  cursor: pointer;
  color: #ffffff;

}
.user-group-font{
  font-size:12px;
  color:#eee;
}
.el-aside {
  position: fixed;
  top: 40px;
  left: 0;
  background-color: #ffffff;
  height: 100%;
  border-right: 1px solid #f2f2f2;
}
.el-main {
  color: #333;
  padding: 40px 0px 0px 0px;
  margin-left: 200px;
}
.mainbox {
  padding: 20px;
  padding-top: 65px;
}
.tabbox {
  position: fixed;
  top: 40px;
  height: 30px;
  left: 200px;
  right: 0px;
  z-index: 999; /*不能大于 el-header 里的z-index 1000，因为有阴影必须放在第一层*/
  padding-top: 10px;
  padding-left: 20px;
  padding-bottom: 10px;
  background-color: white;
}
.blue {
  float: left;
  overflow: hidden;
  width: 280px;
}
.logo1 {
  width: 200px;
  height: 40px;
  background-color: #0066cc;
  text-align: center;
  float: left;
}
.logo1 img {
  width: 160px;
  height: 40px;
}
.logo2 {
  width: 80px;
  height: 40px;
  float: left;
}
.logo2 img {
  width: 80px;
  height: 40px;
}
.green {
  float: left;
  height: 40px;
  width: calc(100% - 280px);
}
.icon.big{ 
  font-size:20px;
}
</style>

