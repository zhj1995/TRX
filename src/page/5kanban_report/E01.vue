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
      :select1_code="group_code"
      :select1_desc="group_desc"
      :select2_code="role_code"
      :select2_desc="role_desc"
      :searchlabel1="searchlabel1"
      :searchlabel2="searchlabel2"
      :searchvalue1="searchvalue1"
      :searchvalue2="searchvalue2"
      :searchfun="searchfun"
      @load="loadingdata">
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
      //要获取的值,调用Vuex的方法
      getData:'get_pw_user_table',
      //创建地址
      Createsrc:"http://localhost/TRX/api/AuthPower/AddUser",
      //更新地址
      Editsrc:"http://localhost/TRX/api/pw_user/update",
      //删除地址
      Deletesrc:"http://localhost/TRX/api/pw_user/Delete/",
      //删除提供的id
      U_id:'user_id',
      group_code:'group_code',
      group_desc:'group_desc',
      role_code:'role_code',
      role_desc:'role_desc',
      searchlabel1:'登录名',
      searchlabel2:'用户id',
      searchvalue1:'loginid',
      searchvalue2:'user_id',
      //调用vuex的搜索方法
      searchfun:'searchpw_user_table'
    }
  },
  methods:{
    //深复制
    copysys(){
      this.sys_tbl_clmn = this.sys_tbl_clmn_data.slice(0);
    },
    //加载页面内容、刷新
    loadingdata(){
      //loading为true，页面处于待加载状态
      this.loading = true;
      //select值还原成初始值
      this.current_group_role.current_group_code = "all";
      this.current_group_role.current_role_code = "all";
      //当前表的值等于本地登录用户的值
      this.current_tb.current_name = window.sessionStorage.loginid;
      this.current_tb.current_id = window.sessionStorage.user_id;
      //获取配置表
      this.$store.dispatch('get_sys_tbl_clmn',this.current_tb);
      //获取容器表
      this.$store.dispatch('get_pw_user_table',this.current_group_role);   
      var _this = this;
      //this.$refs.child调用子组件的方法
      var __this = this.$refs.child;
      //由于ajax是异步的，可能在执行这个方法前，值还没更新，所以使用延迟操作
      setTimeout(function(){
        //深复制配置表，不然会影响到其他表(因为所有的表都会调用配置表)
        _this.copysys();
      },1000);
      setTimeout(function(){   
        //初始化表单，下拉框和验证表,每一项生成属性并赋值空值
        __this.initialize_form();
        //条件判断表赋值,让表单依据条件判断表生成内容
        __this.condition();
        //生成select表值
        __this.selectdrop();
        //初始完毕之后让页面加载状态取消
        _this.loading = false;
      },1500);     
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
    //初始化加载内容
    this.loadingdata();
  }
}
</script>
<style scope>

</style>