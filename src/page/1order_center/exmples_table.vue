<template>
  <div>
    <el-row :span="24" style="margin-bottom:20px">
        <el-col :span="4">
            <el-select v-model="currenttasktype" multiple placeholder="按照项目状态筛选" @change="statechange">
                <el-option 
                    v-for="type in types"
                    :key="type.projectstate" 
                    :label="type.projecttype"
                    :value="type.projectstate"
                ></el-option>
             </el-select>
        </el-col>
        <el-col :span="7" :offset="1">
            <el-date-picker v-model="currentdate"
                value-format="yyyy-MM-dd"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions"
                @change="datechange">
            </el-date-picker>
        </el-col>
        <el-col :span="5" :offset="1">
            <el-input placeholder="请输入内容" v-model="inputcontent" class="input-with-select">
                <el-button slot="append" icon="el-icon-search" @click="inputchange"></el-button>
            </el-input>
        </el-col>
        <el-col :span="5" :offset="1">
            <el-button-group>
                <el-button type="primary" icon="el-icon-edit" @click="CreateDialogVisible = true">新建</el-button>
                <el-button type="danger" icon="el-icon-delete" @click="deleteCurrent">删除</el-button>
            </el-button-group>      
        </el-col>
    </el-row>
    <el-table
        ref="multipleTable"
        border
        size="mini"
        stripe       
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        >
        <el-table-column fixed type="selection" width="55">
        </el-table-column>
        <el-table-column prop="projectName" label="项目名称" width="150">
        </el-table-column>
        <el-table-column prop="projectID" label="项目编码" width="100">
        </el-table-column>
        <el-table-column prop="place" label="项目地址" width="120">
        </el-table-column>
        <el-table-column label="项目启动时间" width="150" sortable :sort-method="datesort">
            <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.date }}</span>
            </template>
        </el-table-column>
        <el-table-column prop="cost" label="项目预算金额" width="150" sortable :sort-method="changesort">
        </el-table-column>
        <el-table-column prop="people" label="项目负责人" width="120">
        </el-table-column>
        
        <el-table-column type="expand" label="项目简述" width="100">
            <template slot-scope="prop">
                <el-form label-position="left" inline class="demo-table-expand">
                    <div class="des">{{prop.row.tooptip}}</div>
                </el-form>
            </template>
        </el-table-column>
        
        <el-table-column prop="state" label="状态" width="100"
            :filters="[{ text: '进行中', value: '进行中'}, { text: '已结束', value: '已结束'}]"
            :filter-method="filterTag"
            filter-placement="bottom-end">
            <template slot-scope="scope">
                <el-tag :type="scope.row.state === '进行中' ? 'primary' : 'success'" close-transition="">
                    {{scope.row.state}}
                </el-tag>
            </template>
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
        title="新建项目表" 
        :visible.sync="CreateDialogVisible"
        :before-close="handleClose">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="项目名称">
                <el-input v-model="form.projectName"></el-input>
            </el-form-item>
            <el-form-item label="项目编码">
                <el-input v-model="form.projectID"></el-input>
            </el-form-item>
            <el-form-item label="项目地址">
                <el-input v-model="form.place"></el-input>
            </el-form-item>
            <el-form-item label="启动时间">
                <el-date-picker v-model="form.date" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
            <el-form-item label="项目金额">
                <el-input v-model="form.cost"></el-input>
            </el-form-item>
            <el-form-item label="负责人">
                <el-input v-model="form.people"></el-input>
            </el-form-item>
            <el-form-item label="状态">
                <el-select v-model="form.state">
                    <el-option
                        v-for="item in types"
                        :key="item.projectstate"
                        :label="item.projecttype"
                        :value="item.projectstate">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="项目简述">
                <el-input 
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容"
                    v-model="form.tooptip">
                </el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="cancelCreate">取消</el-button>
            <el-button type="primary" @click="sureCreate">确定</el-button>
        </span>
    </el-dialog>

    <el-dialog 
        title="编辑" 
        :visible.sync="EditDialogVisible"
        :before-close="handleClose">
        <el-form ref="editform" :model="editform" label-width="80px">
            <el-form-item label="项目名称">
                <el-input v-model="editform.projectName"></el-input>
            </el-form-item>
            <el-form-item label="项目编码">
                <el-input v-model="editform.projectID"></el-input>
            </el-form-item>
            <el-form-item label="项目地址">
                <el-input v-model="editform.place"></el-input>
            </el-form-item>
            <el-form-item label="启动时间">
                <el-date-picker v-model="editform.date" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
            <el-form-item label="项目金额">
                <el-input v-model="editform.cost"></el-input>
            </el-form-item>
            <el-form-item label="负责人">
                <el-input v-model="editform.people"></el-input>
            </el-form-item>
            <el-form-item label="状态">
                <el-select v-model="editform.state">
                    <el-option
                        v-for="item in types"
                        :key="item.projectstate"
                        :label="item.projecttype"
                        :value="item.projectstate">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="项目简述">
                <el-input 
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容"
                    v-model="editform.tooptip">
                </el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="cancelEdit">取消</el-button>
            <el-button type="primary" @click="sureEdit">确定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
    data(){
        return{
            CreateDialogVisible:false,
            EditDialogVisible:false,
            currenttasktype:'',
            types:[{
                projecttype:'进行中',
                projectstate:'进行中'
            },{
                projecttype:'已结束',
                projectstate:'已结束'
            }],
            tableData:[
                {
                    id:1,
                    projectName: '长春九台智能车间',
                    projectID: 'PE',
                    place:'长春九台',
                    date:'2017-11-10',
                    cost:100,
                    people:'傅明东',
                    tooptip:'长春九台智能车间长春九台智能车间长春九台智能车间长春九台智能车间长春九台智能车间',
                    state:'已结束'
                },
                {
                    id:2,
                    projectName: '长春九台智能车间',
                    projectID: 'PE',
                    place:'长春九台',
                    date:'2016-11-11',
                    cost:200,
                    people:'傅明东',
                    tooptip:'长春九台智能车间长春九台智能车间长春九台智能车间长春九台智能车间长春九台智能车间',
                    state:'进行中'
                },
                {
                    id:3,
                    projectName: '长春九台智能车间',
                    projectID: 'PE',
                    place:'长春九台',
                    date:'2016-11-10',
                    cost:300,
                    people:'傅明东',
                    tooptip:'长春九台智能车间长春九台智能车间长春九台智能车间长春九台智能车间长春九台智能车间',
                    state:'已结束'
                },
                {
                    id:4,
                    projectName: '长春九台智能车间',
                    projectID: 'PE',
                    place:'长春九台',
                    date:'2017-11-10',
                    cost:600,
                    people:'傅明东',
                    tooptip:'长春九台智能车间长春九台智能车间长春九台智能车间长春九台智能车间长春九台智能车间',
                    state:'已结束'
                },
                {
                    id:5,
                    projectName: '长春九台智能车间',
                    projectID: 'PE',
                    place:'长春九台',
                    date:'2017-11-10',
                    cost:500,
                    people:'傅明东',
                    tooptip:'长春九台智能车间长春九台智能车间长春九台智能车间长春九台智能车间长春九台智能车间',
                    state:'进行中'
                },
                {
                    id:6,
                    projectName: '长春九台智能车间',
                    projectID: 'PE',
                    place:'长春九台',
                    date:'2017-11-11',
                    cost:600,
                    people:'傅明东',
                    tooptip:'长春九台智能车间长春九台智能车间长春九台智能车间长春九台智能车间长春九台智能车间',
                    state:'进行中'
                },
                {
                    id:7,
                    projectName: '长春九台智能车间',
                    projectID: 'PE',
                    place:'长春九台',
                    date:'2017-11-11',
                    cost:700,
                    people:'傅明东',
                    tooptip:'长春九台智能车间长春九台智能车间长春九台智能车间长春九台智能车间长春九台智能车间',
                    state:'已结束'
                },
                {
                    id:8,
                    projectName: '长春九台智能车间',
                    projectID: 'PE',
                    place:'长春九台',
                    date:'2017-11-11',
                    cost:800,
                    people:'傅明东',
                    tooptip:'长春九台智能车间长春九台智能车间长春九台智能车间长春九台智能车间长春九台智能车间',
                    state:'已结束'
                },
                {
                    id:9,
                    projectName: '长春九台智能车间',
                    projectID: 'PE',
                    place:'长春九台',
                    date:'2017-11-11',
                    cost:900,
                    people:'傅明东',
                    tooptip:'长春九台智能车间长春九台智能车间长春九台智能车间长春九台智能车间长春九台智能车间',
                    state:'已结束'
                },
                {
                    id:10,
                    projectName: '长春九台智能车间',
                    projectID: 'PE',
                    place:'长春九台',
                    date:'2017-11-11',
                    cost:1000,
                    people:'傅明东',
                    tooptip:'长春九台智能车间长春九台智能车间长春九台智能车间长春九台智能车间长春九台智能车间',
                    state:'进行中'
                }
            ],
            form:{
                projectName:'',
                projectID:'',
                place:'',
                date:'',
                cost:'',
                people:'',
                tooptip:'',
                state:''
            },
            editform:{
                projectName:'',
                projectID:'',
                place:'',
                date:'',
                cost:'',
                people:'',
                tooptip:'',
                state:''
            },
            multipleSelection: [],
            pickerOptions:{
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker){
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600*1000*24*7);
                        picker.$emit('pick', [start, end]);
                    }
                },{
                    text: '最近一个月',
                    onClick(picker){
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600*1000*24*30);
                        picker.$emit('pick', [start, end]);
                    }
                },{
                    text: '最近三个月',
                    onClick(picker){
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600*1000*24*90);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            },
            currentdate:[],
            inputcontent:''
        }
    },
    methods:{
        //状态改变
        statechange(a){
            alert(a);
        },
        //时间改变
        datechange(b){
            alert("开始时间"+b[0]+" "+"结束时间"+b[1]);
        },
        //输入框改变
        inputchange(c){
            alert(this.inputcontent);
        },
        //全选,反选
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        //金额排序
        changesort(a, b){
            if(a.cost < b.cost){
                return -1;
            }
            else if(a.cost > b.cost){
                return 1;
            }else{
                return 0;
            }
        },
        //日期排序
        datesort(a, b){
            var timea = Date.parse(new Date(a.date));
            var timeb = Date.parse(new Date(b.date));
            if(timea > timeb){
                return 1;
            }else if(timea < timeb){
                return -1;
            }else{
                return 0;
            }
        },
        //状态筛选
        filterTag(value, row){
            return row.state === value;
        },
        //编辑
        handleEdit(index, row){
            this.editform.projectName = row.projectName;
            this.editform.projectID = row.projectID;
            this.editform.place = row.place;
            this.editform.date = row.date;
            this.editform.cost = row.cost;
            this.editform.people = row.people;
            this.editform.tooptip = row.tooptip;
            this.editform.state = row.state;
            this.EditDialogVisible = true;
        },
        //删除
        handleDelete(index, row){
            this.$confirm('确认删除？','提示',{
                confirmButtonText:'确定',
                cancelButton:'取消',
                type:'warning'
            }).then(() => {
                this.$message({
                    type:'success',
                    message:'删除成功!'
                });
                console.log(row.index);
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
            alert(`当前页: ${val}`);
        },
        //对话框关闭
        handleClose(done){
            this.$confirm('确认关闭？')
                .then(_=> {
                    done();
                })
                .catch(_=> {});
        },
        //取消创建
        cancelCreate(){
            this.CreateDialogVisible = false;
        },
        //取消编辑
        cancelEdit(){
            this.EditDialogVisible = false;
        },
        //确定创建
        sureCreate(){
            this.$confirm('确定创建新数据吗','提示',{
                confirmButtonText:'确定',
                cancelButton:'取消',
                type:'warning'
            }).then(() => {
                this.$message({
                    type:'success',
                    message:'创建成功!'
                });
                this.CreateDialogVisible = false;
            }).catch(() => {
                this.$message({
                    type:'info',
                    message:'创建取消'
                });
            });
        },
        //确定修改
        sureEdit(){
            this.$confirm('确定修改数据吗','提示',{
                confirmButtonText:'确定',
                cancelButton:'取消',
                type:'warning'
            }).then(() => {
                this.$message({
                    type:'success',
                    message:'修改成功！'
                });
                this.EditDialogVisible = false;
            }).catch(() => {
                this.$message({
                    type:'info',
                    message:'创建取消'
                });
            });
        },
        //删除选择元素
        deleteCurrent(){
            this.$confirm('此操作将永久删除数据，是否继续？','提示',{
                confirmButtonText:'确定',
                cancelButton:'取消',
                type:'warning'
            }).then(() => {
                let a = [];
                this.multipleSelection.forEach(function(item){
                    a.push(item.id);
                });
                console.log(a);
                this.$message({
                    type:'success',
                    message:'删除成功！'
                });
            }).catch(() => {
                this.$message({
                    type:'info',
                    message:'已取消删除'
                });
            });
            
        }

    }
}
</script>

<style>
    .des{
        text-align: center;
    }
</style>
