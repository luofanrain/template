<template>
  <el-container class='asidelabelcont' >
    <el-row>
      <el-col>
         <el-menu
            :default-active="defaultTab"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            @select = 'select'
            active-text-color="#ffd04b"
            >
            <div  v-for="(item,index) in list" :key='index'>
              <el-submenu :index="String(index)"  v-if='item.type == "group"' >
                <template slot="title">
                  <i :class="[item.icon || defaultIcon]"></i>
                  <span>{{item.label}}</span><i v-if='item.type == "group"' class=" menu-arrow" :class='curIndex != 0?"el-icon-arrow-down":"el-icon-arrow-up"'></i>
                </template>
                <el-menu-item :index="val.key" v-for='(val,key) in item.list' :key='key' >
                  <i :class="[val.icon || defaultIcon]"></i>
                  <span slot="title">{{val.label}}</span>
                </el-menu-item>
              </el-submenu>
              <el-menu-item :index="item.key" v-if='item.type == "row"' class='otherItem'  >
                <i :class="[item.icon || defaultIcon]"></i>
                <span slot="title">{{item.label}}</span>
              </el-menu-item>
            </div>
          </el-menu>
          

        </el-col>
    </el-row>
  </el-container>
</template>
<script>
import config from '@/common/config'
import tool from '@/common/tool'
import axios from '@/common/axios'
import urls from '@/common/urls'
export default {
  name: 'asidelabel',
  data() {
    return {
      defaultTab:this.$store.state.components,
      defaultIcon:'el-icon-menu',
      list:[],
      curIndex:-1,
      permission:-1,
      config:{
        permssions:[]
      }
    };
  },
  created(){
    this.loadData();
  },
  methods: {
    loadData(){
      axios.get(urls.login,(res)=>{
        console.log(res)
        this.permission = res.level
        this.$store.commit('setState',{permssions:res.permssions || []})
        this.config.permssions = res.permssions || [];
        // this.permission = 0
        this.initData()
      })
    },
    initData(){
      let banners=[];
      for(let i in config.banner){
        let item = {...config.banner[i]};
        if(item.type == 'group'){
          item.list = item.list.filter(x=this.config.permssions.indexOf(x.code) > -1)
          if(item.length > 0) banners.push(item)
        }else{
          if(this.config.permssions.indexOf(item.code) > -1){
            banners.push(item)
          }
        }
        console.log(banners)
      }
      this.list = banners;
      let item= this.list[0]
      let key = ''
      if(item.type =='group'){
        key = item.list[0].key
      }else{
        key = item.key;
      }
      this.defaultTab = key;
      this.select(key);
    },
    select(key){
      sessionStorage.setItem('page',config.page)
      sessionStorage.setItem('pagesize',config.pagesize)
      this.$store.commit('setState',{components:key})
    },
    handleOpen(key,value){
      console.log(key)
      // if(this.curIndex != key){
      //   this.select(this.list[key].list[0].key)
      // }
      this.curIndex = key;
    },
    handleClose(key,value){
      this.curIndex = -1;
    }
  }
}
</script>
<style>
.asidelabelcont{
  height:calc(100%);
  background:#545c64;
  /* background:#23262e; */
}

.asidelabelcont .el-row{
  width:100%;
}

.asidelabelcont .el-menu-item{
  width:80px !important;
  min-width:80px !important;
  padding:0 !important;
  box-sizing: border-box;
  /* background:#23262e !important; */
}

.asidelabelcont .menu-arrow{
  height:100%;
  width:20px;
  position: absolute;
  right:10px;
  top:0;
  text-align: left;
  /* display:flex; */
  align-items: center;
  justify-content: center;
  display: none !important;
}

.asidelabelcont .el-menu{
  width:180px;
}

.asidelabelcont .el-submenu__title{
  padding-left:10px !important;
  /* min-height:30px;
  line-height:30px; */
  width:100%;
}

.asidelabelcont .el-submenu{
  width:100%;
  text-align: left;
  display: inline-block;
}

.asidelabelcont .el-menu-item{
  text-align: left;
  width: 180px !important;
  background: red;
  padding-left:5px !important;  
}

.asidelabelcont .otherItem{
  padding-left:10px !important; 
}

.asidelabelcont .el-submenu  .el-menu-item{
  padding-left:20px !important;
}


.asidelabelcont .el-submenu__title{
  /* background:#23262e !important; */
  /* padding-left:0px !important; */
}

.asidelabelcont .el-submenu__icon-arrow{
  display: none;
}

.asidelabelcont .el-menu{
  float:left;
  border-right:none !important;
}

.asidelabelcont .second{
  text-align: center;
}

.asidelabelcont .el-submenu i,.el-menu-item i{
  margin-right:0 !important;
}
.asidelabelcont .el-menu-item{
  line-height: 50px;
  height:50px;
}
</style>
