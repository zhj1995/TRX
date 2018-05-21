<template>
	<div class="bodycol">
		<!--<div>
			<div class="blue">
				<div class="logo1"><img src="../../static/img/tungray_logo.jpg"></div>
				<div class="logo2"><img src="../../static/img/header_photo.jpg"></div>
			</div>
			<div class="green">
				<el-row>
					<el-col :span="23" :offset="1">
						<span class="maintitle">同日生产物流管控系统 TRX</span>
					</el-col>
				</el-row>
			</div>
		</div>-->
		<div class="body">
			<keep-alive>
					<router-view></router-view>
			</keep-alive>
		</div>	
	</div>
</template>

<script>
	export default{
		
	}
</script>

<style scoped>
body{
	margin: 0;
}
.head{
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #0dd42b;
  height: 40px !important;
  box-shadow: 0px 2px 10px #595959;
  padding: 0 !important;
}
.maintitle {
  height: 40px;
  line-height: 40px;
  color: #ffffff;
  font-size: 20px;
  font-weight: bolder;
}
.blue {
  float: left;
  overflow: hidden;
  width: 280px;
}
.logo1 {
  width: 200px;
  height: 40px;
  background-color: #0066cc;
  text-align: center;
  float: left;
}
.logo1 img {
  width: 160px;
  height: 40px;
}
.logo2 {
  width: 80px;
  height: 40px;
  float: left;
}
.logo2 img {
  width: 80px;
  height: 40px;
}
.green {
  float: left;
  height: 40px;
  width: calc(100% - 280px);
}
.icon.big{ 
  font-size:20px;
}
</style>
