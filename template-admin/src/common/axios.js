import axios from 'axios'
import store from '@/vuex/store'
import tool  from '@/common/tool'
import config  from '@/common/config'
import tips  from '@/common/tips'
const getHeaders = () =>{
  let token = tool.getStorage('token');
  // let token = store.state.token;
  return  {
    Authorization:token,
    token:store.state.token || '',
    username:tool.getCookie('username') || ''
  };
}
// axios.defaults.withCredentials=true
let isload = false;
const tipCode = (err) => {
  try{
    let code = err.response.status;
    let errCode = config.tips.errCode
    console.log(config.tips.errCode)
    if(code == 500){
      tips.error({text:errCode[500]})
    }else{
      tips.error({text:err.response.data.msg || errCode[code] || errCode.default})
    }
  }catch(e){
    console.log(err)
    tips.error({text:errCode.other})
  }
}
const post = (url,data,cb) =>{
  data = data || {};
  // if(data.append) data.append('openid',store.state.openid)
  // else  data = parseBody({...data,openid:store.state.openid})
 
  axios({
    url:url,
    method:'POST',
    data:data,
    processData: false,  // 不处理数据
    contentType: false,   // 不设置内容类型
    headers:getHeaders()
  }).then((res)=>{
    console.log(res)
    let _data = res.data;
    cb(_data)
  }).catch((err,er)=>{
    console.log(err)
    try{
      let data = err.response.data;
      if(data.detail) console.log(err.response)
      else tipCode(err);
      cb({errcode:true,data:[],err:data})
    }catch(e){
      // tips.error({text:config.tips.errorCode['500']})
    }
  })
}
const download = (url,name,type) => {
  axios({
    method: 'get',
    headers: {
      'Content-Type': config.axiosType['type'],
      ...getHeaders()
    },
    responseType: 'blob',
    url: url,
  })
  .then( res =>{ 　　　　
    let blob = new Blob([res.data], {type: config.axiosType[type]});      　
    if('msSaveOrOpenBlob' in navigator){
      window.navigator.msSaveOrOpenBlob(blob, `${name}.${type}`);
      return
    }　　　
    let downloadElement = document.createElement('a');                  
    let href = window.URL.createObjectURL(blob);                  
    downloadElement.href = href;      　　　　
    downloadElement.download = `${name}.${type}`;　　　　　　　　　　
    document.body.appendChild(downloadElement);                  
    downloadElement.click();                  
    document.body.removeChild(downloadElement);                  
    window.URL.revokeObjectURL(href);      　　
  }).catch( err => {
　　　　tips.error({text:'暂没有数据阔以导出'});
　　});
}
const get = (url,cb) =>{
  // if(url.indexOf('?') > -1) url =  `${url}&openid=${store.state.openid}`
  // else url =  `${url}?openid=${store.state.openid}`

  axios({
    url:url,
    method:'GET',
    headers:getHeaders()
  }).then((res)=>{
    console.log(res)
    let _data = res.data;
    cb(_data)
  }).catch((err)=>{
    console.log(err)
    try{
      let data = err.response.data;
      if(data.detail) console.log(err.response)
      else tipCode(err);
      cb({errcode:true,data:[],err:data})
    }catch(e){
      // console.log(err)
      // tips.error({text:config.tips.errorCode['500']})
    }
  })
}
const getStream = (url,cb) =>{

  axios.get(url).then((res)=>{
    cb(res)
  }).catch((res)=>{
    console.log(res)
    cb({isErrorStatus:true})
  })
}
const delet = (url,cb) =>{
  // if(url.indexOf('?') > -1) url =  `${url}&openid=${store.state.openid}`
  // else url =  `${url}?openid=${store.state.openid}`

  axios({
    url:url,
    method:'DELETE',
    headers:getHeaders()
  }).then((res)=>{
    console.log(res)
    let _data = res.data;
    cb(_data)
  }).catch((err)=>{
    console.log(err)
    try{
      let data = err.response.data;
      if(data.detail) console.log(err.response)
      else tipCode(err);
      cb({errcode:true,data:[],err:data})
    }catch(e){
      // tips.error({text:config.tips.errorCode['500']})
    }
  })
}
const patch = (url,data,cb) =>{
  data = data || {};
  // if(data.append) data.append('openid',store.state.openid)
  // else  data = parseBody({...data,openid:store.state.openid})

  axios({
    method:'PATCH',
    url,
    data:data,
    processData: false,  // 不处理数据
    contentType: false,   // 不设置内容类型
    headers:getHeaders()
  }).then((res)=>{
    isload = false;
    let _data = res.data;
    cb(_data)
  }).catch((err)=>{
    console.log(err)
    try{
      let data = err.response.data;
      console.log(data)
      if(data.detail) console.log(err.response)
      else tipCode(err);
      cb({errcode:true,data:[],err:data})
    }catch(e){
      // tips.error({text:config.tips.errorCode['500']})
    }
  })
}

const parseBody = (data)=>{
  let str = '';
  for(let key in data){
      str = `${str}${key}=${data[key]}&`
  }
  return str.substr(0,str.length-1);
}
export default {
  post,
  get,
  patch:patch,
  delete:delet,
  download,
  getHeaders,
  getStream
}