import Vue from 'vue'
import Router from 'vue-router'
import tool from '@/common/tool'
import config from '@/common/config'
import axios from '@/common/axios'
import urls  from '@/common/urls'
import share  from '@/common/share'
import store from '@/vuex/store'
import index from '@/components/index'
import information from '@/components/user/information'
import jump from '@/components/jump'
Vue.use(Router)

const router = new Router({
  // mode:'history',
  routes: [
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/information',
      name: 'information',
      component: information
    },
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '*', 
      redirect:'/',
    }
  ]
  
})
const NotReg = []
const localURL = /^(192\.168\.\d{1,3}\.\d{1,3})|(localhost)|(172\.16\.\d{1,3}\.\d{1,3})$/;
router.beforeEach((to,from,next)=>{
  // share.initWx()
  let hostname = window.location.hostname;
  localURL.test(hostname)?development(to,from,next):produce(to,from,next);;
  // 
  
})
const produce = (to,from,next) => {
  if(NotReg.indexOf(to.name) > -1){
    next();
    return;
  }
  let openid = tool.getCookie('openid') || '';
  let info = tool.getStorage('userinfo',sessionStorage) || null;
  if((openid.toString()).length > 2 || to.name == 'jump'){
    if(to.name == 'jump'){
      next();
      return;
    }
    if(info || to.name == 'information' ){
      next()
    }else{
      getUserinfo((res)=>{
        tool.setStorage('userinfo',res,sessionStorage)
        !res ? next('/information') : next();
      })
    }
  }else{
    next({name:'jump',path:'/jump',query:{path:to.path,...to.query}})
  }
}
const development = (to,from,next) => {
  
  // let info = tool.getStorage('userinfo',sessionStorage) || '';
  // if(info) next();
  // else{
  //   getUserinfo((res)=>{
  //     tool.setStorage('userinfo',res,sessionStorage)
  //     next()
  //   })
  // }
  next();
}
const getUserinfo = (callback) => {
  axios.get(urls.userinfo,(res)=>{
    console.log(res)
    callback && callback(res.data.name || '')
  })
}

export default router;