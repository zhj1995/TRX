<template>
  <div>
    <el-row>
		<el-col :span="16" :offset="4">
			<el-card class="box-card logincard">
				<el-row>
                    <el-col :span="8" :offset="8">
                        <div style="text-align:center; font-size:20px; font-weight: bolder">登录同日账号</div>
                        <el-form ref="form" :model="form" label-width="80px" label-position="left" style="margin-top:40px" :rules="rules">
                            <el-form-item label="账号" prop="loginid">
                                <el-input v-model="form.loginid" placeholder="请输入用户名"></el-input>
                            </el-form-item>
                            <el-form-item label="密码" prop="password">
                                <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
                            </el-form-item>
                        </el-form>
                        <el-row>
                            <el-col :span="10">
                                <el-button type="primary" style="margin-left:80px" @click="push('form')">登录</el-button>
                            </el-col>
                            <el-col :span="5" :offset="1">
                                <el-button @click="refresh('form')">重置</el-button>
                            </el-col>
                            <el-col :span="6" :offset="1">
                                <el-button @click="vispush">游客登录</el-button>
                            </el-col>
                        </el-row>                     
                    </el-col>
                </el-row>
			</el-card>
		</el-col>
	</el-row>
  </div>
</template>

<script>
import axios from 'axios' 
export default {
  data(){
      return{
          form:{
              loginid:'',
              password:''
          },
          rules:{
              loginid:[
                  { required: true, message: '请输入用户id', trigger: 'blur'}
              ],
              password:[
                  { required: true, message: '请输入密码', trigger: 'blur'}
              ]
          },
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
        }
      }
  },
  methods:{
        push(formname){
            this.$refs[formname].validate((valid) => {
                if(valid){
                    var _this = this;
                    axios.post("http://localhost/TRX/api/login",_this.form)
                    .then(function(res){
                        //将登录人信息存储至本地window.sessionStorage
                        console.log(res.data[0].user_id);
                        _this.user = window.sessionStorage;
                        _this.user.user_id = res.data[0].user_id;
                        _this.user.loginid = res.data[0].loginid;
                        _this.user.fullname = res.data[0].fullname;
                        _this.user.password = res.data[0].password;
                        _this.user.group_code = res.data[0].group_code;
                        _this.user.group_desc = res.data[0].group_desc;
                        _this.user.role_code = res.data[0].role_code;
                        _this.user.role_desc = res.data[0].role_desc;
                        _this.user.super_user = res.data[0].super_user;
                        _this.user.fmale = res.data[0].fmale;
                        _this.user.email = res.data[0].email;
                        _this.user.phone = res.data[0].phone;
                        _this.user.login_count = res.data[0].login_count;
                        _this.user.u_create_name = res.data[0].u_create_name;
                        _this.user.u_create_id = res.data[0].u_create_id;
                        _this.user.u_update_name = res.data[0].u_update_name;
                        _this.user.u_update_id = res.data[0].u_update_id;
                        _this.user.flag_delete = res.data[0].flag_delete;
                        _this.user.age = res.data[0].age;
                        _this.user.factory_num = res.data[0].factory_num;
                        _this.user.warehouse_num = res.data[0].warehouse_num;
                        _this.user.class_shift = res.data[0].class_shift;
                        _this.user.labor_level = res.data[0].labor_level;
                        _this.$router.push('/main/home');
                    }).catch(function(Error){
                        if(Error.message == "res.data is null"){
                            _this.$alert('用户名或密码错误！','错误',{
                                confirmButtonText:'确定',
                                type:'error'
                            });
                        }else{
                            _this.$alert(Error,'错误',{
                                confirmButtonText:'确定',
                                type:'error'
                            });
                        }
                    });
                }else{
                    return false;
                }
            })                 
        },
        refresh(formname){
            this.$refs[formname].resetFields();
        },
        vispush(){
            this.$store.commit('setcurrentTime');
            this.$store.commit('timeoutclear');
        }
  }
}
</script>

<style scoped>
    .logincard{
        margin-top: 150px;
        padding: 40px 12px;
        height: 340px;
        background-color: #f2f2f2;
        border: 1px solid #bfbfbf;
    }

</style>


