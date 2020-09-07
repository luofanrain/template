<template>
  <el-container class='header_menu headerlabel'>
    <el-row class='shopName'>
      <el-col :span="24">
        <el-card shadow="always">
          模板
        </el-card>
      </el-col>
    </el-row>
    <div class="HeadIcon">
      <el-image class='icon'
        :src='url'
        fit="cover"></el-image>
        
      <el-link type="warning" disabled>{{username || `游客${Math.floor(Math.random()*9000000 + 1000000)}`}}</el-link>
        
    </div>
  </el-container>
</template>
<script>
import tool from '@/common/tool'
export default {
  name: 'headerlabel',
  data() {
    return {
      url:require("@/assets/images/icon.png"),
      username:''
    };
  },
  created(){
    this.username = tool.getCookie('username') || ''

  },
  methods: {
  }
}
</script>
<style>
.headerlabel{
  height:calc(100%);
  padding:0;
  display: flex;
  justify-content: space-between;
  align-content: center;

}
.headerlabel .shopName>div{
  min-width:160px !important;;
  line-height: 100%;
  display: flex;
  align-items:center;
  justify-content: left;
  font-size:20px;
  border-radius: 0;
  border: none;
}

.headerlabel .el-col {
  height: calc(100%);
}

.headerlabel .el-card__body{
  padding:0 !important;;
  background:#545c64 !important;;
  color:#fff;
}

.header_menu .el-card{
  border-radius:0px !important;;
  box-shadow:none !important;;
  border:none !important;
  height:30px;
  line-height: 30px;
}

.headerlabel .el-menu{
  float:right
}

.headerlabel .el-menu-item{
  height: 40px;
  line-height: 40px;
  border:none;
}

.headerlabel .bg-purple {
  height: calc(100%);
  display: flex;
  justify-content: left;
  align-items: center;
}

.headerlabel .HeadIcon{
  display: flex;
  justify-content: center;
  align-items: center;
  padding:0 20px;
}

.headerlabel .icon{
  width:45px;
  height:45px;
  margin-right:5px;
  border-radius:15px;
}
</style>
