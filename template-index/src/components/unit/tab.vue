<template>
    <div class='tab_container'>
        <div class='tab_block' v-for='(item,index) in tabs' :key='index' @click='setTab(item.code)'>
            <span class='tab_block_lable' :class='code==item.code?"tab_block_active":""'>{{item.name}}</span>
        </div>
    </div>
</template>
<script>
export default {
    name:'tab',
    props:{
        code:{
            type:String,
            default:''
        },
        tabs:{
            type:Array,
            default:()=>{
                return [
                ]
            }
        }
    },
    methods:{
        setTab(code){
            console.log(111)
            this.$emit('setTab',code)
        }
    }
}
</script>
<style scoped>
.tab_container{
    width:100%;
    height:15.6vw;
    display: flex; 
    position: relative;
    z-index:1000;
}
.tab_block{
    flex:1 0 0;
    font-size:4.8vw;
    color:#fff;
    font-weight: 500;
    padding:0 5.06vw;
    position: relative;
    z-index:1;
}
.tab_block:first-child{
    text-align: right;
}
.tab_block span{
    line-height: 13.33vw;
    display: inline-block;
}
.tab_block_lable{
    opacity: .6;
}
.tab_block_active{
  opacity: 1;
}
.tab_center_line{
    width:100%;
    height:100%;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
}
.tab_center_line span{
    font-size:40px;
    display: inline-block;
    width:1px;
    background:#ddd;
}
</style>