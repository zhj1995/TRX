<template>
  <div>
    <el-button-group style="margin-bottom:20px;">
      <el-button type="primary" icon="el-icon-edit" @click="Create_user_group">新建</el-button>
      <el-button type="danger" icon="el-icon-delete" @click="SelectDelete">删除</el-button>
      <el-button type="info" icon="el-icon-refresh" @click="refreshData">刷新</el-button>
    </el-button-group>
    <el-table
      border
      size="mini"
      stripe
      :data="pw_user_group"
      tooltip-effect="dark"
      style="width:100%"
      @selection-change = "handleSelectionChange"
    >
      <el-table-column fixed type="selection" width="55">
      </el-table-column>
      <el-table-column prop="group_code" label="用户组编号" width="100">
      </el-table-column>
      <el-table-column prop="group_name" label="用户组描述" width="150">
      </el-table-column>
      <el-table-column prop="farther_group" label="上级部门" width="150">
      </el-table-column>
      <el-table-column prop="group_leader" label="组长" width="100">
      </el-table-column>
      <el-table-column prop="group_vice_leader" label="副组长" width="100">
      </el-table-column>
      <el-table-column prop="t_create" label="创建时间" width="200">
      </el-table-column>
      <el-table-column prop="t_update" label="更新时间" width="200">
      </el-table-column>
      <el-table-column prop="u_create_name" label="创建人姓名" width="150">
      </el-table-column>
      <el-table-column prop="u_create_id" label="创建人ID" width="100">
      </el-table-column> 
      <el-table-column prop="u_update_name" label="更新人姓名" width="150">
      </el-table-column>
      <el-table-column prop="u_update_id" label="更新人ID" width="100">
      </el-table-column>
      <el-table-column prop="flag_delete" label="是否删除" width="100">
      </el-table-column>
      <el-table-column label="操作" width="150" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column> 
    </el-table>

    <!--创建弹框-->
    <el-dialog
      title="创建用户"
      :visible.sync="Create_user_group_Dialog"
      :before-close="handleClose"
      center>
      <el-form ref="create_user_group_form"
        :model="create_user_group_form"
        label-width="120px"
        label-position="left">
        <el-form-item label="用户组编号：">
          <el-input v-model="create_user_group_form.group_code"></el-input>
        </el-form-item>
        <el-form-item label="用户组名称：">
          <el-input v-model="create_user_group_form.group_name"></el-input>
        </el-form-item>
        <el-form-item label="父用户组：">
            <el-select v-model="create_user_group_form.farther_group">
              <el-option v-for="item in pw_user_group" :key="item.group_code" :label="item.group_name" :value="item.group_code"></el-option>
            </el-select>         
        </el-form-item>
        <el-form-item label="选择组长">
          <el-select v-model="create_user_group_form.group_leader" filterable placeholder="请选择组长">
              <el-option v-for="item in pw_user" :key="item.loginid" :label="item.fullname" :value="item.loginid"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择副组长">
          <el-select v-model="create_user_group_form.group_vice_leader" filterable placeholder="请选择组长">
            <el-option v-for="item in pw_user" :key="item.loginid" :label="item.fullname" :value="item.loginid"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span>注：<span style="color:red;">*</span>部分为必填项</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sureCreate">确认创建</el-button>
        <el-button type="info" @click="Create_user_group_Dialog = false">取消</el-button>
      </span>
    </el-dialog>

    <!--修改弹窗-->
    <el-dialog
      title="修改用户"
      :visible.sync="Edit_user_group_Dialog"
      :before-close="handleClose"
      center>
      <el-form ref="edit_user_group_form"
        :model="edit_user_group_form"
        label-width="120px"
        label-position="left">
        <el-form-item label="用户组编号：">
          {{edit_user_group_form.group_code}}
        </el-form-item>
        <el-form-item label="用户组名称：">
          <el-input v-model="edit_user_group_form.group_name"></el-input>
        </el-form-item>
        <el-form-item label="父用户组：">
            <el-select v-model="edit_user_group_form.farther_group">
              <el-option v-for="item in fgroup" :key="item.group_code" :label="item.group_name" :value="item.group_code"></el-option>
            </el-select>         
        </el-form-item>
        <el-form-item label="选择组长">
          <el-select v-model="edit_user_group_form.group_leader" filterable placeholder="请选择组长">
              <el-option v-for="item in leader" :key="item.loginid" :label="item.fullname" :value="item.loginid"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择副组长">
          <el-select v-model="edit_user_group_form.group_vice_leader" filterable placeholder="请选择组长">
            <el-option v-for="item in leader" :key="item.loginid" :label="item.fullname" :value="item.loginid"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span>注：<span style="color:red;">*</span>部分为必填项</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sureEdit">确认修改</el-button>
        <el-button type="info" @click="Edit_user_group_Dialog = false">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
export default {
   name: "main_G06",
   data(){
     return{
      //选中的项
      multipleSelection:[],
      create_user_group_form:{
        group_code:'',
        group_name:'',
        farther_group:'',
        group_leader:'',
        group_vice_leader:'',
        u_create_name:'',
        u_create_id:'',
        u_update_name:'',
        u_update_id:'',
        flag_delete:false
      },
      edit_user_group_form:{
        group_code:'',
        group_name:'',
        farther_group:'',
        group_leader:'',
        group_vice_leader:'',
        u_create_name:'',
        u_create_id:'',
        u_update_name:'',
        u_update_id:'',
        flag_delete:false
      },
      //父用户组
      fgroup:[],
      //组长组
      leader:[],
      current_group_role:{
        //当前选中的group
        current_group_code:'all',
        //当前选中的role
        current_role_code:'all'                
      }, 
      Create_user_group_Dialog:false,
      Edit_user_group_Dialog:false
     }
   },
   methods:{
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //打开修改窗口
    handleEdit(index, row){   
      this.edit_user_group_form.group_code = row.group_code;
      this.edit_user_group_form.group_name = row.group_name;
      this.edit_user_group_form.farther_group = row.farther_group;
      this.edit_user_group_form.group_leader = row.group_leader;
      this.edit_user_group_form.group_vice_leader = row.group_vice_leader;
      this.Edit_user_group_Dialog = true;
      //父用户组深复制；concat
      this.fgroup = this.pw_user_group.concat();
      this.leader = this.pw_user.concat();
      //过滤,当前组别不能当做父组别
      this.fgroup = this.fgroup.filter(item => item.group_code != row.group_code);
      //过滤,当前组别成为父组别的那个组别不能成为当前组别的父组别
      this.fgroup = this.fgroup.filter(item => item.farther_group != row.group_code);
      //过滤,组长和副组长要从当前组别内选择
      this.leader = this.leader.filter(item => item.group_code == row.group_code);
    },
     //对话框关闭
    handleClose(done){
      this.$store.commit('setcurrentTime'); 
      this.$confirm('确认关闭？')
          .then(_=> {
              done();
          })
          .catch(_=> {});
    },
    //打开创建窗口
    Create_user_group(){
      this.Create_user_group_Dialog = true;
    },
    //确认创建
    sureCreate(){
      var _this = this;
      var data = _this.create_user_group_form;  
      data.u_create_name = window.sessionStorage.loginid;
      data.u_create_id = window.sessionStorage.user_id;  
      this.$confirm('确认创建新用户吗？','提示',{
          confirmButtonText:'确定',
          cancelButton:'取消',
          type:'warning'
      }).then(() => {
        var __this = this;
        axios.post("http://localhost/TRX/api/pw_user_group/Addgroup", data)
        .then(function(res){
          _this.Create_user_group_Dialog = false;
          __this.$message({
            type:'success',
            message:'创建成功！'
          });
          //再次获取数据
          _this.$store.dispatch('get_pw_user_table',_this.current_group_role );
          _this.$store.dispatch('get_pw_user_group');
        })
        .catch(function(error){
          alert(error);
          _this.Create_user_group_Dialog = false;
          __this.$message({
              type:'danger',
              message:error
          });
        })
      }).catch(() => {
        this.$message({
          type:'info',
          message:'创建取消'
        });
      });    
    },
    //确认修改
    sureEdit(){
      var _this = this;
      var data = _this.edit_user_group_form;
      data.u_update_name = window.sessionStorage.loginid;
      data.u_update_id = window.sessionStorage.user_id; 
      this.$confirm('确认修改用户组吗？','提示',{
        confirmButtonText:'确定',
        cancelButton:'取消',
        type:'warning'
      }).then(() => {
        var __this = this;
        axios.post("http://localhost/TRX/api/pw_user_group/update",data)
        .then(function(res){
          _this.Edit_user_group_Dialog = false;
          __this.$message({
            type:'success',
            message:'修改成功！'
          });
          //再次获取数据
          _this.$store.dispatch('get_pw_user_table',_this.current_group_role);
          _this.$store.dispatch('get_pw_user_group');
        })
        .catch(function(error){
          alert(error);
          _this.Edit_user_group_Dialog = false;
          __this.$message({
            type:'danger',
            message:Error
          });
        });
      }).catch(() => {
        this.$message({
          type:'info',
          message:'创建取消'
        });
      });
    },
    //删除
    handleDelete(index, row){
      var _this = this;
      this.$confirm('确认删除？','提示',{
        confirmButtonText:'确定',
        cancelButton:'取消',
        type:'warning'
      }).then(() => {
        var __this = this;
        axios.post("http://localhost/TRX/api/pw_user_group/Delete/" + row.group_code)
        .then(function(res){
          __this.$message({
            type:'success',
            message:'删除成功！'
          });
          //再次获取数据
          _this.$store.dispatch('get_pw_user_table',_this.current_group_role);
          _this.$store.dispatch('get_pw_user_group');
        }).catch(function(error){
          __this.$message({
            type:'danger',
            message:Error
          });
        });
      }).catch(() => {
        this.$message({
          type:'info',
          message:'取消删除'
        })
      })
    },
    //选择删除
    SelectDelete(){
      this.$confirm('确认删除选择项吗？','提示',{
        confirmButtonText:'确定',
        cancelButton:'取消',
        type:'warning'
      }).then(() => {
        var _this = this;
        this.multipleSelection.forEach(function(item){
          axios.post("http://localhost/TRX/api/pw_user_group/Delete/" + item.group_code)
          .then(function(res){
            _this.$message({
              type:'success',
              message:'删除成功！'
            });
            //再次获取数据
          _this.$store.dispatch('get_pw_user_table',_this.current_group_role);
          _this.$store.dispatch('get_pw_user_group');
          })
          .catch(function(Error){
            _this.$message({
              type:'danger',
              message:Error
            });
          })
        })
      }).catch(() => {
        this.$message({
          type:'info',
          message:'取消删除'
        });
      })
    },
    //刷新
    refreshData(){
      this.$store.dispatch('get_pw_user_table',this.current_group_role);
      this.$store.dispatch('get_pw_user_group');
    }
   },
   computed:{
     //获取用户组
     pw_user_group(){
       return this.$store.state.pw_user_group;
     },
     //获取用户
     pw_user(){
       return this.$store.state.pw_user_table;
     }
   },
   mounted(){
    //页面加载载入值
    this.$store.dispatch('get_pw_user_group');
    //页面第一次载入加载值
    this.$store.dispatch('get_pw_user_table',this.current_group_role );
    
   }

}
</script>
<style scope>
</style>