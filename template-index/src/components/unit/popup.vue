<template>
    <div class='popup_container'>
        <div class='popup_gray_bg' @click='doClose'></div>
        <div class='popup_main'>
            <div class='popup_title'>
                <div class='popup_title_text' v-if='msg.title' :style='`text-align:${msg.align||"left"}`'>
                    <span >{{msg.title}}</span>
                    <div class='popub_close' v-if='msg.close' @click='doClose'>
                        <i class='el-icon-close '></i>
                    </div>
                </div>
            </div>
            <div class='popup_content'>
                <slot></slot>
            </div>
            <div class='popup_btn_group'>
                <div @click='doSure' v-if='!msg.btngroup || msg.btngroup.sure' class='popup_btn_sure' :class='{popup_btn_border:!msg.btngroup || msg.btngroup.close}'>
                    <span>{{msg.btngroup && typeof msg.btngroup.sure == 'string' ? msg.btngroup.sure:'确认'}}</span>
                </div>
                <div @click='doClose' v-if='!msg.btngroup || msg.btngroup.close' class='popup_btn_close'>
                    <span>{{msg.btngroup &&  typeof msg.btngroup.close == 'string'? msg.btngroup.close:'取消'}}</span>
                </div>
            </div>
        </div>
    </div>
</template>a
<script>
export default {
    name:'popup',
    props:{
        msg:{
            type:Object,
            default:()=>{
                return {
                    title:'',
                    content:''                    
                }
            }
        }
    },
    methods:{
        doClose(){
            this.$emit('doClose')
        },
        doSure(){
            this.$emit('doSure')
        }
    }
}
</script>
<style>
.popup_container{
    height:100%;
    width:100%;
    position:absolute;
    left:0;
    top:0;
    z-index:200;
    display: flex;
    align-items: center;
    justify-content: center;
}
.popup_gray_bg{
    height:100%;
    width:100%;
    background:#999;
    opacity: .5;
    position: absolute;
    top:0;
    left:0;
}
.popup_main{
    position: relative;
    z-index:1;
    width:80vw;
    padding:4.93vw 4.93vw 0;
    background:#fff;
    border-radius:2vw;
}
.popup_title{
    width:100%;
    font-size:4vw;
    font-weight: 600;
    color:#666;
    /* padding-bottom: 4vw; */
}
.popup_title_text{
    position: relative;
    text-align: center;
}
.popub_close{
    position: absolute;
    right:0;
    top:0;
    height:100%;
    width:4vw;
}
.popup_content{
    /* min-height:35.2vw; */
    font-size:4.53vw;
    color:#000;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
}
.popup_btn_group{
    height:13.86vw;
    display: flex;;
    border-top:1px solid #e6e6e6;
    font-weight: 600;
    font-weight: 4.26vw;
}
.popup_btn_sure>span{
    display: inline-block;
    width:100%;
    text-align: center;
}
.popup_btn_border{
    border-right:1px solid #e6e6e6;
}
.popup_btn_sure{
    color:#911C61;
}
.popup_btn_group div{
    flex:1 0 0 ;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size:4.26vw;
}
</style>