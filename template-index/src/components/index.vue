<template>
  <div class='index_container'>
    <div class='index_main'>
        <div class='index_content'>
            <div class='index_head' @click='inInfo'>
              <div class='index_head_bg'></div>
              <div class='index_head_img'>
                <img src="" alt="">
              </div>
              <div class='index_head_info'>
                <div class='index_head_info_name'>{{data.name || ''}}</div>
                <div class='index_head_info_hospital'>就诊医院：{{data.hospital_text || data.hospital_name}}</div>
                <div class='index_head_info_exp'>
                  <div class='index_head_detail'>
                    <div class='index_head_progress_out'>
                      <div class='index_head_progress_in' :style='{width:`0%`}'></div>
                    </div>
                    <div class='index_head_info_tip'>
                      <span>个人信息完成度</span>
                      <span>0%</span>
                    </div>
                  </div>
                  <div class='index_head_edit' >
                    <img src="" alt="">
                  </div>
                </div>
              </div>
            </div>
            <div class='index_body'>
                <div class='index_block' v-for='(item,index) in list' :key='index' @click='inTab(item)'>
                  <div class='index_block_info'>
                    <div class='index_block_area index_block_img'>
                      <img src="" alt="">
                    </div>
                    <div class='index_block_area index_block_name'>{{item.name}}</div>
                    <div class='index_block_area index_block_number'>{{info[item.key] || 0}}</div>
                  </div>
                  <div class='index_block_arrow'><i class='el-icon-arrow-right'></i></div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import axios from '@/common/axios'
import urls from '@/common/urls'
export default {
  name: 'index',
  data () {
    return {
      list:[
        {
          icon:"qiandao",
          key:'signcount',
          name:'我的签到',
          path:'/sign',
        },
        {
          icon:"biji",
          key:'notecount',
          name:'我的随访笔记',
          path:'/note',
          number:'11',
        },
        {
          icon:"nengliang",
          key:'powercount',
          name:'我的能量',
          path:'/mypower',
        },
        {
          icon:"shoucang",
          key:'collectcount',
          name:'我的收藏',
          path:'/collection',
        },
        {
          icon:"huodong",
          key:'activitycount',
          name:'我参加的活动',
          path:'/activity',
        },
      ],
      data:{},
      info:{},
    }
  },
  created(){
    document.getElementsByTagName('title')[0].innerHTML = '个人信息'
    this.initData();
    this.initInfo();
  },
  methods:{
    initData(){
      // axios.get(urls.userinfo,(res)=>{
      //   this.data = res.data;
      // })
    },
    initInfo(){
      // axios.get(urls.userrecord,(res)=>{
      //   this.info = res.data;
      // })
    },
    inTab(item){
      // this.$router.push({
      //   path:item.path
      // })
    },
    inInfo(){
      // this.$router.push({
      //   path:'/information'
      // })
    }
  }
}
</script>

<style scoped>
.index_container,.index_main{
  height:100%;
  position: relative;
}
.index_top_background{
  position: absolute;
  top:0;
  left:0;
  height:33.12vw;
  width:100%;
  background:cyan;
}
.index_content{
  height:100%;
  width:100%;
  position: relative;
  z-index:1;
  padding:15.62vw 6.53vw;
  display: flex;
  flex-direction: column;
}
.index_head,.index_head_bg{
  /* min-height:33.33vw; */
  min-height:18.93vw;
  width:100%;
  /* opacity: 0.8; */
  border-radius:1vw;
  padding:7.2vw 4.13vw 7.2vw 0;
  display: flex;
  position: relative;
}
.index_head{
  /* box-sizing: content-box !important;
  -webkit-box-sizing: content-box  !important; */
}
.index_head_bg{
  height:100%;
  position: absolute;
  left:0;
  top:0;
  z-index:-1;
  background: #fff;;
  opacity: 0.8;

}
.index_head_img{
  flex:24.93vw 0 0;
  height:100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.index_head_img img{
  width:14.66vw;
  height:14.66vw;
  border-radius:50%;
}
.index_head_info{
  flex: 1 0 0;
}
.index_head_info_name{
  color:#000;
  font-size:4.53vw;
  font-weight: 650;
  line-height: 6.06vw;
}
.index_head_info_hospital{
  font-size:3.2vw;
  color:#000;
  line-height: 6.06vw;
  /* overflow: hidden;
  height:6.06vw; */
}
.index_head_info_exp{
  width:100%;
  height:5.86vw;
  display: flex;
  margin-top:3.33vw;
}
.index_head_detail{
  flex:36vw 0 0;
}
.index_head_progress_out,.index_head_progress_in{
  height:1.06vw;
  background: #ececec;
  border-radius:0.53vw;
}
.index_head_progress_out{
  width:100%;
}
.index_head_progress_in{
  background:#911C61;
  width:100%;
}
.index_head_info_tip{
  font-size:3.2vw;
  color:#ccc;
  line-height: 5vw;
  display: flex;
  justify-content: space-between;
}
.index_head_edit{
  flex:1 0 0;
  text-align: right;;
}
.index_head_edit img{
  width:5.86vw;
  height:100%;
}
.index_body{
  padding-top:7.6vw;
}
.index_block{
  width:100%;
  height:13.33vw;
  border-radius:6.66vw;
  padding:0 6.26vw;
  display: flex;
  align-items: center;
  background:#fff;
  margin:2.93vw 0;
}
.index_block_info{
  flex:1 0 0;
  display: flex;
  /* align-items: center; */
  padding-right:5.33vw;
}
.index_block_img{
  margin-right:4vw;
}
.index_block_img img{
  width:5.86vw;
}
.index_block_name{
  flex:1 0 0;
  height:5.86vw;
  color:#333;
}
.index_block_area{
  display: flex;
  align-items: center;
  /* background:red; */
}
.index_block_number{
  color:#999;
  height:5.86vw;
}
.index_block_arrow{
  flex:2.66vw 0 0;
  display: flex;
  height:5.86vw;
  align-items: center;
  font-size:2.66vw;
}
</style>
