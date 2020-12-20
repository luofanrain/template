<template>
  <div class='pageMiddle_detail'>
      <div class='pageMiddle_main'>
        <div class='pageMiddle_box'>
          <div class='pageMiddle_title'>
            {{item ? '修改':'新增'}}
            <i class='el-icon-close close_xxx' @click='closeInfo'></i>
          </div>
          <div class='box_pageMiddle'>
            <div class='box_content'>
              <div class='pageMiddle_row' >
                  <div class='pageMiddle_field pageMiddle_field_name'>名字</div>
                  <div class='pageMiddle_value'>
                    <el-input v-model.trim="data.name" placeholder="请输入名字" ></el-input>
                  </div>
              </div>
              <div class='pageMiddle_row' >
                  <div class='pageMiddle_field pageMiddle_field_name'>数量</div>
                  <div class='pageMiddle_value'>
                    <el-input v-model.trim="data.count" placeholder="请输入数量" @input='inputCode'></el-input>
                  </div>
              </div>
              <div class='pageMiddle_row pageMiddle_row_group'>
                  <el-button type="primary" @click="doCommit">{{item ? '修改':'新增'}}</el-button>
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
        return null
      }
    }
  },
  data(){
    return {
      data:{
        name:'',
        code:0,
      },
      loading:false,
    }
  },
  
  mounted(){
    if(this.item) {
      this.initData()
      return;
    }
  },
  methods:{
    initData(){
      this.data = {...this.item};
    },
    closeInfo(){
      this.$emit('closeInfo')
    },
    inputCode(){
      this.data.count = this.data.count.replace(/\D/g,'').substr(0,8)
    },
    formatData(){
      if(this.data.name === ''){
        tips.error({text:'请输入能量名'});
        return false;
      }
      return true;
    },
    doCommit(){
      if(this.loading || !this.formatData()){
        return;
      }
      this.loading = true;
      if(this.item){
        this.update();
      }else{
        this.create();
      }
    },
    update(){
      let url = urls.templateblock.update;
      axios.patch(url,this.data,(res)=>{
        setTimeout(() => { this.loading = false; }, 1000);
        if(res.errcode) return;
        tips.success({text:'修改成功'})
        this.loading = true;
        this.$emit('closeInfo',true)
      })
    },
    create(){
      let url = urls.templateblock.create;
      axios.post(url,this.data,(res)=>{
        setTimeout(() => { this.loading = false; }, 1000);
        if(res.errcode) return;
        tips.success({text:'新增成功'})
        this.loading = true;
        this.$emit('closeInfo',true)
      })
    },
  },

}
</script>
<style>
.pageMiddle_detail .pageMiddle_field_name{
  /* width:60px; */
}
</style>