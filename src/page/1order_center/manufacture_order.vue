<template>
	<div>
		<el-form ref="form" :model="form" >
			<el-form-item label="单选框">
				<el-radio-group v-model="form.radio1">
					<el-radio :label="1">备选项</el-radio>
					<el-radio :label="2">备选项</el-radio>
					<el-radio :label="3">备选项</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="按钮单选框">
				<el-radio-group v-model="form.radio2">
					<el-radio-button label="上海"></el-radio-button>
					<el-radio-button label="北京"></el-radio-button>
					<el-radio-button label="广州"></el-radio-button>
					<el-radio-button label="深圳"></el-radio-button>
				</el-radio-group>
			</el-form-item>	
			<el-form-item label="边框按钮">
				<el-radio-group v-model="form.radio3">
					<el-radio label="1" border>备选项</el-radio>
					<el-radio label="2" border>备选项</el-radio>
					<el-radio label="3" border>备选项</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="多选框">
				<el-checkbox-group v-model="form.checkList1">
					<el-checkbox label="复选框A"></el-checkbox>
					<el-checkbox label="复选框B"></el-checkbox>
					<el-checkbox label="复选框C"></el-checkbox>
					<el-checkbox label="禁用" disabled></el-checkbox>
					<el-checkbox label="选中且禁用" disabled></el-checkbox>
				</el-checkbox-group>
			</el-form-item>
			<el-form-item label="全选">
				<el-checkbox :indeterminate="form.isIndeterminate" v-model="form.checkAll" @change="handleCheckAllChange">全选</el-checkbox>
				<div style="margin: 15px 0;"></div>
				<el-checkbox-group v-model="form.checkedCities" @change="handleCheckedCitiesChange">
					<el-checkbox v-for="city in form.cities" :label="city" :key="city">{{city}}</el-checkbox>
				</el-checkbox-group>
			</el-form-item>
			<el-form-item label="按钮多选框">
				<el-checkbox-group v-model="form.checkList2">
					<el-checkbox-button label="上海"></el-checkbox-button>
					<el-checkbox-button label="北京"></el-checkbox-button>
					<el-checkbox-button label="广州"></el-checkbox-button>
					<el-checkbox-button label="深圳"></el-checkbox-button>
				</el-checkbox-group>
			</el-form-item>
			<el-form-item label="可清空输入框">
				<el-input placeholder="请输入内容" v-model="form.input1" clearable></el-input>
			</el-form-item>
			<el-form-item label="图标标记右">
				<el-input placeholder="请选择日期" suffix-icon="el-icon-date" v-model="form.input2"></el-input>
			</el-form-item>
			<el-form-item label="图标标记左">
				<el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="form.input3"></el-input>
			</el-form-item>
			<el-form-item label="复合输入框">
				<el-input placeholder="请输入内容" v-model="form.input4" class="input-with-select">
					<el-select v-model="form.select1" slot="prepend" placeholder="请选择" style="width: 100px;">
						<el-option label="餐厅名" value="1"></el-option>
						<el-option label="订单号" value="2"></el-option>
						<el-option label="用户电话" value="3"></el-option>
					</el-select>
					<el-button slot="append" icon="el-icon-search"></el-button>
				</el-input>
			</el-form-item>
			<el-form-item label="激活列出输入建议">
				<el-autocomplete v-model="form.state1" :fetch-suggestions="querySearch" placeholder="请输入内容" @select="handleSelect"></el-autocomplete>
			</el-form-item>
			<el-form-item label="输入后匹配输入建议">
				<el-autocomplete
      				v-model="form.state2"
      				:fetch-suggestions="querySearch"
      				placeholder="请输入内容"
      				:trigger-on-focus="false"
      				@select="handleSelect"
    			></el-autocomplete>
			</el-form-item>
		</el-form>
	</div>
</template>

<script type="text/javascript">
	export default{
		name: "main_manufacture_order",
		data(){
			return{
				form:{
					radio1:1,
					radio2:'上海',
					radio3:1,
					checkList1:['选中且禁用'],
					checkList2:['上海'],
					checkAll:false,
					checkedCities:['上海','北京'],
					cities:['上海','北京','广州','深圳'],
					isIndeterminate:true,
					input1:'',
					input2:'',
					input3:'',
					input4:'',
					select1:'',
					state1:'',
					state2:''
				},
				restaurants:[],
			}
		},
		methods:{
			handleCheckAllChange(val){
				this.form.checkedCities = val ? this.form.cities : [];
				this.form.isIndeterminate = false;
			},
			handleCheckedCitiesChange(val){
				let checkedCount = val.length;
				this.form.checkAll = checkedCount === this.form.cities.length;
				this.form.isIndeterminate = checkedCount > 0 && checkedCount < this.form.cities.length;
			},
			//输入意见
			querySearch(queryString, cb) {
        		var restaurants = this.restaurants;
        		var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        		// 调用 callback 返回建议列表的数据
        		cb(results);
      		},
			createFilter(queryString) {
        		return (restaurant) => {
          			return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        		};
      		},
			loadAll() {
		        return [
		          { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
		          { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
		          { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
		          { "value": "泷千家(天山西路店)", "address": "天山西路438号" },
		          { "value": "胖仙女纸杯蛋糕（上海凌空店）", "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101" },
		          { "value": "贡茶", "address": "上海市长宁区金钟路633号" },
		          { "value": "豪大大香鸡排超级奶爸", "address": "上海市嘉定区曹安公路曹安路1685号" },
		          { "value": "茶芝兰（奶茶，手抓饼）", "address": "上海市普陀区同普路1435号" },
		          { "value": "十二泷町", "address": "上海市北翟路1444弄81号B幢-107" },
		          { "value": "星移浓缩咖啡", "address": "上海市嘉定区新郁路817号" },
		          { "value": "阿姨奶茶/豪大大", "address": "嘉定区曹安路1611号" },
		          { "value": "新麦甜四季甜品炸鸡", "address": "嘉定区曹安公路2383弄55号" },
		          { "value": "Monica摩托主题咖啡店", "address": "嘉定区江桥镇曹安公路2409号1F，2383弄62号1F" },
		          { "value": "浮生若茶（凌空soho店）", "address": "上海长宁区金钟路968号9号楼地下一层" },
		          { "value": "NONO JUICE  鲜榨果汁", "address": "上海市长宁区天山西路119号" },
		          { "value": "CoCo都可(北新泾店）", "address": "上海市长宁区仙霞西路" },
		          { "value": "快乐柠檬（神州智慧店）", "address": "上海市长宁区天山西路567号1层R117号店铺" },
		          { "value": "Merci Paul cafe", "address": "上海市普陀区光复西路丹巴路28弄6号楼819" },
		          { "value": "猫山王（西郊百联店）", "address": "上海市长宁区仙霞西路88号第一层G05-F01-1-306" },
		          { "value": "枪会山", "address": "上海市普陀区棕榈路" },
		          { "value": "纵食", "address": "元丰天山花园(东门) 双流路267号" },
		          { "value": "钱记", "address": "上海市长宁区天山西路" },
		          { "value": "壹杯加", "address": "上海市长宁区通协路" },
		          { "value": "唦哇嘀咖", "address": "上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元" },
		          { "value": "爱茜茜里(西郊百联)", "address": "长宁区仙霞西路88号1305室" },
		          { "value": "爱茜茜里(近铁广场)", "address": "上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺" },
		          { "value": "鲜果榨汁（金沙江路和美广店）", "address": "普陀区金沙江路2239号金沙和美广场B1-10-6" },
		          { "value": "开心丽果（缤谷店）", "address": "上海市长宁区威宁路天山路341号" },
		          { "value": "超级鸡车（丰庄路店）", "address": "上海市嘉定区丰庄路240号" },
		          { "value": "妙生活果园（北新泾店）", "address": "长宁区新渔路144号" },
		          { "value": "香宜度麻辣香锅", "address": "长宁区淞虹路148号" },
		          { "value": "凡仔汉堡（老真北路店）", "address": "上海市普陀区老真北路160号" },
		          { "value": "港式小铺", "address": "上海市长宁区金钟路968号15楼15-105室" },
		          { "value": "蜀香源麻辣香锅（剑河路店）", "address": "剑河路443-1" },
		          { "value": "北京饺子馆", "address": "长宁区北新泾街道天山西路490-1号" },
		          { "value": "饭典*新简餐（凌空SOHO店）", "address": "上海市长宁区金钟路968号9号楼地下一层9-83室" },
		          { "value": "焦耳·川式快餐（金钟路店）", "address": "上海市金钟路633号地下一层甲部" },
		          { "value": "动力鸡车", "address": "长宁区仙霞西路299弄3号101B" },
		          { "value": "浏阳蒸菜", "address": "天山西路430号" },
		          { "value": "四海游龙（天山西路店）", "address": "上海市长宁区天山西路" },
		          { "value": "樱花食堂（凌空店）", "address": "上海市长宁区金钟路968号15楼15-105室" },
		          { "value": "壹分米客家传统调制米粉(天山店)", "address": "天山西路428号" },
		          { "value": "福荣祥烧腊（平溪路店）", "address": "上海市长宁区协和路福泉路255弄57-73号" },
		          { "value": "速记黄焖鸡米饭", "address": "上海市长宁区北新泾街道金钟路180号1层01号摊位" },
		          { "value": "红辣椒麻辣烫", "address": "上海市长宁区天山西路492号" },
		          { "value": "(小杨生煎)西郊百联餐厅", "address": "长宁区仙霞西路88号百联2楼" },
		          { "value": "阳阳麻辣烫", "address": "天山西路389号" },
		          { "value": "南拳妈妈龙虾盖浇饭", "address": "普陀区金沙江路1699号鑫乐惠美食广场A13" }
		        ];
      		},
			handleSelect(item) {
        		console.log(item);
      		}
		},
		mounted() {
     		this.restaurants = this.loadAll();
    	}
	}
</script>


