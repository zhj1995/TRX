<template>
  <div>
    <el-button-group style="margin-bottom:20px;">
      <el-button type="primary" icon="el-icon-edit" @click="Create_im_container" size="small">新建</el-button>
      <el-button type="danger" icon="el-icon-delete" @click="SelectDelete" size="small">删除</el-button>
      <el-button type="info" icon="el-icon-refresh" @click="refreshData" size="small">刷新</el-button>
    </el-button-group>
    <el-table
      border
      size="mini"
      stripe
      :data="im_container"
      style="width:100%"
      @selection-change = "handleSelectionChange"
    >
      <el-table-column fixed type="selection" width="55">
      </el-table-column>
      <el-table-column v-for="item in im_container_set" :key="item.column_field" :prop="item.column_field" :label="item.column_desc" width="150">
      </el-table-column>
      <el-table-column label="操作" width="180" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="创建"
      :visible.sync="create_im_container_dialog"
      :before-close="handleClose"
      center
      v-if="im_container.length >= 0"
      >
      <el-form ref="create_im_container_form"
        :model="create_im_container_form"
        label-width="140px"
        label-position="left"
        :rules="rule"
        status-icon>
        <!--先根据条件判断表判断是否显示，次判断值是否允许为空值，最后判断值是否是下拉框-->
        <el-form-item v-for="item in im_container_vis" :key="item.name" v-if="item.value" :prop="item.allow" :label="item.label + ':'">
          <el-select v-model="create_im_container_form[item.name]" style="width:100%" v-if="item.droplist">
            <el-option v-for="items in im_container_drop[item.name]" :key="items" :label="items" :value="items"></el-option>
          </el-select>
          <el-input-number v-model="create_im_container_form[item.name]" v-else-if="item.type == 'int'"></el-input-number>
          <el-input v-model="create_im_container_form[item.name]" v-else></el-input>
        </el-form-item>
      </el-form>
      <span>注：<span style="color:red">*</span>部分为必填项</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sureCreate('create_im_container_form')">确认创建</el-button>
        <el-button type="info" @click="create_im_container_dialog = false">取消</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="修改"
      :visible.sync="edit_im_container_dialog"
      :before-close="handleClose"
      center
      v-if="im_container.length >= 0"
      >
      <el-form ref="edit_im_container_form"
        :model="edit_im_container_form"
        label-width="140px"
        label-position="left"
        :rules="rule"
        status-icon>
        <!--先根据条件判断表判断是否显示，次判断值是否允许为空值，最后判断值是否是下拉框-->
        <el-form-item v-for="item in im_container_vis" :key="item.name" v-if="item.value" :prop="item.allow" :label="item.label + ':'">
          <el-select v-model="edit_im_container_form[item.name]" style="width:100%" v-if="item.droplist">
            <el-option v-for="items in im_container_drop[item.name]" :key="items" :label="items" :value="items"></el-option>
          </el-select>
          <el-input-number v-model="edit_im_container_form[item.name]" v-else-if="item.type == 'int'"></el-input-number>
          <el-input v-model="edit_im_container_form[item.name]" v-else></el-input>
        </el-form-item>
      </el-form>
      <span>注：<span style="color:red">*</span>部分为必填项</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sureEdit('edit_im_container_form')">确认修改</el-button>
        <el-button type="info" @click="edit_im_container_dialog = false">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "main_F02",  //本页面的组件名，一般定义成路由名一样
  data(){
    return{
      //选中的项
      multipleSelection:[],
      //当前表名
      current_tb:{
         current_tb_name:'im_container',
         current_name:'',
         current_id:''
      },
      //创建容器弹框
      create_im_container_dialog:false,
      //修改容器弹框
      edit_im_container_dialog:false,
      //创建容器表
      create_im_container_form:{},
      //修改容器弹框
      edit_im_container_form:{},
      //条件判断表
      im_container_vis:[],
      //条件判断项,如{name:'ctnid', value:true, allow:true, droplist:true, type:'nvarchar', label:''},
      im_containers_vis_list:{},
      //容器项下拉框内容
      im_container_drop:{},
      //校验规则
      rule:{},      
    }
  },
  methods:{
    //选中的项
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //当前项编辑
    handleEdit(index, row){
      this.edit_im_container_dialog = true;
      //修改表等于项
      for(var key1 in row){
        for(var key2 in this.edit_im_container_form){
          if(key1 == key2){
            this.edit_im_container_form[key2] = row[key1];         
          }
        }
      }
    },
    //当前项删除
    handleDelete(index, row){
      this.$confirm('确认删除？','提示',{
        confirmButtonText:'确定',
        cancelButton:'取消',
        type:'warning'
      }).then(() => {
        var _this = this;
        axios.post("http://localhost/TRX/api/im_container/Delete/" + row.ctnid)
        .then(function(res){
          _this.$message({
            type:'success',
            message:'删除成功！'
          });
          //刷新
          _this.$store.dispatch('get_im_container');
        })
        .catch(function(Error){
          _this.$message({
            type:'danger',
            message:"错误"
          });
          console.log(Error);
        })
      }).catch(() => {
        this.$message({
          type:'info',
          message:'取消删除'
        })
      })
    },
    //打开创建弹窗
    Create_im_container(){
      this.create_im_container_dialog = true;
    },
    //确认创建
    sureCreate(formname){
      //validate是校验，返回值valid。
      this.$refs[formname].validate((valid) => {
        if(valid){
          //_this指代data里面的this
          var _this = this;
          var data = _this.create_im_container_form;
          data.u_create_name = window.sessionStorage.loginid;resetForm
          data.u_create_id = window.sessionStorage.user_id;
          this.$confirm('确认创建？','提示',{
            confirmButtonText:'确定',
            cancelButton:'取消',
            type:'warning'
          }).then(() => {
            //__this指代then里面的this
            var __this = this;
            axios.post("http://localhost/TRX/api/im_container/Add", data)
            .then(function(res){
              _this.create_im_container_dialog = false;
              __this.$message({
                  type:'success',
                  message:'创建成功!'
              });
              //刷新
              _this.$store.dispatch('get_im_container');
              //还原表单
              for(var key in _this.create_im_container_form){
                _this.create_im_container_form[key] = '';
              }      
              //验证项重置
              _this.resetForm(formname);        
            })
            .catch(function(Error){
              __this.$message({
                  type:'success',
                  message:'错误!'  
              })
              console.log(Error);
            })
          }).catch(() => {
            this.$message({
              type:'info',
              message:'创建取消'
            });
          });
        } else {
          return false;
        }
      });      
    },
    //确认修改
    sureEdit(formname){
      this.$refs[formname].validate((valid) => {
        if(valid){
          var data = this.edit_im_container_form;
          data.u_update_name = window.sessionStorage.loginid;
          data.u_update_id = window.sessionStorage.user_id;
          this.$confirm('确认修改？','提示',{
            confirmButtonText:'确定',
            cancelButton:'取消',
            type:'warning'
          }).then(() => {
            var _this = this;
            axios.post("http://localhost/TRX/api/im_container/update", data)
            .then(function(res){
              _this.edit_im_container_dialog = false;
              _this.$message({
                  type:'success',
                  message:'修改成功!'
              });
              //刷新
              _this.$store.dispatch('get_im_container');    
              //验证项重置
              _this.resetForm(formname);        
            })
            .catch(function(Error){
              this.$message({
                  type:'success',
                  message:'错误!'  
              })
              console.log(Error);
            })
          }).catch(() => {
            this.$message({
              type:'info',
              message:'修改取消'
            });
          });
        } else {
          return false;
        }
      });
    },
    //选择删除
    SelectDelete(){
      this.$confirm('确认删除？','提示',{
        confirmButtonText:'确定',
        cancelButton:'取消',
        type:'warning'
      }).then(() => {
          var _this = this;
          this.multipleSelection.forEach(function(item){
            axios.post("http://localhost/TRX/api/im_container/Delete/" + item.ctnid)
          .then(function(res){
            _this.$message({
              type:'success',
              message:'删除成功！'
            });
            //刷新
            _this.$store.dispatch('get_im_container');
          })
          .catch(function(Error){
            _this.$message({
              type:'danger',
              message:"错误"
            });
            console.log(Error);
          })
          })
      }).catch(() => {
        this.$message({
          type:'info',
          message:'取消删除'
        })
      })
    },
    //刷新
    refreshData(){
      this.$store.dispatch('get_im_container');
    },
    //弹窗关闭触发
    handleClose(done){
      this.$store.commit('setcurrentTime'); 
      this.$confirm('确认关闭？')
          .then(_=> {
              done();
          })
          .catch(_=> {});
    },
    //重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //条件判断表根据配置表值修改
    condition_form(){
      var _this = this;
      this.im_container_set.forEach(function(item){  
      //name表单项名称     
      _this.im_containers_vis_list.name = item.column_field
      //label表单项描述
      _this.im_containers_vis_list.label = item.column_desc;
      //value表单项是否显示
      _this.im_containers_vis_list.value = item.display;
      //allow表单项值是否可以为空，不为空给与验证规则
      if(item.allow_null == true){
        _this.im_containers_vis_list.allow = "allow_null"
      }else{
        _this.im_containers_vis_list.allow = _this.im_containers_vis_list.name;
      }
      //dropdownList表单项是否为下拉框，不是为输入框
      if(item.dropdownList_vls !== ""){
        _this.im_containers_vis_list.droplist = true;
      }else{
        _this.im_containers_vis_list.droplist = false;
      }
      //type表单项值的类型
      if(item.column_type == "nvarchar"){
        _this.im_containers_vis_list.type = "nvarchar";
      }else if(item.column_type == "int"){
        _this.im_containers_vis_list.type = "int"
      }else if(item.column_type == "bit"){
        _this.im_containers_vis_list.type = "bit"
      }else{
        _this.im_containers_vis_list.type = "datetime"
      }    
      //将配置表里的值分割成数组保存在下拉框表里
     for(var key in _this.im_container_drop){
        if(key == _this.im_containers_vis_list.name){
          var a = item.dropdownList_vls.split("^");
          a.forEach(function(aa){
            _this.im_container_drop[key].push(aa);
          });
        }
      }
      //var list 深复制对象内容，并将list插入到条件判断表中
      var list = {};
      for(var key in _this.im_containers_vis_list){
        list[key] = _this.im_containers_vis_list[key];
      }
      _this.im_container_vis.push(list);  
      
      })
    },
    //初始化表单，下拉框和验证表
    initialize_form(){
      var _this = this;
      this.im_container_set.forEach(function(item){
        var key = item.column_field;
        _this.im_container_drop[key] = [];
        /*受现代 JavaScript 的限制（以及废弃 Object.observe），Vue 不能检测到对象属性的添加或删除。属性必须在 data 对象上存在才能让 Vue
        转换它，这样才能让它是响应的,可以使用 vm.$set 实例方法给对象添加响应属性*/
        _this.$set(_this.create_im_container_form, key, '');
        _this.$set(_this.edit_im_container_form, key, '');
        _this.edit_im_container_form[key] = '';
        _this.rule[key] = [];
        var obj = {};
        obj.required = true;
        obj.trigger = "blur";
        obj.message = item.column_desc + "不能为空"
        _this.rule[key].push(obj);
      })
    }
  },
  computed:{
    //容器表
    im_container(){
      return this.$store.state.im_container;
    },
    //配置表
    im_container_set(){
      return this.$store.state.sys_tbl_clmn_set;
    }
  },
  mounted(){
    //获取容器表
    this.$store.dispatch('get_im_container');
    this.current_tb.current_name = window.sessionStorage.loginid;
    this.current_tb.current_id = window.sessionStorage.user_id;
    //获取配置表
    this.$store.dispatch('get_sys_tbl_clmn_set', this.current_tb);
    //初始化新建表单，编辑表单，容器表单下拉菜单和验证表单
    this.initialize_form();
    //初始化表单条件判断表
    this.condition_form();     
  }
}
</script>
<style scope>
</style>