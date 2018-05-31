<template>
    <div class="datatable">
        <el-row :span="24" style="margin-bottom:20px;">
            <el-col :span="5">
                <el-button-group>
                    <el-button type="primary" icon="el-icon-edit" @click="Create" size="small">新建</el-button>
                    <el-button type="danger" icon="el-icon-delete" @click="SelectDelete" size="small">删除</el-button>
                    <el-button type="info" icon="el-icon-refresh" @click="refreshData" size="small">刷新</el-button>
                </el-button-group>
            </el-col>
            <el-col :span="4" :offset="1">
                <slot name="select1"></slot>
            </el-col>
            <el-col :span="4" :offset="1">
                <slot name="select2"></slot>
            </el-col>
            <el-col :span="7" :offset="1">
                <slot name="search"></slot>
            </el-col>
        </el-row>

        <el-table
            border
            size="mini"
            stripe
            :data="table_data"             
            style="width:100%"
            @selection-change = "handleSelectionChange">
            <el-table-column fixed type="selection" width="55">
            </el-table-column>
            <el-table-column v-for="item in sys_tbl_clmn" :key="item.column_field" :prop="item.column_field" :label="item.column_desc" width="180">
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
            :visible.sync="Create_dialog"
            center
            :before-close="handleClose">
            <el-form ref="Create_form"
                :model="Create_form"
                label-width="140px"
                label-position="left"
                :rules="rule"
                status-icon>
                <!--先根据条件判断表判断是否显示，次判断值是否允许为空值，最后判断值是否是下拉框-->
                <el-form-item v-for="item in condition_form" :key="item.name" v-if="item.value" :prop="item.allow" :label="item.label + ':'">
                <el-select v-model="Create_form[item.name]" style="width:100%" v-if="item.droplist">
                    <el-option v-for="items in condition_drop[item.name]" :key="items" :label="items" :value="items"></el-option>
                </el-select>
                <el-input-number v-model="Create_form[item.name]" v-else-if="item.type == 'int'"></el-input-number>
                <el-input v-model="Create_form[item.name]" v-else></el-input>
                </el-form-item>
            </el-form>
            <span>注：<span style="color:red">*</span>部分为必填项</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="sureCreate('Create_form')">确认创建</el-button>
                <el-button type="info" @click="cancelCreate('Create_form')">取消</el-button>
            </span>
        </el-dialog>

        <el-dialog
            title="修改"
            :visible.sync="Edit_dialog"
            center
            :before-close="handleClose">
            <el-form ref="Edit_form"
                :model="Edit_form"
                label-width="140px"
                label-position="left"
                :rules="rule"
                status-icon>
                <el-form-item v-for="item in condition_form" :key="item.name" v-if="item.value" :prop="item.allow" :label="item.label + ':'">
                <el-select v-model="Edit_form[item.name]" style="width:100%" v-if="item.droplist">
                    <el-option v-for="items in condition_drop[item.name]" :key="items" :label="items" :value="items"></el-option>
                </el-select>
                <el-input-number v-model="Edit_form[item.name]" v-else-if="item.type == 'int'"></el-input-number>
                <el-input v-model="Edit_form[item.name]" v-else></el-input>
                </el-form-item>
            </el-form>
            <span>注：<span style="color:red">*</span>部分为必填项</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="sureEdit('Edit_form')">确认修改</el-button>
                <el-button type="info" @click="cancelEdit('Edit_form')">取消</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    props:['table_data','sys_tbl_clmn','getData','Createsrc','current_group_role','Editsrc','Deletesrc','U_id'],
    data(){
        return{
            //选中的项
            multipleSelection:[],
            //当前表名
            current_tb:{
                current_tb_name:'pw_user',
                current_name:'',
                current_id:''
            },
            //创建输入框
            Create_dialog:false,
            //修改输入框
            Edit_dialog:false,
            //创建表单
            Create_form:{},
            //修改表单
            Edit_form:{},
            //条件判断表
            condition_form:[],
            //条件判断项
            condition_form_list:{},
            //下拉框内容
            condition_drop:{},
            //校验规则
            rule:{},
        }
    },
    methods:{
        handleSelectionChange(val){
            this.multipleSelection = val;
        },
        handleEdit(index,row){
            this.Edit_dialog = true;
            //编辑表等于项
            for(var key1 in row){
                for(var key2 in this.Edit_form){
                    if(key1 == key2){
                        this.Edit_form[key2] = row[key1];         
                    }
                }
            }
        },
        cancelCreate(formName){
            this.Create_dialog = false;
            this.resetForm(formName);
        },
        cancelEdit(formName){
            this.Edit_dialog = false;
            this.resetForm(formName);
        },
        handleDelete(index,row){
            this.$confirm('确认删除?','提示',{
                confirmButtonText:'确定',
                cancelButton:'取消',
                type:'warning'
            }).then(() => {
                var _this = this;
                axios.post(_this.Deletesrc + row[_this.U_id])
                .then(function(res){
                _this.$message({
                    type:'success',
                    message:'删除成功!'
                });
                //刷新
                _this.$store.dispatch(_this.getData,_this.current_group_role);
                })
                .catch(function(Error){
                _this.$message({
                    type:'danger',
                    message:'错误!'
                });
                console.log(Error);
                })
            }).catch(() => {
                this.$message({
                type:'info',
                message:'取消'
                });
            })
        },
        SelectDelete(){
            this.$confirm('确认删除?','提示',{
                confirmButtonText:'确定',
                cancelButton:'取消',
                type:'warning'
            }).then(() => {
                var _this = this;
                this.multipleSelection.forEach(function(item){
                axios.post(_this.Deletesrc + item[_this.U_id])
                .then(function(res){
                })
                .catch(function(Error){
                    console.log(Error);
                })
                })
                this.$store.dispatch(this.getData,this.current_group_role);
                this.$message({
                type:'success',
                message:'删除成功!'
                });
            }).catch(() => {
                this.$message({
                type:'info',
                message:'取消'
                });
            })
        },
        //弹窗关闭触发
        handleClose(done){ 
        this.$confirm('确认关闭？')
            .then(_=> {
                done();
                this.resetForm('Create_form');
            })
            .catch(_=> {
            });
        },
        //重置表单
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        //打开创建对话框
        Create(){
            this.Create_dialog = true;
        },
        sureCreate(formname){
            //validate是校验，返回值valid。
            this.$refs[formname].validate((valid) => {
                if(valid){
                    var data = this.Create_form;
                    data.u_create_name = window.sessionStorage.loginid;
                    data.u_create_id = window.sessionStorage.user_id;
                    this.$confirm('确认创建？','提示',{
                        confirmButtonText:'确定',
                        cancelButton:'取消',
                        type:'warning'
                    }).then(() => {
                        var _this = this;
                        axios.post(_this.Createsrc, data)
                        .then(function(res){
                        _this.Create_dialog = false;
                        _this.$message({
                            type:'success',
                            message:'创建成功!'
                        });
                        //刷新
                        _this.$store.dispatch(_this.getData,_this.current_group_role);
                        //还原表单
                        for(var key in _this.Create_form){
                            _this.Create_form[key] = '';
                        }
                        //验证项重置
                        _this.resetForm(formname);        
                        })
                        .catch(function(Error){
                        _this.$message({
                            type:'danger',
                            message:'错误!'  
                        })
                        console.log(Error);
                        })
                    }).catch(() => {
                        this.$message({
                        type:'info',
                        message:'创建取消'
                        });
                        this.Create_dialog = false;
                    });
                } else {
                    return false;
                }
            });
        },
        sureEdit(formname){
            this.$refs[formname].validate((valid) => {
                if(valid){
                    var data = this.Edit_form;
                    data.u_update_name = window.sessionStorage.loginid;
                    data.u_update_id = window.sessionStorage.user_id;
                    this.$confirm('确认修改?','提示',{
                        confirmButtonText:'确定',
                        cancelButton:'取消',
                        type:'warning'
                }).then(() => {
                    var _this = this;
                    axios.post(_this.Editsrc, data)
                    .then(function(res){
                    _this.$message({
                        type:'success',
                        message:'修改成功!'
                    })
                    _this.Edit_dialog = false;
                    //刷新
                    _this.$store.dispatch(_this.getData,_this.current_group_role);
                    //验证项重置
                    _this.resetForm(formname);
                    })
                    .catch(function(Error){
                    _this.$message({
                        type:'danger',
                        message:'错误！'
                    })
                    console.log(Error);
                    })
                }).catch(() => {
                    this.$message({
                    type:'info',
                    message:'创建取消'
                    });
                    this.Edit_dialog = false;
                })
                }else{
                    return false;
                }
            })
        },
        //刷新
        refreshData(){
            this.$emit('load');
        },
        //初始化表单，下拉框和验证表,每一项生成属性并赋值空值
        initialize_form(){
            var _this = this;
            this.sys_tbl_clmn.forEach(function(item){
                var key = item.column_field;
                _this.condition_drop[key] = [];
                /*受现代 JavaScript 的限制（以及废弃 Object.observe），Vue 不能检测到对象属性的添加或删除。属性必须在 data 对象上存在才能让 Vue
                转换它，这样才能让它是响应的,可以使用 vm.$set 实例方法给对象添加响应属性*/
                _this.$set(_this.Create_form, key, '');
                _this.$set(_this.Edit_form, key, '');
                _this.rule[key] = [];
                var obj = {};
                obj.required = true;
                obj.trigger = "blur";
                obj.message = item.column_desc + "不能为空"
                _this.rule[key].push(obj);
            });
        },
        //条件判断表赋值,让表单依据条件判断表生成内容
        condition(){ 
            this.condition_form = [];
            var _this = this;
            this.sys_tbl_clmn.forEach(function(item){
                //name表单项名称
                _this.condition_form_list.name = item.column_field;
                //label表单项描述
                _this.condition_form_list.label = item.column_desc;
                //value表单项是否显示
                _this.condition_form_list.value = item.display;
                //allow表单项是否可以为空，不为空给予验证规则
                if(item.allow_null == true){
                    _this.condition_form_list.allow = "allow_null";
                }
                else{
                    _this.condition_form_list.allow = _this.condition_form_list.name;
                }
                //dropdownlist表单是否为下拉框，不是为输入框
                if(item.dropdownList_vls !== "" && item.dropdownList_vls !== null){
                    _this.condition_form_list.droplist = true;
                //将配置表里的值分割成数组保存在下拉框表里
                    for(var key in _this.condition_drop){
                        if(key == _this.condition_form_list.name){
                            var a = item.dropdownList_vls.split("^");
                            a.forEach(function(aa){
                                _this.condition_drop[key].push(aa);
                            });
                        }
                    }
                }
                else{
                    _this.condition_form_list.droplist = false;
                }
                //type表单项值内容
                if(item.column_type == "nvarchar"){
                    _this.condition_form_list.type = "nvarchar";
                }
                else if(item.column_type == "int"){
                    _this.condition_form_list.type = "int";
                }
                else if(item.column_type == "bit"){
                    _this.condition_form_list.type = "bit";
                }
                else{
                    _this.condition_form_list.type = "datetime";
                }
                //深复制condition_form_list，并把内容存到condition_form中
                var list = {};
                for(var key in _this.condition_form_list){
                    list[key] = _this.condition_form_list[key];
                }
                _this.condition_form.push(list);
            });         
        }
    }
}
</script>

