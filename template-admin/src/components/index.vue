<template>
    <el-container class='index_container' >
        <el-header class='index_header' >
            <headerlabel ></headerlabel>
        </el-header>
        <el-container class='index_content'>
            <el-aside  class='index_aside' >
                <asidelabel></asidelabel>
            </el-aside>
            <el-container class='index_main-content'>
                <el-main class='index_main' >
                    <component v-bind:is="components" ></component>
                </el-main>
                <!-- <el-footer class='footer' >医学大脑</el-footer> -->
            </el-container>
        </el-container>
    </el-container>
</template>
<script>
import headerlabel from '@/components/main/headerlabel'
import asidelabel from '@/components/main/asidelabel'
import mainlabel from '@/components/main/mainlabel'
import permissions from '@/components/menu/permissions/permissions'
export default  {
    name:'index',
    data(){
        return {
            loading:false,
            total_page:0,
        }
    },
    computed:{
        components(){
            return this.$store.state.components
        },
    },
    components:{
        headerlabel,
        asidelabel,
        mainlabel,
        permissions,
    }
}

</script>
<style scoped>
.index_container{
    height:100%;
    width:100%;
    display: flex;
    flex-direction: column;
}
.index_header{
    /* flex:60px 0 0 ; */
    flex:60px 0 0 ;
    padding:0 20px;
    width:100%;
    background:#545C64;
    display: flex;
    align-items: center;
}
.index_content{
    flex:1;
    display: flex;
    width:100%;
    background:#fff;
}
.index_aside{
    height:100%;
    flex:180px 0 0 ;
}
.index_mian-content{
    flex:1;
}
.index_main{
    height:100%;
    width:100%;
    /* padding:20px 0 0 20px; */
    padding:0;
    box-sizing: border-box;
}
.index_footer{
    flex:40px 0 0;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>

