<template>
  <el-container class='container login-cont'>
    <el-form ref="form" class='content' autocomplete='off' @keyup.enter.native='doLogin'>
      <!-- <el-image
        style="width: 300px;"
        :src="require('@/assets/images/logo.png')"
        class='logo'
        ></el-image> -->
      <div  class='input'>
        <el-input placeholder="请输入账号" v-model="username" class='inputContent' @focus="focusIn" required="required" autocapitalize="off">
          <template slot="prepend" class='inputContent'>账号:</template>
        </el-input>
      </div>
      <div class='input'>
        <el-input placeholder="请输入密码" v-model="passwd" type="password" class='inputContent' @focus="focusIn"  autocomplete="new-password" required="required" autocapitalize="off">
          <template slot="prepend" class='inputContent'>密码:</template>
        </el-input>
      </div>
      <div class='input'>
          <el-button type="primary" class='login' @click='doLogin'  >登录</el-button>
      </div>
    </el-form>
  </el-container>
</template>

<script>
import axios from '@/common/axios'
import tool from '@/common/tool'
import urls from '@/common/urls'
export default {
  name: 'login',
  data () {
    return {
      username: '',
      passwd: '',
      errShow:false,
      tipText:''
    }
  },
  created(){
    this.username = tool.getCookie('username') || '';
    this.passwd = tool.getCookie('passwd') || '';
  },
  methods:{
    focusIn(){
      this.errShow = false;
    },
    doLogin(){
      const data = {
        username:this.username,
        passwd:encodeURI(this.passwd)
      };
      tool.setCookie('username',this.username)
      tool.setCookie('passwd',this.passwd)
      axios.post(urls.login,data,(res)=>{
        console.log(res)
        if(!res.errcode){
          tool.setCookie('token',res.token)
          this.$router.push({
            path:'/'
          })
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.container{
  display: flex;
  justify-content: center;
  align-items: center;
  background:#222;
}
.login-cont{
  height:100%;
  width:100%;
}
 input:-webkit-autofill { background-color: #333 !important;}
.login-cont .content{
  height:auto;
  width:300px;
}
.login-cont .loginInput{
  width:300px;
  margin-left:100px;
}
.login-cont .input{
  height:50px;
}
.login-cont .inputContent>:nth-child(n){
  background: #333 !important;
  border: 0;
  color:#fff;
}
.login-cont .login{
  width:100%;
}
.login-cont .errShow{
  margin-bottom:10px;
}
.login-cont .hidden{
  display: none;
}
.login-cont .logo{
  margin-bottom:10px;
}
</style>
