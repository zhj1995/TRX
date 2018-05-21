<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

</script>

<style>
body{
  margin: 0;
  padding: 0;
}
/*标签tab更改高度和字间距*/
.el-tabs__item{
    height: 30px !important;
    line-height: 30px !important;
}
/*选中的tab更改大小粗细和颜色*/
.el-tabs__item.is-active{
  color:#00cc44 !important;
  font-size: 16px !important;
  font-weight: bolder !important;
}

.el-submenu .el-menu-item{  /*侧边导航更改宽度和颜色*/
  min-width: 150px !important;
  color: #999999 !important;
}
.el-submenu .el-menu-item .icon{  /*侧边导航未选中icon变灰色*/
  color: #999999 !important;
  font-size: 18px !important ;
}

.el-menu-item.is-active{   /*侧边导航选中变色*/
  color:#3385ff !important;
  font-weight: bolder !important;
}
.el-menu-item.is-active .icon{   /*侧边导航选中icon变黑色*/
  color:#3385ff !important;
  font-size: 18px !important ;
}
/*侧边一级标题变大变粗*/
.el-submenu__title{
  font-size: 16px !important;
  font-weight: bolder !important;
}
.el-submenu__title:hover{
  background-color: #f2f2f2 !important;
}
.icon {     /*iconfont 通用样式，只引入一次，具体可以在使用的地方改变*/
   width: 1em; height: 1em;
   vertical-align: -0.15em;
   fill: currentColor;
   overflow: hidden;
}

</style>
