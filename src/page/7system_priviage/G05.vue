<template>
  <div>
    <el-row :span="24" style="margin-bottom:20px;">
      <el-col :span="10">
        <!--<el-select v-model="current_tb.current_tb_name" placeholder="请选择一个表" style="width:100%"  @change="tablechange">
          <el-option
            v-for="item in tb_name_table"
            :key="item.tb_name"
            :value="item.tb_name"
            :label="item.tb_name">
          </el-option>
        </el-select>--> 
        <el-input v-model="current_tb.current_tb_name" placeholder="请输入一个表名">
          <el-button slot="append" icon="el-icon-search" @click="tablechange"></el-button>
        </el-input>
      </el-col>
      <el-col :span="5" :offset="9">
      <el-button-group>
        <el-button type="primary" icon="el-icon-edit" @click="savesubmit">保存</el-button>
        <el-button type="danger" icon="el-icon-delete">删除</el-button>
        <el-button type="info" icon="el-icon-refresh" >刷新</el-button>
      </el-button-group>
      </el-col>
    </el-row>
    <el-table
      border
      size="mini"
      stripe
      :data="sys_tbl_clmn_set_table"
      style="width:100%"
      @selection-change = "handleSelectionChange">
      <el-table-column fixed type="selection" width="55">
      </el-table-column>
      <el-table-column prop="column_field" label="column_field" width="150" fixed>
      </el-table-column>
      <el-table-column prop="column_desc" label="column_desc" width="250">
        <template slot-scope="scope">
          <div  @click="openEdit_column_desc(scope.$index, scope.row)" style="width:250px; height:23px; cursor: pointer;">{{scope.row.column_desc}}</div>
        </template>
      </el-table-column>
      <el-table-column  prop="display" label="是否显示" width="70" fixed="right">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.display" @change="addrow(scope.$index, scope.row)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="allow_null" label="允许为空" width="70" fixed="right">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.allow_null" @change="addrow(scope.$index, scope.row)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="default_value" label="default_value" width="150">
        <template slot-scope="scope">
          <div  @click="openEdit_default_value(scope.$index, scope.row)" style="width:250px; height:23px; cursor: pointer;">{{scope.row.default_value}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="dropdownList_vls" label="dropdownList_vls" width="250">
        <template slot-scope="scope">
          <div  @click="openEdit_dropdownList_vls(scope.$index, scope.row)" style="width:250px; height:23px; cursor: pointer;">{{scope.row.dropdownList_vls}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="display_order" label="display_order" width="150">
      </el-table-column>
      <el-table-column prop="u_create_name" label="u_create_name" width="150">
      </el-table-column>
      <el-table-column prop="u_create_id" label="u_create_id" width="150">
      </el-table-column>
      <el-table-column prop="t_create" label="t_create" width="250">
      </el-table-column>
      <el-table-column prop="u_update_name" label="u_update_name" width="150">
      </el-table-column>
      <el-table-column prop="u_update_id" label="u_update_id" width="150">
      </el-table-column>
      <el-table-column prop="t_update" label="t_update" width="250">
      </el-table-column>
    </el-table>

    <el-dialog
      :visible.sync="Edit_column_desc">
      <el-form ref="current"
        :model="current"
        label-width="200px"
        label-position="left">
        <el-form-item label="current_column_desc:">
          <el-row :span="24">
            <el-col :span="18"><el-input v-model="current.current_column_desc"></el-input></el-col>
            <el-col :span="4" :offset="2"><el-button type="primary" @click="sureEdit_column_desc">确定</el-button></el-col>
          </el-row>       
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog
      :visible.sync="Edit_default_value">
      <el-form ref="current"
        :model="current"
        label-width="200px"
        label-position="left">
        <el-form-item label="default_value:">
          <el-row :span="24">
            <el-col :span="18"><el-input v-model="current.current_default_value"></el-input></el-col>
            <el-col :span="4" :offset="2"><el-button type="primary" @click="sureEdit_default_value">确定</el-button></el-col>
          </el-row>       
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog
      :visible.sync="Edit_dropdownList_vls">
      <el-form ref="current"
        :model="current"
        label-width="200px"
        label-position="left">
        <el-form-item label="dropdownList_vls:">
          <el-row :span="24">
            <el-col :span="18"><el-input v-model="current.current_dropdownList_vls"></el-input></el-col>
            <el-col :span="4" :offset="2"><el-button type="primary" @click="sureEdit_dropdownList_vls">确定</el-button></el-col>
          </el-row>       
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "main_G05",  //本页面的组件名，一般定义成路由名一样
  data(){
    return{
      //选中的项
      multipleSelection:[],
      //所有表列表
      tb_name_table:[
        {tb_name:'pw_user'},
        {tb_name:'pw_function'},
        {tb_name:'pw_privilege'},
        {tb_name:'pw_user_group'},
        {tb_name:'sys_config'}
      ],
      current_tb:{
         current_tb_name:'pw_user',
         current_name:'',
         current_id:''
      },
      Edit_column_desc:false,
      Edit_default_value:false,
      Edit_dropdownList_vls:false,
      current:{
        current_column_desc:'',
        current_default_value:'',
        current_dropdownList_vls:'',
        current_index:''
      },
      selectrow:[]    
    }
  },
  methods:{
    handleSelectionChange(val){
      this.multipleSelection = val;
    },
    tablechange(){
      this.$store.dispatch('get_sys_tbl_clmn_set', this.current_tb);
    },
    openEdit_column_desc(index,row){
      this.Edit_column_desc = true;
      this.current.current_column_desc = row.column_desc;
      this.current.current_index = index;
    },
    openEdit_default_value(index,row){
      this.Edit_default_value = true;
      this.current.current_default_value = row.default_value;
      this.current.current_index = index;
    },
    openEdit_dropdownList_vls(index, row){
      this.Edit_dropdownList_vls = true;
      this.current.current_dropdownList_vls = row.dropdownList_vls;
      this.current.current_index = index;
    },
    sureEdit_column_desc(){
      var row = this.sys_tbl_clmn_set_table[this.current.current_index];
      row.column_desc = this.current.current_column_desc;
      this.selectrow = this.selectrow.filter(item => item !== row);
      this.selectrow.push(row);
      this.Edit_column_desc = false;
    },
    sureEdit_default_value(){
      var row = this.sys_tbl_clmn_set_table[this.current.current_index];
      row.default_value = this.current.current_default_value;
      this.selectrow = this.selectrow.filter(item => item !== row);
      this.selectrow.push(row);
      this.Edit_default_value = false;
    },
    sureEdit_dropdownList_vls(){
      var row = this.sys_tbl_clmn_set_table[this.current.current_index];
      row.dropdownList_vls = this.current.current_dropdownList_vls;
      this.selectrow = this.selectrow.filter(item => item !== row);
      this.selectrow.push(row);
      this.Edit_dropdownList_vls = false;
    },
    addrow(index,row){
      this.selectrow = this.selectrow.filter(item => item !== row);
      this.selectrow.push(row);
    },
    savesubmit(){
      var _this = this;
      this.selectrow.forEach(function(item){
        item.u_update_name = window.sessionStorage.loginid;
        item.u_update_id = window.sessionStorage.user_id;
        axios.post("http://localhost/TRX/api/sys_tbl_clmn_set/update",item)
        .then(function(res){
          _this.$store.dispatch('get_sys_tbl_clmn_set', _this.current_tb);
        })
        .catch(function(error){
          alert(error);
        })
      });
      this.selectrow = [];
    }
  },
  computed:{
   sys_tbl_clmn_set_table(){    
      return this.$store.state.sys_tbl_clmn_set
   }
  },
  mounted(){
    this.current_tb.current_name = window.sessionStorage.loginid;
    this.current_tb.current_id = window.sessionStorage.user_id;
    this.$store.dispatch('get_sys_tbl_clmn_set', this.current_tb);
  }
}
</script>
<style scope>

</style>