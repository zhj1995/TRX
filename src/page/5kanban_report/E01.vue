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
      U_id:'user_id'
    }
  },
  methods:{
    //深复制
    copysys(){
      this.sys_tbl_clmn = this.sys_tbl_clmn_data.slice(0);
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
    }
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
  }
}
</script>
<style scope>
</style>