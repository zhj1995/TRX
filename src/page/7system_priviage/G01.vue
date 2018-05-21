<template>
  <div>
    <el-row :span="24" style="margin-bottom:20px">
        <el-col :span="4">
          <el-select v-model="current_group_role.current_group_code" placeholder="请选择组别" @change="groupchange">
            <el-option 
              v-for="item in searchgroups"
              :key="item.group_code"
              :label="item.group_desc"
              :value="item.group_code">
            </el-option>
          </el-select>
        </el-col>
        <!--<el-col :span="1"><el-button @click="addgroup_Dialog = true">新增组别</el-button></el-col>-->
        <el-col :span="4" :offset="1">
          <el-select v-model="current_group_role.current_role_code"  placeholder="请选择用户角色" @change="groupchange">
            <el-option
              v-for="item in searchroles"
              :key="item.role_code"
              :label="item.role_desc"
              :value="item.role_code">
            </el-option>
          </el-select>
        </el-col>
        <!--<el-col :span="1"><el-button @click="addrole_Dialog = true">新增角色</el-button></el-col>-->
        <el-col :span="8" :offset="1">
            <el-input  v-model="searchcontent.inputcontent" class="input-with-select">
                <el-select class="inner" v-model="searchcontent.idorname" slot="prepend">
                  <el-option label="登录名" value="loginid"></el-option>
                  <el-option label="用户id" value="user_id"></el-option>
                </el-select>
                <el-button icon="el-icon-refresh" slot="append" @click="refreshpw_user"></el-button>
                <el-button slot="append" icon="el-icon-search" @click="searchpw_user"></el-button>
            </el-input>
        </el-col>
        <el-col :span="5" :offset="1">
            <el-button-group>
                <el-button type="primary" icon="el-icon-edit" @click="Create_pw_user">新建</el-button>
                <el-button type="danger" icon="el-icon-delete" @click="delete_pw_user">删除</el-button>
                <el-button type="info" icon="el-icon-refresh" @click="refresh_pw_user">刷新</el-button>
            </el-button-group>     
        </el-col>
    </el-row>  
    <el-table
        ref="multipleTable"
        border
        size="mini"
        stripe       
        :data="pw_user_table"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        >
        <el-table-column fixed type="selection" width="55">
        </el-table-column>
        <el-table-column prop="user_id" label="用户id" width="100">
        </el-table-column>
        <el-table-column prop="loginid" label="用户登录名" width="150">
        </el-table-column>
        <el-table-column prop="fullname" fixed label="全名" width="150">
        </el-table-column>
        <el-table-column prop="password" label="登录密码" width="150">
        </el-table-column>
        <el-table-column prop="group_code" label="所属用户组代码" width="150">
        </el-table-column>
        <el-table-column prop="group_desc" label="所属用户组描述" width="150">
        </el-table-column>
        <el-table-column prop="role_code" label="角色代码" width="150">
        </el-table-column>
        <el-table-column prop="role_desc" label="角色描述" width="150">
        </el-table-column>
        <el-table-column prop="super_user" label="是否超级管理员" width="150">
            <template slot-scope="scope">
                <el-tag :type="scope.row.super_user === true ? 'success' : 'danger'">
                    <span v-if="scope.row.super_user == true">超级管理员</span>
                    <span v-if="scope.row.super_user == false">不是超级管理员</span>
                </el-tag>
            </template>
        </el-table-column>
        <el-table-column prop="fmale" label="性别" width="100">
        </el-table-column>
        <el-table-column prop="email" label="邮件" width="200">
        </el-table-column>
        <el-table-column prop="phone" label="手机" width="150">
        </el-table-column>
        <el-table-column prop="login_count" label="登陆次数" width="100">
        </el-table-column>
        <el-table-column prop="t_register" label="注册时间" width="200">
        </el-table-column>
        <el-table-column prop="t_lastlogin" label="上次登录时间" width="200">
        </el-table-column>
        <el-table-column prop="u_create_name" label="创建人用户" width="150">
        </el-table-column>
        <el-table-column prop="u_create_id" label="创建人ID" width="100">
        </el-table-column>
        <el-table-column prop="t_create" label="创建时间" width="200">
        </el-table-column>
        <el-table-column prop="u_update_name" label="更新人姓名" width="150">
        </el-table-column>
        <el-table-column prop="u_update_id" label="更新人ID" width="100">
        </el-table-column>
        <el-table-column prop="t_update" label="更新时间" width="200">
        </el-table-column>
        <el-table-column prop="flag_delete" label="禁用状态" width="100">
            <template slot-scope="scope">
                <el-tag :type="scope.row.flag_delete === true ? 'danger' : 'success'">
                    <span v-if="scope.row.flag_delete == false">未禁用</span>
                    <span v-if="scope.row.flag_delete == true">已禁用</span>
                </el-tag>
            </template>
        </el-table-column>
        <el-table-column prop="age" label="年龄" width="100">
        </el-table-column>
        <el-table-column prop="factory_num" label="工厂编号" width="100">
        </el-table-column>
        <el-table-column prop="warehouse_num" label="所在仓库编号" width="100">
        </el-table-column>
        <el-table-column prop="class_shift" label="班别" width="100">
        </el-table-column>
        <el-table-column prop="labor_level" label="劳工等级" width="100">
        </el-table-column>  
        <el-table-column label="操作" width="150" fixed="right">
            <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
        </el-table-column> 
    </el-table>

    <div style="text-align: center; margin-top:20px;">
        <el-pagination
            background
            @current-change="handleCurrentChange"
            :current-page="1"
            :page-size="10"
            layout="total, prev, pager, next, jumper"
            :total="100">
        </el-pagination>
    </div>

    <el-dialog 
        title="创建用户" 
        :visible.sync="Create_pw_user_Dialog"
        :before-close="handleClose"
        center>
        <el-form ref="create_pw_user_form" 
            :model="create_pw_user_form" 
            label-width="120px" 
            label-position="left" 
            :rules="pw_user_form_rules" 
            status-icon>
            <el-form-item label="用户登录名：" prop="loginid">
                <el-input v-model="create_pw_user_form.loginid" placeholder="请输入登录名"></el-input>
            </el-form-item>
            <el-form-item label="全名：" prop="fullname">
                <el-input v-model="create_pw_user_form.fullname" placeholder="请输入真实姓名"></el-input>
            </el-form-item>
            <el-form-item label="登录密码：" prop="password">
                <el-input v-model="create_pw_user_form.password" placeholder="请输入登录密码"></el-input>
            </el-form-item>
            <el-form-item label="确认密码：" prop="passwordsure">
                <el-input v-model="create_pw_user_form.passwordsure" placeholder="请再次输入确认密码"></el-input>
            </el-form-item>
            <el-form-item label="性别：" prop="fmale">
                <el-col :span="8">
                    <el-form-item >
                        <el-radio-group v-model="create_pw_user_form.fmale">
                            <el-radio border label="男">男</el-radio>
                            <el-radio border label="女">女</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :span="15" :offset="1">
                    <el-form-item label="是否禁用：">
                        <el-tooltip :content="'是否禁用: ' + create_pw_user_form.flag_delete" placement="top">
                            <el-switch
                                v-model="create_pw_user_form.flag_delete"
                                active-color="#13ce66"
                                inactive-color="#ff4949"
                                active-value='false'
                                inactive-value='true'>
                            </el-switch>
                        </el-tooltip>
                        <span v-show="create_pw_user_form.flag_delete === 'false'">未禁用</span>
                        <span v-show="create_pw_user_form.flag_delete === 'true'">已禁用</span>
                    </el-form-item>
                </el-col>
            </el-form-item>          
            <el-form-item label="电子邮箱：" >
                <el-input v-model="create_pw_user_form.email" placeholder="请输入邮箱"></el-input>
            </el-form-item>
            <el-form-item label="手机：" >
                <el-input v-model="create_pw_user_form.phone" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item label="所属用户组：" prop="group_code">
                <el-col :span="8">
                    <el-form-item >
                        <el-select v-model="create_pw_user_form.group_code" placeholder="请选择所属用户组">
                            <el-option v-for="item in groups" :key="item.group_code" :label="item.group_desc" :value="item.group_code">
                                <span class="form-item-left">{{item.group_desc}}</span>
                                <span class="form-item-right">{{item.group_code}}</span>
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="15" :offset="1">
                    <el-form-item label="所属角色：" prop="role_code">
                        <el-select v-model="create_pw_user_form.role_code" placeholder="请选择所属用户组">
                            <el-option v-for="item in roles" :key="item.role_code" :label="item.role_desc" :value="item.role_code">
                                <span class="form-item-left">{{item.role_desc}}</span>
                                <span class="form-item-right">{{item.role_code}}</span>
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label="工厂编号：" prop="factory_num">
                <el-col :span="8">
                    <el-form-item>
                        <el-select v-model="create_pw_user_form.factory_num" placeholder="请选择工厂编号">
                            <el-option v-for="item in factory_nums" :key="item.factory_num" :label="item.factory_num" :value="item.factory_num">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="15" :offset="1">
                    <el-form-item label="仓库编号：" prop="warehouse_num">
                        <el-select v-model="create_pw_user_form.warehouse_num" placeholder="请选择仓库编号">
                            <el-option v-for="item in warehouse_nums" :key="item.warehouse_num" :label="item.warehouse_num" :value="item.warehouse_num">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-form-item>
        </el-form>
        <span>注：<span style="color:red">*</span>部分为必填项</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="cancelCreate">取消</el-button>
            <el-button type="primary" @click="sureCreate('create_pw_user_form')">确定</el-button>
        </span>
    </el-dialog>

    <el-dialog 
        title="修改信息" 
        :visible.sync="Edit_pw_user_Dialog"
        :before-close="handleClose"
        center>
        <el-form ref="edit_pw_user_form" 
            :model="edit_pw_user_form" 
            label-width="120px" 
            label-position="left" 
            :rules="pw_user_form_rules" 
            status-icon>
            <el-form-item label="用户登录名：" prop="loginid">
                <span style="font-weight:bolder">{{edit_pw_user_form.loginid}}</span>
            </el-form-item>           
            <el-form-item label="全名：" prop="fullname">
                <el-input v-model="edit_pw_user_form.fullname" placeholder="请输入真实姓名"></el-input>
            </el-form-item>
            <el-form-item label="登录密码：" prop="password">
                <el-input v-model="edit_pw_user_form.password" placeholder="请输入登录密码"></el-input>
            </el-form-item>
            <el-form-item label="性别：" prop="fmale">
                <el-col :span="8">
                    <el-form-item >
                        <el-radio-group v-model="edit_pw_user_form.fmale">
                            <el-radio border label="男">男</el-radio>
                            <el-radio border label="女">女</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :span="15" :offset="1">
                    <el-form-item label="是否禁用：">
                        <el-tooltip :content="'是否禁用: ' + edit_pw_user_form.flag_delete" placement="top">
                            <el-switch
                                v-model="edit_pw_user_form.flag_delete"
                                active-color="#13ce66"
                                inactive-color="#ff4949"
                                active-value='false'
                                inactive-value='true'>
                            </el-switch>
                        </el-tooltip>
                        <span v-show="edit_pw_user_form.flag_delete === 'false'">未禁用</span>
                        <span v-show="edit_pw_user_form.flag_delete === 'true'">已禁用</span>
                    </el-form-item>
                </el-col>
            </el-form-item>         
            <el-form-item label="电子邮箱：" >
                <el-input v-model="edit_pw_user_form.email" placeholder="请输入邮箱"></el-input>
            </el-form-item>
            <el-form-item label="手机：" >
                <el-input v-model="edit_pw_user_form.phone" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item label="所属用户组：" prop="group_code">
                <el-col :span="8">
                    <el-form-item >
                        <el-select v-model="edit_pw_user_form.group_code" placeholder="请选择所属用户组">
                            <el-option v-for="item in groups" :key="item.group_code" :label="item.group_desc" :value="item.group_code">
                                <span class="form-item-left">{{item.group_desc}}</span>
                                <span class="form-item-right">{{item.group_code}}</span>
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="15" :offset="1">
                    <el-form-item label="所属角色：" prop="role_code">
                        <el-select v-model="edit_pw_user_form.role_code" placeholder="请选择所属用户组">
                            <el-option v-for="item in roles" :key="item.role_code" :label="item.role_desc" :value="item.role_code">
                                <span class="form-item-left">{{item.role_desc}}</span>
                                <span class="form-item-right">{{item.role_code}}</span>
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label="工厂编号：" prop="factory_num">
                <el-col :span="8">
                    <el-form-item>
                        <el-select v-model="edit_pw_user_form.factory_num" placeholder="请选择工厂编号">
                            <el-option v-for="item in factory_nums" :key="item.factory_num" :label="item.factory_num" :value="item.factory_num">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="15" :offset="1">
                    <el-form-item label="仓库编号：" prop="warehouse_num">
                        <el-select v-model="edit_pw_user_form.warehouse_num" placeholder="请选择仓库编号">
                            <el-option v-for="item in warehouse_nums" :key="item.warehouse_num" :label="item.warehouse_num" :value="item.warehouse_num">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-form-item>
        </el-form>
        <span>注：<span style="color:red">*</span>部分为必填项</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="cancelEdit">取消</el-button>
            <el-button type="primary" @click="sureEdit('edit_pw_user_form')">确定</el-button>
        </span>
    </el-dialog>

    <el-dialog title="编辑用户组"
        :visible.sync="addgroup_Dialog"
        width="30%"
        :before-close="handleClose">
        <div class="groupstag">
            <el-tag :key="tag.group_code" 
                v-for="tag in groups"
                closable>
                {{tag.group_desc}}
            </el-tag>
        </div>     
        <el-form ref="addgroups" :model="addgroups" label-width="120px" label-position="left" :rules="pw_user_form_rules" status-icon>
            <el-form-item label="用户组代码：" prop="group_code">
                <el-input v-model="addgroups.group_code" placeholder="请输入用户组代码"></el-input>
            </el-form-item>
            <el-form-item label="用户组描述：" prop="group_desc">
                <el-input v-model="addgroups.group_desc" placeholder="请输入用户组描述"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="addgroup('addgroups')">确认创建</el-button>
            <el-button type="info" @click="addgroup_Dialog = false">取消</el-button>
        </span>
    </el-dialog>

    <el-dialog title="编辑角色组"
        :visible.sync="addrole_Dialog"
        width="30%"
        :before-close="handleClose">
        <div class="groupstag">
            <el-tag :key="tag.role_code" 
                v-for="tag in roles"
                closable>
                {{tag.role_code}}
            </el-tag>
        </div>     
        <el-form ref="addroles" :model="addroles" label-width="120px" label-position="left" :rules="pw_user_form_rules" status-icon>
            <el-form-item label="用户组代码：" prop="role_code">
                <el-input v-model="addroles.role_code" placeholder="请输入角色代码"></el-input>
            </el-form-item>
            <el-form-item label="用户组描述：" prop="role_desc">
                <el-input v-model="addroles.role_desc" placeholder="请输入角色描述"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="addrole('addroles')">确认创建</el-button>
            <el-button type="info" @click="addrole_Dialog = false">取消</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios' 
export default {
  name: "main_G01",  //本页面的组件名，一般定义成路由名一样
  data(){
        //两次密码确认
        var validatePass = (rule, value, callback) => {
           if(value === ''){
               callback(new Error('请输入密码'));
           }else{
               if(this.create_pw_user_form.passwordsure !== ''){
                   this.$refs.create_pw_user_form.validateField('passwordsure');
               }
               callback();
           }
        };
        var validatePass2 = (rule, value, callback) => {
            if(value === ''){
                callback(new Error('请再次输入密码'));
            } else if (value !== this.create_pw_user_form.password){
                callback(new Error('两次输入密码不一致!'))
            }else{
                callback();
            }
        }
        return{
            //创建用户弹窗
            Create_pw_user_Dialog:false,
            //编辑用户弹窗
            Edit_pw_user_Dialog:false,
            //新增组别弹窗
            addgroup_Dialog:false,
            //新增角色弹窗
            addrole_Dialog:false,
            current_group_role:{
                //当前选中的group
                current_group_code:'all',
                //当前选中的role
                current_role_code:'all',                
            }, 
            //当前用户人
            current_user:{
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
            //用户组搜索多选框  
            searchgroups:[{
                group_code:'group1',
                group_desc:'组别1'
            },{
                group_code:'group2',
                group_desc:'组别2'
            },{
                group_code:'all',
                group_desc:'全部用户'
            }],
            //用户组  
            groups:[{
                group_code:'group1',
                group_desc:'组别1'
            },{
                group_code:'group2',
                group_desc:'组别2'
            }],
            //新增组别
            addgroups:{
                group_code:'',
                group_desc:''
            },
            //新增角色
            addroles:{
                group_code:'',
                group_desc:''
            },
            //角色组搜索多选框
            searchroles:[{
                role_code:'role1',
                role_desc:'角色1'
            },{
                role_code:'role2',
                role_desc:'角色2'
            },{
                role_code:'all',
                role_desc:'全部角色'
            }],
            //角色组
            roles:[{
                role_code:'role1',
                role_desc:'角色1'
            },{
                role_code:'role2',
                role_desc:'角色2'
            }],
            //工厂编号
            factory_nums:[{
                factory_num:'01'
            },{
                factory_num:'02'
            },{
                factory_num:'03'
            }],
            //仓库编号
            warehouse_nums:[{
                warehouse_num:'01'
            },{
                warehouse_num:'02'
            },{
                warehouse_num:'03'
            }],
            //搜索栏里的内容，idorname是搜索的类型是ID还是登录名，inputcontent是搜索的内容
            searchcontent:{
              idorname:'loginid',
              inputcontent:''
            },
            //pw_user表格内容,测试专用
            /*
            pw_user_table:[{
                    user_id:'104',
                    loginid:'rbf',
                    fullname:'傅明东',
                    password:'1234',
                    group_code:'superadmin',
                    group_desc:'超级用户组',
                    role_code:'superUserRole',
                    role_desc:'超级管理员',
                    super_user:'True',
                    fmale:'男',
                    email:'huaxiao168@126.com',
                    phone:'15802148508',
                    login_count:'0',
                    t_register:'2018-04-15 18:54:39.533',
                    t_lastlogin:'2018-12-31 23:59:59.997',
                    u_create_name:'系统自动',
                    u_create_id:'system',
                    t_create:'2018-04-15 18:54:39.533',
                    u_update_name:'系统自动',
                    u_update_id:'system',
                    t_update:'2018-04-15 18:54:39.533',
                    flag_delete:'false',
                    age:'0',
                    factory_num:'01',
                    warehouse_num:'01',
                    class_shift:'0',
                    labor_level:'0'
                },{
                    user_id:'104',
                    loginid:'rbf',
                    fullname:'傅明东',
                    password:'1234',
                    group_code:'superadmin',
                    group_desc:'超级用户组',
                    role_code:'superUserRole',
                    role_desc:'超级管理员',
                    super_user:'True',
                    fmale:'男',
                    email:'huaxiao168@126.com',
                    phone:'15802148508',
                    login_count:'0',
                    t_register:'2018-04-15 18:54:39.533',
                    t_lastlogin:'2018-12-31 23:59:59.997',
                    u_create_name:'系统自动',
                    u_create_id:'system',
                    t_create:'2018-04-15 18:54:39.533',
                    u_update_name:'系统自动',
                    u_update_id:'system',
                    t_update:'2018-04-15 18:54:39.533',
                    flag_delete:'false',
                    age:'0',
                    factory_num:'01',
                    warehouse_num:'01',
                    class_shift:'0',
                    labor_level:'0'
                },{
                    user_id:'104',
                    loginid:'rbf',
                    fullname:'傅明东',
                    password:'1234',
                    group_code:'superadmin',
                    group_desc:'超级用户组',
                    role_code:'superUserRole',
                    role_desc:'超级管理员',
                    super_user:'True',
                    fmale:'男',
                    email:'huaxiao168@126.com',
                    phone:'15802148508',
                    login_count:'0',
                    t_register:'2018-04-15 18:54:39.533',
                    t_lastlogin:'2018-12-31 23:59:59.997',
                    u_create_name:'系统自动',
                    u_create_id:'system',
                    t_create:'2018-04-15 18:54:39.533',
                    u_update_name:'系统自动',
                    u_update_id:'system',
                    t_update:'2018-04-15 18:54:39.533',
                    flag_delete:'false',
                    age:'0',
                    factory_num:'01',
                    warehouse_num:'01',
                    class_shift:'0',
                    labor_level:'0'
                },{
                    user_id:'104',
                    loginid:'rbf',
                    fullname:'傅明东',
                    password:'1234',
                    group_code:'superadmin',
                    group_desc:'超级用户组',
                    role_code:'superUserRole',
                    role_desc:'超级管理员',
                    super_user:'True',
                    fmale:'男',
                    email:'huaxiao168@126.com',
                    phone:'15802148508',
                    login_count:'0',
                    t_register:'2018-04-15 18:54:39.533',
                    t_lastlogin:'2018-12-31 23:59:59.997',
                    u_create_name:'系统自动',
                    u_create_id:'system',
                    t_create:'2018-04-15 18:54:39.533',
                    u_update_name:'系统自动',
                    u_update_id:'system',
                    t_update:'2018-04-15 18:54:39.533',
                    flag_delete:'false',
                    age:'0',
                    factory_num:'01',
                    warehouse_num:'01',
                    class_shift:'0',
                    labor_level:'0'
                },{
                    user_id:'104',
                    loginid:'rbf',
                    fullname:'傅明东',
                    password:'1234',
                    group_code:'superadmin',
                    group_desc:'超级用户组',
                    role_code:'superUserRole',
                    role_desc:'超级管理员',
                    super_user:'True',
                    fmale:'男',
                    email:'huaxiao168@126.com',
                    phone:'15802148508',
                    login_count:'0',
                    t_register:'2018-04-15 18:54:39.533',
                    t_lastlogin:'2018-12-31 23:59:59.997',
                    u_create_name:'系统自动',
                    u_create_id:'system',
                    t_create:'2018-04-15 18:54:39.533',
                    u_update_name:'系统自动',
                    u_update_id:'system',
                    t_update:'2018-04-15 18:54:39.533',
                    flag_delete:'false',
                    age:'0',
                    factory_num:'01',
                    warehouse_num:'01',
                    class_shift:'0',
                    labor_level:'0'
                },{
                    user_id:'104',
                    loginid:'rbf',
                    fullname:'傅明东',
                    password:'1234',
                    group_code:'superadmin',
                    group_desc:'超级用户组',
                    role_code:'superUserRole',
                    role_desc:'超级管理员',
                    super_user:'True',
                    fmale:'男',
                    email:'huaxiao168@126.com',
                    phone:'15802148508',
                    login_count:'0',
                    t_register:'2018-04-15 18:54:39.533',
                    t_lastlogin:'2018-12-31 23:59:59.997',
                    u_create_name:'系统自动',
                    u_create_id:'system',
                    t_create:'2018-04-15 18:54:39.533',
                    u_update_name:'系统自动',
                    u_update_id:'system',
                    t_update:'2018-04-15 18:54:39.533',
                    flag_delete:'false',
                    age:'0',
                    factory_num:'01',
                    warehouse_num:'01',
                    class_shift:'0',
                    labor_level:'0'
                },{
                    user_id:'104',
                    loginid:'rbf',
                    fullname:'傅明东',
                    password:'1234',
                    group_code:'superadmin',
                    group_desc:'超级用户组',
                    role_code:'superUserRole',
                    role_desc:'超级管理员',
                    super_user:'True',
                    fmale:'男',
                    email:'huaxiao168@126.com',
                    phone:'15802148508',
                    login_count:'0',
                    t_register:'2018-04-15 18:54:39.533',
                    t_lastlogin:'2018-12-31 23:59:59.997',
                    u_create_name:'系统自动',
                    u_create_id:'system',
                    t_create:'2018-04-15 18:54:39.533',
                    u_update_name:'系统自动',
                    u_update_id:'system',
                    t_update:'2018-04-15 18:54:39.533',
                    flag_delete:'true',
                    age:'0',
                    factory_num:'01',
                    warehouse_num:'01',
                    class_shift:'0',
                    labor_level:'0'
            }],
            */
            //用户创建弹窗
            create_pw_user_form:{
                loginid:'',
                fullname:'',
                password:'',
                passwordsure:'',
                group_code:'',
                group_desc:'',
                role_code:'',
                role_desc:'',
                super_user:'',
                fmale:'女',
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
                labor_level:'0'
            },
            //验证规则
            pw_user_form_rules:{
                loginid:[
                    {required: true, message: '请输入活动名称', trigger: 'blur'}
                ],
                fullname:[
                    {required: true, message: '请输入真实姓名', trigger: 'blur'}
                ],
                password:[
                    {required: true, message:'请输入密码', trigger:'blur'},
                    {validator: validatePass, trigger: 'blur'},
                    {pattern:/^[0-9]{8}$/, message:'请输入8位数字'}
                ],
                passwordsure:[
                    {required: true, message:'请再次输入密码', trigger:'blur'},
                    {validator: validatePass2, trigger: 'blur'},
                    {pattern:/^[0-9]{8}$/, message:'请输入8位数字'}
                ],
                fmale:[
                    {required: true, message:'性别不能为空', trigger:'blur'}
                ],
                age:[
                    {required: true, message:'年龄不能为空', trigger:'blur'}
                ],
                
                email:[
                    {required: true, message: '请输入邮箱', trigger: 'blur'},
                    {pattern:/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/, message:'请输入正确的邮箱格式'}
                ],
                phone:[
                    {required: true, message: '请输入手机号', trigger: 'blur'},
                    {pattern: /^1[34578]\d{9}$/, message:'目前只支持中国的手机'}
                ],
                group_code:[
                    {required: true, message:'用户组代码不能为空', trigger: 'blur'}
                ],
                group_desc:[
                    {required: true, message:'用户组描述不能为空', trigger: 'blur'}
                ],
                role_code:[
                    {required: true, message:'角色代码不能为空', trigger: 'blur'}
                ],
                role_desc:[
                    {required: true, message:'角色描述不能为空',trigger: 'blur'}
                ],
                factory_num:[
                    {required: true, message:'工厂编号不能为空',trigger: 'blur'}
                ],
                warehouse_num:[
                    {required: true, message:'仓库编号不能为空',trigger: 'blur'}
                ]
            },
            edit_pw_user_form:{
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
                labor_level:'0'
            },
            //选中的项
            multipleSelection: []
        }
    },
    methods:{
        //全选,反选
        handleSelectionChange(val) {
            this.$store.commit('setcurrentTime'); 
            this.multipleSelection = val;
        },
        //创建事件 清空创建列表
        Create_pw_user(){
            this.$store.commit('setcurrentTime'); 
           /* this.create_pw_user_form.loginid = '';
            this.create_pw_user_form.fullname = '';
            this.create_pw_user_form.password = '';
            this.create_pw_user_form.passwordsure = '';
            this.create_pw_user_form.fmale = '';
            this.create_pw_user_form.flag_delete = false;
            this.create_pw_user_form.email = '';
            this.create_pw_user_form.phone = '';
            this.create_pw_user_form.group_code = '';
            this.create_pw_user_form.role_code = '';
            this.create_pw_user_form.factory_num = '';
            this.create_pw_user_form.warehouse_num = '';   */     
            this.Create_pw_user_Dialog = true; 
            //打开对话框先将表单验证值重置
            this.$refs['create_pw_user_form'].resetFields();         
        },
        //编辑事件 编辑列表每项对应表内容
        handleEdit(index, row){
            this.$store.commit('setcurrentTime'); 
            this.edit_pw_user_form.user_id = row.user_id;
            this.edit_pw_user_form.loginid = row.loginid;
            this.edit_pw_user_form.fullname = row.fullname;
            this.edit_pw_user_form.password = row.password;
            this.edit_pw_user_form.fmale = row.fmale;
            this.edit_pw_user_form.email = row.email;
            this.edit_pw_user_form.phone = row.phone;
            this.edit_pw_user_form.group_code = row.group_code;
            this.edit_pw_user_form.role_code = row.role_code;
            this.edit_pw_user_form.factory_num = row.factory_num;
            this.edit_pw_user_form.warehouse_num = row.warehouse_num;
            this.edit_pw_user_form.flag_delete = row.flag_delete;
            this.edit_pw_user_form.u_create_name = row.u_create_name;
            this.edit_pw_user_form.u_create_id = row.u_create_id;
            this.Edit_pw_user_Dialog = true;
        },
        //删除
        handleDelete(index, row){
            this.$store.commit('setcurrentTime'); 
            this.$confirm('确认删除？','提示',{
                confirmButtonText:'确定',
                cancelButton:'取消',
                type:'warning'
            }).then(() => {
                var _this = this;
                axios.post("http://localhost/TRX/api/pw_user/Delete/" + row.user_id)
                .then(function(res){
                    _this.$message({
                        type:'success',
                        message:'删除成功！'
                    });
                    //再次获取数据 刷新
                    _this.$store.dispatch('get_pw_user_table',_this.current_group_role);
                }).catch(function(Error){
                    _this.$message({
                        type:'danger',
                        message:Error
                    });
                });
            })
            .catch(() => {
                this.$message({
                    type:'info',
                    message:'取消删除'
                })
            });               
        },
        //点击页数
        handleCurrentChange(val){
            this.$store.commit('setcurrentTime'); 
            alert(`当前页: ${val}`);
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
        //取消创建
        cancelCreate(){
            this.$store.commit('setcurrentTime'); 
            this.Create_pw_user_Dialog = false;
        },
        //取消编辑
        cancelEdit(){
            this.$store.commit('setcurrentTime'); 
            this.Edit_pw_user_Dialog = false;
        },
        //确定创建
        sureCreate(formName){
            this.$store.commit('setcurrentTime'); 
            //validate是校验，返回值valid。
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    //_this指代data里面的this
                    var _this = this;
                    var data = _this.create_pw_user_form;
                    //desc对应code                  
                    this.groups.forEach(function(item){
                        if(item.group_code == data.group_code){
                            data.group_desc = item.group_desc;
                        }
                    });
                    this.roles.forEach(function(item){
                        if(item.role_code == data.role_code){
                            data.role_desc = item.role_desc;
                        }
                    });
                    //判断当前人是不是游客，不是就把当前人的信息传入后台
                    if(this.current_user.fullname != "游客"){
                        data.u_create_name = this.current_user.loginid;
                        data.u_create_id = this.current_user.user_id;
                        console.log(data.u_create_name);
                    }else{

                    };
                    //判断是否是超级管理员
                    if(data.role_code == "superadmin"){
                        data.super_user = true;
                    }else{
                        data.super_user = false;
                    };
                    console.log(data.super_user);
                    this.$confirm('确定创建新用户吗','提示',{
                        confirmButtonText:'确定',
                        cancelButton:'取消',
                        type:'warning'
                    }).then(() => {
                        //__this指代then里面的this
                        var __this = this;
                        axios.post("http://localhost/TRX/api/AuthPower/AddUser", data)
                        .then(function(res){
                            _this.Create_pw_user_Dialog = false;
                            __this.$message({
                                type:'success',
                                message:'创建成功!'
                            });
                            //再次获取数据
                            _this.$store.dispatch('get_pw_user_table',_this.current_group_role);
                            //重置表单
                            _this.$refs[formName].resetFields();
                        })
                        .catch(function(Error){
                            alert(Error);
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
                } else {
                    return false;
                }
            });     
        },
        //确定修改
        sureEdit(formName){
            this.$store.commit('setcurrentTime'); 
            //validate是校验，返回值valid。
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    var _this = this;
                    //desc对应code                  
                    this.groups.forEach(function(item){
                        if(item.group_code == _this.edit_pw_user_form.group_code){
                            _this.edit_pw_user_form.group_desc = item.group_desc;
                        }
                    });
                    this.roles.forEach(function(item){
                        if(item.role_code == _this.edit_pw_user_form.role_code){
                            _this.edit_pw_user_form.role_desc = item.role_desc;
                        }
                    });
                    //判断当前人是不是游客，不是就把当前人的信息传入后台
                    if(this.current_user.fullname != "游客"){
                        _this.edit_pw_user_form.u_update_name = this.current_user.loginid;
                        _this.edit_pw_user_form.u_update_id = this.current_user.user_id;
                        console.log(_this.edit_pw_user_form.u_update_name);
                    }else{

                    };
                    this.$confirm('确定修改数据吗','提示',{
                        confirmButtonText:'确定',
                        cancelButton:'取消',
                        type:'warning'
                    }).then(() => {
                        axios.post("http://localhost/TRX/api/pw_user/update", _this.edit_pw_user_form)
                        .then(function(res){
                            _this.$message({
                                type:'success',
                                message:'修改成功！'
                            });
                            //再次获取数据
                            _this.$store.dispatch('get_pw_user_table',_this.current_group_role);
                            _this.Edit_pw_user_Dialog = false;
                        }).catch(function(Error){
                            _this.$message({
                                type:'danger',
                                message:Error
                            });
                            console.log(Error);
                        });            
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
        //删除选择元素
        delete_pw_user(){
            this.$store.commit('setcurrentTime'); 
            this.$confirm('此操作将永久删除数据，是否继续？','提示',{
                confirmButtonText:'确定',
                cancelButton:'取消',
                type:'warning'
            }).then(() => {
                var _this = this;
                this.multipleSelection.forEach(function(item){
                    axios.post("http://localhost/TRX/api/pw_user/Delete/" + item.user_id)
                    .then(function(res){
                        _this.$message({
                            type:'success',
                            message:'删除成功！'
                        });
                        //再次获取数据
                        _this.$store.dispatch('get_pw_user_table',_this.current_group_role);
                    }).catch(function(Error){
                        _this.$message({
                            type:'danger',
                            message:Error
                        });
                    });
                });
                
            }).catch(() => {
                this.$message({
                    type:'info',
                    message:'已取消删除'
                });
            });         
        },
        //新增用户组
        addgroup(formName) {
            this.$store.commit('setcurrentTime'); 
            //validate是校验，返回值valid。
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.groups.push(this.addgroups);
                } else {
                    return false;
                }
            });
        },
        //新增角色组
        addrole(formName) {
            this.$store.commit('setcurrentTime'); 
            //validate是校验，返回值valid。
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.roles.push(this.addroles);
                } else {
                    return false;
                }
            });
        },
        groupchange(){
            this.$store.commit('setcurrentTime'); 
            //多选框值改变时发送当前选中值重新加载
            this.$store.dispatch('get_pw_user_table',this.current_group_role);
        },
        //搜索
        searchpw_user(){
            this.$store.commit('setcurrentTime'); 
            this.$store.dispatch('searchpw_user_table',this.searchcontent);
        },
        //刷新
        refreshpw_user(){
            this.$store.commit('setcurrentTime'); 
            this.$store.dispatch('get_pw_user_table',this.current_group_role);
        },
        //全部刷新
        refresh_pw_user(){
            this.$store.commit('setcurrentTime'); 
            this.current_group_role.current_group_code = "all";
            this.current_group_role.current_role_code = "all";
            this.$store.dispatch('get_pw_user_table',this.current_group_role);
        }
    },
    computed:{
        //pw_user_table是pw_user的表格内容
        pw_user_table(){
            return this.$store.state.pw_user_table;
        }
    },
    mounted(){
        //当前用户等于本地存储用户
        this.current_user = window.sessionStorage;
        //页面第一次载入加载值
        this.$store.dispatch('get_pw_user_table',this.current_group_role);
    }
}
</script>
<style scope>
  .el-select.inner .el-input{
    width: 100px;
    color: #009900;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #e5fff2;
  }
  .form-item-left{
      float: left;
  }
  .form-item-right{
      float: right;
      color: #8492a6;
      font-size: 13px;
  }
  .groupstag{
      margin-bottom: 20px;
  }
  .el-tag + .el-tag {
    margin-left: 10px;
  }
</style>