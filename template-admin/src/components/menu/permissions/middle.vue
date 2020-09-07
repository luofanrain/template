<template>
  <div class='pageMiddle_detail'>
      <div class='pageMiddle_main'>
        <div class='pageMiddle_box'>
          <div class='pageMiddle_title'>
            {{item.id ? '修改':'新增'}}
            <i class='el-icon-close close_xxx' @click='closeInfo'></i>
          </div>
          <div class='box_pageMiddle'>
            <div class='box_content'>
              <div class='pageMiddle_row' >
                  <div class='pageMiddle_field'>权限名</div>
                  <div class='pageMiddle_value'>
                    <el-input v-model="data.permissions" placeholder="请输入权限名" ></el-input>
                  </div>
              </div>
              <div class='pageMiddle_row' >
                  <div class='pageMiddle_field'>权限代码</div>
                  <div class='pageMiddle_value'>
                    <el-input v-model="data.code" placeholder="请输入权限代码" ></el-input>
                  </div>
              </div>
              
              <div class='pageMiddle_row'>
                  <div class='pageMiddle_field'>权限类型</div>
                  <div class='pageMiddle_value'>
                    <el-select v-model="data.type" placeholder="请选择">
                      <el-option
                        v-for="(item,index) in config.types"
                        :key="index"
                        :label="item.name"
                        :value="item.type">
                      </el-option>
                    </el-select>
                  </div>
              </div>
              <div class='pageMiddle_row page_row_btn_single page_row_btn_single_email '>
                  <el-button type="primary" @click="doCommit">{{item.id ? '修改':'新增'}}</el-button>
              </div>
            </div>
          </div>
        </div>
        <div class='pageMiddle_grayBg'  ></div>
      </div>
  </div>
</template>
<script>
import axios from '@/common/axios'
import config from '@/common/config'
import $ from 'jquery'
import tips from '@/common/tips'
import urls from '@/common/urls'
export default {
  name:'pageMiddle',
  props:{
    item:{
      type:Object,
      default:()=>{
        return {}
      }
    }
  },
  data(){
    return {
      data:{
        permissions:'',
        code:'',
        type:'Function',
      },
      config:{
        types:[
          {
            type:'Function',
            name:'功能'
          },
          {
            type:'Menu',
            name:'菜单'
          }
        ]
      },
      loading:false,
    }
  },
  
  mounted(){
    if(this.item.id) this.initData()
  },
  methods:{
    initData(){
      this.data = {...this.item}
    },
    closeInfo(){
      this.$emit('closeInfo')
    },
    formatData(){
      for(let key in this.data){
        if(typeof this.data[key] == 'number') continue;
         this.data[key] = $.trim(this.data[key])
      }
      if(this.data.permissions === ''){
        tips.error({text:'请输入权限名'});
        return false;
      }
      if(this.data.code === ''){
        tips.error({text:'请输入权限代码'});
        return false;
      }
      return true;
    },
    doCommit(){
      if(this.loading || !this.formatData()){
        return;
      }
      this.loading = true;
      if(this.item.id){
        this.update();
      }else{
        this.create();
      }
    },
    update(){
      let url = urls.permissions.update;
      axios.patch(url,this.data,(res)=>{
        if(res.errcode) return;
        tips.success({text:'修改成功'})
        this.loading = true;
        this.$emit('closeInfo',true)
      })
    },
    create(){
      let url = urls.permissions.create;
      axios.post(url,this.data,(res)=>{
        if(res.errcode) return;
        tips.success({text:'新增成功'})
        this.loading = true;
        this.$emit('closeInfo',true)
      })
    },
  },

}
</script>
<style scoped>
</style>>
