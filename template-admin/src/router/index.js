import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import index from '@/components/index'
import tool from '@/common/tool'
import urls from '@/common/urls'
import axios from '@/common/axios'
import store from '@/vuex/store'

Vue.use(Router)

const router = new Router({
  base:'admin',
  routes: [
    {
      path: '*', // 页面不存在的情况下会跳到404页面
      redirect:'/',
    },
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})
// 路由劫持
router.beforeEach((to,from,next)=>{
  const username = tool.getCookie('username') || ''
  next();
  return;
  if(username || to.name =='login'){
    if(!store.state.token && to.name != 'login'){
      getToken(()=>{
        next()
      })
      return;
    }
    next();
  }else{
    next('/login')
  }
})

const getToken = (callback) => {
  let data = {
    username:tool.getCookie('username') || '',
    passwd:tool.getCookie('passwd') || '',
  }
  axios.post(urls.login,data,(res)=>{
    if(!res.errcode){
      store.commit('setState',{token:res['token']});
      callback()
    }else{
      tool.setCookie('username','')
    }
  })
}
export default  router;
