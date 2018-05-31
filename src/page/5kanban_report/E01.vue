<template>
  <div v-loading= "loading" element-loading-text="构建文档中...">
    <Datatable 
      ref="child" 
      :sys_tbl_clmn="sys_tbl_clmn" 
      :table_data="pw_user" 
      :getData="getData" 
      :Createsrc="Createsrc" 
      :Editsrc="Editsrc"
      :Deletesrc="Deletesrc"
      :U_id="U_id"
      :current_group_role="current_group_role"
      @load="loadingdata">
      <template slot="select1">
        <el-select v-model="current_group_role.current_group_code" placeholder="请选择组别" style="width:100%" size="small">
          <el-option 
            v-for="item in searchgroups"
            :key="item.group_code"
            :label="item.group_desc"
            :value="item.group_code">
          </el-option>
        </el-select>
      </template>
      <template slot="select2">
        <el-select v-model="current_group_role.current_role_code"  placeholder="请选择用户角色" style="width:100%" size="small">
          <el-option
            v-for="item in searchroles"
            :key="item.role_code"
            :label="item.role_desc"
            :value="item.role_code">
          </el-option>
        </el-select>
      </template>
      <template slot="search">
        <el-input  v-model="searchcontent.inputcontent" class="input-with-select" size="small">
          <el-select class="inner" v-model="searchcontent.idorname" slot="prepend">
            <el-option label="登录名" value="loginid"></el-option>
            <el-option label="用户id" value="user_id"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="searchpw_user"></el-button>
        </el-input>
      </template>
    </Datatable>
  </div>
</template>

<script>
import Datatable from '../../components/datatable.vue';
export default {
  components:{ Datatable },
  name: "main_E01" ,
  data(){
    return{
      current_tb:{
         current_tb_name:'pw_user',
         current_name:'',
         current_id:''
      },
      current_group_role:{
        //当前选中的group
        current_group_code:'all',
        //当前选中的role
        current_role_code:'all',                
      },
      //深复制的配置表
      sys_tbl_clmn:[],
      //加载动态图
      loading:true,
      //要获取的值
      getData:'get_pw_user_table',
      //创建地址
      Createsrc:"http://localhost/TRX/api/AuthPower/AddUser",
      //更新地址
      Editsrc:"http://localhost/TRX/api/pw_user/update",
      //删除地址
      Deletesrc:"http://localhost/TRX/api/pw_user/Delete/",
      //删除提供的id
      U_id:'user_id',
      searchgroups:[{
        group_code:'all',
        group_desc:'全部'
      }],
      searchroles:[{
        role_code:'all',
        role_desc:'全部'
      }],
      //搜索栏里的内容，idorname是搜索的类型是ID还是登录名，inputcontent是搜索的内容
      searchcontent:{
        idorname:'loginid',
        inputcontent:''
      },
    }
  },
  methods:{
    //深复制
    copysys(){
      this.sys_tbl_clmn = this.sys_tbl_clmn_data.slice(0);
    },
    //生成select数据
    selectdrop(){
      var _this = this;
      this.pw_user.forEach(function(item){
        var a = 0;
        var b = 0;
        _this.searchgroups.forEach(function(key){
          if(key.group_code == item.group_code){
            a = 1;
          }
        })
        if(a == 0){
          var group_list = {};
          group_list.group_code = item.group_code;
          group_list.group_desc = item.group_desc;
          _this.searchgroups.push(group_list);
        }
        _this.searchroles.forEach(function(key){
          if(key.role_code == item.role_code){
            a = 1;
          }
        })
        if(a == 0){
          var role_list = {};
          role_list.role_code = item.role_code;
          role_list.role_desc = item.role_code;
          _this.searchroles.push(role_list);
        }
      })
    },
    //加载页面内容、刷新
    loadingdata(){
      this.loading = true;
      this.current_tb.current_name = window.sessionStorage.loginid;
      this.current_tb.current_id = window.sessionStorage.user_id;
      //获取配置表
      this.$store.dispatch('get_sys_tbl_clmn',this.current_tb);
      //获取容器表
      this.$store.dispatch('get_pw_user_table',this.current_group_role);   
      var _this = this;
      var __this = this.$refs.child;
      //由于ajax是异步的，可能在执行这个方法前，值还没更新，所以使用延迟操作
      setTimeout(function(){
        //深复制配置表，不然会影响到其他表
        _this.copysys();
      },1000);
      setTimeout(function(){     
        __this.initialize_form();
        __this.condition();
        _this.loading = false;
      },1500);
    },
    //切换
    groupchange(){
      //获取容器表
      this.$store.dispatch('get_pw_user_table',this.current_group_role); 
    },
    //搜索
    searchpw_user(){
      this.$store.dispatch('searchpw_user_table',this.searchcontent);
    },
  },
  computed:{
    //用户表
    pw_user(){
      return this.$store.state.pw_user_table; 
    },
    //配置表
    sys_tbl_clmn_data(){
      return this.$store.state.sys_tbl_clmn;
    }
  },
  mounted(){
    //初始化
    this.loadingdata();
    this.selectdrop();
  }
}
</script>
<style scope>
.el-select.inner .el-input{
  width: 100px;
  color: #cccccc;
}
</style>