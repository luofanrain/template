<template>
  <div class='types_container'>
    <div class='types_bg' @click='close'></div>
    <div class='types_main'>
      <div class='types_header'>
        <div class='types_title'>请选择上传类型</div>
        <div class='types_close' @click='close'>
          <img :src="require('@/assets/images/close.png')" alt="">
        </div>
      </div>
      <div class='types_content'>
        <div class='types_block' v-for='(item,index) in list' :key='index' @click='select(item.text)'>
            <div class='types_icon'>
              <img :src="require(`@/assets/images/${item.icon}.png`)" alt="">
            </div>
            <div class='types_text'>{{item.text}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name:'types',
  data:()=>{
    return {
      list:[
        {
          icon:'bingli',
          text:'病例'
        },
        {
          icon:'binglijianchabaogaodan',
          text:'病理检查报告单'
        },
        {
          icon:'xueyejianchabaogao',
          text:'血液检查报告'
        },
        {
          icon:'yingxiangxuejianchabaogaodan',
          text:'影像学检查报告单'
        },
        {
          icon:'jiyinjianchabaogaodan',
          text:'基因检测报告单'
        },
        {
          icon:'fapiao',
          text:'PD-1药物发票'
        },
        {
          icon:'fapiao',
          text:'其他发票'
        },
        {
          icon:'qita',
          text:'其他'
        }
      ]
    }
  },
  methods:{
    close(){
      this.$emit('close')
    },
    select(type){
      this.$emit('select',type)
    }
  },
}
</script>
<style>
.types_container,.types_bg{
  height:100%;
  width:100%;
  position: absolute;
  left:0;
  top:0;
  z-index:10;
}
.types_bg{
  background:#000;
  opacity: .6;
}
.types_main{
  position: absolute;
  bottom:0;
  left:0;
  z-index:11;
  width:100%;
  height:76vw;
  background: #fff;;
  padding:0 6.26vw;
  overflow: hidden;
}
.types_header{
  height:12.4vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom:1px solid #e6e6e6;
}
.types_title{
  line-height: 4.8vw;
}
.types_close{
  width:4.8vw;
  height:4.8vw;
}
.types_close img{
  height:100%;
  width:100%;
}
.types_icon{
  height:8vw;
  width:8vw;
}
.types_icon img{
  height:100%;
  width:100%;
}
.types_content{
  display: flex;
  flex-wrap: wrap;
  font-size:3.46vw;
  color:#666;
}
.types_block{
  flex: 33.33% 0 0;
  height:21.2vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.types_text{
  line-height: 6.13vw;;
}
</style>