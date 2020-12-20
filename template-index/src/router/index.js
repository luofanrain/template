import Vue from 'vue'
import Router from 'vue-router'
import tool from '@/common/tool'
import config from '@/common/config'
import share from '@/common/share'
import axios from '@/common/axios'
import urls from '@/common/urls'
import store from '@/vuex/store'
Vue.use(Router)


const router = new Router({
  routes: [
    {
      path:'/information',
      name:'information',
      component:resolve => require(['@/components/user/information'],resolve)
    },
    {
      path:'/page404',
      name:'page404',
      component:resolve => require(['@/components/other/page404'],resolve)
    }
  ]
})
let jumpPath = ['/page404']
let jumpAdmin = []
let jumpDoctors = []
let jumpMeets = []

const localURL = /^(192\.168\.\d{1,3}\.\d{1,3})|(localhost)|(172\.16\.\d{1,3}\.\d{1,3})$/;
router.beforeEach((to,from,next)=>{
  // 初始化微信对象 
  config.host && share.initWx()
  let hostname = window.location.hostname;
  localURL.test(hostname)?development(to,from,next):produce(to,from,next);
})
async function development(to,from,next){
  tool.setCookie('openid','o4s7f1MdUJs8xeauXV9POpGH2Aw4')
  inSystem(to,from,next)
}
async function produce(to,from,next){
  if(to.path == '/jump'){
    next();
    return;
  }
  let openid = tool.getCookie('openid') || '';
  if(!openid){
    next({name:'jump',path:'/jump',query:{path:to.path,...to.query}})
    return;
  }
  inSystem(to,from,next)

}
async function inSystem(to,from,next){
  let path = to.path;
  let key = '';
  // 可跳过 路由
  if( jumpPath.indexOf(path) > -1 ){
    key = 'jump'
  }
  // 管理员系统路由
  if( jumpAdmin.indexOf(path) > -1 ){
    key = 'admin'
  }
  if( jumpDoctors.indexOf(path) > -1 ){
    key = 'doctor'
  }
  // 会议系统路由
  if( jumpMeets.indexOf(to.name) > -1){
    key = 'meet'
  }
  switch(key){
    case 'jump':
      next();
      break;
    case 'admin':
      isLogin(to,from,next);
      break;
    case 'doctor':
      isRegister(to,from,next);
      break;
    case 'meet':
      // next()
      bindData(to,from,next);
      break;
    default:
      next('/page404')
      // alert('木有此路由,请联系管理员')
  }
  
}
async function isLogin(to,from,next){
  let phone = tool.getCookie('phone') || ''
  let url = `${urls.login}?phone=${phone}`
  if(!phone) {
    next('/login')
    return;
  }
  next();
}

async function isRegister(to,from,next){
  let info = store.state.info;
  if(info) {
    next();
    return;
  }
  let url = `${urls.doctor.info}`
  let data = await getData(url);
  store.commit('setState',{info:data[0] || null})
  !data[0] ? next('/information') : next();
}


async function getData(url){
  return new Promise(resolve=>{
    axios.get(url,(res)=>{
      resolve(res.data)
    })
  })
}
async function  bindData(to,from,next){
  let params = tool.getSystemInfo();
  params.live_id = to.params.id;
  let url = tool.joinURL(urls.client.sign,params);
  let data = await getData(url);
  // if(data.is_online){
  //   share.wx.closeWindow()
  // }
  if(!data || !data.name){
    tool.setStorage('routepath',to.fullPath,sessionStorage)
    next('/sign')
    return;
  }
  next();
}


export default router;