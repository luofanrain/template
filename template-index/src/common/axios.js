import axios from 'axios'
import store from '@/vuex/store'
import tool  from '@/common/tool'
import config  from '@/common/config'
import tips  from '@/common/tips'
const getHeaders = () =>{
  // let openid = tool.getCookie('openid') || 'oYAPDjhBRVsk5OqB65NnQuE7-YJw';
  let openid = tool.getCookie('openid') || 'oYAPDjhAyptBdVAiyS5WrBLjEoSc';
  // let openid = tool.getCookie('openid') || 'oYAPDjm-wfGwKXOyAxgqz8F_WHho1';
  // let openid = tool.getCookie('openid') || 'oYAPDjn044D8rquVocItzqH2PJAo';
  // let openid = tool.getCookie('openid') || 'oYAPDjms1cwKYxx8dvEjCMmd4qxk';
  return {token:'',openid}
}
let isload = false;
const tipCode = (err) => {
  try{
    console.log(err)
    let code = err.response.status;
    let errCode = config.tips.errCode
    if(code == 500){
      tips.error({text:errCode[500]})
    }else{
      console.log(err.response.data)
      tips.error({text:err.response.data.msg || errCode[code] || errCode.default.replace('$',code)})
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
    headers:getHeaders()
  }).then((res)=>{
    console.log(res)
    let _data = res.data;
    cb(_data)
  }).catch((err,er)=>{
    try{
      console.log(err)
      let data = err.response.data;
      if(data.detail) console.log(err.response)
      else tipCode(err);
      cb({errcode:true,data:[],err:data})
    }catch(e){
      console.log(e)
      // tips.error({text:config.tips.errorCode['500']})
    }
  })
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
    try{
      console.log(err)
      let data = err.response.data;
      if(data.detail) console.log(err.response)
      else tipCode(err);
      cb({errcode:true,data:[],err:data})
    }catch(e){
      console.log(e)
      // tips.error({text:config.tips.errorCode['500']})
    }
  })
}
const getStream = (url,cb) =>{

  axios.get(url).then((res)=>{
    cb(res)
  }).catch((res)=>{
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
    try{
      console.log(err)
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
    isload = false;
    let text = err.toString();
    console.log(text);
    tips.error({text})
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
  getHeaders,
  getStream
}