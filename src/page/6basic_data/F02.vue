<template>
  <div>
    <el-table
      border
      size="mini"
      stripe
      :data="im_container"
      style="width:100%"
    >
      <el-table-column prop="ctncode" label="ctncode" width="150">
      </el-table-column>
      <el-table-column prop="ctndesc" label="ctndesc" width="150">
      </el-table-column>
      <el-table-column prop="ctn_type" label="ctn_type" width="150">
      </el-table-column>
      <el-table-column prop="ctn_length" label="ctn_length" width="150">
      </el-table-column>
      <el-table-column prop="ctn_width" label="ctn_width" width="150">
      </el-table-column>
      <el-table-column prop="ctn_height" label="ctn_height" width="150">
      </el-table-column>
      <el-table-column prop="max_weight" label="max_weight" width="150">
      </el-table-column>
      <el-table-column prop="selt_weight" label="selt_weight" width="150">
      </el-table-column>
      <el-table-column prop="bind_factory_line" label="bind_factory_line" width="150">
      </el-table-column>
      <el-table-column prop="bind_material_type" label="bind_material_type" width="150">
      </el-table-column>
      <el-table-column prop="bind_material_code" label="bind_material_code" width="150">
      </el-table-column>
      <el-table-column prop="u_create_name" label="u_create_name" width="150">
      </el-table-column>
      <el-table-column prop="u_create_id" label="u_create_id" width="150">
      </el-table-column>
      <el-table-column prop="t_create" label="t_create" width="150">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "main_F02",  //本页面的组件名，一般定义成路由名一样
  data(){
    return{
      im_container:[]
    }
  },
  methods:{

  },
  mounted(){
    var _this = this;
    axios.get("http://localhost:60046/api/im_container/getall")
    .then(function(res){
      _this.im_container = res.data;
    })
  }
}
</script>
<style scope>
</style>