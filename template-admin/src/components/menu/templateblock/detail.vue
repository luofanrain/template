<template>
  <div class='pageDetail_container'>
      <div class='pageDetail_main'>
        <div class='pageDetail_box'>
          <div class='pageDetail_title'>
            医生信息
            <i class='el-icon-close close_xxx' @click='closeInfo'></i>  
          </div>
          <div class='pageDetail_row' v-for='(item,key) in dict' :key='key'>
              <div class='pageDetail_field'>{{item}}：</div>
              <div class='pageDetail_value'>{{getData(key,item)}}</div>
          </div>
        </div>
        <div class='pageDetail_grayBg'  ></div>
      </div>
  </div>
</template>
<script>
import axios from '@/common/axios'
import urls from '@/common/urls'
import config from '@/common/config'
import tool from '@/common/tool'
export default {
  name:'coursewareDetail',
  props:{
    id:{
      type:Number,
      default:0
    }
  },
  created(){
    this.loadData();
  },
  data(){
    return {
      dict:config.table.templatedemo,
      data:{}
    }
  },
  methods:{
    closeInfo(){
      this.$emit('closeInfo')
    },
    loadData(){
      let url = urls.templatedemo.detail.replace('$',this.id);
      axios.get(url,(data)=>{
        this.data = data;
      })
    },
    getData(key,val){
      return tool.fotmatData(key, this.data[key])
    }
  },

}
</script>
<style >
.pageDetail_grayBg,.pageDetail_main{
  height:100%;
  width:100%;
  position: absolute;
  left:0;
  top:0;
  z-index:-1;
}
.pageDetail_grayBg{
  background:gray;
  opacity: 0.2;;
}
.pageDetail_main{
  display: flex;
  justify-content: center;
  align-items: center;
  z-index:1;
}
.pageDetail_box{
  max-height:600px;
  background:#fff;
  border-radius:5px;
  overflow: auto;
}
.pageDetail_title{
  background:#fff;
  color:#999;
  text-align: left;
  padding-left:10px;
  height:40px;
  font-size:16px;
  line-height: 40px;
  border-bottom:1px solid #e6e6e6;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  position: relative;
}
.pageDetail_row{
  width:300px;
  min-height:40px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: left;
  font-size:14px;
  background:#fff;
}
.pageDetail_row:last-child{
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}
.pageDetail_field{
  text-align: right;;
  width:150px;
}
.pageDetail_value{
  text-align: left;
  width:200px;
}
.pageDetail_container .close_xxx{
  position: absolute;
  right: 10px;
  top: 10px;
  font-size: 20px;
}
</style>>
