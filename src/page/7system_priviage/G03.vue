<template>
  <div>
    <div v-if="user.fullname != '游客'">
      <el-card>
      <div slot="header">
        <span style="font-weight:bolder; font-size:20px">个人信息</span>
         <el-button style="float: right; padding: 3px 0;font-weight:bolder; font-size:20px" type="text" @click="push">提交修改</el-button>
      </div>
      <el-form ref="user" :model="user" label-width="150px" label-position="left" :rules="rules" status-icon>
        <el-form-item label="用户ID :" class="user-item">
          <span>{{user.user_id}}</span>
        </el-form-item>
        <el-form-item label="用户名 :"  class="user-item">
          <span>{{user.loginid}}</span>
        </el-form-item>
        <el-form-item label="用户全名 :" prop="fullname"  class="user-item">
          <el-row v-if="editfullname">
            <el-col :span="20">
              <el-input v-model="user.fullname"></el-input>
            </el-col>
            <el-col :span="2" :offset="2">
              <el-button type="primary"  @click="sure('fullname')" size="small">确定</el-button>
            </el-col>
          </el-row>
          <el-row v-else>
            <el-col :span="20">
              <span>{{user.fullname}}</span>
            </el-col>
            <el-col :span="2" :offset="2">
              <el-button type="danger" @click="editfullname = true" size="small">编辑</el-button>
            </el-col>
          </el-row>           
        </el-form-item>

        <el-form-item label="用户密码 :" prop="password"  class="user-item">
          <el-row v-if="editpassword">
            <el-col :span="20">
              <el-input v-model="user.password"></el-input>
            </el-col>
            <el-col :span="2" :offset="2">
              <el-button type="primary"  @click="sure('password')" size="small">确定</el-button>
            </el-col>
          </el-row>
          <el-row v-else>
            <el-col :span="20">
              <span>{{user.password}}</span>
            </el-col>
            <el-col :span="2" :offset="2">
              <el-button type="danger"  @click="editpassword = true" size="small">编辑</el-button>
            </el-col>
          </el-row>           
        </el-form-item>

        <el-form-item label="用户性别 :" prop="fmale"  class="user-item">
          <el-row v-if="editfmale">
            <el-col :span="20">
              <el-select v-model="user.fmale" style="width:100%">
               <el-option value="男">男</el-option> 
               <el-option value="女">女</el-option> 
              </el-select>
            </el-col>
            <el-col :span="2" :offset="2">
              <el-button type="primary" @click="editfmale = false" size="small">确定</el-button>
            </el-col>
          </el-row>
          <el-row v-else>
            <el-col :span="20">
              <span>{{user.fmale}}</span>
            </el-col>
            <el-col :span="2" :offset="2">
              <el-button type="danger" @click="editfmale = true" size="small">编辑</el-button>
            </el-col>
          </el-row>           
        </el-form-item>

        <el-form-item label="邮件 :" prop="email"  class="user-item">
          <el-row v-if="editemail">
            <el-col :span="20">
              <el-input v-model="user.email"></el-input>
            </el-col>
            <el-col :span="2" :offset="2">
              <el-button type="primary" @click="sure('email')" size="small">确定</el-button>
            </el-col>
          </el-row>
          <el-row v-else>
            <el-col :span="20">
              <span>{{user.email}}</span>
            </el-col>
            <el-col :span="2" :offset="2">
              <el-button type="danger" @click="editemail = true" size="small">编辑</el-button>
            </el-col>
          </el-row>           
        </el-form-item>

        <el-form-item label="手机 :" prop="phone"  class="user-item">
          <el-row v-if="editphone">
            <el-col :span="20">
              <el-input v-model="user.phone"></el-input>
            </el-col>
            <el-col :span="2" :offset="2">
              <el-button type="primary" @click="sure('phone')" size="small">确定</el-button>
            </el-col>
          </el-row>
          <el-row v-else>
            <el-col :span="20">
              <span>{{user.phone}}</span>
            </el-col>
            <el-col :span="2" :offset="2">
              <el-button type="danger" @click="editphone = true" size="small">编辑</el-button>
            </el-col>
          </el-row>           
        </el-form-item>
        <el-form-item label="用户组 :"  class="user-item">
          <span>{{user.group_desc}}</span>
        </el-form-item>
        <el-form-item label="用户角色 :"  class="user-item">
          <span>{{user.role_desc}}</span>
        </el-form-item>
        <el-form-item label="工厂编号 :"  class="user-item">
          <span>{{user.factory_num}}</span>
        </el-form-item>
        <el-form-item label="仓库编号 :"  class="user-item">
          <span>{{user.warehouse_num}}</span>
        </el-form-item>
        <el-form-item label="班别 :"  class="user-item">
          <span>{{user.class_shift}}</span>
        </el-form-item>
        <el-form-item label="劳工等级 :"  class="user-item">
          <span>{{user.labor_level}}</span>
        </el-form-item>
      </el-form>
      </el-card>
    </div>
    <div v-else>
      <span>您所在游客组无权访问该内容</span>
    </div>
      
  </div>
</template>

<script>
import axios from 'axios'
export default {
   name: "main_G03",  //本页面的组件名，一般定义成路由名一样
   data(){
     return{
       user:{
        user_id:'11',
        loginid:'213',
        fullname:'wqe',
        password:'wqe',
        group_code:'qwe',
        group_desc:'wqe',
        role_code:'wqe',
        role_desc:'wqe',
        super_user:'wqe',
        fmale:'女',
        email:'wqeqwe',
        phone:'qwe',
        login_count:'wqe',
        u_create_name:'qwe',
        u_create_id:'qwe',
        u_update_name:'qwe',
        u_update_id:'qwe',
        flag_delete:'false',
        age:1,
        factory_num:'qwe',
        warehouse_num:'eqw',
        class_shift:'0',
        labor_level:'0'
       },
       rules:{
        fullname:[
          {required: true, message: '请输入真实姓名', trigger: 'blur'}
        ],
        password:[
          {required: true, message:'请输入密码', trigger:'blur'},
          {pattern:/^[0-9]{8}$/, message:'请输入8位数字'}
        ],
        email:[
          {required: true, message: '请输入邮箱', trigger: 'blur'}
        ],
        phone:[
          {required: true, message: '请输入手机号', trigger: 'blur'}
        ]
       },
       editfullname:false,
       editpassword:false,
       editfmale:false,
       editemail:false,
       editphone:false,
     }
   },
   methods:{
     sure(a){
       this.$store.commit('setcurrentTime'); 
       this.$refs['user'].validate((valid) => {
         if(valid){
           if(a == 'fullname'){
             this.editfullname = false;
           }else if(a == 'password'){
             this.editpassword = false;
           }else if(a == 'email'){
             this.editemail = false;
           }else{
             this.editphone = false;
           }          
         }else{
           return false;
         }
       })
     },
     push(){
       this.$store.commit('setcurrentTime'); 
       var _this = this;
       this.user.u_update_name = this.user.loginid;
       this.user.u_update_id = this.user.user_id;
       this.$confirm('确定提交数据吗','提示',{
            confirmButtonText:'确定',
            cancelButton:'取消',
            type:'warning'
        }).then(() => {
            axios.post("http://localhost/TRX/api/pw_user/update", _this.user)
            .then(function(res){
                _this.$message({
                    type:'success',
                    message:'修改成功！'
                });
            }).catch(function(Error){
                _this.$message({
                    type:'danger',
                    message:Error
                });
            });            
        }).catch(() => {
            this.$message({
                type:'info',
                message:'提交取消'
            });
        });
     }
   },
   mounted(){
     this.user = window.sessionStorage;
   }
   
}
</script>
<style>
.user-item.user-item{
  margin-bottom: 5px;
}
.el-form-item__label{
  font-weight: bolder;
}
</style>